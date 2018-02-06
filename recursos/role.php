<?php
session_unset();
session_start();
	$role = $_SESSION['role'];
	echo $role;
?>