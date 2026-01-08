package handlers

import (
	"englishlessons.back/internal/models"
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func (h *Handlers) ExportStats(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учителей"})
		return
	}

	format := c.Query("format")
	if format != "csv" && format != "excel" {
		format = "csv"
	}

	// Получаем всех студентов
	filters := make(map[string]string)
	if level := c.Query("level"); level != "" {
		filters["level"] = level
	}
	if levelLetter := c.Query("level_letter"); levelLetter != "" {
		filters["level_letter"] = levelLetter
	}

	students, err := h.userService.GetStudents(filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get students"})
		return
	}

	// Формируем CSV
	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=students_stats_%s.csv", time.Now().Format("20060102")))
	c.Header("Access-Control-Expose-Headers", "Content-Disposition")

	// Добавляем BOM для корректного отображения кириллицы в Excel
	c.Writer.Write([]byte{0xEF, 0xBB, 0xBF})

	writer := csv.NewWriter(c.Writer)
	defer writer.Flush()

	// Заголовки
	headers := []string{
		"ID", "Имя", "Фамилия", "Класс", "Всего баллов", "Пройдено уроков",
		"Средний процент", "Всего попыток",
	}
	writer.Write(headers)

	// Данные
	for _, student := range students {
		stats, err := h.userService.GetStudentStats(student.ID)
		if err != nil {
			continue // Пропускаем студента если не удалось получить статистику
		}

		totalPoints := 0
		if tp, ok := stats["total_points"].(int); ok {
			totalPoints = tp
		}
		completedLessons := 0
		if cl, ok := stats["completed_lessons"].(int); ok {
			completedLessons = cl
		}
		totalAttempts := 0
		if ta, ok := stats["total_attempts"].(int); ok {
			totalAttempts = ta
		}
		avgPercentage := 0.0
		if ap, ok := stats["average_percentage"].(float64); ok {
			avgPercentage = ap
		}

		levelStr := ""
		if student.Level != nil {
			levelStr = fmt.Sprintf("%d-%s", *student.Level, student.LevelLetter)
		}

		row := []string{
			strconv.Itoa(int(student.ID)),
			student.FirstName,
			student.LastName,
			levelStr,
			strconv.Itoa(totalPoints),
			strconv.Itoa(completedLessons),
			fmt.Sprintf("%.2f", avgPercentage),
			strconv.Itoa(totalAttempts),
		}
		writer.Write(row)
	}
}

func (h *Handlers) GetClassAnalytics(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учителей"})
		return
	}

	level := c.Query("level")
	levelLetter := c.Query("level_letter")

	if level == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходим параметр level"})
		return
	}

	levelInt, err := strconv.Atoi(level)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат level"})
		return
	}

	// Валидация уровня
	if levelInt < 1 || levelInt > 11 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Класс должен быть от 1 до 11"})
		return
	}

	// Санитизация буквы класса
	if levelLetter != "" {
		levelLetter = strings.TrimSpace(strings.ToUpper(levelLetter))
		// Используем подсчет рун для правильной работы с кириллицей
		if len([]rune(levelLetter)) > 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат буквы класса"})
			return
		}
	}

	// Получаем студентов класса
	filters := make(map[string]string)
	filters["level"] = strconv.Itoa(levelInt)
	if levelLetter != "" {
		filters["level_letter"] = levelLetter
	}

	students, err := h.userService.GetStudents(filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get students"})
		return
	}

	// Статистика по урокам
	lessons, err := h.lessonRepo.FindAll(true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get lessons"})
		return
	}

	lessonStats := make([]gin.H, len(lessons))
	for i, lesson := range lessons {
		// Получаем прогресс по уроку
		allProgress, err := h.progressRepo.FindByLessonID(lesson.ID, nil)
		if err != nil {
			continue
		}

		// Фильтруем по классу
		var progress []models.LessonProgress
		for _, p := range allProgress {
			user, err := h.userRepo.FindByID(p.UserID)
			if err != nil {
				continue
			}
			if user.Level != nil && *user.Level == levelInt {
				if levelLetter == "" || user.LevelLetter == levelLetter {
					progress = append(progress, p)
				}
			}
		}

		completedCount := 0
		totalAttempts := 0
		var percentages []float64

		for _, p := range progress {
			if p.IsCompleted {
				completedCount++
			}
			totalAttempts += p.AttemptsCount
			if p.BestPercentage > 0 {
				percentages = append(percentages, p.BestPercentage)
			}
		}

		avgPercentage := 0.0
		if len(percentages) > 0 {
			sum := 0.0
			for _, p := range percentages {
				sum += p
			}
			avgPercentage = sum / float64(len(percentages))
		}

		lessonStats[i] = gin.H{
			"lesson_id":         lesson.ID,
			"lesson_title":      lesson.Title,
			"lesson_order":       lesson.Order,
			"total_students":     len(students),
			"completed_count":   completedCount,
			"completion_rate":    float64(completedCount) / float64(len(students)) * 100,
			"average_percentage": avgPercentage,
			"total_attempts":     totalAttempts,
		}
	}

	// Общая статистика класса
	var allProgress []models.LessonProgress
	for _, student := range students {
		studentProgress, err := h.progressRepo.FindByUserID(student.ID)
		if err != nil {
			continue
		}
		allProgress = append(allProgress, studentProgress...)
	}

	totalPoints := 0
	completedLessons := 0
	var allPercentages []float64

	for _, p := range allProgress {
		totalPoints += p.BestScore
		if p.IsCompleted {
			completedLessons++
		}
		if p.BestPercentage > 0 {
			allPercentages = append(allPercentages, p.BestPercentage)
		}
	}

	classAvgPercentage := 0.0
	if len(allPercentages) > 0 {
		sum := 0.0
		for _, p := range allPercentages {
			sum += p
		}
		classAvgPercentage = sum / float64(len(allPercentages))
	}

	c.JSON(http.StatusOK, gin.H{
		"class_info": gin.H{
			"level":        levelInt,
			"level_letter": levelLetter,
			"total_students": len(students),
		},
		"overall_stats": gin.H{
			"total_points":       totalPoints,
			"completed_lessons":  completedLessons,
			"average_percentage": classAvgPercentage,
		},
		"lessons_stats": lessonStats,
	})
}

func (h *Handlers) GetClassActivityStats(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleTeacher) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учителей"})
		return
	}

	// Параметры периода (по умолчанию последние 30 дней)
	daysStr := c.DefaultQuery("days", "30")
	days, err := strconv.Atoi(daysStr)
	if err != nil || days < 1 || days > 365 {
		days = 30
	}

	endDate := time.Now()
	startDate := endDate.AddDate(0, 0, -days)

	stats, err := h.testRepo.GetClassActivityStats(startDate, endDate)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get activity stats"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"period": gin.H{
			"start_date": startDate.Format(time.RFC3339),
			"end_date":   endDate.Format(time.RFC3339),
			"days":       days,
		},
		"stats": stats,
	})
}

