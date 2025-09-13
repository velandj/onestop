from django.db import models

class user_cred(models.Model):
    username = models.CharField(max_length=30, unique=True, blank=False)
    password = models.CharField(max_length=255, blank=False)  # hashed password

    def __str__(self):
        return self.username
