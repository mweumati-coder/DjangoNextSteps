from django.contrib import admin
from django.urls import path
from pet_api.views import PetListCreate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pets/', PetListCreate.as_view()), 
]