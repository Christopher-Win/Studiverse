from rest_framework import serializers
from .models import FriendRequest, SessionInvitation
from django.shortcuts import get_object_or_404
from ..session.models import Session
from ..session.serializers import *

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user','to_user', 'timestamp']
        
        extra_kwargs = {
            'id': {'read_only': True},
            'timestamp': {'read_only': True}
        }
   
    def create(self, validated_data):  # This will be called when we call the save method on the serializer instance automatically
        print('save method was called.')  # Debug print statement
        print('validated_data:', validated_data)  # Debug print statement
        friend_request = FriendRequest.objects.create( # this will trigger the create method in the FriendRequest model which will save the friend request to the database
            from_user=validated_data['from_user'],
            to_user=validated_data['to_user']
        )
        print("Friend request instance actually created and saved!")
        return friend_request
    
    
class SessionInvitationSerializer(serializers.ModelSerializer):    
    class Meta:
        model = SessionInvitation
        fields = ['id', 'from_user', 'to_user', 'session','timestamp']
        
        extra_kwargs = {
            'id': {'read_only': True},
            'timestamp': {'read_only': True}
        }
    
    ############# INCLUDE THIS METHOD FOR ALTERING THE DATA THAT IS RETURNED BY THE SERIALIZER ###############
    def to_representation(self, instance): # This will be called when we call the data method on the serializer instance
        representation = super().to_representation(instance)
        # Modify the representation as needed
        # For example, you can add or remove fields, or perform any other modifications
        session_code = instance.session.session_code
        representation['session'] = SessionSerializer(get_object_or_404(Session, session_code=session_code)).data
        return representation
    
    
    def create(self, validated_data):  # This will be called when we call the save method on the serializer instance automatically
        print('Serializer create() method has been called.')  # Debug print statement
        print('validated_data:', validated_data)  # Debug print statement
        session_invitation = SessionInvitation.objects.create( # this will trigger the create method in the FriendRequest model which will save the friend request to the database
            from_user=validated_data['from_user'],
            to_user=validated_data['to_user'],
            session = validated_data['session']
        )
        print("Session Invitation instance actually created and saved!")
        return session_invitation