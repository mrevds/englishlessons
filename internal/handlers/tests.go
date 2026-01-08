package handlers

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"englishlessons.back/internal/models"
	"englishlessons.back/internal/services"

	"github.com/gin-gonic/gin"
)

type SubmitTestRequest struct {
	LessonID int            `json:"lesson_id" binding:"required"`
	Answers  map[string]int `json:"answers" binding:"required"`
}

func (h *Handlers) SubmitTest(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleStudent) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только ученики могут отправлять результаты тестов"})
		return
	}

	userID, _ := c.Get("user_id")

	var req SubmitTestRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	// Валидация lesson_id
	if req.LessonID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID урока"})
		return
	}

	// Валидация answers
	if len(req.Answers) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходимо предоставить ответы"})
		return
	}

	serviceReq := services.SubmitTestRequest{
		LessonID: req.LessonID,
		Answers:  req.Answers,
		UserID:   userID.(uint),
	}

	result, err := h.testService.SubmitTest(serviceReq)
	if err != nil {
		statusCode := http.StatusInternalServerError
		if err.Error() == "Урок не найден или неактивен" {
			statusCode = http.StatusNotFound
		} else if err.Error() == "Сначала необходимо пройти предыдущий урок" ||
			strings.Contains(err.Error(), "предыдущий урок") {
			statusCode = http.StatusForbidden
		} else if strings.Contains(err.Error(), "Необходимо") || strings.Contains(err.Error(), "Неверный") {
			statusCode = http.StatusBadRequest
		}
		c.JSON(statusCode, gin.H{"error": err.Error()})
		return
	}

	// Проверяем достижения
	isFirstAttempt := result.IsNewProgress
	if err := h.achievementService.CheckAchievements(userID.(uint), uint(req.LessonID), result.TestAttempt.Percentage, isFirstAttempt); err != nil {
		// Логируем ошибку, но не прерываем выполнение
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":              result.TestAttempt.ID,
		"user_id":         result.TestAttempt.UserID,
		"lesson_id":       result.TestAttempt.LessonID,
		"score":           result.TestAttempt.Score,
		"percentage":      result.TestAttempt.Percentage,
		"total_questions": result.TestAttempt.TotalQuestions,
		"correct_answers": result.TestAttempt.CorrectAnswers,
		"is_passed":       result.TestAttempt.IsPassed,
		"created_at":      result.TestAttempt.CreatedAt,
	})
}

