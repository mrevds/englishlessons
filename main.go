package main

import (
	"log"

	"englishlessons.back/internal/config"
	"englishlessons.back/internal/database"
	"englishlessons.back/internal/handlers"
	"englishlessons.back/internal/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// Загружаем конфигурацию
	cfg := config.Load()

	// Подключаемся к БД
	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Автомиграции
	if err := database.Migrate(db); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Создаем дефолтные уроки
	if err := database.SeedDefaultLessons(db); err != nil {
		log.Printf("Warning: Failed to seed default lessons: %v", err)
	}

	// Инициализируем handlers
	h := handlers.New(db, cfg)

	// Настраиваем роутер
	r := gin.Default()

	// CORS middleware должен быть первым
	r.Use(middleware.CORS())

	// Security headers
	r.Use(middleware.SecurityHeaders())

	// Rate limiting для всех запросов
	r.Use(middleware.RateLimit())

	// Ограничение размера тела запроса (1MB)
	r.MaxMultipartMemory = 1 << 20

	// Публичные роуты с строгим rate limiting
	r.POST("/api/users/register", middleware.StrictRateLimit(), h.Register)
	r.POST("/api/token", middleware.StrictRateLimit(), h.Login)
	r.POST("/api/token/refresh", middleware.StrictRateLimit(), h.RefreshToken)

	// Защищенные роуты
	api := r.Group("/api")
	api.Use(middleware.Auth(cfg.JWTSecret))
	{
		// Пользователи
		api.GET("/users/me", h.GetMe)
		api.GET("/users/students", h.GetStudents)
		api.GET("/users/stats/me", h.GetMyStats)
		api.GET("/users/stats/:id", h.GetStudentStats)
		api.POST("/users/reset-password", h.ResetStudentPassword)

		// Уроки
		api.GET("/lessons", h.GetLessons)
		api.GET("/lessons/:id", h.GetLesson)
		api.GET("/lessons/:id/questions", h.GetLessonQuestions)
		api.GET("/lessons/my-progress", h.GetMyProgress)

		// Тесты
		api.POST("/lessons/submit-test", h.SubmitTest)
		api.GET("/test-attempts", h.GetTestAttempts)
		api.GET("/test-attempts/by-lesson", h.GetTestAttemptsByLesson)

		// Прогресс
		api.GET("/progress", h.GetProgress)
		api.GET("/progress/by-student", h.GetProgressByStudent)
		api.GET("/progress/by-lesson", h.GetProgressByLesson)

		// Достижения
		api.GET("/achievements/me", h.GetMyAchievements)

		// Рейтинг
		api.GET("/leaderboard", h.GetLeaderboard)

		// Игры - результаты и статистика
		api.POST("/games/results", h.SubmitGameResult)
		api.GET("/games/results", h.GetMyGameResults)
		api.GET("/games/stats", h.GetMyGameStats)
		api.GET("/games/summary", h.GetMyGameSummary)
		api.GET("/games/best", h.GetBestGameResult)
		api.GET("/games/leaderboard", h.GetGameLeaderboard)
		api.GET("/games/class-stats", h.GetClassGameStats)
		api.GET("/games/recent", h.GetRecentGameResults)
		api.GET("/games/student/:id/stats", h.GetStudentGameStats)

		// Экспорт и аналитика (для учителей)
		api.GET("/export/stats", h.ExportStats)
		api.GET("/analytics/class", h.GetClassAnalytics)
		api.GET("/analytics/activity", h.GetClassActivityStats)
	}

	// Запускаем сервер
	log.Printf("Server starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
