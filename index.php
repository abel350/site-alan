<?php

session_start();
error_reporting(E_ALL ^ E_NOTICE);

if(isset($_SESSION['usuario']) and $_SESSION['estado'] == 'Autenticado') {
	include('tablero.php');
	die();
} else {
	include('login.php');
	die();
};
?>