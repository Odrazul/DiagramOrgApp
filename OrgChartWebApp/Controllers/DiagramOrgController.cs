using System;
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
        DozzierOCEntities entities2 = new DozzierOCEntities();

        public ActionResult Vista()
        {
            return View();
        }

        public JsonResult Read()
        {
    
            var nodes = (from DIR in entities.Directorio
                         join USU in entities.Usuario on DIR.pk_Directorio equals USU.fk_Directorio                                 
                         join FUN in entities.Funcion on USU.pk_Usuario equals FUN.fk_Usuario
                         join ELE in entities.Elemento on FUN.fk_Elemento equals ELE.pk_Elemento
                         join TIP_ELE in entities.TipoElemento on ELE.fk_TipoElemento equals TIP_ELE.pk_TipoElemento
                         from ELE_PAD in entities.Elemento .Where (ELE_PAD => ELE_PAD.pk_Elemento == ELE.ak_ElementoPadre).DefaultIfEmpty()
                         from FUN_PAD in entities.Funcion .Where (FUN_PAD => FUN_PAD.fk_Elemento == ELE_PAD.pk_Elemento).DefaultIfEmpty()
                         from USU_PAD in entities.Usuario .Where(USU_PAD => USU_PAD.pk_Usuario == FUN_PAD.fk_Usuario).DefaultIfEmpty()
         
                         select new NodoElementoModel
                         {
                            id = USU.pk_Usuario,
                            fk_Directorio = USU.fk_Directorio,
                            loginUsuario = USU.loginUsuario,
                            nombreUsuario = USU.nombreUsuario,
                            emailUsuario = USU.emailUsuario,
                            pk_TipoElemento= TIP_ELE.pk_TipoElemento,
                            nomTipoElemento = TIP_ELE.nomTipoElemento,
                            pk_Elemento = ELE.pk_Elemento,
                            elemento = ELE.nomElemento,
                            pk_Directorio = DIR.pk_Directorio,
                            nomDirectorio = DIR.nomDirectorio,
                            pid =  ELE_PAD== null ? 0 : ELE_PAD.pk_Elemento,
                            nombreUsuarioPadre = ELE_PAD == null ? "Huerfano" : USU_PAD.nombreUsuario 
                        }).ToList();
            
                return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
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
