from rest_framework import serializers
from .models import User
from django.contrib.auth import login, logout, authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['netID', 'username', 'email', 'first_name', 'last_name', 'password', 'created_at', 'is_active','profile_image']
        extra_kwargs = {
            'password': {'write_only': True}, # This will ensure that the password field is write only and not returned in the response
            'created_at': {'read_only': True},
            'is_active': {'read_only': True}
        }

    def create(self, validated_data):  # This will be called when we call the save method on the serializer instance automatically
        print('save method was called.')  # Debug print statement
        print('validated_data:', validated_data)  # Debug print statement
        user = User.objects.create_user( # this will trigger the create_user method in the CustomUserManager class which will save the user to the database with the encrypted password from the set_password method
            netID=validated_data['netID'],
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user

# This will be used to update the user profile information in the database when the user sends a PATCH request to the /edit/ endpoint
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'first_name', 'last_name', 'sex', 
            'major', 'gpa', 'date_of_birth', 'year_in_school', 
        ]
        extra_kwargs = {
            'username': {'read_only': True},  # Username shouldn't be updated
            'first_name': {'read_only': True},  # 
            'last_name': {'read_only': True},  # 
            'email': {'read_only': True},  # Email shouldn't be updated
            'gpa': {'required': True},  # GPA is required
        }
        
        
class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'created_at', 'is_active', 'friends']
        extra_kwargs = {
            'created_at': {'read_only': True},
            'is_active': {'read_only': True}
        }
        
class LoginSerializer(serializers.Serializer):
    netID = serializers.CharField() # This will be used to validate the incoming netID
    password = serializers.CharField() # This will be used to validate the incoming password
    
    def validate(self, data): # This will be called when we call the is_valid method on the serializer instance
        netID = data.get('netID') # This gets the netID field from the data dictionary that was passed to the serializer 
        password = data.get('password')

        if netID and password:
            user = authenticate(request=self.context.get('request'), netID=netID, password=password)
            if not user:
                raise serializers.ValidationError("Invalid login credentials.")
        else:
            raise serializers.ValidationError("Must include 'netID' and 'password'.")

        data['user'] = user
        return data
    
    
