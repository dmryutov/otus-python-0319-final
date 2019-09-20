from django.contrib import admin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """
    User profile model admin view
    """
    list_display = ['id', 'user', 'avatar']
    search_fields = ['user']

    class Meta:
        model = UserProfile
