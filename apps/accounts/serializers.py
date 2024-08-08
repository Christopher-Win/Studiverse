from rest_framework import serializers
from .models import User
from django.contrib.auth import login, logout, authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['netID', 'username', 'email', 'first_name', 'last_name', 'password', 'created_at', 'is_active']
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


class LoginSerializer(serializers.Serializer):
    netID = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        netID = data.get('netID')
        password = data.get('password')

        if netID and password:
            user = authenticate(request=self.context.get('request'), netID=netID, password=password)
            if not user:
                raise serializers.ValidationError("Invalid login credentials.")
        else:
            raise serializers.ValidationError("Must include 'netID' and 'password'.")

        data['user'] = user
        return data