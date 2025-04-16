# Gestionnaire de Livres - Pseudo-code

## **1. Initialisation des données**

- Créer une liste `livres` contenant des objets représentant des livres avec les propriétés suivantes :
  - `id` : Identifiant unique du livre.
  - `titre` : Titre du livre.
  - `auteur` : Auteur du livre.
  - `annee` : Année de publication.
  - `genre` : Genre du livre (ex. fantastique, science-fiction, etc.).
  - `note` : Note attribuée au livre (de 1 à 5).
  - `statut` : Statut de lecture (non lu, en cours, lu).
  - `description` : Description du livre.
  - `urlCouverture` : URL de l'image de couverture.

---

## **2. Sélection des éléments du DOM**

- **Grille des livres** : `grilleLivres` - Conteneur où les cartes des livres seront affichées.
- **Formulaire d'ajout/modification** : `formulaireLivre` - Formulaire pour ajouter ou modifier un livre.
- **Modal du formulaire** : `modalFormulaireLivre` - Fenêtre modale contenant le formulaire.
- **Modal des détails** : `modalDetailLivre` - Fenêtre modale affichant les détails d'un livre.
- **Boutons de fermeture des modals** :
  - `fermerModalFormulaire` - Bouton pour fermer le modal du formulaire.
  - `fermerModalDetail` - Bouton pour fermer le modal des détails.
- **Bouton d'ajout de livre** : `boutonAjouterLivre` - Bouton pour ouvrir le formulaire d'ajout.
- **Titre du modal** : `titreModal` - Titre du formulaire (ajout ou modification).
- **Champs de recherche et filtres** :
  - `champRecherche` - Champ pour rechercher un livre par titre ou auteur.
  - `filtreGenre` - Menu déroulant pour filtrer par genre.
  - `filtreStatut` - Menu déroulant pour filtrer par statut.
- **Message d'alerte** : `messageAlerte` - Zone pour afficher des messages temporaires (succès ou erreur).

---

## **3. Affichage des livres**

- **Fonction `afficherLivres`** :
  - Effacer le contenu de la grille.
  - Si aucun livre ne correspond, afficher un message "Aucun livre ne correspond à votre recherche".
  - Pour chaque livre :
    - Créer une carte contenant :
      - Une image de couverture.
      - Le titre, l'auteur, la note (sous forme d'étoiles), le statut, et des boutons "Modifier" et "Supprimer".
    - Ajouter des écouteurs d'événements :
      - **Clique sur la carte** : Afficher les détails du livre.
      - **Bouton "Modifier"** : Ouvrir le formulaire pré-rempli pour modifier le livre.
      - **Bouton "Supprimer"** : Supprimer le livre après confirmation.

---

## **4. Filtrage des livres**

- **Fonction `filtrerLivres`** :
  - Récupérer les valeurs des champs de recherche et des filtres.
  - Filtrer les livres selon :
    - Le titre ou l'auteur contient le texte recherché.
    - Le genre correspond au filtre sélectionné.
    - Le statut correspond au filtre sélectionné.
  - Afficher les livres filtrés avec `afficherLivres`.

---

## **5. Affichage des détails d'un livre**

- **Fonction `afficherDetailsLivre`** :
  - Trouver le livre correspondant à l'`id` donné.
  - Si trouvé, remplir les champs du modal des détails avec les informations du livre :
    - Titre, auteur, année, genre, note, statut, description, et image de couverture.
  - Afficher le modal des détails.

---

## **6. Ajout d'un livre**

- **Fonction `ajouterLivre`** :
  - Changer le titre du modal en "Ajouter un livre".
  - Réinitialiser le formulaire.
  - Afficher le modal du formulaire.

---

## **7. Modification d'un livre**

- **Fonction `modifierLivre`** :
  - Trouver le livre correspondant à l'`id` donné.
  - Si trouvé, remplir les champs du formulaire avec les données du livre.
  - Changer le titre du modal en "Modifier un livre".
  - Afficher le modal du formulaire.

---

## **8. Suppression d'un livre**

- **Fonction `supprimerLivre`** :
  - Demander confirmation à l'utilisateur.
  - Si confirmé :
    - Supprimer le livre de la liste.
    - Afficher un message d'alerte.
    - Mettre à jour l'affichage des livres.

---

## **10. Affichage des messages d'alerte**

- **Fonction `afficherMessageAlerte`** :
  - Afficher un message temporaire (par exemple, "Le livre a été ajouté avec succès").
  - Masquer le message après 3 secondes.

---

## **11. Gestion des événements**

- **Bouton "Ajouter un livre"** : Ouvre le formulaire d'ajout.
- **Boutons de fermeture des modals** : Ferment les modals correspondants.
- **Champs de recherche et filtres** : Filtrent les livres en temps réel.
- **Clique en dehors des modals** : Ferme les modals.
- **Soumission du formulaire** :
  - Si un `id` est présent, modifier le livre existant.
  - Sinon, ajouter un nouveau livre.
  - Fermer le modal et mettre à jour l'affichage.

---

## **12. Initialisation au chargement de la page**

- **Événement `DOMContentLoaded`** :
  - Afficher les livres.

---

## **Détails des modals**

1. **Modal du formulaire (`modalFormulaireLivre`)** :

   - Contient un formulaire avec des champs pour :
     - Titre, auteur, année, genre, note, statut, description, et URL de la couverture.
   - Bouton pour soumettre le formulaire.

2. **Modal des détails (`modalDetailLivre`)** :
   - Affiche les informations détaillées d'un livre :
     - Titre, auteur, année, genre, note, statut, description, et image de couverture.
   - Bouton pour fermer le modal.

