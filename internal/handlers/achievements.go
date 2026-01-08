package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handlers) GetMyAchievements(c *gin.Context) {
	userID, _ := c.Get("user_id")

	achievements, err := h.achievementService.GetUserAchievements(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get achievements"})
		return
	}

	c.JSON(http.StatusOK, achievements)
}

