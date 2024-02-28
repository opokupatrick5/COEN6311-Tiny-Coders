from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserAuthenticationSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import PackageCT

from rest_framework import permissions


from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAuthenticationAPIView(APIView):
    def post(self, request):
        # Check if the request has the necessary data
        if 'username' not in request.data or 'password' not in request.data:
            return Response({'detail': 'username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserAuthenticationSerializer(data=request.data)
        # Validate serializer data
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': str(user.role)
            })
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)