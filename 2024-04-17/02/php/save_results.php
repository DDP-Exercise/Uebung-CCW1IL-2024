<?php
// Prüfen, ob POST-Daten vorhanden sind
var_dump($_POST);
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['results'])) {
    // Pfad zur Datei, in der die Ergebnisse gespeichert werden sollen
    $file_path = '../json/survey_results.json';

    // Ergebnisse aus Post results abrufen und dekodieren
    $survey_results = json_decode($_POST['results'], true);
    //$oldData = json_decode(file_get_contents($file_path));
    $oldData = json_decode(file_get_contents($file_path));

    // Öffnen bzw. erstellen die Ergebnisdatei im Schreibmodus
    $file = fopen($file_path, 'w');

    // Überprüfen ob Datei geöffnet wurde
    if($file) {
        // Ergebnisse in die Datei schreiben
        $newData = json_encode(array_merge($oldData, $survey_results));
        fwrite($file, $newData);
        fclose($file);
    } else {
        echo "Unable to open file for writing";
    }
} else {
    // Fehlermeldung, wenn keine POST-Daten vorhanden sind
    echo "Error: no data received.";
}
?>