func (h *Handlers) GetTestAttempts(c *gin.Context) {
	role, _ := c.Get("role")
	userID, _ := c.Get("user_id")

	var lessonID *uint
	if lessonIDStr := c.Query("lesson_id"); lessonIDStr != "" {
		if id, err := strconv.ParseUint(lessonIDStr, 10, 32); err == nil && id > 0 {
			uid := uint(id)
			lessonID = &uid
		}
	}

	var attempts []models.TestAttempt
	var err error

	if role == string(models.RoleTeacher) {
		// Для учителей - все попытки по уроку или все попытки
		if lessonID != nil {
			attempts, err = h.testService.GetAttemptsByLesson(*lessonID, nil)
		} else {
			// Для учителей без фильтра по уроку - возвращаем пустой список
			// Можно добавить метод GetAllAttempts в сервис если нужно
			attempts = []models.TestAttempt{}
		}
	} else {
		// Для студентов - только свои попытки
		attempts, err = h.testService.GetAttemptsByUser(userID.(uint), lessonID)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get attempts"})
		return
	}

	result := make([]gin.H, len(attempts))
	for i, attempt := range attempts {
		result[i] = gin.H{
			"id":              attempt.ID,
			"user_id":         attempt.UserID,
			"username":        attempt.User.Username,
			"full_name":       attempt.User.GetFullName(),
			"lesson_id":       attempt.LessonID,
			"lesson_title":    attempt.Lesson.Title,
			"score":           attempt.Score,
			"percentage":      attempt.Percentage,
			"total_questions": attempt.TotalQuestions,
			"correct_answers": attempt.CorrectAnswers,
			"is_passed":       attempt.IsPassed,
			"created_at":      attempt.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handlers) GetTestAttemptsByLesson(c *gin.Context) {
	lessonIDStr := c.Query("lesson_id")
	if lessonIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходим параметр lesson_id"})
		return
	}

	lessonID, err := strconv.ParseUint(lessonIDStr, 10, 32)
	if err != nil || lessonID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат lesson_id"})
		return
	}

	role, _ := c.Get("role")
	userID, _ := c.Get("user_id")

	var attempts []models.TestAttempt
	var userIDPtr *uint

	if role != string(models.RoleTeacher) {
		uid := userID.(uint)
		userIDPtr = &uid
	}

	attempts, err = h.testService.GetAttemptsByLesson(uint(lessonID), userIDPtr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get attempts"})
		return
	}

	result := make([]gin.H, len(attempts))
	for i, attempt := range attempts {
		result[i] = gin.H{
			"id":              attempt.ID,
			"user_id":         attempt.UserID,
			"username":        attempt.User.Username,
			"full_name":       attempt.User.GetFullName(),
			"lesson_id":       attempt.LessonID,
			"lesson_title":    attempt.Lesson.Title,
			"score":           attempt.Score,
			"percentage":      attempt.Percentage,
			"total_questions": attempt.TotalQuestions,
			"correct_answers": attempt.CorrectAnswers,
			"is_passed":       attempt.IsPassed,
			"created_at":      attempt.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handlers) GetProgress(c *gin.Context) {
	role, _ := c.Get("role")
	userID, _ := c.Get("user_id")

	if role == string(models.RoleTeacher) {
		// Для учителей - все прогрессы (нужен метод в сервисе)
		// Пока возвращаем пустой список или используем репозиторий
		c.JSON(http.StatusOK, []gin.H{})
		return
	}

	// Для студентов - только свой прогресс
	progressData, err := h.lessonService.GetUserProgress(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get progress"})
		return
	}
	c.JSON(http.StatusOK, progressData)
}

func (h *Handlers) GetProgressByStudent(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учителей"})
		return
	}

	studentIDStr := c.Query("student_id")
	if studentIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходим параметр student_id"})
		return
	}

	studentID, err := strconv.ParseUint(studentIDStr, 10, 32)
	if err != nil || studentID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат student_id"})
		return
	}

	stats, err := h.userService.GetStudentStats(uint(studentID))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// Возвращаем lessons_detail из stats
	if lessonsDetail, ok := stats["lessons_detail"].([]map[string]interface{}); ok {
		c.JSON(http.StatusOK, lessonsDetail)
	} else {
		c.JSON(http.StatusOK, []gin.H{})
	}
}

func (h *Handlers) GetProgressByLesson(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учителей"})
		return
	}

	lessonIDStr := c.Query("lesson_id")
	if lessonIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходим параметр lesson_id"})
		return
	}

	lessonID, err := strconv.ParseUint(lessonIDStr, 10, 32)
	if err != nil || lessonID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат lesson_id"})
		return
	}

	// Используем репозиторий через сервис (временное решение)
	// Можно создать метод в ProgressService
	progress, err := h.progressRepo.FindByLessonID(uint(lessonID), nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get progress"})
		return
	}

	result := make([]gin.H, len(progress))
	for i, p := range progress {
		completedAt := ""
		if p.CompletedAt != nil {
			completedAt = p.CompletedAt.Format(time.RFC3339)
		}

		lessonTitle := ""
		if p.Lesson.ID > 0 {
			lessonTitle = p.Lesson.Title
		}

		username := ""
		fullName := ""
		if p.User.ID > 0 {
			username = p.User.Username
			fullName = p.User.GetFullName()
		}

		result[i] = gin.H{
			"id":              p.ID,
			"user_id":         p.UserID,
			"username":        username,
			"full_name":       fullName,
			"lesson_id":       p.LessonID,
			"lesson_title":    lessonTitle,
			"best_score":      p.BestScore,
			"best_percentage": p.BestPercentage,
			"attempts_count":  p.AttemptsCount,
			"is_completed":    p.IsCompleted,
			"completed_at":    completedAt,
			"last_attempt_at": p.LastAttemptAt.Format(time.RFC3339),
		}
	}

	c.JSON(http.StatusOK, result)
}
