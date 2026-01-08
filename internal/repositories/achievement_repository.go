package repositories

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

type AchievementRepository struct {
	db *gorm.DB
}

func NewAchievementRepository(db *gorm.DB) *AchievementRepository {
	return &AchievementRepository{db: db}
}

func (r *AchievementRepository) FindByUserID(userID uint) ([]models.Achievement, error) {
	var achievements []models.Achievement
	if err := r.db.Where("user_id = ?", userID).
		Order("earned_at DESC").
		Find(&achievements).Error; err != nil {
		return nil, err
	}
	return achievements, nil
}

func (r *AchievementRepository) FindByUserIDAndType(userID uint, achievementType models.AchievementType) (*models.Achievement, error) {
	var achievement models.Achievement
	err := r.db.Where("user_id = ? AND type = ?", userID, achievementType).First(&achievement).Error
	if err != nil {
		return nil, err
	}
	return &achievement, nil
}

func (r *AchievementRepository) Create(achievement *models.Achievement) error {
	return r.db.Create(achievement).Error
}

