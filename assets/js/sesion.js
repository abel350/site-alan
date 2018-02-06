
$("#login").click(function(e){
	e.preventDefault();
	var correo = $("#inputEmail").val();
	var pass = $("#inputPassword").val();

	datos = {'email': correo, 'password':pass};
	obj = JSON.stringify(datos);
	
    $.ajax({
	  type: 'POST',
	  //data: JSON.stringify({email:"mcardel@gmail.com", password:"12345"}),
	  data: obj,
	  url: 'http://ionic2-auth-example-acm.herokuapp.com/api/auth/login',
	  headers: {'Content-Type':'application/json'},
	  //async: true,
	  //crossDomain: true,
	  //contentType: "application/json",
	  beforeSend: function (xhr) {
	  	 xhr.setRequestHeader('Cache-Control', 'no-cache'); 
	    if (xhr && xhr.overrideMimeType) {
	      xhr.overrideMimeType('application/json');
	    }
	  },
	  dataType: 'json',
	  success: function (data) {
	    //Do stuff with the JSON data
	    var json = JSON.stringify(data);
	    if (json != ''){
		    window.location.assign("tablero.php");
	 	}
	  },
	  fail: function(data) {
			alert('Datos Incorrectos');
		},
		complete: function(data){		
		}
	});
});

/*$("#login").click(function(){
    // Definimos la URL que vamos a solicitar via Ajax
	var ajax_url = "http://ionic2-auth-example-acm.herokuapp.com/api/auth/login";

	// Definimos los parámetros que vamos a enviar
	var params = c;

	// Creamos un nuevo objeto encargado de la comunicación
	var ajax_request = new XMLHttpRequest();

	// Definimos como queremos realizar la comunicación
	ajax_request.open( "POST", ajax_url, true );
	// Ponemos las cabeceras de la solicitud como si fuera un formulario, necesario si se utiliza POST
	ajax_request.setRequestHeader("Content-Type", "application/json");
	//Enviamos la solicitud junto con los parámetros
	ajax_request.send( params );
});*/
