$( document ).ready(function() {
	myFunction();

});

$("#login").click(function(e){
	e.preventDefault();
	var correo = $("#inputEmail").val();
	var pass = $("#inputPassword").val();
	var formData = $("#formulario").serialize();
	
	datos = {'email': correo, 'password':pass};
	obj = JSON.stringify(formData);
	
	$.ajax({
		type: 'POST',
		data: formData,
		url: 'recursos/acceder.php',
		success: function (data) {
			var json = JSON.stringify(data);
			console.log(data);
			if (data == 'Unauthorized'){
				alert ('Usuario no registrado');
			}else
			if (data == 'Bad Request'){
				alert ('Verifica tus datos');
			}else
			if (data =! ''){   
				obtener_agricultores(function(data){
					var idagricultor = "";
					var miJSON = data;
					//idagricultor = idagricultor + miJSON.codigoAgricultor +",";
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
				})
				$("#loader").css("display", "block");
				$("#main").css("opacity", "0.1");

				setTimeout(function() {
					$("#main").css("opacity", "1");
					$("#loader").css("display", "none");
					window.location.assign("tablero.php");
				},1000);				
			}
		},
		fail: function(data) {
			alert('Ocurrió un Error');
		},
		complete: function(data){		
		}
	});
});

var myVar;
function myFunction() {
	myVar = setTimeout(showPage, 0);
}
function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("main").style.display = "block";
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