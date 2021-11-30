var imageeditorlayernextid = 0;
var define=jsml.class_define("__ImageEditorLayer","jsml");
define.constructor(function (doc) {
	this._doc = doc;
	this._canvas = document.createElement("canvas");
	//getRealSize
	var rs = doc.GetOption("CanvasRealSize");
	this._canvas.width = rs.width;
	this._canvas.height = rs.height;
	this._canvas_x = 0;
	this._canvas_y = 0;
	this._2d = this._canvas.getContext("2d");
	this._type = "normal";
	this._drawTimes = 0;
	this._typedata = {};
	imageeditorlayernextid++;
	this._layerid = imageeditorlayernextid;
});
define.method("__CopyState",function(ctx) {
	this._2d.fillStyle=ctx.fillStyle; 
	this._2d.strokeStyle=ctx.strokeStyle;
	
	this._2d.lineCap=ctx.lineCap;
	this._2d.lineJoin=ctx.lineJoin;
	this._2d.lineWidth=ctx.lineWidth;
	this._2d.miterLimit=ctx.miterLimit;	
	
	this._2d.shadowColor=ctx.shadowColor;
	this._2d.shadowOffsetX=ctx.shadowOffsetX;
	this._2d.shadowOffsetY=ctx.shadowOffsetY;
	this._2d.shadowBlur=ctx.shadowBlur;
	
	this._2d.font=ctx.font;
	this._2d.textAlign=ctx.textAlign;
	this._2d.textBaseline=ctx.textBaseline;
	
	this._2d.globalAlpha=ctx.globalAlpha;
	this._2d.globalCompositeOperation=ctx.globalCompositeOperation;
});
define.method("__MergeToNew", function (flowlayer) {
	//NOTE: Keep the whole drawing area
	var minx = Math.min(this._canvas_x, flowlayer._canvas_x);
	var maxx = Math.max(this._canvas_x + this._canvas.width, flowlayer._canvas_x + flowlayer._canvas.width); // _typedata.overflow_x
	var miny = Math.min(this._canvas_y, flowlayer._canvas_y);
	var maxy = Math.max(this._canvas_y + this._canvas.height, flowlayer._canvas_y + flowlayer._canvas.height);
	var w = maxx - minx;
	var h = maxy - miny;


	var newlayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	newlayer._canvas.width = w;
	newlayer._canvas.height = h;
	//#NOTE
	newlayer.__CopyState(this._2d);
	newlayer._name = this._name;
	newlayer._type = this._type;
	newlayer._typedata = this._typedata;
	//NOTE
	newlayer._canvas_x = minx;
	newlayer._canvas_y = miny;
	//newlayer._typedata.overflow_x = maxx;
	//newlayer._typedata.overflow_y = maxy;
	//#NOTE

	newlayer._drawTimes = this._drawTimes;

	newlayer._2d.drawImage(this._canvas, this._canvas_x - minx, this._canvas_y - miny, this._canvas.width, this._canvas.height);

	//globalCompositeOperation
	newlayer._2d.save();
	newlayer._2d.globalCompositeOperation = this._doc.GetOption("Ctx_CompositeOperation");
	newlayer._2d.drawImage(flowlayer._canvas, flowlayer._canvas_x - minx, flowlayer._canvas_y - miny, flowlayer._canvas.width, flowlayer._canvas.height);
	//newlayer._2d.globalCompositeOperation = "source-over";
	newlayer._2d.restore();
	return newlayer;
});
define.method("__CopyLayerProperty", function (layer) {
	this._canvas.width = layer._canvas.width;
	this._canvas.height = layer._canvas.height;
	this.__CopyState(layer._2d);
	this._name = layer._name;
	this._type = layer._type;
	this._typedata = layer._typedata;
	//NOTE
	this._canvas_x = layer._canvas_x;
	this._canvas_y = layer._canvas_y;
	//#NOTE
	this._drawTimes = layer._drawTimes;
});
define.method("__GetSelection", function () {
	if (this._selection)
		return this._selection;
	var w = this._canvas.width; //Math.min(this._doc._canvas.width + this._canvas_x, this._doc._canvas.width);
	var h = this._canvas.height;//Math.min(this._doc._canvas.height + this._canvas_y, this._doc._canvas.height);
	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);
	ctx.globalCompositeOperation = "destination-out";
	ctx.drawImage(this._canvas, this._canvas_x, this._canvas_y, this._canvas.width, this._canvas.height);

	var id = ctx.getImageData(0, 0, w, h);
	for (var i = 0; i < w * h; i++) {
		var d = id.data[i * 4 + 3];
		if (d > 0 && d < 255)
			id.data[i * 4 + 3] = 0;
	}
	ctx.putImageData(id, 0, 0);

	ctx.fillStyle = this._doc.GetOption("SelectionPattern");
	ctx.globalCompositeOperation = "source-in";
	ctx.fillRect(0, 0, w, h);
	this._selection = canvas;
	return canvas;
});
define.method("__SetNormal",function()
{
	this._type="normal";
});
define.method("__RecalcOptions", function () {
	if (this._cacheCanvas == null)
		return;
	this.__ApplyOptions();
});
define.method("__ProcessChangeOptions", function () {
	return this.__ApplyOptions();
});
define.method("__ApplyOptions", function () {
	var oldcanvas = this._cacheCanvas;

	this._cacheCanvas = null;
	var self = this;
	var canvas;
	var c2d;

	var w = this._canvas.width; //Math.min(this._doc._canvas.width + this._canvas_x, this._doc._canvas.width);
	var h = this._canvas.height; //Math.min(this._doc._canvas.height + this._canvas_y, this._doc._canvas.height);

	function MakeCanvas() {
		if (canvas) return;
		canvas = document.createElement("canvas");
		canvas.width = w; //self._doc._canvas.width;
		canvas.height = h; //self._doc._canvas.height;
		canvas._canvas_x = self._canvas_x;
		canvas._canvas_y = self._canvas_y;
		c2d = canvas.getContext("2d");
		c2d.save();
		self._cacheCanvas = canvas;
	}

	var his = this._doc.get_history();
	var se = his.__GetLayerProperty(this, "ShadowEnabled") || false;
	var sb = parseInt(his.__GetLayerProperty(this, "ShadowBlur") || "0");
	var sx = parseInt(his.__GetLayerProperty(this, "ShadowX") || "5");
	var sy = parseInt(his.__GetLayerProperty(this, "ShadowY"));
	var sc = his.__GetLayerProperty(this, "ShadowColor") || "Black";
	if (se && (sx || sy)) {
		MakeCanvas();
		c2d.shadowBlur = sb;
		c2d.shadowColor = sc;
		c2d.shadowOffsetX = sx;
		c2d.shadowOffsetY = sy;
	}

	//glowin
	var gie = his.__GetLayerProperty(this, "GlowInEnabled") || false;
	var gib = parseInt(his.__GetLayerProperty(this, "GlowInWidth") || "5");
	var gic = his.__GetLayerProperty(this, "GlowInColor") || "rgba(255,255,255,0.5)";
	if (gie && gib > 0) {
		MakeCanvas();
	}
	//glowout
	var goe = his.__GetLayerProperty(this, "GlowOutEnabled") || false;
	var gob = parseInt(his.__GetLayerProperty(this, "GlowOutWidth") || "5");
	var goc = his.__GetLayerProperty(this, "GlowOutColor") || "rgba(255,255,255,0.5)";
	if ((gie && gib > 0) || (goe && gob > 0)) {
		MakeCanvas();
	}

	if (canvas) {
		c2d.drawImage(this._canvas, 0, 0, canvas.width, canvas.height);
		c2d.restore();
	}

	if (gie && gib > 0) {
		var sel = this.__GetSelection();

		var ca = document.createElement("CANVAS");
		ca.width = w;
		ca.height = h;
		var da = ca.getContext("2d");
		da.drawImage(sel, 0, 0, sel.width, sel.height);
		this._doc._ExpandDrawing(ca, gib);

		var cb = document.createElement("CANVAS");
		cb.width = w;
		cb.height = h;
		var db = cb.getContext("2d");
		db.fillStyle = gic;
		db.fillRect(0, 0, ca.width, ca.height);
		db.globalCompositeOperation = "destination-in";
		db.drawImage(ca, 0, 0, ca.width, ca.height);
		db.globalCompositeOperation = "destination-out";
		db.drawImage(sel, 0, 0, sel.width, sel.height);

		c2d.drawImage(cb, 0, 0, cb.width, cb.height);
	}

	if (goe && gob > 0) {
		var sel = this.__GetSelection();

		var newc = document.createElement("canvas");
		newc.width = sel.width;
		newc.height = sel.height;
		var new2d = newc.getContext("2d");
		new2d.fillStyle = "black"; //this._doc.GetOption("SelectionPattern");
		new2d.fillRect(0, 0, sel.width, sel.height);
		new2d.globalCompositeOperation = "destination-out"
		new2d.drawImage(sel, 0, 0, sel.width, sel.height);

		sel = newc;

		var ca = document.createElement("CANVAS");
		ca.width = w;
		ca.height = h;
		var da = ca.getContext("2d");
		da.drawImage(sel, 0, 0, sel.width, sel.height);
		this._doc._ExpandDrawing(ca, gob);

		var cb = document.createElement("CANVAS");
		cb.width = w;
		cb.height = h;
		var db = cb.getContext("2d");
		db.fillStyle = goc;
		db.fillRect(0, 0, ca.width, ca.height);
		db.globalCompositeOperation = "destination-in";
		db.drawImage(ca, 0, 0, ca.width, ca.height);
		db.globalCompositeOperation = "destination-out";
		db.drawImage(sel, 0, 0, sel.width, sel.height);

		c2d.drawImage(cb, 0, 0, cb.width, cb.height);
	}

	return oldcanvas != canvas;
});

define.property("name",
	function()
	{
		return this._name;
	}
	,
	function(val)
	{
		this._name=val;
	}
);

