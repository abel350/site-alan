$( document ).ready(function() {
  $.ajaxSetup({ cache:false });
  myFunction();  
  obtener_bodegas();


  obtener_cultivos(function(cultivo){
    var miJSON = cultivo;
    $("#cultivo").append('<option value="todo">Elige</option>');
    $("#cultivo").append('<option value="todo">Todo</option>');
    for(var i in miJSON) {                        
      $("#cultivo").append('<option value="'+miJSON[i].NombreIngles+'">'+miJSON[i].NombreEspanol+'</option>');
    }                
  }) 

  // var idagricultor=[];
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
      // idagricultor.push(miJSON.agricultores[ii].codigoAgricultor);            
      $("#filtro").append('<option value="'+miJSON.agricultores[ii].codigoAgricultor+'">'+miJSON.agricultores[ii].nombre+'</option>');
          //console.log(data[i].CodigoAgricultor+" "+data[i].Embarcado);

          //$(".con-json select").append('<option value="'+agri.agricultores.codigoAgricultor[i]+'">'+agri.agricultores.nombre[i]+'</option>');             
          //console.log("<br>"+i+" - "+miJSON.agricultores[0].nombre);
          /*console.log(miJSON.agricultores[i].nombre); 
          console.log(miJSON.agricultores[i].codigoAgricultor);*/
          
        }        
        /*console.log("Agricultores GUARDADOS EN VARIABLE");
        console.log(idagricultor);*/
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
        console.log("Agricultores cargado con éxito");
        datosgraph(miJSON);
        tabla(miJSON);
      })
    });
  });

  /*obtener_embarques(function(embarques){
    var id = $("#filtro option:selected").val();
    console.log("EMBARQUES TODOS")
    console.log(embarques);
  })*/


}); //END DOCUMENT READY

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//var ctx = document.getElementById("canvas").getContext("2d");


var color = Chart.helpers.color;
var barChartData = {
  type: 'horizontalBar',
  data:{
    datasets: [{          
      backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
      borderColor: window.chartColors.white,
      borderWidth: 1,
      data: [],
      backgroundColor: [
      window.chartColors.blue,
      window.chartColors.red,
      window.chartColors.green,
      window.chartColors.yellow,
      window.chartColors.orange, 
      ],
      label: '# de cajas',
    }],
    labels: ["In Transit","Received","Available","Assigned", "Dispatched"]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    },
    responsive: true,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total de Cajas: '+0 
    }
  }
}; 



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
      console.log("Agricultores CARGADOS CON ÉXITO");       
    },
  });
}

//Petición para obtener Cultivos
function obtener_cultivos(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/cultivos.php',
    dataType:'json',
    success:function(data){
      //var json = JSON.parse(data);
      callbackData(data);
      console.log("Cultivos cargados con éxito"); 
    },
  }); 
} 


//Petición para obtener Cultivos
function obtener_precios(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/precios.php',
    //dataType:'json',
    success:function(data){
      //var json = JSON.parse(data);
      //console.log(data);
      callbackData(data);
    },
  }); 
}



/*//Petición para obtener TODOS LOS EMBARQUES SIN FILTRO
function obtener_embarques(callbackData) {
  var id = idagricultor;
  alert(id);
  $.ajax({
    type: 'GET',
    url: 'http://ionic2-auth-example-acm.herokuapp.com/api/embarques?codigosAgricultores=171',
    beforeSend: function (xhr) {
     xhr.setRequestHeader('Content-Type','application/json'); 
     xhr.setRequestHeader('Authorization', 'elToken'); 
     if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json');
    }
  },
  success: function (data) {
      //Do stuff with the JSON data
      //var json = JSON.stringify(data);
      callbackData(data);
    },
    fail: function(data) {
      alert('Datos Incorrectos');
    },
    complete: function(data){   
    }
  });
}*/


