package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SecurityHeaders добавляет security headers
func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Защита от XSS
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("X-XSS-Protection", "1; mode=block")
		
		// Content Security Policy
		c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;")
		
		// Referrer Policy
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		
		// Permissions Policy
		c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
		
		c.Next()
	}
}

// MaxBodySize ограничивает размер тела запроса
func MaxBodySize(maxSize int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.ContentLength > maxSize {
			c.JSON(http.StatusRequestEntityTooLarge, gin.H{
				"error": "Размер запроса слишком большой",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

