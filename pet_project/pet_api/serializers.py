from rest_framework import serializers
from .models import Pet

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        # We add the new fields here so they show up in the API
        fields = ['id', 'name', 'pet_type', 'breed', 'age', 'is_vaccinated', 'created_at']