var define=jsml.class_define("__ImageEditorHistory","jsml");
define.constructor(function (doc) {
	this._doc = doc;
	this._dict = {};
	if (doc._history) {
		this._canvas_width = doc._history._canvas_width;
		this._canvas_height = doc._history._canvas_height;
		//this._selection = doc._history._selection; //do not copy selection
		this._layers = doc._history._layers.concat();
		this._selectLayer = doc._history._selectLayer;
		var pdict = doc._history._dict;
		for (var p in pdict)
			this._dict[p] = pdict[p];
	}
	else {
		this._canvas_width = doc._canvas.width;
		this._canvas_height = doc._canvas.height;
		var deflayer = jsml.class_create_instance("__ImageEditorLayer", [doc]);
		deflayer.set_name(this._doc.Text["Layer_Background"]);
		this._layers = [deflayer];
		this._selectLayer = deflayer;
	}
});
define.property("name",
	function()
	{
		return this._name;
	}
	,
	function(val)
	{
		this._name=val;
	}
);
define.method("__GetLayerProperty",function(layer,name)
{
	return this._dict[layer._layerid + ":"+name];
});
define.method("__SetLayerProperty", function (layer, name, value) {
	if (value == null)
		delete this._dict[layer._layerid + ":" + name];
	else
		this._dict[layer._layerid + ":" + name] = value;
});
define.method("__CopyLayerProperties", function (oldlayer, newlayer) {
	var prefix = oldlayer._layerid + ":";
	var pl = prefix.length;
	var ns = []
	var vs = [];
	for (var p in this._dict) {
		if (p.substring(0, pl) != prefix)
			continue;
		ns.push(p.substring(pl));
		vs.push(this._dict[p]);
	}
	for (var i = 0; i < ns.length; i++) {
		this._dict[newlayer._layerid + ":" + ns[i]] = vs[i];
	}
});



