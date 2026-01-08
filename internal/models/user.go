package models

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

type Role string

const (
	RoleStudent Role = "student"
	RoleTeacher Role = "teacher"
)

type User struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Username   string    `gorm:"uniqueIndex;not null" json:"username"`
	Password   string    `gorm:"not null" json:"-"`
	FirstName  string    `json:"first_name"`
	LastName   string    `json:"last_name"`
	Email      string    `json:"email"`
	Role       Role      `gorm:"type:varchar(20);default:'student'" json:"role"`
	Level      *int      `json:"level"`
	LevelLetter string   `json:"level_letter"`
	Avatar     string    `json:"avatar"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

func (u *User) GetFullName() string {
	if u.FirstName != "" && u.LastName != "" {
		return u.FirstName + " " + u.LastName
	}
	return u.Username
}

func (u *User) GetClassDisplay() string {
	if u.Role == RoleTeacher {
		return ""
	}
	if u.Level != nil {
		levelStr := fmt.Sprintf("%d", *u.Level)
		if u.LevelLetter != "" {
			return levelStr + "-" + u.LevelLetter + " класс"
		}
		return levelStr + "-класс"
	}
	return ""
}

