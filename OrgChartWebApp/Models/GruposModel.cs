using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiagramOrgApp.Models
{
    public class GrupoModel
    {
        //Usuario
        public int id { get; set; }
        public int pk_Usuario { get; set; }
        public string loginUsuario { get; set; }
        public string nombre { get; set; }
        //Directorio
        public int pk_Directorio { get; set; }
        //Padre
        public int pid { get; set; }



        public string emailUsuario { get; set; }
        public int pk_Dependencia { get; set; }
        public int pk_TipoIdentificacion { get; set; }
        public string numIdentificacion { get; set; }
        public bool bloqueado { get; set; }
        public bool activo { get; set; }

    }
}