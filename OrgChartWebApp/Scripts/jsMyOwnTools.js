

function getDirectorios(combo) {
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Directorios/GetDirectorios",
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
        url: "/DiagramOrg/TipoElementos/getTiposElementos",
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


function getTiposIdentificaciones(combo) {
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/TipoIdentificaciones/getTiposIdentificaciones",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione Tipo Identidad")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_TipoIdentificacion).html(item.nomTipoIdentificacion)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Tipos de Identidad");
            }
        }
    });
}


function getDependencias(combo) {
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Dependencias/getDependencias",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione Dependencia")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_Dependencia).html(item.nomDependencia)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Dependencias");
            }
        }
    });
}

function getElementosxTipo(combo, Tipo) {
    $.ajax({
        type: "POST",
        data: { Tipo: Tipo },
        url: "/DiagramOrg/Elementos/GetElementosxTipo",
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
        url: "/DiagramOrg/Usuarios/getUsuarioxId",
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

function getUsersfromLDAPbyId(combo, Id) {
    $.ajax({
        type: "POST",
        data: { IdDirectorio: Id},
        url: "/DiagramOrg/Ldap/GetLDAPUsersxId",
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

function getAllUsers(combo) {
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Ldap/GetLDAPUsersxId",
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
        url: "/DiagramOrg/Usuarios/GetDBUsers",
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

function TipoElementoOnChangeLabel(label, IdTipoElemento)
{
    if (IdTipoElemento == 1)
    {
        labelElemento.innerHTML = 'Cargo:';
    }
    if (IdTipoElemento == 2)
    {
        labelElemento.innerHTML = 'Grupo:';
    }
}

function DirectorioOnChange(comboP, comboH) {
    comboH.empty();
    if (comboP.val() == 1) {
        getAllDbUsers(comboH);
    }
    if (comboP.val() == 2) {
        getUsersfromLDAPbyId(comboH,2);
    }
}

function init()
{    
     //Div EditForm     
     //$("#cmbTipoElemento").change(() => {
     //   TipoElementoOnChange($("#cmbTipoElemento"), $("#cmbElemento"));                                   
     //})

    $("#cmbTipoElemento").change(() => {
        TipoElementoOnChangeLabel($("#labelElemento"), $("#cmbTipoElemento").val());
     })
    
    $("#cmbDirectorio").change(() => {
        DirectorioOnChange($("#cmbDirectorio"), $("#cmbUsers"));
    })

    $("#cmbUsers").change(() => {
        getUsuarioxId($("#name"), $("#email"), $("#cmbUsers").val());
    })
    
    //Div DeleteForm     
    //$("#cmbTipoElementoDel").change(() => {
    //    TipoElementoOnChange($("#cmbTipoElementoDel"), $("#cmbElementoDel"));
    //})

    $("#cmbTipoElementoDel").change(() => {
        TipoElementoOnChangeLabel($("#labelElementoDel"), $("#cmbTipoElementoDel").val());
    })

    $("#cmbDirectorioDel").change(() => {
        DirectorioOnChange($("#cmbDirectorioDel"), $("#cmbUsersDel"));
    })

    $("#cmbUsersDel").change(() => {
        getUsuarioxId($("#nameDel"), $("#emailDel"), $("#cmbUsersDel").val());
    })


    $("#cmbTipoElementoDet").change(() => {
        TipoElementoOnChangeLabel($("#labelElementoDet"), $("#cmbTipoElementoDet").val());
    })
    $("#cmbDirectorioDet").change(() => {
        DirectorioOnChange($("#cmbDirectorioDet"), $("#cmbUsersDet"));
    })

    $("#cmbUsersDet").change(() => {
        getUsuarioxId($("#nameDet"), $("#emailDet"), $("#cmbUsersDet").val());
    })
        
    getDirectorios($('#cmbDirectorio'));
    getTiposElementos($('#cmbTipoElemento'));
    getAllDbUsers($('#cmbUsers'));
    getTiposIdentificaciones($('#cmbTipoIdentificacion'));
    getDependencias($('#cmbDependencia'));

    getDirectorios($('#cmbDirectorioDel'));
    getTiposElementos($('#cmbTipoElementoDel'));
    getAllDbUsers($('#cmbUsersDel'));
    getTiposIdentificaciones($('#cmbTipoIdentificacionDel'));
    getDependencias($('#cmbDependenciaDel'));

    getDirectorios($('#cmbDirectorioDet'));
    getTiposElementos($('#cmbTipoElementoDet'));
    getAllDbUsers($('#cmbUsersDet'));
    getTiposIdentificaciones($('#cmbTipoIdentificacionDet'));
    getDependencias($('#cmbDependenciaDet'));

        
}


//*********Segmento Nodos*********//

var editForm = function ()
{
    this.nodeId = null;
};

editForm.prototype.init = function (obj)
{
    var that = this;
    this.obj = obj;
    this.editForm = document.getElementById("editForm");
    this.nameInput = document.getElementById("name");
    this.elemento = document.getElementById("elemento");
    this.pk_TipoElemento = document.getElementById("cmbTipoElemento");
    this.pk_Directorio = document.getElementById("cmbDirectorio");
    this.pk_Usuario = document.getElementById("cmbUsers");
    this.titleInput = document.getElementById("email");

    this.pk_TipoIdentificacion = document.getElementById("cmbTipoIdentificacion");
    this.pk_Dependencia = document.getElementById("cmbDependencia");
    this.numIdentificacion = document.getElementById("numIdentificacion");
    this.BloqSi = document.getElementById("BloqSi");
    this.BloqNo = document.getElementById("BloqNo");
    this.Activo = document.getElementById("chbxActivo");
    this.RolPrincipal = document.getElementById("chbxRolPrincipal");
    
    this.cancelButton = document.getElementById("cancel");
    this.saveButton = document.getElementById("save");

    this.cancelButton.addEventListener("click", function ()
    {
        that.hide();
    });

    this.saveButton.addEventListener("click", function ()
    {
        var node = chart.get(that.nodeId);
        node.pk_TipoElemento = $("#cmbTipoElemento").val();
        node.elemento = $("#elemento").val();
        node.fk_Directorio = $("#cmbDirectorio").val();
        node.loginUsuario = $("#cmbUsers")[0][$("#cmbUsers").val()].text;
        node.nombreUsuario = $("#name").val();
        node.emailUsuario = $("#email").val();
        
        node.pk_Dependencia = $("#cmbDependencia").val();
        node.pk_TipoIdentificacion = $("#cmbTipoIdentificacion").val();
        node.numIdentificacion = $("#numIdentificacion").val();
        node.bloqueado = $("#BloqSi")["0"].checked;
        node.activo = $("#chbxActivo")["0"].checked;
        node.rolPrincipal = $("#chbxRolPrincipal")["0"].checked;

        node.id = $("#cmbUsers").val();
        chart.updateNode(node);
        guardarNodo(node);
        that.hide();
    });

};

editForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.editForm.style.display = "block";
    this.editForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInput.value = node.nombreUsuario;
    this.titleInput.value = node.emailUsuario;
    this.elemento.value = node.elemento;
    this.pk_TipoElemento.selectedIndex = node.pk_TipoElemento;
    this.pk_Directorio.selectedIndex = node.pk_Directorio;
    this.pk_Usuario.selectedIndex = node.pk_Usuario;
    
    this.pk_TipoIdentificacion.selectedIndex = node.pk_TipoIdentificacion;
    this.pk_Dependencia.selectedIndex = node.pk_Dependencia;
    this.numIdentificacion.value = node.numIdentificacion;
        
    this.BloqSi.checked = node.bloqueado;
    this.BloqNo.checked = false;
    if (!node.bloqueado)
        this.BloqNo.checked = true;        

    this.Activo.checked = node.activo;
    this.RolPrincipal.checked = node.rolPrincipal;
    
};

editForm.prototype.hide = function (showldUpdateTheNode)
{
    this.editForm.style.display = "none";
};

var deleteForm = function ()
{
    this.nodeId = null;
};

deleteForm.prototype.init = function (obj)
{
    var that = this;
    this.obj = obj;
    this.deleteForm = document.getElementById("deleteForm");
    this.nameInputDel = document.getElementById("nameDel");
    this.elementoDel = document.getElementById("elementoDel");
    this.pk_TipoElementoDel = document.getElementById("cmbTipoElementoDel");
    this.pk_DirectorioDel = document.getElementById("cmbDirectorioDel");
    this.pk_UsuarioDel = document.getElementById("cmbUsersDel");
    this.titleInputDel = document.getElementById("emailDel");

    this.pk_TipoIdentificacionDel = document.getElementById("cmbTipoIdentificacionDel");
    this.pk_DependenciaDel = document.getElementById("cmbDependenciaDel");
    this.numIdentificacionDel = document.getElementById("numIdentificacionDel");
    this.BloqSiDel = document.getElementById("BloqSiDel");
    this.BloqNoDel = document.getElementById("BloqNoDel");
    this.ActivoDel = document.getElementById("chbxActivoDel");
    this.RolPrincipalDel = document.getElementById("chbxRolPrincipalDel");

    this.yesButton = document.getElementById("yes");
    this.noButton = document.getElementById("no");

    this.noButton.addEventListener("click", function ()
    {
        that.hide();
    });

    this.yesButton.addEventListener("click", function ()
    {
        var node = chart.get(that.nodeId);        
        borrarNodo(node);
        chart.removeNode(that.nodeId);

        that.hide();
    });
};

deleteForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.deleteForm.style.display = "block";
    this.deleteForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInputDel.value = node.nombreUsuario;
    this.titleInputDel.value = node.emailUsuario;
    this.elementoDel.value = node.elemento;
    this.pk_TipoElementoDel.selectedIndex = node.pk_TipoElemento;
    this.pk_DirectorioDel.selectedIndex = node.pk_Directorio;
    this.pk_UsuarioDel.selectedIndex = node.pk_Usuario;

    this.pk_TipoIdentificacionDel.selectedIndex = node.pk_TipoIdentificacion;
    this.pk_DependenciaDel.selectedIndex = node.pk_Dependencia;
    this.numIdentificacionDel.value = node.numIdentificacion;

    this.BloqSiDel.checked = node.bloqueado;
    this.BloqNoDel.checked = false;
    if (!node.bloqueado)
        this.BloqNoDel.checked = true;

    this.ActivoDel.checked = node.activo;
    this.RolPrincipalDel.checked = node.rolPrincipal;

    this.nameInputDel.readOnly = "true";
    this.titleInputDel.readOnly = "true";
    this.elementoDel.readOnly = "true";
    this.pk_TipoElementoDel.disabled = "true";
    this.pk_DirectorioDel.disabled = "true";
    this.pk_UsuarioDel.disabled = "true";

    this.pk_DependenciaDel.disabled = "true";
    this.pk_TipoIdentificacionDel.disabled = "true";
    this.numIdentificacionDel.readOnly = "true";
    this.BloqSiDel.disabled = "true";
    this.BloqNoDel.disabled = "true";
    this.ActivoDel.disabled = "true";
    this.RolPrincipalDel.disabled = "true";
};

deleteForm.prototype.hide = function (showldRemoveTheNode)
{
    this.deleteForm.style.display = "none";
};

var detailForm = function () {
    this.nodeId = null;
};

detailForm.prototype.init = function (obj) {
    var that = this;
    this.obj = obj;
    this.detailForm = document.getElementById("detailForm");
    this.nameInputDet = document.getElementById("nameDet");
    this.elementoDet = document.getElementById("elementoDet");
    this.pk_TipoElementoDet = document.getElementById("cmbTipoElementoDet");
    this.pk_DirectorioDet = document.getElementById("cmbDirectorioDet");
    this.pk_UsuarioDet = document.getElementById("cmbUsersDet");
    this.titleInputDet = document.getElementById("emailDet");
    this.pk_TipoIdentificacionDet = document.getElementById("cmbTipoIdentificacionDet");
    this.pk_DependenciaDet = document.getElementById("cmbDependenciaDet");
    this.numIdentificacionDet = document.getElementById("numIdentificacionDet");
    this.BloqSiDet = document.getElementById("BloqSiDet");
    this.BloqNoDet = document.getElementById("BloqNoDet");
    this.ActivoDet = document.getElementById("chbxActivoDet");
    this.RolPrincipalDet = document.getElementById("chbxRolPrincipalDet");
    this.closeButton = document.getElementById("close");

    this.closeButton.addEventListener("click", function () {
        that.hide();
    });    
};

detailForm.prototype.show = function (nodeId) {
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.detailForm.style.display = "block";
    this.detailForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInputDet.value = node.nombreUsuario;
    this.titleInputDet.value = node.emailUsuario;
    this.elementoDet.value = node.elemento;
    this.pk_TipoElementoDet.selectedIndex = node.pk_TipoElemento;
    this.pk_DirectorioDet.selectedIndex = node.pk_Directorio;
    this.pk_UsuarioDet.selectedIndex = node.pk_Usuario;

    this.pk_TipoIdentificacionDet.selectedIndex = node.pk_TipoIdentificacion;
    this.pk_DependenciaDet.selectedIndex = node.pk_Dependencia;
    this.numIdentificacionDet.value = node.numIdentificacion;

    this.BloqSiDet.checked = node.bloqueado;
    this.BloqNoDet.checked = false;
    if (!node.bloqueado)
        this.BloqNoDet.checked = true;

    this.ActivoDet.checked = node.activo;
    this.RolPrincipalDet.checked = node.rolPrincipal;


    this.nameInputDet.readOnly = "true";
    this.titleInputDet.readOnly = "true";
    this.elementoDet.readOnly = "true";
    this.pk_TipoElementoDet.disabled = "true";
    this.pk_DirectorioDet.disabled = "true";
    this.pk_UsuarioDet.disabled = "true";
    this.pk_DependenciaDet.disabled = "true";
    this.pk_TipoIdentificacionDet.disabled = "true";
    this.numIdentificacionDet.readOnly = "true";
    this.BloqSiDet.disabled = "true";
    this.BloqNoDet.disabled = "true";
    this.ActivoDet.disabled = "true";
    this.RolPrincipalDet.disabled = "true";
};

detailForm.prototype.hide = function (showldDetailTheNode) {
    this.detailForm.style.display = "none";
};

//*********Segmento Nodos*********//
