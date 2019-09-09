using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiagramOrgApp.Models
{
    public class OrganigramasModel
    {
        public int id { get; set; }
        public string nomOrganizacion { get; set; }
        public string titulo { get; set; }

        public IEnumerable<string> SelectedOrganigramas { get; set; }
        public IEnumerable<SelectListItem> Cities { get; set; }
    }
}