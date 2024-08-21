# Create your models here.
from django.db import models
from django.conf import settings



class FriendRequest(models.Model):
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friend_requests_sent', on_delete=models.CASCADE)
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friend_requests_received', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def create(self, from_user, to_user, **extra_fields):
        friend_request = self.model(from_user=from_user, to_user=to_user, **extra_fields)
        friend_request.save(using=self._db)
        print(f"{from_user.username} sent a friend request to {to_user.username}.")  # Debug print statement
        return friend_request
        
    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username}"

class SessionInvitation(models.Model):
    print("SessionInvitation model called!")  # Debug print statement
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='session_invitations_sent', on_delete=models.CASCADE)
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='session_invitations_received', on_delete=models.CASCADE)
    session = models.ForeignKey('session.Session', related_name='invitations', on_delete=models.CASCADE, default=None)
    
    timestamp = models.DateTimeField(auto_now_add=True)

    def create(self, from_user, to_user, session, **extra_fields):
        session_invitation = self.model(from_user=from_user, to_user=to_user, session=session, **extra_fields)
        session_invitation.save(using=self._db)
        print(f"{from_user.username} sent a session invitation to {to_user.username}.")  # Debug print statement
        return session_invitation
    
    def __str__(self):
        return f"Session invitation from {self.from_user.username} to {self.to_user.username}"