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
          "key_v": "Price by load",
          "key_vf": "Price by sold date",
          "key_vff": "Price by invoice date",
          "key_commodity_eval": "Quality Control",
          "key_financial": "Financial Statments",
          "key_new_tripleh": "TripleH News",
          "key_about": "About Site",
          "key_loguot": "Log Out",

          "key_lcommodity": "Filter by Commodity",
          "key_lcontract": "Filter by Contract",     

          //-----END MENU 
          "key_welcome": "Welcome: ",
          "key_lagricultor": "Filter by grower",
          "key_lbodega": "Filter by warehouse",
          "key_select": " -- Select an option -- ",

          "key_filter_no_filter": "No Filter",
          "key_filter_all": "All",

          "key_tl_loads": "#Load",
          "key_tl_warehouse": "Warehouse",
          "key_tl_shipment_date": "Shipment Date",
          "key_tl_reception_date": "Reception Date",

          "key_label_loads": "Loads / Quality Evaluation",

          "key_help": "Help",

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
          "key_v": "Reporte de precios por carga",
          "key_vf": "Reporte de precios por fecha venta",
          "key_vff": "Reporte de precio por fecha factura",

          "key_commodity_eval": "Control de Calidad",
          "key_financial": "Estados de Cuenta",
          "key_new_tripleh": "Noticias TripleH",
          "key_about": "Acerca del sitio",
          "key_loguot": "Salir",
          //-----END MENU 

          "key_welcome": "Bienvenido: ",
          "key_lagricultor": "Filtro por agricultor",
          "key_lbodega": "Filtro por bodega",
          "key_select": " -- Selecciona una opción -- ",

          "key_filter_no_filter": "Sin filtro",
          "key_filter_all": "Todo",

          "key_tl_loads": "#Carga",
          "key_tl_warehouse": "Bodega",
          "key_tl_shipment_date": "Fecha de Embarcado",
          "key_tl_reception_date": "Fecha de Recibido",

          "key_label_loads": "Cargas / Evaluación de Calidad",

          "key_help": "Ayuda",

          "key_fechaEmbarcado": "Fecha Embarcado",
          "key_pfechaEmbarcado": "Fecha de embarque del empaque",

          "key_fechaRecibido": "Fecha Recibido",
          "key_pfechaRecibido": "Fecha de recepción en bodega",


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

          "key_lcommodity": "Filtro por Cultivo",

          "key_lcontract": "Filtro por Contrato",          
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
  document.getElementById('lloads').innerHTML = i18next.t('key_loads');
      //document.getElementById('sales').innerHTML = i18next.t('key_sales');
      document.getElementById('commodity_eval').innerHTML = i18next.t('key_commodity_eval');
      document.getElementById('financial').innerHTML = i18next.t('key_financial');
      document.getElementById('news').innerHTML = i18next.t('key_new_tripleh');
      document.getElementById('about').innerHTML = i18next.t('key_about');
      document.getElementById('logout').innerHTML = i18next.t('key_loguot');


      document.getElementById('welcome').innerHTML = i18next.t('key_welcome');
      document.getElementById('lagricultor').innerHTML = i18next.t('key_lagricultor');
      document.getElementById('lbodega').innerHTML = i18next.t('key_lbodega');

      /*document.getElementById('option_f').innerHTML = i18next.t('key_select');
      document.getElementById('option_b').innerHTML = i18next.t('key_select');

      document.getElementById('filter_bogeda').innerHTML = i18next.t('key_filter_all');
      document.getElementById('filter_agricultor').innerHTML = i18next.t('key_filter_no_filter');*/


      document.getElementById('linfo').innerHTML = i18next.t('key_help');

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

      document.getElementById('sales').innerHTML = i18next.t('key_sales');
      document.getElementById('v').innerHTML = i18next.t('key_v');
      document.getElementById('vf').innerHTML = i18next.t('key_vf');
      document.getElementById('vff').innerHTML = i18next.t('key_vff');

      document.getElementById('lcommodity').innerHTML = i18next.t('key_lcommodity');
      document.getElementById('lcontract').innerHTML = i18next.t('key_lcontract');
      document.getElementById('price').innerHTML = i18next.t('key_Price');

      


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