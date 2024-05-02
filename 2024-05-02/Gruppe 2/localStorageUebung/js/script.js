// https://www.mediaevent.de/javascript/DOM-Knoten-suchen.html
// https://wiki.selfhtml.org/wiki/JavaScript/Operatoren/Nullish_Coalescing_Operator


// the questions
function mathTask(level, a, b, c) {
    switch (level) {
        case 1:
            question['result'] = a + b;
            question['question'] = `Was ist das Ergebnis aus ${a} + ${b}`;
            break;
        case 2:

            question['result'] = a - b;
            question['question'] = `Was ist das Ergebnis aus ${a} - ${b}`;
            break;
        case 3:
            question['result'] = a * b;
            question['question'] = `Was ist das Ergebnis aus ${a} * ${b}`;
            break;
        case 4:
            question['result'] = a * b / a;
            question['question'] = `Was ist das Ergebnis aus ${a} * ${b} / ${a}`;
            break;
        case 5:
            question['result'] = a + b * c;
            question['question'] = `Was ist das Ergebnis aus ${a} + ${b} * ${c}`;
            break;
        case 6:
            question['result'] = (a + b) * c;
            question['question'] = `Was ist das Ergebnis aus (${a} + ${b}) * ${a}`;
            break;
        case 7:
            question['result'] = b - c;
            question['question'] = `Was ist das Ergebnis aus ${a} * ${b} / ${a} - ${c}`;
            break;
        case 8:
            question['result'] = a;
            question['question'] = `Was ist die Quadratwurzel von ${a*a}`;
            break;
        case 9:
            question['result'] = b;
            question['question'] = `Was ist der Logarithmus von ${Math. pow(a, b)} zur Basis ${a}`;
            break;
        /* default:
            alert("Leider keine Aufgabe!"); */
    }
    console.log(question['result']);
}

