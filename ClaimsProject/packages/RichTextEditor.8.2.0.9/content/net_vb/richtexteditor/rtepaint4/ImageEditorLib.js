function ImageEditor(clientid, customconfig) {
	this.clientid = clientid;
	this.container = document.getElementById(clientid);
	this.containersize = null; //,image,select,undo,redo,copy,cut,paste,crop,delete,save
	this.configuration = { "ImageUrl": "", "TempPath": "", "GraphicPath": "", "ImageEditorPath": "", "ToolBar": "save,undo,point,select,cut,paste,rect,pen,text,rotate,rotateleft90,fliph|image,redo,resize,crop,copy,delete,elli,line,zoomin,zoomout,rotateright90,flipv",
		"OverwriteFile": true, "PageType": "aspx", "FontFamilyList": "Arail,Verdana,Tahoma,Segoe UI,Sans Serif,Lucida Console",
	"SaveFileName": "", "SaveFileType": "png", "IsCleanTemp": "1"};
	this.configuration.Guid = S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
	this.configuration.ClientID = clientid;
	if (customconfig) {
		for (var cn in customconfig)
			this.configuration[cn] = customconfig[cn];
	}
	if (!this.configuration["SaveFileName"])
		this.configuration["SaveFileName"] = "Unnamed";

	this.clientpath = this.configuration["ImageEditorPath"];
	this.domframe = null;
	this.winframe = null;
	//register for menu image path
	menuimagebase = "images/";

	this.InitBrowser();
	this.IncludeCss();
	this.DrawControl();
	this.toolbarcontainer = document.getElementById(clientid + "_toolbar");
	this.framecontainer = document.getElementById(clientid + "_frame");
	this.settingcontainer = document.getElementById(clientid + "_setting");
	this.watermarkcontainer = document.getElementById(clientid + "_watermark");

	this.Text = imageeditor_lang;
	this.Init();
	this.FullScreen();

	var self = this;
	var oldresize = window.onresize;
	window.onresize = function () {
		if (oldresize)
			oldresize();
		self.FullScreen();
	}

	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
}

ImageEditor.prototype.Delegate = function (obj, method) {
	if (!method || !method.apply) throw (new Error("no method?" + this.Delegate.caller));
	function DelegateMethod() {
		try {
			return method.apply(obj, arguments);
		}
		catch (x) {
			throw (new Error(x.message + "\r\n at " + method));
		}
	}
	return DelegateMethod;
}

ImageEditor.prototype.Popup = function (msg, title) {
	alert(msg);
}

ImageEditor.prototype.MouseXY = function (e, tag) {
	var sx = 0;
	var sy = 0;
	if (tag) {
		sx = parseInt(tag.style.left);
		sy = parseInt(tag.style.top);
	}
	if (sx < 0) sx = 0;
	if (sy < 0) sy = 0;
	if (e.offsetX) {
		return { "x": e.offsetX + sx, "y": e.offsetY + sy };
	}
	return { "x": e.layerX + sx, "y": e.layerY + sy };
}

ImageEditor.prototype.MousePos = function (e) {
	var sx = 0;
	var sy = 0;
	if (sx < 0) sx = 0;
	if (sy < 0) sy = 0;
	if (/Firefox/.test(navigator.userAgent))
		return { "x": e.clientX, "y": e.clientY };
	return { "x": e.x, "y": e.y };
}

ImageEditor.prototype.AttachEvent = function (dom, name, func) {
	if (navigator.userAgent.indexOf("Firefox/1.") >= 0 || navigator.userAgent.indexOf("Firefox/2.") >= 0) {
		
	}
	if (document.addEventListener) {
		dom.addEventListener(name, func, true);
	}
	else {
		dom.attachEvent("on" + name, func);
	}
}
ImageEditor.prototype.CancelBubble = function (e) {
	e.cancelBubble = true;
	e.returnValue = false;
	if (e.stopPropagation) {
		e.stopPropagation();
		e.preventDefault();
	}
}
ImageEditor.prototype.FullScreen = function () {
	this.container.style.position = "absolute";
	this.container.style.left = "0px";
	this.container.style.top = "0px";
	//body offsetHeight
	var rh = document.documentElement.clientHeight;
	var rw = document.documentElement.clientWidth;
	if (!rh) rh = document.body.offsetHeight;
	if (!rw) rw = document.body.offsetWidth;
	if (rh < this.containersize.height)
		rh = this.containersize.height;
	if (rw < this.containersize.width)
		rw = this.containersize.width;
	if (this.Browser.ie5) {
		rw = rw - 15;
		rh = rh - 15;
	}
	this.container.style.height = rh + "px";
	this.container.style.width = rw + "px";
	this.container.style.zIndex = 1;
	this.isfullscreen = true;
	this.NotifyControlSize();
}

ImageEditor.prototype.NotifyControlSize = function () {
	//this.dynamicheightelements;
	var th = this.container.offsetHeight;
	var tw = this.container.offsetWidth;
	if (!this.containersize) {
		this.containersize = { "width": tw, "height": th };
	}
	else if (!this.isfullscreen) {
		tw = this.containersize.width;
		th = this.containersize.height;
	}
	var rh = th;
	for (var i = 0; i < this.dynamicheightelements.length; i++) {
		if (i == 0) {
			this.dynamicheightelements[i].style.height = rh + "px";
		}
		if (i > 1) {
			this.dynamicheightelements[i].style.height = rh - this.dynamicheightelements[1].offsetHeight + "px";
		}
		if (i >= 1 && this.Browser.firefox) {
			this.dynamicheightelements[i].style.width = tw - this.dynamicheightelements[0].offsetWidth + "px";
		}
	}
}

ImageEditor.prototype.IncludeCss = function () {
	var csslink = document.getElementById("rte_imageeditor_css");
	if (csslink == null || typeof (csslink) == "undefined") {
		csslink = document.createElement("link");
		csslink.setAttribute("id", "rte_imageeditor_css");
		csslink.setAttribute("href", "style.css");
		csslink.setAttribute("rel", "stylesheet");
		document.body.insertBefore(csslink, document.body.firstChild);
	}
}

ImageEditor.prototype.DrawControl = function () {
	var table = document.createElement("table");
	table.setAttribute("cellSpacing", "0");
	table.setAttribute("cellPadding", "0");

	//tr1 is for toolbar and frame
	var tr1 = table.insertRow(-1);
	var td11 = tr1.insertCell(-1);
	var td12 = tr1.insertCell(-1);
	td11.style.verticalAlign = "top";
	td11.style.background = "#fcfcfc url('images/back/toolbar.gif') bottom left repeat-x";
	//td11.style.height = parseInt(this.container.style.height) - 60 + "px";
	td11.id = this.clientid + "_toolbar";
	td11.setAttribute("rowspan", "2");
	if (this.Browser.ie)
		td11.rowSpan = "2";

	td12.style.width = "100%";
	td12.style.height = "32px";
	//td12.style.height = parseInt(this.container.style.height) - 60 + "px";
	td12.style.background = "url('images/back/menubar.gif') left bottom repeat-x";
	td12.style.padding = "0 0 0 5px";
	td12.style.overflow = "hidden";
	td12.style.verticalAlign = "top";

	//tr2 is for setting and watermark
	var tr2 = table.insertRow(-1);
	var td2 = tr2.insertCell(-1);
	td2.style.width = "100%";
	var div_setting = document.createElement("div");
	div_setting.id = this.clientid + "_setting";
	div_setting.className = "Setting";
	td12.appendChild(div_setting);

	var div_frame = document.createElement("iframe");
	div_frame.id = this.clientid + "_frame";
	div_frame.style.cssText = "margin:0px;padding:0px;scroll:auto; border:none; width:100%;"; //height:" + td12.style.height + ";
	//div_frame.className = "Frame";
	div_frame.setAttribute("frameborder", 0);
	div_frame.setAttribute("allowtransparency", "true");
	td2.appendChild(div_frame);

	this.dynamicheightelements = [td11, td12, td2, div_frame];

	this.container.appendChild(table);

	this.winframe = div_frame.contentWindow;
	if (div_frame.contentWindow && div_frame.contentWindow.document)
		this.domframe = div_frame.contentWindow.document;
	else if (div_frame.contentDocument)
		this.domframe = div_frame.contentDocument;
	else
		this.domframe = div_frame.document;

	this.domframe.onselectstart = function () { return false; }
	this.domframe.open();
	this.domframe.write("<html xmlns:v><head><style>v\\:*{behavior:url(#default#VML);}</style></head><body style='margin:0;padding:0;-moz-user-select:none; background:#cccccc;border:none;'><div id='layer_base' style='background:url(images/transback.gif); position:relative;'></div></body></html>");
	this.domframe.close();
	//Attribute : Image Editor Area
	this.domframe.imagearea = { "width": 0, "height": 0, "actualwidth": 0, "actualheight": 0 };
}

ImageEditor.prototype.Init = function () {
	this.toolbars = [];
	this.tooltips = { "new": this.Text["Title_New"], "save": this.Text["Title_Save"], "copy": this.Text["Title_Copy"], "line": this.Text["Title_Line"], "delete": this.Text["Title_Delete"],
		"undo": this.Text["Title_Undo"], "redo": this.Text["Title_Redo"], "cut": this.Text["Title_Cut"], "paste": this.Text["Title_Paste"], "crop": this.Text["Title_Crop"],
		"resize": this.Text["Title_Resize"], "zoomin": this.Text["Title_ZoomIn"], "zoomout": this.Text["Title_ZoomOut"],
		"rotate": this.Text["Title_Rotate"], "rotateleft90": this.Text["Title_Rotate90Left"], "rotateright90": this.Text["Title_Rotate90Right"],
		"fliph": this.Text["Title_FlipH"], "flipv": this.Text["Title_FlipV"], "point": this.Text["Title_Point"], "select": this.Text["Title_Select"], "text": this.Text["Title_Text"], "pen": this.Text["Title_Pen"],
		"rect": this.Text["Title_Rect"], "elli": this.Text["Title_Elli"], "image": this.Text["Title_AddImage"]
	};
	this.currenttoolbar = null;
	this.selectedaction = null;
	this.clipboard = null;
	this.basediv = this.domframe.getElementById("layer_base");
	this.settings = {};
	this.actions = [];
	this.totalactions = [];
	this.undoactions = [];
	this.redoactions = [];
	this.currentactionindex = -1;
	this.editstartposition = { "left": 0, "top": 0 };
	this.editendposition = { "left": 0, "top": 0 };
	this.editmoving = false;
	this.posmoving = false;
	this.movestartposition = { "left": 0, "top": 0 };
	this.isfullscreen = false;

	this.AttachEvent(this.basediv, "contextmenu", this.Delegate(this, function (e) {
		e = window.event || e;
		this.CancelBubble(e);
	}));

	//1. Init toolbar
	this.InitToolbar();
	setInterval(this.Delegate(this, function () { this.UpdatePartToolbarStatus(); }), 500);

	//2. Init setting
	//3. Init image container
	//4. Init watermark
	//5. Load default image
	if (this.configuration["ImageUrl"])
		this.ActionNewImage(this.configuration["ImageUrl"]);
	else
		this.ActionNewImage();
	//6. SetFrameDrawTool
	this.SetFrameDrawTool();

	this.NotifyControlSize();
}

ImageEditor.prototype.InitToolbar = function () {
	var toolstr = this.configuration["ToolBar"];
	var group = toolstr.split("|");
	if (group.length == 0)
		return;
	var table = document.createElement("table");
	table.className = "Toolbar";
	table.setAttribute("cellSpacing", "1");
	table.setAttribute("cellPadding", "0");

	var _w = 10;
	var tr = table.insertRow(-1);
	for (var i = 0; i < group.length; i++) {
		_w += 40;
		var td = tr.insertCell(-1);
		td.style.cssText = "width:30px; text-align:center; vertical-align:top; padding:0px 2px 0px 2px;";
		var btns = group[i].split(",");
		for (var j = 0; j < btns.length; j++) {
			var div = document.createElement("div");
			div.style.cssText = "width:22px; height:21px; text-align:center;margin:4px 0 4px 0; border-radius:2px;"; //margin:1px 0 0 0;";
			div.className = "Item";
			div.innerHTML = "<img src='images/" + btns[j] + ".gif' style=' border:0px;' alt='" + btns[j] + "' title='" + this.tooltips[btns[j]] + "'/>";
			div.action = btns[j];
			this.AttachToolbarEvent(div);
			td.appendChild(div);
			//push toolbar to array
			this.toolbars.push(div);
		}
	}

	this.toolbarcontainer.appendChild(table);

	var div = document.createElement("div");
	div.style.marginTop = "20px";
	div.style.paddingTop = "15px";
	div.style.borderTop = "1px solid gray";
	div.style.textAlign = "center";
	this.toolbarcontainer.appendChild(div);

	//select color
	var div_color = document.createElement("div");
	div_color.style.cssText = "width:20px; height:20px; border:1px solid gray; background-color:black; margin:auto;";
	div_color.setAttribute("title", this.Text["Title_FillColor"]);
	div.appendChild(div_color);

	//select line width
	var div_lwc = document.createElement("div");
	div_lwc.style.cssText = "height:30px;margin-top:15px;";
	div_lwc.setAttribute("title", this.Text["Title_LineWidth"]);
	div.appendChild(div_lwc);

	var div_linewidth = document.createElement("div");
	div_linewidth.style.cssText = "overflow: hidden;height:1px; width:40px;background-color:black; margin:auto;";
	div_lwc.appendChild(div_linewidth);

	var self = this;
	div_lwc.onclick = function (e) {
		var lineselector = self.SettingLineSelector(updateself);
		e = window.event || e;
		var mxy = self.MousePos(e);
		lineselector.style.display = "";
		lineselector.style.top = mxy.y + "px";
		lineselector.style.left = mxy.x + "px";
		function updateself() {
			div_linewidth.style.height = self.domframe.imagearea["linewidth"] + "px";
		}
	}

	div_color.onclick = function (e) {
		var colorpiker = self.SettingColorPicker(updateself);
		e = window.event || e;
		var mxy = self.MousePos(e);
		colorpiker.style.display = "";
		colorpiker.style.top = mxy.y + "px";
		colorpiker.style.left = mxy.x + "px";
		function updateself() {
			try {
				div_color.style.background = self.domframe.imagearea["color"];
			}
			catch (x) {
				var c = self.domframe.imagearea["color"].split("(")[1].split(",");
				div_color.style.background = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
				div_color.title = self.Text["Tool_ColorPicker_Opacity"] + " " + parseFloat(c[3]) * 100 + "%";
			}
		}
	}
}

