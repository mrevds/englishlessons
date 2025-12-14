# lessons/filters.py
import django_filters
from django_filters import DateFilter, CharFilter
from .models import Rating


class RatingFilter(django_filters.FilterSet):
    # Фильтр по номеру класса ученика
    level = django_filters.NumberFilter(field_name='user__level', label='Класс (число)')
    
    # Фильтр по букве класса
    level_letter = django_filters.CharFilter(
        field_name='user__level_letter',
        lookup_expr='iexact',  # нечувствительно к регистру: "е" == "Е"
        label='Буква класса'
    )
    
    # Фильтр по дате выполнения (точная дата)
    completed_date = DateFilter(
        field_name='completed_at',
        lookup_expr='date',
        label='Дата выполнения (ГГГГ-ММ-ДД)'
    )
    
    # Диапазон дат: с ... по ...
    completed_from = DateFilter(
        field_name='completed_at',
        lookup_expr='date__gte',
        label='Дата с (ГГГГ-ММ-ДД)'
    )
    completed_to = DateFilter(
        field_name='completed_at',
        lookup_expr='date__lte',
        label='Дата по (ГГГГ-ММ-ДД)'
    )

    class Meta:
        model = Rating
        fields = []  # мы уже указали вручную выше