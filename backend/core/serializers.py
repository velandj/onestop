from rest_framework import serializers
from .models import QuizQuestion, QuizResult, College

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = "__all__"

class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = "__all__"

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"

# class ScholarshipSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Scholarship
#         fields = "__all__"
