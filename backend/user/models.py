from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    """
    User profile model
    """
    user = models.OneToOneField(User, models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='user', default='user/no-avatar.png')
