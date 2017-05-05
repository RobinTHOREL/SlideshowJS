/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 4000;
var playDefault = false;
var timerSlide;

/* Mode pause au hover (+ opacity 0.7 sur l'image pour indiquer le mode pause a l'user)
du slideshow s'il etait en play. La lecture reprend en sortnt du hover */
$("#slideshow").mouseenter(function () {
    if(playDefault) {
        clearInterval(timerSlide);
        $("#slideshow").css('opacity', '0.7');
    }
}).mouseleave(function () {
    if(playDefault){
        timerSlide = setInterval(nextImage, timeTransition);
        $("#slideshow").css('opacity', '1');
    }
});

/* Changement d'image "next" et arrete la lecture si elle etait en play */
$("#next").click(function () {
    nextImage();
    if(playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        $("#play").prop('class', 'fa fa-play components');
    }
});

/* Changement d'image "previous" et arrete la lecture si elle etait en pause */
$("#previous").click(function () {
    previousImage();
    if(playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        $("#play").prop('class', 'fa fa-play components');
    }
});

/* Mode play/pause */
$("#play").click(function () {
    playPause();
});

function nextImage() {
    $('#rail').animate({"margin-left":"-300px"}, 2000, changeFirstImg);
}

function previousImage() {
    $('#rail').animate({"margin-left":"300px"}, 2000, changeImgPrevious);
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail img:last').after($('#rail img:first'))
}

function changeImgPrevious() {
    $('#rail').css('margin-left', '0px');
    $('#rail img:first').before($('#rail img:last'))
}

function playPause() {
    if(playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        /* console.log("play = false"); */
        //Mettre le bouton en "play"
        $("#play").prop('class', 'fa fa-play components');
    }
    else {
        playDefault = true;
        timerSlide = setInterval(nextImage, timeTransition);
        /* console.log("play = true"); */
        //Mettre le bouton en "pause"
        $("#play").prop('class', 'fa fa-pause components');
    }
}

/*
    Récupération des données avec AJAX
 */

$("#more_com").click(function(){

    $.ajax({
        url : 'https://www.skrzypczyk.fr/slideshow.php',
        type : 'GET',
        dataType : 'json', // On désire recevoir du JSON
        success : function(code_json, statut){ // code_html contient le HTML renvoyé
        }
    });

});
