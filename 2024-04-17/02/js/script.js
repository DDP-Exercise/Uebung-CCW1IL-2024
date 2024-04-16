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


    // AJAX function to save results
    function saveResults() {

    }
});
