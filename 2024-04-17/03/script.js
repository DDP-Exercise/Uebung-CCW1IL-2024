$(document).ready(function() {
    $.ajax({
        url: 'gallery.json',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, image, headline, text) {
                // Erstelle ein neues Bild-Objekt für jedes Bild in der Galerie
                let imgObj = new ImageObject(image.url, image.description, image.headline, image.text);
                // Füge das Bild-Objekt ins HTML ein
                $('#gallery').append(imgObj.toHTML());
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading gallery:', status, error);
        }
    });
});

// Definition einer Bild-Objektklasse
class ImageObject {
    constructor(url, description, headline, text) {
        this.url = url;
        this.description = description;
        this.headline = headline;
        this.text = text;
    }

    // Methode zum Generieren des HTML-Codes für das Bild - muss nicht verändert werden!!
    toHTML() {
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
