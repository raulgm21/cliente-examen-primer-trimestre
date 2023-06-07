<?php

    include 'conexionbase.php';

    //Vaciamos Tabla
    $vaciarTabla = mysqli_query($conn,"DELETE FROM butacas");

    //Llenamos Tabla
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_01','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_02','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_03','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_04','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_05','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_06','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_07','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_08','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_09','S1','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS1_10','S1','libre')");

    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_01','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_02','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_03','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_04','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_05','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_06','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_07','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_08','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_09','S2','libre')");
    $sentencia = mysqli_query($conn,"INSERT INTO butacas VALUES ('BS2_10','S2','libre')");

    header("Location: ../home.html")

?>