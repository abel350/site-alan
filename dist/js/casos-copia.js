$( document ).ready(function() {
  /*  $.ajaxSetup({ cache:false });*/
  
  var idagricultor=[];
  var ii=0;
  var jj=0
  obtener_agricultores(function(agri){
    var miJSON = agri;
    $("#filtro").append('<option value="'+miJSON.codigoAgricultor+'">'+miJSON.nombre+'</option>');
    $( "#filtro" ).change(function() {
      $("select option:selected").val();
    })
    .trigger( "change" );
    for(ii in miJSON.agricultores) { 
      idagricultor.push(miJSON.agricultores[ii].codigoAgricultor);            
      $("#filtro").append('<option value="'+miJSON.agricultores[ii].codigoAgricultor+'">'+miJSON.agricultores[ii].nombre+'</option>');

    }        
  })

  $("#filtro").change(function(){
    var id = $("#filtro option:selected").val();
    $.ajax({
      type: "POST",
      url: "recursos/setidagricultor.php",
      data: { id_sub_agricultor : id} 
    }).done(function(data){
      //Pasa datos para la gráfica y la tabla de Datos
      fnCallbackAjax(function(res2){
        var miJSON = JSON.parse(res2);
        tabla(miJSON);
      })
    });
  });


}); //END DOCUMENT READY
//Petición para datos de gráfica y tabla
function fnCallbackAjax(callbackData) {
  $.ajax({
    type: 'GET',
    // data: { bodega : $("#bodega option:selected").val(), cultivo : $("#cultivo option:selected").val()},
    url: 'recursos/graph.php',
    success:function(data){
      //var json = JSON.stringify(data);
      callbackData(data);
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


function tabla(data){
  var cultivos=[];
  $("#tabla").html(""); 
  var res2 = _.groupBy(data, 'CodigoCarga');
  console.log(JSON.stringify(res2));

  //var res2 = data;
  var html="";
  html+="<table border='1|1' class='table table-striped table-bordered display'>";
  html+="<CAPTION><div class='cultivo'><h5>Loads/Quality Evaluation</h5></div></CAPTION>";
  html+="<thead>";
  html+="<tr>";
  html+="<th>"+"#Load"+"</th>";
  html+="<th>"+"Reception Date"+"</th>";
  html+="<th>"+"Shipment Date"+"</th>";
  html+="<th></th>";
  html+="</tr>";

  html+="</thead>";
  html+="<tbody>"; 

  $.each(res2, function(i, item) {    
    html+="<tr>";
    html+="<td>"+i+"</td>";
    html+="<td>"+item[0].fecharecepcion;+"</td>";
    html+="<td>"+item[0].fechaembarque;+"</td>";

    html+="<td>"+"<input id='cultivo_t' type='text' value='"+i+"' style='display:none;'>"+
    '<a data-toggle="modal" href="#stack1" class="boton btn btn-success" data-val="'+i+'">Detalles</a>'
    "</td>";
    html+="</tr>";
    
  })
  html+="</tbody>";
  html+="</table>";
  $("#tabla").html(html);  

  var cult="";
  $("#tabla").on('click','a.boton', function() {
    cult =  $(this).data('val'); 
    tabla_tamano(res2,cult)
  })

}

function tabla_tamano(data, cultivos){
  var res2 = _.groupBy(data[cultivos], 'Cultivo');
  var html="";
  var boxes = 0;
  var images = "";
  var fecha="";
  var enlace_evaluacion ="http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/"+cultivos+".pdf";

  images+="<div class='item active'><img src='http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/1.jpg' alt='1'></img></div>";
  for (var m = 2; m < 4; m++) { 
    images+="<div class='item'><img src='http://cargas.tripleh.com.mx/recepciones/"+cultivos+"/"+m+".jpg' alt='"+m+"'></img></div>";
  }

  $.each(res2, function(i, item) {
    for (var j = 0; j < item.length; j++) {
      boxes = boxes + item[j].Recibido;
      fecha= item[j].fecharecepcion;
    }  
    html+="<p>"+i+"</p>";
    html+="<p> We have recived <strong>"+numberWithCommas(boxes)+"</strong> boxes on <strong>"+fecha+"</strong></p>";
  })
  html+='<a href="'+enlace_evaluacion+'" class="boton">Quality Evaluation</a>';

  $("#carousel_images").html(images);
  $("#status_load").html(html);

  $("#status_load").on('click','a.boton', function() {
  })

}

var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}; 


/*//We do that to ensure to get a correct JSON
var my_json = JSON.stringify(my_data)
//We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
var filtered_json = find_in_object(JSON.parse(my_json), {website: 'yahoo'});

function find_in_object(my_object, my_criteria){

  return my_object.filter(function(obj) {
    return Object.keys(my_criteria).every(function(c) {
      return obj[c] == my_criteria[c];
    });
  });

}

console.log(filtered_json);*/


jQuery(document).bind('error', function(event) {
  console.log(event.target.src);
});