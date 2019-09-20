from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainView,
    TokenRefreshView as BaseRefreshTokenView,
)

from .serializers import TokenObtainSerializer, TokenRefreshSerializer


class TokenObtainView(BaseTokenObtainView):
    """
    Custom token obtain API endpoint
    """
    serializer_class = TokenObtainSerializer


class TokenRefreshView(BaseRefreshTokenView):
    """
    Custom token refresh API endpoint
    """
    serializer_class = TokenRefreshSerializer
