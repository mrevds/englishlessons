package database

import (
	"fmt"

	"englishlessons.back/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Connect(databaseURL string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}

func Migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Lesson{},
		&models.Question{},
		&models.AnswerOption{},
		&models.TestAttempt{},
		&models.LessonProgress{},
		&models.Achievement{},
		&models.GameResult{},
	)
}
