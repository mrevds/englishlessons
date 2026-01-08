package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handlers) GetLeaderboard(c *gin.Context) {
	userID, _ := c.Get("user_id")
	role, _ := c.Get("role")

	filters := make(map[string]string)
	if level := c.Query("level"); level != "" {
		filters["level"] = level
	}
	if levelLetter := c.Query("level_letter"); levelLetter != "" {
		filters["level_letter"] = levelLetter
	}

	leaderboard, err := h.leaderboardService.GetLeaderboard(userID.(uint), role.(string), filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get leaderboard"})
		return
	}

	c.JSON(http.StatusOK, leaderboard)
}
