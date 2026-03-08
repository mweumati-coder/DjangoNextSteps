from django.db import models

from django.db import models

class Pet(models.Model):
    name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=50)
    breed = models.CharField(max_length=100, default="Unknown")
    gender = models.CharField(max_length=20, default="Unknown")
    age = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    is_vaccinated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True) # <-- Fixed the typo here!

    def __str__(self):
        return self.name