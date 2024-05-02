<?php
// Pfad zur Datei, in der die Ergebnisse gespeichert werden sollen
$file_path = '../json/survey_results.json'; // Pfade relativ zum Verzeichnis dieses Skripts anpassen

// Prüfen, ob POST-Daten vorhanden sind
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Index des zu löschenden Eintrags aus POST-Daten abrufen
    $index = $_POST['index'];

    // Prüfen, ob die Datei vorhanden ist und lesbar ist
    if (file_exists($file_path) && is_readable($file_path)) {
        // Vorhandene Ergebnisse aus der Datei lesen und dekodieren
        $existing_results = json_decode(file_get_contents($file_path), true);

        // Überprüfen, ob der Index im Bereich der Ergebnisse liegt
        if ($index >= 0 && $index < count($existing_results)) {
            // Eintrag aus dem Array entfernen
            array_splice($existing_results, $index, 1);

            // Ergebnisse in die Datei schreiben
            if (file_put_contents($file_path, json_encode($existing_results, JSON_PRETTY_PRINT))) {
                // Antwort zurückgeben
                echo "Entry deleted successfully";
            } else {
                // Fehlermeldung, wenn die Datei nicht aktualisiert werden kann
                http_response_code(500);
                echo "Error: Unable to save results.";
            }
        } else {
            // Fehlermeldung, wenn der Index ungültig ist
            http_response_code(400);
            echo "Error: Invalid index.";
        }
    } else {
        // Fehlermeldung, wenn die Datei nicht geöffnet werden kann
        http_response_code(500);
        echo "Error: Unable to open file.";
    }
} else {
    // Fehlermeldung, wenn nicht alle erforderlichen POST-Daten vorhanden sind
    http_response_code(400);
    echo "Error: Incomplete data received.";
}
?>
