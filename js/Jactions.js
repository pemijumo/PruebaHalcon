var CodArt = []; var NomArt = [];
//var urlDOM = ""; var Publi = 0;
//var urlDOM = "http://192.168.2.100:80/"; var Publi = 1;
 // var urlDOM = "http://192.168.2.204:70/"; var Publi = 1;
var urlDOMAUX = "http://192.168.2.100:80/"; var Publi = 1;
var urlWcfAUX = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
var urlDOM    = ""; 
var urlWcf    = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
//var urlWcf = "http://192.168.2.204:90/wcf/WcfServiceLibrary1.Json.svc/"; 
var urlDOM2    = "http://192.168.2.100:80/"; var Publi = 1; //activa
var urlWcf2    = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; //activa
// var urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
// var urlWcf = "http://192.168.2.236/ws/WcfServiceLibrary1.Json.svc/"; 
 // var urlWcf = "http://192.168.2.204/FFF/WcfServiceLibrary1.Json.svc/"; 
// var urlWcf = "http://localhost:8732/Design_Time_Addresses/WcfServiceLibrary1/Json/"; 

var Latitud = 0; var Longitud = 0;
 var LatitudReparto = 0; var LongitudReparto = 0;
 var LatitudComida = 0; var LongitudComida = 0;
 var EnvioReparto =0;
 var EnvioComida =0;
 var clickCoordenadas = 0;
 var tiempoEspera = 10000;//15000;
 var tiempoSincroniza = 500000;
 options = { maximumAge: 500000,timeout: 20000,enableHighAccuracy: true}; // tiempos de respuesta de gps
var ver = false;
var opcionDescuento = 0;//0:mayoreo 1:transporte

