from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserAuthenticationSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from .models import Flight, Hotel, Activity, Package, Booking
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, PackageSerializer, AddPackageSerializer, AddBookingSerializer, BookingSerializer


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
                'role': str(user.role),
                'id': str(user.id),
                'username': str(user.username),
                'email': str(user.email)
            })
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        
        
class FlightListCreate(generics.ListCreateAPIView):
    serializer_class = FlightSerializer
    def get_queryset(self):
        return Flight.objects.all().order_by('-created_at'




class FlightRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class HotelListCreate(generics.ListCreateAPIView):
    serializer_class = HotelSerializer
    def get_queryset(self):
        return Hotel.objects.all().order_by('-created_at')




class HotelRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class ActivityListCreate(generics.ListCreateAPIView):
    serializer_class = ActivitySerializer
    def get_queryset(self):
        return Activity.objects.all().order_by('-created_at')




class ActivityRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class AddPackageAPIView(generics.CreateAPIView):
    queryset = Package.objects.all()
    serializer_class = AddPackageSerializer

class EditPackageAPIView(generics.UpdateAPIView):
    queryset = Package.objects.all()
    serializer_class = AddPackageSerializer

class PackageListCreate(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = PackageSerializer
    def get_queryset(self):
        return Package.objects.all().order_by('-created_at')



class PackageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class BookingListCreate(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        print("user", user)
        if user.is_authenticated:
            return Booking.objects.filter(user=user).order_by('-created_at')
        else:
            return Booking.objects.none()  
    
class AddBookingAPIView(generics.CreateAPIView):
    serializer_class = AddBookingSerializer
    queryset = Booking.objects.all()



class BookingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer