package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		// Разрешенные origins
		allowedOrigins := []string{
			"http://localhost:3000",
			"http://localhost:5173",
			"http://127.0.0.1:3000",
			"http://127.0.0.1:5173",
			"http://64.23.140.132",
			"http://64.23.140.132:80",
			"http://64.23.140.132:3000",
			"http://64.23.140.132:8080",
			"https://englishlessons.vercel.app",
			"https://weldon-obvious-lecia.ngrok-free.dev",
			"https://playlist-nick-characters-schema.trycloudflare.com",
		}

		// В production добавить реальные домены через переменные окружения
		if prodOrigin := os.Getenv("ALLOWED_ORIGIN"); prodOrigin != "" {
			allowedOrigins = append(allowedOrigins, prodOrigin)
		}

		originAllowed := false
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				originAllowed = true
				break
			}
		}

		// Специальная проверка для *.trycloudflare.com и ngrok
		if !originAllowed && origin != "" {
			if strings.HasSuffix(origin, ".trycloudflare.com") || strings.HasSuffix(origin, ".ngrok-free.dev") {
				originAllowed = true
			}
		}

		if originAllowed {
			c.Header("Access-Control-Allow-Origin", origin)
		} else if origin != "" {
			c.AbortWithStatus(http.StatusForbidden)
			return
		}

		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, ngrok-skip-browser-warning")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		c.Header("Access-Control-Expose-Headers", "Content-Disposition, Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
