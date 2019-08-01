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
        public int fk_Directorio { get; set; }
        public string loginUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string emailUsuario { get; set; }

        //Elemento
        public int pk_TipoElemento { get; set; }
        public string nomTipoElemento { get; set; }
        public int pk_Elemento { get; set; }
        public string elemento { get; set; }

        //Directorio
        public int pk_Directorio { get; set; }
        public string nomDirectorio { get; set; }

        //Padre
        public int pid { get; set; }
        public string nombreUsuarioPadre { get; set; }

    }
}