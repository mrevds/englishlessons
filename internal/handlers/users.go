package handlers

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/services"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func (h *Handlers) GetStudents(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только учителя могут видеть список учеников"})
		return
	}

	filters := make(map[string]string)
	if level := c.Query("level"); level != "" {
		filters["level"] = level
	}
	if levelLetter := c.Query("level_letter"); levelLetter != "" {
		filters["level_letter"] = levelLetter
	}

	users, err := h.userService.GetStudents(filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get students"})
		return
	}

	students := make([]gin.H, len(users))
	for i, u := range users {
		students[i] = gin.H{
			"id":            u.ID,
			"username":      u.Username,
			"full_name":     u.GetFullName(),
			"first_name":    u.FirstName,
			"last_name":     u.LastName,
			"email":         u.Email,
			"class_display": u.GetClassDisplay(),
			"level":         u.Level,
			"level_letter":  u.LevelLetter,
		}
	}

	c.JSON(http.StatusOK, students)
}

func (h *Handlers) GetMyStats(c *gin.Context) {
	userID, _ := c.Get("user_id")

	stats, err := h.userService.GetUserStats(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func (h *Handlers) GetStudentStats(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только учителя могут просматривать статистику других пользователей"})
		return
	}

	studentID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil || studentID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID студента"})
		return
	}

	stats, err := h.userService.GetStudentStats(uint(studentID))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, stats)
}

type ResetPasswordRequest struct {
	Username string `json:"username" binding:"required"`
}

func (h *Handlers) ResetStudentPassword(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только учителя могут сбрасывать пароли студентов"})
		return
	}

	var req ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	// Валидация username
	req.Username = strings.TrimSpace(req.Username)
	if req.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username обязателен"})
		return
	}

	// Сбрасываем пароль
	newPassword, err := h.userService.ResetStudentPassword(req.Username)
	if err != nil {
		if strings.Contains(err.Error(), "не найден") {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else if strings.Contains(err.Error(), "только студентам") {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Пароль успешно сброшен",
		"username":    req.Username,
		"new_password": newPassword,
	})
}

type UpdateProfileRequest struct {
	Email       *string `json:"email"`
	Level       *int    `json:"level"`
	LevelLetter *string `json:"level_letter"`
}

func (h *Handlers) UpdateProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	err := h.userService.UpdateProfile(userID.(uint), services.UpdateProfileRequest{
		Email:       req.Email,
		Level:       req.Level,
		LevelLetter: req.LevelLetter,
	})
	if err != nil {
		if strings.Contains(err.Error(), "неверный формат") {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Профиль успешно обновлен"})
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

func (h *Handlers) ChangePassword(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req ChangePasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	err := h.userService.ChangePassword(userID.(uint), services.ChangePasswordRequest{
		OldPassword: req.OldPassword,
		NewPassword: req.NewPassword,
	})
	if err != nil {
		if strings.Contains(err.Error(), "неверный") {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Пароль успешно изменен"})
}

