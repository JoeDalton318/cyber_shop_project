from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Produit, Categorie
from .serializers import ProduitSerializer, CategorieSerializer

# Vue pour les catégories (juste la liste)
class CategorieViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Fournit la liste des catégories. ReadOnlyModelViewSet car pas de CRUD via API publique.
    """
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

# Vue pour les produits (liste, recherche, filtres et détail)
class ProduitViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Fournit la liste des produits et gère les filtres/recherche.
    """
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
    
    # 1. Backends de Filtres
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    
    # 2. Champs de Filtre (pour les requêtes GET ?categorie=X ou ?niveau_prix=Y)
    filterset_fields = ['categorie__nom', 'niveau_prix'] 
    
    # 3. Champs de Recherche (pour la requête GET ?search=terme)
    search_fields = ['nom']
    
    # 4. Champs d'Ordre (pour la requête GET ?ordering=prix ou ?ordering=-prix)
    ordering_fields = ['prix', 'date_ajout', 'nom']

    # 5. Ordre par défaut
    ordering = ['nom']