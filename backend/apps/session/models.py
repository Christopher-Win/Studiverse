
from datetime import datetime, timezone
from django.db import models
from django.conf import settings
from django.utils import timezone



class Session(models.Model):
    title = models.CharField(max_length=255)
    session_code = models.CharField(primary_key=True, max_length=10)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255)
    # Add session date
    start_time = models.DateTimeField(default = timezone.now)
    end_time = models.DateTimeField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_sessions',on_delete=models.CASCADE)
    session_size = models.IntegerField()
    is_private = models.BooleanField(default=True)
    session_occupancy = models.IntegerField(default=0)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    REQUIRED_FIELDS = ['title', 'description', 'location', 'start_time', 'end_time', 'created_by', 'session_size']
    
    def create(self, title, session_code, description, location, start_time, end_time, created_by, session_size, is_private, **extra_fields):
        session = self.model(title=title, session_code=session_code, description=description, location=location, start_time=start_time, end_time=end_time, created_by=created_by, session_size=session_size, is_private=is_private, **extra_fields)
        session.save(using=self._db)
        print("Session created by ", created_by,"!")  # Debug print statement
        return session 
    
    def save(self, *args, **kwargs):
        self.session_occupancy = self.participants.count()
        super().save(*args, **kwargs)

    
    def __str__(self):
        return self.session_code
    
class SessionHistory(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name="session_history")
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name="user_history")
    joined_at = models.DateTimeField(auto_now_add=True)
    left_at = models.DateTimeField(null=True, blank=True)  # When the user left the session