function tabla(data){
  var cultivos=[];

  $("#tabla").html(""); 
  var res2 = _.groupBy(data, 'Cultivo');
  var html="";

  var precio_prom = 0;
  var avg_price = 0;

  $.each(res2, function(i, item) {

    console.log("cultivos");
    console.log(i, item);
    
    var sum_embarcado = 0;
    var sum_recibido = 0;
    var sum_disponible = 0;
    var sum_ordenado = 0;
    var sum_despachado = 0;
    var sum_total_despachado = 0;
    var sum_total_embarcado = 0;
    var sum_total_recibido = 0;
    var sum_total_ordenado = 0;


    obtener_precios(function(precios){
      var precio_cultivos = JSON.parse(precios);
      var precio = _.groupBy(precio_cultivos, 'Cultivo');
      console.log("FILTRADOS DE PRECIOS");
      console.log(precio);

      if ($.isEmptyObject(precio)) {avg_price = "-";console.log(avg_price);}
      else{
        $.each(precio, function(indice, precio) {
          console.log(i+indice);
          if (i === indice) {
            for (var j = 0; j < precio.length; j++) {            
              avg_price = precio[j].PrecioPromedio;
            }
          }
        })
      }
      

      for (var j = 0; j < item.length; j++) {
        sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
        sum_total_despachado = sum_total_despachado + item[j].Despachado; 
        sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
        sum_total_recibido = sum_total_recibido + item[j].Recibido;
        sum_despachado = sum_despachado + item[j].DespachadoHOY;
        sum_recibido = sum_recibido + item[j].RecibidoHOY;
        sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
        sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
      }

      sum_disponible = sum_total_recibido-sum_total_ordenado;

      html+="<div class='cultivo'><h5><strong>"+i+"</h5></strong></div>";
      html+="<table border='1|1' class='table table-striped table-bordered display'>";
      html+="<thead>";
      html+="<tr>";
      html+="<th>"+"Cultivo"+"</th>";
      html+="<th>"+"En tránsito"+"</th>";
      html+="<th>"+"Recibido"+"</th>";
      html+="<th>"+"Disponible"+"</th>";
      html+="<th>"+"Ordenado"+"</th>";
      html+="<th>"+"Despachado"+"</th>";

      html+="<th class='precioavg_header'>"+"Precio Promedio"+"</th>";
      html+="<th>"+"Total Embarcado"+"</th>";
      html+="<th>"+"Total Despachado"+"</th>";
      html+="<th></th>";
      html+="</tr>";
      html+="</thead>";
      html+="<tbody>"; 

      html+="<tr>";
      html+="<td>"+i+"</td>";
      html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
      html+="<td>"+numberWithCommas(sum_recibido)+"</td>";
      html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
      html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
      html+="<td>"+numberWithCommas(sum_despachado)+"</td>";

      html+="<td class='precioavg_cell'>"+avg_price+"</td>";
      html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
      html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";

      html+="<td>"+"<input id='cultivo_t' type='text' value='"+i+"' style='display:none;'>"+
      '<a data-toggle="modal" href="#stack2" class="boton btn btn-success" data-val="'+i+'">Detalles</a>'

      "</td>";
      html+="</tr>";
      html+="</tbody>";
      html+="</table>";
      $("#tabla").html(html);  
    })
  })
  //tabla_tamano(res2,cultivos);
  var cult="";
  $("#tabla").on('click','a.boton', function() {
    cult =  $(this).data('val'); 
    tabla_tamano(res2,cult)
  })

}


function tabla_tamano(data, cultivos){
  $("#tabla_tamano").html(""); 
  var tamano = _.groupBy(data[cultivos], 'Tamano');
  var avg_price_tamano = 0;
  /*console.log("Tamaño");
  console.log(tamano);
  $.each(tamano, function(i, item) {
   console.log(item);
 })
 console.log("END Tamaño");*/
 var html="";
 html+="<div class='cultivo'><h5><strong>"+cultivos+"</h5></strong></div>";
 html+="<table border='1|1' class='table table-striped table-bordered display'>";
 html+="<thead>";
 html+="<tr>";
 html+="<th>"+"Tamaño"+"</th>";
 html+="<th>"+"En tránsito"+"</th>";
 html+="<th>"+"Recibido"+"</th>";
 html+="<th>"+"Disponible"+"</th>";
 html+="<th>"+"Ordenado"+"</th>";
 html+="<th>"+"Despachado"+"</th>";
 html+="<th class='precioavg_header'>"+"Precio Promedio"+"</th>";
 html+="<th>"+"Total Embarcado"+"</th>";
 html+="<th>"+"Total Despachado"+"</th>";
 html+="<th></th>";
 html+="</tr>";
 html+="</thead>";
 html+="<tbody>"; 

 $.each(tamano, function(i, item) {
  var sum_embarcado = 0;
  var sum_recibido = 0;
  var sum_disponible = 0;
  var sum_ordenado = 0;
  var sum_despachado = 0;
  var sum_total_despachado = 0;
  var sum_total_embarcado = 0;
  var sum_total_recibido = 0;
  var sum_total_ordenado = 0;

  obtener_precios(function(precios){
    var precio_cultivos = JSON.parse(precios);
    var precio = _.groupBy(precio_cultivos[cultivos], 'Etiqueta');
    console.log("FILTRADOS DE PRECIOS");
    console.log(precio);

    if ($.isEmptyObject(precio)) {avg_price_tamano = "NaN";console.log(avg_price_tamano);}
    else{
      $.each(precio, function(indice, precio) {
        console.log(i+indice);
        if (i === indice) {
          for (var j = 0; j < precio.length; j++) {            
            avg_price_tamano = precio[j].PrecioPromedio;
          }
        }
      })
    }
  })


  console.log(avg_price_tamano);
  for (var j = 0; j < item.length; j++) {
    sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
    sum_total_despachado = sum_total_despachado + item[j].Despachado; 
    sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
    sum_total_recibido = sum_total_recibido + item[j].Recibido;
    sum_despachado = sum_despachado + item[j].DespachadoHOY;
    sum_recibido = sum_recibido + item[j].RecibidoHOY;
    sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
    sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
  }

  sum_disponible = sum_total_recibido-sum_total_ordenado;

  html+="<tr>";
  html+="<td>"+i+"</td>";
  html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
  html+="<td>"+numberWithCommas(sum_recibido)+"</td>";
  html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
  html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
  html+="<td>"+numberWithCommas(sum_despachado)+"</td>";

  html+="<td class='precioavg_cell'>"+avg_price_tamano+"</td>";
  html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
  html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";
  html+="<td>"+"<input id='cultivo_t_l' type='text' value='"+i+"' style='display:none;'>"+
  '<a data-toggle="modal" href="#stack3" class="boton btn btn-success" data-val="' + i+ '">Detalles</a>'

  html+="</tr>";  
})

 html+="</tbody>";
 html+="</table>";
 $("#tabla_tamano").html(html);

 var etiqueta="";
 $("#tabla_tamano").on('click','a.boton', function() {
  etiqueta =  $(this).data('val'); 
  tabla_tamano_etiqueta(tamano,etiqueta,cultivos)
})

}

