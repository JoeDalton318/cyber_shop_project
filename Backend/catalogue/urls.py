from rest_framework.routers import DefaultRouter
from .views import ProduitViewSet, CategorieViewSet

# Utilisation d'un routeur pour générer automatiquement les routes pour nos ViewSets
router = DefaultRouter()
router.register(r'produits', ProduitViewSet)
router.register(r'categories', CategorieViewSet)

# Le router fournit l'ensemble des chemins URL.
urlpatterns = router.urls