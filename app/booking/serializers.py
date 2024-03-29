from rest_framework import serializers
from django.contrib.auth import get_user_model 
from .models import CustomUser, Flight, Hotel, Activity, Package, Booking
User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserAuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    flights = FlightSerializer(many=True)
    hotels = HotelSerializer(many=True)
    activities = ActivitySerializer(many=True)
    user = CustomUserSerializer()

    class Meta:
        model = Package
        fields = ['id', 'name', 'description', 'flights', 'hotels', 'activities', 'is_custom_package', 'user']

class BookingSerializer(serializers.ModelSerializer):
    package = PackageSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'package', 'user', 'total_price', 'created_at', 'updated_at', 'is_cancelled']

class AddPackageSerializer(serializers.ModelSerializer):
    flights = serializers.PrimaryKeyRelatedField(queryset=Flight.objects.all(), many=True)
    hotels = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all(), many=True)
    activities = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all(), many=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Package
        fields = ['name', 'description', 'flights', 'hotels', 'activities', 'is_custom_package', 'user']