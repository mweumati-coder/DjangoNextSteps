import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pet_project.settings')
import django

django.setup()

from django.db import connections

try:
    conn = connections['default']
    cur = conn.cursor()
    print('DB connection OK')
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
