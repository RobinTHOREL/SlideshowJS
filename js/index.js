/**
 * Created by Kush on 13/04/2017.
 */

var timeTransition = 2000;
var timeTransitionTitle = 3000;
var playDefault = false;
var timerSlide;
var div_rail = $("#rail");
var img_width;
var cpt = 0;
var nbimg=0;

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
    //$("#legend").animate({"margin-left": "-"+ img_width/10000 +"px"}, timeTransition);
});

function previousDisable(isDisabled) {

    if (isDisabled) {
        $("#previous").addClass('disabled'); //permet de setter disabled au button prev
        $("#next").addClass('disabled'); //permet de setter disabled au button next
        $("#pastille1").addClass('disabled');
        $("#pastille2").addClass('disabled');
        $("#pastille3").addClass('disabled');
        $("#pastille4").addClass('disabled');




    } else {
        $("#previous").removeClass('disabled'); //permet de unsetter disabled au button prev
        $("#next").removeClass('disabled'); //permet de setter disabled au button next
        $("#pastille1").removeClass('disabled');
        $("#pastille2").removeClass('disabled');
        $("#pastille3").removeClass('disabled');
        $("#pastille4").removeClass('disabled');

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

    $("#legend1").addClass('activeTitle');

    }
        $(".activeTitle").each(function () {

            changeTitleActiveFromMove('next', this.id);
        });

        $(".active").each(function () {

        changePastilleActiveFromMove('next', this.id);

        });

        $('#rail').animate({
            "margin-left": "-" + img_width + "px"
        }, timeTransition, changeFirstImg);

    }
    cpt++;
}

function previousImage() {

    // !$("#next").hasClass('disabled')
    if (!$("#previous").hasClass('disabled')) { //permet de test si le status est disabled sur le button prev, si il est pas disable on passe
        previousDisable(true); // le disable
        //previous.prop('disabled', false);
        changeImgPrevious(); // appel maintenant pour charger img avant de se deplacer vers l'arriere , fixed bug marge blanche.
        $('#rail').animate({
            "margin-left": "0px"
        }, {
            duration: timeTransition,
            complete: function () {
                previousDisable(false)
            }
        }); //sans changeImgPrevious mettre le mouvement la
        //permet de enable le button quand l'anime est terminé
        if(cpt==0){

            $("#legend1").addClass('activeTitle');

        }
        $(".activeTitle").each(function () {
            changeTitleActiveFromMove('previous', this.id);
        });

        $(".active").each(function () {
            changePastilleActiveFromMove('previous', this.id);
        });

    }
    cpt++;

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
    //alert('move : ' + move + ', id : ' + id);
    switch(id){
        case 'pastille1':
            if(move == 'next') {
                $("#pastille1").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille2").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastille1").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille4").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastille2':
            if(move == 'next') {
                $("#pastille2").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille3").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastille2").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille1").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastille3':
            if(move == 'next') {
                $("#pastille3").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille4").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastille3").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille2").addClass('active');
                changePastilleActive();
            }
            break;
        case 'pastille4':
            if(move == 'next') {
                $("#pastille4").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille1").addClass('active');
                changePastilleActive();
            } else if(move == 'previous') { 
                $("#pastille4").prop('class', 'fa fa-circle-o pastilles');
                $("#pastille3").addClass('active');
                changePastilleActive();
            }
            break;
        default:
            break;
    }
}

