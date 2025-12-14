# lessons/serializers.py
from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True)
    level = serializers.IntegerField(source='user.level', read_only=True)

    class Meta:
        model = Rating
        fields = [
            'id',
            'task_number',
            'score',
            'attempts',
            'completed_at',
            'username',
            'full_name',
            'role',
            'level',
        ]
        read_only_fields = ['attempts', 'completed_at', 'username', 'full_name', 'role', 'level']


class SubmitScoreSerializer(serializers.Serializer):
    """
    Сериалайзер только для отправки результата урока
    """
    task_number = serializers.IntegerField(min_value=1)
    score = serializers.IntegerField(min_value=0, max_value=1000)  # измени максимум при необходимости

    def validate(self, data):
        user = self.context['request'].user
        
        # Только ученики могут отправлять результаты
        if user.role != 'student':
            raise serializers.ValidationError("Только ученики могут отправлять результаты уроков.")
        
        return data

    def create(self, validated_data):

        user = self.context['request'].user
        task_number = validated_data['task_number']
        score = validated_data['score']

        # Используем наш метод из модели
        rating = Rating.submit_result(user=user, task_number=task_number, score=score)

        return rating
        