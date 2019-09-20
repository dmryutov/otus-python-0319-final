from rest_framework.routers import DefaultRouter

from .views import ForecastViewSet


router = DefaultRouter()
router.register('', ForecastViewSet, base_name='forecast')
urlpatterns = router.urls
