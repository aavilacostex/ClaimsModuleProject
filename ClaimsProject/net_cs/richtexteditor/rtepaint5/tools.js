var define=jsml.class_define("ImageEditorToolBase","jsml");
define.constructor(function(doc)
{
	this._doc=doc;
});
define.method("__ToolAttach",function()
{
	var canvas=this._doc._canvas;
});
define.method("__ToolDetach",function()
{
});
define.method("__HandleCanvasEvent", function (evt) {
});
define.method("__HandleCaptureCancel",function(){
	this._doc.__RePaint();
});
define.method("__PaintForLayer", function (DoPaint) {
	var doc = this._doc;
	if (doc.GetOption("AutoCreateLayer")) {
		doc.__RePaint();
		DoPaint();
	}
	else {
		doc.__RePaint(function (layer) {
			if (doc.get_layer() == layer) {
				DoPaint();
			}
		});
	}
});
define.method("__GetMouseXY", function (evt) {
	var pos = { offsetX: evt.offsetX, offsetY: evt.offsetY, x: evt.clientX || evt.x, y: evt.clientY || evt.y };
	if (jsml.msie) {
		var ox = Math.max(evt.x || 0, evt.offsetX || 0);
		var oy = Math.max(evt.y || 0, evt.offsetY || 0);
		pos = { offsetX: ox, offsetY: oy, x: evt.clientX, y: evt.clientY };
	}
	if (jsml.firefox) {
		pos = { offsetX: evt.layerX, offsetY: evt.layerY, x: evt.clientX, y: evt.clientY };
	}
	return pos;
});
define.method("__CreatePosition",function(evt,penmode){
	var self=this;
	
	var pos={};
	var down=this.__GetMouseXY(evt);
	pos._movecount=0;
	pos._mousedownNodeX=down.offsetX;
	pos._mousedownNodeY=down.offsetY;
	pos._mousedownPageX=down.x;
	pos._mousedownPageY=down.y;
	pos.downX=down.offsetX;
	pos.downY=down.offsetY;
	var tp=this.__Translate({x:pos.downX,y:pos.downY})
	pos.downX=tp.x;
	pos.downY=tp.y;
	pos.lastX=pos.downX;
	pos.lastY=pos.downY;
	pos.list=[];
	pos.list.push(tp);
	pos.minX=pos.lastX;
	pos.maxX=pos.lastX;
	pos.minY=pos.lastY;
	pos.maxY=pos.lastY;
	pos.penMode=penmode;
	
	pos.HandleMove=function(evt)
	{
		pos._movecount++;
		var move=self.__GetMouseXY(evt);
		pos.moveX=move.x-pos._mousedownPageX+pos._mousedownNodeX;
		pos.moveY=move.y-pos._mousedownPageY+pos._mousedownNodeY;
		var tp=self.__Translate({x:pos.moveX,y:pos.moveY})
		pos.moveX=tp.x;
		pos.moveY=tp.y;
		pos.lastX=pos.moveX;
		pos.lastY=pos.moveY;
		pos.list.push(tp);
		if(pos.penMode)
		{
			pos.minX=Math.min(pos.minX,pos.lastX);
			pos.maxX=Math.max(pos.maxX,pos.lastX);
			pos.minY=Math.min(pos.minY,pos.lastY);
			pos.maxY=Math.max(pos.maxY,pos.lastY);
		}
		else
		{
			pos.minX=Math.min(pos.downX,pos.lastX);
			pos.maxX=Math.max(pos.downX,pos.lastX);
			pos.minY=Math.min(pos.downY,pos.lastY);
			pos.maxY=Math.max(pos.downY,pos.lastY);
		}
	}
	return pos;
});
define.method("__IsContextMenu", function (evt) {
	var isIsContextMenu = false;
	if (evt.button)
		isIsContextMenu = (evt.button == 2 || evt.button == 3) ? true : false;
	else
		isIsContextMenu = evt.which == 3 ? true : false;

	return isIsContextMenu;
});
define.method("__Translate", function (pos) {
	var scale = this._doc.__GetZoomScale(); 	
	if (scale == 1)
		return { x: pos.x, y: pos.y };
	
	var newp = {};
	if (scale > 1) {
		newp.x = pos.x / scale + this._doc.GetOption("ZoomX");
		newp.y = pos.y / scale + this._doc.GetOption("ZoomY");
	}
	else {
		newp.x = pos.x / scale;
		newp.y = pos.y / scale;
	}
	return newp;
});
define.method("__RevertPos", function (pos) {
	var scale = this._doc.__GetZoomScale();
	if (scale == 1)
		return { x: pos.x, y: pos.y };
	var newp = {};
	if (scale > 1) {
		newp.x = (pos.x - this._doc.GetOption("ZoomX")) * scale;
		newp.y = (pos.y - this._doc.GetOption("ZoomY")) * scale;
	}
	else {
		newp.x = pos.x * scale;
		newp.y = pos.y * scale;
	}
	return newp;
});

/****************************************************************\
SELECT
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolSelect", "ImageEditorToolBase");
define.constructor(function () {
	this.ImageEditorToolBase_constructor.apply(this, arguments);
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	//Delete event
	if (evt.keyCode == 46) {
		this._doc.__RemoveFromSelection();
		return;
	}
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos = this.__CreatePosition(evt);
	var rs = this._doc.GetOption("CanvasRealSize");

	this._canvas = document.createElement("canvas");
	this._canvas.width = rs.width; //this._doc._canvas.width;
	this._canvas.height = rs.height; //this._doc._canvas.height;
	this._2d = this._canvas.getContext("2d");
	this._2d.fillStyle = this._doc.GetOption("SelectionPattern");

	this._oldselection = this._doc.get_selection();
	this._alt = evt.altKey;
	this._shift = evt.shiftKey;
	this._ctrl = evt.ctrlKey;

	this._doc._selectRect = null;

	this._doc.set_selection(null);
	if (this._doc._submenu && this._doc._submenu.Restore)
		this._doc._submenu.Restore();

	if (this._oldselection && this._ctrl) {
		var w = this._canvas.width;
		var h = this._canvas.height;
		var c1 = ToolSelection_Inverse(this._oldselection);

		this._2d.drawImage(c1, 0, 0, w, h);

		this._doc.__RePaint();
		this._doc.set_selection(this._canvas);
		var scale = this._doc.__GetZoomScale();
		if (scale == 1)
			this._doc.__PaintSelection(this._canvas);
		else {
			var _tcanvas = document.createElement("canvas");
			_tcanvas.width = this._canvas.width * scale;
			_tcanvas.height = this._canvas.height * scale;
			var _t2d = _tcanvas.getContext("2d");
			_t2d.scale(scale, scale);
			_t2d.drawImage(this._canvas, 0, 0);
			this._doc.__PaintSelection(_tcanvas, "noscale");
		}

		this._doc._invertcount++;
		return;
	}
	this._doc.__CaptureMouse(this, evt);
	if (this._oldselection && (this._alt || this._shift)) {
		this._pos._movecount--;
		this.__HandleCaptureMove(evt);
	}
	else {
		this._doc.__RePaint();
	}
});
function ToolSelection_Inverse(canvas) {
	var newc = document.createElement("canvas");
	newc.width = canvas.width;
	newc.height = canvas.height;
	var new2d = newc.getContext("2d");
	new2d.fillStyle = ImageEditorDocument.GetOption("SelectionPattern");
	new2d.fillRect(0, 0, canvas.width, canvas.height);
	new2d.globalCompositeOperation = "destination-out"
	new2d.drawImage(canvas, 0, 0, canvas.width, canvas.height);
	return newc;
}
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);
	var w = this._canvas.width;
	var h = this._canvas.height;
	this._2d.clearRect(0, 0, w, h);
	var prevsel = this._oldselection;

	// destination-over , source-over - and 
	var minpos = { x: this._pos.minX, y: this._pos.minY };
	var maxpos = { x: this._pos.maxX, y: this._pos.maxY };
	if (prevsel && (this._shift || this._alt)) {
		var c1 = document.createElement("canvas");
		c1.width = w;
		c1.height = h;
		var d1 = c1.getContext("2d");
		d1.drawImage(prevsel, 0, 0, w, h);
		d1.fillStyle = this._doc.GetOption("SelectionPattern");
		if (this._alt)
			d1.fillRect(minpos.x, minpos.y, maxpos.x - minpos.x, maxpos.y - minpos.y); //d1.fillRect(this._pos.minX, this._pos.minY, this._pos.maxX - this._pos.minX, this._pos.maxY - this._pos.minY);
		else
			d1.clearRect(minpos.x, minpos.y, maxpos.x - minpos.x, maxpos.y - minpos.y); //d1.clearRect(this._pos.minX, this._pos.minY, this._pos.maxX - this._pos.minX, this._pos.maxY - this._pos.minY);
		this._2d.drawImage(c1, 0, 0, w, h);
	}
	else {
		this._2d.fillRect(0, 0, w, h);
		this._2d.clearRect(minpos.x, minpos.y, maxpos.x - minpos.x, maxpos.y - minpos.y); //this._2d.clearRect(this._pos.minX, this._pos.minY, this._pos.maxX - this._pos.minX, this._pos.maxY - this._pos.minY);
	}

	this._doc.__RePaint();
	var scale = this._doc.__GetZoomScale();
	if (scale == 1)
		this._doc.__PaintSelection(this._canvas);
	else {
		var _tcanvas = document.createElement("canvas");
		_tcanvas.width = this._canvas.width * scale;
		_tcanvas.height = this._canvas.height * scale;
		var _t2d = _tcanvas.getContext("2d");
		_t2d.scale(scale, scale);
		_t2d.drawImage(this._canvas, 0, 0);
		this._doc.__PaintSelection(_tcanvas, "noscale");
	}
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0) return;
	var minpos = { x: this._pos.minX, y: this._pos.minY };
	var maxpos = { x: this._pos.maxX, y: this._pos.maxY };
	if (!this._oldselection)
		this._doc._selectRect = { x: minpos.x, y: minpos.y, width: maxpos.x - minpos.x, height: maxpos.y - minpos.y };
	this._doc.set_selection(this._canvas);
	if (!this._oldselection)
		this._doc._invertcount = 0;
	this._doc.__RePaint();
});


/****************************************************************\
	ARROW
\****************************************************************/
var define=jsml.class_define("__ImageEditorToolArrow","ImageEditorToolBase");
define.constructor(function()
{
	this.ImageEditorToolBase_constructor.apply(this,arguments);
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;
	if (evt.preventDefault) evt.preventDefault();
	this._pos = this.__CreatePosition(evt);
	this._layer = this._doc.get_layer();
	this._canvas_x = this._layer._canvas_x;
	this._canvas_y = this._layer._canvas_y;
	var sel = this._doc.get_selection();
	if (sel)
		this._cut = true;
	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);
	if (this._cut) {
		var sel = this._doc.get_selection();
		//Create a new history using selected area
		this._oldhistorylist = this._doc.__GetHistoryList();
		var newlayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
		newlayer.set_name(this._doc.Text["Layer_Crop"]);
		this._doc.set_selection(null);
		this._doc.__DoLayerAdd(newlayer);

		//Draw new layer
		var ctx = newlayer._2d;
		var sw = this._layer._canvas.width;
		var sh = this._layer._canvas.height;
		var dw = newlayer._canvas.width;
		var dh = newlayer._canvas.height;
		ctx.drawImage(this._layer._canvas, 0 - this._layer._canvas_x, 0 - this._layer._canvas_y, dw, dh, 0, 0, dw, dh);
		ctx.save();
		ctx.globalCompositeOperation = "destination-out";
		ctx.drawImage(sel, 0, 0, sel.width, sel.height);
		ctx.restore();

		//Clear old layer selected area
		//TODO: if copy selected area, ignore this code
		var ls = this._doc.get_history()._layers;
		var _olayer = null;
		for (var i = ls.length - 2; i >= 0; i--) {
			if (ls[i]._layerid != this._layer._layerid)
				continue;
			_olayer = ls[i];
			break;
		}

		var _copy_olayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
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

		var ls = this._doc.get_history()._layers;
		for (var i = ls.length - 2; i >= 0; i--) {
			if (ls[i]._layerid != this._layer._layerid)
				continue;
			ls[i] = _copy_olayer;
		}

		this._doc.__RePaint();

		this._layer = newlayer;
		this._canvas_x = 0;
		this._canvas_y = 0;
		this._doc.set_layer(newlayer);
		this._cut = false;
	}
	this._layer._canvas_x = this._canvas_x + this._pos.lastX - this._pos.downX;
	this._layer._canvas_y = this._canvas_y + this._pos.lastY - this._pos.downY;
	this._doc.__RePaint();
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0) return;

	if (this._oldhistorylist) {
		this._oldhistorylist = null;
		var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
		this._doc.__DoLayerCover(layer);
		this._doc.__RePaint();
		return;
	}
	var x = this._layer._canvas_x;
	var y = this._layer._canvas_y;
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Move"]);
	var newlayer = this._doc.__DoLayerDraw(layer);
	this._layer._canvas_x = this._canvas_x;
	this._layer._canvas_y = this._canvas_y;
	this._doc.__RePaint();
});
define.method("__HandleCaptureCancel", function () {
	if (this._oldhistorylist) {
		this._doc.__SetHistoryList(this._oldhistorylist);
		this._oldhistorylist = null;
		return;
	}
	this._layer._canvas_x = this._canvas_x;
	this._layer._canvas_y = this._canvas_y;
	this._doc.__RePaint();
});

