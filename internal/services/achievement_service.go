package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"errors"
	"time"

	"gorm.io/gorm"
)

type AchievementService struct {
	achievementRepo *repositories.AchievementRepository
	progressRepo    *repositories.ProgressRepository
	lessonRepo      *repositories.LessonRepository
}

func NewAchievementService(
	achievementRepo *repositories.AchievementRepository,
	progressRepo *repositories.ProgressRepository,
	lessonRepo *repositories.LessonRepository,
) *AchievementService {
	return &AchievementService{
		achievementRepo: achievementRepo,
		progressRepo:    progressRepo,
		lessonRepo:      lessonRepo,
	}
}

func (s *AchievementService) GetUserAchievements(userID uint) ([]map[string]interface{}, error) {
	achievements, err := s.achievementRepo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	result := make([]map[string]interface{}, len(achievements))
	for i, a := range achievements {
		title, description, icon := models.GetAchievementInfo(a.Type)
		result[i] = map[string]interface{}{
			"id":          a.ID,
			"type":        a.Type,
			"title":       title,
			"description": description,
			"icon":        icon,
			"earned_at":   a.EarnedAt.Format(time.RFC3339),
		}
	}

	return result, nil
}

func (s *AchievementService) CheckAchievements(userID uint, lessonID uint, percentage float64, isFirstAttempt bool) error {
	// Первый урок
	if lessonID == 1 {
		_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypeFirstLesson)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			title, description, icon := models.GetAchievementInfo(models.AchievementTypeFirstLesson)
			achievement := &models.Achievement{
				UserID:      userID,
				Type:        models.AchievementTypeFirstLesson,
				Title:       title,
				Description: description,
				Icon:        icon,
				EarnedAt:    time.Now(),
			}
			if err := s.achievementRepo.Create(achievement); err != nil {
				return err
			}
		}
	}

	// Идеальный результат (100%)
	if percentage >= 100 {
		_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypePerfectScore)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			title, description, icon := models.GetAchievementInfo(models.AchievementTypePerfectScore)
			achievement := &models.Achievement{
				UserID:      userID,
				Type:        models.AchievementTypePerfectScore,
				Title:       title,
				Description: description,
				Icon:        icon,
				EarnedAt:    time.Now(),
			}
			if err := s.achievementRepo.Create(achievement); err != nil {
				return err
			}
		}
	}

	// Быстрый ученик (первая попытка 90%+)
	if isFirstAttempt && percentage >= 90 {
		_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypeFastLearner)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			title, description, icon := models.GetAchievementInfo(models.AchievementTypeFastLearner)
			achievement := &models.Achievement{
				UserID:      userID,
				Type:        models.AchievementTypeFastLearner,
				Title:       title,
				Description: description,
				Icon:        icon,
				EarnedAt:    time.Now(),
			}
			if err := s.achievementRepo.Create(achievement); err != nil {
				return err
			}
		}
	}

	// Проверка серии побед (3 урока подряд 90%+)
	progress, _ := s.progressRepo.FindByUserID(userID)
	var recentProgress []models.LessonProgress
	for _, p := range progress {
		if p.IsCompleted && p.BestPercentage >= 90.0 {
			recentProgress = append(recentProgress, p)
		}
	}

	// Сортируем по lesson_id DESC и берем последние 3
	if len(recentProgress) >= 3 {
		// Проверяем что это последовательные уроки
		isStreak := true
		for i := 0; i < len(recentProgress)-1; i++ {
			if recentProgress[i].LessonID != recentProgress[i+1].LessonID+1 {
				isStreak = false
				break
			}
		}
		if isStreak {
			_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypeStreak)
			if errors.Is(err, gorm.ErrRecordNotFound) {
				title, description, icon := models.GetAchievementInfo(models.AchievementTypeStreak)
				achievement := &models.Achievement{
					UserID:      userID,
					Type:        models.AchievementTypeStreak,
					Title:       title,
					Description: description,
					Icon:        icon,
					EarnedAt:    time.Now(),
				}
				if err := s.achievementRepo.Create(achievement); err != nil {
					return err
				}
			}
		}
	}

	// Все уроки пройдены
	var totalLessons int64
	if err := s.progressRepo.DB().Model(&models.Lesson{}).
		Where("is_active = ?", true).Count(&totalLessons).Error; err != nil {
		totalLessons = 0
	}

	var completedCount int64
	if err := s.progressRepo.DB().Model(&models.LessonProgress{}).
		Where("user_id = ? AND is_completed = ?", userID, true).
		Count(&completedCount).Error; err != nil {
		completedCount = 0
	}

	if completedCount >= totalLessons && totalLessons > 0 {
		_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypeAllLessons)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			title, description, icon := models.GetAchievementInfo(models.AchievementTypeAllLessons)
			achievement := &models.Achievement{
				UserID:      userID,
				Type:        models.AchievementTypeAllLessons,
				Title:       title,
				Description: description,
				Icon:        icon,
				EarnedAt:    time.Now(),
			}
			if err := s.achievementRepo.Create(achievement); err != nil {
				return err
			}
		}
	}

	// Упорство (10+ попыток на одном уроке)
	progressItem, err := s.progressRepo.FindByUserAndLesson(userID, lessonID)
	if err == nil && progressItem.AttemptsCount >= 10 {
		_, err := s.achievementRepo.FindByUserIDAndType(userID, models.AchievementTypePersistent)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			title, description, icon := models.GetAchievementInfo(models.AchievementTypePersistent)
			achievement := &models.Achievement{
				UserID:      userID,
				Type:        models.AchievementTypePersistent,
				Title:       title,
				Description: description,
				Icon:        icon,
				EarnedAt:    time.Now(),
			}
			if err := s.achievementRepo.Create(achievement); err != nil {
				return err
			}
		}
	}

	return nil
}

