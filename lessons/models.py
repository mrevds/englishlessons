# lessons/models.py
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.utils import timezone

class Rating(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name="Ученик"
    )

    task_number = models.PositiveIntegerField(
        verbose_name="Номер урока"
    )

    score = models.PositiveIntegerField(
        verbose_name="Лучший результат (баллы)",
        validators=[MinValueValidator(0)],
        default=0
    )

    attempts = models.PositiveIntegerField(
        verbose_name="Количество попыток",
        default=0
    )

    completed_at = models.DateTimeField(
        auto_now=True,        # обновляется при каждом сохранении
        verbose_name="Дата последней попытки"
    )

    class Meta:
        unique_together = ('user', 'task_number')
        ordering = ['-completed_at']
        verbose_name = "Результат урока"
        verbose_name_plural = "Результаты уроков"

    def __str__(self):
        return f"{self.user} — Урок {self.task_number} — {self.score} баллов ({self.attempts} попыток)"

    # ──────────────────────────────────────────────────────────────
    # Удобный метод для сохранения результата с логикой попыток
    # ──────────────────────────────────────────────────────────────
    @classmethod
    def submit_result(cls, user, task_number: int, score: int):
        """
        Принимает результат урока и сохраняет по правилам:
        - attempts всегда +1
        - score обновляется только если новый результат лучше
        - completed_at обновляется всегда
        """
        
        obj, created = cls.objects.update_or_create(
            user=user,
            task_number=task_number,
            defaults={
                'completed_at': timezone.now(),
            }
        )

        # Увеличиваем количество попыток
        if created:
            obj.attempts = 1
            obj.score = score
        else:
            obj.attempts += 1
            # Сохраняем только лучший результат
            if score > obj.score:
                obj.score = score

        obj.save()
        return obj