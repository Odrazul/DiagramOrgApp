
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
    this.nameInput = document.getElementById("nomOrganizacion");
    this.titleInput = document.getElementById("pk_Organizacion");


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
