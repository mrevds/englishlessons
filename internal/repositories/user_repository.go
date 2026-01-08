package repositories

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindByUsername(username string) (*models.User, error) {
	var user models.User
	err := r.db.Where("username = ?", username).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindStudents(filters map[string]interface{}) ([]models.User, error) {
	var users []models.User
	query := r.db.Where("role = ?", models.RoleStudent)

	if level, ok := filters["level"].(int); ok && level > 0 {
		query = query.Where("level = ?", level)
	}

	if levelLetter, ok := filters["level_letter"].(string); ok && levelLetter != "" {
		query = query.Where("level_letter ILIKE ?", levelLetter)
	}

	err := query.Order("level, level_letter, last_name, first_name").Find(&users).Error
	return users, err
}

func (r *UserRepository) UpdatePassword(userID uint, hashedPassword string) error {
	return r.db.Model(&models.User{}).Where("id = ?", userID).Update("password", hashedPassword).Error
}

func (r *UserRepository) UpdateProfile(userID uint, updates map[string]interface{}) error {
	return r.db.Model(&models.User{}).Where("id = ?", userID).Updates(updates).Error
}

