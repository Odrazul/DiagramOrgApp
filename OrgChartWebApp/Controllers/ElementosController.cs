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
    public class ElementosController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        public JsonResult GetElementosxTipo(int Tipo)
        {
            List<Elemento> list = db.Elemento.Where(T => T.fk_TipoElemento == Tipo).ToList();

            var lista = list.Select(L => new {

                L.pk_Elemento,
                L.nomElemento
            });
            
            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getTiposElementos()
        {

            List<TipoElemento> list = db.TipoElemento.ToList();

            var lista = list.Select(L => new {

                L.pk_TipoElemento,
                L.nomTipoElemento
            });


            return Json(new { lista = lista }, JsonRequestBehavior.AllowGet);
        }

        // GET: Elementos
        public ActionResult Index()
        {
            var elemento = db.Elemento.Include(e => e.Organizacion).Include(e => e.TipoElemento);
            return View(elemento.ToList());
        }

        // GET: Elementos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Elemento elemento = db.Elemento.Find(id);
            if (elemento == null)
            {
                return HttpNotFound();
            }
            return View(elemento);
        }

        // GET: Elementos/Create
        public ActionResult Create()
        {
            ViewBag.fk_Organizacion = new SelectList(db.Organizacion, "pk_Organizacion", "nomOrganizacion");
            ViewBag.fk_TipoElemento = new SelectList(db.TipoElemento, "pk_TipoElemento", "nomTipoElemento");
            return View();
        }

        // POST: Elementos/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "pk_Elemento,fk_TipoElemento,fk_Organizacion,nomElemento,ak_ElementoPadre")] Elemento elemento)
        {
            if (ModelState.IsValid)
            {
                db.Elemento.Add(elemento);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.fk_Organizacion = new SelectList(db.Organizacion, "pk_Organizacion", "nomOrganizacion", elemento.fk_Organizacion);
            ViewBag.fk_TipoElemento = new SelectList(db.TipoElemento, "pk_TipoElemento", "nomTipoElemento", elemento.fk_TipoElemento);
            return View(elemento);
        }

        // GET: Elementos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Elemento elemento = db.Elemento.Find(id);
            if (elemento == null)
            {
                return HttpNotFound();
            }
            ViewBag.fk_Organizacion = new SelectList(db.Organizacion, "pk_Organizacion", "nomOrganizacion", elemento.fk_Organizacion);
            ViewBag.fk_TipoElemento = new SelectList(db.TipoElemento, "pk_TipoElemento", "nomTipoElemento", elemento.fk_TipoElemento);
            return View(elemento);
        }

        // POST: Elementos/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "pk_Elemento,fk_TipoElemento,fk_Organizacion,nomElemento,ak_ElementoPadre")] Elemento elemento)
        {
            if (ModelState.IsValid)
            {
                db.Entry(elemento).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.fk_Organizacion = new SelectList(db.Organizacion, "pk_Organizacion", "nomOrganizacion", elemento.fk_Organizacion);
            ViewBag.fk_TipoElemento = new SelectList(db.TipoElemento, "pk_TipoElemento", "nomTipoElemento", elemento.fk_TipoElemento);
            return View(elemento);
        }

        // GET: Elementos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Elemento elemento = db.Elemento.Find(id);
            if (elemento == null)
            {
                return HttpNotFound();
            }
            return View(elemento);
        }

        // POST: Elementos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Elemento elemento = db.Elemento.Find(id);
            db.Elemento.Remove(elemento);
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
