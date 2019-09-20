from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    # Admin panel
    path('api/admin/', admin.site.urls),

    # Applications endpoints
    path('api/ca/', include('ca.urls')),
    path('api/export/', include('export.urls')),
    path('api/forecast/', include('forecast.urls')),
    path('api/stl/', include('stl.urls')),
    path('api/user/', include('user.urls')),
]

# Static and media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()
