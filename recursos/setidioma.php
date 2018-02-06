<?php
	
session_unset();
session_start();
	$setidioma = $_POST["idioma"];
	$_SESSION['idioma'] = $setidioma;
	echo $setidioma;
?>