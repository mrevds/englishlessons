package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"errors"
	"time"

	"gorm.io/gorm"
)

type LessonService struct {
	lessonRepo   *repositories.LessonRepository
	progressRepo *repositories.ProgressRepository
}

func NewLessonService(
	lessonRepo *repositories.LessonRepository,
	progressRepo *repositories.ProgressRepository,
) *LessonService {
	return &LessonService{
		lessonRepo:   lessonRepo,
		progressRepo: progressRepo,
	}
}

func (s *LessonService) GetLessons(userID uint) ([]map[string]interface{}, error) {
	lessons, err := s.lessonRepo.FindAll(true)
	if err != nil {
		return nil, err
	}

	progress, err := s.progressRepo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	progressMap := make(map[uint]*models.LessonProgress)
	for i := range progress {
		progressMap[progress[i].LessonID] = &progress[i]
	}

	result := make([]map[string]interface{}, len(lessons))
	for i, lesson := range lessons {
		var lp *models.LessonProgress
		if p, exists := progressMap[lesson.ID]; exists {
			lp = p
		}

		lessonData := map[string]interface{}{
			"id":          lesson.ID,
			"title":       lesson.Title,
			"description": lesson.Description,
			"order":       lesson.Order,
		}

		if lp != nil {
			completedAt := ""
			if lp.CompletedAt != nil {
				completedAt = lp.CompletedAt.Format(time.RFC3339)
			}

			lessonData["progress"] = map[string]interface{}{
				"is_completed":    lp.IsCompleted,
				"best_percentage":  lp.BestPercentage,
				"best_score":      lp.BestScore,
				"attempts_count": lp.AttemptsCount,
				"completed_at":    completedAt,
				"last_attempt_at": lp.LastAttemptAt.Format(time.RFC3339),
			}
		}

		result[i] = lessonData
	}

	return result, nil
}

func (s *LessonService) GetLesson(lessonID uint, userID uint) (*models.Lesson, map[string]interface{}, error) {
	lesson, err := s.lessonRepo.FindByIDWithQuestions(lessonID, true)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, errors.New("Lesson not found")
		}
		return nil, nil, err
	}

	// Проверяем доступность урока (только для студентов)
	if userID > 0 && lesson.Order > 1 {
		prevLesson, err := s.lessonRepo.FindByOrder(lesson.Order-1, true)
		if err == nil {
			prevProgress, err := s.progressRepo.FindByUserAndLesson(userID, prevLesson.ID)
			if err != nil || !prevProgress.IsCompleted {
				return nil, nil, errors.New("Сначала необходимо пройти предыдущий урок '" + prevLesson.Title + "' с результатом >=70%")
			}
		}
	}

	progress, _ := s.progressRepo.FindByUserAndLesson(userID, lessonID)

	progressData := map[string]interface{}{}
	if progress != nil {
		completedAt := ""
		if progress.CompletedAt != nil {
			completedAt = progress.CompletedAt.Format(time.RFC3339)
		}

		progressData = map[string]interface{}{
			"is_completed":    progress.IsCompleted,
			"best_percentage":  progress.BestPercentage,
			"best_score":      progress.BestScore,
			"attempts_count":  progress.AttemptsCount,
			"completed_at":    completedAt,
			"last_attempt_at": progress.LastAttemptAt.Format(time.RFC3339),
		}
	}

	return lesson, progressData, nil
}

func (s *LessonService) GetLessonQuestions(lessonID uint) ([]models.Question, error) {
	return s.lessonRepo.FindQuestionsByLessonID(lessonID)
}

func (s *LessonService) GetUserProgress(userID uint) ([]map[string]interface{}, error) {
	progress, err := s.progressRepo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	result := make([]map[string]interface{}, len(progress))
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

		result[i] = map[string]interface{}{
			"lesson_id":       p.LessonID,
			"lesson_title":    lessonTitle,
			"lesson_order":    lessonOrder,
			"best_percentage": p.BestPercentage,
			"best_score":      p.BestScore,
			"attempts_count":  p.AttemptsCount,
			"is_completed":    p.IsCompleted,
			"completed_at":    completedAt,
			"last_attempt_at": p.LastAttemptAt.Format(time.RFC3339),
		}
	}

	return result, nil
}

