$(function(){
  $('#submit').on('click', function(e){
    var parameters = {name: $('#name').val(), food: $('#food').val() };
    $.get( '/results', parameters, function(data) {

    });
  });
});