//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DiagramOrgApp.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public int pk_User { get; set; }
        public string loginUser { get; set; }
        public string nombreUser { get; set; }
        public string emailUser { get; set; }
        public int fk_Directorio { get; set; }
        public int fk_Dependencia { get; set; }
        public int fk_TipoIdentificacion { get; set; }
        public string numIdentificacion { get; set; }
        public bool bloqueado { get; set; }
        public bool activo { get; set; }
    }
}
