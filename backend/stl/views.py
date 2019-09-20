from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .math import calculate_decomposition, MODEL_ADDITIVE


class STLViewSet(viewsets.GenericViewSet):
    """
    Time series decomposition API endpoints
    """
    serializer_class = serializers.Serializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=False)
    def calculate(self, request):
        """
        Calculate time series decomposition
        """
        self.check_permissions(request)

        data = request.data.get('data', [])
        model = request.data.get('model', MODEL_ADDITIVE)
        frequency = request.data.get('frequency', 2)

        result = calculate_decomposition(data, model, frequency)
        return Response(result)
