document.addEventListener("DOMContentLoaded", () => {
    const cardId = getUrlParameter('id'); // ID aus der URL extrahieren
    let cardData = [];

    // Funktion um die URL-Parameter zu extrahieren
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Funktion zum Laden der JSON-Datei
    function loadCardData() {
        fetch('cards.json') // JSON-Datei laden
            .then(response => response.json())
            .then(data => {
                cardData = data; // Daten speichern
                displayCardDetails(cardId); // Funktion aufrufen, um die Card-Details anzuzeigen
            })
            .catch(error => console.error('Fehler beim Laden der Daten:', error));
    }

    // Funktion um die Details der Karte anzuzeigen
    function displayCardDetails(id) {
        const card = cardData.find(card => card.id === id); // Karte mit der entsprechenden ID finden

        if (card) {
            // Titel setzen
            document.querySelector("h2.txt-color-dark").textContent = card.title; 
            // Preis, Views und Rating setzen
            document.getElementById("price").textContent = `ab ${card.price}.-`;
            document.getElementById("views").textContent = card.views;
            document.getElementById("rating").textContent = card.rating;
            // Standort setzen
            document.getElementById("location").textContent = card.location; 
            // Beschreibung setzen
            document.getElementById("description").textContent = card.description; 

            // Bilder für die Galerie setzen
            const imageGallery = document.querySelector('.card-container-image-gallery');
            imageGallery.innerHTML = ''; // Vorherige Bilder leeren
            
            const imgCount = card.imgGallery && card.imgGallery.length > 0 ? card.imgGallery.length : 3;
            const imgSrc = card.imgSrc;

            for (let i = 0; i < imgCount; i++) {
                const imgElement = document.createElement('img');
                imgElement.classList.add('img-image-gallery');
                imgElement.src = (card.imgGallery && card.imgGallery[i]) ? card.imgGallery[i] : imgSrc; // Verwende imgSrc, wenn imgGallery leer ist
                imgElement.alt = card.title + ' ' + (i + 1); // Alt-Text setzen
                imageGallery.appendChild(imgElement); // Bild zur Galerie hinzufügen
            }
        } else {
            console.error('Karte nicht gefunden!');
        }
    }

    // Karten-Daten laden, sobald die Seite fertig geladen ist
    loadCardData();
});
