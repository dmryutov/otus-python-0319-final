from django.contrib.auth.models import User


def create_test_user(login):
    """
    Create test user

    Args:
        login (str): User login

    Returns:
        django.contrib.auth.models.User: User instance
    """
    user = User.objects.create_user(login, 'user@mail.com', 'password12345')
    return user