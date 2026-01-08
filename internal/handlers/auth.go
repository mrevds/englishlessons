package handlers

import (
	"englishlessons.back/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RegisterRequest struct {
	Username        string `json:"username" binding:"required"`
	Password        string `json:"password" binding:"required"`
	PasswordConfirm string `json:"password_confirm" binding:"required"`
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Email           string `json:"email"`
	Level           int    `json:"level" binding:"required"`
	LevelLetter     string `json:"level_letter" binding:"required"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type TokenResponse struct {
	Access  string `json:"access"`
	Refresh string `json:"refresh"`
}

func (h *Handlers) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	serviceReq := services.RegisterRequest{
		Username:        req.Username,
		Password:        req.Password,
		PasswordConfirm: req.PasswordConfirm,
		FirstName:       req.FirstName,
		LastName:        req.LastName,
		Email:           req.Email,
		Level:           req.Level,
		LevelLetter:     req.LevelLetter,
	}

	user, err := h.authService.Register(serviceReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Регистрация успешна",
		"username": user.Username,
		"role":     user.Role,
	})
}

func (h *Handlers) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	serviceReq := services.LoginRequest{
		Username: req.Username,
		Password: req.Password,
	}

	tokens, err := h.authService.Login(serviceReq)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, TokenResponse{
		Access:  tokens.Access,
		Refresh: tokens.Refresh,
	})
}

func (h *Handlers) RefreshToken(c *gin.Context) {
	var req struct {
		Refresh string `json:"refresh" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokens, err := h.authService.RefreshToken(req.Refresh)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, TokenResponse{
		Access:  tokens.Access,
		Refresh: tokens.Refresh,
	})
}

func (h *Handlers) GetMe(c *gin.Context) {
	userID, _ := c.Get("user_id")

	user, err := h.userService.GetUserByID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":            user.ID,
		"username":      user.Username,
		"first_name":    user.FirstName,
		"last_name":     user.LastName,
		"email":         user.Email,
		"role":          user.Role,
		"level":         user.Level,
		"level_letter":  user.LevelLetter,
		"class_display": user.GetClassDisplay(),
	})
}