/****************************************************************\
	ImageEditorDocument
\****************************************************************/
var define=jsml.class_define("ImageEditorDocument","jsml");
define.constructor(function () {
	this._plugins = {};
	this._options = {};
	this.__InitOption();
	this.SetOption("TempPath", "");
	this.SetOption("GraphicPath", "");
	this.SetOption("Overwrite", "false");
	this.SetOption("LockOverwrite", false);
	this.SetOption("LockFileName", false);
	this.SetOption("PageType", "aspx");
	this.SetOption("LoadedFonts", []);
	this.Text = imageeditor_lang;

	this._canvas = document.createElement("canvas");
	this._canvas.width = 640;
	this._canvas.height = 480;
	this.SetOption("CanvasRealSize", { width: this._canvas.width, height: this._canvas.height });
	//this._canvas.style.backgroundColor="white";
	this._canvas.style.border = "solid 1px #cccccc";
	this._canvas.style.backgroundImage = "url(images/transback.gif)";
	this._2d = this._canvas.getContext("2d");

	this.__Reset2D();

	this.__MakeErase();

	var doc = this;
	function MakeSelectionPattern() {
		var _pc = document.createElement("canvas");
		_pc.width = 2000;
		_pc.height = 2000;
		var _2d = _pc.getContext("2d");
		_2d.fillStyle = "gray";
		_2d.fillRect(0, 0, _pc.width, _pc.height);
		_2d.rotate(-Math.PI / 6);
		_2d.fillStyle = "gold";

		for (var y = -2000; y < 2000; y += 10) {
			_2d.fillRect(-2000, y, 4000, 1.5);
		}

		var pat = doc._2d.createPattern(_pc, "repeat");
		doc.SetOption("SelectionPattern", pat);
	}
	//MakeSelectionPattern();
	doc.SetOption("SelectionPattern", "Black");


	this._history = jsml.class_create_instance("__ImageEditorHistory", [this]);
	this._history.set_name(this.Text["Layer_Background"]);
	this._historylist = [this._history];
	this._delegate_HandleCanvasEvent = jsml.delegate(this, this.__HandleCanvasEvent);

	this._canvas.onmousedown = this._delegate_HandleCanvasEvent;
	this._canvas.onmouseup = this._delegate_HandleCanvasEvent;
	this._canvas.onmousemove = this._delegate_HandleCanvasEvent;
	this._canvas.onmouseout = this._delegate_HandleCanvasEvent;
	this._canvas.oncontextmenu = this._delegate_HandleCanvasEvent;
	this._canvas.onclick = this._delegate_HandleCanvasEvent;
	this._canvas.onselectstart = this._delegate_HandleCanvasEvent;
	this._canvas.ondragover = this._delegate_HandleCanvasEvent;
	this._canvas.ondrop = this._delegate_HandleCanvasEvent;
	if (jsml.firefox)
		this._canvas.addEventListener("DOMMouseScroll", this._delegate_HandleCanvasEvent, false);
	else
		this._canvas.onmousewheel = this._delegate_HandleCanvasEvent;

	jsml.dom_attach_event(document.body, "keydown", this._delegate_HandleCanvasEvent);
	jsml.dom_attach_event(document.body, "click", jsml.delegate(this, function () {
		this.__CloseContextMenu();
		if (this._colorpicker) this._colorpicker.set_visible(0);
	}));
	jsml.dom_attach_event(document.body, "contextmenu", jsml.delegate(this, function () {
		this.__CloseContextMenu();
		if (this._colorpicker) this._colorpicker.set_visible(0);
	}));
	jsml.dom_attach_event(window, "resize", jsml.delegate(this, function () {
		this.__ReCalcCropComp();
		this.__ReCalcFreeComp();
	}));

});
define.property("canvas",function()
{
	return this._canvas;
});
define.method("__Reset2D", function () {
	try {
		this._2d.restore();
	} catch (x) {
	}
	this._2d.save();

	this._2d.globalCompositeOperation = "source-over";
	this._2d.globalAlpha = 1;
	return this._2d;
});
define.method("__LoadXmlUrl", function (url, hander, instfunc, gvars) {
	var xh = jsml.xmlhttp();
	xh.onreadystatechange = function () {
		if (xh.readyState < 4) return;
		xh.onreadystatechange = new Function();
		if (xh.status == 0) return;
		jsml.parse_xmldoc(xh.responseXML, instfunc, gvars);
		if (hander) hander();
	}
	xh.open("GET", url, true);
	xh.send("");
});
define.method("__LoadPlugin", function (name, callback, vars) {
	name = String(name).toLowerCase();
	var map = this._plugins;
	if (!map) map = this._plugins = {};
	var plugin = map[name];
	if (plugin) {
		if (!callback) return;
		setTimeout(function () {
			callback(plugin);
		}, 1);
		return;
	}
	plugin = {};
	plugin.Name = name;
	map[name] = plugin;
	function hander() {
		if (callback) callback(plugin);
	}
	function processinst() {
	}
	var gvars = { plugin: plugin, doc: this };
	if (vars) {
		for (var vn in vars)
			gvars[vn] = vars[vn];
	}
	this.__LoadXmlUrl("addon/" + name + ".xml", hander, processinst, gvars);
});
define.method("__LoadFont", function (name) {
	var loadedfonts = this.GetOption("LoadedFonts");
	for (var i = 0; i < loadedfonts.length; i++) {
		if (loadedfonts[i] == name)
			return;
	}
	var stylesheet = document.styleSheets[0];
	var fontface = "@font-face {" +
		"font-family:'" + name + "';" +
		"src:url('font/" + name + ".woff') format('woff'),url('font/" + name + ".ttf') format('truetype');" +
		"}";
	if (typeof (stylesheet.insertRule) == "function") {
		stylesheet.insertRule(fontface, 0);
	}
	else if (typeof (stylesheet.cssText) == "string") {
		stylesheet.cssText = fontface;
	}
	loadedfonts.push(name);
	this.SetOption("LoadedFonts", loadedfonts);
});
define.method("__InitOption", function () {
	this.SetOption("SelectionAlpha", 0.2);
	this.SetOption("Ctx_LineWidth", 1);
	this.SetOption("Ctx_ForeColor", "White");
	this.SetOption("Ctx_BackColor", "Black");
	this.SetOption("Ctx_FillType", "fill");
	this.SetOption("Ctx_GradientType", "linear");
	this.SetOption("Ctx_UsePattern", false);
	this.SetOption("Ctx_UseRadius", false);
	this.SetOption("Ctx_RadiusVal", "3");
	//this.SetOption("Ctx_FillPattern", null);
	this.SetOption("Ctx_PenType", "stroke");
	this.SetOption("Ctx_CompositeOperation", "source-over");
	this.SetOption("Ctx_TextColor", "Black");

	this.SetOption("Ctx_PolygonSides", 5);
	this.SetOption("Ctx_StarPoints", 5);
	this.SetOption("Ctx_StarRatio", 0.4);
	this.SetOption("Ctx_FrameExpandSize", true);

	this.SetOption("Ctx_StampAlignment", true);
	this.SetOption("Ctx_StampDiameter", 20);
	this.SetOption("Ctx_StampHardness", 100);
	this.SetOption("Ctx_StampAlpha", 100);

	this.SetOption("EraseBrushColor", "transparent");
	this.SetOption("EraseBrushShape", "rect");
	this.SetOption("EraseBrushSize", 20);

	this.SetOption("ZoomFactor", { "In": [2, 3, 4, 5, 6, 7, 8, 9, 10], "Out": [0.9, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2] });
	this.SetOption("ZoomCount", 0);
	this.SetOption("ZoomX", 0);
	this.SetOption("ZoomY", 0);

	//save file options
	this.SetOption("FileName", "");
	this.SetOption("FileType", "");
	this.SetOption("Guid", S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	this._clipboard = null;

	//this._framelist  add border tool list UI
	//this._watermarklist  add watermark tool list UI
});
define.method("SetOption",function(name,val){
	var oldval=this._options[name];
	this._options[name]=val;
	this.invoke_event("OptionChanged",val,oldval);
});
define.method("GetOption",function(name){
	return this._options[name];
});
define.method("__MakeErase", function () {
	var shape = this.GetOption("EraseBrushShape");
	var size = this.GetOption("EraseBrushSize");
	var color = this.GetOption("EraseBrushColor");

	this._erase_m = document.createElement("canvas");
	this._erase_m.width = size;
	this._erase_m.height = size;
	var e2d_m = this._erase_m.getContext("2d");
	e2d_m.fillStyle = "black";

	this._erase = document.createElement("canvas");
	this._erase.width = size;
	this._erase.height = size;
	var e2d = this._erase.getContext("2d");
	e2d.fillStyle = color == "transparent" ? "rgba(255,255,255,0)" : color;
	if (shape == "rect") {
		e2d.fillRect(0, 0, size, size);
		e2d_m.fillRect(0, 0, size, size);
	}
	else {
		var r = Math.floor(size / 2);
		e2d.arc(r, r, r, 0, Math.PI * 2, false);
		e2d.fill();
		e2d_m.arc(r, r, r, 0, Math.PI * 2, false);
		e2d_m.fill();
	}
});

define.method("__LoadFile", function (file, isnewdoc) {
	var self = this;
	var img = document.createElement("IMG");
	img.onload = function () {
		var lix = file.name.lastIndexOf(".");
		var fn = file.name;
		var ft = "png";
		if (lix >= 0) {
			fn = file.name.substr(0, lix);
			ft = file.name.substring(lix + 1).toLowerCase();
			var allext = ",png,gif,jpg,bmp,";
			if (allext.indexOf("," + ft + ",") == -1)
				ft = "png";
		}
		var newlayer = jsml.class_create_instance("__ImageEditorLayer", [self]);
		newlayer.set_name(fn);
		if (!isnewdoc) {
			var rs = self.GetOption("CanvasRealSize");
			newlayer._canvas.width = Math.max(img.width, rs.width);
			newlayer._canvas.height = Math.max(img.height, rs.height);
			newlayer._2d.drawImage(img, 0, 0, img.width, img.height);
			self.__DoLayerAdd(newlayer);
		}
		else {
			newlayer._canvas.width = img.width;
			newlayer._canvas.height = img.height;
			newlayer._2d.drawImage(img, 0, 0, img.width, img.height);
			self.__InitOption();
			self.SetOption("FileName", fn);
			self.SetOption("FileType", ft);
			self._canvas.width = img.width;
			self._canvas.height = img.height;
			self.SetOption("CanvasRealSize", { width: img.width, height: img.height });
			self.__Reset2D();
			self._history = null;
			self._history = jsml.class_create_instance("__ImageEditorHistory", [self]);
			self._history.set_name(self.Text["Layer_Background"]);
			self._history._layers[0] = newlayer;
			self._history._selectLayer = newlayer;
			self.__SetHistoryList([self._history]);
			self.set_SelectedTool(null);
			self._canvas.calcpos();
		}
	}
	if (typeof (FileReader) == "undefined") {
		alert(this.Text["FileAPI"]);
		return;
	}
	var reader = new FileReader();
	reader.onload = function () {
		img.src = reader.result;
	}
	reader.readAsDataURL(file);
});

define.method("LoadUrl", function (filename, imgurl) {
	var self = this;
	var img = new Image();
	img.onload = function () {
		var lix = imgurl.lastIndexOf("/");
		if (lix == -1) lix = imgurl.lastIndexOf("\\");
		if (lix == -1) lix = 0;
		else lix++;
		var eix = imgurl.indexOf("?");
		if (eix == -1) eix = imgurl.length;
		var fn = imgurl.substring(lix, eix);
		var ft = "png";
		lix = fn.indexOf(".");
		if (lix >= 0) {
			ft = fn.substring(lix + 1).toLowerCase();
			fn = fn.substr(0, lix);
			var allext = ",png,gif,jpg,bmp,";
			if (allext.indexOf("," + ft + ",") == -1)
				ft = "png";
		}

		self.__InitOption();
		self.SetOption("FileName", fn);
		self.SetOption("FileType", ft);
		if (filename) self.SetOption("FileName", filename);
		self._canvas.width = img.width;
		self._canvas.height = img.height;
		self.SetOption("CanvasRealSize", { width: img.width, height: img.height });
		self.__Reset2D();
		self._history = null;
		self._history = jsml.class_create_instance("__ImageEditorHistory", [self]);
		self._history.set_name(self.Text["Layer_Background"]);
		var layer = jsml.class_create_instance("__ImageEditorLayer", [self]);
		layer.set_name(self.Text["Layer_Background"]);
		layer._2d.drawImage(img, 0, 0, layer._canvas.width, layer._canvas.height);
		self._history._layers[0] = layer;
		self._history._selectLayer = layer;
		self.__SetHistoryList([self._history]);
		self.set_SelectedTool(null);
		if(self._canvas.calcpos) self._canvas.calcpos();
	}

	img.src = imgurl;
});

define.method("__GetMouseXY", function (evt, canvas) {
	var pos = { offsetX: evt.offsetX, offsetY: evt.offsetY, x: evt.clientX || evt.x, y: evt.clientY || evt.y };
	if (jsml.msie) {
		var ox = Math.max(evt.x || 0, evt.offsetX || 0);
		var oy = Math.max(evt.y || 0, evt.offsetY || 0);
		pos = { offsetX: ox, offsetY: oy, x: evt.clientX, y: evt.clientY };
	}
	if (jsml.firefox)
		pos = { offsetX: evt.layerX, offsetY: evt.layerY, x: evt.clientX, y: evt.clientY };
	return pos;
});
define.method("__GetZoomScale", function () {
	var zc = this.GetOption("ZoomCount");
	var zf = this.GetOption("ZoomFactor");
	var scale = 1;
	if (zc > 0)
		scale = zf["In"][zc - 1];
	if (zc < 0)
		scale = zf["Out"][0 - zc - 1];
	return scale;
});
define.method("__Translate", function (pos) {
	var scale = this.__GetZoomScale();
	if (scale == 1)
		return { x: pos.x, y: pos.y };
	var newp = {};
	newp.x = pos.x / scale;
	newp.y = pos.y / scale;
	return newp;
});

define.method("__CloseContextMenu", function () {
	if (this._contextmenu) {
		this._contextmenu.Remove();
		this._contextmenu = null;
	}
	if (this._subcontextmenu) {
		this._subcontextmenu.Remove();
		this._subcontextmenu = null;
	}
});

define.method("__OnIntInput", function (element) {
	element.onkeyup = function () {
		var val = element.value;
		var invalidChars = /[^0-9]/gi;
		if (invalidChars.test(val)) {
			element.value = val.replace(invalidChars, "");
		}
	}
});
define.method("__CSS3LineGradient", function (ctrl, start, fc, ec) {
	if (/WebKit/.test(navigator.userAgent)) ctrl.style.background = "-webkit-linear-gradient(" + start + ", " + fc + " 0%, " + ec + " 100%)";
	if (jsml.firefox) ctrl.style.background = "-moz-linear-gradient(" + start + ", " + fc + " 0%, " + ec + " 100%)";
	if (jsml.opera) ctrl.style.background = "-o-linear-gradient(" + start + ", " + fc + " 0%, " + ec + " 100%)";
	if (jsml.msie) {
		if (/MSIE 9/.test(navigator.userAgent))
			ctrl.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + fc + "',endColorstr='" + ec + "',GradientType=" + (start == "top" ? "0" : "1") + ")";
		else
			ctrl.style.background = "-ms-linear-gradient(" + start + ", " + fc + " 0%, " + ec + " 100%)";
	}
});

define.method("__HandleCanvasEvent", function (evt) {
	var mxy = null;
	if (evt.type != "mouseout") mxy = this.__GetMouseXY(evt, this._canvas);
	this.invoke_event("MousePosChanged", mxy);
	if (evt.type == "selectstart")
		return false;

	if (evt.type == "click" || evt.type == "contextmenu") {
		this.__CloseContextMenu();
	}
	if (evt.type == "contextmenu" && this.get_SelectedTool() != "zoom" && this.get_SelectedTool() != "crop") {
		var pos = this.__GetMouseXY(evt, this._canvas);
		this.__LoadPlugin("contextmenu", function (plugin) {
			if (!plugin.LoadUI) return;
			plugin.LoadUI(document.body, pos);
		});
		if (evt.stopPropagation) evt.stopPropagation();
		if (evt.preventDefault) evt.preventDefault();
		evt.returnValue = false;
		return false;
	}

	switch (evt.type) {
		case "dragover":
			if (evt.stopPropagation) evt.stopPropagation();
			if (evt.preventDefault) evt.preventDefault();
			evt.returnValue = false;
			evt.dataTransfer.dropEffect = "copy";
			return false;
		case "drop":
			for (var i = 0; i < evt.dataTransfer.files.length; i++) {
				var file = evt.dataTransfer.files[i];
				this.__LoadFile(file);
			}
			return false;
	}

	if (evt.type == "keydown" && evt.keyCode == 27) {
		if (this._captureHandleESC)
			this._captureHandleESC();
	}

	if (this._selectedtoolobject) {
		return this._selectedtoolobject.__HandleCanvasEvent(evt);
	}
});
define.method("__HasCaptureMouse",function()
{
	return !!this._captureHandleESC;
});
define.method("__CaptureMouse", function (listener, downevt) {
	var savecursor = document.body.style.cursor;
	var saveselect = document.body.onselectstart;

	document.body.style.cursor = this._canvas.style.cursor;
	document.body.onselectstart = function () {
		return false;
	}

	var downxy = this.__GetMouseXY(downevt, this._canvas);

	var self = this;
	var movestarted = false;
	var movefactor = 10;

	function clearState() {
		document.body.style.cursor = savecursor;
		document.body.onselectstart = saveselect;
		self._captureHandleESC = null;
	}

	self._captureHandleESC = function () {
		clearState();
		if (listener.__HandleCaptureCancel)
			listener.__HandleCaptureCancel();
	}

	function handle_move(evt) {
		if (!self._captureHandleESC) return;
		if (!movestarted) {
			var movexy = self.__GetMouseXY(evt, self._canvas);
			if (Math.abs(movexy.x - downxy.x) < movefactor && Math.abs(movexy.y - downxy.y) < movefactor)
				return;
			movestarted = true;
		}

		if (listener.__HandleCaptureMove)
			listener.__HandleCaptureMove(evt);
	}
	function handle_release() {
		if (!self._captureHandleESC) return;
		clearState();
		if (listener.__HandleCaptureRelease)
			listener.__HandleCaptureRelease();
	}

	jsml.startcapture(handle_move, handle_release);
});
define.property("SelectedTool", function () {
	return this._selectedtool;
}, function (tool) {
	if (this._selectedtoolobject)
		this._selectedtoolobject.__ToolDetach();
	this._selectedtoolobject = null;
	this._selectedtool = tool;
	//TODO: clear previous tool drawing state
	this.SetOption("Ctx_CompositeOperation", "source-over");
	switch (tool) {
		case "select":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolSelect", [this]);
			break;
		case "arrow":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolArrow", [this]);
			break;
		case "rect":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolRect", [this]);
			break;
		case "arc":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolArc", [this]);
			break;
		case "polygon":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolPolygon", [this]);
			break;
		case "star":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolPolygon", [this]);
			break;
		case "pen":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolPen", [this]);
			break;
		case "line":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolPen", [this]);
			this._selectedtoolobject.set_lineMode(true);
			break;
		case "grad":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolGrad", [this]);
			break;
		case "zoom":
			this._canvas.style.cursor = "pointer";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolZoom", [this]);
			break;
		case "erase":
			this._canvas.style.cursor = "none";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolErase", [this]);
			break;
		case "colorpicker":
			this._canvas.style.cursor = "url('images/colorpicker.cur'),default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolColor", [this]);
			break;
		case "fill":
			this._canvas.style.cursor = "url('images/fill.cur'),default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolVarnish", [this]);
			break;
		case "cut":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolCut", [this]);
			break;
		case "crop":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolCrop", [this]);
			break;
		case "copy":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolCopy", [this]);
			break;
		case "paste":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolPaste", [this]);
			break;
		case "text":
			this._canvas.style.cursor = "crosshair";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolText", [this]);
			break;
		case "redo":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolRedo", [this]);
			break;
		case "undo":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolUndo", [this]);
			break;
		case "redeye":
			this._canvas.style.cursor = "none";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolRedeye", [this]);
			break;
		case "freesize":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolFreesize", [this]);
			break;
		case "stamp":
			this._canvas.style.cursor = "default";
			this._selectedtoolobject = jsml.class_create_instance("__ImageEditorToolStamp", [this]);
			break;
		default:
			this._canvas.style.cursor = "default";
			break;
	}

	if (this._selectedtoolobject)
		this._selectedtoolobject.__ToolAttach();

	this.invoke_event("SelectedToolChanged");
});

