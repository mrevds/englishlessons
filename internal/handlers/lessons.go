package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"englishlessons.back/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *Handlers) GetLessons(c *gin.Context) {
	role, _ := c.Get("role")
	userID, _ := c.Get("user_id")

	if role == string(models.RoleStudent) {
		lessons, err := h.lessonService.GetLessons(userID.(uint))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get lessons"})
			return
		}
		c.JSON(http.StatusOK, lessons)
		return
	}

	// Для учителей возвращаем все уроки
	lessons, err := h.lessonService.GetLessons(0) // 0 означает все уроки
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get lessons"})
		return
	}
	c.JSON(http.StatusOK, lessons)
}

func (h *Handlers) GetLesson(c *gin.Context) {
	lessonID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil || lessonID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID урока"})
		return
	}

	role, _ := c.Get("role")
	userID, _ := c.Get("user_id")

	var uid uint
	if role == string(models.RoleStudent) {
		uid = userID.(uint)
	}

	lesson, progressData, err := h.lessonService.GetLesson(uint(lessonID), uid)
	if err != nil {
		if err.Error() == "Lesson not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else if strings.Contains(err.Error(), "предыдущий урок") {
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		}
		return
	}

	questions := make([]gin.H, len(lesson.Questions))
	for i, q := range lesson.Questions {
		answerOptions := make([]gin.H, len(q.AnswerOptions))
		for j, ao := range q.AnswerOptions {
			aoData := gin.H{
				"id":    ao.ID,
				"text":  ao.Text,
				"order": ao.Order,
			}
			// Для учителей показываем правильность ответа
			if role == string(models.RoleTeacher) {
				aoData["is_correct"] = ao.IsCorrect
			}
			answerOptions[j] = aoData
		}

		questions[i] = gin.H{
			"id":             q.ID,
			"text":           q.Text,
			"order":          q.Order,
			"answer_options": answerOptions,
		}
	}

	response := gin.H{
		"id":          lesson.ID,
		"title":       lesson.Title,
		"description": lesson.Description,
		"order":       lesson.Order,
		"is_active":   lesson.IsActive,
		"questions":   questions,
		"created_at":  lesson.CreatedAt,
	}

	if len(progressData) > 0 {
		response["progress"] = progressData
		response["is_accessible"] = true
	} else if role == string(models.RoleStudent) {
		response["progress"] = gin.H{
			"best_percentage": 0.0,
			"is_completed":    false,
			"attempts_count":  0,
		}
		response["is_accessible"] = true
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handlers) GetLessonQuestions(c *gin.Context) {
	lessonID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil || lessonID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID урока"})
		return
	}

	questions, err := h.lessonService.GetLessonQuestions(uint(lessonID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	role, _ := c.Get("role")
	result := make([]gin.H, len(questions))
	for i, q := range questions {
		answerOptions := make([]gin.H, len(q.AnswerOptions))
		for j, ao := range q.AnswerOptions {
			aoData := gin.H{
				"id":    ao.ID,
				"text":  ao.Text,
				"order": ao.Order,
			}
			if role == string(models.RoleTeacher) {
				aoData["is_correct"] = ao.IsCorrect
			}
			answerOptions[j] = aoData
		}

		result[i] = gin.H{
			"id":             q.ID,
			"text":           q.Text,
			"order":          q.Order,
			"answer_options": answerOptions,
		}
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handlers) GetMyProgress(c *gin.Context) {
	role, _ := c.Get("role")
	if role != string(models.RoleStudent) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Только для учеников"})
		return
	}

	userID, _ := c.Get("user_id")
	progress, err := h.lessonService.GetUserProgress(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get progress"})
		return
	}

	c.JSON(http.StatusOK, progress)
}
