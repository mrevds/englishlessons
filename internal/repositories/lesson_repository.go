package repositories

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

type LessonRepository struct {
	db *gorm.DB
}

func NewLessonRepository(db *gorm.DB) *LessonRepository {
	return &LessonRepository{db: db}
}

func (r *LessonRepository) FindAll(activeOnly bool) ([]models.Lesson, error) {
	var lessons []models.Lesson
	query := r.db
	if activeOnly {
		query = query.Where("is_active = ?", true)
	}
	err := query.Order("\"order\"").Find(&lessons).Error
	return lessons, err
}

func (r *LessonRepository) FindByID(id uint) (*models.Lesson, error) {
	var lesson models.Lesson
	err := r.db.Where("id = ?", id).First(&lesson).Error
	if err != nil {
		return nil, err
	}
	return &lesson, nil
}

func (r *LessonRepository) FindByIDWithQuestions(id uint, activeOnly bool) (*models.Lesson, error) {
	var lesson models.Lesson
	query := r.db.Preload("Questions.AnswerOptions")
	if activeOnly {
		query = query.Where("id = ? AND is_active = ?", id, true)
	} else {
		query = query.Where("id = ?", id)
	}
	err := query.First(&lesson).Error
	if err != nil {
		return nil, err
	}
	return &lesson, nil
}

func (r *LessonRepository) FindByOrder(order int, activeOnly bool) (*models.Lesson, error) {
	var lesson models.Lesson
	query := r.db
	if activeOnly {
		query = query.Where("\"order\" = ? AND is_active = ?", order, true)
	} else {
		query = query.Where("\"order\" = ?", order)
	}
	err := query.First(&lesson).Error
	if err != nil {
		return nil, err
	}
	return &lesson, nil
}

func (r *LessonRepository) FindQuestionsByLessonID(lessonID uint) ([]models.Question, error) {
	var questions []models.Question
	err := r.db.Where("lesson_id = ?", lessonID).
		Preload("AnswerOptions").
		Order("id").
		Find(&questions).Error
	return questions, err
}

