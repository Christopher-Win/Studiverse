from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .serializers import * 
from .models import Session

# Create your views here.
class SessionCreateView(generics.CreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['created_by'] = request.user
        serializer = self.get_serializer(data=request.data) # this will create a new instance of the sessionSerializer class with the incoming data
        print(serializer.is_valid(raise_exception=True)) # This will trigger the is_valid method in the sessionSerializer class
        session = serializer.save() # This will trigger the create method in the SessionSerializer class
        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)


class SessionDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        print("SessionDetailsView GET method called.")  # Debug print statement
        user = request.user
       
        current_session = Session.objects.filter(participants=user).first()
        session_data = SessionSerializer(current_session).data
        return Response(session_data, status=200)   