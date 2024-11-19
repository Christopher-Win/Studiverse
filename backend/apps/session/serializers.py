from rest_framework import serializers

from .models import Session

class ExcludeFieldsMixin:
    def __init__(self, *args, exclude_fields=None, **kwargs):
        super().__init__(*args, **kwargs)
        if exclude_fields:
            for field in exclude_fields:
                self.fields.pop(field)
                

class SessionSerializer(ExcludeFieldsMixin,serializers.ModelSerializer):
    print("Serializer instance created:")
    
    class Meta:
        model = Session
        fields = ['title','session_code', 'description', 'start_time', 'end_time', 'created_by', 'location', 'session_size','is_private','users','participants',
                  'session_occupancy']
        REQUIRED_FIELDS = ['title', 'location', 'description', 'start_time', 'end_time', 'created_by', 'session_size']
        extra_kwargs = {
            'users': {'read_only': True},
        }
    def get_users(self,obj):
        from apps.accounts.serializers import UserSerializer

        users = obj.users.all()  # Assuming there's a reverse relation from Session to User
        return UserSerializer(users, many=True).data
        
    def create(self, validated_data):
        session = Session.objects.create(
            session_code=validated_data['session_code'],
            title=validated_data['title'],
            description=validated_data['description'],
            start_time=validated_data['start_time'],
            end_time=validated_data['end_time'],
            created_by=validated_data['created_by'],
            location=validated_data['location'],
            session_size=validated_data['session_size'],
            is_private=validated_data['is_private']
        )
        session.participants.add(validated_data['created_by'])
        session.session_occupancy += 1 # Increment the session occupancy by 1
        
        return session