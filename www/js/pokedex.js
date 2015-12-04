var pokedex = {
    // Application Constructor
    initialize: function() {
      $.support.cors = true;
      this.bindEvents();
    },

    bindEvents: function() {
    },
};
var tabla;

function choosePokemonBy(tipo) {
  input = document.getElementById('input').value;
  jsonarr = $.ajax({
       url:"http://swiollvfer.esy.es/pokedex/prueba.php",
       type: 'POST',
       dataType: 'json',
       data: {type: tipo, data: input},
       crossDomain: true,
       success: function() {
         alert ("success");
       },
       error: function () {
         alert ("error");
       }
  })

  .done (function (){
    console.log ("DONE");
    document.getElementById('tabla').innerHTML = jsonarr.responseText;
  });

  console.log(jsonarr);

  var delay=1000; //1 seconds

  setTimeout(function(){
    document.getElementById('tabla').innerHTML = jsonarr.responseText;
  }, delay); 


}