var tiempoInicial;
var tiempoFinal;
$(document).bind("pageinit", function () {
	
	 var ipServidor = window.localStorage.getItem("IPServidor");
              if(ipServidor == null || ipServidor ==""){
                $("#"+ipServidor).addClass('operando');
                urlDOM = "http://192.168.2.100:80/";
                urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
                //urlWcf = "http://192.168.2.204:90/wcf/WcfServiceLibrary1.Json.svc/"; 
                // alert("180.22");
              }
              else{
                if(ipServidor == "TELMEX"){
                  $("#"+ipServidor).addClass('operando');
                  urlDOM = "http://192.168.2.100:80/"; 
                  urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
                  //urlWcf = "http://192.168.2.204:90/wcf/WcfServiceLibrary1.Json.svc/"; 
                  // alert("TELMEX 98.114");                  
                }
                if(ipServidor== "AXTEL"){
                  $("#"+ipServidor).addClass('operando');
                  urlDOM = "http://192.168.2.100:80/";
                  urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
                  //urlWcf = "http://192.168.2.204:90/wcf/WcfServiceLibrary1.Json.svc/"; 
                  // alert("AXTEL 180.22");                  
                }
              }
   //MuestraRepartidor();
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
    // MuestraRepartidor();
    //window.localStorage.removeItem('inicioRuta');
    var f = new Date();  
        $('#fechaIni').val(fechaFormato(f));
        $('#fechaFinal').val(fechaFormato(f));
    consultarClientesVendedores();
    $.datepicker.regional['es'] = {
         closeText: 'Cerrar',
         prevText: '<Ant',
         nextText: 'Sig>',
         currentText: 'Hoy',
         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
         monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
         dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
         dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
         dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
         weekHeader: 'Sm',
         dateFormat: 'yy/mm/dd',
         firstDay: 1,
         isRTL: false,
         showMonthAfterYear: false,
         yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
    $( ".datepicker" ).datepicker();

    $( 'body,html' ).on( "click",".rutasVendedor", function(event) {
     event.preventDefault();
       var idRuta=$(this).attr('title');
      // alert(idRuta);
        ConsultaStatusRutaFactura(idRuta);
    });

    //ObtenerDatosIP();
    if (Publi == 1) {
        document.addEventListener("backbutton", handleBackButton, true);

        function handleBackButton() {

            if ($.mobile.activePage.attr('id') == 'inicio' || $.mobile.activePage.attr('id') == 'home') {
                navigator.app.exitApp();
            }
            //else {
            //    navigator.app.backHistory();
            //}          
        }
    }

    var Ident = "";
	$("#radioDescuento").hide();

    $("#btnBusqArt").bind("click", function (event, ui) {
        var Codigo = '';
		
		var codigoNombre = $("#txtItemCode").val();
		codigoNombre = codigoNombre.trim();	
		if(codigoNombre!='')
		{
			var divide = codigoNombre.split('//');
			Codigo = divide[0];
		}
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }
        VerificaDescripcionArticulo(Codigo);
		// ConsultaListaPreciosV2(Codigo);
		// ConsultaDescuento(Codigo);	
    });   

    $(".btnSalir").bind("click", function (event, ui) {
        window.localStorage.removeItem("ID");
        window.localStorage.removeItem("Us");
        window.localStorage.removeItem("Rl");
        window.localStorage.removeItem("Nombre");
		$('#nombreUsuario').html('')
        LimpiaCodArtNoExistente();
        $("#txtItemCode").val('');
        $("#txtNombreArticulo").val('');
        $("#nombredeusuario").val('');
        $("#clave").val('');
        if (Publi == 1) {
            location.href = 'login.html';
        }
        else {
            location.href = 'login.html';
        }
    });

    $("#btnLogout").bind("click", function (event, ui) {
        window.localStorage.removeItem("ID");
        window.localStorage.removeItem("Us");
        window.localStorage.removeItem("Rl");
        window.localStorage.removeItem("Whs");
        window.localStorage.removeItem("IDUS");
        window.localStorage.removeItem("Nombre");
		$('#nombreUsuario').html('')
        LimpiaCodArtNoExistente();
        $("#txtItemCode").val('');
        $("#nombredeusuario").val('');
		$('#usuarioV').val('')
        $("#clave").val('');
        if (Publi == 1) {
            navigator.app.exitApp();
        }
        else {
            window.onbeforeunload = true;
        }
    });

    $("#botonLogin").bind("click", function (event, ui) {

        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()
        var UserName = "";
        UserName = window.localStorage.getItem('Us')
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            Ident = /*device.model + "/" +*/device.uuid;
            // recolecta los valores del usuario que se esta logueando
            var devID = window.localStorage.getItem('ID')
            if (devID == "" || devID == null) {
                //Se consulta al usuario en BD
                $.ajax({
                    url: urlWcf + "ObtenerUsuario",
                    data:{ nombreUsuario:  datosUsuario , contrasenha:datosPassword },
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        UserName = data.NombreUsuario;
                        if (data.NombreUsuario != null && data.NombreUsuario != "") {
                           window.localStorage.removeItem("ID");
                            window.localStorage.removeItem("Us");
                            window.localStorage.removeItem("Rl");
                            window.localStorage.removeItem("Whs");
                            window.localStorage.removeItem("IDUS");
							window.localStorage.removeItem("Nombre");

                            window.localStorage.setItem("ID", Ident);
                            window.localStorage.setItem("Us", UserName);
                            window.localStorage.setItem("Rl", data.Rol);
                            window.localStorage.setItem("Whs", data.Almacen);
                            window.localStorage.setItem("IDUS",data.Id_Usuario);
							window.localStorage.setItem("Nombre",data.Usuario);
                            location.href = 'index.html';
                            $.mobile.loading("hide");
                        }
                        else {
                            alert("Usuario o contraseña invalida");
                            $.mobile.loading("hide");
                        }
                    }
                });
            }
            else if (username == Ident) {
                location.href = 'index.html';
                MuestraRepartidor();
                $.mobile.loading("hide");
            }
        }
        else {
            //es en aplic de escritorio solo validar el usuario
            if (UserName == datosUsuario) {
                //Se consulta al usuario en BD
                $.ajax({
                    url: urlWcf + "ObtenerUsuario",
                    data:{ nombreUsuario:  datosUsuario , contrasenha:datosPassword },
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        UserName = data.NombreUsuario;
                        if (data.NombreUsuario != null && data.NombreUsuario != "") {
                           window.localStorage.removeItem("ID");
                            window.localStorage.removeItem("Us");
                            window.localStorage.removeItem("Rl");
                            window.localStorage.removeItem("Whs");

                            window.localStorage.setItem("ID", Ident);
                            window.localStorage.setItem("Us", UserName);
                            window.localStorage.setItem("Rl", data.Rol);
                            window.localStorage.setItem("Whs", data.Almacen);
                            $.mobile.changePage("index.html")
                            $.mobile.loading("hide");
                            MuestraRepartidor();
                        }
                        else {
                            alert("Usuario o contraseña invalida");
                            $.mobile.loading("hide");
                        }
                    }
                });
            }
            else if (UserName != null) {
                location.href = 'index.html';
            }
        }
        return false;
    });      

    $("#btnLimpArt").bind("click", function (event, ui) {
        $("#txtItemCode").val('');
        $("#txtNombreArticulo").val('');
        $("#txtPrecio").val('');
        $("#txtUtilidad").val('');
        $("#sDescripcionArticulo").text('');

        $("#txtPorcientoDesc").val('');
        $("#txtPrecioDescuentoMXP").val('');
        $("#txtUtilidadDescuentoMXP").val('');
        $("#txtPrecioDescuentoUSD").val('');
        $("#txtUtilidadDescuentoUSD").val('');

        //--------------------------------------
        var htmlTable = '';
        $("#tblLista").html('');
        $("#tblLista").html(htmlTable);

        $("#tblListaStock").html('');
        $("#tblListaStock").html(htmlTable);
        $('#idInformacion').css('display', 'none');

        if (Publi == 1) {
            $.mobile.loading('hide');
        }

    });

    $("#btnLimpCli").bind("click", function (event, ui) {
        $("#cliente").val('');
        $("#nombreC").val('');
        $("#descripcionC").val('');

    });


    $("#btnAplicPrecio").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
		var TipoMoneda = -1;
        if (CodORNom != "" || TipoMoneda == -1) {
            var mon = $("#txtPrecio").val();
            if (mon != "") {
                var code = CodORNom;
                
                var TipoConsulta = -1;
                if ($('#rbtPesos').is(':checked')) {
                    TipoMoneda = 1;
                    TipoConsulta = 1;
                }
                if ($('#rbtDolares').is(':checked')) {
                    TipoMoneda = 2;
                    TipoConsulta = 2;
                }

                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }
                    //Se llena la tabla de precios
                    $.ajax({
                        url: urlWcf + "CalculaUtilidadPrecio",
                        data: { TipoConsulta:  TipoConsulta, CodArticulo:  code , TipoMoneda: TipoMoneda , Monto: mon },
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            var Rol = window.localStorage.getItem('Rl')
                            if (data != null && data != undefined) {
                                if (Rol != 1) {
                                    if (data >= 13)
                                        $("#txtUtilidad").val(data);
                                    else {
                                        if (Publi == 1) {                                            
                                            navigator.notification.alert('Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..',
                                            alertDismissed, 'HalcoNet', 'Aceptar');
                                            $.mobile.loading("hide");

                                        }
                                        else {
                                            alert("Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..");
                                        }
                                    }
                                    //Mensaje("Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..", "HalcoNet", "Aceptar");
                                }
                                else {
                                    $("#txtUtilidad").val(data);
                                }
                            }
                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Debe especificar un monto", "HalcoNET", "Aceptar");
            }

        }
        else {
            Mensaje("Debe consultar un artíulo por código y debe especificar el tipo de moneda.", "HalcoNET", "Aceptar");
        }
    });

    //----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------

    $("#btnAplicUtilidad").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }        
		var TipoMoneda = -1;
        if (CodORNom != "" || TipoMoneda == -1) {
            var mon = $("#txtUtilidad").val();
            if (mon != "") {
                var Rol = window.localStorage.getItem('Rl');
                if (mon < 13 && Rol != 1) {
                    if (Publi == 1) {
                        
                        navigator.notification.alert('Es mejor regalar el producto, que generar un precio por debajo de la utilidad especificada..',
                                            alertDismissed, 'HalcoNet', 'Aceptar');
                        $.mobile.loading("hide");
                    }
                    else {
                        alert("Es mejor regalar el producto, que generar un precio por debajo de la utilidad especificada..");
                    }
                }
                else {
                    var code = CodORNom;
                    var TipoMoneda = -1;
                    var TipoConsulta = -1;
                    if ($('#rbtPesos').is(':checked')) {
                        TipoMoneda = 1;
                        TipoConsulta = 1;
                    }
                    if ($('#rbtDolares').is(':checked')) {
                        TipoMoneda = 2;
                        TipoConsulta = 2;
                    }
                    if (mon != "") {
                        if (Publi == 1) {
                            $.mobile.loading('show', {
                                text: 'Calculando...',
                                textVisible: true,
                                theme: 'a',
                                html: ""
                            });
                        }
                        //Se llena la tabla de precios
                        $.ajax({
                            url: urlWcf + "CalculaUtilidadPorciento",
                            data: { TipoConsulta: TipoConsulta , DescripArticulo: code , TipoMoneda: TipoMoneda , Monto: mon , BDescripcion: 0 },
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
                            success: function (data) {
                                $("#txtPrecio").val(data);
                                if (Publi == 1) {
                                    $.mobile.loading('hide');
                                }
                            }
                        });
                    }
                }
            }
            else {
                Mensaje("Debe especificar un monto para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe consultar un artíulo por código y debe especificar el tipo de moneda.", "HalcoNET", "Aceptar");
        }
    });

    //---------------------------------------------------------------------------------------------------------

    $("#btnCalPorcientoDesc").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
        
        //CodORNom = $("#txtItemCode").val();
        // if (CodORNom == "")
            // CodORNom = $("#txtItemName").val();
        if (CodORNom != "") {
            var mon = $("#txtPorcientoDesc").val();
            if (mon != "") {
                var code = CodORNom;
                var TipoConsulta = 11;
                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }
                    //Se llena la tabla de precios
                    $.ajax({
                        url: urlDOM + "CS.aspx/ObtenerDescuentos",
                        data: "{ TipoConsulta: " + TipoConsulta + ", CodArticulo: '" + code + "', Descuento:" + mon + "}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $("#txtPrecioDescuentoMXP").val(data.d.PrecioCompraMXP);
                            $("#txtUtilidadDescuentoMXP").val(data.d.PrecionVentaMXP);
                            $("#txtPrecioDescuentoUSD").val(data.d.PrecioCompraUSD);
                            $("#txtUtilidadDescuentoUSD").val(data.d.PrecionVentaUSD);

                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Debe especificar un monto para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe consultar un articulo por código", "HalcoNET", "Aceptar");
        }
    });
	
	$( "#txtItemCode" ).autocomplete({
      source:  function (request, response) {
                $.ajax({
						url: urlWcf + "AutoCompletarArticulo",
						data: { codArticulo: $('#txtItemCode').val(), tipoConsulta : 1},
						type: "GET",
						//timeout:20000,
						contentType: "application/json; charset=utf-8",
						dataType: "jsonp",
						success: function (data) {
							response($.map(data, function (item) {
								return {						
									label: recortar(item.ItemCode),
									val: item.Nombre
									}
								}))
						},
						error: function(err){
							$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
						}
                });
            },
	  select: function( event, ui ) {
        $("#txtNombreArticulo").val( ui.item.val );
		//ConsultaDescuento($('#txtItemCode').val());//llamar funcion
      }
    });
	
	$( "#txtNombreArticulo" ).autocomplete({
      source:  function (request, response) {
                $.ajax({
						url: urlWcf + "AutoCompletarArticulo",
						data: { codArticulo: $('#txtNombreArticulo').val(), tipoConsulta : 2},
						type: "GET",
						//timeout:20000,
						contentType: "application/json; charset=utf-8",
						dataType: "jsonp",
						success: function (data) {
							response($.map(data, function (item) {
								return {						
									label:item.Nombre,
									val: recortar(item.ItemCode)
									}
								}))
						}/*,
						error: function(err){
							$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
						}*/
                });
            },
	  select: function( event, ui ) {
        $("#txtItemCode").val( ui.item.val );
		//ConsultaDescuento($('#txtItemCode').val());//llamar funcion
      }
    });
    //cliente registro
    $( "#cliente" ).autocomplete({
      source: function (request, response) {
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigo",
                        data: { valor: $('#cliente').val(), tipoConsulta : 1},
                        type: "GET",
                        timeout:20000,  // tiempo de espera de la llamada
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return {                        
                                    label: item.codigo,
                                    val: item.nombre
                                }
                            }))
                        },
                        error: function(err){
                            $("#cliente").removeClass( "ui-autocomplete-loading" );
                        }
                });
            },
      select: function( event, ui ) {
        $("#nombreC").val( ui.item.val );
      }
    });
    
    $( "#nombreC" ).autocomplete({
      source: function (request, response) {
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigo",
                        data: { valor: $('#nombreC').val(), tipoConsulta : 4},
                        type: "GET",
                        timeout:20000,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return {                        
                                    label: item.nombre,
                                    val: item.codigo
                                    }
                                }))
                        },
                        error: function(err){
                            $("#nombreC").removeClass( "ui-autocomplete-loading" );
                        }
                });
            },
      select: function( event, ui ) {
        $("#cliente").val( ui.item.val );
      }
    });
	

    $("#enviarCliente").click(function(event){
        event.preventDefault();
        var cliente = $("#cliente").val();
        var nombreC = $("#nombreC").val();
        var coordenadasC = $("#coordenadasC").val();
        var descripcionC = $("#descripcionC option:selected").text();
        if(cliente != "" && nombreC != "" && coordenadasC != "" && descripcionC != ""){
            $.mobile.loading( 'show', {
                text: 'Enviando Información',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            $("#enviarCliente").prop( "disabled", true );
            $.ajax({
                    url: urlWcf + "RegistrarCliente",
                    data: { cliente : cliente , nombreC:nombreC , latitud:Latitud , longitud : Longitud , descripcion:descripcionC},
                    type: "GET",
                    timeout:tiempoEspera,  // tiempo de espera de la llamada
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        $.mobile.loading('hide');
                        $("#enviarCliente").prop( "disabled", false );                      
                        $("#cliente").val( "" );    
                        $("#nombreC").val( "" );    
                        $("#descripcionC").val( "" );    
                        $("#coordenadasC").val( "" );   
                        //alert(data);
                        $("#mensajeEnvio").html("<label style='font-size:16px;padding:5px;background-color:#000;text-shadow:none;font-weight:bold;color:#FFF'>"+data+"</label>");
                        setTimeout(function(){$("#mensajeEnvio").html("");}, 3000)
                    },
                    error: function(err){
                        $.mobile.loading('hide');
                        // $("#enviarCliente").prop( "disabled", false );
                        // $("#cliente").val( "" );    
                        // $("#nombreC").val( "" );    
                        // $("#coordenadasC").val( "" );
                        // //alert("Es posible que haya una falla en el servicio");                      
                        // var sessionClientes= {
                        //   'cliente': []
                        // };
                        
                        // var restoredSessionClientes = JSON.parse(window.localStorage.getItem('clientes'));
                        // if(restoredSessionClientes!= null){
                        //     console.log(restoredSessionClientes);
                        //     $.each(restoredSessionClientes.cliente,function(index, value){
                        //         sessionClientes.cliente.push({ "cliente" : value.cliente , "nombreC":value.nombreC , "latitud":value.latitud , "longitud" : value.longitud});
                        //     });                             
                            
                        // }
                        // window.localStorage.removeItem("clientes");                     
                        
                        // sessionClientes.cliente.push({ "cliente" : cliente , "nombreC":nombreC , "latitud":Latitud , "longitud" : Longitud});

                        // window.localStorage.setItem('clientes', JSON.stringify(sessionClientes));
                        
                    }
                });
                
        }else{
            // alert("Todos los campos son necesarios");
            $("#mensajeEnvio").html( "<label style='font-size:16px;padding:5px;text-shadow:none;font-weight:bold;color:#F00'>* Todos los campos son necesarios</label>" );
            setTimeout(function(){$("#mensajeEnvio").html("");}, 3000)
        }
    }); 
	
	 $("#txtClienteI1").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: urlWcf + "CompletarClienteCodigo",
                data: { valor: $('#txtClienteI1').val(), tipoConsulta: 1 },
                type: "GET",
                timeout: 20000,  // tiempo de espera de la llamada
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.codigo,
                            val: item.nombre
                        }
                    }))
                },
                error: function (err) {
                    $("#txtNombreI1").removeClass("ui-autocomplete-loading");
                }
            });
        },
        select: function (event, ui) {
            $("#txtNombreI1").val(ui.item.val);
        }
    });
	$("#txtClienteI2").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: urlWcf + "CompletarClienteCodigo",
                data: { valor: $('#txtClienteI2').val(), tipoConsulta: 1 },
                type: "GET",
                timeout: 20000,  // tiempo de espera de la llamada
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.codigo,
                            val: item.nombre
                        }
                    }))
                },
                error: function (err) {
                    $("#txtNombreI2").removeClass("ui-autocomplete-loading");
                }
            });
        },
        select: function (event, ui) {
            $("#txtNombreI2").val(ui.item.val);
        }
    });


