from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from user.utils import create_test_user


class CurveListViewTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        # Create users
        cls.user1 = create_test_user('user1')
        # Payload
        cls.payload = {
            'data': [
                [0.3004, 0.6864, 0.4975],
                [0.0198, 0.4604, 0.2151],
                [0.01114, 0.4111, 0.1904],
            ],
        }
        cls.result_keys = [
            'rows', 'cols', 'rows_quality', 'cols_quality', 'explained', 'eigenvalues',
        ]

    def test_common_user(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.post(reverse('ca-calculate'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(response.data.keys(), self.result_keys)

    def test_not_authorized(self):
        response = self.client.post(reverse('ca-calculate'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