function tabla_tamano_etiqueta(data, etiqueta,cultivos){
  var etiqueta_sales = etiqueta;
  var codigos = "";


  $("#tabla_tamano_etiqueta").html(""); 
  var etiqueta = _.groupBy(data[etiqueta], 'Etiqueta');
  
  console.log("ETIQUETA----------------------------------------");
  console.log(etiqueta);

  var html="";
  html+="<div class='cultivo'><h5></h5></div>";
  html+="<table border='1|1' class='table table-striped table-bordered display'>";
  html+="<thead>";
  html+="<tr>";
  html+="<th>"+"Etiqueta"+"</th>";
  html+="<th>"+"En tránsito"+"</th>";
  html+="<th>"+"Recibido"+"</th>";
  html+="<th>"+"Disponible"+"</th>";
  html+="<th>"+"Ordenado"+"</th>";
  html+="<th>"+"Despachado"+"</th>";
  html+="<th class='precioavg_header'>"+"Precio Promedio"+"</th>";
  html+="<th>"+"Total Embarcado"+"</th>";
  html+="<th>"+"Total Despachado"+"</th>";
  html+="<th></th>";
  html+="</tr>";
  html+="</thead>";
  html+="<tbody>"; 

  $.each(etiqueta, function(i, item) {
    var sum_embarcado = 0;
    var sum_recibido = 0;
    var sum_disponible = 0;
    var sum_ordenado = 0;
    var sum_despachado = 0;
    var sum_total_despachado = 0;
    var sum_total_embarcado = 0;
    var sum_total_recibido = 0;
    var sum_total_ordenado = 0;


    for (var j = 0; j < item.length; j++) {

      codigos+= item[j].CodigoCarga+",";

      sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
      sum_total_despachado = sum_total_despachado + item[j].Despachado; 
      sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
      sum_total_recibido = sum_total_recibido + item[j].Recibido;
      sum_despachado = sum_despachado + item[j].DespachadoHOY;
      sum_recibido = sum_recibido + item[j].RecibidoHOY;
      sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
      sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
    }

    sum_disponible = sum_total_recibido-sum_total_ordenado;

    html+="<tr>";
    html+="<td>"+i+"</td>";
    html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
    html+="<td>"+numberWithCommas(sum_recibido)+"</td>";
    html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
    html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
    html+="<td>"+numberWithCommas(sum_despachado)+"</td>";

    html+="<td class='precioavg_cell'>"+numberWithCommas(sum_embarcado)+"</td>";
    html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
    html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";
    html+="<td>"+'<a data-toggle="modal" href="#stack4" class="boton btn btn-success" data-val="' +i+ '">Detalles</a>'

    html+="</tr>";  
  })

  html+="</tbody>";
  html+="</table>";
  $("#tabla_tamano_etiqueta").html(html);

  var sales="";
  $("#tabla_tamano_etiqueta").on('click','a.boton', function() {
    sales =  $(this).data('val'); 
    tabla_sales(etiqueta,sales, etiqueta_sales, codigos, cultivos )
  })
}


function tabla_sales(data, tamano, etiqueta_sales, codigos, cultivos){
  //Petición para obtener Ventas
  function obtener_ventas(callbackData) {
    $.ajax({
      type: 'GET',
      data: { Tamano : etiqueta_sales, Etiqueta : tamano, CodigosCarga:codigos},
      url: 'recursos/ventas.php',
      //dataType:'json',
      success:function(data){
        //var json = JSON.parse(data);
        callbackData(data);
      },
    }); 
  }


  obtener_ventas(function(ventas){
    $("#tabla_sales").html(""); 
    var sales = JSON.parse(ventas);

    var sumtotal  =0;
    var precioavg = 0 
    var cultivo  ="";

    for(ii in sales) {
      sumtotal = sumtotal + sales[ii].Cantidad;
      precioavg = precioavg + sales[ii].Precio
    }

    console.log(precioavg);

    var html="";
    html+="<div class='cultivo'><h5><strong>"+cultivos+" "+etiqueta_sales+" "+tamano+"</strong></h5><p>Total: "+sumtotal+"</p></div>";
    html+="<table border='1|1' class='table table-striped table-bordered display'>";
    html+="<thead>";
    html+="<tr>";
    html+="<th>"+"BOL"+"</th>";
    html+="<th>"+"Shipment Date"+"</th>";
    html+="<th>"+"Reception Date"+"</th>";
    html+="<th>"+"Assigment Date"+"</th>";
    html+="<th>"+"Dispatched Date"+"</th>";
    html+="<th>"+"Product"+"</th>";
    html+="<th>"+"Quantity"+"</th>";
    html+="<th>"+"Price"+"</th>";
    html+="</tr>";
    html+="</thead>";
    html+="<tbody>"; 

    console.log("NUEVO--------------------------------------------------");
    console.log(sales);

    for(ii in sales) { 
      // console.log(sales[ii]);

      html+="<tr>";
      html+="<td>"+sales[ii].FolioPickup;+"</td>";
      html+="<td>"+sales[ii].fechaembarque;+"</td>";
      html+="<td>"+sales[ii].fecharecepcion;+"</td>";
      html+="<td>"+sales[ii].fechaOrdenado;+"</td>";
      html+="<td>"+sales[ii].fechaDespachado;+"</td>";
      html+="<td>"+sales[ii].NombreProducto;+"</td>";
      html+="<td>"+sales[ii].Cantidad;+"</td>";
      html+="<td>"+sales[ii].Precio;+"</td>";
      html+="</tr>";
    }

    html+="</tbody>";
    html+="</table>";
    $("#tabla_sales").html(html);       
  }) 
}