$("#txtArticuloI1").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: urlWcf + "AutoCompletarArticulo",
                data: { codArticulo: $('#txtArticuloI1').val(), tipoConsulta: 1 },
                type: "GET",
                //timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: recortar(item.ItemCode),
                            val: item.Nombre
                        }
                    }))
                },
                error: function (err) {
                    $("#txtArticuloI1").removeClass("ui-autocomplete-loading");
                }
            });
        }
    });

$("#txtArticuloI2").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: urlWcf + "AutoCompletarArticulo",
                data: { codArticulo: $('#txtArticuloI2').val(), tipoConsulta: 1 },
                type: "GET",
                //timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: recortar(item.ItemCode),
                            val: item.Nombre
                        }
                    }))
                },
                error: function (err) {
                    $("#txtArticuloI2").removeClass("ui-autocomplete-loading");
                }
            });
        },
        select: function (event, ui) {
            MostrarStock(ui.item.label)
        }
    });
	$('#divSeccionI2').hide();
    // $('#select_Origen').val(window.localStorage.getItem("Whs"));
    // $("#select_Origen").selectmenu('refresh', true);
var _almacen=window.localStorage.getItem("Whs")
	//alert(_almacen)
	$('#select_Origen > option[value="'+_almacen+'"]').attr('selected', 'selected');
    $('#basic_example_1').val(dateTimeFormato(new Date()));
    $('#input_example_2').val(dateTimeFormatoSinHora(new Date()));

    $('#rbtVtaPerdida').click(function (e) {
        $('#lgdTitulo').html("Venta perdida");
		$("#tblListaStockVenta").html('');
    });

    $('#rbtStockFaltante').click(function (e) {
        $('#lgdTitulo').html("Venta confirmada");
    });

    $('#btnContinuarI1').click(function (e) {
        $('#divSeccionI1').hide();
        $('#divSeccionI2').show();
        if ($('#rbtVtaPerdida').is(':checked')) {
            $('#ventaperdida').show();
            $('#ventaconfirmada').hide();
        }
        else {
            $('#ventaperdida').hide();
            $('#ventaconfirmada').show();
        }
    });

    $('#backI1').click(function (e) {
        $('#divSeccionI1').show();
        $('#divSeccionI2').hide();
    });

    $('#basic_example_1').datetimepicker({
        timeFormat: "hh:mm tt"
    });

    $('#input_example_2').datetimepicker({
        timeInput: false,
        dateFormat: 'yy/mm/dd',
       // timeFormat: "hh:mm tt",
        showHour: false,
        showMinute: false
    });
    //*************************************************************ventas
    $("#btnConsultaOrdenes").prop( "disabled", false );
    $("#btnConsultaOrdenes").click(function (){
		//navigator.notification.vibrate(2500);
            $("#loader").show() 
            $("#btnConsultaOrdenes").prop( "disabled", true );      
            $("#divTblOrdenes").html("");  
    		$("#divDescripcionArtO").html("")   
            consultaEntregas()
        })
    $("#btnConsultaOrdenesS").prop( "disabled", false );
    $("#btnConsultaOrdenesS").click(function (){
            $("#loader").show() 
            $("#btnConsultaOrdenesS").prop( "disabled", true );      
            $("#divTblOrdenesS").html("");  
            consultaEntregasS()
        })
    $("#btnRegresar").click(function (){  
        $("#divTblOrdenes").html("");          
        $("#ListOrdenes").show();
        $("#ListDetalleOrden").hide();  
        $("#btnConsultaOrdenes").show();
        $("#btnRegresar").hide();  
        $("#btnSuspender").hide(); 
    	$("#divDescripcionArtO").html("")         
        refrescarTiempo()
        consultaEntregas()    
    })
    $("#btnRegresarS").click(function (){  
        $("#divTblOrdenesS").html("");          
        $("#ListOrdenesS").show();
        $("#ListDetalleOrdenS").hide();  
        $("#btnConsultaOrdenesS").show();
        $("#btnRegresarS").hide();  
        // $("#btnSuspender").hide();       
        // refrescarTiempo()
        consultaEntregasS()    
    })

    setInterval(function(){
        consultaEntregas()
    },55000 );
	if($(window).width() > 500){
        $("body .fa").each(function (index) 
        { 
            $(this).removeClass('fa-lg');
            $(this).addClass("fa-2x"); 
        }) 
    }
    //*************************************************************ventas
});       //cierre de página
//*************************************************************ventas

 $(document).on('click','.detalleOrden', function () {
    var docEntry = $(this).attr('title')
    consultaDetalleEntrega(docEntry)
});
 $(document).on('click','.detalleOrdenS', function () {
    var docEntry = $(this).attr('title')
    consultaDetalleEntregaS(docEntry)
});
 $(document).on('change','.txtSurtido', function () {
    var linea = $(this).attr('title')
    var docEntry = $("#txtDocEntry").val()
    var surtido = $(this).val()
    if(Number(docEntry)>0 && Number(linea) >=0 && Number(surtido) >=0)
        {
            $.ajax({
                url: urlWcf + "ActualizarLinea",
                data: {  docEntry : docEntry,linea:linea,surtido:surtido},
                type: "GET",
                //timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {  
                    console.log(data)   
                }
            });
        }
    else
        alert('La cantidad de surtido no puede estar vacia o no puede ser mayor a lo solicitado')
});
function actualizarOrden (){
        var docEntry = $("#txtDocEntry").val();
        var lineas="";
        var surtidos="";
        var resLineas = true
        var resSurtido = true
        var resCorrecto = true
        $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        $("#lineasOrden  tr").each(function (index) 
        {
            var linea, articulo, descripcion,ubicacion, solicitado, surtido;
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: linea = $(this).text();
                            break;
                    case 6: solicitado = $(this).text();
                            break;
                    case 7: surtido = $(this).find('.txtSurtido').val();
                            break;
                }
            })
            console.log(surtido+' '+solicitado)
            if(Number(surtido) >= 0 && surtido!= ""){
                surtidos+=surtido+','
                $(this).removeClass('filaIncorrecta') 
            }
            else{
                resSurtido=false     
                $(this).addClass('filaIncorrecta') 
            }

            if(Number(surtido) > Number(solicitado)){
                resCorrecto = false
                $(this).addClass('filaIncorrecta') 

            }
            if(Number(linea) >= 0 && linea!= ""){
                lineas+=linea+','
            }
            else{
                resLineas = false
            }
            
        })
        //alert(lineas + '/' + surtidos)
        if(resLineas==true && resSurtido==true && resCorrecto == true)
        {
            $.ajax({
                    url: urlWcf + "ActualizarOrden",
                    data: {  docEntry : docEntry,lineas:lineas,surtidos:surtidos},
                    type: "GET",
                    //timeout:20000,
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {   
                        alert(data)
                        $("#ListOrdenes").show();
                        $("#ListDetalleOrden").hide();  
                        $("#btnConsultaOrdenes").show();
                        $("#btnRegresar").hide();  
                        $("#btnSuspender").hide();  
    					$("#divDescripcionArtO").html("")   
                        refrescarTiempo()
                        consultaEntregas() 
                        $.mobile.loading("hide");  
                    }
            });
        }
        else{
             $.mobile.loading("hide");
            alert('La cantidad de surtido no puede estar vacia o no puede ser mayor a lo solicitado')
        }
}
function refrescarTiempo(){

    tiempoFinal =new Date().getTime()
    var tiempo = Math.round((tiempoFinal - tiempoInicial)/1000)
    var docEntry = $("#txtDocEntry").val();
    $.ajax({
            url: urlWcf + "RefrescarTiempo",
            data: {  docEntry : docEntry,tiempo:tiempo},
            type: "GET",
            //timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {  
                console.log("tiempo refresco") 
            }
    });
}
function suspenderTiempo(){    
    $("#divTblOrdenes").html("");          
    $("#ListOrdenes").show();
    $("#ListDetalleOrden").hide();  
    $("#btnConsultaOrdenes").show();
    $("#btnRegresar").hide();  
    $("#btnSuspender").hide();  
    $("#divDescripcionArtO").html("")   
    refrescarTiempo()
    consultaEntregas() 
}
function consultaEntregas(){
        var UserID = window.localStorage.getItem('IDUS')
        // var Rol = window.localStorage.getItem('Rol');

        $.ajax({
                url: urlWcf + "ConsultaOrdenes",
                data: {usuarioID : UserID,consulta:4},
                // data: {  usuarioID : 268},
                type: "GET",
                timeout:30000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {  
                    var htmlTable = '';
                    if(data != null && data.length > 0)
                    {   
						navigator.notification.beep(3);
                        $("#divTblOrdenes").html('');
                        // htmlTable += '<table class="facturas tblOrdenes" id="tblOrdenes" cellspacing="0">';      
                        $.each(data,function(index, value){
                            htmlTable+=''+
                            '<a href="#" title="'+value.DocEntry+'" class="detalleOrden enlaceOrden"><div class="cuadroOrden '+value.U_TPedido+'" >'+
                              '<div class="cuadroCardCode">'+value.DocNum+'</div>'+
                              '<div class="cuadroSuperior"></div>'+
                              '<div class="cuadroInferior"><div class="divCardName"> '+value.CardCode+' <br> '+value.CardName+'</div></div>'+
                            '</div></a>';                         
                        });
                        // htmlTable += '</table>';                        
                    }
                    else{
                        $("#divTblOrdenes").html('');
                        htmlTable = '<div>Sin ordenes pendientes</div>';
                    }
                    $("#divTblOrdenes").html(htmlTable);
                    $("#loader").hide() 
                    $("#btnConsultaOrdenes").prop( "disabled", false );    
                },
                error: function(err){
                    $("#divTblOrdenes").html("Error al consultar intentelo nuevamente");
                    $("#loader").hide() 
                    $("#btnConsultaOrdenes").prop( "disabled", false );
                } 
        });  
         
    }
    function consultaDetalleEntrega(docEntry){
    //var UserID = window.localStorage.getItem('ID_Usuario')
    //var Rol = window.localStorage.getItem('Rol');
    // alert(UserName);
    tiempoInicial =new Date().getTime()
    var html ="";
    $.ajax({
            url: urlWcf + "ConsultaDetalleOrdenes",
            data: {  docEntry : docEntry},
            type: "GET",
            //timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {  
                if(data != null && data.length > 0)
                {       
                    var i=0
                    var htmlTable = '';
                    $("#divTblDetalle").html('');
                    htmlTable += '<table class="facturas tblOrdenes lineasOrden" id="lineasOrden" cellspacing="0" width="100%">';      
                    $.each(data,function(index, value){
                        $('#txtDocEntry').val(value.DocEntry)
                        $('#lblCardCode').html(value.CardCode)
                        $('#lblCardName').html(value.CardName)
                        $('#lblDocTotal').html(value.DocTotal)
                        $('#lblDocNum').html(value.DocNum)
    					$("#divDescripcionArtO").html("")   
                        if((i%2) > 0)
                            htmlTable+='<tr class="remarcada">';
                        else
                            htmlTable+='<tr class="">';

                         htmlTable+=''+
                            '<td width=0 style="display:none">'+value.LineNum+'</td>'+
                            '<td width=30% style="text-align:center"><a href="#" class="descripcionArtO" title="'+value.Description+' <br>Ubicación: '+value.U_Ubicacion+'" >'+value.ItemCode+'</a></td>'+
                            '<td width=0 style="text-align:center;display:none" ><div style="width:100%;word-wrap: break-word; ">'+value.Description+'</div></td>'+
                            '<td width=30% style="text-align:center"><a href="#" class="descripcionArtO" title="'+value.Description+' <br>Ubicación: '+value.U_Ubicacion+'" >'+value.Linea+'</a></td>'+
                            '<td width=0 style="text-align:left;display:none">'+value.U_Ubicacion+'</td>'+
                            '<td width=10% style="text-align:left"><a href="#" class="descripcionArtO" title="'+value.Description+' <br>Ubicación: '+value.U_Ubicacion+'" >'+value.Stock+'</a></td>'+
                            '<td width=10% style="text-align:center"><a href="#" class="descripcionArtO" title="'+value.Description+' <br>Ubicación: '+value.U_Ubicacion+'" >'+value.Solicitado+'</a></td>'+
                            '<td width=20% style="text-align:center"><input type="number" class="txtSurtido" name="surtido" title="'+value.LineNum+'" value="'+value.Surtido+'" </input></td>'+
                        '</tr>';     
                        i++                          
                    });
                    htmlTable += '</table>';
                    $("#divTblDetalle").html(htmlTable);
                    $("#ListOrdenes").hide();
                    $("#ListDetalleOrden").show();
                    $("#btnConsultaOrdenes").hide();
                    $("#btnRegresar").show();
                    $("#btnSuspender").show();
                    //$.mobile.changePage("#detalleOrden")
                }
            }
    }); 
}

