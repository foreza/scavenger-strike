

let gameCarouselRef;
let gameStartIndex = 0;
let gameCurrentIndex = 0;


let sampleSet = [
    {
        "type" : 2,
        "questionPrompt" : "What temperature makes bacon crispy?",
        "answer" : 100
    },
    {
        "type" : 3,
        "questionPrompt" : "What is bacon?",
        "answer" : [
            "What",
            "is",
            "bacon"
        ] 
    },    
    {
        "type": 0,
        "questionPrompt": "What makes bacon crispy?",
        "maxCharactersAllowed": 40,
        "answer": "fat"
    },
    {
        "type": 1,
        "questionPrompt": "What is bacon?",
        "possibleOptions": [
            "oil",
            "fat",
            "lard",
            "kfc"
        ],
        "answer": 1
    }
]

$(() => {


    generateQuestionsFromSet(sampleSet);

    // Carousel must not automatically move. We don't want that.
    gameCarouselRef = $('#game-carousel').carousel({
        interval: 0,
        keyboard: false
    })





})


function carouselNavigateStart() {
    gameCarouselRef.carousel(0);
}

function carouselNavigateToNext() {
    gameCarouselRef.carousel('next');
}


// Sample
function validateAnswer() {
    $("input[name='question-0-gameAnswers']").val();
    return true;
}



function generateQuestionsFromSet(questionSet) {

    let questionContainer = $('#question-container');

    for (var i = 0; i < questionSet.length; ++i) {

        switch (questionSet[i].type) {
            case 0:
                questionContainer.append(generateTextInputQuestionDOM(questionSet[i], i))
                $(`#answer-${i}`).click({ answer: questionSet[i].answer, ordinal: i }, validateTextInputAnswer)
                break;
            case 1:
                questionContainer.append(generateMultipleChoiceQuestionDOM(questionSet[i], i))
                break;
            case 2:
                questionContainer.append(generateNumericInputQuestionDOM(questionSet[i], i))
                break;
            case 3:
                questionContainer.append(generateMultipleWordInputQuestionDOM(questionSet[i], i))
            default:
                break;
        }



    }

    $(".carousel-item button").click(() => {
        // if answer is correct
        // do some "sexy" animation then
        carouselNavigateToNext();
    })

}


function generateTextInputQuestionDOM(data, ordinal) {

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="game-page container">
                    <div class="container game-question">
                        <h1>${data.questionPrompt}</h1>
                    </div>
                    <div class="container game-answer">
                        <div class="game-enter-input-single-limit">
                            <input id="input-${ordinal}" class="form-control form-control-lg" minlength=0 maxlength=${data.maxCharactersAllowed} type="text" placeholder="Good luck!">
                        </div>
                    </div>
                    <div class="container verify-answer">
                        <button id="answer-${ordinal}" type="button" class="btn btn-primary btn-lg">Check Answer</button>
                    </div>
                </div>
            </div>`
}

function generateMultipleChoiceQuestionDOM(data, ordinal) {


    let choiceString = "";

    for (var i = 0; i < data.possibleOptions.length; ++i) {
        choiceString += `<label class="form-check-label enhanced-radio-select">
        <input class="form-check-input" type="radio" name="question-${ordinal}-gameAnswers" id="question-${ordinal}-opt${i}" value="${data.possibleOptions[i]}">
        <span class="enhanced-radio-button"></span>
        <span class="radio-answer">${data.possibleOptions[i]}</span>
      </label>`
    }

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="game-page container">
                    
                    <div class="container game-question">
                        <h1>${data.questionPrompt}</h1>
                    </div>

                    <div class="enhanced-radio-select game-answer">

                    <div class="game-multiple-choice">
                        ${choiceString}
                    </div>

                </div>

                    <div class="container verify-answer">
                        <button id="answer-${ordinal}" type="button" class="btn btn-primary btn-lg">Check Answer</button>
                    </div>

                </div>

            </div>
        `
}

function generateNumericInputQuestionDOM(data, ordinal) {

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="game-page container">
                    <div class="container game-question">
                        <h1>${data.questionPrompt}</h1>
                    </div>
                    <div class="container game-answer">
                        <div class="game-enter-input-number">
                            <input id="input-${ordinal}" class="form-control form-control-lg" type="number" placeholder="">
                        </div>
                    </div>
                    <div class="container verify-answer">
                        <button id="answer-${ordinal}" type="button" class="btn btn-primary btn-lg">Check Answer</button>
                    </div>
                </div>
            </div>`
}


function generateMultipleWordInputQuestionDOM(data, ordinal) {

    let optionString = "";

    for (var i = 0; i < data.answer.length; ++i) {
        optionString += 
        `<div class="col-sm-12 col-md-4">
            <input id="input-${ordinal}-pos-${i}" type="text" class="form-control" placeholder="?">
        </div>`
    }

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="game-page container">
                    <div class="container game-question">
                        <h1>${data.questionPrompt}</h1>
                    </div>
                    <div class="container game-answer">
                        <div class="game-enter-input-multiple">
                            <div class="row">
                                ${optionString}
                            </div>
                        </div>
                    </div>
                    <div class="container verify-answer">
                        <button id="answer-${ordinal}" type="button" class="btn btn-primary btn-lg">Check Answer</button>
                    </div>
                </div>
            </div>`
}
 

function validateTextInputAnswer(event) {
    // https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function

    var val = $(`#input-${event.data.ordinal}`).val();
    console.log(`validateTextInputAnswer for ${event.data.answer} for question ${event.data.ordinal} is ${val}`);

    if (event.data.answer == val) {
        alert("success, next");
        carouselNavigateToNext();;
    } else {
        alert("fail, back to beginning");
        carouselNavigateStart();
    }

}


function validateMultipleChoiceAnswer(event) {
    // TODO
}

function validateNumericInputAnswer(event) {
    // TODO   
}




