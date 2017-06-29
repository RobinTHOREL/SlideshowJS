/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 2000;
var timeTransitionTitle=3000;
var playDefault = false;
var timerSlide;
var div_rail = $("#rail");
var img_width;
var cpt = 0;

/* Mode pause au hover (+ opacity 0.7 sur l'image pour indiquer le mode pause a l'user)
du slideshow s'il etait en play. La lecture reprend en sortnt du hover */
$("#slideshow").mouseenter(function () {
    if (playDefault) {
        clearInterval(timerSlide);
        $("#slideshow").css('opacity', '0.7');
    }
}).mouseleave(function () {
    if (playDefault) {
        timerSlide = setInterval(nextImage, timeTransition);
        $("#slideshow").css('opacity', '1');
    }
});

/* Changement d'image "next" et arrete la lecture si elle etait en play */
$("#next").click(function () {
    //$("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
    nextImage();
    if (playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        $("#play").prop('class', 'fa fa-play components');
    }

});
/* Changement d'image "previous" et arrete la lecture si elle etait en pause */
$("#previous").click(function () {
    previousImage();
    if (playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        $("#play").prop('class', 'fa fa-play components');
    }
    $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
});

function previousDisable(isDisabled) {

    if (isDisabled) {
        $("#previous").addClass('disabled'); //permet de setter disabled au button prev
        $("#next").addClass('disabled'); //permet de setter disabled au button next

    } else {
        $("#previous").removeClass('disabled'); //permet de unsetter disabled au button prev
        $("#next").removeClass('disabled'); //permet de setter disabled au button next

    }

    //bug disabled pastilles quand on fait une autre action next, prev ou play/pause

} ///rob utile pour next, fixed bug next puis prev rapidement
// , empeche d'avancer vite et sur play/pause


/* Mode play/pause */
$("#play").click(function () {
   // $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
    playPause();

   // $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
});

function nextImage() {

    $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
    if (!$("#next").hasClass('disabled')) {
        previousDisable(true);

    if(cpt==0){

    $("#legend1").addClass('active');

    }
        $(".active").each(function () {
            changeTitleActiveFromMove('next', this.id);
        });

        $('#rail').animate({
            "margin-left": "-" + img_width + "px"
        }, timeTransition, changeFirstImg);

        $(".active").each(function () {
            changePastilleActiveFromMove('next', this.id);
cpt++;
        }
        );
    }
}

 //A voir faire varier ou nn la taille de la police
// $("h1").animate({"margin-left": "-" + img_width  + "px"}, timeTransition);
 //$("h3").animate({"margin-left": "-" + img_width + "px"}, timeTransition)*/


function changeTitleActiveFromMove(move, id) {

   // alert('move : ' + move + ', id : ' + id );
    //$(".active").prop('class', '');
    switch(id){
        case 'legend1':
            if(move == 'next') {
                $("div.animetitle2").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("#legend1").removeClass('active');
                $("#legend2").prop('class', 'animetitle2');
                $(".active").prop('class', 'animetitle2');
                $("#legend2").addClass('active');


            } else if(move == 'previous') {

            }
            break;
        case 'legend2':
            if(move == 'next') {
                $("div.animetitle3").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle4").animate({"margin-left": img_width + "px"}, timeTransition);
                //changeTitleActiveFromMove();
                $("#legend2").removeClass('active');
                $("#legend3").prop('class', 'animetitle3');
                $(".active").prop('class', 'animetitle3');
                $("#legend3").addClass('active');


            } else if(move == 'previous') {

            }
            break;
        case 'legend3':
            if(move == 'next') {
                $("div.animetitle4").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle2").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransition);
               // changeTitleActiveFromMove();
               $("#legend3").removeClass('active');
               $("#legend4").prop('class','animetitle4');
                $(".active").prop('class', 'animetitle4');
               $("#legend4").addClass('active');

            } else if(move == 'previous') {
            }
                break;

        case 'legend4':
            if(move == 'next') {
                $("div.animetitle1").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
               $("#legend4").removeClass('active');
                $("#legend1").prop('class', 'animetitle1');
                $(".active").prop('class', 'animetitle1');
                $("#legend1").addClass('active');


                // changeTitleActiveFromMove();
            } else if(move == 'previous') {

            }
            break;
        default:
            break;
    }
}


