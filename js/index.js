/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 2000;
var playDefault = false;
var timerSlide;
var div_rail = $("#rail");
var img_width;

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
    $('#rail').animate({"margin-left":"-" + img_width + "px"}, 2000, changeFirstImg);
}

function previousImage() {
    $('#rail').animate({"margin-left":"" + img_width + "px"}, 2000, changeImgPrevious);
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail div.image:last').after($('#rail div.image:first'))
}

function changeImgPrevious() {
    /*$('#rail').css('margin-left', '0px');
    $('#rail div.image:first').before($('#rail div.image:last'))*/
    
    $('#rail div.image:last').insertBefore($('#rail div.image:first'));
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
    var i = 0;

    $.getJSON(url,
        function(json){
             $.each( json, function( key, val ) {
                 i++;
                 $(div_rail).append("<div class='image' id='img" + i +"' style='background-image: url(" + val.url + ");' > " +
                     "<div id='legend'> <h1>" + val.title + "</h1><h3>"+ val.desc +"</h3></div></div>");
        });
    });

}

$(document).ready(function(){

    // Au chargement initial
    getImages();
    img_width = $(window).width(); 
    console.log("Largeur de la fenetre : " + img_width);
    console.log("Page chargée");

});

$( window ).resize(function() {
  
    //Au redimensionnement de la fenetre 
    img_width = $(window).width(); 
    console.log("Fenetre redimensionnée");
    console.log("Largeur de la fenetre : " + img_width);
    
});