var data_ventas
var data_server;
var temporadaok;

obtener_temporada(function(season){
  temporadaok = season;
})
obtener_agricultores(function(agri){
  var idagricultor = "";
  var miJSON = agri;
  for(var i in miJSON.agricultores) { 
    idagricultor = idagricultor+miJSON.agricultores[i].codigoAgricultor +",";
  }
  var id = idagricultor;
  $.ajax({
    type: "POST",
    url: "recursos/setidagricultor.php",
    data: { id_sub_agricultor : id} 
  })
  .done(function(data){
  });
  obtener_ventas(function(ventas){
    if(temporadaok.length > 3){
      data_ventas = ventas;
    }else { 
      data = find_in_object(JSON.parse(ventas), {CodigoTemporada: temporadaok});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      data_ventas = JSON.stringify(data);
    }
    fnCallbackAjax(function(agri){
      data_server = agri;
      myFunction();
      obtener_bodegas(function(cultivo){
        console.log(cultivo);
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
      var ii=0;
      var jj=0

      obtener_idioma(function(idioma){
        obtener_role(function(rol){
          if (rol == "Administrador") {
            var miJSON = JSON.parse(data_server);
            if(idioma =="en"){
              $("#filtro").append('<option id="option2" value="'+idagricultor+'"> -- Select an option -- </option>');
              $("#filtro").append('<option id="filter_agricultor" value="'+idagricultor+'">No Filter</option>');
            }else if(idioma =="es"){
              $("#filtro").append('<option id="option2" value="'+idagricultor+'"> -- Selecciona una opción -- </option>');
              $("#filtro").append('<option id="filter_agricultor" value="'+idagricultor+'">Sin Filtro</option>');
            }
            $( "#filtro" ).change(function() {
              $("select option:selected").val();
            }).trigger( "change" );

            var codigos_embarques="";
            var miJSON2 = agri;
            for(var i in miJSON) {
              var regex = new RegExp('\\b' + miJSON[i].CodigoAgricultor + '\\b');
              if(codigos_embarques.search(regex) < 0){
                $("#filtro").append('<option value="'+miJSON[i].CodigoAgricultor+'">'+miJSON[i].Nombre+'</option>');
                codigos_embarques += miJSON[i].CodigoAgricultor +",";
              }           
            }
          }else{
            var miJSON = agri;
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
            }).trigger( "change" );

            var result = JSON.parse(data_server);
            var res2 = _.groupBy(result, 'CodigoAgricultor')
            $.each(res2, function(i, item) {
              for(ii in miJSON.agricultores) {
                if (i == miJSON.agricultores[ii].codigoAgricultor )  {   
                  $("#filtro").append('<option value="'+miJSON.agricultores[ii].codigoAgricultor+'">'+miJSON.agricultores[ii].nombre+'</option>');          
                }
              }
            })
          }
        })       
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
    obtener_season(function(temporada){
      var idagricultor=""
      obtener_idioma(function(idioma){
        $("#season").html('');  
        var miJSON = JSON.parse(temporada);
        for(var i in miJSON) {
          if(idagricultor.indexOf(miJSON[i].CodigoTemporada) < 0){  
            idagricultor += miJSON[i].CodigoTemporada +",";
          }
        }
        if(idioma =="en"){
          $("#season").append('<option id="option_s" value="'+idagricultor+'"> -- Select an option -- </option>');
          $("#season").append('<option id="filter_season" value="'+idagricultor+'">No Filter</option>');
        }else if(idioma =="es"){
          $("#season").append('<option id="option_s" value="'+idagricultor+'"> -- Selecciona una opción -- </option>');
          $("#season").append('<option id="filter_season" value="'+idagricultor+'">Sin Filtro</option>');
        }

        for(var i in miJSON) {                      
          if ($('#season option:contains('+ miJSON[i].CodigoTemporada +')').length) {
          }
          else{         
            $("#season").append('<option value="'+miJSON[i].CodigoTemporada+'">'+miJSON[i].NombreTemporada+'</option>');
          }
        }  
      })             
    })
    obtener_cultivos(function(cultivo){
      console.log(cultivo);
      obtener_idioma(function(idioma){
        $("#cultivo").html('');
        var miJSON = cultivo;
        if(idioma =="en"){
          $("#cultivo").append('<option id="option_c" value="todo"> -- Select an option -- </option>');
          $("#cultivo").append('<option id="filter_cultivos" value="todo">All</option>');
        }if(idioma =="es"){
          $("#cultivo").append('<option id="option_c" value="todo"> -- Selecciona una opción -- </option>');
          $("#cultivo").append('<option id="filter_cultivos" value="todo">Todo</option>');
        }


        var res2 = _.groupBy(data_server_filtro_agricultor, 'Cultivo')   
        for(j in data_server_filtro_agricultor) {           
          for(ii in miJSON) {
            if (data_server_filtro_agricultor[j].Cultivo == miJSON[ii].NombreEspanol) {
              if ($('#cultivo option:contains('+ miJSON[ii].NombreEspanol +')').length) {
              }else{$("#cultivo").append('<option value="'+miJSON[ii].NombreEspanol+'">'+miJSON[ii].NombreEspanol+'</option>');}  
            }
          }          
        }

        if(idioma =="en"){
          $("#contract").append('<option id="" value="All"> -- Select an option -- </option>');
          $("#contract").append('<option id="" value="All">No Filter</option>');
          $("#contract").append('<option id="" value="true">Yes</option>');
          $("#contract").append('<option id="" value="false">No</option>');
        }else if(idioma =="es"){
          $("#contract").append('<option id="" value=""> -- Selecciona una opción -- </option>');
          $("#contract").append('<option id="" value="">Sin Filtro</option>');
        }
        console.log("Agricultores cargado con éxito");
        $.unblockUI();
        showPage();
        
      })
    })
  })

});



//END DOCUMENT READY

//Petición para obtener TEMPORADAS
function obtener_season(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/temporadas.php',
    success:function(data){
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


//Petición para obtener Ventas
function obtener_ventas(callbackData) {
  $("#main").css("opacity", "0.1");
  $.ajax({
    type: 'GET',
    url: 'recursos/facturas-ventas.php',
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
var sales ="";
function tabla(ventas){
  var frontera="";
  obtener_idioma(function(idioma){
    /*var sales = ventas;*/
    $("#tabla").html(""); 
    var html="";
    /*sales = _.groupBy(ventas, 'Frontera');*/
    var sales = _.groupBy(ventas, function(d) {
      return d.Frontera + "-" + d.Cultivo;
    });
    
    var sumtotal_cantidad =0;

    var total_cantidad_json = 0;
    var total_CantidadSinFacturar_json = 0;
    var total_CantidadFacturado_json = 0;
    var total_ImporteLiquidado_json= 0 ;
    var total_ImporteFacturado_json = 0;

    var total_precio_facturado_json = 0;
    var total_precio_liquidado_json=0;

    $.each(sales, function(i, item) {
      for (var j = 0; j < item.length; j++) {
        //TOTALES JSON
        total_cantidad_json = total_cantidad_json + item[j].Cantidad;
        total_CantidadSinFacturar_json = total_CantidadSinFacturar_json + item[j].CantidadSinFacturar;
        total_CantidadFacturado_json = total_CantidadFacturado_json + item[j].CantidadFacturado;

        total_ImporteLiquidado_json = total_ImporteLiquidado_json + item[j].ImporteLiquidado;
        total_ImporteFacturado_json = total_ImporteFacturado_json + item[j].ImporteFacturado;
      }
      total_precio_facturado_json = total_ImporteFacturado_json/total_CantidadFacturado_json;
      total_precio_liquidado_json =total_ImporteLiquidado_json / total_CantidadFacturado_json;
    })

    html+="<table border='1|1' class='table table-striped table-bordered display total-blue'>";
    html+="<thead>";
    if(idioma == "en"){
      html+="<th class='white'><button class='show btn btn-primary btn-block'>Expand all</button></th>";
    }else if(idioma == "es"){
      html+="<th class='white'><button class='show btn btn-primary btn-block'>Expandir</button></th>";
    }
    html+="<th class='white'></th>";
    html+="<th class='white'></th>";
    html+="<th>Total</th>";
    html+="<th>"+numberWithCommas(total_cantidad_json)+"</th>";
    html+="<th>"+numberWithCommas(total_CantidadSinFacturar_json)+"</th>";
    html+="<th>"+numberWithCommas(total_CantidadFacturado_json)+"</th>";

    html+="<th>"+numberWithCommas(total_precio_facturado_json,2)+"</th>";
    html+="<th>"+numberWithCommas(total_precio_liquidado_json,2)+"</th>";
    html+="<th>"+numberWithCommas(total_ImporteLiquidado_json,2)+"</th>";
    html+="</tr>";
    html+="</thead>";
    html+="</table>";


    $.each(sales, function(i, item) {
      frontera = i;
      var sum_cantidad  =0;
      var sumtotal_importe = 0 ;
      var avg_price = 0;

      var no_invoiced = 0;
      var invoiced = 0;

      var invoiced_price=0;
      var final_total_price = 0;
      var final_total_amount = 0;
      var final_price = 0;
      var final_amount = 0;

      var sumtotal_cantidad_sin_facturar = 0;
      var sumtotal_cantidad_facutrado = 0;

      var sum_cantidad_frontera=0;
      var sum_no_invoiced_frontera=0;
      var sum_invoiced_frontera=0;
      var sum_cantidad_facturado_frontera = 0;

      var precio_facturado = 0;


      
      //TOTALES
      for (var j = 0; j < item.length; j++) {
        //TOTALES JSON
        sumtotal_cantidad = sumtotal_cantidad + item[j].Cantidad;
        sumtotal_cantidad_sin_facturar = sumtotal_cantidad_sin_facturar + item[j].CantidadSinFacturar;
        sumtotal_cantidad_facutrado = sumtotal_cantidad_facutrado + item[j].CantidadFacturado;

        sumtotal_importe = sumtotal_importe + item[j].Importe;
        final_total_price = final_total_price + item[j].ImporteLiquidado;
        final_total_amount = final_total_amount + item[j].ImporteFacturado;

        //TOTALES FRONTERA
        sum_cantidad_frontera = sum_cantidad_frontera + item[j].Cantidad;
        sum_no_invoiced_frontera = sum_no_invoiced_frontera + item[j].ImporteLiquidado;
        sum_invoiced_frontera = sum_invoiced_frontera + item[j].ImporteFacturado;        
      }

      total_precio_facturado = final_total_amount/sumtotal_cantidad_facutrado;
      total_precio_liquidado =final_total_price / sumtotal_cantidad_facutrado;     

      html+="<table border='1|1' class='table table-striped table-bordered display'>";
      html+="<thead>";
      html+="<tr>";

      if(idioma == "en"){
        html+="<th>"+"Loads"+"</th>";
        html+="<th>"+"Commodity"+"</th>";
        html+="<th>"+"Shipment Date"+"</th>";
        html+="<th>"+"Reception Date"+"</th>";
        html+="<th>"+"Quantity"+"</th>";
        html+="<th>"+"No Invoiced"+"</th>";
        html+="<th>"+"Invoiced"+"</th>";

        html+="<th>"+"Invoiced Price"+"</th>";
        html+="<th>"+"Final Price"+"</th>";
        html+="<th>"+"Final Amount"+"</th>";

      }else if(idioma == "es"){
        html+="<th>"+"Carga"+"</th>";
        html+="<th>"+"Cultivo"+"</th>";
        html+="<th>"+"Embarque"+"</th>";
        html+="<th>"+"Recepción"+"</th>";
        html+="<th>"+"Cantidad"+"</th>";
        html+="<th>"+"Sin facturar"+"</th>";
        html+="<th>"+"Facturado"+"</th>";

        html+="<th>"+"Precio Facturado"+"</th>";
        html+="<th>"+"Precio liquidado"+"</th>";
        html+="<th>"+"Importe liquidado"+"</th>";
      }

      html+="</tr>";
      html+="</thead>";
      html+="<tbody>";


      html+="<tr id='border' class='blue parent'>";
      if(idioma == "en"){
        html+="<td>Border: </td>";
      }if(idioma == "es"){
        html+="<td>Frontera: </td>";
      }
      html+="<td>"+item[0].Frontera+"</td>";
      html+="<td ></td>";
      html+="<td>Total</td>";
      html+="<td>"+numberWithCommas(sumtotal_cantidad,2)+"</td>";
      html+="<td>"+numberWithCommas(sumtotal_cantidad_sin_facturar,2)+"</td>";
      html+="<td>"+numberWithCommas(sumtotal_cantidad_facutrado,2)+"</td>";

      html+="<td>"+numberWithCommas(total_precio_facturado,2)+"</td>";
      html+="<td>"+numberWithCommas(total_precio_liquidado,2)+"</td>";
      html+="<td>"+numberWithCommas(final_total_price,2)+"</td>";
      html+="</tr>"; 

      var sum_cantidad_frontera_beige=0;
      var sum_sin_facturar_beige = 0;
      var sum_facturado_beige = 0;

      var sum_precio_facturado_beige=0;
      var sum_precio_liquidado_beige=0;

      var sum_precio_facturado_beige_2 =0;

      var sale = _.groupBy(sales[frontera], function(d) {
        return /*d.CodigoCarga + "-" +  d.Producto  + "-" + */d.CodigoCarga;
      });

      $.each(sale, function(i,item) {
        sum_sin_facturar_beige=0;
        sum_cantidad_frontera_beige=0;
        sum_facturado_beige=0;
        sum_precio_facturado_beige=0;
        sum_precio_liquidado_beige=0;
        var precio_facturado = 0;
        var precio_liquidado = 0;
        final_amount=0;
        final_amount2=0;

        total_ImporteLiquidado_json2= 0;
        total_ImporteFacturado_json2= 0;
        total_precio_facturado_json2= 0;
        total_precio_liquidado_json2= 0;
        sum_cantidad_frontera_beige2=0;
        sum_cantidad_facturado_frontera=0;
        sum_sin_facturar_beige=0;

        for (var j = 0; j < item.length; j++) {

          final_amount2 = final_amount2 + item[j].ImporteLiquidado;

          precio_facturado = item[j].ImporteFacturado / item[j].CantidadFacturado;
          precio_liquidado = item[j].ImporteLiquidado / item[j].CantidadFacturado;

          sum_invoiced_frontera = sum_invoiced_frontera + item[j].ImporteFacturado;
          sum_cantidad_facturado_frontera = sum_cantidad_facturado_frontera + item[j].CantidadFacturado;
          sum_sin_facturar_beige = sum_sin_facturar_beige + item[j].CantidadSinFacturar;

          total_ImporteLiquidado_json2 = total_ImporteLiquidado_json2 + item[j].ImporteLiquidado;
          total_ImporteFacturado_json2 = total_ImporteFacturado_json2 + item[j].ImporteFacturado;
          sum_cantidad_frontera_beige2 = sum_cantidad_frontera_beige2 + item[j].Cantidad;
        }
        total_precio_facturado_json2 = total_ImporteFacturado_json2/sum_cantidad_frontera_beige2;
        total_precio_liquidado_json2 =total_ImporteLiquidado_json2 / sum_cantidad_frontera_beige2;

        var json_producto = _.groupBy(item, function(d) {
          return d.FechaEmbarque + "-" +  d.Producto;
        });
        $.each(json_producto, function(i,item) {
          sum_cantidad_frontera_beige=0;
          sum_precio_facturado_beige=0;
          sum_precio_liquidado_beige=0;
          sum_facturado_beige=0;
          sum_invoiced_frontera=0;
          final_amount=0;
          sum_sin_facturar_beige2=0;

          for (var j = 0; j < item.length; j++) {
            final_amount = final_amount + item[j].ImporteLiquidado;
            sum_invoiced_frontera = sum_invoiced_frontera + item[j].ImporteFacturado;

            sum_cantidad_frontera_beige = sum_cantidad_frontera_beige + item[j].Cantidad;
            sum_facturado_beige = sum_facturado_beige + item[j].CantidadFacturado;

            sum_precio_facturado_beige = item[j].ImporteFacturado / item[j].Cantidad;
            sum_precio_liquidado_beige = item[j].ImporteLiquidado / item[j].Cantidad;
            sum_sin_facturar_beige2 = sum_sin_facturar_beige2 + item[j].CantidadSinFacturar;
          }
          html+="<tr class='data-total parent tr-white'>";
          html+="<td>"+item[0].CodigoCarga;+"</td>";
          html+="<td>"+item[0].Producto;+"</td>";
          html+="<td>"+item[0].FechaEmbarque;+"</td>";
          html+="<td>"+item[0].FechaRecepcion;+"</td>";
          html+="<td>"+numberWithCommas(sum_cantidad_frontera_beige,2)+"</td>";
          html+="<td>"+numberWithCommas(sum_sin_facturar_beige2,2)+"</td>";
          html+="<td>"+numberWithCommas(sum_facturado_beige,2)+"</td>";

          html+="<td>"+numberWithCommas(sum_precio_facturado_beige,2)+"</td>";
          html+="<td>"+numberWithCommas(sum_precio_liquidado_beige,2)+"</td>";
          html+="<td>"+numberWithCommas(final_amount,2)+"</td>";
          html+="</tr>";  

          for (var j = 0; j < item.length; j++) {

            final_price = final_price + item[j].PrecioLiquidado;
            final_amount = final_amount + item[j].ImporteLiquidado;

            sum_invoiced_frontera = sum_invoiced_frontera + item[j].ImporteFacturado;
            sum_cantidad_facturado_frontera = sum_cantidad_facturado_frontera + item[j].CantidadFacturado;

            precio_facturado = item[j].ImporteFacturado / item[j].CantidadFacturado;
            precio_liquidado = item[j].ImporteLiquidado / item[j].CantidadFacturado;

            sum_cantidad_frontera_beige = sum_cantidad_frontera_beige + item[j].Cantidad;
            sum_sin_facturar_beige = sum_sin_facturar_beige + item[j].CantidadSinFacturar;
            sum_facturado_beige = sum_facturado_beige + item[j].CantidadFacturado;

            sum_precio_facturado_beige = sum_invoiced_frontera / sum_cantidad_facturado_frontera;
            sum_precio_liquidado_beige = final_amount / sum_cantidad_facturado_frontera;           

            html+="<tr class='data-single   blue-light'>";
            html+="<td class='white'></td>";
            html+="<td class='white'></td>";
            if(idioma == "en"){
              html+="<td>Inovoice Date: "+item[j].FechaRecepcion+"</td>";
            }if(idioma == "es"){
              html+="<td>Fecha Factura: "+item[j].FechaRecepcion+"</td>";
            }
            html+="<td></td>";
            html+="<td>"+item[j].Cantidad;+"</td>";
            html+="<td>"+item[j].CantidadSinFacturar;+"</td>";
            html+="<td>"+item[j].CantidadFacturado;+"</td>";
            html+="<td>"+numberWithCommas(precio_facturado,2)+"</td>";
            html+="<td>"+numberWithCommas(total_precio_liquidado_json2,2)+"</td>";
            html+="<td>"+numberWithCommas(item[j].ImporteLiquidado,2)+"</td>";
            html+="</tr>";        

          }   

        })
        html+="<tr class='parent beige'>";
        html+="<td class='white'></td>";
        html+="<td class='white'></td>";
        html+="<td>Total</td>";
        html+="<td></td>";
        html+="<td >"+numberWithCommas(sum_cantidad_frontera_beige2)+"</td>";
        html+="<td>"+numberWithCommas(sum_sin_facturar_beige)+"</td>";
        html+="<td>"+numberWithCommas(sum_cantidad_facturado_frontera)+"</td>";

        html+="<td>"+numberWithCommas(total_precio_facturado_json2,2)+"</td>";
        html+="<td>"+numberWithCommas(total_precio_liquidado_json2,2)+"</td>";
        html+="<td>"+numberWithCommas(final_amount2,2)+"</td>";
        html+="</tr>";  

      })

html+="</tbody>";
html+="</table>";

$("#tabla_loads").html(html); 
})
$('table.table').each(function() {
  var $table = $(this);
  $table.find('.parent').click(function() {
    $(this).nextUntil('.parent').toggle();
  });

  var $childRows = $table.find('tbody tr').not('.parent').hide();

  /*$table.find('button.show').click(function() {
    $childRows.toggle();
  });*/
});

$('button.show').click(function(){
  // see if they are all shown
  var children = $('table tr.blue-light').length;
  var visibleChildren = $('table tr.blue-light:visible').length;
  if(children == visibleChildren) { // all the trs are shown
    $('table tr.blue-light').css('display', 'none');
    if(idioma == "en"){
      $("button.show").text("Expand all");
    } else if(idioma == "es"){
      $("button.show").text("Expandir");
    }
  }
  else {
    $('table tr.blue-light').css('display', 'table-row');
    if(idioma == "en"){
      $("button.show").text("Collapse");
    } else if(idioma == "es"){
      $("button.show").text("Contraer");
    } 
  }
});

})

}

/*var numberWithCommas = function(x) {*/
  function numberWithCommas(amount, decimals) {
     amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
      return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
    regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
  }


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

//Petición para obtener TEMPORADA
function obtener_temporada(callbackData) {
  $.ajax({
    type: 'GET',
    url: 'recursos/obtener_temporada.php',
    success:function(data){
      callbackData(data);
    },
  }); 
}

$("#season").change(function(){
  $.blockUI({ 
    message: '',
    overlayCSS:  { 
      backgroundColor: '#fff', 
      opacity:         0.6, 
      cursor:          'wait' 
    }, 
  }); 
  var temporada = $("#season option:selected").val();
  var temporada_text = ($(this).find("option:selected").text());

  cultivo = $("#cultivo option:selected").val();
  bodega = $("#bodega option:selected").val();

  $.ajax({
    type: "POST",
    url: "recursos/setTemporada.php",
    data: { setTemporada : temporada, text : temporada_text} 
  }).done(function(data){

    var my_json = JSON.parse(data_server)
    if (cultivo == "todo" && bodega == "todo"  && document.getElementById("season").selectedIndex == 0 || document.getElementById("season").selectedIndex == 1) {
      tabla(data_server_filtro_agricultor);
    }else if (temporada.length < 3 && cultivo == "todo" && bodega == "todo") {

      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {CodigoTemporada: temporada});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      tabla(filtered_json);
    }else if (bodega != "todo" && cultivo == "todo" && document.getElementById("season").selectedIndex == 0 || document.getElementById("season").selectedIndex == 1 ) {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {NombreBodega: bodega});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      tabla(filtered_json);
    }else if (bodega == "todo" && cultivo != "todo" && document.getElementById("season").selectedIndex == 0 || document.getElementById("season").selectedIndex == 1 ) {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {Cultivo: cultivo});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }
      
      tabla(filtered_json);
    }
    else if (bodega == "todo" && cultivo == "todo" && season != "todo") {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {CodigoTemporada: season});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }

      tabla(filtered_json);
    }else if (bodega =! "todo" && cultivo != "todo" && document.getElementById("season").selectedIndex == 0 || document.getElementById("season").selectedIndex == 1 ) {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {Cultivo: cultivo, NombreBodega: bodega});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          })
        });
      }
      s
      tabla(filtered_json);
    }
    else if (bodega == "todo" && cultivo != "todo" && season != "todo") {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {Cultivo: cultivo, CodigoTemporada: season});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }

      tabla(filtered_json);
    }
    else if (bodega != "todo" && cultivo == "todo" && season != "todo") {
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {NombreBodega: bodega, CodigoTemporada: season});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }

      tabla(filtered_json);
    }
    else{
      var json= JSON.stringify(data_server_filtro_agricultor);
      var filtered_json = find_in_object(JSON.parse(json), {NombreBodega: bodega, Cultivo: cultivo, CodigoTemporada: season});
      function find_in_object(my_object, my_criteria){
        return my_object.filter(function(obj) {
          return Object.keys(my_criteria).every(function(c) {
            return obj[c] == my_criteria[c];
          });
        });
      }

      tabla(filtered_json);
    }
    $.unblockUI();
    showPage();
  })
})


