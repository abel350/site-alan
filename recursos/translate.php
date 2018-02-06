<?php
	
session_unset();
session_start();
	$idioma = $_SESSION['idioma'];
	echo $idioma;
?>