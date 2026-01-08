package models

import (
	"time"

	"gorm.io/gorm"
)

type Lesson struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `json:"description"`
	Order       int       `gorm:"uniqueIndex;not null;column:order" json:"order"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`

	Questions []Question `gorm:"foreignKey:LessonID" json:"questions,omitempty"`
}

type Question struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	LessonID    uint      `gorm:"not null;index" json:"lesson_id"`
	Text        string    `gorm:"type:text;not null" json:"text"`
	Order       int       `gorm:"not null" json:"order"`
	CreatedAt   time.Time `json:"created_at"`

	Lesson        Lesson         `gorm:"foreignKey:LessonID" json:"-"`
	AnswerOptions []AnswerOption `gorm:"foreignKey:QuestionID" json:"answer_options,omitempty"`
}

type AnswerOption struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	QuestionID uint   `gorm:"not null;index" json:"question_id"`
	Text       string `gorm:"type:varchar(500);not null" json:"text"`
	IsCorrect  bool   `gorm:"default:false" json:"is_correct"`
	Order      int    `gorm:"not null" json:"order"`

	Question Question `gorm:"foreignKey:QuestionID" json:"-"`
}

type TestAttempt struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	UserID         uint      `gorm:"not null;index" json:"user_id"`
	LessonID       uint      `gorm:"not null;index" json:"lesson_id"`
	Score          int       `gorm:"not null" json:"score"`
	Percentage     float64   `gorm:"not null" json:"percentage"`
	TotalQuestions int       `gorm:"not null" json:"total_questions"`
	CorrectAnswers int       `gorm:"not null" json:"correct_answers"`
	IsPassed       bool      `gorm:"default:false" json:"is_passed"`
	CreatedAt      time.Time `json:"created_at"`

	User   User   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Lesson Lesson `gorm:"foreignKey:LessonID" json:"lesson,omitempty"`
}

type LessonProgress struct {
	ID             uint       `gorm:"primaryKey" json:"id"`
	UserID         uint       `gorm:"not null;index;uniqueIndex:idx_user_lesson" json:"user_id"`
	LessonID       uint       `gorm:"not null;index;uniqueIndex:idx_user_lesson" json:"lesson_id"`
	BestScore       int       `gorm:"default:0" json:"best_score"`
	BestPercentage  float64   `gorm:"default:0" json:"best_percentage"`
	AttemptsCount   int       `gorm:"default:0" json:"attempts_count"`
	IsCompleted     bool      `gorm:"default:false" json:"is_completed"`
	CompletedAt     *time.Time `json:"completed_at"`
	LastAttemptAt   time.Time  `json:"last_attempt_at"`

	User   User   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Lesson Lesson `gorm:"foreignKey:LessonID" json:"lesson,omitempty"`
}

