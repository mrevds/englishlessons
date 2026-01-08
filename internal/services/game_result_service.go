package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
)

type GameResultService struct {
	gameResultRepo *repositories.GameResultRepository
}

func NewGameResultService(gameResultRepo *repositories.GameResultRepository) *GameResultService {
	return &GameResultService{
		gameResultRepo: gameResultRepo,
	}
}

// SubmitGameResultRequest запрос на сохранение результата игры
type SubmitGameResultRequest struct {
	GameType     string `json:"game_type" binding:"required"`
	Level        int    `json:"level" binding:"gte=0,lte=10"`
	Score        int    `json:"score" binding:"gte=0"`
	MaxScore     int    `json:"max_score" binding:"required,min=1"`
	TimeSpent    int    `json:"time_spent" binding:"gte=0"`
	CorrectCount int    `json:"correct_count" binding:"gte=0"`
	TotalCount   int    `json:"total_count" binding:"required,min=1"`
}

// SubmitResult сохраняет результат игры
func (s *GameResultService) SubmitResult(userID uint, req SubmitGameResultRequest) (*models.GameResult, error) {
	// Вычисляем процент
	percentage := float64(req.CorrectCount) / float64(req.TotalCount) * 100

	result := &models.GameResult{
		UserID:       userID,
		GameType:     models.GameType(req.GameType),
		Level:        req.Level,
		Score:        req.Score,
		MaxScore:     req.MaxScore,
		Percentage:   percentage,
		TimeSpent:    req.TimeSpent,
		CorrectCount: req.CorrectCount,
		TotalCount:   req.TotalCount,
	}

	err := s.gameResultRepo.Create(result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

// GetUserResults получает результаты пользователя
func (s *GameResultService) GetUserResults(userID uint, gameType string, level *int) ([]models.GameResult, error) {
	if gameType != "" && level != nil {
		return s.gameResultRepo.GetByUserGameLevel(userID, models.GameType(gameType), *level)
	}
	if gameType != "" {
		return s.gameResultRepo.GetByUserAndGame(userID, models.GameType(gameType))
	}
	return s.gameResultRepo.GetByUserID(userID)
}

// GetUserStats получает статистику пользователя
func (s *GameResultService) GetUserStats(userID uint) ([]models.GameStats, error) {
	return s.gameResultRepo.GetUserStats(userID)
}

// GetUserSummary получает сводку пользователя
func (s *GameResultService) GetUserSummary(userID uint) (*models.UserGameSummary, error) {
	return s.gameResultRepo.GetUserSummary(userID)
}

// GetBestResult получает лучший результат
func (s *GameResultService) GetBestResult(userID uint, gameType string, level int) (*models.GameResult, error) {
	return s.gameResultRepo.GetBestByUserGameLevel(userID, models.GameType(gameType), level)
}

// GetClassStats получает статистику класса (для учителя)
func (s *GameResultService) GetClassStats(level *int, levelLetter string) ([]models.ClassGameStats, error) {
	return s.gameResultRepo.GetClassStats(level, levelLetter)
}

// GetLeaderboard получает рейтинг по игре
func (s *GameResultService) GetLeaderboard(gameType string, level int, limit int) ([]models.GameResult, error) {
	if limit <= 0 {
		limit = 10
	}
	return s.gameResultRepo.GetLeaderboard(models.GameType(gameType), level, limit)
}

// GetRecentResults получает последние результаты (для учителя)
func (s *GameResultService) GetRecentResults(limit int, level *int, levelLetter string) ([]models.GameResult, error) {
	if limit <= 0 {
		limit = 20
	}
	return s.gameResultRepo.GetRecentResults(limit, level, levelLetter)
}
