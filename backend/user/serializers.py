from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer as BaseTokenObtainSerializer,
    TokenRefreshSerializer as BaseTokenRefreshSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken


class UserDetailSerializer(serializers.ModelSerializer):
    """
    User instance serializer (for `retrieve` request)
    """
    avatar = serializers.ImageField(source='profile.avatar')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar')


class TokenObtainSerializer(BaseTokenObtainSerializer):
    """
    Custom obtain JWT token serializer
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        token = RefreshToken(data['refresh'])

        for key, value in UserDetailSerializer(self.user, context=self.context).data.items():
            token[key] = value

        data['refresh'] = str(token)
        data['access'] = str(token.access_token)
        return data


class TokenRefreshSerializer(BaseTokenRefreshSerializer):
    """
    Custom refresh JWT token serializer
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        token = RefreshToken(attrs['refresh'])

        user = User.objects.get(pk=token['id'])
        for key, value in UserDetailSerializer(user, context=self.context).data.items():
            token[key] = value

        data['access'] = str(token.access_token)
        return data
