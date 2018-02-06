<?php
session_unset();
session_start();

$id = $_SESSION['id_sesion'];
$data_string = "?clientId=".$id;

$ch = curl_init('https://grower-app.herokuapp.com/api/client'.$data_string);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization:'.$_SESSION['token']));
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);

//execute post
$result_agricultores = curl_exec($ch);
$obj_php_agricultores = json_decode($result_agricultores);
curl_close($ch);

//$_SESSION['nombre_agricultor_sesion'] = $obj_php->nombre;
//$_SESSION['id_sesion'] = $obj_php->nombre;
//echo $result;

$result="";
$data ="";
// $nombre_fichero = "test.txt";
// $file = fopen($nombre_fichero, 'w+'); //<--------- file handler
foreach ($obj_php_agricultores->agricultores as $valor) {
	$data_string = "?codigosAgricultores=".$valor->codigoAgricultor;
	$ch2 = curl_init('http://ionic2-auth-example-acm.herokuapp.com/api/embarques'.$data_string);
	curl_setopt($ch2, CURLOPT_CUSTOMREQUEST, "GET");
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization: elToken'));
	curl_setopt($ch2, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch2, CURLOPT_CONNECTTIMEOUT, 5);
	// ]curl_setopt($ch, CURLOPT_FILE, $file);   //<------- this is your magic line
	//execute post
	$data="";
	$data = curl_exec($ch2);
	$obj_php = json_decode($data);

	foreach($obj_php as $obj){
		if ($obj->Embarcado > 0){
			$embarque = $obj->Embarcado;
			echo $embarque;
		}	
	}

	/*if ($obj_php->Embarcado > 0) {
		$data2 = $data;
		echo $data2;
		# code...
		//$result = curl_exec($ch2);
	}*/

}
//$obj_php = json_decode($result);
// $contenido = fread($file, filesize($nombre_fichero));
// echo $data;
curl_close($ch2);
?>