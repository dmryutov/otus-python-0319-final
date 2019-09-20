from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from user.serializers import UserDetailSerializer


class UserDetailSerializerTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user('user1', 'user1@mail.com', 'password12345')

    def test_contains_expected_fields(self):
        serializer = UserDetailSerializer(instance=self.user)
        expected_keys = ['id', 'username', 'email', 'avatar']
        self.assertCountEqual(serializer.data.keys(), expected_keys)
