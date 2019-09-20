from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
import xlrd

from user.utils import create_test_user


class BaseExportTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        # Create users
        cls.user1 = create_test_user('user1')


class ExportMediaMixViewTestCase(BaseExportTestCase):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.payload = {
            'data': [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
            'result': {
                'trend': [
                    0, 120.0, 127.75, 127.75, 126.5,
                    134.75, 144.75, 145, 134.75, 0,
                ],
                'seasonal': [
                    1.00073, 0.99927, 1.00073, 0.99927, 1.00073,
                    0.99927, 1.00073, 0.99927, 1.00073, 0.99927,
                ],
                'resid': [
                    0, 0.98405, 1.03252, 1.01052, 0.95583,
                    1.00259, 1.02171, 1.02143, 1.00854, 0,
                ],
            },
        }
        cls.sheet_names = ['STL']

    def test_common_user(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.post(reverse('export-stl'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        wb = xlrd.open_workbook(file_contents=response.content)
        self.assertEqual(wb.sheet_names(), self.sheet_names)

    def test_not_authorized(self):
        response = self.client.post(reverse('export-stl'), self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
