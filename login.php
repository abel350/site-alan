<?php
session_start();


if(!isset($_SESSION['usuario']) and $_SESSION['estado'] != 'Autenticado') {
  require('recursos/sesiones.php');
}else if(!isset($_SESSION['usuario']) and (!isset($_SESSION['estado']))){
  require('recursos/sesiones.php');
} else {
  header('Location: tablero.php');
};
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="description" content="">
  <meta name="author" content="">

  <title>Login</title>

  <!-- Bootstrap core CSS -->
  <link href="dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="dist/css/signin.css" rel="stylesheet">

  <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
  <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
  <script src="assets/js/ie-emulation-modes-warning.js"></script>

  <!-- HTML5 shim and Respond  .js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
      <script src="dist/js/jquery-3.2.1.min.js"></script>
    </head>

    <body>
      <div id="main">

        <div id="loader"></div>
        <div class="container">
          <form method="POST" id="formulario" class="form-signin">
            <img src="images/logo.png" width="250">
            <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Usuario" required autofocus>
            <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Contraseña" required>
            <button id="login" class="btn btn-lg btn-success btn-block" type="submit">Iniciar sesión</button>        
          </form> 
        </div> <!-- /container -->
      </div>


      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
      <script src="assets/js/sesion2.js"></script>


    </body>
    </html>