function obtener_bodegas(){
  $("#bodega").append('<option value="todo">Elige</option>');
  $("#bodega").append('<option value="todo">Todo</option>');
  $("#bodega").append('<option value="SMARTCOLD">SmartCold</option>');
  $("#bodega").append('<option value="SAN DIEGO">San Diego</option>');
}


var  bodega = "todo";
var  cultivo = "todo";

$("#bodega").change(function(){
  bodega = $("#bodega option:selected").val();
  cultivo = $("#cultivo option:selected").val();
    //We do that to ensure to get a correct JSON
    fnCallbackAjax(function(data){
      var my_json = JSON.parse(data)
    //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
    if (bodega == "todo" && cultivo == "todo") {
      datosgraph(my_json);
      tabla(my_json);
    }else
    if (bodega != "todo" && cultivo == "todo") {
      var filtered_json = find_in_object(JSON.parse(data), {NombreBodega: bodega});

      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      datosgraph(filtered_json);
      tabla(filtered_json);
    }else{
      var filtered_json = find_in_object(JSON.parse(data), {NombreBodega: bodega, Cultivo: cultivo});

      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      datosgraph(filtered_json);
      tabla(filtered_json);
    }
  });
  })

$("#cultivo").change(function(){
  bodega = $("#bodega option:selected").val();
  cultivo = $("#cultivo option:selected").val();

  fnCallbackAjax(function(data){
    var my_json = JSON.parse(data)
    //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
    if (bodega == "todo" && cultivo == "todo") {
      datosgraph(my_json);
      tabla(my_json);
    }else
    if (bodega == "todo" && cultivo != "todo") {
      var filtered_json = find_in_object(JSON.parse(data), {Cultivo: cultivo});

      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      datosgraph(filtered_json);
      tabla(filtered_json);
    }
    else{
      var filtered_json = find_in_object(JSON.parse(data), {NombreBodega: bodega, Cultivo: cultivo});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      datosgraph(filtered_json);
      tabla(filtered_json);
    }
  });
})

var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}; 

