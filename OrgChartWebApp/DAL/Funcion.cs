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
    
    public partial class Funcion
    {
        public int pk_Funcion { get; set; }
        public int fk_Elemento { get; set; }
        public int fk_Usuario { get; set; }
        public bool rolPrincipal { get; set; }
        public Nullable<int> ak_NodoPadre { get; set; }
    
        public virtual Elemento Elemento { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
