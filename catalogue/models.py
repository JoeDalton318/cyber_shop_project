from django.db import models

# --- Modèle 1 : Categorie ---
# Pour organiser les produits (ex: "Accessoires Cyber", "Vêtements Neon")
class Categorie(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Catégories" # Correction pour l'affichage dans l'Admin
        ordering = ['nom'] # Trie par nom

    def __str__(self):
        return self.nom

# --- Modèle 2 : Produit ---
# Représente les articles du catalogue
class Produit(models.Model):
    # Les choix pour le filtre "niveau_prix"
    CHOIX_NIVEAU_PRIX = [
        ('low', 'Bas (Moins de 50 crédits)'),
        ('medium', 'Moyen (50 à 200 crédits)'),
        ('high', 'Élevé (Plus de 200 crédits)'),
    ]

    nom = models.CharField(max_length=200)
    description = models.TextField()
    # DecimalField est la meilleure pratique pour les prix
    prix = models.DecimalField(max_digits=10, decimal_places=2) 
    
    # Nécessite l'installation de Pillow. Les images seront stockées dans MEDIA_ROOT/produits/
    image = models.ImageField(upload_to='produits/') 
    
    # Clé étrangère vers Categorie. Si la catégorie est supprimée, le champ est mis à NULL.
    categorie = models.ForeignKey(
        Categorie, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='produits' # Permet de retrouver facilement les produits d'une catégorie
    )
    
    # Champ pour le filtre basé sur la fourchette de prix
    niveau_prix = models.CharField(
        max_length=10, 
        choices=CHOIX_NIVEAU_PRIX, 
        default='medium'
    )

    date_ajout = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['nom'] # Trie par nom par défaut

    def __str__(self):
        return self.nom