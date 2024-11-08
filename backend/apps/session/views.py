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
class SessionCreateView(generics.CreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = get_object_or_404(User,username=request.user) # get the user object from the database
        request.data['created_by'] = user.netID # add the user's netID to the request data
        # request.data['users'] = [user.netID] # add the user's netID to the users array in the request data
        
        print(request.data)
        serializer = self.get_serializer(data=request.data) # this will create a new instance of the sessionSerializer class with the incoming data
        print(serializer.is_valid(raise_exception=True)) # This will trigger the is_valid method in the sessionSerializer class
        session = serializer.save() # This will trigger the create method in the SessionSerializer class
        user.current_session = session
        user.save()
        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)

class EndSessionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User,username=request.user) # get the user object from the database
        print(user.username)
        
        current_session = Session.objects.filter(participants=user).first() # get the session object from the database where the user is a participant
        print(str(current_session.created_by))
              
        if str(current_session.created_by) == user.username: # check if the user is the creator of the session
            current_session.delete() # delete the session from the database
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
class LeaveSessionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = request.user
        current_session = Session.objects.filter(participants=user).first() # get the session object from the database where the user is a participant
        current_session.participants.remove(user) # remove the user from the participants list
        return Response(status=status.HTTP_200_OK)
    

# This class is used to get the details of the current session
class SessionDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        print("SessionDetailsView GET method called.")  # Debug print statement
        user = request.user
       
        current_session = Session.objects.filter(participants=user).first() # get the session object from the database where the user is a participant
        if current_session is None:
            return Response(None, status=200)
        session_data = SessionSerializer(current_session).data
        print(session_data)
        return Response(session_data, status=200)   