function changeTitleActiveFromMove(move, id) {

   // alert('move : ' + move + ', id : ' + id );

    //$(".active").prop('class', '');
    switch(id){
        case 'legend1':
            if(move == 'next') {
                $("h1.Title1").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc1").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle1").animate({"margin-left":  (img_width - ($("#legend1").width())) + "px"}, timeTransitionTitle);
                $("h1.Title2").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc2").animate({fontSize: '2em'}, timeTransitionTitle);
                $("div.animetitle2").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("#legend1").removeClass('activeTitle');
                $("#legend2").prop('class', 'animetitle2');
                $(".activeTitle").prop('class', 'animetitle2');
                $("#legend2").addClass('activeTitle');


                //changePastilleActive()
                //alert('Size : '+ $("#legend1").width());
                //changePastilleActive();

            } else if(move == 'previous') {

                $("h1.Title1").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc1").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle1").animate({"margin-left":  (img_width - ($("#legend1").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle4").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                $("h1.Title4").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc4").animate({fontSize: '2em'}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("#legend1").removeClass('activeTitle');
                $("#legend4").prop('class', 'animetitle4');
                $(".activeTitle").prop('class', 'animetitle4');
                $("#legend4").addClass('activeTitle');

            }
            break;
        case 'legend2':
            if(move == 'next') {
                $("h1.Title2").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc2").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle2").animate({"margin-left":  (img_width - ($("#legend2").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle3").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                $("h1.Title3").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc3").animate({fontSize: '2em'}, timeTransitionTitle);
                //$("div.animtitle4").animate({"margin-left": img_width + "px"}, timeTransition);
                //changeTitleActiveFromMove();
                $("#legend2").removeClass('activeTitle');
                $("#legend3").prop('class', 'animetitle3');
                $(".activeTitle").prop('class', 'animetitle3');
                $("#legend3").addClass('activeTitle');


            } else if(move == 'previous') {

                $("h1.Title2").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc2").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle2").animate({"margin-left":  (img_width - ($("#legend2").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle1").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("h1.Title1").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc1").animate({fontSize: '2em'}, timeTransitionTitle);
                $("#legend2").removeClass('activeTitle');
                $("#legend1").prop('class', 'animetitle1');
                $(".activeTitle").prop('class', 'animetitle1');
                $("#legend1").addClass('activeTitle');


            }
            break;
        case 'legend3':
            if(move == 'next') {

                $("h1.Title3").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc3").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle3").animate({"margin-left":  (img_width - ($("#legend3").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle4").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle2").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransition);
                // changeTitleActiveFromMove();
                $("h1.Title4").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc4").animate({fontSize: '2em'}, timeTransitionTitle);
                $("#legend3").removeClass('activeTitle');
                $("#legend4").prop('class','animetitle4');
                $(".activeTitle").prop('class', 'animetitle4');
                $("#legend4").addClass('activeTitle');

            } else if(move == 'previous') {

                $("h1.Title3").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc3").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle3").animate({"margin-left":  (img_width - ($("#legend3").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle2").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                $("h1.Title2").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc2").animate({fontSize: '2em'}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("#legend3").removeClass('activeTitle');
                $("#legend2").prop('class', 'animetitle2');
                $(".activeTitle").prop('class', 'animetitle2');
                $("#legend2").addClass('activeTitle');

            }
            break;

        case 'legend4':
            if(move == 'next') {
                $("h1.Title4").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc4").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle4").animate({"margin-left":  (img_width - ($("#legend4").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle1").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                $("h1.Title1").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc1").animate({fontSize: '2em'}, timeTransitionTitle);
                $("#legend4").removeClass('activeTitle');
                $("#legend1").prop('class', 'animetitle1');
                $(".activeTitle").prop('class', 'animetitle1');
                $("#legend1").addClass('activeTitle');


                // changeTitleActiveFromMove();
            } else if(move == 'previous') {

                $("h1.Title4").animate({fontSize: '2.5em'}, timeTransitionTitle);
                $("h3.Desc4").animate({fontSize: '1.5em'}, timeTransitionTitle);
                $("div.animetitle4").animate({"margin-left":  (img_width - ($("#legend4").width())) + "px"}, timeTransitionTitle);
                $("div.animetitle3").animate({"margin-left": "-" + img_width / 10000 + "px"}, timeTransitionTitle);
                //$("div.animtitle3").animate({"margin-left": img_width + "px"}, timeTransition);
                $("h1.Title3").animate({fontSize: '3.5em'}, timeTransitionTitle);
                $("h3.Desc3").animate({fontSize: '2em'}, timeTransitionTitle);
                $("#legend4").removeClass('activeTitle');
                $("#legend3").prop('class', 'animetitle3');
                $(".activeTitle").prop('class', 'animetitle3');
                $("#legend3").addClass('activeTitle');
            }
            break;
        default:
            break;
    }
}


$("a").click(function () {
//(!$("#pastilleun").hasClass('disabled') && $("#pastilledeux").hasClass('disabled') && $("#pastilletrois").hasClass('disabled'))||(!$("#pastilleun").hasClass('disabled') && $("#pastilledeux").hasClass('disabled') && $("#pastillequatre").hasClass('disabled')) ||(!$("#pastilledeux").hasClass('disabled') && $("#pastilletrois").hasClass('disabled') && $("#pastillequatre").hasClass('disabled'))||(!$("#pastilleun").hasClass('disabled') && $("#pastilletrois").hasClass('disabled') && $("#pastillequatre").hasClass('disabled'))
    if(!$("#pastille1").hasClass('disabled') && $("#pastille2").hasClass('disabled') && $("#pastille3").hasClass('disabled') && $("#pastille4").hasClass('disabled')) {
        previousDisable(true);
        $(".active").prop('class', 'fa fa-circle-o pastilles');
        $(this).addClass('active');
        changePastilleActive();
    }
});
/*x
    Récupération des données avec AJAX
 */

function getImages() {
    var url = "https://www.skrzypczyk.fr/slideshow.php";
    var i = 0;

    $.getJSON(url,
        function (json) {
            $.each(json, function (key, val) {
                i++;
                nbimg++;
                $(div_rail).append("<div class='image' id='img" + i + "' data-id='" + i + "' style='background-image: url(" + val.url + ");' > " +
                    "<div id='legend" + i + "' class='animetitle" + i + "' data-id='" + i + "' ><h1 class='Title" + i + "'>" + val.title + "</h1><h3 class='Desc" + i + "'>" + val.desc + "</h3></div></div>");

                $("#container").append("<a class='fa fa-circle-o pastilles' id='pastille" + i + "' onclick='getSlide(" + i + ")' aria-hidden='true'></a>");

            });
           // console.log($("div.image").get());
            $("#pastille1").addClass('active');
            changePastilleActive();
            $("#img1").attr('selected','selected');
        });
}
// Uniquement avec des next

function getSlide(destination) { 

    // alert($("a").data('id')); 
    // alert(nbimg); 
    // destination = $("a").data('id'); 
     var source = $('.image:first').attr('data-id');
    //alert(destination);
    //alert(source); 
   // alert(destination - source);
     if(destination - source > 0) 
    { 
        var count = destination - source; 
        while(count>0) 
        { 
         nextImage(); 
        previousDisable(false);  
        count--; 
        } 
    } 
    else if(destination - source < 0) 
    { 
       var countneg = Math.abs(destination - source);
      // alert(countneg);
     if (countneg==1){
            countneg+=2;
        }
      else if ( countneg>2 && countneg<4 ){
           countneg+=-2;
       }
       //alert(countneg);
       // alert(countneg);
        while(countneg>0 ) 
        { 
            nextImage(); 
            previousDisable(false); 
            countneg--;
        }
    } 
}
     
    //Bug d'affichage avec le previous. 
/*
function getSlide(destination)
{
    //alert(destination);
    // alert($("a").data('id'));

    //destination = $("a").data('id');
    var source = $('.image:first').attr('data-id');//$("#img1").attr('data-id'); //$('.imageImport:first')
    //alert(source);
    if(destination - source > 0)
    {
        var count = destination - source;
        //var CurrentSlide = count;
        while(count>0)
        {
            nextImage();
            previousDisable(false);
            count--;
        }
    }
    else if(destination - source < 0)
    {
        var count = destination - source;
        while(count<0)
        {
            previousImage();
            previousDisable(false);
           // alert("A");
            count++;

        }
    }
}*/


$(document).ready(function () {

    // Au chargement initial
    getImages();
    img_width = $(window).width();
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


