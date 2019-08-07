using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiagramOrgApp.Models
{
    public class NodoElementoModel
    {
        //Usuario
        public int id { get; set; }

        public int pk_Usuario { get; set; }
        public int fk_Directorio { get; set; }
        public string loginUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string emailUsuario { get; set; }
        public int pk_Dependencia { get; set; }
        public int pk_TipoIdentificacion { get; set; }
        public string numIdentificacion { get; set; }
        public bool bloqueado { get; set; }
        public bool activo { get; set; }

        //Elemento
        public int pk_TipoElemento { get; set; }
        public string nomTipoElemento { get; set; }
        public int pk_Elemento { get; set; }
        public string elemento { get; set; }
        public bool rolPrincipal { get; set; }

        //Directorio
        public int pk_Directorio { get; set; }
        public string nomDirectorio { get; set; }

        //Padre
        public int pid { get; set; }
        public string nombreUsuarioPadre { get; set; }

    }
}