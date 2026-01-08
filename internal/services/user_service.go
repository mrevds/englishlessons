package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	userRepo     *repositories.UserRepository
	progressRepo *repositories.ProgressRepository
}

func NewUserService(
	userRepo *repositories.UserRepository,
	progressRepo *repositories.ProgressRepository,
) *UserService {
	return &UserService{
		userRepo:     userRepo,
		progressRepo: progressRepo,
	}
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	return s.userRepo.FindByID(id)
}

func (s *UserService) GetStudents(filters map[string]string) ([]models.User, error) {
	repoFilters := make(map[string]interface{})
	
	if levelStr := filters["level"]; levelStr != "" {
		if levelInt, err := strconv.Atoi(levelStr); err == nil && levelInt >= 1 && levelInt <= 11 {
			repoFilters["level"] = levelInt
		}
	}

	if levelLetter := filters["level_letter"]; levelLetter != "" {
		levelLetter = strings.TrimSpace(strings.ToUpper(levelLetter))
		if len([]rune(levelLetter)) == 1 {
			repoFilters["level_letter"] = levelLetter
		}
	}

	return s.userRepo.FindStudents(repoFilters)
}

func (s *UserService) GetUserStats(userID uint) (map[string]interface{}, error) {
	progress, err := s.progressRepo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	totalPoints := 0
	completedLessons := 0
	totalAttempts := 0
	var completedProgress []models.LessonProgress

	for _, p := range progress {
		totalPoints += p.BestScore
		totalAttempts += p.AttemptsCount
		if p.IsCompleted {
			completedLessons++
			completedProgress = append(completedProgress, p)
		}
	}

	avgPercentage := 0.0
	if len(completedProgress) > 0 {
		sum := 0.0
		for _, p := range completedProgress {
			sum += p.BestPercentage
		}
		avgPercentage = sum / float64(len(completedProgress))
	}

	// Получаем общее количество уроков
	var totalLessons int64
	if err := s.progressRepo.DB().Model(&models.Lesson{}).
		Where("is_active = ?", true).Count(&totalLessons).Error; err != nil {
		totalLessons = 0
	}

	overallProgress := 0.0
	if totalLessons > 0 {
		overallProgress = float64(completedLessons) / float64(totalLessons) * 100
	}

	lessonsDetail := make([]map[string]interface{}, len(progress))
	for i, p := range progress {
		completedAt := ""
		if p.CompletedAt != nil {
			completedAt = p.CompletedAt.Format(time.RFC3339)
		}

		lessonTitle := ""
		lessonOrder := 0
		if p.Lesson.ID > 0 {
			lessonTitle = p.Lesson.Title
			lessonOrder = p.Lesson.Order
		}

		lessonsDetail[i] = map[string]interface{}{
			"lesson_id":       p.LessonID,
			"lesson_title":    lessonTitle,
			"lesson_order":    lessonOrder,
			"best_percentage": p.BestPercentage,
			"best_score":      p.BestScore,
			"attempts":        p.AttemptsCount,
			"is_completed":    p.IsCompleted,
			"completed_at":    completedAt,
			"last_attempt_at": p.LastAttemptAt.Format(time.RFC3339),
		}
	}

	return map[string]interface{}{
		"total_points":        totalPoints,
		"completed_lessons":   completedLessons,
		"average_percentage":  avgPercentage,
		"total_attempts":      totalAttempts,
		"total_lessons":       totalLessons,
		"total_completed_lessons": completedLessons,
		"overall_progress":    overallProgress,
		"lessons_detail":      lessonsDetail,
	}, nil
}

