let livres = [
  {
    id: 1,
    titre: "Le Seigneur des Anneaux",
    auteur: "J.R.R. Tolkien",
    annee: 1954,
    genre: "fantastique",
    note: 5,
    statut: "lu",
    description:
      "L'histoire de Frodon Sacquet qui doit détruire l'Anneau Unique pour sauver la Terre du Milieu.",
    urlCouverture:
      "https://cdn.pixabay.com/photo/2021/12/14/20/21/book-6871220_1280.jpg",
  },
  {
    id: 2,
    titre: "1984",
    auteur: "George Orwell",
    annee: 1949,
    genre: "scienceFiction",
    note: 4,
    statut: "lu",
    description:
      "Dans une société totalitaire, Winston Smith tente de résister au contrôle omniprésent de Big Brother.",
    urlCouverture:
      "https://cdn.pixabay.com/photo/2015/11/19/21/11/atlas-1052011_1280.jpg",
  },
  {
    id: 3,
    titre: "Dune",
    auteur: "Frank Herbert",
    annee: 1965,
    genre: "scienceFiction",
    note: 5,
    statut: "enCours",
    description:
      "L'histoire de Paul Atréides sur la planète désertique Arrakis, source de l'épice la plus précieuse de l'univers.",
    urlCouverture:
      "https://cdn.pixabay.com/photo/2017/08/10/08/16/book-2619909_1280.jpg",
  },
];

// todo : Sélection des éléments du DOM

const grilleLivres = document.getElementById("bookGrid");
const formulaireLivre = document.getElementById("bookForm");
const modalFormulaireLivre = document.getElementById("bookFormModal");
const modalDetailLivre = document.getElementById("bookDetailModal");
const fermerModalFormulaire = document.getElementById("closeFormModal");
const fermerModalDetail = document.getElementById("closeDetailModal");
const boutonAjouterLivre = document.getElementById("addBookBtn");
const titreModal = document.getElementById("modalTitle");
const champRecherche = document.getElementById("searchInput");
const filtreGenre = document.getElementById("genreFilter");
const filtreStatut = document.getElementById("statusFilter");
const messageAlerte = document.getElementById("alertMessage");

// === 3. Affichage des livres ===
function afficherLivres(liste) {
    grilleLivres.innerHTML = "";

    if (liste.length === 0) {
        grilleLivres.innerHTML = "<p>Aucun livre ne correspond à votre recherche.</p>";
        return;
    }

    liste.forEach(livre => {
        const carte = document.createElement("div");
        carte.classList.add("book-card");

            let statutClass = "";
    if (livre.statut === "lu") statutClass = "status-read";
    else if (livre.statut === "enCours") statutClass = "status-reading";
    else statutClass = "status-unread";

        carte.innerHTML = `
            <div class="book-cover" style="background-image: url('${
          livre.urlCouverture
        }');"></div>
           <div class = "book-info">
            <h3>${livre.titre}</h3>
            <p>${livre.auteur}</p>
            <p>${"⭐".repeat(livre.note)}${"⭐".repeat(5 - livre.note)}</p>
            <p class ="book-status ${statutClass}"> ${livre.statut}</p>
            <div class="actions">
           </div>
                <button class="card-btn btn-edit" onclick="modifierLivre(${livre.id})">Modifier</button>
                <button class=" card-btn btn-delete" onclick="supprimerLivre(${livre.id})">Supprimer</button>
            </div>
        `;

        // carte.addEventListener("click", (e) => {
        //     if (!e.target.classList.contains("btn-edit") && !e.target.classList.contains("btn-delete")) {
        //         afficherDetailsLivre(livre.id);
        //     }
        // });

        grilleLivres.appendChild(carte);
    });
}
afficherLivres(livres);


let idActuel = livres.length ? Math.max(...livres.map(l => l.id)) : 0;

// Ouvre le formulaire pour ajouter un livre
boutonAjouterLivre.addEventListener("click", () => {
    formulaireLivre.reset();
    document.getElementById("bookId").value = "";
    titreModal.textContent = "Ajouter un livre";
    modalFormulaireLivre.style.display = "block";
});

