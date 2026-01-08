package repositories

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

type GameResultRepository struct {
	db *gorm.DB
}

func NewGameResultRepository(db *gorm.DB) *GameResultRepository {
	return &GameResultRepository{db: db}
}

// Create сохраняет новый результат игры
func (r *GameResultRepository) Create(result *models.GameResult) error {
	return r.db.Create(result).Error
}

// GetByUserID получает все результаты пользователя
func (r *GameResultRepository) GetByUserID(userID uint) ([]models.GameResult, error) {
	var results []models.GameResult
	err := r.db.Where("user_id = ?", userID).Order("created_at DESC").Find(&results).Error
	return results, err
}

// GetByUserAndGame получает результаты пользователя по конкретной игре
func (r *GameResultRepository) GetByUserAndGame(userID uint, gameType models.GameType) ([]models.GameResult, error) {
	var results []models.GameResult
	err := r.db.Where("user_id = ? AND game_type = ?", userID, gameType).
		Order("created_at DESC").Find(&results).Error
	return results, err
}

// GetByUserGameLevel получает результаты пользователя по игре и уровню
func (r *GameResultRepository) GetByUserGameLevel(userID uint, gameType models.GameType, level int) ([]models.GameResult, error) {
	var results []models.GameResult
	err := r.db.Where("user_id = ? AND game_type = ? AND level = ?", userID, gameType, level).
		Order("created_at DESC").Find(&results).Error
	return results, err
}

// GetBestByUserGameLevel получает лучший результат пользователя по игре и уровню
func (r *GameResultRepository) GetBestByUserGameLevel(userID uint, gameType models.GameType, level int) (*models.GameResult, error) {
	var result models.GameResult
	err := r.db.Where("user_id = ? AND game_type = ? AND level = ?", userID, gameType, level).
		Order("percentage DESC, time_spent ASC").First(&result).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &result, err
}

// GetUserStats получает статистику пользователя по всем играм
func (r *GameResultRepository) GetUserStats(userID uint) ([]models.GameStats, error) {
	var stats []models.GameStats

	err := r.db.Model(&models.GameResult{}).
		Select(`
			game_type,
			level,
			COUNT(*) as total_attempts,
			MAX(score) as best_score,
			MAX(percentage) as best_percentage,
			AVG(score) as avg_score,
			AVG(percentage) as avg_percentage,
			AVG(time_spent) as avg_time,
			MAX(created_at) as last_played
		`).
		Where("user_id = ?", userID).
		Group("game_type, level").
		Order("game_type, level").
		Scan(&stats).Error

	return stats, err
}

// GetUserSummary получает общую сводку по играм пользователя
func (r *GameResultRepository) GetUserSummary(userID uint) (*models.UserGameSummary, error) {
	summary := &models.UserGameSummary{
		GamesPlayed: make(map[models.GameType]int),
	}

	// Общее количество игр и время
	var totalStats struct {
		TotalGames    int
		TotalTime     int
		AvgPercentage float64
	}
	err := r.db.Model(&models.GameResult{}).
		Select("COUNT(*) as total_games, SUM(time_spent) as total_time, AVG(percentage) as avg_percentage").
		Where("user_id = ?", userID).
		Scan(&totalStats).Error
	if err != nil {
		return nil, err
	}

	summary.TotalGames = totalStats.TotalGames
	summary.TotalTime = totalStats.TotalTime
	summary.AvgPercentage = totalStats.AvgPercentage

	// Количество игр по типам
	var gameTypeCounts []struct {
		GameType models.GameType
		Count    int
	}
	err = r.db.Model(&models.GameResult{}).
		Select("game_type, COUNT(*) as count").
		Where("user_id = ?", userID).
		Group("game_type").
		Scan(&gameTypeCounts).Error
	if err != nil {
		return nil, err
	}

	for _, gc := range gameTypeCounts {
		summary.GamesPlayed[gc.GameType] = gc.Count
	}

	// Количество пройденных уровней (уникальные комбинации игра+уровень с >= 70%)
	var levelsCompleted int64
	err = r.db.Model(&models.GameResult{}).
		Select("DISTINCT game_type, level").
		Where("user_id = ? AND percentage >= 70", userID).
		Group("game_type, level").
		Count(&levelsCompleted).Error
	if err != nil {
		return nil, err
	}
	summary.LevelsCompleted = int(levelsCompleted)

	return summary, nil
}

// GetClassStats получает статистику по играм для класса (для учителя)
func (r *GameResultRepository) GetClassStats(level *int, levelLetter string) ([]models.ClassGameStats, error) {
	var stats []models.ClassGameStats

	query := r.db.Model(&models.GameResult{}).
		Select(`
			users.id as student_id,
			CONCAT(users.first_name, ' ', users.last_name) as student_name,
			COUNT(game_results.id) as total_games,
			AVG(game_results.percentage) as avg_percentage,
			SUM(game_results.time_spent) as total_time,
			MAX(game_results.created_at) as last_activity
		`).
		Joins("JOIN users ON users.id = game_results.user_id").
		Where("users.role = ?", models.RoleStudent)

	if level != nil {
		query = query.Where("users.level = ?", *level)
	}
	if levelLetter != "" {
		query = query.Where("users.level_letter = ?", levelLetter)
	}

	err := query.Group("users.id, users.first_name, users.last_name").
		Order("avg_percentage DESC").
		Scan(&stats).Error

	// Получаем любимую игру для каждого студента
	for i := range stats {
		var favoriteGame struct {
			GameType models.GameType
			Count    int
		}
		r.db.Model(&models.GameResult{}).
			Select("game_type, COUNT(*) as count").
			Where("user_id = ?", stats[i].StudentID).
			Group("game_type").
			Order("count DESC").
			Limit(1).
			Scan(&favoriteGame)
		stats[i].FavoriteGame = string(favoriteGame.GameType)
	}

	return stats, err
}

// GetLeaderboard получает рейтинг по игре и уровню
func (r *GameResultRepository) GetLeaderboard(gameType models.GameType, level int, limit int) ([]models.GameResult, error) {
	var results []models.GameResult

	// Подзапрос для получения лучших результатов каждого пользователя
	subQuery := r.db.Model(&models.GameResult{}).
		Select("user_id, MAX(percentage) as max_percentage").
		Where("game_type = ? AND level = ?", gameType, level).
		Group("user_id")

	err := r.db.Model(&models.GameResult{}).
		Joins("JOIN (?) as best ON game_results.user_id = best.user_id AND game_results.percentage = best.max_percentage", subQuery).
		Where("game_results.game_type = ? AND game_results.level = ?", gameType, level).
		Preload("User").
		Order("game_results.percentage DESC, game_results.time_spent ASC").
		Limit(limit).
		Find(&results).Error

	return results, err
}

// GetRecentResults получает последние результаты (для учителя)
func (r *GameResultRepository) GetRecentResults(limit int, level *int, levelLetter string) ([]models.GameResult, error) {
	var results []models.GameResult

	query := r.db.Model(&models.GameResult{}).
		Preload("User").
		Joins("JOIN users ON users.id = game_results.user_id").
		Where("users.role = ?", models.RoleStudent)

	if level != nil {
		query = query.Where("users.level = ?", *level)
	}
	if levelLetter != "" {
		query = query.Where("users.level_letter = ?", levelLetter)
	}

	err := query.Order("game_results.created_at DESC").
		Limit(limit).
		Find(&results).Error

	return results, err
}
