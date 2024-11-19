from django.urls import path
from .views import *
from ..inbox.views import CreateSessionInvitationView

urlpatterns = [
    path('', SessionView.as_view(), name='session'), # baseURL/session/
    path('leave/', LeaveSessionView.as_view(), name='leave_session'), # This api endpoint should allow a user to leave a session.
    # path('create/', SessionCreateView.as_view(), name='user-create-session'), # This api endpoint should create a session.
    # path('end/', EndSessionView.as_view(), name='end-session'), # This api endpoint should end the current session of the logged in User if they created the session.
    # path('<str:target_netID>/invite', CreateSessionInvitationView.as_view(), name='session-invite'), # This api should send a session invitation to the target_netID.
    # path('', SessionDetailsView.as_view(), name='session-details'), # This api endpoint should return the details of the current session of the logged in User.
    
]
