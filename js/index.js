/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 4000;
var playDefault = true;

$("#next").click(nextImage);

function nextImage() {
    $('#rail').animate({"margin-left":"-300px"}, 2000, changeFirstImg)
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail img:last').after($('#rail img:first'))
}

// play -> hover mettre en pause s'il etait e playy
setInterval(nextImage, 4000);

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
