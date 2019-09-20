from rest_framework.routers import DefaultRouter

from .views import STLViewSet


router = DefaultRouter()
router.register('', STLViewSet, base_name='stl')
urlpatterns = router.urls
