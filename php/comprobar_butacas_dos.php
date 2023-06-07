<?php

    include 'conexionbase.php';

    // Creamos Objeto
    class butacas {
        public $butaca1   = "";
        public $butaca2   = "";
        public $butaca3   = "";
        public $butaca4   = "";
        public $butaca5   = "";
        public $butaca6   = "";
        public $butaca7   = "";
        public $butaca8   = "";
        public $butaca9   = "";
        public $butaca10  = "";
    }

    // Recogemos por POST el contenido del JSON
    $texto_POST  = file_get_contents('php://input');    
    $contenido   = json_decode($texto_POST);            
    
    // Creamos instancia
    $butacas     = new butacas();
    
    // Llenamos objeto
    $butacas->butaca1     = $contenido->{'butaca1'};
    $butacas->butaca2     = $contenido->{'butaca2'};
    $butacas->butaca3     = $contenido->{'butaca3'};
    $butacas->butaca4     = $contenido->{'butaca4'};
    $butacas->butaca5     = $contenido->{'butaca5'};
    $butacas->butaca6     = $contenido->{'butaca6'};
    $butacas->butaca7     = $contenido->{'butaca7'};
    $butacas->butaca8     = $contenido->{'butaca8'};
    $butacas->butaca9     = $contenido->{'butaca9'};
    $butacas->butaca10    = $contenido->{'butaca10'};
    
    // Hacemos array de objetos del objeto
    $arrayButacas[] = "";
    $arrayButacas[] = $butacas->butaca1;
    $arrayButacas[] = $butacas->butaca2;
    $arrayButacas[] = $butacas->butaca3;
    $arrayButacas[] = $butacas->butaca4;
    $arrayButacas[] = $butacas->butaca5;
    $arrayButacas[] = $butacas->butaca6;
    $arrayButacas[] = $butacas->butaca7;
    $arrayButacas[] = $butacas->butaca8;
    $arrayButacas[] = $butacas->butaca9;
    $arrayButacas[] = $butacas->butaca10;


    // Si la butaca esta libre la pondrá a ocupada
    for($i = 1 ; $i < 11 ; $i++){

       if($arrayButacas[$i] == "true"){
        $actualizarButaca = mysqli_query($conn, "UPDATE butacas SET estado='ocupado' WHERE codigo='BS2_0$i'");
       }

       if($arrayButacas[10] == "true"){
        $actualizarButaca = mysqli_query($conn, "UPDATE butacas SET estado='ocupado' WHERE codigo='BS2_$i'");
       }

    }

?>