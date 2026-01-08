package models

import (
	"time"
)

// GameType представляет тип игры
type GameType string

const (
	GameGrammarDetective GameType = "grammar-detective"
	GameSentenceBuilder  GameType = "sentence-builder"
	GameMemoryCards      GameType = "memory-cards"
	GameFillGapRace      GameType = "fill-gap-race"
	GameQuizShow         GameType = "quiz-show"
)

// GameResult хранит результаты игры пользователя
type GameResult struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	UserID       uint      `gorm:"index;not null" json:"user_id"`
	User         User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	GameType     GameType  `gorm:"type:varchar(50);not null;index" json:"game_type"`
	Level        int       `gorm:"not null;index" json:"level"`
	Score        int       `gorm:"not null" json:"score"`
	MaxScore     int       `gorm:"not null" json:"max_score"`
	Percentage   float64   `gorm:"not null" json:"percentage"`
	TimeSpent    int       `gorm:"not null" json:"time_spent"` // в секундах
	CorrectCount int       `gorm:"not null" json:"correct_count"`
	TotalCount   int       `gorm:"not null" json:"total_count"`
	CreatedAt    time.Time `json:"created_at"`
}

// GameStats агрегированная статистика по игре
type GameStats struct {
	GameType       GameType   `json:"game_type"`
	Level          int        `json:"level"`
	TotalAttempts  int        `json:"total_attempts"`
	BestScore      int        `json:"best_score"`
	BestPercentage float64    `json:"best_percentage"`
	AvgScore       float64    `json:"avg_score"`
	AvgPercentage  float64    `json:"avg_percentage"`
	AvgTime        float64    `json:"avg_time"`
	LastPlayed     *time.Time `json:"last_played"`
}

// UserGameSummary суммарная статистика пользователя по играм
type UserGameSummary struct {
	TotalGames      int              `json:"total_games"`
	TotalTime       int              `json:"total_time"`
	AvgPercentage   float64          `json:"avg_percentage"`
	GamesPlayed     map[GameType]int `json:"games_played"`
	LevelsCompleted int              `json:"levels_completed"`
}

// ClassGameStats статистика по играм для класса (для учителя)
type ClassGameStats struct {
	StudentID     uint       `json:"student_id"`
	StudentName   string     `json:"student_name"`
	TotalGames    int        `json:"total_games"`
	AvgPercentage float64    `json:"avg_percentage"`
	TotalTime     int        `json:"total_time"`
	FavoriteGame  string     `json:"favorite_game"`
	LastActivity  *time.Time `json:"last_activity"`
}
