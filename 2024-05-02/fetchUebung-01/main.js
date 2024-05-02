function displayAllCatFacts() {
    // Wählen Sie den Container aus, in den die Fakten eingefügt werden sollen (#cats)
    const catsContainer = document.querySelector('#cats');
    // Definieren Sie die URL, von der die Fakten abgerufen werden sollen
    const factsUrl = 'https://cat-fact.herokuapp.com/facts';

    // Rufen Sie die Fakten von der API ab
    fetch(factsUrl)
        .then(response => response.json())
        .then(data => {
            // Iterieren Sie durch jedes Element in der Datenliste
            data.forEach(fact => {
                // Erstellen Sie ein neues <section> -Element
                const newDiv = document.createElement('section');
                // Erstellen Sie ein neues <p> -Element, um den Text des Fakts anzuzeigen
                const factElement = document.createElement('p');
                // Setzen Sie den Text des <p> -Elements auf den Fakt
                factElement.innerText = fact.text;
                // Fügen Sie das <p> -Element dem <section> -Element hinzu
                newDiv.appendChild(factElement);
                // Fügen Sie das <section> -Element dem Container hinzu
                catsContainer.appendChild(newDiv);
            });
        })
        .catch(error => console.error(error));
}

// Rufen Sie die Funktion auf, um die Fakten anzuzeigen
displayAllCatFacts();
