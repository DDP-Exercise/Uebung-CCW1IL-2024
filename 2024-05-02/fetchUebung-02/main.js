const API_KEY = "59cdfcc9";

// Eine Template-Literal-Funktion, um die HTML-Ausgabe für einen Film zu generieren
const generateMovieHtml = movie => `
  <section class="col">
    <div class="card">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <div class="card-text">
                <p>${movie.Year}<br>
                ${movie.Type}</p>
            </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-dark btn-sm details-link" data-imdb-id="${movie.imdbID}">weitere Details</a>
        </div>
    </div>
  </section>
  `;

// Funktion zum Anzeigen von Filmen auf der Seite
function displayMovies(movies) {
    // Initialisiere eine leere Zeichenfolge für die HTML-Ausgabe
    let movieHtml = '';

    // Iteriere durch jedes Element im Array "movies"
    movies.forEach(movie => {
        // Füge das HTML für den aktuellen Film zur movieHtml-Zeichenfolge hinzu
        movieHtml += generateMovieHtml(movie);
    });

    // Setze den HTML-Inhalt des Elements mit der ID "movies" auf die generierte movieHtml-Zeichenfolge
    document.getElementById('movies').innerHTML = movieHtml;
}


// Funktion zum Anzeigen der Seitennavigation
function displayPagination(page, totalPages, searchTerm) {
    document.querySelector('.pagination').innerHTML = `
    <li class="page-item"><a class="page-link" onclick="getMovies('${searchTerm}', ${page - 1 || 1})">Previous</a></li>
    <li class="page-item"><a class="page-link" aria-disabled="true">Total: ${totalPages}</a></li>
    <li class="page-item"><a class="page-link"  onclick="getMovies('${searchTerm}', ${page + 1})">Next</a></li>
  `;
}

// Event-Listener für die Suchanfrage
document.getElementById('search-form').addEventListener('submit', event => {
    // Verhindern Sie das Standardverhalten des Submit-Events
    event.preventDefault();
    // Holen Sie den Suchbegriff aus dem Suchfeld
    const searchTerm = document.getElementById('search').value;
    // Rufen Sie die Funktion auf, um die Filmliste abzurufen
    getMovies(searchTerm, 1);
});

// Funktion zum Abrufen der Filmliste von der API
function getMovies(searchTerm, page) {
    // URL zur Abfrage der Filmliste mit dem Suchbegriff und der Seitennummer
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;

    // Fetch-Anfrage, um die Filmdaten von der API abzurufen
    fetch(url)
        .then(response => response.json())
        .then(({Search: movies = [], totalResults = 0}) => {
            // Berechnen der Gesamtzahl der Seiten und Aufruf von Funktionen zur Anzeige von Filmen und Seitennavigation
            const totalPages = Math.ceil(totalResults / 10);
            displayMovies(movies); // Funktion zum Anzeigen von Filmen aufrufen
            displayPagination(page, totalPages, searchTerm); // Funktion zum Anzeigen der Seitennavigation aufrufen
        })
        .catch(error => console.error(error));
}

// Event-Listener für Details-Links
document.getElementById('movies').addEventListener('click', event => {
    // Überprüfen, ob der Klick auf einen Details-Link war
    if (event.target.matches('.details-link')) {
        // Verhindert das Standardverhalten des Links, um die Seite nicht neu zu laden
        event.preventDefault();
        // Abrufen der imdbID aus dem data-imdb-id-Attribut des angeklickten Elements
        const imdbID = event.target.getAttribute('data-imdb-id');
        // Aufrufen der Funktion getMovieDetails mit der erhaltenen imdbID als Parameter
        getMovieDetails(imdbID);
    }
});

function getMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.table(data)
            const modalContainer = `
                <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.Title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="row row-cols-2 g-4">
                            <img src="${data.Poster}" class="img-fluid mb-3">
                            <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">#</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Jahr</td>
                                  <td>${data.Year}</td>
                                </tr>
                                <tr>
                                  <td>Writer</td>
                                  <td>${data.Writer}</td>
                                </tr>
                                <tr>
                                  <td>Länge</td>
                                  <td>${data.Runtime}</td>
                                </tr>
                                <tr>
                                  <td>Actors</td>
                                  <td>${data.Actors}</td>
                                </tr>
                                <tr>
                                  <td>Awards</td>
                                  <td>${data.Awards}</td>
                                </tr>
                                <tr>
                                  <td>BoxOffice</td>
                                  <td>${data.BoxOffice}</td>
                                </tr>
                                <tr>
                                  <td>Director</td>
                                  <td>${data.Director}</td>
                                </tr>
                                
                                  <td>Genre</td>
                                  <td>${data.Genre}</td>
                                </tr>
                                <tr>
                                  <td>Production</td>
                                  <td>${data.Production}</td>
                                </tr>
                                <tr>
                                  <td>Rated</td>
                                  <td>${data.Rated}</td>
                                </tr>
                              </tbody>
                            </table>
                                <ul>
                                  ${data.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <p>${data.Plot}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>`;

            // Erstellen Sie ein DOM-Element aus dem Modal-HTML
            const modalElement = document.createRange().createContextualFragment(modalContainer);
            // Fügen Sie das Modal-Element zum Body hinzu
            document.body.appendChild(modalElement);
            // Holen Sie das Modal-Element
            const modal = document.getElementById('movieModal');
            // Zeigen Sie das Modal an
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            // Hinzufügen eines Event-Listeners, um das Modal zu leeren, wenn es geschlossen wird
            modal.addEventListener('hidden.bs.modal', () => {
                modal.remove();
            });
        })
        .catch(error => console.error(error));
}

