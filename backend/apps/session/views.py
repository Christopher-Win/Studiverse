from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

from apps.accounts.models import User
from .serializers import * 
from .models import Session

# Create your views here.

class SessionView(APIView):
    """
    Integrated Session View:
    - POST for creating a session
    - GET for retrieving the current session details
    - DELETE for ending a session (if the user is the creator)
    - PATCH for leaving a session (if the user is a participant)
    - GET (with 'all' query param) for fetching all active public sessions
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Create a new session."""
        user = get_object_or_404(User, username=request.user)
        request.data['created_by'] = user.netID
        serializer = SessionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        session = serializer.save()
        user.current_session = session
        user.save()
        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        """Retrieve the current session details or all active sessions."""
        user = request.user
        query_param = request.query_params.get('all', None)

        if query_param == 'true':
            # Fetch all active public sessions
            active_sessions = Session.objects.filter(is_private=False).order_by('-start_time') # Get all active sessions that are not private and have not ended and order by start time
            print(active_sessions)
            session_data = SessionSerializer(active_sessions, many=True).data # Serialize the data for the response and return it 
            print(session_data)
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

    def patch(self, request, *args, **kwargs):
        """Leave the current session."""
        user = request.user
        current_session = Session.objects.filter(participants=user).first()
        if current_session:
            current_session.participants.remove(user)
            return Response({"message": "You have left the session."}, status=status.HTTP_200_OK)
        return Response({"error": "You are not part of any session."}, status=status.HTTP_400_BAD_REQUEST)