function InicializarVentana(Div)
{
    var left = document.body.offsetWidth / 2 - 150;
    Div[0].style.display = "block";
    Div[0].style.left = left + "px";
    //var node = chart.get(nodeId);
    //this.nameInput.value = node.nombreUsuario == null ? "" : node.nombreUsuario;
    //this.titleInput.value = node.emailUsuario == null ? "" : node.emailUsuario;
    //this.elemento.value = node.elemento == null ? "" : node.elemento;

    $('#cmbTipoElementoG')[0].selectedIndex = 2;
    $('#cmbTipoElementoG')[0].disabled = "true";

  
}

function setOrganigramas(organigrama)
{
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Organizaciones/SetOrganigramas",
        data: { organigrama: organigrama },
        success: function (result)
                {
                    if (result)
                    {
                        $('#cmbOrganigramas').append(
                            $('<option></option>').val(result).html(organigrama)
                        );

                        $("#cmbOrganigramas").val(result);
                        hdnOrganigrama.value = result;
                        hdnNomOrganigrama.value = organigrama;
                        $("#nuevoOrganigrama")[0].hidden = true;
                        $("#nuevoOrganigrama")[0].value = "";
                        $("#create")[0].hidden = true;
                        $('#cmbOrganigramas').append(
                            $('<option></option>').val(result).html(organigrama)
                        );

                        DesplegarOrganigrama();
                        $("#tree").show();

                        $('#cmbOrganigramaG').append(
                            $('<option></option>').val(result).html(organigrama)
                        );

                    }
                }    
        });
                 
}

function setValorenCombo(combo, valor)
{
    var i;
    for (i = 0; i < combo[0].length; i++)
        if (combo[0].options[i].text == valor)
        {   combo[0].selectedIndex = i;
            break;
        }   
}

function getOrganigramas(combo,crear)
{
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Organizaciones/GetOrganigramas",
        success: function (result)
        {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Organigrama")
                );

                if (crear)
                    combo.append(
                    $('<option></option>').val(1).html("Nuevo Diagrama")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_Organizacion).html(item.nomOrganizacion)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Organigramas");
            }
        }
    });
}

function getGrupos(combo)
{
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/DiagramOrg/ReadGrups",
        success: function (result) {
            if (result.nodes)
            {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Grupo")
                );

                combo.append(
                    $('<option></option>').val(1).html("Nuevo Grupo")
                );

                result.nodes.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.id).html(item.nombre)
                    );
                    console.log(item);
                });
            }
            else {
                console.log("no se encontraron Grupos");
            }
        }
    });
}


