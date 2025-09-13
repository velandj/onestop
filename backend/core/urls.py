from django.urls import path
from . import views

urlpatterns = [
    path("quiz/home/", views.quiz_home, name="quiz_home"),
    path("quiz/questions/", views.quiz_questions, name="quiz_questions"),
    path("quiz/submit/", views.submit_quiz, name="submit_quiz"),
    path("quiz/results/", views.my_results, name="my_results"),
    path("colleges/", views.colleges_list, name="colleges_list"),
]
