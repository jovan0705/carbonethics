from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, CreateUserView
from .webhook import trello_webhook
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('trello-webhook/', trello_webhook, name='trello-webhook'),
    path('api/register/', CreateUserView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh') 
]
