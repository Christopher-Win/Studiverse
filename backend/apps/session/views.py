from datetime import datetime
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

from apps.accounts.models import User
from .serializers import * 
from .models import Session, SessionHistory

# Create your views here.

class SessionView(APIView):
    """
    Integrated Session View:
    - POST for creating a session
    - GET for retrieving the current session details
    - DELETE for ending a session (if the user is the creator)
    - PATCH 
    - GET (with 'all' query param) for fetching all active public sessions
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Create a new session."""
        user = get_object_or_404(User, username=request.user)
        request.data['created_by'] = user.netID
        serializer = SessionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
         # Log participation in session history
        SessionHistory.objects.create(user=user, session=session) # Log the user's participation in the session history
        session = serializer.save() # Save the session
        user.current_session = session # Set the user's current session to the newly created session
        user.save() # Save the user
        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)
    
    def put(self, request, *args, **kwargs):
        """Join an existing session."""
        user = request.user # Get the user from the request
        session_code = request.data.get('session_code') # Get the session code from the request data. 

        # Validate session_code
        if not session_code:
            return Response({"error": "Session code is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the session
        session = get_object_or_404(Session, session_code=session_code) # Get the session with the given session code

        # Check if the user is already a participant
        if user in session.participants.all():
            return Response({"message": "You are already in this session."}, status=status.HTTP_200_OK)

        # Add the user to the session
        session.participants.add(user) # Add the user to the session's participants
        session.save() # Save the session

        # Log participation in session history
        SessionHistory.objects.create(user=user, session=session) # Log the user's participation in the session history

        return Response({"message": "You have successfully joined the session."}, status=status.HTTP_200_OK)
    
    def get(self, request, *args, **kwargs):
        """Retrieve the current session details or all active sessions."""
        user = request.user
        # Check for query params to determine the response
        query_param = request.query_params.get('all', None) # /session/?all=true
        recent_param = request.query_params.get('recent', None) # /session/?recent=true
        
        if query_param == 'true': # /session/?all=true
            # Fetch all active public sessions
            active_sessions = Session.objects.filter(is_private=False).order_by('-start_time') # Get all active sessions that are not private and have not ended and order by start time
            print(active_sessions)
            session_data = SessionSerializer(active_sessions, many=True).data # Serialize the data for the response and return it 
            print(session_data)
            return Response(session_data, status=status.HTTP_200_OK)
        
        if recent_param == 'true': # /session/?recent=true
            # Fetch recent sessions for the user
            recent_sessions = SessionHistory.objects.filter(user=user).order_by('-joined_at')[:5] # Get the user's recent sessions and order by joined_at
            session_data = [SessionSerializer(session_history.session).data for session_history in recent_sessions] # Serialize the data for the response and return it
            return Response(session_data, status=status.HTTP_200_OK)

        # Default behavior: Get the current session for the user
        current_session = Session.objects.filter(participants=user).first()
        if current_session is None:
            return Response(None, status=status.HTTP_200_OK)

        session_data = SessionSerializer(current_session).data
        return Response(session_data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """End the session if the user is the creator."""
        user = get_object_or_404(User, username=request.user)
        current_session = Session.objects.filter(participants=user).first()
        if current_session and str(current_session.created_by) == user.username:
            current_session.delete()
            return Response({"message": "Session ended successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "You are not authorized to end this session."}, status=status.HTTP_403_FORBIDDEN)
   
class LeaveSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        """Leave the current session."""
        user = request.user
        current_session = Session.objects.filter(participants=user).first()
        if current_session:
            # Remove the user from the session's participants
            current_session.participants.remove(user)
            # Update the user's session history
            session_history = SessionHistory.objects.filter(
                user=user, session=current_session, left_at__isnull=True
            ).first() # Get the user's session history for the current session
            if session_history: # If the session history exists, update the left_at field
                session_history.left_at = datetime.now()
                session_history.save()

            return Response({"message": "You have left the session."}, status=status.HTTP_200_OK)

        return Response({"error": "You are not part of any session."}, status=status.HTTP_400_BAD_REQUEST)
  