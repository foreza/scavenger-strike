

let gameCarouselRef;

let gameStartIndex = 0;                                 
let gameCurrentIndex = 0;

$( () => {

    // Carousel must not automatically move. We don't want that.
    gameCarouselRef = $('#game-carousel').carousel({
        interval: 0,
        keyboard: false
      })

})


function carouselNavigateStart() {
    gameCarouselRef.carousel(0);
}

function carouselNavigateToNext(){
    gameCarouselRef.carousel('next');
}




$("#answer-0").click(() => {
    // if answer is correct
    // do some "sexy" animation then
    carouselNavigateToNext();
})


// Sample
function validateAnswer() {
    $("input[name='question-0-gameAnswers']").val();
    return true;
}