package utils

import (
	"regexp"
	"strings"
	"unicode"
)

// ValidatePassword проверяет сложность пароля
func ValidatePassword(password string) (bool, string) {
	if len(password) < 8 {
		return false, "Пароль должен содержать минимум 8 символов"
	}

	if len(password) > 128 {
		return false, "Пароль слишком длинный (максимум 128 символов)"
	}

	hasUpper := false
	hasLower := false
	hasNumber := false
	hasSpecial := false

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	if !hasUpper {
		return false, "Пароль должен содержать хотя бы одну заглавную букву"
	}
	if !hasLower {
		return false, "Пароль должен содержать хотя бы одну строчную букву"
	}
	if !hasNumber {
		return false, "Пароль должен содержать хотя бы одну цифру"
	}
	if !hasSpecial {
		return false, "Пароль должен содержать хотя бы один специальный символ"
	}

	return true, ""
}

// ValidateEmail проверяет формат email
func ValidateEmail(email string) bool {
	if email == "" {
		return true // Email опционален
	}

	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// ValidateUsername проверяет формат username
func ValidateUsername(username string) (bool, string) {
	if len(username) < 3 {
		return false, "Имя пользователя должно содержать минимум 3 символа"
	}

	if len(username) > 30 {
		return false, "Имя пользователя слишком длинное (максимум 30 символов)"
	}

	// Только буквы, цифры, подчеркивания и дефисы
	usernameRegex := regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)
	if !usernameRegex.MatchString(username) {
		return false, "Имя пользователя может содержать только буквы, цифры, подчеркивания и дефисы"
	}

	return true, ""
}

// SanitizeString очищает строку от потенциально опасных символов
func SanitizeString(s string) string {
	// Удаляем нулевые байты
	s = strings.ReplaceAll(s, "\x00", "")
	
	// Удаляем управляющие символы (кроме табуляции и новой строки)
	var result strings.Builder
	for _, r := range s {
		if r >= 32 || r == '\t' || r == '\n' || r == '\r' {
			result.WriteRune(r)
		}
	}
	
	return strings.TrimSpace(result.String())
}

// ValidateLevelLetter проверяет букву класса
func ValidateLevelLetter(letter string) bool {
	validLetters := []string{"А", "Б", "В", "Г", "Д", "Е", "Ж", "З"}
	for _, valid := range validLetters {
		if letter == valid {
			return true
		}
	}
	return false
}

