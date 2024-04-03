from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission

"""
1. package management
  -- CRUD on package
    entity
     id
     name


"""

class CustomUser(AbstractUser):
    CUSTOMER = 'customer'
    AGENT = 'agent'

    ROLE_CHOICES = [
        (CUSTOMER, 'Customer'),
        (AGENT, 'Agent'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=CUSTOMER)

    groups = models.ManyToManyField(Group, related_name='custom_users', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_users', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class Flight(models.Model):
    airline = models.CharField(max_length=100)
    departure_airport = models.CharField(max_length=100)
    destination_airport = models.CharField(max_length=100)
    departure_date = models.DateField()
    return_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.airline} Flight ({self.departure_airport} to {self.destination_airport})"


class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Package(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    flights = models.ManyToManyField(Flight, blank=True)
    hotels = models.ManyToManyField(Hotel, blank=True)
    activities = models.ManyToManyField(Activity, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_custom_package = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Package for {self.user.username}"
    

class Booking(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.package.name} - {self.user.username}"