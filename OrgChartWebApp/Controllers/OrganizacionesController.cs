using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DiagramOrgApp.DAL;
using DiagramOrgApp.Models;


namespace DiagramOrgApp.Controllers
{
    public class OrganizacionesController : Controller
    {
        DozzierOCEntities entities = new DozzierOCEntities();

        public ActionResult menuDO()
        {
            return View();
        }



        //Segmento Interno de Diagramas
        public JsonResult ReadTree()
        {
            int idOrganigrama = 1;


            var Empleos = (from DIR in entities.Directorio
                           join USU in entities.Usuario on DIR.pk_Directorio equals USU.fk_Directorio
                           from FUN in entities.Funcion.Where(FUN => FUN.fk_Usuario == USU.pk_Usuario && FUN.fk_Elemento != FUN.ak_NodoPadre)
                           from ELE in entities.Elemento.Where(ELE => ELE.pk_Elemento == FUN.fk_Elemento && ELE.fk_Organizacion == idOrganigrama)
                           join TIP_ELE in entities.TipoElemento on ELE.fk_TipoElemento equals TIP_ELE.pk_TipoElemento
                           from FUN_PAD in entities.Funcion.Where(FUN_PAD => FUN_PAD.pk_Funcion == FUN.ak_NodoPadre).DefaultIfEmpty()
                           from ELE_PAD in entities.Elemento.Where(ELE_PAD => ELE_PAD.fk_Organizacion == idOrganigrama && ELE_PAD.pk_Elemento == FUN_PAD.fk_Elemento).DefaultIfEmpty()
                           from USU_PAD in entities.Usuario.Where(USU_PAD => USU_PAD.pk_Usuario == FUN_PAD.fk_Usuario).DefaultIfEmpty()

                           select new NodoElementoModel
                           {
                               id = FUN.pk_Funcion,
                               pk_Usuario = USU.pk_Usuario,
                               fk_Directorio = USU.fk_Directorio,
                               loginUsuario = USU.loginUsuario,
                               nombreUsuario = USU.nombreUsuario,
                               emailUsuario = USU.emailUsuario,

                               pk_Dependencia = USU.fk_Dependencia,
                               pk_TipoIdentificacion = USU.fk_TipoIdentificacion,
                               numIdentificacion = USU.numIdentificacion,
                               bloqueado = USU.bloqueado,
                               activo = USU.activo,
                               rolPrincipal = FUN.rolPrincipal,

                               pk_TipoElemento = TIP_ELE.pk_TipoElemento,
                               nomTipoElemento = TIP_ELE.nomTipoElemento,
                               pk_Elemento = ELE.pk_Elemento,
                               elemento = ELE.nomElemento,
                               pk_Directorio = DIR.pk_Directorio,
                               nomDirectorio = DIR.nomDirectorio,
                               pid = FUN_PAD == null ? 0 : FUN_PAD.pk_Funcion,
                               nombreUsuarioPadre = ELE_PAD == null ? "Huerfano" : USU_PAD.nombreUsuario
                           }).ToList();

            var nodes = Empleos.ToList();

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }


