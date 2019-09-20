from django.test import TestCase

from forecast.math import calculate_forecast, MODEL_ADDITIVE, MODEL_MULTIPLICATIVE


class CalculateDecompositionTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.data = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119]
        cls.period_count = 5

    def test_additive(self):
        result = calculate_forecast(self.data, model=MODEL_ADDITIVE,
                                    period_count=self.period_count)
        self.assertCountEqual(result.keys(), ['forecast', 'lower', 'upper', 'changepoints'])
        self.assertEqual(len(result['forecast']), 15)
        self.assertEqual(len(result['lower']), 15)
        self.assertEqual(len(result['upper']), 15)

    def test_multiplicative(self):
        result = calculate_forecast(self.data, model=MODEL_MULTIPLICATIVE,
                                    period_count=self.period_count)
        self.assertCountEqual(result.keys(), ['forecast', 'lower', 'upper', 'changepoints'])
        self.assertEqual(len(result['forecast']), 15)
        self.assertEqual(len(result['lower']), 15)
        self.assertEqual(len(result['upper']), 15)

    def test_empty_data(self):
        self.assertRaises(ValueError, calculate_forecast, [])
