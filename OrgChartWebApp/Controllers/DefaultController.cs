using DiagramOrgApp.DAL;
using DiagramOrgApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiagramOrgApp.Controllers
{
    public class DefaultController : Controller
    {
        OrgChartDatabaseEntities entities = new OrgChartDatabaseEntities();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Read()
        {
            var nodes = entities.OrgchartUsers.Select(p =>
            new EmployeeNodeModel
            {
                id = p.id,
                pid = p.pid,
                name = p.name,
                title = p.title
            });
            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }

        
        public EmptyResult UpdateNode(EmployeeNodeModel model)
        {    
            try
            {
                var node = entities.OrgchartUsers.Single(p => p.id == model.id);
                if (node != null)
                {
                    node.name = model.name;
                    node.pid = model.pid;
                    node.title = model.title;
                    node.id = model.id;
                    entities.Entry(node).State = System.Data.Entity.EntityState.Modified;
                    entities.SaveChanges();
                    return new EmptyResult();
                }
            } catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult RemoveNode(int id)
        {
            var node = entities.Employees.First(p => p.Id == id);
            entities.Employees.Remove(node);

            int? parentId = node.ReportsTo;

            var children = entities.Employees.Where(p => p.ReportsTo == node.Id);
            foreach (var child in children)
            {
                child.ReportsTo = node.ReportsTo;
            }

            entities.SaveChanges();
            return new EmptyResult();
        }

        public JsonResult AddNode(NodeModel model)
        {
            Employee employee = new Employee();
            employee.FullName = model.fullName;
            employee.ReportsTo = model.pid;
            entities.Employees.Add(employee);

            entities.SaveChanges();

            return Json(new { id = employee.Id }, JsonRequestBehavior.AllowGet);
        }
    }
}