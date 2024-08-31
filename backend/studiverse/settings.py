from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-80(e-foh(l8)n&=88u2qwyv+!472za#9n%ydp@odne0r9*#6zy"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', 'localhost','10.0.0.49','127.0.0.1']


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'apps.accounts.apps.AccountsConfig',
    'apps.inbox.apps.InboxConfig',
    'apps.session.apps.SessionConfig',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        #'rest_framework.authentication.TokenAuthentication', # This should use the token to authenticate the user
        'rest_framework.authentication.SessionAuthentication', #This should use the cookie to authenticate the user
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# Ensure SESSION_COOKIE_SECURE and CSRF_COOKIE_SECURE are correctly set for your environment
SESSION_COOKIE_SECURE = False  # Set to True in production with HTTPS
SESSION_COOKIE_NAME = 'sessionid'  # Default name for session cookies
SESSION_COOKIE_HTTPONLY = False  # Should be False so you can access it via JavaScript if needed

CSRF_COOKIE_SECURE = False     # Set to True in production with HTTPS
CSRF_COOKIE_HTTPONLY = False  # Should be False so you can access it via JavaScript if needed

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # Add this line
    'http://localhost:8000',  # If you access the frontend from the Django server directly
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "studiverse.middleware.CrossOriginOpenerPolicyMiddleware",
]

SECURE_CROSS_ORIGIN_OPENER_POLICY = None

CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:5173',
    "http://localhost:3000",
    "http://localhost:8000",
    'http://localhost:5173',  # Replace with your frontend URL
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = [
    'origin',
    'content-type',
    'authorization',
    'x-requested-with',
    'x-csrftoken',
    'X-CSRFToken',
]
ROOT_URLCONF = "studiverse.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "studiverse.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'studiverse_db',
        'USER': 'fez',
        'PASSWORD': 'blackdog',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"
MEDIA_URL = '/media/profile_images/' # This will be used to serve the uploaded images in the media/profile_images/ directory
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/profile_images/') # This will store the uploaded images in the media/profile_images/ directory

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field
AUTH_USER_MODEL = "accounts.User"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