$(document).on('click','.descripcionArtO', function () {
    var desc = $(this).attr('title')
    $("#divDescripcionArtO").html(desc)
});
/******************************************************************************/
function consultaEntregasS(){
        var UserID = window.localStorage.getItem('IDUS')
        // var Rol = window.localStorage.getItem('Rol');
        var html ="";
        $.ajax({
                url: urlWcf + "ConsultaOrdenes",
                data: {usuarioID : UserID,consulta:12},
                //data: {  usuarioID : 12,consulta:12},
                type: "GET",
                timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {  
                    var htmlTable = '';
                    if(data != null && data.length > 0)
                    {   
                        $("#divTblOrdenesS").html('');
                        // htmlTable += '<table class="facturas tblOrdenes" id="tblOrdenes" cellspacing="0">';      
                        $.each(data,function(index, value){
                            htmlTable+=''+
                            '<a href="#" title="'+value.DocEntry+'" class="detalleOrdenS enlaceOrden"><div class="cuadroOrden '+value.U_TPedido+'" >'+
                              '<div class="cuadroCardCode">'+value.DocNum+'</div>'+
                              '<div class="cuadroSuperior"></div>'+
                              '<div class="cuadroInferior"><div class="divCardName"> '+value.CardCode+' <br> '+value.CardName+'</div></div>'+
                            '</div></a>';                         
                        });
                        // htmlTable += '</table>';                        
                    }
                    else{
                        $("#divTblOrdenesS").html('');
                        htmlTable = '<div>Sin ordenes pendientes</div>';
                    }
                    $("#divTblOrdenesS").html(htmlTable);
                    $("#loader").hide() 
                    $("#btnConsultaOrdenesS").prop( "disabled", false );    
                },
                error: function(err){
                    $("#divTblOrdenesS").html("Error al consultar intentelo nuevamente");
                    $("#loader").hide() 
                    $("#btnConsultaOrdenesS").prop( "disabled", false );
                } 
        });   
         
}
function consultaDetalleEntregaS(docEntry){
    //var UserID = window.localStorage.getItem('ID_Usuario')
    //var Rol = window.localStorage.getItem('Rol');
    // alert(UserName);
    //tiempoInicial =new Date().getTime()
    var html ="";
    $.ajax({
            url: urlWcf + "ConsultaDetalleOrdenes",
            data: {  docEntry : docEntry},
            type: "GET",
            //timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {  
                if(data != null && data.length > 0)
                {       
                    var i=0
                    var htmlTable = '';
                    $("#divTblDetalleS").html('');
                    htmlTable += '<table class="facturas tblOrdenes lineasOrden" id="lineasOrden" cellspacing="0" width="100%">';      
                    $.each(data,function(index, value){
                        $('#txtDocEntryS').val(value.DocEntry)
                        $('#lblCardCodeS').html(value.CardCode)
                        $('#lblCardNameS').html(value.CardName)
                        $('#lblDocTotalS').html(value.DocTotal)
                        $('#lblDocNumS').html(value.DocNum)
                        if((i%2) > 0)
                            htmlTable+='<tr class="remarcada">';
                        else
                            htmlTable+='<tr class="">';

                         htmlTable+=''+
                            '<td width=20 style="text-align:center">'+value.ItemCode+'</td>'+
                            '<td width=40 style="text-align:left"><div style="width:100%;word-wrap: break-word; ">'+value.Description+'</div></td>'+
                            '<td width=20 style="text-align:left">'+value.Linea+'</td>'+
                            '<td width=10 style="text-align:center">'+value.Solicitado+'</td>'+
                            '<td width=10 style="text-align:center">'+value.Surtido+'</td>'+
                        '</tr>';     
                        i++                          
                    });
                    htmlTable += '</table>';
                    $("#divTblDetalleS").html(htmlTable);
                    $("#ListOrdenesS").hide();
                    $("#ListDetalleOrdenS").show();
                    $("#btnConsultaOrdenesS").hide();
                    $("#btnRegresarS").show();
                    //$("#btnSuspender").show();
                    //$.mobile.changePage("#detalleOrden")
                }
            }
    }); 
}
function guardarFacturaS(){  
    $("#btnGuardarFacturaS").prop( "disabled", true );  
    $.mobile.loading('show', {
                text: 'Guardando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });  
    var uuidS = $("#numFacturaS").val();
    var docEntry = $("#txtDocEntryS").val();
    if(uuidS!="" && uuidS != null && docEntry!="" && docEntry != null){
        $.ajax({
                url: urlWcf + "GuardarFacturaS",
                data: {  docEntry : docEntry,uuid:uuidS},
                type: "GET",
                timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {  
					Mensaje(data, "HalcoNET", "Aceptar");
                    $("#numFacturaS").val('');
                    $.mobile.loading("hide"); 
                    $("#btnGuardarFacturaS").prop( "disabled", false ); 
                },
                error:function(){
					Mensaje('Problemas con el servicio', "HalcoNET", "Aceptar");
                    $("#btnGuardarFacturaS").prop( "disabled", false ); 
                    $.mobile.loading("hide"); 
                }
        });
    }else{
        $("#btnGuardarFacturaS").prop( "disabled", false ); 
        $.mobile.loading("hide"); 
		Mensaje('El número de factura no puede estar vacio', "HalcoNET", "Aceptar");
    }
}
function entregarOrdenS(){
    //var res = confirm("¿Desea cambiar el status de la orden?");
     var envio='NO';
    //if(res==true){       
        var docEntry = $("#txtDocEntryS").val();
        // $("#btnGuardarOrdenS").prop( "disabled", true ); 
        $.ajax({
                url: urlWcf + "VerificarGuardarOrdenS",
                data: {  docEntry : docEntry},
                type: "GET",
                timeout:20000,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) { 
                //alert(data) 
					if(data.length > 10)
						{
							var res = confirm("¿Desea cambiar el status de la orden?");
							if(res==true){ 
									$.ajax({
											url: urlWcf + "GuardarOrdenS",
											data: {  docEntry : docEntry},
											type: "GET",
											timeout:20000,
											contentType: "application/json; charset=utf-8",
											dataType: "jsonp",
											success: function (data) {  
												alert(data)
												$("#ListOrdenesS").show();
												$("#ListDetalleOrdenS").hide();  
												$("#btnConsultaOrdenesS").show();
												$("#btnRegresarS").hide();  
												consultaEntregasS() 
												$.mobile.loading("hide"); 
												// $("#btnGuardarFacturaS").prop( "disabled", false ); 
											},
											error:function(){
												alert('Problemas con el servicio')
												// $("#btnGuardarFacturaS").prop( "disabled", false ); 
												$.mobile.loading("hide"); 
											}
									});
							}
						}
					else  {
						$.mobile.loading("hide"); 
						// $("#btnGuardarFacturaS").prop( "disabled", false ); 
						Mensaje('La orden no tiene facturas asignadas.', "HalcoNET", "Aceptar");
					}                
                },
                error:function(){
                    alert('Problemas con el servicio')
                    $("#btnGuardarFacturaS").prop( "disabled", false ); 
                    $.mobile.loading("hide"); 
                }
        });
        //alert(envio)
        
}
function LeerQrOrden(){
    
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          /*alert("We got a barcode\n" +"Result: " + result.text + "\n" +"Format: " + result.format + "\n" +"Cancelled: " + result.cancelled);*/
        var resultado = result.text;
        var cadenas = resultado.split('&');
        var cadenas2 = cadenas[3].split('=');
        $("#numFacturaS").val(cadenas2[1]);
        
      }, 
      function (error) {
          alert("Scanning failed: " + error.message);
      }
    );
}
//*************************************************************ventas
$(document).on("click", ".paginaActiva", function() { // ocultar meenu cuando se hace tap en una pagina
	if( $('#mySidenav').is(":visible") ){
	   closeNav()
	}
});
$(document).on("click", ".opcionMenu", function() { // ocultar meenu cuando se hace tap en una pagina
	if( $('#mySidenav').is(":visible") ){
	   closeNav()
	}
});
$(document).on("swiperight", function (event, ui) {
	openNav();
});
$(document).on("swipeleft", function (event, ui) {
	closeNav()
});
function guardarVenta(){
  ///GUARDAR VENTA PERDIDA
        if ($('#rbtVtaPerdida').is(':checked')) {
            var itemI1 = $("#txtArticuloI1").val();
            var cardcodeI1 = $("#txtClienteI1").val();
            var fechaI1 = $('#basic_example_1').val();
            var cantidadI1 = $("#cantidadI1").val();
            var usI1 = window.localStorage.getItem("Us");
            //var usI1 = '1';

            console.log(itemI1);
            console.log(cardcodeI1);
            console.log(fechaI1);
            console.log(cantidadI1);
            console.log(usI1);

            $.ajax({
                url: urlWcf + "InsertarVenta",
                data: {
                    _Usuario: "1",
                    _Qty: cantidadI1,
                    _CardCode: cardcodeI1,
                    _ItemCode: itemI1,
                    tipo: '01',
                    Fecha: fechaI1,
                    Origen: '',
                    Destino: ''
                },
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    if (data == 'OK') {
                        alert("Registro almacenado\n\nGracias por tu colaboración!");

                        $("#txtArticuloI1").val('');
                        $("#txtClienteI1").val('');
                        $('#basic_example_1').val('');
                        $("#cantidadI1").val('');
                        $('#txtNombreI1').val('');
                        $('#divSeccionI1').show();
                        $('#divSeccionI2').hide();

                        $('#select_Origen').val(window.localStorage.getItem("Whs"));
                        $("#select_Origen").selectmenu('refresh', true);

                        $('#basic_example_1').val(dateTimeFormato(new Date()));
                        $('#input_example_2').val(dateTimeFormatoSinHora(new Date()));
                    }
                    else { alert(data); }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
        else
        //GUARDAR VENTA CONFIRMADA
        {
            var itemI2 = $("#txtArticuloI2").val();
            var origenI2 = $("#select_Origen").val();
            var destinI2 = $("#select_Destino").val();
            var fechaI2 = $('#input_example_2').val();
            var cantidadI2 = $("#cantidadI2").val();
            var usI2 = window.localStorage.getItem("Us");
            var cardCode = $("#txtClienteI2").val();

            console.log(itemI2);
            console.log(origenI2);
            console.log(destinI2);
            console.log(fechaI2);
            console.log(cantidadI2);
            console.log(usI2);

            $.ajax({
                url: urlWcf + "InsertarVenta",
                data: {
                    _Usuario: usI2,
                    _Qty: cantidadI2,
                    _CardCode: cardCode,
                    _ItemCode: itemI2,
                    tipo: '02',
                    Fecha: fechaI2,
                    Origen: origenI2,
                    Destino: destinI2
                },
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (data) {
                    if (data == 'OK') {
						Mensaje("Registro almacenado\n\nGracias por tu colaboración!", "HalcoNET", "Aceptar");

                        $("#txtClienteI2").val('');
                        $("#txtNombreI2").val('');
                        $("#txtArticuloI2").val('');
                        $("#select_Origen").val('');
                        $('#Select_Destino').val('');
                        $("#cantidadI2").val('');
                        $("#input_example_2").val('');
                        $('#divSeccionI1').show();
                        $('#divSeccionI2').hide();

                        $('#select_Origen').val(window.localStorage.getItem("Whs"));
                        $("#select_Origen").selectmenu('refresh', true);

                        $('#basic_example_1').val(dateTimeFormato(new Date()));
                        $('#input_example_2').val(dateTimeFormatoSinHora(new Date()));
                    }
                    else { alert(data);}
                },
                error: function (err) {
					Mensaje(err, "HalcoNET", "Aceptar");
                }
            });
        }
};

$(document).on('click','#verStocks',function(){
		if(ver == false){
			$("#divStocks").show()
			ver = true
		}
		else{
			$("#divStocks").hide()
			ver = false
		}
})
function MostrarStock(codigo) {
	var CodORNom = "";
        var codigoNombre = codigo;
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
    $.ajax({
        url: urlWcf + "ConsultaStocks", /* Llamamos a tu archivo */
        data: { codArticulo: CodORNom, TipoConsulta:5 }, /* Ponemos los parametros de ser necesarios */
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",  
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#tblListaStockVenta").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */
            //if (data != null && $.isArray(data.d)) {
                /* Recorremos tu respuesta con each */
                htmlTable += '<table class="precios" cellspacing="0">';
                $.each(data, function (index, value) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    htmlTable += '<tr>';
                    htmlTable += '<td width=50% >' + value.Almacen + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Stock + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Solicitado + '</td>';
                    htmlTable += '</tr>';
                    //$("#tblLista").append("<tr><td>" + value.ListName + "</td></tr>");
                    //i++;
                });    	
				
                htmlTable += '</table>';
                $("#tblListaStockVenta").html(htmlTable);
            //}
        }
    });
}

function ConsultaListaPrecios(Articulo, TipoConsulta, BDescripcion) {
    //Se llena la tabla de precios
    var Rol = window.localStorage.getItem('Rl')

    $.ajax({
        url: urlDOM + "CS.aspx/ConsultaPrecios", /* Llamamos a tu archivo */
        data: "{ 'DescripArticulo': '" + Articulo + "', TipoConsulta:" + TipoConsulta + ", BDescripcion:" + BDescripcion + ", Rol:" + Rol + "}", /* Ponemos los parametros de ser necesarios */
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",  /* Esto es lo que indica que la respuesta será un objeto JSon */
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#tblLista").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */
            if (data != null && $.isArray(data.d)) {
                /* Recorremos tu respuesta con each */
                htmlTable += '<table class="phone-compare ui-shadow table-stroke">';
                $.each(data.d, function (index, value) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    htmlTable += '<tr>';
                    htmlTable += '<td class="col-stock-Izq">' + value.ListName + '</td>';
                    htmlTable += '<td class="col-stock-Der">' + value.MXP + '</td>';
                    htmlTable += '<td class="col-stock-Der">' + value.USD + '</td>';
                    htmlTable += '</tr>';
                    //$("#tblLista").append("<tr><td>" + value.ListName + "</td></tr>");
                    //i++;
                });

                htmlTable += '</table>';
                $("#tblLista").html(htmlTable);
            }
        }
    });
}