define.method("__RePaint", function (paintLayerHandler) {
	var rs = this.GetOption("CanvasRealSize");
	//if (this._canvas.width != this._history._canvas_width || this._canvas.height != this._history._canvas_height) {
	this._canvas.width = this._history._canvas_width;
	this._canvas.height = this._history._canvas_height;
	//}
	if (rs.width != this._history._canvas_width || rs.height != this._history._canvas_height) {
		rs.width = this._history._canvas_width;
		rs.height = this._history._canvas_height;
		this.SetOption("CanvasRealSize", rs);
	}

	try { this._2d.restore(); } catch (x) { }
	this._2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

	this.__Reset2D();

	var ls = this._history._layers;

	for (var i = 0; i < ls.length; i++) {
		var layer = ls[i];
		if (this._history.__GetLayerProperty(layer, "Hidden"))
			continue;
		//NOTE: Draw a real size
		var sx = layer._canvas_x;
		var sy = layer._canvas_y;
		var dx = layer._canvas.width;
		var dy = layer._canvas.height;
		this._2d.drawImage(layer._cacheCanvas || layer._canvas, sx, sy, dx, dy);
		//#NOTE
		if (paintLayerHandler)
			paintLayerHandler(layer);
	}

	var sel = this.get_selection();
	if (sel) {
		this.__PaintSelection(sel, "noanimation");
	}

	var zc = this.GetOption("ZoomCount");
	//Fix zoom in and out draw position, use a new scale canvas
	if (zc != 0) {
		var scale = this.__GetZoomScale();

		var zx = this.GetOption("ZoomX");
		var zy = this.GetOption("ZoomY");

		var _scanvas = document.createElement("canvas");
		_scanvas.width = rs.width * scale;
		_scanvas.height = rs.height * scale;

		var _s2d = _scanvas.getContext("2d");
		_s2d.scale(scale, scale);
		_s2d.drawImage(this._canvas, 0, 0);
		this._canvas.width = rs.width * scale;
		this._canvas.height = rs.height * scale;
		this._canvas.calcpos();
		this._2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
		if (zc > 0)
			this._2d.drawImage(_scanvas, 0, 0);
		else
			this._2d.drawImage(_scanvas, -zx, -zy);
	}

	try { this._canvas.calcpos(); } catch (x) { }

	var sel = this.get_selection();
	if (sel) {
		this.__PaintSelection(sel, "onlyanimation");
	}
});
define.method("_ExpandDrawing",function(canvas,w)
{
	var ctx=canvas.getContext("2d");
	ctx.save();
	ctx.shadowColor="black";
	ctx.shadowOffsetX=0;
	ctx.shadowOffsetY=w;
	ctx.drawImage(canvas,0,0,canvas.width,canvas.height);
	ctx.shadowOffsetX=w;
	ctx.shadowOffsetY=0;
	ctx.drawImage(canvas,0,0,canvas.width,canvas.height);
	ctx.shadowOffsetX=0;
	ctx.shadowOffsetY=-w;
	ctx.drawImage(canvas,0,0,canvas.width,canvas.height);
	ctx.shadowOffsetX=-w;
	ctx.shadowOffsetY=0;
	ctx.drawImage(canvas,0,0,canvas.width,canvas.height);
	ctx.restore();
});
define.method("__PaintSelection", function (sel, anim) {
	var zc = this.GetOption("ZoomCount");
	var scale = this.__GetZoomScale();

	if (!anim || anim != "onlyanimation") {
		this._2d.save();
		this._2d.globalAlpha = this.GetOption("SelectionAlpha");
		this._2d.drawImage(sel, 0, 0, sel.width, sel.height);
		this._2d.restore();
	}

	if (scale != 1 && anim && anim == "noanimation")
		return;

	var ca = document.createElement("CANVAS");
	ca.width = this._canvas.width;
	ca.height = this._canvas.height;
	var da = ca.getContext("2d");
	da.save();
	if (!anim || anim != "noscale")
		da.scale(scale, scale);
	da.drawImage(sel, 0, 0, sel.width, sel.height);
	da.restore();
	this._ExpandDrawing(ca, 1);

	var cb = document.createElement("CANVAS");
	cb.width = this._canvas.width;
	cb.height = this._canvas.height;
	var db = cb.getContext("2d");
	db.drawImage(ca, 0, 0, ca.width, ca.height);
	db.save();
	if (!anim || anim != "noscale")
		db.scale(scale, scale);
	db.globalCompositeOperation = "destination-out";
	db.drawImage(sel, 0, 0, sel.width, sel.height);
	db.restore();

	var cc = document.createElement("CANVAS");
	cc.width = this._canvas.width;
	cc.height = this._canvas.height;
	var dc = cc.getContext("2d");
	dc.save();
	dc.drawImage(cb, 0, 0, cb.width, cb.height);
	dc.globalCompositeOperation = "destination-in";
	dc.drawImage(ca, 0, 0, ca.width, ca.height);
	dc.restore();

	var pt = document.createElement("CANVAS");
	pt.width = 40;
	pt.height = 40;
	var p2 = pt.getContext("2d");
	p2.rotate(Math.PI / 4);
	//var cs=["gray","white","blue","yellow"];
	var cs = ["#444444", "white", "#444444", "white"];

	var self = this;
	function DrawCC() {
		scale = self.__GetZoomScale();

		var drawIndex = Math.floor(new Date().getMilliseconds() / 100);
		for (var i = -200; i < 200; i += 4) {
			p2.fillStyle = cs[(i / 4 + drawIndex) % cs.length]
			p2.fillRect(i, -100, 4, 200);
		}

		if (self._Expand && (self._Expand_Width != self._canvas.width || self._Expand_Height != self._canvas.height)) {
			//var ca = document.createElement("CANVAS");
			ca.width = self._canvas.width;
			ca.height = self._canvas.height;
			da.restore();
			da.clearRect(0, 0, ca.width, ca.height);
			//var da = ca.getContext("2d");
			da.save();
			da.scale(scale, scale);
			da.drawImage(sel, 0, 0, sel.width, sel.height);
			da.restore();
			self._ExpandDrawing(ca, 1);

			//var cb = document.createElement("CANVAS");
			cb.width = self._canvas.width;
			cb.height = self._canvas.height;
			db.restore();
			db.clearRect(0, 0, cb.width, cb.height);
			//var db = cb.getContext("2d");
			db.drawImage(ca, 0, 0, ca.width, ca.height);
			db.save();
			db.scale(scale, scale);
			db.globalCompositeOperation = "destination-out";
			db.drawImage(sel, 0, 0, sel.width, sel.height);
			db.restore();

			//var cc = document.createElement("CANVAS");
			cc.width = self._canvas.width;
			cc.height = self._canvas.height;
			dc.restore();
			dc.clearRect(0, 0, cc.width, cc.height);
			//var dc = cc.getContext("2d");

			dc.save();
			dc.drawImage(cb, 0, 0, cb.width, cb.height);
			dc.globalCompositeOperation = "destination-in";
			dc.drawImage(ca, 0, 0, ca.width, ca.height);
			dc.restore();
		}

		dc.save();
		dc.globalCompositeOperation = "source-atop";
		dc.fillStyle = dc.createPattern(pt, "repeat");
		dc.fillRect(0, 0, cc.width, cc.height);
		dc.restore();

		self._Expand = true;
		self._Expand_Width = self._canvas.width;
		self._Expand_Height = self._canvas.height;

		self._2d.drawImage(cc, 0, 0, cc.width, cc.height);
	}
	DrawCC();

});
define.method("__DoHistoryAdd",function(newhistory,newlayer)
{
	var deleted=false;
	for(var i=0;i<this._historylist.length;i++)
	{
		if(this._historylist[i]==this._history)
		{
			if(this._historylist.length>i+1)
			{
				this._historylist.length=i+1;
				deleted=true;
			}
			break;
		}
	}	
	
	this._historylist.push(newhistory);
	this._history = newhistory;

	if (newlayer)
		newlayer.__ProcessChangeOptions();

	if(deleted)
		this.invoke_event("HistoryRefresh");
	else
		this.invoke_event("HistoryAdded");
	this.invoke_event("HistorySelected");
	this.__RePaint();
});
define.method("__DeleteUnselected", function (layer) {
	var sel = this.get_selection();
	if (!sel) return;

	var rc = this.GetOption("CanvasRealSize");

	var ctx = layer._2d;
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";
	ctx.drawImage(sel, -layer._canvas_x, -layer._canvas_y, sel.width, sel.height);
	ctx.restore();

	if (layer._canvas_x < 0)
		ctx.clearRect(0, 0, -layer._canvas_x, layer._canvas.height);
	if (layer._canvas_y < 0)
		ctx.clearRect(0, 0, layer._canvas.width, -layer._canvas_y);

	var wextra = layer._canvas_x + layer._canvas.width - rc.width;
	if (wextra > 0)
		ctx.clearRect(-layer._canvas_x + rc.width, 0, wextra, layer._canvas.height);

	var hextra = layer._canvas_y + layer._canvas.height - rc.height;
	if (hextra > 0)
		ctx.clearRect(0, -layer._canvas_y + rc.height, layer._canvas.width, hextra);

	layer.__SetNormal();
});
define.method("__DoLayerAdd",function(layer)
{
	var newhistory=jsml.class_create_instance("__ImageEditorHistory",[this]);
	newhistory.set_name(layer.get_name());
	newhistory._layers.push(layer);
	newhistory._selectLayer = layer;
	this.__DoHistoryAdd(newhistory, layer);
});
define.method("__DoLayerDraw", function (layer) {
	var currlayer = this.get_layer();
	var newlayer = currlayer.__MergeToNew(layer);
	newlayer.__SetNormal();
	if (currlayer._canvas.width == newlayer._canvas.width &&
		currlayer._canvas.height == newlayer._canvas.height) {
		newlayer._initrotate = currlayer._initrotate;
	}
	else {
		newlayer._initrotate = null;
	}
	//#NOTE
	newlayer._drawTimes++;
	newlayer._selection = null;
	if (newlayer._drawTimes == 1) {
		newlayer._type = layer._type;
		newlayer._typedata = layer._typedata;
	}
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(layer.get_name());
	for (var i = 0; i < newhistory._layers.length; i++) {
		if (newhistory._layers[i] == currlayer) {
			newhistory._layers[i] = newlayer;
			newhistory.__CopyLayerProperties(currlayer, newlayer);
			newhistory._selectLayer = newlayer;
		}
	}
	this.__DoHistoryAdd(newhistory, newlayer);
	return newlayer;
});
define.method("__DoLayerCover", function (layer) {
	var currlayer = this.get_layer();
	var newlayer = currlayer.__MergeToNew(layer);
	newlayer._layerid = currlayer._layerid;
	newlayer.set_name(currlayer.get_name());
	newlayer.__SetNormal();
	newlayer._drawTimes++;
	newlayer._selection = null;
	if (newlayer._drawTimes == 1) {
		newlayer._type = currlayer._type;
		newlayer._typedata = currlayer._typedata;
	}
	var ls = this._history._layers;
	for (var i = ls.length - 1; i >= 0; i--) {
		if (ls[i]._layerid == newlayer._layerid) {
			ls[i] = newlayer;
			break;
		}
	}
	this.invoke_event("HistoryRefresh");
	this.invoke_event("HistorySelected");
	this.set_layer(newlayer);
});
define.method("__GetHistoryList",function()
{
	return this._historylist.concat();
});
define.method("__SetHistoryList", function (val) {
	this._historylist = val;
	this.set_history(val[val.length - 1]);
	this.invoke_event("HistoryRefresh");
	this.invoke_event("HistorySelected");
});
define.method("__RemoveHistory", function (history) {
	for (var i = 0; i < this._historylist.length; i++) {
		if (this._historylist[i] == history) {
			this._historylist.splice(i, 1);
			return;
		}
	}
});
define.method("__GetLayerList",function()
{
	return this._history._layers.concat();
});
define.method("__MoveLayerUp", function (layer) {
	var ix = null;
	var layers = this.__GetLayerList();
	for (var i = 0; i < layers.length; i++) {
		if (layers[i]._layerid == layer._layerid) {
			ix = i;
			break;
		}
	}
	if (ix == null)
		return;
	this._history._layers.splice(ix, 1);
	this._history._layers.splice(ix + 1, 0, layer);
	this.__RePaint();
	this.invoke_event("HistoryRefresh");
	this.invoke_event("HistorySelected");
});
define.property("history",
	function()
	{
		return this._history;
	},
	function(val)
	{
		this._history=val;
		this.invoke_event("HistorySelected");
		this.invoke_event("LayerSelected");
		this.__RePaint();
	}
);
define.property("layer", 
	function () {
		return this._history._selectLayer;
	},
	function (val) {
		this._history._selectLayer = val;
		this.invoke_event("LayerSelected");
	}
);
define.property("selection",
	function () {
		return this._history._selection;
	}
	,
	function (val) {
		this._Expand = null;
		this._history._selection = val;
		this.invoke_event("SelectionChanged");
	}
);

