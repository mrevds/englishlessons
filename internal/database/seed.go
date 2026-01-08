package database

import (
	"englishlessons.back/internal/models"
	"gorm.io/gorm"
)

func SeedDefaultLessons(db *gorm.DB) error {
	// Проверяем, есть ли уже уроки
	var count int64
	db.Model(&models.Lesson{}).Count(&count)
	if count > 0 {
		return nil // Уроки уже есть
	}

	// Урок 1: Nouns - Countable and Uncountable
	lesson1 := models.Lesson{
		Title:       "Nouns: Countable and Uncountable",
		Description: "Изучение исчисляемых и неисчисляемых существительных",
		Order:       1,
		IsActive:    true,
	}
	if err := db.Create(&lesson1).Error; err != nil {
		return err
	}

	questions1 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Какое существительное является исчисляемым?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"water", false},
				{"book", true},
				{"money", false},
				{"sugar", false},
			},
		},
		{
			text: "Выберите правильный вариант: How ___ apples do you need?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"much", false},
				{"many", true},
				{"little", false},
				{"less", false},
			},
		},
		{
			text: "Выберите правильный вариант: There is ___ milk in the fridge.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"many", false},
				{"few", false},
				{"much", true},
				{"a few", false},
			},
		},
		{
			text: "Какое существительное является неисчисляемым?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"chair", false},
				{"information", true},
				{"dog", false},
				{"apple", false},
			},
		},
		{
			text: "Выберите правильный вариант: I need ___ advice.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"an", false},
				{"a", false},
				{"some", true},
				{"many", false},
			},
		},
		{
			text: "Выберите правильный вариант: We don't have ___ time.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"many", false},
				{"much", true},
				{"a few", false},
				{"few", false},
			},
		},
		{
			text: "Какое существительное является исчисляемым?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"rice", false},
				{"furniture", false},
				{"cup", true},
				{"bread", false},
			},
		},
		{
			text: "Выберите правильный вариант: There are ___ people in the room.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"much", false},
				{"a few", true},
				{"a little", false},
				{"little", false},
			},
		},
		{
			text: "Какое существительное является неисчисляемым?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"table", false},
				{"knowledge", true},
				{"student", false},
				{"computer", false},
			},
		},
		{
			text: "Выберите правильный вариант: Can I have ___ water?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"many", false},
				{"a few", false},
				{"some", true},
				{"few", false},
			},
		},
		{
			text: "Выберите правильный вариант: How ___ cars do they have?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"much", false},
				{"many", true},
				{"little", false},
				{"a little", false},
			},
		},
		{
			text: "Какое существительное можно считать?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"music", false},
				{"homework", false},
				{"banana", true},
				{"air", false},
			},
		},
		{
			text: "Выберите правильный вариант: There is very ___ sugar left.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"few", false},
				{"many", false},
				{"little", true},
				{"a few", false},
			},
		},
		{
			text: "Выберите правильный вариант: She gave me ___ useful information.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", false},
				{"many", false},
				{"some", true},
			},
		},
		{
			text: "Какое из следующих существительных неисчисляемое?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"pen", false},
				{"advice", true},
				{"bottle", false},
				{"shoe", false},
			},
		},
	}

	for i, q := range questions1 {
		question := models.Question{
			LessonID: lesson1.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 2: Singular and Plural Nouns
	lesson2 := models.Lesson{
		Title:       "Singular and Plural Nouns",
		Description: "Изучение единственного и множественного числа существительных",
		Order:       2,
		IsActive:    true,
	}
	if err := db.Create(&lesson2).Error; err != nil {
		return err
	}

	questions2 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму множественного числа: child → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"childs", false},
				{"childes", false},
				{"children", true},
				{"child", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: box → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"boxs", false},
				{"boxes", true},
				{"boxies", false},
				{"box", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: baby → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"babys", false},
				{"babyes", false},
				{"babies", true},
				{"baby", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: man → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"mans", false},
				{"men", true},
				{"mans", false},
				{"mens", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: tooth → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"tooths", false},
				{"toothes", false},
				{"teeth", true},
				{"teeths", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: knife → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"knifes", false},
				{"knives", true},
				{"knifves", false},
				{"knife", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: foot → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"foots", false},
				{"feet", true},
				{"feets", false},
				{"footes", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: sheep → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"sheeps", false},
				{"sheep", true},
				{"sheepes", false},
				{"sheepies", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: tomato → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"tomatos", false},
				{"tomatoes", true},
				{"tomatoe", false},
				{"tomato", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: city → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"citys", false},
				{"cities", true},
				{"cityes", false},
				{"city", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: woman → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"womans", false},
				{"womens", false},
				{"women", true},
				{"woman", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: mouse → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"mouses", false},
				{"mice", true},
				{"mices", false},
				{"mouse", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: glass → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"glasss", false},
				{"glasses", true},
				{"glases", false},
				{"glass", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: leaf → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"leafs", false},
				{"leaves", true},
				{"leafes", false},
				{"leaf", false},
			},
		},
		{
			text: "Выберите правильную форму множественного числа: photo → ___",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"photos", true},
				{"photoes", false},
				{"photoses", false},
				{"photo", false},
			},
		},
	}

	for i, q := range questions2 {
		question := models.Question{
			LessonID: lesson2.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 3: Possessive Nouns
	lesson3 := models.Lesson{
		Title:       "Possessive Nouns",
		Description: "Изучение притяжательной формы существительных",
		Order:       3,
		IsActive:    true,
	}
	if err := db.Create(&lesson3).Error; err != nil {
		return err
	}

	questions3 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: the ___ car (John)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"John's", true},
				{"Johns", false},
				{"Johns'", false},
				{"John", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ toys (children)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"childrens", false},
				{"children's", true},
				{"childrens'", false},
				{"children", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ room (students)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"student's", false},
				{"students", false},
				{"students'", true},
				{"student", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ book (Mary)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Mary's", true},
				{"Marys", false},
				{"Marys'", false},
				{"Mary", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ house (my parents)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"parent's", false},
				{"parents", false},
				{"parents'", true},
				{"parent", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ office (the teacher)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"teacher's", true},
				{"teachers", false},
				{"teachers'", false},
				{"teacher", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ tails (cats)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"cat's", false},
				{"cats", false},
				{"cats'", true},
				{"cat", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ house (James)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"James's", true},
				{"Jamess", false},
				{"James'", true},
				{"Jame's", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ meeting (men)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"men's", true},
				{"mens", false},
				{"mens'", false},
				{"man's", false},
			},
		},
		{
			text: "Выберите правильную форму: my ___ car (brother)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"brother's", true},
				{"brothers", false},
				{"brothers'", false},
				{"brother", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ department (women)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"woman's", false},
				{"women's", true},
				{"womens", false},
				{"womens'", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ and ___ house (John and Mary - общий дом)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"John's and Mary's", false},
				{"Johns and Marys", false},
				{"John and Mary's", true},
				{"John's and Marys", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ bags (students)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"student's", false},
				{"students", false},
				{"students'", true},
				{"student", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ bicycle (Tom)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Tom's", true},
				{"Toms", false},
				{"Toms'", false},
				{"Tom", false},
			},
		},
		{
			text: "Выберите правильную форму: the ___ room (girls)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"girl's", false},
				{"girls", false},
				{"girls'", true},
				{"girl", false},
			},
		},
	}

	for i, q := range questions3 {
		question := models.Question{
			LessonID: lesson3.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 4: Personal Pronouns
	lesson4 := models.Lesson{
		Title:       "Personal Pronouns",
		Description: "Изучение личных местоимений",
		Order:       4,
		IsActive:    true,
	}
	if err := db.Create(&lesson4).Error; err != nil {
		return err
	}

	questions4 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильное местоимение: ___ like pizza. (Я)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", true},
				{"Me", false},
				{"My", false},
				{"Mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: She gave it to ___. (мне)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", false},
				{"me", true},
				{"my", false},
				{"mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ are going home. (Они)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"They", true},
				{"Them", false},
				{"Their", false},
				{"Theirs", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Tell ___ the truth. (нам)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"we", false},
				{"us", true},
				{"our", false},
				{"ours", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ knows her well. (Он)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Him", false},
				{"He", true},
				{"His", false},
				{"Himself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Can you help ___? (нас)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"we", false},
				{"our", false},
				{"us", true},
				{"ours", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ is raining today. (безличное)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"It", true},
				{"He", false},
				{"She", false},
				{"They", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Look at ___! (её)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"she", false},
				{"her", true},
				{"hers", false},
				{"herself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ live in Moscow. (Мы)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"We", true},
				{"Us", false},
				{"Our", false},
				{"Ours", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Give ___ the book. (ему)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"he", false},
				{"him", true},
				{"his", false},
				{"himself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ am a student. (Я)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", true},
				{"Me", false},
				{"My", false},
				{"Mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Can ___ come in? (я)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", true},
				{"me", false},
				{"my", false},
				{"mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Call ___ tomorrow. (их)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"they", false},
				{"them", true},
				{"their", false},
				{"theirs", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ speaks English well. (Она)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Her", false},
				{"She", true},
				{"Hers", false},
				{"Herself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: This is for ___. (вас)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"you", true},
				{"your", false},
				{"yours", false},
				{"yourself", false},
			},
		},
	}

	for i, q := range questions4 {
		question := models.Question{
			LessonID: lesson4.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 5: Possessive Pronouns
	lesson5 := models.Lesson{
		Title:       "Possessive Pronouns",
		Description: "Изучение притяжательных местоимений",
		Order:       5,
		IsActive:    true,
	}
	if err := db.Create(&lesson5).Error; err != nil {
		return err
	}

	questions5 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильное местоимение: This is ___ book. (моя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", false},
				{"me", false},
				{"my", true},
				{"mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: The book is ___. (моя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", false},
				{"me", false},
				{"my", false},
				{"mine", true},
			},
		},
		{
			text: "Выберите правильное местоимение: Is this pen ___ or ___? (твоя, его)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"you, him", false},
				{"your, his", false},
				{"yours, his", true},
				{"yours, him", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ house is bigger than ___. (Их, наш)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Their, ours", true},
				{"Theirs, our", false},
				{"They, our", false},
				{"Their, our", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Where is ___ dog? (её)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"she", false},
				{"her", true},
				{"hers", false},
				{"herself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: This car is ___. (наш)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"we", false},
				{"us", false},
				{"our", false},
				{"ours", true},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ names are John and Tom. (их)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"They", false},
				{"Them", false},
				{"Their", true},
				{"Theirs", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Is this bag ___? (твоя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"you", false},
				{"your", false},
				{"yours", true},
				{"yourself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ sister is a doctor. (его)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"He", false},
				{"Him", false},
				{"His", true},
				{"Himself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: That house is ___. (их)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"they", false},
				{"them", false},
				{"their", false},
				{"theirs", true},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ parents live here. (мои)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"I", false},
				{"Me", false},
				{"My", true},
				{"Mine", false},
			},
		},
		{
			text: "Выберите правильное местоимение: These books are ___. (её)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"she", false},
				{"her", false},
				{"hers", true},
				{"herself", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ house is big. (наш)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"We", false},
				{"Us", false},
				{"Our", true},
				{"Ours", false},
			},
		},
		{
			text: "Выберите правильное местоимение: The red car is ___ and the blue one is ___. (мой, его)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"my, his", false},
				{"mine, his", true},
				{"my, him", false},
				{"mine, him", false},
			},
		},
		{
			text: "Выберите правильное местоимение: ___ cat is very friendly. (её)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"She", false},
				{"Her", true},
				{"Hers", false},
				{"Herself", false},
			},
		},
	}

	for i, q := range questions5 {
		question := models.Question{
			LessonID: lesson5.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 6: Reflexive Pronouns
	lesson6 := models.Lesson{
		Title:       "Reflexive Pronouns",
		Description: "Изучение возвратных местоимений",
		Order:       6,
		IsActive:    true,
	}
	if err := db.Create(&lesson6).Error; err != nil {
		return err
	}

	questions6 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильное местоимение: I cut ___ while cooking. (себя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"me", false},
				{"myself", true},
				{"mine", false},
				{"my", false},
			},
		},
		{
			text: "Выберите правильное местоимение: She looked at ___ in the mirror. (себя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"her", false},
				{"hers", false},
				{"herself", true},
				{"she", false},
			},
		},
		{
			text: "Выберите правильное местоимение: We enjoyed ___ at the party. (себя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"us", false},
				{"ourselves", true},
				{"our", false},
				{"ours", false},
			},
		},
		{
			text: "Выберите правильное местоимение: He did it by ___. (сам)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"him", false},
				{"his", false},
				{"himself", true},
				{"he", false},
			},
		},
		{
			text: "Выберите правильное местоимение: Did you hurt ___? (себя)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"you", false},
				{"your", false},
				{"yourself", true},
				{"yours", false},
			},
		},
	}

	for i, q := range questions6 {
		question := models.Question{
			LessonID: lesson6.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 7: Relative Pronouns
	lesson7 := models.Lesson{
		Title:       "Relative Pronouns: Who, Which, That",
		Description: "Изучение относительных местоимений",
		Order:       7,
		IsActive:    true,
	}
	if err := db.Create(&lesson7).Error; err != nil {
		return err
	}

	questions7 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильное местоимение: The man ___ lives here is a doctor. (который)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", true},
				{"which", false},
				{"what", false},
				{"where", false},
			},
		},
		{
			text: "Выберите правильное местоимение: The book ___ I read was interesting. (которую)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", false},
				{"which", true},
				{"what", false},
				{"where", false},
			},
		},
		{
			text: "Выберите правильное местоимение: I like people ___ are honest. (которые)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"that", true},
				{"what", false},
				{"where", false},
				{"when", false},
			},
		},
		{
			text: "Выберите правильное местоимение: The car ___ he bought is expensive. (который)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", false},
				{"that", true},
				{"what", false},
				{"where", false},
			},
		},
		{
			text: "Выберите правильное местоимение: The woman ___ called you is my sister. (которая)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", true},
				{"which", false},
				{"what", false},
				{"where", false},
			},
		},
	}

	for i, q := range questions7 {
		question := models.Question{
			LessonID: lesson7.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 8: Articles A and An
	lesson8 := models.Lesson{
		Title:       "Articles: A and An",
		Description: "Изучение неопределённых артиклей",
		Order:       8,
		IsActive:    true,
	}
	if err := db.Create(&lesson8).Error; err != nil {
		return err
	}

	questions8 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный артикль: ___ apple",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", true},
				{"the", false},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный артикль: ___ university",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", true},
				{"an", false},
				{"the", false},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный артикль: ___ hour",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", true},
				{"the", false},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный артикль: He is ___ engineer.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", true},
				{"the", false},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный артикль: I need ___ pen.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", true},
				{"an", false},
				{"the", false},
				{"-", false},
			},
		},
	}

	for i, q := range questions8 {
		question := models.Question{
			LessonID: lesson8.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 9: The Definite Article
	lesson9 := models.Lesson{
		Title:       "The Definite Article: The",
		Description: "Изучение определённого артикля",
		Order:       9,
		IsActive:    true,
	}
	if err := db.Create(&lesson9).Error; err != nil {
		return err
	}

	questions9 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный вариант: I bought a car. ___ car is red.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"A", false},
				{"An", false},
				{"The", true},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный вариант: ___ sun is shining today.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"A", false},
				{"An", false},
				{"The", true},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный вариант: Close ___ door, please.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", false},
				{"the", true},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный вариант: ___ Thames is a famous river.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"A", false},
				{"An", false},
				{"The", true},
				{"-", false},
			},
		},
		{
			text: "Выберите правильный вариант: I like ___ cats. (в целом)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"a", false},
				{"an", false},
				{"the", false},
				{"-", true},
			},
		},
	}

	for i, q := range questions9 {
		question := models.Question{
			LessonID: lesson9.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 10: Demonstratives and Quantifiers
	lesson10 := models.Lesson{
		Title:       "Demonstratives and Quantifiers",
		Description: "Изучение указательных местоимений и квантификаторов",
		Order:       10,
		IsActive:    true,
	}
	if err := db.Create(&lesson10).Error; err != nil {
		return err
	}

	questions10 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильное слово: ___ book is mine. (эта - близко)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"This", true},
				{"That", false},
				{"These", false},
				{"Those", false},
			},
		},
		{
			text: "Выберите правильное слово: ___ books are old. (эти - близко)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"This", false},
				{"That", false},
				{"These", true},
				{"Those", false},
			},
		},
		{
			text: "Выберите правильное слово: I have ___ money.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"some", true},
				{"any", false},
				{"many", false},
				{"few", false},
			},
		},
		{
			text: "Выберите правильное слово: Do you have ___ questions?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"some", false},
				{"any", true},
				{"much", false},
				{"little", false},
			},
		},
		{
			text: "Выберите правильное слово: How ___ people are there?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"much", false},
				{"many", true},
				{"little", false},
				{"few", false},
			},
		},
	}

	for i, q := range questions10 {
		question := models.Question{
			LessonID: lesson10.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 11: Adjectives - Degrees of Comparison
	lesson11 := models.Lesson{
		Title:       "Adjectives: Degrees of Comparison",
		Description: "Степени сравнения прилагательных",
		Order:       11,
		IsActive:    true,
	}
	if err := db.Create(&lesson11).Error; err != nil {
		return err
	}

	questions11 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: This car is ___ than that one.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"more fast", false},
				{"faster", true},
				{"fastest", false},
				{"the fastest", false},
			},
		},
		{
			text: "Выберите правильную форму: She is the ___ student in the class.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"more intelligent", false},
				{"most intelligent", true},
				{"intelligentest", false},
				{"more intelligentest", false},
			},
		},
		{
			text: "Выберите правильную форму: This is the ___ movie I've ever seen.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"good", false},
				{"better", false},
				{"best", true},
				{"goodest", false},
			},
		},
		{
			text: "Выберите правильную форму: My house is ___ than yours.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"big", false},
				{"more big", false},
				{"bigger", true},
				{"the biggest", false},
			},
		},
		{
			text: "Выберите правильную форму: This task is ___ difficult than the previous one.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"more", true},
				{"most", false},
				{"much", false},
				{"very", false},
			},
		},
	}

	for i, q := range questions11 {
		question := models.Question{
			LessonID: lesson11.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 12: Order of Adjectives
	lesson12 := models.Lesson{
		Title:       "Order of Adjectives",
		Description: "Порядок прилагательных перед существительным",
		Order:       12,
		IsActive:    true,
	}
	if err := db.Create(&lesson12).Error; err != nil {
		return err
	}

	questions12 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный порядок: a ___ dress",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"beautiful long red silk", true},
				{"red long beautiful silk", false},
				{"silk red beautiful long", false},
				{"long silk red beautiful", false},
			},
		},
		{
			text: "Выберите правильный порядок: a ___ table",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"round wooden old", false},
				{"old round wooden", true},
				{"wooden old round", false},
				{"old wooden round", false},
			},
		},
		{
			text: "Выберите правильный порядок: ___ cars",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"expensive two German", false},
				{"two expensive German", true},
				{"German two expensive", false},
				{"two German expensive", false},
			},
		},
		{
			text: "Выберите правильный порядок: a ___ house",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"lovely small old", true},
				{"old small lovely", false},
				{"small old lovely", false},
				{"lovely old small", false},
			},
		},
		{
			text: "Выберите правильный порядок: a ___ cat",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"black beautiful big", false},
				{"big beautiful black", true},
				{"beautiful big black", false},
				{"beautiful black big", false},
			},
		},
	}

	for i, q := range questions12 {
		question := models.Question{
			LessonID: lesson12.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 13: Adverbs Formation and Position
	lesson13 := models.Lesson{
		Title:       "Adverbs: Formation and Position",
		Description: "Образование наречий и их позиция в предложении",
		Order:       13,
		IsActive:    true,
	}
	if err := db.Create(&lesson13).Error; err != nil {
		return err
	}

	questions13 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: He drives very ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"careful", false},
				{"carefully", true},
				{"care", false},
				{"carefulness", false},
			},
		},
		{
			text: "Выберите правильную форму: She sings ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"beautiful", false},
				{"beautifully", true},
				{"beauty", false},
				{"more beautiful", false},
			},
		},
		{
			text: "Выберите правильный вариант: He ___ goes to the gym.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"always", true},
				{"very", false},
				{"much", false},
				{"good", false},
			},
		},
		{
			text: "Выберите правильный вариант: She speaks English ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"good", false},
				{"well", true},
				{"goodly", false},
				{"better", false},
			},
		},
		{
			text: "Выберите правильный вариант: They ___ late.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"are never", true},
				{"never are", false},
				{"not never", false},
				{"aren't never", false},
			},
		},
	}

	for i, q := range questions13 {
		question := models.Question{
			LessonID: lesson13.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 14: Present Simple and Present Continuous
	lesson14 := models.Lesson{
		Title:       "Present Simple and Present Continuous",
		Description: "Настоящее простое и длительное время",
		Order:       14,
		IsActive:    true,
	}
	if err := db.Create(&lesson14).Error; err != nil {
		return err
	}

	questions14 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: She ___ to school every day.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"go", false},
				{"goes", true},
				{"is going", false},
				{"going", false},
			},
		},
		{
			text: "Выберите правильную форму: They ___ dinner right now.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"have", false},
				{"has", false},
				{"are having", true},
				{"having", false},
			},
		},
		{
			text: "Выберите правильную форму (стативный глагол): I ___ this song.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"am liking", false},
				{"like", true},
				{"likes", false},
				{"liking", false},
			},
		},
		{
			text: "Выберите правильную форму: The train ___ at 8 PM. (расписание)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"leave", false},
				{"leaves", true},
				{"is leaving", false},
				{"leaving", false},
			},
		},
		{
			text: "Выберите правильную форму: He ___ with us this week.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"stays", false},
				{"stay", false},
				{"is staying", true},
				{"staying", false},
			},
		},
	}

	for i, q := range questions14 {
		question := models.Question{
			LessonID: lesson14.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 15: Present Perfect and Present Perfect Continuous
	lesson15 := models.Lesson{
		Title:       "Present Perfect and Present Perfect Continuous",
		Description: "Настоящее совершенное и длительное совершенное время",
		Order:       15,
		IsActive:    true,
	}
	if err := db.Create(&lesson15).Error; err != nil {
		return err
	}

	questions15 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: I ___ this book for two hours.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"read", false},
				{"am reading", false},
				{"have been reading", true},
				{"have read", false},
			},
		},
		{
			text: "Выберите правильную форму: She ___ her homework already.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"finished", false},
				{"has finished", true},
				{"has been finishing", false},
				{"is finishing", false},
			},
		},
		{
			text: "Выберите правильную форму (стативный): I ___ her since 2010.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"know", false},
				{"have known", true},
				{"have been knowing", false},
				{"am knowing", false},
			},
		},
		{
			text: "Выберите правильную форму: How long ___ here?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"do you wait", false},
				{"are you waiting", false},
				{"have you been waiting", true},
				{"did you wait", false},
			},
		},
		{
			text: "Выберите правильную форму: They ___ three books this month. (результат)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"read", false},
				{"are reading", false},
				{"have read", true},
				{"have been reading", false},
			},
		},
	}

	for i, q := range questions15 {
		question := models.Question{
			LessonID: lesson15.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 16: Past Simple and Past Continuous
	lesson16 := models.Lesson{
		Title:       "Past Simple and Past Continuous",
		Description: "Прошедшее простое и длительное время, рассказы",
		Order:       16,
		IsActive:    true,
	}
	if err := db.Create(&lesson16).Error; err != nil {
		return err
	}

	questions16 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: I ___ TV when he ___ in.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"watched; came", false},
				{"was watching; came", true},
				{"watched; was coming", false},
				{"was watching; was coming", false},
			},
		},
		{
			text: "Выберите правильную форму: They ___ dinner when the phone ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"had; rang", false},
				{"were having; rang", true},
				{"had; was ringing", false},
				{"were having; was ringing", false},
			},
		},
		{
			text: "Выберите правильную форму: She ___ to music while she ___ her homework.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"listened; did", false},
				{"was listening; was doing", true},
				{"listened; was doing", false},
				{"was listening; did", false},
			},
		},
		{
			text: "Выберите правильную форму: What ___ at 9 PM yesterday?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"did you do", false},
				{"were you doing", true},
				{"do you do", false},
				{"are you doing", false},
			},
		},
		{
			text: "Выберите правильную форму: He ___ up, ___ breakfast and ___ to work.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"woke; had; went", true},
				{"was waking; was having; was going", false},
				{"woke; was having; went", false},
				{"was waking; had; was going", false},
			},
		},
	}

	for i, q := range questions16 {
		question := models.Question{
			LessonID: lesson16.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 17: Past Perfect and Past Perfect Continuous
	lesson17 := models.Lesson{
		Title:       "Past Perfect and Past Perfect Continuous",
		Description: "Прошедшее совершенное и длительное совершенное, временные связки",
		Order:       17,
		IsActive:    true,
	}
	if err := db.Create(&lesson17).Error; err != nil {
		return err
	}

	questions17 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: When we arrived, the film ___ already ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"was; starting", false},
				{"had; started", true},
				{"has; started", false},
				{"did; start", false},
			},
		},
		{
			text: "Выберите правильную форму: He was tired because he ___ all day.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"worked", false},
				{"was working", false},
				{"had been working", true},
				{"has been working", false},
			},
		},
		{
			text: "Выберите правильную форму: After she ___ dinner, she ___ TV.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"finished; watched", false},
				{"had finished; watched", true},
				{"finished; had watched", false},
				{"was finishing; watched", false},
			},
		},
		{
			text: "Выберите правильную форму: By the time I got home, they ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"left", false},
				{"were leaving", false},
				{"had left", true},
				{"have left", false},
			},
		},
		{
			text: "Выберите правильную форму: They ___ for two hours before it started raining.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"played", false},
				{"were playing", false},
				{"had been playing", true},
				{"have been playing", false},
			},
		},
	}

	for i, q := range questions17 {
		question := models.Question{
			LessonID: lesson17.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 18: Future Simple - Will vs Going to
	lesson18 := models.Lesson{
		Title:       "Future Simple: Will vs Going to",
		Description: "Будущее время: will и going to, предсказания и планы",
		Order:       18,
		IsActive:    true,
	}
	if err := db.Create(&lesson18).Error; err != nil {
		return err
	}

	questions18 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: I ___ help you. (спонтанное решение)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will", true},
				{"am going to", false},
				{"go to", false},
				{"will going to", false},
			},
		},
		{
			text: "Выберите правильную форму: She ___ study medicine. (план)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will", false},
				{"is going to", true},
				{"goes to", false},
				{"will going", false},
			},
		},
		{
			text: "Выберите правильную форму: Look at those clouds! It ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will rain", false},
				{"is going to rain", true},
				{"rains", false},
				{"is raining", false},
			},
		},
		{
			text: "Выберите правильную форму: I think he ___ the game. (предсказание)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will win", true},
				{"is going to win", false},
				{"wins", false},
				{"is winning", false},
			},
		},
		{
			text: "Выберите правильную форму: We ___ married next month. (план)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will get", false},
				{"are going to get", true},
				{"get", false},
				{"will getting", false},
			},
		},
	}

	for i, q := range questions18 {
		question := models.Question{
			LessonID: lesson18.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 19: Future Continuous and Future Perfect
	lesson19 := models.Lesson{
		Title:       "Future Continuous and Future Perfect",
		Description: "Будущее длительное и совершенное время, договорённости",
		Order:       19,
		IsActive:    true,
	}
	if err := db.Create(&lesson19).Error; err != nil {
		return err
	}

	questions19 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: This time tomorrow I ___ on the beach.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will lie", false},
				{"will be lying", true},
				{"am lying", false},
				{"will lying", false},
			},
		},
		{
			text: "Выберите правильную форму: By 2030, I ___ my degree.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will finish", false},
				{"will be finishing", false},
				{"will have finished", true},
				{"finish", false},
			},
		},
		{
			text: "Выберите правильную форму: We ___ dinner at 7 PM. (договорённость)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will have", false},
				{"are having", true},
				{"will be having", false},
				{"have", false},
			},
		},
		{
			text: "Выберите правильную форму: Don't call at 8. I ___ a meeting.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will have", false},
				{"will be having", true},
				{"have", false},
				{"am having", false},
			},
		},
		{
			text: "Выберите правильную форму: By the time you arrive, I ___ everything.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will prepare", false},
				{"will be preparing", false},
				{"will have prepared", true},
				{"prepare", false},
			},
		},
	}

	for i, q := range questions19 {
		question := models.Question{
			LessonID: lesson19.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 20: Prepositions of Time and Place
	lesson20 := models.Lesson{
		Title:       "Prepositions of Time and Place",
		Description: "Предлоги времени и места",
		Order:       20,
		IsActive:    true,
	}
	if err := db.Create(&lesson20).Error; err != nil {
		return err
	}

	questions20 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный предлог: I was born ___ 1995.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"at", false},
				{"on", false},
				{"in", true},
				{"by", false},
			},
		},
		{
			text: "Выберите правильный предлог: The meeting is ___ Monday.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"at", false},
				{"on", true},
				{"in", false},
				{"by", false},
			},
		},
		{
			text: "Выберите правильный предлог: I'll meet you ___ the station.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"at", true},
				{"on", false},
				{"in", false},
				{"by", false},
			},
		},
		{
			text: "Выберите правильный предлог: She lives ___ London.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"at", false},
				{"on", false},
				{"in", true},
				{"to", false},
			},
		},
		{
			text: "Выберите правильный предлог: The book is ___ the table.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"at", false},
				{"on", true},
				{"in", false},
				{"by", false},
			},
		},
	}

	for i, q := range questions20 {
		question := models.Question{
			LessonID: lesson20.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 21: Phrasal Verbs
	lesson21 := models.Lesson{
		Title:       "Common Phrasal Verbs",
		Description: "Распространённые фразовые глаголы",
		Order:       21,
		IsActive:    true,
	}
	if err := db.Create(&lesson21).Error; err != nil {
		return err
	}

	questions21 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный фразовый глагол: I ___ at 7 AM every day. (просыпаться)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"get up", true},
				{"get on", false},
				{"get off", false},
				{"get by", false},
			},
		},
		{
			text: "Выберите правильный фразовый глагол: Can you ___ my dog while I'm away? (присматривать)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"look at", false},
				{"look for", false},
				{"look after", true},
				{"look up", false},
			},
		},
		{
			text: "Выберите правильный фразовый глагол: Please ___ the form. (заполнить)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"fill up", false},
				{"fill in", true},
				{"fill out", false},
				{"fill on", false},
			},
		},
		{
			text: "Выберите правильный фразовый глагол: I need to ___ this word in the dictionary. (найти)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"look at", false},
				{"look for", false},
				{"look after", false},
				{"look up", true},
			},
		},
		{
			text: "Выберите правильный фразовый глагол: The meeting was ___. (отменена)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"called off", true},
				{"called on", false},
				{"called in", false},
				{"called at", false},
			},
		},
	}

	for i, q := range questions21 {
		question := models.Question{
			LessonID: lesson21.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 22: Modal Verbs - Ability and Permission
	lesson22 := models.Lesson{
		Title:       "Modal Verbs: Ability and Permission",
		Description: "Модальные глаголы: способность и разрешение",
		Order:       22,
		IsActive:    true,
	}
	if err := db.Create(&lesson22).Error; err != nil {
		return err
	}

	questions22 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: I ___ swim when I was five.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"can", false},
				{"could", true},
				{"may", false},
				{"might", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ I use your phone?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Can", true},
				{"Must", false},
				{"Should", false},
				{"Have to", false},
			},
		},
		{
			text: "Выберите правильную форму: You ___ smoke here. It's forbidden.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"can", false},
				{"can't", true},
				{"couldn't", false},
				{"may not", false},
			},
		},
		{
			text: "Выберите правильную форму: ___ I come in?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Must", false},
				{"Should", false},
				{"May", true},
				{"Have to", false},
			},
		},
		{
			text: "Выберите правильную форму: She ___ speak three languages.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"can", true},
				{"may", false},
				{"must", false},
				{"should", false},
			},
		},
	}

	for i, q := range questions22 {
		question := models.Question{
			LessonID: lesson22.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 23: Modal Verbs - Obligation and Advice
	lesson23 := models.Lesson{
		Title:       "Modal Verbs: Obligation and Advice",
		Description: "Модальные глаголы: обязанность и совет",
		Order:       23,
		IsActive:    true,
	}
	if err := db.Create(&lesson23).Error; err != nil {
		return err
	}

	questions23 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: You ___ study harder. (совет)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"must", false},
				{"should", true},
				{"can", false},
				{"may", false},
			},
		},
		{
			text: "Выберите правильную форму: I ___ go now. It's late. (необходимость)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"should", false},
				{"must", true},
				{"can", false},
				{"may", false},
			},
		},
		{
			text: "Выберите правильную форму: You ___ wear a uniform at school. (обязанность)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"should", false},
				{"must", false},
				{"have to", true},
				{"may", false},
			},
		},
		{
			text: "Выберите правильную форму: You ___ park here. (запрет)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"don't have to", false},
				{"mustn't", true},
				{"shouldn't", false},
				{"may not", false},
			},
		},
		{
			text: "Выберите правильную форму: You ___ come if you don't want to. (нет обязанности)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"mustn't", false},
				{"don't have to", true},
				{"can't", false},
				{"may not", false},
			},
		},
	}

	for i, q := range questions23 {
		question := models.Question{
			LessonID: lesson23.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 24: Zero and First Conditionals
	lesson24 := models.Lesson{
		Title:       "Zero and First Conditionals",
		Description: "Условные предложения нулевого и первого типа",
		Order:       24,
		IsActive:    true,
	}
	if err := db.Create(&lesson24).Error; err != nil {
		return err
	}

	questions24 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: If you ___ water, it boils. (Zero Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"heat", true},
				{"will heat", false},
				{"heated", false},
				{"would heat", false},
			},
		},
		{
			text: "Выберите правильную форму: If it ___ tomorrow, we will stay home. (First Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"rains", true},
				{"will rain", false},
				{"rained", false},
				{"would rain", false},
			},
		},
		{
			text: "Выберите правильную форму: If I ___ time, I will help you.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"have", true},
				{"will have", false},
				{"had", false},
				{"would have", false},
			},
		},
		{
			text: "Выберите правильную форму: Ice ___ if you heat it. (Zero Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"melts", true},
				{"will melt", false},
				{"melted", false},
				{"would melt", false},
			},
		},
		{
			text: "Выберите правильную форму: If she ___ hard, she ___ the exam.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"studies; will pass", true},
				{"will study; passes", false},
				{"studied; would pass", false},
				{"studies; passes", false},
			},
		},
	}

	for i, q := range questions24 {
		question := models.Question{
			LessonID: lesson24.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 25: Second and Third Conditionals
	lesson25 := models.Lesson{
		Title:       "Second and Third Conditionals",
		Description: "Условные предложения второго и третьего типа, смешанные",
		Order:       25,
		IsActive:    true,
	}
	if err := db.Create(&lesson25).Error; err != nil {
		return err
	}

	questions25 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: If I ___ rich, I would travel the world. (Second Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"am", false},
				{"was", false},
				{"were", true},
				{"will be", false},
			},
		},
		{
			text: "Выберите правильную форму: If I ___ harder, I would have passed. (Third Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"studied", false},
				{"had studied", true},
				{"have studied", false},
				{"would study", false},
			},
		},
		{
			text: "Выберите правильную форму: If she ___ the truth, she ___ angry.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"knew; would be", true},
				{"knows; will be", false},
				{"had known; would have been", false},
				{"knows; would be", false},
			},
		},
		{
			text: "Выберите правильную форму: If they ___ earlier, they ___ the train.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"left; would catch", false},
				{"had left; would have caught", true},
				{"leave; will catch", false},
				{"left; would have caught", false},
			},
		},
		{
			text: "Выберите правильную форму: If I ___ you, I would apologize. (Second Conditional)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"am", false},
				{"was", false},
				{"were", true},
				{"had been", false},
			},
		},
	}

	for i, q := range questions25 {
		question := models.Question{
			LessonID: lesson25.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 26: Passive Voice - Present and Past
	lesson26 := models.Lesson{
		Title:       "Passive Voice: Present and Past",
		Description: "Страдательный залог в настоящем и прошедшем времени",
		Order:       26,
		IsActive:    true,
	}
	if err := db.Create(&lesson26).Error; err != nil {
		return err
	}

	questions26 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: The letter ___ every day. (пишется)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"writes", false},
				{"is written", true},
				{"was written", false},
				{"has written", false},
			},
		},
		{
			text: "Выберите правильную форму: The house ___ last year. (был построен)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"built", false},
				{"is built", false},
				{"was built", true},
				{"has been built", false},
			},
		},
		{
			text: "Выберите правильную форму: English ___ all over the world.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"speaks", false},
				{"is spoken", true},
				{"was spoken", false},
				{"spoke", false},
			},
		},
		{
			text: "Выберите правильную форму: The windows ___ yesterday.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"cleaned", false},
				{"are cleaned", false},
				{"were cleaned", true},
				{"have been cleaned", false},
			},
		},
		{
			text: "Выберите правильную форму: This room ___ every week.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"cleans", false},
				{"is cleaned", true},
				{"was cleaned", false},
				{"cleaned", false},
			},
		},
	}

	for i, q := range questions26 {
		question := models.Question{
			LessonID: lesson26.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 27: Passive Voice - Future and Perfect
	lesson27 := models.Lesson{
		Title:       "Passive Voice: Future and Perfect",
		Description: "Страдательный залог в будущем и перфектных временах",
		Order:       27,
		IsActive:    true,
	}
	if err := db.Create(&lesson27).Error; err != nil {
		return err
	}

	questions27 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильную форму: The work ___ tomorrow. (будет закончена)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will finish", false},
				{"will be finished", true},
				{"is finished", false},
				{"was finished", false},
			},
		},
		{
			text: "Выберите правильную форму: The letter ___ already ___. (уже была отправлена)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"has sent", false},
				{"is sent", false},
				{"has been sent", true},
				{"was sent", false},
			},
		},
		{
			text: "Выберите правильную форму: The bridge ___ by next year.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will build", false},
				{"will be built", true},
				{"is built", false},
				{"has been built", false},
			},
		},
		{
			text: "Выберите правильную форму: The room ___ since morning.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"is being cleaned", false},
				{"has been being cleaned", false},
				{"has been cleaned", true},
				{"was cleaned", false},
			},
		},
		{
			text: "Выберите правильную форму: The documents ___ by the time you arrive.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will prepare", false},
				{"will be prepared", false},
				{"will have been prepared", true},
				{"are prepared", false},
			},
		},
	}

	for i, q := range questions27 {
		question := models.Question{
			LessonID: lesson27.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 28: Reported Speech - Statements and Questions
	lesson28 := models.Lesson{
		Title:       "Reported Speech: Statements and Questions",
		Description: "Косвенная речь: утверждения и вопросы",
		Order:       28,
		IsActive:    true,
	}
	if err := db.Create(&lesson28).Error; err != nil {
		return err
	}

	questions28 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Преобразуйте: He said, 'I am tired.' → He said ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"he is tired", false},
				{"he was tired", true},
				{"I am tired", false},
				{"I was tired", false},
			},
		},
		{
			text: "Преобразуйте: She asked, 'Where do you live?' → She asked ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"where do I live", false},
				{"where I lived", true},
				{"where did I live", false},
				{"where do you live", false},
			},
		},
		{
			text: "Преобразуйте: 'I will come tomorrow,' he said. → He said ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"he will come tomorrow", false},
				{"he would come the next day", true},
				{"I will come tomorrow", false},
				{"he will come the next day", false},
			},
		},
		{
			text: "Преобразуйте: 'Have you seen this film?' she asked. → She asked ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"have I seen that film", false},
				{"if I had seen that film", true},
				{"have you seen this film", false},
				{"did I see that film", false},
			},
		},
		{
			text: "Преобразуйте: 'I can't help you,' he said. → He said ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"he can't help me", false},
				{"he couldn't help me", true},
				{"I can't help you", false},
				{"I couldn't help you", false},
			},
		},
	}

	for i, q := range questions28 {
		question := models.Question{
			LessonID: lesson28.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 29: Reported Speech - Commands and Time Expressions
	lesson29 := models.Lesson{
		Title:       "Reported Speech: Commands and Time Expressions",
		Description: "Косвенная речь: приказы и изменения времени",
		Order:       29,
		IsActive:    true,
	}
	if err := db.Create(&lesson29).Error; err != nil {
		return err
	}

	questions29 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Преобразуйте приказ: 'Close the door!' → He told me ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"close the door", false},
				{"to close the door", true},
				{"closing the door", false},
				{"closed the door", false},
			},
		},
		{
			text: "Преобразуйте: 'Don't be late!' → She told me ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"don't be late", false},
				{"not to be late", true},
				{"not be late", false},
				{"to not be late", false},
			},
		},
		{
			text: "Измените время: 'I saw him yesterday.' → He said he ___ the day before.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"saw him", false},
				{"had seen him", true},
				{"has seen him", false},
				{"sees him", false},
			},
		},
		{
			text: "Измените время: 'I'll do it tomorrow.' → She said she ___ it ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"will do; tomorrow", false},
				{"would do; the next day", true},
				{"will do; the next day", false},
				{"would do; tomorrow", false},
			},
		},
		{
			text: "Преобразуйте: 'Please help me.' → He asked me ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"please help him", false},
				{"to help him", true},
				{"help him", false},
				{"helping him", false},
			},
		},
	}

	for i, q := range questions29 {
		question := models.Question{
			LessonID: lesson29.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 30: Simple, Compound and Complex Sentences
	lesson30 := models.Lesson{
		Title:       "Simple, Compound and Complex Sentences",
		Description: "Простые, сложносочинённые и сложноподчинённые предложения",
		Order:       30,
		IsActive:    true,
	}
	if err := db.Create(&lesson30).Error; err != nil {
		return err
	}

	questions30 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Определите тип предложения: 'I like tea, but she prefers coffee.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Simple", false},
				{"Compound", true},
				{"Complex", false},
				{"Compound-Complex", false},
			},
		},
		{
			text: "Определите тип: 'Although it was raining, we went for a walk.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Simple", false},
				{"Compound", false},
				{"Complex", true},
				{"Fragment", false},
			},
		},
		{
			text: "Выберите правильное соединение: I studied hard ___ I passed the exam.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"but", false},
				{"and", true},
				{"although", false},
				{"because", false},
			},
		},
		{
			text: "Какое предложение сложное (complex)? ",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"She sings and dances.", false},
				{"I like coffee, but he likes tea.", false},
				{"When he arrived, we left.", true},
				{"He is tall.", false},
			},
		},
		{
			text: "Выберите правильный союз: He stayed home ___ he was sick.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"and", false},
				{"but", false},
				{"because", true},
				{"or", false},
			},
		},
	}

	for i, q := range questions30 {
		question := models.Question{
			LessonID: lesson30.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 31: Relative Clauses and Gerunds/Infinitives
	lesson31 := models.Lesson{
		Title:       "Relative Clauses and Gerunds/Infinitives",
		Description: "Относительные придаточные, герундий и инфинитив",
		Order:       31,
		IsActive:    true,
	}
	if err := db.Create(&lesson31).Error; err != nil {
		return err
	}

	questions31 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный вариант: The book ___ I read was interesting. (defining)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", false},
				{"which", true},
				{", which", false},
				{"what", false},
			},
		},
		{
			text: "Выберите правильный вариант: My brother, ___ lives in London, is a doctor. (non-defining)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who", false},
				{", who", true},
				{"which", false},
				{"that", false},
			},
		},
		{
			text: "Выберите правильную форму: I enjoy ___ books.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"read", false},
				{"to read", false},
				{"reading", true},
				{"reads", false},
			},
		},
		{
			text: "Выберите правильную форму: I want ___ a doctor.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"be", false},
				{"to be", true},
				{"being", false},
				{"been", false},
			},
		},
		{
			text: "Выберите правильную форму: She decided ___ the job.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"take", false},
				{"to take", true},
				{"taking", false},
				{"took", false},
			},
		},
	}

	for i, q := range questions31 {
		question := models.Question{
			LessonID: lesson31.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 32: Coordinating and Subordinating Conjunctions
	lesson32 := models.Lesson{
		Title:       "Coordinating and Subordinating Conjunctions",
		Description: "Сочинительные и подчинительные союзы",
		Order:       32,
		IsActive:    true,
	}
	if err := db.Create(&lesson32).Error; err != nil {
		return err
	}

	questions32 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите сочинительный союз: I like tea ___ coffee.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"because", false},
				{"although", false},
				{"and", true},
				{"if", false},
			},
		},
		{
			text: "Выберите подчинительный союз: I stayed home ___ I was tired.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"and", false},
				{"but", false},
				{"or", false},
				{"because", true},
			},
		},
		{
			text: "Выберите правильный союз: ___ it was raining, we went out.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"And", false},
				{"But", false},
				{"Although", true},
				{"Or", false},
			},
		},
		{
			text: "Выберите правильный союз: Hurry up, ___ we'll be late.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"and", false},
				{"or", true},
				{"because", false},
				{"although", false},
			},
		},
		{
			text: "Выберите правильный союз: I'll call you ___ I arrive.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"and", false},
				{"but", false},
				{"or", false},
				{"when", true},
			},
		},
	}

	for i, q := range questions32 {
		question := models.Question{
			LessonID: lesson32.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 33: Noun and Adverbial Clauses
	lesson33 := models.Lesson{
		Title:       "Noun and Adverbial Clauses",
		Description: "Придаточные существительные и обстоятельственные",
		Order:       33,
		IsActive:    true,
	}
	if err := db.Create(&lesson33).Error; err != nil {
		return err
	}

	questions33 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Определите тип придаточного: 'I know that he is right.' (существительное)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Noun clause", true},
				{"Adverbial clause", false},
				{"Relative clause", false},
				{"Independent clause", false},
			},
		},
		{
			text: "Определите тип: 'When it rains, I stay home.' (обстоятельственное времени)",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Noun clause", false},
				{"Adverbial clause of time", true},
				{"Relative clause", false},
				{"Adjective clause", false},
			},
		},
		{
			text: "Выберите правильный вариант: I wonder ___ he will come.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"that", false},
				{"if", true},
				{"when", false},
				{"because", false},
			},
		},
		{
			text: "Выберите правильный вариант: She left early ___ she could catch the train.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"that", false},
				{"what", false},
				{"so that", true},
				{"which", false},
			},
		},
		{
			text: "Выберите правильный вариант: The problem is ___ we don't have enough time.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"because", false},
				{"that", true},
				{"when", false},
				{"if", false},
			},
		},
	}

	for i, q := range questions33 {
		question := models.Question{
			LessonID: lesson33.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 34: Punctuation in Complex Sentences
	lesson34 := models.Lesson{
		Title:       "Punctuation in Complex Sentences",
		Description: "Пунктуация в сложных предложениях",
		Order:       34,
		IsActive:    true,
	}
	if err := db.Create(&lesson34).Error; err != nil {
		return err
	}

	questions34 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный вариант: My brother ___ lives in Paris ___ is a teacher.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"who; (no comma)", false},
				{", who; , (commas)", true},
				{"that; (no comma)", false},
				{", that; , (commas)", false},
			},
		},
		{
			text: "Где нужна запятая? 'I studied hard ___ I passed the exam.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"before 'and'", false},
				{"after 'hard'", false},
				{"no comma needed", true},
				{"both places", false},
			},
		},
		{
			text: "Выберите правильный вариант: 'Although it was late ___ we continued working.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"(no comma)", false},
				{", (comma)", true},
				{"; (semicolon)", false},
				{": (colon)", false},
			},
		},
		{
			text: "Правильная пунктуация: 'She said ___ I am tired.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{": (colon)", false},
				{", (comma)", false},
				{"that (no punctuation)", true},
				{"; (semicolon)", false},
			},
		},
		{
			text: "Выберите правильный вариант независимых предложений: 'It was late ___ we went home.'",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{", (comma only)", false},
				{"; (semicolon)", true},
				{". (period - two sentences)", true},
				{", so (comma + conjunction)", true},
			},
		},
	}

	for i, q := range questions34 {
		question := models.Question{
			LessonID: lesson34.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	// Урок 35: Word Order and Question Tags
	lesson35 := models.Lesson{
		Title:       "Word Order, Question Tags and Emphasis",
		Description: "Порядок слов, разделительные вопросы и эмфаза",
		Order:       35,
		IsActive:    true,
	}
	if err := db.Create(&lesson35).Error; err != nil {
		return err
	}

	questions35 := []struct {
		text    string
		answers []struct {
			text      string
			isCorrect bool
		}
	}{
		{
			text: "Выберите правильный порядок: He gave ___.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"me the book", true},
				{"the book me", false},
				{"to me book", false},
				{"book to me", false},
			},
		},
		{
			text: "Выберите правильный tag: She is a teacher, ___?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"is she", false},
				{"isn't she", true},
				{"doesn't she", false},
				{"does she", false},
			},
		},
		{
			text: "Выберите правильный tag: They haven't arrived, ___?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"haven't they", false},
				{"have they", true},
				{"did they", false},
				{"didn't they", false},
			},
		},
		{
			text: "Выберите правильный порядок для эмфазы: ___ I want is some peace.",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"That", false},
				{"What", true},
				{"Which", false},
				{"It", false},
			},
		},
		{
			text: "Выберите правильный порядок вопроса: ___ she live?",
			answers: []struct {
				text      string
				isCorrect bool
			}{
				{"Where does", true},
				{"Where do", false},
				{"Where is", false},
				{"Does where", false},
			},
		},
	}

	for i, q := range questions35 {
		question := models.Question{
			LessonID: lesson35.ID,
			Text:     q.text,
			Order:    i + 1,
		}
		if err := db.Create(&question).Error; err != nil {
			return err
		}

		for j, ans := range q.answers {
			answer := models.AnswerOption{
				QuestionID: question.ID,
				Text:       ans.text,
				IsCorrect:  ans.isCorrect,
				Order:      j + 1,
			}
			if err := db.Create(&answer).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
