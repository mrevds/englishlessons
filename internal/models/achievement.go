package models

import (
	"time"
)

type AchievementType string

const (
	AchievementTypeFirstLesson  AchievementType = "first_lesson"
	AchievementTypePerfectScore AchievementType = "perfect_score"
	AchievementTypeStreak       AchievementType = "streak"
	AchievementTypeAllLessons   AchievementType = "all_lessons"
	AchievementTypeFastLearner  AchievementType = "fast_learner"
	AchievementTypePersistent   AchievementType = "persistent"
)

type Achievement struct {
	ID          uint            `gorm:"primaryKey" json:"id"`
	UserID      uint            `gorm:"not null;index" json:"user_id"`
	Type        AchievementType `gorm:"type:varchar(50);not null" json:"type"`
	Title       string          `gorm:"not null" json:"title"`
	Description string          `json:"description"`
	Icon        string          `json:"icon"`
	EarnedAt    time.Time       `json:"earned_at"`

	User User `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func GetAchievementInfo(achievementType AchievementType) (title, description, icon string) {
	switch achievementType {
	case AchievementTypeFirstLesson:
		return "Первый шаг", "Пройден первый урок", "🎯"
	case AchievementTypePerfectScore:
		return "Идеально!", "100% правильных ответов в тесте", "⭐"
	case AchievementTypeStreak:
		return "Серия побед", "3 урока подряд на 90%+", "🔥"
	case AchievementTypeAllLessons:
		return "Мастер", "Пройдены все уроки", "👑"
	case AchievementTypeFastLearner:
		return "Быстрый ученик", "Пройден урок с первой попытки на 90%+", "⚡"
	case AchievementTypePersistent:
		return "Упорство", "10+ попыток прохождения теста", "💪"
	default:
		return "Достижение", "Новое достижение", "🏆"
	}
}
