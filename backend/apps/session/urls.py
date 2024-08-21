from django.urls import path
from .views import *
from ..inbox.views import CreateSessionInvitationView

urlpatterns = [
    path('create/', SessionCreateView.as_view(), name='user-create-session'), # This api endpoint should create a session.
    path('<str:target_netID>/invite', CreateSessionInvitationView.as_view(), name='session-invite'), # This api should send a session invitation to the target_netID.
    path('', SessionDetailsView.as_view(), name='session-details'), # This api endpoint should return the details of the current session of the logged in User.
    
]
