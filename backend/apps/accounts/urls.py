from django.urls import path, include
from .views import *
from ..inbox.views import CreateFriendRequestView

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('profile/', UserProfileRenderView.as_view(), name='current-user-profile'),
    path('edit/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('<str:profileName>/', UserProfileByNameView.as_view(), name='user-profile-by-name'),
    path('search/<str:query>/', UserSearchView.as_view(), name='user-search'),
    # path('search/<str:query>/', SessionSearchView.as_view(), name='session-search'),

    path('<str:profileName>/add', CreateFriendRequestView.as_view(), name='request-friend-by-name'), # This should send a friend request.
    #### FINISH THE FRIENDS LIST VIEW ####
    path('<str:netID>/friends/', UserFriendsListView.as_view(), name='user-friends'), # This should return a list of users/friends for a particular account.
]
