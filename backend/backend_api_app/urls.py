from backend_api_app import views as api_views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from userauths_app.views import ActivateUserView, ForgotPasswordView, RegisterUserView, ResetPasswordValidateView, ResetPasswordView, UserProfileView, MyTokenObtainPairView, LogoutView, CurrentUserView, LoginWithGoogle
from rest_framework_simplejwt.views import TokenRefreshView
from userauths_app import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('user/register/', RegisterUserView.as_view(), name='register'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('activate/<uidb64>/<token>/', ActivateUserView.as_view(), name='activate'),
    path('login-with-google/', LoginWithGoogle.as_view(), name='login-with-google'),

    path('user/current/', CurrentUserView.as_view(), name='current-user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('forgot_password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset_password_validate/<uidb64>/<token>/', ResetPasswordValidateView.as_view(), name='reset_password_validate'),
    path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)