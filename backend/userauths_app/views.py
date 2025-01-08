from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from userauths_app.models import User, UserProfile, Role
from teacher_app.models import Teacher
from userauths_app.serializers import ActivationSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserSerializer, UserProfileSerializer, MyTokenObtainPairSerializer, TeacherSerializer
from django.db import transaction
import logging
from django.contrib.auth import authenticate
from .utils import send_verification_email
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator


logger = logging.getLogger(__name__)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password = password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)

            user_data = user_serializer.data
            if hasattr(user, 'userprofile'):
                user_data['profile_picture'] = user.userprofile.profile_picture.url if user.userprofile.profile_picture else None


            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user' : user_data
            })
        else:
            return Response({'detail':'Invalid credentials'}, status=401)

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        logger.info(f"Received registration request: {request.data}")
        logger.info(f"Request headers: {request.headers}")
        data = request.data.copy()
        role_name = data.get('role', '').upper()

        try:
            role, created = Role.objects.get_or_create(name=role_name)
        except Role.DoesNotExist:
            return Response({"error": "Invalid role selected."}, status=status.HTTP_400_BAD_REQUEST)

        if not role_name:
            return Response({"error": "Role is required."}, status=status.HTTP_400_BAD_REQUEST)


        data['role'] = role.name  # Pass the role name as string

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        user = User.objects.get(email=serializer.data['email'])

        # Ensure UserProfile is created
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        if role.name == 'TEACHER':
            # Create Teacher instance after ensuring UserProfile exists
            Teacher.objects.create(
                user=user,
                user_profile=user_profile,  # Ensure UserProfile is linked
                tution_fee=0,
                teacher_license=None,
                teacher_description="",
                tution_image=None,
                is_approved=False,
                is_available_status=False,
            )
        
        #Send verification email
        mail_subject = 'Please activate your account'
        email_template = 'email/account_verification_email.html'
        send_verification_email(request, user, mail_subject, email_template)

        headers = self.get_success_headers(serializer.data)
        logger.info(f"Sending response: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer
    
    

from django.views.decorators.csrf import csrf_exempt

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        access_token = request.data.get("access")

        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # if access_token:
            #     # Verify and delete the access token
            #     token = AccessToken(access_token)
            #     token.blacklist()  # Requires Blacklist app for JWT
            
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Forget password
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            # Generate token and send email
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(str(user.pk).encode())
            reset_link = f"{settings.FRONTEND_URL}/reset_password_validate/{uid}/{token}/"
            
            # Send the email
            mail_subject = 'Reset your password'
            message = f"""
            <html>
                <body>
                    <p>Hi, {user.username},</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="{reset_link}" 
                    style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; 
                            background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                    Reset Password
                    </a>
                </body>
            </html>
            """

            # Create the email
            email = EmailMessage(
                subject=mail_subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email],
            )

            # Set the content type to HTML
            email.content_subtype = "html"

            # Send the email
            email.send()

            return Response({"message": "Password reset link has been sent to your email."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordValidateView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            request.session['uid'] = uid
            return Response({"message": "Token is valid. Proceed to reset password."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)



class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            uid = serializer.validated_data.get('uid')
            token = serializer.validated_data.get('token')
            password = serializer.validated_data.get('password')

            try:
                user_id = urlsafe_base64_decode(uid).decode()
                user = User.objects.get(pk=user_id)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({"error": "Invalid UID."}, status=status.HTTP_400_BAD_REQUEST)

            # Verify the token
            if not default_token_generator.check_token(user, token):
                return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

            # Reset the password
            user.set_password(password)
            user.is_active = True
            user.save()
            return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import redirect
from django.http import HttpResponseRedirect

class ActivateUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return HttpResponseRedirect('http://localhost:5173/login')
            # Return a response with a redirect URL
            # return Response({
            #     "message": "Account activated successfully.",
            #     "redirect_url": "http://localhost:5173/login"
            # }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

# def activate(request, uidb64, token):
#   # Activate user by setting the is_active status to True
#   try:
#       uid = urlsafe_base64_decode(uidb64).decode()
#       user = User._default_manager.get(pk=uid)
#   except(TypeError, ValueError, OverflowError, User.DoesNotExist):
#      user = None

#   if user is not None and default_token_generator.check_token(user, token):
#      user.is_active = True
#      user.save()
#      return Response({"message": "Account activated successfully."}, status=status.HTTP_200_OK)
#   else:
#      return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
from . import utils
from rest_framework.response import Response
from rest_framework import status
from .models import User, Role, UserProfile
import logging

logger = logging.getLogger(__name__)

def authenticate_or_create_user(email):
    try:
        user = User.objects.get(email=email)
        logger.info(f"User {email} exists.")
    except User.DoesNotExist:
        # Assign default role as 'STUDENT'
        try:
            role, created = Role.objects.get_or_create(name='STUDENT')
        except Exception as e:
            logger.error(f"Error fetching/creating role 'STUDENT': {e}")
            return None

        user = User.objects.create_user(
            first_name=email.split("@")[0],
            last_name='',
            username=email.split("@")[0],
            email=email,
            phone_number='',
        )
        user.role = role
        user.is_active = True  # Assuming you want to activate the user upon Google login
        user.save()
        logger.info(f"Created new user {email} with role 'STUDENT'.")

    return user

def get_jwt_token(user):
    access_token = AccessToken.for_user(user)
    refresh_token = RefreshToken.for_user(user)  # For refresh token
    return {
        "access_token": str(access_token),
        "refresh_token": str(refresh_token),
    }



@method_decorator(csrf_exempt, name='dispatch')
class LoginWithGoogle(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        if 'code' in request.data.keys():
            code = request.data['code']
            id_token = utils.get_id_token_with_code_method_1(code)
            
            if id_token is None:
                return Response(
                    {"error": "Invalid authorization code or missing id_token."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user_email = id_token.get('email')
            if not user_email:
                return Response({"error": "Email not found in id_token."}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate_or_create_user(user_email)
            tokens = get_jwt_token(user)  # Updated to match the fixed get_jwt_token function
            return Response({
                'access_token': tokens['access_token'],
                'refresh_token': tokens['refresh_token'],
                'username': user_email,
                'role': user.get_role(),
            })
        
        return Response({"error": "Authorization code not provided."}, status=status.HTTP_400_BAD_REQUEST)
