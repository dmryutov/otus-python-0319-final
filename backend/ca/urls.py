from rest_framework.routers import DefaultRouter

from .views import CAViewSet


router = DefaultRouter()
router.register('', CAViewSet, base_name='ca')
urlpatterns = router.urls
