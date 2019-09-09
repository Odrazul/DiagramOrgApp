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

        public ActionResult Vista()
        {
            return View();
        }

        public ActionResult Hijos()
        {
            return View();
        }
        public JsonResult Read(int idOrganigrama)
        {
            //int idOrganigrama = 1;


            var Empleos = ( from DIR in entities.Directorio
                            join USU in entities.Usuario on DIR.pk_Directorio equals USU.fk_Directorio                                 
                            from FUN in entities.Funcion .Where(FUN => FUN.fk_Usuario == USU.pk_Usuario && FUN.fk_Elemento != FUN.ak_NodoPadre)
                            from ELE in entities.Elemento .Where(ELE => ELE.pk_Elemento == FUN.fk_Elemento && ELE.fk_Organizacion == idOrganigrama) 
                            join TIP_ELE in entities.TipoElemento on ELE.fk_TipoElemento equals TIP_ELE.pk_TipoElemento
                            from FUN_PAD in entities.Funcion.Where(FUN_PAD => FUN_PAD.pk_Funcion == FUN.ak_NodoPadre).DefaultIfEmpty()
                            from ELE_PAD in entities.Elemento .Where (ELE_PAD => ELE_PAD.fk_Organizacion == idOrganigrama && ELE_PAD.pk_Elemento == FUN_PAD.fk_Elemento).DefaultIfEmpty()
                            from USU_PAD in entities.Usuario .Where(USU_PAD => USU_PAD.pk_Usuario == FUN_PAD.fk_Usuario).DefaultIfEmpty()
         
                         select new NodoElementoModel
                         {
                            id = FUN.pk_Funcion,
                            pk_Usuario = USU.pk_Usuario,
                            fk_Directorio = USU.fk_Directorio,
                            loginUsuario = USU.loginUsuario,
                            nombreUsuario = USU.nombreUsuario,
                            emailUsuario = USU.emailUsuario,

                            pk_Organizacion = ELE.fk_Organizacion,
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
                            pid =  FUN_PAD == null ? 0 : FUN_PAD.pk_Funcion,
                            nombreUsuarioPadre = ELE_PAD == null ? "Huerfano" : USU_PAD.nombreUsuario 
                        }).ToList();
            
            var nodes = Empleos.ToList();

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ReadChildren(int idGrupo)
        {

            var Miembros = (from FUN in entities.Funcion.Where(FUN => FUN.pk_Funcion == idGrupo)
                                //from FUN_HIJ in entities.Funcion.Where(FUN_HIJ =>   FUN_HIJ.ak_NodoPadre == FUN.fk_Elemento)
                            from FUN_HIJ in entities.Funcion.Where(FUN_HIJ => ((FUN_HIJ.ak_NodoPadre == FUN.fk_Elemento) || (FUN_HIJ.fk_Elemento == FUN.fk_Elemento)))
                            from USU in entities.Usuario.Where(USU => USU.pk_Usuario == FUN_HIJ.fk_Usuario)

                            select new GrupoModel
                            {
                                id = FUN_HIJ.pk_Funcion,
                                pk_Usuario = USU.pk_Usuario,
                                loginUsuario = USU.loginUsuario,
                                nombre = USU.nombreUsuario,
                                pk_Directorio = USU.fk_Directorio,
                                emailUsuario = USU.emailUsuario,
                                pk_Dependencia = USU.fk_Dependencia,
                                pk_TipoIdentificacion = USU.fk_TipoIdentificacion,
                                numIdentificacion  = USU.numIdentificacion,
                                bloqueado = USU.bloqueado,
                                activo = USU.activo,
                                pid = FUN_HIJ.ak_NodoPadre == FUN.fk_Elemento ? idGrupo : 0
                            }).ToList();

                var nodes = Miembros.ToList();

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ReadGrups()
        {
            var Grupos = (from ELE in entities.Elemento.Where(ELE => ELE.fk_TipoElemento == 2)
                          from FUN in entities.Funcion.Where(FUN => (FUN.ak_NodoPadre != FUN.fk_Elemento) && (FUN.fk_Elemento == ELE.pk_Elemento))
                          from USU in entities.Usuario.Where(USU => USU.pk_Usuario == FUN.fk_Usuario)

                        select new GrupoModel
                        {
                            id = FUN.pk_Funcion,
                            pk_Usuario = USU.pk_Usuario,
                            loginUsuario = USU.loginUsuario,
                            nombre = ELE.nomElemento,
                            pk_Directorio = USU.fk_Directorio,
                            emailUsuario = USU.emailUsuario,
                            pk_Dependencia = USU.fk_Dependencia,
                            pk_TipoIdentificacion = USU.fk_TipoIdentificacion,
                            numIdentificacion = USU.numIdentificacion,
                            bloqueado = USU.bloqueado,
                            activo = USU.activo,
                            pid = FUN.fk_Elemento
                        }).ToList();

            var nodes = Grupos.ToList();

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReadGrupsxOrganigram(int IdOrganigrama)
        {
            var Grupos = (from ELE in entities.Elemento.Where(ELE => ELE.fk_TipoElemento == 2 && ELE.fk_Organizacion ==   IdOrganigrama)
                          from FUN in entities.Funcion.Where(FUN => (FUN.ak_NodoPadre != FUN.fk_Elemento) && (FUN.fk_Elemento == ELE.pk_Elemento))
                          from USU in entities.Usuario.Where(USU => USU.pk_Usuario == FUN.fk_Usuario)

                          select new GrupoModel
                          {     //ELE.pk_elemento,
                              id = ELE.pk_Elemento,
                              pk_Usuario = USU.pk_Usuario,
                              loginUsuario = USU.loginUsuario,
                              nombre = ELE.nomElemento,
                              pk_Directorio = USU.fk_Directorio,
                              emailUsuario = USU.emailUsuario,
                              pk_Dependencia = USU.fk_Dependencia,
                              pk_TipoIdentificacion = USU.fk_TipoIdentificacion,
                              numIdentificacion = USU.numIdentificacion,
                              bloqueado = USU.bloqueado,
                              activo = USU.activo,
                              pid = FUN.fk_Elemento
                          }).ToList();

            var nodes = Grupos.ToList();

            return Json(new { nodes = nodes }, JsonRequestBehavior.AllowGet);
        }
        public EmptyResult UpdateNode(NodoElementoModel model)
        {
            try
            {
                if (entities.Funcion.Find(model.id) == null)//si no existe el nodo en la BD
                {
                    AddNode(model);
                }
                else
                {
                    Usuario NewUser = new Usuario
                    {
                        fk_Directorio = model.fk_Directorio,
                        loginUsuario = model.loginUsuario,
                        nombreUsuario = model.nombreUsuario,
                        emailUsuario = model.emailUsuario,
                        fk_Dependencia = model.pk_Dependencia,
                        fk_TipoIdentificacion = model.pk_TipoIdentificacion,
                        numIdentificacion = model.numIdentificacion,
                        bloqueado = model.bloqueado,
                        activo = model.activo
                    };

                    int iIdUser = AsentarUsuario(NewUser);

                    Elemento NewElement = new Elemento
                    {
                        pk_Elemento = model.pk_Elemento,
                        fk_TipoElemento = model.pk_TipoElemento,
                        fk_Organizacion = model.pk_Organizacion,
                        nomElemento = model.elemento
                    };
                    
                    int iIdElemento = AsentarElemento(NewElement);

                    Funcion NewFunction = new Funcion
                    {
                        fk_Usuario = iIdUser,
                        fk_Elemento = iIdElemento,
                        rolPrincipal = model.rolPrincipal,
                        ak_NodoPadre = model.pid
                    };

                    if (AsentarFuncion(NewFunction) == 1)
                    {
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
                emailUsuario = model.emailUsuario,
                fk_Dependencia = model.pk_Dependencia,
                fk_TipoIdentificacion = model.pk_TipoIdentificacion,
                numIdentificacion = model.numIdentificacion,
                bloqueado = model.bloqueado,
                activo = model.activo
        };
            entities.Usuario.Add(NewUser);
            entities.SaveChanges();

            Elemento NewElement = new Elemento
            {
                fk_TipoElemento = model.pk_TipoElemento,
                fk_Organizacion = model.pk_Organizacion,
                nomElemento = model.elemento
            };
            entities.Elemento.Add(NewElement);
            entities.SaveChanges();

            Funcion NewFunction = new Funcion
            {
                fk_Usuario = NewUser.pk_Usuario,
                fk_Elemento = NewElement.pk_Elemento,
                rolPrincipal = model.rolPrincipal,
                ak_NodoPadre = model.pid
            };
            entities.Funcion.Add(NewFunction);
            entities.SaveChanges();

            return Json(new { id = NewUser.pk_Usuario }, JsonRequestBehavior.AllowGet);
        }

        
        private int AsentarUsuario(Usuario uNewUser)
        {
            var user = entities.Usuario.FirstOrDefault(p => p.loginUsuario == uNewUser.loginUsuario);
            if (user != null)
            {
                user.fk_Directorio = uNewUser.fk_Directorio;
                user.loginUsuario = uNewUser.loginUsuario == "" ? user.loginUsuario : uNewUser.loginUsuario;
                user.nombreUsuario = uNewUser.nombreUsuario == "" ? user.nombreUsuario: uNewUser.nombreUsuario;
                user.emailUsuario = uNewUser.emailUsuario == "" ? user.emailUsuario : uNewUser.emailUsuario;
                user.fk_Dependencia = uNewUser.fk_Dependencia == 0 ? user.fk_Dependencia : uNewUser.fk_Dependencia;
                user.fk_TipoIdentificacion = uNewUser.fk_TipoIdentificacion == 0 ? user.fk_TipoIdentificacion : uNewUser.fk_TipoIdentificacion;
                user.numIdentificacion = uNewUser.numIdentificacion == "" ? user.numIdentificacion : uNewUser.numIdentificacion;
                user.bloqueado = uNewUser.numIdentificacion == "" ? user.bloqueado : uNewUser.bloqueado;
                user.activo = uNewUser.numIdentificacion == "" ? user.activo : uNewUser.activo;
                entities.Entry(user).State = System.Data.Entity.EntityState.Modified;
                entities.SaveChanges();
            }
            else
            {
                entities.Usuario.Add(uNewUser);
                entities.SaveChanges();
                return uNewUser.pk_Usuario;
            }

            
            return user.pk_Usuario;

        }


        private int AsentarElemento(Elemento eNewElement)
        {
            var element = entities.Elemento.FirstOrDefault(p => p.pk_Elemento == eNewElement.pk_Elemento);
            if (element != null)
            {
                element.fk_TipoElemento = eNewElement.fk_TipoElemento;
                element.fk_Organizacion = eNewElement.fk_Organizacion;
                element.nomElemento = eNewElement.nomElemento;
                element.pk_Elemento = eNewElement.pk_Elemento;
                entities.Entry(element).State = System.Data.Entity.EntityState.Modified;
                entities.SaveChanges();
            }
            else
            {
                entities.Elemento.Add(eNewElement);
                entities.SaveChanges();
                return eNewElement.pk_Elemento;
            }


            return element.pk_Elemento;

        }

        private int AsentarFuncion(Funcion fNewFuncion)
        {
            var function = entities.Funcion.FirstOrDefault(p => p.fk_Elemento == fNewFuncion.fk_Elemento && p.fk_Usuario == fNewFuncion.fk_Usuario);
            if (function != null)
            {
                function.fk_Usuario = fNewFuncion.fk_Usuario;
                function.fk_Elemento = fNewFuncion.fk_Elemento;
                function.rolPrincipal = fNewFuncion.rolPrincipal;
                function.ak_NodoPadre = fNewFuncion.ak_NodoPadre;
                entities.Entry(function).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                entities.Funcion.Add(fNewFuncion);
            }

            entities.SaveChanges();
            return 1;

        }


        public JsonResult AddGroup(NodoElementoModel model)
        {
            Elemento NewElement= null;
            var elemento = entities.Elemento.FirstOrDefault(p => p.nomElemento == model.elemento && p.fk_Organizacion ==model.pk_Organizacion);
            if (elemento == null)
            {
                 NewElement = new Elemento
                {
                    fk_TipoElemento = 2,
                    fk_Organizacion = model.pk_Organizacion,
                    nomElemento = model.elemento
                };
                entities.Elemento.Add(NewElement);
                entities.SaveChanges();

            }

            return Json(new { id = NewElement.pk_Elemento }, JsonRequestBehavior.AllowGet);
        }


        public EmptyResult AssignGroup(NodoElementoModel model)
        {
            try
            {
                Funcion NewFunction = new Funcion
                {
                    fk_Usuario = model.pk_Usuario,
                    fk_Elemento = model.pk_Elemento,
                    rolPrincipal = true,
                    ak_NodoPadre = model.pid
                };

                if (AsentarFuncion(NewFunction) == 1)
                {
                    return new EmptyResult();
                }

            }
            catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult UpdateGroup(NodoElementoModel model)
        {
            try
            {
                if (entities.Funcion.Find(model.id) == null)//si no existe el nodo en la BD
                {
                    AddGroup(model);
                }
                else
                {
                    Usuario NewUser = new Usuario
                    {
                        fk_Directorio = 1,
                        loginUsuario = model.elemento,
                        nombreUsuario = model.elemento,
                        emailUsuario = model.emailUsuario,
                        fk_Dependencia = 1,
                        fk_TipoIdentificacion = 1,
                        numIdentificacion = "0",
                        bloqueado = false,
                        activo = true
                    };

                    int iIdUser = AsentarUsuario(NewUser);

                    Elemento NewElement = new Elemento
                    {
                        pk_Elemento = model.pk_Elemento,
                        fk_TipoElemento = model.pk_TipoElemento,
                        fk_Organizacion = model.pk_Organizacion,
                        nomElemento = model.elemento
                    };

                    int iIdElemento = AsentarElemento(NewElement);

                    Funcion NewFunction = new Funcion
                    {
                        fk_Usuario = iIdUser,
                        fk_Elemento = iIdElemento,
                        rolPrincipal = true,
                        ak_NodoPadre = model.pid
                    };

                    if (AsentarFuncion(NewFunction) == 1)
                    {
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


        //public JsonResult AddGroup(NodoElementoModel model)
        //{

        //    Usuario NewUser = new Usuario
        //    {
        //        fk_Directorio = 1,
        //        loginUsuario = model.elemento,
        //        nombreUsuario = model.elemento,
        //        emailUsuario = model.emailUsuario,
        //        fk_Dependencia = 1,
        //        fk_TipoIdentificacion = 1,
        //        numIdentificacion = "",
        //        bloqueado = false,
        //        activo = true
        //    };
        //    entities.Usuario.Add(NewUser);
        //    entities.SaveChanges();

        //    Elemento NewElement = new Elemento
        //    {
        //        fk_TipoElemento = 2,
        //        fk_Organizacion = model.pk_Organizacion,
        //        nomElemento = model.elemento
        //    };
        //    entities.Elemento.Add(NewElement);
        //    entities.SaveChanges();

        //    Funcion NewFunction = new Funcion
        //    {
        //        fk_Usuario = NewUser.pk_Usuario,
        //        fk_Elemento = NewElement.pk_Elemento,
        //        rolPrincipal = true,
        //        ak_NodoPadre = model.pid
        //    };
        //    entities.Funcion.Add(NewFunction);
        //    entities.SaveChanges();

        //    return Json(new { id = NewUser.pk_Usuario }, JsonRequestBehavior.AllowGet);
        //}

        //public EmptyResult UpdateGroup(NodoElementoModel model)
        //{
        //    try
        //    {
        //        if (entities.Funcion.Find(model.id) == null)//si no existe el nodo en la BD
        //        {
        //            AddGroup(model);
        //        }
        //        else
        //        {
        //            Usuario NewUser = new Usuario
        //            {
        //                fk_Directorio = 1,
        //                loginUsuario = model.elemento,
        //                nombreUsuario = model.elemento,
        //                emailUsuario = model.emailUsuario,
        //                fk_Dependencia = 1,
        //                fk_TipoIdentificacion = 1,
        //                numIdentificacion = "0",
        //                bloqueado = false,
        //                activo = true
        //            };

        //            int iIdUser = AsentarUsuario(NewUser);

        //            Elemento NewElement = new Elemento
        //            {
        //                pk_Elemento = model.pk_Elemento,
        //                fk_TipoElemento = model.pk_TipoElemento,
        //                fk_Organizacion = model.pk_Organizacion,
        //                nomElemento = model.elemento
        //            };

        //            int iIdElemento = AsentarElemento(NewElement);

        //            Funcion NewFunction = new Funcion
        //            {
        //                fk_Usuario = iIdUser,
        //                fk_Elemento = iIdElemento,
        //                rolPrincipal = true,
        //                ak_NodoPadre = model.pid
        //            };

        //            if (AsentarFuncion(NewFunction) == 1)
        //            {
        //                return new EmptyResult();
        //            }


        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return new EmptyResult();
        //    }
        //    return new EmptyResult();
        //}

        public JsonResult AddMember(NodoElementoModel model)
        {

            Usuario NewUser = new Usuario
            {
                fk_Directorio = model.pk_Directorio,
                loginUsuario = model.loginUsuario,
                nombreUsuario = model.nombreUsuario,
                emailUsuario = model.emailUsuario,
                fk_Dependencia = model.pk_Dependencia,
                fk_TipoIdentificacion = model.pk_TipoIdentificacion,
                numIdentificacion = model.numIdentificacion,
                bloqueado = model.bloqueado,
                activo = model.activo
            };

            int iIdUser = AsentarUsuario(NewUser);
            
            Funcion NewFunction = new Funcion
            {
                fk_Usuario = iIdUser,
                fk_Elemento = model.pk_Elemento,
                rolPrincipal = false,
                ak_NodoPadre = model.pk_Elemento
            };
            entities.Funcion.Add(NewFunction);
            entities.SaveChanges();

            return Json(new { id = NewUser.pk_Usuario }, JsonRequestBehavior.AllowGet);
        }

        public EmptyResult UpdateMember(NodoElementoModel model)
        {
            try
            {
                Usuario NewUser;
                int iIdUser=model.pk_Usuario;
                var user = entities.Usuario.FirstOrDefault(p => p.loginUsuario == model.loginUsuario);                
                if (user == null)
                {
                     NewUser = new Usuario
                    {
                        fk_Directorio = model.fk_Directorio,
                        loginUsuario = model.loginUsuario,
                        nombreUsuario = model.nombreUsuario,
                        emailUsuario = model.emailUsuario,
                        fk_Dependencia = model.pk_Dependencia,
                        fk_TipoIdentificacion = model.pk_TipoIdentificacion,
                        numIdentificacion = model.numIdentificacion,
                        bloqueado = model.bloqueado,
                        activo = model.activo
                    };

                     iIdUser = AsentarUsuario(NewUser);
                }
                else
                {
                    iIdUser = user.pk_Usuario;
                }
                       
                    var funcion = entities.Funcion.FirstOrDefault(p => p.fk_Usuario == iIdUser && p.fk_Elemento == model.pk_Elemento);
                    if (funcion == null)
                        AddMember(model);
            }
            catch (Exception ex)
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }

        public EmptyResult RemoveMember(int id)
        {
            var node = entities.Funcion.First(p => p.pk_Funcion == id);
            entities.Funcion.Remove(node);
            entities.SaveChanges();
            return new EmptyResult();
        }

    }
}
