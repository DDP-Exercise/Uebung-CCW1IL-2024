<?php
// Prüfen, ob POST-Daten vorhanden sind
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['results'])) {
    // Pfad zur Datei, in der die Ergebnisse gespeichert werden sollen
    $file_path = '../json/survey_results.json';

    // Umfrageergebnisse aus dem POST-Datenfeld 'results' abrufen und dekodieren
    $survey_results = json_decode($_POST['results'], true);
    $olddata = json_decode(file_get_contents($file_path),true);

    // Öffnen oder erstellen Sie die Ergebnisdatei im Schreibmodus
     $file = fopen($file_path, 'w');

    // Überprüfen, ob die Datei erfolgreich geöffnet wurde
    if ($file) {

        // Schreiben Sie die Umfrageergebnisse in die Datei
        $newData = json_encode(array_merge($olddata,$survey_results));
        fwrite($file, $newData);

        // Datei schließen
        fclose($file);

        // Antwort zurückgeben
        echo "Results saved successfully";
    } else {
        // Fehlermeldung, wenn die Datei nicht geöffnet werden kann
        http_response_code(500);
        echo "Error: Unable to open file for writing.";
    }
} else {
    // Fehlermeldung, wenn keine POST-Daten vorhanden sind
    http_response_code(400);
    echo "Error: No data received.";
}
?>
