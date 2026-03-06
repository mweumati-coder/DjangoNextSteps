from django.contrib import admin
from django.urls import path
from pet_api.views import PetListCreate, PetDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pets/', PetListCreate.as_view()), 
    path('api/pets/<int:pk>/', PetDetail.as_view()),
]