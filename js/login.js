var urlDOMAUX = "http://187.157.115.98:80/"; var Publi = 1;
var urlWcfAUX = "http://187.157.115.98:100/wcf/WcfServiceLibrary1.Json.svc/"; 
var urlDOM    = ""; 
var urlWcf    = "http://187.157.115.98:100/wcf/WcfServiceLibrary1.Json.svc/"; 
var urlDOM2    = "http://189.203.180.22:80/"; var Publi = 1; //activa
var urlWcf2    = "http://189.203.180.22:100/wcf/WcfServiceLibrary1.Json.svc/"; //activa

function cambiar(){
	location.href = 'articulos.html';
}
$( document ).ready(function() {
	$("#botonLogin").bind("click", function (event, ui) {
	var datosUsuario = $("#nombredeusuario").val()
	var datosPassword = $("#clave").val()
	var UserName = "";
	var res =false;
	alert(datosUsuario+' '+datosPassword)
	//UserName = window.localStorage.getItem('Us')
		$.ajax({
			url: urlWcf+ "ObtenerUsuario",
			data:{ nombreUsuario:  datosUsuario , contrasenha:datosPassword },
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			success: function (data) {
				UserName = data.NombreUsuario;
				//cambiar()
				if (data.NombreUsuario != null && data.NombreUsuario != "") {
				   window.localStorage.removeItem("ID");
					window.localStorage.removeItem("Us");
					window.localStorage.removeItem("Rl");
					window.localStorage.removeItem("Whs");
					window.localStorage.removeItem("IDUS");
					window.localStorage.removeItem("Nombre");

					// window.localStorage.setItem("ID", Ident);
					window.localStorage.setItem("Us", UserName);
					window.localStorage.setItem("Rl", data.Rol);
					window.localStorage.setItem("Whs", data.Almacen);
					window.localStorage.setItem("IDUS",data.Id_Usuario);
					window.localStorage.setItem("Nombre",data.Usuario);
					cambiar()
					//alert(UserName)
					// $("#logeado").html(UserName)
					// $("#divAcceso").hide()
					//$('#usuarioV').val(data.Id_Usuario)
					//MuestraRepartidor();
				}
				else {
					alert("Usuario o contraseña invalida");
				}
			}
		});
	return false;
	})
	
	$("#configura").click(function (){
            var ipServidor = window.localStorage.getItem("IPServidor");
            if(ipServidor == null || ipServidor ==""){
                $("#TELMEX").addClass('operando');
              }
              else{
                if(ipServidor == "TELMEX"){
                  $("#"+ipServidor).addClass('operando');            
                }
                if(ipServidor== "AXTEL"){
                  $("#"+ipServidor).addClass('operando');          
                }
              }
        $("#divConfigura").show();
        setTimeout(function(){
            $("#divConfigura").hide();
        },10000)
   });
   $(".botonConfigura").click(function (){
        var id = $(this).attr('id');
        //alert(id);
        $("#divConfigura").hide();
        $(".botonConfigura").removeClass('operando');
        $(this).addClass('operando');
        if(id == "TELMEX"){
          $("#TELMEX").addClass('operando');
          urlDOM = "http://187.157.115.98:80/"; 
          urlWcf = "http://187.157.115.98:100/wcf/WcfServiceLibrary1.Json.svc/"; 
        }
        if(id== "AXTEL"){
          $("#AXTEL").addClass('operando');
          urlDOM = "http://189.203.180.22:80/";
          urlWcf = "http://189.203.180.22:100/wcf/WcfServiceLibrary1.Json.svc/"; 
        }
        window.localStorage.removeItem("IPServidor");
        window.localStorage.setItem("IPServidor", id);
   });
})