using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DiagramOrgApp.DAL;

namespace DiagramOrgApp.Controllers
{
    public class UsersController : Controller
    {
        private UserExternalEntities db = new UserExternalEntities();



        public JsonResult GetDBUsers()
        {

            List<User> list = db.User.ToList();

            var lista = list.Select(L => new {
                L.pk_User,
                L.loginUser,
                L.nombreUser,
                L.emailUser,
                L.fk_Directorio,
                L.fk_Dependencia,
                L.fk_TipoIdentificacion,
                L.numIdentificacion,
                L.bloqueado,
                L.activo

            });


            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getUsuarioxId(int Id)
        {
            List<User> list = db.User.Where(T => T.pk_User == Id).ToList();

            var lista = list.Select(L => new {
                L.pk_User,
                L.loginUser,
                L.nombreUser,
                L.emailUser,
                L.fk_Directorio,
                L.fk_Dependencia,
                L.fk_TipoIdentificacion,
                L.numIdentificacion,
                L.bloqueado,
                L.activo
            });

            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getUsuarioxLogin(string login)
        {
            List<User> list = db.User.Where(T => T.loginUser == login).ToList();

            var lista = list.Select(L => new {
                L.pk_User,
                L.loginUser,
                L.nombreUser,
                L.emailUser,
                L.fk_Directorio,
                L.fk_Dependencia,
                L.fk_TipoIdentificacion,
                L.numIdentificacion,
                L.bloqueado,
                L.activo
            });

            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }


        // GET: Users
        public ActionResult Index()
        {
            return View(db.User.ToList());
        }

        // GET: Users/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.User.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // GET: Users/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_User,loginUser,nombreUser,emailUser,fk_Directorio,fk_Dependencia,fk_TipoIdentificacion,numIdentificacion,bloqueado,activo")] User user)
        {
            if (ModelState.IsValid)
            {
                db.User.Add(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(user);
        }

        // GET: Users/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.User.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_User,loginUser,nombreUser,emailUser,fk_Directorio,fk_Dependencia,fk_TipoIdentificacion,numIdentificacion,bloqueado,activo")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(user);
        }

        // GET: Users/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.User.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            User user = db.User.Find(id);
            db.User.Remove(user);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
