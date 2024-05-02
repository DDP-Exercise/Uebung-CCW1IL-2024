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
    // Load checkbox options from JSON file
    $.getJSON('./json/checkbox_data.json', function (data) {
        let checkboxes = '';
        $.each(data, function (key, value) {
            checkboxes += '<div class="form-check">';
            checkboxes += '<input class="form-check-input" type="checkbox" id="' + key + '" name="language" value="' + key + '">';
            checkboxes += '<label class="form-check-label" for="' + key + '">' + value + '</label>';
            checkboxes += '</div>';
        });
        $('#checkboxContainer').html(checkboxes);
    });

    // Event handler for form submission
    $('#surveyForm').submit(function (event) {
        event.preventDefault();
        const name = $('#name').val();
        const languages = $('input[name="language"]:checked').map(function () {
            return $(this).val();
        }).get();
        survey.submit(name, languages);
        saveResults(); // Save results via AJAX
    });


    // AJAX function to save results
    function saveResults() {
        $.ajax({
            url: './php/save_results.php', // Replace with your server-side script URL
            type: 'POST',
            data: { results: JSON.stringify(survey.getAllResults()) },
            success: function () {
                //window.location.href = 'results.html'; // Redirect to results page
                $('#message').html(`<div class="alert alert-success" role="alert">Saved!</div>`)
                $('#surveyForm')[0].reset();
            },
            error: function () {
                $('#message').html(`<div class="alert alert-danger" role="alert">Error saving results!</div>`)
            }
        });
    }
});
