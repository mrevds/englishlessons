package services

import (
	"englishlessons.back/internal/models"
	"englishlessons.back/internal/repositories"
	"englishlessons.back/internal/utils"
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	userRepo *repositories.UserRepository
	jwtSecret string
}

func NewAuthService(userRepo *repositories.UserRepository, jwtSecret string) *AuthService {
	return &AuthService{
		userRepo:  userRepo,
		jwtSecret: jwtSecret,
	}
}

type RegisterRequest struct {
	Username        string
	Password        string
	PasswordConfirm string
	FirstName       string
	LastName        string
	Email           string
	Level           int
	LevelLetter     string
}

type LoginRequest struct {
	Username string
	Password string
}

type TokenResponse struct {
	Access  string
	Refresh string
}

func (s *AuthService) Register(req RegisterRequest) (*models.User, error) {
	// Валидация username
	req.Username = strings.TrimSpace(req.Username)
	if valid, errMsg := utils.ValidateUsername(req.Username); !valid {
		return nil, errors.New(errMsg)
	}

	// Валидация пароля
	if req.Password != req.PasswordConfirm {
		return nil, errors.New("Пароли не совпадают")
	}

	if valid, errMsg := utils.ValidatePassword(req.Password); !valid {
		return nil, errors.New(errMsg)
	}

	// Валидация email
	if req.Email != "" && !utils.ValidateEmail(req.Email) {
		return nil, errors.New("Неверный формат email")
	}

	// Валидация уровня
	if req.Level < 1 || req.Level > 11 {
		return nil, errors.New("Класс должен быть от 1 до 11")
	}

	// Валидация буквы класса
	if !utils.ValidateLevelLetter(req.LevelLetter) {
		return nil, errors.New("Неверная буква класса")
	}

	// Санитизация строковых полей
	req.FirstName = utils.SanitizeString(req.FirstName)
	req.LastName = utils.SanitizeString(req.LastName)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))

	// Хеширование пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("Failed to hash password")
	}

	user := &models.User{
		Username:    req.Username,
		Password:    string(hashedPassword),
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		Email:       req.Email,
		Role:        models.RoleStudent,
		Level:       &req.Level,
		LevelLetter: req.LevelLetter,
	}

	if err := s.userRepo.Create(user); err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) || strings.Contains(err.Error(), "duplicate") {
			return nil, errors.New("Username already exists")
		}
		return nil, err
	}

	return user, nil
}

func (s *AuthService) Login(req LoginRequest) (*TokenResponse, error) {
	// Базовая валидация
	req.Username = strings.TrimSpace(req.Username)
	if req.Username == "" || req.Password == "" {
		return nil, errors.New("Имя пользователя и пароль обязательны")
	}

	user, err := s.userRepo.FindByUsername(req.Username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("Неверное имя пользователя или пароль")
		}
		return nil, errors.New("Ошибка сервера")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("Неверное имя пользователя или пароль")
	}

	accessToken, refreshToken, err := s.generateTokens(user.ID, user.Role)
	if err != nil {
		return nil, errors.New("Failed to generate tokens")
	}

	return &TokenResponse{
		Access:  accessToken,
		Refresh: refreshToken,
	}, nil
}

func (s *AuthService) RefreshToken(refreshTokenString string) (*TokenResponse, error) {
	token, err := jwt.Parse(refreshTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil || !token.Valid {
		return nil, errors.New("Неверный токен обновления")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("Неверный формат токена")
	}

	tokenType, ok := claims["type"].(string)
	if !ok || tokenType != "refresh" {
		return nil, errors.New("Неверный тип токена")
	}

	userID, ok := claims["user_id"].(float64)
	if !ok {
		return nil, errors.New("Неверный формат токена")
	}

	role, _ := claims["role"].(string)

	accessToken, refreshToken, err := s.generateTokens(uint(userID), models.Role(role))
	if err != nil {
		return nil, errors.New("Failed to generate tokens")
	}

	return &TokenResponse{
		Access:  accessToken,
		Refresh: refreshToken,
	}, nil
}

func (s *AuthService) generateTokens(userID uint, role models.Role) (string, string, error) {
	accessClaims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(time.Hour).Unix(),
		"type":    "access",
	}

	refreshClaims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(7 * 24 * time.Hour).Unix(),
		"type":    "refresh",
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

	accessTokenString, err := accessToken.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", "", err
	}

	refreshTokenString, err := refreshToken.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", "", err
	}

	return accessTokenString, refreshTokenString, nil
}

