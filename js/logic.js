

let gameCarouselRef;
let gameStartIndex = 0;
let gameCurrentIndex = 0;


// let sampleSet = [
//     {
//         "type" : 3,
//         "questionPrompt" : "What is bacon?",
//         "answer" : [
//             "What",
//             "is",
//             "bacon"
//         ] 
//     }, 
//     {
//         "type": 1,
//         "questionPrompt": "What is bacon?",
//         "possibleOptions": [
//             "oil",
//             "fat",
//             "lard",
//             "kfc"
//         ],
//         "answer": "oil"
//     },
//     {
//         "type" : 2,
//         "questionPrompt" : "What temperature makes bacon crispy?",
//         "answer" : 100
//     },
   
//     {
//         "type": 0,
//         "questionPrompt": "What makes bacon crispy?",
//         "maxCharactersAllowed": 40,
//         "answer": "fat"
//     },

// ]

let sampleSet = [
]

let prizeData = {
    "wurl" : "https://www.youtube.com/watch?v=oHg5SJYRHA0"
};

$(() => {


    generateQuestionsFromSet(sampleSet);
    generatePrizeDOM(prizeData);

    // Carousel must not automatically move. We don't want that.
    gameCarouselRef = $('#game-carousel').carousel({
        interval: 0,
        keyboard: false
    })

    $("#start-game").click(() => carouselNavigateToNext());

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
                $(`#answer-${i}`).click({ answer: questionSet[i].answer, ordinal: i }, validateMultipleChoiceAnswer)
                break;
            case 2:
                questionContainer.append(generateNumericInputQuestionDOM(questionSet[i], i))
                $(`#answer-${i}`).click({ answer: questionSet[i].answer, ordinal: i }, validateNumericInputAnswer)
                break;
            case 3:
                questionContainer.append(generateMultipleWordInputQuestionDOM(questionSet[i], i))
                $(`#answer-${i}`).click({ answer: questionSet[i].answer, ordinal: i }, validateMultipleWordAnswer)
            default:
                break;
        }



    }

}


function generatePrizeDOM(data) {

    const prizeDisplay = `
        <div id="game-win" class="carousel-item">
            <div class="page win-page container">
                <div class="container game-question">
                    <h1>You made it all the way to the end! Incredible!</h1>
                </div>
                <div class="container verify-answer">
                    <button id="finish-game" type="button"  data-toggle="modal" data-target="#game-win-modal" class="btn btn-primary btn-lg">See my prize!</button>
                </div>
            </div>
        </div>
        

        <div class="modal fade" id="game-win-modal" tabindex="-1" role="dialog" aria-labelledby="game-win" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title" id="game-win">Congrats!!</h1>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5>Here's a special prize just for you. Thanks for playing!</h5>
              <a class="prize-link" target="_blank" href="${data.wurl}">Click here</a>
            </div>
          </div>
        </div>
      </div>
        
        `

    $('#question-container').append(prizeDisplay)
}


function generateTextInputQuestionDOM(data, ordinal) {

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="page game-page container">
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
        <input class="form-check-input" type="radio" name="question-${ordinal}-gameAnswers" 
        id="question-${ordinal}-opt${i}" value="${data.possibleOptions[i]}">
        <span class="enhanced-radio-button"></span>
        <span class="radio-answer">${data.possibleOptions[i]}</span>
      </label>`
    }

    return `<div id="question-${ordinal}" class="carousel-item">
                <div class="page game-page container">
                    
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
                <div class="page game-page container">
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
                <div class="page game-page container">
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

    const val = $(`#input-${event.data.ordinal}`).val().toLowerCase();
    const answer = event.data.answer.toLowerCase();
    console.log(`validateTextInputAnswer for ${answer} for question ${event.data.ordinal} is ${val}`);

    if (answer === val) {
        carouselNavigateToNext();;
    } else {
        $('#wrong-answer-modal').modal('show')
        carouselNavigateStart();
    }

}


function validateMultipleChoiceAnswer(event) {
    const val = $(`input[name='question-${event.data.ordinal}-gameAnswers']:checked`).val();
    console.log(`validateMultipleChoiceAnswer for ${event.data.answer} for question ${event.data.ordinal} is ${val}`);

    if (event.data.answer === val) {
        carouselNavigateToNext();;
    } else {
        $('#wrong-answer-modal').modal('show')
        carouselNavigateStart();
    }

}

function validateNumericInputAnswer(event) {
    const val = parseInt($(`#input-${event.data.ordinal}`).val());
    console.log(`validateNumericInputAnswer for ${event.data.answer} for question ${event.data.ordinal} is ${val}`);

    if (event.data.answer === val) {
        carouselNavigateToNext();;
    } else {
        $('#wrong-answer-modal').modal('show')
        carouselNavigateStart();
    }
}


function validateMultipleWordAnswer(event) {
    let valArr = [];
    $(`[id^=input-${event.data.ordinal}-pos]`).map((index, value) => { valArr.push(value.value.toLowerCase())})
    let answerArr = [];
    event.data.answer.map((index, value) => { answerArr.push(index.toLowerCase())});
    console.log(`validateMultipleWordAnswer for ${answerArr} for question ${event.data.ordinal} is ${valArr}`);

    if (util_arraysEqual(valArr, answerArr)) {
        carouselNavigateToNext();;
    } else {
        $('#wrong-answer-modal').modal('show')
        carouselNavigateStart();
    }

}



function util_arraysEqual(a, b) {

    https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    a.sort();
    b.sort();
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }




