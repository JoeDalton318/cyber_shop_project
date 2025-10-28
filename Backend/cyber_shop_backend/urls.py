from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static # Nécessaire pour les images

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Inclure toutes les routes définies dans catalogue/urls.py sous le préfixe 'api/'
    path('api/', include('catalogue.urls')), 
]

# Gérer les fichiers médias (images) UNIQUEMENT en mode développement !
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # L'inclusion de static(settings.STATIC_URL...) est déjà gérée par Django, mais nous avons besoin de MEDIA