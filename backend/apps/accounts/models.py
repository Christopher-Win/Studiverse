from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager): # this will be called whenever we call User.objects.create_user
    def create_user(self, netID, username, email, first_name, last_name, password, **extra_fields):
        if not netID:
            raise ValueError('The NetID field must be set')
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(netID=netID, username=username, email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password) # this is required to encrypt the password
        user.save(using=self._db) # this will save the user to the database when 
        print('User created at:', user.created_at)  # Debug print statement
        return user

    def create_superuser(self, netID, username, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(netID, username, email, first_name, last_name, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, blank=False)
    netID = models.CharField(primary_key=True, max_length=50, unique=True, blank=False)
    email = models.EmailField(max_length=50, unique=True, blank=False)
    password = models.CharField(max_length=100, blank=False)
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    sex = models.CharField(max_length=1)
    major = models.CharField(max_length=50)
    gpa = models.FloatField(max_length=4)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Ensure this field is included
    created_at = models.DateTimeField(auto_now_add=True)
    date_of_birth = models.DateField()
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    FRESHMAN = "FR"
    SOPHOMORE = "SO"
    JUNIOR = "JR"
    SENIOR = "SR"
    GRADUATE = "GR"
    YEAR_IN_SCHOOL_CHOICES = {
        FRESHMAN: "Freshman",
        SOPHOMORE: "Sophomore",
        JUNIOR: "Junior",
        SENIOR: "Senior",
        GRADUATE: "Graduate",
    }
    year_in_school = models.CharField(
        max_length=10,
        choices=YEAR_IN_SCHOOL_CHOICES,
        default=FRESHMAN,
    )
    
    friends = models.ManyToManyField('self', blank=True) # This will create a many-to-many relationship between the User model and itself
    def remove_friend(self, friend):
        """
        Removes the friend relationship from both sides.
        """
        self.friends.remove(friend)
        friend.friends.remove(self)
        
    def delete(self, *args, **kwargs):
        """
        Ensure that all friendships related to this user are deleted from both sides.
        """
        for friend in self.friends.all():
            friend.friends.remove(self)  # Remove this user from their friends' friend lists
        super().delete(*args, **kwargs)
        
        
    def is_upperclass(self):
        return self.year_in_school in {self.JUNIOR, self.SENIOR}

    USERNAME_FIELD = 'netID'
    REQUIRED_FIELDS = ['username', 'email', 'first_name', 'last_name', 'password']

    objects = CustomUserManager()

    def __str__(self):
        return self.username
