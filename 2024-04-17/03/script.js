// Warte, bis das DOM vollständig geladen ist, bevor JavaScript ausgeführt wird
$(document).ready(function() {
    // AJAX-Anfrage zum Laden der Galerie aus der JSON-Datei
    $.ajax({
         url: 'gallery.json', // Pfad zur JSON-Datei
         dataType: 'json', // Datentyp der erwarteten Antwort
        success: function(data) { // Erfolgsfall: Die Daten wurden erfolgreich geladen
            // Iteriere über jedes Element (Bild) in der JSON-Datenstruktur
            $.each(data, function (index, image) {
                // Erstelle ein neues Bild-Objekt für jedes Bild in der Galerie
                console.info(index, image)
                let imgObj = new ImageObject(image.url, image.description, image.headline, image.text);
                console.info(imgObj)
                // Füge das Bild-Objekt ins HTML ein
                $('#gallery').append(imgObj.toHTML());

            })
        },
        error: function(xhr, status, error) { // Fehlerfall: Die Daten konnten nicht geladen werden
             console.error('Error loading: ', status, error); // Gib eine Fehlermeldung in der Konsole aus
        }
    });
});

// Definition einer Bild-Objektklasse
class ImageObject {
    constructor(url, description, headline, text) { // Konstruktor für ein Bild-Objekt
         this.url = url; // URL des Bildes
         this.description = description; // Beschreibung des Bildes
         this.headline = headline; // Überschrift des Bildes
         this.text = text; // Text des Bildes
    }

    // Methode zum Generieren des HTML-Codes für das Bild
    toHTML() {
        // Rückgabe des HTML-Codes als Zeichenfolge, der das Bild in einer Kartenstruktur darstellt
        return `
            <div class="col mb-4">
                <div class="card h-100">
                  <img src="${this.url}" class="card-img-top" alt="${this.description}">
                  <div class="card-body">
                    <h5 class="card-title">${this.headline}</h5>
                    <p class="card-text">${this.text}</p>
                  </div>
                </div>
              </div>
        `;
    }
}