function ConsultaStock(Articulo, TipoConsulta, BDescripcion) {
    //Se llena la tabla de precios
    $.ajax({
        url: urlWcf + "ConsultaStocks", /* Llamamos a tu archivo */
        data: { codArticulo: Articulo, TipoConsulta:TipoConsulta }, /* Ponemos los parametros de ser necesarios */
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",  
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#tblListaStock").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */
            //if (data != null && $.isArray(data.d)) {
                /* Recorremos tu respuesta con each */
                htmlTable += '<table class="precios" cellspacing="0">';
                $.each(data, function (index, value) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    htmlTable += '<tr>';
                    htmlTable += '<td width=50% >' + value.Almacen + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Stock + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Solicitado + '</td>';
                    htmlTable += '</tr>';
                    //$("#tblLista").append("<tr><td>" + value.ListName + "</td></tr>");
                    //i++;
                });    	
				
                htmlTable += '</table>';
                $("#tblListaStock").html(htmlTable);
            //}
        }
    });
}


function VerificaDescripcionArticulo(Codigo) {
    var result = "";
    var Rol = window.localStorage.getItem('Rl')
    //var Rol = 1;
    if (Rol != null && Rol != undefined && Rol > 0) {
        if (Codigo != "") {
            $.ajax({
                url: urlWcf + "ObtenerDescripcionArticulo",
                data: { TipoConsulta: 9 , CodArticulo:Codigo },
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",  
                success: function (response) {
                    result = response;
                    if (result != "") {
                        //$("#sDescripcionArticulo").text(result);
                        MustraSegunRol();
                        // ConsultaListaPrecios(Codigo, 3, 0);
                        ConsultaListaPreciosV2(Codigo);
                        ConsultaStock(Codigo, 5);
						ConsultaDescuento(Codigo);
                        ConsultaAlternativos(Codigo);
                        if (Publi == 1) {
                            $.mobile.loading("hide");
                        }
                    }
                    else {
                        Mensaje("No existe ningun artículo con el código especificado", "HalcoNET", "Aceptar");
                        LimpiaCodArtNoExistente();
                        $('#idInformacion').css('display', 'none');

                    }
                }
            });
        }
        else {
            Mensaje("Debe especificar un código de articulo", "HalcoNET", "Aceptar");
        }
    }
    else {
        if (Publi == 1) {
            $.mobile.loading("hide");
        }
    }
}


