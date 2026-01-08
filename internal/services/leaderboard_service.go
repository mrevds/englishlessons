package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"errors"
	"sort"
	"strconv"
	"strings"
)

type LeaderboardService struct {
	userRepo     *repositories.UserRepository
	progressRepo *repositories.ProgressRepository
}

func NewLeaderboardService(
	userRepo *repositories.UserRepository,
	progressRepo *repositories.ProgressRepository,
) *LeaderboardService {
	return &LeaderboardService{
		userRepo:     userRepo,
		progressRepo: progressRepo,
	}
}

type LeaderboardEntry struct {
	UserID            uint    `json:"user_id"`
	Username          string  `json:"username"`
	FullName          string  `json:"full_name"`
	ClassDisplay      string  `json:"class_display"`
	TotalPoints       int     `json:"total_points"`
	CompletedLessons  int     `json:"completed_lessons"`
	AveragePercentage float64 `json:"average_percentage"`
	Rank              int     `json:"rank"`
}

func (s *LeaderboardService) GetLeaderboard(userID uint, userRole string, filters map[string]string) ([]LeaderboardEntry, error) {
	// Получаем пользователя для фильтрации по классу
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return nil, errors.New("User not found")
	}

	// Фильтр по классу (для студентов - только их класс)
	repoFilters := make(map[string]interface{})
	if userRole == string(models.RoleStudent) && user.Level != nil {
		repoFilters["level"] = *user.Level
		repoFilters["level_letter"] = user.LevelLetter
	}

	// Дополнительные фильтры из query параметров
	if levelStr := filters["level"]; levelStr != "" {
		if levelInt, err := strconv.Atoi(levelStr); err == nil && levelInt >= 1 && levelInt <= 11 {
			repoFilters["level"] = levelInt
		}
	}

	if levelLetter := filters["level_letter"]; levelLetter != "" {
		levelLetter = strings.TrimSpace(strings.ToUpper(levelLetter))
		if len([]rune(levelLetter)) == 1 {
			repoFilters["level_letter"] = levelLetter
		}
	}

	students, err := s.userRepo.FindStudents(repoFilters)
	if err != nil {
		return nil, err
	}

	// Подсчитываем статистику для каждого студента
	type StudentStats struct {
		UserID            uint
		TotalPoints       int
		CompletedLessons  int
		AveragePercentage float64
	}

	statsMap := make(map[uint]*StudentStats)
	for _, student := range students {
		progress, _ := s.progressRepo.FindByUserID(student.ID)

		totalPoints := 0
		completedLessons := 0
		var completedProgress []models.LessonProgress

		for _, p := range progress {
			totalPoints += p.BestScore
			if p.IsCompleted {
				completedLessons++
				completedProgress = append(completedProgress, p)
			}
		}

		avgPercentage := 0.0
		if len(completedProgress) > 0 {
			sum := 0.0
			for _, p := range completedProgress {
				sum += p.BestPercentage
			}
			avgPercentage = sum / float64(len(completedProgress))
		}

		statsMap[student.ID] = &StudentStats{
			UserID:            student.ID,
			TotalPoints:       totalPoints,
			CompletedLessons:  completedLessons,
			AveragePercentage: avgPercentage,
		}
	}

	// Сортируем по total_points
	leaderboard := make([]LeaderboardEntry, 0, len(students))
	for _, student := range students {
		stats := statsMap[student.ID]
		leaderboard = append(leaderboard, LeaderboardEntry{
			UserID:            student.ID,
			Username:          student.Username,
			FullName:          student.GetFullName(),
			ClassDisplay:      student.GetClassDisplay(),
			TotalPoints:       stats.TotalPoints,
			CompletedLessons:  stats.CompletedLessons,
			AveragePercentage: stats.AveragePercentage,
		})
	}

	// Сортируем по total_points (по убыванию)
	sort.Slice(leaderboard, func(i, j int) bool {
		if leaderboard[i].TotalPoints != leaderboard[j].TotalPoints {
			return leaderboard[i].TotalPoints > leaderboard[j].TotalPoints
		}
		return leaderboard[i].AveragePercentage > leaderboard[j].AveragePercentage
	})

	// Добавляем ранги
	for i := range leaderboard {
		leaderboard[i].Rank = i + 1
	}

	return leaderboard, nil
}

