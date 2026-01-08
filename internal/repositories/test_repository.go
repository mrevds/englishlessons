package repositories

import (
	"englishlessons.back/internal/models"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type TestRepository struct {
	db *gorm.DB
}

func NewTestRepository(db *gorm.DB) *TestRepository {
	return &TestRepository{db: db}
}

func (r *TestRepository) Create(attempt *models.TestAttempt) error {
	return r.db.Create(attempt).Error
}

func (r *TestRepository) FindByUserID(userID uint, lessonID *uint) ([]models.TestAttempt, error) {
	var attempts []models.TestAttempt
	query := r.db.Preload("User").Preload("Lesson").Where("user_id = ?", userID)
	if lessonID != nil {
		query = query.Where("lesson_id = ?", *lessonID)
	}
	if err := query.Order("created_at DESC").Find(&attempts).Error; err != nil {
		return nil, err
	}
	return attempts, nil
}

func (r *TestRepository) FindByLessonID(lessonID uint, userID *uint) ([]models.TestAttempt, error) {
	var attempts []models.TestAttempt
	query := r.db.Preload("User").Preload("Lesson").Where("lesson_id = ?", lessonID)
	if userID != nil {
		query = query.Where("user_id = ?", *userID)
	}
	if err := query.Order("created_at DESC").Find(&attempts).Error; err != nil {
		return nil, err
	}
	return attempts, nil
}

// GetClassActivityStats получает статистику активности классов за период
func (r *TestRepository) GetClassActivityStats(startDate, endDate time.Time) ([]map[string]interface{}, error) {
	type Result struct {
		Level       *int   `json:"level"`
		LevelLetter string `json:"level_letter"`
		Count       int64  `json:"count"`
		Date        string `json:"date"`
	}

	var results []Result
	err := r.db.Model(&models.TestAttempt{}).
		Select("users.level, users.level_letter, DATE(test_attempts.created_at)::text as date, COUNT(*) as count").
		Joins("JOIN users ON test_attempts.user_id = users.id").
		Where("users.role = ?", models.RoleStudent).
		Where("test_attempts.created_at >= ? AND test_attempts.created_at <= ?", startDate, endDate).
		Group("users.level, users.level_letter, DATE(test_attempts.created_at)").
		Order("date DESC, users.level, users.level_letter").
		Scan(&results).Error

	if err != nil {
		return nil, err
	}

	stats := make([]map[string]interface{}, len(results))
	for i, r := range results {
		classDisplay := ""
		if r.Level != nil {
			classDisplay = fmt.Sprintf("%d-%s", *r.Level, r.LevelLetter)
		}
		stats[i] = map[string]interface{}{
			"level":        r.Level,
			"level_letter": r.LevelLetter,
			"class_display": classDisplay,
			"count":        r.Count,
			"date":         r.Date,
		}
	}

	return stats, nil
}

