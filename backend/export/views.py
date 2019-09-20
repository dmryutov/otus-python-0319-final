from django.http.response import HttpResponse
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .excel import Excel


XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'


class ExportViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.Serializer
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def download_file(file_name, export_func, *args, **kwargs):
        """
        Generate file and send it to client

        Args:
            file_name (str): Excel file name
            export_func (str): Export function
            args: Export function args
            kwargs: Export function kwargs

        Returns:
            django.http.response.HttpResponse: HTTP response
        """
        response = HttpResponse(content_type=XLSX_MIME)
        response['Content-Disposition'] = 'attachment; filename="{}.xlsx"'.format(file_name)

        getattr(Excel(file_name), export_func)(*args, **kwargs).save(response)

        return response

    @action(methods=['post'], detail=False)
    def stl(self, request):
        """
        Export time series decomposition results to Excel file
        """
        self.check_permissions(request)

        data = request.data.get('data', [])
        result = request.data.get('result', {})

        return self.download_file('STL', 'export_stl', data, result)

    @action(methods=['post'], detail=False)
    def forecast(self, request):
        """
        Export time series forecasting results to Excel file
        """
        self.check_permissions(request)

        data = request.data.get('data', [])
        result = request.data.get('result', {})
        date_start = request.data.get('date_start', '2018-01-01')
        period_type = request.data.get('period_type', 'W')

        return self.download_file('Forecast', 'export_forecast', data, result,
                                  date_start, period_type)
