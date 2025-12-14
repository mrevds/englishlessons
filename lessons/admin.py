from django.contrib import admin
from .models import Rating

# lessons/admin.py
@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'task_number', 'score', 'attempts', 'completed_at')
    list_filter = ('task_number', 'user__level', 'attempts')
    search_fields = ('user__username', 'user__first_name', 'user__last_name')
    readonly_fields = ('completed_at', 'attempts', 'score')  # если не хочешь менять вручную
    date_hierarchy = 'completed_at'