/****************************************************************\
	RECT
\****************************************************************/
var define=jsml.class_define("__ImageEditorToolRect","ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos=this.__CreatePosition(evt);

	this._doc.__CaptureMouse(this,evt);
});
define.method("__HandleCaptureMove", function (evt) {

	this._pos.HandleMove(evt);
	
	var layer = this.__DrawNewLayer();
	var ctx = this._doc.__Reset2D();

	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0)
		return;
	var layer = this.__DrawNewLayer();
	if (this._doc.GetOption("AutoCreateLayer"))
		this._doc.__DoLayerAdd(layer);
	else
		this._doc.__DoLayerDraw(layer);
});
define.method("__DrawNewLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Rect"] + " " + layer._layerid);
	layer.type = "rect";
	layer._typedata.position = this._pos;

	//NOTE: Set Canvas Width & Height
	var w = layer._canvas.width;
	var h = layer._canvas.height;
	if (this._pos.minX < 0)
		w += Math.abs(this._pos.minX);
	else
		w = Math.max(this._pos.maxX, w);

	if (this._pos.minY < 0)
		h += Math.abs(this._pos.minY);
	else
		h = Math.max(this._pos.maxY, h);

	layer._canvas.width = w;
	layer._canvas.height = h;

	var ctx = layer._2d;
	ctx.lineWidth = this._doc.GetOption("Ctx_LineWidth");
	ctx.fillStyle = this._doc.GetOption("Ctx_BackColor");
	ctx.strokeStyle = this._doc.GetOption("Ctx_ForeColor");
	var _filltype = this._doc.GetOption("Ctx_FillType");
	var _usepattern = this._doc.GetOption("Ctx_UsePattern");
	var _pattern = this._doc.GetOption("Ctx_FillPattern");
	if (_usepattern && _pattern) {
		ctx.fillStyle = _pattern;
		ctx.strokeStyle = _pattern;
	}

	//NOTE: Keep the whole drawing area
	var ox = Math.max(this._pos.minX, 0);
	var oy = Math.max(this._pos.minY, 0);
	layer._canvas_x = Math.min(this._pos.minX, 0);
	layer._canvas_y = Math.min(this._pos.minY, 0);

	var useradius = this._doc.GetOption("Ctx_UseRadius");
	var radius = this._doc.GetOption("Ctx_RadiusVal");

	if (!useradius || !radius || this._pos.maxX - this._pos.minX<parseInt(radius)*1.42 ||
	this._pos.maxY - this._pos.minY < parseInt(radius)*1.42) {
		if (_filltype == "fill" || _filltype == "fillstroke") ctx.fillRect(ox, oy, this._pos.maxX - this._pos.minX, this._pos.maxY - this._pos.minY);
		if (_filltype == "stroke" || _filltype == "fillstroke") ctx.strokeRect(ox, oy, this._pos.maxX - this._pos.minX, this._pos.maxY - this._pos.minY);
	}
	else
		this.__DrawRadiusRect(ctx, ox, oy, this._pos.mixX, this._pos.mixY, this._pos.maxX, this._pos.maxY, parseInt(radius), _filltype);
	this._doc.__DeleteUnselected(layer);
	return layer;
});
define.method("__DrawRadiusRect", function (ctx, ox, oy, minx, miny, maxx, maxy, radius, filltype) {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(ox + radius, oy);
	ctx.lineTo(maxx - radius, oy);
	ctx.quadraticCurveTo(maxx, oy, maxx, oy + radius);
	ctx.lineTo(maxx, maxy - radius);
	ctx.quadraticCurveTo(maxx, maxy, maxx - radius, maxy);
	ctx.lineTo(ox + radius, maxy);
	ctx.quadraticCurveTo(ox, maxy, ox, maxy - radius);
	ctx.lineTo(ox, oy + radius);
	ctx.quadraticCurveTo(ox, oy, ox + radius, oy);
	ctx.closePath();
	if (filltype == "fill" || filltype == "fillstroke") ctx.fill();
	if (filltype == "stroke" || filltype == "fillstroke") ctx.stroke();
	ctx.restore();
});

/****************************************************************\
	Pen
\****************************************************************/
var define=jsml.class_define("__ImageEditorToolPen","ImageEditorToolBase");
define.property("lineMode",
	function () {
		return this._linemode;
	},
	function (val) {
		this._linemode = val;
	}
);
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;
	this._pos=this.__CreatePosition(evt,!this._linemode);	
	this._doc.__CaptureMouse(this,evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);	
	var layer = this.__DrawNewLayer();
	var ctx = this._doc.__Reset2D();

	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});

define.method("__HandleCaptureRelease",function()
{
	if(this._pos._movecount==0)return;	
	var layer=this.__DrawNewLayer();	
	if(this._doc.GetOption("AutoCreateLayer"))
		this._doc.__DoLayerAdd(layer);
	else
		this._doc.__DoLayerDraw(layer);
});

define.method("__DrawNewLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Line"] + " " + layer._layerid);
	layer.type = "line";
	layer._typedata.position = this._pos;
	var w = layer._canvas.width;
	var h = layer._canvas.height;
	if (this._pos.maxX > layer._canvas.width)
		w += (this._pos.maxX - layer._canvas.width);
	if (this._pos.minX < 0)
		w += (0 - this._pos.minX);

	if (this._pos.maxY > layer._canvas.height)
		h += (this._pos.maxY - layer._canvas.height);
	if (this._pos.minY < 0)
		h += (0 - this._pos.minY);

	layer._canvas.width = w;
	layer._canvas.height = h;

	var ctx = layer._2d;
	ctx.lineWidth = this._doc.GetOption("Ctx_LineWidth");
	ctx.strokeStyle = this._doc.GetOption("Ctx_BackColor");
	ctx.fillStyle = this._doc.GetOption("Ctx_ForeColor");
	var _usepattern = this._doc.GetOption("Ctx_UsePattern");
	var _pattern = this._doc.GetOption("Ctx_FillPattern");
	var _pentype = this._doc.GetOption("Ctx_PenType");

	if (_usepattern && _pattern) {
		ctx.fillStyle = _pattern;
		ctx.strokeStyle = _pattern;
	}
	layer._canvas_x = Math.min(this._pos.minX, 0);
	layer._canvas_y = Math.min(this._pos.minY, 0);

	ctx.beginPath();
	ctx.moveTo(this._pos.downX - layer._canvas_x, this._pos.downY - layer._canvas_y);
	if (this.get_lineMode()) {
		ctx.lineTo(this._pos.lastX - layer._canvas_x, this._pos.lastY - layer._canvas_y);
		ctx.stroke();
	}
	else {
		for (var i = 1; i < this._pos.list.length; i++) {
			var mouse = this._pos.list[i];
			ctx.lineTo(mouse.x - layer._canvas_x, mouse.y - layer._canvas_y);
		}
		if (_pentype == "fill" || _pentype == "fillstroke") {
			ctx.closePath();
			ctx.fill();
		}
		if (_pentype == "stroke" || _pentype == "fillstroke") {
			ctx.stroke();
		}
	}
	this._doc.__DeleteUnselected(layer);
	return layer;
});

/****************************************************************\
	Erase
\****************************************************************/
var define=jsml.class_define("__ImageEditorToolErase","ImageEditorToolBase");
define.constructor(function()
{
	this.ImageEditorToolBase_constructor.apply(this,arguments);
	
	this._canvas=document.createElement("canvas");
	this._canvas.width=20;
	this._canvas.height=20;
	this._2d=this._canvas.getContext("2d");
	this._2d.fillStyle="red";
	this._2d.fillRect(0,0,20,20);
});
define.method("__ToolDetach",function()
{
	 this._doc.__RePaint();
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if(evt.type=="mouseout")
	{
		this._doc.__RePaint();
		return;
	}
	if (evt.type == "mousemove") {
		if (!this._doc.__HasCaptureMouse()) {
			this.__HandleNormalMove(evt);
		}
	}
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos=this.__CreatePosition(evt);
	this._doc.__CaptureMouse(this,evt);
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Erase"]);

	this._doc.__DoLayerDraw(layer);
	this.__HandleCaptureMove(evt);
});
define.method("__DrawErasePath", function (x, y) {
		var scale = this._doc.__GetZoomScale();
	var erasecanvas = this._doc._erase_m;
	var w = erasecanvas.width * scale; //this._canvas.width;
	var h = erasecanvas.height * scale; //this._canvas.height;

	x = x * scale;
	y = y * scale;

	var ctx = this._doc.__Reset2D();
	ctx.drawImage(erasecanvas, x - w / 2, y - h / 2, w, h);
});
define.method("__HandleNormalMove", function (evt) {
	this._pos=this.__CreatePosition(evt);	
	this._doc.__RePaint();
	this.__DrawErasePath( this._pos.lastX,this._pos.lastY);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);

	var x = this._pos.lastX;
	var y = this._pos.lastY;
	var layer = this._doc.get_layer();
	var ctx = this._doc.get_layer()._2d;
	var erasecanvas = this._doc._erase;
	var erasecanvas_m = this._doc._erase_m;
	var w = erasecanvas.width; //this._canvas.width;
	var h = erasecanvas.height; //this._canvas.height;
	ctx.save();
	try {
		ctx.globalCompositeOperation = "destination-out";
		ctx.drawImage(erasecanvas_m, x - w / 2 - layer._canvas_x, y - h / 2 - layer._canvas_y, w, h);
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(erasecanvas, x - w / 2 - layer._canvas_x, y - h / 2 - layer._canvas_y, w, h);
		layer._selection = null;
		layer.__ApplyOptions();
		this._doc.__RePaint();

		this.__DrawErasePath(x, y);
	}
	finally {
		ctx.restore();
	}
});
define.method("__HandleCaptureRelease",function()
{	
});

