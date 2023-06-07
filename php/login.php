<?php

    include 'conexionbase.php';

    // Creamos Objeto
    class usuario {
        public $dni   = "";
        public $clave = "";
    }

    // Recogemos por POST el contenido del JSON
    $texto_POST  = file_get_contents('php://input');    
    $contenido   = json_decode($texto_POST);            

    // Creamos instancia
    $usuario     = new usuario();

    // Llenamos objeto
    $usuario->dni     = $contenido->{'dni'};
    $usuario->clave   = $contenido->{'clave'};

    // Variables del objeto para su uso
    $dni   = $usuario->dni;
    $clave = $usuario->clave;

    // Esta sentencia nos dirá si existe el usuario
    $iniciar_sesion = mysqli_query($conn,"SELECT COUNT(*) FROM usuarios WHERE dni='$dni' AND clave='$clave'");

    foreach($iniciar_sesion as $variable){
        foreach($variable as $valor){
            $resultadoSesion = $valor; //Si devuelve uno es que existe el usuario
        }
    }

    // Comprueba si no está vacío y existe
    if(!empty($dni) && isset($dni) && !empty($clave) && isset($clave)){  

        // Existe el usuario
        if($resultadoSesion == 1){
            
            $mensaje = "Espere...";
            echo json_encode($mensaje);

        }else{
            $mensaje = "El usuario o contraseña son incorrectos";
            echo json_encode($mensaje); 
        }

    }else{
        $mensaje = "No puedes dejar un campo vacío";
        echo json_encode($mensaje); 
    }



    

?>