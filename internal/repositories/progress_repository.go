package repositories

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

type ProgressRepository struct {
	db *gorm.DB
}

func NewProgressRepository(db *gorm.DB) *ProgressRepository {
	return &ProgressRepository{db: db}
}

// DB возвращает *gorm.DB для использования в сервисах (временное решение)
func (r *ProgressRepository) DB() *gorm.DB {
	return r.db
}

func (r *ProgressRepository) FindByUserAndLesson(userID, lessonID uint) (*models.LessonProgress, error) {
	var progress models.LessonProgress
	err := r.db.Where("user_id = ? AND lesson_id = ?", userID, lessonID).First(&progress).Error
	if err != nil {
		return nil, err
	}
	return &progress, nil
}

func (r *ProgressRepository) FindByUserID(userID uint) ([]models.LessonProgress, error) {
	var progress []models.LessonProgress
	if err := r.db.Where("user_id = ?", userID).
		Preload("Lesson").
		Order("lesson_id").
		Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (r *ProgressRepository) FindByStudentID(studentID uint) ([]models.LessonProgress, error) {
	var progress []models.LessonProgress
	if err := r.db.Where("user_id = ?", studentID).
		Preload("User").
		Preload("Lesson").
		Order("lesson_id").
		Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (r *ProgressRepository) FindByLessonID(lessonID uint, userID *uint) ([]models.LessonProgress, error) {
	var progress []models.LessonProgress
	query := r.db.Preload("User").Preload("Lesson").Where("lesson_id = ?", lessonID)
	if userID != nil {
		query = query.Where("user_id = ?", *userID)
	}
	if err := query.Order("created_at DESC").Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (r *ProgressRepository) Create(progress *models.LessonProgress) error {
	return r.db.Create(progress).Error
}

func (r *ProgressRepository) Update(progress *models.LessonProgress) error {
	return r.db.Save(progress).Error
}

