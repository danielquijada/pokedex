//variables acelerometro
var prevX = 0;
var firstTime = true;
var audio_pokemon;
//-----------------------

document.addEventListener("deviceready", onDeviceReady, false);
var isDeviceReady = false;
function onDeviceReady () {
  isDeviceReady = true;
}

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
var input = "";

function searchThisPokemon (id) {
  input = id;
  choosePokemonBy("id");
}

function choosePokemonBy(tipo) {
  if (input == "")
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
      case "type":
        showByType(response.data);
        break;
        default:
          console.log ("hola peteh :)")
    }
  });
  input = "";
};

var optionsAccelerometer = {frequency: 200};
var optionsCompass = {frequency: 1000};
var optionsGPS = {enableHighAccuracy: true, timeout: 10000,maximumAge: 1000};
var gpsWatcher;
var accelerometerWatcher;
var lastpos = 0;
function startWalk () {
  //alert ("Walk Started!");

  if (isDeviceReady)
    gpsWatcher = navigator.geolocation.watchPosition(gpsSuccess, gpsError, optionsGPS);

}

function stopWalk () {
  navigator.geolocation.clearWatch(gpsWatcher);
}

function stopShake () {
  navigator.accelerometer.clearWatch(accelerometerWatcher);
}

function distancia (p, q) {
  var d1 = p.latitude - q.latitude;
  var d2 = p.longitude - q.longitude;
  return Math.sqrt(Math.pow(d1, 2) + Math.pow (d2, 2));
}

function gpsSuccess (gps) {
  if (lastpos == 0)
    lastpos = gps.coords;
  var cambio = 1e-4;
  var dist = distancia (gps.coords, lastpos);
  //alert ("D: " + dist.toExponential());
  if (dist > cambio) {
    id = Math.floor((Math.random() * 721) + 1);
    document.getElementById("pokemon").setAttribute("src", "http://swiollvfer.esy.es/pokedex/res/img/pkm/" + id + ".png")
    lastpos = gps.coords;
  }
}

function gpsError (error) {
  alert ("Error GPS: " + error.code);
}

function startCircle () {
  var element = document.getElementById('tabla');
  element.innerHTML = 'Starting';
  // navigator.compass.watchHeading(compassSuccess,compassError,optionsCompass);
  var gch = navigator.compass.watchHeading (compassSuccess,compassError,optionsCompass);
  element.innerHTML += '\nEnding';
}

function compassSuccess(heading) {
  alert ("Compass: " + heading.magneticHeading.toFixed(1));
    // alert("Heading: " + heading.trueHeading. " at " + heading.timestamp);
};

function compassError(compassError) {
  alert ("Compass Error");
    // alert('Compass error: ' + compassError.code);
};

function onSuccessAccelerometer(acceleration) {
  if((acceleration.x - prevX < -7 || acceleration.x - prevX > 7) && firstTime == false) {
      audio_pokemon.play();
      navigator.vibrate(500);
  }

  prevX = acceleration.x;

  // Controlamos que sea la primera ejecucicón para darle un valor a prevX
  if(firstTime == true) {
    firstTime = false;
  }
};

function onErrorAccelerometer() {
    alert('onError!');
};

function showByName (datos) {
  img = 2;
  id = 0;
  nombre = 1;

  tabla = document.getElementById("tabla");

  tabla.innerHTML = "";

  for (i in datos) {
    pokemon = datos[i];

    modificadores = "id=" + pokemon[nombre];

    // nuevaLinea = "<div><img style='vertical-align:middle; width: 40%; height: auto' src=" + pokemon[img] +" alt=" + pokemon[nombre] + ">";
    // nuevaLinea += pokemon[id] + " " + pokemon[nombre] + "</div>";


    nuevaLinea = "<a href='#BuscarPkmn' data-transition='flip' data-rel='popup' onclick='alert(\'hello\');'><div id=" + pokemon[nombre] + ">"
    nuevaLinea +="<img style='vertical-align:middle; width: 40%; height: auto' src=" + pokemon[img] +" alt=" + pokemon[nombre] + "></a>";
    nuevaLinea += pokemon[id] + " " + pokemon[nombre] + "</div>";

    $("#tabla").append(nuevaLinea);
    document.getElementById(pokemon[nombre]).addEventListener("click", searchThisPokemon(pokemon[id]));
  }

};

function showByType (datos) {
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

  var audio = document.createElement("audio");
  if (audio != null && audio.canPlayType && audio.canPlayType("audio/ogg"))
  {
      audio.src = datos[10];
      audio_pokemon = audio;
  }

  if (isDeviceReady)
    accelerometerWatcher = navigator.accelerometer.watchAcceleration(onSuccessAccelerometer, onErrorAccelerometer, optionsAccelerometer);
  else {
    alert ("Error!");
  }
}