function LimpiaCodArtNoExistente() {
    //Se llena la tabla de precios
    $("#txtPrecio").val('');
    $("#txtUtilidad").val('');
    $("#sDescripcionArticulo").text('');

    //--------------------------------------
    var htmlTable = '';
    $("#tblLista").html('');
    $("#tblLista").html(htmlTable);

    $("#tblListaStock").html('');
    $("#tblListaStock").html(htmlTable);

    $('#idInformacion').css('display', 'none');
    $('#CalUtil').css('display', 'none');
    $('#DescMax').css('display', 'none');
    $('#LstPrice').css('display', 'none');
    $('#LstStock').css('display', 'none');
    
}


function Mensaje(TextMensaje, Titulo, Boton) {
    if (Publi == 1) {
        navigator.notification.alert(TextMensaje, null, Titulo, Boton);
        $.mobile.loading("hide");
    }
    else {
        alert(TextMensaje);
    }
}

function MustraSegunRol() {
    
    $('#idInformacion').css('display', 'block');

    var Rol = window.localStorage.getItem('Rl');
    //var Rol = 1;

    if (Rol == null || Rol == undefined || Rol ==0) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        $('#consultaReparto').css('display', 'none');
        //$('#footer').css('display', 'none');
    }
    else if (Rol == 1) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'block');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        $('#coordenadas').css('display', 'block');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
        //$('#footer').css('display', 'block');
    }
    else if (Rol == 2) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'block');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
        //$('#footer').css('display', 'block');
    }
    else if (Rol == 3) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        // $('#coordenadas').css('display', 'block');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
    }
    else if (Rol == 4) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        // $('#consultaRep').css('display', 'none');
        //$('#footer').css('display', 'none');
    }
    else if (Rol == 5) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        // $('#coordenadas').css('display', 'none');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'none');
        //$('#footer').css('display', 'none');
    }

    $('#LstAlternativos').css('display', 'block');
}