func (s *UserService) GetStudentStats(studentID uint) (map[string]interface{}, error) {
	student, err := s.userRepo.FindByID(studentID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("Student not found")
		}
		return nil, err
	}

	progress, err := s.progressRepo.FindByStudentID(studentID)
	if err != nil {
		return nil, err
	}

	totalPoints := 0
	completedLessons := 0
	totalAttempts := 0
	var completedProgress []models.LessonProgress

	for _, p := range progress {
		totalPoints += p.BestScore
		totalAttempts += p.AttemptsCount
		if p.IsCompleted {
			completedLessons++
			completedProgress = append(completedProgress, p)
		}
	}

	avgPercentage := 0.0
	if len(completedProgress) > 0 {
		sum := 0.0
		for _, p := range completedProgress {
			sum += p.BestPercentage
		}
		avgPercentage = sum / float64(len(completedProgress))
	}

	var totalLessons int64
	if err := s.progressRepo.DB().Model(&models.Lesson{}).
		Where("is_active = ?", true).Count(&totalLessons).Error; err != nil {
		totalLessons = 0
	}

	lessonsDetail := make([]map[string]interface{}, len(progress))
	for i, p := range progress {
		completedAt := ""
		if p.CompletedAt != nil {
			completedAt = p.CompletedAt.Format(time.RFC3339)
		}

		lessonTitle := ""
		lessonOrder := 0
		if p.Lesson.ID > 0 {
			lessonTitle = p.Lesson.Title
			lessonOrder = p.Lesson.Order
		}

		lessonsDetail[i] = map[string]interface{}{
			"lesson_id":       p.LessonID,
			"lesson_title":    lessonTitle,
			"lesson_order":    lessonOrder,
			"best_percentage": p.BestPercentage,
			"best_score":      p.BestScore,
			"attempts":        p.AttemptsCount,
			"is_completed":    p.IsCompleted,
			"completed_at":    completedAt,
			"last_attempt_at": p.LastAttemptAt.Format(time.RFC3339),
		}
	}

	return map[string]interface{}{
		"student": map[string]interface{}{
			"id":            student.ID,
			"username":      student.Username,
			"full_name":     student.GetFullName(),
			"first_name":    student.FirstName,
			"last_name":     student.LastName,
			"email":         student.Email,
			"class_display": student.GetClassDisplay(),
			"level":         student.Level,
			"level_letter":  student.LevelLetter,
		},
		"total_points":       totalPoints,
		"completed_lessons":  completedLessons,
		"average_percentage": avgPercentage,
		"total_attempts":    totalAttempts,
		"total_lessons":      totalLessons,
		"total_completed_lessons": completedLessons,
		"lessons_detail":     lessonsDetail,
	}, nil
}

// ResetStudentPassword сбрасывает пароль студента и возвращает новый пароль
func (s *UserService) ResetStudentPassword(username string) (string, error) {
	// Находим пользователя по username
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", errors.New("студент с таким username не найден")
		}
		return "", errors.New("ошибка при поиске студента")
	}

	// Проверяем, что это студент
	if user.Role != models.RoleStudent {
		return "", errors.New("можно сбрасывать пароль только студентам")
	}

	// Генерируем новый пароль (8 символов)
	newPassword := generateRandomPassword(8)

	// Хешируем пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return "", errors.New("ошибка при генерации пароля")
	}

	// Обновляем пароль
	err = s.userRepo.UpdatePassword(user.ID, string(hashedPassword))
	if err != nil {
		return "", errors.New("ошибка при обновлении пароля")
	}

	return newPassword, nil
}

// generateRandomPassword генерирует случайный пароль заданной длины
func generateRandomPassword(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)[:length]
}

type UpdateProfileRequest struct {
	Email       *string `json:"email"`
	Level       *int    `json:"level"`
	LevelLetter *string `json:"level_letter"`
}

// UpdateProfile обновляет профиль пользователя
func (s *UserService) UpdateProfile(userID uint, req UpdateProfileRequest) error {
	updates := make(map[string]interface{})

	if req.Email != nil {
		email := strings.TrimSpace(strings.ToLower(*req.Email))
		if email != "" {
			// Валидация email
			if !isValidEmail(email) {
				return errors.New("неверный формат email")
			}
			updates["email"] = email
		}
	}

	if req.Level != nil {
		level := *req.Level
		if level < 1 || level > 11 {
			return errors.New("класс должен быть от 1 до 11")
		}
		updates["level"] = level
	}

	if req.LevelLetter != nil {
		levelLetter := strings.TrimSpace(strings.ToUpper(*req.LevelLetter))
		if levelLetter != "" {
			// Используем подсчет рун для правильной работы с кириллицей
			if len([]rune(levelLetter)) > 1 {
				return errors.New("неверный формат буквы класса")
			}
			updates["level_letter"] = levelLetter
		}
	}

	if len(updates) == 0 {
		return errors.New("нет данных для обновления")
	}

	return s.userRepo.UpdateProfile(userID, updates)
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

// ChangePassword меняет пароль пользователя
func (s *UserService) ChangePassword(userID uint, req ChangePasswordRequest) error {
	// Получаем пользователя
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return errors.New("пользователь не найден")
	}

	// Проверяем старый пароль
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.OldPassword))
	if err != nil {
		return errors.New("неверный текущий пароль")
	}

	// Валидация нового пароля
	if len(req.NewPassword) < 6 {
		return errors.New("новый пароль должен быть не менее 6 символов")
	}

	// Хешируем новый пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("ошибка при генерации пароля")
	}

	// Обновляем пароль
	return s.userRepo.UpdatePassword(userID, string(hashedPassword))
}

// isValidEmail простая проверка email
func isValidEmail(email string) bool {
	return strings.Contains(email, "@") && strings.Contains(email, ".")
}