function DepurarCombo(combo)
{
    for (var i = 0; i < combo.length; i++)
        combo.remove(i);
}
function getGruposxOrganigrama(combo, organigrama)
{
    if (combo[0].length==0)
     $.ajax({
        type: "POST",
        url: "/DiagramOrg/DiagramOrg/ReadGrupsxOrganigram",
        data: { IdOrganigrama: organigrama },
        success: function (result)
        {
            if (result.nodes)
            {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Grupo")
                );

                result.nodes.forEach((item, index) =>
                {
                    combo.append(
                        $('<option></option>').val(item.id).html(item.nombre)
                    );
                    console.log(item);
                });
            }
            else
            {
                console.log("no se encontraron Grupos");
            }
        }
    });
}
function getDirectorios(combo)
{
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

function getTiposElementos(combo)
{
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

function getTiposIdentificaciones(combo)
{
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

function getDependencias(combo)
{
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

function getElementosxTipo(combo, Tipo)
{
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

function getUsuarioxId(nombre, correo, Id)
{
    $.ajax({
        type: "POST",
        data: { Id: Id },
        url: "/DiagramOrg/Users/getUsuarioxId",
        success: function (result) {
            if (result.lista) {

                result.lista.forEach((item, index) => {
                    nombre.val(item.nombreUser);
                    correo.val(item.emailUser);
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

function getUsuarioxLogin(nombre, correo, login)
{
    $.ajax({
        type: "POST",
        data: { login: login },
        url: "/DiagramOrg/Users/getUsuarioxLogin",
        success: function (result) {
            if (result.lista) {

                result.lista.forEach((item, index) => {
                    nombre.val(item.nombreUser);
                    correo.val(item.emailUser);
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

function getUsersfromLDAPbyId(combo, Id)
{
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
                        $('<option></option>').val(index).html(item.Name)
                    );
                    console.log(item);
                });
            } else {
                console.log("no se encontraron usuarios");
            }
        }
    });
}

function getAllUsers(combo)
{
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

function getAllDbUsers(combo)
{
    $.ajax({
        type: "POST",
        url: "/DiagramOrg/Users/GetDBUsers",
        success: function (result) {
            if (result.lista) {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Usuario")
                );
                result.lista.forEach((item, index) => {
                    combo.append(
                        $('<option></option>').val(item.pk_User).html(item.loginUser)
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

function TipoElementoOnChange(comboP, comboH)
{
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

function DirectorioOnChange(comboP, comboH)
{
    comboH.empty();
    if (comboP.val() == 1)
    {
        getAllDbUsers(comboH);
    }
    if (comboP.val() == 2)
    {
        getUsersfromKey($("#cmbUsers"), 2);
    }

}

function ElementoOnChange()
{
    if ($('#cmbElemento').val() == 0)
    {
        chart = null;
        children = null;
        $("#tree").hide();
        $("#children").hide();
               
        $("#nuevoOrganigrama")[0].hidden = true;
        $("#nuevoOrganigrama")[0].value = "";
        $("#create")[0].hidden = true;
        $('#cmbOrganigramas').hide();
        $('#LabelOG').hide();

        $("#nuevoGrupo")[0].hidden = true;
        $("#nuevoGrupo")[0].value = "";
        $("#createG")[0].hidden = true;
        $('#cmbGrupos').hide();
        $('#LabelGrupo').hide();

        $('#cmbUsuarios').hide();
        $('#LabelUsuario').hide();
        
    }

    if ($('#cmbElemento').val() == 1)
    {
        $('#cmbOrganigramas')[0].selectedIndex = 0;

        $('#LabelOG').show();
        $('#cmbOrganigramas').show();

        $("#nuevoGrupo")[0].hidden = true;
        $("#nuevoGrupo")[0].value = "";
        $("#createG")[0].hidden = true;
        $('#cmbGrupos').hide();
        $('#LabelGrupo').hide();

        $('#cmbUsuarios').hide();
        $('#LabelUsuario').hide();
        
        chart = null;
        $("#tree").hide();
        $("#children").hide();

    }
    if ($('#cmbElemento').val() == 2)
    {
        $('#LabelGrupo').show();
        $('#cmbGrupos').show();

        $('#cmbGrupos')[0].selectedIndex = 0;

        $("#nuevoOrganigrama")[0].hidden = true;
        $("#nuevoOrganigrama")[0].value = "";
        $("#create")[0].hidden = true;
        $('#cmbOrganigramas').hide();
        $('#LabelOG').hide();

        $('#cmbUsuarios').hide();
        $('#LabelUsuario').hide();

        chart = null;
        $("#tree").hide();
        $("#children").hide();
    }

    if ($('#cmbElemento').val() == 3)
    {
        $('#LabelUsuario').show();
        $('#cmbUsuarios').show();

        $('#cmbUsuarios')[0].selectedIndex = 0;

        $("#nuevoOrganigrama")[0].hidden = true;
        $("#nuevoOrganigrama")[0].value = "";
        $("#create")[0].hidden = true;
        $('#cmbOrganigramas').hide();
        $('#LabelOG').hide();

        $('#cmbGrupos').hide();
        $('#LabelGrupo').hide();

        chart = null;
        $("#tree").hide();
        $("#children").hide();
    }
}


function OrganigramaOnChange()
{
    hdnNomOrganigrama.value = $('#cmbOrganigramas')[0].options[$('#cmbOrganigramas')[0].selectedIndex].text;
    hdnOrganigrama.value = $('#cmbOrganigramas')[0].options[$('#cmbOrganigramas')[0].selectedIndex].value;
 
    if ($('#cmbOrganigramas').val() == 0)
    {
        chart = null;
        children = null;
        $("#tree").hide();
        $("#children").hide();

        $("#nuevoOrganigrama")[0].hidden = true;        
        $("#nuevoOrganigrama")[0].value = "";

        $("#create")[0].hidden = true;
    }

    if ($('#cmbOrganigramas').val() == 1)
    {
        $("#nuevoOrganigrama")[0].hidden = false;  
        $("#create")[0].hidden = false;
        chart = null;
        children = null;

        $("#tree").hide();
        $("#children").hide();

    }
    if ($('#cmbOrganigramas').val() >= 2)
    {
        $("#nuevoOrganigrama")[0].hidden = true;
        $("#nuevoOrganigrama")[0].value = "";

        $("#create")[0].hidden = true;

        DesplegarOrganigrama();

        $("#tree").show();
    }
}

function GrupoOnChange()
{
    if ($('#cmbGrupos').val() == 0)
    {
        chart = null;
        children = null;
        $("#tree").hide();
        $("#children").hide();

        $("#nuevoGrupo")[0].hidden = true;
        $("#nuevoGrupo")[0].value = "";

        $("#createG")[0].hidden = true;
    }
    
    if ($('#cmbGrupos').val() == 1)
    {
        //$("#nuevoGrupo")[0].hidden = false;
        //$("#createG")[0].hidden = false;
        chart = null;
        children = null;
        $("#tree").hide();
        $("#children").hide();
        //verificar si puede cambiarse estilo desde aquí
        //$("#editGroupForm").style("display:none; text-align:center; position:relative; border: 1px solid #aeaeae;width:400px;background-color:#FFFFFF;z-index:10000;");
      
        var node = new Object();
        node.id = 1;
        node.elemento = "";
        node.pk_TipoElemento = 2;
        node.pk_Organizacion = 1;
       
        InicializarVentana($("#editGroupForm"));
        $("#editGroupForm").show();
        
    }
       
    if ($('#cmbGrupos').val() >= 2)
    {
        $("#nuevoGrupo")[0].hidden = true;
        $("#nuevoGrupo")[0].value = "";
        $("#createG")[0].hidden = true;

        $("#tree").hide();
        DesplegarHijos($('#cmbGrupos').val());
        $("#children").show();
    }
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

   // this.pk_Organizacion = document.getElementById("cmbOrganigramas");

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
        var msj = Validaciones('edit');
        if (msj == '')
        {
            var node = chart.get(that.nodeId);
            node.pk_TipoElemento = $("#cmbTipoElemento").val();
            node.elemento = $("#elemento").val();
            node.fk_Directorio = $("#cmbDirectorio").val();
            node.loginUsuario = $("#cmbUsers")[0][$("#cmbUsers")[0].selectedIndex].text;
            node.nombreUsuario = $("#name").val();
            node.emailUsuario = $("#email").val();

            node.pk_Organizacion = $("#cmbOrganigramas").val();

            node.pk_Dependencia = $("#cmbDependencia").val();
            node.pk_TipoIdentificacion = $("#cmbTipoIdentificacion").val();
            node.numIdentificacion = $("#numIdentificacion").val();
            node.bloqueado = $("#BloqSi")["0"].checked;
            node.activo = $("#chbxActivo")["0"].checked;
            node.rolPrincipal = $("#chbxRolPrincipal")["0"].checked;

            chart.updateNode(node);
            guardarNodo(node);
            DesplegarOrganigrama();
            that.hide();
        }

        else
        {
            labelMensaje.innerHTML = msj;
            $("#Alertas").show();
        }
    });

};

editForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.editForm.style.display = "block";
    this.editForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInput.value = node.nombreUsuario == null ? "" : node.nombreUsuario;
    this.titleInput.value = node.emailUsuario == null ? "" : node.emailUsuario;
    this.elemento.value = node.elemento == null ? "" : node.elemento;

    this.pk_TipoElemento.selectedIndex = 1;//
    this.pk_TipoElemento.disabled = "true";

    //this.pk_Organizacion.selectedIndex = node.pk_Organizacion;

    this.pk_Directorio.selectedIndex = node.pk_Directorio;
   // this.pk_Usuario.selectedText = node.loginUsuario;

    setValorenCombo($("#cmbUsers"), node.loginUsuario);


    this.pk_TipoIdentificacion.selectedIndex = node.pk_TipoIdentificacion;
    this.pk_Dependencia.selectedIndex = node.pk_Dependencia;
    this.numIdentificacion.value = node.numIdentificacion == null ? "" : node.numIdentificacion;
        
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

   // this.pk_Organizacion = document.getElementById("cmbOrganigramas");

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

   // this.pk_Organizacion.selectedIndex = node.pk_Organizacion;

    this.pk_DirectorioDel.selectedIndex = node.pk_Directorio;
    setValorenCombo($("#cmbUsersDel"), node.loginUsuario);
  
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

detailForm.prototype.init = function (obj)
{
    var that = this;
    this.obj = obj;
    this.detailForm = document.getElementById("detailForm");
    this.nameInputDet = document.getElementById("nameDet");
    this.elementoDet = document.getElementById("elementoDet");
    this.pk_TipoElementoDet = document.getElementById("cmbTipoElementoDet");

   // this.pk_Organizacion = document.getElementById("cmbOrganigramas");

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
    this.showchildrenButton = document.getElementById("showchildren");

    this.closeButton.addEventListener("click", function () {
        that.hide();
    });    


    this.showchildrenButton.addEventListener("click", function ()
    {
        that.hide();
        $("#tree").hide();
        $("#children").show();
        $("#back")[0].hidden = false;
        DesplegarHijos(that.nodeId);

    }); 
};

detailForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.detailForm.style.display = "block";
    this.detailForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInputDet.value = node.nombreUsuario;
    this.titleInputDet.value = node.emailUsuario;
    this.elementoDet.value = node.elemento;
    this.pk_TipoElementoDet.selectedIndex = node.pk_TipoElemento;

   // this.pk_Organizacion.selectedIndex = node.pk_Organizacion;

    this.pk_DirectorioDet.selectedIndex = node.pk_Directorio;
    setValorenCombo($("#cmbUsersDet"), node.loginUsuario);

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


    if (node.pk_TipoElemento == 2)
        this.showchildrenButton.hidden = false;
    else
        this.showchildrenButton.hidden = true;


};

detailForm.prototype.hide = function (showldDetailTheNode)
{
    this.detailForm.style.display = "none";
};

//*********Segmento Nodos*********//


//*********Segmento Grupos*********//

var editGroupForm = function ()
{
    this.nodeId = null;
};

editGroupForm.prototype.init = function (obj)
{
    var that = this;
    this.obj = obj;
    this.editGroupForm = document.getElementById("editNodeGroupForm");
    this.nameInput = document.getElementById("name");
    this.elemento = document.getElementById("elementoG");
    this.pk_TipoElementoNG = document.getElementById("cmbTipoElementoNG");
    this.titleInput = document.getElementById("tituloNG");

    this.cancelButtonG = document.getElementById("cancelNG");
    this.saveButtonG = document.getElementById("saveNG");

    this.cancelButtonG.addEventListener("click", function () {
        that.hide();
    });

    this.saveButtonG.addEventListener("click", function ()
    {
        var msj = Validaciones('AG');
        if (msj == '')
        {           
            var node = chart.get(that.nodeId);
            node.pk_TipoElementoNG = $("#cmbTipoElementoNG").val();
            node.elemento = $("#cmbGrupoNG")[0][$("#cmbGrupoNG")[0].selectedIndex].text;
            node.id = $("#cmbGrupoNG").val();
            node.pk_Organizacion = $("#cmbOrganigramas").val();
               
            chart.updateNode(node);
            asignarGrupo(node);
            DesplegarOrganigrama();
            that.hide();

        }

        else
        {
            labelMensaje.innerHTML = msj;
            $("#Alertas").show();
        }
    });

};

editGroupForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.editGroupForm.style.display = "block";
    this.editGroupForm.style.left = left + "px";
    var node = chart.get(nodeId);
    this.nameInput.value = node.nombreUsuario == null ? "" : node.nombreUsuario;
    this.titleInput.value = "";
    this.elemento.value = node.elemento == null ? "" : node.elemento;

   // DepurarCombo($('#cmbGrupoNG'));
    getGruposxOrganigrama($('#cmbGrupoNG'), $("#cmbOrganigramas").val());
    getTiposElementos($('#cmbTipoElementoNG'));
    this.pk_TipoElementoNG.selectedIndex = 2;
    this.pk_TipoElementoNG.disabled = "true";
    //this.pk_TipoElementoNG.selectedIndex = node.pk_TipoElemento;
    //this.pk_TipoElementoNG.disabled = "true";

};

editGroupForm.prototype.hide = function (showldUpdateTheNode)
{
    this.editGroupForm.style.display = "none";
};

var addMemberForm = function ()
{
    this.nodeId = null;
};

addMemberForm.prototype.init = function (obj)
{
    var that = this;
    this.obj = obj;
    this.addMemberForm = document.getElementById("addMemberForm");
    this.nameInput = document.getElementById("name");
    this.pk_TipoElemento = document.getElementById("cmbTipoElementoM");
    this.pk_Directorio = document.getElementById("cmbDirectorioM");
    this.pk_Usuario = document.getElementById("cmbUsersM");
    this.titleInput = document.getElementById("emailM");

    // this.pk_Organizacion = document.getElementById("cmbOrganigramas");

    this.pk_TipoIdentificacion = document.getElementById("cmbTipoIdentificacionM");
    this.pk_Dependencia = document.getElementById("cmbDependenciaM");
    this.numIdentificacion = document.getElementById("numIdentificacionM");
    this.BloqSi = document.getElementById("BloqSiM");
    this.BloqNo = document.getElementById("BloqNoM");
    this.Activo = document.getElementById("chbxActivoM");
    this.RolPrincipal = document.getElementById("chbxRolPrincipalM");
    this.cancelButtonM = document.getElementById("cancelM");
    this.saveButtonM = document.getElementById("saveM");

    this.cancelButtonM.addEventListener("click", function ()
    {
        that.hide();
    });

    this.saveButtonM.addEventListener("click", function ()
    {
        var msj = Validaciones('member');
        if (msj == '')
        {
            var node = chart.get(that.nodeId);    
            node.fk_Directorio = $("#cmbDirectorioM").val();
            node.loginUsuario = $("#cmbUsers")[0][$("#cmbUsersM")[0].selectedIndex].text;
            node.nombreUsuario = $("#nameM").val();
            node.emailUsuario = $("#emailM").val();
               
            node.pk_Dependencia = $("#cmbDependenciaM").val();
            node.pk_TipoIdentificacion = $("#cmbTipoIdentificacionM").val();
            node.numIdentificacion = $("#numIdentificacionM").val();
            node.bloqueado = $("#BloqSiM")["0"].checked;
            node.activo = $("#chbxActivoM")["0"].checked;
            node.rolPrincipal = $("#chbxRolPrincipalM")["0"].checked;

            node.pid = node.id;
            node.id = 0;
            //chart.updateNode(node); //Pendiente descifrar cómo se incluyen en árbol
            guardarMiembro(node);
            DesplegarOrganigrama();
            that.hide();        
        }
        else
        {
            labelMensaje.innerHTML = msj;
            $("#Alertas").show();
        }
    });

};

addMemberForm.prototype.show = function (nodeId)
{
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;
    this.addMemberForm.style.display = "block";
    this.addMemberForm.style.left = left + "px";

    this.pk_TipoElemento.selectedIndex = 1;//
    this.pk_TipoElemento.disabled = "true";

};

addMemberForm.prototype.hide = function (showldUpdateTheNode)
{
    this.addMemberForm.style.display = "none";
};


var deleteMemberForm = function ()
{
    this.nodeId = null;
};

deleteMemberForm.prototype.init = function (obj)
{ 
        var that = this;
        this.obj = obj;
        this.deleteMemberForm = document.getElementById("deleteMemberForm");
        this.nameInputDM = document.getElementById("nameDM");
        this.pk_TipoElementoDM = document.getElementById("cmbTipoElementoDM");
        this.pk_DirectorioDM = document.getElementById("cmbDirectorioDM");
        this.pk_UsuarioDM = document.getElementById("cmbUsersDM");
        this.titleInputDM = document.getElementById("emailDM");

        this.pk_TipoIdentificacionDM = document.getElementById("cmbTipoIdentificacionDM");
        this.pk_DependenciaDM = document.getElementById("cmbDependenciaDM");
        this.numIdentificacionDM = document.getElementById("numIdentificacionDM");
        this.BloqSiDM = document.getElementById("BloqSiDM");
        this.BloqNoDM = document.getElementById("BloqNoDM");
        this.ActivoDM = document.getElementById("chbxActivoDM");
        this.RolPrincipalDM = document.getElementById("chbxRolPrincipalDM");
        this.yesButtonDM = document.getElementById("yesDM");
        this.noButtonDM = document.getElementById("noDM");

        this.noButtonDM.addEventListener("click", function () {
            that.hide();
        });

        this.yesButtonDM.addEventListener("click", function () {
            var node = chart.get(that.nodeId);
            borrarMiembro(node);
            chart.removeNode(that.nodeId);
            that.hide();
        });
 
};

deleteMemberForm.prototype.show = function (nodeId)
{
    var node = chart.get(nodeId);
    if (node.pid != 0)
    {
        this.nodeId = nodeId;

        var left = document.body.offsetWidth / 2 - 150;
        this.deleteMemberForm.style.display = "block";
        this.deleteMemberForm.style.left = left + "px";
        var node = chart.get(nodeId);
        this.nameInputDM.value = node.nombre;
        this.titleInputDM.value = node.emailUsuario;

        this.pk_TipoElementoDM.selectedIndex = 1;
        this.pk_TipoElementoDM.disabled = "true";

        this.pk_DirectorioDM.selectedIndex = node.pk_Directorio;

        setValorenCombo($("#cmbUsersDM"), node.loginUsuario);

        this.pk_TipoIdentificacionDM.selectedIndex = node.pk_TipoIdentificacion;
        this.pk_DependenciaDM.selectedIndex = node.pk_Dependencia;
        this.numIdentificacionDM.value = node.numIdentificacion;

        this.BloqSiDM.checked = node.bloqueado;
        this.BloqNoDM.checked = false;
        if (!node.bloqueado)
            this.BloqNoDM.checked = true;

        this.ActivoDM.checked = node.activo;
        this.RolPrincipalDM.checked = node.rolPrincipal;

        this.pk_TipoElementoDM.selectedIndex = node.pk_TipoElemento;

        this.pk_DirectorioDM.selectedIndex = node.pk_Directorio;
        setValorenCombo($("#cmbUsersDM"), node.loginUsuario);

        this.pk_TipoIdentificacionDM.selectedIndex = node.pk_TipoIdentificacion;
        this.pk_DependenciaDM.selectedIndex = node.pk_Dependencia;
        this.numIdentificacionDM.value = node.numIdentificacion;

        this.BloqSiDM.checked = node.bloqueado;
        this.BloqNoDM.checked = false;
        if (!node.bloqueado)
            this.BloqNoDM.checked = true;

        this.ActivoDM.checked = node.activo;
        this.RolPrincipalDM.checked = node.rolPrincipal;

        this.nameInputDM.readOnly = "true";
        this.titleInputDM.readOnly = "true";
  
        this.pk_TipoElementoDM.disabled = "true";
        this.pk_DirectorioDM.disabled = "true";
        this.pk_UsuarioDM.disabled = "true";

        this.pk_DependenciaDM.disabled = "true";
        this.pk_TipoIdentificacionDM.disabled = "true";
        this.numIdentificacionDM.readOnly = "true";
        this.BloqSiDM.disabled = "true";
        this.BloqNoDM.disabled = "true";
        this.ActivoDM.disabled = "true";
        this.RolPrincipalDM.disabled = "true";

    }
    else
    {
        alert("No disponible en este menu");
    }

};

deleteMemberForm.prototype.hide = function (showldUpdateTheNode)
{
    this.deleteMemberForm.style.display = "none";
};



//*********Segmento Grupos*********//

//function init()
//{

//    //OJO QUE ESTO VA
//    getUsersfromKey($("#cmbLlave"), 2);
//}
function inicializarGrupo()
{
    getOrganigramas($('#cmbOrganigramaG'), false);

    $("#cmbGrupos").change(() =>
    {
        GrupoOnChange();
    })

    $("#cancelG").click(function ()
    {
        $("#editGroupForm").hide();
        $('#cmbGrupos')[0].selectedIndex = 0;
    })

    $("#saveG").click(function ()
    {
        var msj = Validaciones('group');
        if (msj == '')
        {
            var node = new Object();
            node.pk_TipoElementoG = $("#cmbTipoElementoG").val();
            node.elemento = $("#elementoG").val();
            node.pk_Organizacion = $("#cmbOrganigramaG").val();

            guardarGrupo(node);
            $("#editGroupForm").hide();

        }

        else
        {
            labelMensaje.innerHTML = msj;
            $("#Alertas").show();
        }
    })


}
    function init()
    {
        inicializarGrupo();


        $("#create").click(function ()
        {
            setOrganigramas($("#nuevoOrganigrama")[0].value);
        })

        $("#back").click(function ()
        {
            DesplegarOrganigrama();
            $("#children").hide();
            $("#tree").show();
            $("#back")[0].hidden = true;

        })

        $("#buttonAlertaOK").click(function ()
        {
                $("#Alertas").hide();
                AsignarFoco();
            }
        )
        $("#cmbElemento").change(() => {
            ElementoOnChange();
        })

        $('#cmbOrganigramas').hide();
        $('#LabelOG').hide();
        $("#nuevoOrganigrama")[0].hidden = true;
        $("#create")[0].hidden = true;
        $("#back")[0].hidden = true;

        $('#cmbGrupos').hide();
        $('#LabelGrupo').hide();
        $("#nuevoGrupo")[0].hidden = true;
        $("#createG")[0].hidden = true;

        $('#cmbUsuarios').hide();
        $('#LabelUsuario').hide();

        $("#cmbOrganigramas").change(() =>
        {
            OrganigramaOnChange();
        })
        
        $("#cmbTipoElemento").change(() =>
        {
            TipoElementoOnChangeLabel($("#labelElemento"), $("#cmbTipoElemento").val());
        })

        $("#cmbDirectorio").change(() =>
        {
            DirectorioOnChange($("#cmbDirectorio"), $("#cmbUsers"));
        })

        $("#cmbUsers").change(() =>
        {
            getUsuarioxLogin($("#name"), $("#email"), $("#cmbUsers")[0][$('#cmbUsers')[0].selectedIndex].text);
        })

        $("#cmbTipoElementoDel").change(() =>
        {
            TipoElementoOnChangeLabel($("#labelElementoDel"), $("#cmbTipoElementoDel").val());
        })

        $("#cmbDirectorioDel").change(() =>
        {
            DirectorioOnChange($("#cmbDirectorioDel"), $("#cmbUsersDel"));
        })

        $("#cmbUsersDel").change(() =>
        {
            getUsuarioxLogin($("#nameDel"), $("#emailDel"), $("#cmbUsersDel")[0][$('#cmbUsersDel')[0].selectedIndex].text);
        })

        $("#cmbTipoElementoDet").change(() =>
        {
            TipoElementoOnChangeLabel($("#labelElementoDet"), $("#cmbTipoElementoDet").val());
        })
        $("#cmbDirectorioDet").change(() =>
        {
            DirectorioOnChange($("#cmbDirectorioDet"), $("#cmbUsersDet"));
        })

        $("#cmbUsersDet").change(() =>
        {
            getUsuarioxLogin($("#nameDet"), $("#emailDet"), $("#cmbUsersDet")[0][$('#cmbUsersDet')[0].selectedIndex].text);
        })

        $("#cmbDirectorioM").change(() =>
        {
            DirectorioOnChange($("#cmbDirectorioM"), $("#cmbUsersM"));
        })

        $("#cmbUsersM").change(() =>
        {
            getUsuarioxLogin($("#nameM"), $("#emailM"), $("#cmbUsersM")[0][$("#cmbUsersM")[0].selectedIndex].text);
        })

        $("#cmbDirectorioDM").change(() =>
        {
            DirectorioOnChange($("#cmbDirectoriDM"), $("#cmbUsersDM"));
        })

        $("#cmbUsersDM").change(() =>
        {
            getUsuarioxLogin($("#nameDM"), $("#emailDM"), $("#cmbUsersDM")[0][$("#cmbUsersDM")[0].selectedIndex].text);
        })
    
        getOrganigramas($('#cmbOrganigramas'), true);
        getGrupos($('#cmbGrupos'));
                

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

        getDirectorios($('#cmbDirectorioM'));
        getTiposElementos($('#cmbTipoElementoM'));
        getAllDbUsers($('#cmbUsersM'));
        getTiposIdentificaciones($('#cmbTipoIdentificacionM'));
        getDependencias($('#cmbDependenciaM'));

        getDirectorios($('#cmbDirectorioDM'));
        getTiposElementos($('#cmbTipoElementoDM'));
        getAllDbUsers($('#cmbUsersDM'));
        getTiposIdentificaciones($('#cmbTipoIdentificacionDM'));
        getDependencias($('#cmbDependenciaDM'));

        $("#cmbTipoElementoG").change(() =>
        {
            TipoElementoOnChangeLabel($("#labelElementoG"), $("#cmbTipoElementoG").val());
        })
        getTiposElementos($('#cmbTipoElementoG'));

    }


function DesplegarHijos(IdGrupo)
{
    $.ajax({

        type: "GET",
        data: { idGrupo: IdGrupo },
        url: "/DiagramOrg/DiagramOrg/ReadChildren",
        success: function (response) {
            chart = new Organigrama(document.getElementById("children"), {
                nodeMenu: {
                    removeMember: { text: "Eliminar" }
                },
                removeMemberUI: new deleteMemberForm(),
                nodeBinding: {
                    field_idO: "pk_Organizacion",
                    field_idTE: "pk_TipoElemento",
                    field_1: "elemento",
                    field_idDir: "pk_Directorio",
                    field_idUser: "pk_Usuario",
                    field_login: "loginUsuario",
                    field_email: "emailUsuario",
                    field_0: "nombre",
                    field_idD: "pk_Dependencia",
                    field_idTI: "pk_TipoIdentificacion",
                    field_NI: "numIdentificacion",
                    field_b: "bloqueado",
                    field_a: "activo",
                    field_rp: "rolPrincipal",
                    field_pid: "pid"
                },

                nodes: response.nodes,
                template: "luba"
            });
        }
    });
}

function DesplegarOrganigrama()
{
    $.ajax({

        type: "GET",
        data: { idOrganigrama: hdnOrganigrama.value },
        url: "/DiagramOrg/DiagramOrg/Read",
        success: function (response)
        {
            //for (var i = 0; i < response.nodes.length; i++)
            //{
            //    var node = response.nodes[i];
            //    if (node.pk_TipoElemento == 2)
            //    {
            //        node.tags = ["Group"];
            //        response.nodes[i] = node;
            //    }
            //}

            chart = new Organigrama(document.getElementById("tree"),
                {
                nodeMenu:
                {
                    details: { text: "Detalles" },
                   
                    add: { text: "Agregar Nodo" },
                    edit: { text: "Editar Usuario" },
                    addInGroup: { text: "Editar Grupo" },
                    addMember: { text: "Agregar Miembro" },
                    remove: { text: "Eliminar" }
                },
                ////ERGRUPO
                //    enableDragDrop: true,
                //    layout: BALKANGraph.mixed,
                //dragDropMenu: {
                //    addInGroup: { text: "Add in group" },
                //    addAsChild: { text: "Add as child" }
                //},
                detailUI: new detailForm(),

                nodeBinding: {
                    field_idO: "pk_Organizacion",
                    field_idTE: "pk_TipoElemento",
                    field_1: "elemento",
                    field_idDir: "pk_Directorio",
                    field_idUser: "pk_Usuario",
                    field_login: "loginUsuario",
                    field_email: "emailUsuario",
                    field_0: "nombreUsuario",
                    field_idD: "pk_Dependencia",
                    field_idTI: "pk_TipoIdentificacion",
                    field_NI: "numIdentificacion",
                    field_b: "bloqueado",
                    field_a: "activo",
                    field_rp: "rolPrincipal",
                    field_pid: "pid"
                },

                editUI: new editForm(),
                removeUI: new deleteForm(),
                editGroupUI: new editGroupForm(),
                addMemberUI: new addMemberForm(),
                showXScroll: BALKANGraph.scroll.visible,
                showYScroll: BALKANGraph.scroll.visible,
                nodes: response.nodes,
                levelSeparation: 30,
                template: "dozzier"
                });

          
        }
    });


   
 
}

function AsignarFoco()
{
    controlFoco.focus();
}
//validaciones

function FormatearControl(control)
{
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    var chain = control.value;
    
    for (var i = 0; i < control.value.length; i++)
    {
        
        if (iChars.indexOf(control.value.charAt(i)) != -1)
        {
            control.value = chain.replace(control.value.charAt(i), "");
            control.focus();
            return false;
        }
    }
    control.value = chain.toUpperCase();
}

function campovacio(control)
{
    var msj= '';
    if (control.val().length == 0)
    {
        controlFoco = control;
        msj='EL CAMPO NO PUEDE ESTAR VACIO';
    }
    return msj;
}

function combo_sin_seleccionar(combo)
{
    var msj = '';
    if (combo[0].selectedIndex < 1)
    {
        controlFoco = combo;
        msj ='DEBE SELECCIONAR UN VALOR';
    }
    return msj;
}


function emailErrado(control)
{
    var msj = '';
    if (/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(control.val())==false)
    {
        controlFoco = control;
        msj ='LA DIRECCION DE EMAIL ES INCORRECTA';
    }
    return msj;
}

function radiobutton_sin_seleccionar(radiob1, radiob2)
{
    var msj = '';
    if (radiob1.checked == false && radiob2.checked == false)
    {
        alert('DEBE SELECCIONAR UNA OPCION');        
    }
    return msj;
}

function validaciones_edit()
{
    var msj = '';
    msj = campovacio($("#elemento"));
    if (msj != '') return msj;
    msj = campovacio($("#name"));
    if (msj != '')  return msj; 
    msj = campovacio($("#email"));
    if (msj != '') return msj; 
    msj = campovacio($("#numIdentificacion"));
    if (msj != '') return msj;

    msj = emailErrado($("#email"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbTipoElemento"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbDirectorio"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbUsers"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbDependencia"));
    if (msj != '') return msj;
   
    msj = combo_sin_seleccionar($("#cmbTipoIdentificacion"));
    if (msj != '') return msj;

    msj = radiobutton_sin_seleccionar(BloqSi, BloqNo);
    if (msj != '') return msj;

    return msj;
}

function validaciones_group()
{
    var msj = '';
    msj = combo_sin_seleccionar($("#cmbOrganigramaG"));
    if (msj != '') return msj;

    msj = campovacio($("#elementoG"));
    if (msj != '') return msj;
    
    msj = combo_sin_seleccionar($("#cmbTipoElementoG"));
    if (msj != '') return msj;

    return msj;
}



function validaciones_AG()
{
    var msj = '';
    msj = combo_sin_seleccionar($("#cmbGrupoNG"));
    if (msj != '') return msj;

    return msj;
}

function validaciones_member()
{
    var msj = '';
    msj = campovacio($("#nameM"));
    if (msj != '') return msj;
    msj = campovacio($("#emailM"));
    if (msj != '') return msj;
    msj = campovacio($("#numIdentificacionM"));
    if (msj != '') return msj;

    msj = emailErrado($("#emailM"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbTipoElementoM"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbDirectorioM"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbUsersM"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbDependenciaM"));
    if (msj != '') return msj;

    msj = combo_sin_seleccionar($("#cmbTipoIdentificacionM"));
    if (msj != '') return msj;

    msj = radiobutton_sin_seleccionar(BloqSiM, BloqNoM);
    if (msj != '') return msj;

    return msj;
}

function Validaciones(div)
{
    var resp= '';
    switch (div)
    {
        case 'edit':
           resp = validaciones_edit();
            break;
        case 'group':
            resp = validaciones_group();
            break;
        case 'AG':
            resp = validaciones_AG();
            break;
        case 'member':
            resp = validaciones_member();
            break;
        default:
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
            alert(div);
            break;
    }

    return resp;

}

//validaciones


function getUsersfromKey(combo, Id)
{
    $.ajax({
        type: "POST",
        data: { IdDirectorio: Id },
        url: "/DiagramOrg/Ldap/GetUsersfromRep",
        //url: "/DiagramOrg/Ldap/GetLDAPUsers",
        success: function (result)
        {
            if (result)
            {
                combo.append(
                    $('<option></option>').val(0).html("Seleccione un Usuario")
                );
                result.forEach((item, index) =>
                {
                    combo.append(
                        $('<option></option>').val(index).html(item.Name)
                    );
                    console.log(item);
                });
            } else
            {
                console.log("no se encontraron usuarios");
            }
        }
    });
}