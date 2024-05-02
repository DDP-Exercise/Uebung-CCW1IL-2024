$(document).ready(function () {
    // Laden der Umfrageergebnisse
    $.getJSON('./json/survey_results.json', function (data) {
        let resultsRow = '';
        $.each(data, function (index, result) {
            resultsRow += '<tr>';
            resultsRow += `<td>${result.name}</td>`;
            resultsRow += `<td>${result.languages.join(', ')}</td>`;
            resultsRow += `<td><button class="btn btn-danger" data-index="${index}">Löschen</button>`;
            resultsRow += '</tr>';
        })
        $('#resultsBody').html(resultsRow);
    })

    // Event-Handler für das Löschen von Einträgen
    $(document).on('click', '.deleteBtn', function () {

    });

    // Funktion zum Löschen eines Eintrags
    function deleteResult(index) {

    }
});
