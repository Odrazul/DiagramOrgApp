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
    public class DirectoriosController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        public JsonResult getDirectorios()
        {

            List<Directorio> list = db.Directorio.ToList();

            var directorios = list.Select(L => new {

                pk_Directorio = L.pk_Directorio,
                nomDirectorio = L.nomDirectorio,
                cadenaConexion = L.cadenaConexion
            });


            return Json(new { directorios = directorios }, JsonRequestBehavior.AllowGet);
        }

        // GET: Directorios
        public ActionResult Index()
        {
            return View(db.Directorio.ToList());
        }

        // GET: Directorios/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Directorio directorio = db.Directorio.Find(id);
            if (directorio == null)
            {
                return HttpNotFound();
            }
            return View(directorio);
        }

        // GET: Directorios/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Directorios/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_Directorio,nomDirectorio,cadenaConexion")] Directorio directorio)
        {
            if (ModelState.IsValid)
            {
                db.Directorio.Add(directorio);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(directorio);
        }

        // GET: Directorios/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Directorio directorio = db.Directorio.Find(id);
            if (directorio == null)
            {
                return HttpNotFound();
            }
            return View(directorio);
        }

        // POST: Directorios/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_Directorio,nomDirectorio,cadenaConexion")] Directorio directorio)
        {
            if (ModelState.IsValid)
            {
                db.Entry(directorio).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(directorio);
        }

        // GET: Directorios/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Directorio directorio = db.Directorio.Find(id);
            if (directorio == null)
            {
                return HttpNotFound();
            }
            return View(directorio);
        }

        // POST: Directorios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Directorio directorio = db.Directorio.Find(id);
            db.Directorio.Remove(directorio);
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
