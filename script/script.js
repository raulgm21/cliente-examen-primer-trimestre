//--------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ MANEJADOR EVENTOS -------------------------------------------//
//--------------------------------------------------- OBJ AJAX -------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//  


    window.onload = function (){

        document.getElementById("enviar").addEventListener("click",login);
        document.getElementById("sala_uno").addEventListener("click",sala_uno);
        document.getElementById("sala_dos").addEventListener("click",sala_dos);

    }

    // Creación - Objeto AJAX
    AJAX = new XMLHttpRequest();


//--------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ INICAR SESIÓN -----------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//
        
    function login(){

        // Creamos el Objeto
        usuario = {
            dni   : document.getElementById("dni").value,
            clave : document.getElementById("clave").value,
        }

        // Pasamos el Objeto Usuario a Cadena
        cadena_usuario = JSON.stringify(usuario);

        // Cogemos el ID del Formulario
        let formulario_login = document.getElementById("login");

            formulario_login.onsubmit= e=>{
                
                // Quitamos el valor por defecto
                e.preventDefault();

                // Hacemos la petición AJAX
                AJAX.open('POST','php/login.php');

                AJAX.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");

                AJAX.onload=function(){

                    if(AJAX.status == 200){
                        var resultado = JSON.parse(AJAX.responseText);
                        
                        if(resultado == "Espere..."){       

                            let respuesta = document.getElementById("respuesta");
                            respuesta.style.color = "green";

                            setTimeout(enviar_menu,1000);
                        }

                        document.getElementById("respuesta").innerHTML = resultado;

                    }else{
                        document.getElementById("respuesta").innerHTML = "ERROR";
                    }
                }

                AJAX.onerror=function(){
                    document.getElementById("respuesta").innerHTML = "Petición Errónea";
                }

                AJAX.send(cadena_usuario);
            }

            function enviar_menu(){
                window.location.href = "home.html";
            }

    }

//--------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- SALA 1 ---------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//

    function sala_uno(){

        // Indicamos que es la sala uno para el GET
        let tipoSala = "S1";
        // Hacemos la petición AJAX
        AJAX.open('GET',`php/gestion_sala.php?tipoSala=${tipoSala}`)

        AJAX.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");

        AJAX.onload=function(){

            if(AJAX.status == 200){
                var resultado = JSON.parse(AJAX.responseText);

                var padre = document.getElementById("contenedor");

                while(padre.firstChild){                                                                 
                    padre.removeChild(padre.firstChild);            
                }

                // DOM : SALA

                var nombre_sala = document.createElement("h1");
                nombre_sala.innerHTML = resultado[0].nombre_sala;
                padre.appendChild(nombre_sala);

                // DOM : Butacas

                for(let i = 1 ; i < resultado.length ; i++){

                    var numero = document.createElement("p");
                    numero.style = "display : inline";
                    numero.innerHTML = i;
                    padre.appendChild(numero);

                    var crear_butaca = document.createElement("input");

                    // Si esta libre la mostrará como está
                    if(resultado[i].estado == "libre"){

                        crear_butaca.setAttribute("id","B"+i);
                        crear_butaca.setAttribute("name",resultado[i].codigo);
                        crear_butaca.setAttribute("type","radio");

                    // Si no esta libre la deshabilitará
                    }else{
                        
                        crear_butaca.setAttribute("id","B"+i);
                        crear_butaca.setAttribute("name",resultado[i].codigo);
                        crear_butaca.setAttribute("type","radio");
                        crear_butaca.setAttribute("disabled","disabled");
                    }

                    padre.appendChild(crear_butaca);

                    
                }

                // DOM : Botón

                var enviar = document.createElement("button");
                enviar.setAttribute("id","enviarEntrada");
                enviar.innerHTML = "Aceptar Entradas";

                padre.appendChild(enviar);

                // Evento para comprar entradas y luego actualizarlas si esta todo correcto
                document.getElementById("enviarEntrada").addEventListener("click",comprarEntradasSala1);

                
                

            }else{
                document.getElementById("respuesta").innerHTML = "ERROR";
            }
        }

        AJAX.onerror=function(){
            document.getElementById("respuesta").innerHTML = "Petición Errónea";
        }

        AJAX.send();
    }

