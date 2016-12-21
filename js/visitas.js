$(document).ready(function () {
//cliente registro
    $( "#clienteV" ).autocomplete({
      source: function (request, response) {
		  var UserID = window.localStorage.getItem('IDUS')
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigoV",
                        data: { valor: $('#clienteV').val(), tipoConsulta : 10,claveEntidad : UserID},
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
        $("#nombreCV").val( ui.item.val );
      }
    });
    
    $( "#nombreCV" ).autocomplete({
      source: function (request, response) {
		  var UserID = window.localStorage.getItem('IDUS')
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigoV",
                        data: { valor: $('#nombreCV').val(), tipoConsulta : 11,claveEntidad : UserID},
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
        $("#clienteV").val( ui.item.val );
      }
    });

    $('#btnLimpCliV').click(function(){
        $('#nombreCV').val('')
        $('#clienteV').val('')
    })
})

function enviarClienteV(){
    var clienteV = $('#clienteV').val()
    var claveEntidad =window.localStorage.getItem('IDUS')
    var latitud;
    var longitud;
    EnvioVisita=1;
    setTimeout(function(){ 
            if (EnvioVisita == 1 ){
                $.mobile.loading('hide');
                alert("Probablemente su GPS esta apagado");
            }
         }, 50000);
    $.mobile.loading( 'show', {
        text: 'Enviando Información',
        textVisible: true,
        theme: 'a',
        html: ""
    }); 

    navigator.geolocation.getCurrentPosition(
            function (pocicion){
                latitud = pocicion.coords.longitude;
                longitud = pocicion.coords.latitude;
                if(clienteV != "" && claveEntidad != "" && latitud != "" && longitud != "")
                {
                    $.ajax({
                            url: urlWcf + "RegistrarVisita",
                            data: { clienteV: clienteV ,claveEntidad : claveEntidad,latitud : latitud,longitud:longitud },
                            type: "GET",
                            timeout:20000,
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
                            success: function (data) {
                                EnvioVisita=0
                                $.mobile.loading('hide');
                                $('#nombreCV').val('')
                                $('#clienteV').val('')
                                Mensaje(data, "HalcoNET", "Aceptar");
                            },
                            error: function(err){
                                $.mobile.loading('hide');
                                $("#nombreC").removeClass( "ui-autocomplete-loading" );
                            }
                    });
                }else {
						Mensaje("¡Todos los campos son necesarios!", "HalcoNET", "Aceptar");
                        $.mobile.loading('hide');
					  }
                }, 
        function (error) {  
            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                                $.mobile.loading('hide');
            
        },options
    );
}
$(document).on('click','.visita', function () {
    var cliente = $(this).attr('alt')
    var res = confirm("¿Desea cambiar el status del cliente?");
    if(res){
        /*var f = new Date();  
        var horaInicio=$('#inicio_'+cliente.replace(" ","")).html()
        if(horaInicio.length > 0)
            $('#fin_'+cliente.replace(" ","")).html(dateTimeFormato(f))
        else 
            $('#inicio_'+cliente.replace(" ","")).html(dateTimeFormato(f))*/
        var claveEntidad = window.localStorage.getItem("IDUS")
        var latitud;
        var longitud;
        EnvioVisita=1;
        setTimeout(function(){ 
                if (EnvioVisita == 1 ){
                    $.mobile.loading('hide');
                    alert("Probablemente su GPS esta apagado");
                }
             }, 50000);
        $.mobile.loading( 'show', {
            text: 'Enviando Información',
            textVisible: true,
            theme: 'a',
            html: ""
        }); 

        navigator.geolocation.getCurrentPosition(
                function (pocicion){
                    longitud = pocicion.coords.longitude;
                    latitud = pocicion.coords.latitude;
                    if(cliente != "" && claveEntidad != "" && latitud != "" && longitud != "")
                    {
                        $.ajax({
                                url: urlWcf + "RegistrarVisita",
                                data: { clienteV: cliente ,claveEntidad : claveEntidad,latitud : latitud,longitud:longitud },
                                type: "GET",
                                timeout:20000,
                                contentType: "application/json; charset=utf-8",
                                dataType: "jsonp",
                                success: function (data) {
                                    EnvioVisita=0
                                    $.mobile.loading('hide');
                                    alert(data)
                                    consultaItinerario()
                                },
                                error: function(err){
                                    $.mobile.loading('hide');
                                }
                        });
                    }else alert("¡Todos los campos son necesarios!")
                    }, 
            function (error) {  
                $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
                
            },options
        );
    }
});
function consultaItinerarioSugerido(){
	var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarClientesVisita",
        data: { ClaveEntidad:claveEntidad,tipoconsulta:14},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0">'
            for(var i = 0; i< data.length; i++){
                html+= '<tr><td width=40%><label>'+data[i].codigo+'</label></td></tr>'
            }
            html+= '</table>'
            $('#divClientesVisitas').html('')
            $('#divClientesVisitas').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function consultaItinerarioCompleto(){
	var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarClientesVisita",
        data: { ClaveEntidad:claveEntidad,tipoconsulta:15},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0">'
            for(var i = 0; i< data.length; i++){
                html+= '<tr><td width=50%><label>'+data[i].codigo+'</label></td>'
                html+= '<td width=50% ><input type="checkbox" name="colores" value="rojo" checked></td></tr>'
                // html+= '<td width=50% ><center><select name="slider2" id="slider2" data-role="slider"><option value="SI">SI</option><option value="NO">NO</option>select></center><td></tr>'
                // html+= '<td width=20% ><input type="checkbox" name="'+data[i].codigo+'" value="'+data[i].codigo+'"><td></tr>'                
            }
            html+= '</table>'
            $('#divClientesVisitasCompleto').html('')
            $('#divClientesVisitasCompleto').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}
function consultaItinerario(){
	var claveEntidad = window.localStorage.getItem("IDUS")
    $.ajax({
        url: urlWcf + "ConsultarClientesPlaneados",
        data: { ClaveEntidad:claveEntidad},
        type: "GET",
        timeout:20000,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            var html=""
            html+= '<table class="facturas tblV" cellspacing="0">'
            for(var i = 0; i< data.length; i++){
                html+= '<tr><td width=40%><label>'+data[i].codigo+'</label></td>'
                html+= '<td width=40% align="center"><label>'+data[i].direccion+'</label></td>'
                if(data[i].direccion!= 'Terminada')
                    html+= '<td width=20% ><center><button class="visita cssVisita" type="button" alt="'+data[i].codigo+'"><i class="fa fa-street-view fa-lg"></button></center></td></tr>'
                else html+= '<td width=20%><td></tr>'
            }
            html+= '</table>'
            $('#divClientesVisitasPlaneado').html('')
            $('#divClientesVisitasPlaneado').html(html)
        },
        error: function(err){
            $.mobile.loading('hide');
        }
    });
}