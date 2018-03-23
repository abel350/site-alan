<?php
	
session_unset();
session_start();
	$temporada = $_SESSION['temporada'];
	echo $temporada;
?>