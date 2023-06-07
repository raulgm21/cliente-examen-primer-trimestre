<?php

    include 'conexionbase.php';

    // Creamos los objetos
    class sala {
        public $nombre_sala = "";
        public $tipo_sala   = "";
    }

    class butaca {
        public $codigo = "";
        public $sala   = "";
        public $estado = "";
    }


    // Recibimos el tipo de sala con GET
    $tipoSala = $_GET['tipoSala'];

    // Creamos Instancias
    $objeto_sala = new sala();
    $objeto_butaca = new butaca();


    // Sacamos el nombre de la sala
    $sacarNombreSala = mysqli_query($conn,"SELECT nombre_sala FROM salas WHERE id_sala = '$tipoSala'");

    foreach($sacarNombreSala as $variable){
        foreach($variable as $valor){
            $nombreSala = $valor; //Sacamos el valor del nombre de la sala
        }
    }

    // Rellenamos el objeto Sala
    $objeto_sala->nombre_sala = $nombreSala;
    $objeto_sala->tipo_sala   = $tipoSala;

    // Metemos el objeto en la array
    $arrayObjeto[] = $objeto_sala;

    // Sacamos todas las butacas de la sala
    $recogerButacas    = mysqli_query($conn, "SELECT * FROM butacas WHERE sala = '$tipoSala'");            

    while($fila = mysqli_fetch_assoc($recogerButacas)){            
        // Guardamos cada butaca en el array
        $arrayObjeto[] = $fila;                                         
    }

    echo json_encode($arrayObjeto);

?>