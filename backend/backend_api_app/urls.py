from backend_api_app import views as api_views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from userauths_app.views import RegisterUserView, UserProfileView, MyTokenObtainPairView, LogoutView, CurrentUserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/register/', RegisterUserView.as_view(), name='register'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/current/', CurrentUserView.as_view(), name='current-user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]