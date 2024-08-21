from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path("accounts/", include("apps.accounts.urls")),
    path('inbox/', include('apps.inbox.urls')),
    path('session/', include('apps.session.urls')),
    path("", include('apps.accounts.urls')),
]
