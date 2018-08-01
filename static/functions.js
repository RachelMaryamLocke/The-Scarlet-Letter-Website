$(window).scroll(function(){

  var wScroll = $(this).scrollTop();

  $('.logo').css({
    'transform' : 'translate(0px, '+ wScroll /2 +'%)'
  });

  $('.old_fashioned').css({
    'transform' : 'translate(0px, -'+ wScroll /15  +'%)'
  });

  $('.retro_fizz').css({
    'transform' : 'translate(0px, -'+ wScroll /45  +'%)'
  });

  $('.dirty_martini').css({
    'transform' : 'translate(0px, -'+ wScroll /60  +'%)'
  });

  $('.coffee').css({
    'transform' : 'translate(0px, -'+ wScroll /4  +'%)'
  });

  $('.olive').css({
    'transform' : 'translate(0px, -'+ wScroll /5  +'%)'
  });

  if(wScroll > $('.container').offset().top - ($(window).height() / 1.2)) {

    $('.container img').each(function(i){

      setTimeout(function(){
      $('.container img').eq(i).addClass('is-showing');
    }, 350 * (i+1));
    });
  }
});

/* Form Validation */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
