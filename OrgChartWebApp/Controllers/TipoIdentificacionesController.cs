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
    public class TipoIdentificacionesController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        public JsonResult getTiposIdentificaciones()
        {

            List<TipoIdentificacion> list = db.TipoIdentificacion.ToList();

            var lista = list.Select(L => new {

                L.pk_TipoIdentificacion,
                L.nomTipoIdentificacion
            });


            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        // GET: TipoIdentificaciones
        public ActionResult Index()
        {
            return View(db.TipoIdentificacion.ToList());
        }

        // GET: TipoIdentificaciones/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoIdentificacion tipoIdentificacion = db.TipoIdentificacion.Find(id);
            if (tipoIdentificacion == null)
            {
                return HttpNotFound();
            }
            return View(tipoIdentificacion);
        }

        // GET: TipoIdentificaciones/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TipoIdentificaciones/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_TipoIdentificacion,nomTipoIdentificacion")] TipoIdentificacion tipoIdentificacion)
        {
            if (ModelState.IsValid)
            {
                db.TipoIdentificacion.Add(tipoIdentificacion);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tipoIdentificacion);
        }

        // GET: TipoIdentificaciones/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoIdentificacion tipoIdentificacion = db.TipoIdentificacion.Find(id);
            if (tipoIdentificacion == null)
            {
                return HttpNotFound();
            }
            return View(tipoIdentificacion);
        }

        // POST: TipoIdentificaciones/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_TipoIdentificacion,nomTipoIdentificacion")] TipoIdentificacion tipoIdentificacion)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tipoIdentificacion).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tipoIdentificacion);
        }

        // GET: TipoIdentificaciones/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoIdentificacion tipoIdentificacion = db.TipoIdentificacion.Find(id);
            if (tipoIdentificacion == null)
            {
                return HttpNotFound();
            }
            return View(tipoIdentificacion);
        }

        // POST: TipoIdentificaciones/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TipoIdentificacion tipoIdentificacion = db.TipoIdentificacion.Find(id);
            db.TipoIdentificacion.Remove(tipoIdentificacion);
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
