var data_ventas
var data_server;
obtener_ventas(function(ventas){
  data_ventas = ventas;
  fnCallbackAjax(function(agri){
    data_server = agri;
    myFunction();
    obtener_bodegas(function(cultivo){
      obtener_idioma(function(idioma){
        var miJSON = cultivo;
        if(idioma =="en"){
          $("#bodega").append('<option id="option_b" value="todo"> -- Select an option -- </option>');
          $("#bodega").append('<option id="filter_bogeda" value="todo">No Filter</option>');
          $("[data-toggle='tooltip']").attr('data-original-title', 'Soon').tooltip('hide');
          $("#english").css( "border-bottom", "solid 3px #5bc0de" );
          $("#english").css( "border-top", "solid 3px #5bc0de" );
        }else if(idioma =="es"){
          $("#bodega").append('<option id="option_b" value="todo"> -- Selecciona una opción -- </option>');
          $("#bodega").append('<option id="filter_bogeda" value="todo">Sin Filtro</option>');
          $("[data-toggle='tooltip']").attr('data-original-title', 'Pronto').tooltip('hide');
          $("#spanish").css( "border-bottom", "solid 3px #5bc0de" );
          $("#spanish").css( "border-top", "solid 3px #5bc0de" );
        }

        for(var i in miJSON) {                        
          $("#bodega").append('<option value="'+miJSON[i].codigo+'">'+miJSON[i].nombre+'</option>');
        }   
      })             
    }) 

    var idagricultor="";
    var ii=0;
    var jj=0
    obtener_agricultores(function(agri){
      obtener_idioma(function(idioma){
        var miJSON = agri;
        idagricultor += miJSON.codigoAgricultor +",";
        for(var i in miJSON.agricultores) { 
          idagricultor += miJSON.agricultores[i].codigoAgricultor +",";
        }
        if(idioma =="en"){
          $("#filtro").append('<option id="option2" value="'+idagricultor+'"> -- Select an option -- </option>');
          $("#filtro").append('<option id="filter_agricultor" value="'+idagricultor+'">No Filter</option>');
        }else if(idioma =="es"){
          $("#filtro").append('<option id="option2" value="'+idagricultor+'"> -- Selecciona una opción -- </option>');
          $("#filtro").append('<option id="filter_agricultor" value="'+idagricultor+'">Sin Filtro</option>');
        }
        $( "#filtro" ).change(function() {
          $("select option:selected").val();
        })
        .trigger( "change" );
        var result = JSON.parse(data_server);
        var res2 = _.groupBy(result, 'CodigoAgricultor')

        $.each(res2, function(i, item) {
          for(ii in miJSON.agricultores) {   
            if (i == miJSON.agricultores[ii].codigoAgricultor )  {   
              $("#filtro").append('<option value="'+miJSON.agricultores[ii].codigoAgricultor+'">'+miJSON.agricultores[ii].nombre+'</option>');          
            }
          }
        })        

        var id = $("#filtro option:selected").val();
        $.ajax({
          type: "POST",
          url: "recursos/setidagricultor.php",
          data: { id_sub_agricultor : id} 
        })
        .done(function(data){

        }); 
      })       
    })
  }); 
});


var data_server_filtro_agricultor=null;
$("#filtro").change(function(){
  $('#bodega').prop('selectedIndex',0);
  $.blockUI({ 
    message: '',
    overlayCSS:  { 
      backgroundColor: '#fff', 
      opacity:         0.6, 
      cursor:          'wait' 
    }, 
  }); 
  var id = $("#filtro option:selected").val();
  $.ajax({
    type: "POST",
    url: "recursos/setidagricultor.php",
    data: { id_sub_agricultor : id} 
  }).done(function(data){

    if (document.getElementById("filtro").selectedIndex == 0 || document.getElementById("filtro").selectedIndex == 1){
      data_server_filtro_agricultor = JSON.parse(data_ventas);
      tabla(data_server_filtro_agricultor);
    }else{
      data_server_filtro_agricultor = find_in_object(JSON.parse(data_ventas), {CodigoAgricultor: id});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      tabla(data_server_filtro_agricultor);
    }
    console.log("Agricultores cargado con éxito");
    $.unblockUI();
    showPage();
  })
});


//END DOCUMENT READY

//Petición para obtener agricultores
function obtener_agricultores(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/agricultores.php',
    //dataType:'json',
    success:function(data){
      var json = JSON.parse(data);
      callbackData(json);
    },
  });
}


//Petición para obtener Ventas
function obtener_ventas(callbackData) {
  $("#main").css("opacity", "0.1");
  $.ajax({
    type: 'GET',
    url: 'recursos/sales.php',
    success:function(data){
      callbackData(data);
    },
  });
}

//Petición para obtener Idioma Seleccionado
function obtener_idioma(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/translate.php',
    success:function(data){
      callbackData(data);
    },
  }); 
}

//Petición para obtener ROL
function obtener_role(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/role.php',
    success:function(data){
      callbackData(data);
    },
  }); 
}

