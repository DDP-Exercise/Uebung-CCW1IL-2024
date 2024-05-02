<?php
// Daten aus dem POST-Request empfangen

$data = file_get_contents('php://input');
/*
 *
Die Zeile $data = file_get_contents('php://input'); dient dazu, die Rohdaten des HTTP-POST-Requests zu lesen. Wenn ein POST-Request an das PHP-Skript gesendet wird, können die Daten im Body dieses Requests gefunden werden. Mit file_get_contents('php://input') greift man auf diesen Body zu und liest die darin enthaltenen Daten.
Im Fall dieses PHP-Skripts wird erwartet, dass die Daten im POST-Body als JSON vorliegen. Das bedeutet, dass der JavaScript-Code (der die AJAX-Anfrage sendet) die Daten als JSON formatiert und im Body der Anfrage übermittelt. Das PHP-Skript liest dann diese Daten aus dem Body und verarbeitet sie weiter.
Es ist wichtig zu beachten, dass php://input ein sogenannter "Stream" in PHP ist, der den Input-Stream des Requests repräsentiert. Diese Methode ist nützlich, wenn POST-Daten nicht über die $_POST-Super-Globalvariable verfügbar sind, beispielsweise wenn der Content-Type nicht application/x-www-form-urlencoded ist oder wenn Datei-Uploads gemacht werden.
*/
// Überprüfen, ob Daten vorhanden sind
if (!empty($data)) {
    // Daten in ein PHP-Array konvertieren
    $contacts = json_decode($data, true);

    if ($contacts !== null) {
        // Pfad zur JSON-Datei
        $file = 'contacts.json';

        // Kontaktdaten in die JSON-Datei schreiben
        file_put_contents($file, json_encode($contacts, JSON_PRETTY_PRINT));

        // Erfolgsmeldung zurückgeben
        echo "Kontakte erfolgreich gespeichert.";
    } else {
        // Fehlermeldung zurückgeben, wenn JSON ungültig ist
        http_response_code(400);
        echo "Ungültige JSON-Daten.";
    }
} else {
    // Fehlermeldung zurückgeben, wenn keine Daten empfangen wurden
    http_response_code(400);
    echo "Keine Daten empfangen.";
}
?>
