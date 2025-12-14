# lessons/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Rating
from .serializers import RatingSerializer, SubmitScoreSerializer
from .filters import RatingFilter

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().select_related('user')
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_class = RatingFilter

    def get_queryset(self):
        """
        Ученик видит только свои результаты
        Учитель видит все
        """
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(user=user)
        return self.queryset  # учитель видит всех

    @action(detail=False, methods=['post'], url_path='submit')
    def submit_score(self, request):
        """
        Эндпоинт: POST /api/ratings/submit/
        Тело: {"task_number": 5, "score": 85}
        """
        serializer = SubmitScoreSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            rating = serializer.save()
            return Response(RatingSerializer(rating).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)