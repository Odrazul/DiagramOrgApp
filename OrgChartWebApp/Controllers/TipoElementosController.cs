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
    public class TipoElementosController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        public JsonResult getTiposElementos()
        {

            List<TipoElemento> list = db.TipoElemento.ToList();

            var lista = list.Select(L => new {

                L.pk_TipoElemento,
                L.nomTipoElemento
            });


            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        // GET: TipoElementos
        public ActionResult Index()
        {
            return View(db.TipoElemento.ToList());
        }

        // GET: TipoElementos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoElemento tipoElemento = db.TipoElemento.Find(id);
            if (tipoElemento == null)
            {
                return HttpNotFound();
            }
            return View(tipoElemento);
        }

        // GET: TipoElementos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TipoElementos/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_TipoElemento,nomTipoElemento")] TipoElemento tipoElemento)
        {
            if (ModelState.IsValid)
            {
                db.TipoElemento.Add(tipoElemento);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tipoElemento);
        }

        // GET: TipoElementos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoElemento tipoElemento = db.TipoElemento.Find(id);
            if (tipoElemento == null)
            {
                return HttpNotFound();
            }
            return View(tipoElemento);
        }

        // POST: TipoElementos/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_TipoElemento,nomTipoElemento")] TipoElemento tipoElemento)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tipoElemento).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tipoElemento);
        }

        // GET: TipoElementos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoElemento tipoElemento = db.TipoElemento.Find(id);
            if (tipoElemento == null)
            {
                return HttpNotFound();
            }
            return View(tipoElemento);
        }

        // POST: TipoElementos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TipoElemento tipoElemento = db.TipoElemento.Find(id);
            db.TipoElemento.Remove(tipoElemento);
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
