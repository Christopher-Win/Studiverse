from django.urls import path, include
from .views import *
from ..inbox.views import CreateFriendRequestView

urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('profile/', UserProfileRenderView.as_view(), name='current-user-profile'),
    path('edit/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('uploadProfileImage/', UploadProfileImageView.as_view(), name='uploadProfileImage'),

    path('<str:profileName>/', UserProfileView.as_view(), name='user-profile-by-name'),
    path('search/<str:query>/', UserSearchView.as_view(), name='user-search'),
    # path('search/<str:query>/', SessionSearchView.as_view(), name='session-search'),
    path('friendships/<str:netID>/followers/',UserFriendsListView.as_view(), name='user-followers'), # This should return a list of users/followers for a particular account.
    path('friendships/<str:username>/remove/', RemoveFriendView.as_view(), name='remove-friend'), # This should remove a friend.
    path('<str:profileName>/add', CreateFriendRequestView.as_view(), name='request-friend-by-name'), # This should send a friend request.
    path('friendships/activity/', ActiveFriendsView.as_view(), name="active-friends"),
    # path('<str:netID>/friends/', UserFriendsListView.as_view(), name='user-friends'), # This should return a list of users/friends for a particular account.
    
]
