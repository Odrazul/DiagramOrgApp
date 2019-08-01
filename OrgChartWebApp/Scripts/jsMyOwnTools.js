

function getDirectorios(combo) {
    $.ajax({
        type: "POST",
        url: "/Directorios/GetDirectorios",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Directorio")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_Directorio).html(item.nomDirectorio)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Directorios");
            }
        }
    });
}

function getTiposElementos(combo) {
    $.ajax({
        type: "POST",
        url: "/TipoElementos/getTiposElementos",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione Tipo Elemento")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_TipoElemento).html(item.nomTipoElemento)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Tipos de Elementos");
            }
        }
    });
}

function getElementosxTipo(combo, Tipo) {
    $.ajax({
        type: "POST",
        data: { Tipo: Tipo },
        url: "/Elementos/GetElementosxTipo",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione Elemento")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_Elemento).html(item.nomElemento)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Elementos de ese Tipo");
            }
        }
    });
}

function getUsuarioxId(nombre, correo, Id) {
    $.ajax({
        type: "POST",
        data: { Id: Id },
        url: "/Usuarios/getUsuarioxId",
        success: function (result) {
            if (result.lista) {

                result.lista.forEach((item, index) => {
                    nombre.val(item.nombreUsuario);
                    correo.val(item.emailUsuario);
                    console.log(item);

                });
            }
            else {
                nombre.val("");
                correo.val("");
            }
        }
    });
}

function getAllUsers(combo) {
    $.ajax({
        type: "POST",
        url: "/Ldap/GetLDAPUsers",
        success: function (result) {
            if (result) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Usuario")
                );
                result.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.UserName).html(item.Apellido + " " + item.PrimerNombre)
                    );
                    console.log(item);
                });
            } else {
                console.log("no se encontraron usuarios");
            }
        }
    });
}

function getAllDbUsers(combo) {
    $.ajax({
        type: "POST",
        url: "/Usuarios/GetDBUsers",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Usuario")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_Usuario).html(item.loginUsuario)
                    );
                    console.log(item);

                });
            }
            else {
                console.log("no se encontraron usuarios");
            }
        }
    });
}


function TipoElementoOnChange(comboP, comboH) {
    comboH.empty();
    getElementosxTipo(comboH, comboP.val());
}

function DirectorioOnChange(comboP, comboH) {
    comboH.empty();
    if (comboP.val() == 1) {
        getAllDbUsers(comboH);
    }
    if (comboP.val() == 2) {
        getAllUsers(comboH);
    }
}

function init()
{
    getDirectorios($('#cmbDirectorio'));
    getTiposElementos($('#cmbTipoElemento'));
    getAllDbUsers($('#cmbUsers'));

    getDirectorios($('#cmbDirectorioDel'));
    getTiposElementos($('#cmbTipoElementoDel'));
    getAllDbUsers($('#cmbUsersDel'));

    
}