package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"errors"
	"strconv"
	"time"

	"gorm.io/gorm"
)

type TestService struct {
	testRepo     *repositories.TestRepository
	lessonRepo   *repositories.LessonRepository
	progressRepo *repositories.ProgressRepository
	achievementRepo *repositories.AchievementRepository
}

func NewTestService(
	testRepo *repositories.TestRepository,
	lessonRepo *repositories.LessonRepository,
	progressRepo *repositories.ProgressRepository,
	achievementRepo *repositories.AchievementRepository,
) *TestService {
	return &TestService{
		testRepo:      testRepo,
		lessonRepo:    lessonRepo,
		progressRepo:  progressRepo,
		achievementRepo: achievementRepo,
	}
}

type SubmitTestRequest struct {
	LessonID int
	Answers  map[string]int
	UserID   uint
}

type TestResult struct {
	TestAttempt   *models.TestAttempt
	Progress      *models.LessonProgress
	IsNewProgress bool
}

func (s *TestService) SubmitTest(req SubmitTestRequest) (*TestResult, error) {
	// Получаем урок с вопросами
	lesson, err := s.lessonRepo.FindByIDWithQuestions(uint(req.LessonID), true)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("Урок не найден или неактивен")
		}
		return nil, errors.New("Database error")
	}

	// Проверяем доступность урока
	if lesson.Order > 1 {
		prevLesson, err := s.lessonRepo.FindByOrder(lesson.Order-1, true)
		if err == nil {
			prevProgress, err := s.progressRepo.FindByUserAndLesson(req.UserID, prevLesson.ID)
			if err != nil || !prevProgress.IsCompleted {
				return nil, errors.New("Сначала необходимо пройти предыдущий урок '" + prevLesson.Title + "' с результатом >=70%")
			}
		}
	}

	// Проверяем что все вопросы отвечены
	if len(req.Answers) != len(lesson.Questions) {
		return nil, errors.New("Необходимо ответить на все вопросы")
	}

	// Подсчитываем результаты
	totalQuestions := len(lesson.Questions)
	correctAnswers := 0

	for _, question := range lesson.Questions {
		selectedAnswerID, exists := req.Answers[strconv.Itoa(int(question.ID))]
		if !exists {
			return nil, errors.New("Не все вопросы отвечены")
		}

		for _, answerOption := range question.AnswerOptions {
			if answerOption.ID == uint(selectedAnswerID) {
				if answerOption.IsCorrect {
					correctAnswers++
				}
				break
			}
		}
	}

	percentage := float64(correctAnswers) / float64(totalQuestions) * 100
	isPassed := percentage >= 70

	// Создаем попытку теста
	testAttempt := &models.TestAttempt{
		UserID:         req.UserID,
		LessonID:       uint(req.LessonID),
		Score:          correctAnswers * 10,
		Percentage:     percentage,
		TotalQuestions: totalQuestions,
		CorrectAnswers: correctAnswers,
		IsPassed:       isPassed,
	}

	if err := s.testRepo.Create(testAttempt); err != nil {
		return nil, errors.New("Failed to save test attempt")
	}

	// Обновляем прогресс
	progress, err := s.progressRepo.FindByUserAndLesson(req.UserID, uint(req.LessonID))
	isNewProgress := false

	now := time.Now()
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Создаем новый прогресс
			progress = &models.LessonProgress{
				UserID:         req.UserID,
				LessonID:       uint(req.LessonID),
				BestScore:      testAttempt.Score,
				BestPercentage: percentage,
				AttemptsCount:  1,
				IsCompleted:    isPassed,
				LastAttemptAt:  now,
			}
			if isPassed {
				progress.CompletedAt = &now
			}
			if err := s.progressRepo.Create(progress); err != nil {
				return nil, errors.New("Failed to save progress")
			}
			isNewProgress = true
		} else {
			return nil, errors.New("Database error")
		}
	} else {
		// Обновляем существующий прогресс
		progress.AttemptsCount++
		if testAttempt.Score > progress.BestScore {
			progress.BestScore = testAttempt.Score
			progress.BestPercentage = percentage
		}
		if isPassed && !progress.IsCompleted {
			progress.IsCompleted = true
			progress.CompletedAt = &now
		}
		progress.LastAttemptAt = now
		if err := s.progressRepo.Update(progress); err != nil {
			return nil, errors.New("Failed to update progress")
		}
	}

	// Проверяем достижения
	if isNewProgress && isPassed {
		// Можно добавить проверку достижений здесь
		// s.checkAchievements(req.UserID, lesson)
	}

	return &TestResult{
		TestAttempt:   testAttempt,
		Progress:      progress,
		IsNewProgress: isNewProgress,
	}, nil
}

func (s *TestService) GetAttemptsByUser(userID uint, lessonID *uint) ([]models.TestAttempt, error) {
	return s.testRepo.FindByUserID(userID, lessonID)
}

func (s *TestService) GetAttemptsByLesson(lessonID uint, userID *uint) ([]models.TestAttempt, error) {
	return s.testRepo.FindByLessonID(lessonID, userID)
}

