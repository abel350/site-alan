$(document).ready(function() {
	obtener_idioma(function(idioma){
		i18next.init({
			lng: idioma,
			debug: true,
			resources: {
				en: {
					translation: {
					"key_spanish": "Spanish",
					"key_english": "English",

					//---MENU
					"key_inventory": "Inventory",
					"key_loads": "Loads",
					"key_sales": "Sales",
					"key_commodity_eval": "Quality Control",
					"key_financial": "Financial Statments",
					"key_new_tripleh": "TripleH News",
					"key_about": "About Site",
					"key_loguot": "Log Out",

					"key_soon": "soon",

					//-----END MENU 
					"key_welcome": "Welcome: ",
					"key_lagricultor": "Filter by grower",
					"key_lbodega": "Filter by border",
					"key_lcommodity": "Filter by commodity",
					"key_select": " -- Select an option -- ",

					"key_filter_no_filter": "No Filter",
					"key_filter_all": "All",

					"key_total_shipped": "Total Shipped: ",
					"key_total_dispatched": "Total Dispatched: ",

					"key_detail": "Detail",

					//---MODAL

					"key_commodity": "Commodity/Summary",
					"key_commodity_label": "Commodity/Label",
					"key_commodity_label_size": "Commodity/Label/Size",
					"key_sales": "Sales",
					//---END MODAL

					//---HEADER TABLES

					"key_lt_commodity": "Commodity",
					"key_lt_transit": "In Transit",
					"key_lt_received": "Received today",
					"key_lt_available": "Available",
					"key_lt_assigned": "Assigned",
					"key_lt_dispatched": "Dispatched today",
					"key_lt_avgprice": "Avg Price",
					"key_lt_total_shipped": "Total Shipped",
					"key_lt_total_dispatched": "Total Dispatched",
					"key_lt_price_sales": "Price",

					//---END HEADER TABLES

					//---INFO GRAPH
					"key_help": "Help",
					"key_totalShipped": "Total Shipped",
					"key_ptotalShipped": "Total number of shipped boxes to the present day",

					"key_totalDispatched": "Total Dispatched",						
					"key_ptotalDispatched": "Total number of dispatched boxes to the buyer to present day",	

					"key_inTransit": "In Transit",
					"key_pinTransit": "Product dispatched that hasn't arrived ay warehouse",

					"key_received": "Received",
					"key_preceived": "Product received today",

					"key_available": "Available",
					"key_pavailable": "Product in warehouse available for sale",

					"key_assigned": "Assigned",
					"key_passigned": "Product in warehouse with sales order assigned",

					"key_dispatched": "Dispatched",
					"key_pdispatched": "Product that was dispatched to a buyer today",

					"key_note": "This chart shows the current status of your inventory",						
					//---END INFO GRAPH


					//---INFO TABLES
					"key_Commodity": "Commodity",
					"key_pCommodity": "Product",

					"key_avgPrice": "Avg Price",
					"key_pavgPrice": "Product that was dispatched to a buyer today",

					"key_BOL": "BOL",
					"key_pBOL": "Bill of Lading",

					"key_fechaEmbarcado": "Shipment Date",
					"key_pfechaEmbarcado": "Date of shipment from grower's packing house",

					"key_fechaRecibido": "Reception Date",
					"key_pfechaRecibido": "Date of reception at warehouse",

					"key_AsigmentDate": "Assigment Date",
					"key_pAsigmentDate": "Date of product assigment to a sales order",

					"key_Quantity": "Quantity",
					"key_pQuantity": "Amount of boxes",

					"key_Price": "Price",
					"key_pPrice": "Order' sales price",

					//---END INFO TABLES
				}
			},
			es: {
				translation: {
					"key_spanish": "Español",
					"key_english": "Inglés",

					//---MENU
					"key_inventory": "Inventario",
					"key_loads": "Cargas",
					"key_sales": "Ventas",
					"key_commodity_eval": "Control de Calidad",
					"key_financial": "Estados de Cuenta",
					"key_new_tripleh": "Noticias TripleH",
					"key_about": "Acerca del sitio",
					"key_loguot": "Salir",
					"key_soon": "proximamente",
					//-----END MENU 

					"key_welcome": "Bienvenido: ",
					"key_lagricultor": "Filtro por agricultor",
					"key_lbodega": "Filtro por frontera",
					"key_lcommodity": "Filtro por cultivo",
					"key_select": " -- Selecciona una opción -- ",

					"key_filter_no_filter": "Sin filtro",
					"key_filter_all": "Todo",

					"key_total_shipped": "Total Embarcado: ",
					"key_total_dispatched": "Total Despachado: ",

					"key_detail": "Detalles",

					//---MODAL

					"key_commodity": "Resumen por Cultivo",
					"key_commodity_label": "Cultivo/Etiqueta",
					"key_commodity_label_size": "Cultivo/Etiqueta/Tamaño",
					"key_sales": "Ventas",

					//---END MODAL

					//---HEADER TABLES

					"key_lt_commodity": "Cultivo",
					"key_lt_transit": "En transito",
					"key_lt_received": "Recibido hoy",
					"key_lt_available": "Disponible",
					"key_lt_assigned": "Asignado",
					"key_lt_dispatched": "Despachado hoy",
					"key_lt_avgprice": "Precio promedio",
					"key_lt_total_shipped": "Total Embarcado",
					"key_lt_total_dispatched": "Total Despachado",

					"key_lt_price_sales": "Precio",

					//---END HEADER TABLES

					//---INFO GRAPH
					"key_help": "Ayuda",
					"key_totalShipped": "Total Embarcado",
					"key_ptotalShipped": "Total acumulado de cajas embarcadas del empaque al día",

					"key_totalDispatched": "Total Despachado",						
					"key_ptotalDispatched": "Total acomulado de cajas despachas al comprador al día de hoy",	

					"key_inTransit": "En tránsito",
					"key_pinTransit": "Producto despachado del empaque que aún no ha lleago a bodega",

					"key_received": "Recibido",
					"key_preceived": "Producto recibido el día de hoy",

					"key_available": "Disponible",
					"key_pavailable": "Producto disponible para la venta en bodega",

					"key_assigned": "Ordenado",
					"key_passigned": "Producto en bodega que ya tiene una orden de venta",

					"key_dispatched": "Despachado",
					"key_pdispatched": "Producto despachado que ha sido despachado al comprador el día de hoy",

					"key_note": "Esta gráfica muestra el status de tu inventario actual",						
					//---END INFO GRAPH


					//---INFO TABLES

					"key_Commodity": "Cultivo",
					"key_pCommodity": "Producto",

					"key_avgPrice": "Precio Promedio",
					"key_pavgPrice": "Precio promedio de referencia en el que estamos distribuyendo hoy este producto/ etiqueta/ tamaño",

					"key_BOL": "BOL",
					"key_pBOL": "Confirmación de embarque al comprador",

					"key_fechaEmbarcado": "Fecha Embarcado",
					"key_pfechaEmbarcado": "Fecha de embarque del empaque",

					"key_fechaRecibido": "Fecha Recibido",
					"key_pfechaRecibido": "Fecha de recepción en bodega",

					"key_AsigmentDate": "Fecha Ordenado",
					"key_pAsigmentDate": "Fecha de la orden de venta",

					"key_Quantity": "Cantidad",
					"key_pQuantity": "Cantidad de cajas",

					"key_Price": "Precio",
					"key_pPrice": "Precio de venta de la orden",

					//---END INFO TABLES
				}
			}
		}
	}, function(err, t) {
  // init set content
  updateContent();
});

function updateContent() {
	document.getElementById('spanish').innerHTML = i18next.t('key_spanish');
	document.getElementById('english').innerHTML = i18next.t('key_english');

	document.getElementById('inventory').innerHTML = i18next.t('key_inventory');
	document.getElementById('loads').innerHTML = i18next.t('key_loads');
	document.getElementById('sales').innerHTML = i18next.t('key_sales');
	document.getElementById('commodity_eval').innerHTML = i18next.t('key_commodity_eval');
	document.getElementById('financial').innerHTML = i18next.t('key_financial');
	document.getElementById('news').innerHTML = i18next.t('key_new_tripleh');
	document.getElementById('about').innerHTML = i18next.t('key_about');
	document.getElementById('logout').innerHTML = i18next.t('key_loguot');


	document.getElementById('welcome').innerHTML = i18next.t('key_welcome');
	document.getElementById('lagricultor').innerHTML = i18next.t('key_lagricultor');
	document.getElementById('lbodega').innerHTML = i18next.t('key_lbodega');
	document.getElementById('lcommodity').innerHTML = i18next.t('key_lcommodity');

	/*document.getElementById('option_b').innerHTML = i18next.t('key_select');
	document.getElementById('option2').innerHTML = i18next.t('key_select');
	document.getElementById('option_c').innerHTML = i18next.t('key_select');

	document.getElementById('filter_bogeda').innerHTML = i18next.t('key_filter_no_filter');
	document.getElementById('filter_cultivos').innerHTML = i18next.t('key_filter_all');
	document.getElementById('filter_agricultor').innerHTML = i18next.t('key_filter_no_filter');*/


	document.getElementById('l_total_shipped').innerHTML = i18next.t('key_total_shipped');
	document.getElementById('l_total_dispatched').innerHTML = i18next.t('key_total_dispatched');

	/*document.getElementById('detalles').innerHTML = i18next.t('key_detail');*/
	
	document.getElementById('commodity_summary').innerHTML = i18next.t('key_commodity');
	document.getElementById('commodity_label').innerHTML = i18next.t('key_commodity_label');
	document.getElementById('commodity_size_label').innerHTML = i18next.t('key_commodity_label_size');
	document.getElementById('lsales').innerHTML = i18next.t('key_sales');

	/*document.getElementById('lt_commodity').innerHTML = i18next.t('key_lt_commodity');
	document.getElementById('lt_transit').innerHTML = i18next.t('key_lt_transit');
	document.getElementById('lt_received').innerHTML = i18next.t('key_lt_received');
	document.getElementById('lt_available').innerHTML = i18next.t('key_lt_available');
	document.getElementById('lt_assigned').innerHTML = i18next.t('key_lt_assigned');
	document.getElementById('lt_dispatched').innerHTML = i18next.t('key_lt_dispatched');
	document.getElementById('lt_price').innerHTML = i18next.t('key_lt_avgprice');
	document.getElementById('lt_total_shipped').innerHTML = i18next.t('key_lt_total_shipped');
	document.getElementById('lt_total_dispatched').innerHTML = i18next.t('key_lt_total_dispatched');*/

	/*document.getElementById('lt_price_sales').innerHTML = i18next.t('key_lt_price_sales');*/

	document.getElementById('linfo').innerHTML = i18next.t('key_help');
	document.getElementById('ltinfo').innerHTML = i18next.t('key_help');
	document.getElementById('ltsinfo').innerHTML = i18next.t('key_help');

	document.getElementById('totalshipped').innerHTML = i18next.t('key_total_shipped');
	document.getElementById('ptotalshipped').innerHTML = i18next.t('key_ptotalDispatched');

	document.getElementById('totaldispatched').innerHTML = i18next.t('key_total_dispatched');
	document.getElementById('ptotaldispatched').innerHTML = i18next.t('key_ptotalDispatched');

	document.getElementById('totalintransit').innerHTML = i18next.t('key_inTransit');
	document.getElementById('ptotalintransit').innerHTML = i18next.t('key_pinTransit');

	document.getElementById('received').innerHTML = i18next.t('key_received');
	document.getElementById('preceived').innerHTML = i18next.t('key_preceived');

	document.getElementById('available').innerHTML = i18next.t('key_available');
	document.getElementById('pavailable').innerHTML = i18next.t('key_pavailable');

	document.getElementById('assigned').innerHTML = i18next.t('key_assigned');
	document.getElementById('passigned').innerHTML = i18next.t('key_passigned');

	document.getElementById('dispatched').innerHTML = i18next.t('key_dispatched');
	document.getElementById('pdispatched').innerHTML = i18next.t('key_pdispatched');
	document.getElementById('note').innerHTML = i18next.t('key_note');



	document.getElementById('ltBOL').innerHTML = i18next.t('key_BOL');
	document.getElementById('pltBOL').innerHTML = i18next.t('key_pBOL');

	document.getElementById('ltShipmenteDate').innerHTML = i18next.t('key_fechaEmbarcado');
	document.getElementById('pltShipmenteDate').innerHTML = i18next.t('key_pfechaEmbarcado');

	document.getElementById('ltReceptionDate').innerHTML = i18next.t('key_fechaRecibido');
	document.getElementById('pltReceptionDate').innerHTML = i18next.t('key_pfechaRecibido');

	document.getElementById('ltAsigmentDate').innerHTML = i18next.t('key_AsigmentDate');
	document.getElementById('pltAsigmentDate').innerHTML = i18next.t('key_pAsigmentDate');

	document.getElementById('ltquanty').innerHTML = i18next.t('key_Quantity');
	document.getElementById('pltquanty').innerHTML = i18next.t('key_pQuantity');

	document.getElementById('ltprice').innerHTML = i18next.t('key_Price');
	document.getElementById('pltprice').innerHTML = i18next.t('key_pPrice');



	document.getElementById('ltcommoidty').innerHTML = i18next.t('key_Commodity');
	document.getElementById('pltcommoidty').innerHTML = i18next.t('key_pCommodity');

	document.getElementById('ltIntransit').innerHTML = i18next.t('key_inTransit');
	document.getElementById('pltIntransit').innerHTML = i18next.t('key_pinTransit');

	document.getElementById('ltReceived').innerHTML = i18next.t('key_received');
	document.getElementById('pltReceived').innerHTML = i18next.t('key_preceived');

	document.getElementById('ltavailable').innerHTML = i18next.t('key_available');
	document.getElementById('pltavailable').innerHTML = i18next.t('key_pavailable');

	document.getElementById('ltassigned').innerHTML = i18next.t('key_assigned');
	document.getElementById('pltassigned').innerHTML = i18next.t('key_passigned');

	document.getElementById('ltdispatched').innerHTML = i18next.t('key_dispatched');
	document.getElementById('pltdispatched').innerHTML = i18next.t('key_pdispatched');

	document.getElementById('ltavgPrice').innerHTML = i18next.t('key_avgPrice');
	document.getElementById('pltavgPrice').innerHTML = i18next.t('key_pavgPrice');

	document.getElementById('lttotalShipped').innerHTML = i18next.t('key_totalShipped');
	document.getElementById('plttotalShipped').innerHTML = i18next.t('key_ptotalShipped');

	document.getElementById('lttotalDispatched').innerHTML = i18next.t('key_totalDispatched');
	document.getElementById('plttotalDispatched').innerHTML = i18next.t('key_ptotalDispatched');

}

function changeLng(lng) {
	i18next.changeLanguage(lng);
}	

i18next.on('languageChanged', () => {
	updateContent();
});
})
});


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