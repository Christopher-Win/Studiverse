from django.urls import path
from .views import *

urlpatterns = [
    path('', UserInboxView.as_view(), name='inbox'), # This should return a list of all messages.
    path('friendships/pending/', PendingFriendRequestsView.as_view(), name='pending-friend-requests'), # This should return a list of users.
    path('friendships/<str:netID>/approve/', ApproveFriendRequestView.as_view(), name='request-friend-by-netID'), # This should approve a friend request and add that friend.
    path('friendships/<str:netID>/decline/', DeclineFriendRequestView.as_view(), name='decline-friend-by-netID'), # This should decline a friend request and delete the request.
    # Add other routes for session invitations, etc
    path('session-invitations/pending/', PendingSessionInvitationsView.as_view(), name='pending-session-invitations'), # This should return a list of session invitations.
    path('session-invitations/<str:session_code>/accept/', AcceptSessionInvitationView.as_view(), name='accept-session-invitation'), # This should approve a session invitation.
]