// Ferme le formulaire
fermerModalFormulaire.addEventListener("click", () => {
    modalFormulaireLivre.style.display = "none";
});

// Soumission du formulaire (ajout ou modification)
formulaireLivre.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("bookId").value;
    const nouveauLivre = {
        id: id ? parseInt(id) : ++idActuel,
        titre: document.getElementById("title").value,
        auteur: document.getElementById("author").value,
        annee: parseInt(document.getElementById("year").value),
        genre: document.getElementById("genre").value,
        note: parseInt(document.getElementById("rating").value),
        statut: document.getElementById("status").value,
        description: document.getElementById("description").value,
        urlCouverture: document.getElementById("coverUrl").value || "https://cdn.pixabay.com/photo/2015/11/19/21/11/atlas-1052011_1280.jpg"
    };

    if (id) {
        // Modifier
        const index = livres.findIndex(l => l.id === nouveauLivre.id);
        if (index !== -1) livres[index] = nouveauLivre;
        afficherMessage("Livre modifié avec succès !");
    } else {
        // Ajouter
        livres.push(nouveauLivre);
        afficherMessage("Livre ajouté avec succès !");
    }

    afficherLivres(livres);
    modalFormulaireLivre.style.display = "none";
});

// Modifier un livre
function modifierLivre(id) {
    const livre = livres.find(l => l.id === id);
    if (!livre) return;

    document.getElementById("bookId").value = livre.id;
    document.getElementById("title").value = livre.titre;
    document.getElementById("author").value = livre.auteur;
    document.getElementById("year").value = livre.annee;
    document.getElementById("genre").value = livre.genre;
    document.getElementById("rating").value = livre.note;
    document.getElementById("status").value = livre.statut;
    document.getElementById("description").value = livre.description;
    document.getElementById("coverUrl").value = livre.urlCouverture;

    titreModal.textContent = "Modifier le livre";
    modalFormulaireLivre.style.display = "block";
}

// Supprimer un livre
function supprimerLivre(id) {
    if (confirm("Voulez-vous vraiment supprimer ce livre ?")) {
        livres = livres.filter(l => l.id !== id);
        afficherLivres(livres);
        afficherMessage("Livre supprimé avec succès !");
    }
}

// Fonction d'affichage des messages
function afficherMessage(message) {
    messageAlerte.textContent = message;
    messageAlerte.style.display = "block";
    setTimeout(() => {
        messageAlerte.textContent = "";
        messageAlerte.style.display = "none";
    }, 3000);
}


// Fermer les modals en cliquant à l’extérieur du contenu
window.addEventListener("click", (e) => {
    if (e.target === modalFormulaireLivre) {
        modalFormulaireLivre.style.display = "none";
    }
    if (e.target === modalDetailLivre) {
        modalDetailLivre.style.display = "none";
    }
});





/////////////////////////////////////////////////////////////////////////////////////////
// // todo 4. Filtrage des livres ===
// function filtrerLivres() {
//     const recherche = champRecherche.value.toLowerCase();
//     const genre = filtreGenre.value;
//     const statut = filtreStatut.value;

//     const resultats = livres.filter(livre => {
//         const correspondTexte = livre.titre.toLowerCase().includes(recherche) || livre.auteur.toLowerCase().includes(recherche);
//         const correspondGenre = !genre || livre.genre === genre;
//         const correspondStatut = !statut || livre.statut === statut;
//         return correspondTexte && correspondGenre && correspondStatut;
//     });

//     afficherLivres(resultats);
// }

// // todo 5. Affichage des détails d’un livre 
// function afficherDetailsLivre(id) {
//     const livre = livres.find(l => l.id === id);
//     if (!livre) return;

