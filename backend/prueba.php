    <?php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
        header('Content-type: application/json');
    }

    $data = $_POST["data"];
    $type = $_POST["type"];

    switch ($type) {
      case 'name':
        searchByName($data);
        break;

      default:
        searchByID($data);
        break;
    };

    function searchByID ($id) {
      if ($id == "") {
        $id = 130;
      }
      $data = ["ID", "Nombre", "Tipo 1", "Tipo 2", "Generacion", "Descripcion", "Altura", "Peso", "Imagen", "Miniatura"];

      $con = mysqli_connect("mysql.hostinger.es","u439733712_swiol","17091991","u439733712_pokem");

      // Check connection
      if (mysqli_connect_errno())
      {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $res = mysqli_query($con,"SELECT * FROM pokemon WHERE id=$id");
      $arr = $res->fetch_array();
      $array = array("type" => "id", "data" => $arr);
      echo json_encode($array,JSON_FORCE_OBJECT);
//
      // echo "<table>";
      // $int =  $arr[0];
      // $nomb = $arr[1];
      // echo "<div><img style='vertical-align:middle; width: 80%; height: auto' src=http://swiollvfer.esy.es/pokedex/img/pkm/$int.png alt='$nomb'>";
      // echo "</div>";
      //
      // for ($i = 0; $i < 8; $i++) {
      //   echo "<tr>";
      //   if ($data[$i] != "Tipo 2" || $arr[$i] != "") {
      //     echo "<td>$data[$i]:</td>";
      //     echo "<td>$arr[$i]";
      //     if ($data[$i] == "Peso") {
      //       echo " Kg</td>";
      //     } else if ($data[$i] == "Altura") {
      //       echo " m</td>";
      //     } else {
      //       echo "</td>";
      //     }
      //   }
      //   echo "</tr>";
      // }
      // echo "</table>";

      mysqli_close($con);
    }

    function searchByName($name) {

      $mysqli = new mysqli("mysql.hostinger.es","u439733712_swiol","17091991","u439733712_pokem");

      $consulta = "SELECT * FROM  `pokemon` WHERE  `NOMBRE` LIKE  '%$name%'";

        if ($resultado = $mysqli->query($consulta)) {
          $arr = array();
           while ($fila = $resultado->fetch_row()) {
             array_push($arr,[$fila[0], $fila[1],$fila[9]]);
           }
           $array = array("type" => "name", "data" => $arr);
           echo json_encode($array,JSON_FORCE_OBJECT);

            /* liberar el conjunto de resultados */
            $resultado->close();
        }

    //  $con = mysqli_connect("mysql.hostinger.es","u439733712_swiol","17091991","u439733712_pokem");
    //  $res = mysqli_query($con,"SELECT * FROM pokemon WHERE nombre LIKE %$name%");

    //  while ($fila = $res->fetch_row()) {
    //      printf ("%s (%s)\n", $fila[0], $fila[1]);
    //  }
    }
  ?>
