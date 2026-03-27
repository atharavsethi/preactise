from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.TextChoices):
    USER = 'USER', 'User'
    DOCTOR = 'DOCTOR', 'Doctor'
    STUDENT = 'STUDENT', 'Student'
    ADMIN = 'ADMIN', 'Admin'

class User(AbstractUser):
    # Django AbstractUser provides email, username, password, but we want login by email
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    
    role = models.CharField(max_length=15, choices=Role.choices, default=Role.USER)
    specialty = models.CharField(max_length=100, blank=True, null=True)
    verification_status = models.CharField(max_length=20, default='PENDING')
    medical_license = models.CharField(max_length=100, blank=True, null=True)
    
    # Gamification
    reputation_score = models.IntegerField(default=0)
    cme_credits = models.IntegerField(default=0)
    
    # Set email as the main identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
