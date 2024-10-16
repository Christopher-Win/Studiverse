from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.accounts.models import User
from apps.session.models import Session
from apps.accounts.serializers import UserProfileRenderSerializer
from .models import FriendRequest, SessionInvitation
from .serializers import FriendRequestSerializer, SessionInvitationSerializer
from apps.session.serializers import *

########## Friend Request Views ##########
class CreateFriendRequestView(generics.CreateAPIView): # We will use this view to send a friend request
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs): # This will be called when we send a POST request to the /add endpoint
        profileName = kwargs.get('profileName')
        print(request.user, "Friend request sent to:", profileName)  # Debug print statement
        print("Kwargs:", kwargs)  
        friend_request_data = {
            'from_user': request.user.netID,
            'to_user': get_object_or_404(User, username=profileName).netID
        }
        existing_request = FriendRequest.objects.filter(from_user=request.user.netID, to_user=friend_request_data['to_user']).exists()
        if existing_request:
            return Response({'status': 'Friend request already sent'}, status=400)
        serializer = self.get_serializer(data = friend_request_data) # this will create a new instance of the FriendRequestSerializer class with the incoming data
        print(serializer.is_valid(raise_exception=True))
        friend_request = serializer.save() # This will trigger the create method in the FriendRequestSerializer class
        return Response(FriendRequestSerializer(friend_request).data, status=status.HTTP_201_CREATED)

# This view will return a list of all pending friend requests GET /inbox/friendships/pending/
class PendingFriendRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        pending_requests = FriendRequest.objects.filter(to_user=user)
        print ("Pending Requests: ",pending_requests)
        serializer = FriendRequestSerializer(pending_requests, many=True)
        serialized_users = UserProfileRenderSerializer(
            [friend_request.from_user for friend_request in pending_requests], 
            many=True
        )
        response = serialized_users.data
        return Response(response, status=200)

# This view will be used to approve a friend request POST /inbox/friendships/<str:netID>/approve/
class ApproveFriendRequestView(APIView): # We will use this view to confirm a friend request
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user  # The currently logged-in user
        sender_netID = kwargs.get('netID')  # The netID of the user to be added as a friend
        sender = get_object_or_404(User, netID=sender_netID)  # The user to be added as a friend
        if sender != user:
            if sender in user.friends.all():
                return Response({'status': 'Friend already added'}, status=400)
            user.friends.add(sender)
            user.save()
            friend_request = get_object_or_404(FriendRequest, from_user=sender_netID, to_user=user.netID)  # The friend request to be removed
            friend_request.delete()
            friend_fullname = f"{sender.first_name} {sender.last_name}"
            print(f"{user.username} added {friend_fullname} as a friend.")  # Debug print statement
            return Response({'status': friend_fullname + " has been added to " + user.username}, status=200)
        return Response({'status': 'cannot add yourself as a friend'}, status=400)
# This view will be used to decline a friend request POST /inbox/friendships/<str:netID>/decline/
class DeclineFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user  # The currently logged-in user
        sender_netID = kwargs.get('netID')  # The netID of the user whose friend request is to be declined
        friend_request = get_object_or_404(FriendRequest, from_user=sender_netID, to_user=user.netID)  # The friend request to be declined
        friend_request.delete()
        print(f"{user.username} declined friend request from {sender_netID}.")  # Debug print statement
        return Response({'status': f"Friend request from {sender_netID} has been declined."}, status=200)
    
#### THIS SHOULD BE IN accounts/views.py ####
class RemoveFriendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user_id = request.data.get('user_id')
        friend = get_object_or_404(User, pk=user_id)

        if friend in user.friends.all():
            user.friends.remove(friend)
            friend.friends.remove(user)
            return Response({'status': f"Removed {friend.username} from your friends."}, status=200)
        return Response({'status': 'User not found in your friends list.'}, status=400)

########## Session Invitation Views ##########
class CreateSessionInvitationView(generics.CreateAPIView): # We will use this view to send a friend request
    queryset = SessionInvitation.objects.all()
    serializer_class = SessionInvitationSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs): # This will be called when we send a POST request to the /add endpoint
        target_netID = kwargs.get('target_netID') # kwargs are part of the URL
        print(request.user, "Session invitation sent to:", target_netID)  # Debug print statement
        print(request.data.get('session_code'))  # Debug print statement
        session_code = request.data.get('session_code')
        invitation_data = {
            'from_user': get_object_or_404(User, netID=request.user.netID),
            'to_user': get_object_or_404(User, netID=target_netID),
            'session': get_object_or_404(Session, session_code=session_code)
        }
        existing_invitation = SessionInvitation.objects.filter(from_user=invitation_data['from_user'], to_user=invitation_data['to_user']).exists()
        if existing_invitation:
            return Response({'status': 'Session invitation has already been sent to this user!'}, status=400)
        serializer = self.get_serializer(data = invitation_data) # this will create a new instance of the FriendRequestSerializer class with the incoming data
        print(serializer.is_valid(raise_exception=True))
        session_invitation = serializer.save() # This will trigger the create method in the FriendRequestSerializer class
        return Response(SessionInvitationSerializer(session_invitation).data, status=status.HTTP_201_CREATED)

class PendingSessionInvitationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        pending_invitations = SessionInvitation.objects.filter(to_user=user)
        serializer = SessionInvitationSerializer(pending_invitations, many=True)
        print("Session Details: ", serializer.data[0]['session'])  # Debug print statement
        return Response(serializer.data, status=200)

class AcceptSessionInvitationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user  # The currently logged-in user
        session_id = kwargs.get('session_code')  # The ID of the session to join
        
        session_invitation = get_object_or_404(SessionInvitation, session_id=session_id, to_user=user)  # The session invitation to be accepted

        session = session_invitation.session  # The session to be joined
        if user in session.participants.all():
            return Response({'status': 'Already a member of the session'}, status=400)

        session.participants.add(user)
        session.save()
        session_invitation.delete()
        session_title = session.title
        print(f"{user.username} joined the session {session_title}.")  # Debug print statement
        return Response({'status': f"{user.username} has joined the session {session_title}"}, status=200)
    
# Similar views can be created for SessionInvitations
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FriendRequest, SessionInvitation
from .serializers import FriendRequestSerializer, SessionInvitationSerializer

class UserInboxView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        friend_requests = FriendRequest.objects.filter(to_user=user)
        session_invitations = SessionInvitation.objects.filter(to_user=user)
        
        friend_request_serializer = FriendRequestSerializer(friend_requests, many=True)
        session_invitation_serializer = SessionInvitationSerializer(session_invitations, many=True)
        
        return Response({
            'friend_requests': friend_request_serializer.data,
            'session_invitations': session_invitation_serializer.data,
        }, status=200)