from django.contrib import admin
from .models import Categorie, Produit

# Personnalisation optionnelle pour un meilleur affichage
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prix', 'categorie', 'niveau_prix', 'date_ajout')
    list_filter = ('categorie', 'niveau_prix', 'date_ajout')
    search_fields = ('nom', 'description')

# Enregistrement
admin.site.register(Categorie)
admin.site.register(Produit, ProduitAdmin)