from django.db import models

class Career(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    demand = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class College(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    question = models.CharField(max_length=255)
    option_a = models.CharField(max_length=100)
    option_b = models.CharField(max_length=100)
    option_c = models.CharField(max_length=100)
    option_d = models.CharField(max_length=100)
    correct_answer = models.CharField(max_length=1)  # store A/B/C/D

    def __str__(self):
        return self.question
class QuizQuestion(models.Model):
    question = models.CharField(max_length=255)
    option_a = models.CharField(max_length=100)
    option_b = models.CharField(max_length=100)
    option_c = models.CharField(max_length=100)
    option_d = models.CharField(max_length=100)
    correct_answer = models.CharField(max_length=1)  # store A/B/C/D

    def __str__(self):
        return self.question


class QuizResult(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    scores = models.JSONField()
    answers = models.JSONField()
    recommended = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result for {self.user.username} ({self.created_at})"
