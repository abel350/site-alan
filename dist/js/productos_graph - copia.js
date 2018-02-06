/*var data_server = $.ajax({
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
}).responseText;*/


var data_server;
fnCallbackAjax(function(agri){
	data_server = agri;
})

var v_etiqueta=null;
var v_sales=null;
var v_etiqueta_sales=null; 
var v_codigos=null; 
var v_commodity=null;

$( document ).ready(function() {
	myFunction();
	var idagricultor="";
	var ii=0;
	var jj=0;
	obtener_agricultores(function(agri){
		obtener_idioma(function(idioma){
			obtener_role(function(rol){
				if (rol == "Administrador") {
					var miJSON = JSON.parse(data_server);
					console.log(miJSON);
					for(var i in miJSON) {
						if(idagricultor.indexOf(miJSON[i].CodigoAgricultor) < 0){	
							idagricultor += miJSON[i].CodigoAgricultor +",";
						}
						
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

					var codigos_embarques="";
					var miJSON2 = agri;
					for(var i in miJSON) {
						if(codigos_embarques.indexOf(miJSON[i].CodigoAgricultor) < 0){
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

				$("#spanish").html( "Español");
				$("#english").html( "Inglés");
			}
			for(var i in miJSON) {                        
				$("#bodega").append('<option value="'+miJSON[i].codigo+'">'+miJSON[i].nombre+'</option>');
			}  
		})             
	})



}); //END DOCUMENT READY



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
			data_server_filtro_agricultor = JSON.parse(data_server);
			datosgraph(data_server_filtro_agricultor);
			tabla(data_server_filtro_agricultor);
		}else{
			data_server_filtro_agricultor = find_in_object(JSON.parse(data_server), {CodigoAgricultor: id});
			function find_in_object(my_object, my_criteria){
				return my_object.filter(function(obj) {
					return Object.keys(my_criteria).every(function(c) {
						return obj[c] == my_criteria[c];
					});
				});
			}
			datosgraph(data_server_filtro_agricultor);
			tabla(data_server_filtro_agricultor);
		}

		console.log("Agricultores cargado con éxito");
		obtener_cultivos(function(cultivo){
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
				//$.each(res2, function(i, item) {
					for(j in data_server_filtro_agricultor) {

						var sumtotal_cantidad  =0;
						var sumtotal_importe = 0 ;
						var avg_price = 0;
						var sum_embarcado = 0;
						var sum_recibido = 0;
						var sum_disponible = 0;
						var sum_ordenado = 0;
						var sum_despachado = 0;
						var sum_total_despachado = 0;
						var sum_total_embarcado = 0;
						var sum_total_recibido = 0;
						var sum_total_ordenado = 0;
						var sum_total_ordered = 0;

						sum_total_ordered = sum_total_ordered + data_server_filtro_agricultor[j].OrdenadoAgricultor;
						sum_total_embarcado = sum_total_embarcado + data_server_filtro_agricultor[j].Embarcado;
						sum_total_despachado = sum_total_despachado + data_server_filtro_agricultor[j].Despachado; 
						sum_total_ordenado = sum_total_ordenado + data_server_filtro_agricultor[j].Ordenado;
						sum_total_recibido = sum_total_recibido + data_server_filtro_agricultor[j].Recibido;
						sum_despachado = sum_despachado + data_server_filtro_agricultor[j].DespachadoHOY;
						sum_recibido = sum_recibido + data_server_filtro_agricultor[j].RecibidoHOY;
						sum_embarcado =sum_embarcado +(data_server_filtro_agricultor[j].Embarcado-data_server_filtro_agricultor[j].Recibido);
						sum_ordenado = sum_ordenado + (data_server_filtro_agricultor[j].Ordenado-data_server_filtro_agricultor[j].Despachado);

						if(sum_embarcado > 0 || sum_recibido > 0 || sum_disponible > 0 || sum_total_ordered > 0 || sum_ordenado > 0 || data_server_filtro_agricultor[j].DespachadoHOY > 0 || sum_total_ordered > 0){
							for(ii in miJSON) {
								if (data_server_filtro_agricultor[j].Cultivo == miJSON[ii].NombreIngles) {
									if ($('#cultivo option:contains('+ miJSON[ii].NombreIngles +')').length) {
									}else{$("#cultivo").append('<option value="'+miJSON[ii].NombreIngles+'">'+miJSON[ii].NombreIngles+'</option>');}	
								}
							}
						}
					}

			//})
			$.unblockUI();
			showPage();
		})              
		})
    //});
})
});


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var color = Chart.helpers.color;
var barChartData = {}; 


