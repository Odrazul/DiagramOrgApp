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
    public class DependenciasController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        public JsonResult getDependencias()
        {

            List<Dependencia> list = db.Dependencia.ToList();

            var lista = list.Select(L => new {

                L.pk_Dependencia,
                L.nomDependencia
            });


            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        // GET: Dependencias
        public ActionResult Index()
        {
            return View(db.Dependencia.ToList());
        }

        // GET: Dependencias/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Dependencia dependencia = db.Dependencia.Find(id);
            if (dependencia == null)
            {
                return HttpNotFound();
            }
            return View(dependencia);
        }

        // GET: Dependencias/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Dependencias/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_Dependencia,nomDependencia")] Dependencia dependencia)
        {
            if (ModelState.IsValid)
            {
                db.Dependencia.Add(dependencia);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(dependencia);
        }

        // GET: Dependencias/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Dependencia dependencia = db.Dependencia.Find(id);
            if (dependencia == null)
            {
                return HttpNotFound();
            }
            return View(dependencia);
        }

        // POST: Dependencias/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_Dependencia,nomDependencia")] Dependencia dependencia)
        {
            if (ModelState.IsValid)
            {
                db.Entry(dependencia).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(dependencia);
        }

        // GET: Dependencias/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Dependencia dependencia = db.Dependencia.Find(id);
            if (dependencia == null)
            {
                return HttpNotFound();
            }
            return View(dependencia);
        }

        // POST: Dependencias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Dependencia dependencia = db.Dependencia.Find(id);
            db.Dependencia.Remove(dependencia);
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
