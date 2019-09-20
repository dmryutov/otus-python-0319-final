from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .math import calculate_correspondence


class CAViewSet(viewsets.GenericViewSet):
    """
    Correspondence analysis API endpoints
    """
    serializer_class = serializers.Serializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=False)
    def calculate(self, request):
        """
        Calculate correspondence analysis
        """
        self.check_permissions(request)

        data = request.data.get('data', [])
        sup_rows = request.data.get('sup_rows')
        sup_cols = request.data.get('sup_cols')

        result = calculate_correspondence(data, sup_rows, sup_cols)
        return Response(result)
