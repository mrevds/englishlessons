package config

import (
	"log"
	"os"
)

type Config struct {
	DatabaseURL string
	JWTSecret   string
	Port        string
}

func Load() *Config {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Локальная база данных по умолчанию
		dbURL = "postgres://jaxa:11041104@localhost:5432/englishlessons?sslmode=disable"
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		// В production это должно быть обязательным
		if os.Getenv("ENV") == "production" {
			log.Fatal("JWT_SECRET must be set in production environment")
		}
		jwtSecret = "your-secret-key-change-in-production" // Только для разработки
	}

	// Проверка минимальной длины секрета
	if len(jwtSecret) < 32 {
		if os.Getenv("ENV") == "production" {
			log.Fatal("JWT_SECRET must be at least 32 characters long in production")
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return &Config{
		DatabaseURL: dbURL,
		JWTSecret:   jwtSecret,
		Port:        port,
	}
}

