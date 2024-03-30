from django.urls import path
from .views import UserRegistrationAPIView
from .views import UserRegistrationAPIView, UserAuthenticationAPIView
from .views import FlightListCreate, HotelListCreate, HotelRetrieveUpdateDestroy, ActivityListCreate, ActivityRetrieveUpdateDestroy, FlightRetrieveUpdateDestroy, PackageListCreate, PackageRetrieveUpdateDestroy, BookingListCreate, BookingRetrieveUpdateDestroy
from .apiViews.flightAPIView import FlightAPIView

urlpatterns = [
        # auth URLs
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserAuthenticationAPIView.as_view(), name='user-login'),

        # Flight URLs
    path('flights/', FlightListCreate.as_view(), name='flight-list-create'),
    path('flights/<int:pk>/', FlightRetrieveUpdateDestroy.as_view(), name='flight-retrieve-update-destroy'),

    # Hotel URLs
    path('hotels/', HotelListCreate.as_view(), name='hotel-list-create'),
    path('hotels/<int:pk>/', HotelRetrieveUpdateDestroy.as_view(), name='hotel-retrieve-update-destroy'),

    # Activity URLs
    path('activities/', ActivityListCreate.as_view(), name='activity-list-create'),
    path('activities/<int:pk>/', ActivityRetrieveUpdateDestroy.as_view(), name='activity-retrieve-update-destroy'),

    # Package URLs
    path('packages/', PackageListCreate.as_view(), name='package-list-create'),
    path('packages/<int:pk>/', PackageRetrieveUpdateDestroy.as_view(), name='package-retrieve-update-destroy'),

    # Booking URLs
    path('bookings/', BookingListCreate.as_view(), name='booking-list-create'),
    path('bookings/<int:pk>/', BookingRetrieveUpdateDestroy.as_view(), name='booking-retrieve-update-destroy')
]
