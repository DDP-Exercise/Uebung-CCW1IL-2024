// Variable declarations
let counter = 0; // wird jede Runde rauf gezählt
let randomNumber = 0; // wird mit der generierten Zufallszahl überschrieben
let numberOfAttempts = 0; // wird mit der Eingabe vom User wie oft er es maximal versuchen möchte überschrieben
let guessedNumber = 0; // wird mit der Zahl vom User überschrieben

// Get DOM elements
const outputField = document.getElementById('output'); // Das Element für die Info ob es zu hoch oder zu niedrig ist, wird hier gespeichert


// Function to generate a random number and update the display
function generateRandomNumber() {
    // Wert aus dem Input Feld wird ausgelesen und in einen Integer Wert umgewandelt
    randomNumber = parseInt(document.getElementById('maxRandomNumber').value);
    // Es wird eine zufällige Zahl zwischen 0 und dem eingegebenen Wert erstellt und auf eine ganze Zahl gerunden
    randomNumber = Math.round(Math.random() * randomNumber);
    // Der ersten Section wird die Klasse d-none hinzugefügt
    document.getElementById('maxValue').classList.add('d-none');
    // der zweiten Section wird die Klasse d-none entfernt
    document.getElementById('attempts').classList.remove('d-none');
    // die Klasse first auf dem Artikel wird ersetzt mit second um den Hintergrund zu ändern
    document.getElementById('changeMe').classList.replace('first', 'second');
}

// Function to update the number of attempts and change the display
function updateNumberOfAttempts() {
    // Der Wert aus dem Input Feld wird ausgelesen und in einen Integer umgewandelt
    numberOfAttempts = parseInt(document.getElementById('numberOfAttempts').value);
    // Der zweiten Section wird die Klasse d-none hinzugefügt
    document.getElementById('attempts').classList.add('d-none')
    // der dritten Section wird die Klasse d-none entfernt
    document.getElementById('guessNumber').classList.remove('d-none');
    // die Klasse second auf dem Artikel wird ersetzt mit third um den Hintergrund zu ändern
    document.getElementById('changeMe').classList.replace('second', 'third');
}

// Function to guess a number and update the display
function guessNumber() {
    // Das Formular aus der dritten Section wird in eine Konstante gespeichert
    const inputGuessNumForm = document.getElementById('guessNumberForm');
    // Der Wert aus dem Input vom dritten Formular wird ausgelesen und in einen Integer umgewandelt
    guessedNumber = parseInt(inputGuessNumForm.querySelector('input').value);
    // Ein span Element wird erstellt
    const span = document.createElement('span');
    // dem neuen span Element werden drei Klassen zugewiesen
    span.classList.add('d-block', 'm-3', 'p-3');
    // wenn die Zufallszahl kleiner ist als die geratene Zahl
    if(randomNumber < guessedNumber) {
        // dem neuen span Element wird noch eine KLasse hinzugefügt
        span.classList.add('bg-warning');
        // dem neuen span Element wird ein Text hinzugefügt
        span.textContent = `Too height: ${guessedNumber}`;
        // zweite Möglichkeit: span.textContent = 'Too height: ' + guessedNumber;
    } else if(randomNumber > guessedNumber) { // wenn die Zufallszahl größer ist als die geratene Zahl
        // dem neuen span Element wird noch eine KLasse hinzugefügt
        span.classList.add('bg-warning');
        // dem neuen span Element wird ein Text hinzugefügt
        span.textContent = `too low: ${guessedNumber}`;
    } else { // wenn die Nummern gleich sind
        // dem neuen span Element wird noch eine KLasse hinzugefügt
        span.classList.add('bg-success');
        // dem neuen span Element wird ein Text hinzugefügt
        span.textContent = 'Won';
        // Der Button wird deaktiviert
        inputGuessNumForm.querySelector('.btn').disabled = true;
    }
    // Das neu erstellte span Element wird dem Element, das global in der Konstante outputField gespeichert wurde hinzugefügt
    outputField.appendChild(span);
    // der Rundenzähler wird um 1 erhöht
    counter++;
    // Die Funktion, ob man verloren hat, wird aufgerufen
    checkLost();
}

// Function to check if the user has consumed all attempts and update the display accordingly
function checkLost() {
    // wenn due Rundenanzahl gleich der gesetzten Versuche ist
    if(counter === numberOfAttempts) {
        // wird der Button im dritten Formular deaktiviert
        document.querySelector('#guessNumberForm .btn').disabled = true;
        // ein neues span Element wird erstellt
        let span = document.createElement('span');
        // dem neuen span Element werden Klassen hinzugefügt
        span.classList.add('d-block', 'm-3', 'p-3', 'bg-danger');
        // dem neuen span Element wird ein Text zugewiesn
        span.textContent = 'LOST';
        // Das neu erstellte span Element wird dem Element, das global in der Konstante outputField gespeichert wurde hinzugefügt
        outputField.appendChild(span);
    }
}

// Function to prevent the default behavior of the form and call the appropriate function
function submitForm(event) {
     // Prevent default behavior
    // Das Standardverhalten der Form für das Abschicken wird unterbunden
    event.preventDefault();
    // je nachdem welcher Button gedrückt wurde, wird die ID ausgelesen und definiert, welche Funktion aufgerufen wird
    if(event.target.id === 'maxValueForm') {
        // Funktion um eine zufällige Zahl zu generieren
        generateRandomNumber();
    } else if(event.target.id === "attemptsForm") {
        // Funktion um die Anzahl der Versuche zu setzen
        updateNumberOfAttempts();
    } else if(event.target.id === "guessNumberForm") {
        // Funktion um die Zahl zu erraten
        guessNumber();
    } else {
        console.info('You have a syntax error in the id')
    }

    // Switch Case
    /* switch (event.target.id) {
        case 'maxValueForm':
            //
            break;
        case 'attemptsForm':
            //
            break;
        case 'guessNumberForm':
            //
            break;
        default:
            console.log('error');
    }*/
}

// Hinzufügen der EventListener auf die Formulare um bei "abschicken" augelöst zu werden
document.getElementById('maxValueForm').addEventListener('submit', submitForm);
document.getElementById('attemptsForm').addEventListener('submit', submitForm);
document.getElementById('guessNumberForm').addEventListener('submit', submitForm);
// Alternative Schreibweise
/*const buttonList = document.getElementsByTagName('form');
for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].addEventListener('submit', submitForm);
}*/
