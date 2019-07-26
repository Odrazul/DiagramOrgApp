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
                
                if (entities.OrgchartUsers.Find(model.id) == null)
                {
                    AddNode(model);
                }
                else
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
                }

            } catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult RemoveNode(int id)
        {
            var node = entities.OrgchartUsers.First(p => p.id == id);
            entities.OrgchartUsers.Remove(node);

            int? parentId = node.pid;

            var children = entities.OrgchartUsers.Where(p => p.pid == node.id);
            foreach (var child in children)
            {
                child.pid = node.pid;
            }

            entities.SaveChanges();
            return new EmptyResult();
        }

        public JsonResult AddNode(EmployeeNodeModel model)
        {

            //node.name = model.name;
            //node.pid = model.pid;
            //node.title = model.title;
            //node.id = model.id;


            OrgchartUser employee = new OrgchartUser();
            employee.id = model.id;
            employee.pid = model.pid;
            employee.name = model.name;
            employee.title = model.title;
            entities.OrgchartUsers.Add(employee);
            entities.SaveChanges();

            return Json(new { id = employee.id }, JsonRequestBehavior.AllowGet);
        }
    }
}