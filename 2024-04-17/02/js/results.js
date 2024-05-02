$(document).ready(function () {
    // Laden der Umfrageergebnisse
    $.getJSON('./json/survey_results.json', function (data) {
        let resultsRows = '';
        $.each(data, function (index, result) {
            resultsRows += '<tr>';
            resultsRows += '<td>' + result.name + '</td>';
            resultsRows += '<td>' + result.languages.join(', ') + '</td>';
            resultsRows += '<td><button class="btn btn-danger btn-sm deleteBtn" data-index="' + index + '">Löschen</button></td>';
            resultsRows += '</tr>';
        });
        $('#resultsBody').html(resultsRows);
    });

    // Event-Handler für das Löschen von Einträgen
    $(document).on('click', '.deleteBtn', function () {
        let index = $(this).data('index');
        let confirmation = confirm('Möchten Sie diesen Eintrag wirklich löschen?');
        if (confirmation) {
            deleteResult(index);
        }
    });

    // Funktion zum Löschen eines Eintrags
    function deleteResult(index) {
        $.ajax({
            url: './php/delete_result.php',
            type: 'POST',
            data: { index: index },
            success: function () {
                // Nach dem Löschen aktualisieren Sie die Tabelle
                location.reload();
            },
            error: function () {
                alert('Fehler beim Löschen des Eintrags.');
            }
        });
    }
});