function previousImage() {
    // !$("#next").hasClass('disabled')
    if (!$("#previous").hasClass('disabled')) { //permet de test si le status est disabled sur le button prev, si il est pas disable on passe
        previousDisable(true); // le disable
        //previous.prop('disabled', false);
        changeImgPrevious(); // appel maintenant pour charger img avant de se deplacer vers l'arriere , fixed bug marge blanche.
        $(".active").each(function () {
            changePastilleActiveFromMove('previous', this.id);
        });
        $('#rail').animate({
            "margin-left": "0px"
        }, {
            duration: timeTransition,
            complete: function () {
                previousDisable(false)
            }
        }); //sans changeImgPrevious mettre le mouvement la
        //permet de enable le button quand l'anime est terminé
    }
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail div.image:last-child').after($('#rail div.image:first-child'));
    previousDisable(false);
}

function changeImgPrevious() {
    $('#rail').css('margin-left', "-" + img_width + "px");
    $('#rail div.image:last-child').insertBefore($('#rail div.image:first-child'));
    //previous.prop('disabled', false);
    //enlever le mouvement
};

function playPause() {
    $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
    if (playDefault) {
        playDefault = false;
        clearInterval(timerSlide);
        /* console.log("play = false"); */
        //Mettre le bouton en "play"
        $("#play").prop('class', 'fa fa-play components');
       // $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);

    } else {
        playDefault = true;
        timerSlide = setInterval(nextImage, timeTransition);
        /* console.log("play = true"); */
        //Mettre le bouton en "pause"
        $("#play").prop('class', 'fa fa-pause components');
       // $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
    }
}

function changePastilleActive() {
    $(".active").prop('class', 'fa fa-dot-circle-o pastilles active');
}

function changePastilleActiveFromMove(move, id) {
   // alert('move : ' + move + ', id : ' + id);
    switch(id){
        case 'pastilleun':
            if(move == 'next') {
                $("#pastilleun").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilledeux").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastilleun").prop('class', 'fa fa-circle-o pastilles');
                $("#pastillequatre").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastilledeux':
            if(move == 'next') {
                $("#pastilledeux").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilletrois").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastilledeux").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilleun").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastilletrois':
            if(move == 'next') {
                $("#pastilletrois").prop('class', 'fa fa-circle-o pastilles');
                $("#pastillequatre").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastilletrois").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilledeux").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastillequatre':
            if(move == 'next') {
                $("#pastillequatre").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilleun").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastillequatre").prop('class', 'fa fa-circle-o pastilles');
                $("#pastilletrois").addClass('active');
                changePastilleActive();
            }
            break;
        default:
            break;
    }
}

$("a").click(function () {
    $(".active").prop('class', 'fa fa-circle-o pastilles');
    $(this).addClass('active');
    changePastilleActive();
});


/*
    Récupération des données avec AJAX
 */

function getImages() {
    var url = "https://www.skrzypczyk.fr/slideshow.php";
    var i = 0;

    $.getJSON(url,
        function (json) {
            $.each(json, function (key, val) {
                i++;
                $(div_rail).append("<div class='image' id='img" + i + "' style='background-image: url(" + val.url + ");' > " +
                    "<div id='legend" + i + "' class='animetitle" + i + "'> <h1>" + val.title + "</h1><h3>" + val.desc + "</h3></div></div>");

            });
        });
}


$(document).ready(function () {

    // Au chargement initial
    getImages();
    img_width = $(window).width();
    $("#pastilleun").addClass('active');
    changePastilleActive();

  //  $("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);

    console.log("Largeur de la fenetre : " + img_width);
    console.log("Page chargée");

});

$(window).resize(function () {

    //Au redimensionnement de la fenetre 
    img_width = $(window).width();
    $('#rail').css('margin-left', '0px');
    console.log("Fenetre redimensionnée");
    console.log("Largeur de la fenetre : " + img_width);

});