//--------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- SALA 2 ---------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//

    function sala_dos(){
    
        // Indicamos que es la sala uno para el GET
        let tipoSala = "S2";
        // Hacemos la petición AJAX
        AJAX.open('GET',`php/gestion_sala.php?tipoSala=${tipoSala}`)

        AJAX.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");

        AJAX.onload=function(){

            if(AJAX.status == 200){
                var resultado = JSON.parse(AJAX.responseText);

                var padre = document.getElementById("contenedor");

                while(padre.firstChild){                                                                 
                    padre.removeChild(padre.firstChild);            
                }

                // DOM : SALA

                var nombre_sala = document.createElement("h1");
                nombre_sala.innerHTML = resultado[0].nombre_sala;
                padre.appendChild(nombre_sala);

                // DOM : Butacas

                for(let i = 1 ; i < resultado.length ; i++){

                    var numero = document.createElement("p");
                    numero.style = "display : inline";
                    numero.innerHTML = i;
                    padre.appendChild(numero);

                    var crear_butaca = document.createElement("input");

                    // Se crea la butaca como libre
                    if(resultado[i].estado == "libre"){

                        crear_butaca.setAttribute("id","B"+i);
                        crear_butaca.setAttribute("name",resultado[i].codigo);
                        crear_butaca.setAttribute("type","radio");

                    // Como la butaca no esta libre, la deshabilitará
                    }else{
                        
                        crear_butaca.setAttribute("id","B"+i);
                        crear_butaca.setAttribute("name",resultado[i].codigo);
                        crear_butaca.setAttribute("type","radio");
                        crear_butaca.setAttribute("disabled","disabled");
                    }

                    padre.appendChild(crear_butaca);

                    
                }

                // DOM : Botón

                var enviar = document.createElement("button");
                enviar.setAttribute("id","enviarEntrada");
                enviar.innerHTML = "Aceptar Entradas";

                padre.appendChild(enviar);

                // Evento para comprar y actualizar la butaca si esta todo correcto
                document.getElementById("enviarEntrada").addEventListener("click",comprarEntradasSala2);


            }else{
                document.getElementById("respuesta").innerHTML = "ERROR";
            }
        }

        AJAX.onerror=function(){
            document.getElementById("respuesta").innerHTML = "Petición Errónea";
        }

        AJAX.send();

    }

