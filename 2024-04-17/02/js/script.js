// Survey class
class Survey {
    constructor() {
        this.results = [];
    }

    submit(name, languages) {
        this.results.push({ name, languages });
    }

    getAllResults() {
        return this.results;
    }
}

// Instantiate Survey
const survey = new Survey();

$(document).ready(function () {
    // Load checkbox options from JSON File
    $.getJSON('./json/checkbox_data.json', function (data) {
        let checkboxes = '';
        console.info(data);
        $.each(data, function (key, value) {
            checkboxes += '<div class"form-check">';
            checkboxes += '<input class="form-check-input" type="checkbox" id="' + key + '" name="language" value="' + key + '">';
            checkboxes += '<label class="form-check-label" for="' + key + '">' + value + '</label>';
            checkboxes += '</div>';
        })
        //console.info(checkboxes)
        $('#checkboxContainer').html(checkboxes);
    })

    // Event Handler for submission
    $('#surveyForm').submit(function (event) {
        event.preventDefault();
        const name = $('#name').val();
        const languages = $('input[name="language"]:checked').map(function () {
            return $(this).val();
        }).get();
        console.info(languages);
        survey.submit(name, languages);
        saveResults();
    })
    // AJAX function to save results
    function saveResults() {
        $.ajax({
            url: './php/save_results.php',
            type:'POST',
            data: { results: JSON.stringify(survey.getAllResults()) },
            success: function () {
                $('#message').html('<div class="alert alert-success">Saved!</div>');
                $('#surveyForm')[0].reset();
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Error saving!</div>');
            }
        })
    }
});
