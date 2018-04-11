<?php

session_unset();
session_start();
$id = $_POST["id_sub_agricultor"];
$_SESSION['id_sesion_sub_agricultor'] = $id;
echo $_SESSION['id_sesion_sub_agricultor'];
?>