//--------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- BUTACAS 1 ------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//

    function comprarEntradasSala1(){

        // Creamos el Objeto
        butacas = {
            butaca1  : document.getElementById("B1").checked,
            butaca2  : document.getElementById("B2").checked,
            butaca3  : document.getElementById("B3").checked,
            butaca4  : document.getElementById("B4").checked,
            butaca5  : document.getElementById("B5").checked,
            butaca6  : document.getElementById("B6").checked,
            butaca7  : document.getElementById("B7").checked,
            butaca8  : document.getElementById("B8").checked,
            butaca9  : document.getElementById("B9").checked,
            butaca10 : document.getElementById("B10").checked,
        }

        // Pasamos el objeto a cadena
        cadena_butacas = JSON.stringify(butacas);
        
        // Variables de comprobación
        let contador = 0;
        let entradas = "";
    
        // Comprobamos cuantas entradas hemos seleccionado y las guardamos
        let existeButaca1 = document.getElementById("B1").checked;
        if(existeButaca1 == true){
            contador++
            entradas += "1 ";
        };
        let existeButaca2 = document.getElementById("B2").checked;
        if(existeButaca2 == true){
            contador++
            entradas += "2 ";
        };
        let existeButaca3 = document.getElementById("B3").checked;
        if(existeButaca3 == true){
            contador++
            entradas += "3 ";
        };
        let existeButaca4 = document.getElementById("B4").checked;
        if(existeButaca4 == true){
            contador++
            entradas += "4 ";
        };
        let existeButaca5 = document.getElementById("B5").checked;
        if(existeButaca5 == true){
            contador++
            entradas += "5 ";
        };
        let existeButaca6 = document.getElementById("B6").checked;
        if(existeButaca6 == true){
            contador++
            entradas += "6 ";
        };
        let existeButaca7 = document.getElementById("B7").checked;
        if(existeButaca7 == true){
            contador++
            entradas += "7 ";
        };
        let existeButaca8 = document.getElementById("B8").checked;
        if(existeButaca8 == true){
            contador++
            entradas += "8 ";
        };
        let existeButaca9 = document.getElementById("B9").checked;
        if(existeButaca9 == true){
            contador++
            entradas += "9 ";
        };
        let existeButaca10 = document.getElementById("B10").checked;
        if(existeButaca10 == true){
            contador++
            entradas += "10 ";
        };

        if(contador != 0){ //Has seleccionado al menos una entrada

        // ***********************************************************************************//
        // ******************************* ELEGIR ENTRADAS ***********************************//
        // ***********************************************************************************//
        
            var padre = document.getElementById("contenedor");

            while(padre.firstChild){                                                                 
                padre.removeChild(padre.firstChild);            
            }

            // Creamos la ventana de seleccionar entradas
            let numeroEntradas = document.createElement("h1");
            numeroEntradas.innerHTML = "Recuerde, tiene un todal de " + contador + " entradas";

            let ordinario = document.createElement("label");
            ordinario.innerHTML = "Entradas en precio ordinario";

            let inputOrdinario = document.createElement("input");
            inputOrdinario.setAttribute("id","precio_ordinario");
            inputOrdinario.setAttribute("type", "number");


            let reducido = document.createElement("label");
            reducido.innerHTML = "Entradas para menores 18 y mayores de 65";

            let inputReducido = document.createElement("input");
            inputReducido.setAttribute("id","precio_reducido");
            inputReducido.setAttribute("type", "number");

            let aceptarComprar = document.createElement("button");
            aceptarComprar.setAttribute("id","aceptar_compra");
            aceptarComprar.innerHTML = "Aceptar compra";


            padre.appendChild(numeroEntradas);
            padre.appendChild(ordinario);
            padre.appendChild(inputOrdinario);
            padre.appendChild(reducido);
            padre.appendChild(inputReducido);
            padre.appendChild(aceptarComprar);

            // ***********************************************************************************//
            // ******************************* ACEPTAR ENTRADAS **********************************//
            // ***********************************************************************************//

            // CUANDO PRESIONAMOS EL BOTÓN, NOS CALCULARÁ EL NÚMERO ESCRITO Y EL PRECIO
            aceptarComprar.addEventListener('click', (event) => {
                
                let numero_ordinario = document.getElementById("precio_ordinario").value;
                let numero_reducido  = document.getElementById("precio_reducido").value;

                numero_ordinario = numero_ordinario || 0;
                numero_reducido  = numero_reducido || 0;

                if(numero_ordinario >= 0 && numero_reducido >= 0){

                    let numeroTotal = parseInt(numero_ordinario) + parseInt(numero_reducido);

                    precio_ordinario = numero_ordinario * 10;
                    precio_reducido  = numero_reducido * 8.5;

                    let precioTotal = precio_ordinario + precio_reducido;
                 
                    if(numeroTotal == contador){    // Si las entradas coinciden con las solicitada, hara llamada al AJAX

                        // Hacemos la petición AJAX
                        AJAX.open('POST','php/comprobar_butacas_uno.php');

                        AJAX.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");

                        AJAX.onload=function(){

                            if(AJAX.status == 200){

                            }else{
                            document.getElementById("respuesta").innerHTML = "ERROR";
                            }
                        }

                        AJAX.onerror=function(){
                            document.getElementById("respuesta").innerHTML = "Petición Errónea";
                        }

                        AJAX.send(cadena_butacas);

                        // ***********************************************************************************//
                        // ******************************* RESULTADO FINAL ***********************************//
                        // ***********************************************************************************//

                        // Genera resumen de la compra

                        while(padre.firstChild){                                                                 
                            padre.removeChild(padre.firstChild);            
                        }

                        let resumen = document.createElement("h1");
                        resumen.innerHTML = "¡Información sobre su compra!"

                        let final_numeroEntradas = document.createElement("p");
                        final_numeroEntradas.innerText = "El número de entradas han sido: " + contador;

                        let final_butacasSeleccionadas = document.createElement("p");
                        final_butacasSeleccionadas.innerHTML = "La butacas seleccionadas son : " + entradas;

                        let final_precio = document.createElement("p");
                        final_precio.innerHTML = "El precio total es: " + precioTotal;

                        padre.appendChild(resumen);
                        padre.appendChild(final_numeroEntradas);
                        padre.appendChild(final_butacasSeleccionadas);
                        padre.appendChild(final_precio);


                    }else{ // No hemos seleccionado el número de entradas con el pedido
                        alert("El número seleccionado no concuerda con las entradas seleccionada anteriormente");
                    }

                    
                }else{ // Hemos puesto un número negativo
                    alert("No puedes poner un número en negativo");
                }
                

            }, false);
        
        }else{ // No hemos seleccionado ninguna entrada
            alert("Debes seleccionar al menos una entrada");
        }

    }

