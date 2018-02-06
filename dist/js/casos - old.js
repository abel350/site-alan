var data_server = $.ajax({
  url: 'recursos/graph.php',
  global: false,
  type: "GET",
  async:false,
  success: function(msg){
    console.log("Data éxito");
  },
  error: function() {
    console.log("Ocurrió un error")
  }
}).responseText;

$( document ).ready(function() {
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
      //$("#filtro").append('<option value="'+miJSON.codigoAgricultor+'">'+miJSON.nombre+'</option>');
      $( "#filtro" ).change(function() {
        $("select option:selected").val();
      })
      .trigger( "change" );
      
      fnCallbackAjax(function(res){
        var result = JSON.parse(res);
        var res2 = _.groupBy(result, 'CodigoAgricultor')
        
        $.each(res2, function(i, item) {
          for(ii in miJSON.agricultores) {   
            if (i == miJSON.agricultores[ii].codigoAgricultor)  {   
              $("#filtro").append('<option value="'+miJSON.agricultores[ii].codigoAgricultor+'">'+miJSON.agricultores[ii].nombre+'</option>');          
            }
          }
        })        
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

//END DOCUMENT READY

$("#filtro").change(function(){
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
  })
  .done(function(data){
      //Pasa datos para la gráfica y la tabla de Datos
      fnCallbackAjax(function(res2){
        var miJSON = JSON.parse(res2);
        console.log(miJSON);
        tabla(miJSON);
        $.unblockUI();
        showPage();
      })
    });
});


//Petición para datos de gráfica y tabla
function fnCallbackAjax(callbackData) {
  $("#main").css("opacity", "0.1");
  $.ajax({
    type: 'GET',
    url: 'recursos/graph.php',
    beforeSend: function () {

    },
    success:function(data){
      //var json = JSON.stringify(data);
      callbackData(data);
      setTimeout(function() {
        $("#main").css("opacity", "1");
        $("#loader").css("display", "none");
      },3000);
    },
  }); 
}

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

function tabla(data){
  obtener_idioma(function(idioma){
    var res2 = JSON.stringify(data);
    var d   = JSON.parse(res2);

    $("#tabla").html(""); 
    var sort = _.sortBy(d, 'CodigoCarga').reverse();
    var sorts = JSON.stringify(sort);
    var sortsj = JSON.parse(sorts)
    var res2 = _.groupBy(sortsj, 'CodigoCarga');

    var html="";
    
    if(idioma =="en"){
      html+="<table border='1|1' class='table table-striped table-bordered display table-fixed'>";
      html+="<CAPTION><div class='cultivo'><h5 id='label_loads'>Loads / Quality Evaluation</h5></div></CAPTION>";
      html+="<thead>";
      html+="<tr>";
      html+="<th id='tl_loads'>#Load</th>";
      html+="<th id='tl_warehouse'>Border</th>";
      html+="<th id='tl_shipment_date'>Shipment Date</th>";
      html+="<th id='tl_reception_date'>Reception Date</th>";
    }else if(idioma =="es"){
      html+="<table border='1|1' class='table table-striped table-bordered display'>";
      html+="<CAPTION><div class='cultivo'><h5 id='label_loads'>Cargas / Evaluación de Calidad</h5></div></CAPTION>";
      html+="<thead>";
      html+="<tr>";
      html+="<th id='tl_loads'>#Carga</th>";
      html+="<th id='tl_warehouse'>Frontera</th>";
      html+="<th id='tl_shipment_date'>Fecha de Embarcado</th>";
      html+="<th id='tl_reception_date'>Fecha de Recibido</th>";
    }
    html+="<th></th>";
    html+="</tr>";

    html+="</thead>";
    _.forEachRight(res2, function(value) {
      html+="<tr>";
      html+="<td>"+value[0].CodigoCarga+"</td>";
      html+="<td>"+value[0].NombreBodega+"</td>";
      html+="<td>"+value[0].fechaembarque;+"</td>";
      html+="<td>"+value[0].fecharecepcion;+"</td>";

      html+="<td>"+"<input id='cultivo_t' type='text' value='"+value[0].CodigoCarga+"' style='display:none;'>"+
      '<a data-toggle="modal" href="#loads" class="boton btn btn-success" data-val="'+value[0].CodigoCarga+'"><img src="images/loads.png"></a>'
      "</td>";
      html+="</tr>";

    })
    html+="</tbody>";
    html+="</table>";
    $("#tabla_loads").html(html);  

    var cult="";
    $("#tabla_loads").on('click','a.boton', function() {
      cult =  $(this).data('val'); 
      tabla_tamano(res2,cult)
    })
  })
}

function imgerror() {
  obtener_idioma(function(idioma){
    if(idioma == "en"){
      $("#carousel_images").html("<div class='item active'><h2>No pictures available</h2></img></div>");
      $("a.carousel-control").css("display","none");
      $("#status_load a.boton").css("pointer-events","none");
      $("#status_load a.boton").css("color","#565050");
      $("#status_load a.boton").html("No evaluation file");
    }else if(idioma == "es"){
      $("#carousel_images").html("<div class='item active'><h2>Fotos no disponibles</h2></img></div>");
      $("a.carousel-control").css("display","none");
      $("#status_load a.boton").css("pointer-events","none");
      $("#status_load a.boton").css("color","#565050");
      $("#status_load a.boton").html("Evaluación de calidad no disponible");
    }
  })

}


function tabla_tamano(data, cultivos){
  obtener_idioma(function(idioma){
    console.log(data);

    var res2 = _.groupBy(data[cultivos], 'Cultivo');
    console.log(res2);
    var html="";
    var boxes = 0;
    var images = "";
    var fecha="";
    var enlace_evaluacion ="http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/"+cultivos+".pdf";
    $("a.carousel-control").css("display","block");
    images+="<div class='item active'><img src='http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/1.jpg' alt='1'  onerror='imgerror()'></img></div>";
    for (var m = 2; m < 4; m++) { 
      images+="<div class='item'><img src='http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/"+m+".jpg' alt='"+m+"'></img></div>";
    }

    if(idioma == "en"){
      $('#carga').html("#Load: <b>"+cultivos+"</b>");
      html+="<h3 class='datainfo_load_title'>We have received</h3>";
    }else if(idioma == "es"){
      $('#carga').html("#Carga: <b>"+cultivos+"</b>");
      html+="<h3  class='datainfo_load_title'>Hemos recibido</h3>";
    }    

    $.each(res2, function(i, item) {
      boxes = 0;
      for (var j = 0; j < item.length; j++) {
        boxes = 0;
        boxes = boxes + item[j].Recibido;
        fecha= item[j].fecharecepcion;

        html+="<div class='datainfo_load'>";
        html+="<b>"+item[j].NombreProducto+":</b>";
        if(idioma == "en"){
          html+="<p>"+numberWithCommas(boxes)+" boxes on "+fecha+"</p>";
        }else if(idioma == "es"){
          html+="<p>"+numberWithCommas(boxes)+" cajas el día "+fecha+"</p>";
        }
        html+="</div>";
      }
    })
    if(idioma == "en"){
      html+='<a target="new" href="'+enlace_evaluacion+'" class="boton" onerror="pdferror()">Quality Evaluation</a>';
    }else if(idioma == "es"){
      html+='<a target="new" href="'+enlace_evaluacion+'" class="boton" onerror="pdferror()">Evaluación de calidad</a>';
    }
    $("#carousel_images").html(images);
    $("#status_load").html(html);

    $("#status_load").on('click','a.boton', function() {
    })
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
    //We do that to ensure to get a correct JSON
    fnCallbackAjax(function(data){
      var my_json = JSON.parse(data)
    //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
    if (bodega == "todo") {
      tabla(my_json);
    }else
    if (bodega != "todo") {
      var filtered_json = find_in_object(JSON.parse(data), {NombreBodega: bodega});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      tabla(filtered_json);
    }
  });
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
  document.getElementById("main").style.opacity = 0.1;
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