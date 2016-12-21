// var urlWcf = "http://localhost:8732/Design_Time_Addresses/WcfServiceLibrary1/Json/";
// var urlWcf = "http://192.168.2.204/FFF/WcfServiceLibrary1.Json.svc/";
document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		
	}
	$(function(){
          //clic en un enlace de la lista
          $('body').on('click', '.llamada', function() {
				var UserID = window.localStorage.getItem('IDUS')
                var numeroId = $(this).attr('title');
				var numTel = $(numeroId).val();
				var idCliente = $(numeroId).attr('title');
				//alert(numTel);
				var ini = new Date();
				$('#HI').html("");
				$('#HF').html("");
				$('#HI').html(fechaFormato(ini)+'-'+HoraFormato(ini));
				
				phonedialer.dial(
					numTel, 
					function(err) 
					{
						if (err == "empty") alert("Unknown phone number");
						else alert("Dialer Error:" + err);    
					},
					function(success) 
					{ 
						var r = confirm("Lamada en proceso");
						if (r == true) {
							var fin = new Date();
							$('#HF').html(fechaFormato(fin)+'-'+HoraFormato(fin));
							$.ajax({
							url: urlWcf + "RegistrarLlamada",
							data: { idCliente: idCliente, fechaInicio : $('#HI').html() ,fechaFin : $('#HF').html(),numMarcado : numTel,claveEntidad:UserID},
							type: "GET",
							timeout:20000,  // tiempo de espera de la llamada
							contentType: "application/json; charset=utf-8",
							dataType: "jsonp",
							success: function (data) {
								Mensaje(data, "HalcoNET", "Aceptar");
							},
							error: function(err){
								Mensaje("Error al enviar información", "HalcoNET", "Aceptar");
							}
					});							
						} else {
							var fin = new Date();
							$('#HF').html(fechaFormato(fin)+'-'+HoraFormato(fin));
							$.ajax({
							url: urlWcf + "RegistrarLlamada",
							data: { idCliente: idCliente, fechaInicio : $('#HI').html() ,fechaFin : $('#HF').html(),numMarcado : numTel,claveEntidad:UserID},
							type: "GET",
							timeout:20000,  // tiempo de espera de la llamada
							contentType: "application/json; charset=utf-8",
							dataType: "jsonp",
							success: function (data) {
								Mensaje(data, "HalcoNET", "Aceptar");
							},
							error: function(err){
								Mensaje("Error al enviar información", "HalcoNET", "Aceptar");
							}
					});
						} 
					}									
				 );
          });
		  $('body').on('click', '.llamadaD', function() {
			var numeroId = $(this).attr('title');
			var numTel = $(numeroId).val();
			var idCliente = $(numeroId).attr('title');
			alert(numTel);
			//

			phonedialer.dial(
				numTel, 
				function(err) 
				{
					if (err == "empty") alert("Unknown phone number");
					else alert("Dialer Error:" + err);    
				},
				function(success) 
				{ 
					alert("Lamada en proceso");

				}									
				 );
	      });
      });
	$(document).ready(function(){
	
		$('#buscarCliente').click(function(e){
			var codCliente = $("#clienteL" ).val();
			MostrarTelefonos(codCliente);
		});
		$('#limpiarCampos').click(function(e){
			$('#HI').html("");
			$('#HF').html("");
			$("#telefonos").html("");
			$("#clienteL" ).val("");
			$("#nombreCL" ).val("");
		});
		/*$('.llamada').click(function(){
		//2223637840
			var numeroId = $(this).attr('title');
			var numTel = $('#'+numeroId).val();
			var a = new Date();
			$('#HI').html("");
			phonedialer.dial(
				numTel, 
				function(err) 
				{
					if (err == "empty") alert("Unknown phone number");
					else alert("Dialer Error:" + err);    
				},
				function(success) 
				{ 
					var r = confirm("Lamada en proceso");
					if (r == true) {
						var a = new Date();
						$('#HF').html(a);
					} else {
						var a = new Date();
						$('#HF').html(a);
					} 
				}									
			 );
		});*/
		
		$( "#clienteL" ).autocomplete({
		  source: function (request, response) {
					$.ajax({
							url: urlWcf + "CompletarClienteCodigoLlamada",
							data: { valor: $('#clienteL').val(), tipoConsulta : 2},
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
			$("#nombreCL").val( ui.item.val );
			var codCliente = ui.item.label;
			MostrarTelefonos(codCliente);
		  }
		});
		
		$( "#nombreCL" ).autocomplete({
		  source: function (request, response) {
					$.ajax({
							url: urlWcf + "CompletarClienteCodigoLlamada",
							data: { valor: $('#nombreC').val(), tipoConsulta : 1},
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
			$("#clienteL").val( ui.item.val );
		  }
		});
		
		/*directorio***********************************************/
		$('#buscarClienteD').click(function(e){
			var codCliente = $("#clienteD" ).val();
			MostrarTelefonosD(codCliente);
		});
		$('#limpiarCamposD').click(function(e){
			$("#telefonosD").html("");
			$("#clienteD" ).val("");
			$("#nombreCD" ).val("");
		});
		$( "#clienteD" ).autocomplete({
		  source: function (request, response) {
					$.ajax({
							url: urlWcf + "CompletarClienteCodigoDirectorio",
							data: { valor: $('#clienteD').val(), tipoConsulta : 11},
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
								$("#clienteD").removeClass( "ui-autocomplete-loading" );
							}
					});
				},
		  select: function( event, ui ) {
			$("#nombreCD").val( ui.item.val );
			var codCliente = ui.item.label;
			MostrarTelefonosD(codCliente);
		  }
		});
		
		$( "#nombreCD" ).autocomplete({
		  source: function (request, response) {
					$.ajax({
							url: urlWcf + "CompletarClienteCodigoDirectorio",
							data: { valor: $('#nombreCD').val(), tipoConsulta : 10},
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
								$("#nombreCD").removeClass( "ui-autocomplete-loading" );
							}
					});
				},
		  select: function( event, ui ) {
			$("#clienteD").val( ui.item.val );
		  }
		});
		
	});	
	
	function MostrarTelefonosD(codCliente){
		$.ajax({
					url: urlWcf + "ConsultarTelefonosDirectorio",
					data: { valor: codCliente, tipoConsulta : 12},
					type: "GET",
					timeout:20000,  // tiempo de espera de la llamada
					contentType: "application/json; charset=utf-8",
					dataType: "jsonp",
					success: function (data) {
						var tels = data.tel1.split(',');
						var idCliente = data.idCliente;
						var html ="";
						for(var i =0; i< tels.length;i++)
						{
							if(tels[i].length > 1)
							{
								if(tels[i].toLowerCase().indexOf('ext')==-1 && tels[i].toLowerCase().indexOf('a')==-1)
								{
									html += '<div style="padding-top:0px"><input class=" numeroLlamada" type="text" id="tel'+i+'" value="'+tels[i]+'" title="'+idCliente+'">'					
									html += '</input><button title="#tel'+[i]+'" class="llamadaD"><i class="fa fa-phone fa-lg"></i> </button>'
									html += '</div>';
									html += '<hr style="color:#EDEDED">'
								}
								else
								{
									var telefono = tels[i].toLowerCase().replace('ext',' EXT')
									html += '<div style="padding-top:0px"><input class=" numeroLlamada" type="text" id="tel'+i+'" value="'+telefono+'" title="'+idCliente+'">'	
									html += '</div>';
									html += '<hr style="color:#EDEDED">'
								}
							}
						}
						$("#telefonosD").html("");
						$("#telefonosD").html(html);					
					},
					error: function(err){
						alert('Error en el servicio intentelo nuevamente');
					}
			});
	}

	function MostrarTelefonos(codCliente){
		$.ajax({
					url: urlWcf + "ConsultarTelefonos",
					data: { valor: codCliente, tipoConsulta : 4},
					type: "GET",
					timeout:20000,  // tiempo de espera de la llamada
					contentType: "application/json; charset=utf-8",
					dataType: "jsonp",
					success: function (data) {
						var tels = data.tel1.split(',');
						var idCliente = data.idCliente;
						var html ="";
						for(var i =0; i< tels.length;i++)
						{
							html += '<div style="padding-top:0px"><input class=" numeroLlamada" type="text" id="tel'+i+'" value="'+tels[i]+'" title="'+idCliente+'"></input><button title="#tel'+[i]+'" class="llamada"><i class="fa fa-phone fa-lg"></i> </button></div>';
							html += '<hr style="color:#EDEDED">'
						}
						$("#telefonos").html("");
						$("#telefonos").html(html);					
					},
					error: function(err){
						alert('Error en el servicio intentelo nuevamente');
					}
			});
	}
	
	function fechaFormato(fecha) {          
        var yyyy = fecha.getFullYear().toString();                                    
        var mm = (fecha.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = fecha.getDate().toString();             
                            
        return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
   };  
   function HoraFormato(fecha) {          
        var horas = fecha.getHours().toString();                                    
        var minutos = fecha.getMinutes().toString(); // getMonth() is zero-based         
        var segundos  = fecha.getSeconds().toString();             
                            
        return (horas[1]?horas:"0"+horas[0]) + ':' + (minutos[1]?minutos:"0"+minutos[0]) + ':' + (segundos[1]?segundos:"0"+segundos[0]);
   }; 