ImageEditor.prototype.AttachToolbarEvent = function (bar) {
	bar.onclick = this.Delegate(this, function () {
		//expect action
		var baseimg = this.domframe.getElementById("img_base") || this.basediv.baseimage;
		if (bar.action != "new" && (baseimg == null || !baseimg || typeof (baseimg) == "undefined"))
			return;
		this.HideSetContainer();
		this.FullScreen();
		switch (bar.action) {
			case "new":
				this.ActionNewImageNoUrl();
				return;
			case "image":
				//var baseimg = this.domframe.getElementById("img_base") || this.basediv.baseimage;
				if (baseimg == null || !baseimg || typeof (baseimg) == "undefined") {
					this.Popup(this.Text["CreateFirst"]);
					return;
				}
				this.Draw2dAddImage();
				return;
			case "reload":
				document.location = document.location;
				return;
			case "redo":
				this.Redo();
				return;
			case "undo":
				this.Undo();
				return;
			case "rotateleft90":
				this.Draw2dRotate(90, "left");
				return;
			case "rotateright90":
				this.Draw2dRotate(90, "right");
				return;
			case "rotate":
				this.SettingRotateArg();
				return;
			case "fliph":
				this.Draw2dFlip("h");
				return;
			case "flipv":
				this.Draw2dFlip("v");
				return;
			case "zoomin":
				this.ZoomIn();
				return;
			case "zoomout":
				this.ZoomOut();
				return;
			case "resize":
				var sw = null; 
				var sh = null;
				if (!this.selectedaction) {
					sw = parseInt(this.basediv.style.width);
					sh = parseInt(this.basediv.style.height);
				}
				else {
					sw = parseInt(this.selectedaction.style.width);
					sh = parseInt(this.selectedaction.style.height);
				}
				this.SettingResize(this.Delegate(this, function () {
					this.Draw2dScale(this.domframe.imagearea["width"] / sw, this.domframe.imagearea["height"] / sh);
				}), sw, sh);
				return;
			case "delete":
				this.DeleteAction();
				return;
			case "copy":
				this.Copy();
				return;
			case "cut":
				this.Cut();
				return;
			case "crop":
				this.Draw2dCrop();
				return;
			case "save":
				//this.SettingSaveFileName();
				this.SaveFileSilently();
				return;
			case "rect":
			case "elli":
				this.SettingRectMode();
				break;
			case "paste":
				if (this.clipboard)
					this.Paste(null, { "x": 0, "y": 0 });
				return;
			default:
				break;
		}

		if (bar.action != "point" && bar.action != "select") {
			//var colorpicker = this.SettingColorPicker();
			if (bar.action == "text") {
				var fonttext = this.SettingFontText();
				fonttext.style.display = "";
			}
			else {
				//var lineselector = this.SettingLineSelector();
				//lineselector.style.display = "";
			}
			//colorpicker.style.display = "";
		}
		else {
			this.HideSetContainer();
		}

		this.FullScreen();

		if (this.currenttoolbar && this.currenttoolbar == bar)
			return;
		for (var i = 0; i < this.toolbars.length; i++) {
			this.toolbars[i].className = "Item";
		}
		bar.className = "Over";
		this.currenttoolbar = bar;
	});

	//	bar.onmouseover = this.Delegate(this, function () {
	//		bar.className = "Over";
	//	});

	//	bar.onmouseout = this.Delegate(this, function () {
	//		if (this.currenttoolbar && this.currenttoolbar == bar)
	//			return;
	//		bar.className = "Item";
	//	});
}

ImageEditor.prototype.IsDrawToolBar = function (bar) {
	if (!bar || !bar.action)
		return false;
	if (bar.action == "point")
		return false;
	return true;
}

//Set Draw Tool in Frame
ImageEditor.prototype.SetFrameDrawTool = function () {
	//Mouse Listener for domframe
	this.AttachEvent(this.domframe, "click", this.Delegate(this, function (e) {
		if (!this.Browser.firefox)
			CloseCurrentMenu();
		if (this.drawgrid) {
			this.drawgrid = null;
			return;
		}
		e = this.winframe.event || e;
		this.CancelBubble(e);
		if (this.layerclick) {
			this.layerclick = null;
			return;
		}
		if (this.selectedaction && !this.comefromselect) {
			this.selectedaction.style.border = "";
			this.selectedaction = null;
		}
		this.comefromselect = false;
		var mousebutton = "";
		if (!e.which)
			mousebutton = (e.button < 2) ? "LEFT" : ((e.button == 4) ? "MIDDLE" : "RIGHT");
		else
			mousebutton = (e.which < 2) ? "LEFT" : ((e.which == 2) ? "MIDDLE" : "RIGHT");
		if (this.Browser.firefoxdown && mousebutton != "LEFT")
			return;
		if (this.currenttoolbar && this.currenttoolbar.action == "paste") {
			this.Paste(e);
		}
	}));
	this.AttachEvent(this.domframe, "contextmenu", this.Delegate(this, function (e) {
		e = this.winframe.event || e;
		if (!this.Browser.firefoxdown)
			CloseCurrentMenu();
		this.CancelBubble(e);
	}));
	this.AttachEvent(this.basediv, "mousedown", this.Delegate(this, function (e) {
		if (this.Browser.firefoxdown)
			CloseCurrentMenu();
		if (this.editmoving)
			return;
		if (!this.currenttoolbar || !this.IsDrawToolBar(this.currenttoolbar))
			return;
		if (this.currenttoolbar.action == "paste") {
			return;
		}

		this.MouseBlurStart(e);
	}));
	this.AttachEvent(this.basediv, "mousemove", this.Delegate(this, function (e) {
		if (!this.editmoving)
			return;
		this.MouseBlurMove(e);
	}));
	var mouseupdom = this.Browser.webkit || this.Browser.opera || this.Browser.firefox;
	this.AttachEvent((mouseupdom == true ? this.domframe : this.basediv), "mouseup", this.Delegate(this, function (e) {
		if (!this.editmoving)
			return;
		e = this.winframe.event || e;
		this.CancelBubble(e);
		if (this.basediv.releaseCapture) {
			this.basediv.releaseCapture();
		} else if (this.winframe.captureEvents) {
			this.winframe.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
		}
		this.editmoving = false;
		var tempdiv = this.domframe.getElementById("temp_edit_div");
		if (!tempdiv || tempdiv == null || typeof (tempdiv) == "undefined")
			return;
		var exy = tempdiv.exy;
		if (tempdiv)
			this.domframe.body.removeChild(tempdiv);
		if (!exy || !exy.x || exy.x < 0 || exy.y < 0)
			return;
		//send ajax request  //copy temp div as new one
		var layerid = this.totalactions.length + 1;
		var newdiv = this.domframe.createElement("div");
		newdiv.id = "layer_" + layerid;
		newdiv.style.zIndex = layerid;
		newdiv.style.position = "absolute";
		newdiv.style.display = "block";
		var wv = exy.x - this.editstartposition["left"];
		var hv = exy.y - this.editstartposition["top"];
		if (wv < 0)
			newdiv.style.left = exy.x + "px";
		else
			newdiv.style.left = this.editstartposition["left"] + "px";
		if (hv < 0)
			newdiv.style.top = exy.y + "px";
		else
			newdiv.style.top = this.editstartposition["top"] + "px";
		var linewidth = 1;
		if (wv == 0 || hv == 0) {
			if (this.currenttoolbar.action != "line")
				return;
			if (wv <= linewidth) wv = linewidth;
			if (hv <= linewidth) hv = linewidth;
		}
		wv = Math.abs(wv);
		hv = Math.abs(hv);
		newdiv.style.width = wv + "px";
		newdiv.style.height = hv + "px";
		//newdiv.innerHTML = "NEW DIV";
		//push total actions, actions
		var newimg = this.domframe.createElement("img");
		newimg.id = "img_" + layerid;
		newdiv.appendChild(newimg);
		var action = { "target": newdiv, "action": "new" };
		this.domframe.body.appendChild(newdiv);
		this.actions.push(action);
		this.totalactions.push(action);
		this.undoactions.push(action);
		this.SetFrameSelectTool(newdiv);

		this.FireAction(layerid, exy);
	}));
}

//Set Select Div Tool In Frame
ImageEditor.prototype.SetFrameSelectTool = function (div) {
	div.onmouseover = this.Delegate(this, function (e) {
		if (this.editmoving)
			return;
		e = this.winframe.event || e;
		this.CancelBubble(e);
		if (this.selectedaction && this.selectedaction == div)
			return;
		//div.style.border = "1px solid red";
		this.NotifyMouseOver(div);
	});
	div.onmouseout = this.Delegate(this, function (e) {
		if (this.posmoving) {
			this.posmoving = false;
			if (this.selectedaction) this.selectedaction.style.cursor = "";
		}
		if (this.editmoving)
			return;
		e = this.winframe.event || e;
		this.CancelBubble(e);
		if (this.selectedaction && this.selectedaction == div)
			return;
		div.style.border = "";
	});
	this.AttachEvent(div, "click", this.Delegate(this, function (e) {
		if (this.currenttoolbar == null || this.currenttoolbar.action != "point")
			return;
		if (this.selectedaction) {
			this.selectedaction.style.border = "";
		}
		e = this.winframe.event || e;
		this.CancelBubble(e);
		this.selectedaction = div;
		div.style.border = "1px solid yellow";
		this.drawgrid = null;
	}));
	this.AttachEvent(div, "contextmenu", this.Delegate(this, function (e) {
		e = window.event || e;
		var exy = this.MouseXY(e);
		this.CancelBubble(e);
		if (!this.Browser.firefoxdown)
			this.CreateContextMenu(div, exy);
	}));
	this.AttachEvent(div, "mousedown", this.Delegate(this, function (e) {
		if (this.posmoving)
			return;
		if (!this.selectedaction || this.selectedaction != div) {
			if (this.editmoving)
				return;
			if (!this.currenttoolbar || !this.IsDrawToolBar(this.currenttoolbar))
				return;
			if (this.currenttoolbar.action == "paste") {
				return;
			}
			//enable basediv draw action
			this.MouseBlurStart(e, div);
			return;
		}
		this.posmoving = true;
		e = this.winframe.event || e;
		this.CancelBubble(e);
		//this.movestartposition["left"] = -9999;
		var exy = this.MouseXY(e);
		this.movestartposition["left"] = exy.x;
		this.movestartposition["top"] = exy.y;
		if (this.Browser.ie5)
			div.style.cursor = "hand";
		else
			div.style.cursor = "pointer";
	}));
	this.AttachEvent(div, "mousemove", this.Delegate(this, function (e) {
		if (!this.posmoving) {
			if (!this.editmoving)
				return;
			if (!this.currenttoolbar || !this.IsDrawToolBar(this.currenttoolbar))
				return;
			if (this.currenttoolbar.action == "paste") {
				return;
			}
			//enable basediv draw action
			this.MouseBlurMove(e, div);
			return;
		}
		if (!this.selectedaction || this.selectedaction != div)
			return;
		//calculate postion
		e = this.winframe.event || e;
		this.CancelBubble(e);
		var exy = this.MouseXY(e);
		var cl = parseInt(div.style.left);
		var ct = parseInt(div.style.top);
		var ml = exy.x - this.movestartposition["left"];
		var mt = exy.y - this.movestartposition["top"];
		div.style.left = cl + ml + "px";
		div.style.top = ct + mt + "px";
		this.movestartposition["left"] = exy.x - ml;
		this.movestartposition["top"] = exy.y - mt;
	}));
	this.AttachEvent(div, "mouseup", this.Delegate(this, function (e) {
		this.posmoving = false;
		e = window.event || e;
		this.CancelBubble(e);
		var mousebutton = "";
		if (!e.which)
			mousebutton = (e.button < 2) ? "LEFT" : ((e.button == 4) ? "MIDDLE" : "RIGHT");
		else
			mousebutton = (e.which < 2) ? "LEFT" : ((e.which == 2) ? "MIDDLE" : "RIGHT");
		//Firefox 1.5/2.0 click
		if (mousebutton == "LEFT" && this.Browser.firefox
		&& this.currenttoolbar && this.currenttoolbar.action == "point") {
			if (this.selectedaction) {
				this.selectedaction.style.border = "";
			}
			this.selectedaction = div;
			div.style.border = "1px solid yellow";
			this.drawgrid = null;
			this.layerclick = true;
		}
		if (mousebutton == "RIGHT" && this.Browser.firefox) {
			try {
				var exy = this.MouseXY(e);
				this.CreateContextMenu(div, exy);
			}
			catch (x) {
			}
		}
		if (this.selectedaction) this.selectedaction.style.cursor = "";
	}));
}

ImageEditor.prototype.MouseBlurStart = function (e, tag) {
	e = this.winframe.event || e;
	//TODO: calc if mouse is out of range
	var mousebutton = "";
	if (!e.which)
		mousebutton = (e.button < 2) ? "LEFT" : ((e.button == 4) ? "MIDDLE" : "RIGHT");
	else
		mousebutton = (e.which < 2) ? "LEFT" : ((e.which == 2) ? "MIDDLE" : "RIGHT");
	if (mousebutton != "LEFT")
		return;
	this.drawgrid = true;
	this.CancelBubble(e);
	if (this.basediv.setCapture) {
		this.basediv.setCapture();
	} else if (this.winframe.captureEvents) {
		this.winframe.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
	}
	this.editmoving = true;
	var exy = this.MouseXY(e, tag);
	this.editstartposition = { "left": exy.x, "top": exy.y };
	if (this.currenttoolbar.action == "pen") {
		this.Draw2dPenStart(exy.x, exy.y);
	}
}

