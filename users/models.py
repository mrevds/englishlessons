# users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class User(AbstractUser):
    # Роли
    class Role(models.TextChoices):
        STUDENT = 'student', 'Ученик'
        TEACHER = 'teacher', 'Учитель'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT,
        verbose_name="Роль"
    )

    # Класс (только для учеников: 1–11)
    level = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        verbose_name="Класс"
    )
    # Буква класса (А, Б, В, Г, Д, Е и т.д.)
    level_letter = models.CharField(
        max_length=1,  # обычно одна буква, но на всякий случай 2
        blank=True,
        verbose_name=("Буква класса"),
        help_text=("Например: А, Б, В, Е")
    )

    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
        verbose_name="Аватар"
    )

    def clean(self):
        """Валидация: у учителя не может быть level, у ученика — должен быть"""
        if self.role == self.Role.TEACHER and self.level is not None:
            raise ValidationError("У учителя не может быть указан класс.")
        if self.role == self.Role.STUDENT and self.level is None:
            raise ValidationError("У ученика должен быть указан класс (1–11).")
        if self.role == self.Role.STUDENT and not (1 <= self.level <= 11):
            raise ValidationError("Класс должен быть от 1 до 11.")

    def clean(self):
        """Валидация логики класса"""
        if self.role == self.Role.TEACHER:
            if self.level is not None or self.level_letter:
                raise ValidationError("У учителя не может быть указан класс или буква.")
            return

        if self.role == self.Role.STUDENT:
            if self.level is None:
                raise ValidationError("У ученика должен быть указан номер класса (1–11).")
            if not (1 <= self.level <= 11):
                raise ValidationError("Номер класса должен быть от 1 до 11.")

            if not self.level_letter:
                raise ValidationError("Буква класса должна быть указана (например: А, Б, Е).")
            else:
                if len(self.level_letter) > 1:
                    raise ValidationError("Буква класса должна состоять только из одной буквы (например: А, Б, Е).")

    def __str__(self):
        if self.role == self.Role.STUDENT:
            return f"{self.get_full_name() or self.username} ({self.level}-класс)"
        return f"{self.get_full_name() or self.username} (Учитель)"

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"