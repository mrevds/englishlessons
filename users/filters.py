# users/filters.py
import django_filters
from django_filters import CharFilter, NumberFilter
from django.contrib.auth import get_user_model

User = get_user_model()


class StudentFilter(django_filters.FilterSet):
    """
    Фильтры для списка учеников
    """
    first_name = CharFilter(field_name='first_name', lookup_expr='icontains', label='Имя')
    last_name = CharFilter(field_name='last_name', lookup_expr='icontains', label='Фамилия')
    level = NumberFilter(field_name='level', label='Класс (число)')
    level_letter = CharFilter(
        field_name='level_letter',
        lookup_expr='iexact',  # нечувствительно к регистру: "а" == "А"
        label='Буква класса'
    )

    class Meta:
        model = User
        fields = []  # мы указали все фильтры вручную выше