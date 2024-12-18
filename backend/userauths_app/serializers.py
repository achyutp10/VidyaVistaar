from rest_framework import serializers
from userauths_app.models import User, UserProfile, Role, UserRole
from teacher_app.models import Teacher
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Add custom claims
#         token['email'] = user.email
#         token['username'] = user.username
        
#         # Directly access role if it's a model field or use the method if defined
#         token['role'] = user.role.name if user.role else None
        
        # return token

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Add custom claims if the user is authenticated
#         if user.is_authenticated:
#             token['email'] = user.email
#             token['username'] = user.username
#             token['role'] = user.get_role() if hasattr(user, 'get_role') else None
#         return token

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom user data
        user = self.user  # This is the validated user
        role = user.get_role() if hasattr(user, 'get_role') else None

        data['role'] = role if role else "No Role Assigned"

        return data

    # def validate(self, attrs):
    #     data = super().validate(attrs)
    #     data.update({'role': self.user.get_role()})
    #     data.update({'username': self.user.username})
    #     return data

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'phone_number', 'role', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return attrs

    def create(self, validated_data):
        role_name = validated_data.pop('role')
        try:
            role = Role.objects.get(name=role_name.upper())
        except Role.DoesNotExist:
            raise serializers.ValidationError({"role": "Invalid role selected."})

        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            username=validated_data['username'],
            role=role
        )
        user.set_password(validated_data['password'])
        user.save()
        
        if role:
            role, created = Role.objects.get_or_create(name=role_name)
            UserRole.objects.create(user=user, role=role)
        UserProfile.objects.get_or_create(user=user)

        return user
    
        # Override `to_representation` to include role in response
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['role'] = instance.role.name if instance.role else None  # Include role name
        return representation

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'address', 'country', 'state', 'city', 'pin_code', 'latitude', 'longitude', 'location']

    def create(self, validated_data):
        latitude = validated_data.get('latitude')
        longitude = validated_data.get('longitude')
        if latitude and longitude:
            validated_data['location'] = (float(longitude), float(latitude))
        return super(UserProfileSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        latitude = validated_data.get('latitude')
        longitude = validated_data.get('longitude')
        if latitude and longitude:
            validated_data['location'] = (float(longitude), float(latitude))
        return super(UserProfileSerializer, self).update(instance, validated_data)

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['teacher_license', 'teacher_description', 'tution_fee', 'tution_image', 'is_approved', 'is_available_status']


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Account does not exist with this email.")
        return value


# Reset password

# class ResetPasswordSerializer(serializers.Serializer):
#     password = serializers.CharField(write_only=True)
#     confirm_password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         if data['password'] != data['confirm_password']:
#             raise serializers.ValidationError("Passwords do not match.")
#         return data

class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data