document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".home-container-card");
  const searchInput = document.getElementById("home-input-search-places");
  const filterTabs = document.querySelectorAll(".filter-tabs li");
  let cardData = [];

  // Funktion zur Erstellung der Karten
  function createCards(cards) {
    cardContainer.innerHTML = ""; // Vorherige Karten leeren
    cards.forEach((card) => {
      const cardElement = document.createElement("a");
      cardElement.classList.add("home-card");
      // Dynamische URL mit der ID
      cardElement.href = `card.html?id=${card.id}`;

      cardElement.innerHTML = `
        <img src="${card.imgSrc}" alt="${card.title}" class="home-card-background">
        <div class="horizontal-flex-end">
          <span class="material-symbols-outlined padding-primary txt-color-normal">favorite</span>
        </div>
        <div class="home-card-infos">
          <ul class="horizontal-space-between">
            <li><h2 class="txt-color-whtie txt-bold">${card.title}, </h2></li>
            <li class="horizontal-item"><p>${card.views}</p><span class="material-symbols-outlined txt-color-normal" id="icon-little">visibility</span></li>
          </ul>
          <ul class="horizontal-space-between">
            <li>${card.location}</li>
            <li class="horizontal-item"><p>${card.rating}</p><span class="material-symbols-outlined txt-color-normal" id="icon-little">star</span></li>
          </ul>
        </div>
      `;
      cardContainer.appendChild(cardElement);
    });
  }

  // Funktion zum Laden der JSON-Datei
  function loadCardData() {
    fetch('cards.json') // JSON-Datei laden
      .then(response => response.json())
      .then(data => {
        cardData = data; // Daten speichern
        createCards(cardData); // Karten basierend auf den Daten erstellen
      })
      .catch(error => console.error('Fehler beim Laden der Daten:', error));
  }

  // Sortier-Funktion
  function sortCards(criteria) {
    let sortedCards = [...cardData]; // Kopie des Original-Arrays
    switch (criteria) {
      case "most-viewed":
        sortedCards.sort((a, b) => b.views - a.views);
        break;
      case "nearest":
        sortedCards.sort((a, b) => a.distance - b.distance);
        break;
      case "highest-rating":
        sortedCards.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedCards = cardData; // Unsortiert zurückgeben
        break;
    }
    createCards(sortedCards);
  }

  // Event-Listener für Sortierung
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("txt-color-dark")); // Reset active state
      tab.classList.add("txt-color-dark"); // Mark active

      switch (tab.id) {
        case "home-btn-view-all":
          createCards(cardData);
          break;
        case "home-btn-most-viewed":
          sortCards("most-viewed");
          break;
        case "home-btn-nearby":
          sortCards("nearest");
          break;
        case "home-btn-highest-rating":
          sortCards("highest-rating");
          break;
      }
    });
  });

  // Suchfunktion
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredCards = cardData.filter((card) =>
      card.title.toLowerCase().includes(searchText) ||
      card.location.toLowerCase().includes(searchText) // Suche auch im Standort
    );
    createCards(filteredCards);
  });

  // Karten-Daten laden, sobald die Seite fertig geladen ist
  loadCardData();
});
