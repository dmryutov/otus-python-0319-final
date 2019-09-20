from django.test import TestCase

from ca.math import calculate_correspondence
from utils.math import round_values


class CalculateCorrespondenceTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.data = [
            [0.3004, 0.6864, 0.4975],
            [0.0198, 0.4604, 0.2151],
            [0.01114, 0.4111, 0.1904],
        ]

    def test_calculate(self):
        result = calculate_correspondence(self.data)
        self.assertEqual(round_values(result, 5), {
            'rows': [
                [0.27539, 0.00007],
                [-0.29768, -0.00287],
                [-0.32938, 0.00309]
            ],
            'cols': [
                [0.75216, -0.00189],
                [-0.18241, -0.0013],
                [0.03872, 0.00293]
            ],
            'rows_quality': [1, 1, 1],
            'cols_quality': [1, 1, 1],
            'explained': [99.99519, 0.00481],
            'eigenvalues': [0.08618, 0.0],
        })

    def test_supplementary_rows(self):
        result = calculate_correspondence(self.data, sup_rows=[0])
        self.assertEqual(round_values(result, 5), {
            'rows': [
                [-0.11294],
                [-0.03178],
                [0.03607],
            ],
            'cols': [
                [-0.21713],
                [0.00664],
                [0.00229],
            ],
            'rows_quality': [0, 1, 1],
            'cols_quality': [0, 1, 1],
            'explained': [100],
            'eigenvalues': [0.00115],
        })

    def test_supplementary_cols(self):
        result = calculate_correspondence(self.data, sup_cols=[0])
        self.assertEqual(round_values(result, 5), {
            'rows': [
                [0.11055],
                [-0.10065],
                [-0.10456],
            ],
            'cols': [
                [0.60711],
                [-0.08105],
                [0.13983],
            ],
            'rows_quality': [1, 1, 1],
            'cols_quality': [1, 1, 1],
            'explained': [100],
            'eigenvalues': [0.01133],
        }
)

    def test_empty_data(self):
        self.assertRaises(ValueError, calculate_correspondence, [])