/****************************************************************\
ARC
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolArc", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;		
	this._pos=this.__CreatePosition(evt);
	this._doc.__CaptureMouse(this,evt);
});
define.method("__HandleCaptureMove", function (evt) {	
	this._pos.HandleMove(evt);
	var layer = this.__DrawNewLayer();
	var ctx = this._doc.__Reset2D();

	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0) return;
	var layer = this.__DrawNewLayer();
	if (this._doc.GetOption("AutoCreateLayer"))
		this._doc.__DoLayerAdd(layer);
	else
		this._doc.__DoLayerDraw(layer);
});


define.method("__DrawNewLayer", function () {

	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Arc"] + " " + layer._layerid);
	layer.type = "arc";
	layer._typedata.position = this._pos;
	
	var w = layer._canvas.width;
	var h = layer._canvas.height;
	if (this._pos.minX < 0)
		w += Math.abs(this._pos.minX);
	else
		w = Math.max(this._pos.maxX, w);

	if (this._pos.minY < 0)
		h += Math.abs(this._pos.minY);
	else
		h = Math.max(this._pos.maxY, h);

	layer._canvas.width = w;
	layer._canvas.height = h;

	var ctx = layer._2d;
	ctx.lineWidth = this._doc.GetOption("Ctx_LineWidth");
	ctx.fillStyle = this._doc.GetOption("Ctx_BackColor");
	ctx.strokeStyle = this._doc.GetOption("Ctx_ForeColor");
	var _filltype = this._doc.GetOption("Ctx_FillType");
	var _usepattern = this._doc.GetOption("Ctx_UsePattern");
	var _pattern = this._doc.GetOption("Ctx_FillPattern");
	if (_usepattern && _pattern) {
		ctx.fillStyle = _pattern;
		ctx.strokeStyle = _pattern;
	}

	var arcx = Math.floor(Math.abs(this._pos.maxX - this._pos.minX) / 2);
	var arcy = Math.floor(Math.abs(this._pos.maxY - this._pos.minY) / 2);

	layer._canvas_x = Math.min(this._pos.minX, 0);
	layer._canvas_y = Math.min(this._pos.minY, 0);

	var w = this._pos.maxX - this._pos.minX;
	var h = this._pos.maxY - this._pos.minY;
	var x = this._pos.minX - layer._canvas_x;
	var y = this._pos.minY - layer._canvas_y;
	var kappa = 0.5522848;
	var ox = (w / 2) * kappa; // control point offset horizontal 
	var oy = (h / 2) * kappa; // control point offset vertical 
	var xe = x + w;		  // x-end 
	var ye = y + h;		  // y-end 
	var xm = x + w / 2;	  // x-middle 
	var ym = y + h / 2;		// y-middle 

	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.closePath();
	if(_filltype=="fill" || _filltype=="fillstroke") ctx.fill();
	if (_filltype == "stroke" || _filltype == "fillstroke") ctx.stroke();

	this._doc.__DeleteUnselected(layer);
	return layer;
});

/****************************************************************\
GRADIENT
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolGrad", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;
	this._pos=this.__CreatePosition(evt);	
	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);	
	var layer = this.__DrawNewLayer();
	var ctx = this._doc.__Reset2D();

	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0) return;
	var layer = this.__DrawNewLayer();
	var currlayer = this._doc.get_layer();
	this._doc.__DoLayerDraw(layer);
});


define.method("__DrawNewLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Gradient"] + " " + layer._layerid);
	layer.type = "gradient";

	var ctx = layer._2d;

	var gradienttype = this._doc.GetOption("Ctx_GradientType");
	var gradient;
	if (gradienttype == "linear")
		gradient = ctx.createLinearGradient(this._pos.downX, this._pos.downY, this._pos.lastX, this._pos.lastY);
	else {
		var mw = Math.abs(this._pos.lastX - this._pos.downX);
		var mh = Math.abs(this._pos.lastY - this._pos.downY);
		var cx = (this._pos.lastX + this._pos.downX) / 2;
		var cy = (this._pos.lastY + this._pos.downY) / 2;
		var radius = Math.sqrt(mw * mw + mh * mh);
		radius = Math.ceil(radius);
		gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(mw,mh)*0.8);
	}
	gradient.addColorStop(1, this._doc.GetOption("Ctx_ForeColor"));
	gradient.addColorStop(0, this._doc.GetOption("Ctx_BackColor"));
	ctx.fillStyle = gradient;
	ctx.fillRect(Math.min(this._pos.lastX, this._pos.downX), Math.min(this._pos.lastY, this._pos.downY), Math.abs(this._pos.lastX - this._pos.downX), Math.abs(this._pos.lastY - this._pos.downY));
	//ctx.fillRect(0, 0, layer._canvas.width, layer._canvas.height);
	//#NOTE
	this._doc.__DeleteUnselected(layer);
	return layer;
});

/****************************************************************\
Varnish
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolVarnish", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;
	var layer = this.__DrawNewLayer();
	var currlayer = this._doc.get_layer();
	this._doc.__DoLayerDraw(layer);
});
define.method("__HandleCaptureMove", function (evt) {
});
define.method("__HandleCaptureRelease", function () {
});
define.method("__DrawNewLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Varnish"] + " " + layer._layerid);
	layer.type = "rect";

	var ctx = layer._2d;

	ctx.fillStyle = this._doc.GetOption("Ctx_BackColor");
	var _usepattern = this._doc.GetOption("Ctx_UsePattern");
	var _pattern = this._doc.GetOption("Ctx_FillPattern");
	if (_usepattern && _pattern) {
		ctx.fillStyle = _pattern;
	}
	ctx.fillRect(0, 0, layer._canvas.width, layer._canvas.height);

	this._doc.__DeleteUnselected(layer);
	return layer;
});

/****************************************************************\
Zoom
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolZoom", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type == "contextmenu") {
		if (evt.preventDefault) evt.preventDefault();
		if (evt.stopPropagation) evt.stopPropagation();
		evt.cancelBubble = true;
		evt.returnValue = false;
		return false;
	}
	if (evt.type != "mousedown" && evt.type != "mousewheel" && evt.type != "DOMMouseScroll")
		return;
	if (this.__IsContextMenu(evt))
		return;

	this._pos = this.__CreatePosition(evt);

	var mxy = this.__GetMouseXY(evt, this._doc._canvas);
	this._movecount = 0;

	this._mousedownX = mxy.offsetX;
	this._mousedownY = mxy.offsetY;
	this._mouseX = mxy.x;
	this._mouseY = mxy.y;

	this._zoomx = this._doc.GetOption("ZoomX");
	this._zoomy = this._doc.GetOption("ZoomY");

	if (evt.type == "mousewheel" || evt.type == "DOMMouseScroll") {
		this._wheeldalta = evt.wheelDelta ? (evt.wheelDelta / 120) : (-evt.detail / 3);
		this.__HandleCaptureRelease();
		return;
	}
	this._wheeldalta = null;

	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._movecount++;
});

define.method("__HandleCaptureRelease", function () {
	if (this._movecount == 0) {
		var zc = this._doc.GetOption("ZoomCount");
		if (this._wheeldalta != null) {
			if (this._wheeldalta == 1) {
				if (zc == 9) return;
				zc++;
			}
			else {
				if (zc == -7) return;
				zc--;
			}
		}
		else {
			if (this._doc._zoommode == "in") {
				if (zc == 9) return;
				zc++;
			}
			else {
				if (zc == -7) return;
				zc--;
			}
		}
		this._doc.SetOption("ZoomCount", zc);

		var newx = 0;
		var newy = 0;

		this._doc.SetOption("ZoomX", newx);
		this._doc.SetOption("ZoomY", newy);

		this._doc.__RePaint();

		if (ImageEditorDocument._cropcomp._cropdiv.style.display != "none")
			ImageEditorDocument.__RePosCropComp();
	}
	else {

	}
});

/****************************************************************\
ColorPicker
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolColor", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos = this.__CreatePosition(evt);
	var _x = this._pos._mousedownNodeX;
	var _y = jsml.opera ? this._pos._mousedownNodeY : (this._pos._mousedownNodeY + 14);
	var data = this._doc._2d.getImageData(_x, _y, 1, 1).data;
	this._doc.SetOption("Ctx_BackColor", "rgba(" + data[0] + "," + data[1] + "," + data[2] + "," + data[3] + ")");
});
define.method("__HandleCaptureMove", function (evt) {	
});
define.method("__HandleCaptureRelease", function () {
});

/****************************************************************\
CROP
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolCrop", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	this._layer = this._doc.get_layer();
	var sel = this._doc.get_selection();
	if (sel) {
		this._doc.set_selection(null);
		this._doc.__RePaint();
	}
	if (this._doc._cropcomp._cropdiv.style.display != "none")
		return;

	this._doc.__RePosCropComp();
	this._doc._cropcomp._cropdiv.style.display = "";

	var tool = this;
	this._doc._cropcomp._cropdiv.onmousedown = function (e) {
		tool.__HandleCanvasEvent(e);
		if (e.preventDefault) e.preventDefault();
		e.returnValue = false;
	}
	this._doc._cropcomp._cropdiv.onmousemove = function (e) {
		tool.__HandleCaptureMove(e);
	}
	this._doc._cropcomp._cropdiv.onmouseup = function (e) {
		tool.__HandleCaptureRelease(e);
	}
	this._doc._cropcomp._cropdiv.onmouseout = function (e) {
		//tool.__HandleCaptureCancel(e);
	}

	this._doc.__ReCalcCropComp();
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	//use enter key to crop
	if (evt.keyCode == 13) {
		this._doc.__CropFromSelection();
	}
	if (evt.keyCode == 37 || evt.keyCode == 39) {
		this.__KeyMove(evt.keyCode - 38, 0);
		return;
	}
	if (evt.keyCode == 38 || evt.keyCode == 40) {
		this.__KeyMove(0,evt.keyCode - 39);
		return;
	}
	if (evt.type != "mousedown" || this.__IsContextMenu(evt) || (evt.target || evt.srcElement) == this._doc._canvas)
		return;
	this._pos = this.__CreatePosition(evt);
	var mode = this.__GetMousePosInCropComp(evt);
	if (!mode)
		return;
	this._mode = mode;
	this._moving = true;
	this._movingcanvas = false;
	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	if (!this._moving)
		return;
	if ((evt.target || evt.srcElement) == this._doc._canvas && !this._movingcanvas) {
		this._pos = this.__CreatePosition(evt);
		this._movingcanvas = true;
	}
	this._pos.HandleMove(evt);

	var sw = this._pos.lastX - this._pos.downX;
	var sh = this._pos.lastY - this._pos.downY;
	var scale = this._doc.__GetZoomScale();
	if (scale != 1) {
		sw = parseInt(sw * scale);
		sh = parseInt(sh * scale);
	}

	var dw = parseInt(this._doc._cropcomp._cropdiv.style.width);
	var dh = parseInt(this._doc._cropcomp._cropdiv.style.height);
	switch (this._mode) {
		case "corner1":
			if (sw + this._doc._cropcomp._cropdiv._offsetX <= 0 || dw <= 5)
				return;
			if (sh + this._doc._cropcomp._cropdiv._offsetY <= 0 || dh <= 5)
				return;
			this._doc._cropcomp._cropdiv._offsetX += sw;
			this._doc._cropcomp._cropdiv._offsetY += sh;
			this._doc._cropcomp._cropdiv.style.width = dw - sw + "px";
			this._doc._cropcomp._cropdiv.style.height = dh - sh + "px";
			break;
		case "corner2":
			if (sh + this._doc._cropcomp._cropdiv._offsetY < 0 || dh <= 5)
				return;
			this._doc._cropcomp._cropdiv._offsetY += sh;
			this._doc._cropcomp._cropdiv.style.width = dw + sw + "px";
			this._doc._cropcomp._cropdiv.style.height = dh - sh + "px";
			break;
		case "corner3":
			this._doc._cropcomp._cropdiv.style.width = dw + sw + "px";
			this._doc._cropcomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "corner4":
			if (sw + this._doc._cropcomp._cropdiv._offsetX < 0 || dw <= 5)
				return;
			this._doc._cropcomp._cropdiv._offsetX += sw;
			this._doc._cropcomp._cropdiv.style.width = dw - sw + "px";
			this._doc._cropcomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "rect1":
			if ((sw + this._doc._cropcomp._cropdiv._offsetX < 0) || dw <= 5)
				return;
			this._doc._cropcomp._cropdiv._offsetX += sw;
			this._doc._cropcomp._cropdiv.style.width = dw - sw + "px";
			break;
		case "rect2":
			if (sh + this._doc._cropcomp._cropdiv._offsetY < 0 || dh <= 5)
				return;
			this._doc._cropcomp._cropdiv._offsetY += sh;
			this._doc._cropcomp._cropdiv.style.height = dh - sh + "px";
			break;
		case "rect3":
			this._doc._cropcomp._cropdiv.style.width = dw + sw + "px";
			break;
		case "rect4":
			this._doc._cropcomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "move":
			if ((sw + this._doc._cropcomp._cropdiv._offsetX < 0) || (dw + sw + this._doc._cropcomp._cropdiv._offsetX > this._doc._canvas.width))
				return;
			if ((sh + this._doc._cropcomp._cropdiv._offsetY < 0) || (dh + sh + this._doc._cropcomp._cropdiv._offsetY > this._doc._canvas.height))
				return;
			this._doc._cropcomp._cropdiv._offsetX += sw;
			this._doc._cropcomp._cropdiv._offsetY += sh;
			break;
	}
	if (this._doc._cropcomp._cropdiv._offsetX < 0)
		this._doc._cropcomp._cropdiv._offsetX = 0;
	if (this._doc._cropcomp._cropdiv._offsetY < 0)
		this._doc._cropcomp._cropdiv._offsetY = 0;
	if (this._doc._cropcomp._cropdiv._offsetX + parseInt(this._doc._cropcomp._cropdiv.style.width) > this._doc._canvas.width)
		this._doc._cropcomp._cropdiv.style.width = this._doc._canvas.width - this._doc._cropcomp._cropdiv._offsetX + "px";
	if (this._doc._cropcomp._cropdiv._offsetY + parseInt(this._doc._cropcomp._cropdiv.style.height) > this._doc._canvas.height)
		this._doc._cropcomp._cropdiv.style.height = this._doc._canvas.height - this._doc._cropcomp._cropdiv._offsetY + "px";
	this._doc.__ReCalcCropComp();
	this._pos = this.__CreatePosition(evt);
});
define.method("__HandleCaptureRelease", function () {
	this._mode = null;
	this._moving = false;
	this._movingcanvas = false;
});
define.method("__HandleCaptureCancel", function () {
	this._mode = null;
	this._moving = false;
	this._movingcanvas = false;
});
define.method("__KeyMove", function (sw, sh) {
	if (!sw && !sh) return;
	var dw = parseInt(this._doc._cropcomp._cropdiv.style.width);
	var dh = parseInt(this._doc._cropcomp._cropdiv.style.height);
	if((sw + this._doc._cropcomp._cropdiv._offsetX < 0) || (dw + sw + this._doc._cropcomp._cropdiv._offsetX > this._doc._canvas.width))
	return;
	if ((sh + this._doc._cropcomp._cropdiv._offsetY < 0) || (dh + sh + this._doc._cropcomp._cropdiv._offsetY > this._doc._canvas.height))
		return;
	this._doc._cropcomp._cropdiv._offsetX += sw;
	this._doc._cropcomp._cropdiv._offsetY += sh;
	this._doc.__ReCalcCropComp();
});
define.method("__GetMousePosInCropComp", function (e) {
	var target = e.target || e.srcElement;
	var ow = parseInt(this._doc._cropcomp._cropdiv.style.width);
	var oh = parseInt(this._doc._cropcomp._cropdiv.style.height);
	if (target == this._doc._cropcomp._corner1 || target == this._doc._cropcomp._point5) return "corner1";
	if (target == this._doc._cropcomp._corner2 || target == this._doc._cropcomp._point6) return "corner2";
	if (target == this._doc._cropcomp._corner3 || target == this._doc._cropcomp._point7) return "corner3";
	if (target == this._doc._cropcomp._corner4 || target == this._doc._cropcomp._point8) return "corner4";
	if (target == this._doc._cropcomp._rect1 || target == this._doc._cropcomp._point1) return "rect1";
	if (target == this._doc._cropcomp._rect2 || target == this._doc._cropcomp._point2) return "rect2";
	if (target == this._doc._cropcomp._rect3 || target == this._doc._cropcomp._point3) return "rect3";
	if (target == this._doc._cropcomp._rect4 || target == this._doc._cropcomp._point4) return "rect4";
	if (target == this._doc._cropcomp._fill) return "move";
	return "";
});

/****************************************************************\
CUT
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolCut", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	this._doc.set_SelectedTool(null);
	var sel = this._doc.get_selection();
	//Create a new history using selected area
	if (!sel)
		return;

	this._layer = this._doc.get_layer();
	this._oldhistorylist = this._doc.__GetHistoryList();

	var newlayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	newlayer.set_name(this._doc.Text["Layer_Cut"]);

	this._doc.set_selection(null);
	this._doc.__DoLayerAdd(newlayer);

	//Draw new layer
	var ctx = newlayer._2d;
	var sw = this._layer._canvas.width;
	var sh = this._layer._canvas.height;
	var dw = newlayer._canvas.width;
	var dh = newlayer._canvas.height;
	ctx.drawImage(this._layer._canvas, 0 - this._layer._canvas_x, 0 - this._layer._canvas_y, dw, dh, 0, 0, dw, dh);
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";
	ctx.drawImage(sel, 0, 0, sel.width, sel.height);
	ctx.restore();

	//Clear old layer selected area
	//TODO: if copy selected area, ignore this code
	var ls = this._doc.get_history()._layers;
	var _olayer = null;
	for (var i = ls.length - 2; i >= 0; i--) {
		if (ls[i]._layerid != this._layer._layerid)
			continue;
		_olayer = ls[i];
		break;
	}

	var _copy_olayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	_copy_olayer._canvas_x = _olayer._canvas_x;
	_copy_olayer._canvas_y = _olayer._canvas_y;
	_copy_olayer._canvas.width = _olayer._canvas.width;
	_copy_olayer._canvas.height = _olayer._canvas.height;
	_copy_olayer._layerid = _olayer._layerid;
	_copy_olayer.set_name(this._doc.Text["Layer_Cut"]);
	_copy_olayer.__SetNormal();

	var _octx = _copy_olayer._2d;
	_octx.drawImage(_olayer._canvas, 0, 0, _olayer._canvas.width, _olayer._canvas.height);
	_octx.save();
	_octx.globalCompositeOperation = "destination-in";
	_octx.drawImage(sel, 0 - _olayer._canvas_x, 0 - _olayer._canvas_y, sel.width, sel.height);
	_octx.restore();

	var ls = this._doc.get_history()._layers;
	for (var i = ls.length - 1; i >= 0; i--) {
		if (ls[i]._layerid == _olayer._layerid) {
			ls[i] = _copy_olayer;
		}
		if (ls[i]._layerid == newlayer._layerid) {
			ls.splice(i, 1);
		}
	}

	this._doc.__RePaint();
	this._doc.invoke_event("HistorySelected");

	this._doc._clipboard = newlayer;
	this._canvas_x = 0;
	this._canvas_y = 0;
	this._doc.set_layer(_copy_olayer);
});



/****************************************************************\
COPY
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolCopy", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	this._doc.set_SelectedTool(null);
	var sel = this._doc.get_selection();
	//Create a new history using selected area				
	var newlayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	newlayer.set_name(this._doc.Text["Layer_Copy"]);

	//Draw new layer
	var ctx = newlayer._2d;
	var layer = this._doc.get_layer();
	var sw = layer._canvas.width;
	var sh = layer._canvas.height;
	var dw = newlayer._canvas.width;
	var dh = newlayer._canvas.height;
	ctx.drawImage(layer._canvas, 0 - layer._canvas_x, 0 - layer._canvas_y, dw, dh, 0, 0, dw, dh);
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";
	ctx.drawImage(sel, 0, 0, sel.width, sel.height);
	ctx.restore();
	this._doc._clipboard = newlayer;
	this._doc.set_selection(null);
	this._doc.__RePaint();
});

/****************************************************************\
PASTE
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolPaste", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	this._doc.set_SelectedTool(null);
	if (!this._doc._clipboard)
		return;
	var newlayer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	newlayer.set_name(this._doc.Text["Layer_Paste"]);
	var ctx = newlayer._2d;
	var sw = this._doc._clipboard._canvas.width;
	var sh = this._doc._clipboard._canvas.height;
	var dw = newlayer._canvas.width;
	var dh = newlayer._canvas.height;
	ctx.drawImage(this._doc._clipboard._canvas, 0 - this._doc._clipboard._canvas_x, 0 - this._doc._clipboard._canvas_y, dw, dh, 0, 0, dw, dh);

	this._doc.__DoLayerAdd(newlayer);
	//select this layer
	//this._doc.__SelectLayerSelection(newlayer);
});




/****************************************************************\
TEXT
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolText", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;

	this._offsetx = 0;
	this._offsety = 0;
	this._canvas_x = 0;
	this._canvas_y = 0;
	this._doc.__RePaint();
	var instance = this;

	setTimeout(function () {
		if (!instance._doc._submenu)
			return;
		var textpanel = instance._doc._submenu;
		instance._textpanel = textpanel;
		var textbox = textpanel.GetEditor();
		textbox._oldval = "";
		textbox.onblur = function () {
			if (textpanel._interval)
				clearInterval(textpanel._interval);
		}
		textbox.onfocus = function () {
			textpanel._interval = setInterval(function () {
				textpanel.OptionChanged(textbox, textbox.value);
			}, 200);
		}
		textbox.onkeydown = function (e) {
			e = window.event || e;
			var kc = e.keyCode;
			if (!instance._txt || instance._txt.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "").length == 0)
				return;
			if (kc != 13)
				return;
			if (e.shiftKey)
				return;
			textpanel.Apply(instance._txt, instance._font, instance._size, instance._bold, textpanel.find_element("cbx_newlayer").checked);
			return;
		}
		textpanel.Preview = function (txt, font, size, bold) {
			instance._txt = txt;
			instance._font = font;
			instance._size = size;
			instance._bold = bold;
			textbox.style.fontFamily = font;
			textbox.style.fontSize = size;
			textbox.style.fontWeight = bold;
		}
		textpanel.Apply = function (txt, font, size, bold, iscreatelayer) {
			instance._doc.__RePaint();
			if (!txt) {
				return;
			}
			if (!instance._canvas) {
				alert(instance._doc.Text["SelectArea"]);
				return;
			}
			var layer = instance.__DrawNewLayer(txt, font, size, bold);
			if (iscreatelayer)
				instance._doc.__DoLayerAdd(layer);
			else
				instance._doc.__DoLayerDraw(layer);
			textbox.value = "";
			instance._doc.textcontainer.SetVisible(0);
			instance._canvas = null;
			instance._2d = null;
			instance._txt = null;
			instance._font = null;
			instance._size = null;
			instance._bold = null;
			instance._offsetx = 0;
			instance._offsety = 0;
			instance._canvas_x = 0;
			instance._canvas_y = 0;
		}
	}, 300);
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (this._doc.textcontainer && this._doc.textcontainer.div.style.display && this._doc.textcontainer.div.style.display == "none")
		this._doc._canvas.title = this._doc.Text["Title_PreText"];
	else
		this._doc._canvas.title = "";
	if (evt.type == "mouseout")
		this._doc._canvas.title = "";
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;
	//if (!this._txt)
	//	return;
	this._pos = this.__CreatePosition(evt);
	this._doc.textcontainer.SetVisible(0);
	this._canvas = document.createElement("canvas");
	this._2d = this._canvas.getContext("2d");
	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);
	var scale = this._doc.__GetZoomScale();
	this._canvas.width = (this._pos.maxX - this._pos.minX) * scale;
	this._canvas.height = (this._pos.maxY - this._pos.minY) * scale;
	this._2d.strokeStyle = "Red";
	this._2d.strokeRect(0, 0, this._canvas.width, this._canvas.height);
	this._doc.__RePaint();
	try {
		this._doc._2d.drawImage(this._canvas, this._pos.minX * scale, this._pos.minY * scale);
	} catch (x)
	{ }
	//this._canvas_x = this._pos.lastX - this._pos.downX + this._offsetx;
	//this._canvas_y = this._pos.lastY - this._pos.downY + this._offsety;
	//this._textpanel.Preview(this._txt, this._font, this._size);
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0) return;
	this._doc.__RePaint();
	var textcontainer = this._doc.textcontainer;
	var scale = this._doc.__GetZoomScale();
	textcontainer.ReCalc(this._pos.minX * scale, this._pos.minY * scale,
		(this._pos.maxX - this._pos.minX) * scale, (this._pos.maxY - this._pos.minY) * scale);
	textcontainer.SetVisible(1);
	var editor = this._textpanel.GetEditor();
	editor.style.color = this._doc.GetOption("Ctx_TextColor");
	editor.style.background = "transparent";
	editor.style.border = "solid 1px red";
	editor.style.width = parseInt((this._pos.maxX - this._pos.minX) * scale) + "px";
	editor.style.height = parseInt((this._pos.maxY - this._pos.minY) * scale) + "px";
	//set resize = none
	editor.style.maxWidth = editor.style.width;
	editor.style.maxHeight = editor.style.height;
	editor.style.minWidth = editor.style.width;
	editor.style.minHeight = editor.style.height;

	textcontainer.SetChild(editor);
	editor.focus();
	//this._textpanel.Preview(this._txt, this._font, this._size, this._bold);
});
define.method("__HandleCaptureCancel", function () {
	//this._textpanel.Preview(this._txt, this._font, this._size, this._bold);
	this._doc.__RePaint();
});
define.method("__DrawNewLayer", function (txt, font, size, bold) {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Text"]);
	layer.type = "text";
	layer._canvas_x = 0; // this._canvas_x;
	layer._canvas_y = 0; // this._canvas_y;

	var canvas = layer._canvas;
	var ctx = layer._2d;
	var _canvas = document.createElement("canvas");
	_canvas.width = this._canvas.width;
	_canvas.height = this._canvas.height;
	var _2d = _canvas.getContext("2d");
	//this._2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
	_2d.fillStyle = this._doc.GetOption("Ctx_TextColor");
	_2d.font = bold + " " + size + " " + font;
	//measure text width, then can to break row
	var maxwidth = 0;
	var txtarr = txt.split("\n");
	var row = txtarr.length;
	var txtarr2 = [];
	for (var i = 0; i < row; i++) {
		var len = _2d.measureText(txtarr[i]).width;
		//maxwidth = Math.max(len, maxwidth);
		if (len > _canvas.width) {
			var startcount = Math.floor(txtarr[i].length / Math.ceil(len / _canvas.width));
			var endcount = Math.floor(txtarr[i].length / Math.floor(len / _canvas.width));
			var realcount = startcount;
			for (var j = startcount; j < endcount; j++) {
				realcount = j;
				var _l = _2d.measureText(txtarr[i].substr(0, j)).width;
				if (_l >= _canvas.width)
					break;
			}
			if (realcount < 1) {
				this._doc.__RePaint();
				return;
			}
			if (realcount > 1)
				realcount = realcount - 1;
			for (var j = 0; j < txtarr[i].length; j += realcount) {
				if (j + realcount <= txtarr[i].length)
					txtarr2.push(txtarr[i].substr(j, realcount));
				else
					txtarr2.push(txtarr[i].substr(j, txtarr[i].length - j));
			}
		}
		else
			txtarr2.push(txtarr[i]);
	}
	row = txtarr2.length;
	txtarr = txtarr2;
	var maxheight = row * (Math.floor(parseInt(size) * 7 / 6));
	if (maxheight > _canvas.height || maxwidth > _canvas.width) {
		_canvas.width = Math.max(_canvas.width, maxwidth);
		_canvas.height = Math.max(_canvas.height, maxheight);
		//reset attribute
		_2d.fillStyle = this._doc.GetOption("Ctx_TextColor");
		_2d.font = bold + " " + size + " " + font;
	}

	_2d.save();
	for (var i = 0; i < row; i++) {
		if (i > 0)
			_2d.translate(0, Math.floor(parseInt(size) * 7 / 6));
		else
			_2d.translate(0, parseInt(size));
		_2d.fillText(txtarr[i], 0, 0);
	}
	_2d.restore();
	var realpos = this.__Translate({ x: this._pos.minX, y: this._pos.minY });
	ctx.drawImage(_canvas, this._pos.minX, this._pos.minY);
	//ctx.drawImage(_canvas, realpos.x, realpos.y);
	return layer;
});


/****************************************************************\
UNDO
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolUndo", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;

	this._doc.set_SelectedTool(null);

	var _his = this._doc.get_history();
	var _hislist = this._doc.__GetHistoryList();

	if (_his == _hislist[0])
		return;
	var ix = null;
	for (var i = _hislist.length - 1; i > 0; i--) {
		if (_hislist[i] == _his) {
			ix = i;
			break;
		}
	}
	if (ix == null)
		return;
	this._doc.set_history(_hislist[ix - 1]);
});

/****************************************************************\
REDO
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolRedo", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;

	this._doc.set_SelectedTool(null);

	var _his = this._doc.get_history();
	var _hislist = this._doc.__GetHistoryList();

	if (_his == _hislist[_hislist.length - 1])
		return;
	var ix = null;
	for (var i = _hislist.length - 2; i >= 0; i--) {
		if (_hislist[i] == _his) {
			ix = i;
			break;
		}
	}
	if (ix == null)
		return;
	this._doc.set_history(_hislist[ix + 1]);
});



/****************************************************************\
POLYGON, STAR
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolPolygon", "ImageEditorToolBase");
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos = this.__CreatePosition(evt);

	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {

	this._pos.HandleMove(evt);

	var layer = this.__DrawNewLayer();
	var ctx = this._doc.__Reset2D();

	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});
define.method("__HandleCaptureRelease", function () {
	if (this._pos._movecount == 0)
		return;

	var layer = this.__DrawNewLayer();

	if (this._doc.GetOption("AutoCreateLayer"))
		this._doc.__DoLayerAdd(layer);
	else
		this._doc.__DoLayerDraw(layer);
});
define.method("__DrawNewLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	if (this._doc.get_SelectedTool() == "star")
		layer.set_name(this._doc.Text["Layer_Star"] + " " + layer._layerid);
	else
		layer.set_name(this._doc.Text["Layer_Polygon"] + " " + layer._layerid);
	layer.type = "rect";
	layer._typedata.position = this._pos;

	var w = layer._canvas.width;
	var h = layer._canvas.height;
	if (this._pos.minX < 0)
		w += Math.abs(this._pos.minX);
	else
		w = Math.max(this._pos.maxX, w);

	if (this._pos.minY < 0)
		h += Math.abs(this._pos.minY);
	else
		h = Math.max(this._pos.maxY, h);

	layer._canvas.width = w;
	layer._canvas.height = h;

	var ctx = layer._2d;

	ctx.lineWidth = this._doc.GetOption("Ctx_LineWidth");
	ctx.fillStyle = this._doc.GetOption("Ctx_BackColor");
	ctx.strokeStyle = this._doc.GetOption("Ctx_ForeColor");
	var _filltype = this._doc.GetOption("Ctx_FillType");
	var _usepattern = this._doc.GetOption("Ctx_UsePattern");
	var _pattern = this._doc.GetOption("Ctx_FillPattern");
	if (_usepattern && _pattern) {
		ctx.fillStyle = _pattern;
		ctx.strokeStyle = _pattern;
	}

	var ox = Math.max(this._pos.minX, 0);
	var oy = Math.max(this._pos.minY, 0);
	layer._canvas_x = Math.min(this._pos.minX, 0);
	layer._canvas_y = Math.min(this._pos.minY, 0);

	var _sides = this._doc.GetOption("Ctx_PolygonSides");
	var _points = this._doc.GetOption("Ctx_StarPoints");
	if (this._doc.get_SelectedTool() == "star")
		this.__DrawStarRect(ctx, this._pos.downX, this._pos.downY, this._pos.lastX, this._pos.lastY, _points, _filltype);
	else
		this.__DrawPolygonRect(ctx, this._pos.downX, this._pos.downY, this._pos.lastX, this._pos.lastY, _sides, _filltype);
	this._doc.__DeleteUnselected(layer);

	return layer;
});
define.method("__DrawPolygonRect", function (ctx, ox, oy, lastx, lasty, sides, filltype) {
	ctx.save();
	ctx.beginPath();
	var startradians = 0;
	if (lastx - ox != 0)
		startradians = Math.atan((lasty - oy) / (lastx - ox));
	else {
		if (lasty > oy)
			startradians = - Math.PI / 2;
		else
			startradians =  Math.PI / 2;
	}
	var radius = Math.sqrt(Math.pow(lastx - ox, 2) + Math.pow(lasty - oy, 2));
	for (var i = 0; i < sides; i++) {
		var radians = startradians + i * 2 * Math.PI / sides;
		var x = ox + Math.cos(radians) * radius;
		var y = oy + Math.sin(radians) * radius;
		if (i == 0)
			ctx.moveTo(x, y);
		else
			ctx.lineTo(x, y);
	}
	ctx.closePath();
	if (filltype == "fill" || filltype == "fillstroke") ctx.fill();
	if (filltype == "stroke" || filltype == "fillstroke") ctx.stroke();
	ctx.restore();
});
define.method("__DrawStarRect", function (ctx, ox, oy, lastx, lasty, points, filltype) {
	ctx.save();
	ctx.beginPath();
	var startradians = 0;
	if (lastx - ox != 0)
		startradians = Math.atan((lasty - oy) / (lastx - ox));
	else {
		if (lasty > oy)
			startradians = -Math.PI / 2;
		else
			startradians = Math.PI / 2;
	}
	//startradians += Math.PI / 4;
	var ratio = this._doc.GetOption("Ctx_StarRatio");
	var external = Math.sqrt(Math.pow(lastx - ox, 2) + Math.pow(lasty - oy, 2));
	var internal = external * ratio; //Math.abs(Math.cos(startradians));
	for (var i = 0; i < points * 2; i++) {
		var radians = startradians + i * Math.PI / points;
		var radius = i % 2 == 0 ? external : internal;
		var x = ox + Math.cos(radians) * radius;
		var y = oy + Math.sin(radians) * radius;
		if (i == 0)
			ctx.moveTo(x, y);
		else
			ctx.lineTo(x, y);
	}
	ctx.closePath();
	if (filltype == "fill" || filltype == "fillstroke") ctx.fill();
	if (filltype == "stroke" || filltype == "fillstroke") ctx.stroke();
	ctx.restore();
});

/****************************************************************\
RedEye
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolRedeye", "ImageEditorToolBase");
define.constructor(function () {
	this.ImageEditorToolBase_constructor.apply(this, arguments);

	this._doc.SetOption("EraseBrushShape", "arc");
	this._doc.SetOption("EraseBrushColor", "transparent");
	this._doc.__MakeErase();

	this._canvas = document.createElement("canvas");
	this._canvas.width = 20;
	this._canvas.height = 20;
	this._2d = this._canvas.getContext("2d");
	this._2d.fillStyle = "red";
	this._2d.fillRect(0, 0, 20, 20);
});
define.method("__ToolDetach", function () {
	this._doc.__RePaint();
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (evt.type == "mouseout") {
		this._doc.__RePaint();
		return;
	}
	if (evt.type == "mousemove") {
		if (!this._doc.__HasCaptureMouse()) {
			this.__HandleNormalMove(evt);
		}
	}

	if (evt.type != "mousedown" || this.__IsContextMenu(evt))
		return;

	this._pos = this.__CreatePosition(evt);

	this._doc.__CaptureMouse(this, evt);

	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.set_name(this._doc.Text["Layer_Redeye"]);

	this._doc.__DoLayerDraw(layer);

	this.__HandleCaptureMove(evt);
});
define.method("__DrawErasePath", function (x, y) {
	var scale = this._doc.__GetZoomScale();
	var erasecanvas = this._doc._erase_m;
	var w = erasecanvas.width * scale; //this._canvas.width;
	var h = erasecanvas.height * scale; //this._canvas.height;

	x = x * scale;
	y = y * scale;

	var ctx = this._doc.__Reset2D();
	ctx.drawImage(erasecanvas, x - w / 2, y - h / 2, w, h);
});
define.method("__HandleNormalMove", function (evt) {
	this._pos = this.__CreatePosition(evt);

	this._doc.__RePaint();
	this.__DrawErasePath(this._pos.lastX, this._pos.lastY);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);

	var x = this._pos.lastX;
	var y = this._pos.lastY;

	var layer = this._doc.get_layer();
	var ctx = this._doc.get_layer()._2d;
	var erasecanvas = this._doc._erase;
	var erasecanvas_m = this._doc._erase_m;
	var w = erasecanvas.width; //this._canvas.width;
	var h = erasecanvas.height; //this._canvas.height;

	var tcanvas = document.createElement("canvas");
	tcanvas.width = w;
	tcanvas.height = h;
	var tctx = tcanvas.getContext("2d");
	var imgdata = ctx.getImageData(x - w / 2 - layer._canvas_x, y - h / 2 - layer._canvas_y, w, h);
	var data = imgdata.data;
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			var redinten = data[ix * 4] / ((data[ix * 4 + 1] + data[ix * 4 + 2]) / 2);
			if (redinten > 1.5) {//2.2 90?
				data[ix * 4] = (data[ix * 4 + 1] + data[ix * 4 + 2]) / 2;
			}
		}
	}
	imgdata.data = data;
	tctx.putImageData(imgdata, 0, 0);
	ctx.drawImage(tcanvas, x - w / 2 - layer._canvas_x, y - h / 2 - layer._canvas_y, w, h);
});
define.method("__HandleCaptureRelease", function () {

});


/****************************************************************\
FREE TRANSLATE
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolFreesize", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	this._layer = this._doc.get_layer();
	var sel = this._doc.get_selection();
	if (sel) {
		this._doc.set_selection(null);
		this._doc.__RePaint();
	}
	this.freecomp = this._doc._freecomp;
	if (this.freecomp._cropdiv.style.display != "none")
		return;

	if (this._doc.__GetZoomScale() != 1) {
		this._doc.SetOption("ZoomCount", 0);
		this._doc.__RePaint();
	}
	this._drawtime = 0;
	var tool = this;
	setTimeout(function () {
		tool.freecomp._cropdiv.style.display = "";
		tool.InitLayerArea();
	}, 50);
	this.tcanvas = document.createElement("canvas");
	this.tctx = this.tcanvas.getContext("2d");

	this.freecomp._cropdiv.onmousedown = function (e) {
		tool.__HandleCanvasEvent(e);
		if (e.preventDefault) e.preventDefault();
		e.returnValue = false;
	}
	this.freecomp._cropdiv.onmousemove = function (e) {
		tool.__HandleCaptureMove(e);
	}
	this.freecomp._cropdiv.onmouseup = function (e) {
		//tool.__HandleCaptureRelease(e);
	}
	this.freecomp._cropdiv.onmouseout = function (e) {
	}
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	var target = evt.target || evt.srcElement;
	if (evt.type != "mousedown" || this.__IsContextMenu(evt) || target == this._doc._canvas || this._moving)
		return;
	this._drawtime = 0;
	this._pos = this.__CreatePosition(evt);
	var mode = this.__GetMousePosInFreeComp(evt);
	if (!mode)
		return;
	this._mode = mode;
	this._moving = true;
	this._movingcanvas = false;
	this._doc.__CaptureMouse(this, evt);
	this._sw = 0;
	this._sh = 0;
	this._degree = 0;

	var l = this._doc.get_layer();
	this._dw = parseInt(this.freecomp._cropdiv.style.width);
	this._dh = parseInt(this.freecomp._cropdiv.style.height);
	this.tcanvas.width = this._dw;
	this.tcanvas.height = this._dh;
	this.tctx.clearRect(0, 0, this._dw, this._dh);
	this.tctx.drawImage(l._canvas, this.freecomp._cropdiv._offsetX - l._canvas_x, this.freecomp._cropdiv._offsetY - l._canvas_y, Math.min(this._dw, l._canvas.width), Math.min(this._dh, l._canvas.height),
		0, 0, this._dw, this._dh);

	if (this._mode.indexOf("point") == 0 || this._mode == "move") {
		this.freecomp._cropdiv.style.backgroundImage = "url(" + this.tcanvas.toDataURL() + ")";
	}
	this._doc._2d.clearRect(0, 0, this._doc._canvas.width, this._doc._canvas.height);
	var ls = this._doc._history._layers;
	for (var i = 0; i < ls.length; i++) {
		var layer = ls[i];
		if (this._doc._history.__GetLayerProperty(layer, "Hidden") || layer._layerid == l._layerid)
			continue;
		var sx = layer._canvas_x;
		var sy = layer._canvas_y;
		var dx = layer._canvas.width;
		var dy = layer._canvas.height;
		this._doc._2d.drawImage(layer._cacheCanvas || layer._canvas, sx, sy, dx, dy);
	}
});
define.method("__HandleCaptureMove", function (evt) {
	if (!this._moving)
		return;
	var target = evt.target || evt.srcElement;
	if (target == this._doc._canvas && !this._movingcanvas) {
		this._pos = this.__CreatePosition(evt);
		this._movingcanvas = true;
	}
	this._pos.HandleMove(evt);
	this._drawtime++;

	var sw = this._pos.lastX - this._pos.downX;
	var sh = this._pos.lastY - this._pos.downY;
	var scale = this._doc.__GetZoomScale();
	if (scale != 1) {
		sw = parseInt(sw * scale);
		sh = parseInt(sh * scale);
	}

	var l = this._doc.get_layer();
	var rect = 80;
	var dw = parseInt(this.freecomp._cropdiv.style.width);
	var dh = parseInt(this.freecomp._cropdiv.style.height);
	var dx = this.freecomp._cropdiv._offsetX;
	var dy = this.freecomp._cropdiv._offsetY;
	var cpos = this.__TransTopPos(this.freecomp._cropdiv, parseInt(dw / 2), parseInt(dh / 2));
	var epos = this.__TransTopPos(evt.target || evt.srcElement, this._pos.lastX, this._pos.lastY, evt);
	var evtincomp = this.__GetMousePosInFreeComp(evt);
	if (!evtincomp)
		evtincomp = false;
	else
		evtincomp = true;
	var cx = cpos.x;
	var cy = cpos.y;
	switch (this._mode) {
		case "corner1":
			if (dw - sw < rect && dh - sh < rect) return;
			if (dw - sw >= rect) {
				this.freecomp._cropdiv._offsetX += sw;
				this.freecomp._cropdiv.style.width = dw - sw + "px";
			}
			if (dh - sh >= rect) {
				this.freecomp._cropdiv._offsetY += sh;
				this.freecomp._cropdiv.style.height = dh - sh + "px";
			}
			break;
		case "corner2":
			if (dw + sw < rect && dh - sh < rect) return;
			if (dw + sw >= rect)
				this.freecomp._cropdiv.style.width = dw + sw + "px";
			if (dh - sh >= rect) {
				this.freecomp._cropdiv._offsetY += sh;
				this.freecomp._cropdiv.style.height = dh - sh + "px";
			}
			break;
		case "corner3":
			if (dw + sw < rect && dh + sh < rect) return;
			if (dw + sw >= rect)
				this.freecomp._cropdiv.style.width = dw + sw + "px";
			if (dh + sh >= rect)
				this.freecomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "corner4":
			if (dw - sw < rect && dh + sh < rect) return;
			if (dw - sw >= rect) {
				this.freecomp._cropdiv._offsetX += sw;
				this.freecomp._cropdiv.style.width = dw - sw + "px";
			}
			if (dh + sh >= rect)
				this.freecomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "rect1":
			if (dw - sw < rect) return;
			this.freecomp._cropdiv._offsetX += sw;
			this.freecomp._cropdiv.style.width = dw - sw + "px";
			break;
		case "rect2":
			if (dh - sh < rect) return;
			this.freecomp._cropdiv._offsetY += sh;
			this.freecomp._cropdiv.style.height = dh - sh + "px";
			break;
		case "rect3":
			if (dw + sw < rect) return;
			this.freecomp._cropdiv.style.width = dw + sw + "px";
			break;
		case "rect4":
			if (dh + sh < rect) return;
			this.freecomp._cropdiv.style.height = dh + sh + "px";
			break;
		case "move":
			this.freecomp._cropdiv._offsetX += sw;
			this.freecomp._cropdiv._offsetY += sh;
			break;
		case "point1":
			if (evtincomp) return;
			var longside = Math.sqrt(Math.pow(epos.y - cy, 2) + Math.pow(epos.x - cx, 2));
			if (longside == 0) return;
			var degree = Math.asin((cy - epos.y) / longside) * 180 / Math.PI;
			if (degree < 0 && epos.x > cx) degree = -180 + Math.abs(degree);
			if (degree > 0 && epos.x > cx) degree = 180 - degree;
			if (degree == 0) {
				if (this._degree < 0) degree = -180;
				else if (this._degree > 0) degree = 180;
			}
			this._degree = degree;
			this.__ElementRotate(this.freecomp._cropdiv, degree);
			break;
		case "point2":
			if (evtincomp) return;
			var longside = Math.sqrt(Math.pow(epos.y - cy, 2) + Math.pow(epos.x - cx, 2));
			if (longside == 0) return;
			var degree = Math.asin((epos.x - cx) / longside) * 180 / Math.PI;
			if (degree < 0 && epos.y > cy) degree = -180 + Math.abs(degree);
			if (degree > 0 && epos.y > cy) degree = 180 - degree;
			if (degree == 0) {
				if (this._degree < 0) degree = -180;
				else if (this._degree > 0) degree = 180;
			}
			this._degree = degree;
			this.__ElementRotate(this.freecomp._cropdiv, degree);
			break;
		case "point3":
			if (evtincomp) return;
			var longside = Math.sqrt(Math.pow(epos.y - cy, 2) + Math.pow(epos.x - cx, 2));
			if (longside == 0) return;
			var degree = Math.asin((epos.y - cy) / longside) * 180 / Math.PI;
			if (degree < 0 && epos.x < cx) degree = -180 + Math.abs(degree);
			if (degree > 0 && epos.x < cx) degree = 180 - degree;
			if (degree == 0) {
				if (this._degree < 0) degree = -180;
				else if (this._degree > 0) degree = 180;
			}
			this._degree = degree;
			this.__ElementRotate(this.freecomp._cropdiv, degree);
			break;
		case "point4":
			if (evtincomp) return;
			var longside = Math.sqrt(Math.pow(epos.y - cy, 2) + Math.pow(epos.x - cx, 2));
			if (longside == 0) return;
			var degree = Math.asin((cx - epos.x) / longside) * 180 / Math.PI;
			if (degree < 0 && epos.y < cy) degree = -180 + Math.abs(degree);
			if (degree > 0 && epos.y < cy) degree = 180 - degree;
			if (degree == 0) {
				if (this._degree < 0) degree = -180;
				else if (this._degree > 0) degree = 180;
			}
			this._degree = degree;
			this.__ElementRotate(this.freecomp._cropdiv, degree);
			break;
	}
	//this._doc._2d.clearRect(dx, dy, dw, dh);
	var nw = parseInt(this.freecomp._cropdiv.style.width);
	var nh = parseInt(this.freecomp._cropdiv.style.height);
	if (this._mode == "move") {
		//this._doc._2d.drawImage(this.tcanvas, 0, 0, dw, dh, this.freecomp._cropdiv._offsetX, this.freecomp._cropdiv._offsetY, dw, dh);
	}
	else if (this._mode.indexOf("corner") == 0 || this._mode.indexOf("rect") == 0) {
		var ncavnas = document.createElement("canvas");
		ncavnas.width = nw;
		ncavnas.height = nh;
		var nctx = ncavnas.getContext("2d");
		nctx.scale(nw / this._dw, nh / this._dh);
		nctx.drawImage(this.tcanvas, 0, 0);
		//this._doc._2d.drawImage(ncavnas, 0, 0, nw, nh, this.freecomp._cropdiv._offsetX, this.freecomp._cropdiv._offsetY, nw, nh);
		this.freecomp._cropdiv.style.backgroundImage = "";
		this.freecomp._cropdiv.style.backgroundImage = "url(" + ncavnas.toDataURL() + ")";
	}
	this._sw += sw;
	this._sh += sh;
	this._doc.__ReCalcFreeComp();
	this._pos = this.__CreatePosition(evt);
});
define.method("__TransTopPos", function (target, x, y, evt) {
	var cp = jsml.get_clientposition(target);
	if (evt) {
		var mxy = this.__GetMouseXY(evt);
		return { "x": mxy.x, "y": mxy.y };
	}
	x += cp.left;
	y += cp.top;
	return { "x": x, "y": y };
});
define.method("__ElementRotate", function (element, degree) {
	if (jsml.opera) element.style.OTransform = "rotate(" + degree + "deg)";
	if (jsml.firefox) element.style.MozTransform = "rotate(" + degree + "deg)";
	if (/WebKit/.test(navigator.userAgent)) element.style.webkitTransform = "rotate(" + degree + "deg)";
	if (jsml.msie) element.style.msTransform = "rotate(" + degree + "deg)";
	try {element.style.transform = "rotate(" + degree + "deg)";	}
	catch (x)	{ }
});
define.method("__HandleCaptureRelease", function () {
	this.freecomp._cropdiv.style.backgroundImage = "";
	if (this._drawtime == 0) {
		this.__HandleCaptureCancel();
		this._doc.__RePaint();
		return;
	}
	this._drawtime = 0;
	this._doc.__CloneHistory(this._doc.Text["Layer_FreeTransform"]);
	var l = this._doc.get_layer();
	if (this._mode == "move") {
		l._canvas_x += this._sw;
		l._canvas_y += this._sh;
	}
	else if (this._mode.indexOf("corner") == 0 || this._mode.indexOf("rect") == 0) {
		var nw = parseInt(this.freecomp._cropdiv.style.width);
		var nh = parseInt(this.freecomp._cropdiv.style.height);
		var dx = this.freecomp._cropdiv._offsetX;
		var dy = this.freecomp._cropdiv._offsetY;
		if (dx < l._canvas_x) l._canvas_x = dx;
		if (dy < l._canvas_y) l._canvas_y = dy;
		var scalex = nw / this._dw;
		var scaley = nh / this._dh;
		nw = Math.floor(scalex * this._dw);
		nh = Math.floor(scaley * this._dh);
		l._canvas.width = Math.max(nw + dx - l._canvas_x, l._canvas.width);
		l._canvas.height = Math.max(nh + dy - l._canvas_y, l._canvas.height);
		var ncavnas = document.createElement("canvas");
		ncavnas.width = nw;
		ncavnas.height = nh;
		var nctx = ncavnas.getContext("2d");
		nctx.scale(scalex, scaley);
		nctx.drawImage(this.tcanvas, 0, 0);
		l._2d.clearRect(0, 0, l._canvas.width, l._canvas.height);
		l._2d.drawImage(ncavnas, 0, 0, nw, nh, this.freecomp._cropdiv._offsetX - l._canvas_x, this.freecomp._cropdiv._offsetY - l._canvas_y, nw, nh);
	}
	else if (this._degree != 0) {
		//rotate
		var radians = this._degree * Math.PI / 180;
		var nw = parseInt(this.freecomp._cropdiv.style.width);
		var nh = parseInt(this.freecomp._cropdiv.style.height);
		var dx = this.freecomp._cropdiv._offsetX;
		var dy = this.freecomp._cropdiv._offsetY;
		var rd = Math.sqrt(nw * nw + nh * nh);
		dx -= Math.ceil((Math.ceil(rd) - nw) / 2);
		dy -= Math.ceil((Math.ceil(rd) - nh) / 2);
		nw = Math.ceil(rd);
		nh = nw;
		if (dx < l._canvas_x) l._canvas_x = dx;
		if (dy < l._canvas_y) l._canvas_y = dy;
		l._canvas.width = Math.max(nw + dx - l._canvas_x, l._canvas.width);
		l._canvas.height = Math.max(nh + dy - l._canvas_y, l._canvas.height);
		var ncavnas = document.createElement("canvas");
		ncavnas.width = nw;
		ncavnas.height = nh;
		var nctx = ncavnas.getContext("2d");
		nctx.translate(ncavnas.width / 2, ncavnas.height / 2); //translate to rotate center
		nctx.rotate(radians);
		nctx.translate(0 - ncavnas.width / 2, 0 - ncavnas.height / 2); //translate back
		nctx.drawImage(this.tcanvas, (ncavnas.width - this.tcanvas.width) / 2, (ncavnas.height - this.tcanvas.height) / 2);

		l._2d.clearRect(0, 0, l._canvas.width, l._canvas.height);
		l._2d.drawImage(ncavnas, 0, 0, nw, nh, dx - l._canvas_x, dy - l._canvas_y, nw, nh);
	}
	this._doc.__RePaint();
	this.InitLayerArea();

	this._mode = null;
	this._moving = false;
	this._movingcanvas = false;
});
define.method("__HandleCaptureCancel", function () {
	this._mode = null;
	this._moving = false;
	this._movingcanvas = false;
});
define.method("InitLayerArea", function () {
	var l = this._doc.get_layer();
	if (this._doc._history.__GetLayerProperty(l, "Hidden")) {
		this.freecomp._cropdiv.style.display = "none";
		return;
	}
	var lc = l._canvas;
	var ld = l._2d;
	var w = lc.width;
	var h = lc.height;
	var minx = -1, maxx = -1, miny = -1, maxy = -1;
	var imgdata = ld.getImageData(0, 0, w, h);
	var data = imgdata.data;
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			if (data[ix * 4 + 3] == 0)
				continue;
			if (minx == -1) minx = i;
			else minx = Math.min(i, minx);
			if (maxx == -1) maxx = i;
			else maxx = Math.max(i, maxx);
			if (miny == -1) miny = j;
			else miny = Math.min(j, miny);
			if (maxy == -1) maxy = j;
			else maxy = Math.max(j, maxy);
		}
	}
	if (minx == -1) {
		this.freecomp._cropdiv.style.display = "none";
		return;
	}
	this.freecomp._cropdiv.style.width = Math.max(80, maxx - minx) + "px";
	this.freecomp._cropdiv.style.height = Math.max(80, maxy - miny) + "px";
	this.freecomp._cropdiv._offsetX = minx + l._canvas_x;
	this.freecomp._cropdiv._offsetY = miny + l._canvas_y;
	this.__ElementRotate(this.freecomp._cropdiv, 0);
	this._doc.__ReCalcFreeComp();
});
define.method("__GetMousePosInFreeComp", function (e) {
	var target = e.target || e.srcElement;
	if (target == this.freecomp._corner1 || target == this.freecomp._point5) return "corner1";
	if (target == this.freecomp._corner2 || target == this.freecomp._point6) return "corner2";
	if (target == this.freecomp._corner3 || target == this.freecomp._point7) return "corner3";
	if (target == this.freecomp._corner4 || target == this.freecomp._point8) return "corner4";
	if (target == this.freecomp._rect1) return "rect1";
	if (target == this.freecomp._rect2) return "rect2";
	if (target == this.freecomp._rect3) return "rect3";
	if (target == this.freecomp._rect4) return "rect4";
	if (target == this.freecomp._fill) return "move";
	if (target == this.freecomp._point1 || target.parentNode == this.freecomp._point1) return "point1";
	if (target == this.freecomp._point2 || target.parentNode == this.freecomp._point2) return "point2";
	if (target == this.freecomp._point3 || target.parentNode == this.freecomp._point3) return "point3";
	if (target == this.freecomp._point4 || target.parentNode == this.freecomp._point4) return "point4";
	return "";
});

/****************************************************************\
CLONE STAMP
\****************************************************************/
var define = jsml.class_define("__ImageEditorToolStamp", "ImageEditorToolBase");
define.constructor(function (doc) {
	this._doc = doc;
	if (this._doc.get_selection()) {
		this._doc.set_selection(null);
		this._doc.__RePaint();
	}
});
define.method("__HandleCanvasEvent", "__base_HandleCanvasEvent", function (evt) {
	if (!this._hasstamp)
		this._doc._canvas.title = this._doc.Text["Title_PreStamp"];
	else
		this._doc._canvas.title = "";
	if (this.__IsContextMenu(evt))
		return;
	if (evt.type == "mouseout") {
		if (this._hasstamp)
			this._doc.__RePaint();
		this._cancapture = false;
		this._doc._canvas.title = "";
	}
	if (evt.type == "mousemove") {
		this._cancapture = true;
		this._capturepos = this.__CreatePosition(evt);
		if (this._hasstamp) {
			//draw stamp arc on canvas
			this.__HandleNormalMove(evt);
		}
	}
	if (evt.altKey && this._cancapture && evt.type == "mousedown") {
		//make stamp arc
		this._pastepos = null;
		this._stamppos = this._capturepos;
		this._hasstamp = true;
		return;
	}
	if (evt.type != "mousedown" || !this._hasstamp)
		return;

	this._pos = this.__CreatePosition(evt);
	var _align = this._doc.GetOption("Ctx_StampAlignment");
	if ((_align && !this._pastepos) || !_align) {
		this._pastepos = this._pos;
		this.__InitLayer();
		this._moveavoid = true;
	}
	this.__HandleCaptureMove(evt);
	this._doc.__CaptureMouse(this, evt);
});
define.method("__HandleCaptureMove", function (evt) {
	this._pos.HandleMove(evt);
	this._moveavoid = true;
	this.__DrawNewLayer();
	var layer = this._layer;
	var ctx = this._doc.__Reset2D();
	var posimg = this.__GetPosCanvas();
	function DoPaint() {
		ctx.drawImage(layer._canvas, layer._canvas_x, layer._canvas_y, layer._canvas.width, layer._canvas.height);
		ctx.drawImage(posimg, layer._stampX, layer._stampY);
	}

	this.__PaintForLayer(jsml.delegate(this, DoPaint));
});
define.method("__HandleNormalMove", function (evt) {
	var scale = this._doc.__GetZoomScale();
	var pos = this.__CreatePosition(evt);
	if (!this._moveavoid)
		this._doc.__RePaint();
	var tcanvas = document.createElement("canvas");
	var diam = this._doc.GetOption("Ctx_StampDiameter");
	diam = diam * scale;
	var w = diam;
	var h = diam;
	tcanvas.width = w;
	tcanvas.height = h;
	var t2d = tcanvas.getContext("2d");
	t2d.strokeStyle = "black";
	t2d.arc(diam / 2, diam / 2, (diam - 1) / 2, 0, Math.PI * 2, false);
	t2d.stroke();
	var revertpos = this.__RevertPos({ x: pos.lastX, y: pos.lastY });
	this._doc._2d.drawImage(tcanvas, revertpos.x - diam / 2, revertpos.y - diam / 2);
});
define.method("__HandleCaptureRelease", function () {
	this._moveavoid = null;
	this.__MakeSmooth();
	var layer = this._layer;
	if (this._doc.GetOption("AutoCreateLayer"))
		this._doc.__DoLayerAdd(layer);
	else
		this._doc.__DoLayerDraw(layer);
	this._doc.__RePaint();
	this.__InitLayer();
});
define.method("__InitLayer", function () {
	var layer = jsml.class_create_instance("__ImageEditorLayer", [this._doc]);
	layer.type = "normal";
	layer.set_name(this._doc.Text["Layer_Stamp"]);
	layer._typedata.position = this._pos;
	this._layer = layer;

	this._canvas = document.createElement("canvas");
	this._canvas.width = this._doc._history._canvas_width;
	this._canvas.height = this._doc._history._canvas_height;
	this._2d = this._canvas.getContext("2d");
	this._2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
	var ls = this._doc._history._layers;
	for (var i = 0; i < ls.length; i++) {
		var layer = ls[i];
		if (this._doc._history.__GetLayerProperty(layer, "Hidden"))
			continue;
		var sx = layer._canvas_x;
		var sy = layer._canvas_y;
		var dx = layer._canvas.width;
		var dy = layer._canvas.height;
		this._2d.drawImage(layer._cacheCanvas || layer._canvas, sx, sy, dx, dy);
	}
	this._points = [];
	this._area = null;
});
define.method("__GetPosCanvas", function () {
	var scale = this._doc.__GetZoomScale();
	var tcanvas = document.createElement("canvas");
	var diam = this._doc.GetOption("Ctx_StampDiameter");
	diam = diam * scale;
	var w = diam;
	var h = diam;
	tcanvas.width = w;
	tcanvas.height = h;
	var t2d = tcanvas.getContext("2d");
	t2d.strokeStyle = "black";
	t2d.moveTo(diam / 2, 0);
	t2d.lineTo(diam / 2, diam);
	t2d.stroke();
	t2d.moveTo(0, diam / 2);
	t2d.lineTo(diam, diam / 2);
	t2d.stroke();
	return tcanvas;
});
define.method("__DrawNewLayer", function () {
	//this._doc.__DeleteUnselected(layer);
	var lx = Math.floor(this._pos.lastX);
	var ly = Math.floor(this._pos.lastY);
	var ox = lx - Math.floor(this._pastepos.downX);
	var oy = ly - Math.floor(this._pastepos.downY);
	var spx = Math.floor(this._stamppos.downX);
	var spy = Math.floor(this._stamppos.downY);
	var tcanvas = document.createElement("canvas");
	var diam = this._doc.GetOption("Ctx_StampDiameter");
	var radius = Math.floor(diam / 2);
	var w = diam;
	var h = diam;
	tcanvas.width = w;
	tcanvas.height = h;
	var t2d = tcanvas.getContext("2d");
	if (spx + radius + ox <= 0 || spx - radius + ox >= this._canvas.width)
		return null;
	if (spy + radius + oy <= 0 || spy - radius + oy >= this._canvas.height)
		return null;
	var sx = spx + ox - radius; //Math.max(this._stamppos.downX + ox - radius, 0);
	var sy = spy + oy - radius; //Math.max(this._stamppos.downY + oy - radius, 0);
	this._layer._stampX = sx;
	this._layer._stampY = sy;
	var imgdata = this._2d.getImageData(sx, sy, diam, diam);
	t2d.putImageData(imgdata, 0, 0);
	t2d.fillStyle = "Black";
	t2d.globalCompositeOperation = "destination-in";
	t2d.arc(radius, radius, radius, 0, Math.PI * 2, false);
	t2d.fill();

	var alpha = this._doc.GetOption("Ctx_StampAlpha");
	var data = imgdata.data;
	var imgdata1 = t2d.getImageData(0, 0, w, h);
	var data1 = imgdata1.data;
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			var ix = (w * y + x) * 4;
			if (data1[ix + 3] == 0) continue;
			//to resolve the canvas arc border gradient
			if (data[ix] != data1[ix] || data[ix + 1] != data1[ix + 1] || data[ix + 2] != data1[ix + 2] || data[ix + 3] != data1[ix + 3]) {
				data1[ix] = data[ix];
				data1[ix + 1] = data[ix + 1];
				data1[ix + 2] = data[ix + 2];
				data1[ix + 3] = data[ix + 3]; // * alpha;
				continue;
			}
			//data1[ix + 3] = data1[ix + 3] * alpha;
		}
	}
	imgdata1.data = data1;
	t2d.putImageData(imgdata1, 0, 0);
	//keep alpha in all layer area		
	this._layer._2d.save();
	this._layer._2d.globalCompositeOperation = "destination-out";
	this._layer._2d.drawImage(tcanvas, lx - radius, ly - radius);
	this._layer._2d.restore();
	if (alpha != 100) {
		alpha = alpha / 100;
		//make alpha
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				var ix = (w * y + x) * 4;
				if (data1[ix + 3] == 0) continue;
				data1[ix + 3] = data1[ix + 3] * alpha;
			}
		}
		imgdata1.data = data1;
		t2d.putImageData(imgdata1, 0, 0);
	}

	this._layer._2d.drawImage(tcanvas, lx - radius, ly - radius);

	var hard = this._doc.GetOption("Ctx_StampHardness");
	if (hard != 100) {
		if (!this._area)
			this._area = { minx: lx, miny: ly, maxx: lx, maxy: ly };
		else {
			this._area.minx = Math.min(lx, this._area.minx);
			this._area.miny = Math.min(ly, this._area.miny);
			this._area.maxx = Math.max(lx, this._area.maxx);
			this._area.maxy = Math.max(ly, this._area.maxy);
		}
		this._points.push({ x: lx, y: ly });
	}
	return this._layer;
});
define.method("__MakeSmooth", function () {
	var hard = this._doc.GetOption("Ctx_StampHardness");
	if (hard == 100 || !this._points || this._points.length == 0)
		return;
	var diam = this._doc.GetOption("Ctx_StampDiameter");
	var radius = diam % 2 == 1 ? Math.ceil(diam / 2) : diam / 2 + 1;
	var sx = Math.max(0, this._area.minx - radius);
	var sy = Math.max(0, this._area.miny - radius);
	var sw = Math.min(this._area.maxx - this._area.minx + 2 * radius, this._layer._canvas.width - sx);
	var sh = Math.min(this._area.maxy - this._area.miny + 2 * radius, this._layer._canvas.height - sy);
	var imagedata = this._layer._2d.getImageData(sx, sy, sw, sh);
	var data = imagedata.data;
	//var count = 0;

	for (var i = 0; i < this._points.length; i++) {
		//remove all overlapping points
		var point = this._points[i];
		var el = false;
		var er = false;
		var et = false;
		var eb = false;
		for (var j = 0; j < this._points.length; j++) {
			if (j == i) continue;
			var point2 = this._points[j];
			if (point2.x == point.x && point2.y == point.y) {
				el = true;
				er = true;
				et = true;
				eb = true;
				break;
			}
			var dr = Math.ceil(radius / 2);
			if (point2.x < point.x && point2.y < point.y && !el)
				el = Math.floor(Math.sqrt(Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2))) <= dr;
			if (point2.x > point.x && point2.y < point.y && !et)
				et = Math.floor(Math.sqrt(Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2))) <= dr;
			if (point2.x > point.x && point2.y > point.y && !er)
				er = Math.floor(Math.sqrt(Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2))) <= dr;
			if (point2.x < point.x && point2.y > point.y && !eb)
				eb = Math.floor(Math.sqrt(Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2))) <= dr;
			if (point2.x < point.x && point2.y == point.y && !el)
				el = Math.abs(point2.x - point.x) <= radius;
			if (point2.x > point.x && point2.y == point.y && !er)
				er = Math.abs(point2.x - point.x) <= radius;
			if (point2.x == point.x && point2.y < point.y && !et)
				et = Math.abs(point2.y - point.y) <= radius;
			if (point2.x == point.x && point2.y > point.y && !et)
				eb = Math.abs(point2.y - point.y) <= radius;
			if (el && er && et && eb)
				break;
		}
		if (el && er && et && eb) {
			this._points.splice(i, 1);
			i--;
		}
	}
	var hardradius = radius * (100 - hard) / 100;
	for (var x = sx; x <= sx + sw; x++) {
		for (var y = sy; y <= sy + sh; y++) {
			var cc = null;
			var otherin = false;
			//1. get arc center
			//2. determine if the point is in other arc
			for (var i = 0; i < this._points.length; i++) {
				var point = this._points[i];
				if (Math.abs(x - point.x) > radius || Math.abs(y - point.y) > radius)
					continue;
				var tr = Math.floor(Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)));
				if (tr > radius)
					continue;
				if (cc == null)
					cc = { x: point.x, y: point.y, r: tr };
				else {
					//otherin = true;
					var dl = Math.floor(Math.sqrt(Math.pow(cc.x - point.x, 2) + Math.pow(cc.y - point.y, 2)));
					if (cc.r > tr)
						cc = { x: point.x, y: point.y, r: tr };
					if (dl <= radius) {
					}
					else {
						var _ll = Math.floor(radius * Math.sin(Math.acos(dl / 2 / radius)));
						if (Math.floor(Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))) <_ll - hardradius)
							otherin = true;
					}
				}
			}
			if (!cc || otherin || radius * hard / 100 >= cc.r) continue;
			var alpha = (radius - cc.r) / hardradius;
			var ix = (y - sy) * sw + x - sx;
			data[ix * 4 + 3] = data[ix * 4 + 3] * alpha;
			//count++;
		}
	}
	imagedata.data = data;
	this._layer._2d.putImageData(imagedata, sx, sy);
});