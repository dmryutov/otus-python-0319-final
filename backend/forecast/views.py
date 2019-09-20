from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .math import calculate_forecast, MODEL_ADDITIVE


class ForecastViewSet(viewsets.GenericViewSet):
    """
    Time series forecasting API endpoints
    """
    serializer_class = serializers.Serializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=False)
    def calculate(self, request):
        """
        Calculate time series forecast
        """
        self.check_permissions(request)

        data = request.data.get('data', [])
        model = request.data.get('model', MODEL_ADDITIVE)
        date_start = request.data.get('date_start', '2018-01-01')
        period_type = request.data.get('period_type', 'W')
        period_count = request.data.get('period_count', 5)
        changepoint_scale = request.data.get('changepoint_scale', 0.05)
        changepoint_dates = request.data.get('changepoint_dates')

        result = calculate_forecast(data, model, date_start, period_type, period_count,
                                    changepoint_scale, changepoint_dates)
        return Response(result)
