import os
from django.core.wsgi import get_wsgi_application

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pet_project.settings')

# Expose 'app' as the WSGI callable for Vercel Serverless
app = get_wsgi_application()
