using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiagramOrgApp.Models
{
    public class NodoElementoModel
    {
        public int id { get; set; }
        public int fk_Directorio { get; set; }
        public string loginUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string emailUsuario { get; set; }


        //public int id { get; set; }
        //public int? pid { get; set; }
        //public string name { get; set; }
        //public string title { get; set; }

    }
}