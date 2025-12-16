# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db.models import Sum, Avg
from lessons.models import Rating

User = get_user_model()


class CreateStudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'password_confirm',
            'first_name',
            'last_name',
            'email',
            'level',
            'level_letter',
        ]

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают.")
        
        if data.get('level') is None:
            raise serializers.ValidationError("Укажите номер класса для ученика.")
        
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email', ''),
            role='student',
            level=validated_data['level'],
            level_letter=validated_data.get('level_letter', ''),
        )
        return user


# Добавим сериалайзер для отображения профиля
class UserProfileSerializer(serializers.ModelSerializer):
    class_display = serializers.CharField(source='get_class_display', read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'role',
            'level',
            'level_letter',
            'class_display',
        ]
        read_only_fields = ['role', 'id']


class StudentListSerializer(serializers.ModelSerializer):
    """
    Сериалайзер для списка учеников (для учителя)
    """
    class_display = serializers.CharField(source='get_class_display', read_only=True)
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'full_name',
            'first_name',
            'last_name',
            'email',
            'class_display',
            'level',
            'level_letter',
        ]
        read_only_fields = fields  # всё только для чтения


class StudentStatsSerializer(serializers.Serializer):
    """
    Статистика по ученику
    """
    total_points = serializers.IntegerField(read_only=True)
    completed_lessons = serializers.IntegerField(read_only=True)
    average_score = serializers.FloatField(read_only=True)
    lessons_detail = serializers.ListField(child=serializers.DictField(), read_only=True)

    def to_representation(self, instance):
        # instance — это объект User
        user = instance

        ratings_qs = Rating.objects.filter(
            user__role='student',
            user__level=user.level,
            user__level_letter__iexact=user.level_letter or ''
        ).select_related('user')

        # Все рейтинги ученика
        ratings = Rating.objects.filter(user=user).order_by('task_number')

        total_points = ratings.aggregate(total=Sum('score'))['total'] or 0
        completed_lessons = ratings.count()
        average_score = ratings.aggregate(avg=Avg('score'))['avg'] or 0.0

        # Ранг в классе
        class_totals = ratings_qs.values('user').annotate(class_total=Sum('score')).order_by('-class_total')
        ranked_list = list(class_totals.values_list('class_total', flat=True))
        if total_points == 0:
            rank = len(ranked_list) + 1 if ranked_list else 1  # если 0 баллов — последнее место
        else:
            # Сколько человек строго лучше него
            better_count = sum(1 for s in ranked_list if s > total_points)
            rank = better_count + 1  # место начинается с 1

        # Детали по урокам
        lessons_detail = [
            {
                "task_number": r.task_number,
                "best_score": r.score,
                "attempts": r.attempts,
                "last_completed": r.completed_at.strftime("%d.%m.%Y %H:%M")
            }
            for r in ratings
        ]

        return {
            "total_points": total_points,
            "completed_lessons": completed_lessons,
            "average_score": average_score,
            "rank_in_class": rank,
            "lessons_detail": lessons_detail,
        }




