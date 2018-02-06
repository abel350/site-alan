<?php
session_unset();
session_start();

$id = $_SESSION['id_sesion_sub_agricultor'];
$data_string = "?codigosAgricultores=".$id;

$ch = curl_init('https://grower-app.herokuapp.com/api/facturas_venta'.$data_string);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization:'.$_SESSION['token']));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

//execute post
$result = curl_exec($ch);
$obj_php = json_decode($result);
echo $result;

?>