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

const bookContainer = document.getElementById("bookGrid");
function afficherLivres(listeLivres) {
  listeLivres.forEach((livre) => {
    const card = document.createElement("div");
    card.className = "book-card";

   // Pour chosir de statut de la class

    let statutClass = "";
    if (livre.statut === "lu") statutClass = "status-read";
    else if (livre.statut === "enCours") statutClass = "status-reading";
    else statutClass = "status-unread";

    card.innerHTML = `
        <div class="book-cover" style="background-image: url('${
          livre.urlCouverture
        }');"></div>
        <div class="book-info">
          <h3 class="book-title">${livre.titre}</h3>
          <p class="book-author">de ${livre.auteur} (${livre.annee})</p>
          <div class="book-rating">${"⭐".repeat(livre.note)}</div>
         <div class="book-status ${statutClass}">${livre.statut}</div>
          <p>${livre.description}</p>
          <div class="card-actions">
            <button class="card-btn btn-edit">Modifier</button>
            <button class="card-btn btn-delete">Supprimer</button>
          </div>
        </div>
      `;

    bookContainer.appendChild(card);
  });
}

// Appel de la fonction au chargement
afficherLivres(livres);



