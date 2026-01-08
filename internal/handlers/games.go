package handlers

import (
	"net/http"
	"strconv"

	"englishlessons.back/internal/services"
	"github.com/gin-gonic/gin"
)

// SubmitGameResult сохраняет результат игры
func (h *Handlers) SubmitGameResult(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var req services.SubmitGameResultRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := h.gameResultService.SubmitResult(userID, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save game result"})
		return
	}

	c.JSON(http.StatusCreated, result)
}

// GetMyGameResults получает результаты текущего пользователя
func (h *Handlers) GetMyGameResults(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	gameType := c.Query("game_type")
	var level *int
	if levelStr := c.Query("level"); levelStr != "" {
		if l, err := strconv.Atoi(levelStr); err == nil {
			level = &l
		}
	}

	results, err := h.gameResultService.GetUserResults(userID, gameType, level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get results"})
		return
	}

	c.JSON(http.StatusOK, results)
}

// GetMyGameStats получает статистику текущего пользователя
func (h *Handlers) GetMyGameStats(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	stats, err := h.gameResultService.GetUserStats(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetMyGameSummary получает сводку по играм
func (h *Handlers) GetMyGameSummary(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	summary, err := h.gameResultService.GetUserSummary(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get summary"})
		return
	}

	c.JSON(http.StatusOK, summary)
}

// GetBestGameResult получает лучший результат
func (h *Handlers) GetBestGameResult(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	gameType := c.Query("game_type")
	levelStr := c.Query("level")
	if gameType == "" || levelStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "game_type and level are required"})
		return
	}

	level, err := strconv.Atoi(levelStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid level"})
		return
	}

	result, err := h.gameResultService.GetBestResult(userID, gameType, level)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get best result"})
		return
	}

	if result == nil {
		c.JSON(http.StatusOK, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

// GetGameLeaderboard получает рейтинг по игре
func (h *Handlers) GetGameLeaderboard(c *gin.Context) {
	gameType := c.Query("game_type")
	levelStr := c.Query("level")
	if gameType == "" || levelStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "game_type and level are required"})
		return
	}

	level, err := strconv.Atoi(levelStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid level"})
		return
	}

	limit := 10
	if limitStr := c.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil {
			limit = l
		}
	}

	results, err := h.gameResultService.GetLeaderboard(gameType, level, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get leaderboard"})
		return
	}

	c.JSON(http.StatusOK, results)
}

// GetClassGameStats получает статистику по играм для класса
// Учителя видят всех студентов, ученики видят только свой класс
func (h *Handlers) GetClassGameStats(c *gin.Context) {
	role := c.GetString("role")
	userID := c.GetUint("user_id")

	var level *int
	var levelLetter string

	if role == "teacher" {
		// Учитель может фильтровать по любому классу
		if levelStr := c.Query("level"); levelStr != "" {
			if l, err := strconv.Atoi(levelStr); err == nil {
				level = &l
			}
		}
		levelLetter = c.Query("level_letter")
	} else {
		// Ученик видит только свой класс - получаем его данные
		user, err := h.userService.GetUserByID(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
			return
		}
		if user.Level != nil {
			level = user.Level
		}
		levelLetter = user.LevelLetter
	}

	stats, err := h.gameResultService.GetClassStats(level, levelLetter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get class stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetRecentGameResults получает последние результаты (для учителей)
func (h *Handlers) GetRecentGameResults(c *gin.Context) {
	role := c.GetString("role")
	if role != "teacher" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Teacher access required"})
		return
	}

	limit := 20
	if limitStr := c.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil {
			limit = l
		}
	}

	var level *int
	if levelStr := c.Query("level"); levelStr != "" {
		if l, err := strconv.Atoi(levelStr); err == nil {
			level = &l
		}
	}
	levelLetter := c.Query("level_letter")

	results, err := h.gameResultService.GetRecentResults(limit, level, levelLetter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recent results"})
		return
	}

	c.JSON(http.StatusOK, results)
}

// GetStudentGameStats получает статистику игр конкретного студента (для учителей)
func (h *Handlers) GetStudentGameStats(c *gin.Context) {
	role := c.GetString("role")
	if role != "teacher" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Teacher access required"})
		return
	}

	studentIDStr := c.Param("id")
	studentID, err := strconv.ParseUint(studentIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid student ID"})
		return
	}

	stats, err := h.gameResultService.GetUserStats(uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get student stats"})
		return
	}

	summary, err := h.gameResultService.GetUserSummary(uint(studentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get student summary"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"stats":   stats,
		"summary": summary,
	})
}
