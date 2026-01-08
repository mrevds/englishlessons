package handlers

import (
	"englishlessons.back/internal/config"
	"englishlessons.back/internal/repositories"
	"englishlessons.back/internal/services"
	"gorm.io/gorm"
)

type Handlers struct {
	// Services
	authService        *services.AuthService
	userService        *services.UserService
	lessonService      *services.LessonService
	testService        *services.TestService
	achievementService *services.AchievementService
	leaderboardService *services.LeaderboardService
	gameResultService  *services.GameResultService

	// Repositories (для временного доступа, пока не все перенесено в сервисы)
	progressRepo *repositories.ProgressRepository
	lessonRepo   *repositories.LessonRepository
	userRepo     *repositories.UserRepository
	testRepo     *repositories.TestRepository

	// Config
	cfg *config.Config
}

func New(db *gorm.DB, cfg *config.Config) *Handlers {
	// Repositories
	userRepo := repositories.NewUserRepository(db)
	lessonRepo := repositories.NewLessonRepository(db)
	progressRepo := repositories.NewProgressRepository(db)
	testRepo := repositories.NewTestRepository(db)
	achievementRepo := repositories.NewAchievementRepository(db)
	gameResultRepo := repositories.NewGameResultRepository(db)

	// Services
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)
	userService := services.NewUserService(userRepo, progressRepo)
	lessonService := services.NewLessonService(lessonRepo, progressRepo)
	testService := services.NewTestService(testRepo, lessonRepo, progressRepo, achievementRepo)
	achievementService := services.NewAchievementService(achievementRepo, progressRepo, lessonRepo)
	leaderboardService := services.NewLeaderboardService(userRepo, progressRepo)
	gameResultService := services.NewGameResultService(gameResultRepo)

	return &Handlers{
		authService:        authService,
		userService:        userService,
		lessonService:      lessonService,
		testService:        testService,
		achievementService: achievementService,
		leaderboardService: leaderboardService,
		gameResultService:  gameResultService,
		progressRepo:       progressRepo,
		lessonRepo:         lessonRepo,
		userRepo:           userRepo,
		testRepo:           testRepo,
		cfg:                cfg,
	}
}