function ObtenerDatosIP() {
    $.ajax({
        url: urlDOM + "CS.aspx/ObtenerIP",
        data: "{ TipoConsulta: " + 2 + ", Correo:'" + 0 + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            urlDOM = data.d.IP_Publica;
            Publi = data.d.Publicado;
            
        }
    });
}


function ValidaPorcentaje(monto) {
    var Rol = window.localStorage.getItem('Rl')
    if (monto < 13 && Rol > 1) {
        return false;
    }
}

function alertDismissed() {
    // hacer algo aquÃ­
}
function ConsultaListaPreciosV2(codigo){
	var UserName = window.localStorage.getItem('Us')
	var Id = window.localStorage.getItem('ID')
	var html ="";
    $.ajax({
			url: urlWcf + "ConsultaPreciosV2",
			data: {usuario : UserName, codArticulo: codigo, },
			// data: {  usuario : "peter3", codArticulo: codigo},
			type: "GET",
			//timeout:20000,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			success: function (data) {				
				var htmlTable = '';
				$("#tblLista").html('');
				htmlTable += '<table class="precios" cellspacing="0">';				
				for(var i = 0; i< data.length; i++){
					htmlTable+='<tr >'+
						'<td width=50% >'+data[i].ListName+'</td>'+
						'<td width=25% style="text-align:right">'+data[i].MXP+'</td>'+
						'<td width=25% style="text-align:right">'+data[i].USD+'</td>'+
					'</tr>'
				}
				htmlTable += '</table>';
				$("#tblLista").html(htmlTable);

			}/*,
			error: function(err){
				$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
			}*/
	});   
}

function ConsultaAlternativos(codigo){
    var UserName = window.localStorage.getItem('Us')
    var Id = window.localStorage.getItem('ID')
    var html ="";
    $.ajax({
            url: urlWcf + "ConsultaArticulosAlternativos",
            data: { codArticulo: codigo, },
            // data: {  usuario : "peter3", codArticulo: codigo},
            type: "GET",
            //timeout:20000,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) {              
                var htmlTable = '';
                $("#tblListaAlternativos").html('');
                htmlTable += '<table class="precios" cellspacing="0">';             
                for(var i = 0; i< data.length; i++){
                    htmlTable+='<tr >'+
                        '<td width=25% onclick="AlimentaAlterno(' + "'" + data[i].Codigo + "'" + ',' + "'" + data[i].Descripcion + "'" + ')">'+ data[i].Codigo +'</td>'+
                        '<td width=50% style="text-align:right" onclick="AlimentaAlterno(' + "'" + data[i].Codigo + "'" + ',' + "'" + data[i].Descripcion + "'" + ')">'+ data[i].Descripcion +'</td>'+
                        '<td width=25% style="text-align:right" onclick="AlimentaAlterno(' + "'" + data[i].Codigo + "'" + ',' + "'" + data[i].Descripcion + "'" + ')">'+ data[i].Linea +'</td>'+
                    '</tr>'
                }
                htmlTable += '</table>';
                $("#tblListaAlternativos").html(htmlTable);

            }/*,
            error: function(err){
                $("#txtItemCode").removeClass( "ui-autocomplete-loading" );
            }*/
    });   
}

