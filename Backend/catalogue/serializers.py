from rest_framework import serializers
from .models import Produit, Categorie

class CategorieSerializer(serializers.ModelSerializer):
    # Sérialiseur pour la liste des catégories
    class Meta:
        model = Categorie
        fields = ['id', 'nom'] # N'envoyons que l'ID et le nom

class ProduitSerializer(serializers.ModelSerializer):
    # Utilise le sérialiseur de catégorie pour afficher le nom de la catégorie dans le JSON du produit
    categorie = CategorieSerializer(read_only=True) 

    # Ajoutons le chemin complet de l'image pour le frontend
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        # Champs que nous voulons envoyer au frontend
        fields = [
            'id', 'nom', 'description', 'prix', 
            'image_url', 'categorie', 'niveau_prix', 'date_ajout'
        ]

    # Méthode pour obtenir l'URL complète de l'image
    def get_image_url(self, obj):
        if obj.image:
            # Assurez-vous d'avoir configuré MEDIA_URL dans settings.py
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None