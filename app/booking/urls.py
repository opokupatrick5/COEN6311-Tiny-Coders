from django.urls import path
from .views import UserRegistrationAPIView
from .views import UserRegistrationAPIView, UserAuthenticationAPIView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserAuthenticationAPIView.as_view(), name='user-login'),
]