function AlimentaAlterno(CodigoIt, DesItem)
{
    //alert(CodigoIt + " -- " + DesItem);
    $("#txtItemCode").val(CodigoIt);
    $("#txtNombreArticulo").val(DesItem);


}


function ConsultaDescuento(codigo){
	var UserName = window.localStorage.getItem('Us')
	var Id = window.localStorage.getItem('ID')
	 // alert(UserName+' ' +Id);
	//alert(codigo);
	$("#radioDescuento").hide();
	var html ="";
    $.ajax({
			url: urlWcf + "CalcularDescuento",
			data: { codArticulo: codigo, usuario : UserName, idUsuario: 1},
			// data: { codArticulo: codigo, usuario : "peter3", idUsuario: 1},
			type: "GET",
			//timeout:20000,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			success: function (data) {
				
				if(data.mayoreo == 1 && data.transporte == 1  )
				{						
					if(data.DescuentoMayoreo != '$0.00' && data.DescuentoTransporte != '$0.00')
					{
						$("#radioDescuento").show();
						$("#descuentoM").addClass("activo");
						$("#descuentoT").removeClass("activo");
						$("#descuentoMayoreo").show();
						$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
						$("#descuentoTransporte").html("Descuento: " +  data.DescuentoTransporte);
						$("#descuentoTransporte").hide()
					}
					else if(data.DescuentoMayoreo != '$0.00')
						{
							$("#radioDescuento").show();
							$("#descuentoM").addClass("activo");
							$("#descuentoT").removeClass("activo");
							$("#descuentoMayoreo").show();
							$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
							$("#descuentoTransporte").html("Descuento: " +  data.DescuentoMayoreo);
							$("#descuentoTransporte").hide();
						}
						else if(data.DescuentoTransporte != '$0.00')
							{
								$("#radioDescuento").show();
								$("#descuentoM").addClass("activo");
								$("#descuentoT").removeClass("activo");
								$("#descuentoMayoreo").show();
								$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoTransporte  );
								$("#descuentoTransporte").html("Descuento: " +  data.DescuentoTransporte);
								$("#descuentoTransporte").hide();
							}
							else{
								$("#descuentoMayoreo").html( '');
								$("#descuentoTransporte").html('' );
								$("#radioDescuento").hide();
							}
				}
				if(data.mayoreo == 1 && data.transporte == 0)
				{
					$("#radioDescuento").hide();
					if(data.DescuentoMayoreo != '$0.00')
						$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
				}
				if(data.mayoreo == 0 && data.transporte == 1)
				{
					$("#radioDescuento").hide();
					if(data.DescuentoTransporte != '$0.00')
						$("#descuentoTransporte").html("Descuento: " + data.DescuentoTransporte);
				}
			}/*,
			error: function(err){
				$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
			}*/
	});   
}
function recortar(cadena){
	if(cadena.length > 30)
		cadena = cadena.substring(0,30) + '...';
	return cadena;
}

function GPS(){
    clickCoordenadas = 1; 
    $("#obtenerCoordenadas").prop( "disabled", true );  
   setTimeout(function(){ if (clickCoordenadas == 1 && Longitud == 0){
        clickCoordenadas = 0;
        $("#obtenerCoordenadas").prop( "disabled", false ); 
        alert("Probablemente su GPS esta apagado");
    } }, 20000);
    navigator.geolocation.getCurrentPosition(
        function (pocicion){
            $("#obtenerCoordenadas").prop( "disabled", false ); 
            Latitud = pocicion.coords.latitude;
            Longitud = pocicion.coords.longitude;   
            $("#coordenadasC").val( Latitud+ '_' + Longitud);       
        }, 
        function (error) {  
            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
            
        },options
    );
}
function consultarClientesVendedores(){
    var UserName = window.localStorage.getItem('Us');
    
    var fechaIni = $("#fechaIni").val();
    var fechaFinal = $("#fechaFinal").val();
    
    $.ajax({
        url: urlWcf + "ConsultaClientesVendedor",
            data: {usuario : UserName, rol: 3 ,fechaIni:fechaIni,fechaFinal:fechaFinal},
            // data: {  usuario : "1", rol: 1,fechaIni:fechaIni,fechaFinal:fechaFinal},
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
        success: function (data) {
            var htmlTable = '';
            $("#tablaClientesVendedor").html('');
            htmlTable+='<table class="precios" cellspacing="0">';
            for(var i = 0; i< data.length; i++){                
                htmlTable+='<tr >'+
                    '<td width=30% ><a class="rutasVendedor" title="'+data[i].IdRuta+'" style="text-decoration:none;"  href="#"><div class="enlaceRuta">'+data[i].IdRuta+'</div></a></td>'+
                    '<td width=70% style="text-align:left"><a class="rutasVendedor" style="text-decoration:none;" title="'+data[i].IdRuta+'" href="#"><div class="enlaceRuta">'+data[i].Repartidor+'</div></a></td>'+
                '</tr>';                
            }
            htmlTable+='</table>';
            $("#tablaClientesVendedor").html(htmlTable);
        }
    });
}
function ConsultaStatusRutaFactura(idRuta){
    var UserName = window.localStorage.getItem('Us');

    $.ajax({
        url: urlWcf + "ConsultaStatusRutaFactura",
            data: { IdRuta: idRuta,usuario : UserName },
            // data: {  IdRuta: idRuta,usuario:"Vendedor"},
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
        success: function (data) {
            var htmlTable = '';
            $("#tablaFacturasVendedor").html('');
            htmlTable+='<b>FACTURAS</b><br><br>'+'<table id="" class="tablaPrecios" cellspacing="0">'+
              '<thead>'+
                  '<tr>'+
                      '<th width=30% >Factura</th>'+
                      '<th width=70% style="text-align:center">Estado</th>'+
                  '</tr>'+
              '</thead>'+
            '</table>';
            htmlTable+='<table class="precios" cellspacing="0">';
            for(var i = 0; i< data.length; i++){                
                htmlTable+='<tr >'+
                    '<td width=30% >'+data[i].numFactura+'</td>'+
                    '<td width=70% style="text-align:left">'+data[i].statusFactura+'</td>'+
                '</tr>';                
            }
            htmlTable+='</table>';
            $("#tablaFacturasVendedor").html(htmlTable);
        }
    });
}

function fechaFormato(fecha) {          
        var yyyy = fecha.getFullYear().toString();                                    
        var mm = (fecha.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = fecha.getDate().toString();             
                            
        return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
   };  
   function dateTimeFormatoSinHora(fecha) {

    var yyyy = fecha.getFullYear().toString();
    var mm = (fecha.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd = fecha.getDate().toString();
    var hh = fomartTimeShow(fecha.getHours(), fecha.getMinutes());
    var mi = fecha.getMinutes().toString();

    return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + dd
};

function dateTimeFormato(fecha) {

    var yyyy = fecha.getFullYear().toString();
    var mm = (fecha.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd = fecha.getDate().toString();
    var hh = fomartTimeShow(fecha.getHours(), fecha.getMinutes());
    var mi = fecha.getMinutes().toString();

    return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + dd + ' ' + hh;
};

function fomartTimeShow(h_24, min_) {
    var h = h_24 % 12;
    if (h === 0) h = 12;
    return (h < 10 ? "0" + h : h) + ":00 " + (h_24 < 12 ? 'am' : 'pm');
}
