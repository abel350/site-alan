<?php
session_start();


$ch = curl_init('https://grower-app.herokuapp.com/api/cultivos');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization:'.$_SESSION['token']));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

//execute post
$result = curl_exec($ch);
//$obj_php = json_decode($result);

//$_SESSION['id_sesion'] = $obj_php->nombre;

echo $result;
?>