from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import User
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank,TrigramSimilarity
from django.views.decorators.csrf import csrf_exempt

import datetime
import json

#   FETCH CURRENT USER PROFILE     #

class UserProfileRenderView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserProfileRenderSerializer
    
    def get(self, request, *args, **kwargs):
        print(request.user)
        user = request.user  # Get the current logged-in user based off their "token" cookie. Handled by the built in Django TokenAuthentication
        user_data = UserProfileRenderSerializer(user, exclude_fields=['profile_image']).data  # Serialize the user data
        print("Data requested:", user_data)  # Debug print statement
        # Structure response data
        # data = {
        #     "user": user_data
        # }
        return Response(user_data, status=status.HTTP_200_OK)
    
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print("Incoming Data:", request.data)  # Debug print statement
        serializer = self.get_serializer(data=request.data) # this will create a new instance of the UserSerializer class with the incoming data
        print(serializer.is_valid(raise_exception=True)) # This will trigger the is_valid method in the UserSerializer class
        user = serializer.save() # This will trigger the create method in the UserSerializer class
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

#   UPDATE USER PROFILE     #
class UserProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
   
    def patch(self, request, *args, **kwargs):
        user = request.user  # Get the current logged-in user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)  # Bind the data to the serializer, allowing partial updates
        if serializer.is_valid():  # Validate the data
            serializer.save()  # Save the updated profile information
            return Response(serializer.data, status=status.HTTP_200_OK)  # Return the updated data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return errors if validation fails

class UploadProfileImageView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        if request.method == 'POST' and request.FILES.get('file'):
            profile = get_object_or_404(User, username="Chris.nguy")
            profile.profile_image = request.FILES['file']
            profile.profile_image = request.build_absolute_uri(profile.profile_image.url)
            profile.save()
            # Build the absolute URL for the image
            absolute_url = str(profile.profile_image)
            print(type(absolute_url))  # Debug print statement
            print("Absolute URL:", absolute_url)  # Debug print statement
            return JsonResponse({'imageUrl': absolute_url})
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
#   LOGIN TO ACCOUNT  #

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    # @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request}) # This will create a new instance of the LoginSerializer class and set data of the serializer to the incoming data
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user'] # This will get the user from the validated data dictionary in the serializer instance
        login(request, user) 
        token, created = Token.objects.get_or_create(user=user)
        response = JsonResponse({'message': 'Login successful'})
        # Set the token as an HTTP-only cookie
        response.set_cookie(
            'token',  # Name of the cookie
            token,  # Token value
            # httponly=True,  # Prevents JavaScript from accessing the cookie
            # samesite='Lax',  # Adjust SameSite attribute as needed
            expires=datetime.datetime.utcnow() + datetime.timedelta(days=7)  # Expiration
        )
        
        # Set a CSRF token cookie, if needed
        response.set_cookie('csrftoken', get_token(request), httponly=False)
        return response
    
# FETCH USER PROFILE BY USERNAME #
class UserProfileView(APIView):
    permission_classes = [AllowAny] 
    
    def get(self, request, *args, **kwargs):
        profileName = kwargs.get('profileName')
        profile = get_object_or_404(User, username=profileName)
        profile_data = UserProfileRenderSerializer(profile).data
        # profile_data['profile_image'] = profile.profile_image
        # print(profile_data['profile_image'])  # Debug print statement
        print("Data requested by:", request.user.username)  # Debug print statement
        print("User's Cookies:", request.COOKIES)  # Debug print statement
        
        # Structure response data
        data = [profile_data]
        data[0]['profile_image'] = str(profile.profile_image)
        print("Data:", data[0]['profile_image'])  # Debug print statement
        return Response(data, status=status.HTTP_200_OK)

#  SEARCH FOR USERS BY USERNAME  #
class UserSearchView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, *args, **kwargs):
        query = kwargs.get('query')
        print("Query:", query)  # Debug print statement
        if query:
            search_vector = SearchVector('username', 'netID', 'first_name', 'last_name')
            search_query = SearchQuery(query)

            results = User.objects.annotate(
                rank=SearchRank(search_vector, search_query) + 
                      TrigramSimilarity('username', query) + 
                      TrigramSimilarity('netID', query) + 
                      TrigramSimilarity('first_name', query) + 
                      TrigramSimilarity('last_name', query)
            ).filter(rank__gt=0.6).order_by('-rank')
            for user in results:
                print(user.username, user.rank)
            serializer = UserProfileRenderSerializer(results, many=True)
            print(serializer.to_representation(results))
            print("Data: ", serializer.data[0])
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response([], status=status.HTTP_200_OK)

class UserFriendsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        friends = user.friends.all()
        friends_data = UserSerializer(friends, many=True).data
        # Structure the response similarly to Instagram
        response_data = {
            "status": "ok",
            "users": friends_data,
            "count": len(friends_data)
        }
        print(response_data)

        return Response(response_data, status=200)
    