ImageEditor.prototype.MouseBlurMove = function (e, tag) {
	e = this.winframe.event || e;
	if (!e || typeof (e) == "undefined")
		return;
	this.CancelBubble(e);
	if (this.basediv.setCapture) {
		this.basediv.setCapture();
	} else if (this.winframe.captureEvents) {
		this.winframe.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
	}
	//TODO: calc if mouse is out of range
	var tempdiv = this.domframe.getElementById("temp_edit_div");
	if (tempdiv == null) {
		tempdiv = this.domframe.createElement("div");
		tempdiv.id = "temp_edit_div";
		tempdiv.style.cssText = "border:1px dashed gray; position:absolute;z-index:9999;display:block;";
		this.domframe.body.appendChild(tempdiv);
	}
	var exy = this.MouseXY(e, tag);
	if (!exy || !exy.x || exy.x < 0 || exy.y < 0)
		return;
	if (!this.mouseposition)
		this.mouseposition = { "x": exy.x, "y": exy.y };
	else {
		if (Math.abs(this.mouseposition.x - exy.x) > 30 && Math.abs(this.mouseposition.y - exy.y) > 30)
			return;
		this.mouseposition = { "x": exy.x, "y": exy.y };
	}
	var canvaswidth = parseInt(this.basediv.style.width);
	var canvasheight = parseInt(this.basediv.style.height);
	if (exy.x > canvaswidth) return;// exy.x = canvasweight;
	if (exy.y > canvasheight) return; //exy.y = canvasheight;

	var wv = exy.x - this.editstartposition["left"];
	var hv = exy.y - this.editstartposition["top"];
	if (wv < 0)
		tempdiv.style.left = exy.x + "px";
	else
		tempdiv.style.left = this.editstartposition["left"] + "px";
	if (hv < 0)
		tempdiv.style.top = exy.y + "px";
	else
		tempdiv.style.top = this.editstartposition["top"] + "px";
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	tempdiv.style.width = wv + "px";
	tempdiv.style.height = hv + "px";
	tempdiv.exy = exy;
	if (this.currenttoolbar.action == "pen" && exy) {
		this.Draw2dPenMove(exy.x, exy.y);
	}
}

ImageEditor.prototype.CreateContextMenu = function (div, exy) {
	var menu = CreateMenu();
	menu.Add(1, this.Text["Context_Point"], "point", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
	}));
		menu.Add(1, this.Text["Context_ZoomIn"], "zoomin", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
		this.ZoomIn();
	}));
		menu.Add(1, this.Text["Context_ZoomOut"], "zoomout", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
		this.ZoomOut();
	}));
		menu.Add(1, this.Text["Context_RotateRight"], "rotateright90", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
		this.Draw2dRotate(90, "right");
	}));
		menu.Add(1, this.Text["Context_RotateLeft"], "rotateleft90", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
		this.Draw2dRotate(90, "left");
	}));
	menu.AddSpliter();
	var canmoveup = this.MoveActionCheck(div, 1);
	menu.Add(canmoveup, this.Text["Context_MoveUp"], null, this.Delegate(this, function () {
		this.MoveAction(div, 1);
	}));
	var canmovedown = this.MoveActionCheck(div, 0);
	menu.Add(canmovedown, this.Text["Context_MoveDown"], null, this.Delegate(this, function () {
		this.MoveAction(div, 0);
	}));
	menu.AddSpliter();
	menu.Add(1, this.Text["Context_Delete"], "delete", this.Delegate(this, function () {
		this.SelectSpecialLayer(div);
		this.DeleteAction();
	}));
	var scrollx = Math.max(this.domframe.documentElement.scrollLeft, this.domframe.body.scrollLeft);
	var scrolly = Math.max(this.domframe.documentElement.scrollTop, this.domframe.body.scrollTop);
	menu.Show(div, exy.x - scrollx, exy.y - scrolly);
	return false;
}

ImageEditor.prototype.ActionNewImageNoUrl = function () {
	this.SettingImageSize(this.Delegate(this, function () {
		//new image with url
		var img = this.domframe.createElement("img");
		img.onload = this.Delegate(this, function () {
			if (!this.domframe.imagearea["width"]) this.domframe.imagearea["width"] = img.width;
			if (!this.domframe.imagearea["height"]) this.domframe.imagearea["height"] = img.height;
			this.domframe.imagearea["actualwidth"] = img.width;
			this.domframe.imagearea["actualheight"] = img.height;
			if (img.width <= 0)
				return;
			this.basediv.style.top = "0px";
			this.basediv.style.left = "0px";
			this.basediv.style.width = this.domframe.imagearea["width"] + "px";
			this.basediv.style.height = this.domframe.imagearea["height"] + "px";
			this.basediv.innerHTML = "";
			img.setAttribute("id", "img_base");
			this.MakeNoBorder(img);
			this.basediv.appendChild(img);
			//this.Draw2dImage(img, 0, 0, this.domframe.imagearea["width"], this.domframe.imagearea["height"]);
			this.domframe.imagearea["width"] = null;
			this.domframe.imagearea["height"] = null;
			if (this.Browser.ie5 || this.Browser.ie6) {
				var strNewHTML = "<span style=\"width:" + img.width + "px; height:" + img.height + "px;display:inline-block;"
			 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.getAttribute("src") + "', sizingMethod='scale');\"></span>";
				//img.outerHTML = strNewHTML;
				img.parentNode.innerHTML = strNewHTML;
			}
			this.basediv.adjustrotatesize = false;
			this.basediv.adjustscalesize = false;
			this.basediv.baseimage = true;
		});
		//CombineParams
		var p_url = this.domframe.imagearea["imageurl"] || "";
		var p_width = this.domframe.imagearea["width"] || 0;
		var p_height = this.domframe.imagearea["height"] || 0;
		var p_color = this.domframe.imagearea["fillcolor"] || "";
		if (p_url) {
			p_width = 0;
			p_height = 0;
			p_color = "";
		}
		//var params = "layer_base,new,0,0," + p_width + "," + p_height + ",0,0,0,," + p_url + ",";
		//this.domframe.imagearea["imageurl"]

		var imgurl = this.CombineDrawUrl("base", "new", "0", "0", p_width, p_height, "0", "0", "0", "", p_url, "", p_color);
		if (this.Browser.ie5 || this.Browser.ie6) {
			var x = this.XMLHttpRequest();
			x.open("GET", imgurl, true);
			x.onreadystatechange = function () {
				if (x.readyState != 4) {
					return;
				}
				var responseText = x.responseText;
				if (!responseText)
					return;
				img.setAttribute("src", responseText + "?ts=" + new Date().getTime());
			}
			x.send(null);
		}
		else
			img.src = imgurl;
		this.domframe.imagearea["imageurl"] = null;
		this.ClearActions();
		return;
	}), null, null, true);
}

ImageEditor.prototype.ActionNewImage = function (url) {
	if (url) {
		var img = this.domframe.createElement("img");
		img.onload = this.Delegate(this, function () {
			this.domframe.imagearea["width"] = img.width;
			this.domframe.imagearea["height"] = img.height;
			this.domframe.imagearea["actualwidth"] = img.width;
			this.domframe.imagearea["actualheight"] = img.height;
			if (img.width <= 0)
				return;
			this.basediv.style.top = "0px";
			this.basediv.style.left = "0px";
			this.basediv.style.width = this.domframe.imagearea["width"] + "px";
			this.basediv.style.height = this.domframe.imagearea["height"] + "px";
			this.basediv.innerHTML = "";
			img.setAttribute("id", "img_base");
			this.MakeNoBorder(img);
			this.basediv.appendChild(img);
			this.domframe.imagearea["width"] = null;
			this.domframe.imagearea["height"] = null;
			if (this.Browser.ie5 || this.Browser.ie6) {
				var strNewHTML = "<span style=\"width:" + img.width + "px; height:" + img.height + "px;display:inline-block;"
			 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.getAttribute("src") + "', sizingMethod='scale');\"></span>";
				//img.outerHTML = strNewHTML;
				img.parentNode.innerHTML = strNewHTML;
			}
			this.basediv.adjustrotatesize = false;
			this.basediv.adjustscalesize = false;
			this.basediv.baseimage = true;
		});
		var imgurl = this.CombineDrawUrl("base", "new", "0", "0", "0", "0", "0", "0", "0", "", url, "");
		if (this.Browser.ie5 || this.Browser.ie6) {
			var x = this.XMLHttpRequest();
			x.open("GET", imgurl, true);
			x.onreadystatechange = function () {
				if (x.readyState != 4) {
					return;
				}
				var responseText = x.responseText;
				if (!responseText)
					return;
				img.setAttribute("src", responseText + "?ts=" + new Date().getTime());
			}
			x.send(null);
		}
		else
			img.src = imgurl;
		return;
	}
	//create empty image
	this.SettingImageSize(this.Delegate(this, function () {
		//new image with url
		var img = this.domframe.createElement("img");
		img.onload = this.Delegate(this, function () {
			if (!this.domframe.imagearea["width"]) this.domframe.imagearea["width"] = img.width;
			if (!this.domframe.imagearea["height"]) this.domframe.imagearea["height"] = img.height;
			this.domframe.imagearea["actualwidth"] = img.width;
			this.domframe.imagearea["actualheight"] = img.height;
			if (img.width <= 0)
				return;
			this.basediv.style.top = "0px";
			this.basediv.style.left = "0px";
			this.basediv.style.width = this.domframe.imagearea["width"] + "px";
			this.basediv.style.height = this.domframe.imagearea["height"] + "px";
			this.basediv.innerHTML = "";
			img.setAttribute("id", "img_base");
			this.MakeNoBorder(img);
			this.basediv.appendChild(img);
			//this.Draw2dImage(img, 0, 0, this.domframe.imagearea["width"], this.domframe.imagearea["height"]);
			this.domframe.imagearea["width"] = null;
			this.domframe.imagearea["height"] = null;
			if (this.Browser.ie5 || this.Browser.ie6) {
				var strNewHTML = "<span style=\"width:" + img.width + "px; height:" + img.height + "px;display:inline-block;"
			 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.getAttribute("src") + "', sizingMethod='scale');\"></span>";
				//img.outerHTML = strNewHTML;
				img.parentNode.innerHTML = strNewHTML;
			}
			this.basediv.adjustrotatesize = false;
			this.basediv.adjustscalesize = false;
			this.basediv.baseimage = true;
		});
		//CombineParams
		var p_url = this.domframe.imagearea["imageurl"] || "";
		var p_width = this.domframe.imagearea["width"] || 0;
		var p_height = this.domframe.imagearea["height"] || 0;
		//var params = "layer_base,new,0,0," + p_width + "," + p_height + ",0,0,0,," + p_url + ",";
		//this.domframe.imagearea["imageurl"]

		var imgurl = this.CombineDrawUrl("base", "new", "0", "0", p_width, p_height, "0", "0", "0", "", p_url, "");
		if (this.Browser.ie5 || this.Browser.ie6) {
			var x = this.XMLHttpRequest();
			x.open("GET", imgurl, true);
			x.onreadystatechange = function () {
				if (x.readyState != 4) {
					return;
				}
				var responseText = x.responseText;
				if (!responseText)
					return;
				img.setAttribute("src", responseText + "?ts=" + new Date().getTime());
			}
			x.send(null);
		}
		else
			img.src = imgurl;
		this.domframe.imagearea["imageurl"] = null;
		this.ClearActions();
		return;
	}));
}

ImageEditor.prototype.SelectSpecialLayer = function (div) {
	if (this.selectedaction) {
		this.selectedaction.style.border = "";
	}
	this.selectedaction = div;
	div.style.border = "1px solid yellow";
}

ImageEditor.prototype.MakeNoBorder = function (tag) {
	if (!tag)
		return;
	tag.style.border = "0px";
}

ImageEditor.prototype.SaveFileSilently = function () {
	var filename = this.configuration["SaveFileName"];
	var imgtype = this.configuration["SaveFileType"];
	var clientfunc = this.configuration["clientfunction"];
	var clientargs = this.configuration["clientargument"];
	this.SaveCanvasImage(filename, imgtype, clientfunc, clientargs);
}