//Petición para datos de gráfica y tabla
function fnCallbackAjax(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/graph.php',
    beforeSend: function () {
    },
    success:function(data){
      //var json = JSON.stringify(data);
      callbackData(data);
    },
  }); 
}

function tabla(ventas){
  obtener_idioma(function(idioma){
    var sales = ventas;

    var sumtotal_cantidad  =0;
    var sumtotal_importe = 0 ;
    var avg_price = 0;

    for(ii in sales) {
      sumtotal_cantidad = sumtotal_cantidad + sales[ii].Cantidad;
      sumtotal_importe = sumtotal_importe + sales[ii].Importe;
    }

    if (sumtotal_importe == 0 || sumtotal_cantidad == 0 ){
      avg_price = "-";
    }else{
      avg_price = sumtotal_importe/sumtotal_cantidad;
    }

    $("#tabla").html(""); 
    var html="";
    if(idioma == "en"){
      html+="<table border='1|1' class='table table-striped table-bordered display'>";
      html+="<CAPTION><div class='cultivo'><h5><strong></strong></h5><p><strong>Total:  </strong>"+numberWithCommas(sumtotal_cantidad)+"</p><p><strong id='lt_price_sales'>Avg Price:  </strong>"+avg_price;
      +"</p></div></CAPTION>";      
      html+="<thead>";
      html+="<tr>";
      
    }else if(idioma == "es"){
      html+="<table border='1|1' class='table table-striped table-bordered display'>";
      html+="<CAPTION><div class='cultivo'><h5><strong></strong></h5><p><strong>Total:  </strong>"+numberWithCommas(sumtotal_cantidad)+"</p><p><strong id='lt_price_sales'>Precio Promedio:  </strong>"+avg_price;
      +"</p></div></CAPTION>";      
      html+="<thead>";
      html+="<tr>";
    }
    

    if(idioma == "en"){
      html+="<th>"+"BOL"+"</th>";
      html+="<th>"+"Shipment Date"+"</th>";
      html+="<th>"+"Reception Date"+"</th>";
      html+="<th>"+"Assigment Date"+"</th>";
      html+="<th>"+"Commodity"+"</th>";
      html+="<th>"+"Quantity"+"</th>";
      html+="<th>"+"Price"+"</th>";
    }else if(idioma == "es"){
      html+="<th>"+"BOL"+"</th>";
      html+="<th>"+"Fecha de Embarcado"+"</th>";
      html+="<th>"+"Fecha Recibido"+"</th>";
      html+="<th>"+"Fecha Ordenado"+"</th>";
      html+="<th>"+"Cultivo"+"</th>";
      html+="<th>"+"Cantidad"+"</th>";
      html+="<th>"+"Precio"+"</th>";
    }

    html+="</tr>";
    html+="</thead>";
    html+="<tbody>"; 

    for(ii in sales) { 
      html+="<tr>";
      html+="<td>"+sales[ii].FolioPickup;+"</td>";
      html+="<td>"+sales[ii].fechaembarque;+"</td>";
      html+="<td>"+sales[ii].fecharecepcion;+"</td>";
      html+="<td>"+sales[ii].fechaOrdenado;+"</td>";
      html+="<td>"+sales[ii].NombreProducto;+"</td>";
      html+="<td>"+sales[ii].Cantidad;+"</td>";
      html+="<td>"+sales[ii].Precio;+"</td>";
      html+="</tr>";
    }
    html+="</tbody>";
    html+="</table>";
    $("#tabla_loads").html(html);  
  })
}


var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}; 


//Petición para obtener Bodegas
function obtener_bodegas(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/bodegas.php',
    dataType:'json',
    success:function(data){
      //var json = JSON.parse(data);
      callbackData(data);
      console.log("Bodegas cargados con éxito"); 
    },
  }); 
} 

var  bodega = "todo";
$("#bodega").change(function(){
  bodega = $("#bodega option:selected").val();
  var my_json = JSON.parse(data_ventas);
  if (bodega == "todo") {
    tabla(my_json);
  }else
  if (bodega != "todo") {
    var filtered_json = find_in_object(JSON.parse(data_ventas), {NombreBodega: bodega});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }
    tabla(filtered_json);
  }
  
})

var myVar;
function myFunction() {
  $.blockUI({ 
    message: '',
    overlayCSS:  { 
      backgroundColor: '#fff', 
      opacity:         0.6, 
      cursor:          'wait' 
    }, 
  }); 
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("main").style.opacity = 1;
}

$("#filtro").on('click', function() {
  $('#option2').hide();
})

$("#bodega").on('click', function() {
  $('#option_b').hide();
})

$("#spanish").on('click', function(event) {
  $.ajax({
    type: 'POST',
    url: 'recursos/setidioma.php',
    data: { idioma : "es"},
    success:function(data){
      console.log("IDIOMA " + data);
      location.reload();
    },
  });  
});

$("#english").on('click', function(event) {
  $.ajax({
    type: 'POST',
    url: 'recursos/setidioma.php',
    data: { idioma : "en"},
    success:function(data){
      console.log("IDIOMA " + data);
      location.reload();
    },
  }); 
});