# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .serializers import CreateStudentSerializer, UserProfileSerializer, StudentListSerializer, StudentStatsSerializer
from .filters import StudentFilter

User = get_user_model()


# Создание ученика учителем
class CreateStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'teacher':
            return Response(
                {"detail": "Только учителя могут создавать аккаунты учеников."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CreateStudentSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "detail": "Ученик успешно создан",
                "username": user.username,
                "full_name": user.get_full_name(),
                "class": user.get_class_display(),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Текущий профиль пользователя (мой профиль)
class MyProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
    

class StudentListView(generics.ListAPIView):
    """
    Список всех учеников — только для учителя
    """
    serializer_class = StudentListSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]  # ← включаем фильтры
    filterset_class = StudentFilter          # ← наш фильтр

    def get_queryset(self):
        # Только учитель может видеть список
        if self.request.user.role != 'teacher':
            return Response(
                {"detail": "Только учителя могут видеть список учеников."},
                status=status.HTTP_403_FORBIDDEN
            )

        return User.objects.filter(role='student').order_by('level', 'level_letter', 'last_name', 'first_name')
    

class StudentStatsView(APIView):
    """
    Статистика ученика
    - GET /api/users/stats/me/ — своя статистика (для ученика)
    - GET /api/users/stats/<id>/ — статистика конкретного ученика (для учителя)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is None:
            # Своя статистика — доступно всем авторизованным
            user = request.user
        else:
            # Только учитель может смотреть чужую статистику
            if request.user.role != 'teacher':
                return Response(
                    {"detail": "Вы не можете просматривать статистику других пользователей."},
                    status=403
                )
            user = get_object_or_404(User, pk=pk, role='student')

        serializer = StudentStatsSerializer(user)
        return Response(serializer.data)