//--------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- BUTACAS 2 ------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------//

    function comprarEntradasSala2(){

               // Creamos el Objeto
               butacas = {
                butaca1  : document.getElementById("B1").checked,
                butaca2  : document.getElementById("B2").checked,
                butaca3  : document.getElementById("B3").checked,
                butaca4  : document.getElementById("B4").checked,
                butaca5  : document.getElementById("B5").checked,
                butaca6  : document.getElementById("B6").checked,
                butaca7  : document.getElementById("B7").checked,
                butaca8  : document.getElementById("B8").checked,
                butaca9  : document.getElementById("B9").checked,
                butaca10 : document.getElementById("B10").checked,
            }
    
            // Pasamos el objeto a cadena
            cadena_butacas = JSON.stringify(butacas);
            
            // Variables auxiliares
            let contador = 0;
            let entradas = "";
        
            // Comprobamos cuantas entradas hemos seleccionado y las guardamos
            let existeButaca1 = document.getElementById("B1").checked;
            if(existeButaca1 == true){
                contador++
                entradas += "1 ";
            };
            let existeButaca2 = document.getElementById("B2").checked;
            if(existeButaca2 == true){
                contador++
                entradas += "2 ";
            };
            let existeButaca3 = document.getElementById("B3").checked;
            if(existeButaca3 == true){
                contador++
                entradas += "3 ";
            };
            let existeButaca4 = document.getElementById("B4").checked;
            if(existeButaca4 == true){
                contador++
                entradas += "4 ";
            };
            let existeButaca5 = document.getElementById("B5").checked;
            if(existeButaca5 == true){
                contador++
                entradas += "5 ";
            };
            let existeButaca6 = document.getElementById("B6").checked;
            if(existeButaca6 == true){
                contador++
                entradas += "6 ";
            };
            let existeButaca7 = document.getElementById("B7").checked;
            if(existeButaca7 == true){
                contador++
                entradas += "7 ";
            };
            let existeButaca8 = document.getElementById("B8").checked;
            if(existeButaca8 == true){
                contador++
                entradas += "8 ";
            };
            let existeButaca9 = document.getElementById("B9").checked;
            if(existeButaca9 == true){
                contador++
                entradas += "9 ";
            };
            let existeButaca10 = document.getElementById("B10").checked;
            if(existeButaca10 == true){
                contador++
                entradas += "10 ";
            };
    
            if(contador != 0){ //Has seleccionado al menos una entrada
    
            // ***********************************************************************************//
            // ******************************* ELEGIR ENTRADAS ***********************************//
            // ***********************************************************************************//
            
                var padre = document.getElementById("contenedor");
    
                while(padre.firstChild){                                                                 
                    padre.removeChild(padre.firstChild);            
                }
    
                // Creamos la ventana de seleccionar entradas
                let numeroEntradas = document.createElement("h1");
                numeroEntradas.innerHTML = "Recuerde, tiene un todal de " + contador + " entradas";
    
                let ordinario = document.createElement("label");
                ordinario.innerHTML = "Entradas en precio ordinario";
    
                let inputOrdinario = document.createElement("input");
                inputOrdinario.setAttribute("id","precio_ordinario");
                inputOrdinario.setAttribute("type", "number");
    
    
                let reducido = document.createElement("label");
                reducido.innerHTML = "Entradas para menores 18 y mayores de 65";
    
                let inputReducido = document.createElement("input");
                inputReducido.setAttribute("id","precio_reducido");
                inputReducido.setAttribute("type", "number");
    
                let aceptarComprar = document.createElement("button");
                aceptarComprar.setAttribute("id","aceptar_compra");
                aceptarComprar.innerHTML = "Aceptar compra";
    
    
                padre.appendChild(numeroEntradas);
                padre.appendChild(ordinario);
                padre.appendChild(inputOrdinario);
                padre.appendChild(reducido);
                padre.appendChild(inputReducido);
                padre.appendChild(aceptarComprar);
    
                // ***********************************************************************************//
                // ******************************* ACEPTAR ENTRADAS **********************************//
                // ***********************************************************************************//
    
                // CUANDO PRESIONAMOS EL BOTÓN, NOS CALCULARÁ EL NÚMERO ESCRITO Y EL PRECIO

                aceptarComprar.addEventListener('click', (event) => {
                    
                    let numero_ordinario = document.getElementById("precio_ordinario").value;
                    let numero_reducido  = document.getElementById("precio_reducido").value;
    
                    numero_ordinario = numero_ordinario || 0;
                    numero_reducido  = numero_reducido || 0;
    
                    if(numero_ordinario >= 0 && numero_reducido >= 0){
    
                        let numeroTotal = parseInt(numero_ordinario) + parseInt(numero_reducido);
    
                        precio_ordinario = numero_ordinario * 10;
                        precio_reducido  = numero_reducido * 8.5;
    
                        let precioTotal = precio_ordinario + precio_reducido;
                     
                        if(numeroTotal == contador){    // Si las entradas coinciden con las solicitada, hara llamada al AJAX
    
                            // Hacemos la petición AJAX
                            AJAX.open('POST','php/comprobar_butacas_dos.php');
    
                            AJAX.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
    
                            AJAX.onload=function(){
    
                                if(AJAX.status == 200){
    
                                }else{
                                document.getElementById("respuesta").innerHTML = "ERROR";
                                }
                            }
    
                            AJAX.onerror=function(){
                                document.getElementById("respuesta").innerHTML = "Petición Errónea";
                            }
    
                            AJAX.send(cadena_butacas);
    
                            // ***********************************************************************************//
                            // ******************************* RESULTADO FINAL ***********************************//
                            // ***********************************************************************************//
    
                            while(padre.firstChild){                                                                 
                                padre.removeChild(padre.firstChild);            
                            }
    
                            // Nos lanza un resumen de la compra
                            let resumen = document.createElement("h1");
                            resumen.innerHTML = "¡Información sobre su compra!"

                            let final_numeroEntradas = document.createElement("p");
                            final_numeroEntradas.innerText = "El número de entradas han sido: " + contador;
    
                            let final_butacasSeleccionadas = document.createElement("p");
                            final_butacasSeleccionadas.innerHTML = "La butacas seleccionadas son : " + entradas;
    
                            let final_precio = document.createElement("p");
                            final_precio.innerHTML = "El precio total es: " + precioTotal;
    
                            padre.appendChild(resumen);
                            padre.appendChild(final_numeroEntradas);
                            padre.appendChild(final_butacasSeleccionadas);
                            padre.appendChild(final_precio);
    
    
                        }else{ // No hemos seleccionado el número de entradas con el pedido
                            alert("El número seleccionado no concuerda con las entradas seleccionada anteriormente");
                        }
    
                        
                    }else{ // Hemos puesto un número negativo
                        alert("No puedes poner un número en negativo");
                    }
                    
    
                }, false);
            
            }else{ // No hemos seleccionado ninguna entrada
                alert("Debes seleccionar al menos una entrada");
            }

    }