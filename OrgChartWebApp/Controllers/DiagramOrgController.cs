using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using DiagramOrgApp.DAL;
using DiagramOrgApp.Models;

namespace DiagramOrgApp.Controllers
{
    public class DiagramOrgController : Controller
    {

        DozzierOCEntities entities = new DozzierOCEntities();

        public ActionResult Vista()
        {
            return View();
        }

     public JsonResult Read()
        {
            //Codigo ilustrativo para consultar con linq varias tablas

            //var usuarios = (from u in entities.Usuario
            //               join e in entities.Elemento on u.pk_Usuario equals e.ak_ElementoPadre
            //               join te in entities.TipoElemento on e.fk_TipoElemento equals te.pk_TipoElemento
            //               where u.fk_Directorio == 1
            //               select new EmployeeNodeModel
            //               {
            //                   id = u.pk_Usuario,
            //                   name = u.nombreUsuario,
            //                   title = te.nomTipoElemento
            //               }).ToList();


            List <EmployeeNodeModel > usuarios = new List<EmployeeNodeModel>();
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 1,
                tags = new string[] { "Directors"},
                name = "Billy Moore",
                title = "CEO",             
                img = "https://balkangraph.com/js/img/2.jpg",
                pid = 3
            });
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 2,
                tags = new string[] { "Directors"},
                name = "Bennie Shelto",
                title = "Director",
                img = "https://balkangraph.com/js/img/3.jpg",
                pid = 3
            });
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 3,
                name = "Billie Ros",
                title = "Dev Team Lead",
                img = "https://balkangraph.com/js/img/5.jpg"
            });
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 4,
                tags = new string[] { "Devs" },
                name = "Pedro Perez",
                title = "Analista",
                img = "https://balkangraph.com/js/img/3.jpg",
                pid = 3
            });
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 5,
                tags = new string[] { "Devs" },
                name = "Jaime Perez",
                title = "Analista",
                img = "https://balkangraph.com/js/img/3.jpg",
                pid = 3
            });
            usuarios.Add(new EmployeeNodeModel()
            {
                id = 6,             
                name = "Luisa Perez",
                title = "Analista",
                img = "https://balkangraph.com/js/img/3.jpg",
                pid = 3
            });

            return Json(new { nodes = usuarios }, JsonRequestBehavior.AllowGet);
        }


        public EmptyResult UpdateNode(EmployeeNodeModel model)
        {
            try
            {

                if (entities.OrgchartUser.Find(model.id) == null)
                {
                    AddNode(model);
                }
                else
                {
                    var node = entities.OrgchartUser.Single(p => p.id == model.id);
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

            }
            catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult RemoveNode(int id)
        {
            var node = entities.OrgchartUser.First(p => p.id == id);
            entities.OrgchartUser.Remove(node);

            int? parentId = node.pid;

            var children = entities.OrgchartUser.Where(p => p.pid == node.id);
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
            entities.OrgchartUser.Add(employee);
            entities.SaveChanges();

            return Json(new { id = employee.id }, JsonRequestBehavior.AllowGet);
        }


    }
}
