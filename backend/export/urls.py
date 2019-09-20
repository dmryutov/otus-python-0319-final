from rest_framework.routers import DefaultRouter

from .views import ExportViewSet


router = DefaultRouter()
router.register('', ExportViewSet, base_name='export')
urlpatterns = router.urls
