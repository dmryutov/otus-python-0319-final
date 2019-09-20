from django.test import TestCase

from stl.math import calculate_decomposition, MODEL_ADDITIVE, MODEL_MULTIPLICATIVE
from utils.math import round_values


class CalculateDecompositionTestCase(TestCase):
    def test_additive(self):
        data = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119]
        result = calculate_decomposition(data, model=MODEL_ADDITIVE, frequency=2)
        self.assertEqual(round_values(result, 5), {
            'trend': [
                113.23796, 119.27023, 124.51453, 127.54782, 130.97659,
                135.84682, 140.63997, 140.27748, 132.71615, 124.02202,
            ],
            'seasonal': [
                0.48792, -0.48792, 0.48792, -0.48792, 0.48792,
                -0.48792, 0.48792, -0.48792, 0.48792, -0.48792,
            ],
            'resid': [
                -1.72587, -0.78231, 6.99755, 1.94009, -10.4645,
                -0.3589, 6.87211, 8.21044, 2.79593, -4.53411,
            ],
        })

    def test_multiplicative(self):
        data = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119]
        result = calculate_decomposition(data, model=MODEL_MULTIPLICATIVE, frequency=2)
        self.assertEqual(round_values(result, 5), {
            'trend': [
                113.2614, 119.02965, 124.29212, 127.37158, 130.72409,
                135.43867, 140.47552, 140.09061, 132.2408, 123.82395,
            ],
            'seasonal': [
                1.0036, 0.99641, 1.0036, 0.99641, 1.0036,
                0.99641, 1.0036, 0.99641, 1.0036, 0.99641,
            ],
            'resid': [
                0.98532, 0.99492, 1.05821, 1.01643, 0.92229,
                1.00035, 1.04979, 1.06026, 1.02474, 0.9645,
            ],
        })

    def test_empty_data(self):
        self.assertRaises(ZeroDivisionError, calculate_decomposition, [])
