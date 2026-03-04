from rest_framework import generics
from .models import Pet
from .serializers import PetSerializer

# This handles listing pets (GET) and adding pets (POST)
class PetListCreate(generics.ListCreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer