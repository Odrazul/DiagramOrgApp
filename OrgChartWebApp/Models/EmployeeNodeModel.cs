using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiagramOrgApp.Models
{
    public class EmployeeNodeModel
    {
        public int id { get; set; }
        public int? pid { get; set; }
        public string name { get; set; }
        public string title { get; set; }
    }
}