define.method("__NewLayer",function(){
	var layer=jsml.class_create_instance("__ImageEditorLayer",[this]);
	layer.set_name(this.Text["Layer_New"]);
	this._history._layers.push(layer);
	this.set_layer(layer);
	this.invoke_event("LayerAdded");
});
define.method("__SelectLayerSelection", function (layer) {
	var canvas = layer.__GetSelection();
	this.set_selection(canvas);
	this.__RePaint();
});
define.method("ToolSelection_Inverse", function (canvas) {
	var newc = document.createElement("canvas");
	newc.width = canvas.width;
	newc.height = canvas.height;
	var new2d = newc.getContext("2d");
	new2d.fillStyle = this.GetOption("SelectionPattern");
	new2d.fillRect(0, 0, canvas.width, canvas.height);
	new2d.globalCompositeOperation = "destination-out"
	new2d.drawImage(canvas, 0, 0, canvas.width, canvas.height);
	return newc;
});
define.method("__ResizeSelection", function (scaleX, scaleY, offsetX, offsetY) {
	var sel = this.get_selection();
	if (!sel) {
		return;
	}
	if (!sel._scale) {
		this._oriselection = sel;
		sel._scale = { x: 1, y: 1 };
	}
	var dx = offsetX;
	var dy = offsetY;
	if (sel._offsetbak) {
		dx += sel._offsetbak.x;
		dy += sel._offsetbak.y;
	}
	var inverse = this.ToolSelection_Inverse(this._oriselection);
	if (this._invertcount % 2 == 1)
		inverse = this._oriselection;
	var iv2d = inverse.getContext("2d");
	sel._offset = { x: dx, y: dy };
	sel._scale.x = scaleX; //sel._scale.x * scaleX;
	sel._scale.y = scaleY; //sel._scale.y * scaleY;
	var oldwidth = inverse.width;
	var oldheight = inverse.height;
	var nowwidth = sel._scale.x * oldwidth;
	var nowheight = sel._scale.y * oldheight;
	var ox = (nowwidth - oldwidth) / 2;
	var oy = (nowheight - oldheight) / 2;
	var newcanvas = document.createElement("canvas");
	newcanvas.width = nowwidth; //this._canvas.width;
	newcanvas.height = nowheight; //this._canvas.height;
	var n2d = newcanvas.getContext("2d");
	n2d.fillStyle = this.GetOption("SelectionPattern");
	n2d.fillRect(0, 0, newcanvas.width, newcanvas.height);

	n2d.save();
	n2d.translate(newcanvas.width / 2, newcanvas.height / 2); //translate to rotate center
	n2d.scale(sel._scale.x, sel._scale.y);
	n2d.translate(0 - newcanvas.width / 2, 0 - newcanvas.height / 2); //translate to rotate center
	n2d.globalCompositeOperation = "xor";
	//n2d.drawImage(inverse, 0, 0, inverse.width, inverse.height, ox, oy, inverse.width, inverse.height);
	n2d.drawImage(inverse, ox, oy);
	n2d.restore();

	var lcanvas = document.createElement("canvas");
	lcanvas.width = this._canvas.width;
	lcanvas.height = this._canvas.height;
	lcanvas._scale = sel._scale;
	lcanvas._offset = sel._offset;
	if (sel._offsetbak)
		lcanvas._offsetbak = sel._offsetbak;
	var l2d = lcanvas.getContext("2d");
	var ox2 = (lcanvas.width - nowwidth) / 2;
	var oy2 = (lcanvas.height - nowheight) / 2;

	if (this._invertcount % 2 == 0) {
		l2d.fillStyle = this.GetOption("SelectionPattern");
		l2d.fillRect(0, 0, lcanvas.width, lcanvas.height);
	}
	l2d.save();
	l2d.globalCompositeOperation = "xor";
	l2d.drawImage(this.ToolSelection_Inverse(newcanvas), ox2 + dx, oy2 + dy);
	l2d.restore();

	this.set_selection(lcanvas);
	this.__RePaint();
});
define.method("__CropFromSelection", function () {
	if (this._cropcomp._cropdiv.style.display == "none")
		return;
	var o_layer = this.get_layer();
	var s_layer = null;

	var w = parseInt(this._cropcomp._cropdiv.style.width);
	var h = parseInt(this._cropcomp._cropdiv.style.height);
	var ox = this._cropcomp._cropdiv._offsetX;
	var oy = this._cropcomp._cropdiv._offsetY;
	var scale = this.__GetZoomScale();
	if (scale != 1) {
		w = w / scale;
		h = h / scale;
		ox = ox / scale;
		oy = oy / scale;
	}
	this._canvas.width = w;
	this._canvas.height = h;
	this.SetOption("CanvasRealSize", { width: w, height: h });

	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_Crop"]);
	this.__DoHistoryAdd(newhistory);
	newhistory._canvas_width = w;
	newhistory._canvas_height = h;
	var layers = newhistory._layers;

	this._cropcomp._cropdiv.style.display = "none";
	this.set_SelectedTool(null);

	for (var i = 0; i < layers.length; i++) {
		var _ocanvas = layers[i]._canvas;
		var _layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		_layer._layerid = layers[i]._layerid;
		_layer.set_name(layers[i].get_name());
		_layer._canvas.width = w;
		_layer._canvas.height = h;
		var ctx = _layer._canvas.getContext("2d");
		var sw = layers[i]._canvas.width;
		var sh = layers[i]._canvas.height;
		var dw = w;
		var dh = h;
		ctx.drawImage(_ocanvas, ox - layers[i]._canvas_x, oy - layers[i]._canvas_y, dw, dh, 0, 0, dw, dh);
		_layer.__CopyState(layers[i]._2d);
		_layer._type = layers[i]._type;
		_layer._typedata = layers[i]._typedata;
		_layer._drawTimes = layers[i]._drawTimes;
		_layer._canvas_x = 0;
		_layer._canvas_y = 0;
		newhistory._layers[i] = _layer;
		if (o_layer._layerid == _layer._layerid)
			s_layer = _layer;
	}
	if (s_layer == null) s_layer = newhistory._layers[0];
	newhistory._selectLayer = s_layer;
	this.__RePaint();
});
define.method("__RemoveFromSelection", function () {
	var sel = this.get_selection();
	if (!sel) {
		return;
	}
	var o_layer = this.get_layer();
	var s_layer = null;
	var rs = this.GetOption("CanvasRealSize");
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_RemoveArea"]);
	this.__DoHistoryAdd(newhistory);
	newhistory._canvas_width = rs.width;
	newhistory._canvas_height = rs.height;
	var layers = newhistory._layers;

	for (var i = 0; i < layers.length; i++) {
		var _olayer = layers[i];
		//only remove selected layer
		if (_olayer._layerid != o_layer._layerid)
			continue;
		var _ocanvas = layers[i]._canvas;
		var _copy_olayer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		_copy_olayer._canvas_x = _olayer._canvas_x;
		_copy_olayer._canvas_y = _olayer._canvas_y;
		_copy_olayer._canvas.width = _olayer._canvas.width;
		_copy_olayer._canvas.height = _olayer._canvas.height;
		_copy_olayer._layerid = _olayer._layerid;
		_copy_olayer.set_name(_olayer.get_name());

		var _octx = _copy_olayer._2d;
		_octx.drawImage(_olayer._canvas, 0, 0, _olayer._canvas.width, _olayer._canvas.height);
		_octx.save();
		_octx.globalCompositeOperation = "destination-in";
		_octx.drawImage(sel, 0 - _olayer._canvas_x, 0 - _olayer._canvas_y, sel.width, sel.height);
		_octx.restore();

		newhistory._layers[i] = _copy_olayer;
		if (o_layer._layerid == _copy_olayer._layerid)
			s_layer = _copy_olayer;
	}
	if (s_layer == null) s_layer = newhistory._layers[0];
	newhistory._selectLayer = s_layer;
	this.__RePaint();
	this.invoke_event("HistorySelected");
});
define.method("__Rotate", function (degree) {
	var currlayer = this.get_layer();
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_Rotate"]);
	this.__DoHistoryAdd(newhistory);

	var layers = newhistory._layers;
	var needresize = false;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var recalc = false;
		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		var rd = Math.sqrt(ow * ow + oh * oh);
		//To fix the image quantity turns lower by many times rotation,
		//use _oricanvas to save the canvas to rotate before rotation
		var pcanvas;
		var dg = degree;
		if (layers[i]._initrotate) {
			canvas.width = ow;
			canvas.height = oh;
			if (layers[i]._oricanvas) {
				dg = (layers[i]._degree + degree) % 360;
				pcanvas = layers[i]._oricanvas;
			}
			else {
				pcanvas = layers[i]._canvas;
			}
		}
		else {
			needresize = true;
			pcanvas = layers[i]._canvas;
			recalc = true;
			canvas.width = rd;
			canvas.height = rd;
		}
		var radians = dg * Math.PI / 180;
		layer._oricanvas = pcanvas;
		layer._degree = dg;
		if ((dg == 90 || dg == 270) && !layers[i]._initrotate) {
			canvas.width = oh;
			canvas.height = ow;
		}
		else
			layer._initrotate = true;
		var c2d = canvas.getContext("2d");
		c2d.save();
		c2d.translate(canvas.width / 2, canvas.height / 2); //translate to rotate center
		c2d.rotate(radians);
		c2d.translate(0 - canvas.width / 2, 0 - canvas.height / 2); //translate back
		c2d.drawImage(pcanvas, (canvas.width - pcanvas.width) / 2, (canvas.height - pcanvas.height) / 2);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		layer._canvas_x = layers[i]._canvas_x - (canvas.width - ow) / 2;
		layer._canvas_y = layers[i]._canvas_y - (canvas.height - oh) / 2;
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	if (needresize) {
		var rs = this.GetOption("CanvasRealSize");
		//var r = Math.sqrt(this._canvas.width * this._canvas.width + this._canvas.height * this._canvas.height);
		var r = Math.ceil(Math.sqrt(rs.width * rs.width + rs.height * rs.height));
		if (dg == 90 || dg == 270)
			this.__ResizeCanvas(rs.height, rs.width, "center", this.Text["Layer_Rotate"]);
		else
			this.__ResizeCanvas(r, r, "center", this.Text["Layer_Rotate"]);
		//remove this history
		this.__RemoveHistory(newhistory);
		this.invoke_event("HistoryRefresh");
		return;
	}
	this.__RePaint();
});
define.method("__Flip", function (hORv) {
	var currlayer = this.get_layer();
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_Flip"]);
	this.__DoHistoryAdd(newhistory);

	var layers = newhistory._layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		if (layers[i]._initrotate) {
			layer._oricanvas = null;
			layer._degree = null;
		}
		canvas.width = ow;
		canvas.height = oh;
		layer._initrotate = layers[i]._initrotate;
		var c2d = canvas.getContext("2d");
		c2d.save();
		if (hORv == "h") {
			c2d.translate(canvas.width, 0);
			c2d.scale(-1, 1);
		}
		else {
			c2d.translate(0, canvas.height);
			c2d.scale(1, -1);
		}
		c2d.drawImage(layers[i]._canvas, 0, 0);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		layer._canvas_x = layers[i]._canvas_x;
		layer._canvas_y = layers[i]._canvas_y;
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	this.__RePaint();
});
define.method("__MergeLayers", function () {
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_Merge"]);
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
	layer.set_name(this.Text["Layer_Merge"]);
	layer._2d.drawImage(this._canvas, 0, 0, layer._canvas.width, layer._canvas.height);
	newhistory._layers[0] = layer;
	newhistory._layers.splice(1, newhistory._layers.length - 1);
	newhistory._selectLayer = layer;

	this.__DoHistoryAdd(newhistory);
});
define.method("__ResizeImage", function (w, h) {
	if (!w || !h)
		return;
	var rs = this.GetOption("CanvasRealSize");
	var scalex = w / rs.width; // this._canvas.width;
	var scaley = h / rs.height; // this._canvas.height;

	if (scalex == 1 && scaley == 1)
		return;

	this._canvas.width = w;
	this._canvas.height = h;

	this.SetOption("CanvasRealSize", { width: w, height: h });

	var currlayer = this.get_layer();
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(this.Text["Layer_ResizeImage"]);
	this.__DoHistoryAdd(newhistory);

	newhistory._canvas_width = w;
	newhistory._canvas_height = h;

	var layers = newhistory._layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		canvas.width = ow * scalex;
		canvas.height = oh * scaley;
		var c2d = canvas.getContext("2d");
		c2d.save();
		c2d.scale(scalex, scaley);
		c2d.drawImage(layers[i]._canvas, 0, 0);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		layer._canvas_x = layers[i]._canvas_x * scalex;
		layer._canvas_y = layers[i]._canvas_y * scaley;
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	this.__RePaint();
});
define.method("__ResizeCanvas", function (w, h, position, name) {
	if (!w || !h)
		return;
	var rs = this.GetOption("CanvasRealSize");
	var offsetx = w - rs.width; // this._canvas.width;
	var offsety = h - rs.height;// this._canvas.height;

	if (offsetx == 0 && offsety == 0)
		return;
	switch (position) {
		case "center":
			offsetx = offsetx / 2;
			offsety = offsety / 2;
			break;
		case "topleft":
			offsetx = 0;
			offsety = 0;
			break;
		case "topcenter":
			offsetx = offsetx / 2;
			offsety = 0;
			break;
		case "topright":
			offsetx = offsetx;
			offsety = 0;
			break;
		case "middleleft":
			offsetx = 0;
			offsety = offsety / 2;
			break;
		case "middleright":
			offsetx = offsetx;
			offsety = offsety / 2;
			break;
		case "bottomleft":
			offsetx = 0;
			offsety = offsety;
			break;
		case "bottomcenter":
			offsetx = offsetx / 2;
			offsety = offsety;
			break;
		case "bottomright":
			offsetx = offsetx;
			offsety = offsety;
			break;
	}

	this._canvas.width = w;
	this._canvas.height = h;

	this.SetOption("CanvasRealSize", { width: w, height: h });

	var currlayer = this.get_layer();
	if (!name) name = this.Text["Layer_ResizeCanvas"];
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(name);
	this.__DoHistoryAdd(newhistory);

	newhistory._canvas_width = w;
	newhistory._canvas_height = h;

	var layers = newhistory._layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		canvas.width = ow;
		canvas.height = oh;
		var c2d = canvas.getContext("2d");
		c2d.save();
		c2d.drawImage(layers[i]._canvas, 0, 0);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		//calc _canvas_x here
		layer._canvas_x = layers[i]._canvas_x + offsetx;
		layer._canvas_y = layers[i]._canvas_y + offsety;
		if (layers[i]._initrotate)
			layer._initrotate = layers[i]._initrotate;
		if (layers[i]._oricanvas) {
			layer._oricanvas = layers[i]._oricanvas;
			layer._degree = layers[i]._degree;
		}
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	this.__RePaint();
});
define.method("__AddEffect", function (func, args) {
	var rs = this.GetOption("CanvasRealSize");
	var w = rs.width;
	var h = rs.height;

	var sel = this.get_selection();
	var currlayer = this.get_layer();
	var name = this.Text["Layer_Effect"];
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(name);
	this.__DoHistoryAdd(newhistory);

	newhistory._canvas_width = w;
	newhistory._canvas_height = h;

	var layers = newhistory._layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		canvas.width = ow;
		canvas.height = oh;
		var c2d = canvas.getContext("2d");
		c2d.save();
		c2d.drawImage(layers[i]._canvas, 0, 0);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		layer._canvas_x = layers[i]._canvas_x;
		layer._canvas_y = layers[i]._canvas_y;
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	this.set_selection(sel);
	func();
	this.__RePaint();
});
define.method("__AddBorder", function (pd, func) {
	var rs = this.GetOption("CanvasRealSize");
	var w = rs.width + pd[1] + pd[3];
	var h = rs.height + pd[0] + pd[2];
	this._canvas.width = w;
	this._canvas.height = h;

	var offsetx = pd[3];
	var offsety = pd[0];

	this.SetOption("CanvasRealSize", { width: w, height: h });

	var currlayer = this.get_layer();
	var name = this.Text["Layer_Frame"];
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(name);
	this.__DoHistoryAdd(newhistory);

	newhistory._canvas_width = w;
	newhistory._canvas_height = h;

	var layers = newhistory._layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var ow = layers[i]._canvas.width;
		var oh = layers[i]._canvas.height;
		if (currlayer._layerid == layer._layerid) {
			canvas.width = w;
			canvas.height = h;
		}
		else {
			canvas.width = ow;
			canvas.height = oh;
		}
		var c2d = canvas.getContext("2d");
		c2d.save();
		if (currlayer._layerid == layer._layerid) {
			currlayer = layer;
			c2d.drawImage(layers[i]._canvas, offsetx, offsety);
		}
		else {
			c2d.drawImage(layers[i]._canvas, 0, 0);
		}
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		//calc _canvas_x here
		if (currlayer._layerid != layer._layerid) {
			layer._canvas_x = layers[i]._canvas_x + offsetx;
			layer._canvas_y = layers[i]._canvas_y + offsety;
			if (layers[i]._initrotate)
				layer._initrotate = layers[i]._initrotate;
			if (layers[i]._oricanvas) {
				layer._oricanvas = layers[i]._oricanvas;
				layer._degree = layers[i]._degree;
			}
		}
		newhistory._layers[i] = layer;

		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
	this.__RePaint();
	func(currlayer);
});
define.method("__AddWatermark", function (pd, src) {
	var currlayer = this.get_layer();
	var pageext = this.GetOption("PageType");
	var self = this;
	var img = new Image();
	img.onload = function () {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [self]);
		layer.set_name(self.Text["Layer_Water"]);
		var offsetx = layer._canvas.width - img.width - pd[0];
		var offsety = layer._canvas.height - img.height - pd[1];
		layer._2d.drawImage(img, offsetx, offsety);
		self.__DoLayerAdd(layer);
		var layers = self._history._layers;
		for (var i = 0; i < layers.length; i++) {
			if (currlayer._layerid != layers[i]._layerid)
				continue;
			self._history._selectLayer = layers[i];
			self.invoke_event("HistorySelected");
			break;
		}
	}
	if (src.toLowerCase().indexOf("http://") == 0 || src.toLowerCase().indexOf("https://") == 0)
		src = "ReadImage.html5." + pageext + "?url=" + encodeURIComponent(src);
	img.src = src;
});
define.method("__CloneHistory", function (name) {
	var currlayer = this.get_layer();
	var layers = this._history._layers;
	var newhistory = jsml.class_create_instance("__ImageEditorHistory", [this]);
	newhistory.set_name(name);
	this.__DoHistoryAdd(newhistory);
	newhistory._layers = [];
	for (var i = 0; i < layers.length; i++) {
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this]);
		var canvas = layer._canvas;
		canvas.width = layers[i]._canvas.width;
		canvas.height = layers[i]._canvas.height;
		layer._layerid = layers[i]._layerid;
		layer.set_name(layers[i].get_name());

		var c2d = canvas.getContext("2d");
		c2d.drawImage(layers[i]._canvas, 0, 0);
		c2d.restore();
		layer.__CopyState(layers[i]._2d);
		layer._type = layers[i]._type;
		layer._typedata = layers[i]._typedata;
		layer._drawTimes = layers[i]._drawTimes;
		layer._canvas_x = layers[i]._canvas_x;
		layer._canvas_y = layers[i]._canvas_y;
		if (layers[i]._initrotate)
			layer._initrotate = layers[i]._initrotate;
		if (layers[i]._oricanvas) {
			layer._oricanvas = layers[i]._oricanvas;
			layer._degree = layers[i]._degree;
		}
		newhistory._layers[i] = layer;
		if (layer._layerid == currlayer._layerid) {
			newhistory._selectLayer = layer;
		}
	}
});
define.method("__GetColorPicker", function () {
	if (this._colorpicker)
		return this._colorpicker;

	this._colorpicker = jsml.class_create_instance("colorpickerpanel");
	this._colorpicker.set_parent(document.body);
	this._colorpicker._element.style.position = "absolute";
	this._colorpicker._element.style.zIndex = 987655;
	return this._colorpicker;
});
define.method("CancelBubble", function (evt) {
	var e = window.event || evt.event || evt;
	if (jsml.msie) e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
	return false;
});
define.method("__InitTextContainer", function () {
	var textcontainer = {};
	var div = document.createElement("div");
	div.style.cssText = "position:absolute; display:none; left:0px; top:0px;cursor:default;";
	textcontainer.div = div;
	textcontainer.ReCalc = function (x, y, w, h) {
		div.style.left = x + "px";
		div.style.top = y + "px";
		div.style.width = w + "px";
		div.style.height = h + "px";
	}
	textcontainer.SetVisible = function (val) {
		if (val == 1 || val == true)
			div.style.display = "";
		else
			div.style.display = "none";
	}
	textcontainer.SetChild = function (element) {
		div.innerHTML = "";
		div.appendChild(element);
	}
	this.textcontainer = textcontainer;
	return div;
});
define.method("__InitFreeComp", function () {
	var freecomp = {};
	var cropdiv = document.createElement("div");
	cropdiv.style.cssText = "position:absolute; display:none; left:0px; top:0px; border:dashed 1px black;cursor:default; z-index:9";
	var cropcorner1 = document.createElement("div");
	cropcorner1.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:nw-resize;";
	cropdiv.appendChild(cropcorner1);
	var cropcorner2 = document.createElement("div");
	cropcorner2.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:ne-resize;";
	cropdiv.appendChild(cropcorner2);
	var cropcorner3 = document.createElement("div");
	cropcorner3.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:se-resize;";
	cropdiv.appendChild(cropcorner3);
	var cropcorner4 = document.createElement("div");
	cropcorner4.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:sw-resize;";
	cropdiv.appendChild(cropcorner4);
	var croprect1 = document.createElement("div");
	croprect1.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px;cursor:w-resize;";
	cropdiv.appendChild(croprect1);
	var croprect2 = document.createElement("div");
	croprect2.style.cssText = "box-shadow:2px 2px transparent;position:absolute; height:30px;cursor:n-resize;";
	cropdiv.appendChild(croprect2);
	var croprect3 = document.createElement("div");
	croprect3.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px;cursor:e-resize;";
	cropdiv.appendChild(croprect3);
	var croprect4 = document.createElement("div");
	croprect4.style.cssText = "box-shadow:2px 2px transparent;position:absolute; height:30px;cursor:s-resize;";
	cropdiv.appendChild(croprect4);
	var fill = document.createElement("div");
	fill.style.cssText = "background:red;opacity:0;position:absolute; left:30px; top:30px; width:0px; height:0px; cursor:move;";
	cropdiv.appendChild(fill);

	var tranpoint1 = document.createElement("div");
	tranpoint1.style.cssText = "width:20px; height:20px; background:transparent url(images/free_l.png) 2px 2px no-repeat; display:block; cursor:pointer;margin-left:-20px;";
	croprect1.appendChild(tranpoint1);

	var tranpoint2 = document.createElement("div");
	tranpoint2.style.cssText = "width:20px; height:20px; background:transparent url(images/free_t.png) 2px 2px no-repeat;; display:block; cursor:pointer;margin-top:-20px;";
	//tranpoint2.innerHTML = "<div style='width:6px; height:6px;background:black; position:relative; top:7px; margin-left:7px;'></div>";
	croprect2.appendChild(tranpoint2);

	var tranpoint3 = document.createElement("div");
	tranpoint3.style.cssText = "width:20px; height:20px; background:transparent url(images/free_r.png) 2px 2px no-repeat;; display:block; cursor:pointer;margin-left:30px; text-align:right;";
	croprect3.appendChild(tranpoint3);

	var tranpoint4 = document.createElement("div");
	tranpoint4.style.cssText = "width:20px; height:20px; background:transparent url(images/free_b.png) 2px 2px no-repeat;; display:block; cursor:pointer;margin-top:30px;";
	croprect4.appendChild(tranpoint4);
	var tranpoint5 = document.createElement("div");
	tranpoint5.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:-4px 0 0 -4px;cursor:nw-resize;";
	cropcorner1.appendChild(tranpoint5);
	var tranpoint6 = document.createElement("div");
	tranpoint6.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:-4px 0 0 28px;cursor:ne-resize;";
	cropcorner2.appendChild(tranpoint6);
	var tranpoint7 = document.createElement("div");
	tranpoint7.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:28px 0 0 28px;cursor:se-resize;";
	cropcorner3.appendChild(tranpoint7);
	var tranpoint8 = document.createElement("div");
	tranpoint8.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:28px 0 0 -4px;cursor:sw-resize;";
	cropcorner4.appendChild(tranpoint8);

	cropdiv.style.background = "";

	freecomp._cropdiv = cropdiv;
	freecomp._corner1 = cropcorner1;
	freecomp._corner2 = cropcorner2;
	freecomp._corner3 = cropcorner3;
	freecomp._corner4 = cropcorner4;
	freecomp._rect1 = croprect1;
	freecomp._rect2 = croprect2;
	freecomp._rect3 = croprect3;
	freecomp._rect4 = croprect4;
	freecomp._point1 = tranpoint1;
	freecomp._point2 = tranpoint2;
	freecomp._point3 = tranpoint3;
	freecomp._point4 = tranpoint4;
	freecomp._point5 = tranpoint5;
	freecomp._point6 = tranpoint6;
	freecomp._point7 = tranpoint7;
	freecomp._point8 = tranpoint8;
	freecomp._fill = fill;
	this._freecomp = freecomp;

	return cropdiv;
});
define.method("__ReCalcFreeComp", function () {
	if (this._freecomp._cropdiv.style.display == "none")
		return;

	var w = parseInt(this._freecomp._cropdiv.style.width);
	var h = parseInt(this._freecomp._cropdiv.style.height);

	//this._freecomp._cropdiv.style.left = (this._freecomp._cropdiv._offsetX + this._canvas.parentNode.parentNode.parentNode.offsetLeft) + "px";
	//this._freecomp._cropdiv.style.top = (this._freecomp._cropdiv._offsetY + this._canvas.parentNode.parentNode.parentNode.offsetTop) + "px";
	this._freecomp._cropdiv.style.left = this._freecomp._cropdiv._offsetX + "px";
	this._freecomp._cropdiv.style.top = this._freecomp._cropdiv._offsetY + "px";

	this._freecomp._corner1.style.left = 0 + "px";
	this._freecomp._corner1.style.top = 0 + "px";
	this._freecomp._corner2.style.left = w - 30 + "px";
	this._freecomp._corner2.style.top = 0 + "px";
	this._freecomp._corner3.style.left = w - 30 + "px";
	this._freecomp._corner3.style.top = h - 30 + "px";
	this._freecomp._corner4.style.left = 0 + "px";
	this._freecomp._corner4.style.top = h - 30 + "px";

	this._freecomp._rect1.style.left = 0 + "px";
	this._freecomp._rect2.style.left = 30 + "px";
	this._freecomp._rect3.style.left = w - 30 + "px";
	this._freecomp._rect4.style.left = 30 + "px";
	this._freecomp._rect1.style.top = 30 + "px";
	this._freecomp._rect2.style.top = 0 + "px";
	this._freecomp._rect3.style.top = 30 + "px";
	this._freecomp._rect4.style.top = h - 30 + "px";
	this._freecomp._rect1.style.height = h - 60 + "px";
	this._freecomp._rect2.style.width = w - 60 + "px";
	this._freecomp._rect3.style.height = h - 60 + "px";
	this._freecomp._rect4.style.width = w - 60 + "px";

	this._freecomp._point1.style.marginTop = parseInt(h / 2) - 40 + "px";
	this._freecomp._point2.style.marginLeft = parseInt(w / 2) - 40 + "px";
	this._freecomp._point3.style.marginTop = parseInt(h / 2) - 40 + "px";
	this._freecomp._point4.style.marginLeft = parseInt(w / 2) - 40 + "px";

	this._freecomp._fill.style.width = w - 60 + "px";
	this._freecomp._fill.style.height = h - 60 + "px";
});
define.method("__InitCropComp", function () {
	var cropcomp = {};
	var cropdiv = document.createElement("div");
	cropdiv.style.cssText = "position:absolute; display:none; left:0px; top:0px; border:dashed 1px black;cursor:default; z-index:9";
	var cropcorner1 = document.createElement("div");
	cropcorner1.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:nw-resize;";
	cropdiv.appendChild(cropcorner1);
	var cropcorner2 = document.createElement("div");
	cropcorner2.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:ne-resize;";
	cropdiv.appendChild(cropcorner2);
	var cropcorner3 = document.createElement("div");
	cropcorner3.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:se-resize;";
	cropdiv.appendChild(cropcorner3);
	var cropcorner4 = document.createElement("div");
	cropcorner4.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px; height:30px;cursor:sw-resize;";
	cropdiv.appendChild(cropcorner4);
	var croprect1 = document.createElement("div");
	croprect1.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px;cursor:w-resize;";
	cropdiv.appendChild(croprect1);
	var croprect2 = document.createElement("div");
	croprect2.style.cssText = "box-shadow:2px 2px transparent;position:absolute; height:30px;cursor:n-resize;";
	cropdiv.appendChild(croprect2);
	var croprect3 = document.createElement("div");
	croprect3.style.cssText = "box-shadow:2px 2px transparent;position:absolute; width:30px;cursor:e-resize;";
	cropdiv.appendChild(croprect3);
	var croprect4 = document.createElement("div");
	croprect4.style.cssText = "box-shadow:2px 2px transparent;position:absolute; height:30px;cursor:s-resize;";
	cropdiv.appendChild(croprect4);
	var fill = document.createElement("div");
	fill.style.cssText = "background:red;opacity:0;position:absolute; left:30px; top:30px; width:0px; height:0px; cursor:move;";
	cropdiv.appendChild(fill);
	cropdiv.style.background = "";

	var tranpoint1 = document.createElement("div");
	tranpoint1.style.cssText = "width:6px; height:6px; background:black; display:block; cursor:pointer;margin-left:-4px;cursor:w-resize;";
	croprect1.appendChild(tranpoint1);
	var tranpoint2 = document.createElement("div");
	tranpoint2.style.cssText = "width:6px; height:6px; background:black; display:block; cursor:pointer;margin-top:-4px;cursor:n-resize;";
	croprect2.appendChild(tranpoint2);
	var tranpoint3 = document.createElement("div");
	tranpoint3.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin-left:28px; text-align:right;cursor:e-resize;";
	croprect3.appendChild(tranpoint3);
	var tranpoint4 = document.createElement("div");
	tranpoint4.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin-top:28px;cursor:s-resize;";
	croprect4.appendChild(tranpoint4);
	var tranpoint5 = document.createElement("div");
	tranpoint5.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:-4px 0 0 -4px;cursor:nw-resize;";
	cropcorner1.appendChild(tranpoint5);
	var tranpoint6 = document.createElement("div");
	tranpoint6.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:-4px 0 0 28px;cursor:ne-resize;";
	cropcorner2.appendChild(tranpoint6);
	var tranpoint7 = document.createElement("div");
	tranpoint7.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:28px 0 0 28px;cursor:se-resize;";
	cropcorner3.appendChild(tranpoint7);
	var tranpoint8 = document.createElement("div");
	tranpoint8.style.cssText = "width:6px; height:6px;background:black; display:block; cursor:pointer;margin:28px 0 0 -4px;cursor:sw-resize;";
	cropcorner4.appendChild(tranpoint8);

	cropcomp._cropdiv = cropdiv;
	cropcomp._corner1 = cropcorner1;
	cropcomp._corner2 = cropcorner2;
	cropcomp._corner3 = cropcorner3;
	cropcomp._corner4 = cropcorner4;
	cropcomp._rect1 = croprect1;
	cropcomp._rect2 = croprect2;
	cropcomp._rect3 = croprect3;
	cropcomp._rect4 = croprect4;
	cropcomp._point1 = tranpoint1;
	cropcomp._point2 = tranpoint2;
	cropcomp._point3 = tranpoint3;
	cropcomp._point4 = tranpoint4;
	cropcomp._point5 = tranpoint5;
	cropcomp._point6 = tranpoint6;
	cropcomp._point7 = tranpoint7;
	cropcomp._point8 = tranpoint8;
	cropcomp._fill = fill;

	cropcomp._keepratio = false;
	this._cropcomp = cropcomp;

	return cropdiv;
});
define.method("__RePosCropComp", function () {
	var _offsetW = this._canvas.width * 0.6;
	var _offsetH = this._canvas.height * 0.6;
	this._cropcomp._cropdiv._offsetX = parseInt((this._canvas.width - _offsetW) / 2);
	this._cropcomp._cropdiv._offsetY = parseInt((this._canvas.height - _offsetH) / 2);
	if (this._selectRect) {
		var scale = this.__GetZoomScale();
		var rect = this._selectRect;
		_offsetW = rect.width * scale;
		_offsetH = rect.height * scale;
		this._cropcomp._cropdiv._offsetX = rect.x * scale;
		this._cropcomp._cropdiv._offsetY = rect.y * scale;
		this._selectRect = null;
	}
	this._cropcomp._cropdiv.style.width = _offsetW + "px";
	this._cropcomp._cropdiv.style.height = _offsetH + "px";

	this.__ReCalcCropComp();
});
define.method("__ReCalcCropComp", function () {
	if (this._cropcomp._cropdiv.style.display == "none")
		return;

	var w = parseInt(this._cropcomp._cropdiv.style.width);
	var h = parseInt(this._cropcomp._cropdiv.style.height);

	if (this._cropcomp._keepratio)
	{
	    var cw = this._canvas.width;
	    var ch = this._canvas.height;

	    h = parseInt(w * ch / cw);
	    this._cropcomp._cropdiv.style.height = h + "px";
	}

	this._cropcomp._cropdiv.style.left = (this._cropcomp._cropdiv._offsetX + this._canvas.offsetLeft) + "px";
	this._cropcomp._cropdiv.style.top = (this._cropcomp._cropdiv._offsetY + this._canvas.offsetTop) + "px";

	this._cropcomp._corner1.style.left = 0 + "px";
	this._cropcomp._corner1.style.top = 0 + "px";
	this._cropcomp._corner2.style.left = w - 30 + "px";
	this._cropcomp._corner2.style.top = 0 + "px";
	this._cropcomp._corner3.style.left = w - 30 + "px";
	this._cropcomp._corner3.style.top = h - 30 + "px";
	this._cropcomp._corner4.style.left = 0 + "px";
	this._cropcomp._corner4.style.top = h - 30 + "px";

	this._cropcomp._rect1.style.left = 0 + "px";
	this._cropcomp._rect2.style.left = 30 + "px";
	this._cropcomp._rect3.style.left = w - 30 + "px";
	this._cropcomp._rect4.style.left = 30 + "px";
	this._cropcomp._rect1.style.top = 30 + "px";
	this._cropcomp._rect2.style.top = 0 + "px";
	this._cropcomp._rect3.style.top = 30 + "px";
	this._cropcomp._rect4.style.top = h - 30 + "px";
	this._cropcomp._rect1.style.height = h - 60 + "px";
	this._cropcomp._rect2.style.width = w - 60 + "px";
	this._cropcomp._rect3.style.height = h - 60 + "px";
	this._cropcomp._rect4.style.width = w - 60 + "px";

	this._cropcomp._point1.style.marginTop = parseInt(h / 2) - 32 + "px";
	this._cropcomp._point2.style.marginLeft = parseInt(w / 2) - 32 + "px";
	this._cropcomp._point3.style.marginTop = parseInt(h / 2) - 32 + "px";
	this._cropcomp._point4.style.marginLeft = parseInt(w / 2) - 32 + "px";

	this._cropcomp._fill.style.width = w - 60 + "px";
	this._cropcomp._fill.style.height = h - 60 + "px";

	if (!this._cropcomp._backcanvas)
		this._cropcomp._backcanvas = document.createElement("canvas");		
	var bc = this._cropcomp._backcanvas;
	if (bc.width != this._canvas.width && bc.height != this._canvas.height) {
		bc.width = this._canvas.width;
		bc.height = this._canvas.height;
	}
	var b2d = bc.getContext("2d");
	b2d.clearRect(0, 0, bc.width, bc.height);
	b2d.fillStyle = "rgba(0,0,0,0.3)";
	b2d.fillRect(0, 0, bc.width, bc.height);
	b2d.clearRect(parseInt(this._cropcomp._cropdiv.style.left), parseInt(this._cropcomp._cropdiv.style.top), w, h);
	this.__RePaint();
	this._2d.drawImage(bc, 0, 0);

	if (this._submenu && this._submenu.UpdateCropPos)
		this._submenu.UpdateCropPos(w, h, this._cropcomp._cropdiv._offsetX, this._cropcomp._cropdiv._offsetY);
});
define.method("__HideCompDiv", function () {
	this._cropcomp._cropdiv.style.display = "none";
	this._freecomp._cropdiv.style.display = "none";
});

define.method("__DoSaveToServer", function (name, type, overwrite) {
	var zc = this.GetOption("ZoomCount");
	if (zc != 0) {
		this.SetOption("ZoomCount", 0);
		this.__RePaint();
	}
	var strdatauri = this._canvas.toDataURL();
	//Empty Canvas
	var index = strdatauri.indexOf("base64,");
	if (index == -1) return;
	var base64data = strdatauri.substring(index + 7);

	window.SaveImageBase64(base64data);
});

var ImageEditorDocument = jsml.class_create_instance("ImageEditorDocument");