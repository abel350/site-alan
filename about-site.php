<?php
session_start();

if(!isset($_SESSION['usuario']) and $_SESSION['estado'] != 'Autenticado') {
  header('Location: index.php');
} else {
  $nombre = $_SESSION['nombre_agricultor_sesion'];
  require('recursos/sesiones.php');
};
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>About Site</title>

  <!-- Bootstrap core CSS -->
  <link href="dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

  <link href="dist/css/tablero.css" rel="stylesheet">

  <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
  <!--[if lt IE 9]><script src ="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
  <script src="assets/js/ie-emulation-modes-warning.js"></script>

  <!-- Estilo Data Tables -->
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="dist/css/font-awesome.min.css">

  <link rel="stylesheet" href="dist/css/menu-left.css">

  <!-- HTML5 shim and Respond  .js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- JQUERY -->
    <!-- <script src="dist/js/jquery-3.2.1.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

      <script src="dist/js/Chart.bundle.js"></script>
      <script src="dist/js/utils.js"></script>


    </head>

    <body>
      <div id="main" class="animate-bottom">
        <!-- MENU -->
        <!-- Static navbar -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" id="slide-nav">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/"><img src="images/logo.png" height="55px"></a>
            </div>
            <div id="slidemenu">           
              <ul class="nav navbar-nav navbar-left">
                <li id="label"></li> 
                <li><a id="inventory" href="index.php">Inventory</a></li>
                <li><a id="lloads" href ="loads.php">Loads</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Sales <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="sales.php">Price</a></li>
                    <li><a tabindex="-1" href="facturas-venta.php">Price by Load</a></li>
                    <li><a tabindex="-1" href="facturas-venta-fecha.php">Price by Sold Date</a></li>
                    <li><a tabindex="-1" href="facturas-venta-fecha-factura.php">Price by Invoice Date</a></li>
                  </ul>
                </li>  
                <li><a id="commodity_eval" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">Commodity Control</a></li>
                <li><a id="financial" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">Financial Statments</a></li>
                <li><a id="news" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">TripleH News</a></li>
                <li class="active"><a id="about" href ="about-site.php">About site</a></li>  
                <li><a id="tutorial" href ="tutorial.php">Tutorial</a></li> 

              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="" id="spanish" onclick="i18next.changeLanguage('es')">Spanish</a></li>
                <li><a href="" id="english" onclick="i18next.changeLanguage('en')">English</a></li>
                <li><a href="recursos/salir.php"><i class="fa fa-power-off" aria-hidden="true"></i>  <span id="logout">Log Out</span></a></li>                           
              </ul>       
            </div><!--/.nav-collapse -->
          </div><!--/.container-fluid -->
        </nav> <!--/Static navbar -->
        <!-- / MENU -->
        <br><br><br><br><br><br>
        <br><br>

        <div class="container">
          <div class="row">
           <div class="col-md-6">
            <iframe width="100%" height="415" src="https://www.youtube.com/embed/Tc5Wm9d1WAA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>

          <div class="col-md-6">
            <div class="text-left" style="margin-top: 56px;">              
              <p >Created by Lucidum, a company of the Triple H Group, the new grower’s app will 
                help you keep track of the commercial performance of your product 24/7, with real 
              time information on the status and location of your loads: be it assigned, sold or dispatched.</p>
              <p >Inventory monitoring has never been so easy! Review conditions of the product, including photographic 
              evidence of shipment arrivals.</p>
              <p >Find your account statements including sales, expenditures and financial
              breakdowns according to shipment’s status: sold, settled and pending settlement.</p>
              <p >Get assistance from an executive within the app for comments, inquiries, or requesting clarifications.</p>

              <h2>Learn more!</h2>    

              <p  hidden="">
                Creada por Lucidum, empresa del Grupo Triple H, la nueva aplicación para Agricultores te ayudará a dar seguimiento del 
                rendimiento de tu producto las 24 horas, los 7 días de la semana, con información en tiempo real sobre el status y ubicación 
              de tus cargas: asignadas, vendidas o despachadas.</p>
              <p  hidden="">¡El monitoreo de inventario nunca ha sido tan fácil! 
              Revisa las condiciones del producto con evidencia fotográfica de las llegadas del envío.</p>
              <p  hidden="">Encuentra tus estados de cuenta incluyendo ventas, gastos y 
              desgloses financieros de acuerdo con el estado del envío: vendida, liquidada y pendiente de liquidar.</p>
              <p  hidden="">Obtén ayuda de un ejecutivo dentro de la aplicación para comentarios, consultas o bien, solicitar aclaraciones.
              </p>
            </div>
          </div>
        </div>

        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->

        <script src="assets/js/ie10-viewport-bug-workaround.js"></script>      

        <!-- <script src="dist/js/bootstrap.min.js"></script> -->

        <!--Libreria para exportar Excel-->
        <script src="dist/js/jszip.min.js"></script>
        <!--Librerias para exportar PDF-->
        <script src="dist/js/pdfmake.min.js"></script>
        <script src="dist/js/vfs_fonts.js"></script>
        <!--Librerias para botones de exportación-->
        <script src="dist/js/buttons.html5.min.js"></script>
        <!-- Funciones -->
        <script src="translate/traducir_sales_date.js"></script>
        <script src="http://malsup.github.io/jquery.blockUI.js"></script>
        <script src="https://unpkg.com/i18next@8.4.3/i18next.min.js"></script>
        <script src="dist/js/menu-left.js"></script>


      </body>
      </html>
