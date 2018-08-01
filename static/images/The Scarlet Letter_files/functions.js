$(window).scroll(function(){

  var wScroll = $(this).scrollTop();

  $('.logo').css({
    'transform' : 'translate(0px, '+ wScroll /2 +'%)'
  });

  $('.old_fashioned').css({
    'transform' : 'translate(0px, -'+ wScroll /35  +'%)'
  });

  $('.retro_fizz').css({
    'transform' : 'translate(0px, -'+ wScroll /45  +'%)'
  });

  $('.dirty_martini').css({
    'transform' : 'translate(0px, -'+ wScroll /60  +'%)'
  });

  $('.coffee').css({
    'transform' : 'translate(0px, -'+ wScroll /5  +'%)'
  });

  $('.olive').css({
    'transform' : 'translate(0px, -'+ wScroll /7  +'%)'
  });

  if(wScroll > $('.container').offset().top - ($(window).height() / 1.2)) {

    $('.container img').each(function(i){

      setTimeout(function(){
      $('.container img').eq(i).addClass('is-showing');
    }, 150 * (i+1));
    });
  }
});

/* Form Validation */

$("#submitButton").click(function(event) {

    // Fetch form to apply custom Bootstrap validation
    var form = $("#bookingdetails")

    if (form[0].checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.addClass('was-validated');
    // Perform ajax submit here...

});

// function validateText(id) {
//
//   if($("#"+id).val()==null || $("#"+id).val()=="")
//   {
//       var div = $("#divid");
//       div.addClass('is-invalid');
//       return false;
//   }
// }
//
// $(document).ready(
//
//   function()
//   {
//     $("#submitButton").click(function()
//     {
//           validateText('firstname');
//     });
//   }
// );
