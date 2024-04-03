from django.contrib import admin
from .models import Flight, Activity, Hotel, Package, Booking
# Register your models here.
admin.site.register(Flight)
admin.site.register(Activity)
admin.site.register(Hotel)
admin.site.register(Package)
admin.site.register(Booking)