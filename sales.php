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

  <title>Sales</title>

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
    <script src="dist/js/jquery-3.2.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="dist/js/Chart.bundle.js"></script>
    <script src="dist/js/utils.js"></script>


  </head>

  <body>
    <div id="loader"></div>
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
              <li class=" active dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Sales <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="sales.php">Price</a></li>
                  <li><a tabindex="-1" href="facturas-venta.php">Price by Load</a></li>
                </ul>
              </li>  
              <li><a id="commodity_eval" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">Commodity Control</a></li>
              <li><a id="financial" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">Financial Statments</a></li>
              <li><a id="news" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">TripleH News</a></li>
              <li><a id="about" href ="#" data-toggle="tooltip" title="Soon" data-placement="right">About site</a></li>   

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

      <!-- Panel de usuario -->
      <div class="panel panel-primary">
        <div class="panel-heading">
          <!-- <h4>Mi tablero</h4> -->
          <div><span id="welcome">Welcome:</span> <b><?php echo $nombre; ?></b> </div>
          <a data-toggle="modal" href="#stack9" class=""><i class="fa fa-info-circle info" aria-hidden="true"></i></a>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="con-json">  
               <label id="lagricultor" for="filtro">Filter by grower</label> 
               <select id="filtro" class="form-control">                  
               </select>
             </div>  
           </div>
           <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="con-json">
              <label id="lbodega" for="bodega">Filter by warehouse</label>    
              <select id="bodega" name="bodega" class="form-control">                  
              </select>
            </div>               
          </div> 
        </div> 
      </div>
    </div>
    <!-- / Panel de usuario -->

    <div class="container">
      <div class="row">
        <h5></h5>
        <div class="col-lg-12 col-md-12 col-sm-12 ">            
          <div id="tabla_loads" style="overflow-x:auto;"></div>
        </div>              

      </div><!-- /div .row -->
    </div><!-- /div .container -->

    <div id="loads" class="modal container fade" tabindex="-1" data-focus-on="input:first" style="height: 500px;">
      <div class="modal-header">
        <button aria-hidden="true" type="button" data-dismiss="modal" class="btn btn-danger cerrar_modal">x</button><h3></h3>
      </div>
      <div class="modal-body">
        <div class="col-lg-12 col-md-12 col-sm-12 ">            
          <div id="myCarousel" class="carousel slide" data-ride="carousel" style="width: 300px;margin: auto;">
            <!-- Indicators -->
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>

            <!-- Wrapper for slides -->
            <div  id="carousel_images" class="carousel-inner">
              <div class='item active'>
                <img></img>
              </div>
            </div>

            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 ">            
          <div id="status_load" style="overflow-x:auto;"></div>
        </div>       
      </div>        
    </div>

    <!-- Info_table Sales -->
    <div id="stack9" class="modal container fade" tabindex="-1" data-focus-on="input:first">
      <div class="modal-header">
        <button aria-hidden="true" type="button" data-dismiss="modal" class="btn btn-default cerrar_modal"><i class="fa fa-times" aria-hidden="true"></i></button>
        <h3 id="linfo">Help</h3>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item">
            <h4 id="ltBOL" class="list-group-item-heading">BOL</h4>
            <p id="pltBOL" class="list-group-item-text">Bill of Lading</p>
          </li>                    
          <li class="list-group-item">
            <h4 id="ltShipmenteDate" class="list-group-item-heading">Shipment Date</h4>
            <p id="pltShipmenteDate" class="list-group-item-text">Date of shipment from grower's packing house</p>
          </li>
          <li class="list-group-item">
            <h4 id="ltReceptionDate" class="list-group-item-heading">Reception Date</h4>
            <p id="pltReceptionDate" class="list-group-item-text">Date of reception at warehouse</p>
          </li>
          <li class="list-group-item">
            <h4 id="ltAsigmentDate" class="list-group-item-heading">Assigment Date</h4>
            <p id="pltAsigmentDate" class="list-group-item-text">Date of product assigment to a sales order</p>
          </li>
          <li class="list-group-item">
            <h4 id="ltquanty" class="list-group-item-heading">Quantity</h4>
            <p id="pltquanty" class="list-group-item-text">Amount of boxes</p>
          </li>
          <li class="list-group-item">
            <h4 id="ltprice" class="list-group-item-heading">Price</h4>
            <p id="pltprice" class="list-group-item-text">Order' sales price</p>
          </li>                    
        </ul>
      </div>            
    </div>   
  </div>

  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <script src="assets/js/ie10-viewport-bug-workaround.js"></script>      

  <!-- <script src="dist/js/bootstrap.min.js"></script> -->
  <script src="dist/js/jquery.dataTables.min.js"></script>
  <script src="dist/js/dataTables.bootstrap.js"></script>
  <!--botones DataTables--> 
  <script src="dist/js/dataTables.buttons.min.js"></script>
  <script src="dist/js/buttons.bootstrap.min.js"></script>
  <!--Libreria para exportar Excel-->
  <script src="dist/js/jszip.min.js"></script>
  <!--Librerias para exportar PDF-->
  <script src="dist/js/pdfmake.min.js"></script>
  <script src="dist/js/vfs_fonts.js"></script>
  <!--Librerias para botones de exportación-->
  <script src="dist/js/buttons.html5.min.js"></script>
  <!-- Funciones -->
  <script src="translate/traducir_sales.js"></script>
  <script src="http://malsup.github.io/jquery.blockUI.js"></script>
  <script src="https://unpkg.com/i18next@8.4.3/i18next.min.js"></script>
  <script src="dist/js/ventas.js"></script>
  <script src="dist/js/menu-left.js"></script>


</body>
</html>