function renderChart (embarcado, recibido, disponible, ordenado, despachado,sum_total_embarcado,sum_total_despachado) {
  var suma = parseFloat(embarcado)+parseFloat(recibido)+parseFloat(despachado)+parseFloat(ordenado);
  //var ctx = document.getElementById('canvas');

  var pieChartContent = document.getElementById('containercanvas');
  pieChartContent.innerHTML = '&nbsp;';
  $('#containercanvas').append('<canvas id="canvas" height="150"><canvas>');
  ctx = $("#canvas").get(0).getContext("2d"); 

  var color = Chart.helpers.color;
  var myBar = new Chart(ctx, {
    data: barChartData.data,
    type: 'horizontalBar',
    options: {
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItem, data) { 
            return numberWithCommas(tooltipItem.xLabel);
          }
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero:true,
            callback: function(value) { return numberWithCommas(value);},
          },
        }],
        xAxes: [{
          gridLines: {
            offsetGridLines: true,
            display : false,
          },
        }],
      },
      responsive: true,
      legend: {
        display : false,
      },
    },

    animation: {
      onComplete: function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
        console.log(chartInstance);
        var height = chartInstance.controller.boxes[0].bottom;
        ctx.textAlign = "left";
        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          Chart.helpers.each(meta.data.forEach(function (bar, index) {
            ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y)));
          }),this)
        }),this);
      },
      title: {
        display: true,
        text: 'Total de Embarcado: '+numberWithCommas(sum_total_embarcado)
      }
    }
  });

  if (embarcado ==0 && recibido == 0 && disponible==0 && ordenado == 0 && despachado == 0) {
    myBar.data.datasets[0].data[0] = 0;
    myBar.data.datasets[0].data[1] = 0;
    myBar.data.datasets[0].data[2] = 0;
    myBar.data.datasets[0].data[3] = 0;
    myBar.data.datasets[0].data[4] = 0;
    myBar.update();
  }else{
    myBar.data.datasets[0].data[0] = embarcado;
    myBar.data.datasets[0].data[1] = recibido;
    myBar.data.datasets[0].data[2] = disponible;
    myBar.data.datasets[0].data[3] = ordenado;
    myBar.data.datasets[0].data[4] = despachado;    
    myBar.update();
  }

  document.getElementById("canvas").onclick = function(evt)
  {   
    var activePoints = myBar.getElementsAtEvent(evt);
    if(activePoints.length > 0)
    {
        //get the internal index of slice in pie chart
        var clickedElementindex = activePoints[0]["_index"];
        //get specific label by index 
        var label = myBar.data.labels[clickedElementindex];
        //get value by index      
        var value = myBar.data.datasets[0].data[clickedElementindex];
        //alert(clickedElementindex+label + "<br>"+ value);
        $("#detalles").click();
        /* other stuff that requires slice's label and value */
      }
    } 
  }


  function datosgraph(res2){  
    var sum_embarcado = 0;
    var sum_recibido = 0;
    var sum_disponible = 0;
    var sum_ordenado = 0;
    var sum_despachado = 0;
    var sum_total_despachado = 0;
    var sum_total_recibido = 0;
    var sum_total_ordenado = 0;
    var sum_total_embarcado = 0;


    for(var i in res2) {
      sum_total_embarcado = sum_total_embarcado + res2[i].Embarcado;                
    }

    for(var i in res2) {
      sum_total_ordenado = sum_total_ordenado + res2[i].Ordenado;                
    }

    for(var i in res2) {
      sum_total_despachado = sum_total_despachado + res2[i].Despachado;
    }

    for(var i in res2) {
      sum_total_recibido = sum_total_recibido + res2[i].Recibido;
    }

    for(var i in res2) {
      sum_despachado = sum_despachado + res2[i].DespachadoHOY;
    }
    for(var i in res2) {                
      sum_recibido = sum_recibido + res2[i].RecibidoHOY;
    }

    for(var i in res2) {

      sum_embarcado =sum_embarcado +(res2[i].Embarcado-res2[i].Recibido);
    }

    for(var i in res2) {
      sum_ordenado = sum_ordenado + (res2[i].Ordenado-res2[i].Despachado);
    }

  //sum_disponible = sum_total_recibido-(sum_total_ordenado+sum_despachado);
  sum_disponible = sum_total_recibido-sum_total_ordenado;
  
  if (isNaN(sum_embarcado) == false){
    renderChart(sum_embarcado,sum_recibido,sum_disponible,sum_ordenado,sum_despachado,sum_total_embarcado,sum_total_despachado);
  }else if (isNaN(sum_embarcado) == true){
    renderChart(0,0,0,0,0,0,0);
  }
}

var myVar;
function myFunction() {
  myVar = setTimeout(showPage, 1500);
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
}



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