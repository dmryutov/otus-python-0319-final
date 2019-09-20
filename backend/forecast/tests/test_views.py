from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from forecast.math import MODEL_MULTIPLICATIVE
from user.utils import create_test_user


class CurveListViewTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        # Create users
        cls.user1 = create_test_user('user1')
        # Payload
        cls.payload = {
            'data': [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
            'model': MODEL_MULTIPLICATIVE,
            'date_start': '2018-01-01',
            'period_type': 'W',
            'period_count': 5,
        }
        cls.result_keys = ['forecast', 'lower', 'upper', 'changepoints']

    def test_common_user(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.post(reverse('forecast-calculate'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(response.data.keys(), self.result_keys)

    def test_not_authorized(self):
        response = self.client.post(reverse('forecast-calculate'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
