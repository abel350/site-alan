<?php
	
session_unset();
session_start();
	$id = $_POST["setTemporada"];
	$text = $_POST["text"];

	$_SESSION['temporada'] = $id;
	$_SESSION['temporada_text'] = $text;
	echo $_SESSION['temporada'];
?>