ImageEditor.prototype.SettingSaveFileName = function () {
	if (!this.settings["SaveFileName"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_SaveFileName";

		var span_text = document.createElement("span");
		span_text.innerHTML = this.Text["Tool_Save_FileName"];
		div.appendChild(span_text);

		var ipt_filename = document.createElement("input");
		ipt_filename.setAttribute("type", "text");
		ipt_filename.className = "Input";
		div.appendChild(ipt_filename);

		var span_imgtype = document.createElement("span");
		span_imgtype.innerHTML = this.Text["Tool_Save_FileType"];
		span_imgtype.style.marginLeft = "10px";
		div.appendChild(span_imgtype);

		var select_imgtype = document.createElement("select");
		div.appendChild(select_imgtype);
		var imgtypes = ["png", "jpg", "gif", "bmp"];
		for (var i = 0; i < imgtypes.length; i++)
			select_imgtype.options[i] = new Option(imgtypes[i], imgtypes[i]);

		var btn_submit = document.createElement("button");
		btn_submit.className = "Button";
		btn_submit.innerHTML = this.Text["Btn_Save"];
		btn_submit.setAttribute("type", "button");
		div.appendChild(btn_submit);

		this.AttachEvent(btn_submit, "click", this.Delegate(this, function () {
			if (!ipt_filename.value) {
				this.Popup(this.Text["NeedFileName"]);
				return;
			}
			var filename = ipt_filename.value;
			if (!this.Browser.ie5)
				filename = ipt_filename.value.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
			if (filename == "") {
				this.Popup(this.Text["NeedFileName"]);
				return;
			}
			var imgtype = select_imgtype.value;
			var clientfunc = this.configuration["clientfunction"];
			var clientargs = this.configuration["clientargument"];
			this.SaveCanvasImage(filename, imgtype, clientfunc, clientargs);
			div.style.display = "none";
		}));

		div.FileNameControl = ipt_filename;
		div.FileTypeControl = select_imgtype;

		this.settings["SaveFileName"] = div;
		this.settingcontainer.appendChild(div);
	}
	var savefilename = this.settings["SaveFileName"];
	if (!savefilename.FileNameControl.value && this.configuration["SaveFileName"])
		savefilename.FileNameControl.value = this.configuration["SaveFileName"];
	if (savefilename.FileTypeControl.value == "png" && this.configuration["SaveFileType"])
		savefilename.FileTypeControl.value = this.configuration["SaveFileType"];
	this.UpdateSetContainerStatus(savefilename);
	return savefilename;
}

ImageEditor.prototype.SettingFontText = function () {
	if (!this.settings["FontText"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.style.verticalAlign = "top";
		div.id = this.clientid + "_SettingContainer_FontText";

		var span_text = document.createElement("span");
		span_text.innerHTML = this.Text["Tool_Text_Text"];
		span_text.style.verticalAlign = "top";
		div.appendChild(span_text);

		var ipt_text = document.createElement("textarea");
		//ipt_text.setAttribute("type", "text");
		ipt_text.className = "input_text";
		ipt_text.style.height = "56px";
		ipt_text.style.width = "210px";
		try {
			ipt_text.style.minHeight = "56px";
			ipt_text.style.minWidth = "210px";
			ipt_text.style.maxHeight = "56px";
			ipt_text.style.maxWidth = "210px";
		} catch (x) { }
		div.appendChild(ipt_text);

		var sizes = new Array(8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 36);
		var familys = this.configuration["FontFamilyList"].split(",");
		//new Array("Arail", "Tahoma", "Verdana", "Sans-Serif", "Lucida-Grande", "Times-New-Roman", "Helvetica");

		var span_family = document.createElement("span");
		span_family.innerHTML = this.Text["Tool_Text_Font"];
		span_family.style.marginLeft = "5px";
		span_family.style.verticalAlign = "top";
		div.appendChild(span_family);

		var select_family = document.createElement("select");
		select_family.style.verticalAlign = "top";
		div.appendChild(select_family);
		for (var i = 0; i < familys.length; i++) {
			select_family.options[i] = new Option(familys[i], familys[i]);
		}

		var span_size = document.createElement("span");
		span_size.innerHTML = this.Text["Tool_Text_Size"];
		span_size.style.marginLeft = "5px";
		span_size.style.verticalAlign = "top";
		div.appendChild(span_size);

		var select_size = document.createElement("select");
		select_size.style.verticalAlign = "top";
		div.appendChild(select_size);
		for (var i = 0; i < sizes.length; i++) {
			select_size.options[i] = new Option(sizes[i] + "px", sizes[i]);
		}
		select_size.value = "13";

		var span_bold = document.createElement("span");
		span_bold.innerHTML = this.Text["Tool_Text_Bold"];
		span_bold.style.marginLeft = "5px";
		span_bold.style.verticalAlign = "top";
		div.appendChild(span_bold);

		var select_bold = document.createElement("select");
		select_bold.style.verticalAlign = "top";
		div.appendChild(select_bold);
		select_bold.options[0] = new Option(this.Text["Select_Bool_False"], "");
		select_bold.options[1] = new Option(this.Text["Select_Bool_True"], "bold");

		var btn_submit = document.createElement("button");
		btn_submit.className = "Button";
		btn_submit.style.verticalAlign = "top";
		btn_submit.innerHTML = this.Text["Btn_Apply"];
		btn_submit.setAttribute("type", "button");
		div.appendChild(btn_submit);

		this.AttachEvent(btn_submit, "click", this.Delegate(this, function () {
			this.domframe.imagearea["FillText"] = ipt_text.value;
			this.domframe.imagearea["fontsize"] = select_size.value;
			this.domframe.imagearea["fontfamily"] = select_family.value;
			this.domframe.imagearea["fontweight"] = select_bold.value;

			//auto draw a layer
			this.Draw2dWriteTextAuto();
		}));

		this.settings["FontText"] = div;
		this.settingcontainer.appendChild(div);
	}
	var fonttext = this.settings["FontText"];
	this.UpdateSetContainerStatus(fonttext);
	//this.SettingLineSelectorBound();
	return fonttext;
}

ImageEditor.prototype.SettingLineSelector = function (func) {
	if (!this.settings["LineSelector"]) {
		var div = document.createElement("div");
		//div.className = "Tag";
		div.style.cssText = "position:absolute;z-index:2; width:270px; display:none; top:0px;left:0px; background:#dddddd; border:1px solid gray; padding:5px;";
		div.id = this.clientid + "_SettingContainer_LineSelector";

		var lines = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
		for (var i = 0; i < lines.length; i++) {
			var span = document.createElement("span");
			span.style.cssText = "border:2px solid white; float:left; display:block; height:" + lines[i] + "px; width:30px; margin:0px 5px 0px 5px; background-color:black;overflow: hidden;";
			span.title = lines[i] + "px";
			this.SettingLineSelectorEvent(span, func);
			div.appendChild(span);
		}

		this.settings["LineSelector"] = div;
		//this.settingcontainer.appendChild(div);
		document.body.appendChild(div);
	}
	var lineselector = this.settings["LineSelector"];
	//this.UpdateSetContainerStatus(lineselector);
	//this.SettingLineSelectorBound();
	return lineselector;
}
ImageEditor.prototype.SettingLineSelectorBound = function () {
	if (!this.settings["LineSelector"])
		return;
	var color = "black";
	//if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	var linewidth = 1;
	if (this.domframe.imagearea["linewidth"]) linewidth = this.domframe.imagearea["linewidth"];

	var spans = this.settings["LineSelector"].getElementsByTagName("span");
	for (var i = 0; i < spans.length; i++) {
		if (parseInt(spans[i].style.width) == linewidth)
			spans[i].style.border = "2px solid gold";
		else
			spans[i].style.border = "2px solid white";
		spans[i].style.backgroundColor = color;
	}
	//update line width selector
}
ImageEditor.prototype.SettingLineSelectorEvent = function (span, func) {
	span.onclick = this.Delegate(this, function () {
		span.parentNode.style.display = "none";
		this.domframe.imagearea["linewidth"] = parseInt(span.style.height);
		this.SettingLineSelectorBound();
		if (func)
			func();
	});
}

ImageEditor.prototype.SettingColorPicker = function (func) {
	if (!this.settings["ColorPicker"]) {
		var div = document.createElement("div");
		//div.className = "Tag";
		div.style.cssText = "position:absolute;z-index:2; width:220px; display:none; top:0px;left:0px; background:#000000; border:1px solid gray; padding:0px;";
		div.id = this.clientid + "_SettingContainer_ColorPicker";
		var div1 = document.createElement("div");
		div1.style.cssText = "background-color:#000000; margin:0 1px 0 1px;";
		div.appendChild(div1);

		var colors = new Array("0,0,0", "153,51,0", "51,51,0", "0,51,0"
				, "0,51,102", "0,0,128", "51,51,153", "51,51,51"
				, "128,0,0", "255,102,0", "128,128,0", "0,128,0"
				, "0,128,128", "0,0,255", "102,102,153", "128,128,128"
				, "255,0,0", "255,153,0", "153,204,0", "51,153,102"
				, "51,204,204", "51,102,255", "128,0,128", "153,153,153"
				, "255,0,255", "255,204,0", "255,255,0", "0,255,0"
				, "0,255,255", "0,204,255", "153,51,102", "192,192,192"
				, "255,153,204", "255,204,153", "255,255,153", "204,255,204"
				, "204,255,255", "153,204,255", "204,153,255", "255,255,255");
		var cells = [];

		var x = ['00', '33', '66', '99', 'CC', 'FF'];
		var y = ['000000', '333333', '666666', '999999', 'CCCCCC', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF'];
		i = 0;
		for (d = 0; d < 2; d++) {
			for (c = 0; c < 6; c++) {
				var span = document.createElement("span");
				span.setAttribute("bindval", ColorToRgba("#" + y[i]));
				span.setAttribute("bindcolor", "rgba(" + ColorToRgba("#" + y[i]) + ",1)");
				span.style.cssText = "float:left; margin:1px; display:block; width:10px; height:10px;cursor:hand;cursor:pointer;";
				span.style.margin = "1px 10px 0px 0px";
				this.SettingColorPickerEvent(span, func);
				span.style.backgroundColor = "#" + y[i];
				span.title = "#" + y[i];
				div1.appendChild(span);
				cells.push(span);
				i++;
				for (b = 0; b < 3; b++) {
					for (a = 0; a < 6; a++) {
						r = x[b + 3 * d] + x[a] + x[c];
						var span = document.createElement("span");
						span.setAttribute("bindval", ColorToRgba("#" + r));
						span.setAttribute("bindcolor", "rgba(" + ColorToRgba("#" + r) + ",1)");
						span.style.cssText = "float:left; margin:1px 0px 0px 1px; display:block; width:10px; height:10px;cursor:hand;cursor:pointer;";
						this.SettingColorPickerEvent(span, func);
						span.style.backgroundColor = "#" + r;
						span.title = "#" + r;
						div1.appendChild(span);
						cells.push(span);
					}
				}
			}
		}
		var divsp = document.createElement("div");
		divsp.style.cssText = "clear:both; height:1px; display:block;";
		
		div.appendChild(divsp);
		var div2 = document.createElement("div");
		div2.style.cssText = "padding:0 0 0 3px; height:26px; line-height:26px; margin-top:0px; background:#dddddd;";
		var span2 = document.createElement("span");
		span2.style.cssText = "border-width:0px; width:50px; overflow:hidden;";
		span2.innerHTML = this.Text["Tool_ColorPicker_Opacity"];
		var sel2 = document.createElement("select");
		for (var i = 10; i >= 1; i--) {
			var txt = (i * 10) + "%";
			var val = (i / 10) + "";
			sel2.options.add(new Option(txt, val));
		}
		sel2.onclick = function () {
			for (var i = 0; i < cells.length; i++) {
				var span = cells[i];
				var val = "rgba(" + span.getAttribute("bindval") + "," + sel2.value + ")";
				span.setAttribute("bindcolor", val);
			}
		}
		var span3 = document.createElement("input");
		span3.type = "button";
		span3.style.cssText = "background:#f3f3f3; border:solid #999999 1px; margin-left:2px; color:#333333;";
		span3.value = this.Text["Btn_Ok"];
		span3.onclick = function () {
			div.style.display = "none";

			var color = iptv.value;
			color = ColorToHex(color);
			color = "rgba(" + ColorToRgba(color) + "," + sel2.value + ")";
			self.domframe.imagearea["color"] = color;
			self.settings["ColorPicker"].style.display = "none";
			if (func)
				func();
		}

		var iptv = document.createElement("input");
		iptv.style.width = "50px"
		iptv.style.marginLeft = "2px";
		var self = this;
		iptv.onkeypress = function (e) {
			e = window.event || e;
			if (e.keyCode != 13)
				return;
			var color = iptv.value;
			color = ColorToHex(color);
			color = "rgba(" + ColorToRgba(color) + "," + sel2.value + ")";
			self.domframe.imagearea["color"] = color;
			self.settings["ColorPicker"].style.display = "none";
			if (func)
				func();
		}

		div2.appendChild(span2);
		div2.appendChild(sel2);
		div2.appendChild(iptv);
		div2.appendChild(span3);

		div.PreviewControl = iptv;
		div.ColorToRgba = ColorToRgba;
		div.ColorToHex = ColorToHex;

		div.appendChild(div2);
		this.settings["ColorPicker"] = div;
		//this.settingcontainer.appendChild(div);
		document.body.appendChild(div);
	}
	var colorpicker = this.settings["ColorPicker"];
	//this.UpdateSetContainerStatus(colorpicker);
	//this.SettingColorPickerBound();
	return colorpicker;

	function ColorToRgba(hex) {
		if (hex.indexOf("rgb(") == 0) {
			var arr = hex.split(",");
			if (arr.length != 3)
				return "0,0,0";
			return arr[0].split("(")[1] + "," + arr[1] + "," + arr[2].split(")")[0];
		}
		if (hex.substr(0, 1) != '#') {
			return hex;
		}
		if (hex.length != 7 && hex.length != 9)
			return "";
		var r = 0;
		var g = 0;
		var b = 0;
		var a = 1;
		if (hex.length == 7) {
			r = parseInt(hex.substr(1, 2), 16);
			g = parseInt(hex.substr(3, 2), 16);
			b = parseInt(hex.substr(5, 2), 16);
		}
		else {
			a = parseInt(hex.substr(1, 2), 16) / 255;
			r = parseInt(hex.substr(3, 2), 16);
			g = parseInt(hex.substr(5, 2), 16);
			b = parseInt(hex.substr(7, 2), 16);
		}
		stra = a + "";
		var stra = stra.length > 3 ? a.toFixed(2) : stra;
		return r + "," + g + "," + b;
	}

	function ColorToHex(color) {
		function padLeft(s, c, l) {
			var sl = s.length;
			if (sl >= l)
				return s;
			for (var i = 0; i < l - sl; i++)
				s = c + s;
			return s;
		}

		if (color.substr(0, 1) === '#') {
			return color;
		}
		if (color.indexOf(",") == -1) {
			//named color
			var namedHex = { "black": "#000000", "navy": "#000080", "darkblue": "#00008b", "mediumblue": "#0000cd", "blue": "#0000ff", "darkgreen": "#006400", "green": "#008000", "teal": "#008080", "darkcyan": "#008b8b", "deepskyblue": "#00bfff", "darkturquoise": "#00ced1", "mediumspringgreen": "#00fa9a", "lime": "#00ff00", "springgreen": "#00ff7f", "aqua": "#00ffff", "cyan": "#00ffff", "midnightblue": "#191970", "dodgerblue": "#1e90ff", "lightseagreen": "#20b2aa", "forestgreen": "#228b22", "seagreen": "#2e8b57", "darkslategray": "#2f4f4f", "darkslategrey": "#2f4f4f", "limegreen": "#32cd32", "mediumseagreen": "#3cb371", "turquoise": "#40e0d0", "royalblue": "#4169e1", "steelblue": "#4682b4", "darkslateblue": "#483d8b", "mediumturquoise": "#48d1cc", "indigo": "#4b0082", "darkolivegreen": "#556b2f", "cadetblue": "#5f9ea0", "cornflowerblue": "#6495ed", "mediumaquamarine": "#66cdaa", "dimgray": "#696969", "dimgrey": "#696969", "slateblue": "#6a5acd", "olivedrab": "#6b8e23", "slategray": "#708090", "slategrey": "#708090", "lightslategray": "#778899", "lightslategrey": "#778899", "mediumslateblue": "#7b68ee", "lawngreen": "#7cfc00", "chartreuse": "#7fff00", "aquamarine": "#7fffd4", "maroon": "#800000", "purple": "#800080", "olive": "#808000", "gray": "#808080", "grey": "#808080", "skyblue": "#87ceeb", "lightskyblue": "#87cefa", "blueviolet": "#8a2be2", "darkred": "#8b0000", "darkmagenta": "#8b008b", "saddlebrown": "#8b4513", "darkseagreen": "#8fbc8f", "lightgreen": "#90ee90", "mediumpurple": "#9370d8", "darkviolet": "#9400d3", "palegreen": "#98fb98", "darkorchid": "#9932cc", "yellowgreen": "#9acd32", "sienna": "#a0522d", "brown": "#a52a2a", "darkgray": "#a9a9a9", "darkgrey": "#a9a9a9", "lightblue": "#add8e6", "greenyellow": "#adff2f", "paleturquoise": "#afeeee", "lightsteelblue": "#b0c4de", "powderblue": "#b0e0e6", "firebrick": "#b22222", "darkgoldenrod": "#b8860b", "mediumorchid": "#ba55d3", "rosybrown": "#bc8f8f", "darkkhaki": "#bdb76b", "silver": "#c0c0c0", "mediumvioletred": "#c71585", "indianred": "#cd5c5c", "peru": "#cd853f", "chocolate": "#d2691e", "tan": "#d2b48c", "lightgray": "#d3d3d3", "lightgrey": "#d3d3d3", "palevioletred": "#d87093", "thistle": "#d8bfd8", "orchid": "#da70d6", "goldenrod": "#daa520", "crimson": "#dc143c", "gainsboro": "#dcdcdc", "plum": "#dda0dd", "burlywood": "#deb887", "lightcyan": "#e0ffff", "lavender": "#e6e6fa", "darksalmon": "#e9967a", "violet": "#ee82ee", "palegoldenrod": "#eee8aa", "lightcoral": "#f08080", "khaki": "#f0e68c", "aliceblue": "#f0f8ff", "honeydew": "#f0fff0", "azure": "#f0ffff", "sandybrown": "#f4a460", "wheat": "#f5deb3", "beige": "#f5f5dc", "whitesmoke": "#f5f5f5", "mintcream": "#f5fffa", "ghostwhite": "#f8f8ff", "salmon": "#fa8072", "antiquewhite": "#faebd7", "linen": "#faf0e6", "lightgoldenrodyellow": "#fafad2", "oldlace": "#fdf5e6", "red": "#ff0000", "fuchsia": "#ff00ff", "magenta": "#ff00ff", "deeppink": "#ff1493", "orangered": "#ff4500", "tomato": "#ff6347", "hotpink": "#ff69b4", "coral": "#ff7f50", "darkorange": "#ff8c00", "lightsalmon": "#ffa07a", "orange": "#ffa500", "lightpink": "#ffb6c1", "pink": "#ffc0cb", "gold": "#ffd700", "peachpuff": "#ffdab9", "navajowhite": "#ffdead", "moccasin": "#ffe4b5", "bisque": "#ffe4c4", "mistyrose": "#ffe4e1", "blanchedalmond": "#ffebcd", "papayawhip": "#ffefd5", "lavenderblush": "#fff0f5", "seashell": "#fff5ee", "cornsilk": "#fff8dc", "lemonchiffon": "#fffacd", "floralwhite": "#fffaf0", "snow": "#fffafa", "yellow": "#ffff00", "lightyellow": "#ffffe0", "ivory": "#fffff0", "white": "#ffffff" };
			var cv = namedHex[color.toLowerCase()];
			if (typeof (cv) == "undefined")
				cv = "#000000";
			return cv;
		}
		var digits = color.split(",");
		if (digits.length == 1)
			return color;
		var red = parseInt(digits[0].split("(")[1]);
		var green = parseInt(digits[1]);
		var blue = parseInt(digits[2]);

		var rgb = padLeft(red.toString(16), "0", 2) +
				padLeft(green.toString(16), "0", 2) + padLeft(blue.toString(16), "0", 2);
		return '#' + rgb.toUpperCase();
	}
}
ImageEditor.prototype.SettingColorPickerBound = function () {
	if (!this.domframe.imagearea["color"])
		return;
	var spans = this.settings["ColorPicker"].getElementsByTagName("span");
	var oval = this.settings["ColorPicker"].ColorToHex(this.domframe.imagearea["color"]);
	this.settings["ColorPicker"].PreviewControl.value = oval;
	this.settings["ColorPicker"].PreviewControl.oldval = oval;
}
ImageEditor.prototype.SettingColorPickerEvent = function (span, func) {
	span.onclick = this.Delegate(this, function () {
		span.parentNode.parentNode.style.display = "none";
		this.domframe.imagearea["color"] = span.getAttribute("bindcolor");
		this.SettingColorPickerBound();
		//this.SettingLineSelectorBound();
		if (func)
			func();
	});
	span.onmouseover = this.Delegate(this, function () {
		this.settings["ColorPicker"].PreviewControl.value = this.settings["ColorPicker"].ColorToHex(span.getAttribute("bindcolor"));
	});
	span.onmouseout = this.Delegate(this, function () {
		var oval = this.settings["ColorPicker"].PreviewControl.oldval || "";
		this.settings["ColorPicker"].PreviewControl.value = oval;
	});
}

ImageEditor.prototype.SettingRotateArg = function () {
	if (!this.settings["RotateArg"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_RotateArg";

		var img_rl = document.createElement("img");
		img_rl.src = "images/rotateleft90.gif";
		img_rl.style.margin = "0px 3px 0px 0px";
		img_rl.style.border = "solid transparent 1px";
		img_rl.style.verticalAlign = "top";
		img_rl.title = this.Text["Title_Rotate90Left"];
		div.appendChild(img_rl);
		img_rl.onmouseover = function () {
			this.style.borderColor = "gray";
			this.style.backgroundColor = "white";
		}
		img_rl.onmouseout = function () {
			this.style.borderColor = "transparent";
			this.style.backgroundColor = "";
		}

		var img_rr = document.createElement("img");
		img_rr.src = "images/rotateright90.gif";
		img_rr.style.margin = "0px 3px 0px 0px";
		img_rr.style.border = "solid transparent 1px";
		img_rr.style.verticalAlign = "top";
		img_rr.title = this.Text["Title_Rotate90Right"];
		div.appendChild(img_rr);
		img_rr.onmouseover = function () {
			this.style.borderColor = "gray";
			this.style.backgroundColor = "white";
		}
		img_rr.onmouseout = function () {
			this.style.borderColor = "transparent";
			this.style.backgroundColor = "";
		}

		var img_fh = document.createElement("img");
		img_fh.src = "images/fliph.gif";
		img_fh.style.margin = "0px 3px 0px 0px";
		img_fh.style.border = "solid transparent 1px";
		img_fh.style.verticalAlign = "top";
		img_fh.title = this.Text["Title_FlipH"];
		div.appendChild(img_fh);
		img_fh.onmouseover = function () {
			this.style.borderColor = "gray";
			this.style.backgroundColor = "white";
		}
		img_fh.onmouseout = function () {
			this.style.borderColor = "transparent";
			this.style.backgroundColor = "";
		}

		var img_fv = document.createElement("img");
		img_fv.src = "images/flipv.gif";
		img_fv.style.margin = "0px 3px 0px 0px";
		img_fv.style.border = "solid transparent 1px";
		img_fv.style.verticalAlign = "top";
		img_fv.title = this.Text["Title_FlipV"];
		div.appendChild(img_fv);
		img_fv.onmouseover = function () {
			this.style.borderColor = "gray";
			this.style.backgroundColor = "white";
		}
		img_fv.onmouseout = function () {
			this.style.borderColor = "transparent";
			this.style.backgroundColor = "";
		}

		var span_text = document.createElement("span");
		span_text.innerHTML = this.Text["Tool_Rotate_Degree"];
		span_text.style.marginLeft = "5px";
		div.appendChild(span_text);

		var ipt_degree = document.createElement("input");
		ipt_degree.setAttribute("type", "text");
		ipt_degree.className = "Input";
		ipt_degree.style.width = "60px";
		div.appendChild(ipt_degree);

		var select_direct = document.createElement("select");
		div.appendChild(select_direct);
		select_direct.options[0] = new Option(this.Text["Select_Rotate_CW"], "right");
		select_direct.options[1] = new Option(this.Text["Select_Rotate_ACW"], "left");

		var btn_submit = document.createElement("button");
		btn_submit.className = "Button";
		btn_submit.innerHTML = this.Text["Btn_Apply"];
		btn_submit.setAttribute("type", "button");
		div.appendChild(btn_submit);
		this.AttachEvent(btn_submit, "click", this.Delegate(this, function () {
			if (!this.ValidNumber(ipt_degree.value) || parseInt(ipt_degree.value) >= 360 || parseInt(ipt_degree.value) <= 0) {
				this.Popup(this.Text["DegreeValid"]);
				return;
			}
			var degree = parseInt(ipt_degree.value);
			var direct = select_direct.value;
			this.Draw2dRotate(degree, direct);
		}));
		this.AttachEvent(img_rl, "click", this.Delegate(this, function () {
			this.Draw2dRotate(90, "left");
		}));
		this.AttachEvent(img_rr, "click", this.Delegate(this, function () {
			this.Draw2dRotate(90, "right");
		}));
		this.AttachEvent(img_fh, "click", this.Delegate(this, function () {
			this.Draw2dFlip("h");
		}));
		this.AttachEvent(img_fv, "click", this.Delegate(this, function () {
			this.Draw2dFlip("v");
		}));

		this.settings["RotateArg"] = div;
		this.settingcontainer.appendChild(div);
	}
	var rotatearg = this.settings["RotateArg"];
	this.UpdateSetContainerStatus(rotatearg);
	//this.SettingLineSelectorBound();
	return rotatearg;
}

ImageEditor.prototype.SettingImageUrl = function () {
}

ImageEditor.prototype.SettingRectMode = function () {
	if (!this.settings["ImageRectMode"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_ImageRectMode";

		var span_mode = document.createElement("span");
		span_mode.innerHTML = this.Text["Tool_Draw_Mode"];
		div.appendChild(span_mode);

		var select_mode = document.createElement("select");
		div.appendChild(select_mode);
		select_mode.options[0] = new Option(this.Text["Select_Mode_Fill"], "fill");
		select_mode.options[1] = new Option(this.Text["Select_Mode_Stroke"], "stroke");

		select_mode.onclick = this.Delegate(this, function () {
			this.domframe.imagearea["rectmode"] = select_mode.value;
		});

		this.settings["ImageRectMode"] = div;
		this.settingcontainer.appendChild(div);
	}
	var imagesize = this.settings["ImageRectMode"];
	this.UpdateSetContainerStatus(imagesize);
}

ImageEditor.prototype.SettingAddImage = function (callback) {
	if (!this.settings["ImageAddPic"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_ImageAddPic";

		var span_url = document.createElement("span");
		span_url.innerHTML = this.Text["Tool_Load_Url"];
		div.appendChild(span_url);
		var input_url = document.createElement("input");
		input_url.className = "Input";
		input_url.style.width = "220px";
		div.appendChild(input_url);

		var btn_sumbit = document.createElement("button");
		btn_sumbit.style.marginLeft = "5px";
		btn_sumbit.setAttribute("type", "button");
		btn_sumbit.className = "Button";
		btn_sumbit.innerHTML = this.Text["Btn_Apply"];
		div.appendChild(btn_sumbit);

		var btn_cancle = document.createElement("button");
		btn_cancle.style.marginLeft = "5px";
		btn_cancle.setAttribute("type", "button");
		btn_cancle.className = "Button";
		btn_cancle.innerHTML = this.Text["Btn_Cancel"];
		div.appendChild(btn_cancle);

		div.UrlControl = input_url;

		div.SumbitControl = btn_sumbit;
		div.CancleControl = btn_cancle;

		this.settings["ImageAddPic"] = div;
		this.settingcontainer.appendChild(div);
	}

	var imagesize = this.settings["ImageAddPic"];
	imagesize.UrlControl.value = "";
	this.UpdateSetContainerStatus(imagesize);

	imagesize.SumbitControl.onclick = this.Delegate(this, function () {
		if (!imagesize.UrlControl.value) {
			this.Popup(this.Text["NeedUrl"]);
			return;
		}
		this.domframe.imagearea["imageurl"] = imagesize.UrlControl.value;
		imagesize.UrlControl.value = "";
		imagesize.style.display = "none";
		if (callback)
			callback();
	});
	imagesize.CancleControl.onclick = function () {
		imagesize.UrlControl.value = "";
		imagesize.style.display = "none";
	}
}

ImageEditor.prototype.SettingResize = function (callback, sw, sh) {
	if (!this.settings["ImageResize"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_ImageResize";

		var span_const = document.createElement("span");
		span_const.innerHTML = this.Text["Tool_Resize_Constrain"];
		div.appendChild(span_const);
		var cbx_const = document.createElement("input");
		cbx_const.type = "checkbox";
		cbx_const.style.verticalAlign = "middle";
		div.appendChild(cbx_const);

		var span_width = document.createElement("span");
		span_width.innerHTML = this.Text["Tool_Width"];
		span_width.style.marginLeft = "5px";
		div.appendChild(span_width);
		var input_width = document.createElement("input");
		input_width.className = "Input";
		input_width.style.width = "60px";
		div.appendChild(input_width);

		var span_height = document.createElement("span");
		span_height.innerHTML = this.Text["Tool_Height"];
		span_height.style.marginLeft = "5px";
		div.appendChild(span_height);
		var input_height = document.createElement("input");
		input_height.className = "Input";
		input_height.style.width = "60px";
		div.appendChild(input_height);

		var btn_sumbit = document.createElement("button");
		btn_sumbit.style.marginLeft = "5px";
		btn_sumbit.setAttribute("type", "button");
		btn_sumbit.className = "Button";
		btn_sumbit.innerHTML = this.Text["Btn_Apply"];
		div.appendChild(btn_sumbit);

		var btn_cancle = document.createElement("button");
		btn_cancle.style.marginLeft = "5px";
		btn_cancle.setAttribute("type", "button");
		btn_cancle.className = "Button";
		btn_cancle.innerHTML = this.Text["Btn_Cancel"];
		div.appendChild(btn_cancle);

		div.WidthControl = input_width;
		div.HeightControl = input_height;
		div.ConstControl = cbx_const;

		div.SumbitControl = btn_sumbit;
		div.CancleControl = btn_cancle;

		this.settings["ImageResize"] = div;
		this.settingcontainer.appendChild(div);
	}

	var imagesize = this.settings["ImageResize"];
	//var imageurl = this.SettingImageUrl();
	imagesize.WidthControl.value = "";
	imagesize.HeightControl.value = "";

	if (sw) imagesize.WidthControl.value = sw;
	if (sh) imagesize.HeightControl.value = sh;
	imagesize.WidthControl.oldval = sw;
	imagesize.HeightControl.oldval = sh;

	this.UpdateSetContainerStatus(imagesize);
	imagesize.WidthControl.onblur = this.Delegate(this, function () {
		if (!imagesize.ConstControl.checked)
			return;
		if (!this.ValidNumber(imagesize.WidthControl.value) || !sw)
			return;
		if (imagesize.WidthControl.value == imagesize.WidthControl.oldval)
			return;
		var cw = parseInt(imagesize.WidthControl.value);
		var ch = Math.ceil(cw * sh / sw);
		imagesize.WidthControl.oldval = cw;
		imagesize.HeightControl.value = ch;
		imagesize.HeightControl.oldval = ch;
	});
	imagesize.HeightControl.onblur = this.Delegate(this, function () {
		if (!imagesize.ConstControl.checked)
			return;
		if (!this.ValidNumber(imagesize.HeightControl.value) || !sh)
			return;
		if (imagesize.HeightControl.value == imagesize.HeightControl.oldval)
			return;
		var ch = parseInt(imagesize.HeightControl.value);
		var cw = Math.ceil(ch * sw / sh);
		imagesize.HeightControl.oldval = ch;
		imagesize.WidthControl.value = cw;
		imagesize.WidthControl.oldval = cw;
	});

	imagesize.SumbitControl.onclick = this.Delegate(this, function () {
		if (!this.ValidNumber(imagesize.WidthControl.value) || !this.ValidNumber(imagesize.HeightControl.value)) {
			this.Popup(this.Text["WidthValid"]);
			return;
		}
		this.domframe.imagearea["width"] = parseInt(imagesize.WidthControl.value);
		this.domframe.imagearea["height"] = parseInt(imagesize.HeightControl.value);
		imagesize.WidthControl.value = "";
		imagesize.HeightControl.value = "";
		imagesize.style.display = "none";
		if (callback)
			callback();
	});
	imagesize.CancleControl.onclick = function () {
		imagesize.WidthControl.value = "";
		imagesize.HeightControl.value = "";
		imagesize.style.display = "none";
	}
}

ImageEditor.prototype.SettingImageSize = function (callback, sw, sh, nourl) {
	if (!this.settings["ImageSize"]) {
		var div = document.createElement("div");
		div.className = "Tag";
		div.id = this.clientid + "_SettingContainer_ImageSize";

		var span_type = document.createElement("span");
		span_type.innerHTML = this.Text["Tool_New_Type"];
		//span_type.style.marginLeft = "5px";
		div.appendChild(span_type);
		var ddl_type = document.createElement("select");
		ddl_type.options.add(new Option(this.Text["Select_New_Canvas"], "canvas"));
		ddl_type.options.add(new Option(this.Text["Select_New_Url"], "url"));
		div.appendChild(ddl_type);

		var span_url = document.createElement("span");
		span_url.innerHTML = this.Text["Tool_Load_Url"];
		span_url.style.marginLeft = "5px";
		span_url.style.display = "none";
		div.appendChild(span_url);
		var input_url = document.createElement("input");
		input_url.className = "Input";
		input_url.style.width = "220px";
		input_url.style.display = "none";
		div.appendChild(input_url);

		var span_width = document.createElement("span");
		span_width.innerHTML = this.Text["Tool_Width"];
		span_width.style.marginLeft = "5px";
		div.appendChild(span_width);
		var input_width = document.createElement("input");
		input_width.className = "Input";
		input_width.style.width = "60px";
		div.appendChild(input_width);

		var span_height = document.createElement("span");
		span_height.innerHTML = this.Text["Tool_Height"];
		span_height.style.marginLeft = "5px";
		div.appendChild(span_height);
		var input_height = document.createElement("input");
		input_height.className = "Input";
		input_height.style.width = "60px";
		div.appendChild(input_height);

		var span_fillcolor = document.createElement("span");
		span_fillcolor.innerHTML = this.Text["Tool_New_FillColor"];
		span_fillcolor.style.marginLeft = "5px";
		div.appendChild(span_fillcolor);
		var ddl_fillcolor = document.createElement("select");
		ddl_fillcolor.options.add(new Option(this.Text["Select_Color_Transparent"], ""));
		ddl_fillcolor.options.add(new Option(this.Text["Select_Color_BackColor"], "fillcolor"));
		div.appendChild(ddl_fillcolor);

		var btn_sumbit = document.createElement("button");
		btn_sumbit.style.marginLeft = "5px";
		btn_sumbit.setAttribute("type", "button");
		btn_sumbit.className = "Button";
		btn_sumbit.innerHTML = this.Text["Btn_Apply"];
		div.appendChild(btn_sumbit);

		var btn_cancle = document.createElement("button");
		btn_cancle.style.marginLeft = "5px";
		btn_cancle.setAttribute("type", "button");
		btn_cancle.className = "Button";
		btn_cancle.innerHTML = this.Text["Btn_Cancel"];
		div.appendChild(btn_cancle);

		ddl_type.onclick = function () {
			if (ddl_type.value == "url") {
				span_width.style.display = "none";
				span_height.style.display = "none";
				span_fillcolor.style.display = "none";
				span_url.style.display = "";
				input_width.style.display = "none";
				input_height.style.display = "none";
				ddl_fillcolor.style.display = "none";
				input_url.style.display = "";
			}
			else {
				span_width.style.display = "";
				span_height.style.display = "";
				span_fillcolor.style.display = "";
				span_url.style.display = "none";
				input_width.style.display = "";
				input_height.style.display = "";
				ddl_fillcolor.style.display = "";
				input_url.style.display = "none";
			}
		}

		div.WidthControl = input_width;
		div.HeightControl = input_height;
		div.UrlControl = input_url;
		//div.FileNameControl = input_filename;
		div.TypeControl = ddl_type;
		div.FillColorControl = ddl_fillcolor;

		div.SumbitControl = btn_sumbit;
		div.CancleControl = btn_cancle;

		this.settings["ImageSize"] = div;
		this.settingcontainer.appendChild(div);
	}

	var imagesize = this.settings["ImageSize"];
	//var imageurl = this.SettingImageUrl();
	imagesize.WidthControl.value = "";
	imagesize.HeightControl.value = "";
	imagesize.UrlControl.value = "";
	imagesize.FillColorControl.value = "";

	if (sw) imagesize.WidthControl.value = sw;
	if (sh) imagesize.HeightControl.value = sh;

	this.UpdateSetContainerStatus(imagesize);
	//if (!sw) imageurl.style.display = "";
	//if (nourl) imageurl.style.display = "none";
	imagesize.SumbitControl.onclick = this.Delegate(this, function () {
		if (imagesize.TypeControl.value == "url" && !imagesize.UrlControl.value) {
			this.Popup(this.Text["NeedUrl"]);
			return;
		}
		//this.configuration["SaveFileName"] = imagesize.FileNameControl.value;
		var _addstr = "";
		//if (!sw) _addstr = ", " + this.Text["NeedUrlOr"];
		if (imagesize.UrlControl.value == "" &&
		(!this.ValidNumber(imagesize.WidthControl.value) || !this.ValidNumber(imagesize.HeightControl.value))) {
			this.Popup(this.Text["WidthValid"] + _addstr);
			return;
		}
		if (imagesize.TypeControl.value != "url") {
			this.domframe.imagearea["width"] = parseInt(imagesize.WidthControl.value);
			this.domframe.imagearea["height"] = parseInt(imagesize.HeightControl.value);
			this.domframe.imagearea["fillcolor"] = imagesize.FillColorControl.value ? (this.domframe.imagearea["color"] || "black") : "";
			this.domframe.imagearea["imageurl"] = null;
		}
		else {
			this.domframe.imagearea["width"] = null;
			this.domframe.imagearea["height"] = null;
			this.domframe.imagearea["fillcolor"] = null;
			this.domframe.imagearea["imageurl"] = imagesize.UrlControl.value;
		}
		imagesize.WidthControl.value = "";
		imagesize.HeightControl.value = "";
		imagesize.UrlControl.value = "";
		imagesize.style.display = "none";
		if (callback)
			callback();
	});
	imagesize.CancleControl.onclick = function () {
		imagesize.WidthControl.value = "";
		imagesize.HeightControl.value = "";
		imagesize.UrlControl.value = "";
		imagesize.style.display = "none";
	}
}

ImageEditor.prototype.HideSetContainer = function () {
	var arrsetnames = ["ImageSize", "ColorPicker", "LineSelector", "FontText", "ImageResize", "ImageAddPic","ImageRectMode", "RotateArg", "SaveFileName"];
	for (var i = 0; i < arrsetnames.length; i++) {
		if (this.settings[arrsetnames[i]])
			this.settings[arrsetnames[i]].style.display = "none";
	}
}

ImageEditor.prototype.UpdateSetContainerStatus = function (cur) {
	var arrsetnames = ["ImageSize", "ImageResize", "ImageAddPic","ImageRectMode", "ColorPicker", "LineSelector", "FontText", "RotateArg", "SaveFileName"];
	for (var i = 0; i < arrsetnames.length; i++) {
		if (this.settings[arrsetnames[i]] && this.settings[arrsetnames[i]].id != cur.id) {
			this.settings[arrsetnames[i]].style.display = "none";
		}
	}
	cur.style.display = "";
}

ImageEditor.prototype.UpdatePartToolbarStatus = function () {
	//this.toolbars
	//var ctlbars = ["undo", "redo", "copy", "cut", "paste", "crop", "delete"];
	for (var i = 0; i < this.toolbars.length; i++) {
		var bar = this.toolbars[i];
		var img = bar.childNodes[0];
		switch (bar.action) {
			case "undo":
				if (this.undoactions.length > 0)
					this.SetTagOpacity(img, "");
				else
					this.SetTagOpacity(img, 35);
				break;
			case "redo":
				if (this.redoactions.length == 0)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			case "copy":
			case "cut":
				if (!this.selectedaction || this.selectedaction.isselect)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			case "paste":
				if (!this.clipboard)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			case "crop":
				if (!this.selectedaction || !this.selectedaction.isselect)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			case "delete":
				if (!this.selectedaction)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			case "save":
				if (this.markissaving)
					this.SetTagOpacity(img, 35);
				else
					this.SetTagOpacity(img, "");
				break;
			default:
				break;
		}
	}
}

ImageEditor.prototype.SetTagOpacity = function (tag, v) {
	tag.style.filter = v ? "Alpha(opacity=" + v + ")" : "";
	tag.style.opacity = v ? (v / 100 + "") : "";
}

ImageEditor.prototype.FireAction = function (layerid, exy) {
	var linewidth = 1; //default is 1px then function will get it dynamicly
	var color = null;
	var actiontype = this.currenttoolbar.action;
	switch (actiontype) {
		case "text":
			this.Draw2dWriteText(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color);
			break;
		case "line":
			this.Draw2dLine(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color, linewidth);
			break;
		case "rect":
				if (!this.domframe.imagearea["rectmode"] || this.domframe.imagearea["rectmode"] == "fill")
					this.Draw2dFillRect(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color);
				else
					this.Draw2dStrokeRect(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color, linewidth);
				break;
		case "transrect":
			this.Draw2dStrokeRect(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color, linewidth);
			break;
		case "elli":
			if(!this.domframe.imagearea["rectmode"] || this.domframe.imagearea["rectmode"]=="fill")
				this.Draw2dFillEllipse(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color);
			else
				this.Draw2dStrokeEllipse(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color, linewidth);
			break;
		case "transelli":
			this.Draw2dStrokeEllipse(layerid, this.editstartposition["left"], this.editstartposition["top"], exy.x, exy.y, color, linewidth);
			break;
		case "select":
			this.selectedaction = this.domframe.getElementById("layer_" + layerid);
			for (var i = 0; i < this.toolbars.length; i++) {
				if (this.toolbars[i].action == "point") {
					this.currenttoolbar = this.toolbars[i];
					this.toolbars[i].className = "Over";
				}
				else
					this.toolbars[i].className = "Item";
			}
			this.selectedaction.isselect = true; //mark is select div
			this.selectedaction.style.border = "1px solid yellow";
			var img = this.domframe.getElementById("img_" + layerid);
			img.style.width = this.selectedaction.style.width;
			img.style.height = parseInt(this.selectedaction.style.height) + 32 + "px";
			img.style.marginTop = "-32px";
			img.style.border = "0px";
			if (!this.Browser.ie)
				img.style.display = "none";
			this.comefromselect = true;
			break;
		case "pen":
			this.Draw2dPenStop(layerid);
			break;
	}
}

ImageEditor.prototype.Draw2dPenStart = function (x, y) {
	this.domframe.imagearea["points"] = x + "_" + y;
	this.domframe.imagearea["pen_minx"] = x;
	this.domframe.imagearea["pen_miny"] = y;
	this.domframe.imagearea["pen_maxx"] = x;
	this.domframe.imagearea["pen_maxy"] = y;
}
ImageEditor.prototype.Draw2dPenMove = function (x, y) {
	var canvaswidth = parseInt(this.basediv.style.width);
	var canvasheight = parseInt(this.basediv.style.height);
	if (x > canvaswidth || y > canvasheight ||
		x < 0 || y < 0)
		return;

	this.domframe.imagearea["points"] += "|" + x + "_" + y;

	if (this.domframe.imagearea["pen_minx"] > x) this.domframe.imagearea["pen_minx"] = x;
	if (this.domframe.imagearea["pen_miny"] > y) this.domframe.imagearea["pen_miny"] = y;
	if (this.domframe.imagearea["pen_maxx"] < x) this.domframe.imagearea["pen_maxx"] = x;
	if (this.domframe.imagearea["pen_maxy"] < y) this.domframe.imagearea["pen_maxy"] = y;
}
ImageEditor.prototype.Draw2dPenStop = function (layerid) {
	var color = this.domframe.imagearea["color"];
	var linewidth = this.domframe.imagearea["linewidth"];
	if (!linewidth) linewidth = 1;
	var sx = this.domframe.imagearea["pen_minx"];
	var sy = this.domframe.imagearea["pen_miny"];
	if (sx < 0) sx = 0;
	if (sy < 0) sy = 0;
	var sw = this.domframe.imagearea["pen_maxx"] - this.domframe.imagearea["pen_minx"] + 2 * linewidth;
	var sh = this.domframe.imagearea["pen_maxy"] - this.domframe.imagearea["pen_miny"] + 2 * linewidth;
	var pendata = this.CombinePenUrl(layerid, this.domframe.imagearea["points"], sx, sy, sw, sh, color, linewidth);

	var curdiv = this.domframe.getElementById("layer_" + layerid);
	curdiv.style.left = sx - linewidth + "px";
	curdiv.style.top = sy - linewidth + "px";
	curdiv.style.width = sw  + "px";
	curdiv.style.height = sh + "px";
	this.LoadLayerImage(layerid, pendata.url, pendata.data);
}

ImageEditor.prototype.Draw2dCrop = function () {
	if (!this.selectedaction || !this.selectedaction.isselect)
		return;
	var curdiv = this.selectedaction;
	var sx = parseInt(curdiv.style.left);
	var sy = parseInt(curdiv.style.top);
	var destx = 0;
	var desty = 0;
	var destwidth = parseInt(curdiv.style.width);
	var destheight = parseInt(curdiv.style.height);
	var sw = destwidth;
	var sh = destheight;
	var layerid = "base";
	var imgurl = this.CombineDrawUrl(layerid, "crop", sx, sy, sw, sh, 0, 0, 0, "", "", "", "", 0);
	this.LoadLayerImage(layerid, imgurl);
	//remove this select type div
	this.DeleteAction();
}

ImageEditor.prototype.Draw2dScale = function (x, y) {
	//x,y is scale argument
	var curdiv = this.selectedaction;
	if (!this.selectedaction)
		curdiv = this.domframe.getElementById("layer_base");
	if (curdiv.canvascalculating)
		return;
	curdiv.canvascalculating = true;

	var layerid = curdiv.id.split("_")[1];

	//reset rotate args
	curdiv.adjustrotatesize = false;
	var oldwidth = parseInt(curdiv.style.width);
	var oldheight = parseInt(curdiv.style.height);
	var nowwidth = Math.floor(x * oldwidth);
	var nowheight = Math.floor(y * oldheight);
	if (nowwidth <= 10 || nowheight <= 10) {
		curdiv.canvascalculating = null;
		this.Popup(this.Text["MinWidthValid"]);
		return;
	}
	if (this.selectedaction && (nowwidth >= parseInt(this.basediv.style.width) - 1 || nowheight >= parseInt(this.basediv.style.height) - 1)) {
		curdiv.canvascalculating = null;
		return;
	}
	var imgurl = this.CombineDrawUrl(layerid, "resize", 0, 0, nowwidth, nowheight, 0, 0, 0, "", "", "", "", 0);
	this.LoadLayerImage(layerid, imgurl);
	curdiv.canvascalculating = null;
}

ImageEditor.prototype.Draw2dFlip = function (hORv) {
	if (this.selectedaction && this.selectedaction.isselect)
		return;
	if (!hORv) hORv = "h";
	var curdiv = this.selectedaction;
	if (!this.selectedaction)
		curdiv = this.domframe.getElementById("layer_base");
	if (curdiv.canvascalculating)
		return;
	curdiv.canvascalculating = true;
	var layerid = curdiv.id.split("_")[1];
	//clear rotate and scale mark
	curdiv.adjustrotatesize = false;
	curdiv.adjustscalesize = false;
	var fliptype = hORv == "h" ? "flipx" : "flipy";
	var imgurl = this.CombineDrawUrl(layerid, fliptype, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", 0);
	this.LoadLayerImage(layerid, imgurl);
	curdiv.canvascalculating = null;
}

ImageEditor.prototype.Draw2dRotate = function (degree, direction) {
	//Degree must between (0-360), and can not be equal with 0,360
	if (this.selectedaction && this.selectedaction.isselect)
		return;
	var curdiv = this.selectedaction;
	if (!this.selectedaction)
		curdiv = this.domframe.getElementById("layer_base");
	if (curdiv.canvascalculating)
		return;
	curdiv.canvascalculating = true;

	var layerid = curdiv.id.split("_")[1];
	//the rotate is right only, so translate it
	if (direction && direction == "left")
		degree = 360 - degree;
	curdiv.adjustscalesize = false;
	var padjrttsz = 1;
	var phinitrtt = 1;
	var oldwidth = parseInt(curdiv.style.width);
	var oldheight = parseInt(curdiv.style.height);
	if (!curdiv.adjustrotatesize) {
		padjrttsz = 0;
		if (!curdiv.hasinitrotate) {
			var rd = Math.sqrt(oldwidth * oldwidth + oldheight * oldheight);
			curdiv.radians = Math.ceil(rd);
			curdiv.hasinitrotate = true;
			phinitrtt = 0;
		}
		else
			curdiv.radians = oldwidth;
		curdiv.adjustrotatesize = true;
	}
	var linewidth = curdiv.linewidth ? curdiv.linewidth : 0;
	var imgurl = this.CombineDrawUrl(layerid, "rotate", 0, 0, curdiv.radians, curdiv.radians, 0, 0, degree, "", "", "", "", 0);
	if (degree == 90 || degree == 270) {
		imgurl = this.CombineDrawUrl(layerid, "rotate", 0, 0, oldheight, oldwidth, 0, 0, degree, "", "", "", "", 0);
		curdiv.hasinitrotate = false;
		phinitrtt = 0;
	}
	this.LoadLayerImage(layerid, imgurl);
	curdiv.canvascalculating = null;
}

ImageEditor.prototype.Draw2dWriteText = function (layerid, x, y, dx, dy, color) {
	var filltext = this.domframe.imagearea["FillText"];
	var curdiv = this.domframe.getElementById("layer_" + layerid);
	if (!filltext) {
		this.RemoveAction(curdiv);
		this.RemoveUndoAction(curdiv);
		this.domframe.body.removeChild(curdiv);
		return;
	}
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	var fontfamily = "Arial";
	var fontsize = 13;
	if (this.domframe.imagearea["fontfamily"]) fontfamily = this.domframe.imagearea["fontfamily"];
	if (this.domframe.imagearea["fontsize"]) fontsize = this.domframe.imagearea["fontsize"];
	if (!color) color = "";
	var wv = dx - x;
	var hv = dy - y;
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	var imgurl = this.CombineDrawUrl(layerid, "text", 0, 0, wv, hv, 0, 0, 0, filltext, fontfamily + ";" + fontsize, "", color, 0);
	this.LoadLayerImage(layerid, imgurl);

	this.SetPointBarSelect();
	this.AutoSelect(curdiv);
}

ImageEditor.prototype.Draw2dWriteTextAuto = function () {
	var filltext = this.domframe.imagearea["FillText"];
	if (!filltext) {
		this.Popup(this.Text["NeedText"]);
		return;
	}
	var layerid = this.totalactions.length + 1;
	var newdiv = this.domframe.createElement("div");
	newdiv.id = "layer_" + layerid;
	newdiv.style.zIndex = layerid;
	newdiv.style.position = "absolute";
	newdiv.style.display = "block";
	newdiv.style.left = "0px";
	newdiv.style.top = "0px";
	newdiv.style.width = "0px";
	newdiv.style.height = "0px";
	this.domframe.body.appendChild(newdiv);
	//push total actions, actions
	var newimg = this.domframe.createElement("img");
	newimg.id = "img_" + layerid;
	newdiv.appendChild(newimg);

	var color = "";
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	var fontfamily = "Arial";
	var fontsize = 9;
	var fontweight = "";
	if (this.domframe.imagearea["fontfamily"]) fontfamily = this.domframe.imagearea["fontfamily"];
	if (this.domframe.imagearea["fontsize"]) fontsize = this.domframe.imagearea["fontsize"];
	if (this.domframe.imagearea["fontweight"]) fontweight = this.domframe.imagearea["fontweight"];
	if (!color) color = "";
	var wv = parseInt(this.basediv.style.width);
	var hv = 20;
	var imgurl = this.CombineDrawUrl(layerid, "text", 0, 0, wv, hv, 0, 0, 0, filltext, fontfamily + ";" + fontsize+";" + fontweight, "", color, 0);
	this.LoadLayerImage(layerid, imgurl);

	var action = { "target": newdiv, "action": "new" };
	this.actions.push(action);
	this.totalactions.push(action);
	this.undoactions.push(action);
	this.SetFrameSelectTool(newdiv);

	this.SetPointBarSelect();
	this.AutoSelect(newdiv);
}

ImageEditor.prototype.Draw2dFillEllipse = function (layerid, x, y, dx, dy, color) {
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	if (!color) color = "";
	var wv = dx - x;
	var hv = dy - y;
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	var imgurl = this.CombineDrawUrl(layerid, "fillelli", 0, 0, wv, hv, 0, 0, 0, "", "", "", color, 0);
	this.LoadLayerImage(layerid, imgurl);
}

ImageEditor.prototype.Draw2dStrokeEllipse = function (layerid, x, y, dx, dy, color, linewidth) {
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	if (this.domframe.imagearea["linewidth"]) linewidth = this.domframe.imagearea["linewidth"];
	if (!color) color = "";
	if (!linewidth) linewidth = 1;
	var wv = dx - x;
	var hv = dy - y;
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	var imgurl = this.CombineDrawUrl(layerid, "elli", 0, 0, wv, hv, 0, 0, 0, "", "", "", color, linewidth);
	this.LoadLayerImage(layerid, imgurl);
}

ImageEditor.prototype.Draw2dFillRect = function (layerid, x, y, dx, dy, color) {
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	if (!color) color = "";
	var wv = dx - x;
	var hv = dy - y;
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	var imgurl = this.CombineDrawUrl(layerid, "fillrect", 0, 0, wv, hv, 0, 0, 0, "", "", "", color, 0);
	this.LoadLayerImage(layerid, imgurl);
}

ImageEditor.prototype.Draw2dStrokeRect = function (layerid, x, y, dx, dy, color,linewidth) {
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	if (this.domframe.imagearea["linewidth"]) linewidth = this.domframe.imagearea["linewidth"];
	if (!color) color = "";
	if (!linewidth) linewidth = 1;
	var wv = dx - x;
	var hv = dy - y;
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	var imgurl = this.CombineDrawUrl(layerid, "rect", 0, 0, wv, hv, 0, 0, 0, "", "", "", color, linewidth);
	this.LoadLayerImage(layerid, imgurl);
}

ImageEditor.prototype.Draw2dLine = function (layerid, x, y, dx, dy, color, linewidth) {
	if (this.domframe.imagearea["color"]) color = this.domframe.imagearea["color"];
	if (this.domframe.imagearea["linewidth"]) linewidth = this.domframe.imagearea["linewidth"];
	if (!color) color = "";
	if (!linewidth) linewidth = 1;
	var wv = dx - x;
	var hv = dy - y;
	var sx = 0;
	var sy = 0;
	var tx = wv;
	var ty = hv;
	if (wv < 0) {
		sx = Math.abs(wv);
		tx = 0;
	}
	if (hv < 0) {
		sy = Math.abs(hv);
		ty = 0;
	}
	wv = Math.abs(wv);
	hv = Math.abs(hv);
	if (wv <= linewidth) wv = linewidth;
	if (hv <= linewidth) hv = linewidth;
	var imgurl = this.CombineDrawUrl(layerid, "line", sx, sy, wv, hv, tx, ty, 0, "", "", "", color, linewidth);
	this.LoadLayerImage(layerid, imgurl);
}

ImageEditor.prototype.Draw2dAddImage = function () {
	this.SettingAddImage(this.Delegate(this, function () {
		if (!this.domframe.imagearea["imageurl"]) {
			this.Popup(this.Text["NeedUrl"]);
			return;
		}

		var layerid = this.totalactions.length + 1;
		var newdiv = this.domframe.createElement("div");
		newdiv.id = "layer_" + layerid;
		newdiv.style.zIndex = layerid;
		newdiv.style.position = "absolute";
		newdiv.style.display = "block";
		newdiv.style.left = "0px";
		newdiv.style.top = "0px";
		//push total actions, actions
		var newimg = this.domframe.createElement("img");
		newimg.id = "img_" + layerid;
		newdiv.appendChild(newimg);
		var action = { "target": newdiv, "action": "new" };
		this.domframe.body.appendChild(newdiv);
		this.actions.push(action);
		this.totalactions.push(action);
		this.undoactions.push(action);
		this.SetFrameSelectTool(newdiv);

		var sw = 0;
		var sh = 0;
		//if (this.domframe.imagearea["width"]) sw = this.domframe.imagearea["width"];
		//if (this.domframe.imagearea["height"]) sh = this.domframe.imagearea["height"];
		var imgurl = this.CombineDrawUrl(layerid, "img", 0, 0, sw, sh, 0, 0, 0, "", this.domframe.imagearea["imageurl"], "", "", 0);
		this.LoadLayerImage(layerid, imgurl);
		this.domframe.imagearea["imageurl"] = null;
	}));
}

ImageEditor.prototype.CombineDrawUrl = function (layerid, actionname, sx, sy, sw, sh, tx, ty, angle, txt, imgurl, copyid, color, linewidth) {
	if (!color) color = "";
	else color = color.replace(/,/g, "_");
	if (!linewidth) linewidth = 0;
	var layer = this.domframe.getElementById("layer_" + layerid);
	layer.linewidth = linewidth;
	var params = this.configuration["Guid"] + "," + this.configuration["ImageID"] + "," + layerid + ",";
	params += actionname + "," + sx + "," + sy + "," + sw + "," + sh + "," + tx + "," + ty + "," + angle + "," + txt + "," + imgurl + "," + copyid;
	params += "," + color + "," + linewidth;
	//actiontype : new,rect,fillrect,elli,fillelli,line,pen,text,img,zoomin,zoomout,resize,rotate,flipx,flipy,paste,crop
	return this.configuration["RTEPath"]+ "DrawImage.html4." + this.configuration["PageType"] + "?p=" + encodeURIComponent(params) + "&t=" + new Date().getTime();
}

ImageEditor.prototype.CombinePenUrl = function (layerid, points, sx, sy, sw, sh, color, linewidth) {
	if (!color) color = "";
	else color = color.replace(/,/g, "_");
	if (!linewidth) linewidth = 0;
	var pendata = {};
	pendata.url = this.configuration["RTEPath"] + "DrawImage.html4." + this.configuration["PageType"];
	var params = this.configuration["Guid"] + "," + this.configuration["ImageID"] + "," + layerid + ",";
	params += "pen," + sx + "," + sy + "," + sw + "," + sh + ",0,0,0," + points + ",,";
	params += "," + color + "," + linewidth;
	pendata.data = "p=" + encodeURIComponent(params) + "&t=" + new Date().getTime();
	return pendata;
}

ImageEditor.prototype.LoadLayerImage = function (layerid, imgurl, pendata) {
	var layer = this.domframe.getElementById("layer_" + layerid);
	var img = this.domframe.getElementById("img_" + layerid);
	if (img == null || typeof (img) == "undefined") {
		img = this.domframe.createElement("img");
		img.setAttribute("id", "img_" + layerid);
		layer.innerHTML = "";
		layer.appendChild(img);
	}
	var ol = parseInt(layer.style.left);
	var ot = parseInt(layer.style.top);
	var ow = parseInt(layer.style.width);
	var oh = parseInt(layer.style.height);
	img.removeAttribute("width");
	img.removeAttribute("height");
	this.AttachEvent(img, "load", this.Delegate(this, function (e) {
		var rw = img.width;
		var rh = img.height;
		this.MakeNoBorder(img);
		var dx = (rw - ow) / 2;
		var dy = (rh - oh) / 2;
		var rl = 0;
		var rt = 0;
		if (dx > 0)
			rl = ol - Math.floor(dx);
		else
			rl = ol + Math.floor(Math.abs(dx));
		if (dy > 0)
			rt = ot - Math.floor(dy);
		else
			rt = ot + Math.floor(Math.abs(dy));
		if (rt < 0) rt = 0;
		if (rl < 0) rl = 0;
		if (layerid == "base") {
			layer.style.left = "0px";
			layer.style.top = "0px";
		}
		else {
			layer.style.left = rl + "px";
			layer.style.top = rt + "px";
		}
		layer.style.width = rw + "px";
		layer.style.height = rh + "px";
		if (this.Browser.ie5 || this.Browser.ie6) {
			var strNewHTML = "<span style=\"width:" + img.width + "px; height:" + img.height + "px;display:inline-block;"
			 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.getAttribute("src") + "', sizingMethod='scale');\"></span>";
			//img.outerHTML = strNewHTML;
			img.parentNode.innerHTML = strNewHTML;
		}
	}));
	if (pendata) {
		var x = this.XMLHttpRequest();
		x.open("POST", imgurl, true);
		x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
		x.onreadystatechange = function () {
			if (x.readyState != 4) {
				return;
			}
			var responseText = x.responseText;
			if (!responseText)
				return;
			img.setAttribute("src", responseText + "?ts=" + new Date().getTime());
		}
		x.send(pendata);
	}
	else if (this.Browser.ie5 || this.Browser.ie6) {
		var x = this.XMLHttpRequest();
		x.open("GET", imgurl, true);
		x.onreadystatechange = function () {
			if (x.readyState != 4) {
				return;
			}
			var responseText = x.responseText;
			if (!responseText)
				return;
			img.setAttribute("src", responseText + "?ts=" + new Date().getTime());
		}
		x.send("");
	}
	else {
		img.setAttribute("src", imgurl);
	}
}

ImageEditor.prototype.ZoomOut = function () {
	this.Draw2dScale(0.8, 0.8);
}

ImageEditor.prototype.ZoomIn = function () {
	this.Draw2dScale(1.25, 1.25);
}

ImageEditor.prototype.Undo = function () {
	if (this.markisundo) return;
	if (this.undoactions.length == 0) {
		this.markisundo = null;
		return;
	}
	this.markisundo = true;

	var action = this.undoactions[this.undoactions.length - 1];
	this.undoactions.splice(this.undoactions.length - 1, 1);
	this.redoactions.push(action);
	if (action.action == "delete") {
		action.target.style.display = "";
		//re-push action into actions array
		if (this.actions.length == 0) {
			this.actions.push(action);
			this.markisundo = null;
			return;
		}
		var _isfound = false;
		for (var i = 0; i < this.actions.length; i++) {
			if (this.actions[i].target.style.zIndex < action.target.style.zIndex)
				continue;
			this.actions.splice(i, 0, action);
			_isfound = true;
			break;
		}
		if (!_isfound) this.actions.push(action);
		this.markisundo = null;
	}
	else {
		action.target.style.display = "none";
		//remove action from actions array
		this.RemoveAction(action.target);
		this.markisundo = null;
	}
	this.Unselect();
}
ImageEditor.prototype.Redo = function () {
	if (this.markisundo) return;
	if (this.redoactions.length == 0) {
		this.markisundo = null;
		return;
	}
	this.markisundo = true;
	var action = this.redoactions[this.redoactions.length - 1];
	this.redoactions.splice(this.redoactions.length - 1, 1);
	this.undoactions.push(action);
	if (action.action != "delete") {
		action.target.style.display = "";
		//re-push action into actions array
		if (this.actions.length == 0) {
			this.actions.push(action);
			this.markisundo = null;
			return;
		}
		var _isfound = false;
		for (var i = 0; i < this.actions.length; i++) {
			if (this.actions[i].target.style.zIndex < action.target.style.zIndex)
				continue;
			this.actions.splice(i, 0, action);
			_isfound = true;
			break;
		}
		if (!_isfound) this.actions.push(action);
		this.markisundo = null;
	}
	else {
		action.target.style.display = "none";
		//remove action from actions array
		this.RemoveAction(action.target);
		this.markisundo = null;
	}
	this.Unselect();
}

ImageEditor.prototype.Copy = function () {
	if (!this.selectedaction || this.selectedaction.isselect)
		return;
	this.clipboard = this.selectedaction;
	//NOTE: Clear ClipBoard after paste
}

ImageEditor.prototype.Cut = function () {
	if (!this.selectedaction || this.selectedaction.isselect)
		return;
	this.clipboard = this.selectedaction;
	this.DeleteAction();
	//NOTE: Clear ClipBoard after paste
}

ImageEditor.prototype.Paste = function (e, pos) {
	if (!this.clipboard)
		return;
	var exy = pos;
	if (!pos) {
		e = window.event || e;
		exy = this.MouseXY(e);
	}
	var layerid = this.totalactions.length + 1;
	var newdiv = this.domframe.createElement("div");
	newdiv.id = "layer_" + layerid;
	newdiv.style.zIndex = layerid;
	newdiv.style.position = "absolute";
	newdiv.style.display = "block";
	newdiv.style.left = exy.x + "px";
	newdiv.style.top = exy.y + "px";
	//push total actions, actions
	var newimg = this.domframe.createElement("img");
	newimg.id = "img_" + layerid;
	//this.MakeTransparentBgcolor(layerid);
	newdiv.appendChild(newimg);
	var action = { "target": newdiv, "action": "new" };
	this.domframe.body.appendChild(newdiv);
	this.actions.push(action);
	this.totalactions.push(action);
	this.undoactions.push(action);
	this.SetFrameSelectTool(newdiv);
	var sw = parseInt(this.clipboard.style.width);
	var sh = parseInt(this.clipboard.style.height);
	newdiv.style.width = sw + "px";
	newdiv.style.height = sh + "px";
	var imgurl = this.CombineDrawUrl(layerid, "copy", 0, 0, sw, sh, 0, 0, 0, "", "", this.clipboard.id.split("_")[1], "", 0);
	this.LoadLayerImage(layerid, imgurl);

	this.clipboard = null;
	this.AutoSelect(newdiv);
}

ImageEditor.prototype.AutoSelect = function (div) {
	if (this.selectedaction) {
		this.selectedaction.style.border = "";
	}
	this.selectedaction = div;
	this.selectedaction.style.border = "1px solid yellow";
}

ImageEditor.prototype.NotifyMouseOver = function (tag) {
	for (var i = 0; i < this.actions.length; i++) {
		if (tag.id && tag.id == this.actions[i].target.id) {
			tag.style.border = "1px solid red";
		}
		else
			this.actions[i].target.style.border = "";
	}
	if (this.selectedaction)
		this.selectedaction.style.border = "1px solid yellow";
}

ImageEditor.prototype.SetPointBarSelect = function () {
	for (var i = 0; i < this.toolbars.length; i++) {
		if (this.toolbars[i].action == "point") {
			this.currenttoolbar = this.toolbars[i];
			this.toolbars[i].className = "Over";
		}
		else
			this.toolbars[i].className = "Item";
	}
}

ImageEditor.prototype.OrganizeImage = function () {
	this.organizingcount = this.actions.length;
	this.organizingfinish = 0;
	var layers = [];
	for (var i = 0; i < this.actions.length; i++) {
		var target = this.actions[i].target;
		var layerid = target.id.split("_")[1];
		var curdiv = this.domframe.getElementById("layer_" + layerid);
		if (curdiv == null || typeof (curdiv) == "undefined") {
			this.organizingfinish++;
			continue;
		}
		layers.push(layerid + "," + parseInt(target.style.left) + "," + parseInt(target.style.top));
	}
	return layers.join(";");
}

ImageEditor.prototype.SaveCanvasImage = function (name, type, callback, callbackargs) {
	if (this.markissaving) return;
	this.markissaving = true;
	var savelayers = this.OrganizeImage();

	var iscleantemp = "0";
	if (this.configuration["IsCleanTemp"]) iscleantemp = this.configuration["IsCleanTemp"];
	//this.ClearActions();

	var savetype = "png";
	if (type) savetype = type.toLowerCase();
	var posturl = this.configuration["RTEPath"] + "SaveImage.html4." + this.configuration["PageType"] + "";
	var postdata = "name=" + encodeURIComponent(name) + "&type=" + encodeURIComponent(savetype) +
		"&overwrite=" + this.configuration["OverwriteFile"] + "&path=" + encodeURIComponent(this.configuration["ImageID"]) +
		"&guid=" + encodeURIComponent(this.configuration["Guid"]) + "&imageid=" + encodeURIComponent(this.configuration["ImageID"]) +
		"&layers=" + savelayers + "&cleantemp=" + iscleantemp;
	var _popup = this.Popup;
	var self = this;
	var x = this.XMLHttpRequest();
	var result = null;
	if (!x) {
		result = { "value": null, "error": "NOXMLHTTP" };
		if (typeof (callback) == "function") {
			callback(result, callbackargs);
		}
		return result;
	}
	var iscallback = typeof (callback) == "function" ? true : false;
	x.open("POST", posturl, true);
	x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	x.onreadystatechange = function () {
		if (x.readyState != 4) {
			return;
		}
		var responseText = x.responseText;
		if (!responseText) {
			result = { "value": null, "error": "Request Error" };
			if (iscallback) {
				callback(result, callbackargs);
			}
			else {
				_popup(self.Text["Failure"] + " : " + result.value);
			}
			x = null;
			return result;
		}
		try {
			result = eval("(" + responseText + ")");
		} catch (e) {
			result = {};
			if (responseText.length == 0)
				result.error = "NORESPONSE";
			else {
				result.error = "BADRESPONSE";
				result.responseText = responseText;
			}
		}
		if (iscallback) {
			callback(result, callbackargs);
		}
		else {
			//_popup(self.Text["FileSaved"] + " : " + result.value);
		}
		//clear resource
		x = null;
		
		window.OnImageSaved();
	};
	x.send(postdata);
	
	//limit 3 seconds to save
	setTimeout(this.Delegate(this, function () { this.markissaving = null; }), 3000);
}

ImageEditor.prototype.CleanTemp = function () {
	var posturl = "SaveImage.html4." + this.configuration["PageType"] + "";
	var postdata = "guid=" + encodeURIComponent(this.configuration["Guid"]) + "&imageid=" + encodeURIComponent(this.configuration["ImageID"]) + "&cleantemp=unload";
	var x = this.XMLHttpRequest();
	if (!x)
		return;
	x.open("POST", posturl, true);
	x.onreadystatechange = function () {
		if (x.readyState != 4) {
			return;
		}
		x = null;
	};
	x.send(postdata);
}


ImageEditor.prototype.ValidNumber = function (v) {
	if (!v)
		return false;
	if (isNaN(v))
		return false;
	if (parseInt(v) <= 0)
		return false;
	return true;
}

ImageEditor.prototype.Unselect = function () {
	if (!this.selectedaction)
		return;
	this.selectedaction.style.border = "";
	this.selectedaction = null;
}

ImageEditor.prototype.DeleteAction = function () {
	if (!this.selectedaction)
		return;
	this.selectedaction.style.display = "none";
	this.RemoveAction(this.selectedaction);
	var action = { "target": this.selectedaction, "action": "delete" };
	this.undoactions.push(action);
	this.selectedaction = null;
}

ImageEditor.prototype.RemoveAction = function (tag) {
	if (typeof (tag) == "number") {
		if (tag >= this.actions.length)
			return;
		this.actions.splice(tag, 1);
		return;
	}
	for (var i = 0; i < this.actions.length; i++) {
		if (tag.id && tag.id == this.actions[i].target.id) {
			this.actions.splice(i, 1);
			return;
		}
	}
}

ImageEditor.prototype.RemoveUndoAction = function (tag) {
	for (var i = 0; i < this.undoactions.length; i++) {
		if (tag.id && tag.id == this.undoactions[i].target.id) {
			this.undoactions.splice(i, 1);
			return;
		}
	}
}

ImageEditor.prototype.MoveActionCheck = function (tag, model) {
	if (!tag) return 0;
	for (var i = 0; i < this.actions.length; i++) {
		if (tag.id && tag.id == this.actions[i].target.id) {
			if ((i == 0 && model == 0) || (i == this.actions.length - 1 && model == 1))
				return 0;
			return 1;
		}
	}
	return 0;
}

ImageEditor.prototype.MoveAction = function (tag, model) {
	if (!tag) return;
	for (var i = 0; i < this.actions.length; i++) {
		if (tag.id && tag.id == this.actions[i].target.id) {
			if ((i == 0 && model == 0) || (i == this.actions.length - 1 && model == 1))
				return;
			if (model == 1) {
				var ctag = this.actions[i + 1];
				var otag = this.actions[i];
				var zix = ctag.target.style.zIndex;
				ctag.target.style.zIndex = otag.target.style.zIndex;
				otag.target.style.zIndex = zix;
				this.actions[i + 1] = otag;
				this.actions[i] = ctag;
			}
			else {
				var ctag = this.actions[i - 1];
				var otag = this.actions[i];
				var zix = ctag.target.style.zIndex;
				ctag.target.style.zIndex = otag.target.style.zIndex;
				otag.target.style.zIndex = zix;
				this.actions[i - 1] = otag;
				this.actions[i] = ctag;
			}
			return;
		}
	}
}

ImageEditor.prototype.ClearActions = function () {
	for (var i = 0; i < this.totalactions.length; i++) {
		try {
			this.domframe.body.removeChild(this.totalactions[i].target);
		}
		catch (ex) {
		}
	}
	this.actions = [];
	this.totalactions = [];
	this.redoactions = [];
	this.undoactions = [];
	this.currentactionindex = -1;
}

ImageEditor.prototype.XMLHttpRequest = function () {
	if (typeof (XMLHttpRequest) != "undefined")
		return new XMLHttpRequest();
	return new ActiveXObject("Microsoft.XMLHTTP");
}

ImageEditor.prototype.InitBrowser = function () {
	var bw = {};
	var ua = navigator.userAgent;
	bw.opera = /Opera/.test(ua);
	bw.firefox = /Firefox/.test(ua);
	bw.firefoxdown = navigator.userAgent.indexOf("Firefox/1.") >= 0 || navigator.userAgent.indexOf("Firefox/2.") >= 0;
	bw.safari = /Safari/.test(ua);
	bw.chrome = /Chrome/.test(ua);
	bw.webkit = /WebKit/.test(ua);
	bw.gecko = /Gecko/.test(ua);
	bw.ie = /MSIE/.test(ua);
	bw.ie5 = /MSIE 5/.test(ua);
	bw.ie6 = /MSIE 6/.test(ua);
	bw.ie7 = /MSIE 7/.test(ua);
	bw.ie8 = /MSIE 8/.test(ua);
	bw.ie9 = /MSIE 9/.test(ua);
	this.Browser = bw;
}