        public EmptyResult UpdateNodeTree(NodoElementoModel model)
        {
            try
            {
                if (entities.Usuario.Find(model.id) == null)
                {
                    AddNode(model);
                }
                else
                {
                    var user = entities.Usuario.Single(p => p.pk_Usuario == model.id);
                    if (user != null)
                    {
                        user.fk_Directorio = model.fk_Directorio;
                        user.loginUsuario = model.loginUsuario;
                        user.nombreUsuario = model.nombreUsuario;
                        user.emailUsuario = model.emailUsuario;
                        user.fk_Dependencia = model.pk_Dependencia;
                        user.fk_TipoIdentificacion = model.pk_TipoIdentificacion;
                        user.numIdentificacion = model.numIdentificacion;
                        user.bloqueado = model.bloqueado;
                        user.activo = model.activo;
                        entities.Entry(user).State = System.Data.Entity.EntityState.Modified;
                        entities.SaveChanges();

                    }

                    if (entities.Elemento.Find(model.pk_Elemento) == null)
                    {
                        Elemento NewElement = new Elemento
                        {
                            fk_TipoElemento = model.pk_TipoElemento,
                            fk_Organizacion = 1,
                            nomElemento = model.elemento
                        };
                        entities.Elemento.Add(NewElement);
                        entities.SaveChanges();

                        Funcion NewFunction = new Funcion
                        {
                            fk_Usuario = user.pk_Usuario,
                            fk_Elemento = NewElement.pk_Elemento,
                            rolPrincipal = model.rolPrincipal,
                            ak_NodoPadre = model.pid
                        };
                        entities.Funcion.Add(NewFunction);
                        entities.SaveChanges();
                    }
                    else
                    {
                        var element = entities.Elemento.Single(p => p.pk_Elemento == model.pk_Elemento);
                        if (element != null)
                        {
                            element.fk_TipoElemento = model.pk_TipoElemento;
                            element.fk_Organizacion = 1;
                            element.nomElemento = model.elemento;
                            element.pk_Elemento = model.pk_Elemento;
                            entities.Entry(element).State = System.Data.Entity.EntityState.Modified;
                            entities.SaveChanges();
                        }

                        if (entities.Funcion.Where(f => f.fk_Elemento == model.pk_Elemento && f.fk_Usuario == model.id) == null)
                        {
                            Funcion NewFunction = new Funcion
                            {
                                fk_Usuario = model.pk_Usuario,
                                fk_Elemento = element.pk_Elemento,
                                rolPrincipal = model.rolPrincipal,
                                ak_NodoPadre = model.pid
                            };
                            entities.Funcion.Add(NewFunction);
                            entities.SaveChanges();

                        }
                        else
                        {
                            var function = entities.Funcion.Single(p => p.fk_Elemento == model.pk_Elemento && p.fk_Usuario == model.pk_Usuario);
                            if (function != null)
                            {
                                function.fk_Usuario = model.id;
                                function.fk_Elemento = model.pk_Elemento;
                                function.rolPrincipal = model.rolPrincipal;
                                entities.Entry(function).State = System.Data.Entity.EntityState.Modified;
                                entities.SaveChanges();
                                return new EmptyResult();
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult RemoveNodeTree(int id)
        {
            var node = entities.Funcion.First(p => p.pk_Funcion == id);
            entities.Funcion.Remove(node);

            int? parentId = node.ak_NodoPadre;

            var children = entities.Funcion.Where(p => p.ak_NodoPadre == node.pk_Funcion && p.rolPrincipal);
            foreach (var child in children)
            {
                child.ak_NodoPadre = node.ak_NodoPadre;
            }

            entities.SaveChanges();
            return new EmptyResult();
        }

        public JsonResult AddNodeTree(NodoElementoModel model)
        {

            Usuario NewUser = new Usuario
            {
                fk_Directorio = model.fk_Directorio,
                loginUsuario = model.loginUsuario,
                nombreUsuario = model.nombreUsuario,
                emailUsuario = model.emailUsuario
            };
            entities.Usuario.Add(NewUser);
            entities.SaveChanges();

            Elemento NewElement = new Elemento
            {
                fk_TipoElemento = model.pk_TipoElemento,
                fk_Organizacion = 1,
                nomElemento = model.elemento
            };
            entities.Elemento.Add(NewElement);
            entities.SaveChanges();

            Funcion NewFunction = new Funcion
            {
                fk_Usuario = NewUser.pk_Usuario,
                fk_Elemento = NewElement.pk_Elemento,
                rolPrincipal = true,    //pendiente agregar en vista, modelo y controlador
                ak_NodoPadre = model.id
            };
            entities.Funcion.Add(NewFunction);
            entities.SaveChanges();

            return Json(new { id = NewUser.pk_Usuario }, JsonRequestBehavior.AllowGet);
        }


        //Segmento Interno de Diagramas



        public JsonResult Read()
        {

            var nodes = (from ORG in entities.Organizacion                           

                           select new OrganigramasModel
                           {
                               id = ORG.pk_Organizacion,
                               nomOrganizacion = ORG.nomOrganizacion,
                               titulo= "Organigrama"
                            }).ToList();

          

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }


        public EmptyResult UpdateNode(NodoElementoModel model)
        {
            try
            {
                if (entities.Usuario.Find(model.id) == null)
                {
                    AddNode(model);
                }
                else
                {
                    var user = entities.Usuario.Single(p => p.pk_Usuario == model.id);
                    if (user != null)
                    {
                        user.fk_Directorio = model.fk_Directorio;
                        user.loginUsuario = model.loginUsuario;
                        user.nombreUsuario = model.nombreUsuario;
                        user.emailUsuario = model.emailUsuario;
                        user.fk_Dependencia = model.pk_Dependencia;
                        user.fk_TipoIdentificacion = model.pk_TipoIdentificacion;
                        user.numIdentificacion = model.numIdentificacion;
                        user.bloqueado = model.bloqueado;
                        user.activo = model.activo;
                        entities.Entry(user).State = System.Data.Entity.EntityState.Modified;
                        entities.SaveChanges();

                    }

                    if (entities.Elemento.Find(model.pk_Elemento) == null)
                    {
                        Elemento NewElement = new Elemento
                        {
                            fk_TipoElemento = model.pk_TipoElemento,
                            fk_Organizacion = 1,
                            nomElemento = model.elemento
                        };
                        entities.Elemento.Add(NewElement);
                        entities.SaveChanges();

                        Funcion NewFunction = new Funcion
                        {
                            fk_Usuario = user.pk_Usuario,
                            fk_Elemento = NewElement.pk_Elemento,
                            rolPrincipal = model.rolPrincipal,
                            ak_NodoPadre = model.pid
                        };
                        entities.Funcion.Add(NewFunction);
                        entities.SaveChanges();
                    }
                    else
                    {
                        var element = entities.Elemento.Single(p => p.pk_Elemento == model.pk_Elemento);
                        if (element != null)
                        {
                            element.fk_TipoElemento = model.pk_TipoElemento;
                            element.fk_Organizacion = 1;
                            element.nomElemento = model.elemento;
                            element.pk_Elemento = model.pk_Elemento;
                            entities.Entry(element).State = System.Data.Entity.EntityState.Modified;
                            entities.SaveChanges();
                        }

                        if (entities.Funcion.Where(f => f.fk_Elemento == model.pk_Elemento && f.fk_Usuario == model.id) == null)
                        {
                            Funcion NewFunction = new Funcion
                            {
                                fk_Usuario = model.pk_Usuario,
                                fk_Elemento = element.pk_Elemento,
                                rolPrincipal = model.rolPrincipal,
                                ak_NodoPadre = model.pid
                            };
                            entities.Funcion.Add(NewFunction);
                            entities.SaveChanges();

                        }
                        else
                        {
                            var function = entities.Funcion.Single(p => p.fk_Elemento == model.pk_Elemento && p.fk_Usuario == model.pk_Usuario);
                            if (function != null)
                            {
                                function.fk_Usuario = model.id;
                                function.fk_Elemento = model.pk_Elemento;
                                function.rolPrincipal = model.rolPrincipal;
                                entities.Entry(function).State = System.Data.Entity.EntityState.Modified;
                                entities.SaveChanges();
                                return new EmptyResult();
                            }
                        }
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
            var node = entities.Funcion.First(p => p.pk_Funcion == id);
            entities.Funcion.Remove(node);

            int? parentId = node.ak_NodoPadre;

            var children = entities.Funcion.Where(p => p.ak_NodoPadre == node.pk_Funcion && p.rolPrincipal);
            foreach (var child in children)
            {
                child.ak_NodoPadre = node.ak_NodoPadre;
            }

            entities.SaveChanges();
            return new EmptyResult();
        }

        public JsonResult AddNode(NodoElementoModel model)
        {

            Usuario NewUser = new Usuario
            {
                fk_Directorio = model.fk_Directorio,
                loginUsuario = model.loginUsuario,
                nombreUsuario = model.nombreUsuario,
                emailUsuario = model.emailUsuario
            };
            entities.Usuario.Add(NewUser);
            entities.SaveChanges();

            Elemento NewElement = new Elemento
            {
                fk_TipoElemento = model.pk_TipoElemento,
                fk_Organizacion = 1,
                nomElemento = model.elemento
            };
            entities.Elemento.Add(NewElement);
            entities.SaveChanges();

            Funcion NewFunction = new Funcion
            {
                fk_Usuario = NewUser.pk_Usuario,
                fk_Elemento = NewElement.pk_Elemento,
                rolPrincipal = true,    //pendiente agregar en vista, modelo y controlador
                ak_NodoPadre = model.id
            };
            entities.Funcion.Add(NewFunction);
            entities.SaveChanges();

            return Json(new { id = NewUser.pk_Usuario }, JsonRequestBehavior.AllowGet);
        }
    }
}
