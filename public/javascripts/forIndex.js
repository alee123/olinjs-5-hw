$(document).ready(function () {
  var value = $('#pictureUrl').html();

  $('#pictureUrl').remove();
  $('#picture').append('<img class ="display" src="null">')
  $('.display').attr("src", value);
  var bg = $('#bg').val();
  var font = $('#font').val();
  var border = $('#border').val();
  var quote = $('#quote').val();
  
  $('body').css({"background-color": bg});
  $('body').css({"color": font});
  $('body').css({"border-color": border});
  $('#header').css({"border-color":border});
  $('#quoted').html(quote);
  var quote = $('#quote').val();
  $('#quoted').html(quote);
  $('#userSet').submit(function (event) {
  	var bg = $('#bg').val();
    var font = $('#font').val();
    var border = $('#border').val();
    var quote = $('#quote').val();

    event.preventDefault();
    console.log(quote);
    $.post("/submitted", $('#userSet').serialize());
    
    $('body').css({"background-color": bg});
    $('body').css({"color": font});
    $('body').css({"border-color": border});
    $('#header').css({"border-color":border});
    $('#quoted').html(quote);

    return false;
  })

})

