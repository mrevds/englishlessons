# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    # Что показывать в списке пользователей
    list_display = ('username', 'first_name', 'last_name', 'role', 'level', 'level_letter', 'is_staff')
    # Фильтры справа
    list_filter = ('role', 'level', 'level_letter', 'is_staff', 'is_active', 'date_joined')

    # Поля при редактировании пользователя
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Личные данные'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Роль и класс'), {'fields': ('role', 'level', 'level_letter')}),
        (_('Аватар'), {'fields': ('avatar',)}),
        (_('Права'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Важные даты'), {'fields': ('last_login', 'date_joined')}),
    )

    # Поля при создании нового пользователя (через "Добавить пользователя")
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
        (_('Роль и класс'), {
            'fields': ('role', 'level', 'level_letter'),
        }),
        (_('Права'), {
            'fields': ('is_staff', 'is_active'),
        }),
    )

    # Поиск по этим полям
    search_fields = ('username', 'first_name', 'last_name', 'email')

    # Сортировка в списке
    ordering = ('username',)

    # Чтобы аватарка отображалась в админке красиво
    readonly_fields = ('date_joined', 'last_login')

    # Если хочешь видеть превью аватарки в админке
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;"/>',
                obj.avatar.url
            )
        return "(нет аватара)"
    avatar_preview.short_description = "Аватар"
    
    # Добавь это поле в fieldsets, если хочешь превью:
    # ('Аватар', {'fields': ('avatar', 'avatar_preview')}),
    # и добавь в readonly_fields: 'avatar_preview',