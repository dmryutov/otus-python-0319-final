from django.test import TestCase

from utils.math import round_values


class CalculateCorrespondenceTestCase(TestCase):
    def test_value(self):
        data = 123.45678
        self.assertEqual(round_values(data, 3), 123.457)

    def test_list(self):
        data = [123.45678, 987.65432]
        self.assertEqual(round_values(data, 3), [123.457, 987.654])

    def test_nested_dict(self):
        data = {
            'a': [123.45678, 987.65432],
            'b': {
                'c': 918.27364,
            },
        }
        self.assertEqual(round_values(data, 3), {
            'a': [123.457, 987.654],
            'b': {
                'c': 918.274,
            },
        })
