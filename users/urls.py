# users/urls.py
from django.urls import path
from .views import (
    CreateStudentView,
    MyProfileView,
    StudentListView,
    StudentStatsView, 
)

urlpatterns = [
    path('create-student/', CreateStudentView.as_view(), name='create-student'),
    path('me/', MyProfileView.as_view(), name='my-profile'),
    path('students/', StudentListView.as_view(), name='student-list'),
    
    # Статистика
    path('stats/me/', StudentStatsView.as_view(), name='my-stats'),
    path('stats/<int:pk>/', StudentStatsView.as_view(), name='student-stats'),
]