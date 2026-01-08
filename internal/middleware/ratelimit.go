package middleware

import (
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type rateLimiter struct {
	visitors map[string]*visitor
	mu       sync.RWMutex
	rate     int
	window   time.Duration
}

type visitor struct {
	count       int
	lastSeen    time.Time
	windowStart time.Time
}

var limiter *rateLimiter
var strictLimiter *rateLimiter

func init() {
	// Общий лимитер: 300 запросов в минуту (для 10-15 пользователей)
	// Это позволяет каждому пользователю делать ~20-30 запросов/минуту
	limiter = &rateLimiter{
		visitors: make(map[string]*visitor),
		rate:     300, // 300 запросов в минуту
		window:   time.Minute,
	}

	// Строгий лимитер для логина/регистрации: отдельный счетчик
	strictLimiter = &rateLimiter{
		visitors: make(map[string]*visitor),
		rate:     10, // 10 попыток в минуту для логина/регистрации
		window:   time.Minute,
	}

	// Очистка старых записей каждые 2 минуты
	go func() {
		for {
			time.Sleep(2 * time.Minute)
			now := time.Now()

			limiter.mu.Lock()
			for ip, v := range limiter.visitors {
				if now.Sub(v.lastSeen) > 5*time.Minute {
					delete(limiter.visitors, ip)
				}
			}
			limiter.mu.Unlock()

			strictLimiter.mu.Lock()
			for ip, v := range strictLimiter.visitors {
				if now.Sub(v.lastSeen) > 5*time.Minute {
					delete(strictLimiter.visitors, ip)
				}
			}
			strictLimiter.mu.Unlock()
		}
	}()
}

func RateLimit() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		now := time.Now()

		limiter.mu.Lock()
		v, exists := limiter.visitors[ip]

		if !exists {
			limiter.visitors[ip] = &visitor{
				count:       1,
				lastSeen:    now,
				windowStart: now,
			}
			limiter.mu.Unlock()
			c.Next()
			return
		}

		// Если прошло больше окна времени, сбрасываем счетчик
		if now.Sub(v.windowStart) > limiter.window {
			v.count = 1
			v.windowStart = now
			v.lastSeen = now
			limiter.mu.Unlock()
			c.Next()
			return
		}

		// Проверка лимита
		if v.count >= limiter.rate {
			remaining := limiter.window - now.Sub(v.windowStart)
			limiter.mu.Unlock()
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Слишком много запросов. Попробуйте позже.",
			})
			if remaining > 0 {
				c.Header("Retry-After", strconv.Itoa(int(remaining.Seconds())))
			}
			c.Abort()
			return
		}

		v.count++
		v.lastSeen = now
		limiter.mu.Unlock()

		c.Next()
	}
}

func StrictRateLimit() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		now := time.Now()

		strictLimiter.mu.Lock()
		v, exists := strictLimiter.visitors[ip]

		if !exists {
			strictLimiter.visitors[ip] = &visitor{
				count:       1,
				lastSeen:    now,
				windowStart: now,
			}
			strictLimiter.mu.Unlock()
			c.Next()
			return
		}

		// Если прошло больше окна времени, сбрасываем счетчик
		if now.Sub(v.windowStart) > strictLimiter.window {
			v.count = 1
			v.windowStart = now
			v.lastSeen = now
			strictLimiter.mu.Unlock()
			c.Next()
			return
		}

		// Проверка строгого лимита
		if v.count >= strictLimiter.rate {
			remaining := strictLimiter.window - now.Sub(v.windowStart)
			strictLimiter.mu.Unlock()
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Слишком много попыток входа. Подождите минуту перед следующей попыткой.",
			})
			if remaining > 0 {
				c.Header("Retry-After", strconv.Itoa(int(remaining.Seconds())))
			}
			c.Abort()
			return
		}

		v.count++
		v.lastSeen = now
		strictLimiter.mu.Unlock()

		c.Next()
	}
}
