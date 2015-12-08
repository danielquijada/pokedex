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
       error: function () {
         alert ("error");
       }
  })

  .done (function (response){
    switch (response.type) {
      case "name":
        showByName(response.data);
        break;
      case "id":
        showById(response.data);
        break;
        default:
          console.log ("hola peteh :)")
    }
  });
};

function showByName (datos) {
  img = 2;
  id = 0;
  nombre = 1;

  tabla = document.getElementById("tabla");

  tabla.innerHTML = "";

  for (i in datos) {
    pokemon = datos[i];

    nuevaLinea = "<div><img style='vertical-align:middle; width: 40%; height: auto' src=" + pokemon[img] +" alt=" + pokemon[nombre] + ">";
    nuevaLinea += pokemon[id] + " " + pokemon[nombre] + "</div>";

    $("#tabla").append(nuevaLinea);
  }
};

function showById (datos) {
  ids = ["id", "nombre", "tipo1", "tipo2", "generacion", "descripcion", "altura", "peso"];

  $("#imagen").attr("alt", datos[1]);
  $("#imagen").attr("src", datos[8]);

  altura = 6;
  peso = 7;
  tipo2 = 3;

  if (datos[tipo2] == "")
    document.getElementById("tipo2tr").style.display = "none";
  else {
    document.getElementById("tipo2tr").style.display = "auto";
  }

  console.log (datos);

  if (datos[altura] == "0"){
    document.getElementById("alturatr").style.display = "none";
  }else {
    document.getElementById("alturatr").style.display = "auto";
  }

  if (datos[peso] == "0") {
    document.getElementById("pesotr").style.display = "none";
  } else {
    document.getElementById("pesotr").style.display = "auto";
  }

  for (i = 0; i < 8; i++) {
    document.getElementById(ids[i]).innerHTML = datos[i];
  }

  $("#altura").append(" m");
  $("#peso").append(" Kg");
}
