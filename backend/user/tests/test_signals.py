from django.test import TestCase

from user.utils import create_test_user


class CreateUserProfileTestCase(TestCase):
    def setUp(self):
        self.user = create_test_user('user1')

    def test_create_profile(self):
        self.assertTrue(hasattr(self.user, 'profile'))
        self.assertTrue(hasattr(self.user.profile, 'avatar'))
