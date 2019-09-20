from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView

from .views import TokenObtainView, TokenRefreshView


# JWT Auth
urlpatterns = [
    path('token/', TokenObtainView.as_view(), name='obtain_jwt_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_jwt_token'),
    path('token/verify/', TokenVerifyView.as_view(), name='verify_jwt_token'),
    path('', include('rest_framework.urls', namespace='rest_framework')),
]
