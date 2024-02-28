from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission


class PackageItems(models.Model):
    package_name = models.CharField(max_length=200)
    description = models.TextField()
    available = models.BooleanField(default=True)

    class Meta:
        abstract = True

class Package(PackageItems):
     date = models.DateField(default=timezone.now)

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

    def __str__(self):
        return self.username