//     document.getElementById("detailTitle").textContent = livre.titre;
//     document.getElementById("detailAuthor").textContent = livre.auteur;
//     document.getElementById("detailYear").textContent = livre.annee;
//     document.getElementById("detailGenre").textContent = livre.genre;
//     document.getElementById("detailRating").textContent = livre.note;
//     document.getElementById("detailStatus").textContent = livre.statut;
//     document.getElementById("detailDescription").textContent = livre.description || "";
//     document.getElementById("detailCover").innerHTML = `<img src="${livre.urlCouverture || 'https://via.placeholder.com/150'}" alt="${livre.titre}" />`;

//     modalDetailLivre.style.display = "block";
// }

// // === 6. Ajout d’un livre ===
// function ajouterLivre() {
//     titreModal.textContent = "Ajouter un livre";
//     formulaireLivre.reset();
//     document.getElementById("bookId").value = "";
//     modalFormulaireLivre.style.display = "block";
// }

// // === 7. Modification d’un livre ===
// function modifierLivre(id) {
//     const livre = livres.find(l => l.id === id);
//     if (!livre) return;

//     titreModal.textContent = "Modifier un livre";
//     document.getElementById("bookId").value = livre.id;
//     document.getElementById("title").value = livre.titre;
//     document.getElementById("author").value = livre.auteur;
//     document.getElementById("year").value = livre.annee;
//     document.getElementById("genre").value = livre.genre;
//     document.getElementById("rating").value = livre.note;
//     document.getElementById("status").value = livre.statut;
//     document.getElementById("description").value = livre.description;
//     document.getElementById("coverUrl").value = livre.urlCouverture;

//     modalFormulaireLivre.style.display = "block";
// }

// // === 8. Suppression d’un livre ===
// function supprimerLivre(id) {
//     if (!confirm("Voulez-vous vraiment supprimer ce livre ?")) return;
//     livres = livres.filter(l => l.id !== id);
//     afficherMessageAlerte("Livre supprimé avec succès", "success");
//     filtrerLivres();
// }

// // === 10. Affichage des messages d’alerte ===
// function afficherMessageAlerte(message, type = "success") {
//     messageAlerte.textContent = message;
//     messageAlerte.className = `alert alert-${type}`;
//     messageAlerte.style.display = "block";
//     setTimeout(() => messageAlerte.style.display = "none", 3000);
// }

// // === 11. Gestion des événements ===
// boutonAjouterLivre.addEventListener("click", ajouterLivre);
// fermerModalFormulaire.addEventListener("click", () => modalFormulaireLivre.style.display = "none");
// fermerModalDetail.addEventListener("click", () => modalDetailLivre.style.display = "none");

// champRecherche.addEventListener("input", filtrerLivres);
// filtreGenre.addEventListener("change", filtrerLivres);
// filtreStatut.addEventListener("change", filtrerLivres);

// window.addEventListener("click", (e) => {
//     if (e.target === modalFormulaireLivre) modalFormulaireLivre.style.display = "none";
//     if (e.target === modalDetailLivre) modalDetailLivre.style.display = "none";
// });

// formulaireLivre.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const id = document.getElementById("bookId").value;
//     const nouveauLivre = {
//         id: id ? parseInt(id) : Date.now(),
//         titre: document.getElementById("title").value,
//         auteur: document.getElementById("author").value,
//         annee: parseInt(document.getElementById("year").value),
//         genre: document.getElementById("genre").value,
//         note: parseInt(document.getElementById("rating").value),
//         statut: document.getElementById("status").value,
//         description: document.getElementById("description").value,
//         urlCouverture: document.getElementById("coverUrl").value
//     };

//     if (id) {
//         // Modification
//         const index = livres.findIndex(l => l.id === parseInt(id));
//         livres[index] = nouveauLivre;
//         afficherMessageAlerte("Livre modifié avec succès", "success");
//     } else {
//         // Ajout
//         livres.push(nouveauLivre);
//         afficherMessageAlerte("Livre ajouté avec succès", "success");
//     }

//     modalFormulaireLivre.style.display = "none";
//     filtrerLivres();
// });

// // === 12. Initialisation au chargement de la page ===
// document.addEventListener("DOMContentLoaded", () => {
//     afficherLivres(livres);
// });

