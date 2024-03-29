String.prototype.replaceAll = function (b, a) {
    var c = this;
    return c.replace(new RegExp(b, "g"), a)
};
String.prototype.splice = function (a, b, c) {
    return this.slice(0, a) + c + this.slice(a + Math.abs(b))
};
if (typeof Object.assign != "function") {
    Object.defineProperty(Object, "assign", {
        value: function assign(d, f) {
            if (d == null) {
                throw new TypeError("Cannot convert undefined or null to object")
            }
            var e = Object(d);
            for (var a = 1; a < arguments.length; a++) {
                var c = arguments[a];
                if (c != null) {
                    for (var b in c) {
                        if (Object.prototype.hasOwnProperty.call(c, b)) {
                            e[b] = c[b]
                        }
                    }
                }
            }
            return e
        },
        writable: true,
        configurable: true
    })
}
if (typeof String.prototype.endsWith !== "function") {
    String.prototype.endsWith = function (a) {
        return this.indexOf(a, this.length - a.length) !== -1
    }
}
Array.prototype.move = function (b, c) {
    if (b == undefined || b == null) {
        return false
    }
    if (c == undefined || c == null) {
        return false
    }
    if (b == c) {
        return false
    }
    var a, d;
    b = parseInt(b, 10);
    c = parseInt(c, 10);
    if (b !== c && 0 <= b && b <= this.length && 0 <= c && c <= this.length) {
        d = this[b];
        if (b < c) {
            for (a = b; a < c; a++) {
                this[a] = this[a + 1]
            }
        } else {
            for (a = b; a > c; a--) {
                this[a] = this[a - 1]
            }
        }
        this[c] = d
    }
};
var OrgChart = function (b, a) {
    this.ver = "4.1.2";
    var f = this;
    this.element = b;
    this.config = {
        lazyLoading: true,
        enableDragDrop: false,
        enableSearch: true,
        nodeMenu: null,
        dragDropMenu: null,
        menu: null,
        toolbar: false,
        nodeMouseClickBehaviour: BALKANGraph.action.details,
        mouseScroolBehaviour: BALKANGraph.action.zoom,
        showXScroll: BALKANGraph.none,
        showYScroll: BALKANGraph.none,
        template: "ana",
        tags: {},
        nodeBinding: {},
        linkBinding: {},
        searchFields: [],
        nodes: [],
        links: [],
        levelSeparation: 60,
        siblingSeparation: 20,
        subtreeSeparation: 40,
        mixedHierarchyNodesSeparation: 15,
        padding: 30,
        orientation: BALKANGraph.orientation.top,
        layout: BALKANGraph.normal,
        scaleInitial: 1,
        scaleMin: 0.1,
        scaleMax: 5,
        orderBy: null,
        editUI: null,
        detailUI: null,
        removeUI: null,
        searchUI: null,
        xScrollUI: null,
        yScrollUI: null,
        nodeMenuUI: null,
        toolbarUI: null,
        dragDropMenuUI: null,
        menuUI: null,
        exportUrl: "https://balkangraph.com/export",
        collapse: {},
        expand: {},
        align: BALKANGraph.CENTER,
        UI: null,
        anim: {
            func: BALKANGraph.anim.outPow,
            duration: 200
        },
        onUpdate: "",
        onRemove: "",
        onAdd: "",
        onRedraw: "",
        onImageUploaded: "",
        onUpdateTags: "",
        onClick: "",
        onExpCollClick: "",
        onExportStart: "",
        onExportEnd: "",
        onSearchClick: ""
    };
    if (a) {
        for (var e in this.config) {
            if (typeof a[e] === "object" && !Array.isArray(a[e])) {
                this.config[e] = BALKANGraph._ay(this.config[e], a[e])
            } else {
                if (typeof a[e] !== "undefined") {
                    this.config[e] = a[e]
                }
            }
        }
    }
    if (this.config.links && this.config.links.length > 0) {
        for (var c = 0; c < this.config.links.length; c++) {
            for (var d = 0; d < this.config.nodes.length; d++) {
                if (this.config.links[c].from == this.config.nodes[d].id) {
                    this.config.nodes[d].pid = this.config.links[c].to
                }
            }
        }
    }
    if (!BALKANGraph._aU(this.config)) {
        return
    }
    this.server = null;
    this._aM = {};
    if (!this.config.ui) {
        this.ui = OrgChart.ui
    }
    if (!this.config.editUI) {
        this.editUI = new OrgChart.editUI()
    } else {
        this.editUI = this.config.editUI
    }
    this.editUI.init(this);
    if (this.server === null) {
        this.server = new OrgChart.server(this.config)
    }

    if (!this.config.removeUI) {
        this.removeUI = new OrgChart.removeUI()
    } else {
        this.removeUI = this.config.removeUI
    }
    this.removeUI.init(this);
    if (this.server === null) {
        this.server = new OrgChart.server(this.config)
    }

    if (!this.config.detailUI) {
        this.detailUI = new OrgChart.detailUI()
    } else {
        this.detailUI = this.config.detailUI
    }
    this.detailUI.init(this);
    if (this.server === null) {
        this.server = new OrgChart.server(this.config)
    }

    if (!this.config.searchUI) {
        this.searchUI = new OrgChart.searchUI()
    } else {
        this.searchUI = this.config.searchUI
    }
    this.searchUI.init(this);
    if (!this.config.nodeMenuUI) {
        this.nodeMenuUI = new BALKANGraph.menuUI()
    } else {
        this.nodeMenuUI = this.config.nodeMenuUI
    }
    this.nodeMenuUI.init(this, this.config.nodeMenu);
    if (!this.config.toolbarUI) {
        this.toolbarUI = new BALKANGraph.toolbarUI()
    } else {
        this.toolbarUI = this.config.toolbarUI
    }
    if (!this.config.dragDropMenuUI) {
        this.dragDropMenuUI = new BALKANGraph.menuUI()
    } else {
        this.dragDropMenuUI = this.config.dragDropMenuUI
    }
    this.dragDropMenuUI.init(this, this.config.dragDropMenu);
    if (!this.config.menuUI) {
        this.menuUI = new BALKANGraph.menuUI()
    } else {
        this.menuUI = this.config.menuUI
    }
    this.menuUI.init(this, this.config.menu);
    if (!this.config.xScrollUI) {
        this.xScrollUI = new OrgChart.xScrollUI(this.element, this.config, function () {
            return {
                boundary: f.response.boundary,
                scale: f.getScale(),
                viewBox: f.getViewBox(),
                padding: f.config.padding
            }
        }, function (g) {
            f.setViewBox(g)
        }, function () {
            f._l(true, BALKANGraph.action.xScroll)
        })
    }
    if (!this.config.yScrollUI) {
        this.yScrollUI = new OrgChart.yScrollUI(this.element, this.config, function () {
            return {
                boundary: f.response.boundary,
                scale: f.getScale(),
                viewBox: f.getViewBox(),
                padding: f.config.padding
            }
        }, function (g) {
            f.setViewBox(g)
        }, function () {
            f._l(true, BALKANGraph.action.xScroll)
        })
    }
    this._4 = null;
    this._aB = null;
    this._aY = null;
    this._9 = false;
    this.response = null;
    this._aC();
    this._l(false, BALKANGraph.action.init)
};
OrgChart.prototype.draw = function (a) {
    if (a == undefined) {
        a = BALKANGraph.action.update
    }
    this._l(false, a, null, null)
};
OrgChart.prototype._S = function (b) {
    for (var a = 0; a < this.config.nodes.length; a++) {
        if (this.config.nodes[a].id == b) {
            return this.config.nodes[a]
        }
    }
    return null
};
OrgChart.prototype.get = function (b) {
    for (var a = 0; a < this.config.nodes.length; a++) {
        if (this.config.nodes[a].id == b) {
            return JSON.parse(JSON.stringify(this.config.nodes[a]))
        }
    }
    return null
};
OrgChart.prototype.getByParentId = function (b) {
    var c = [];
    for (var a = 0; a < this.config.nodes.length; a++) {
        if (this.config.nodes[a].pid == b) {
            c.push(JSON.parse(JSON.stringify(this.config.nodes[a])))
        }
    }
    return c
};
OrgChart.prototype._l = function (s, a, c, g) {
    var v = this;
    var x = (a == BALKANGraph.action.init) ? null : this.getViewBox();
    var t = this.server.read(s, this.width(), this.height(), x, a, c);
    this.editUI.fields = t.allFields;
    var k = this.ui.defs();
    k += this.ui.pointer(this.config, a);
    var r = this.getViewBox();
    var y = t.viewBox;
    if (!this._9) {
        this.element.innerHTML = '<div id="bg-tests"></div>'
    }
    for (var p in t.visibleNodes) {
        var f = t.visibleNodes[p];
        k += this.ui.node(f, this._S(p), t.animations, this.config, undefined, undefined, undefined, a);
        k += this.ui.secondLinks(t.visibleNodes, f, this.config, t.boundary);
        k += this.ui.link(f, this, this.config);
        k += this.ui.expandCollapse(f, this.config, a)
    }
    k += this.ui.lonely(this.config);
    if ((a === BALKANGraph.action.centerNode) || (a === BALKANGraph.action.insert) || (a === BALKANGraph.action.expandCollapse) || (a === BALKANGraph.action.update)) {
        y = r
    }
    if (a === BALKANGraph.action.exporting) {
        var e = t.boundary;
        var z = e.maxX - (e.minX) + (this.config.padding * 2);
        var m = e.maxY - (e.minY) + (this.config.padding * 2);
        var n = this.ui.svg(z, m, [(e.minX - this.config.padding), (e.minY - this.config.padding), z, m], this.config, k);
        g(n);
        return
    }
    this.response = t;
    var n = this.ui.svg(this.width(), this.height(), y, this.config, k);
    if (!this._9) {
        this.element.innerHTML = BALKANGraph._q(this.config.padding) + this.ui.css() + this.ui.exportMenuButton(this.config) + n;
        this._v();
        this._f();
        if (this.config.showXScroll === BALKANGraph.scroll.visible) {
            this.xScrollUI.create(this.width(), this.config.padding);
            this.xScrollUI.setPosition();
            this.xScrollUI.addListener(this.getSvg())
        }
        if (this.config.showYScroll === BALKANGraph.scroll.visible) {
            this.yScrollUI.create(this.height(), this.config.padding);
            this.yScrollUI.setPosition();
            this.yScrollUI.addListener(this.getSvg())
        }
        if (this.config.enableSearch) {
            this.searchUI.addSearchControl()
        }
        this.toolbarUI.init(this, this.config.toolbar);
        var l = document.createElement("div");
        l.setAttribute("id", "bg-tests");
        this.element.appendChild(l)
    } else {
        var u = this.getSvg();
        var q = u.parentNode;
        q.removeChild(u);
        q.insertAdjacentHTML("afterbegin", n);
        this._f();
        this.xScrollUI.addListener(this.getSvg());
        this.yScrollUI.addListener(this.getSvg());
        this.xScrollUI.setPosition();
        this.yScrollUI.setPosition()
    }
    var j = false;
    var d = this.response.animations;
    if (d[0].length > 0) {
        for (var o = 0; o < d[0].length; o++) {
            d[0][o] = this.getNodeElement(d[0][o])
        }
        BALKANGraph.anim(d[0], d[1], d[2], this.config.anim.duration, this.config.anim.func, function () {
            if (!j) {
                if (g) {
                    g()
                }
                if (v.config.onRedraw) {
                    v.config.onRedraw()
                }
                j = true
            }
        })
    }
    if (a === BALKANGraph.action.centerNode) {
        BALKANGraph.anim(this.getSvg(), {
            viewbox: r
        }, {
                viewbox: this.response.viewBox
            }, this.config.anim.duration, this.config.anim.func, function () {
                v.ripple(c.rippleId ? c.rippleId : c.id)
            }, function () {
                v.xScrollUI.setPosition();
                v.yScrollUI.setPosition();
                if (!j) {
                    if (g) {
                        g()
                    }
                    if (v.config.onRedraw) {
                        v.config.onRedraw()
                    }
                    j = true
                }
            })
    } else {
        if (r && this.response && (r[0] != this.response.viewBox[0] || r[1] != this.response.viewBox[1] || r[2] != this.response.viewBox[2] || r[3] != this.response.viewBox[3]) && (a === BALKANGraph.action.insert || a === BALKANGraph.action.expandCollapse || a === BALKANGraph.action.update)) {
            BALKANGraph.anim(this.getSvg(), {
                viewbox: r
            }, {
                    viewbox: this.response.viewBox
                }, 500, BALKANGraph.anim.inOutPow, function () {
                    v.xScrollUI.setPosition();
                    v.yScrollUI.setPosition();
                    if (!j) {
                        if (g) {
                            g()
                        }
                        if (v.config.onRedraw) {
                            v.config.onRedraw()
                        }
                        j = true
                    }
                })
        } else {
            if (!j) {
                if (g) {
                    g()
                }
                if (v.config.onRedraw) {
                    v.config.onRedraw()
                }
                j = true
            }
        }
    }
    this._9 = true
};
OrgChart.prototype._aC = function () {
    this.element.style.overflow = "hidden";
    this.element.style.position = "relative";
    if (this.element.offsetHeight == 0) {
        this.element.style.height = "100%";
        if (this.element.offsetHeight == 0) {
            this.element.style.height = "700px"
        }
    }
    if (this.element.offsetWidth == 0) {
        this.element.style.width = "100%";
        if (this.element.offsetWidth == 0) {
            this.element.style.width = "700px"
        }
    }
};
OrgChart.prototype.getViewBox = function () {
    var a = this.getSvg();
    var b = null;
    if (a) {
        b = a.getAttribute("viewBox");
        b = "[" + b + "]";
        b = b.replace(/\ /g, ",");
        b = JSON.parse(b);
        return b
    } else {
        return null
    }
};
OrgChart.prototype.setViewBox = function (a) {
    this.getSvg()
        .setAttribute("viewBox", a.toString())
};
OrgChart.prototype.width = function () {
    return this.element.offsetWidth
};
OrgChart.prototype.height = function () {
    return this.element.offsetHeight
};
OrgChart.prototype.getScale = function (a) {
    if (!a) {
        a = this.getViewBox()
    }
    return BALKANGraph.getScale(a, this.width(), this.height(), this.config.scaleInitial)
};
OrgChart.prototype.ripple = function (g, b, c) {
    var a = this.getBGNode(g);
    if (a == null) {
        return
    }
    var i = this.getNodeElement(g);
    if (i == null) {
        return
    }
    var q = this.getScale();
    var u = a.w / 2;
    var v = a.h / 2;
    if (b !== undefined && c !== undefined) {
        var m = i.getBoundingClientRect();
        u = b / q - (m.left) / q;
        v = c / q - (m.top) / q
    }
    var s = a.w;
    var f = a.h;
    var d = (s - u) > u ? (s - u) : u;
    var e = (f - v) > v ? (f - v) : v;
    d = d;
    e = e;
    var j = d > e ? d : e;
    var n = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var l = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    var p = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var k = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var o = BALKANGraph._aQ();
    l.setAttribute("id", o);
    var r = OrgChart.templates[a.templateName];
    p.setAttribute("x", r.ripple.rect ? r.ripple.rect.x : 0);
    p.setAttribute("y", r.ripple.rect ? r.ripple.rect.y : 0);
    p.setAttribute("width", r.ripple.rect ? r.ripple.rect.width : a.w);
    p.setAttribute("height", r.ripple.rect ? r.ripple.rect.height : a.h);
    p.setAttribute("rx", r.ripple.radius);
    p.setAttribute("ry", r.ripple.radius);
    k.setAttribute("clip-path", "url(#" + o + ")");
    k.setAttribute("cx", u);
    k.setAttribute("cy", v);
    k.setAttribute("r", 0);
    k.setAttribute("fill", r.ripple.color);
    l.appendChild(p);
    n.appendChild(l);
    n.appendChild(k);
    i.appendChild(n);
    BALKANGraph.anim(k, {
        r: 0,
        opacity: 1
    }, {
            r: j,
            opacity: 0
        }, 500, BALKANGraph.anim.outPow, function () {
            i.removeChild(n)
        })
};
OrgChart.prototype.center = function (b, c, a, d) {
    this._l(false, BALKANGraph.action.centerNode, {
        id: b,
        parentState: c,
        childrenState: a,
        rippleId: d
    })
};
OrgChart.prototype.getBGNode = function (e) {
    var a = this.response.visibleNodes[e];
    if (a == undefined) {
        for (var d in this.response.visibleNodes) {
            var b = this.response.visibleNodes[d].bgnodes;
            for (var c = 0; c < b.length; c++) {
                if (b[c].id == e) {
                    return b[c]
                }
            }
        }
    }
    return a
};
OrgChart.prototype.setLayout = function (a) {
    this.config.layout = a;
    this._l(false, BALKANGraph.action.update)
};
BALKANGraph = {};
BALKANGraph._d = function (d, e, b, a) {
    var f = new XMLHttpRequest();
    f.onload = function (g) {
        if (f.readyState == XMLHttpRequest.DONE) {
            if (this.status === 200) {
                a(g.target.response)
            }
        }
    };
    f.onerror = function () {
        console.error("Error while calling Web API")
    };
    f.open(e, d);
    f.responseType = "arraybuffer";
    f.setRequestHeader("Content-Type", "application/json");
    if (b == null) {
        f.send()
    } else {
        var c = JSON.stringify(b);
        f.send(c)
    }
};
OrgChart.prototype._g = function (a, e) {
    if (e == undefined || e == null) {
        return false
    }
    if (a == undefined || a == null) {
        return false
    }
    if (a == e) {
        return false
    }
    var b = this.getBGNode(a);
    var f = this.getBGNode(e);
    var c = false;
    var d = f.parent;
    while (d != null) {
        if (d == b) {
            c = true;
            break
        }
        d = d.parent
    }
    return !c
};
OrgChart.prototype.link = function (a, c) {
    if (this._g(a, c)) {
        var b = this.get(a);
        b.pid = c;
        this.update(b, true)
    }
};
OrgChart.prototype.linkNode = function (b, j) {
    if (this._g(b, j)) {
        var c = this.getBGNode(b);
        var k = this.getBGNode(j);
        if (c.isGroup && k.isGroup) {
            var g = k.bgnodes[0].id;
            for (var e = 0; e < c.bgnodes.length; e++) {
                var f = this.get(c.bgnodes[e].id);
                f.pid = g;
                this.update(f, true)
            }
        } else {
            if (!c.isGroup && k.isGroup) {
                var g = k.bgnodes[0].id;
                var f = this.get(b);
                f.pid = g;
                this.update(f, true)
            } else {
                if (c.isGroup && !k.isGroup) {
                    for (var e = 0; e < c.bgnodes.length; e++) {
                        var f = this.get(c.bgnodes[e].id);
                        f.pid = j;
                        this.update(f, true)
                    }
                } else {
                    if (!c.isGroup && !k.isGroup) {
                        var f = this.get(b);
                        f.pid = j;
                        this.update(f, true)
                    }
                }
            }
        }
        if (c.isChildOfGroup) {
            this.removeNodeTag(c.id, c._5);
            var d = this.getBGNode(c._5);
            if (d.bgnodes.length == 2) {
                for (var e = 0; e < d.bgnodes.length; e++) {
                    var a = d.bgnodes[e];
                    if (c.id != a.id) {
                        this.removeNodeTag(a.id, a._5)
                    }
                }
            }
        }
        var h = this;
        this._l(false, BALKANGraph.action.update, {
            visId: b
        }, function () {
            h.ripple(c.id)
        })
    }
};
OrgChart.prototype.updateNode = function (b, a) {
    var d = this;
    if (this.update(b, a)) {
        var c = b.pid;
        if (c == null || c == undefined || c == "") {
            c = b.id
        }
        this._l(false, BALKANGraph.action.update, {
            id: c
        }, function () {
            d.ripple(b.id)
        })
    }
};
OrgChart.prototype.update = function (c, a) {
    var d = this.get(c.id);
    if (a === true && this.config.onUpdate) {
        var e = this.config.onUpdate(this, d, c);
        if (e === false) {
            return false
        }
    }
    for (var b = 0; b < this.config.nodes.length; b++) {
        if (this.config.nodes[b].id == c.id) {
            this.config.nodes[b] = c
        }
    }
    return true
};
OrgChart.prototype.removeNode = function (b, a) {
    var c = this;
    this.remove(b, a);
    this._l(false, BALKANGraph.action.update, null, function () {
        BALKANGraph._am(c.getSvg(), c.getViewBox(), c.response.boundary)
    })
};
OrgChart.prototype.remove = function (c, a) {
    var d = this.getBGNode(c);
    if (d.isChildOfGroup) {
        this._aW(d._5, d.id)
    }
    if (a === true && this.config.onRemove) {
        var g = this.config.onRemove(this, c);
        if (g === false) {
            return false
        }
    }
    var e = null;
    for (var b = this.config.nodes.length - 1; b >= 0; b--) {
        if (this.config.nodes[b].id == c) {
            e = this.config.nodes[b].pid;
            this.config.nodes.splice(b, 1);
            break
        }
    }
    var f = this.getByParentId(c);
    for (var b = f.length - 1; b >= 0; b--) {
        f[b].pid = e;
        this.update(f[b], a)
    }
};
OrgChart.prototype.addNode = function (d, b) {
    var f = this;
    this.add(d, b);
    var a = BALKANGraph.action.insert;
    if (d.pid == undefined || d.pid == null) {
        a = BALKANGraph.action.update
    }
    var e = this.getBGNode(d.pid);
    var c = d.pid;
    if (e && e.isChildOfGroup) {
        c = e._5
    }
    f._l(false, a, {
        id: c,
        insertedNodeId: d.id
    })
};
OrgChart.prototype.add = function (b, a) {
    if (b.id == undefined) {
        console.error("Call addNode without id")
    }
    if (a === true && this.config.onAdd) {
        var c = this.config.onAdd(this, b);
        if (c === false) {
            return false
        }
    }
    this.config.nodes.push(b)
};
OrgChart.prototype.addTag = function (b, d, a) {
    var e = JSON.parse(JSON.stringify(this.config.tags));
    e[b] = d;
    if (a === true && this.config.onUpdateTags) {
        var c = this.config.onUpdateTags(this, e);
        if (c === false) {
            return false
        }
    }
    this.config.tags = e
};
OrgChart.prototype.removeTag = function (b, a) {
    var d = JSON.parse(JSON.stringify(this.config.tags));
    delete d[b];
    if (a === true && this.config.onUpdateTags) {
        var c = this.config.onUpdateTags(this, d);
        if (c === false) {
            return false
        }
    }
    this.config.tags = d
};
OrgChart.prototype._aN = function (a, b, f) {
    var d = JSON.parse(JSON.stringify(this.config.tags));
    d[a][b] = f;
    if (this.config.onUpdateTags) {
        var c = this.config.onUpdateTags(this, d);
        if (c === false) {
            return false
        }
    }
    this.config.tags = d;
    var e = this;
    this._l(false, BALKANGraph.action.update, {
        id: a
    }, function () {
        e.ripple(a)
    })
};
OrgChart.prototype.addNodeTag = function (b, d, a) {
    var e = this.get(b);
    if (!Array.isArray(e.tags)) {
        e.tags = []
    }
    var c = e.tags.indexOf(d);
    if (c == -1) {
        e.tags.push(d);
        this.update(e, a)
    }
};
OrgChart.prototype.removeNodeTag = function (b, d, a) {
    var e = this.get(b);
    if (Array.isArray(e.tags)) {
        var c = e.tags.indexOf(d);
        if (c != -1) {
            e.tags.splice(c, 1);
            this.update(e, a)
        }
    }
};
OrgChart.prototype._aW = function (d, b) {
    var c = this.getBGNode(d);
    if (c.bgnodes.length == 2) {
        this.removeTag(c.id, true);
        for (var e = 0; e < c.bgnodes.length; e++) {
            var a = c.bgnodes[e];
            if (a.id != b) {
                this.removeNodeTag(a.id, d)
            }
        }
    }
};
OrgChart.prototype.group = function (h, l) {
    var g = this.getBGNode(h);
    var k = this.getBGNode(l);
    var m = this;
    var e = k.id;
    if (!g.isGroup && !k.isGroup && !g.isChildOfGroup && !k.isChildOfGroup) {
        var c = BALKANGraph._aQ();
        this.addTag(c, {
            group: true,
            groupName: "",
            groupState: BALKANGraph.EXPAND,
            template: "group_grey"
        }, true);
        this.addNodeTag(g.id, c, true);
        this.addNodeTag(k.id, c, true);
        var f = this._S(k.id)
            .pid;
        this.link(g.id, f)
    } else {
        if (!g.isGroup && !k.isGroup && g.isChildOfGroup && !k.isChildOfGroup) {
            var c = BALKANGraph._aQ();
            this.addTag(c, {
                group: true,
                groupName: "",
                groupState: BALKANGraph.EXPAND,
                template: "group_grey"
            }, true);
            this._aW(g._5, g.id);
            this.removeNodeTag(g.id, g._5, true);
            this.addNodeTag(g.id, c, true);
            this.addNodeTag(k.id, c, true);
            var f = this._S(k.id)
                .pid;
            if (g.id != f) {
                this.link(g.id, f)
            } else {
                var b = this.getBGNode(g._5);
                var f = "";
                for (var d = 0; d < b.bgnodes.length; d++) {
                    var a = b.bgnodes[d];
                    if (a.id != g.id) {
                        f = a.id;
                        break
                    }
                }
                this.link(g.id, f);
                this.link(k.id, f)
            }
        } else {
            if (!g.isGroup && !k.isGroup && !g.isChildOfGroup && k.isChildOfGroup) {
                var c = k._5;
                this.addNodeTag(g.id, c, true);
                var j = this.getBGNode(c);
                var f = j.bgnodes[0].pid;
                this.link(g.id, f)
            } else {
                if (!g.isGroup && !k.isGroup && g.isChildOfGroup && k.isChildOfGroup) {
                    this._aW(g._5, g.id);
                    this.removeNodeTag(g.id, g._5, true);
                    this.addNodeTag(g.id, k._5, true)
                }
            }
        }
    }
    this._l(false, BALKANGraph.action.update, {
        id: e
    }, function () {
        m.ripple(g.id)
    })
};
OrgChart.prototype._aj = function (b, a, c) {
    c[0] = a;
    c[1] = b;
    this.setViewBox(c);
    this.xScrollUI.setPosition();
    this.yScrollUI.setPosition()
};
BALKANGraph.orientation = {};
BALKANGraph.orientation.top = 0;
BALKANGraph.orientation.bottom = 1;
BALKANGraph.orientation.right = 2;
BALKANGraph.orientation.left = 3;
BALKANGraph.orientation.top_left = 4;
BALKANGraph.orientation.bottom_left = 5;
BALKANGraph.orientation.right_top = 6;
BALKANGraph.orientation.left_top = 7;
BALKANGraph.CENTER = 8;
BALKANGraph.ORIENTATION = 9;
BALKANGraph.ID = "id";
BALKANGraph.PID = "pid";
BALKANGraph.TAGS = "tags";
BALKANGraph.NODES = "nodes";
BALKANGraph.ELASTIC = "elastic";
BALKANGraph.MAX_DEPTH = 100;
BALKANGraph.SCALE_FACTOR = 1.44;
BALKANGraph.EXPAND = 0;
BALKANGraph.COLLAPSE = 1;
BALKANGraph.LAZY_LOADING_FACTOR = 3000;
BALKANGraph.action = {};
BALKANGraph.action.expandCollapse = 0;
BALKANGraph.action.groupMaxMin = 100;
BALKANGraph.action.edit = 1;
BALKANGraph.action.zoom = 2;
BALKANGraph.action.xScroll = 3;
BALKANGraph.action.yScroll = 4;
BALKANGraph.action.none = 5;
BALKANGraph.action.init = 6;
BALKANGraph.action.update = 7;
BALKANGraph.action.pan = 8;
BALKANGraph.action.centerNode = 9;
BALKANGraph.action.resize = 10;
BALKANGraph.action.insert = 11;
BALKANGraph.action.insertfirst = 12;
BALKANGraph.action.details = 13;
BALKANGraph.action.exporting = 14;
BALKANGraph.none = 400001;
BALKANGraph.scroll = {};
BALKANGraph.scroll.visible = 1;
BALKANGraph.match = {};
BALKANGraph.match.height = 100001;
BALKANGraph.match.width = 100002;
BALKANGraph.match.boundary = 100003;
BALKANGraph.COLLAPSE_PARENT_NEIGHBORS = 1;
BALKANGraph.COLLAPSE_SUB_CHILDRENS = 2;
BALKANGraph.normal = 0;
BALKANGraph.mixed = 1;
BALKANGraph.tree = 2;
BALKANGraph.treeLeftOffset = 3;
BALKANGraph.treeRightOffset = 4;
BALKANGraph.nodeOpenTag = '<g node-id="{id}" style="opacity: {opacity}" transform="matrix(1,0,0,1,{x},{y})" class="{class}" level="{level}">';
BALKANGraph.linkOpenTag = '<g link-id="[{id}][{child-id}]" class="{class}" level="{level}">';
BALKANGraph.secondLinkOpenTag = '<g second-link-id="[{id}][{child-id}]">';
BALKANGraph.expcollOpenTag = '<g control-expcoll-id="{id}" transform="matrix(1,0,0,1,{x},{y})"  style="cursor:pointer;">';
BALKANGraph.groupNodesOpenTag = '<g transform="matrix(1,0,0,1,{x},{y})">';
BALKANGraph.linkFieldsOpenTag = '<g transform="matrix(1,0,0,1,{x},{y}) rotate({rotate})">';
BALKANGraph.grCloseTag = "</g>";
BALKANGraph.IT_IS_LONELY_HERE = '<g transform="translate(-100, 0)" style="cursor:pointer;"  control-add="control-add"><text fill="#039be5">{link}</text></g>';
BALKANGraph.RES = {};
BALKANGraph.RES.IT_IS_LONELY_HERE_LINK = "El Organigrama est\u00e1 vac\u00edo, incluya el primer elemento";
BALKANGraph.MAXIMIZE = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{x},20)" control-maxmin-id="{id}"><rect x="0" y="0" width="26" height="26" fill="#EEEEEE" stroke="#aeaeae" stroke-width="1" rx="2"></rect><polyline  stroke="#aeaeae" stroke-width="2" points="9,6 17,13 9,20" fill="none"></polyline></g>';
BALKANGraph.MINIMIZE = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{x},20)" control-maxmin-id="{id}"><rect x="0" y="0" width="26" height="26" fill="#EEEEEE" stroke="#aeaeae" stroke-width="1" rx="2"></rect><polyline stroke="#aeaeae" stroke-width="2" points="17,6 9,13 17,20" fill="none"></polyline></g>';
BALKANGraph.node = function (a, b, c, e, f) {
    this.templateName = f;
    this.id = a;
    this.pid = b;
    this.spids = Array.isArray(c) ? c : null;
    this.x = null;
    this.y = null;
    this.level = null;
    this.leftNeighbor = null;
    this.rightNeighbor = null;
    this._ap = 0;
    this._ah = 0;
    this.children = [];
    this.parent = null;
    this.isAssistant = false;
    this.tags = e;
    this.collapsedChildrenIds = [];
    this.childrenIds = [];
    var d = OrgChart.templates[this.templateName];
    this.w = d.size[0];
    this.h = d.size[1];
    this.groupState = BALKANGraph.EXPAND;
    this.isChildOfGroup = false;
    this.isGroup = false;
    this._5 = null;
    this._6 = null;
    this.bgnodes = []
};
BALKANGraph.icon = {};
BALKANGraph.icon.excel = function (d, b, a) { };
BALKANGraph.icon.png = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 550.801 550.801"><path fill="' + a + '" d="M146.747,276.708c0-13.998-9.711-22.352-26.887-22.352c-6.99,0-11.726,0.675-14.204,1.355v44.927 c2.932,0.676,6.539,0.896,11.52,0.896C135.449,301.546,146.747,292.28,146.747,276.708z"/><path fill="' + a + '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M234.344,335.86v45.831h-31.601V229.524h40.184 l31.611,55.759c9.025,16.031,18.064,34.983,24.825,52.154h0.675c-2.257-20.103-2.933-40.643-2.933-63.44v-44.473h31.614v152.167 h-36.117l-32.516-58.703c-9.049-16.253-18.971-35.892-26.438-53.727l-0.665,0.222C233.906,289.58,234.344,311.027,234.344,335.86z M71.556,381.691V231.56c10.613-1.804,25.516-3.159,46.506-3.159c21.215,0,36.353,4.061,46.509,12.192 c9.698,7.673,16.255,20.313,16.255,35.219c0,14.897-4.959,27.549-13.999,36.123c-11.738,11.063-29.123,16.031-49.441,16.031 c-4.522,0-8.593-0.231-11.736-0.675v54.411H71.556V381.691z M453.601,523.353H97.2V419.302h356.4V523.353z M485.652,374.688 c-10.61,3.607-30.713,8.585-50.805,8.585c-27.759,0-47.872-7.003-61.857-20.545c-13.995-13.1-21.684-32.97-21.452-55.318 c0.222-50.569,37.03-79.463,86.917-79.463c19.644,0,34.783,3.829,42.219,7.446l-7.214,27.543c-8.369-3.617-18.752-6.55-35.458-6.55 c-28.656,0-50.341,16.256-50.341,49.22c0,31.382,19.649,49.892,47.872,49.892c7.895,0,14.218-0.901,16.934-2.257v-31.835h-23.493 v-26.869h56.679V374.688z"/></svg>'
};
BALKANGraph.icon.pdf = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 550.801 550.801"><path fill="' + a + '" d="M160.381,282.225c0-14.832-10.299-23.684-28.474-23.684c-7.414,0-12.437,0.715-15.071,1.432V307.6 c3.114,0.707,6.942,0.949,12.192,0.949C148.419,308.549,160.381,298.74,160.381,282.225z"/><path fill="' + a + '" d="M272.875,259.019c-8.145,0-13.397,0.717-16.519,1.435v105.523c3.116,0.729,8.142,0.729,12.69,0.729 c33.017,0.231,54.554-17.946,54.554-56.474C323.842,276.719,304.215,259.019,272.875,259.019z"/><path fill="' + a + '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M362.359,309.023c0,30.876-11.243,52.165-26.82,65.333 c-16.971,14.117-42.82,20.814-74.396,20.814c-18.9,0-32.297-1.197-41.401-2.389V234.365c13.399-2.149,30.878-3.346,49.304-3.346 c30.612,0,50.478,5.508,66.039,17.226C351.828,260.69,362.359,280.547,362.359,309.023z M80.7,393.499V234.365 c11.241-1.904,27.042-3.346,49.296-3.346c22.491,0,38.527,4.308,49.291,12.928c10.292,8.131,17.215,21.534,17.215,37.328 c0,15.799-5.25,29.198-14.829,38.285c-12.442,11.728-30.865,16.996-52.407,16.996c-4.778,0-9.1-0.243-12.435-0.723v57.67H80.7 V393.499z M453.601,523.353H97.2V419.302h356.4V523.353z M484.898,262.127h-61.989v36.851h57.913v29.674h-57.913v64.848h-36.593 V232.216h98.582V262.127z"/></svg>'
};
BALKANGraph.icon.svg = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 550.801 550.801"><path fill="' + a + '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M338.871,225.672L284.545,386.96h-42.591 l-51.69-161.288h39.967l19.617,68.196c5.508,19.143,10.531,37.567,14.36,57.67h0.717c4.061-19.385,9.089-38.527,14.592-56.953 l20.585-68.918h38.77V225.672z M68.458,379.54l7.415-30.153c9.811,5.021,24.888,10.051,40.439,10.051 c16.751,0,25.607-6.935,25.607-17.465c0-10.052-7.662-15.795-27.05-22.734c-26.8-9.328-44.263-24.168-44.263-47.611 c0-27.524,22.971-48.579,61.014-48.579c18.188,0,31.591,3.823,41.159,8.131l-8.126,29.437c-6.465-3.116-17.945-7.657-33.745-7.657 c-15.791,0-23.454,7.183-23.454,15.552c0,10.296,9.089,14.842,29.917,22.731c28.468,10.536,41.871,25.365,41.871,48.094 c0,27.042-20.812,50.013-65.09,50.013C95.731,389.349,77.538,384.571,68.458,379.54z M453.601,523.353H97.2V419.302h356.4V523.353z M488.911,379.54c-11.243,3.823-32.537,9.103-53.831,9.103c-29.437,0-50.73-7.426-65.57-21.779 c-14.839-13.875-22.971-34.942-22.738-58.625c0.253-53.604,39.255-84.235,92.137-84.235c20.81,0,36.852,4.073,44.74,7.896 l-7.657,29.202c-8.859-3.829-19.849-6.95-37.567-6.95c-30.396,0-53.357,17.233-53.357,52.173c0,33.265,20.81,52.882,50.73,52.882 c8.375,0,15.072-0.96,17.94-2.395v-33.745h-24.875v-28.471h60.049V379.54L488.911,379.54z" /></svg>'
};
BALKANGraph.icon.csv = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 548.29 548.291" ><path fill="' + a + '" d="M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677 c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419 c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757 C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81 c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777 c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861 H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368 c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485 c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786 c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396 C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269 c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099 c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919 C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399 l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693 l20.487-68.598h38.599L427.518,380.583z" /></svg>'
};
BALKANGraph.icon.excel = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 512 512"><path fill="#ECEFF1" d="M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224 c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z" /><path fill="' + a + '" d="M336,176.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,176.011,336,176.011z" /><path fill="' + a + '" d="M336,240.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,240.011,336,240.011z" /><path fill="' + a + '" d="M336,304.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,304.011,336,304.011z" /><path fill="' + a + '" d="M336,368.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,368.011,336,368.011z" /><path fill="' + a + '" d="M432,176.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,176.011,432,176.011z" /><path fill="' + a + '" d="M432,240.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,240.011,432,240.011z" /><path fill="' + a + '" d="M432,304.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,304.011,432,304.011z" /><path fill="' + a + '" d="M432,368.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,368.011,432,368.011z" /><path fill="' + a + '"  d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352 c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68 c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z" /><path fill="#FAFAFA" d="M220.032,309.483l-50.592-57.824l51.168-65.792c5.44-6.976,4.16-17.024-2.784-22.464 c-6.944-5.44-16.992-4.16-22.464,2.784l-47.392,60.928l-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504 c-6.656,5.824-7.328,15.936-1.504,22.56l44,50.304L83.36,310.187c-5.44,6.976-4.16,17.024,2.784,22.464 c2.944,2.272,6.432,3.36,9.856,3.36c4.768,0,9.472-2.112,12.64-6.176l40.8-52.48l46.528,53.152 c3.168,3.648,7.584,5.504,12.032,5.504c3.744,0,7.488-1.312,10.528-3.968C225.184,326.219,225.856,316.107,220.032,309.483z" /></svg>'
};
BALKANGraph.icon.edit = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 528.899 528.899"><path fill="' + a + '" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" /></svg>'
};
BALKANGraph.icon.details = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '" viewBox="0 0 512 512"><path fill="' + a + '" d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008 C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237 h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931 l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278 c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239 h66.527V486.763z"/><path fill="' + a + '" d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/><path fill="' + a + '" d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/><path fill="' + a + '" d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/><path fill="' + a + '" d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256 c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/></svg>'
};
BALKANGraph.icon.remove = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '"  viewBox="0 0 900.5 900.5"><path fill="' + a + '" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/><path fill="' + a + '" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874 c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576 c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/></svg>'
};
BALKANGraph.icon.add = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '"   viewBox="0 0 922 922"><path fill="' + a + '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' + a + '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' + a + '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
};
BALKANGraph.icon.search = function (b, a) {
    return '<svg width="' + b + '" height="' + a + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 485.213 485.213"><path fill="#757575" d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z" /><path fill="#757575" d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 C318.424,257.208,257.206,318.416,181.956,318.416z" /><path fill="#757575" d="M75.817,181.955h30.322c0-41.803,34.014-75.814,75.816-75.814V75.816C123.438,75.816,75.817,123.437,75.817,181.955z" /></svg>'
};
BALKANGraph.icon.addInGroup = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '"   viewBox="0 0 922 922"><path fill="' + a + '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' + a + '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' + a + '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
};
BALKANGraph.icon.addAsChild = function (d, b, a) {
    return '<svg width="' + d + '" height="' + b + '"   viewBox="0 0 922 922"><path fill="' + a + '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' + a + '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' + a + '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
};
OrgChart.prototype._an = function (k, c, g) {
    var m = this;
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none";
    this.editUI.hide();
    this.removeUI.hide();
    this.detailUI.hide();
    this.searchUI.hide();
    this.nodeMenuUI.hide();
    this.dragDropMenuUI.hide();
    this.menuUI.hide();
    var n = this.getViewBox();
    var j = this.getScale();
    var a = BALKANGraph._D(c, 0);
    var b = BALKANGraph._D(c, 1);
    var l = {
        diffX: 0,
        diffY: 0,
        x0: a.x,
        y0: a.y,
        type: "pan",
        viewBoxLeft: n[0],
        viewBoxTop: n[1]
    };
    if (c.touches && c.touches.length > 1) {
        l.type = "pinch";
        l.dist = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
    }
    var i = this.getPointerElement();
    if (l.type == "pan") {
        var h = BALKANGraph._N(this.element, c);
        var o = h.x / j + n[0] - 16 / j;
        var p = h.y / j + n[1] - 16 / j;
        i.style.display = "inherit";
        i.setAttribute("transform", "matrix(0,0,0,0," + o + "," + p + ")");
        BALKANGraph.anim(i, {
            transform: [0, 0, 0, 0, o, p],
            opacity: 0
        }, {
                transform: [1 / j, 0, 0, 1 / j, o, p],
                opacity: 1
            }, 300, BALKANGraph.anim.outBack)
    }
    var f = function (t) {
        var q = BALKANGraph._D(t, 0);
        if (l && l.type == "pan") {
            l.diffX = q.x - l.x0;
            l.diffY = q.y - l.y0;
            var w = -(l.diffY / j) + l.viewBoxTop;
            var u = -(l.diffX / j) + l.viewBoxLeft;
            m._aj(w, u, n)
        } else {
            if (l && l.type == "pinch") {
                var r = BALKANGraph._D(t, 1);
                var s = Math.sqrt((q.x - r.x) * (q.x - r.x) + (q.y - r.y) * (q.y - r.y));
                var x = 1 + ((s - l.dist) / (l.dist / 100)) / 100;
                l.dist = s;
                var v = BALKANGraph._al(m.element, m.width(), m.height(), t);
                m.zoom(x, v)
            }
        }
    };
    var d = function () {
        if (l.type == "pan") {
            BALKANGraph._am(k, m.getViewBox(), m.response.boundary, function () {
                m._l(true, BALKANGraph.action.pan)
            })
        }
        l = null;
        i.style.display = "none";
        k.removeEventListener(g.move, f);
        k.removeEventListener(g.up, d);
        if (g.leave) {
            k.removeEventListener(g.leave, d)
        }
        if (g.touchstart) {
            k.removeEventListener(g.touchstart, d)
        }
    };
    k.addEventListener(g.move, f);
    k.addEventListener(g.up, d);
    if (g.leave) {
        k.addEventListener(g.leave, d)
    }
    if (g.touchstart) {
        k.addEventListener(g.touchstart, d)
    }
};
BALKANGraph.input = function (f, k, h, i, e, c) {
    if (i == undefined) {
        i = false
    }
    var l = document.createElement("div");
    var g = document.createElement("div");
    var d = document.createElement("input");
    var b = document.createElement("hr");
    var j = document.createElement("button");
    j.innerHTML = "Upload";
    j.style.position = "absolute";
    j.style.right = 0;
    l.style.margin = "14px 14px 7px 14px";
    l.style.textAlign = "left";
    l.style.position = "relative";
    b.style.border = "1px solid #d7d7d7";
    b.style.backgroundColor = "#d7d7d7";
    b.style.display = "block";
    b.style.width = "100%";
    g.style.floa = "left";
    g.style.color = "#bcbcbc";
    d.style.border = "none";
    d.style.outline = "none";
    d.style.width = "100%";
    if (e) {
        d.style.width = "80%"
    }
    d.style.fontSize = "16px";
    d.readOnly = i;
    if (k != undefined && k != null) {
        d.value = k
    }
    if (h != undefined && h != null) {
        d.placeholder = h
    }
    if (f != undefined && f != null) {
        g.innerHTML = f
    }
    g.setAttribute("label", f);
    d.style.color = "#7a7a7a";
    if (!i) {
        d.addEventListener("focus", function () {
            var m = this.parentNode.getElementsByTagName("hr")[0];
            m.style.border = "1px solid #039BE5";
            BALKANGraph.anim(m, {
                width: 10
            }, {
                    width: l.clientWidth
                }, 250, BALKANGraph.anim.inOutSin)
        })
    }
    j.addEventListener("click", function () {
        var n = this;
        var m = document.createElement("INPUT");
        m.setAttribute("type", "file");
        m.style.display = "none";
        m.onchange = function () {
            if (c) {
                var o = this.files[0];
                c(o, n.parentNode.querySelector("input"))
            }
        };
        document.body.appendChild(m);
        m.click()
    });
    d.addEventListener("blur", function () {
        var m = this.parentNode.getElementsByTagName("hr")[0];
        m.style.border = "1px solid #d7d7d7"
    });
    l.appendChild(g);
    l.appendChild(d);
    if (e) {
        l.appendChild(j)
    }
    l.appendChild(b);
    if (BALKANGraph.addValidation) {
        var a = {
            wrapper: l,
            label: g,
            input: d,
            hr: b
        };
        BALKANGraph.addValidation(f, k, a)
    }
    return l
};
OrgChart._az = function (m, o, h) {
    var e = m.x - h.siblingSeparation / 4;
    var f = m.y;
    var g = m.x + m.w + h.siblingSeparation / 4;
    var i = m.y;
    switch (h.orientation) {
        case BALKANGraph.orientation.right:
        case BALKANGraph.orientation.right_top:
        case BALKANGraph.orientation.left:
        case BALKANGraph.orientation.left_top:
            e = m.x;
            f = m.y - h.siblingSeparation / 4;
            g = m.x;
            i = m.y + m.h + h.siblingSeparation / 4;
            break
    }
    var n = o.p;
    var t = o.q;
    var u = o.r;
    var v = o.s;
    var j, k, l;
    j = (g - e) * (v - t) - (u - n) * (i - f);
    if (j === 0) {
        return false
    } else {
        l = ((v - t) * (u - e) + (n - u) * (v - f)) / j;
        k = ((f - i) * (u - e) + (g - e) * (v - f)) / j;
        return (0 < l && l < 1) && (0 < k && k < 1)
    }
};
OrgChart._z = function (c, d, b, e, a) {
    switch (b.orientation) {
        case BALKANGraph.orientation.top:
        case BALKANGraph.orientation.top_left:
            return OrgChart._e(c, d, b, e, a);
            break;
        case BALKANGraph.orientation.bottom:
        case BALKANGraph.orientation.bottom_left:
            return OrgChart._w(c, d, b, e, a);
            break;
        case BALKANGraph.orientation.left:
        case BALKANGraph.orientation.left_top:
            return OrgChart._s(c, d, b, e, a);
            break;
        case BALKANGraph.orientation.right:
        case BALKANGraph.orientation.right_top:
            return OrgChart._x(c, d, b, e, a);
            break
    }
};
OrgChart._e = function (c, e, b, f, a) {
    var d;
    var g;
    var h;
    if (a == "left") {
        if (c.leftNeighbor) {
            d = c.x + (c.leftNeighbor.x + c.leftNeighbor.w - (c.x)) / 2
        } else {
            d = c.x - b.siblingSeparation / 2
        }
    } else {
        if (a == "right") {
            if (c.rightNeighbor) {
                d = c.x + c.w + (c.rightNeighbor.x - (c.x + c.w)) / 2
            } else {
                d = c.x + c.w + b.siblingSeparation / 2
            }
        }
    }
    e.push([d, e[e.length - 1][1]]);
    e.push([d, c.y - b.levelSeparation / 3]);
    g = e[e.length - 1][1];
    h = d;
    f.p = d;
    f.q = g;
    f.r = h;
    return f
};
OrgChart._w = function (c, e, b, f, a) {
    var d;
    var g;
    var h;
    if (a == "left") {
        if (c.leftNeighbor) {
            d = c.x + (c.leftNeighbor.x + c.leftNeighbor.w - (c.x)) / 2
        } else {
            d = c.x - b.siblingSeparation / 2
        }
    } else {
        if (a == "right") {
            if (c.rightNeighbor) {
                d = c.x + c.w + (c.rightNeighbor.x - (c.x + c.w)) / 2
            } else {
                d = c.x + c.w + b.siblingSeparation / 2
            }
        }
    }
    e.push([d, e[e.length - 1][1]]);
    e.push([d, c.y + c.h + b.levelSeparation / 3]);
    g = e[e.length - 1][1];
    h = d;
    f.p = d;
    f.q = g;
    f.r = h;
    return f
};
OrgChart._s = function (c, e, b, f, a) {
    var d = e[e.length - 1][0];
    var g;
    var h;
    if (a == "bottom") {
        if (c.rightNeighbor) {
            g = c.y + c.h + (c.rightNeighbor.y - (c.y + c.h)) / 2
        } else {
            g = c.y + c.h + b.siblingSeparation / 2
        }
    } else {
        if (a == "top") {
            if (c.leftNeighbor) {
                g = c.y + (c.leftNeighbor.y + c.leftNeighbor.h - (c.y)) / 2
            } else {
                g = c.y - b.siblingSeparation / 2
            }
        }
    }
    e.push([e[e.length - 1][0], g]);
    e.push([
        [c.x - b.levelSeparation / 3], g
    ]);
    d = e[e.length - 1][0];
    s = g;
    f.p = d;
    f.q = g;
    f.s = s;
    return f
};
OrgChart._x = function (c, e, b, f, a) {
    var d = e[e.length - 1][0];
    var g;
    var h;
    if (a == "bottom") {
        if (c.rightNeighbor) {
            g = c.y + c.h + (c.rightNeighbor.y - (c.y + c.h)) / 2
        } else {
            g = c.y + c.h + b.siblingSeparation / 2
        }
    } else {
        if (a == "top") {
            if (c.leftNeighbor) {
                g = c.y + (c.leftNeighbor.y + c.leftNeighbor.h - (c.y)) / 2
            } else {
                g = c.y - b.siblingSeparation / 2
            }
        }
    }
    e.push([e[e.length - 1][0], g]);
    e.push([
        [c.x + c.w + b.levelSeparation / 3], g
    ]);
    d = e[e.length - 1][0];
    s = g;
    f.p = d;
    f.q = g;
    f.s = s;
    return f
};
OrgChart.editUI = function () { };
OrgChart.editUI.prototype.init = function (a) {
    this.obj = a;
    this.fields = null;
    this.node = null
};
OrgChart.editUI.prototype.show = function (c, e) {
    this.hide();
    this.node = this.obj.getBGNode(c);
    this.wrapperElement = document.getElementById("bgEditForm");
    if (this.wrapperElement) {
        this.obj.element.removeChild(this.wrapperElement)
    }
    this.wrapperElement = document.createElement("div");
    var b = document.createElement("div");
    var a = document.createElement("div");
    var d = window.matchMedia("(max-width: 1150px)")
        .matches;
    var f = "400px";
    if (d) {
        f = "100%"
    }
    Object.assign(this.wrapperElement.style, {
        width: f,
        position: "absolute",
        top: 0,
        right: "-150px",
        opacity: 0,
        "border-left": "1px solid #d7d7d7",
        "text-align": "left",
        height: "100%",
        "background-color": "#ffffff"
    });
    if (e) {
        this._u(this.node, a)
    } else {
        this._j(this.node, b)
    }
};
OrgChart.editUI.prototype._u = function (h, b) {
    var n = this;
    var j = document.createElement("div");
    var e = document.createElement("div");
    var c = document.createElement("div");
    var m = document.createElement("div");
    e.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    Object.assign(e.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(c.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(j.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(m.style, {
        margin: "12px"
    });
    this.wrapperElement.appendChild(b);
    b.appendChild(j);
    b.appendChild(c);
    c.appendChild(m);
    j.appendChild(e);
    BALKANGraph.htmlRipple(j);
    var d = this.fields;
    var a = this.obj._S(h.id);
    if (h.isGroup) {
        d = ["Name"];
        a = {
            Name: this.obj.config.tags[h.id].groupName
        }
    }
    for (var f = 0; f < d.length; f++) {
        var o = a[d[f]];
        if (h.isGroup) {
            o = this.obj.config.tags[h.id]["group" + d[f]]
        }
        if (BALKANGraph._Z(this.obj.config, d[f])) {
            var g = document.createElement("img");
            g.src = o;
            g.style.width = "100px";
            g.style.margin = "10px";
            g.style.borderRadius = "50px";
            j.appendChild(g)
        } else {
            if (d[f] == "tags") {
                if (o) {
                    for (var k = 0; k < o.length; k++) {
                        var l = document.createElement("span");
                        Object.assign(l.style, {
                            "background-color": "#F57C00",
                            color: "#ffffff",
                            margin: "2px",
                            padding: "2px 12px",
                            "border-radius": "10px",
                            display: "inline-block",
                            border: "1px solid #FFCA28",
                            "user-select": "none"
                        });
                        l.innerHTML = o[k];
                        m.appendChild(l)
                    }
                }
            } else {
                c.appendChild(BALKANGraph.input(d[f], o, null, true))
            }
        }
    }
    this.obj.element.appendChild(this.wrapperElement);
    j.addEventListener("click", function () {
        n.hide(false)
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            c.style.height = (n.obj.element.offsetHeight - j.offsetHeight) + "px"
        })
};
OrgChart.editUI.prototype._j = function (l, e) {
    var n = this;
    var m = document.createElement("div");
    var h = document.createElement("div");
    var a = document.createElement("div");
    var f = document.createElement("div");
    var b = document.createElement("div");
    h.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    this.wrapperElement.id = "bgEditForm";
    Object.assign(h.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(f.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(m.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(a.style, {
        margin: "14px 14px 7px",
        color: "#4285F4",
        cursor: "pointer"
    });
    Object.assign(b.style, {
        margin: "14px 14px 7px",
        color: "rgb(188, 188, 188)"
    });
    a.innerHTML = "Add new field";
    var c = BALKANGraph._r(this.node.tags, "assistant") ? "checked" : "";
    b.innerHTML = '<div label="isAssistant" style="margin-top: 10px;display:inline-block;">Assistant</div><label class="bg-switch"><input type="checkbox" ' + c + '><span class="bg-slider round"></span></label>';
    this.wrapperElement.appendChild(e);
    e.appendChild(m);
    e.appendChild(f);
    m.appendChild(h);
    BALKANGraph.htmlRipple(m);
    var g = this.fields;
    var d = this.obj._S(l.id);
    if (l.isGroup) {
        g = ["Name"];
        d = {
            Name: this.obj.config.tags[l.id].groupName
        }
    }
    for (var j = 0; j < g.length; j++) {
        var o = d[g[j]];
        if (l.isGroup) {
            o = this.obj.config.tags[l.id]["group" + g[j]]
        }
        if (g[j] != "tags") {
            if (BALKANGraph._Z(this.obj.config, g[j])) {
                if (o) {
                    var k = document.createElement("img");
                    k.src = o;
                    k.style.width = "100px";
                    k.style.margin = "10px";
                    k.style.borderRadius = "50px";
                    m.appendChild(k)
                }
                f.appendChild(BALKANGraph.input(g[j], o, null, false, true, this.obj.config.onImageUploaded))
            } else {
                f.appendChild(BALKANGraph.input(g[j], o, null, false))
            }
        }
    }
    if (!l.isGroup && !l.isChildOfGroup && l.childrenIds.length == 0) {
        f.appendChild(b)
    }
    if (!l.isGroup) {
        f.appendChild(a)
    }
    this.obj.element.appendChild(this.wrapperElement);
    m.addEventListener("click", function () {
        n.hide(true)
    });
    a.addEventListener("click", function () {
        if (a.innerHTML == "Save") {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Add new field";
                    a.style.textAlign = "left";
                    var p = document.getElementById("bgNewField");
                    var q = p.getElementsByTagName("input")[0].value;
                    f.removeChild(p);
                    if (q && !BALKANGraph._r(n.fields, q)) {
                        var r = BALKANGraph.input(q);
                        r.style.opacity = 0;
                        f.insertBefore(r, a);
                        BALKANGraph.anim(r, {
                            opacity: 0
                        }, {
                                opacity: 1
                            }, 200, BALKANGraph.anim.inSin, function () {
                                r.getElementsByTagName("input")[0].focus()
                            })
                    }
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                })
        } else {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Save";
                    a.style.textAlign = "right";
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                });
            var i = BALKANGraph.input(null, null, "Field name");
            i.style.opacity = 0;
            i.id = "bgNewField";
            f.appendChild(i);
            BALKANGraph.anim(i, {
                opacity: 0
            }, {
                    opacity: 1
                }, 200, BALKANGraph.anim.inSin, function () {
                    i.getElementsByTagName("input")[0].focus()
                })
        }
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            f.style.height = (n.obj.element.offsetHeight - m.offsetHeight) + "px";
            if (n.wrapperElement.getElementsByTagName("input")
                .length > 1) {
                n.wrapperElement.getElementsByTagName("input")[0].focus()
            }
        })
};
OrgChart.editUI.prototype.hide = function (f) {
    if (!this.wrapperElement) {
        return
    }
    var b = this.obj.get(this.node.id);
    if (this.node.isGroup) {
        b = {
            Name: this.obj.config.tags[this.node.id].groupName
        }
    }
    if (f) {
        var e = this.wrapperElement.querySelectorAll("[label]");
        for (var c = 0; c < e.length; c++) {
            var d = e[c].getAttribute("label");
            if (d != null) {
                var h = e[c].parentNode.getElementsByTagName("input")[0].value;
                if (d === BALKANGraph.TAGS) {
                    b.tags = h.split(",")
                } else {
                    if (d === "isAssistant") {
                        var a = e[c].parentNode.getElementsByTagName("input")[0].checked;
                        if (a && b.tags) {
                            if (!BALKANGraph._r(this.node.tags, "assistant")) {
                                b.tags.push("assistant")
                            }
                        } else {
                            if (a && !b.tags) {
                                b.tags = ["assistant"]
                            } else {
                                if (!a && b.tags) {
                                    if (this.node.tags.indexOf("assistant") != -1) {
                                        b.tags.splice(b.tags.indexOf("assistant"), 1)
                                    }
                                }
                            }
                        }
                    } else {
                        if (b[d] != undefined) {
                            b[d] = h
                        } else {
                            if (h != "") {
                                b[d] = h
                            }
                        }
                    }
                }
            }
        }
        var g = this;
        BALKANGraph.anim(g.wrapperElement, {
            right: 0,
            opacity: 1
        }, {
                right: -150,
                opacity: 0
            }, 300, BALKANGraph.anim.inOutSin, function () {
                if (g.node.isGroup) {
                    g.obj._aN(g.node.id, "groupName", b.Name)
                } else {
                    g.obj.updateNode(b, true)
                }
                g.obj.element.removeChild(g.wrapperElement);
                g.wrapperElement = null
            })
    } else {
        this.obj.element.removeChild(this.wrapperElement);
        this.wrapperElement = null
    }
};


//Danny Luzardo

//Remove
OrgChart.removeUI = function () { };
OrgChart.removeUI.prototype.init = function (a) {
    this.obj = a;
    this.fields = null;
    this.node = null
};
OrgChart.removeUI.prototype.show = function (c, e) {
    this.hide();
    this.node = this.obj.getBGNode(c);
    this.wrapperElement = document.getElementById("bgdeleteForm");
    if (this.wrapperElement) {
        this.obj.element.removeChild(this.wrapperElement)
    }
    this.wrapperElement = document.createElement("div");
    var b = document.createElement("div");
    var a = document.createElement("div");
    var d = window.matchMedia("(max-width: 1150px)")
        .matches;
    var f = "400px";
    if (d) {
        f = "100%"
    }
    Object.assign(this.wrapperElement.style, {
        width: f,
        position: "absolute",
        top: 0,
        right: "-150px",
        opacity: 0,
        "border-left": "1px solid #d7d7d7",
        "text-align": "left",
        height: "100%",
        "background-color": "#ffffff"
    });
    if (e) {
        this._u(this.node, a)
    } else {
        this._j(this.node, b)
    }
};
OrgChart.removeUI.prototype._u = function (h, b) {
    var n = this;
    var j = document.createElement("div");
    var e = document.createElement("div");
    var c = document.createElement("div");
    var m = document.createElement("div");
    e.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    Object.assign(e.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(c.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(j.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(m.style, {
        margin: "12px"
    });
    this.wrapperElement.appendChild(b);
    b.appendChild(j);
    b.appendChild(c);
    c.appendChild(m);
    j.appendChild(e);
    BALKANGraph.htmlRipple(j);
    var d = this.fields;
    var a = this.obj._S(h.id);
    if (h.isGroup) {
        d = ["Name"];
        a = {
            Name: this.obj.config.tags[h.id].groupName
        }
    }
    for (var f = 0; f < d.length; f++) {
        var o = a[d[f]];
        if (h.isGroup) {
            o = this.obj.config.tags[h.id]["group" + d[f]]
        }
        if (BALKANGraph._Z(this.obj.config, d[f])) {
            var g = document.createElement("img");
            g.src = o;
            g.style.width = "100px";
            g.style.margin = "10px";
            g.style.borderRadius = "50px";
            j.appendChild(g)
        } else {
            if (d[f] == "tags") {
                if (o) {
                    for (var k = 0; k < o.length; k++) {
                        var l = document.createElement("span");
                        Object.assign(l.style, {
                            "background-color": "#F57C00",
                            color: "#ffffff",
                            margin: "2px",
                            padding: "2px 12px",
                            "border-radius": "10px",
                            display: "inline-block",
                            border: "1px solid #FFCA28",
                            "user-select": "none"
                        });
                        l.innerHTML = o[k];
                        m.appendChild(l)
                    }
                }
            } else {
                c.appendChild(BALKANGraph.input(d[f], o, null, true))
            }
        }
    }
    this.obj.element.appendChild(this.wrapperElement);
    j.addEventListener("click", function () {
        n.hide(false)
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            c.style.height = (n.obj.element.offsetHeight - j.offsetHeight) + "px"
        })
};
OrgChart.removeUI.prototype._j = function (l, e) {
    var n = this;
    var m = document.createElement("div");
    var h = document.createElement("div");
    var a = document.createElement("div");
    var f = document.createElement("div");
    var b = document.createElement("div");
    h.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    this.wrapperElement.id = "bgdeleteForm";
    Object.assign(h.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(f.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(m.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(a.style, {
        margin: "14px 14px 7px",
        color: "#4285F4",
        cursor: "pointer"
    });
    Object.assign(b.style, {
        margin: "14px 14px 7px",
        color: "rgb(188, 188, 188)"
    });
    a.innerHTML = "Add new field";
    var c = BALKANGraph._r(this.node.tags, "assistant") ? "checked" : "";
    b.innerHTML = '<div label="isAssistant" style="margin-top: 10px;display:inline-block;">Assistant</div><label class="bg-switch"><input type="checkbox" ' + c + '><span class="bg-slider round"></span></label>';
    this.wrapperElement.appendChild(e);
    e.appendChild(m);
    e.appendChild(f);
    m.appendChild(h);
    BALKANGraph.htmlRipple(m);
    var g = this.fields;
    var d = this.obj._S(l.id);
    if (l.isGroup) {
        g = ["Name"];
        d = {
            Name: this.obj.config.tags[l.id].groupName
        }
    }
    for (var j = 0; j < g.length; j++) {
        var o = d[g[j]];
        if (l.isGroup) {
            o = this.obj.config.tags[l.id]["group" + g[j]]
        }
        if (g[j] != "tags") {
            if (BALKANGraph._Z(this.obj.config, g[j])) {
                if (o) {
                    var k = document.createElement("img");
                    k.src = o;
                    k.style.width = "100px";
                    k.style.margin = "10px";
                    k.style.borderRadius = "50px";
                    m.appendChild(k)
                }
                f.appendChild(BALKANGraph.input(g[j], o, null, false, true, this.obj.config.onImageUploaded))
            } else {
                f.appendChild(BALKANGraph.input(g[j], o, null, false))
            }
        }
    }
    if (!l.isGroup && !l.isChildOfGroup && l.childrenIds.length == 0) {
        f.appendChild(b)
    }
    if (!l.isGroup) {
        f.appendChild(a)
    }
    this.obj.element.appendChild(this.wrapperElement);
    m.addEventListener("click", function () {
        n.hide(true)
    });
    a.addEventListener("click", function () {
        if (a.innerHTML == "Save") {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Add new field";
                    a.style.textAlign = "left";
                    var p = document.getElementById("bgNewField");
                    var q = p.getElementsByTagName("input")[0].value;
                    f.removeChild(p);
                    if (q && !BALKANGraph._r(n.fields, q)) {
                        var r = BALKANGraph.input(q);
                        r.style.opacity = 0;
                        f.insertBefore(r, a);
                        BALKANGraph.anim(r, {
                            opacity: 0
                        }, {
                                opacity: 1
                            }, 200, BALKANGraph.anim.inSin, function () {
                                r.getElementsByTagName("input")[0].focus()
                            })
                    }
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                })
        } else {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Save";
                    a.style.textAlign = "right";
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                });
            var i = BALKANGraph.input(null, null, "Field name");
            i.style.opacity = 0;
            i.id = "bgNewField";
            f.appendChild(i);
            BALKANGraph.anim(i, {
                opacity: 0
            }, {
                    opacity: 1
                }, 200, BALKANGraph.anim.inSin, function () {
                    i.getElementsByTagName("input")[0].focus()
                })
        }
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            f.style.height = (n.obj.element.offsetHeight - m.offsetHeight) + "px";
            if (n.wrapperElement.getElementsByTagName("input")
                .length > 1) {
                n.wrapperElement.getElementsByTagName("input")[0].focus()
            }
        })
};
OrgChart.removeUI.prototype.hide = function (f) {
    if (!this.wrapperElement) {
        return
    }
    var b = this.obj.get(this.node.id);
    if (this.node.isGroup) {
        b = {
            Name: this.obj.config.tags[this.node.id].groupName
        }
    }
    if (f) {
        var e = this.wrapperElement.querySelectorAll("[label]");
        for (var c = 0; c < e.length; c++) {
            var d = e[c].getAttribute("label");
            if (d != null) {
                var h = e[c].parentNode.getElementsByTagName("input")[0].value;
                if (d === BALKANGraph.TAGS) {
                    b.tags = h.split(",")
                } else {
                    if (d === "isAssistant") {
                        var a = e[c].parentNode.getElementsByTagName("input")[0].checked;
                        if (a && b.tags) {
                            if (!BALKANGraph._r(this.node.tags, "assistant")) {
                                b.tags.push("assistant")
                            }
                        } else {
                            if (a && !b.tags) {
                                b.tags = ["assistant"]
                            } else {
                                if (!a && b.tags) {
                                    if (this.node.tags.indexOf("assistant") != -1) {
                                        b.tags.splice(b.tags.indexOf("assistant"), 1)
                                    }
                                }
                            }
                        }
                    } else {
                        if (b[d] != undefined) {
                            b[d] = h
                        } else {
                            if (h != "") {
                                b[d] = h
                            }
                        }
                    }
                }
            }
        }
        var g = this;
        BALKANGraph.anim(g.wrapperElement, {
            right: 0,
            opacity: 1
        }, {
                right: -150,
                opacity: 0
            }, 300, BALKANGraph.anim.inOutSin, function () {
                if (g.node.isGroup) {
                    g.obj._aN(g.node.id, "groupName", b.Name)
                } else {
                    g.obj.updateNode(b, true)
                }
                g.obj.element.removeChild(g.wrapperElement);
                g.wrapperElement = null
            })
    } else {
        this.obj.element.removeChild(this.wrapperElement);
        this.wrapperElement = null
    }
};
//Remove





//Details
OrgChart.detailUI = function () { };
OrgChart.detailUI.prototype.init = function (a) {
    this.obj = a;
    this.fields = null;
    this.node = null
};
OrgChart.detailUI.prototype.show = function (c, e) {
    this.hide();
    this.node = this.obj.getBGNode(c);
    this.wrapperElement = document.getElementById("bgdeleteForm");
    if (this.wrapperElement) {
        this.obj.element.removeChild(this.wrapperElement)
    }
    this.wrapperElement = document.createElement("div");
    var b = document.createElement("div");
    var a = document.createElement("div");
    var d = window.matchMedia("(max-width: 1150px)")
        .matches;
    var f = "400px";
    if (d) {
        f = "100%"
    }
    Object.assign(this.wrapperElement.style, {
        width: f,
        position: "absolute",
        top: 0,
        right: "-150px",
        opacity: 0,
        "border-left": "1px solid #d7d7d7",
        "text-align": "left",
        height: "100%",
        "background-color": "#ffffff"
    });
    if (e) {
        this._u(this.node, a)
    } else {
        this._j(this.node, b)
    }
};
OrgChart.detailUI.prototype._u = function (h, b) {
    var n = this;
    var j = document.createElement("div");
    var e = document.createElement("div");
    var c = document.createElement("div");
    var m = document.createElement("div");
    e.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    Object.assign(e.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(c.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(j.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(m.style, {
        margin: "12px"
    });
    this.wrapperElement.appendChild(b);
    b.appendChild(j);
    b.appendChild(c);
    c.appendChild(m);
    j.appendChild(e);
    BALKANGraph.htmlRipple(j);
    var d = this.fields;
    var a = this.obj._S(h.id);
    if (h.isGroup) {
        d = ["Name"];
        a = {
            Name: this.obj.config.tags[h.id].groupName
        }
    }
    for (var f = 0; f < d.length; f++) {
        var o = a[d[f]];
        if (h.isGroup) {
            o = this.obj.config.tags[h.id]["group" + d[f]]
        }
        if (BALKANGraph._Z(this.obj.config, d[f])) {
            var g = document.createElement("img");
            g.src = o;
            g.style.width = "100px";
            g.style.margin = "10px";
            g.style.borderRadius = "50px";
            j.appendChild(g)
        } else {
            if (d[f] == "tags") {
                if (o) {
                    for (var k = 0; k < o.length; k++) {
                        var l = document.createElement("span");
                        Object.assign(l.style, {
                            "background-color": "#F57C00",
                            color: "#ffffff",
                            margin: "2px",
                            padding: "2px 12px",
                            "border-radius": "10px",
                            display: "inline-block",
                            border: "1px solid #FFCA28",
                            "user-select": "none"
                        });
                        l.innerHTML = o[k];
                        m.appendChild(l)
                    }
                }
            } else {
                c.appendChild(BALKANGraph.input(d[f], o, null, true))
            }
        }
    }
    this.obj.element.appendChild(this.wrapperElement);
    j.addEventListener("click", function () {
        n.hide(false)
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            c.style.height = (n.obj.element.offsetHeight - j.offsetHeight) + "px"
        })
};
OrgChart.detailUI.prototype._j = function (l, e) {
    var n = this;
    var m = document.createElement("div");
    var h = document.createElement("div");
    var a = document.createElement("div");
    var f = document.createElement("div");
    var b = document.createElement("div");
    h.innerHTML = '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>';
    this.wrapperElement.id = "bgdeleteForm";
    Object.assign(h.style, {
        cursor: "pointer",
        width: "34px",
        height: "34px",
        position: "absolute",
        top: "7px",
        right: "7px"
    });
    Object.assign(f.style, {
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });
    Object.assign(m.style, {
        "background-color": "#039BE5",
        "min-height": "50px",
        textAlign: "center",
        position: "relative"
    });
    Object.assign(a.style, {
        margin: "14px 14px 7px",
        color: "#4285F4",
        cursor: "pointer"
    });
    Object.assign(b.style, {
        margin: "14px 14px 7px",
        color: "rgb(188, 188, 188)"
    });
    a.innerHTML = "Add new field";
    var c = BALKANGraph._r(this.node.tags, "assistant") ? "checked" : "";
    b.innerHTML = '<div label="isAssistant" style="margin-top: 10px;display:inline-block;">Assistant</div><label class="bg-switch"><input type="checkbox" ' + c + '><span class="bg-slider round"></span></label>';
    this.wrapperElement.appendChild(e);
    e.appendChild(m);
    e.appendChild(f);
    m.appendChild(h);
    BALKANGraph.htmlRipple(m);
    var g = this.fields;
    var d = this.obj._S(l.id);
    if (l.isGroup) {
        g = ["Name"];
        d = {
            Name: this.obj.config.tags[l.id].groupName
        }
    }
    for (var j = 0; j < g.length; j++) {
        var o = d[g[j]];
        if (l.isGroup) {
            o = this.obj.config.tags[l.id]["group" + g[j]]
        }
        if (g[j] != "tags") {
            if (BALKANGraph._Z(this.obj.config, g[j])) {
                if (o) {
                    var k = document.createElement("img");
                    k.src = o;
                    k.style.width = "100px";
                    k.style.margin = "10px";
                    k.style.borderRadius = "50px";
                    m.appendChild(k)
                }
                f.appendChild(BALKANGraph.input(g[j], o, null, false, true, this.obj.config.onImageUploaded))
            } else {
                f.appendChild(BALKANGraph.input(g[j], o, null, false))
            }
        }
    }
    if (!l.isGroup && !l.isChildOfGroup && l.childrenIds.length == 0) {
        f.appendChild(b)
    }
    if (!l.isGroup) {
        f.appendChild(a)
    }
    this.obj.element.appendChild(this.wrapperElement);
    m.addEventListener("click", function () {
        n.hide(true)
    });
    a.addEventListener("click", function () {
        if (a.innerHTML == "Save") {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Add new field";
                    a.style.textAlign = "left";
                    var p = document.getElementById("bgNewField");
                    var q = p.getElementsByTagName("input")[0].value;
                    f.removeChild(p);
                    if (q && !BALKANGraph._r(n.fields, q)) {
                        var r = BALKANGraph.input(q);
                        r.style.opacity = 0;
                        f.insertBefore(r, a);
                        BALKANGraph.anim(r, {
                            opacity: 0
                        }, {
                                opacity: 1
                            }, 200, BALKANGraph.anim.inSin, function () {
                                r.getElementsByTagName("input")[0].focus()
                            })
                    }
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                })
        } else {
            BALKANGraph.anim(a, {
                opacity: 1
            }, {
                    opacity: 0
                }, 200, BALKANGraph.anim.inSin, function () {
                    a.innerHTML = "Save";
                    a.style.textAlign = "right";
                    BALKANGraph.anim(a, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, 200, BALKANGraph.anim.inSin)
                });
            var i = BALKANGraph.input(null, null, "Field name");
            i.style.opacity = 0;
            i.id = "bgNewField";
            f.appendChild(i);
            BALKANGraph.anim(i, {
                opacity: 0
            }, {
                    opacity: 1
                }, 200, BALKANGraph.anim.inSin, function () {
                    i.getElementsByTagName("input")[0].focus()
                })
        }
    });
    BALKANGraph.anim(this.wrapperElement, {
        right: -150,
        opacity: 0
    }, {
            right: 0,
            opacity: 0.9
        }, 300, BALKANGraph.anim.inOutSin, function () {
            f.style.height = (n.obj.element.offsetHeight - m.offsetHeight) + "px";
            if (n.wrapperElement.getElementsByTagName("input")
                .length > 1) {
                n.wrapperElement.getElementsByTagName("input")[0].focus()
            }
        })
};
OrgChart.detailUI.prototype.hide = function (f) {
    if (!this.wrapperElement) {
        return
    }
    var b = this.obj.get(this.node.id);
    if (this.node.isGroup) {
        b = {
            Name: this.obj.config.tags[this.node.id].groupName
        }
    }
    if (f) {
        var e = this.wrapperElement.querySelectorAll("[label]");
        for (var c = 0; c < e.length; c++) {
            var d = e[c].getAttribute("label");
            if (d != null) {
                var h = e[c].parentNode.getElementsByTagName("input")[0].value;
                if (d === BALKANGraph.TAGS) {
                    b.tags = h.split(",")
                } else {
                    if (d === "isAssistant") {
                        var a = e[c].parentNode.getElementsByTagName("input")[0].checked;
                        if (a && b.tags) {
                            if (!BALKANGraph._r(this.node.tags, "assistant")) {
                                b.tags.push("assistant")
                            }
                        } else {
                            if (a && !b.tags) {
                                b.tags = ["assistant"]
                            } else {
                                if (!a && b.tags) {
                                    if (this.node.tags.indexOf("assistant") != -1) {
                                        b.tags.splice(b.tags.indexOf("assistant"), 1)
                                    }
                                }
                            }
                        }
                    } else {
                        if (b[d] != undefined) {
                            b[d] = h
                        } else {
                            if (h != "") {
                                b[d] = h
                            }
                        }
                    }
                }
            }
        }
        var g = this;
        BALKANGraph.anim(g.wrapperElement, {
            right: 0,
            opacity: 1
        }, {
                right: -150,
                opacity: 0
            }, 300, BALKANGraph.anim.inOutSin, function () {
                if (g.node.isGroup) {
                    g.obj._aN(g.node.id, "groupName", b.Name)
                } else {
                    g.obj.updateNode(b, true)
                }
                g.obj.element.removeChild(g.wrapperElement);
                g.wrapperElement = null
            })
    } else {
        this.obj.element.removeChild(this.wrapperElement);
        this.wrapperElement = null
    }
};
//Details

//Danny Luzardo

OrgChart.ui = {
    _i: {},
    defs: function () {
        var a = "";
        for (var c in OrgChart.templates) {
            var b = OrgChart.templates[c];
            if (b.defs) {
                OrgChart.ui._i[c] = BALKANGraph._aQ();
                a += b.defs.replace("{randId}", OrgChart.ui._i[c])
            } else {
                a += b.defs
            }
        }
        return "<defs>" + a + "</defs>"
    },
    css: function () {
        var a = '.bg-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .bg-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: bg-ripple 1000ms; }@-moz-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}.bg-switch {position:relative;display:inline-block;width:60px;height:24px;float:right;}.bg-switch input {opacity:0;width:0;height:0;}.bg-slider {position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color: #ccc;-webkit-transition:.4s;transition: .4s;}.bg-slider:before {position:absolute;content:"";height:16px;width:16px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;transition:.4s;}input:checked + .bg-slider {background-color:#2196F3;}input:focus + .bg-slider {box-shadow:0 0 1px #2196F3;}input:checked + .bg-slider:before {-webkit-transform:translateX(34px);-ms-transform:translateX(34px);transform:translateX(34px);}.bg-slider.round {border-radius:24px;}.bg-slider.round:before {border-radius:50%;}svg text:hover {cursor:default;}';
        return "<style>" + a + "</style>"
    },
    lonely: function (a) {
        if (!a.nodes || !a.nodes.length) {
            return BALKANGraph.IT_IS_LONELY_HERE.replace("{link}", BALKANGraph.RES.IT_IS_LONELY_HERE_LINK)
        } else {
            return ""
        }
    },
    pointer: function (b, a) {
        if (a === BALKANGraph.action.exporting) {
            return ""
        }
        var c = OrgChart.templates[b.template];
        return c.pointer
    },
    node: function (c, e, b, d, u, v, k, a) {
        var r = OrgChart.templates[c.templateName];
        var l = r.node.replaceAll("{w}", c.w)
            .replaceAll("{h}", c.h);
        if (r.defs) {
            l = l.replace("{randId}", OrgChart.ui._i[c.templateName])
        }
        if (k == undefined) {
            k = d.nodeBinding
        }
        if (c.isGroup) {
            var i = d.tags[c.id].groupName;
            if (i) {
                var h = r.groupName.replace("{val}", i);
                h = h.replaceAll("{randId}", BALKANGraph._aQ())
                    .replaceAll("{randId2}", BALKANGraph._aQ());
                l += h
            }
            l += h
        } else {
            for (var g in k) {
                var s = k[g];
                if (e) {
                    var p = e[s];
                    if (typeof (s) == "function") {
                        p = s(c)
                    }
                    if (p != undefined && p != null && r[g] != undefined) {
                        var h;
                        if (!BALKANGraph._ae(d, g) && typeof (p) == "string") {
                            p = BALKANGraph._aI(p, r[g]);
                            h = r[g].replace("{val}", p)
                        } else {
                            h = r[g].replace("{val}", p)
                        }
                        h = h.replaceAll("{randId}", BALKANGraph._aQ())
                            .replaceAll("{randId2}", BALKANGraph._aQ());
                        l += h
                    }
                }
            }
        }
        var o = BALKANGraph._J(b, c, u, v);
        var q = "node";
        if (Array.isArray(c.tags) && c.tags.length) {
            q += " " + c.tags.join(" ")
        }
        if (c.layout) {
            q += " tree-layout"
        }
        var n = BALKANGraph.nodeOpenTag.replace("{id}", c.id)
            .replace("{class}", q)
            .replace("{level}", c.level)
            .replace("{x}", o.x)
            .replace("{y}", o.y);
        var m = BALKANGraph._U(b, c);
        n = n.replace("{opacity}", m);
        if (!c.isGroup && d.nodeMenu != null && a !== BALKANGraph.action.exporting) {
            l += r.nodeMenuButton.replace("{id}", c.id)
        }
        var j = OrgChart.ui._aS(c, r, d, b, k, u, v, a);
        if (c.isGroup && a != BALKANGraph.action.exporting) {
            if (c.groupState == BALKANGraph.EXPAND) {
                l += BALKANGraph.MINIMIZE.replace("{x}", c.w - (45))
                    .replace("{id}", c.id)
            } else {
                l += BALKANGraph.MAXIMIZE.replace("{x}", c.w - (45))
                    .replace("{id}", c.id)
            }
        }
        l = n + l + j + BALKANGraph.grCloseTag;
        return l
    },
    _aS: function (c, m, e, b, l, n, o, a) {
        var g = "";
        if (c.isGroup && c.groupState == BALKANGraph.EXPAND) {
            if (!m.groupPadding) {
                console.error("groupPadding is not defined in template " + c.templateName)
            }
            for (var h = 0; h < c.bgnodes.length; h++) {
                var d = c.bgnodes[h];
                var f = null;
                for (var k = 0; k < e.nodes.length; k++) {
                    if (e.nodes[k].id == d.id) {
                        f = e.nodes[k]
                    }
                }
                g += OrgChart.ui.node(d, f, b, e, n, o, l, a)
            }
            g = BALKANGraph.groupNodesOpenTag.replace("{x}", m.groupPadding[3])
                .replace("{y}", m.groupPadding[0]) + g + BALKANGraph.grCloseTag
        }
        return g
    },
    expandCollapse: function (b, c, a) {
        if (a === BALKANGraph.action.exporting) {
            return ""
        }
        if (b.childrenIds.length == 0) {
            return ""
        }
        if (b.isAssistant) {
            return ""
        }
        if (b.templateName == "split") {
            return ""
        }
        var d = "";
        var f = 0;
        var g = 0;
        var e = OrgChart.templates[b.templateName];
        switch (c.orientation) {
            case BALKANGraph.orientation.top:
            case BALKANGraph.orientation.top_left:
                f = b.x + (b.w / 2);
                g = b.y + b.h;
                break;
            case BALKANGraph.orientation.bottom:
            case BALKANGraph.orientation.bottom_left:
                f = b.x + (b.w / 2);
                g = b.y;
                break;
            case BALKANGraph.orientation.right:
            case BALKANGraph.orientation.right_top:
                f = b.x;
                g = b.y + (b.h / 2);
                break;
            case BALKANGraph.orientation.left:
            case BALKANGraph.orientation.left_top:
                f = b.x + b.w;
                g = b.y + (b.h / 2);
                break
        }
        f = f - e.expandCollapseSize / 2;
        g = g - e.expandCollapseSize / 2;
        if (b.collapsedChildrenIds.length) {
            d += BALKANGraph.expcollOpenTag.replace("{id}", b.id)
                .replace("{x}", f)
                .replace("{y}", g);
            d += e.plus;
            d += BALKANGraph.grCloseTag
        } else {
            d += BALKANGraph.expcollOpenTag.replace("{id}", b.id)
                .replace("{x}", f)
                .replace("{y}", g);
            d += e.minus;
            d += BALKANGraph.grCloseTag
        }
        return d
    },
    secondLinks: function (m, l, c, b) {
        if (l.spids == null) {
            return ""
        }
        var e = "";
        for (var f = 0; f < l.spids.length; f++) {
            var p = [];
            var u = l.spids[f];
            var o = null;
            var a = "left";
            if (!m[u]) {
                continue
            }
            switch (c.orientation) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.top_left:
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    if (m[u].x > l.x) {
                        a = "right"
                    }
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.left_top:
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    a = "top";
                    if (m[u].y > l.y) {
                        a = "bottom"
                    }
                    break
            }
            var v = OrgChart.templates[l.templateName];
            var r = {
                p: l.x + l.w / 2 + v.expandCollapseSize,
                q: l.y,
                r: l.x + l.w / 2 + v.expandCollapseSize,
                s: b.minY + c.levelSeparation
            };
            switch (c.orientation) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.top_left:
                    p.push([r.p, r.q]);
                    p.push([r.r, l.y - c.levelSeparation / 3]);
                    break;
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    r.q = l.y + l.h;
                    r.s = b.maxY - c.levelSeparation;
                    p.push([r.p, r.q]);
                    p.push([r.r, l.y + l.h + c.levelSeparation / 3]);
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.left_top:
                    r.p = l.x;
                    r.q = l.y + l.h / 2 + v.expandCollapseSize;
                    r.r = b.minX - c.levelSeparation;
                    r.s = l.y + l.h / 2 + v.expandCollapseSize;
                    p.push([r.p, r.q]);
                    p.push([l.x - c.levelSeparation / 3, r.q]);
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    r.p = l.x + l.w;
                    r.q = l.y + l.h / 2 + v.expandCollapseSize;
                    r.r = b.maxX + c.levelSeparation;
                    r.s = l.y + l.h / 2 + v.expandCollapseSize;
                    p.push([r.p, r.q]);
                    p.push([l.x + l.w + c.levelSeparation / 3, r.q]);
                    break
            }
            var k = l;
            while (o == null) {
                var d = false;
                var q = k.parent;
                var h = q.leftNeighbor;
                var s = q.rightNeighbor;
                if (q.id == u) {
                    o = q
                } else {
                    if (OrgChart._az(q, r, c)) {
                        r = OrgChart._z(q, p, c, r, a);
                        d = true
                    }
                }
                if (q.id != u) {
                    while (h) {
                        if (h.id == u) {
                            o = h;
                            break
                        }
                        if (OrgChart._az(h, r, c)) {
                            r = OrgChart._z(h, p, c, r, a);
                            d = true
                        }
                        h = h.leftNeighbor
                    }
                    while (s) {
                        if (s.id == u) {
                            o = s;
                            break
                        }
                        if (OrgChart._az(s, r, c)) {
                            r = OrgChart._z(s, p, c, r, a);
                            d = true
                        }
                        s = s.rightNeighbor
                    }
                }
                if (!d) {
                    var w = p[p.length - 1][0];
                    var z = 0;
                    if (q.parent) {
                        switch (c.orientation) {
                            case BALKANGraph.orientation.top:
                            case BALKANGraph.orientation.top_left:
                                z = q.parent.y + q.parent.h + c.levelSeparation * (2 / 3);
                                break;
                            case BALKANGraph.orientation.bottom:
                            case BALKANGraph.orientation.bottom_left:
                                z = q.parent.y - c.levelSeparation * (2 / 3);
                                break;
                            case BALKANGraph.orientation.left:
                            case BALKANGraph.orientation.left_top:
                                w = q.parent.x + q.parent.w + c.levelSeparation * (2 / 3);
                                z = p[p.length - 1][1];
                                break;
                            case BALKANGraph.orientation.right:
                            case BALKANGraph.orientation.right_top:
                                w = q.parent.x - c.levelSeparation * (2 / 3);
                                z = p[p.length - 1][1];
                                break
                        }
                    }
                    p.push([w, z])
                }
                k = q
            }
            v = OrgChart.templates[o.templateName];
            p.splice(p.length - 1, 1);
            switch (c.orientation) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.top_left:
                    p.push([o.x + o.w / 2 + v.expandCollapseSize, p[p.length - 1][1]]);
                    p.push([p[p.length - 1][0], o.y + o.h]);
                    break;
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    p.push([o.x + o.w / 2 + v.expandCollapseSize, p[p.length - 1][1]]);
                    p.push([p[p.length - 1][0], o.y]);
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.left_top:
                    p.push([p[p.length - 1][0], o.y + o.h / 2 + v.expandCollapseSize]);
                    p.push([o.x + o.w, p[p.length - 1][1]]);
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    p.push([p[p.length - 1][0], o.y + o.h / 2 + v.expandCollapseSize]);
                    p.push([o.x, p[p.length - 1][1]]);
                    break
            }
            p[0] = "M" + p[0].join(",");
            for (var g = 1; g < p.length; g++) {
                p[g] = "L" + p[g].join(",")
            }
            p = p.join(" ");
            e += BALKANGraph.secondLinkOpenTag.replace("{id}", l.id)
                .replace("{child-id}", u) + v.secondLink.replace("{d}", p);
            e += BALKANGraph.grCloseTag
        }
        return e
    },
    link: function (a, l, c) {
        var r = OrgChart.templates[a.templateName];
        var h = [];
        var o = 0;
        var q = c.levelSeparation / 2;
        if (a.layout == BALKANGraph.mixed || a.layout == BALKANGraph.tree) {
            q = c.mixedHierarchyNodesSeparation / 2
        }
        for (var g = 0; g < a.children.length; g++) {
            var b = a.children[g];
            var m = {
                xa: 0,
                ya: 0,
                xb: 0,
                yb: 0,
                xc: 0,
                yc: 0,
                xd: 0,
                yd: 0,
                x: 0,
                y: 0,
                rotate: 0
            };
            r = OrgChart.templates[b.templateName];
            var k = r.link;
            if ((b.isAssistant || b.layout == 2) && b.rightNeighbor && b.rightNeighbor.templateName == "split") {
                switch (c.orientation) {
                    case BALKANGraph.orientation.top:
                    case BALKANGraph.orientation.top_left:
                        m = OrgChart.ui._ar(b.rightNeighbor, b, r, q);
                        break;
                    case BALKANGraph.orientation.bottom:
                    case BALKANGraph.orientation.bottom_left:
                        m = OrgChart.ui._ar(b.rightNeighbor, b, r, q);
                        break;
                    case BALKANGraph.orientation.right:
                    case BALKANGraph.orientation.right_top:
                        m = OrgChart.ui._ad(b.rightNeighbor, b, r, q);
                        break;
                    case BALKANGraph.orientation.left:
                    case BALKANGraph.orientation.left_top:
                        m = OrgChart.ui._ad(b.rightNeighbor, b, r, q);
                        break
                }
            } else {
                if ((b.isAssistant || b.layout == 2) && b.leftNeighbor && b.leftNeighbor.templateName == "split") {
                    switch (c.orientation) {
                        case BALKANGraph.orientation.top:
                        case BALKANGraph.orientation.top_left:
                            m = OrgChart.ui._ac(b.leftNeighbor, b, r, q);
                            break;
                        case BALKANGraph.orientation.bottom:
                        case BALKANGraph.orientation.bottom_left:
                            m = OrgChart.ui._ac(b.leftNeighbor, b, r, q);
                            break;
                        case BALKANGraph.orientation.right:
                        case BALKANGraph.orientation.right_top:
                            m = OrgChart.ui._af(b.leftNeighbor, b, r, q);
                            break;
                        case BALKANGraph.orientation.left:
                        case BALKANGraph.orientation.left_top:
                            m = OrgChart.ui._af(b.leftNeighbor, b, r, q);
                            break
                    }
                } else {
                    switch (c.orientation) {
                        case BALKANGraph.orientation.top:
                        case BALKANGraph.orientation.top_left:
                            m = OrgChart.ui._af(a, b, r, q);
                            break;
                        case BALKANGraph.orientation.bottom:
                        case BALKANGraph.orientation.bottom_left:
                            m = OrgChart.ui._ad(a, b, r, q);
                            break;
                        case BALKANGraph.orientation.right:
                        case BALKANGraph.orientation.right_top:
                            m = OrgChart.ui._ar(a, b, r, q);
                            break;
                        case BALKANGraph.orientation.left:
                        case BALKANGraph.orientation.left_top:
                            m = OrgChart.ui._ac(a, b, r, q);
                            break
                    }
                }
            }
            k = k.replace("{xa}", m.xa)
                .replace("{ya}", m.ya)
                .replace("{xb}", m.xb)
                .replace("{yb}", m.yb)
                .replace("{xc}", m.xc)
                .replace("{yc}", m.yc)
                .replace("{xd}", m.xd)
                .replace("{yd}", m.yd);
            h.push(BALKANGraph.linkOpenTag.replace("{id}", a.id)
                .replace("{class}", "link " + b.tags.join(" "))
                .replace("{level}", a.level)
                .replace("{child-id}", b.id));
            h.push(k);
            var j = "";
            for (var e in c.linkBinding) {
                var s = c.linkBinding[e];
                var d = l._S(b.id);
                if (d) {
                    var n = d[s];
                    if (n != undefined && n != null && r[e] != undefined) {
                        j += r[e].replace("{val}", n)
                    }
                }
            }
            if (j != "") {
                j = BALKANGraph.linkFieldsOpenTag.replace("{x}", m.x)
                    .replace("{y}", m.y)
                    .replace("{rotate}", o) + j + BALKANGraph.grCloseTag;
                h.push(j)
            }
            h.push(BALKANGraph.grCloseTag)
        }
        return h.join("")
    },
    svg: function (f, c, e, a, b) {
        var d = OrgChart.templates[a.template].svg.replace("{w}", f)
            .replace("{h}", c)
            .replace("{viewBox}", e)
            .replace("{content}", b);
        return d
    },
    wrapper: function (f, c, e, a, b) {
        var d = OrgChart.templates[a.template].svg.replace("{w}", f)
            .replace("{h}", c)
            .replace("{viewBox}", e)
            .replace("{content}", b);
        return d
    },
    exportMenuButton: function (a) {
        if (a.menu == null) {
            return ""
        }
        var b = OrgChart.templates[a.template];
        return b.exportMenuButton.replaceAll("{p}", a.padding)
    },
    _af: function (a, b, e, d) {
        var g = 0,
            l = 0,
            h = 0,
            m = 0,
            i = 0,
            n = 0,
            j = 0,
            o = 0,
            f = 0,
            k = 0,
            c = 0;
        g = a.x + (a.w / 2) + e.linkAdjuster.toX;
        l = a.y + a.h + e.linkAdjuster.toY;
        j = i = b.x + (b.w / 2) + e.linkAdjuster.fromX;
        o = b.y + e.linkAdjuster.fromY;
        h = g;
        if (a.rightNeighbor && a.rightNeighbor.isAssistant && b.templateName == "split") {
            m = n = a.rightNeighbor.y + a.rightNeighbor.h + d
        } else {
            if (a.templateName == "split" && (b.isAssistant || b.layout == 2)) {
                m = n = o
            } else {
                if (b.templateName == "split") {
                    m = n = l + d
                } else {
                    m = n = o - d
                }
            }
        }
        f = i;
        k = n + 16;
        return {
            xa: g,
            ya: l,
            xb: h,
            yb: m,
            xc: i,
            yc: n,
            xd: j,
            yd: o,
            x: f,
            y: k,
            rotate: c
        }
    },
    _ad: function (a, b, e, d) {
        var g = 0,
            l = 0,
            h = 0,
            m = 0,
            i = 0,
            n = 0,
            j = 0,
            o = 0,
            f = 0,
            k = 0,
            c = 0;
        g = a.x + (a.w / 2) + e.linkAdjuster.toX;
        l = a.y + e.linkAdjuster.toY;
        j = i = b.x + (b.w / 2) + e.linkAdjuster.fromX;
        o = b.y + b.h + e.linkAdjuster.fromY;
        h = g;
        if (a.rightNeighbor && a.rightNeighbor.isAssistant && b.templateName == "split") {
            m = n = a.rightNeighbor.y - d
        } else {
            if (a.templateName == "split" && (b.isAssistant || b.layout == 2)) {
                m = n = o
            } else {
                if (b.templateName == "split") {
                    m = n = l - d
                } else {
                    m = n = o + d
                }
            }
        }
        f = i;
        k = n - 14;
        return {
            xa: g,
            ya: l,
            xb: h,
            yb: m,
            xc: i,
            yc: n,
            xd: j,
            yd: o,
            x: f,
            y: k,
            rotate: c
        }
    },
    _ar: function (a, b, e, d) {
        var g = 0,
            l = 0,
            h = 0,
            m = 0,
            i = 0,
            n = 0,
            j = 0,
            o = 0,
            f = 0,
            k = 0,
            c = 0;
        g = a.x + e.linkAdjuster.toX;
        l = a.y + (a.h / 2) + e.linkAdjuster.toY;
        j = b.x + b.w + e.linkAdjuster.fromX;
        o = n = b.y + (b.h / 2) + e.linkAdjuster.fromY;
        m = l;
        if (a.rightNeighbor && a.rightNeighbor.isAssistant && b.templateName == "split") {
            h = i = a.rightNeighbor.x - d
        } else {
            if (a.templateName == "split" && (b.isAssistant || b.layout == 2)) {
                h = i = j
            } else {
                if (b.templateName == "split") {
                    h = i = g - d
                } else {
                    h = i = j + d
                }
            }
        }
        f = i - 16;
        k = n;
        c = 90;
        return {
            xa: g,
            ya: l,
            xb: h,
            yb: m,
            xc: i,
            yc: n,
            xd: j,
            yd: o,
            x: f,
            y: k,
            rotate: c
        }
    },
    _ac: function (a, b, e, d) {
        var g = 0,
            l = 0,
            h = 0,
            m = 0,
            i = 0,
            n = 0,
            j = 0,
            o = 0,
            f = 0,
            k = 0,
            c = 0;
        g = a.x + a.w + e.linkAdjuster.toX;
        l = a.y + (a.h / 2) + e.linkAdjuster.toY;
        j = b.x + e.linkAdjuster.fromX;
        o = n = b.y + (b.h / 2) + e.linkAdjuster.fromY;
        m = l;
        if (a.rightNeighbor && a.rightNeighbor.isAssistant && b.templateName == "split") {
            h = i = a.rightNeighbor.x + a.rightNeighbor.w + d
        } else {
            if (a.templateName == "split" && (b.isAssistant || b.layout == 2)) {
                h = i = j
            } else {
                if (b.templateName == "split") {
                    h = i = g + d
                } else {
                    h = i = j - d
                }
            }
        }
        f = i + 14;
        k = n;
        c = 270;
        return {
            xa: g,
            ya: l,
            xb: h,
            yb: m,
            xc: i,
            yc: n,
            xd: j,
            yd: o,
            x: f,
            y: k,
            rotate: c
        }
    }
};
BALKANGraph.menuUI = function () { };
BALKANGraph.menuUI.prototype.init = function (b, a) {
    this.obj = b;
    this.wrapper = null;
    this.menu = a
};
BALKANGraph.menuUI.prototype.show = function (m, n, b, h) {
    var l = this;
    this.hide();
    var c = "";
    for (var f in this.menu) {
        var e = this.menu[f].icon;
        var k = this.menu[f].text;
        if (e === undefined) {
            e = BALKANGraph.icon[f](24, 24, "#7A7A7A")
        }
        c += '<div data-item="' + f + '" style="border-bottom: 1px solid #D7D7D7; padding: 7px 10px;color: #7A7A7A;">' + e + "<span>&nbsp;&nbsp;" + k + "</span></div>"
    }
    if (c != "") {
        this.wrapper = document.createElement("div");
        Object.assign(this.wrapper.style, {
            opacity: 0,
            "background-color": "#FFFEFF",
            "box-shadow": "#DCDCDC 0px 1px 2px 0px",
            display: "inline-block",
            border: "1px solid #D7D7D7;border-radius:5px",
            "z-index": 1000,
            position: "absolute",
            "text-align": "left",
            "user-select": "none"
        });
        var j = m - 45;
        this.wrapper.style.left = j + "px";
        this.wrapper.style.top = n + "px";
        this.wrapper.innerHTML = c;
        this.obj.element.appendChild(this.wrapper);
        this.wrapper.style.left = j - this.wrapper.offsetWidth + "px";
        var a = m - this.wrapper.offsetWidth;
        BALKANGraph.anim(this.wrapper, {
            opacity: 0,
            left: j - this.wrapper.offsetWidth
        }, {
                opacity: 1,
                left: a
            }, 300, BALKANGraph.anim.inOutPow);
        var g = this.wrapper.getElementsByTagName("div");
        for (var d = 0; d < g.length; d++) {
            var f = g[d];
            f.addEventListener("mouseover", function () {
                this.style.backgroundColor = "#F0F0F0"
            });
            f.addEventListener("mouseleave", function () {
                this.style.backgroundColor = "#FFFFFF"
            });
            f.addEventListener("click", function () {
                var p = this.getAttribute("data-item");
                var q = l.menu[p].onClick;
                if (q === undefined) {
                    if (p === "add") {
                        var o = {
                            id: BALKANGraph._aQ(),
                            pid: b
                        };
                        l.obj.addNode(o, true)
                    } else {
                        if (p === "edit") {
                            var i = l.obj.getBGNode(b);
                            l.obj.editUI.show(i.id)
                        } else {
                            if (p === "details") {
                                var i = l.obj.getBGNode(b);
                                l.obj.detailUI.show(i.id, true)
                            } else {
                                if (p === "remove") {
                                    var i = l.obj.getBGNode(b);
                                    l.obj.removeUI.show(i.id, true)
                                    //l.obj.removeNode(b, true)
                                } else {
                                    if (p === "svg") {
                                        l.obj.exportSVG("BALKANGraph.svg", false, b)
                                    } else {
                                        if (p === "pdf") {
                                            l.obj.exportPDF("BALKANGraph.pdf", false, b)
                                        } else {
                                            if (p === "png") {
                                                l.obj.exportPNG("BALKANGraph.png", false, b)
                                            } else {
                                                if (p === "csv") {
                                                    l.obj.exportCSV()
                                                } else {
                                                    if (p === "addInGroup") {
                                                        l.obj.group(b, h)
                                                    } else {
                                                        if (p === "addAsChild") {
                                                            l.obj.linkNode(b, h)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    l.menu[p].onClick.call(l.obj, b, h)
                }
                l.hide()
            })
        }
    }
};
BALKANGraph.menuUI.prototype.hide = function () {
    if (this.wrapper != null) {
        this.obj.element.removeChild(this.wrapper);
        this.wrapper = null
    }
};
BALKANGraph.toolbarUI = function () { };
BALKANGraph.toolbarUI.prototype.init = function (b, e) {
    this.obj = b;
    this.toolbar = e;
    if (e) {
        this._aJ = false;
        this.div = document.createElement("div");
        Object.assign(this.div.style, {
            position: "absolute",
            padding: "3px",
            right: this.obj.config.padding + "px",
            bottom: this.obj.config.padding + "px"
        });
        this.div.innerHTML = '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); margin-bottom:7px;border: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="64px" ><g data-tlbr="plus"><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line><line x1="16" y1="8" x2="16" y2="24" stroke-width="3" stroke="#757575"></line></g><line x1="4" y1="32" x2="28" y2="32" stroke-width="1" stroke="#cacaca"></line><g data-tlbr="minus"><rect fill="#f9f9f9" x="0" y="32" width="32" height="32" ></rect><line x1="8" y1="48" x2="24" y2="48" stroke-width="3" stroke="#757575"></line></g></svg><svg data-tlbr="layout" style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M8,24 L16,14 L24,24"></path><path stroke-width="3" fill="none" stroke="#757575" d="M8,16 L16,8 L24,16"></path></svg>';
        this.obj.element.appendChild(this.div);
        this.layouts = document.createElement("div");
        this.layouts.innerHTML = '<svg data-layout="normal" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="35" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="35" y2="41" stroke-width="1"></line></svg><svg data-layout="treeRightOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="35" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="35" x2="35" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="54" y2="54" stroke-width="1"></line></svg><svg data-layout="treeLeftOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="85" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="85" x2="85" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="54" y2="54" stroke-width="1"></line></svg><svg data-layout="mixed" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="41" stroke-width="1"></line><line stroke="#000000" x1="60" x2="60" y1="68" y2="73" stroke-width="1"></line></svg><svg data-layout="tree" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="86" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="54" y2="54" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="86" y2="86" stroke-width="1"></line></svg>';
        this.obj.element.appendChild(this.layouts);
        Object.assign(this.layouts.style, {
            position: "absolute",
            width: "100%",
            left: "0",
            bottom: "-145px",
            "box-shadow": "0px 1px 4px rgba(0,0,0,0.3)",
            "background-color": "#f9f9f9",
            height: "123px",
            "padding-top": "20px",
            "border-top": "1px solid #cacaca"
        });
        this.layoutBtn = this.div.querySelector('[data-tlbr="layout"]');
        var c = this.div.querySelector('[data-tlbr="plus"]');
        var a = this.div.querySelector('[data-tlbr="minus"]');
        var d = this;
        c.addEventListener("click", function () {
            d.obj.zoom(true, null, true)
        });
        a.addEventListener("click", function () {
            d.obj.zoom(false, null, true)
        });
        this.layoutBtn.addEventListener("click", function () {
            if (d._aJ) {
                d.hideLayout()
            } else {
                d.showLayout()
            }
        });
        this.layouts.addEventListener("click", function (f) {
            var g = f.target;
            while (g) {
                if (g.hasAttribute("data-layout")) {
                    g = g.getAttribute("data-layout");
                    d.obj.setLayout(BALKANGraph[g]);
                    break
                }
                g = g.parentNode
            }
        })
    }
};
BALKANGraph.toolbarUI.prototype.showLayout = function () {
    this._aJ = true;
    this.layoutBtn.style.transform = "rotate(180deg) translateX(0px) translateY(0px)";
    BALKANGraph.anim(this.div, {
        bottom: this.obj.config.padding
    }, {
            bottom: this.obj.config.padding + 145
        }, this.obj.config.anim.duration, this.obj.config.anim.func);
    BALKANGraph.anim(this.layouts, {
        bottom: -145
    }, {
            bottom: 0
        }, this.obj.config.anim.duration, this.obj.config.anim.func)
};
BALKANGraph.toolbarUI.prototype.hideLayout = function () {
    this._aJ = false;
    this.layoutBtn.style.transform = "rotate(0deg) translateX(0px) translateY(0px)";
    BALKANGraph.anim(this.div, {
        bottom: this.obj.config.padding + 145
    }, {
            bottom: this.obj.config.padding
        }, this.obj.config.anim.duration, this.obj.config.anim.func);
    BALKANGraph.anim(this.layouts, {
        bottom: 0
    }, {
            bottom: -145
        }, this.obj.config.anim.duration, this.obj.config.anim.func)
};
OrgChart.server = function (a) {
    this.config = a;
    this.visibleNodes = null;
    this.viewBox = null;
    this.action = null;
    this.actionParams = null;
    this.groupChildren = {};
    this.nodes = {};
    this.oldNodes = {};
    this.maxX = null;
    this.maxY = null;
    this.minX = null;
    this.minY = null;
    this.root = null
};
OrgChart.server.prototype.read = function (j, o, d, n, a, b) {
    this.viewBox = n;
    this.action = a;
    this.actionParams = b;
    var e = this.maxX;
    var f = this.maxY;
    var g = this.minX;
    var h = this.minY;
    var m = this.root;
    var i = this.nodes;
    var c = this.groupChildren;
    if (!j) {
        if (i) {
            this.oldNodes = i
        } else {
            this.oldNodes = null
        }
        var l = this._aA();
        e = l.maxX;
        f = l.maxY;
        g = l.minX;
        h = l.minY;
        m = l.roots[0];
        i = l.nodes;
        c = l.groupChildren
    }
    var k = OrgChart.server._I(o, d, this.visibleNodes, this.config, e, f, g, h, this.viewBox, m, this.action, this.actionParams, i, c, this.oldNodes);
    if (a != BALKANGraph.action.exporting) {
        this.maxX = e;
        this.maxY = f;
        this.minX = g;
        this.minY = h;
        this.root = m;
        this.nodes = i;
        this.groupChildren = c;
        this.visibleNodes = k.visibleNodes
    }
    return k
};
OrgChart.server.prototype._aA = function () {
    var j = OrgChart.server._m(this.config, this.action, this.actionParams, this.oldNodes);
    var g = j.nodes;
    var k = j.roots;
    var d = [];
    var e = [];
    var h = [];
    for (var b = 0; b < k.length; b++) {
        OrgChart.server._W(k[b], 0, d, e, h, this.config);
        OrgChart.server._aE(k[b], 0, 0, 0, d, e, this.config)
    }
    OrgChart.server._k(g, this.action, this.actionParams, this.oldNodes, this.config.orientation);
    var a = {
        minX: null,
        minY: null,
        maxX: null,
        maxY: null
    };
    for (var c in g) {
        var f = g[c];
        OrgChart.server._aV(f, a)
    }
    return {
        minX: a.minX,
        minY: a.minY,
        maxX: a.maxX,
        maxY: a.maxY,
        nodes: g,
        roots: k,
        groupChildren: j.groupChildren
    }
};
OrgChart.server.prototype.convertToCSVdata = function () {
    var c = [];
    var f = this;
    var d = function (k) {
        var g = "";
        for (var i = 0; i < c.length; i++) {
            var h;
            if (c[i] == "reportsTo") {
                h = null
            } else {
                if (k[c[i]] == undefined) {
                    h = ""
                } else {
                    h = k[c[i]]
                }
            }
            if (h instanceof Date) {
                h = h.toLocaleString()
            }
            h = h === null ? "" : h.toString();
            var l = h.replace(/"/g, '""');
            if (l.search(/("|,|\n)/g) >= 0) {
                l = '"' + l + '"'
            }
            if (i > 0) {
                g += ","
            }
            g += l
        }
        return g + "\n"
    };
    var a = "";
    for (var b = 0; b < this.config.nodes.length; b++) {
        for (var e in this.config.nodes[b]) {
            if (!BALKANGraph._r(c, e)) {
                c.push(e);
                a += e + ","
            }
        }
    }
    a += "\n";
    for (var b = 0; b < this.config.nodes.length; b++) {
        a += d(this.config.nodes[b])
    }
    return a
};
OrgChart.server.prototype.search = function (n) {
    var t = this;
    if (n == null || n == undefined || n == "") {
        return []
    }
    n = n.toLowerCase();
    var b = function (i, j) {
        var u = i.toString()
            .toLowerCase()
            .indexOf(j);
        var v = i.toString()
            .splice(u + j.length, 0, "</mark>");
        return v.splice(u, 0, "<mark>")
    };
    var f = function (j) {
        for (var i in t.config.nodeBinding) {
            if (t.config.nodeBinding[i] == j) {
                return true
            }
        }
        return false
    };
    var d = [];
    var m = [];
    for (var e = 0; e < this.config.nodes.length; e++) {
        var h = this.config.nodes[e];
        for (var k in h) {
            var l = h[k];
            if (this.config.searchFields.length > 0 && this.config.searchFields.indexOf(k) == -1) {
                continue
            }
            if (l && l.toString()
                .toLowerCase()
                .indexOf(n) != -1 && !BALKANGraph._Z(this.config, k)) {
                d.push({
                    id: h.id,
                    propertyName: k,
                    isId: (k == BALKANGraph.ID),
                    isNodeParam: f(k),
                    weight: l.toString()
                        .toLowerCase()
                        .indexOf(n),
                    data: h
                })
            }
        }
    }

    function c(i, j) {
        if (i.isId == true && j.isId == false) {
            return -1
        }
        if (j.isId == true && i.isId == false) {
            return 1
        }
        if (i.isNodeParam == true && j.isNodeParam == false) {
            return -1
        }
        if (j.isNodeParam == true && i.isNodeParam == false) {
            return 1
        }
        if (i.weight < j.weight) {
            return -1
        }
        if (i.weight > j.weight) {
            return 1
        }
        return 0
    }
    d.sort(c);
    for (var e = 0; e < d.length; e++) {
        if (e == 10) {
            break
        }
        var a = false;
        for (var g = 0; g < m.length; g++) {
            if (m[g].id == d[e].id) {
                a = true;
                break
            }
        }
        if (a) {
            continue
        }
        var s = "";
        var r = "";
        var q = "";
        var o = Object.getOwnPropertyNames(d[e].data);
        if (this.config.searchFields.length > 0) {
            o = this.config.searchFields
        }
        for (var g = 0; g < o.length; g++) {
            var k = o[g];
            var l = d[e].data[k];
            if (k === d[e].propertyName) {
                l = b(l, n)
            }
            if (k == BALKANGraph.TAGS) {
                continue
            } else {
                if (k == BALKANGraph.ID) {
                    r = r + l + ", "
                } else {
                    if (BALKANGraph._Z(this.config, k)) {
                        continue
                    } else {
                        if (f(k) && !BALKANGraph._Z(this.config, k)) {
                            s = s + l + ", "
                        } else {
                            if (!BALKANGraph._Z(this.config, k)) {
                                q = q + l + ", "
                            }
                        }
                    }
                }
            }
        }
        r = r.slice(0, r.length - 2);
        s = s.slice(0, s.length - 2);
        q = q.slice(0, q.length - 2);
        var p = BALKANGraph._L(d[e].tags, this.config.tags, this.config.template);
        m.push({
            id: d[e].id,
            node: new BALKANGraph.node(d[e], null, null, [], p),
            textId: r,
            textInNode: s,
            text: q
        })
    }
    return m
};
OrgChart.server._m = function (n, a, b, I) {
    var q = n.nodes;
    var F = {};
    var E = [];
    var M = [];
    var f = [];
    var u = {};
    var x = false;
    for (var y = 0; y < q.length; y++) {
        var p = q[y];
        var T = Array.isArray(p.tags) ? p.tags.slice(0) : [];
        var s = BALKANGraph._F(T, n.tags);
        var V = BALKANGraph._L(T, n.tags, n.template);
        var Q = Array.isArray(p.spids) ? p.spids : null;
        var D = new BALKANGraph.node(p.id, p.pid, Q, T, V);
        D.isAssistant = (T.indexOf("assistant") != -1);
        if (D.isAssistant && f.indexOf(D.pid) == -1) {
            f.push(D.pid)
        }
        if (s != null) {
            if (!F[s.name]) {
                E.push(s.name);
                var v = new BALKANGraph.node(s.name, p.pid, null, [s.name], s.tag.template);
                v.isGroup = true;
                if (n.orderBy != null) {
                    v.order = p[n.orderBy]
                }
                F[s.name] = v
            }
            D.isChildOfGroup = true;
            D._5 = s.name;
            F[s.name].bgnodes.push(D);
            u[D.id] = s.name;
            x = true
        } else {
            if (n.orderBy != null) {
                D.order = p[n.orderBy]
            }
            F[p.id] = D;
            E.push(p.id)
        }
    }
    if (n.orderBy != null) {
        E.sort(function (d, i) {
            var h = F[d].order;
            var j = F[i].order;
            if (typeof (h) == "number" || typeof (j) == "number") {
                if (h == undefined) {
                    h = -1
                }
                if (j == undefined) {
                    j = -1
                }
                return h - j
            } else {
                if (typeof (h) == "string" || typeof (j) == "string") {
                    if (h == undefined) {
                        h = ""
                    }
                    if (j == undefined) {
                        j = ""
                    }
                    return h.localeCompare(j)
                }
            }
        })
    }
    if (x) {
        for (var y = 0; y < E.length; y++) {
            var D = F[E[y]];
            if (u[D.pid]) {
                D.pid = u[D.pid]
            }
        }
    }
    var m = [];
    for (var y = 0; y < E.length; y++) {
        var z = E[y];
        var D = F[z];
        var H = I ? I[z] : null;
        if (D.pid != undefined && D.pid != null && D.pid != "") {
            var J = F[D.pid];
            if (J) {
                D.parent = J;
                J.children.push(D);
                J.childrenIds.push(D.id)
            } else {
                console.warn("node " + D.id + " is linked to " + D.pid + " but " + D.pid + " does not exist")
            }
        } else {
            M.push(D)
        }
        if (a == BALKANGraph.action.exporting && b.id != undefined) {
            M = [F[b.id]]
        }
        if (H) {
            D.state = H.state;
            if (D.state == BALKANGraph.COLLAPSE) {
                m.push(D.id)
            }
            OrgChart.server._aG(D, H.groupState, n.orientation)
        } else {
            OrgChart.server._aG(D, BALKANGraph.EXPAND, n.orientation)
        }
        OrgChart.server._aq(D, F, a, n, b, u, m);
        OrgChart.server._8(D, F, a, n, b)
    }
    for (var y = 0; y < f.length; y++) {
        var J = F[f[y]];
        var O = new BALKANGraph.node(J.id + "_split_0", J.id, null, [], "split");
        F[O.id] = O;
        var H = I[O.id];
        if (H) {
            F[O.id].state = H.state;
            if (F[O.id].state == BALKANGraph.COLLAPSE) {
                m.push(O.id)
            }
        }
        OrgChart.server._aq(O, F, a, n, b, u, m);
        var e = [];
        for (var B = J.children.length - 1; B >= 0; B--) {
            var l = J.children[B];
            if (l.isAssistant) {
                l.parent = null;
                J.children.splice(B, 1);
                J.childrenIds.splice(B, 1);
                e.splice(0, 0, l.id)
            } else {
                l.pid = O.id;
                l.parent = O;
                O.children.push(l);
                O.childrenIds.push(l.id);
                J.children.splice(B, 1)
            }
        }
        if (e.length % 2) {
            var C = F[e[e.length - 1]];
            var S = OrgChart.templates[C.templateName];
            var W = "transperant_" + C.templateName;
            OrgChart.templates[W] = {
                linkAdjuster: {},
                link: "",
                node: "",
                nodeMenuButton: "",
                size: S.size
            };
            var X = new BALKANGraph.node(J.id + "_transperant", C.pid, null, [], W);
            X.isAssistant = true;
            F[X.id] = X;
            var H = I[X.id];
            if (H) {
                F[X.id].state = H.state;
                if (F[X.id].state == BALKANGraph.COLLAPSE) {
                    m.push(X.id)
                }
            }
            OrgChart.server._aq(X, F, a, n, b, u, m);
            e.splice(e.length - 1, 0, X.id)
        }
        var g = 1;
        for (var B = e.length - 1; B >= 0; B--) {
            if (B % 2 && B != e.length - 1) {
                var P = new BALKANGraph.node(J.id + "_split_" + g, null, null, [], "split");
                F[P.id] = P;
                var H = I[P.id];
                if (H) {
                    F[P.id].state = H.state;
                    if (F[P.id].state == BALKANGraph.COLLAPSE) {
                        m.push(P.id)
                    }
                }
                OrgChart.server._aq(P, F, a, n, b, u, m);
                e.splice(B, 0, P.id);
                g++
            } else {
                if (B % 2) {
                    e.splice(B, 0, O.id)
                }
            }
        }
        for (var B = 0; B < e.length; B = B + 3) {
            var L = null;
            if (B == 0) {
                L = J
            } else {
                L = F[e[B - 2]]
            }
            var r = F[e[B]];
            var N = F[e[B + 1]];
            var U = F[e[B + 2]];
            r.parent = L;
            r.pid = L.id;
            N.parent = L;
            N.pid = L.id;
            U.parent = L;
            U.pid = L.id;
            L.children.push(r);
            L.children.push(N);
            L.children.push(U);
            L.childrenIds.push(r.id);
            L.childrenIds.push(N.id);
            L.childrenIds.push(U.id)
        }
    }
    if (a == BALKANGraph.action.centerNode) {
        var k = F[b.id];
        if (!k) {
            k = F[u[b.id]];
            OrgChart.server._aG(k, BALKANGraph.EXPAND, n.orientation)
        }
        k.state = BALKANGraph.EXPAND;
        var A = m.indexOf(k.id);
        if (A != -1) {
            m.splice(A, 1)
        }
        var J = OrgChart.server._M(k);
        var K = k.id;
        while (J != null) {
            var A = m.indexOf(J.id);
            if (A != -1) {
                m.splice(A, 1)
            }
            J.state = BALKANGraph.EXPAND;
            if (b.parentState === BALKANGraph.COLLAPSE_PARENT_NEIGHBORS) {
                for (var y = 0; y < J.childrenIds.length; y++) {
                    var l = F[J.childrenIds[y]];
                    if (!OrgChart.server._as(l) && !l.isAssistant && l.id != K) {
                        var A = m.indexOf(J.childrenIds[y]);
                        if (A == -1) {
                            m.push(J.childrenIds[y])
                        }
                        l.state = BALKANGraph.COLLAPSE
                    }
                }
            }
            K = J.id;
            J = OrgChart.server._M(J)
        }
        if (b.childrenState === BALKANGraph.COLLAPSE_SUB_CHILDRENS) {
            for (var y = 0; y < k.childrenIds.length; y++) {
                var A = m.indexOf(k.childrenIds[y]);
                if (A != -1) {
                    m.splice(A, 1)
                }
                var l = F[k.childrenIds[y]];
                l.state = BALKANGraph.EXPAND;
                if (l.isAssistant || OrgChart.server._as(l)) {
                    continue
                }
                for (var B = 0; B < l.childrenIds.length; B++) {
                    var R = F[l.childrenIds[B]];
                    var A = m.indexOf(l.childrenIds[B]);
                    if (A == -1) {
                        m.push(l.childrenIds[B])
                    }
                    R.state = BALKANGraph.COLLAPSE
                }
            }
        }
    }
    if (a == BALKANGraph.action.exporting && b.expandChildren == true && D) {
        m = []
    }
    for (var y = 0; y < m.length; y++) {
        var D = F[m[y]];
        var J = D.parent;
        if (J) {
            for (var B = J.children.length - 1; B >= 0; B--) {
                if (J.children[B] == D) {
                    if (J.collapsedChildrenIds.indexOf(D.id) == -1) {
                        J.collapsedChildrenIds.push(D.id)
                    }
                    J.children.splice(B, 1);
                    if (D.templateName == "split" || J.templateName == "split") {
                        var L = D.parent;
                        if (L) {
                            while (L.templateName == "split") {
                                L = L.parent
                            }
                            for (var G = 0; G < L.childrenIds.length; G++) {
                                var c = L.childrenIds[G];
                                if (L.collapsedChildrenIds.indexOf(c) == -1) {
                                    L.collapsedChildrenIds.push(c)
                                }
                            }
                        }
                    } else {
                        D.parent = null
                    }
                }
            }
        }
    }
    if (n.layout == BALKANGraph.mixed) {
        for (var y = 0; y < E.length; y++) {
            var D = F[E[y]];
            if (D.childrenIds.length == 0 && !D.isAssistant && D.templateName != "split") {
                var J = D.parent;
                if (J) {
                    for (var B = J.children.length - 1; B >= 0; B--) {
                        var l = J.children[B];
                        if (l != D && l.childrenIds.length == 0 && !l.isAssistant && l.templateName != "split") {
                            l.parent = D;
                            l.pid = D.id;
                            l.layout = BALKANGraph.mixed;
                            J.children.splice(B, 1);
                            var w = D.children.length;
                            D.children[w] = l;
                            D.layout = BALKANGraph.mixed
                        }
                    }
                }
            }
        }
    }
    if (n.layout == BALKANGraph.tree || n.layout == BALKANGraph.treeRightOffset || n.layout == BALKANGraph.treeLeftOffset) {
        var Z = [];
        for (var y = 0; y < E.length; y++) {
            var D = F[E[y]];
            if (D.childrenIds.length == 0 && !D.isAssistant && D.templateName != "split") {
                var J = D.parent;
                if (J) {
                    if (Z.indexOf(J.id) == -1) {
                        Z.push(J.id)
                    }
                }
            }
        }
        for (var y = 0; y < Z.length; y++) {
            var J = F[Z[y]];
            var O = new BALKANGraph.node(J.id + "_split_0", J.id, null, [], "split");
            F[O.id] = O;
            O.layout = BALKANGraph.tree;
            var Y = [];
            for (var B = J.children.length - 1; B >= 0; B--) {
                var l = J.children[B];
                if (l.childrenIds.length == 0 && !l.isAssistant && l.templateName != "split") {
                    var l = J.children[B];
                    l.parent = null;
                    l.layout = BALKANGraph.tree;
                    J.children.splice(B, 1);
                    J.childrenIds.splice(B, 1);
                    if (n.layout == BALKANGraph.treeRightOffset) {
                        Y.splice(0, 0, l.id)
                    }
                    if (n.layout == BALKANGraph.treeLeftOffset || n.layout == BALKANGraph.treeRightOffset) {
                        var W = "transperant_" + l.templateName;
                        OrgChart.templates[W] = {
                            linkAdjuster: {},
                            link: "",
                            node: "",
                            nodeMenuButton: "",
                            size: [0, 0]
                        };
                        var X = new BALKANGraph.node(l.id + "_transperant", null, null, [], W);
                        X.layout = BALKANGraph.tree;
                        F[X.id] = X;
                        Y.splice(0, 0, X.id)
                    }
                    if (n.layout != BALKANGraph.treeRightOffset) {
                        Y.splice(0, 0, l.id)
                    }
                }
            }
            var g = 1;
            for (var B = Y.length - 1; B >= 0; B--) {
                if (B % 2 && B != Y.length - 1) {
                    var P = new BALKANGraph.node(J.id + "_split_" + g, null, null, [], "split");
                    P.layout = BALKANGraph.tree;
                    F[P.id] = P;
                    Y.splice(B, 0, P.id);
                    g++
                } else {
                    if (B % 2) {
                        Y.splice(B, 0, O.id)
                    }
                }
            }
            for (var B = 0; B < Y.length; B = B + 3) {
                var L = null;
                if (B == 0) {
                    L = J
                }
                var r = F[Y[B]];
                var N = F[Y[B + 1]];
                var U = F[Y[B + 2]];
                if (B != 0) {
                    L = F[Y[B - 3]]
                }
                if (B != 0 && !N) {
                    L = F[Y[B - 2]]
                }
                r.parent = L;
                r.pid = L.id;
                L.children.push(r);
                J.childrenIds.push(r.id);
                if (N) {
                    if (B != 0) {
                        L = F[Y[B - 2]]
                    }
                    N.parent = L;
                    N.pid = L.id;
                    L.children.push(N);
                    J.childrenIds.push(N.id)
                }
                if (U) {
                    if (B != 0) {
                        L = F[Y[B - 1]]
                    }
                    U.parent = L;
                    U.pid = L.id;
                    L.children.push(U);
                    J.childrenIds.push(U.id)
                }
            }
        }
    }
    return {
        nodes: F,
        roots: M,
        groupChildren: u
    }
};
OrgChart.server._as = function (a) {
    return a.templateName == "split"
};
OrgChart.server._M = function (a) {
    if (!a) {
        return null
    }
    if (!a.parent) {
        return null
    }
    if (a.parent.templateName != "split") {
        return a.parent
    }
    var b = a.parent;
    while (b && b.templateName == "split") {
        b = b.parent
    }
    return b
};
OrgChart.server._aq = function (k, l, a, d, b, f, c) {
    if (a == BALKANGraph.action.init && k) {
        if (k.tags) {
            for (var g = 0; g < k.tags.length; g++) {
                var n = k.tags[g];
                if (d.tags && d.tags[n] && d.tags[n].state != undefined) {
                    if (d.tags[n].state == BALKANGraph.COLLAPSE) {
                        c.push(k.id)
                    }
                    k.state = d.tags[n].state
                }
            }
        }
        if (d.collapse.level) {
            var j = 0;
            var m = l[k.pid];
            while (m != null && j <= d.collapse.level) {
                m = l[m.pid];
                j++
            }
            if (j >= d.collapse.level) {
                var e = false;
                if (Array.isArray(d.expand.nodes)) {
                    if (d.expand.allChildren) {
                        m = l[k.pid];
                        while (m != null) {
                            if (d.expand.nodes.indexOf(m.id) != -1) {
                                e = true;
                                break
                            }
                            m = l[m.pid]
                        }
                        if (!e) {
                            e = (d.expand.nodes.indexOf(k.id) != -1)
                        }
                    } else {
                        e = (d.expand.nodes.indexOf(k.id) != -1)
                    }
                }
                if (!e && d.collapse.allChildren) {
                    c.push(k.id);
                    k.state = BALKANGraph.COLLAPSE
                } else {
                    if (!e && !d.collapse.allChildren && j == d.collapse.level) {
                        c.push(k.id);
                        k.state = BALKANGraph.COLLAPSE
                    }
                }
            }
        }
    } else {
        if (a == BALKANGraph.action.expandCollapse && b.ids.indexOf(k.id) != -1) {
            if (b.state == BALKANGraph.COLLAPSE) {
                c.push(k.id)
            } else {
                if (b.state == BALKANGraph.EXPAND) {
                    var h = c.indexOf(k.id);
                    if (h != -1) {
                        c.splice(h, 1)
                    }
                }
            }
            k.state = b.state
        }
    }
};
OrgChart.server._8 = function (e, f, a, c, b) {
    if (a == BALKANGraph.action.exporting && b.expandChildren == true && e) {
        OrgChart.server._aG(e, BALKANGraph.EXPAND, c.orientation);
        return
    } else {
        if (a == BALKANGraph.action.init && e) {
            if (e.isGroup) {
                var d = c.tags[e.id].groupState;
                OrgChart.server._aG(e, d, c.orientation)
            }
        }
    }
    if (a != BALKANGraph.action.groupMaxMin) {
        return
    }
    OrgChart.server._aG(f[b.id], b.state, c.orientation)
};
OrgChart.server._aD = function (e, f) {
    if (e.isGroup && e.groupState == BALKANGraph.EXPAND) {
        var k = OrgChart.templates[e.templateName];
        var a = 0;
        var j = 0;
        if (k.layout_type == 0) {
            switch (f) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.top_left:
                case BALKANGraph.orientation.bottom_left:
                    var h = 0;
                    for (var d = 0; d < e.bgnodes.length; d++) {
                        var b = e.bgnodes[d];
                        b.x = e._6._y / 2 - b.w / 2;
                        b.y = e._6._b / 2 - b.h / 2 + h;
                        h += b.h + k.groupNodesSeparation
                    }
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.right_top:
                case BALKANGraph.orientation.left_top:
                    var g = 0;
                    for (var d = 0; d < e.bgnodes.length; d++) {
                        var b = e.bgnodes[d];
                        b.y = e._6._b / 2 - b.h / 2;
                        b.x = e._6._y / 2 - b.w / 2 + g;
                        g += b.w + k.groupNodesSeparation
                    }
                    break
            }
        } else {
            for (var d = 0; d < e.bgnodes.length; d++) {
                var b = e.bgnodes[d];
                b.x = e._6._y / 2 - b.w / 2 + k.groupNodesSeparation + (e._6._y * a + k.groupNodesSeparation * a);
                b.y = e._6._b / 2 - b.h / 2 + k.groupNodesSeparation + (e._6._b * j + k.groupNodesSeparation * j);
                if (a >= e._6._n - 1) {
                    a = 0;
                    j++
                } else {
                    a++
                }
            }
        }
    }
};
OrgChart.server._0 = function (j, o, k) {
    var n = OrgChart.templates[o];
    var p = n.size[0];
    var b = n.size[1];
    if (j.isGroup && j.groupState == BALKANGraph.EXPAND) {
        var e = j.bgnodes.length;
        var a = 0;
        var m = null;
        p = 0;
        b = 0;
        var g = 0;
        var f = 0;
        if (n.layout_type == 0) {
            switch (k) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.top_left:
                case BALKANGraph.orientation.bottom_left:
                    a = 1;
                    m = e;
                    for (var d = 0; d < j.bgnodes.length; d++) {
                        g = Math.max(j.bgnodes[d].w, g);
                        f = Math.max(j.bgnodes[d].h, f);
                        b += j.bgnodes[d].h + n.groupNodesSeparation
                    }
                    b -= n.groupNodesSeparation;
                    p = g;
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.right_top:
                case BALKANGraph.orientation.left_top:
                    a = e;
                    m = 1;
                    for (var d = 0; d < j.bgnodes.length; d++) {
                        g = Math.max(j.bgnodes[d].w, g);
                        f = Math.max(j.bgnodes[d].h, f);
                        p += j.bgnodes[d].w + n.groupNodesSeparation
                    }
                    p -= n.groupNodesSeparation;
                    b = f;
                    break
            }
        } else {
            switch (k) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.top_left:
                case BALKANGraph.orientation.bottom_left:
                    while (m == null || m > a) {
                        a++;
                        m = e / a
                    }
                    if (a == 2 && m == 1.5) {
                        a = 3;
                        m = 1
                    }
                    m = Math.ceil(m);
                    for (var d = 0; d < j.bgnodes.length; d++) {
                        g = Math.max(j.bgnodes[d].w, g);
                        f = Math.max(j.bgnodes[d].h, f)
                    }
                    p = g * a + n.groupNodesSeparation * a + n.groupNodesSeparation + n.groupPadding[1] + n.groupPadding[3];
                    b = f * m + n.groupNodesSeparation * m + n.groupNodesSeparation + n.groupPadding[0] + n.groupPadding[2];
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.right_top:
                case BALKANGraph.orientation.left_top:
                    a = null;
                    m = 0;
                    while (a == null || a > m) {
                        m++;
                        a = e / m
                    }
                    if (m == 2 && a == 1.5) {
                        m = 3;
                        a = 1
                    }
                    a = Math.ceil(a);
                    for (var d = 0; d < j.bgnodes.length; d++) {
                        g = Math.max(j.bgnodes[d].w, g);
                        f = Math.max(j.bgnodes[d].h, f)
                    }
                    p = g * a + n.groupNodesSeparation * a + n.groupNodesSeparation + n.groupPadding[1] + n.groupPadding[3];
                    b = f * m + n.groupNodesSeparation * m + n.groupNodesSeparation + n.groupPadding[0] + n.groupPadding[2];
                    break
            }
        }
        j._6 = {
            _rows: m,
            _n: a,
            _y: g,
            _b: f,
        }
    }
    j.w = p;
    j.h = b
};
OrgChart.server._aG = function (a, c, b) {
    if (!a) { }
    a.groupState = c;
    OrgChart.server._0(a, a.templateName, b)
};
OrgChart.server._X = function (b, a) {
    return b.children[a]
};
OrgChart.server._R = function (a) {
    return OrgChart.server._X(a, 0)
};
OrgChart.server._V = function (a) {
    return OrgChart.server._X(a, a.children.length - 1)
};
OrgChart.server._E = function (a) {
    return a.children.length
};
OrgChart.server._K = function (a) {
    if (a.rightNeighbor != null && a.rightNeighbor.parent == a.parent) {
        return a.rightNeighbor
    } else {
        return null
    }
};
OrgChart.server._G = function (a) {
    if ((a.leftNeighbor != null && a.leftNeighbor.parent == a.parent)) {
        return a.leftNeighbor
    } else {
        return null
    }
};
OrgChart.server._Y = function (b, a) {
    switch (a.orientation) {
        case BALKANGraph.orientation.top:
        case BALKANGraph.orientation.top_left:
        case BALKANGraph.orientation.bottom:
        case BALKANGraph.orientation.bottom_left:
            return b.w;
        case BALKANGraph.orientation.right:
        case BALKANGraph.orientation.right_top:
        case BALKANGraph.orientation.left:
        case BALKANGraph.orientation.left_top:
            return b.h
    }
    return 0
};
OrgChart.server._T = function (g, d, e) {
    if (d >= e) {
        return g
    }
    if (OrgChart.server._E(g) == 0) {
        return null
    }
    var f = OrgChart.server._E(g);
    for (var a = 0; a < f; a++) {
        var b = OrgChart.server._X(g, a);
        var c = OrgChart.server._T(b, d + 1, e);
        if (c != null) {
            return c
        }
    }
    return null
};
OrgChart.server._ax = function (e, b, f, a) {
    if (e.x == null || e.y == null) {
        return
    }
    if (b.lazyLoading && a !== BALKANGraph.action.exporting) {
        function d(i, j) {
            var r = i.x;
            var s = i.y;
            var q = i.w;
            var g = i.h;
            var k = j[0] - BALKANGraph.LAZY_LOADING_FACTOR;
            var l = j[2] + BALKANGraph.LAZY_LOADING_FACTOR + j[0];
            var m = j[1] - BALKANGraph.LAZY_LOADING_FACTOR;
            var o = j[3] + BALKANGraph.LAZY_LOADING_FACTOR + j[1];
            var p = (r + q > k && l > r);
            if (p) {
                p = (s + g > m && o > s)
            }
            return p
        }
        if (d(e, f)) {
            return true
        } else {
            for (var c = 0; c < e.children.length; c++) {
                if (d(e.children[c], f)) {
                    return true
                }
            }
        }
        return false
    }
    return true
};
OrgChart.server.getAllFields = function (a) {
    var b = [BALKANGraph.TAGS];
    for (var c in a.nodeParams) {
        b.push(a.nodeBinding[c])
    }
    for (var c = 0; c < a.nodes.length; c++) {
        for (var d in a.nodes[c]) {
            if (d === BALKANGraph.ID) {
                continue
            }
            if (d === BALKANGraph.TAGS) {
                continue
            }
            if (d === BALKANGraph.NODES) {
                continue
            }
            if (d === BALKANGraph.PID) {
                continue
            }
            if (a.nodeBinding[d]) {
                continue
            }
            if (!BALKANGraph._r(b, d)) {
                b.push(d)
            }
        }
    }
    return b
};
OrgChart.server._c = function (n, h, a) {
    var b = OrgChart.server._R(n);
    var c = b.leftNeighbor;
    var d = 1;
    for (var e = BALKANGraph.MAX_DEPTH - h; b != null && c != null && d <= e;) {
        var m = 0;
        var i = 0;
        var p = b;
        var g = c;
        for (var f = 0; f < d; f++) {
            p = p.parent;
            g = g.parent;
            m += p._ah;
            i += g._ah
        }
        var t = a.subtreeSeparation;
        if (n.leftNeighbor && n.leftNeighbor.layout == 2) {
            t = 0
        }
        var u = (c._ap + i + OrgChart.server._Y(c, a) + t) - (b._ap + m);
        if (u > 0) {
            var r = n;
            var o = 0;
            for (; r != null && r != g; r = OrgChart.server._G(r)) {
                o++
            }
            if (r != null) {
                var s = n;
                var q = u / o;
                for (; s != g; s = OrgChart.server._G(s)) {
                    s._ap += u;
                    s._ah += u;
                    u -= q
                }
            }
        }
        d++;
        if (OrgChart.server._E(b) == 0) {
            b = OrgChart.server._T(n, 0, d)
        } else {
            b = OrgChart.server._R(b)
        }
        if (b != null) {
            c = b.leftNeighbor
        }
    }
};
OrgChart.server._k = function (j, a, b, l, m) {
    if (a != BALKANGraph.action.expandCollapse && a != BALKANGraph.action.groupMaxMin && a != BALKANGraph.action.centerNode && a != BALKANGraph.action.update && a != BALKANGraph.action.insert) {
        return
    }
    if (a == BALKANGraph.action.update && (!b || b.id == undefined)) {
        return
    }
    var f = b.id;
    if (a == BALKANGraph.action.groupMaxMin && j[f].pid) {
        f = j[f].pid
    }
    var g = j[f];
    if (!g) {
        for (var h in j) {
            var d = j[h].bgnodes;
            for (var e = 0; e < d.length; e++) {
                if (d[e].id == f) {
                    g = j[h];
                    break
                }
            }
        }
    }
    var k = l[f];
    if (!k) {
        for (var h in l) {
            var d = l[h].bgnodes;
            for (var e = 0; e < d.length; e++) {
                if (d[e].id == f) {
                    k = l[h];
                    break
                }
            }
        }
    }
    var c = {
        x: k.x - g.x,
        y: k.y - g.y
    };
    for (var f in j) {
        switch (m) {
            case BALKANGraph.orientation.top:
            case BALKANGraph.orientation.top_left:
            case BALKANGraph.orientation.bottom:
            case BALKANGraph.orientation.bottom_left:
                j[f].x += c.x;
                break;
            case BALKANGraph.orientation.right:
            case BALKANGraph.orientation.right_top:
            case BALKANGraph.orientation.left:
            case BALKANGraph.orientation.left_top:
                j[f].y += c.y;
                break
        }
    }
};
OrgChart.server._B = function (c) {
    if (!c) {
        return
    }
    var b = c;

    function a(e) {
        if (e.level > b.level) {
            b = e
        }
        for (var d = 0; d < e.children.length; d++) {
            a(e.children[d])
        }
    }
    a(c);
    return b
};
OrgChart.server._I = function (K, n, D, j, r, s, t, u, H, k, c, d, A, l, C) {
    var I = {};
    var f = {
        top: null,
        left: null,
        bottom: null,
        right: null,
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    };
    var e = [
        [],
        [],
        []
    ];
    var p = r - t + j.padding * 2;
    var q = s - u + j.padding * 2;
    var F = BALKANGraph.getScale(H, K, n, j.scaleInitial, p, q);
    f.top = u - j.padding;
    f.left = t - j.padding;
    f.bottom = s + j.padding - n / F;
    f.right = r + j.padding - K / F;
    f.maxX = r;
    f.minX = t;
    f.maxY = s;
    f.minY = u;
    if (H == null && j.align == BALKANGraph.CENTER) {
        var J = Math.ceil(K / F);
        var m = Math.ceil(n / F);
        var L = 0;
        var M = 0;
        if (J - j.padding * 2 >= r - t) {
            L = (r + t) / 2 - J / 2;
            switch (j.orientation) {
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    L = (t - r) / 2 - J / 2;
                    break
            }
        } else {
            L = k.x - J / 2 + OrgChart.server._Y(k, j) / 2;
            switch (j.orientation) {
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    L = -((J / 2) - (t - r) / 2);
                    if (L < j.padding - J) {
                        L = j.padding - J
                    }
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.bottom_left:
                case BALKANGraph.orientation.top_left:
                case BALKANGraph.orientation.left_top:
                    L = -((J / 2) - (r - t) / 2);
                    if (L > -j.padding) {
                        L = -j.padding
                    }
                    break
            }
        }
        if (m - j.padding * 2 >= s - u) {
            M = (s + u) / 2 - m / 2;
            switch (j.orientation) {
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    M = (u - s) / 2 - m / 2;
                    break
            }
        } else {
            M = -((m / 2) - (s - u) / 2);
            if (M > -j.padding) {
                M = -j.padding
            }
            switch (j.orientation) {
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    M = -((m / 2) - (u - s) / 2);
                    if (M < j.padding - m) {
                        M = j.padding - m
                    }
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.right:
                    M = k.y - m / 2 + OrgChart.server._Y(k, j) / 2;
                    break
            }
        }
        H = [L, M, J, m]
    } else {
        if (H == null && j.align == BALKANGraph.ORIENTATION) {
            var J = Math.ceil(K / F);
            var m = Math.ceil(n / F);
            var L = 0;
            var M = 0;
            switch (j.orientation) {
                case BALKANGraph.orientation.top:
                    L = k.x - J / 2 + OrgChart.server._Y(k, j) / 2;
                    M = -j.padding;
                    break;
                case BALKANGraph.orientation.bottom:
                    L = k.x - J / 2 + OrgChart.server._Y(k, j) / 2;
                    M = j.padding - m;
                    break;
                case BALKANGraph.orientation.left:
                    L = -j.padding;
                    M = k.y - m / 2 + OrgChart.server._Y(k, j) / 2;
                    break;
                case BALKANGraph.orientation.right:
                    L = j.padding - J;
                    M = k.y - m / 2 + OrgChart.server._Y(k, j) / 2;
                    break;
                case BALKANGraph.orientation.top_left:
                    L = -j.padding;
                    M = -j.padding;
                    break;
                case BALKANGraph.orientation.right_top:
                    L = j.padding - J;
                    M = -j.padding;
                    break;
                case BALKANGraph.orientation.left_top:
                    L = -j.padding;
                    M = -j.padding;
                    break;
                case BALKANGraph.orientation.bottom_left:
                    L = -j.padding;
                    M = j.padding - m;
                    break
            }
            H = [L, M, J, m]
        }
    }
    var i = null;
    if (c == BALKANGraph.action.expandCollapse) {
        i = A[d.id]
    }
    if (c == BALKANGraph.action.centerNode) {
        var g = A[d.id];
        if (!g) {
            g = A[l[d.id]]
        }
        H[0] = (g.x + g.w / 2 - H[2] / 2);
        H[1] = (g.y + g.h / 2 - H[3] / 2);
        if (H[0] < f.left && H[0] < f.right) {
            H[0] = f.left > f.right ? f.right : f.left
        }
        if (H[0] > f.right && H[0] > f.left) {
            H[0] = f.left > f.right ? f.left : f.right
        }
        if (H[1] < f.top && H[1] < f.bottom) {
            H[1] = f.top > f.bottom ? f.bottom : f.top
        }
        if (H[1] > f.bottom && H[1] > f.top) {
            H[1] = f.top > f.bottom ? f.top : f.bottom
        }
    }
    if (c == BALKANGraph.action.insert || c == BALKANGraph.action.expandCollapse || c == BALKANGraph.action.update) {
        var G = null;
        if (c == BALKANGraph.action.insert && d && d.insertedNodeId != undefined && d.insertedNodeId != null) {
            G = A[d.insertedNodeId];
            if (!G) {
                G = A[l[d.insertedNodeId]]
            }
        } else {
            if (c == BALKANGraph.action.update && d && d.visId != undefined && d.visId != null) {
                G = A[d.visId];
                if (!G) {
                    G = A[l[d.visId]]
                }
            } else {
                if (c == BALKANGraph.action.expandCollapse && d && d.id != undefined && d.id != null) {
                    G = A[d.id];
                    if (!G) {
                        G = A[l[d.id]]
                    }
                    G = OrgChart.server._B(G, A)
                }
            }
        }
        if (G) {
            switch (j.orientation) {
                case BALKANGraph.orientation.top:
                case BALKANGraph.orientation.top_left:
                    var v = (G.y + G.h - H[3] + j.padding);
                    if (H[1] < v) {
                        H[1] = v
                    }
                    break;
                case BALKANGraph.orientation.bottom:
                case BALKANGraph.orientation.bottom_left:
                    var v = (G.y - j.padding);
                    if (H[1] > v) {
                        H[1] = v
                    }
                    break;
                case BALKANGraph.orientation.right:
                case BALKANGraph.orientation.right_top:
                    var v = (G.x - j.padding);
                    if (H[0] > v) {
                        H[0] = v
                    }
                    break;
                case BALKANGraph.orientation.left:
                case BALKANGraph.orientation.left_top:
                    var v = (G.x + G.w - H[2] + j.padding);
                    if (H[0] < v) {
                        H[0] = v
                    }
                    break
            }
        }
    }
    for (var o in A) {
        var z = A[o];
        if (OrgChart.server._ax(z, j, H, c)) {
            I[z.id] = z;
            var b = null;
            if (c == BALKANGraph.action.expandCollapse && C && C[z.id]) {
                var B = C[z.id];
                b = {
                    x: B.x,
                    y: B.y,
                };
                var i = A[d.id];
                if (i) {
                    var E = z.parent;
                    while (E != null && d.ids.indexOf(z.id) == -1 && d.ids.indexOf(E.id) == -1) {
                        E = E.parent
                    }
                    if (E) {
                        b = {
                            x: i.x + i.w / 2 - z.w / 2,
                            y: i.y + i.h / 2 - z.h / 2
                        }
                    }
                }
            } else {
                if (c == BALKANGraph.action.centerNode && C && C[z.id]) {
                    var B = C[z.id];
                    if (B.x != null && B.y != null) {
                        b = {
                            x: B.x,
                            y: B.y,
                        }
                    }
                    var g = A[d.id];
                    if (g) {
                        var E = z.parent;
                        if (E && E.id == d.id) {
                            b = {
                                x: g.x + g.w / 2 - z.w / 2,
                                y: g.y + g.h / 2 - z.h / 2
                            }
                        }
                    }
                } else {
                    if (c == BALKANGraph.action.groupMaxMin && C && C[z.id]) {
                        var B = C[z.id];
                        b = {
                            x: B.x,
                            y: B.y,
                        }
                    } else {
                        if (c == BALKANGraph.action.insert && d && d.insertedNodeId == z.id) {
                            b = {
                                x: z.parent.x,
                                y: z.parent.y,
                            }
                        } else {
                            if ((c == BALKANGraph.action.update || c == BALKANGraph.action.insert) && C && C[z.id]) {
                                var B = C[z.id];
                                b = {
                                    x: B.x,
                                    y: B.y,
                                }
                            } else {
                                if (c !== BALKANGraph.action.exporting) {
                                    if (D && !D[z.id]) {
                                        e[0].push(z.id);
                                        e[1].push({
                                            opacity: 0
                                        });
                                        e[2].push({
                                            opacity: 1
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (b != null) {
                if (b.x != z.x || b.y != z.y) {
                    e[0].push(z.id);
                    e[1].push({
                        transform: [1, 0, 0, 1, b.x, b.y]
                    });
                    e[2].push({
                        transform: [1, 0, 0, 1, z.x, z.y]
                    })
                }
            }
        }
    }
    return {
        animations: e,
        boundary: f,
        viewBox: H,
        visibleNodes: I,
        allFields: OrgChart.server.getAllFields(j)
    }
};
OrgChart.server._aR = function (c, a, b) {
    if (b[a] == null) {
        b[a] = 0
    }
    if (b[a] < c.h) {
        b[a] = c.h
    }
};
OrgChart.server._aF = function (c, a, b) {
    if (b[a] == null) {
        b[a] = 0
    }
    if (b[a] < c.w) {
        b[a] = c.w
    }
};
OrgChart.server._aT = function (b, a, c) {
    if (c[a] && c[a].id === b.id) {
        return
    }
    b.leftNeighbor = c[a];
    if (b.leftNeighbor != null) {
        b.leftNeighbor.rightNeighbor = b
    }
    c[a] = b
};
OrgChart.server._aE = function (h, c, l, n, e, f, a) {
    if (c <= BALKANGraph.MAX_DEPTH) {
        var m = h._ap + l;
        var o = n;
        var g = 0;
        var i = 0;
        var b = false;
        switch (a.orientation) {
            case BALKANGraph.orientation.top:
            case BALKANGraph.orientation.top_left:
            case BALKANGraph.orientation.bottom:
            case BALKANGraph.orientation.bottom_left:
                g = e[c];
                i = h.h;
                break;
            case BALKANGraph.orientation.right:
            case BALKANGraph.orientation.right_top:
            case BALKANGraph.orientation.left:
            case BALKANGraph.orientation.left_top:
                g = f[c];
                b = true;
                i = h.w;
                break
        }
        h.x = m;
        h.y = o;
        if (h.templateName == "split" || (h.isAssistant || h.layout == 2)) {
            h.y = o + g / 2 - i / 2
        }
        if (b) {
            var k = h.x;
            h.x = h.y;
            h.y = k
        }
        switch (a.orientation) {
            case BALKANGraph.orientation.bottom:
            case BALKANGraph.orientation.bottom_left:
                h.y = -h.y - i;
                break;
            case BALKANGraph.orientation.right:
            case BALKANGraph.orientation.right_top:
                h.x = -h.x - i;
                break
        }
        if (OrgChart.server._E(h) != 0) {
            var d = a.levelSeparation;
            if (h.layout == BALKANGraph.mixed || h.layout == BALKANGraph.tree) {
                d = a.mixedHierarchyNodesSeparation
            }
            OrgChart.server._aE(OrgChart.server._R(h), c + 1, l + h._ah, n + g + d, e, f, a)
        }
        var j = OrgChart.server._K(h);
        if (j != null) {
            OrgChart.server._aE(j, c, l, n, e, f, a)
        }
    }
};
OrgChart.server._W = function (m, g, h, j, o, a) {
    var f = null;
    m.x = 0;
    m.y = 0;
    m._ap = 0;
    m._ah = 0;
    m.level = g;
    m.leftNeighbor = null;
    m.rightNeighbor = null;
    OrgChart.server._aR(m, g, h);
    OrgChart.server._aF(m, g, j);
    OrgChart.server._aT(m, g, o);
    OrgChart.server._aD(m, a.orientation);
    if (OrgChart.server._E(m) == 0 || g == BALKANGraph.MAX_DEPTH) {
        f = OrgChart.server._G(m);
        if (f != null) {
            var p = a.siblingSeparation;
            if (f.layout == 2) {
                p = a.mixedHierarchyNodesSeparation
            }
            m._ap = f._ap + OrgChart.server._Y(f, a) + p
        } else {
            m._ap = 0
        }
    } else {
        var l = OrgChart.server._E(m);
        for (var c = 0; c < l; c++) {
            var d = OrgChart.server._X(m, c);
            OrgChart.server._W(d, g + 1, h, j, o, a)
        }
        var b = OrgChart.server._R(m);
        var e = OrgChart.server._V(m);
        var k = b._ap + ((e._ap - b._ap) + OrgChart.server._Y(e, a)) / 2;
        k -= OrgChart.server._Y(m, a) / 2;
        f = OrgChart.server._G(m);
        if (f != null) {
            var p = a.siblingSeparation;
            if (f.layout == 2) {
                p = a.mixedHierarchyNodesSeparation
            }
            m._ap = f._ap + OrgChart.server._Y(f, a) + p;
            m._ah = m._ap - k;
            OrgChart.server._c(m, g, a)
        } else {
            if (a.orientation <= 3) {
                m._ap = k
            } else {
                m._ap = 0
            }
        }
    }
};
OrgChart.server._aV = function (c, a) {
    if (a.minX == null || ((c.x != null) && (c.x < a.minX))) {
        a.minX = c.x
    }
    if (a.minY == null || ((c.y != null) && (c.y < a.minY))) {
        a.minY = c.y
    }
    if (a.maxX == null || ((c.x != null) && (c.x + c.w > a.maxX))) {
        a.maxX = c.x + c.w
    }
    if (a.maxY == null || ((c.y != null) && (c.y + c.h > a.maxY))) {
        a.maxY = c.y + c.h
    }
};
OrgChart.prototype.exportPDF = function (b, a, c) {
    this._Q(b, a, c, "pdf", "application/pdf")
};
OrgChart.prototype.exportPNG = function (b, a, c) {
    this._Q(b, a, c, "png", "image/png")
};
OrgChart.prototype.exportSVG = function (b, a, c) {
    this._Q(b, a, c, "svg", "image/svg+xml")
};
OrgChart.prototype._Q = function (c, a, f, b, d) {
    var i = this;
    if (this.config.onExportStart) {
        var h = this.config.onExportStart(this, b, c);
        if (h === false) {
            return false
        }
    }
    if (!c) {
        c = "BALKANGraph." + b
    }
    if (f != undefined) {
        var e = this.getBGNode(f);
        if (e.isChildOfGroup) {
            f = e._5
        }
    }
    var g = {
        id: f,
        expandChildren: a
    };
    this._l(false, BALKANGraph.action.exporting, g, function (j) {
        if (b == "svg") {
            var k = document.createElement("div");
            k.innerHTML = j;
            if (i.config.onExportEnd) {
                var l = i.config.onExportEnd(i, b, c, j);
                if (l === false) {
                    return false
                }
            }
            BALKANGraph._o(d, k.innerHTML, c)
        } else {
            BALKANGraph._d(i.config.exportUrl + "/" + b, "POST", {
                filename: c,
                svg: j,
                baseUri: window.location.href
            }, function (m) {
                if (i.config.onExportEnd) {
                    var n = i.config.onExportEnd(i, b, c, m);
                    if (n === false) {
                        return false
                    }
                }
                BALKANGraph._o(d, m, c)
            })
        }
    })
};
OrgChart.prototype.exportCSV = function (b) {
    if (!b) {
        b = "BALKANGraph.csv"
    }
    if (this.config.onExportStart) {
        var c = this.config.onExportStart(this, "csv", b);
        if (c === false) {
            return false
        }
    }
    var a = this.server.convertToCSVdata();
    if (this.config.onExportEnd) {
        var c = this.config.onExportEnd(this, "csv", b, a);
        if (c === false) {
            return false
        }
    }
    BALKANGraph._o("text/csv;charset=utf-8;", a, b)
};
OrgChart.prototype.expand = function (c, d, b) {
    var a = {
        id: c,
        ids: d,
        state: BALKANGraph.EXPAND
    };
    this._l(false, BALKANGraph.action.expandCollapse, a, b)
};
OrgChart.prototype.collapse = function (c, d, b) {
    var a = {
        id: c,
        ids: d,
        state: BALKANGraph.COLLAPSE
    };
    this._l(false, BALKANGraph.action.expandCollapse, a, b)
};
OrgChart.prototype.maximize = function (c, b) {
    var a = {
        id: c,
        state: BALKANGraph.EXPAND
    };
    this._l(false, BALKANGraph.action.groupMaxMin, a, b)
};
OrgChart.prototype.minimize = function (c, b) {
    var a = {
        id: c,
        state: BALKANGraph.COLLAPSE
    };
    this._l(false, BALKANGraph.action.groupMaxMin, a, b)
};
OrgChart.prototype._p = function (b) {
    this.nodeMenuUI.hide();
    this.dragDropMenuUI.hide();
    this.menuUI.hide();
    var a = this.getBGNode(b);
    if (a.collapsedChildrenIds.length) {
        if (this.config.onExpCollClick) {
            var c = this.config.onExpCollClick(this, BALKANGraph.EXPAND, b, a.collapsedChildrenIds);
            if (c === false) {
                return false
            }
        }
        this.expand(b, a.collapsedChildrenIds, false)
    } else {
        if (this.config.onExpCollClick) {
            var c = this.config.onExpCollClick(this, BALKANGraph.COLLAPSE, b, a.childrenIds);
            if (c === false) {
                return false
            }
        }
        this.collapse(b, a.childrenIds, false)
    }
};
OrgChart.prototype._at = function (b) {
    this.nodeMenuUI.hide();
    this.dragDropMenuUI.hide();
    this.menuUI.hide();
    var a = this.getBGNode(b);
    if (a.groupState == BALKANGraph.EXPAND) {
        if (this.config.onExpCollClick) {
            var c = this.config.onExpCollClick(this, BALKANGraph.COLLAPSE, b);
            if (c === false) {
                return false
            }
        }
        this.minimize(b)
    } else {
        if (a.groupState == BALKANGraph.COLLAPSE) {
            if (this.config.onExpCollClick) {
                var c = this.config.onExpCollClick(this, BALKANGraph.EXPAND, b);
                if (c === false) {
                    return false
                }
            }
            this.maximize(b)
        }
    }
};
BALKANGraph._aU = function (a) {
    if (!a) {
        console.error("config is not defined")
    } else {
        return true
    }
    return false
};
BALKANGraph._r = function (a, c) {
    if (a && Array.isArray(a)) {
        var b = a.length;
        while (b--) {
            if (a[b] === c) {
                return true
            }
        }
    }
    return false
};
BALKANGraph._aa = function (c, d) {
    if (!c) {
        return []
    }
    if (!d) {
        return []
    }
    var e = [];
    if (Array.isArray(c) && Array.isArray(d)) {
        for (var a in c) {
            for (var b in d) {
                if (c[a] == d[b]) {
                    e.push(c[a])
                }
            }
        }
    } else {
        if (Array.isArray(c) && !Array.isArray(d)) {
            for (var a in c) {
                for (var b in d) {
                    if (c[a] == b) {
                        e.push(c[a])
                    }
                }
            }
        } else {
            if (!Array.isArray(c) && Array.isArray(d)) {
                for (var a in c) {
                    for (var b in d) {
                        if (a == d[b]) {
                            e.push(d[b])
                        }
                    }
                }
            }
        }
    }
    return e
};
BALKANGraph._O = function (a) {
    if (a.tags && !Array.isArray(a.tags)) {
        return a.tags.split(",")
    } else {
        if (a.tags && Array.isArray(a.tags)) {
            return a.tags
        }
    }
    return []
};
BALKANGraph._h = function (a, b, c) {
    var d = a.getBoundingClientRect();
    var g = b - d.left;
    var h = c - d.top;
    var e = (g) / (d.width / 100);
    var f = (h) / (d.height / 100);
    return [e, f]
};
BALKANGraph._aH = function (a) {
    return a.replace(/^\s+|\s+$/g, "")
};
BALKANGraph._1 = function (a) {
    var b = a.getAttribute("transform");
    b = b.replace("matrix", "")
        .replace("(", "")
        .replace(")", "");
    if (BALKANGraph._t()
        .msie) {
        b = b.replace(/ /g, ",")
    }
    b = BALKANGraph._aH(b);
    b = "[" + b + "]";
    b = JSON.parse(b);
    return b
};
BALKANGraph.getScale = function (e, f, a, b, g, i) {
    if (!e && b === BALKANGraph.match.boundary) {
        var c = (f) / g;
        var d = (a) / i;
        return c > d ? d : c
    }
    if (!e && b === BALKANGraph.match.width) {
        return (f) / g
    }
    if (!e && b === BALKANGraph.match.height) {
        return (a) / i
    } else {
        if (!e) {
            return b
        } else {
            c = f / e[2];
            d = a / e[3];
            return c > d ? d : c
        }
    }
};
BALKANGraph._ay = function (b, c) {
    var d = {};
    for (var a in b) {
        d[a] = b[a]
    }
    for (a in c) {
        d[a] = c[a]
    }
    return d
};
BALKANGraph._ae = function (a, b) {
    if (a.nodeBinding) {
        if (b.indexOf("img") != -1 && a.nodeBinding[b]) {
            return true
        }
    }
    return false
};
BALKANGraph._Z = function (c, d) {
    if (c.nodeBinding) {
        for (var a in c.nodeBinding) {
            if (c.nodeBinding[a] == d) {
                return BALKANGraph._ae(c, a)
            }
        }
    }
    return false
};
BALKANGraph._7 = function () {
    function a() {
        return Math.floor((1 + Math.random()) * 65536)
            .toString(16)
            .substring(1)
    }
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
};
BALKANGraph.htmlRipple = function (d) {
    var b = document.createElement("style");
    b.type = "text/css";
    b.innerHTML = " .bg-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .bg-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: bg-ripple 1000ms; }@-moz-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}";
    document.head.appendChild(b);
    var c = function (h, g) {
        var i;
        i = undefined;
        return function () {
            var j, k;
            k = this;
            j = arguments;
            clearTimeout(i);
            return i = setTimeout(function () {
                return h.apply(k, j)
            }, g)
        }
    };
    var f = function (g) {
        var h, i, j, k, l, m, n;
        i = this;
        j = document.createElement("span");
        k = i.offsetWidth;
        h = i.getBoundingClientRect();
        m = g.pageX - h.left - (k / 2);
        n = g.pageY - h.top - (k / 2);
        l = "top:" + n + "px; left: " + m + "px; height: " + k + "px; width: " + k + "px;";
        d.rippleContainer.appendChild(j);
        return j.setAttribute("style", l)
    };
    var a = function () {
        while (this.rippleContainer.firstChild) {
            this.rippleContainer.removeChild(this.rippleContainer.firstChild)
        }
    };
    var e = document.createElement("div");
    e.className = "bg-ripple-container";
    d.addEventListener("mousedown", f);
    d.addEventListener("mouseup", c(a, 2000));
    d.rippleContainer = e;
    d.appendChild(e)
};
BALKANGraph._am = function (e, d, a, b) {
    var c = d.slice(0);
    if (d[0] < a.left && d[0] < a.right) {
        c[0] = a.left > a.right ? a.right : a.left
    }
    if (d[0] > a.right && d[0] > a.left) {
        c[0] = a.left > a.right ? a.left : a.right
    }
    if (d[1] < a.top && d[1] < a.bottom) {
        c[1] = a.top > a.bottom ? a.bottom : a.top
    }
    if (d[1] > a.bottom && d[1] > a.top) {
        c[1] = a.top > a.bottom ? a.top : a.bottom
    }
    if (d[0] !== c[0] || d[1] !== c[1]) {
        BALKANGraph.anim(e, {
            viewBox: d
        }, {
                viewBox: c
            }, 300, BALKANGraph.anim.outPow, function () {
                if (b) {
                    b()
                }
            })
    } else {
        if (b) {
            b()
        }
    }
};
BALKANGraph._q = function (a) {
    //return '<a style="text-decoration: none;position:absolute;bottom:' + a + "px;left:" + a + 'px;" title="OrgChart | BALKANGraph" href="https://BALKANGraph.com"><span style="color:#039BE5;font-family:Roboto,Roboto-Regular,Helvetica;font-weight:bold;">BALKAN</span><span style="color:#F57C00;font-family:Roboto,Roboto-Regular,Helvetica;">Graph</span></a>'
    return '<a style="text-decoration: none;position:absolute;bottom:' + a + "px;left:" + a + 'px;" title="DiagramOrg" href="https://BALKANGraph.com"><span style="color:#039BE5;font-family:Roboto,Roboto-Regular,Helvetica;font-weight:bold;">Diagram</span><span style="color:#F57C00;font-family:Roboto,Roboto-Regular,Helvetica;">Org</span></a>'
};
BALKANGraph._aQ = function () {
    return Math.random()
        .toString(36)
        .substring(2, 15) + Math.random()
            .toString(36)
            .substring(2, 15)
};
BALKANGraph._C = function (a) {
    if (a.type.indexOf("touch") != -1) {
        if (a.changedTouches.length) {
            return {
                x: a.changedTouches[0].clientX,
                y: a.changedTouches[0].clientY
            }
        }
    } else {
        return {
            x: a.clientX,
            y: a.clientY
        }
    }
};
BALKANGraph._D = function (a, b) {
    if (a.type.indexOf("touch") != -1) {
        if (a.touches.length < b + 1) {
            return {
                x: null,
                y: null
            }
        } else {
            return {
                x: a.touches[b].clientX,
                y: a.touches[b].clientY
            }
        }
    } else {
        return {
            x: a.clientX,
            y: a.clientY
        }
    }
};
BALKANGraph._H = function (a, b) {
    if (!a) {
        return
    }
    b.x += a.offsetLeft;
    b.y += a.offsetTop;
    BALKANGraph._H(a.offsetParent, b)
};
BALKANGraph._P = function (a) {
    var b = {
        x: 0,
        y: 0
    };
    BALKANGraph._H(a, b);
    return b
};
BALKANGraph._N = function (b, a) {
    if (a.type.indexOf("touch") != -1) {
        if (a.touches.length) {
            var c = BALKANGraph._P(b);
            return {
                x: a.touches[0].pageX - c.x,
                y: a.touches[0].pageY - c.y
            }
        } else {
            if (a.changedTouches.length) {
                var c = BALKANGraph._P(b);
                return {
                    x: a.changedTouches[0].pageX - c.x,
                    y: a.changedTouches[0].pageY - c.y
                }
            }
        }
    } else {
        return {
            x: a.offsetX,
            y: a.offsetY
        }
    }
};
BALKANGraph._al = function (b, m, c, a) {
    var d = BALKANGraph._P(b);
    var i = a.touches[0].pageX - d.x;
    var j = a.touches[0].pageY - d.y;
    var k = a.touches[1].pageX - d.x;
    var l = a.touches[1].pageY - d.y;
    var f = ((i - k) / 2 + k) / (m / 100);
    var g = ((j - l) / 2 + l) / (c / 100);
    return [f, g]
};
BALKANGraph._t = function () {
    var g = navigator.userAgent;
    g = g.toLowerCase();
    var f = /(webkit)[ \/]([\w.]+)/;
    var e = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var d = /(msie) ([\w.]+)/;
    var c = /(mozilla)(?:.*? rv:([\w.]+))?/;
    var b = f.exec(g) || e.exec(g) || d.exec(g) || g.indexOf("compatible") < 0 && c.exec(g) || [];
    var a = {
        browser: b[1] || "",
        version: b[2] || "0"
    };
    return {
        msie: (navigator.userAgent.indexOf("Trident") != -1),
        webkit: a.browser == "webkit",
        mozilla: a.browser == "mozilla",
        opera: a.browser == "opera"
    }
};
BALKANGraph._ab = function (b, a, d) {
    var g = a.offsetX;
    var h = a.offsetY;
    var c = b.getBoundingClientRect();
    var f = d.getBoundingClientRect();
    g = c.left - f.left;
    h = c.top - f.top;
    return {
        x: g,
        y: h
    }
};
BALKANGraph._L = function (e, a, b) {
    if (Array.isArray(e)) {
        for (var c = 0; c < e.length; c++) {
            var d = a[e[c]];
            if (d && !d.group && d.template) {
                return d.template
            }
        }
    }
    return b
};
BALKANGraph._F = function (d, a) {
    for (var b = 0; b < d.length; b++) {
        var c = a[d[b]];
        if (c && c.group && c.template) {
            return {
                tag: c,
                name: d[b]
            }
        }
    }
    return null
};
BALKANGraph._aw = function (e) {
    var b = document.createElement("div");
    b.innerHTML = e;
    for (var a = b.childNodes, d = a.length; d--;) {
        if (a[d].nodeType == 1) {
            return true
        }
    }
    return false
};
BALKANGraph._aI = function (m, a) {
    if (a.indexOf("<text") == -1) {
        return m
    }
    if (a.indexOf("width") == -1) {
        return m
    }
    if (BALKANGraph._aw(m)) {
        return m
    }
    var l = document.getElementById("bg-tests");
    l.innerHTML = "<svg>" + a + "</svg>";
    var h = new DOMParser();
    var v = h.parseFromString(a, "text/xml");
    var w = v.getElementsByTagName("text")[0];
    var u = parseFloat(w.getAttribute("x"));
    var z = parseFloat(w.getAttribute("y"));
    var p = w.getAttribute("text-anchor");
    var s = w.getAttribute("width");
    var q = w.getAttribute("text-overflow");
    var k = "http://www.w3.org/2000/svg";
    var n = l.getElementsByTagName("svg")[0].getElementsByTagName("text")[0];
    if (!s) {
        return m
    }
    s = parseFloat(s);
    if (!u) {
        u = 0
    }
    if (!z) {
        z = 0
    }
    if (!u) {
        p = "start"
    }
    if (!q) {
        q = "ellipsis"
    }
    if (q == "ellipsis") {
        n.removeChild(n.firstChild);
        n.textContent = m;
        var g = n.getComputedTextLength();
        var d = 2;
        while (g > s) {
            n.textContent = m.substring(0, m.length - d);
            n.textContent += "...";
            g = n.getComputedTextLength();
            d++
        }
        if (d > 2) {
            return "<title>" + m + "</title>" + n.textContent
        } else {
            return m
        }
    } else {
        if (q == "multiline") {
            var t = m.split(" ");
            var b = n.getBBox()
                .height;
            n.textContent = "";
            var r = document.createElementNS(k, "tspan");
            var o = document.createTextNode(t[0]);
            r.setAttributeNS(null, "x", u);
            r.setAttributeNS(null, "y", z);
            r.setAttributeNS(null, "text-anchor", p);
            r.appendChild(o);
            n.appendChild(r);
            var d = 1;
            for (var c = 1; c < t.length; c++) {
                var f = r.firstChild.data.length;
                r.firstChild.data += " " + t[c];
                if (r.getComputedTextLength() > s) {
                    r.firstChild.data = r.firstChild.data.slice(0, f);
                    var r = document.createElementNS(k, "tspan");
                    r.setAttributeNS(null, "x", u);
                    r.setAttributeNS(null, "y", z + b * d);
                    r.setAttributeNS(null, "text-anchor", p);
                    o = document.createTextNode(t[c]);
                    r.appendChild(o);
                    n.appendChild(r);
                    d++
                }
            }
            var j = "";
            if (n.innerHTML != undefined) {
                j = n.innerHTML;
                n.innerHTML = ""
            } else {
                var e = "";
                for (var c = n.childNodes.length - 1; c >= 0; c--) {
                    e = XMLSerializer()
                        .serializeToString(n.childNodes[c]) + e;
                    n.removeChild(n.childNodes[c])
                }
                j = e
            }
            return j
        }
    }
};
BALKANGraph._o = function (e, b, c) {
    var a = new Blob([b], {
        type: e
    });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(a, c)
    } else {
        var d = document.createElement("a");
        if (d.download !== undefined) {
            var f = URL.createObjectURL(a);
            d.setAttribute("href", f);
            d.setAttribute("download", c);
            d.style.visibility = "hidden";
            document.body.appendChild(d);
            d.click();
            document.body.removeChild(d)
        }
    }
};
BALKANGraph._J = function (a, c, e, f) {
    var d = {
        x: c.x,
        y: c.y
    };
    if (e != undefined) {
        d.x = e
    }
    if (f != undefined) {
        d.y = f
    }
    if (a && a.length == 3) {
        var b = a[0].indexOf(c.id);
        if (b != -1) {
            if (a[1][b].transform != undefined) {
                if (e == undefined) {
                    d.x = a[1][b].transform[4]
                }
                if (f == undefined) {
                    d.y = a[1][b].transform[5]
                }
            }
        }
    }
    return d
};
BALKANGraph._U = function (a, c) {
    var d = 1;
    if (a && a.length == 3) {
        var b = a[0].indexOf(c.id);
        if (b != -1) {
            if (a[1][b].opacity != undefined) {
                d = a[1][b].opacity
            }
        }
    }
    return d
};
OrgChart.templates = {};
OrgChart.templates.base = {
    defs: "",
    size: [250, 120],
    expandCollapseSize: 30,
    linkAdjuster: {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
    },
    ripple: {
        radius: 0,
        color: "#e6e6e6",
        rect: null
    },
    assistanseLink: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
    link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>',
    pointer: '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
    node: '<rect x="0" y="0" height="120" width="250" fill="none" stroke-width="1" stroke="#aeaeae"></rect>',
    plus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
    minus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
    nodeMenuButton: '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
    exportMenuButton: '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" control-export-menu=""><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"></div>',
    img_0: '<clipPath id="{randId}"><circle cx="60" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="20"  width="80" height="80"></image>',
    link_field_0: '<text class="field_0" text-anchor="middle" fill="#aeaeae" width="290" x="0" y="0" style="font-size:10px;">{val}</text>'
};
OrgChart.templates.ana = {
    defs: "",
    size: [250, 120],
    linkAdjuster: {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
    },
    ripple: {
        radius: 0,
        color: "#e6e6e6",
        rect: null
    },
    expandCollapseSize: 30,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
    link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />',
    secondLink: '<path stroke-linejoin="round" stroke="#F57C00" stroke-width="1px" fill="none" d="{d}" />',
    assistanseLink: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
    pointer: '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
    node: '<rect x="0" y="0" height="120" width="250" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>',
    plus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
    minus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
    nodeMenuButton: '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
    exportMenuButton: '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" control-export-menu=""><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"></div>',
    img_0: '<clipPath id="{randId}"><circle cx="50" cy="30" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-10"  width="80" height="80"></image>',
    link_field_0: '<text text-anchor="middle" fill="#aeaeae" width="290" x="0" y="0" style="font-size:10px;">{val}</text>',
    field_0: '<text width="230" class="field_0"  style="font-size: 18px;" fill="#ffffff" x="125" y="95" text-anchor="middle">{val}</text>',
    field_1: '<text width="130" class="field_1"  style="font-size: 14px;" fill="#ffffff" x="230" y="30" text-anchor="end">{val}</text>'
};
OrgChart.templates.split = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.split.size = [10, 10];
OrgChart.templates.split.node = '<circle cx="5" cy="5" r="5" fill="none" stroke-width="1" stroke="#aeaeae"></circle>';
OrgChart.templates.group_orange = Object.assign({}, OrgChart.templates.base);
OrgChart.templates.group_orange.size = [250, 120];
OrgChart.templates.group_orange.node = '<rect rx="5" x="0" y="0" height="{h}" width="{w}" fill="#ffe6cc" stroke-width="1" stroke="#F57C00"></rect>';
OrgChart.templates.group_orange.groupPadding = [50, 10, 10, 10];
OrgChart.templates.group_orange.groupNodesSeparation = 10;
OrgChart.templates.group_orange.groupName = '<text class="groupName"  style="font-size: 24px;" fill="#F57C00" x="20" y="40">{val}</text>';
OrgChart.templates.group_yellow = Object.assign({}, OrgChart.templates.group_orange);
OrgChart.templates.group_yellow.node = '<rect rx="5" x="0" y="0" height="{h}" width="{w}" fill="#ffefbe" stroke-width="1" stroke="#FFCA28"></rect>';
OrgChart.templates.group_yellow.groupName = '<text class="groupName"  style="font-size: 24px;" fill="#FFCA28" x="20" y="40">{val}</text>';
OrgChart.templates.group_grey = Object.assign({}, OrgChart.templates.group_orange);
OrgChart.templates.group_grey.node = '<rect rx="5" x="0" y="0" height="{h}" width="{w}" fill="#eeeeee" stroke-width="1" stroke="#aeaeae"></rect>';
OrgChart.templates.group_grey.groupName = '<text class="groupName"  style="font-size: 24px;" fill="#aeaeae" x="20" y="40">{val}</text>';
OrgChart.templates.ula = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.ula.field_0 = '<text width="145" class="field_0" style="font-size: 18px;" fill="#039BE5" x="100" y="55">{val}</text>';
OrgChart.templates.ula.field_1 = '<text width="145" class="field_1" style="font-size: 14px;" fill="#afafaf" x="100" y="76">{val}</text>';
OrgChart.templates.ula.node = '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect><line x1="0" y1="0" x2="250" y2="0" stroke-width="2" stroke="#039BE5"></line>';
OrgChart.templates.ula.img_0 = '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>';
OrgChart.templates.ula.menu = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,12)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#ffffff" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#039BE5"></circle><circle cx="7" cy="0" r="2" fill="#039BE5"></circle><circle cx="14" cy="0" r="2" fill="#039BE5"></circle></g>';
OrgChart.templates.ula.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="7" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle></g>';
OrgChart.templates.olivia = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.olivia.field_0 = '<text width="145" class="field_0" style="font-size: 18px;" fill="#757575" x="100" y="55">{val}</text>';
OrgChart.templates.olivia.field_1 = '<text width="145" class="field_1" style="font-size: 14px;" fill="#757575" x="100" y="76">{val}</text>';
OrgChart.templates.olivia.defs = '<linearGradient id="{randId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FDFDFD;stop-opacity:1" /><stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" /></linearGradient>';
OrgChart.templates.olivia.node = '<rect fill="url(#{randId})" x="0" y="0" height="120" width="250" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>';
OrgChart.templates.olivia.img_0 = '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>';
OrgChart.templates.belinda = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.belinda.size = [180, 180];
OrgChart.templates.belinda.ripple = {
    radius: 90,
    color: "#e6e6e6",
    rect: null
};
OrgChart.templates.belinda.node = '<circle cx="90" cy="90" r="90" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>';
OrgChart.templates.belinda.img_0 = '<clipPath id="{randId}"><circle cx="90" cy="45" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="5" width="80" height="80" ></image>';
OrgChart.templates.belinda.field_0 = '<text width="170" class="field_0" style="font-size: 18px;" text-anchor="middle" fill="#ffffff"  x="90" y="105">{val}</text>';
OrgChart.templates.belinda.field_1 = '<text width="160" class="field_1" style="font-size: 14px;" text-anchor="middle" fill="#ffffff"  x="90" y="125">{val}</text>';
OrgChart.templates.belinda.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';
OrgChart.templates.belinda.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,79,5)" control-node-menu-id="{id}"><rect x="0" y="0" fill="#000000" fill-opacity="0" width="22" height="22"></rect><line stroke-width="2" stroke="#000" x1="0" y1="3" x2="22" y2="3"></line><line stroke-width="2" stroke="#000" x1="0" y1="9" x2="22" y2="9"></line><line stroke-width="2" stroke="#000" x1="0" y1="15" x2="22" y2="15"></line></g>';
OrgChart.templates.rony = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.rony.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:#E8E8E8;display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>';
OrgChart.templates.rony.defs = '<filter id="{randId}" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="5" dy="5"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="5"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter>';
OrgChart.templates.rony.size = [180, 250];
OrgChart.templates.rony.ripple = {
    color: "#F57C00",
    radius: 5,
    rect: null
};
OrgChart.templates.rony.img_0 = '<clipPath id="{randId}"><circle cx="90" cy="160" r="60"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="30" y="100"  width="120" height="120"></image>';
OrgChart.templates.rony.node = '<rect filter="url(#{randId})" x="0" y="0" height="250" width="180" fill="#ffffff" stroke-width="0" rx="5" ry="5"></rect>';
OrgChart.templates.rony.field_0 = '<text width="165" class="field_0" style="font-size: 18px;" fill="#039BE5" x="90" y="40" text-anchor="middle">{val}</text>';
OrgChart.templates.rony.field_1 = '<text width="165" class="field_1" style="font-size: 14px;" fill="#F57C00" x="90" y="60" text-anchor="middle">{val}</text>';
OrgChart.templates.rony.field_2 = '<text width="165" style="font-size: 14px;" fill="#FFCA28" x="90" y="80" text-anchor="middle">{val}</text>';
OrgChart.templates.rony.link = '<path stroke="#039BE5" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>';
OrgChart.templates.rony.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>';
OrgChart.templates.rony.minus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line>';
OrgChart.templates.rony.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,155,235)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>';
OrgChart.templates.mery = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.mery.ripple = {
    color: "#e6e6e6",
    radius: 50,
    rect: null
};
OrgChart.templates.mery.node = '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#686868" rx="50" ry="50"></rect><rect x="0" y="45" height="30" width="250" fill="#039BE5" stroke-width="1"></rect>';
OrgChart.templates.mery.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
OrgChart.templates.mery.img_0 = '<clipPath id="{randId}"><circle cx="125" cy="60" r="24"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="95" y="33"  width="60" height="60"></image>';
OrgChart.templates.mery.field_0 = '<text width="220" class="field_0" style="font-size: 18px;" fill="#039BE5" x="125" y="30" text-anchor="middle">{val}</text>';
OrgChart.templates.mery.field_1 = '<text width="220" class="field_1" style="font-size: 14px;" fill="#039BE5" x="125" y="100" text-anchor="middle">{val}</text>';
OrgChart.templates.mery.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,60)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>';
OrgChart.templates.polina = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.polina.size = [300, 80];
OrgChart.templates.polina.ripple = {
    color: "#e6e6e6",
    radius: 40,
    rect: null
};
OrgChart.templates.polina.node = '<rect x="0" y="0" height="80" width="300" fill="#039BE5" stroke-width="1" stroke="#686868" rx="40" ry="40"></rect>';
OrgChart.templates.polina.img_0 = '<clipPath id="{randId}"><circle  cx="40" cy="40" r="35"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="0" y="0"  width="80" height="80"></image>';
OrgChart.templates.polina.field_0 = '<text width="210" class="field_0" style="font-size: 18px;" fill="#ffffff" x="80" y="30" text-anchor="start">{val}</text>';
OrgChart.templates.polina.field_1 = '<text width="210" class="field_1" style="font-size: 14px;" fill="#ffffff" x="80" y="55" text-anchor="start">{val}</text>';
OrgChart.templates.polina.link = '<path stroke="#686868" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
OrgChart.templates.polina.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,285,33)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="7" r="2" fill="#ffffff"></circle><circle cx="0" cy="14" r="2" fill="#ffffff"></circle></g>';
OrgChart.templates.mila = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.mila.node = '<rect x="0" y="0" height="120" width="250" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></rect><rect x="-5" y="70" height="30" width="260" fill="#ffffff" stroke-width="1" stroke="#039BE5"></rect><line x1="-5" x2="0" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/><line x1="255" x2="250" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/>';
OrgChart.templates.mila.img_0 = '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="20" y="5"  width="64" height="64"></image>';
OrgChart.templates.mila.field_0 = '<text width="240" class="field_0" style="font-size: 18px;" fill="#039BE5" x="125" y="92" text-anchor="middle">{val}</text>';
OrgChart.templates.mila.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,110)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>';
OrgChart.templates.diva = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.diva.size = [200, 170];
OrgChart.templates.diva.node = '<rect x="0" y="80" height="90" width="200" fill="#039BE5"></rect><circle cx="100" cy="50" fill="#ffffff" r="50" stroke="#039BE5" stroke-width="2"></circle>';
OrgChart.templates.diva.img_0 = '<clipPath id="{randId}"><circle cx="100" cy="50" r="45"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="0"  width="100" height="100"></image>';
OrgChart.templates.diva.field_0 = '<text width="185" class="field_0" style="font-size: 18px;" fill="#ffffff" x="100" y="125" text-anchor="middle">{val}</text>';
OrgChart.templates.diva.field_1 = '<text width="185" class="field_1" style="font-size: 14px;" fill="#ffffff" x="100" y="145" text-anchor="middle">{val}</text>';
OrgChart.templates.diva.pointer = '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#039BE5" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>';
OrgChart.templates.diva.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,175,155)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>';
OrgChart.templates.luba = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.luba.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;background-color: #2E2E2E;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>';
OrgChart.templates.luba.defs = '<linearGradient id="{randId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#646464;stop-opacity:1" /><stop offset="100%" style="stop-color:#363636;stop-opacity:1" /></linearGradient>';
OrgChart.templates.luba.node = '<rect fill="url(#{randId})" x="0" y="0" height="120" width="250" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>';
OrgChart.templates.luba.img_0 = '<clipPath id="{randId}"><circle cx="50" cy="25" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-15"  width="80" height="80"></image>';
OrgChart.templates.luba.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#aeaeae"></circle><circle cx="7" cy="0" r="2" fill="#aeaeae"></circle><circle cx="14" cy="0" r="2" fill="#aeaeae"></circle></g>';
OrgChart.templates.luba.field_0 = '<text width="235" class="field_0" style="font-size: 18px;" fill="#aeaeae" x="125" y="90" text-anchor="middle">{val}</text>';
OrgChart.templates.luba.field_1 = '<text width="140" class="field_1" style="font-size: 14px;" fill="#aeaeae" x="240" y="30" text-anchor="end">{val}</text>';
OrgChart.templates.luba.plus = '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line><line x1="18" y1="4" x2="18" y2="32" stroke-width="1" stroke="#aeaeae"></line>';
OrgChart.templates.luba.minus = '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line>';
OrgChart.templates.luba.expandCollapseSize = 36;
OrgChart.templates.derek = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.derek.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';
OrgChart.templates.derek.field_0 = '<text width="235" class="field_0"  style="font-size: 24px;" fill="#aeaeae" x="125" y="90" text-anchor="middle">{val}</text>';
OrgChart.templates.derek.field_1 = '<text width="130" class="field_1"  style="font-size: 16px;" fill="#aeaeae" x="230" y="30" text-anchor="end">{val}</text>';
OrgChart.templates.derek.node = '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="0" stroke="none" rx="5" ry="5"></rect><path d="M1.0464172536455116 0.43190469224125483 C53.84241668202045 -0.788936709486018, 103.41786516460891 -0.7020837047025514, 252.36637077877316 2.5880308844586395 M2.9051048929845287 1.416953777798454 C94.33574460557007 1.0012759229446266, 189.39715875173388 0.6456731199982935, 252.78978918302985 2.4201778360648074 M253.62699063660838 2.9193391477217157 C249.73034548542307 47.55931231380586, 252.87525930998083 91.26715478378368, 253.10179184315842 121.7440626272514 M251.37132919216776 1.8733470844542213 C252.2809675089866 32.73212950193807, 251.34402714677282 62.11470833534073, 251.87050951184997 121.58550827952904 M253.33945599552268 122.05611967964798 C171.36076589155192 123.47737863766969, 88.83808249906167 125.27259840604118, 3.1999393565128846 121.26868651191393 M252.26165120810887 122.5938901158243 C192.76996487394138 123.44664377223289, 131.37122563794998 122.94880221756583, 1.2373006891045732 121.88999197324904 M2.223863211672736 121.04511533445009 C1.4438124377596486 86.38398979211773, 2.8540468486809294 55.805566409478374, 3.8890451480896644 1.7483404843613926 M2.244347335490432 122.60147677858153 C2.100672267495622 92.31058899219087, 1.6261027388218166 64.160806803772, 1.6325734600065367 1.1945909353588222" stroke="#aeaeae" ></path>';
OrgChart.templates.derek.defs = ' <filter id="grayscale"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/></filter>';
OrgChart.templates.derek.img_0 = '<clipPath id="{randId}"><circle cx="60" cy="30" r="36"></circle></clipPath><path d="M59.27394950148486 -8.301766751084706 C67.69473471187919 -8.865443566034696, 80.29031463018414 -4.859224005049532, 87.18598909426663 0.33238763875740673 C94.08166355834912 5.523999282564345, 98.98110545022442 14.745947814116153, 100.64799628597981 22.847903111756924 C102.31488712173521 30.949858409397695, 101.71467046207992 41.576461864335656, 97.187334108799 48.944119424602036 C92.65999775551809 56.311776984868416, 82.03610997730354 64.08326918912249, 73.48397816629435 67.05384847335519 C64.93184635528516 70.02442775758789, 54.01035575000908 69.7708463163516, 45.874543242743854 66.76759512999827 C37.738730735478626 63.76434394364495, 29.04872278114092 56.18846598822666, 24.669103122702957 49.034341355235284 C20.289483464264993 41.88021672224391, 18.158053754175985 31.830144088547545, 19.596825292116065 23.84284733205002 C21.035596830056146 15.855550575552495, 25.795252700735308 6.49424361294595, 33.30173235034344 1.1105608162501355 C40.80821199995158 -4.273121980445679, 58.92971347412665 -7.0427741956040295, 64.63570318976488 -8.459249448124865 C70.34169290540312 -9.8757247006457, 67.62192977382313 -7.857597534262704, 67.53767064417285 -7.388290698874876 M62.748378255307365 -8.335850348284236 C71.26603403676657 -8.411982637093757, 83.3134559967999 -3.2332675886967737, 89.65944437868365 2.387927626929269 C96.00543276056739 8.00912284255531, 99.8018539626104 17.389209313563462, 100.82430854660979 25.39132094547202 C101.84676313060918 33.39343257738058, 100.69202080288338 43.23907526327184, 95.79417188267999 50.40059741838061 C90.8963229624766 57.56211957348938, 80.19607375493683 65.6933432424228, 71.43721502538948 68.36045387612462 C62.678356295842114 71.02756450982645, 51.31858275833087 70.03148525422704, 43.241019505395826 66.40326122059156 C35.16345625246078 62.775037186956084, 26.840434236544123 54.120081952867466, 22.971835507779204 46.59110967431175 C19.103236779014285 39.06213739575604, 17.94937086132579 28.992694575765086, 20.029427132806305 21.22942754925726 C22.10948340428682 13.466160522749433, 28.239699334668693 5.033316212766326, 35.452173136662296 0.011507515264803203 C42.6646469386559 -5.010301182236719, 59.029629541347575 -7.774813789367088, 63.30426994476793 -8.901424635751876 C67.57891034818829 -10.028035482136666, 61.20261013623477 -7.6019933587127815, 61.10001555718443 -6.748157563043929" style="stroke: #aeaeae; stroke-width: 2; fill: none;"></path><image filter="url(#grayscale)" preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="-10"  width="80" height="80"></image>';
OrgChart.templates.derek.minus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke-width="0"></circle><path d="M17.23891044927774 1.1814294501322902 C20.29160626452551 1.030769196657948, 23.947970993006972 3.1719335544839753, 26.394853759110717 5.588671983418923 C28.84173652521446 8.005410412353871, 31.246576051221126 12.511831935158815, 31.920207045900206 15.681860023741976 C32.593838040579286 18.85188811232514, 32.286699675240925 21.948848714186923, 30.436639727185195 24.60884051491789 C28.586579779129462 27.268832315648858, 24.05246578668338 30.675892912089505, 20.819847357565806 31.64181082812777 C17.58722892844823 32.60772874416604, 13.992479948405318 31.588687222722193, 11.040929152479746 30.404348011147484 C8.089378356554175 29.220008799572774, 4.476346434761303 27.363985211380037, 3.110542582012373 24.535775558679525 C1.7447387292634435 21.707565905979013, 2.0125141957866703 16.770753327135857, 2.8461060359861694 13.435090094944405 C3.6796978761856685 10.099426862752953, 4.99838568665378 6.33816589513267, 8.112093623209367 4.521796165530812 C11.225801559764953 2.7054264359289544, 18.764666760207586 2.8505106971937155, 21.528353655319687 2.5368717173332556 C24.29204055043179 2.2232327374727956, 24.87088035867136 2.534909813412478, 24.69421499388197 2.6399622863680516 M17.281640595209783 0.19007885243722633 C20.364244435145494 -0.11577004716725742, 25.135133405402318 3.2303746945812075, 27.855952721223584 5.7353294427454955 C30.57677203704485 8.240284190909783, 33.34617538156587 11.802005102645245, 33.606556490137386 15.219807341422953 C33.8669375987089 18.637609580200664, 31.337125602828454 23.632355493641384, 29.418239372652685 26.24214287541175 C27.499353142476917 28.85193025718212, 25.044077583504755 30.13224182494988, 22.093239109082777 30.87853163204516 C19.1424006346608 31.62482143914044, 14.787723024669972 31.933646092018286, 11.713208526120809 30.719881717983426 C8.638694027571646 29.506117343948567, 5.1333408130933655 26.55826769548724, 3.6461521177877945 23.595945387835997 C2.1589634224822234 20.633623080184755, 1.9785010696309286 16.25773192692332, 2.7900763542873843 12.945947872075987 C3.60165163894384 9.634163817228652, 5.999109831161897 5.87039683716568, 8.51560382572653 3.7252410587519886 C11.032097820291161 1.5800852803382974, 16.377503419445155 0.40900388408914673, 17.88904032167518 0.0750132015938405 C19.400577223905202 -0.2589774809014657, 17.448582822593046 1.2406055078364167, 17.584825239106664 1.7212969637801514" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path><path d="M8.571186416504453 17.64803469305822 C12.085276840999553 15.452815349785006, 19.337130848197884 16.101685575250833, 26.855223350440756 18.889299472836626 M7.857231507904164 16.840024354210055 C15.011849298914942 18.06824852479784, 22.352469730756894 17.800410681835732, 26.732355140012178 16.88515873797708" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path>';
OrgChart.templates.derek.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke-width="0"></circle><path d="M12.257463787262992 2.40166003616363 C15.548960627027807 1.1768586505919105, 20.323768339136134 1.874732142276981, 23.661947633240565 3.0864861053786417 C27.000126927344997 4.298240068480302, 30.703811226452725 6.729324000523814, 32.286539551889575 9.672183814773595 C33.86926787732643 12.615043629023376, 33.788018167397944 17.557781915741554, 33.158317585861674 20.743644990877332 C32.528617004325405 23.92950806601311, 31.137543762406274 26.899980401737224, 28.508336062671955 28.787362265588257 C25.879128362937635 30.67474412943929, 21.064677192956335 31.99302804642975, 17.383071387455747 32.06793617398354 C13.701465581955157 32.14284430153733, 9.342085269075854 31.17242931287016, 6.418701229668416 29.236811030911003 C3.4953171902609785 27.301192748951845, 0.29124975331190645 23.792422306170057, -0.15723284898887968 20.454226482228595 C-0.6057154512896659 17.116030658287134, 1.5769138742615705 12.178626667602387, 3.7278056158636996 9.207636087262241 C5.878697357465828 6.236645506922095, 10.970632450860041 3.8471017540469195, 12.748117600623896 2.6282830001877198 C14.525602750387751 1.4094642463285199, 14.289563699001825 1.9470094191022314, 14.392716514446832 1.894723564107041 M22.43549828180672 1.2256088400576157 C25.69018250895055 1.7704365119039576, 29.24546322166512 4.979269460398017, 31.051492912414023 8.188373611713667 C32.85752260316293 11.397477763029316, 33.67207918890526 17.17514768034262, 33.27167642630015 20.480233747951512 C32.871273663695035 23.785319815560406, 31.41050911947538 25.966765564166938, 28.649076336783356 28.01889001736704 C25.887643554091333 30.07101447056714, 20.094058835586818 32.38500719321419, 16.70307973014802 32.79298046715211 C13.31210062470922 33.20095374109003, 10.940906263905317 32.367748192606626, 8.303201704150565 30.46672966099454 C5.665497144395813 28.565711129382457, 2.097338248187536 24.641108687248686, 0.8768523716195098 21.386869277479594 C-0.34363350494851663 18.132629867710502, -0.763694313917872 14.0433435213021, 0.980286444742406 10.941293202379995 C2.7242672034026842 7.83924288345789, 7.945090366802328 4.317959037402062, 11.340736923581177 2.774567363946959 C14.736383480360027 1.231175690491856, 19.39979547907987 1.5862021443476335, 21.354165785415507 1.6809431616493775 C23.308536091751144 1.7756841789511215, 22.887857886273373 3.132249638930103, 23.06695876159499 3.343013467757423" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path><path d="M7.0048103933165935 18.109075284628886 C12.152504846776358 18.486044066779655, 15.926735549928488 18.85477711845977, 26.641287664541796 15.553207106118496 M6.796084928139555 16.174781745374535 C14.085050058006614 16.53898319893461, 19.579209483395115 16.725914747038104, 27.441803598385356 17.277875712554966" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path><path d="M16.293755471804 6.234638030793387 C17.448668211406996 11.453666045700338, 16.27043554943843 18.842895411477887, 16.90423703847114 28.952046969222806 M17.809777051185264 7.011866752183222 C17.599122858612276 13.07833796918755, 16.995204905243295 18.587342115968614, 17.888568853882067 26.844926419317094" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path>';
OrgChart.templates.derek.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,210,80)" control-node-menu-id="{id}"><rect x="-4" y="-4" fill="#000000" fill-opacity="0" width="30" height="30"></rect><path d="M28.28024041166867 10.015533059199505 C16.45705393905741 10.81309700412131, 9.85276157405196 9.87162723980281, 3.5441213169168515 7.075531655648353 M27.551825308513525 8.923800642512257 C18.159502224784205 9.337153563754718, 7.451197502628936 9.284728719203128, 1.8548423867425456 8.753004894810802 M27.907104120536573 17.662200828300364 C18.343063985797404 18.998694042201137, 6.69417200021006 18.568117962359516, 2.7668346274558218 17.84920936843539 M26.99365966559525 17.444217688828093 C18.288291344549645 16.258053076066645, 10.047008592341617 16.913684103209345, 2.1772395910449567 17.55258716848472 M25.754130110044443 24.79648729629354 C19.716463597004157 24.059273917380096, 12.571903015673474 24.723484329803995, 1.2709092686545498 25.961416660790483 M26.031268385778997 24.853114475295413 C16.16958752624931 25.047162545233455, 7.4039608372111765 23.9169859615211, 1.4736400026930716 24.342985647697336" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path></g>';
OrgChart.templates.isla = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.isla.defs = '<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="isla-shadow"><feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1" /><feMerge><feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" /></feMerge></filter>';
OrgChart.templates.isla.size = [180, 120];
OrgChart.templates.isla.node = '<rect filter="url(#isla-shadow)" x="0" y="20" rx="5" ry="5" height="100" width="180" fill="#FFF" stroke-width="1" stroke="#039BE5" ></rect><rect x="25" y="75" rx="10" ry="10" height="20" width="130" fill="#039BE5" stroke-width="3" stroke="#039BE5"></rect><rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect><circle stroke="#FFCA28" stroke-width="3" fill="none" cx="90" cy="12" r="8"></circle><path d="M75,34 C75,17 105,17 105,34" stroke="#FFCA28" stroke-width="3" fill="none"></path>';
OrgChart.templates.isla.field_0 = '<text width="120" style="font-size: 12px;" fill="#fff" x="90" y="90" text-anchor="middle">{val}</text>';
OrgChart.templates.isla.field_1 = '<text width="160" style="font-size: 13px;" fill="#039BE5" x="90" y="64" text-anchor="middle">{val}</text>';
OrgChart.templates.isla.img_0 = '<clipPath id="{randId}"><rect filter="url(#isla-shadow)" fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="70" y="0"  width="40" height="40"></image>';
OrgChart.templates.isla.minus = '<circle cx="15" cy="15" r="15" fill="#F57C00" stroke="#F57C00" stroke-width="1"></circle><line x1="8" y1="15" x2="22" y2="15" stroke-width="1" stroke="#ffffff"></line>';
OrgChart.templates.isla.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>';
OrgChart.templates.isla.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,83,45)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>';
OrgChart.templates.isla.ripple = {
    radius: 0,
    color: "#F57C00",
    rect: {
        x: 0,
        y: 20,
        width: 180,
        height: 100
    }
};
OrgChart.prototype._v = function (a) {
    this._a(window, "resize", this._aX)
};
OrgChart.prototype._f = function (b) {
    var b = this.getSvg();
    if ("ontouchstart" in window && navigator.maxTouchPoints) {
        this._a(b, "touchstart", this._3);
        this._a(b, "touchend", this._2)
    } else {
        this._a(b, "mousedown", this._3);
        this._a(b, "click", this._2);
        if (this.config.mouseScroolBehaviour == BALKANGraph.action.zoom) {
            this._a(b, "DOMMouseScroll", this._au);
            this._a(b, "mousewheel", this._au)
        }
    }
    var a = this.getExportMenuButton();
    if (a) {
        this._a(a, "click", this._A)
    }
};
OrgChart.prototype._a = function (b, c, d, e) {
    if (!e) {
        e = ""
    }
    if (!b.getListenerList) {
        b.getListenerList = {}
    }
    if (b.getListenerList[c + e]) {
        return
    }

    function g(h, i) {
        return function () {
            if (i) {
                return i.apply(h, [this, arguments[0]])
            }
        }
    }
    d = g(this, d);

    function f(h) {
        var i = d.apply(this, arguments);
        if (i === false) {
            h.stopPropagation();
            h.preventDefault()
        }
        return (i)
    }

    function a() {
        var h = d.call(b, window.event);
        if (h === false) {
            window.event.returnValue = false;
            window.event.cancelBubble = true
        }
        return (h)
    }
    if (b.addEventListener) {
        b.addEventListener(c, f, false)
    } else {
        b.attachEvent("on" + c, a)
    }
    b.getListenerList[c + e] = f
};
OrgChart.prototype._aZ = function (a, b) {
    if (a.getListenerList[b]) {
        var c = a.getListenerList[b];
        a.removeEventListener(b, c, false);
        delete a.getListenerList[b]
    }
};
OrgChart.prototype._3 = function (d, a) {
    var b = {
        move: "mousemove",
        up: "mouseup",
        leave: "mouseleave"
    };
    if (a.type.indexOf("touch") != -1) {
        if (a.touches.length == 1) {
            this._aY = {
                x: a.touches[0].clientX,
                y: a.touches[0].clientY
            }
        } else {
            this._aY = null
        }
        b = {
            move: "touchmove",
            up: "touchend",
            touchstart: "touchstart"
        }
    }
    if (d == a.target) {
        a.stopPropagation();
        a.preventDefault();
        this._an(d, a, b);
        return
    }
    var c = a.target;
    while (c != d) {
        if (c.hasAttribute("node-id")) {
            a.stopPropagation();
            a.preventDefault();
            this._ao(c, a, b);
            return
        }
        c = c.parentNode
    }
};
OrgChart.prototype._2 = function (i, a) {
    if (a.type.indexOf("touch") != -1 && this._aY && a.changedTouches.length == 1) {
        if (a.changedTouches.length) {
            var j = {
                x: a.changedTouches[0].clientX,
                y: a.changedTouches[0].clientY
            };
            var g = OrgChart.templates[this.config.template].size;
            var h = this.getScale();
            var c = (Math.abs(j.x - this._aY.x) / h);
            var d = (Math.abs(j.y - this._aY.y) / h);
            this._aY = null;
            if (c > g[0] / 10) {
                return
            }
            if (d > g[1] / 10) {
                return
            }
        }
    } else {
        if (a.type.indexOf("touch") != -1 && this._aY == null) {
            return
        }
    }
    var f = a.target;
    while (f != i) {
        if (f.hasAttribute("control-expcoll-id")) {
            var b = f.getAttribute("control-expcoll-id");
            this._p(b);
            return
        }
        if (f.hasAttribute("control-maxmin-id")) {
            var b = f.getAttribute("control-maxmin-id");
            this._at(b);
            return
        }
        if (f.hasAttribute("node-id")) {
            var b = f.getAttribute("node-id");
            this._ai(b, a);
            return
        }
        if (f.hasAttribute("control-node-menu-id")) {
            var b = f.getAttribute("control-node-menu-id");
            this._ak(b, f, a);
            return
        }
        if (f.hasAttribute("control-add")) {
            this._av();
            return
        }
        f = f.parentNode
    }
};
OrgChart.prototype._au = function (i, b) {
    var l = this;
    var c = false;
    var k = 120;
    var j = 12;
    var d = 0;
    var g = this.getScale();
    var h = BALKANGraph._h(l.getSvg(), b.pageX, b.pageY);

    function m() {
        c = true;
        var e = (d - g) / j;
        if (e > 0) {
            e++
        } else {
            e--
        }
        g += e;
        l.zoom(1 - (e / 12) / 50, h);
        if (parseInt(g) == parseInt(d)) {
            c = false
        } else {
            f(m)
        }
    }
    var f = function () {
        return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1000 / 50)
        })
    }();
    b.preventDefault();
    var a = b.delta || b.wheelDelta;
    if (a === undefined) {
        a = -b.detail
    }
    a = Math.max(-1, Math.min(1, a));
    d += -a * k;
    if (!c) {
        m()
    }
};
OrgChart.prototype._ao = function (p, k, m) {
    if (!this.config.enableDragDrop) {
        return
    }
    var b = BALKANGraph._C(k);
    var f = p.getAttribute("node-id");
    var a = this.getBGNode(f);
    var h = null;
    var g = null;
    this._4 = f;
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none";
    var r = this;
    var q = this.getSvg();
    var d = {
        x: b.x,
        y: b.y
    };
    var j = BALKANGraph._1(p);
    var s = j[4];
    var t = j[5];
    var o = r.getScale();
    var c = p.cloneNode(true);
    q.insertBefore(c, q.firstChild);
    c.style.opacity = 0.7;
    if (a.isChildOfGroup) {
        var n = this.getNodeElement(a._5);
        var e = BALKANGraph._1(n);
        s = s + e[4];
        t = t + e[5];
        j[4] = s;
        j[5] = t;
        c.setAttribute("transform", "matrix(" + j.toString() + ")")
    }
    var l = function (v) {
        if (d) {
            var u = BALKANGraph._C(v);
            var A = document.elementFromPoint(u.x, u.y);
            if (h != null) {
                var x = r.getBGNode(h);
                if (x.isChildOfGroup) {
                    r.getNodeElement(x._5)
                        .style.opacity = 1;
                    g.style.opacity = 1
                } else {
                    if (!x.isGroup) {
                        g.style.opacity = 1
                    }
                }
            }
            h = null;
            g = null;
            if (r.config.enableDragDrop) {
                while (A != null && A != q) {
                    if (A.hasAttribute("node-id")) {
                        var w = A.getAttribute("node-id");
                        if (r._4 && w != r._4) {
                            h = w;
                            g = A;
                            break
                        }
                    }
                    A = A.parentNode
                }
            }
            if (h != null) {
                var x = r.getBGNode(h);
                if (x.isChildOfGroup) {
                    r.getNodeElement(x._5)
                        .style.opacity = 0.8;
                    g.style.opacity = 0.5
                } else {
                    if (x.isGroup) {
                        h = null;
                        g = null
                    } else {
                        g.style.opacity = 0.5
                    }
                }
            }
            var y = (u.x - d.x) / o;
            var z = (u.y - d.y) / o;
            j[4] = s + y;
            j[5] = t + z;
            c.setAttribute("transform", "matrix(" + j.toString() + ")")
        }
    };
    var i = function (v) {
        q.removeEventListener(m.move, l);
        q.removeEventListener(m.up, i);
        if (m.leave) {
            q.removeEventListener(m.leave, i)
        }
        if ((a.id == h) || (a.isChildOfGroup && a._5 == h) || (h == null)) {
            q.removeChild(c);
            r._4 = null;
            return
        }
        var w = r.getBGNode(h);
        if (r.config.dragDropMenu == null || (a.isGroup && !w.isGroup)) {
            if (r._g(a.id, h)) {
                r.linkNode(a.id, h)
            } else {
                q.removeChild(c)
            }
        } else {
            if (r._g(a.id, h)) {
                var u = BALKANGraph._N(r.element, v);
                r.dragDropMenuUI.show(u.x, u.y, a.id, h)
            } else {
                q.removeChild(c)
            }
        }
        r._4 = null
    };
    q.addEventListener(m.move, l);
    q.addEventListener(m.up, i);
    if (m.leave) {
        q.addEventListener(m.leave, i)
    }
};
OrgChart.prototype._aX = function (b, a) {
    this._l(false, BALKANGraph.action.resize)
};
OrgChart.prototype._ai = function (c, b) {
    if (this.config.onClick) {
        var d = this.config.onClick(this, this.get(c));
        if (d === false) {
            return false
        }
    }
    this.searchUI.hide();
    this.nodeMenuUI.hide();
    this.dragDropMenuUI.hide();
    this.menuUI.hide();
    var a = this.getBGNode(c);
    if (this.config.nodeMouseClickBehaviour == BALKANGraph.action.expandCollapse) {
        if (a.collapsedChildrenIds.length) {
            if (this.config.onExpCollClick) {
                var d = this.config.onExpCollClick(this, BALKANGraph.EXPAND, c, a.collapsedChildrenIds);
                if (d === false) {
                    return false
                }
            }
            this.expand(c, a.collapsedChildrenIds, false)
        } else {
            if (this.config.onExpCollClick) {
                var d = this.config.onExpCollClick(this, BALKANGraph.COLLAPSE, c, a.childrenIds);
                if (d === false) {
                    return false
                }
            }
            this.collapse(c, a.childrenIds, false)
        }
        this.ripple(a.id, b.clientX, b.clientY)
    }
    if (this.config.nodeMouseClickBehaviour == BALKANGraph.action.edit) {
        this.editUI.show(a.id);
        this.ripple(a.id, b.clientX, b.clientY)
    }
    if (this.config.nodeMouseClickBehaviour == BALKANGraph.action.details) {
        this.editUI.show(a.id, true);
        this.ripple(a.id, b.clientX, b.clientY)
    }
};
OrgChart.prototype._ag = function (b, a) {
    a.stopPropagation();
    a.preventDefault()
};
OrgChart.prototype._ak = function (c, b, a) {
    this.menuUI.hide();
    var d = BALKANGraph._ab(b, a, this.getSvg());
    this.nodeMenuUI.show(d.x, d.y, c)
};
OrgChart.prototype._A = function (b, a) {
    a.stopPropagation();
    a.preventDefault();
    this.nodeMenuUI.hide();
    this.dragDropMenuUI.hide();
    this.menuUI.show(b.offsetLeft, b.offsetTop)
};
OrgChart.prototype._av = function () {
    var a = new BALKANGraph.node(BALKANGraph._aQ(), null, null, [], this.config.template);
    this.addNode(a);
    this.center(a.id)
};
OrgChart.prototype.zoom = function (b, a, d) {
    var i = this.getViewBox()
        .slice(0);
    var e = i;
    var g = i[2];
    var f = i[3];
    if (b === true) {
        i[2] = i[2] / (BALKANGraph.SCALE_FACTOR);
        i[3] = i[3] / (BALKANGraph.SCALE_FACTOR)
    } else {
        if (b === false) {
            i[2] = i[2] * (BALKANGraph.SCALE_FACTOR);
            i[3] = i[3] * (BALKANGraph.SCALE_FACTOR)
        } else {
            i[2] = i[2] / (b);
            i[3] = i[3] / (b)
        }
    }
    if (!a) {
        a = [50, 50]
    }
    i[0] = e[0] - (i[2] - g) / (100 / a[0]);
    i[1] = e[1] - (i[3] - f) / (100 / a[1]);
    var c = this.getScale(i);
    i[2] = this.width() / c;
    i[3] = this.height() / c;
    if (((b === true) && (c < this.config.scaleMax)) || ((b === false) && (c > this.config.scaleMin)) || (b != false && b != true && c < this.config.scaleMax && c > this.config.scaleMin)) {
        var h = this;
        if (d) {
            clearTimeout(h._aB);
            BALKANGraph.anim(this.getSvg(), {
                viewbox: this.getViewBox()
            }, {
                    viewbox: i
                }, this.config.anim.duration, this.config.anim.func, function () {
                    clearTimeout(h._aB);
                    h._aB = setTimeout(function () {
                        h._l(true, BALKANGraph.action.zoom)
                    }, 500)
                })
        } else {
            this.setViewBox(i);
            clearTimeout(h._aB);
            h._aB = setTimeout(function () {
                h._l(true, BALKANGraph.action.zoom)
            }, 500)
        }
    }
};
BALKANGraph.anim = function (a, c, b, h, j, d, o) {
    var e = 10;
    var l = 1;
    var n = 1;
    var m = h / e + 1;
    var p;
    var k = document.getElementsByTagName("g");
    if (!Array.isArray(a)) {
        a = [a]
    }
    if (!Array.isArray(c)) {
        c = [c]
    }
    if (!Array.isArray(b)) {
        b = [b]
    }

    function f() {
        for (var y = 0; y < a.length; y++) {
            for (var t in b[y]) {
                var u = BALKANGraph._r(["top", "left", "right", "bottom", "width"], t.toLowerCase()) ? "px" : "";
                switch (t.toLowerCase()) {
                    case "d":
                        var w = j(((n * e) - e) / h) * (b[y][t][0] - c[y][t][0]) + c[y][t][0];
                        var x = j(((n * e) - e) / h) * (b[y][t][1] - c[y][t][1]) + c[y][t][1];
                        a[y].setAttribute("d", a[y].getAttribute("d") + " L" + w + " " + x);
                        break;
                    case "r":
                        var v = j(((n * e) - e) / h) * (b[y][t] - c[y][t]) + c[y][t];
                        a[y].setAttribute("r", v);
                        break;
                    case "transform":
                        if (b[y][t]) {
                            var r = c[y][t];
                            var q = b[y][t];
                            var s = [0, 0, 0, 0, 0, 0];
                            for (i in r) {
                                s[i] = j(((n * e) - e) / h) * (q[i] - r[i]) + r[i]
                            }
                            a[y].setAttribute("transform", "matrix(" + s.toString() + ")")
                        }
                        break;
                    case "viewbox":
                        if (b[y][t]) {
                            var r = c[y][t];
                            var q = b[y][t];
                            var s = [0, 0, 0, 0];
                            for (i in r) {
                                s[i] = j(((n * e) - e) / h) * (q[i] - r[i]) + r[i]
                            }
                            a[y].setAttribute("viewBox", s.toString())
                        }
                        break;
                    case "margin":
                        if (b[y][t]) {
                            var r = c[y][t];
                            var q = b[y][t];
                            var s = [0, 0, 0, 0];
                            for (i in r) {
                                s[i] = j(((n * e) - e) / h) * (q[i] - r[i]) + r[i]
                            }
                            var g = "";
                            for (i = 0; i < s.length; i++) {
                                g += parseInt(s[i]) + "px "
                            }
                            if (a[y] && a[y].style) {
                                a[y].style[t] = v
                            }
                        }
                        break;
                    default:
                        var v = j(((n * e) - e) / h) * (b[y][t] - c[y][t]) + c[y][t];
                        if (a[y] && a[y].style) {
                            a[y].style[t] = v + u
                        }
                        break
                }
            }
        }
        if (o) {
            o()
        }
        n = n + l;
        if (n > m + 1) {
            clearInterval(p);
            if (d) {
                d(a)
            }
        }
    }
    p = setInterval(f, e)
};
BALKANGraph.anim.inPow = function (b) {
    var a = 2;
    if (b < 0) {
        return 0
    }
    if (b > 1) {
        return 1
    }
    return Math.pow(b, a)
};
BALKANGraph.anim.outPow = function (c) {
    var a = 2;
    if (c < 0) {
        return 0
    }
    if (c > 1) {
        return 1
    }
    var b = a % 2 === 0 ? -1 : 1;
    return (b * (Math.pow(c - 1, a) + b))
};
BALKANGraph.anim.inOutPow = function (c) {
    var a = 2;
    if (c < 0) {
        return 0
    }
    if (c > 1) {
        return 1
    }
    c *= 2;
    if (c < 1) {
        return BALKANGraph.anim.inPow(c, a) / 2
    }
    var b = a % 2 === 0 ? -1 : 1;
    return (b / 2 * (Math.pow(c - 2, a) + b * 2))
};
BALKANGraph.anim.inSin = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return -Math.cos(a * (Math.PI / 2)) + 1
};
BALKANGraph.anim.outSin = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return Math.sin(a * (Math.PI / 2))
};
BALKANGraph.anim.inOutSin = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return -0.5 * (Math.cos(Math.PI * a) - 1)
};
BALKANGraph.anim.inExp = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return Math.pow(2, 10 * (a - 1))
};
BALKANGraph.anim.outExp = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return -Math.pow(2, -10 * a) + 1
};
BALKANGraph.anim.inOutExp = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return a < 0.5 ? 0.5 * Math.pow(2, 10 * (2 * a - 1)) : 0.5 * (-Math.pow(2, 10 * (-2 * a + 1)) + 2)
};
BALKANGraph.anim.inCirc = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return -(Math.sqrt(1 - a * a) - 1)
};
BALKANGraph.anim.outCirc = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return Math.sqrt(1 - (a - 1) * (a - 1))
};
BALKANGraph.anim.inOutCirc = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return a < 1 ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - ((2 * a) - 2) * ((2 * a) - 2)) + 1)
};
BALKANGraph.anim.rebound = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    if (a < (1 / 2.75)) {
        return 1 - 7.5625 * a * a
    } else {
        if (a < (2 / 2.75)) {
            return 1 - (7.5625 * (a - 1.5 / 2.75) * (a - 1.5 / 2.75) + 0.75)
        } else {
            if (a < (2.5 / 2.75)) {
                return 1 - (7.5625 * (a - 2.25 / 2.75) * (a - 2.25 / 2.75) + 0.9375)
            } else {
                return 1 - (7.5625 * (a - 2.625 / 2.75) * (a - 2.625 / 2.75) + 0.984375)
            }
        }
    }
};
BALKANGraph.anim.inBack = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return a * a * ((1.70158 + 1) * a - 1.70158)
};
BALKANGraph.anim.outBack = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return (a - 1) * (a - 1) * ((1.70158 + 1) * (a - 1) + 1.70158) + 1
};
BALKANGraph.anim.inOutBack = function (a) {
    if (a < 0) {
        return 0
    }
    if (a > 1) {
        return 1
    }
    return a < 0.5 ? 0.5 * (4 * a * a * ((2.5949 + 1) * 2 * a - 2.5949)) : 0.5 * ((2 * a - 2) * (2 * a - 2) * ((2.5949 + 1) * (2 * a - 2) + 2.5949) + 2)
};
BALKANGraph.anim.impulse = function (c) {
    var b = 2;
    var a = b * c;
    return a * Math.exp(1 - a)
};
BALKANGraph.anim.expPulse = function (c) {
    var a = 2;
    var b = 2;
    return Math.exp(-a * Math.pow(c, b))
};
OrgChart.prototype.getSvg = function () {
    var a = this.element.getElementsByTagName("svg");
    if (a && a.length) {
        return a[0]
    }
    return null
};
OrgChart.prototype.getPointerElement = function () {
    return this.element.querySelector("g[data-pointer]")
};
OrgChart.prototype.getNodeElement = function (a) {
    return this.element.querySelector("g[node-id='" + a + "']")
};
OrgChart.prototype.getExportMenuButton = function () {
    return this.element.querySelector("[control-export-menu]")
};
OrgChart.searchUI = function () { };
OrgChart.searchUI.prototype.init = function (a) {
    this.obj = a
};
OrgChart.searchUI.prototype.hide = function () {
    var c = this.obj.element.querySelector('[data-id="search"]');
    if (!c) {
        return
    }
    var d = c.querySelector('[data-id="cell-1"]');
    var b = this.obj.element.getElementsByTagName("input")[0];
    var a = this.obj.element.querySelector('[data-id="container"]');
    b.value = "";
    a.innerHTML = "";
    if (d.style.display != "none" && c.style.display != "none") {
        BALKANGraph.anim(d, {
            opacity: d.style.opacity
        }, {
                opacity: 0
            }, 200, BALKANGraph.anim.inOutSin, function () {
                d.style.display = "none";
                BALKANGraph.anim(c, {
                    width: 300,
                    opacity: 1
                }, {
                        width: 50,
                        opacity: 0
                    }, 300, BALKANGraph.anim.inBack, function () {
                        c.style.display = "none"
                    })
            })
    }
};
OrgChart.searchUI.prototype.addSearchControl = function () {
    var k = this;
    var b = document.createElement("div");
    b.innerHTML = OrgChart.searchUI.createSearchIcon(this.obj.config.padding);
    b.innerHTML += OrgChart.searchUI.createInputField(this.obj.config.padding);
    this.obj.element.appendChild(b);
    var f = this.obj.element.querySelector('[data-id="search-icon"]');
    var d = this.obj.element.querySelector('[data-id="search"]');
    var e = d.querySelector('[data-id="cell-1"]');
    var c = this.obj.element.getElementsByTagName("input")[0];
    var a = this.obj.element.querySelector('[data-id="container"]');
    f.addEventListener("mouseover", function () {
        e.style.display = "none";
        d.style.width = "50px";
        d.style.display = "block";
        d.style.opacity = 0;
        BALKANGraph.anim(d, {
            width: 50,
            opacity: 0
        }, {
                width: 300,
                opacity: 1
            }, 300, BALKANGraph.anim.outBack, function () {
                e.style.display = "inherit";
                e.style.opacity = 0;
                BALKANGraph.anim(e, {
                    opacity: 0
                }, {
                        opacity: 1
                    }, 200, BALKANGraph.anim.inOutSin)
            })
    });
    d.addEventListener("mouseleave", function () {
        if (document.activeElement == c) {
            return
        }
        k.hide()
    });
    d.addEventListener("click", function () {
        c.focus()
    });
    c.addEventListener("keyup", function (l) {
        if (l.keyCode == 40) {
            g()
        } else {
            if (l.keyCode == 38) {
                h()
            } else {
                if (l.keyCode == 13) {
                    i()
                } else {
                    if (l.keyCode == 27) {
                        k.hide()
                    } else {
                        j(this.value)
                    }
                }
            }
        }
    });
    var g = function () {
        var l = d.querySelectorAll("[data-search-item-id]");
        var m = d.querySelector('[data-selected="yes"]');
        if (m == null && l.length > 0) {
            l[0].setAttribute("data-selected", "yes");
            l[0].style.backgroundColor = "#F0F0F0"
        } else {
            if (l.length > 0) {
                if (m.nextSibling) {
                    m.setAttribute("data-selected", "no");
                    m.style.backgroundColor = "inherit";
                    m.nextSibling.setAttribute("data-selected", "yes");
                    m.nextSibling.style.backgroundColor = "#F0F0F0"
                }
            }
        }
    };
    var h = function () {
        var l = d.querySelectorAll("[data-search-item-id]");
        var m = d.querySelector('[data-selected="yes"]');
        if (m == null && l.length > 0) {
            l[l.length - 1].setAttribute("data-selected", "yes");
            l[l.length - 1].style.backgroundColor = "#F0F0F0"
        } else {
            if (l.length > 0) {
                if (m.previousSibling) {
                    m.setAttribute("data-selected", "no");
                    m.style.backgroundColor = "inherit";
                    m.previousSibling.setAttribute("data-selected", "yes");
                    m.previousSibling.style.backgroundColor = "#F0F0F0"
                }
            }
        }
    };
    var i = function () {
        var n = d.querySelector('[data-selected="yes"]');
        var m = n.getAttribute("data-search-item-id");
        var l = true;
        if (k.obj.config.onSearchClick) {
            l = k.obj.config.onSearchClick(k.obj, m)
        }
        if (l == undefined || l == true) {
            k.obj.center(m)
        }
    };
    var j = function (r) {
        var q = k.obj.server.search(r, k.obj.config);
        var l = "";
        for (var m = 0; m < q.length; m++) {
            var n = q[m];
            var p = '<svg style="padding: 2px 0px  2px 7px;" preserveAspectRatio="xMaxYMax meet" width="32" height="32"  viewBox="0,0,' + n.node.w + "," + n.node.h + '">' + k.obj.ui.node(n.node, {}, [], k.obj.config, 0, 0, {}) + "</svg>";
            l += OrgChart.searchUI.createItem(p, n)
        }
        a.innerHTML = l;
        var o = d.querySelectorAll("[data-search-item-id]");
        for (var m = 0; m < o.length; m++) {
            o[m].addEventListener("click", function () {
                var s = true;
                if (k.obj.config.onSearchClick) {
                    s = k.obj.config.onSearchClick(k.obj, this.getAttribute("data-search-item-id"))
                }
                if (s == undefined || s == true) {
                    k.obj.center(this.getAttribute("data-search-item-id"))
                }
            });
            o[m].addEventListener("mouseover", function () {
                this.setAttribute("data-selected", "yes");
                this.style.backgroundColor = "#F0F0F0"
            });
            o[m].addEventListener("mouseleave", function () {
                this.style.backgroundColor = "inherit";
                this.setAttribute("data-selected", "no")
            })
        }
    }
};
OrgChart.searchUI.createInputField = function (a) {
    return '<div data-id="search" style="display:none;border-radius: 20px 20px;padding:5px; box-shadow: #808080 0px 1px 2px 0px; font-family:Roboto-Regular, Helvetica;color:#7a7a7a;font-size:14px;border:1px solid #d7d7d7;width:300px;position:absolute;top:' + a + "px;left:" + a + 'px;background-color:#ffffff;"><div><div style="float:left;">' + BALKANGraph.icon.search(32, 32) + '</div><div data-id="cell-1" style="float:right; width:83%"><input placeholder="Search" style="font-size:14px;font-family:Roboto-Regular, Helvetica;color:#7a7a7a;width:100%;border:none;outline:none; padding-top:10px;" type="text" /></div><div style="clear:both;"></div></div><div data-id="container"></div></div>'
};
OrgChart.searchUI.createItem = function (b, a) {
    return '<div data-search-item-id="' + a.id + '" style="border-top:1px solid #d7d7d7; padding: 7px 0 7px 0;cursor:pointer;"><div style="float:left;">' + b + '</div><div style="float:right; width:83%"><div style="overflow:hidden; white-space: nowrap;text-overflow:ellipsis;text-align:left;">' + a.textId + '</div><div style="overflow:hidden; white-space: nowrap;text-overflow:ellipsis;text-align:left;">' + a.textInNode + '</div></div><div style="clear:both;"></div></div>'
};
OrgChart.searchUI.createSearchIcon = function (a) {
    return '<div data-id="search-icon" style="padding:5px; position:absolute;top:' + a + "px;left:" + a + 'px;border:1px solid transparent;"><div><div style="float:left;">' + BALKANGraph.icon.search(32, 32) + "</div></div></div>"
};
OrgChart.xScrollUI = function (b, a, e, d, c) {
    this.element = b;
    this.requestParams = e;
    this.config = a;
    this.onSetViewBoxCallback = d;
    this.onDrawCallback = c;
    this.pos = 0
};
OrgChart.xScrollUI.prototype.addListener = function (b) {
    var c = this;
    if (this.config.mouseScroolBehaviour != BALKANGraph.action.xScroll) {
        return
    }
    if (!this.bar) {
        return
    }

    function a(i, h, g) {
        var d = false;
        i.addEventListener("mousewheel", f, false);
        i.addEventListener("DOMMouseScroll", f, false);

        function f(l) {
            l.preventDefault();
            var k = l.delta || l.wheelDelta;
            if (k === undefined) {
                k = -l.detail
            }
            k = Math.max(-1, Math.min(1, k));
            c.pos += -k * h;
            var m = (parseFloat(c.innerBar.clientWidth) - parseFloat(c.bar.clientWidth));
            if (c.pos < 0) {
                c.pos = 0
            }
            if (c.pos > m) {
                c.pos = m
            }
            if (!d) {
                j()
            }
        }

        function j() {
            d = true;
            var k = (c.pos - c.bar.scrollLeft) / g;
            if (k > 0) {
                k++
            } else {
                k--
            }
            c.bar.scrollLeft += k;
            if (c.bar.scrollLeft == c.pos) {
                d = false
            } else {
                e(j)
            }
        }
        var e = function () {
            return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (k) {
                setTimeout(k, 1000 / 50)
            })
        }()
    }
    a(b, 120, 12)
};
OrgChart.xScrollUI.prototype.create = function (c) {
    var b = this;
    this.bar = document.createElement("div");
    this.innerBar = document.createElement("div");
    var a = this.requestParams();
    this.innerBar.innerHTML = "&nbsp";
    Object.assign(this.bar.style, {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: (c) + "px",
        "overflow-x": "scroll",
        height: "20px"
    });
    this.element.appendChild(this.bar);
    this.bar.appendChild(this.innerBar);
    this.bar.addEventListener("scroll", function () {
        if (this.ignore) {
            this.ignore = false;
            return
        }
        var f = b.requestParams();
        var d = (parseFloat(b.innerBar.clientWidth) - parseFloat(b.bar.clientWidth)) / 100;
        var g = this.scrollLeft / d;
        var e = ((f.boundary.right) - (f.boundary.left)) / 100;
        f.viewBox[0] = g * e + f.boundary.left;
        b.onSetViewBoxCallback(f.viewBox);
        clearTimeout(this._aB);
        this._aB = setTimeout(function () {
            b.onDrawCallback()
        }, 500)
    })
};
OrgChart.xScrollUI.prototype.setPosition = function () {
    if (!this.bar) {
        return
    }
    var e = this.requestParams();
    var a = e.boundary.maxY * e.scale;
    var b = Math.abs(e.boundary.maxX - e.boundary.minX) * e.scale;
    switch (this.config.orientation) {
        case BALKANGraph.orientation.bottom:
        case BALKANGraph.orientation.bottom_left:
            a = Math.abs(e.boundary.minY * e.scale);
            break;
        case BALKANGraph.orientation.right:
        case BALKANGraph.orientation.right_top:
            b = Math.abs(e.boundary.minX * e.scale);
            break
    }
    this.innerBar.style.width = b + "px";
    var c = ((e.boundary.right) - (e.boundary.left)) / 100;
    var f = ((e.viewBox[0] - (e.boundary.left)) / c);
    if (f < 0) {
        f = 0
    } else {
        if (f > 100) {
            f = 100
        }
    }
    var d = (parseFloat(this.innerBar.clientWidth) - parseFloat(this.bar.clientWidth)) / 100;
    var g = f * d;
    this.bar.ignore = true;
    this.bar.scrollLeft = g;
    this.pos = this.bar.scrollLeft
};
OrgChart.yScrollUI = function (b, a, e, d, c) {
    this.element = b;
    this.requestParams = e;
    this.config = a;
    this.onSetViewBoxCallback = d;
    this.onDrawCallback = c;
    this.pos = 0
};
OrgChart.yScrollUI.prototype.addListener = function (b) {
    var c = this;
    if (this.config.mouseScroolBehaviour != BALKANGraph.action.yScroll) {
        return
    }
    if (!this.bar) {
        return
    }

    function a(i, h, g) {
        var d = false;
        i.addEventListener("mousewheel", f, false);
        i.addEventListener("DOMMouseScroll", f, false);

        function f(l) {
            l.preventDefault();
            var k = l.delta || l.wheelDelta;
            if (k === undefined) {
                k = -l.detail
            }
            k = Math.max(-1, Math.min(1, k));
            c.pos += -k * h;
            var m = (parseFloat(c.innerBar.clientHeight) - parseFloat(c.bar.clientHeight));
            if (c.pos < 0) {
                c.pos = 0
            }
            if (c.pos > m) {
                c.pos = m
            }
            if (!d) {
                j()
            }
        }

        function j() {
            d = true;
            var k = (c.pos - c.bar.scrollTop) / g;
            if (k > 0) {
                k++
            } else {
                k--
            }
            c.bar.scrollTop += k;
            if (c.bar.scrollTop == c.pos) {
                d = false
            } else {
                e(j)
            }
        }
        var e = function () {
            return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (k) {
                setTimeout(k, 1000 / 50)
            })
        }()
    }
    a(b, 120, 12)
};
OrgChart.yScrollUI.prototype.create = function (a, b) {
    var c = this;
    this.bar = document.createElement("div");
    this.innerBar = document.createElement("div");
    this.innerBar.innerHTML = "&nbsp";
    Object.assign(this.bar.style, {
        position: "absolute",
        right: 0,
        bottom: 0,
        height: (a) + "px",
        "overflow-y": "scroll",
        width: "20px"
    });
    this.element.appendChild(this.bar);
    this.bar.appendChild(this.innerBar);
    this.bar.addEventListener("scroll", function () {
        if (this.ignore) {
            this.ignore = false;
            return
        }
        var f = c.requestParams();
        var d = (parseFloat(c.innerBar.clientHeight) - parseFloat(c.bar.clientHeight)) / 100;
        var g = this.scrollTop / d;
        var e = ((f.boundary.bottom) - (f.boundary.top)) / 100;
        f.viewBox[1] = g * e + f.boundary.top;
        c.onSetViewBoxCallback(f.viewBox);
        clearTimeout(this._aB);
        this._aB = setTimeout(function () {
            c.onDrawCallback()
        }, 500)
    })
};
OrgChart.yScrollUI.prototype.setPosition = function () {
    if (!this.bar) {
        return
    }
    var e = this.requestParams();
    var a = e.boundary.maxY * e.scale;
    var b = e.boundary.maxX * e.scale;
    switch (this.config.orientation) {
        case BALKANGraph.orientation.bottom:
        case BALKANGraph.orientation.bottom_left:
            a = Math.abs(e.boundary.minY * e.scale);
            break;
        case BALKANGraph.orientation.right:
        case BALKANGraph.orientation.right_top:
            b = Math.abs(e.boundary.minX * e.scale);
            break
    }
    this.innerBar.style.height = a + "px";
    var c = (e.boundary.bottom - e.boundary.top) / 100;
    var f = ((e.viewBox[1] - e.boundary.top) / Math.abs(c));
    if (f < 0) {
        f = 0
    } else {
        if (f > 100) {
            f = 100
        }
    }
    var d = (parseFloat(this.innerBar.clientHeight) - parseFloat(this.bar.clientHeight)) / 100;
    var g = f * d;
    this.bar.ignore = true;
    this.bar.scrollTop = g;
    this.pos = this.bar.scrollTop
};
