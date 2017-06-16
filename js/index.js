/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 2000;
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
    $('#rail').animate({"margin-left":"-65vw"}, 2000, changeFirstImg);
}

function previousImage() {
    $('#rail').animate({"margin-left":"65vw"}, 2000, changeImgPrevious);
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail img:last').after($('#rail img:first'));
}

function changeImgPrevious() {
    $('#rail img:first').before($('#rail img:last'));
    $('#rail').css('margin-left', '0px');
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

function getImages() {
    var url = "https://www.skrzypczyk.fr/slideshow.php";
    $.getJSON(url, {
        format: "json"
    }).done((data) => { $.each(data, (key, item) => {
        //$("<div>").attr({"id": key, "alt": item.desc, "data-title": item.title}).appendTo("#rail");
        //resize(key);
        $("<img>").attr({"id": key,"src": item.url, "alt": item.desc, "data-title": item.title, "class": "image"}).appendTo("#rail");
        })
    resize();
    })
}

function resize(){

        $('img.image').each(function() {
        var maxWidth = 1300; // Max width for the image
        var maxHeight = 900;    // Max height for the image
      //  var ratio = 0;  // Used for aspect ratio
        var width = $(this).width();    // Current image width
        var height = $(this).height();  // Current image height

        // Check if the current width is larger than the max
        //if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            $(this).css("width", maxWidth); // Set new width
           // $(this).css("height", height * ratio);  // Scale height based on ratio
           // height = height * ratio;    // Reset height to match scaled image
            //width = width * ratio;    // Reset width to match scaled image
       // }

        // Check if current height is larger than max
        //if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            $(this).css("height", maxHeight);   // Set new height
           // $(this).css("width", width * ratio);    // Scale width based on ratio
           // width = width * ratio;    // Reset width to match scaled image
           // height = height * ratio;    // Reset height to match scaled image
       // }
    });
}

$(document).ready(function(){

    // Au chargement initial


    // En cas de redimensionnement de la fenêtre
    $(window).resize(function(){
        resize();
    });

});