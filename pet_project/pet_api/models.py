from django.db import models

from django.db import models

class Pet(models.Model):
    name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=50)
    breed = models.CharField(max_length=100, default="Unknown")
    age = models.IntegerField()
    is_vaccinated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True) # <-- Fixed the typo here!

    def __str__(self):
        return self.name

    def __str__(self):
        return self.name