//Petición para datos de gráfica y tabla
function fnCallbackAjax(callbackData) {
	$("#main").css("opacity", "0.1");
	$.ajax({
		type: 'GET',
		url: 'recursos/graph.php',
		beforeSend: function () {
		},
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
    //url: 'dist/js/json.txt',
    //dataType:'json',
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

function tabla(data){
	$("#tabla").html(""); 
	var res2 = _.groupBy(data, 'Cultivo');
	var html="";
	obtener_idioma(function(idioma){
		obtener_precios(function(precios){
			var precio="";
			$.each(res2, function(i, item) {
				var sumtotal_cantidad  =0;
				var sumtotal_importe = 0 ;
				var avg_price = 0;
				var sum_embarcado = 0;
				var sum_recibido = 0;
				var sum_disponible = 0;
				var sum_ordenado = 0;
				var sum_despachado = 0;
				var sum_total_despachado = 0;
				var sum_total_embarcado = 0;
				var sum_total_recibido = 0;
				var sum_total_ordenado = 0;
				var sum_total_ordered  = 0;  



				for (var j = 0; j < item.length; j++) {
					sum_total_ordered = sum_total_ordered + item[j].OrdenadoAgricultor;
					sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
					sum_total_despachado = sum_total_despachado + item[j].Despachado; 
					sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
					sum_total_recibido = sum_total_recibido + item[j].Recibido;
					sum_despachado = sum_despachado + item[j].DespachadoHOY;
					sum_recibido = sum_recibido + item[j].RecibidoHOY;
					sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
					sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
				}
				sum_disponible = sum_total_recibido-(sum_total_ordered+sum_total_ordenado);

				if(idioma =="en"){
					html+="<table border='1|1' class='table table-striped table-bordered display'>";
					html+="<CAPTION><div class='cultivo'><h5><strong>"+i+"</h5></strong></div></CAPTION>";
					html+="<thead>";
					html+="<tr>";

					html+="<th id='lt_commodity'>"+"Commodity"+"</th>";
					html+="<th id='lt_transit'>"+"In Transit"+"</th>";
					html+="<th id='lt_received'>"+"Received today"+"</th>";
					html+="<th id='lt_available'>"+"Available"+"</th>";
					html+="<th id='lt_ordered'>"+"Ordered"+"</th>";
					html+="<th id='lt_assigned'>"+"Assigned"+"</th>";
					html+="<th id='lt_dispatched'>"+"Dispatched today"+"</th>";

					html+="<th id='lt_price' class='precioavg_header'>"+"Avg Price"+"</th>";
					html+="<th id='lt_total_shipped'>"+"Total Shipped"+"</th>";
					html+="<th id='lt_total_dispatched'>"+"Total Dispatched"+"</th>";
				}else if(idioma == "es"){
					html+="<table border='1|1' class='table table-striped table-bordered display'>";
					html+="<CAPTION><div class='cultivo'><h5><strong>"+i+"</h5></strong></div></CAPTION>";
					html+="<thead>";
					html+="<tr>";

					html+="<th id='lt_commodity'>"+"Cultivo"+"</th>";
					html+="<th id='lt_transit'>"+"En Transito"+"</th>";
					html+="<th id='lt_received'>"+"Recibido hoy"+"</th>";
					html+="<th id='lt_available'>"+"Disponible"+"</th>";
					html+="<th id='lt_ordered'>"+"Ordenado"+"</th>";
					html+="<th id='lt_assigned'>"+"Asignado"+"</th>";
					html+="<th id='lt_dispatched'>"+"Despachado hoy"+"</th>";

					html+="<th id='lt_price' class='precioavg_header'>"+"Precio promedio"+"</th>";
					html+="<th id='lt_total_shipped'>"+"Total Embarcado"+"</th>";
					html+="<th id='lt_total_dispatched'>"+"Total Despachado"+"</th>";
				}
				html+="<th></th>";
				html+="</tr>";
				html+="</thead>";
				html+="<tbody>"; 

				html+="<tr>";
				html+="<td>"+i+"</td>";
				html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
				html+="<td class='gray'>"+numberWithCommas(sum_recibido)+"</td>";
				html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
				html+="<td>"+numberWithCommas(sum_total_ordered)+"</td>";
				html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
				html+="<td class='gray'>"+numberWithCommas(sum_despachado)+"</td>";


				var my_json = JSON.parse(precios);
				var filtered_json = find_in_object(JSON.parse(precios), {Cultivo: i});

				function find_in_object(my_object, my_criteria){
					return my_object.filter(function(obj) {
						return Object.keys(my_criteria).every(function(c) {
							return obj[c] == my_criteria[c];
						});
					});
				}
				precio = filtered_json;

				for(ii in precio) {
					for (var m = 0; m < precio.length; m++) {
						if(sum_embarcado > 0 || sum_recibido > 0 || sum_disponible > 0 || sum_total_ordered > 0 || sum_ordenado > 0 || item[m].DespachadoHOY > 0 || sum_total_ordered > 0){
							sumtotal_cantidad = sumtotal_cantidad + precio[m].Cantidad;
							sumtotal_importe = sumtotal_importe + precio[m].Importe;
						}

					}
				}
				if (sumtotal_importe == 0 || sumtotal_cantidad == 0 ){
					avg_price = "-";
					html+="<td class='precioavg_cell'>"+avg_price+"</td>";


				}else{
					avg_price = sumtotal_importe.toFixed(4)/sumtotal_cantidad;
					html+="<td class='precioavg_cell'>"+avg_price.toFixed(2)+"</td>";
				}

				html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
				html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";

				if(idioma == "en"){
					html+='<td><a data-toggle="modal" href="#stack2" class="boton btn btn-success" data-val="'+i+'">Detail</a></td>';
				}else  if(idioma == "es"){
					html+='<td><a data-toggle="modal" href="#stack2" class="boton btn btn-success" data-val="'+i+'">Detalle</a></td>';
				}
				html+="</tr>";
				html+="</tbody>";
				html+="</table>";
				$("#tabla").html(html);
			})

$("#tabla").on('click','a.boton', function() {
	var cult=null;
	cult = $(this).data('val');
	v_commodity = cult;
	tabla_tamano(res2,cult,precios);
})
})
})
}


function tabla_tamano(data, cultivos, precio_venta){
	var commodity = cultivos;

	$("#tabla_tamano").html(""); 
	var tamano = _.groupBy(data[cultivos], 'Etiqueta');
	var html="";
	var avg_price_tamano_tamano = 0;
	var precio_ventasss = precio_venta;

	obtener_idioma(function(idioma){
		var precio="";
		$.each(tamano, function(i, item) {
			var sumtotal_cantidad  =0;
			var sumtotal_importe = 0 ;
			var avg_price = 0;
			var sum_embarcado = 0;
			var sum_recibido = 0;
			var sum_disponible = 0;
			var sum_ordenado = 0;
			var sum_despachado = 0;
			var sum_total_despachado = 0;
			var sum_total_embarcado = 0;
			var sum_total_recibido = 0;
			var sum_total_ordenado = 0;
			var sum_total_ordered = 0;

			for (var j = 0; j < item.length; j++) {
				sum_total_ordered = sum_total_ordered + item[j].OrdenadoAgricultor;
				sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
				sum_total_despachado = sum_total_despachado + item[j].Despachado; 
				sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
				sum_total_recibido = sum_total_recibido + item[j].Recibido;
				sum_despachado = sum_despachado + item[j].DespachadoHOY;
				sum_recibido = sum_recibido + item[j].RecibidoHOY;
				sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
				sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
			}
			sum_disponible = sum_total_recibido-(sum_total_ordered+sum_total_ordenado);


			if(idioma == "en"){
				html+="<table border='1|1' class='table table-striped table-bordered display'>";
				html+="<CAPTION><div class='cultivo'><h5><strong>"+item[0].Etiqueta+" / "+cultivos+"</strong></h5></div></CAPTION>";
				html+="<thead>";
				html+="<tr>";

				html+="<th id=''>"+"Label"+"</th>";
				html+="<th id='lt_transit'>"+"In Transit"+"</th>";
				html+="<th id='lt_received'>"+"Received today"+"</th>";
				html+="<th id='lt_available'>"+"Available"+"</th>";
				html+="<th id='lt_ordered'>"+"Ordered"+"</th>";
				html+="<th id='lt_assigned'>"+"Assigned"+"</th>";
				html+="<th id='lt_dispatched'>"+"Dispatched today"+"</th>";

				html+="<th id='lt_price' class='precioavg_header'>"+"Avg Price"+"</th>";
				html+="<th id='lt_total_shipped'>"+"Total Shipped"+"</th>";
				html+="<th id='lt_total_dispatched'>"+"Total Dispatched"+"</th>";
			}else if(idioma == "es"){
				html+="<table border='1|1' class='table table-striped table-bordered display'>";
				html+="<CAPTION><div class='cultivo'><h5><strong>"+item[0].Etiqueta+" / "+cultivos+"</strong></h5></div></CAPTION>";
				html+="<thead>";
				html+="<tr>";

				html+="<th id=''>"+"Etiqueta"+"</th>";
				html+="<th id='lt_transit'>"+"En Transito"+"</th>";
				html+="<th id='lt_received'>"+"Recibido hoy"+"</th>";
				html+="<th id='lt_available'>"+"Disponible"+"</th>";
				html+="<th id='lt_ordered'>"+"Ordenado"+"</th>";
				html+="<th id='lt_assigned'>"+"Asignado"+"</th>";
				html+="<th id='lt_dispatched'>"+"Despachado hoy"+"</th>";

				html+="<th id='lt_price' class='precioavg_header'>"+"Precio promedio"+"</th>";
				html+="<th id='lt_total_shipped'>"+"Total Embarcado"+"</th>";
				html+="<th id='lt_total_dispatched'>"+"Total Despachado"+"</th>";
			}  
			html+="<th></th>";
			html+="</tr>";
			html+="</thead>";
			html+="<tbody>"; 

			html+="<tr>";
			html+="<td>"+i+"</td>";
			html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
			html+="<td class='gray'>"+numberWithCommas(sum_recibido)+"</td>";
			html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
			html+="<td>"+numberWithCommas(sum_total_ordered)+"</td>";
			html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
			html+="<td class='gray'>"+numberWithCommas(sum_despachado)+"</td>";

			var my_json = JSON.parse(precio_venta);
			var filtered_json = find_in_object(JSON.parse(precio_venta), {Cultivo: cultivos});

			function find_in_object(my_object, my_criteria){
				return my_object.filter(function(obj) {
					return Object.keys(my_criteria).every(function(c) {
						return obj[c] == my_criteria[c];
					});
				});
			}
			precio = filtered_json;

			for(ii in precio) {
				if(sum_embarcado > 0 || sum_recibido > 0 || sum_disponible > 0 || sum_total_ordered > 0 || sum_ordenado > 0 || sum_despachado > 0){
					for (var m = 0; m < precio.length; m++) {
						if (i == precio[m].Etiqueta){	

							sumtotal_cantidad = sumtotal_cantidad + precio[m].Cantidad;
							sumtotal_importe = sumtotal_importe + precio[m].Importe;
						}
						else{
							sumtotal_cantidad = sumtotal_cantidad + 0;
							sumtotal_importe = sumtotal_importe + 0;
						}
					}
				}
			}
			if (sumtotal_importe == 0 || sumtotal_cantidad == 0 ){
				avg_price = "-";
				html+="<td class='precioavg_cell'>"+avg_price+"</td>";
			}else{

				avg_price = sumtotal_importe.toFixed(4)/sumtotal_cantidad;
				html+="<td class='precioavg_cell'>"+avg_price.toFixed(2)+"</td>";
			}

			html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
			html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";
			if(idioma == "en"){
				html+="<td>"+"<input id='cultivo_t_l' type='text' value='"+i+"' style='display:none;'>"+
				'<a data-toggle="modal" href="#stack3" class="boton btn btn-success" data-val="' + i+ '">Detail</a>'
			}else if(idioma == "es"){
				html+="<td>"+"<input id='cultivo_t_l' type='text' value='"+i+"' style='display:none;'>"+
				'<a data-toggle="modal" href="#stack3" class="boton btn btn-success" data-val="' + i+ '">Detalle</a>'
			}
			html+="</tr>";
			html+="</tbody>";
			html+="</table>"; 
		})
$("#tabla_tamano").html(html);
})


$("#tabla_tamano").on('click','a.boton', function() {
	var etiqueta="";
	etiqueta =  $(this).data('val');
	v_etiqueta = etiqueta;
	tabla_tamano_etiqueta(tamano,etiqueta,commodity, precio_ventasss);
})

}

function tabla_tamano_etiqueta(data, etiqueta,cultivos, precio_ventasss){
	var commodity = cultivos;
	$("#tabla_tamano_etiqueta").html(""); 
	var etiqueta_sales = etiqueta;
	var codigos = "";
	var html;
	html="";
	var etiqueta = _.groupBy(data[etiqueta], 'Tamano');

	obtener_role(function(role){
		obtener_idioma(function(idioma){
			var precio="";
			$.each(etiqueta, function(i, item) {
				var sumtotal_cantidad  =0;
				var sumtotal_importe = 0 ;
				var avg_price = 0;
				var sum_embarcado = 0;
				var sum_recibido = 0;
				var sum_disponible = 0;
				var sum_ordenado = 0;
				var sum_despachado = 0;
				var sum_total_despachado = 0;
				var sum_total_embarcado = 0;
				var sum_total_recibido = 0;
				var sum_total_ordenado = 0;
				var sum_total_ordered  = 0;

				for (var j = 0; j < item.length; j++) {
					if(codigos.indexOf(item[j].CodigoCarga) < 0){	
						codigos+= item[j].CodigoCarga+",";
					}
					sum_total_ordered = sum_total_ordered + item[j].OrdenadoAgricultor;
					sum_total_embarcado = sum_total_embarcado + item[j].Embarcado;
					sum_total_despachado = sum_total_despachado + item[j].Despachado; 
					sum_total_ordenado = sum_total_ordenado + item[j].Ordenado;
					sum_total_recibido = sum_total_recibido + item[j].Recibido;
					sum_despachado = sum_despachado + item[j].DespachadoHOY;
					sum_recibido = sum_recibido + item[j].RecibidoHOY;
					sum_embarcado =sum_embarcado +(item[j].Embarcado-item[j].Recibido);
					sum_ordenado = sum_ordenado + (item[j].Ordenado-item[j].Despachado);
				}

				sum_disponible = sum_total_recibido-(sum_total_ordered+sum_total_ordenado);
				
				if(idioma == "en"){
					html+="<table border='1|1' class='table table-striped table-bordered display'>";
					html+="<CAPTION><div class='cultivo'><h5>"+cultivos+" / "+etiqueta_sales+" / " +i+"</h5></div></CAPTION>";
					html+="<thead>";
					html+="<tr>";

					html+="<th id=''>"+"Size"+"</th>";
					html+="<th id='lt_transit'>"+"In Transit"+"</th>";
					html+="<th id='lt_received'>"+"Received today"+"</th>";
					html+="<th id='lt_available'>"+"Available"+"</th>";
					html+="<th id='lt_ordered'>"+"Ordered"+"</th>";
					html+="<th id='lt_assigned'>"+"Assigned"+"</th>";
					html+="<th id='lt_dispatched'>"+"Dispatched today"+"</th>";

					html+="<th id='lt_price' class='precioavg_header'>"+"Avg Price"+"</th>";
					html+="<th id='lt_total_shipped'>"+"Total Shipped"+"</th>";
					html+="<th id='lt_total_dispatched'>"+"Total Dispatched"+"</th>";
				}else if(idioma == "es"){
					html+="<table border='1|1' class='table table-striped table-bordered display'>";
					html+="<CAPTION><div class='cultivo'><h5>"+cultivos+" / "+etiqueta_sales+" / " +i+"</h5></div></CAPTION>";
					html+="<thead>";
					html+="<tr>";

					html+="<th id=''>"+"Tamaño"+"</th>";
					html+="<th id='lt_transit'>"+"En Transito"+"</th>";
					html+="<th id='lt_received'>"+"Recibido hoy"+"</th>";
					html+="<th id='lt_available'>"+"Disponible"+"</th>";
					html+="<th id='lt_ordered'>"+"Ordenado"+"</th>";
					html+="<th id='lt_assigned'>"+"Asignado"+"</th>";
					html+="<th id='lt_dispatched'>"+"Despachado hoy"+"</th>";

					html+="<th id='lt_price' class='precioavg_header'>"+"Precio promedio"+"</th>";
					html+="<th id='lt_total_shipped'>"+"Total Embarcado"+"</th>";
					html+="<th id='lt_total_dispatched'>"+"Total Despachado"+"</th>";
				}
				if (role == "Administrador"){
					html+="<th></th>";
				}
				html+="</tr>";
				html+="</thead>";
				html+="<tbody>"; 

				html+="<tr>";
				html+="<td>"+i+"</td>";
				html+="<td>"+numberWithCommas(sum_embarcado);+"</td>";
				html+="<td class='gray'>"+numberWithCommas(sum_recibido)+"</td>";
				html+="<td>"+numberWithCommas(sum_disponible)+"</td>";
				html+="<td>"+numberWithCommas(sum_total_ordered)+"</td>";
				html+="<td>"+numberWithCommas(sum_ordenado)+"</td>";
				html+="<td class='gray'>"+numberWithCommas(sum_despachado)+"</td>";

				var my_json = JSON.parse(precio_ventasss);
				var filtered_json = find_in_object(JSON.parse(precio_ventasss), {Cultivo: cultivos, Etiqueta: etiqueta_sales, Tamano:i});

				function find_in_object(my_object, my_criteria){
					return my_object.filter(function(obj) {
						return Object.keys(my_criteria).every(function(c) {
							return obj[c] == my_criteria[c];
						});
					});
				}
				precio = filtered_json;


				for(ii in precio) {
					for (var m = 0; m < precio.length; m++) {
						if (item[0].Tamano == precio[m].Tamano){
							if(sum_embarcado > 0 || sum_recibido > 0 || sum_disponible > 0 || sum_total_ordered > 0 || sum_ordenado > 0 || item[m].DespachadoHOY > 0){
								sumtotal_cantidad = sumtotal_cantidad + precio[m].Cantidad;
								sumtotal_importe = sumtotal_importe + precio[m].Importe;
							}
						}
					}
				}
				if (sumtotal_importe == 0 || sumtotal_cantidad == 0 ){
					avg_price = "-";
					html+="<td>"+avg_price+"</td>";


				}else{
					avg_price = sumtotal_importe.toFixed(4)/sumtotal_cantidad;
					html+="<td class='precioavg_cell'>"+avg_price.toFixed(2)+"</td>";
				}

				html+="<td>"+numberWithCommas(sum_total_embarcado)+"</td>";
				html+="<td>"+numberWithCommas(sum_total_despachado)+"</td>";

				if (role == "Administrador"){
					if(idioma == "en"){
						html+='<td><a data-toggle="modal" href="#stack4" class="boton btn btn-success" data-val="' +i+ '">Detail</a></td>'
					}else if(idioma == "es"){
						html+="<td>"+'<a data-toggle="modal" href="#stack4" class="boton btn btn-success" data-val="' +i+ '">Detalle</a></td>'
					}
				}

				html+="</tr>";  
				html+="</tbody>";
				html+="</table>"; 

				$("#tabla_tamano_etiqueta").html(html);
			})
})
})

$("#tabla_tamano_etiqueta").on('click','a.boton', function() {
	var sales="";
	sales =  $(this).data('val');
	v_sales = sales;
	v_etiqueta_sales = etiqueta_sales.split(" ").join("+");
	v_codigos=codigos;
	//v_commodity = commodity;
	obtener_ventas(function(ventas){
		tabla_sales(ventas);
	})
})
}

function obtener_ventas(callbackData) {
	$.ajax({
		type: 'GET',
		data: { Tamano : v_sales, Etiqueta : v_etiqueta_sales, CodigosCarga:v_codigos},
		url: 'recursos/ventas.php',
		success:function(data){			
			v_codigos=null;
			callbackData(data);
		},
	}); 
}

function tabla_sales(ventas){
	$("#tabla_sales").empty(); 
	var html="";
	obtener_idioma(function(idioma){
		if (ventas == "" || ventas == [] || ventas ==null){
			if(idioma == "en"){
				html+="<div class='cultivo'><h5><strong>"+v_commodity+" / "+v_etiqueta_sales+" / "+v_sales+"</strong></h5><p><strong>Total:</strong>0</p><p><strong id='lt_price_sales'>Price:</strong>-</p></div>";
			}else if(idioma == "es"){
				html+="<div class='cultivo'><h5><strong>"+v_commodity+" / "+v_etiqueta_sales+" / "+v_sales+"</strong></h5><p><strong>Total:</strong>0</p><p><strong id='lt_price_sales'>Precio:</strong>-</p></div>";
			}
			html+="<table border='1|1' class='table table-striped table-bordered display'>";
			html+="<thead>";
			html+="<tr>";

			if(idioma == "en"){
				html+="<th>"+"BOL"+"</th>";
				html+="<th>"+"Shipment Date"+"</th>";
				html+="<th>"+"Reception Date"+"</th>";
				html+="<th>"+"Assigment Date"+"</th>";
				html+="<th>"+"Dispatched Date"+"</th>";
				html+="<th>"+"Commodity"+"</th>";
				html+="<th>"+"Quantity"+"</th>";
				html+="<th>"+"Price"+"</th>";
			}else if(idioma == "es"){
				html+="<th>"+"BOL"+"</th>";
				html+="<th>"+"Fecha de Embarcado"+"</th>";
				html+="<th>"+"Fecha Recibido"+"</th>";
				html+="<th>"+"Fecha Ordenado"+"</th>";
				html+="<th>"+"Fecha Despachado"+"</th>";
				html+="<th>"+"Cultivo"+"</th>";
				html+="<th>"+"Cantidad"+"</th>";
				html+="<th>"+"Precio"+"</th>";
			}

			html+="</tr>";
			html+="</thead>";


		}else{
			var sales = JSON.parse(ventas);
			var sumtotal_cantidad  =0;
			var sumtotal_importe = 0 
			var cultivo  ="";

			for(ii in sales) {
				sumtotal_cantidad = sumtotal_cantidad + sales[ii].Cantidad;
				sumtotal_importe = sumtotal_importe + sales[ii].Importe
			}

			var price =sumtotal_importe/sumtotal_cantidad;

			if(idioma == "en"){
				html+="<div class='cultivo'><h5><strong>"+v_commodity+" / "+v_etiqueta_sales+" / "+v_sales+"</strong></h5><p><strong>Total:</strong> "+numberWithCommas(sumtotal_cantidad)+"</p><p><strong id='lt_price_sales'>Price:</strong> "+price+"</p></div>";
			}else if(idioma == "es"){
				html+="<div class='cultivo'><h5><strong>"+v_commodity+" / "+v_etiqueta_sales+" / "+v_sales+"</strong></h5><p><strong>Total:</strong> "+numberWithCommas(sumtotal_cantidad)+"</p><p><strong id='lt_price_sales'>Precio:</strong> "+price+"</p></div>";
			}
			html+="<table border='1|1' class='table table-striped table-bordered display'>";
			html+="<thead>";
			html+="<tr>";

			if(idioma == "en"){
				html+="<th>"+"BOL"+"</th>";
				html+="<th>"+"Shipment Date"+"</th>";
				html+="<th>"+"Reception Date"+"</th>";
				html+="<th>"+"Assigment Date"+"</th>";
				html+="<th>"+"Dispatched Date"+"</th>";
				html+="<th>"+"Commodity"+"</th>";
				html+="<th>"+"Quantity"+"</th>";
				html+="<th>"+"Price"+"</th>";
			}else if(idioma == "es"){
				html+="<th>"+"BOL"+"</th>";
				html+="<th>"+"Fecha de Embarcado"+"</th>";
				html+="<th>"+"Fecha Recibido"+"</th>";
				html+="<th>"+"Fecha Ordenado"+"</th>";
				html+="<th>"+"Fecha Despachado"+"</th>";
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
				html+="<td>"+sales[ii].fechaDespachado;+"</td>";
				html+="<td>"+sales[ii].NombreProducto;+"</td>";
				html+="<td>"+sales[ii].Cantidad;+"</td>";
				html+="<td>"+sales[ii].Precio;+"</td>";
				html+="</tr>";
			}

			html+="</tbody>";
			html+="</table>";
		}
		$("#tabla_sales").html(html);

	})
	v_sales=null;
	v_etiqueta_sales=null;
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

var  bodega = "todo";
var  cultivo = "todo";

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
	var my_json = JSON.parse(data_server)
	if (bodega == "todo" && cultivo == "todo") {
		datosgraph(data_server_filtro_agricultor);
		tabla(data_server_filtro_agricultor);
	}else
	if (bodega != "todo" && cultivo == "todo") {
		var json= JSON.stringify(data_server_filtro_agricultor);
		var filtered_json = find_in_object(JSON.parse(json), {NombreBodega: bodega});
		function find_in_object(my_object, my_criteria){
			return my_object.filter(function(obj) {
				return Object.keys(my_criteria).every(function(c) {
					return obj[c] == my_criteria[c];
				});
			});
		}
		datosgraph(filtered_json);
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
		datosgraph(filtered_json);
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
		datosgraph(filtered_json);
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

	var my_json = JSON.parse(data_server)
	if (bodega == "todo" && cultivo == "todo") {
		datosgraph(data_server_filtro_agricultor);
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
		datosgraph(filtered_json);
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
		datosgraph(filtered_json);
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
		datosgraph(filtered_json);
		tabla(filtered_json);
	}
	$.unblockUI();
	showPage();
})

var numberWithCommas = function(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}; 

function renderChart (embarcado, recibido, disponible, ordenado, despachado,sum_total_embarcado,sum_total_despachado, sum_total_ordered) {
	obtener_idioma(function(idioma){
		var suma = parseFloat(embarcado)+parseFloat(recibido)+parseFloat(despachado)+parseFloat(ordenado);
		var transit = "";
		var received = "";
		var available = "";
		var assigned = "";
		var dispatched = "";
		var ordered = "";

		if(idioma =="en"){
			transit = "In Transit";
			received = "Received";
			available = "Available";
			ordered = "Ordered"
			assigned = "Assigned";
			dispatched = "Dispatched";
		}else if(idioma =="es"){
			transit = "En transito";
			received = "Recibido";
			available = "Disponible";
			ordered = "Ordenado"
			assigned = "Asignado";
			dispatched = "Despachado";
		}

		var pieChartContent = document.getElementById('containercanvas');
		pieChartContent.innerHTML = '&nbsp;';
		$('#containercanvas').append('<canvas id="canvas" height="150"><canvas>');
		ctx = $("#canvas").get(0).getContext("2d"); 

		var color = Chart.helpers.color;
		var myBar = new Chart(ctx, {
			data: barChartData.data,
			type: 'horizontalBar',
			data:{
				datasets: [{          
					backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
					borderColor: window.chartColors.white,
					borderWidth: 1,
					data: [],
					backgroundColor: [
					'rgba(54, 162, 235, 0.8)',
					'rgba(255, 99, 132, 0.8)', 
					'rgba(75, 192, 192, 0.8)', 
					'rgba(255, 206, 86, 0.8)',
					'rgba(153, 102, 255, 0.8)',
					'rgba(90, 204, 96, 0.8)',
					],
					label: '# de cajas',
				}],
				labels: [transit, received, available, ordered ,assigned, dispatched]
			},
			options: {
				animation: {
					onComplete: function () {
						var chartInstance = this.chart;
						var ctx = chartInstance.ctx;
						var height = chartInstance.controller.boxes[0].bottom;
						ctx.textAlign = "left";
						Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
							var meta = chartInstance.controller.getDatasetMeta(i);
							Chart.helpers.each(meta.data.forEach(function (bar, index) {
								ctx.fillText(numberWithCommas(dataset.data[index]), bar._model.x, height - ((height - bar._model.y)));
							}),this)
						}),this);
					}
				},
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
		});

		if (embarcado ==0 && recibido == 0 && disponible==0 && ordenado == 0 && despachado == 0) {
			myBar.data.datasets[0].data[0] = 0;
			myBar.data.datasets[0].data[1] = 0;
			myBar.data.datasets[0].data[2] = 0;
			myBar.data.datasets[0].data[3] = 0;
			myBar.data.datasets[0].data[4] = 0;
			myBar.data.datasets[0].data[5] = 0;
			myBar.update();
		}else{
			myBar.data.datasets[0].data[0] = embarcado;
			myBar.data.datasets[0].data[1] = recibido;
			myBar.data.datasets[0].data[2] = disponible;
			myBar.data.datasets[0].data[3] = sum_total_ordered;
			myBar.data.datasets[0].data[4] = ordenado;
			myBar.data.datasets[0].data[5] = despachado;    
			myBar.update();
		}

		document.getElementById("canvas").onclick = function(evt){   
			var activePoints = myBar.getElementsAtEvent(evt);
			if(activePoints.length > 0)
			{
				var clickedElementindex = activePoints[0]["_index"];
				var label = myBar.data.labels[clickedElementindex];
				var value = myBar.data.datasets[0].data[clickedElementindex];
				$("#detalles").click();
			}
		}
	}) 
}

function datosgraph(res2){  
	obtener_idioma(function(idioma){
		var sum_embarcado = 0;
		var sum_recibido = 0;
		var sum_disponible = 0;
		var sum_ordenado = 0;
		var sum_despachado = 0;
		var sum_total_despachado = 0;
		var sum_total_recibido = 0;
		var sum_total_ordenado = 0;
		var sum_total_ordenadoHOY = 0;
		var sum_total_embarcado = 0;
		var sum_total_ordered = 0;

		for(var i in res2) {
			sum_total_ordered = sum_total_ordered+res2[i].OrdenadoAgricultor;
			sum_total_embarcado = sum_total_embarcado + res2[i].Embarcado;
			sum_total_ordenado = sum_total_ordenado + res2[i].Ordenado; 
			sum_total_ordenadoHOY = sum_total_ordenadoHOY + res2[i].OrdenadoHOY; 
			sum_total_despachado = sum_total_despachado + res2[i].Despachado; 
			sum_total_recibido = sum_total_recibido + res2[i].Recibido;   
			sum_despachado = sum_despachado + res2[i].DespachadoHOY;    
			sum_recibido = sum_recibido + res2[i].RecibidoHOY; 
			sum_embarcado =sum_embarcado +(res2[i].Embarcado-res2[i].Recibido);
			sum_ordenado = sum_ordenado + (res2[i].Ordenado-res2[i].Despachado);
		}

		sum_disponible = sum_total_recibido-(sum_total_ordered+sum_total_ordenado);

		$("#total_shipped").html(numberWithCommas(sum_total_embarcado));
		$("#total_dispatched").html(numberWithCommas(sum_total_despachado));
		if(idioma == "en"){
			$("#detail").html('<button class="demo btn btn-info btn-large filtros" id="detalles" data-toggle="modal" href="#stack1">Detail</button>');
		}else if(idioma == "es"){
			$("#detail").html('<button class="demo btn btn-info btn-large filtros" id="detalles" data-toggle="modal" href="#stack1">Detalles</button>');
		}
		if (isNaN(sum_embarcado) == false){
			renderChart(sum_embarcado,sum_recibido,sum_disponible,sum_ordenado,sum_despachado,sum_total_embarcado,sum_total_despachado,sum_total_ordered);
		}else if (isNaN(sum_embarcado) == true){
			renderChart(0,0,0,0,0,0,0,0);
		}
	})
}

var myVar;
function myFunction() {
	$("#main").css("opacity", "0.1");
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

$("#cultivo").on('click', function() {
	$('#option_c').hide();
})



$("#spanish").on('click', function(event) {
	$.ajax({
		type: 'POST',
		url: 'recursos/setidioma.php',
		data: { idioma : "es"},
		success:function(data){
			console.log("IDIOMA " + data);
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
		},
	}); 

});