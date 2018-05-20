"""
Django settings for Bismillah project.

Generated by 'django-admin startproject' using Django 2.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
from django.contrib.messages import constants as messages

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('BISMILLAH_SECRET_KEY')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get('SETTINGS_DEBUG')))

ALLOWED_HOSTS = os.environ['ALLOWED_HOSTS'].split()
SITE_ID = 1

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # third party apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'notifications',
    'background_task',

    # custom apps
    'community.ramzaan',
    'mainapp',
    'feedback',
    'usermanagement'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Bismillah.urls'


AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.i18n',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Bismillah.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['MYSQL_DATABASE_NAME'],
        'USER': os.environ['MYSQL_DATABASE_USER'],
        'PASSWORD': os.environ['MYSQL_DATABASE_PASSWORD'],
        'HOST': os.environ['MYSQL_DATABASE_HOST'],
        'PORT': os.environ['MYSQL_DATABASE_PORT'],
        'CONN_MAX_AGE': int(os.environ['CONN_MAX_AGE']),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

STATIC_ROOT = os.path.join(BASE_DIR, "static_cdn")


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# django all auth settings
ACCOUNT_AUTHENTICATION_METHOD = "username_email"
ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_CONFIRM_EMAIL_ON_GET (=False)
# ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = reverse("homepage:dashboard")
ACCOUNT_EMAIL_SUBJECT_PREFIX = "Bismillah.com"
ACCOUNT_USERNAME_REQUIRED = False


# Django notifications settings
NOTIFICATIONS_USE_JSONFIELD = True
MESSAGE_TAGS = {
    messages.INFO: 'green',
    50: 'critical',
}

# Django background tasks settings
BACKGROUND_TASK_RUN_ASYNC = True


if not DEBUG:
    SECURE_CONTENT_TYPE_NOSNIFF = bool(os.environ['SECURE_CONTENT_TYPE_NOSNIFF'])
    SECURE_BROWSER_XSS_FILTER = bool(os.environ['SECURE_BROWSER_XSS_FILTER'])
    SESSION_COOKIE_SECURE = bool(os.environ['SESSION_COOKIE_SECURE'])
    CSRF_COOKIE_SECURE = bool(os.environ['CSRF_COOKIE_SECURE'])
    CSRF_COOKIE_HTTPONLY = bool(os.environ['CSRF_COOKIE_HTTPONLY'])
    COMPRESS_ENABLED = True
    X_FRAME_OPTIONS = os.environ['X_FRAME_OPTIONS']
else:
    COMPRESS_ENABLED = False


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': os.environ['LOG_LEVEL'],
            'class': 'logging.FileHandler',
            'filename': os.environ['LOG_FILE'],
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': os.environ['LOG_LEVEL'],
            'propagate': True,
        },
    },
}

ADMINS = [('shahrukh', 'msr.concordfly@gmail.com'), ('shahrukh', 'towardslight52@gmail.com')]