$(function() {

  // Submit hit one or two times?
  var submitNumber = 0

  // Global variants
  var bikeCommuteCo2 = 0
  var scooterCommuteCo2 = 0
  var trainCommuteCo2 = 0
  var evCommuteCo2 = 0
  var busCommuteCo2 = 0
  var carCommuteCo2 = 0

  // Coefficients
  var koalaCoefficient = 260/12
  var basketballCoefficient = 0.5/0.00747
  var treeCoefficient = 260/21
  var pufferCoefficient = 0.5/0.002
  var tramCoefficient = (260*0.5)/10
  var burgerCoefficient = 22/0.12
  var sushiCoefficient = 1/0.027

  var coefficients = [basketballCoefficient, burgerCoefficient, treeCoefficient, koalaCoefficient, tramCoefficient, sushiCoefficient, pufferCoefficient];
  var emojicoefficients = ["🏀", "🍔", "🌲", "🐨", "🚡", "🍣", "🐡"];

  function slideFadeIn() {
    setTimeout(function() {
      $('.active').fadeIn();
    }, 500);
  }


  // SUBMIT FUNCTION___________________________________________________________
  $('#user-form').submit(function() {

    if (submitNumber == 0) {
      $('.landing-page-wrapper, footer').animate({
          'opacity' : '0',
        }, 500);
      $('.landing-page-wrapper').slideUp();
      $('.top-wrapper').css('overflow', 'hidden');

      if ($('body').width() < 1001 ) {
        $('.navbar, .kiwi-logo').animate({
            'opacity' : '0',
          }, 500);
      }

      setTimeout(function() {
        if ($('body').width() < 1001 ) {
          $('.top-wrapper').animate({
              'height' : '140px',
            }, 500);
          $('.top-wrapper').css('position', 'relative');
        } else {
          $('.top-wrapper').animate({
              'height' : '100px',
            }, 500)
        }
      }, 500);

      $('.top-wrapper').css('box-shadow', '0px 0px 4px rgba(0,0,0,0.12), 0px 4px 6px rgba(0,0,0,0.2)');
      $('.distance-input').blur();


    }

    submitNumber = 1
    $('.active').fadeOut();
    $('.distance-input').blur();
    setTimeout(function() {
      $('html, body').animate({'scrollTop':0}, 500)
    }, 500);
    $('.contents-all-wrapper').show();

    // Declare distance and metric variables
    var distance = $('#distance-input').val();
    var metric = $('#distance-unit').val();
    // Convert miles to km
    if (metric == 'miles') {
      distance = distance*1.609;
    }
    // Convert to daily
    distance = distance*2;
    // Define daily transport variables (weight in kg)
    bikeCommuteCo2 = distance*0.016
    scooterCommuteCo2 = distance*0.018
    trainCommuteCo2 = distance*0.04
    evCommuteCo2 = distance*0.065
    busCommuteCo2 = distance*0.1
    carCommuteCo2 = distance*0.18


    // New submit fadeIn
    setTimeout(function() {
      var coefficientIndex = $('.content-wrapper').index($('.active'));
      var workingCoefficient = coefficients[coefficientIndex];
      var emoji = emojicoefficients[coefficientIndex];
      $('.active').fadeIn("slow");
      $('.numbike').text("0");
      $('.numscooter').text(Math.ceil(workingCoefficient*scooterCommuteCo2));
      $('.numtrain').text(Math.ceil(workingCoefficient*trainCommuteCo2));
      $('.numev').text(Math.ceil(workingCoefficient*evCommuteCo2));
      $('.numbus').text(Math.ceil(workingCoefficient*busCommuteCo2));
      $('.numcar').text(Math.ceil(workingCoefficient*carCommuteCo2));
      $('.bike-emoji').text(emoji).css("opacity", "0.2")
      $('.scooter-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*scooterCommuteCo2))));
      $('.train-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*trainCommuteCo2))));
      $('.ev-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*evCommuteCo2))));
      $('.bus-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*busCommuteCo2))));
      $('.car-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*carCommuteCo2))));
    }, 1000);




    return false;
    // For converting to whole var = Math.round(var);
  })
  // _____________________________________________________________________


  // CHANGE THE VISIBLE SLIDE_______________________________________________
  $('.arrow').click(function() {
    var slideIndex = $('.content-wrapper').index($('.active'));
    var displaySlide = $('.active');

    // Change all coeffcicients!!____________
    function changeCoefficients() {
      setTimeout(function() {
        var coefficientIndex = $('.content-wrapper').index($('.active'));
        var workingCoefficient = coefficients[coefficientIndex];
        var emoji = emojicoefficients[coefficientIndex];
        $('.numbike').text("0");
        $('.numscooter').text(Math.ceil(workingCoefficient*scooterCommuteCo2));
        $('.numtrain').text(Math.ceil(workingCoefficient*trainCommuteCo2));
        $('.numev').text(Math.ceil(workingCoefficient*evCommuteCo2));
        $('.numbus').text(Math.ceil(workingCoefficient*busCommuteCo2));
        $('.numcar').text(Math.ceil(workingCoefficient*carCommuteCo2));
        $('.bike-emoji').text(emoji).css("opacity", "0.2")
        $('.scooter-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*scooterCommuteCo2))));
        $('.train-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*trainCommuteCo2))));
        $('.ev-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*evCommuteCo2))));
        $('.bus-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*busCommuteCo2))));
        $('.car-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*carCommuteCo2))));
      }, 500);
    }
    // ____________
    $('.active').fadeOut();
    displaySlide.removeClass('active');
    // Right arrow clicked
    if ($(this).hasClass('arrow-right')) {
      if (slideIndex+1 < $('.content-wrapper').length ) {
        displaySlide.next().addClass('active');
        slideFadeIn();
        changeCoefficients();

      } else {
        $('.content-wrapper').eq(0).addClass('active');
        slideFadeIn();
        changeCoefficients();
      }
    } else if ($(this).hasClass('arrow-left')) { // Left arrow clicked
      if (slideIndex == 0 ) {
        var listLength = $('.content-wrapper').length - 1
        $('.content-wrapper').eq(listLength).addClass('active');
        slideFadeIn();
        changeCoefficients();
      } else {
        displaySlide.prev().addClass('active');
        slideFadeIn();
        changeCoefficients();
      }
    }
  });
  // _____________________________________________________________________

  $('.kiwi-logo').click(function() {
    $('html, body').animate({'scrollTop':0}, 500);
  })

  //ARROW KEYPRESS FUNCTIONS____________________________________________________________
  $('html').keydown(function(e) {
    if (e.keyCode == 37 | e.keyCode == 39) {
      if (submitNumber == 1) {
        var slideIndex = $('.content-wrapper').index($('.active'));
        var displaySlide = $('.active');

        // Change all coeffcicients!!____________
        function changeCoefficients() {
          setTimeout(function() {
            var coefficientIndex = $('.content-wrapper').index($('.active'));
            var workingCoefficient = coefficients[coefficientIndex];
            var emoji = emojicoefficients[coefficientIndex];
            $('.numbike').text("0");
            $('.numscooter').text(Math.ceil(workingCoefficient*scooterCommuteCo2));
            $('.numtrain').text(Math.ceil(workingCoefficient*trainCommuteCo2));
            $('.numev').text(Math.ceil(workingCoefficient*evCommuteCo2));
            $('.numbus').text(Math.ceil(workingCoefficient*busCommuteCo2));
            $('.numcar').text(Math.ceil(workingCoefficient*carCommuteCo2));
            $('.bike-emoji').text(emoji).css("opacity", "0.2")
            $('.scooter-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*scooterCommuteCo2))));
            $('.train-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*trainCommuteCo2))));
            $('.ev-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*evCommuteCo2))));
            $('.bus-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*busCommuteCo2))));
            $('.car-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*carCommuteCo2))));
          }, 500);
        }
        // ____________
        $('.active').fadeOut();
        displaySlide.removeClass('active');

        if (e.keyCode == 37) {
            if (slideIndex == 0 ) {
              var listLength = $('.content-wrapper').length - 1
              $('.content-wrapper').eq(listLength).addClass('active');
              slideFadeIn();
              changeCoefficients();
            } else {
              displaySlide.prev().addClass('active');
              slideFadeIn();
              changeCoefficients();
            }
          } else {
              if (slideIndex+1 < $('.content-wrapper').length ) {
                displaySlide.next().addClass('active');
                slideFadeIn();
                changeCoefficients();

              } else {
                $('.content-wrapper').eq(0).addClass('active');
                slideFadeIn();
                changeCoefficients();
              }

          }



      }
    }

  })




// FINAL BRACKETS_____________________________________________
});


// $('.numbike').text(Math.ceil(workingCoefficient*bikeCommuteCo2));
// $('.bike-emoji').text(emoji.repeat((Math.ceil(workingCoefficient*bikeCommuteCo2))));