$("#bodega").change(function(){
  $.blockUI({ 
    message: '',
    overlayCSS:  { 
      backgroundColor: '#fff', 
      opacity:         0.6, 
      cursor:          'wait' 
    }, 
  }); 

  bodega = $("#bodega option:selected").val();
  cultivo = $("#cultivo option:selected").val();
  /*  var my_json = JSON.parse(data_server)*/
  if (bodega == "todo" && cultivo == "todo") {
    tabla(data_server_filtro_agricultor);
  }else
  if (bodega != "todo" && cultivo == "todo") {
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {Frontera: bodega});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }else
  if (bodega == "todo" && cultivo != "todo") {
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {Cultivo: cultivo});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }

  else{
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {Frontera: bodega, Cultivo: cultivo});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }
  $.unblockUI();
  showPage();
})

$("#cultivo").change(function(){
  $.blockUI({ 
    message: '',
    overlayCSS:  { 
      backgroundColor: '#fff', 
      opacity:         0.6, 
      cursor:          'wait' 
    }, 
  }); 
  bodega = $("#bodega option:selected").val();
  cultivo = $("#cultivo option:selected").val();

  var my_json = JSON.parse(data_ventas)
  if (bodega == "todo" && cultivo == "todo") {
    tabla(data_server_filtro_agricultor);
  }else
  if (bodega == "todo" && cultivo != "todo") {
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {Cultivo: cultivo});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }else if (bodega != "todo" && cultivo == "todo") {
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {NombreBodega:bodega});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }
  else{
    var json= JSON.stringify(data_server_filtro_agricultor);
    var filtered_json = find_in_object(JSON.parse(json), {NombreBodega: bodega, Cultivo: cultivo});
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }

    tabla(filtered_json);
  }
  $.unblockUI();
  showPage();
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


$('.Mostrar_Tabla').on('click',function(){
  if ($(this).next().is(":visible")) {
    console.log($(this).next());
    $(this).next().css('display', 'none');
  }
  else 
  {
    console.log($(this).next());
    $(this).next().css('display', 'block');
  }
})




$(document).ready(function() {

});