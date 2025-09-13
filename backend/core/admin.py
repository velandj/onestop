from django.contrib import admin
from .models import Career, College, Quiz

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ("title", "demand")
    search_fields = ("title",)

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ("name", "location")
    search_fields = ("name", "location")

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("question", "correct_answer")
    search_fields = ("question",)
