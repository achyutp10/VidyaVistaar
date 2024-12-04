from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from userauths_app.models import User, UserProfile, Role
from teacher_app.models import Teacher
from userauths_app.serializers import UserSerializer, UserProfileSerializer, MyTokenObtainPairSerializer, TeacherSerializer
from django.db import transaction
import logging

logger = logging.getLogger(__name__)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

    

#     def post(self, request, *args, **kwargs):
#         # Get the response from the TokenObtainPairView
#         response = super().post(request, *args, **kwargs)

#         # Debugging: Check if user is authenticated
#         print(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")

#         if request.user.is_authenticated:
#             response_data = response.data
#             print(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")
            
#             # Fetch the role using the get_role method
#             role = request.user.get_role()

#             # Debugging: Print role or 'No Role Assigned'
#             if role:
#                 print(f"User role: {role}")
#             else:
#                 print("No Role Assigned")

#             # Add the role to the response data
#             response_data['role'] = role if role else "No Role Assigned"

#             # Debugging: Log the updated response data
#             print(f"Updated Response Data: {response_data}")

#             return Response(response_data)

#         # If not authenticated, log it
#         print("User is not authenticated")
#         return response




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
        
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user