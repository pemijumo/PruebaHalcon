var urlWcf = "http://187.157.115.98:100/wcf/WcfServiceLibrary1.Json.svc/"; var Publi = 1;
$( document ).ready(function() {
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
	
	$("#btnBusqArt").bind("click", function (event, ui) {
        var Codigo = '';
		
		var codigoNombre = $("#txtItemCode").val();
		codigoNombre = codigoNombre.trim();	
		if(codigoNombre!='')
		{
			var divide = codigoNombre.split('//');
			Codigo = divide[0];
		}
        /*if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }*/
        VerificaDescripcionArticulo(Codigo);
		// ConsultaListaPreciosV2(Codigo);
		// ConsultaDescuento(Codigo);	
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
                    /*if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }*/
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
                                            //$.mobile.loading("hide");

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
                            /*if (Publi == 1) {
                                $.mobile.loading('hide');
                            }*/
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
                        /*if (Publi == 1) {
                            $.mobile.loading('show', {
                                text: 'Calculando...',
                                textVisible: true,
                                theme: 'a',
                                html: ""
                            });
                        }*/
                        //Se llena la tabla de precios
                        $.ajax({
                            url: urlWcf + "CalculaUtilidadPorciento",
                            data: { TipoConsulta: TipoConsulta , DescripArticulo: code , TipoMoneda: TipoMoneda , Monto: mon , BDescripcion: 0 },
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
                            success: function (data) {
                                $("#txtPrecio").val(data);
                                /*if (Publi == 1) {
                                    $.mobile.loading('hide');
                                }*/
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
})//fin ready

function recortar(cadena){
	if(cadena.length > 30)
		cadena = cadena.substring(0,30) + '...';
	return cadena;
}
function VerificaDescripcionArticulo(Codigo) {
    var result = "";
    var Rol = window.localStorage.getItem('Rl')
    if (Rol != null && Rol != undefined && Rol > 0) {
        if (Codigo != "") {
            $.ajax({
                url: urlWcf + "ObtenerDescripcionArticulo",
                data: { TipoConsulta:9 , CodArticulo:Codigo },
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",  
                success: function (response) {
                    result = response;
                    if (result != "") {
                        MustraSegunRol();
                        ConsultaListaPreciosV2(Codigo);
                        ConsultaStock(Codigo, 5);
						/*ConsultaDescuento(Codigo);*/
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
}

function MustraSegunRol() {
    
    $('#idInformacion').css('display', 'block');
    var Rol = window.localStorage.getItem('Rl');
    // var Rol = 3;

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

function ConsultaStock(Articulo, TipoConsulta, BDescripcion) {
    //Se llena la tabla de precios
    $.ajax({
        url: urlWcf + "ConsultaStocks", /* Llamamos a tu archivo */
        data: { codArticulo: Articulo, TipoConsulta:TipoConsulta }, /* Ponemos los parametros de ser necesarios */
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",  
        success: function (data) {
            var htmlTable = '';
            $("#tblListaStock").html('');
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

function openNav() {
		$('#transbox').addClass("oscurecer")
		document.getElementById("mySidenav").style.display = "block";
	}

	function closeNav() {
		$('#transbox').removeClass("oscurecer")
		document.getElementById("mySidenav").style.display = "none";
	}