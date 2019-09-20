from django.test import TestCase

from export.excel import Excel


class ExcelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # File name
        cls.file_name = 'File 1'

    def test_emu_width(self):
        value = Excel.emu_width(0)
        self.assertEqual(value, 0)

        value = Excel.emu_width(1)
        self.assertEqual(value, 9525)

        value = Excel.emu_width(5)
        self.assertEqual(value, 47625)

    def test_export_stl(self):
        data = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119]
        result = {
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
        }

        wb = Excel(self.file_name).export_stl(data, result)
        self.assertEqual(wb.sheetnames, ['STL'])
