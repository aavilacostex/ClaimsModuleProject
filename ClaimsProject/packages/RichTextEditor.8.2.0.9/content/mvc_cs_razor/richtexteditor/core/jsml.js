//v3.37 - rte

new function () {

	if (window.jsml)
		return;

	var jsml = {};
	window.jsml = jsml;

	jsml.xmlfilemap = {};

	if (!window.$rte) new function () {
		var $rte = {};
		window.$rte = $rte;

		$rte.object = function () { };
		$rte.object.prototype = {
			constructor: $rte.object,
			toString: function () { return "{object}"; },
			init: function () { },
			delegate: function (func) {
				var obj = this;
				return function () {
					return func.apply(obj, arguments);
				};
			}
		};
		$rte.object._extends = function (define) {
			var typector = function () { this.init.apply(this, arguments); }
			typector._extends = this._extends;
			var basetype = this.prototype;
			function protocls() { }
			protocls.prototype = basetype;
			var thistype = new protocls();
			thistype.constructor = typector;
			typector.prototype = thistype;
			typector.protobase = basetype;
			define.apply(thistype, [basetype, thistype]);
			return typector;
		};
	}

	$rte.Base = $rte.object._extends(function (base, type) {

		var neid = 0;
		var tempdiv = document.createElement("DIV");
		tempdiv.setAttribute("contentEditable", "true");

		this.init = function () {
			this._eventmap = null;
			this._objectuid = ++neid;
			base.init.apply(this, arguments);

		}

		this.HtmlEncode = function (html) {
			html = String(html);
			html = html.replace(/&/g, "&amp;");
			html = html.replace(/</g, "&lt;");
			html = html.replace(/>/g, "&gt;");
			html = html.replace(/'/g, "&#39;");
			html = html.replace(/\x22/g, "&quot;");
			html = html.replace(/(\s)\s/g, "$1&nbsp;");
			return html;
		}

		this.HtmlDecode = function (html, pre) {
			if (!html) return "";
			html = html.replace(/\s+/g, ' ');
			tempdiv.style.whiteSpace = pre ? "pre" : "";
			tempdiv.innerHTML = html;
			var text = tempdiv.innerText || tempdiv.textContent || "";
			tempdiv.innerHTML = "";
			return text;
		}

		this.DetachEvent = function (name, handler) {
			if (!handler) {
				handler = name;
				name = "*"
			}
			else if (name == null) {
				name = "*"
			}

			if (!this._eventmap) return;
			var m = this._eventmap[name];
			if (!m) return;

			for (var i = 0; i < m.length; i++) {
				if (m[i].Handler == handler || m[i].UniqueID == handler) {
					m.splice(i, 1);
					return true;
				}
			}
			return false;
		}
		this.AttachEvent = function (name, handler) {
			if (!handler) {
				handler = name;
				name = "*"
			}
			else if (name == null) {
				name = "*"
			}

			if (!this._eventmap) this._eventmap = {}
			var m = this._eventmap[name];
			if (!m) m = this._eventmap[name] = [];

			for (var i = 0; i < m.length; i++) {
				if (m[i].Handler == handler)
					return m[i].UniqueID;
			}
			m.push({ Handler: handler, UniqueID: ++neid });
			return neid;
		}
		this.FireEvent = function (name, args, caller) {
			var e = { Object: this, Name: name, Arguments: args || [], Caller: caller, ReturnValue: null };

			var em = this._eventmap;
			if (!em) return e;
			var m1 = em[name];
			var m2 = em["*"];
			if (m1 && m1.length) {
				var newemap = m1;
				for (var i = 0; i < newemap.length; i++) {
					var f = newemap[i];
					e.UniqueID = f.UniqueID;
					e.Handler = f.Handler;
					f.Handler.call(this, this, e);
				}
			}
			if (m2 && m2.length) {
				var newemap = m2;
				for (var i = 0; i < newemap.length; i++) {
					var f = newemap[i];
					e.UniqueID = f.UniqueID;
					e.Handler = f.Handler;
					f.Handler.call(this, this, e);
				}
			}
			e.UniqueID = null;
			e.Handler = null;
			return e;
		}
	});

	new function () {
		jsml.debug = false;
		jsml.jsmlfolder = "../JSML";
		jsml.liveobjectcount = 0;

		jsml.default_textbox_bordercolor = "#cccccc";


		jsml.userAgent = navigator.userAgent;

		if (/iPhone/.test(jsml.userAgent)) {
			jsml.mobile = true;
		}
		if (/Android/.test(jsml.userAgent)) {
			jsml.mobile = true;
		}
		if (/Mobile/.test(jsml.userAgent)) {
			jsml.mobile = true;
		}

		jsml.msie = /MSIE/.test(jsml.userAgent);
		if (jsml.msie) {
			jsml.msie6 = /MSIE 6/.test(jsml.userAgent);
			jsml.msie7 = /MSIE 7/.test(jsml.userAgent);
			jsml.msie8 = /MSIE 8/.test(jsml.userAgent);
			jsml.msie9 = /MSIE 9/.test(jsml.userAgent);
			jsml.msie10 = /MSIE 10/.test(jsml.userAgent);
			jsml.msie10p = /MSIE \d\d/.test(jsml.userAgent);
			jsml.msie567 = /MSIE [567]/.test(jsml.userAgent);
			jsml.msie5678 = /MSIE [5678]/.test(jsml.userAgent);
			jsml.msie56789 = /MSIE [56789]/.test(jsml.userAgent);
			jsml.msie8more = !jsml.msie567;
			jsml.html5 = !!document.createElement("canvas").getContext;
			if (jsml.msie9 && !jsml.html5) {
				jsml.msie9 = false;
				jsml.msie7 = true;
				jsml.msie567 = true;
				jsml.msie5678 = true;
				jsml.msie8more = false;
			}

			if (jsml.msie6 && !jsml.bodyclassIEadded) {
				jsml.bodyclassIEadded = true;
				var cn = document.body.className;
				cn += (cn ? " IE" : "IE") + (jsml.msie7 ? "7" : jsml.userAgent.replace(/.*MSIE (\d+)\..*/, "$1"));
				document.body.className = cn;
			}

			try {
				if (jsml.msie && document.namespaces)
					jsml.msienamespaces = true;
			}
			catch (x) {
			}
		}
		else {
			jsml.html5 = true;
			jsml.firefox = /Firefox/.test(jsml.userAgent);
			jsml.opera = /Opera/.test(jsml.userAgent);
			jsml.webkit = /WebKit/.test(jsml.userAgent);
			if (jsml.webkit) {
				jsml.chrome = /Chrome/.test(jsml.userAgent);
				if (!jsml.chrome) {
					jsml.safari = /Safari/.test(jsml.userAgent);
					jsml.safari34 = /Version\/[34]\./.test(jsml.userAgent);
				}
			}
		}



		jsml.empty_function = function () {
		}
		jsml.cancel_event_function = function (event) {
			if (!event) event = window.event;
			if (event.ctrlKey && event.shiftKey && event.altKey) return;
			if (event.preventDefault) event.preventDefault();
			if (event.stopPropagation) event.stopPropagation();
			event.cancelBubble = true;
			event.returnValue = false;
			return false;
		}
		jsml.cancel_default_function = function (event) {
			if (!event) event = window.event;
			if (event.ctrlKey && event.shiftKey && event.altKey) return;
			if (event.preventDefault) event.preventDefault();
			event.returnValue = false;
			return false;
		}
		jsml.cancel_bubble_function = function (event) {
			if (!event) event = window.event;
			if (event.stopPropagation) event.stopPropagation();
			event.cancelBubble = true;
		}

		jsml.trace_error = function (category, message) {
			if (jsml.debug) alert(category + ":" + message);
		}

		jsml.trace_warning = function (category, message) {
		}

		jsml.handle_error = function (category, message) {
			jsml.trace_error(category, message)
			throw (new Error(message + " (" + category + ")"));
		}

		jsml.delegate = function (obj, func) {
			if (func == null)
				jsml.handle_error("delegate", "Missing argument : func on obj " + obj);
			return function () {
				return func.apply(obj, arguments);
			};
		}


		jsml.toboolean = function (val) {
			if (typeof (val) == "string") {
				switch (val.toLowerCase()) {
					case "1":
					case "on":
					case "yes":
					case "true":
						return true;
					default:
						return false;
				}
			}
			return !!val;
		}
		jsml.tonumber = function (val, defval) {
			if (typeof (val) != "number")
				val = parseFloat(String(val));
			if (isNaN(val))
				return defval || 0;
			return val;
		}
		jsml.isvisible = function (element) {
			if (!element)
				return false;
			var doc = element.ownerDocument;
			for (var p = element; p; p = p.parentNode) {
				if (p == doc.body)
					return true;
				if (jsml.get_current_style(p, "display") == 'none')
					return false;
				if (jsml.get_current_style(p, "visibility") == 'hidden')
					return false;
			}
		}
		var stylenamemap = {}
		jsml.get_current_style = function (element, name) {
			var style = element.currentStyle;
			if (!style) {
				if (!jsml.chrome && window.getComputedStyle) {
					var val = window.getComputedStyle(element, null).getPropertyValue(name);
					if (val) return val;
				}
				style = element.style;
			}
			if (name.indexOf('-') != -1) {
				var newname = stylenamemap[name];
				if (!newname) {
					var parts = name.split('-');
					for (var i = 1; i < parts.length; i++) {
						parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
					}
					newname = parts.join("")
					stylenamemap[name] = newname;
				}
				name = newname;
			}
			try {
				return style[name];
			}
			catch (x) {
				return null;
			}
		}

		jsml.format_size = function (value) {
			value = parseInt(value);
			if (value > 3 * 1024 * 1024) return Math.floor(value / 1024 / 1024) + " MB";
			if (value > 3 * 1024) return Math.floor(value / 1024) + " KB";
			return value + " B";
		}

		var suppendlayoutsavetimer;
		var suppendlevel = 0;
		var suppendhandlers = {};
		var hashandler = false;
		jsml.is_suppend_layout = function () {
			return suppendlevel > 0;
		}
		function check_resume_layout() {
			suppendlayoutsavetimer = null;
			if (suppendlevel == 0) return;
			suppendlevel = 1;
			jsml.resume_layout();
		}
		jsml.suppend_layout = function () {
			suppendlevel++;
			if (!suppendlayoutsavetimer) suppendlayoutsavetimer = setTimeout(check_resume_layout, 1);
		}
		jsml.resume_layout = function () {
			suppendlevel--;
			while (suppendlevel == 0 && hashandler) {
				var map = suppendhandlers;
				suppendhandlers = {};
				hashandler = false;
				for (var p in map)
					map[p]();
			}
		}
		jsml.execute_layout = function (func) {
			if (jsml.is_suppend_layout())
				return func();
			jsml.suppend_layout();
			var r = func();
			jsml.resume_layout();
			return r;
		};
		jsml.set_resume_handler = function (uid, handler) {
			if (suppendlevel == 0) {
				//handler();
				setTimeout(handler, 0);
				return;
				jsml.suppend_layout();
			}

			suppendhandlers[uid] = handler;
			hashandler = true;
		}
		var resumetimerid;
		var resumehandlers = null;
		function handle_resumetimer() {
			resumetimerid = null;
			var hs = resumehandlers;
			resumehandlers = null;
			jsml.suppend_layout();
			while (hs.length) {
				try {
					var handler = hs.shift();
					handler();
				}
				catch (x) {
					if (hs.length) {
						if (!resumehandlers)
							resumehandlers = hs;
						else
							resumehandlers = hs.concat(resumehandlers);
						if (!resumetimerid) resumetimerid = setTimeout(handle_resumetimer, 5);
					}
					throw (x);
				}
			}
			jsml.resume_layout();
		}
		jsml.queue_resumehandler = function (func) {
			if (resumehandlers == null) resumehandlers = [];
			resumehandlers.push(func);
			if (!resumetimerid) resumetimerid = setTimeout(handle_resumetimer, 5);
		}

		jsml.xmlhttp = function () {
			if (typeof (XMLHttpRequest) != "undefined")
				return new XMLHttpRequest();
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	new function () {
		jsml.constructor = $rte.object._extends(function (basetype, thistype) {
			thistype.toString = function () {
				return "[" + this._jsml_info.typename + ":" + this._jsml_index + "]";
			}
			thistype.instance_of = function (basename) {
				var info = this._jsml_info;
				if (info.typename == basename)
					return true;
				for (var i = 0; i < info.bases.length; i++)
					if (info.bases[i].typename == basename)
						return true;
				return false;
			}
		});
		jsml.prototype = jsml.constructor.prototype;

		jsml._classes = {};
		jsml._redirects = {};
		jsml._finalizelist = [];

		function callfinalizelist(reason) {
			jsml._finalizetimerid = null;
			var list = jsml._finalizelist;
			var dtnow = new Date().getTime();
			while (list.length) {
				if (reason != "disposeall" && dtnow - list[0]._finaizeTime < 2800)
					return _ensureFinalizeTimer();
				var obj = list.shift();
				for (var p in obj) {
					var val = obj[p];
					if (typeof (val) == "object") {
						delete obj[p];
					}
				}
				obj._jsml_disposed = true;
			}
			//document.title="cleared";
		}
		function _ensureFinalizeTimer() {
			if (jsml._finalizetimerid) return;
			clearTimeout(jsml._finalizetimerid);
			jsml._finalizetimerid = setTimeout(callfinalizelist, 800);
			//document.title=new Date().getSeconds();
		}
		jsml.queuefinalize = function (obj) {
			obj._finaizeTime = new Date().getTime();
			jsml._finalizelist.push(obj);
			_ensureFinalizeTimer();
		}

		function deepdispose(obj) {
			for (var p in obj) {
				var val = obj[p];
				if (typeof (val) == "object") {
					delete obj[p];
					//if(val.constructor == Object)
					//	deepdispose(val);
				}
			}
		}

		jsml.deepdispose = deepdispose;

		jsml._disposingall = false;
		jsml.disposeall = function () {
			if (jsml._disposingall)
				return;
			jsml._disposingall = true;

			var sb = [];
			for (var obj = jsml._headobject; obj; obj = obj._nextobject) {
				sb.push(obj);
			}
			for (var i = 0; i < sb.length; i++) {
				if (!sb[i]._jsml_disposed)
					sb[i].dispose();
			}
			for (var i = 0; i < sb.length; i++) {
				deepdispose(sb[i]);
			}
			callfinalizelist("disposeall");
			deepdispose(jsml);
			jsml = {};
			deepdispose($rte);
			$rte = {};
			//alert('disposed');
		}
		jsml.disposebasic = function () {
			jsml._classes = {};
			jsml._redirects = {};
			for (var p in jsml) {
				if (p.substring(0, 4) == "new_")
					delete jsml[p];
			}
		}

		jsml.dispose_delay = function (obj) {
			if (!jsml._disposinglist) jsml._disposinglist = [];
			if (obj)
				jsml._disposinglist.push(obj);
			if (jsml._disposinglist.length == 0)
				return;
			if (jsml._disposetimer)
				return;
			jsml._disposetimer = 1;
			setTimeout(jsml._dispose_ontimer, 100);
		};
		jsml._dispose_ontimer = function () {
			jsml._disposetimer = null;
			if (jsml._disposingall)
				return;
			if (!jsml._disposinglist)
				return;
			if (jsml._disposinglist.length == 0)
				return;
			jsml.dispose_delay();
			while (jsml._disposinglist.length > 0) {
				var obj = jsml._disposinglist.shift();
				if (!obj._jsml_disposed) {
					obj.dispose();
				}
			}
		}


		jsml.class_exists = function (typename) {
			return typename in jsml._classes;
		}

		jsml.class_ensure = function (typename, basename) {
			var info = jsml._classes[typename];
			if (!info)
				return jsml.handle_error("class_ensure", "class '" + typename + "' does not exist");
			if (!basename)
				return info;
			if (typename == basename)
				return info;

			for (var i = 0; i < info.bases.length; i++)
				if (info.bases[i].typename == basename)
					return info;
			return jsml.handle_error("class_ensure", "class '" + typename + "' does not inherit '" + basename + "'");
		}

		jsml.class_define_redirect = function (basename, newcls) {
			if (jsml.debug) jsml.class_ensure(basename);
			if (jsml.debug) jsml.class_ensure(newcls);

			jsml._redirects["_redirect_define_" + basename] = newcls;
		}
		jsml.class_create_redirect = function (basename, newcls) {
			if (jsml.debug) jsml.class_ensure(basename);
			if (jsml.debug) jsml.class_ensure(newcls);

			jsml._redirects["_redirect_create_" + basename] = newcls;
		}

		jsml.class_define = function (typename, basename, allowRewrite) {
			if (!allowRewrite) if (jsml.debug) if (jsml._classes[typename])
				jsml.handle_error("class_define", "class '" + typename + "' already exists");

			if (basename) {
				basename = jsml._redirects["_redirect_define_" + basename] || basename;
				if (jsml.debug) jsml.class_ensure(basename);
			}

			var info = { typename: typename, basename: basename };
			info.ctor = null;
			info.props = {}
			info.meths = {}
			info.methx = [];
			info.attas = {};
			info.attax = [];


			info.bases = [];
			if (basename) {
				info.basetype = jsml._classes[basename];
				info.bases = info.basetype.bases.concat();
				info.bases.push(info.basetype);
			}
			info.types = info.bases.concat();
			info.types.push(info);

			info.constructor = (info.basetype || jsml).constructor._extends(function (basetype, thistype) {
				thistype.init = function (args) {
					jsml._class_constructor_oninit(this, args, info);
				}
			});
			info.prototype = info.constructor.prototype;

			jsml._classes[typename] = info;

			jsml["new_" + typename] = function class_default_constructor() {
				return jsml.class_create_instance(typename, arguments)
			}

			var d = {};
			d.constructor = function (ctorfunc) {
				jsml.class_define_constructor(typename, ctorfunc);
			};
			d.method = function (methname, methfunc, overrideas) {
				jsml.class_define_method(typename, methname, methfunc, overrideas);
			};
			d.property = function (propname, getfunc, setfunc, overrideas) {
				jsml.class_define_property(typename, propname);
				if (getfunc)
					jsml.class_define_method(typename, "get_" + propname, getfunc, overrideas);
				if (setfunc)
					jsml.class_define_method(typename, "set_" + propname, setfunc, overrideas);
			}
			d.attach = function (eventname, func) {
				jsml.class_define_attach(typename, eventname, func);
			}
			return d;
		}


		jsml.class_define_constructor = function (typename, ctorfunc) {
			if (jsml.debug) jsml.class_ensure(typename);

			var info = jsml._classes[typename];
			info.ctor = ctorfunc;
		}

		jsml.class_define_property = function (typename, propname) {
			if (jsml.debug) jsml.class_ensure(typename);

			var info = jsml._classes[typename];

			if (jsml.debug) if (info.props[propname])
				jsml.handle_error("class_define_property", "class '" + typename + "' already contains property '" + propname + "'");

			var prop = { name: propname, type: info };
			info.props[propname] = prop;
		}

		jsml.class_define_attach = function (typename, eventname, func) {
			if (eventname.indexOf(",") != -1) {
				var arr = eventname.split(",");
				for (var i = 0; i < arr.length; i++)
					jsml.class_define_attach(typename, arr[i], func);
				return;
			}

			if (jsml.debug) jsml.class_ensure(typename, "jsml");

			var info = jsml._classes[typename];

			var map = info.attas[eventname];
			if (map == null) {
				map = {};
				map.name = eventname;
				map.handlers = [];
				info.attas[eventname] = map;
				info.attax.push(map);
			}
			map.handlers.push(func);
			func.methname = typename + ".attach_" + eventname
		}

		jsml.class_define_method = function (typename, methname, methfunc, overrideas) {
			if (typeof (overrideas) == "function" && typeof (methfunc) == "string")
				return jsml.class_define_method(typename, methname, overrideas, methfunc)

			if (jsml.debug) jsml.class_ensure(typename);

			var info = jsml._classes[typename];

			if (jsml.debug) if (info.meths[methname])
				jsml.handle_error("class_define_method", "class '" + typename + "' already contains method '" + methname + "'");
			if (jsml.debug) if (overrideas) if (!info.basetype)
				jsml.handle_error("class_define_method", "class '" + typename + "' do not have basetype to overrideas");

			var meth = { name: methname, func: methfunc, overrideas: overrideas, type: info };
			info.meths[methname] = meth;

			info.prototype[methname] = methfunc;
			info.prototype[typename + "_" + methname] = methfunc

			for (var type = info.basetype; type; type = type.basetype) {
				if (type.meths[methname]) {
					meth.overridemeth = type.meths[methname];
					info.prototype[type.typename + "_" + methname] = meth.overridemeth.func;
					if (overrideas) info.prototype[overrideas] = meth.overridemeth.func;
					break;
				}
			}

			if (jsml.debug) if (overrideas) if (!meth.overridemeth)
				jsml.handle_error("class_define_method", "class '" + info.basename + "' does not contain method '" + methname + "'");

			info.methx.push(meth);
		}

		jsml.class_wrap_ctor_for_attach = function (type, ctor) {
			return function () {
				ctor.apply(this, arguments);
				for (var ti = 0; ti < type.attax.length; ti++) {
					var map = type.attax[ti];
					for (var hi = 0; hi < map.handlers.length; hi++)
						this.attach_event(map.name, map.handlers[hi]);
				}
			}
		}
		jsml._class_constructor_oninit = function (inst, args, info) {
			inst._jsml_info = info;
			inst._jsml_index = info.nextindex = (1 + (info.nextindex || 0));

			if (info._initvars) {
				for (var p in info._initvars)
					inst[p] = info._initvars[p];
			}

			var ctor = jsml.empty_function;
			var prevtype;
			for (var ti = 0; ti < info.types.length; ti++) {
				var currtype = info.types[ti];

				if (prevtype)
					inst[prevtype.typename + "_constructor"] = ctor;
				if (currtype.ctor)
					ctor = currtype.ctor

				if (currtype.attax.length) {
					ctor = jsml.class_wrap_ctor_for_attach(currtype, ctor);
				}

				prevtype = currtype;
			}

			jsml.suppend_layout();

			if (ctor) {
				ctor.apply(inst, args || []);
			}

			if (inst.jsml_initialize) {
				inst.jsml_initialize();
			}

			if (inst.invoke_event) {
				inst.invoke_event("initialize");
			}

			jsml.resume_layout();
		}

		jsml.class_create_instance = function (typename, args) {
			typename = jsml._redirects["_redirect_create_" + typename] || typename;

			var info = jsml.class_ensure(typename);

			return new info.constructor(args);
		}

	}

	new function () {

		var define = jsml.class_define("jsml");
		define.constructor(function () {
			this._jsml_ctorcalled = 1;
		});
		define.method("setDelegateTimeout", function (func, ms) {
			var self = this;
			return setTimeout(function () {
				if (self._jsml_disposed)
					return;
				func.apply(self, arguments);
			}, ms);
		});


		define.method("dispose", function () {
			jsml.queuefinalize(this);
			this.invoke_event("disposing");
			this._jeventmap = null;
			this._jsml_disposed = true;
		});
		define.method("jsml_initialize", function () {
			this._jsml_initcalled = 1;
		});

		define.method("is_jsml_type", function (typename) {
			var info = this._jsml_info;
			if (info.typename == typename)
				return true;
			for (var i = 0; i < info.bases.length; i++)
				if (info.bases[i].typename == typename)
					return true;
			return false;
		});

		define.method("delegate", function (func) {
			return jsml.delegate(this, func);
		});

		define.property("uid",
			function () {
				return this._jsml_info.typename + "_" + this._jsml_index;
			}
		);
		define.property("id",
			function () {
				return this._jsml_id;
			}
			,
			function (val) {
				if (this._jsml_id == val) return;
				this._jsml_id = val;
			}
		);
		define.property("var",
			function () {
				return this._jsml_var;
			}
			,
			function (val) {
				if (this._jsml_var == val) return;
				this._jsml_var = val;
				if (val) window[val] = this;
			}
		);
		define.property("jsml_parent",
			function () {
				return this._jsml_parent;
			}
			,
			function (val) {
				if (this._jsml_parent == val) return;
				this._jsml_parent = val;
			}
		);
		define.method("get_children", function () {
			return [];
		});

		define.method("jsml_oneventarray", function (name, type, map, handler) {
		});
		define.method("attach_event", function (eventname, handler) {
			if (eventname.indexOf(",") != -1) {
				var arr = eventname.split(",");
				for (var i = 0; i < arr.length; i++)
					this.attach_event(arr[i], handler);
				return;
			}

			if (!this._jeventmap) this._jeventmap = {}
			var map = this._jeventmap[eventname];
			if (!map) map = this._jeventmap[eventname] = [];
			for (var i = 0; i < map.length; i++)
				if (map[i] == handler)
					return;
			map.push(handler);
			this.jsml_oneventarray(eventname, "attach", map, handler);
		});
		define.method("detach_event", function (eventname, handler) {
			if (eventname.indexOf(",") != -1) {
				var arr = eventname.split(",");
				for (var i = 0; i < arr.length; i++)
					this.detach_event(arr[i], handler);
				return;
			}

			if (!this._jeventmap) return;
			var map = this._jeventmap[eventname];
			if (!map) return;
			for (var i = 0; i < map.length; i++) {
				if (map[i] == handler) {
					map.splice(i, 1);
					this.jsml_oneventarray(eventname, "detach", map, handler);
					return;
				}
			}
		});
		define.method("handle_event", function (jevent) {
		});
		define.method("bubble_event", function (eventname, arg1, arg2) {
			this.invoke_event.apply(this, arguments);
			var p = this.get_jsml_parent();
			if (!p) return;
			var f = p.bubble_event;
			if (f) f.apply(p, arguments);
		});
		define.method("invoke_event", function (eventname, arg1, arg2) {
			if (!this._jeventmap) return;
			var map = this._jeventmap[eventname];
			if (!map) return;
			var args = [];
			for (var i = 0; i < arguments.length; i++)
				args.push(arguments[i]);
			var evt = {};
			args[0] = evt;
			evt.jsml_sender = this;
			evt.jsml_name = eventname;
			evt.jsml_value = args[1];
			evt.jsml_args = args;
			jsml.suppend_layout();
			for (var i = 0; i < map.length; i++) {
				var handler = map[i];
				if (handler.handle_event)
					handler.handle_event.apply(handler, args);
				else
					handler.apply(this, args);
			}
			jsml.resume_layout();
		});


		define.method("jsml_append", function (obj) {
			jsml.handle_error("jsml_append", "'" + this._jsml_info.typename + "' do not support child nodes");
		});
		define.method("jsml_append_xmldata", function (node) {
		});

	}

	new function () {
		//jsml._xmlfunctions={};

		jsml.get_node_innertext = function (node) {
			try {
				var s = node.text;
				if (s) return s;
			}
			catch (x) {
				//opera will throw BAD_BOUNDARYPOINTS_ERR
			}
			try {
				var s = node.textContent;
				if (s) return s;
			}
			catch (x) {
			}
			var arr = [];
			var nodes = node.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				var n = nodes.item(i);
				arr[arr.length] = n.nodeValue;
			}
			return arr.join("");
		}
		jsml.get_node_innerxml = function (node) {
			var arr = [];
			var childs = node.childNodes;

			if ("xml" in node) {
				for (var i = 0; i < childs.length; i++)
					arr[i] = childs.item(i).xml
			}
			else if (typeof (XMLSerializer) != "undefined") {
				var s = new XMLSerializer();
				for (var i = 0; i < childs.length; i++) {
					var childnode = childs[i];
					if (childnode.nodeType == 1)
						arr[arr.length] = s.serializeToString(childnode);
					else
						arr[arr.length] = childnode.nodeValue;
				}
			}
			else {
				//TODO:no xml and no XMLSerializer
			}
			return arr.join("")
		}


	}

	new function () {
		jsml.eval = function (__code__) {
			return eval(__code__);
		}
	}

	new function () {
		jsml._fragments = {};


		var context = {};
		function context_enter() {
			function CTX() { }
			CTX.prototype = context;
			var ctx = new CTX();
			for (var p in context)
				ctx[p] = context[p];
			ctx.prevcontext = context;
			context = ctx;
		}
		function context_leave() {
			context = context.prevcontext;
		}


		jsml.translate_value = function (val) {
			if (!val)
				return val;
			var c = val.charAt(0)
			if (c == '=')
				return val.substring(1);
			if (c == '^')
				return jsml.eval(val.substring(1));
			if (context.translate_value)
				return context.translate_value(val);
			return val;
		}

		function ensure_attribute(node, name) {
			var v = node.getAttribute(name);
			if (v)
				return jsml.translate_value(v);
			jsml.handle_error("ensure_attribute", "element '" + node.nodeName + "' must have attribute '" + name + "'");
		}

		function get_fragment(refnode) {
			var name = ensure_attribute(refnode, "name");
			var frag = jsml._fragments[name];
			if (frag)
				return frag.node;
			jsml.handle_error("get_fragment", "fragment ref '" + name + "' not found");
		}

		function parse_root_def(defnode) {
			var name = ensure_attribute(defnode, "name");
			if (jsml._fragments[name]) {
				//jsml.handle_error("parse_root_def","fragment def '"+name+"' already exists");
				return;
			}
			var frag = {}
			frag.node = defnode.cloneNode(true);
			jsml._fragments[name] = frag;
		}


		function foreach_subnode(node, handler) {
			var nodes = node.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				var subnode = nodes.item(i);
				if (subnode.nodeType != 1)
					continue;
				if (subnode.nodeName == "jsml-comment")
					continue;
				var je = subnode.getAttribute("jsml-enable");
				if (je && !jsml.toboolean(jsml.translate_value(je)))
					continue;
				if (subnode.nodeName == "jsml-block")
					foreach_subnode(subnode, handler);
				else if (subnode.nodeName == "jsml-ref")
					foreach_subnode(get_fragment(subnode), handler);
				else
					handler(subnode);
			}
		}

		function parse_node_attach(self, node, info) {
			var handler = parse_node_function(node, info);
			return function () {
				//			try
				//			{
				return handler.apply(self, arguments);
				//			}
				//			catch(x)
				//			{
				//				throw(new Error("Failed to handle attach "+info.typename+":"+node.getAttribute("name")+",\r\n"+x.message));
				//			}
			};
		}
		function parse_node_method(node, info, methname) {
			var methodfunc = parse_node_function(node, info)
			jsml.class_define_method(info.typename, methname, function () {
				//jsml.suppend_layout();
				//try
				//{
				return methodfunc.apply(this, arguments);
				//}
				//catch(x)
				//{
				//	throw(new Error("Failed to execute "+info.typename+":"+methname+",\r\n"+x.message));
				//}
				//jsml.resume_layout();
			}, node.getAttribute("overrideas") || null);
		}
		function parse_node_function(node, info) {
			try {
				var nodecode = jsml.translate_value(jsml.get_node_innertext(node));
				if (nodecode.replace(/^\s+$/g, '').length == 0)
					return jsml.empty_function;

				var args = node.getAttribute("arguments") || "value";
				var nodexml = node.nodeName;
				switch (node.nodeName) {
					case "method":
					case "attach":
						nodexml += " name='" + node.getAttribute('name') + "'";
						break;
				}
				var funcbody = "/*" + info.typename + ":<" + nodexml + ">*/\r\n";
				funcbody += "var self=this;\r\n";
				funcbody += "var filevars=this._$_filevars;";
				if (context.globalvarsinstcode) {
					funcbody += context.globalvarsinstcode;
				}
				funcbody += "var instance=this._jsml_classinstance;\r\n";
				if (context.classinfo) {
					funcbody += (context.classinfo.localvarcode || "")
				}
				funcbody += "\r\n" + nodecode;

				//			if(!jsml._xmlfunctions)
				//			{
				func = new Function(args, funcbody);
				//			}
				//			else
				//			{
				//				var key=args+":"+funcbody;
				//				var func=jsml._xmlfunctions[key];
				//				if(func==null)
				//				{
				//					func=new Function(args,funcbody);
				//					jsml._xmlfunctions[key]=func;
				//				}
				//			}
			}
			catch (x) {
				jsml.handle_error("parse_node_function", "unable to parse <" + node.nodeName + "(" + node.getAttribute("name") + ")> for class '" + info.typename
					+ "' :\r\n " + x.message + " :\r\n" + funcbody.substring(0, 100) + "..\r\n");
			}

			return func;
		}


		function parse_initialize_children(node, info, self) {
			var initnodes;
			if (context.constructinginstance) {
				self["_jsml_class_" + context.classinfo.typename] = context.constructinginstance;
				self._jsml_classinstance = context.constructinginstance;
			}

			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				switch (attr.nodeName) {
					case "xmlns":
						break;
					case "jsml-class":
					case "jsml-base":
					case "jsml-append":
					case "jsml-enable":
						break;
					case "jsml-member":
						if (!context.constructinginstance)
							jsml.handle_error("parse_initialize_attribute", "jsml-member requires class element");
						context.constructinginstance[jsml.translate_value(attr.nodeValue)] = self;
						break;
					case "jsml-local":
						if (!context.constructinginstance)
							jsml.handle_error("parse_initialize_attribute", "jsml-local requires class element");
						var val = jsml.translate_value(attr.nodeValue);
						context.constructinginstance["_$_local_" + context.classinfo.typename + val] = self;
						break;
					default:
						var setfunc = self["set_" + attr.nodeName];
						if (setfunc)
							setfunc.apply(self, [jsml.translate_value(attr.nodeValue)]);
						else
							jsml.handle_error("jsml_attribute", "'" + info.typename + "' do not support property '" + attr.nodeName + "'");
						break;
				}
			}

			foreach_subnode(node, function (subnode) {
				switch (subnode.nodeName) {
					case "constructor":
					case "method":
					case "property":
						return;
					case "initialize":
						if (initnodes == null) initnodes = [];
						initnodes.push(subnode);
						break;
					case "attach":
						var handler = parse_node_attach(self, subnode, info);
						var eventname = subnode.getAttribute("name");
						if (!eventname)
							return jsml.handle_error("parse_initialize_children", "class '" + info.typename + "' attach node should specify 'name' attribute");
						self.attach_event(eventname, handler);
						break;
					case "xmldata":
						self.jsml_append_xmldata(subnode);
						break;
					default:
						if (subnode.nodeName == "object" || jsml._classes[subnode.nodeName]) {
							if (subnode.getAttribute("jsml-class"))
								return jsml.handle_error("parse_initialize_children", "only support to define a class under root element. "
									+ subnode.nodeName + ":" + subnode.getAttribute("jsml-class"));
							var subinst = parse_create_instance(subnode);

							var je = subnode.getAttribute("jsml-append");
							if (je && !jsml.toboolean(jsml.translate_value(je)))
								return;
							self.jsml_append(subinst);
							return;
						}
						jsml.handle_error("parse_initialize_children", "unknown element : '" + subnode.nodeName + "'");
						break;
				}
			});

			if (initnodes) {
				for (var i = 0; i < initnodes.length; i++) {
					var func = parse_node_function(initnodes[i], info);
					try {
						func.apply(self, arguments);
					}
					catch (x) {
						throw (new Error("failed to execute initialize : " + self + " , " + x.message + ","));
					}
				}
			}

		}

		function parse_process_class(node, info) {
			if (!info._initvars) info._initvars = {};
			info._initvars._$_filevars = context.filevars;
			if (context.globalvars) info._initvars._$_gvars = context.globalvars;

			var ctornode;
			jsml.class_define_constructor(info.typename, function () {
				var self = this;
				var args = arguments;
				function callctor() {
					if (!ctornode) {
						//just call base constructor..
						var func = self[info.basename + "_constructor"];
						func.apply(self, args);
					}
					else {
						if (!info._xmlctor)
							info._xmlctor = parse_node_function(ctornode, info);
						try {
							info._xmlctor.apply(self, args);
						}
						catch (x) {
							throw (new Error("failed to execute constructor : " + self + " , " + x.message));
						}
					}

					if (!self._jsml_ctorcalled)
						return jsml.handle_error("parse_initialize_children", "class '" + info.typename + "' do not call basic constructor.");

					parse_initialize_children(node, info, self);
				}

				if (!info.classnodecontext) {
					callctor();
				}
				else {
					var oldctx = context;
					context = info.classnodecontext;
					try {
						context_enter();

						context.constructinginstance = this;
						context.classinfo = info;
						this["_jsml_class_" + context.classinfo.typename] = this;
						this._jsml_classinstance = this;

						callctor();

						context_leave();
					}
					finally {
						context = oldctx;
					}
				}
			});
			foreach_subnode(node, function (subnode) {
				switch (subnode.nodeName) {
					case "constructor":
						if (ctornode != null)
							return jsml.handle_error("parse_process_class", "class '" + info.typename + "' should not define two constructor node");
						ctornode = subnode;
						break;
					case "method":
						parse_node_method(subnode, info, ensure_attribute(subnode, "name"));
						break;
					case "property":
						var propname = ensure_attribute(subnode, "name");
						jsml.class_define_property(info.typename, propname);
						foreach_subnode(subnode, function (propnode) {
							switch (propnode.nodeName) {
								case "get":
									parse_node_method(propnode, info, "get_" + propname);
									break;
								case "set":
									parse_node_method(propnode, info, "set_" + propname);
									break;
							}
						});
						break;
				}
			});
		}

		function parse_findlocal_recursive(node, localvarlist) {
			foreach_subnode(node, function (subnode) {
				switch (subnode.nodeName) {
					case "constructor":
					case "method":
					case "property":
					case "initialize":
					case "attach":
						return;
					default:
						if (!jsml._classes[subnode.nodeName])
							return;
						var clv = subnode.getAttribute("jsml-local");
						if (clv)
							localvarlist.push(jsml.translate_value(clv))
						parse_findlocal_recursive(subnode, localvarlist);
						break;
				}
			});
		}

		function parse_create_class(node) {
			var typename = ensure_attribute(node, "jsml-class");
			var basename = jsml.translate_value(node.getAttribute("jsml-base")) || node.nodeName;

			jsml.class_define(typename, basename, true);

			var info = jsml._classes[typename];

			var localvarlist = [];
			parse_findlocal_recursive(node, localvarlist);

			info.localvarcode = "var " + info.typename + "=this._jsml_class_" + info.typename + ";";
			var clv = node.getAttribute("jsml-local");
			if (clv) {
				info.localvarcode = info.localvarcode + "var " + jsml.translate_value(clv) + "=this._jsml_class_" + info.typename + ";";
			}
			for (var i = 0; i < localvarlist.length; i++) {
				info.localvarcode = info.localvarcode + "var " + localvarlist[i] + "=" + info.typename + "._$_local_" + info.typename + localvarlist[i] + ";";
			}

			context_enter();
			context.classinfo = info;
			info.classnodecontext = context;
			parse_process_class(node, info);
			context_leave();
		}

		function parse_create_instance(node) {
			var typename = jsml.translate_value(node.getAttribute("jsml-base")) || node.nodeName;
			if (jsml.debug) {
				if (node.nodeName != "object" && node.nodeName != typename)
					jsml.class_ensure(typename, node.nodeName);
				else
					jsml.class_ensure(typename, "jsml");
			}

			if (typename == "object")
				return jsml.handle_error("parse_create_instance", "<object/> element should include jsml-base attribute");

			var info = jsml._classes[typename];

			var neednewcls = false;

			foreach_subnode(node, function (subnode) {
				switch (subnode.nodeName) {
					case "constructor":
					case "method":
					case "property":
						neednewcls = true;
						break;
				}
			});

			var inst;

			if (neednewcls) {
				//var code="<"+node.nodeName;
				//for(var i=0;i<node.attributes.length;i++)
				//	code+=" "+node.attributes[i].nodeName+"='"+node.attributes[i].nodeValue+"'";
				//code+=">";
				//throw(new Error("don't allow auto class.."+code))

				info._autoclsindex = 1 + (info._autoclsindex || 0);
				var basename = typename;
				typename = typename + "_auto_" + info._autoclsindex;
				jsml.class_define(typename, basename);
				info = jsml._classes[typename];
				parse_process_class(node, info);
				inst = jsml.class_create_instance(typename);
				delete jsml._classes[typename];
				//parse_initialize_children be called in the new type constructor.
			}
			else {
				inst = jsml.class_create_instance(typename);

				inst._$_filevars = context.filevars;
				if (context.globalvars) inst._$_gvars = context.globalvars;
				parse_initialize_children(node, info, inst);
			}

			return inst;
		}

		function parse_include(node) {
			var url = node.getAttribute("src");
			url = jsml.translate_value(url);
			if (!url)
				return jsml.handle_error("parse_include", "<include> should contains src attribute");

			var xml = jsml.xmlfilemap[url];
			if (xml) {
				jsml.parse_xmldoc(xml.cloneNode(true), context.processinst, context.globalvars, context.self, context.translate_value);
				return;
			}

			var xh = jsml.xmlhttp();
			xh.open("GET", url, false);
			xh.send("");
			if (xh.status != 200)
				return jsml.handle_error("parse_include", "unable to load src " + url + ",http " + xh.status);
			if (!xh.responseXML)
				return jsml.handle_error("parse_include", "unable to load src " + url + ",invalid xml format");
			jsml.parse_xmldoc(xh.responseXML, context.processinst, context.globalvars, context.self, context.translate_value);
		}
		jsml.eval_execute = function (node) {
			var code = jsml.translate_value(jsml.get_node_innertext(node));
			if (context.globalvars) {
				var gcode = "";
				for (var p in context.globalvars)
					gcode += "var " + p + "=_$_gvars." + p + ";\r\n";
				code = gcode + code;
			}
			var func = new Function("_$_gvars,self,filevars", code);
			func.apply(context.self, [context.globalvars, context.self, context.filevars]);
		}
		jsml.parse_xmldoc = function (de, processinst, globalvars, self, translate_value) {
			jsml.suppend_layout();

			var oldctx = context;
			try {
				context = {};
				context.filevars = {};
				context.self = self;
				context.globalvars = globalvars;
				context.processinst = processinst;
				context.globalvarsinstcode = "";
				context.translate_value = translate_value || jsml.parse_xmldoc_translate_value;

				if (context.globalvars) {
					for (var p in context.globalvars) {
						context.globalvarsinstcode += "var " + p + "=this._$_gvars." + p + ";\r\n";
					}
				}

				de = de.documentElement || de;
				de = de.cloneNode(true);

				foreach_subnode(de, function (node) {
					if (node.nodeName == "jsml-def")
						return parse_root_def(node);
					if (node.nodeName == "execute")
						return jsml.eval_execute(node);
					if (node.nodeName == "include")
						return parse_include(node);
					if (node.nodeName == "object" || jsml._classes[node.nodeName]) {
						if (node.getAttribute("jsml-class"))
							return parse_create_class(node);
						var inst = parse_create_instance(node);
						if (processinst)
							processinst(inst);
						return inst;
					}
					jsml.handle_error("parse_xmldoc", "unknown element under root : '" + node.nodeName + "'");
				});
			}
			finally {
				context = oldctx;

				jsml.resume_layout();
			}
		}
	}


	new function () {
		var iebcborder = false;
		if (jsml.msie56789 && document.compatMode == "BackCompat")
			iebcborder = true;

		var FOUR_T = 0;
		var FOUR_R = 1;
		var FOUR_B = 2;
		var FOUR_L = 3;
		var zero_rect = [0, 0, 0, 0]
		jsml.get_zero_rect = function () {
			return zero_rect;
		}

		function tofourvalues(val) {
			if (typeof (val) == "number")
				return [val, val, val, val];
			if (typeof (val) != "string")
				return val;
			val = val.split(",");
			if (val.length == 1)
				return tofourvalues(parseInt(val[0]));
			for (var i = 0; i < val.length; i++)
				val[i] = parseInt(val[i]);
			return val;
		}

		jsml.dom_attach_event = function (dom, name, handler) {
			if (dom.attachEvent)
				dom.attachEvent("on" + name, handler);
			else
				dom.addEventListener(name, handler, false);
		}
		jsml.dom_detach_event = function (dom, name, handler) {
			if (dom.detachEvent)
				dom.detachEvent("on" + name, handler);
			else
				dom.removeEventListener(name, handler, false);
		}

		jsml.html_encode = function html_encode(text) {
			if (!text) return "";
			return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\x22/g, "&quot;")
				.replace(/\x27/g, "&#39;").replace(/\n/g, "<br/>").replace(/\r/g, "").replace(/\t/g, '&#32;&#32;&#32;&#32;').replace(/\s/g, "&#32;");
		}

		var tempdiv = document.createElement("DIV");
		tempdiv.setAttribute("contentEditable", "true");

		jsml.html_decode = function html_decode(html, pre) {
			if (!html) return "";
			html = html.replace(/\s+/g, ' ');
			tempdiv.style.whiteSpace = pre ? "pre" : "";
			tempdiv.innerHTML = html;
			var text = tempdiv.innerText || tempdiv.textContent || "";
			tempdiv.innerHTML = "";
			return text;
		}

		jsml.find_event = function () {
			if (window.event)
				return window.event;

			var loop = 0;
			var arr = [];
			for (var caller = jsml.find_event.caller; caller; caller = caller.caller) {
				for (var i = 0; i < arr.length; i++)
					if (arr[i] == caller)
						return;
				arr.push(caller);
				var e = caller.arguments[0];
				if (e && e.constructor == window.MouseEvent)
					return e;
			}
		}

		jsml.set_opacity = function (obj, opacity) {
			obj.style.filter = "alpha(opacity=" + opacity + ")";
			obj.style.opacity = String(opacity / 100);
			obj.style.mozOpacity = String(opacity / 100);
		}

		jsml.get_body_rect = function (win) {
			var rect = {};

			var doc = win ? win.document : window.document;

			var de = doc.documentElement || doc.body;

			if (doc.compatMode == "BackCompat") {
				rect.width = doc.body.clientWidth;
				rect.height = doc.body.clientHeight;
			}
			else {
				rect.width = de.clientWidth;
				rect.height = de.clientHeight;
			}

			rect.scrollWidth = Math.max(rect.width, Math.max(de.scrollWidth, doc.body.scrollWidth));
			rect.scrollHeight = Math.max(rect.height, Math.max(de.scrollHeight, doc.body.scrollHeight));

			rect.scrollTop = Math.max(de.scrollTop, doc.body.scrollTop);
			rect.scrollLeft = Math.max(de.scrollLeft, doc.body.scrollLeft);

			rect.top = rect.scrollTop;
			rect.left = rect.scrollLeft;

			rect.offsetWidth = rect.width;
			rect.offsetHeight = rect.height;
			rect.clientWidth = rect.width;
			rect.clientHeight = rect.height;

			return rect;
		}

		jsml.set_style_size_important = function (style, w, h) {
			if (style.setProperty) {
				style.setProperty("width", w, "important");
				style.setProperty("height", h, "important");
			}
			else if (style.cssText) {
				style.width = "";
				style.height = "";
				style.cssText += ";width:" + w + "!important;height:" + h + "!important";
			}
			else {
				style.width = w;
				style.height = h;
			}
		}

		jsml.textarea_command = function (box, cmd) {
			box.focus();
			document.execCommand(cmd);
		}
		jsml.textarea_getselection = function (box) {
			if (window.getSelection) {
				return [box.selectionStart, box.selectionEnd]
			}
			else {
				if (document.selection.type == 'Control')
					return [0, 0];
				var r = document.selection.createRange();
				var l = r.text.length;
				var p1 = 0;
				var p2 = 0;
				var rx = r.duplicate();
				try {
					rx.moveToElementText(box);
				}
				catch (x) {
					return [0, 0];
				}
				rx.collapse(true);
				for (var i = 0; i < l; i++) {
					rx.move('character', 1);
					if (rx.compareEndPoints("StartToStart", r) == 0)
						p1 = i;
					if (rx.compareEndPoints("EndToEnd", r) == 0)
						p2 = i;
				}
				return [p1, p2];
			}
		}
		jsml.textarea_setselection = function (box, arr) {
			if (window.getSelection) {
				box.selectionStart = arr[0];
				box.selectionEnd = arr[1];
			}
			else {
				box.focus();
				var r = document.selection.createRange();
				r.moveToElementText(box);
				r.collapse(true);
				var r1 = r.duplicate();
				var r2 = r.duplicate();
				r1.moveStart('character', arr[0]);
				r2.moveStart('character', arr[1]);
				r.setEndPoint('StartToStart', r1);
				r.setEndPoint('EndToEnd', r2);
				r.select();
				box.focus();
			}
		}
		jsml.textarea_selectall = function (box) {
			var txt = box.value;
			if (window.getSelection) {
				var txt = box.value;
				box.selectionStart = 0;
				box.selectionEnd = txt.length;
			}
			else {
				box.focus();
				var r = document.selection.createRange();
				r.moveToElementText(box);
				r.select();
				box.focus();
			}
		}
		jsml.textarea_getseltext = function (box) {
			if (window.getSelection) {
				var txt = box.value;
				return txt.substring(box.selectionStart, box.selectionEnd);
			}
			else {
				box.focus();
				var r = document.selection.createRange();
				return r.text;
			}
		}
		jsml.textarea_pastetext = function (box, val) {
			if (typeof (val) != "string") return;
			if (window.getSelection) {
				var txt = box.value;
				var p1 = box.selectionStart;
				var p2 = box.selectionEnd;
				var t1 = txt.substring(0, p1);
				var t2 = txt.substring(p2);
				txt = t1 + val + t2;
				box.value = txt;
				box.selectionStart = p1;
				box.selectionEnd = p1 + val.length;
			}
			else {
				box.focus();
				document.selection.clear();
				var r = document.selection.createRange();
				r.text = val;
				box.focus();
			}
		}
		jsml.textarea_collapse = function (box, bstart) {
			if (window.getSelection) {
				if (bstart)
					box.selectionEnd = box.selectionStart
				else
					box.selectionStart = box.selectionEnd
			}
			else {
				box.focus();
				var r = document.selection.createRange();
				if (r.text) {
					r.collapse(bstart);
					box.focus();
				}
			}
		}

		function createCaptrueDiv(cursor) {
			var div = document.createElement("DIV");
			var s = div.style;
			var r = jsml.get_body_rect();
			s.position = "absolute";
			s.zIndex = 7777777;
			s.top = "0px";
			s.left = "0px";
			s.width = r.scrollWidth + "px";
			s.height = r.scrollHeight + "px";
			if (cursor) s.cursor = cursor;
			document.body.insertBefore(div, document.body.firstChild);
			return div;
		}
		function removeCaptureDiv(div) {
			document.body.removeChild(div);
		}

		if (window.captureEvents)
			jsml.startcapture = function (movehandler, releasehandler, cursor, devent) {
				var istouch = devent && devent.type == "touchstart";
				var captrued;
				var me;
				if (!istouch)
					me = createCaptrueDiv(cursor);//document.compatMode=="BackCompat"?document.body:document.documentElement;
				else
					me = devent.target
				function handle_mouse_move(moveevent) {
					if (movehandler) movehandler(moveevent);
				}
				function handle_mouse_up(event) {
					captrued = false;
					me.removeEventListener("selectstart", jsml.cancel_default_function, true);
					if (istouch) {
						me.removeEventListener("touchmove", handle_mouse_move, true);
						me.removeEventListener("touchend", handle_mouse_up, true);
						me.removeEventListener("touchcancel", handle_mouse_up, true);
					}
					else {
						me.removeEventListener("mousemove", handle_mouse_move, true);
						me.removeEventListener("mouseup", handle_mouse_up, true);
					}
					if (!istouch)
						removeCaptureDiv(me);
					if (releasehandler)
						releasehandler();
				}
				me.addEventListener("selectstart", jsml.cancel_default_function, true);
				if (istouch) {
					me.addEventListener("touchmove", handle_mouse_move, true);
					me.addEventListener("touchend", handle_mouse_up, true);
					me.addEventListener("touchcancel", handle_mouse_up, true);
				}
				else {
					me.addEventListener("mousemove", handle_mouse_move, true);
					me.addEventListener("mouseup", handle_mouse_up, true);
				}
				captrued = true;
			}
		else
			jsml.startcapture = function (movehandler, releasehandler, cursor, eventtype) {
				var captrued;
				var me = createCaptrueDiv(cursor);//document.body;

				function ie_mouse_move() {
					if (movehandler) movehandler(window.event);
				}
				function ie_mouse_up() {
					me.releaseCapture();
					ie_losecapture()
				}
				function ie_losecapture() {
					if (captrued) {
						captrued = false;
						detach_events();
					}
				}
				function detach_events() {
					me.detachEvent("onselectstart", jsml.cancel_default_function);
					me.detachEvent("onmousemove", ie_mouse_move);
					me.detachEvent("onmouseup", ie_mouse_up);
					me.detachEvent("onlosecapture", ie_losecapture);
					removeCaptureDiv(me);
					if (releasehandler)
						releasehandler();
				}
				me.attachEvent("onselectstart", jsml.cancel_default_function);
				me.attachEvent("onmousemove", ie_mouse_move);
				me.attachEvent("onmouseup", ie_mouse_up);
				me.attachEvent("onlosecapture", ie_losecapture);
				me.setCapture();
				captrued = true;
			}


		var define = jsml.class_define("jsmldomevent");
		define.constructor(function (event) {
			this.event = event;
			for (var p in event) {
				var v;
				try {
					v = event[p];
				}
				catch (x) {
					continue;
				}
				if (typeof (v) == "function")
					this[p] = this._wrap_method(event, v);
				else
					this[p] = v;
			}
		});
		define.method("_wrap_method", function (event, func) {
			return function () {
				return func.apply(event, arguments);
			}
		});
		define.method("get_element", function () {
			return this.event.srcElement || this.event.target;
		});
		define.method("cancel", function () {
			var event = this.event;
			if (event.ctrlKey && event.shiftKey && event.altKey) return;
			if (event.preventDefault) event.preventDefault();
			if (event.stopPropagation) event.stopPropagation();
			event.cancelBubble = true;
			event.returnValue = false;
		});
		define.method("cancel_default", function () {
			if (this.event.preventDefault) this.event.preventDefault();
			this.event.returnValue = false;
		});

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \
			class-jsmlcontrol
		\ * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		var define = jsml.class_define("jsmlcontrol", "jsml");
		define.constructor(function (element) {
			this.jsml_constructor();

			if (element == null) element = document.createElement("DIV");

			this._element = element;
			//this._element.id="jsml_"+this.get_uid();
			this._estyle = this._element.style;
			this._estyle.overflow = "hidden";

			var bs = "content-box";
			if (element.nodeName == "BUTTON")
				bs = "border-box";

			this._estyle.boxSizing = bs;
			this._estyle.webkitBoxSizing = bs;
			this._estyle.mozBoxSizing = bs;


			this._top = 0;
			this._left = 0;
			this._right = 0;
			this._bottom = 0;
			this._width = 80;
			this._height = 22;
			this._dock = "none";

			this._domeventmap = {};
			this._domeventmap["contextmenu"] = "contextmenu";
			this._domeventmap["click"] = "click";
			this._domeventmap["touchstart"] = "touchstart";
			this._domeventmap["touchend"] = "touchend";
			this._domeventmap["touchmove"] = "touchmove";
			this._domeventmap["touchcancel"] = "touchcancel";
			this._domeventmap["dblclick"] = "dblclick";
			if (jsml.mobile) {

			}
			else {
				this._domeventmap["mousehover"] = "mouseover";
				this._domeventmap["mouseleave"] = "mouseout";
				this._domeventmap["mousemove"] = "mousemove";
			}
			this._domeventmap["mousedown"] = "mousedown";
			this._domeventmap["mouseup"] = "mouseup";
			this._domeventmap["keydown"] = "keydown";
			this._domeventmap["keyup"] = "keyup";
			this._domeventmap["keypress"] = "keypress";
			this._domeventmap["change"] = "change";
			if (jsml.firefox) {
				this._domeventmap["mousewheel"] = "DOMMouseScroll";
			}
			else {
				this._domeventmap["mousewheel"] = "mousewheel";
			}

			jsml.liveobjectcount++;

			if (jsml._headobject) {
				this._nextobject = jsml._headobject;
				jsml._headobject._prevobject = this;
			}
			jsml._headobject = this;
		});

		define.method("dispose", function () {
			if (this._disposebrvml) this._disposebrvml();

			if (this._domeventhandlers) {
				for (var domeventname in this._domeventhandlers) {
					var handler = this._domeventhandlers[domeventname];
					if (handler.attached) {
						jsml.dom_detach_event(this._element, domeventname, handler);
						handler.attached = false;
					}
				}
				this._domeventhandlers = null;
			}

			this._notvisible = true;

			this.set_parent(null);

			this.jsml_dispose();

			jsml.liveobjectcount--;
			if (this._nextobject)
				this._nextobject._prevobject = this._prevobject;
			if (this._prevobject)
				this._prevobject._nextobject = this._nextobject;
			else
				jsml._headobject = this._nextobject;
			this._nextobject = null;
			this._prevobject = null;

		});

		define.property("element", function () {
			return this._element;
		});

		define.method("_createdomeventhandler", function (name) {
			var self = this;
			return function (event) {
				event = window.event || event;
				self._handledomevent(name, event);
			};
		});
		define.method("_process_domevent", function (name, type) {
			if (!this._domeventhandlers) this._domeventhandlers = {};
			var handler = this._domeventhandlers[name];
			if (!handler) {
				handler = this._createdomeventhandler(name);
				this._domeventhandlers[name] = handler;
			}
			var el = this._element;
			var nm = this["_member_" + name];
			if (nm) el = this[nm] || this._element;

			if (type == "attach" && !handler.attached) {
				handler.attached = true;
				jsml.dom_attach_event(el, name, handler);
			}
			if (type == "detach" && handler.attached) {
				handler.attached = false;
				jsml.dom_detach_event(el, name, handler);
			}
			return handler;
		});
		define.method("_handledomevent", function (name, event) {
			var jsmleventname = this["_domtoevent" + name];
			if (jsmleventname) {
				jsml.suppend_layout();
				this.invoke_event(jsmleventname, jsml.new_jsmldomevent(event));
				jsml.resume_layout();
			}
		});
		define.method("jsml_oneventarray", function (name, type, arr, handler) {
			var domeventname = this._domeventmap[name];
			if (domeventname) {
				if (arr.length > 0) {
					if (type == "attach") {
						this["_domtoevent" + domeventname] = name;
						this._process_domevent(domeventname, "attach");
					}
				}
				else {
					if (type == "detach") {
						this._process_domevent(domeventname, "detach");
					}
				}
			}
		});

		define.method("_setresumehandler", function () {
			if (!this._delegateresumehandler)
				this._delegateresumehandler = this.delegate(this._runresumehandler);
			jsml.set_resume_handler(this.get_uid(), this._delegateresumehandler)
		});
		define.method("_runresumehandler", function () {
			this._applynewstyle();
			this.invoke_event("resumelayout");
		});
		define.method("_applynewstyle", function () {
			if (!this._newstyle) return;

			var newst = this._newstyle;
			this._newstyle = null;

			var w, h;
			var style = this._estyle;
			var setProperty = style.setProperty;
			for (var p in newst) {
				try {
					var v = newst[p] || "";
					if (style[p] == v)
						continue;
					if (v.indexOf('!important') == -1) {
						style[p] = v;
						continue;
					}
					v = v.replace('!important', '');
					if (setProperty) {
						style.setProperty(p, v, 'important');
					}
					else if (p == "width") {
						w = v;
					}
					else if (p == "height") {
						h = v;
					}
					else {
						style[p] = v;
					}
				}
				catch (x) {
					document.title = this + "," + p + "=" + v + "," + x.message
				}
			}
			if (w || h) {
				if (style.cssText) {
					if (w) style.width = "";
					if (h) style.height = "";
					style.cssText += (w ? (";width:" + w + "!important") : "") + (h ? (";height:" + h + "!important") : "");
				}
				else {
					if (w) style.width = w;
					if (h) style.height = h;
				}
			}
		});


		define.method("jsml_append", function () {
		});

		define.method("_setparentmode", function (mode) {
			if (this._parentmode == mode) return;

			this._parentmode = mode;
			if (mode == "dom" && this._dommode != 'absolute') {
				this._estyle.position = "relative";
				this._estyle.top = "";
				this._estyle.left = "";
			}
			else {
				this._estyle.position = "absolute";
				this._estyle.top = "0px";
				this._estyle.left = "0px";
			}
		});
		define.method("set_jsml_parent", function (p) {
			var oldp = this.get_jsml_parent();
			if (oldp == p)
				return;
			if (oldp)
				this._remove_parent();
			this.jsml_set_jsml_parent(p);
			this._setparentmode("ctl");
		});
		define.method("_remove_parent", function () {
			if (this._parentmode == "dom") {
				var pe = this._element.parentNode;
				if (pe != null)
					pe.removeChild(this._element);
				this._setparentmode();
				this._dom_attached = false;
				this.invoke_event("detach_dom");
			}
			else {
				var p = this.get_jsml_parent();
				if (p) {
					this.jsml_set_jsml_parent(null);
					p.remove_child(this);
					this._parentdata = null;
				}
			}
		});
		define.property("parent",
			function () {
				if (this._parentmode == "dom")
					return this._element.parentNode;
				return this.get_jsml_parent();
			}
			,
			function (obj, insertbefore) {
				if (obj == this.get_parent())
					return;
				this._remove_parent();
				if (!obj) return;
				if (typeof (obj) == "string") {
					var pe = document.getElementById(obj);
					if (pe != null)
						obj = pe;
					else
						jsml.handle_error("set_parent", "unknown element '" + obj + "'");
				}
				if (obj._jsml_info) {
					if (insertbefore && obj._childs)
						obj.insert_before(this, obj._childs[0]);
					else
						obj.append_child(this);
				}
				else {
					if (insertbefore && obj.firstChild)
						obj.insertBefore(this._element, obj.firstChild);
					else
						obj.appendChild(this._element);
					this._setparentmode("dom");
					this._dom_attached = true;
					this.invoke_event("attach_dom");
					this.invoke_notify_parent();
				}
			}
		);

		define.method("update_domlayout", function () {
			if (!this.get_parent()) return;
			this.internal_set_rect(null, null, this.get_demand_width(), this.get_demand_height());
		});
		define.method("update_foroffset", function (xy) {
			if (!this._count_set_rect) return;

			if (!this._newstyle) this._newstyle = {};
			if (xy == "x") {
				var x = this.get_matrix_x() + this.get_offset_x();
				this._newstyle.left = Math.floor((this._currl || 0) + x) + "px";
			}
			if (xy == "y") {
				var y = this.get_matrix_y() + this.get_offset_y();
				this._newstyle.top = Math.floor((this._currt || 0) + y) + "px";
			}
			this._setresumehandler();
		});
		define.method("update_formatrix", function (xy) {
			if (!this._count_set_rect) return;
			if (!this._newstyle) this._newstyle = {};
			if (xy == "x") {
				var x = this.get_matrix_x() + this.get_offset_x();
				this._newstyle.left = Math.floor((this._currl || 0) + x) + "px";
			}
			if (xy == "y") {
				var y = this.get_matrix_y() + this.get_offset_y();
				this._newstyle.top = Math.floor((this._currt || 0) + y) + "px";
			}
			this._setresumehandler();
		});
		define.method("internal_set_rect", function (l, t, w, h) {
			if (jsml.debug) jsml._count_internal_set_rect = 1 + (jsml._count_internal_set_rect || 0);

			if (!t && t !== null && t != 0) t = 0;
			if (!l && l !== null && l != 0) l = 0;
			if (w < 0) w = 0;
			if (h < 0) h = 0;


			if (this._max_width && w > this._max_width) w = this._max_width;
			if (this._max_height && h > this._max_height) h = this._max_height;

			//do not remove this line
			this._count_set_rect = 1 + (this._count_set_rect || 0);

			var moved = false;
			var resized = false;
			var border = this.get_outer_border_width();

			var x = this.get_offset_x() + this.get_matrix_x();
			var y = this.get_offset_y() + this.get_matrix_y();

			if (!this._newstyle) this._newstyle = {};
			if (l !== null && this._currl != l) {
				this._currl = l;
				this._newstyle.left = Math.floor(l + x) + "px";
				moved = true;
			}
			if (t !== null && this._currt != t) {
				this._currt = t;
				this._newstyle.top = Math.floor(t + y) + "px";
				moved = true;
			}
			if (this._currw != w) {
				this._currw = w;
				if (iebcborder)
					this._newstyle.width = Math.max(0, this._currw) + "px!important";
				else
					this._newstyle.width = Math.max(0, this._currw - border[FOUR_L] - border[FOUR_R]) + "px!important";
				resized = true;
			}
			if (this._currh != h) {
				this._currh = h;
				if (iebcborder)
					this._newstyle.height = Math.max(0, this._currh) + "px!important";
				else
					this._newstyle.height = Math.max(0, this._currh - border[FOUR_T] - border[FOUR_B]) + "px!important";
				resized = true;
			}

			this._updatevisibility();

			this._setresumehandler();

			if (moved) {
				this.invoke_event("move");
			}
			if (resized) {
				this.invoke_notify_content(true);
				this.invoke_event("resize");
			}
		});

		define.property("border_width",
			function () {
				return this._border || jsml.get_zero_rect();
			}
			,
			function (value) {
				this._border = tofourvalues(value);
				var str = this._border[FOUR_T] + "px " + this._border[FOUR_R] + "px " + this._border[FOUR_B] + "px " + this._border[FOUR_L] + "px";
				if (str == "0px 0px 0px 0px") str = "0px"
				else if (!this._border_style) this._estyle.borderStyle = "solid";
				if (!this._newstyle) this._newstyle = {};
				this._newstyle.borderWidth = str;
				if (this._currw && !iebcborder) this._newstyle.width = Math.max(0, this._currw - this._border[FOUR_L] - this._border[FOUR_R]) + "px!important";
				if (this._currh && !iebcborder) this._newstyle.height = Math.max(0, this._currh - this._border[FOUR_T] - this._border[FOUR_B]) + "px!important";
				this._setresumehandler();
				this.invoke_notify_content();
				this.invoke_event("set_border_width");
			}
		);
		define.method("get_outer_border_width", function () {
			return this._border || jsml.get_zero_rect();
		});

		define.property("border_color",
			function () {
				return this._border_color || ""
			}
			,
			function (value) {
				if (this._border_color == value) return;
				this._border_color = value || "";
				//try
				{
					if (jsml.msie6 && this._border_color == "transparent") {
						this._estyle.borderColor = "#fedcba";
						this._estyle.filter = "Chroma(Color=#fedcba)";
					}
					else {
						this._estyle.borderColor = this._border_color;
					}
				}
				//catch(x)
				{
				}
				this.invoke_event("set_border_color");
			}
		);

		define.property("offset_x",
			function () {
				return this._offset_x || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._offset_x == value) return;
				this._offset_x = value;
				this.update_foroffset("x");
			}
		);
		define.property("offset_y",
			function () {
				return this._offset_y || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._offset_y == value) return;
				this._offset_y = value;
				this.update_foroffset("y");
			}
		);

		define.property("matrix_x",
			function () {
				return this._matrix_x || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._matrix_x == value) return;
				this._matrix_x = value;
				this.update_formatrix("x");
			}
		);
		define.property("matrix_y",
			function () {
				return this._matrix_y || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._matrix_y == value) return;
				this._matrix_y = value;
				this.update_formatrix("y");
			}
		);

		define.property("top",
			function () {
				return this._top;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._posy == "top" && this._top == value) return;
				this._posy = "top";
				this._top = value;
				this.invoke_notify_parent();
				this.invoke_event("set_top");
			}
		);
		define.property("left",
			function () {
				return this._left;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._posx === "left" && this._left == value) return;
				this._posx = "left";
				this._left = value;
				this.invoke_notify_parent();
				this.invoke_event("set_left");
			}
		);
		define.property("right",
			function () {
				return this._right;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._posx === "right" && this._right == value) return;
				this._posx = "right";
				this._right = value;
				this.invoke_notify_parent();
				this.invoke_event("set_right");
			}
		);
		define.property("bottom",
			function () {
				return this._bottom;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._posy == "bottom" && this._bottom == value) return;
				this._posy = "bottom";
				this._bottom = value;
				this.invoke_notify_parent();
				this.invoke_event("set_bottom");
			}
		);
		define.property("width",
			function () {
				return this._width;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._width == value) return;
				this._width = value;
				this.invoke_notify_parent();
				this.invoke_event("set_width");
			}
		);
		define.property("height",
			function () {
				return this._height;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._height == value) return;
				this._height = value;
				this.invoke_notify_parent();
				this.invoke_event("set_height");
			}
		);

		define.property("dock",
			function () {
				return this._dock;
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._dock == value) return;
				switch (value) {
					case "top":
					case "left":
					case "right":
					case "bottom":
					case "fill":
					case "over":
					case "flow":
					case "none":
						this._dock = value;
						break;
					default:
						jsml.trace_warning("dock", "uknown value '" + value + "'");
						break;
				}
				this.invoke_notify_parent();
				this.invoke_event("set_dock");
			}
		);
		define.property("flow_clear",
			function () {
				return this._flow_clear || "none";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._flow_clear == value) return;
				switch (value) {
					case "none":
					case "both":
					case "prev":
					case "next":
					case "follow":
					case "newline":
						this._flow_clear = value;
						break;
					default:
						this._flow_clear = "none";
						break;
				}
				this.invoke_notify_parent();
				this.invoke_event("flow_clear");
			}
		);

		define.property("margin",
			function () {
				return this._margin || jsml.get_zero_rect();
			}
			,
			function (value) {
				this._margin = tofourvalues(value);
				this.invoke_notify_parent();
				this.invoke_event("set_margin");
			}
		);



		if (jsml.msie6)
			define.attach("attach_dom", function () {
				if (this._border_color == "transparent") {
					this._estyle.filter = "Chroma(Color=#fedcba)";
				}
			});


		if (jsml.msie10p)
			define.attach("attach_dom", function () {
				if (!jsml.enableieborderradius) return;

				var radius = this._element.currentStyle["-webkit-border-radius"];
				if (!radius || radius == "0px") return;

				this._estyle.borderRadius = radius;
			});

		if (jsml.msie && /MSIE [789]/.test(jsml.userAgent))
			define.attach("attach_dom", function () {
				if (!jsml.enableieborderradius) return;

				var radius = this._element.currentStyle["-webkit-border-radius"];
				if (!radius || radius == "0px") return;

				//this._estyle.borderRadius=radius;
				//if(!jsml.html5)this._estyle.behavior="url("+jsml.jsmlfolder+"/pie.htc)";
				//return;

				if (this._bradded) return;
				this._bradded = true;

				if (jsml.msienamespaces) {
					jsml.queue_resumehandler(this.delegate(function () {
						if (!jsml.vmladded) {
							if (!document.namespaces["vml"])
								document.namespaces.add('vml', 'urn:schemas-microsoft-com:vml', "#default#VML");
							jsml.vmladded = true;
						}

						if (this._jsml_disposed)
							return;
						this.setup_brvml(radius);
					}));
				}
			});



		if (jsml.msienamespaces)
			define.method("setup_brvml", function (radius) {
				var border = (this._border && this._border[0]) || 0;

				var es = this._estyle;
				var cs = this._element.currentStyle;
				var rs = this._element.runtimeStyle;

				//this._element.setAttribute("brinfo",[radius,border].join(","));

				var div = document.createElement("div")
				div.style.cssText = "position:absolute;display:block;padding:0px;border:0px;";
				this._element.insertAdjacentElement("BeforeBegin", div);

				var rect;

				var self = this;
				function onmove() {
					var t = (self._currt || 0);
					var l = (self._currl || 0);
					div.style.top = t - border + "px";
					div.style.left = l - border + "px";
				}
				function onresize() {
					var w = (self._currw || 0);
					var h = (self._currh || 0);
					if (w < 1 || h < 1) return;
					div.style.width = w + "px";
					div.style.height = h + "px";
					rect.style.top = "1px";
					rect.style.left = "1px";
					rect.style.width = w - border + "px";
					rect.style.height = h - border + "px";

					if (rect.fill.src) {
						rect.fill.position = (0.7 / w) + "," + (0.7 / h)
						rect.setAttribute("OK", rect.fill.position)
					}

					//rect.strokeweight="2px";
					w *= 99;
					h *= 99;
					rect.coordorig = "0,0"
					rect.coordsize = w + "," + h
					w -= 1;
					h -= 1;
					var xy = (parseInt(radius) || 3) * 50
					rect.path = "m 0," + xy + " l 0," + (h - xy) + " l " + xy + "," + h + " l " + (w - xy) + "," + h + " l " + w + "," + (h - xy) + " l " + w + "," + xy + " l " + (w - xy) + ",0 l " + xy + ",0 x e";


				}


				function redrawshape() {
					rect = document.createElement("vml:shape");
					rect.style.cssText = "position:absolute;display:block";

					rect.filled = false;

					es.borderColor = ''
					es.backgroundImage = ''
					es.backgroundColor = ''
					var bgc = cs.backgroundColor;
					if (bgc == "transparent") bgc = null;
					var bgi = cs.backgroundImage;
					if (bgi == "none") bgi = null;
					if (bgc || bgi) {
						rect.setAttribute("bg", bgc + "," + bgi);
						if (bgi) {
							rect.fill.type = "tile";
							rect.fill.position = "0.05,0.05"
							rect.fill.src = bgi.replace(/url\((.*)\)/, "$1").split('"').join("");
						}
						else if (bgc) {
							rect.fill.type = "solid"
							rect.fill.color = bgc;
						}

						rect.filled = true;
					}
					else {
						rect.filled = false;
					}
					es.backgroundImage = 'none'
					es.backgroundColor = 'transparent'

					var strokecolor = cs.borderLeftColor;
					if (strokecolor && strokecolor != 'transparent') {
						rect.strokecolor = strokecolor;
						rect.strokeweight = "1px";
					}
					else {
						rect.strokeweight = "0px";
						rect.stroked = false;
					}

					es.borderColor = 'transparent'

					div.innerHTML = "";
					div.appendChild(rect);
					onmove();
					onresize();
				}
				redrawshape();

				var timerid;
				this._element.onpropertychange = function (e) {
					if (window.event.propertyName != "className")
						return;
					clearTimeout(timerid);
					timerid = self.setDelegateTimeout(redrawshape, 0);
				}

				this.attach_event("move", onmove);
				this.attach_event("resize", onresize);


				this._disposebrvml = function () {
					if (!div) return;
					this.detach_event("move", onmove);
					this.detach_event("resize", onresize);
					this._element.onpropertychange = jsml.empty_function;
					clearTimeout(timerid);
					div.removeNode(true);
					div = null;
				}

			});

		define.property("border_style",
			function () {
				return this._border_style || "";
			}
			,
			function (value) {
				if (this._border_style == value) return;
				this._border_style = value || "";
				if (value && !this._border) this._estyle.borderWidth = "0px";
				//try
				{
					this._estyle.borderStyle = this._border_style;
				}
				//catch(x)
				{
				}
				this.invoke_event("set_border_style");
			}
		);

		define.property("unselectable",
			function () {
				return !!this._unselectable;
			}
			,
			function (value) {
				value = jsml.toboolean(value);
				if (this._unselectable == value) return;
				this._unselectable = value;
				var e = this._element;
				var f = jsml.cancel_default_function;
				if (this._unselectable) {
					e.setAttribute("unselectable", "on");
					if (e.onselectstart == null) e.onselectstart = f;
					if (e.ondragstart == null) e.ondragstart = f;
					if (e.onmousedown == null) e.onmousedown = f;
				}
				else {
					e.removeAttribute("unselectable");
					if (e.onselectstart == f) e.onselectstart = null;
					if (e.ondragstart == f) e.ondragstart = null;
					if (e.onmousedown == f) e.onmousedown = null;
				}
				this.invoke_event("set_unselectable");
			}
		);
		define.attach("disposing", function () {
			if (this._unselectable) {
				this._element.onselectstart = null;
				this._element.onmousedown = null;
			}
		});

		define.method("_updatevisibility", function () {
			var lv = this._lastvisibility || "";
			var cv = "";
			if (this._visibility == "hidden")
				cv = "hidden";
			else if ((this._currw || 0) <= 0 || (this._currh || 0) <= 0)
				cv = "hidden";
			else
				cv = "";
			if (cv != lv) {
				this._estyle.visibility = cv;
				this._lastvisibility = cv;
			}
		});

		define.property("visibility",
			function () {
				return this._visibility || "visible";
			}
			,
			function (value) {
				switch (value) {
					case "visible":
					case "hidden":
						break;
					default:
						value = "visible";
						break;
				}
				if ((this._visibility || "visible") == value)
					return;
				this._visibility = value;
				this._updatevisibility();
				this.invoke_event("set_visibility");
			}
		);

		define.property("visible",
			function () {
				return !this._notvisible;
			}
			,
			function (value) {
				value = !jsml.toboolean(value);
				if (this._notvisible == value) return;
				this._notvisible = value;
				if (this._notvisible)
					this._estyle.display = "none";
				else
					this._estyle.display = "";
				this.invoke_notify_parent('set_visible');
				this.invoke_event("set_visible");
				if (!this._notvisible) this.invoke_recursive("parent_visible");
			}
		);
		define.property("opacity",
			function () {
				return this._opacity || 100;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._opacity == value) return;
				this._opacity = value;
				jsml.set_opacity(this._element, this._opacity);
				this.invoke_event("set_opacity");
			}
		);

		define.property("text",
			function () {
				return this._text;
			}
			,
			function (value) {
				this._text = value;
				this.invoke_event("set_text");
			}
		);

		define.property("tooltip",
			function () {
				return this._tooltip || "";
			}
			,
			function (value) {
				this._tooltip = value || "";
				(this._innerelement || this._element).setAttribute("title", this._tooltip);
				this.invoke_event("set_tooltip");
			}
		);
		define.property("disabled",
			function () {
				return !!this._disabled;
			}
			,
			function (value) {
				value = jsml.toboolean(value);
				if (this._disabled == value) return;
				this._disabled = value;
				(this._innerelement || this._element).disabled = this._disabled;
				(this._innerelement || this._element).setAttribute("setdisabled", String(this._disabled));
				this.invoke_event("set_disabled");
			}
		);

		define.property("background",
			function () {
				return this._background || "";
			}
			,
			function (value) {
				if (this._background == value) return;
				this._background = value || "";
				//try
				{
					(this._innerelement || this._element).style.background = this._background;
				}
				//catch(x)
				{
				}
				this.invoke_event("set_background");
			}
		);
		define.property("back_color",
			function () {
				return this._back_color || "";
			}
			,
			function (value) {
				if (this._back_color == value) return;
				this._back_color = value || "";
				//try
				{
					(this._innerelement || this._element).style.backgroundColor = this._back_color;
				}
				//catch(x)
				{
				}
				this.invoke_event("set_back_color");
			}
		);
		define.property("text_color",
			function () {
				return this._text_color || "";
			}
			,
			function (value) {
				if (this._text_color == value) return;
				this._text_color = value || "";
				//try
				{
					(this._innerelement || this._element).style.color = this._text_color;
				}
				//catch(x)
				{
				}
				this.invoke_event("set_text_color");
			}
		);
		define.property("font_size",
			function () {
				return this._font_size || "";
			}
			,
			function (value) {
				if (this._font_size == value) return;
				this._font_size = value || "";
				//try
				{
					(this._innerelement || this._element).style.fontSize = this._font_size;
				}
				//catch(x)
				{
				}
				this.invoke_event("set_font_size");
			}
		);
		define.property("font",
			function () {
				return this._font || "";
			}
			,
			function (value) {
				if (this._font == value) return;
				this._font = value || "";
				try {
					(this._innerelement || this._element).style.font = this._font;
				}
				catch (x) {
				}
				this.invoke_event("set_font");
			}
		);
		define.property("cursor",
			function () {
				return this._cursor || "";
			}
			,
			function (value) {
				this._cursor = value || "";
				try {
					(this._innerelement || this._element).style.cursor = this._cursor;
				}
				catch (x) {
				}
				this.invoke_event("set_cursor");
			}
		);
		define.property("css_class",
			function () {
				return this._css_class || "";
			}
			,
			function (value) {
				value = String(value || "");
				if (value.charAt(0) == "+") {
					this.toggle_css_class(value.substring(1), true);
					return;
				}
				this._css_class = value;
				this.update_css_class();
				this.invoke_event("set_css_class");
			}
		);
		define.method("update_css_class", function () {
			var cls = this._css_class;
			if (this._css_classes) {
				cls = (cls ? (cls + " ") : "") + this._css_classes.join(" ");
				//cls=this._css_classes.join(" ")+(cls?(" "+cls):"");
			}
			var node = (this._innerelement || this._element);
			if (cls) {
				if (node.className != cls)
					node.className = cls;
			}
			else {
				if (node.className)
					node.removeAttribute("class");
			}
		});
		define.method("toggle_css_class", function (cls, addit) {
			var arr = this._css_classes;

			if (arr == null) {
				if (addit == null || addit) {
					this._css_classes = [cls];
					this.update_css_class();
				}
				return;
			}

			if (addit) {
				//add
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == cls)
						return;
				}
				arr.push(cls);
			}
			else {
				var hasval = false;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] != cls)
						continue;
					arr.splice(i, 1);
					hasval = true;
					i--;
				}

				if (addit == null) {
					//toggle
					if (!hasval)
						arr.push(cls);
				}
				else {
					//remove
					if (!hasval)
						return;
				}
			}
			this.update_css_class();
		});

		function fillcsstext(m, text) {
			if (!text) return;
			var arr = text.split(';')
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				var pos = item.indexOf(':');
				if (pos == -1)
					continue;
				var n = item.substring(0, pos).replace(/(^\s*)|(\s*$)/g, "").toLowerCase();
				m[n] = item.substring(pos + 1);
			}
		}
		function loadcsstext(m) {
			var arr = [];
			for (var p in m) {
				arr.push(p + ':' + m[p]);
			}
			return arr.join(';');
		}

		define.property("css_text",
			function () {
				return this._css_text || "";
			}
			,
			function (value) {
				this._css_text = value || "";
				//try
				{
					var s = (this._innerelement || this._element).style;
					var m = {};
					fillcsstext(m, s.cssText);
					fillcsstext(m, this._css_text);
					s.cssText = loadcsstext(m);
				}
				//catch(x)
				{
				}
				this.invoke_event("set_css_text");
			}
		);

		define.property("horizontal_align",
			function () {
				return this._horizontal_align || "left";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._horizontal_align == value) return;
				switch (value) {
					case "left":
					case "right":
					case "center":
						this._horizontal_align = value;
						break;
					default:
						this._horizontal_align = "center";
						break;
				}
				this.invoke_notify_content();
				this.invoke_event("set_horizontal_align");
			}
		);
		define.property("vertical_align",
			function () {
				return this._vertical_align || "top";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._vertical_align == value) return;
				switch (value) {
					case "top":
					case "bottom":
					case "middle":
						this._vertical_align = value;
						break;
					default:
						this._vertical_align = "middle";
						break;
				}
				this.invoke_notify_content();
				this.invoke_event("set_vertical_align");
			}
		);

		define.property("overflow",
			function (deep) {
				if (!deep) return this._overflow || "none";
				if (!this._overflow) return "none";
				switch (this._overflow) {
					case "none":
					case "visible":
					case "scroll":
						return this._overflow;
					case "default":
						break;
					default:
						return "none";
				}
				return "none";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._overflow == value) return;
				switch (value) {
					case "none":
					case "visible":
					case "scroll":
					case "default":
						this._overflow = value;
						break;
					default:
						this._overflow = "none";
						break;
				}
				this.invoke_notify_parent();
				this.invoke_event("set_overflow");
			}
		);
		define.property("overflow_x",
			function (deep) {
				switch (this._overflow_x) {
					case "none":
					case "visible":
					case "scroll":
						return this._overflow_x;
				}
				if (!deep) return "default";
				switch (this._overflow) {
					case "none":
					case "visible":
					case "scroll":
						return this._overflow;
				}
				if (this._dock == "top" || this._dock == "bottom")
					return "visible";
				return this.get_overflow("x");
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._overflow_x == value) return;
				switch (value) {
					case "none":
					case "visible":
					case "scroll":
					case "default":
						this._overflow_x = value;
						break;
					default:
						this._overflow_x = "none";
						break;
				}
				this.invoke_notify_content();
				//this.invoke_notify_parent();
				this.invoke_event("set_overflow_x");
			}
		);
		define.property("overflow_y",
			function (deep) {
				switch (this._overflow_y) {
					case "none":
					case "visible":
					case "scroll":
						return this._overflow_y;
				}
				if (!deep) return "default";
				switch (this._overflow) {
					case "none":
					case "visible":
					case "scroll":
						return this._overflow;
				}
				if (this._dock == "left" || this._dock == "right")
					return "visible";
				return this.get_overflow("y");
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._overflow_y == value) return;
				switch (value) {
					case "none":
					case "visible":
					case "scroll":
					case "default":
						this._overflow_y = value;
						break;
					default:
						this._overflow_y = "none";
						break;
				}
				this.invoke_notify_content();
				//this.invoke_notify_parent();
				this.invoke_event("set_overflow_y");
			}
		);
		define.method("_overflowisvisible", function () {
			if (this._overflow_x == "visible" || this._overflow_y == "visible" || this._overflow == "visible")
				return true;
			return false;
		});

		define.property("min_width",
			function () {
				return this._min_width || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._min_width == value) return;
				this._min_width = value;
				this.invoke_notify_parent();
				this.invoke_event("set_min_width");
			}
		);
		define.property("min_height",
			function () {
				return this._min_height || 0;
			}
			,
			function (value) {
				value = jsml.tonumber(value, 0)
				if (this._min_height == value) return;
				this._min_height = value;
				this.invoke_notify_parent();
				this.invoke_event("set_min_height");
			}
		);
		define.property("max_width",
			function () {
				return this._max_width || -1;
			}
			,
			function (value) {
				value = jsml.tonumber(value, -1);
				if (this._max_width == value) return;
				this._max_width = value;
				this.invoke_notify_parent();
				this.invoke_event("set_max_width");
			}
		);
		define.property("max_height",
			function () {
				return this._max_height || -1;
			}
			,
			function (value) {
				value = jsml.tonumber(value, -1);
				if (this._max_height == value) return;
				this._max_height = value;
				this.invoke_notify_parent();
				this.invoke_event("set_max_height");
			}
		);
		define.method("invoke_recursive", function () {
			this.invoke_event.apply(this, arguments);
		});
		define.method("notify_recursive", function (cmd, args) {
		});

		define.method("get_demand_content_width", function () {
			return 0;
		});
		define.method("get_demand_content_height", function () {
			return 0;
		});
		define.method("get_demand_width", function (availwidth) {
			var w = this.get_width();
			if (this.get_overflow_x(true) != "none") {
				var border = this.get_outer_border_width();
				var padding = this._padding || jsml.get_zero_rect();
				w = Math.max(w, this.get_demand_content_width(availwidth) + border[FOUR_L] + border[FOUR_R] + padding[FOUR_L] + padding[FOUR_R]);
			}
			w = Math.max(this.get_min_width(), w);
			var m = this.get_max_width();
			if (m > -1) w = Math.min(m, w);
			return w;
		});
		define.method("get_demand_height", function () {
			var h = this.get_height();
			if (this.get_overflow_y(true) != "none") {
				var border = this.get_outer_border_width();
				var padding = this._padding || jsml.get_zero_rect();
				h = Math.max(h, this.get_demand_content_height() + border[FOUR_T] + border[FOUR_B] + padding[FOUR_T] + padding[FOUR_B]);
			}
			h = Math.max(this.get_min_height(), h);
			var m = this.get_max_height();
			if (m > -1) h = Math.min(m, h);
			return h;
		});
		define.method("get_current_width", function () {
			return this._currw || 0;
		});
		define.method("get_current_height", function () {
			return this._currh || 0;
		});
		define.method("get_current_top", function () {
			var p = this.get_jsml_parent();
			if (!p)
				return this.get_top();
			return this._currt || 0;
		});
		define.method("get_current_left", function () {
			var p = this.get_jsml_parent();
			if (!p)
				return this.get_left();
			return this._currl || 0;
		});
		define.method("get_current_right", function () {
			var p = this.get_jsml_parent();
			if (p)
				return p.get_client_width() - (this._currl || 0) - (this._currw || 0);
			return 0;
		});
		define.method("get_current_bottom", function () {
			var p = this.get_jsml_parent();
			if (p)
				return p.get_client_height() - (this._currt || 0) - (this._currh || 0);
			return 0;
		});
		define.method("get_client_offset_width", function (obj) {
			var border = this.get_outer_border_width();
			return this.get_current_width() - border[FOUR_L] - border[FOUR_R];
		});
		define.method("get_client_offset_height", function (obj) {
			var border = this.get_outer_border_width();
			return this.get_current_height() - border[FOUR_T] - border[FOUR_B];
		});
		define.method("get_client_width", function (obj) {
			var border = this.get_outer_border_width();
			var padding = this._padding || jsml.get_zero_rect();
			return this.get_current_width() - border[FOUR_L] - border[FOUR_R] - padding[FOUR_L] - padding[FOUR_R];
		});
		define.method("get_client_height", function (obj) {
			var border = this.get_outer_border_width();
			var padding = this._padding || jsml.get_zero_rect();
			return this.get_current_height() - border[FOUR_T] - border[FOUR_B] - padding[FOUR_T] - padding[FOUR_B];
		});

		define.method("invoke_notify_parent", function (from) {
			if (this._notvisible && from != 'set_visible') return;

			//this.invoke_event("notify_parent");
			var p = this.get_jsml_parent();
			if (p)
				p.invoke_notify_content();
			else
				this.update_domlayout();
		});
		define.method("invoke_notify_content", function (resizeByParent) {
			if (this._notvisible) return;

			//this.invoke_event("notify_content");

			if (resizeByParent) {
				return;
			}

			//if change property , let parent know
			var p = this.get_jsml_parent();
			if (p) {
				if (this._overflowisvisible()) {
					this.invoke_notify_parent();
				}
			}
			else {
				this.update_domlayout();
			}
		});

		define.method("start_move_offset", function (devent, updatecallback) {
			var self = this;

			var istouch = devent.type == "touchstart";


			var _x = istouch ? devent.touches[0].clientX : devent.clientX;
			var _y = istouch ? devent.touches[0].clientY : devent.clientY;
			var ox = this.get_offset_x();
			var oy = this.get_offset_y();

			function update_position(moveevent) {
				if (self._jsml_disposed) return;

				var p = self.get_jsml_parent();
				if (p) {
					var dock = self.get_dock();
					switch (dock) {
						case "none":
							break;
						default:
							return;
					}
				}

				var x = istouch ? moveevent.touches[0].clientX : moveevent.clientX;
				var y = istouch ? moveevent.touches[0].clientY : moveevent.clientY;

				jsml.suppend_layout();
				self.set_offset_x(ox + x - _x);
				self.set_offset_y(oy + y - _y);
				jsml.resume_layout();

				if (updatecallback) updatecallback();
			}

			jsml.startcapture(update_position, null, jsml.get_current_style(self._element, "cursor"), devent);

			if (devent.cancel_default) devent.cancel_default();
		});
		define.method("start_resize", function (devent, ft, fr, fb, fl, minsize, callback) {
			var self = this;

			if (typeof (minsize) == "undefined") minsize = 120;

			var _x = devent.clientX;
			var _y = devent.clientY;
			var t = this.get_top();
			var l = this.get_left();
			var ox = this.get_offset_x();
			var oy = this.get_offset_y();
			var w = this.get_width();
			var h = this.get_height();

			function update_position(moveevent) {
				if (self._jsml_disposed) return;

				var x = moveevent.clientX;
				var y = moveevent.clientY;

				var ha = "left";
				var va = "top";

				var p = self.get_jsml_parent();
				if (p) {
					var dock = self.get_dock();
					switch (dock) {
						case "fill":
						case "over":
							return;
						case "top":
						case "bottom":
							fl = 0;
							fr = 0;
							break;
						case "left":
						case "right":
							ft = 0;
							fb = 0;
							break;
						default:
							ha = p.get_horizontal_align();
							va = p.get_vertical_align();
							break;
					}
				}

				jsml.suppend_layout();
				if (fl) {
					var nl = l + x - _x;
					var nw = w + _x - x;
					if (nw < minsize) {
						nl = nl - minsize + nw;
						nw = minsize;
					}
					self.set_left(nl);
					self.set_width(nw);
				}
				if (ft) {
					var nt = t + y - _y;
					var nh = h + _y - y;
					if (nh < minsize) {
						nt = nt - minsize + nh;
						nh = minsize;
					}
					self.set_top(nt);
					self.set_height(nh);
				}
				if (fr) {
					var nw = w + x - _x;
					if (ha == "center") {
						var nx = ox + (x - _x) / 2;
						if (nw < minsize) {
							nx = nx + (minsize - nw) / 2;
							nw = minsize;
						}
						self.set_offset_x(nx);
					}
					else if (ha == "right") {
						var nx = ox + (x - _x);
						if (nw < minsize) {
							nx = nx + (minsize - nw);
							nw = minsize;
						}
						self.set_offset_x(nx);
					}
					else {
						if (nw < minsize) {
							nw = minsize;
						}
					}
					self.set_width(nw);
				}
				if (fb) {
					var nh = h + y - _y;
					if (va == "middle") {
						var ny = oy + (y - _y) / 2;
						if (nh < minsize) {
							ny = ny + (minsize - nh) / 2;
							nh = minsize;
						}
						self.set_offset_y(ny);
					}
					else if (va == "bottom") {
						var ny = oy + (y - _y);
						if (nh < minsize) {
							ny = ny + (minsize - nh);
							nh = minsize;
						}
						self.set_offset_y(ny);
					}
					else {
						if (nh < minsize) {
							nh = minsize;
						}
					}
					self.set_height(nh);
				}

				jsml.resume_layout();
			}

			if (devent.cancel_default) devent.cancel_default();

			jsml.startcapture(update_position, callback, jsml.get_current_style(devent.srcElement || self._element, "cursor"), devent);

		});

		define.method("find_child", function (id, rec) {
			if (!this._childs || this._childs.length == 0)
				return;
			for (var i = 0; i < this._childs.length; i++) {
				if (this._childs[i].get_id() == id)
					return this._childs[i];
			}
			if (rec) {
				for (var i = 0; i < this._childs.length; i++) {
					var child = this._childs[i].find_child(id, rec);
					if (child)
						return child;
				}
			}
		});
		define.method("find_element", function (id) {
			function find_element(node, id) {
				if (node.id == id)
					return node;
				var ns = node.childNodes;
				if (!ns)
					return null;
				for (var i = 0; i < ns.length; i++) {
					var e = find_element(ns.item(i), id);
					if (e)
						return e;
				}
				return null;
			}
			return find_element(this._element, id);
		});
		define.method("find_parent", function (type) {
			for (var p = this.get_jsml_parent() ; p != null; p = p.get_jsml_parent()) {
				if (p.is_jsml_type(type))
					return p;
			}
			return null;
		});


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \
			class-jsmlcomplexcontrol
		\ * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


		var define = jsml.class_define("jsmlcomplexcontrol", "jsmlcontrol");
		define.method("dispose_children", function () {
			if (this._childs) {
				jsml.suppend_layout();
				while (this._childs.length)
					this._childs[0].dispose();
				this._childs = null;
				jsml.resume_layout();
			}
		});
		define.method("dispose", function () {
			if (this._childs) {
				jsml.suppend_layout();
				while (this._childs.length)
					this._childs[0].dispose();
				this._childs = null;
				jsml.resume_layout();
			}

			if (this._scroll_bar_y) {
				this._scroll_bar_y.dispose();
				this._scroll_bar_y = null;
			}

			this.jsmlcontrol_dispose();
		});
		define.property("content_element", function () {
			return this._element;
		});
		define.method("append_child_element", function (child, before) {
			if (before)
				this._element.insertBefore(child, before);
			else if (this._scroll_init_y)
				this._element.insertBefore(child, this._scroll_bar_y._element);
			else
				this._element.appendChild(child);
		});
		define.property("content_flow",
			function () {
				return this._content_flow || "left";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				switch (value) {
					case "left":
					case "right":
					case "bottomleft":
					case "bottomright":
					case "uptoleft":
					case "downtoleft":
					case "uptoright":
					case "downtoright":
						break;
					default:
						value = "left";
						break;
				}
				if (this._content_flow == value) return;
				this._content_flow = value;
				this.invoke_notify_content();
				this.invoke_event("set_content_flow");
			}
		);
		define.property("padding",
			function () {
				return this._padding || jsml.get_zero_rect();
			}
			,
			function (value) {
				this._padding = tofourvalues(value);
				this.invoke_notify_content();
				this.invoke_event("set_padding");
			}
		);
		define.method("invoke_recursive", function () {
			this.invoke_event.apply(this, arguments);
			if (!this._childs || this._childs.length == 0)
				return;
			for (var i = 0; i < this._childs.length; i++)
				this._childs[i].invoke_recursive.apply(this._childs[i], arguments);
		});
		define.method("notify_recursive", function (cmd, args) {
			if (!this._childs || this._childs.length == 0)
				return;
			for (var i = 0; i < this._childs.length; i++)
				this._childs[i].notify_recursive(cmd, args);
		});
		define.method("get_children", function (obj) {
			return this._childs || [];
		});
		define.method("get_child_index", function (obj) {
			if (!this._childs) return -1;
			for (var i = 0; i < this._childs.length; i++)
				if (this._childs[i] == obj)
					return i;
			return -1;
		});
		define.method("jsml_append", function (obj) {
			this.append_child(obj);
		});
		define.attach("attach_dom", function () {
			if (!this._childs || this._childs.length == 0)
				return;
			for (var i = 0; i < this._childs.length; i++) {
				this._childs[i]._dom_attached = true;
				this._childs[i].invoke_event("attach_dom");
			}
		});
		define.attach("detach_dom", function () {
			if (!this._childs || this._childs.length == 0)
				return;
			for (var i = 0; i < this._childs.length; i++) {
				this._childs[i]._dom_attached = false;
				this._childs[i].invoke_event("detach_dom");
			}
		});
		define.method("remove_child", function (obj) {
			if (!this._childs || this._childs.length == 0)
				return;//error?
			obj.set_jsml_parent(null);
			for (var i = 0; i < this._childs.length; i++) {
				if (this._childs[i] == obj) {
					this._childs.splice(i, 1);
					if (obj._element.parentNode != null)
						obj._element.parentNode.removeChild(obj._element);
					if (this._dom_attached)
						obj.invoke_event("detach_dom");
					obj.invoke_event("detach_parent");
					break;
				}
			}

			if (jsml._disposingall)
				return;

			this.invoke_notify_content();
		});
		define.method("append_child", function (obj, pos) {
			obj.set_jsml_parent(this);
			if (!this._childs) this._childs = [];
			if (typeof (pos) == "number" && pos > -1) {
				this.append_child_element(obj._element, this._childs[pos]._element);
				this._childs.splice(pos, 0, obj);
			}
			else {
				this.append_child_element(obj._element);
				this._childs.push(obj);
			}
			if (this._dom_attached) {
				obj._dom_attached = true;
				obj.invoke_event("attach_dom");
			}
			obj.invoke_event("attach_parent");
			this.invoke_notify_content();
		});
		define.method("insert_before", function (obj, another) {
			if (!another)
				return this.append_child(obj);
			return this.append_child(obj, this.get_child_index(another));
		});
		define.method("insert_after", function (obj, another) {
			if (!another)
				return this.append_child(obj);
			var index = this.get_child_index(another);
			if (index > -1 && index + 1 < this._childs.length)
				return this.append_child(obj, index + 1);
			return this.append_child(obj);
		});


		define.method("_handle_mousewheel", function (jevent, event) {
			if (!this._scroll_init_y) return;
			var offset = event.wheelDelta ? Math.floor(event.wheelDelta / 5) : Math.floor(-event.detail * 8);
			if (!offset) return;
			offset = offset * 3;
			var oldy = this._scroll_y;
			var newy = this._scroll_y - offset;
			newy = Math.min(newy, this._scroll_max_y);
			newy = Math.max(newy, 0);
			if (oldy != newy) {
				this._scroll_bar_y.set_value(newy)
				event.cancel();
			}
			else if (!this._passwheel) {
				event.cancel()
			}
		});
		define.method("set_scrolly", function (newy) {
			if (this._scroll_bar_y) this._scroll_bar_y.set_value(newy);
			else this.set_scrolly_impl(newy);
		});
		define.method("_handle_scrollbar_y", function (jevent, newy) {
			this.set_scrolly_impl(newy);
		});
		define.method("set_scrolly_impl", function (newy) {
			var oldy = this._scroll_y;
			newy = Math.min(newy, this._scroll_max_y);
			newy = Math.max(newy, 0);
			newy = Math.floor(newy);
			if (oldy == newy)
				return;
			this._scroll_y = newy;

			if (this._childs) {
				for (var i = 0; i < this._childs.length; i++) {
					var ctrl = this._childs[i];
					ctrl.internal_set_rect(ctrl._currl, ctrl._currt + oldy - newy, ctrl._currw, ctrl._currh);
				}
			}
			this.invoke_event("scroll");
		});

		define.method("set_scrollx", function (newx) {
			if (this._scroll_bar_x) this._scroll_bar_x.set_value(newx)
			else this.set_scrollx_impl(newx);
		});
		define.method("_handle_scrollbar_x", function (jevent, newx) {
			this.set_scrollx_impl(newx);
		});
		define.method("set_scrollx_impl", function (newx) {
			var oldx = this._scroll_x;

			newx = Math.min(newx, this._scroll_max_x);
			newx = Math.max(newx, 0);
			newx = Math.floor(newx);
			if (oldx == newx)
				return;
			this._scroll_x = newx;
			if (this._childs) {
				for (var i = 0; i < this._childs.length; i++) {
					var ctrl = this._childs[i];
					ctrl.internal_set_rect(ctrl._currl + oldx - newx, ctrl._currt, ctrl._currw, ctrl._currh);
				}
			}
			this.invoke_event("scroll");
		});

		define.method("scroll_touch_init", function () {
			var data = this._scrolltouchdata = {};
			var cx, sx, lx, tx;
			this._scroll_x = 0;
			var cy, sy, ly, ty;
			this._scroll_y = 0;
			var tt;
			var halftime = 50;
			data.touchstart = this.delegate(function (e) {
				clearTimeout(data.nexttimer);

				cx = e.touches[0].clientX;
				cy = e.touches[0].clientY;
				lx = cx;
				ly = cy;
				tx = 0;
				ty = 0;
				tt = new Date().getTime();
				sx = this._scroll_x;
				sy = this._scroll_y;
			});
			data.touchmove = this.delegate(function (e) {
				clearTimeout(data.nexttimer);

				if (e.touches.length == 2)
					return;
				if (this._scroll_max_x <= 0 && this._scroll_max_y <= 0)
					return;

				e.preventDefault();

				var x = e.touches[0].clientX;
				tx += (x - lx) * Math.pow(2, (new Date().getTime() - tt) / halftime);
				lx = x;
				this.set_scrollx_impl(sx + cx - x);

				var y = e.touches[0].clientY;
				ty += (y - ly) * Math.pow(2, (new Date().getTime() - tt) / halftime);
				ly = y;
				this.set_scrolly_impl(sy + cy - y);
			});
			data.touchend = this.delegate(function (e) {
				clearTimeout(data.nexttimer);

				var sx = this._scroll_x;
				var sy = this._scroll_y;

				var mx = tx / Math.pow(2, (new Date().getTime() - tt) / halftime);
				var my = ty / Math.pow(2, (new Date().getTime() - tt) / halftime);

				mx = mx * 3;
				my = my * 3;

				function nextmxy() {
					if (Math.abs(mx) < this._scroll_max_x / 50 && Math.abs(my) < this._scroll_max_y / 50)
						return;

					data.nexttimer = this.setDelegateTimeout(nextmxy, 50);

					mx = mx * 0.8;
					sx -= mx / 2;
					this.set_scrollx_impl(sx);

					my = my * 0.8;
					sy -= my / 2;
					this.set_scrolly_impl(sy);
				}
				data.nexttimer = this.setDelegateTimeout(nextmxy, 50);
			});

			this._element.addEventListener("touchstart", data.touchstart, false);
			this._element.addEventListener("touchmove", data.touchmove, false);
			this._element.addEventListener("touchend", data.touchend, false);
			this._element.addEventListener("touchcancel", data.touchend, false);


		});
		define.method("scroll_touch_uninit", function () {
			data = this._scrolltouchdata;
			this._scrolltouchdata = null;
			this._element.removeEventListener("touchstart", data.touchstart, false);
			this._element.removeEventListener("touchmove", data.touchmove, false);
			this._element.removeEventListener("touchend", data.touchend, false);
			this._element.removeEventListener("touchcancel", data.touchend, false);
		});

		define.method("update_sublayout_core", function () {
			//this._count_update_sublayout_core=1+(this._count_update_sublayout_core||0);
			//this._element.setAttribute("_count_update_sublayout_core",this._count_update_sublayout_core);
			//jsml._count_update_sublayout_core=1+(jsml._count_update_sublayout_core||0);
			//document.title=jsml._count_update_sublayout_core


			this._calculate_content_size();

			var cw = this.get_client_offset_width();
			var ch = this.get_client_offset_height();

			var _sw = cw;	//scroll w
			var _sh = ch;	//scroll h

			var padding = this._padding || jsml.get_zero_rect();
			var dl = padding[FOUR_L];
			var dt = padding[FOUR_T];

			var smx = this.get_overflow_x(true);
			var smy = this.get_overflow_y(true);

			if (jsml.mobile) {
				if (smx == "scroll" || smy == "scroll") {
					if (!this._scrolltouchdata)
						this.scroll_touch_init();

					_sw = Math.max(cw, this.get_demand_content_width() + padding[FOUR_L] + padding[FOUR_R]);
					this._scroll_max_x = Math.max(0, _sw - cw);
					this._scroll_x = Math.min(this._scroll_x, this._scroll_max_x);

					_sh = Math.max(ch, this.get_demand_content_height() + padding[FOUR_T] + padding[FOUR_B]);
					this._scroll_max_y = Math.max(0, _sh - ch);
					this._scroll_y = Math.min(this._scroll_y, this._scroll_max_y);
				}
				else {
					if (this._scrolltouchdata)
						this.scroll_touch_uninit();
				}
			}
			else {
				if (smx == "scroll") {
					if (!this._scroll_init_x) {
						this._scroll_init_x = true;
						this._scroll_x = 0;
						this._scroll_bar_x = jsml.new_jsmlscrollbarx();
						this._scroll_bar_x.set_parent(this._element);
						this._element.appendChild(this._scroll_bar_x._element);
					}
					_sw = Math.max(cw, this.get_demand_content_width() + padding[FOUR_L] + padding[FOUR_R]);
					this._scroll_max_x = Math.max(0, _sw - cw);
					this._scroll_x = Math.min(this._scroll_x, this._scroll_max_x);
					dl = dl - this._scroll_x;

					var sbstyle = this._scroll_bar_x._estyle;
					sbstyle.position = "absolute";
					sbstyle.left = "0px";
					sbstyle.top = ch - 16 + "px";
					this._scroll_bar_x.set_height(16);
					this._scroll_bar_x.set_width(cw);
					this._scroll_bar_x.set_data(cw, _sw, this._scroll_x);
					this._scroll_bar_x.attach_event("set_value", this.delegate(this._handle_scrollbar_x));
				}
				else if (this._scroll_init_x) {
					this._scroll_bar_x.dispose();
					this._scroll_bar_x = null;
					this._scroll_init_x = false;
				}

				if (smy == "scroll" && !jsml.mobile) {
					if (!this._scroll_init_y) {
						this._scroll_init_y = true;
						this._scroll_y = 0;
						this.attach_event("mousewheel", this._handle_mousewheel);
						this._scroll_bar_y = jsml.new_jsmlscrollbary();
						this._scroll_bar_y.set_parent(this._element);
						this._element.appendChild(this._scroll_bar_y._element);
					}
					_sh = Math.max(ch, this.get_demand_content_height() + padding[FOUR_T] + padding[FOUR_B]);
					this._scroll_max_y = Math.max(0, _sh - ch);
					this._scroll_y = Math.min(this._scroll_y, this._scroll_max_y);
					dt = dt - this._scroll_y;

					var sbstyle = this._scroll_bar_y._estyle;
					sbstyle.position = "absolute";
					sbstyle.top = "0px";
					sbstyle.left = cw - 16 + "px";
					this._scroll_bar_y.set_width(16);
					this._scroll_bar_y.set_height(ch);
					this._scroll_bar_y.set_data(ch, _sh, this._scroll_y);
					this._scroll_bar_y.attach_event("set_value", this.delegate(this._handle_scrollbar_y));
				}
				else if (this._scroll_init_y) {
					this.detach_event("mousewheel", this._handle_mousewheel);
					this._scroll_bar_y.dispose();
					this._scroll_bar_y = null;
					this._scroll_init_y = false;
				}

				var sxvisible = this._scroll_bar_x && this._scroll_bar_x.get_visible();
				var syvisible = this._scroll_bar_y && this._scroll_bar_y.get_visible();
				if (sxvisible && syvisible) {
					this._scroll_bar_x.set_width(cw - 16);
					this._scroll_bar_y.set_height(ch - 16);

				}
				if (sxvisible) {
					ch = ch - 16;
					_sh = ch;
				}
				if (syvisible) {
					cw = cw - 16;
					_sw = cw;
				}

			}

			var nw = _sw - padding[FOUR_L] - padding[FOUR_R];
			var nh = _sh - padding[FOUR_T] - padding[FOUR_B];

			this._content_flow_logic_init(dl, dt, nw, nh);

			var fw = this._content_sizew;
			var fh = this._content_sizeh;

			var ft = 0;
			if (fh < nh) {
				switch (this.get_vertical_align()) {
					case "middle":
						ft = (nh - fh) / 2;
						break;
					case "bottom":
						ft = nh - fh;
						break;
				}
			}

			var fl = 0;
			if (fw < nw) {
				switch (this.get_horizontal_align()) {
					case "center":
						fl = (nw - fw) / 2;
						break;
					case "right":
						fl = nw - fw;
						break;
				}
			}

			if (smy == "scroll") {
				ft = ft - this._scroll_y;
				dt = dt - this._scroll_y;
			}
			if (smx == "scroll") {
				fl = fl - this._scroll_x;
				dl = dl - this._scroll_x;
			}


			if (this._childs) {
				for (var i = 0; i < this._childs.length; i++) {
					var ctrl = this._childs[i];

					if (!ctrl.get_visible())
						continue;

					if (ctrl._requirecallupdate) {
						ctrl.update_sublayout_delay();
					}

					var edges = {};
					var margin = ctrl.get_margin();
					var ctrldock = ctrl.get_dock();

					if (ctrldock == "over") {
						ctrl.internal_set_rect(margin[FOUR_L], margin[FOUR_T], _sw - margin[FOUR_L] - margin[FOUR_R], _sh - margin[FOUR_T] - margin[FOUR_B])
					}
					else if (ctrldock == "fill") {
						ctrl.internal_set_rect(dl + margin[FOUR_L], dt + margin[FOUR_T], nw - margin[FOUR_L] - margin[FOUR_R], nh - margin[FOUR_T] - margin[FOUR_B]);
					}
					else if (ctrldock == "none") {
						var ct = 0;
						var cl = 0;
						var ccw = ctrl.get_demand_width(_sw - padding[FOUR_L] - padding[FOUR_R]);
						var cch = ctrl.get_demand_height();
						if (ctrl._posy == "bottom")
							ct = _sh - ctrl.get_bottom() - margin[FOUR_B] - padding[FOUR_B] - cch - ft;
						else
							ct = ctrl.get_top() + margin[FOUR_T] + padding[FOUR_T] + ft;
						if (ctrl._posx == "right")
							cl = _sw - ctrl.get_right() - margin[FOUR_R] - padding[FOUR_R] - ccw - fl;
						else
							cl = ctrl.get_left() + margin[FOUR_L] + padding[FOUR_L] + fl;

						ctrl.internal_set_rect(cl, ct
							, ccw
							, cch
						);
					}
					else if (ctrldock == "flow") {
						this._content_flow_logic_item(ctrl, true, _sw - padding[FOUR_L] - padding[FOUR_R]);
					}
					else {
						switch (ctrldock) {
							case "left":
								cw = Math.min(ctrl.get_demand_width(nw), nw);
								ctrl.internal_set_rect(dl + margin[FOUR_L], dt + margin[FOUR_T], cw, nh - margin[FOUR_T] - margin[FOUR_B]);
								dl += cw + margin[FOUR_L] + margin[FOUR_R];
								nw -= cw + margin[FOUR_L] + margin[FOUR_R];
								break;
							case "top":
								ch = Math.min(ctrl.get_demand_height(), nh);
								ctrl.internal_set_rect(dl + margin[FOUR_L], dt + margin[FOUR_T], nw - margin[FOUR_L] - margin[FOUR_R], ch);
								dt += ch + margin[FOUR_T] + margin[FOUR_B];
								nh -= ch + margin[FOUR_T] + margin[FOUR_B];
								break;
							case "right":
								cw = Math.min(ctrl.get_demand_width(nw), nw);
								ctrl.internal_set_rect(dl + nw - cw - margin[FOUR_R], dt + margin[FOUR_T], cw, nh - margin[FOUR_T] - margin[FOUR_B]);
								nw -= cw + margin[FOUR_L] + margin[FOUR_R];
								break;
							case "bottom":
								ch = Math.min(ctrl.get_demand_height(), nh);
								ctrl.internal_set_rect(dl + margin[FOUR_L], dt + nh - ch - margin[FOUR_B], nw - margin[FOUR_L] - margin[FOUR_R], ch);
								nh -= ch + margin[FOUR_T] + margin[FOUR_B];
								break;
						}//switch
					}

				}//for
			}

			this._content_flow_logic_end();

		});
		define.method("_content_flow_logic_init", function (x, y, w, h) {
			this._cf_mx = false;
			this._cf_my = false;
			this._cf_mz = false;

			switch (this._content_flow) {
				case "left":
					break;
				case "right":
					this._cf_mx = true;
					break;
				case "bottomleft":
					this._cf_my = true;
					break;
				case "bottomright":
					this._cf_mx = true;
					this._cf_my = true;
					break;
				case "uptoleft":
					this._cf_mz = true;
					break;
				case "downtoleft":
					this._cf_mz = true;
					this._cf_mx = true;
					break;
				case "uptoright":
					this._cf_mz = true;
					this._cf_my = true;
					break;
				case "downtoright":
					this._cf_mz = true;
					this._cf_mx = true;
					this._cf_my = true;
					break;
			}

			if (this._cf_mz) {
				var tmp = w; w = h; h = tmp;
			}

			this._cf_sx = x;
			this._cf_sy = y;
			this._cf_sw = w;
			this._cf_sh = h;

			this._cf_nexty = 0;
			this._cf_nextx = 0;
			this._cf_maxh = 0;
			this._cf_maxw = 0;
			this._cf_rowh = 0;
			this._cf_ri = 0;
			this._cf_ci = 0;
			this._cf_lfc = 'none';
		});
		define.method("_content_flow_logic_end", function () {
			this._cf_maxh += this._cf_rowh;
			if (this._cf_mz) {
				var tmp = this._cf_sw; this._cf_sw = this._cf_sh; this._cf_sh = tmp;
				var tmp = this._cf_nextx; this._cf_nextx = this._cf_nexty; this._cf_nexty = tmp;
				var tmp = this._cf_maxw; this._cf_maxw = this._cf_maxh; this._cf_maxh = tmp;
			}
		});
		define.method("_content_flow_logic_item", function (ctrl, setrect, edgew) {
			var margin = ctrl.get_margin();
			var dw = ctrl.get_demand_width(edgew - margin[FOUR_L] - margin[FOUR_R]);
			var dh = ctrl.get_demand_height();
			var cw = dw + margin[FOUR_L] + margin[FOUR_R];
			var ch = dh + margin[FOUR_T] + margin[FOUR_B];
			if (this._cf_mz) {
				var tmp = cw; cw = ch; ch = tmp;
				var tmp = dw; dw = dh; dh = tmp;
			}

			var enough = this._cf_sw - this._cf_nextx >= cw;
			var flowclear = ctrl.get_flow_clear();

			if (this._cf_ci > 0 && (flowclear == "newline" || (flowclear != 'follow' && (!enough || flowclear == 'prev' || flowclear == 'both' || this._cf_lfc == 'next' || this._cf_lfc == 'both')))) {
				this._cf_nexty = this._cf_nexty + this._cf_rowh;
				this._cf_maxh = this._cf_nexty;
				this._cf_nextx = 0;
				this._cf_rowh = 0;
				this._cf_ri++;
				this._cf_ci = 0;
				enough = this._cf_sw >= cw;
			}

			this._cf_lfc = flowclear;

			var l = this._cf_nextx
			var t = this._cf_nexty;

			if (enough) {
				this._cf_nextx += cw;
				this._cf_maxw = Math.max(this._cf_maxw, this._cf_nextx);
				this._cf_rowh = Math.max(this._cf_rowh, ch);
				this._cf_ci++;
			}
			else {

				this._cf_maxw = Math.max(this._cf_maxw, this._cf_nextx + cw);
				this._cf_nexty = this._cf_nexty + ch;
				this._cf_maxh = this._cf_nexty;
				this._cf_nextx = 0;
				this._cf_rowh = 0;
				this._cf_ri++;
			}

			var w = dw;
			var h = dh;

			if (setrect) {
				if (this._cf_mx)
					l = this._cf_sw - cw - l
				if (this._cf_my)
					t = this._cf_sh - ch - t
				if (this._cf_mz) {
					var tmp = l; l = t; t = tmp;
					var tmp = w; w = h; h = tmp;
				}
				l = this._cf_sx + l;
				t = this._cf_sy + t;
				l += margin[FOUR_L];
				t += margin[FOUR_T];
				ctrl.internal_set_rect(l, t, w, h);
			}

		});
		define.method("_calculate_content_size", function () {
			if (this._content_resize_calculated) return;

			if (!this._childs || !this._childs.length) {
				this._content_width = 0;
				this._content_height = 0;
				this._content_sizew = 0;
				this._content_sizeh = 0;
				this._content_resize_calculated = true;
				return;
			}

			jsml._count_calculate_content_size = 1 + (jsml._count_calculate_content_size || 0)

			var edgew = 0;
			var edgeh = 0;
			var fillw = 0;
			var fillh = 0;

			var sizel = 0;
			var sizer = 0;
			var sizet = 0;
			var sizeb = 0;

			var padding = this._padding || jsml.get_zero_rect();
			var floww = this.get_client_width();
			var minw = this.get_min_width();
			if (minw > 0) {
				var border = this.get_outer_border_width();
				var padding = this._padding || jsml.get_zero_rect();
				minw = minw - border[FOUR_L] - border[FOUR_R] - padding[FOUR_L] - padding[FOUR_R];
				if (minw > floww)
					floww = minw;
			}

			var flowh = this.get_client_height();
			if (this.get_overflow_y(true) == "scroll") floww -= 16;
			if (this.get_overflow_x(true) == "scroll") flowh -= 16;

			this._content_flow_logic_init(padding[FOUR_L], padding[FOUR_T], floww, flowh);
			var flowitems = 0;

			for (var i = 0; i < this._childs.length; i++) {
				var ctrl = this._childs[i];
				if (!ctrl.get_visible())
					continue;

				var ctrldock = ctrl.get_dock();

				if (ctrldock == "flow") {
					flowitems++;
					this._content_flow_logic_item(ctrl, false, edgew);
					continue;
				}

				var margin = ctrl.get_margin();

				if (ctrldock == "none") {
					var ctrlw = ctrl.get_demand_width(edgew - margin[FOUR_L] - margin[FOUR_R]) + margin[FOUR_L] + margin[FOUR_R];
					var ctrlh = ctrl.get_demand_height() + margin[FOUR_T] + margin[FOUR_B];

					if (ctrl._posy == "bottom") {
						sizeb = Math.max(sizeb, ctrlh + ctrl.get_bottom());
					}
					else {
						sizet = Math.max(sizet, ctrlh + ctrl.get_top());
					}
					if (ctrl._posx == "right") {
						sizer = Math.max(sizer, ctrlw + ctrl.get_right());
					}
					else {
						sizel = Math.max(sizel, ctrlw + ctrl.get_left());
					}
					continue;
				}

				if (ctrldock == "over") {
					var ctrlw = ctrl.get_demand_width(edgew - margin[FOUR_L] - margin[FOUR_R]) + margin[FOUR_L] + margin[FOUR_R];
					var ctrlh = ctrl.get_demand_height() + margin[FOUR_T] + margin[FOUR_B];

					fillw = Math.max(fillw, ctrlw);
					fillh = Math.max(fillh, ctrlh);
					continue;
				}

				var ctrlw = ctrl.get_demand_width(floww - fillw - margin[FOUR_L] - margin[FOUR_R]) + margin[FOUR_L] + margin[FOUR_R];
				var ctrlh = ctrl.get_demand_height() + margin[FOUR_T] + margin[FOUR_B];

				if (ctrldock == "fill") {
					fillw = Math.max(fillw, edgew + ctrlw);
					fillh = Math.max(fillh, edgeh + ctrlh);
				}
				else if (ctrldock == "left") {
					edgew = edgew + ctrlw;
					fillh = Math.max(fillh, edgeh + ctrlh);
				}
				else if (ctrldock == "right") {
					edgew = edgew + ctrlw;
					fillh = Math.max(fillh, edgeh + ctrlh);
				}
				else if (ctrldock == "top") {
					edgeh = edgeh + ctrlh;
					fillw = Math.max(fillw, edgew + ctrlw);
				}
				else if (ctrldock == "bottom") {
					edgeh = edgeh + ctrlh;
					fillw = Math.max(fillw, edgew + ctrlw);
				}

			}


			this._content_sizew = Math.max(sizel, sizer);
			this._content_sizeh = Math.max(sizet, sizeb);

			this._content_flow_logic_end();

			this._content_width = Math.max(edgew, fillw, this._cf_maxw, this._content_sizew);
			this._content_height = Math.max(edgeh, fillh, this._cf_maxh, this._content_sizeh);

			this._content_resize_calculated = true;

		});
		define.method("invoke_notify_content", function (resizeByParent) {
			this._content_resize_calculated = false;

			if (this._notvisible) return;

			if (!this._childs || this._childs.length == 0)
				return;

			if (resizeByParent) {
				//when resized by parent, adjust content size for flow layout
				if (this._overflowisvisible()) {
					var cfw = this._cf_maxw;
					var cfh = this._cf_maxh;
					this._content_resize_calculated = false;
					this._calculate_content_size();
					if (cfw != this._cf_maxw || cfh != this._cf_maxh) {
						this.invoke_notify_content();
						return;
					}
				}
				this.call_update_sublayout_core();
			}
			else {
				var p = this.get_jsml_parent();
				if (p) {
					if (this._overflowisvisible()) {
						this.invoke_notify_parent();
					}
				}
				else {
					this.update_domlayout();
				}

				this.update_sublayout_delay();
			}
		});
		define.method("call_update_sublayout_core", function () {
			this._requireupdatelayout = null;
			var p = this.get_jsml_parent();
			if (p != null && p._requireupdatelayout) {
				this._requirecallupdate = true;
				return;
			}
			if (!this.get_visible())
				return;
			jsml.suppend_layout();
			this.update_sublayout_core();
			this.invoke_event("update_layout");
			if (jsml.firefox && this._element.scrollTop != 0)
				this._element.scrollTop = 0;
			jsml.resume_layout();
		});
		define.attach("resumelayout", function () {
			if (!this._requireupdatelayout) return;
			this.call_update_sublayout_core();
		});
		define.method("update_sublayout_delay", function () {
			if (jsml.debug) jsml._count_update_sublayout = 1 + (jsml._count_update_sublayout || 0);

			this._content_resize_calculated = false;
			this._requirecallupdate = false;

			if (!this._childs || this._childs.length == 0)
				return;

			this._requireupdatelayout = true;
			this._setresumehandler();
		});
		define.method("get_demand_content_width", function () {
			this._calculate_content_size();
			return this._content_width;
		});
		define.method("get_demand_content_height", function () {
			this._calculate_content_size();
			return this._content_height;
		});


		var define = jsml.class_define("jsmlscrollbar", "jsmlcomplexcontrol");
		define.constructor(function () {
			this.jsmlcomplexcontrol_constructor();

			this.set_unselectable(true);

			this._small = jsml.new_panel();
			this._large = jsml.new_panel();
			this._sdock = jsml.new_panel();
			this._ldock = jsml.new_panel();
			this._float = jsml.new_panel();

			this._float.set_border_color("#cccccc");
			this._float.set_border_width("1");

			//background image
			var _d = this._direction;
			this.set_background("transparent url(" + jsml.jsmlfolder + "/scrollbar/default/barb_" + _d + ".png) repeat-" + _d + "");
			this._float.set_background("transparent url(" + jsml.jsmlfolder + "/scrollbar/default/fb_" + _d + ".png) repeat-" + _d + "");
			this._small.set_background("transparent url(" + jsml.jsmlfolder + "/scrollbar/default/bt_" + _d + ".png) no-repeat");
			this._large.set_background("transparent url(" + jsml.jsmlfolder + "/scrollbar/default/bt_" + _d + ".png) no-repeat");

			if (this._direction == "y") {
				this._small._estyle.backgroundPosition = "-32px 0px";
				this._large._estyle.backgroundPosition = "0px 0px";

				this._small.set_dock("top");
				this._small.set_height(16);
				this._large.set_dock("bottom");
				this._large.set_height(16);

				this._sdock.set_dock("top");
				this._ldock.set_dock("bottom");
			}
			else {
				this._small._estyle.backgroundPosition = "0px -32px";
				this._large._estyle.backgroundPosition = "0px 0px";

				this._small.set_dock("left");
				this._small.set_width(16);
				this._large.set_dock("right");
				this._large.set_width(16);

				this._sdock.set_dock("left");
				this._ldock.set_dock("right");
			}

			if (this._direction == "y")
				this._float._estyle.backgroundPosition = "-12px 0px";
			else
				this._float._estyle.backgroundPosition = "0px -13px";
			this._float.set_dock("fill");

			this.append_child(this._small);
			this.append_child(this._large);
			this.append_child(this._sdock);
			this.append_child(this._ldock);
			this.append_child(this._float);

			this.init_events();
		});
		define.method("init_events", function () {
			var self = this;

			self._small.attach_event("mousedown", function (jevent, event) {
				self._startcapture(jevent.jsml_sender, event, -72);
				return event.cancel();
			});
			self._large.attach_event("mousedown", function (jevent, event) {
				self._startcapture(jevent.jsml_sender, event, 72);
				return event.cancel();
			});
			self._sdock.attach_event("mousedown", function (jevent, event) {
				self._startcapture(jevent.jsml_sender, event, -144);
				return event.cancel();
			});
			self._ldock.attach_event("mousedown", function (jevent, event) {
				self._startcapture(jevent.jsml_sender, event, 144);
				return event.cancel();
			});
			self._float.attach_event("mousedown", function (jevent, event) {
				self._startcapture(jevent.jsml_sender, event);
				return event.cancel();
			});

			//css

			self.attach_event("mousehover", function () {
				if (self._direction == "y")
					self._small._estyle.backgroundPosition = "-48px 0";
				else
					self._small._estyle.backgroundPosition = "0 -48px";
				if (self._direction == "y")
					self._large._estyle.backgroundPosition = "-16px 0";
				else
					self._large._estyle.backgroundPosition = "0 -16px";
				self._float.set_back_color("#999999");
			});
			self.attach_event("mouseleave", function () {
				if (self._direction == "y")
					self._small._estyle.backgroundPosition = "-32px 0";
				else
					self._small._estyle.backgroundPosition = "0 -32px";
				self._large._estyle.backgroundPosition = "0 0";
				self._float.set_back_color("#cccccc");
			});
		});
		define.method("_startcapture", function (ctrl, devent, val) {
			ctrl._element.onselectstart = jsml.cancel_default_function;

			var self = this;
			self._timer_addval = val;

			var _losed = false;
			function lostcapture() {
				_losed = true;
				self.invoke_event("mouseleave");
			}

			self.invoke_event("mousehover");

			function on_timer() {
				if (_losed) return;
				self.setDelegateTimeout(on_timer, 100);
				self.set_value(self._value + self._timer_addval);
				self.invoke_event("scroll");
			}
			if (val) {
				self.setDelegateTimeout(on_timer, 400);
				self.set_value(self._value + self._timer_addval);
				self.invoke_event("scroll");
			}

			var _v = self._value;
			var _x = devent.clientX;
			var _y = devent.clientY;
			var _f;
			var _t = 0;
			var _r;

			function update_position(moveevent) {
				if (val) return
				if (self._jsml_disposed) return;

				var x = _x - moveevent.clientX;
				var y = _y - moveevent.clientY;

				_f = function () {
					if (self._jsml_disposed) return;
					_t = new Date().getTime();
					var s = self._direction == "y" ? y : x;
					self.set_value(_v - self._outer * s / self._sizev);
					self.invoke_event("scroll");
				}
				clearTimeout(_r);
				var t = 60;
				if (!jsml.msie) t = 30;

				if (new Date().getTime() - _t > t)
					_f();
				else
					_r = self.setDelegateTimeout(_f, t / 2);
			}

			jsml.startcapture(update_position, lostcapture, jsml.get_current_style(ctrl._element, "cursor"), devent);
		});
		define.method("get_value", function () {
			return this._value || 0;
		});
		define.method("set_value", function (newy) {
			newy = Math.min(newy, this._outer - this._inner);
			newy = Math.max(newy, 0);
			this.set_data(this._inner, this._outer, newy);
			this.invoke_event("set_value", newy);
		});
		define.method("set_data", function (inner, outer, value) {
			this._inner = inner;
			this._outer = outer;
			this._value = value;

			this.drawui();
		});
		define.attach("resize", function () {
			if (this._outer) this.drawui();
		});
		define.method("drawui", function () {
			var inner = this._inner;
			var outer = this._outer;
			var value = this._value;

			var h = this._direction == "y" ? this.get_client_offset_height() : this.get_client_offset_width();
			h = h - 20 - 20;
			this._sizev = h;

			if (h <= 0 || outer <= inner) {
				//this._sdock.set_visible(false);
				//this._ldock.set_visible(false);
				//this._float.set_visible(false);
				//this.set_visibility("hidden");
				this.set_visible(false);
				return;
			}

			//this.set_visibility("visible");
			this.set_visible(true);
			//this._sdock.set_visible(true);
			//this._ldock.set_visible(true);
			//this._float.set_visible(true);

			var p = value / (outer - inner);

			var s = h * inner / outer;
			var m1 = p * (h - s)
			var m2 = h - m1 - s;

			m1 = Math.floor(m1);
			m2 = Math.floor(m2);


			if (this._direction == "y") {
				this._sdock.set_height(m1);
				this._ldock.set_height(m2);
			}
			else {
				this._sdock.set_width(m1);
				this._ldock.set_width(m2);
			}
		});


		var define = jsml.class_define("jsmlscrollbary", "jsmlscrollbar");
		define.constructor(function () {
			this._direction = "y";
			this.jsmlscrollbar_constructor();
		});
		var define = jsml.class_define("jsmlscrollbarx", "jsmlscrollbar");
		define.constructor(function () {
			this._direction = "x";
			this.jsmlscrollbar_constructor();
		});


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \
			class-jsmlelement
		\ * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		var define = jsml.class_define("jsmlelement", "jsmlcontrol");
		define.constructor(function (content) {
			this._overflow = "visible";
			this.jsmlcontrol_constructor();
			this._content = content || document.createElement("DIV");
			this._content.style.whiteSpace = "nowrap";
			this._contentpos = "absolute";
			if (false) {
				this._contentpos = "static";
				this._content.style.position = "static";
				this._content.style.display = "inline-block";
			}
			else {
				this._content.style.position = "absolute";
			}

			this._element.appendChild(this._content);
		});
		define.property("padding",
			function () {
				return this._padding || jsml.get_zero_rect();
			}
			,
			function (value) {
				this._padding = tofourvalues(value);
				this.invoke_notify_content();
				this.invoke_event("set_padding");
			}
		);
		define.property("zoom",
			function () {
				return this._zoom || "none";
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._zoom == value) return;
				switch (value) {
					case "none":
					case "both":
					case "in":
					case "out":
						this._zoom = value;
						break;
					default:
						if (value.indexOf("%") != -1)
							this._zoom = (parseFloat(value) / 100) || "none";
						else
							this._zoom = parseFloat(value) || "none";
						break;
				}
				this.invoke_notify_content();
				this.invoke_event("set_zoom");
			}
		);

		define.method("update_element_layout", function () {
			var cw = this.get_client_width();
			var ch = this.get_client_height();
			var dw = this.get_demand_content_width();
			var dh = this.get_demand_content_height();

			if (cw <= 0 || ch <= 0 || dw <= 0 || dh <= 0)
				return;

			var padding = this._padding;
			if (padding) {
				var lz = this._lastzoom || 1;
				dw += (padding[FOUR_L] + padding[FOUR_R]) / lz
				dh += (padding[FOUR_T] + padding[FOUR_B]) / lz
			}

			var zoom = 1;

			switch (this.get_zoom()) {
				case "none":
					break;
				case "both":
					zoom = Math.min(cw / dw, ch / dh);
					break;
				case "in":
					zoom = Math.min(cw / dw, ch / dh);
					if (zoom < 1) zoom = 1;
					break;
				case "out":
					zoom = Math.min(cw / dw, ch / dh);
					if (zoom > 1) zoom = 1;
					break;
				default:
					zoom = parseFloat(this.get_zoom()) || 1;
					break;
			}

			if ((this._lastzoom || 1) != zoom) {
				this._lastzoom = zoom;
				if (jsml.firefox)
					this._content.style.MozTransform = "scale(" + 1 / zoom + "," + 1 / zoom + ")";
				else if (jsml.opera)
					this._content.style.OTransform = "scale(" + 1 / zoom + "," + 1 / zoom + ")";
				else
					this._content.style.zoom = (zoom == 1 ? "" : zoom);
			}

			var pt = 0;
			var pl = 0;

			if (zoom != 1) {
				dw = dw * zoom;
				dh = dh * zoom;
			}

			switch (this.get_vertical_align()) {
				case "middle":
					pt += Math.max(0, (ch - dh) / 2);
					break;
				case "bottom":
					pt += Math.max(0, ch - dh);
					break;
				default://for firefox bug : pt+padding => 0+2=0 ...
					break;
			}
			switch (this.get_horizontal_align()) {
				case "center":
					pl += Math.max(0, (cw - dw) / 2);
					break;
				case "right":
					pl += Math.max(0, cw - dw);
					break;
				default://for firefox bug
					break;
			}

			if (padding) {
				pt += padding[FOUR_T];
				pl += padding[FOUR_L];
			}

			if (this._contentpos == "absolute") {
				this._content.style.top = Math.floor(pt / zoom) + "px";
				this._content.style.left = Math.floor(pl / zoom) + "px";
			}
			else {
				this._content.style.marginTop = Math.floor(pt * zoom) + "px";
				this._content.style.marginLeft = Math.floor(pl * zoom) + "px";
			}


		});

		define.property("word_wrap",
			function () {
				return !!this._word_wrap;
			}
			,
			function (value) {
				value = jsml.toboolean(value);
				if (this._word_wrap == value) return;
				this._word_wrap = value;
				this._content.style.whiteSpace = this._word_wrap ? "normal" : "nowrap";
				//this._content.style.wordBreak=this._word_wrap?"break-all":"";
				this.invoke_notify_content();
				this.invoke_event("set_word_wrap");
			}
		);
		define.attach("parent_visible", function () {
			this.invoke_notify_content(true);
		})
		define.method("invoke_notify_content", function (resizeByParent) {
			if (this._notvisible) return;

			//this.invoke_event("notify_content");

			this._cachesw = null;
			this._cachesh = null;

			this._applynewstyle();
			this.update_element_layout();

			if (resizeByParent) {
				if (!this._overflowisvisible())
					return;
			}

			//if change property , let parent know
			var p = this.get_jsml_parent();
			if (p) {
				if (this._overflowisvisible()) {
					this.invoke_notify_parent();
				}
			}
			else {
				this.update_domlayout();
			}
		});

		define.attach("attach_dom", function () {
			this.invoke_notify_content();
		});

		var egswt;
		var egswtstyle;

		function initegswt() {
			if (egswt) {
				if (!egswt.parentNode)
					document.body.insertBefore(egswt, document.body.firstChild);
				return;
			}
			egswt = document.createElement("DIV");
			egswtstyle = egswt.style;
			egswt.setAttribute("contentEditable", "true");
			egswtstyle.visibility = 'hidden';
			egswtstyle.position = 'absolute';
			egswtstyle.top = "-1000px";
			egswtstyle.padding = "0px";
			document.body.insertBefore(egswt, document.body.firstChild);
		}

		function element_get_scroll_width(content, maxwidth) {
			initegswt();

			var html = content.innerHTML;
			if (!html) return 0;
			//return content.offsetWidth
			var fn, fs;
			for (var e = content; e; e = e.parentNode) {
				if (fn && fs)
					break;
				if (!fn) fn = jsml.get_current_style(e, "font-family");
				if (!fs) fs = jsml.get_current_style(e, "font-size");
			}
			egswtstyle.fontFamily = fn || "";
			egswtstyle.fontSize = fs || "";
			if (maxwidth > 0) egswtstyle.maxWidth = maxwidth + "px";
			else egswtstyle.maxWidth = "";
			egswtstyle.width = ""
			egswtstyle.whiteSpace = content.style.whiteSpace;
			//egswtstyle.wordBreak=content.style.wordBreak;
			egswt.innerHTML = html;
			var res = egswt.scrollWidth + 1;
			egswt.innerHTML = "";
			return res;
		}
		function element_get_scroll_height(content, maxwidth) {
			initegswt();

			var html = content.innerHTML;
			if (!html) return 0;
			var fn, fs;
			for (var e = content; e; e = e.parentNode) {
				if (fn && fs)
					break;
				if (!fn) fn = jsml.get_current_style(e, "font-family");
				if (!fs) fs = jsml.get_current_style(e, "font-size");
			}
			egswtstyle.fontFamily = fn || "";
			egswtstyle.fontSize = fs || "";
			if (maxwidth > 0) egswtstyle.width = maxwidth + "px";
			else egswtstyle.width = "";
			egswtstyle.maxWidth = "";
			egswtstyle.whiteSpace = content.style.whiteSpace;
			//egswtstyle.wordBreak=content.style.wordBreak;
			egswt.innerHTML = html;
			var res = egswt.scrollHeight;
			egswt.innerHTML = "";
			return res;
		}
		define.method("get_demand_content_width", function () {
			if (!this._cachesw) {
				var sv = element_get_scroll_width(this._content, this._max_width || -1);
				if (sv < 0) sv = 0;
				this._cachesw = sv;
			}
			return this._cachesw;
		});
		define.method("get_demand_content_height", function () {
			if (!this._cachesh) {
				var w = this._max_width || -1;
				if (w > 0 || this._word_wrap)
					w = this._currw || w;
				var sv = element_get_scroll_height(this._content, w);
				if (sv < 0) sv = 0;
				this._cachesh = sv;
			}
			return this._cachesh;
		});

		var define = jsml.class_define("htmlcontrol", "jsmlelement");
		define.constructor(function () {
			this.jsmlelement_constructor();
		});
		define.property("html",
			function () {
				return this._html || "";
			}
			,
			function (value) {
				if (this._html == value) return;
				this._html = value || "";
				this._content.innerHTML = this._html;
				this.invoke_notify_content();
				this.invoke_event("set_html");
			}
		);
		define.method("jsml_append_xmldata", function (node) {
			var html;
			if (jsml.toboolean(node.getAttribute("rawhtml")))
				html = jsml.get_node_innertext(node);
			else
				html = jsml.get_node_innerxml(node);//TODO: this is not right!
			html = html.replace(/(^\s+|\s+$)/g, "");
			this.set_html(html);
		});
		define.method("get_demand_content_width", function () {
			if (!this._cachesw) {
				var sv = element_get_scroll_width(this._content, this._max_width || -1);
				if (sv < 0) sv = 0;
				this._cachesw = sv;
			}
			return this._cachesw;
		});
		define.method("get_demand_content_height", function () {
			if (!this._cachesh) {
				this._content.style.width = this.get_demand_content_width() + "px";
				var sv = this._content.scrollHeight;
				this._content.style.width = "";
				if (sv < 0) sv = 0;
				this._cachesh = sv;
			}
			return this._cachesh;
		});

		//IMAGE
		var define = jsml.class_define("image", "jsmlelement");
		define.constructor(function () {
			this._img = document.createElement("IMG");
			this._img.style.cssText = "visibility:hidden!important;max-width:888888px!important;";
			this.jsmlelement_constructor(this._img);
		});
		define.property("src",
			function () {
				return this._src || "";
			}
			,
			function (value) {
				value = String(value) || "";
				if (this._src == value) return;
				this._reloading = this._img_loaded;
				if (this._reloading) {
					this._img_loaded = false;
					this._img.style.visibility = 'hidden';
					this._img_width = 1;
					this._img_height = 1;
				}
				this._src = value;
				this._img.onload = this.delegate(this.handle_image_load);
				this._img.setAttribute("src", this._src);
				if (this._reloading) {
					this.invoke_notify_content();
				}
				this.invoke_event("set_src");
			}
		);
		define.method("handle_image_load", function () {
			//IE7 will fire the event many times..
			if (this._img_loaded) return;
			if (this._jsml_disposed) return;
			this._img.onload = jsml.empty_function;
			if (!this._lastzoom && !this._reloading && this._img.width > 0 && this._img.height > 0) {
				this.load_image_size(this._img);
				return;
			}
			var src = this._src;
			var img = document.createElement("IMG");
			img.onload = this.delegate(function () {
				img.onload = jsml.empty_function;
				if (this._jsml_disposed) return;
				if (this._src != src) return;
				this.load_image_size(img);
			});
			this.setDelegateTimeout(function () {
				img.setAttribute("src", src);
			}, 1);
		});
		define.method("load_image_size", function (img) {
			this._img_loaded = true;
			this._img_width = img.width;
			this._img_height = img.height;
			if (this._img != img) {
				if (this._lastzoom) {
					this._img.width = this._img_width * this._lastzoom;
					this._img.height = this._img_height * this._lastzoom;
				}
				else {
					this._img.width = this._img_width
					this._img.height = this._img_height
				}
			}
			jsml.queue_resumehandler(this.delegate(function () {
				this.invoke_notify_content();
				this.invoke_event("load");
				jsml.queue_resumehandler(this.delegate(function () {
					this._img.style.visibility = '';
				}));
			}));
		});

		define.method("internal_set_rect", function (l, t, w, h) {
			if (this._lastzoom) {
				var border = this.get_outer_border_width();
				var padding = this._padding || jsml.get_zero_rect();

				var cw = w - border[FOUR_L] - border[FOUR_R] - padding[FOUR_L] - padding[FOUR_R];
				var ch = h - border[FOUR_T] - border[FOUR_B] - padding[FOUR_T] - padding[FOUR_B];

				var dw = this.get_demand_content_width();
				var dh = this.get_demand_content_height();

				var zoom = 1;
				switch (this.get_zoom()) {
					case "none":
						break;
					case "both":
						zoom = Math.min(cw / dw, ch / dh);
						break;
					case "in":
						zoom = Math.min(cw / dw, ch / dh);
						if (zoom < 1) zoom = 1;
						break;
					case "out":
						zoom = Math.min(cw / dw, ch / dh);
						if (zoom > 1) zoom = 1;
						break;
					default:
						zoom = parseFloat(this.get_zoom()) || 1;
						break;
				}
				if (zoom != 1) {
					if (cw / dw < ch / dh)
						w = Math.floor(dw * zoom) + border[FOUR_L] + border[FOUR_R] + padding[FOUR_L] + padding[FOUR_R];
					else
						h = Math.floor(dh * zoom) + border[FOUR_T] + border[FOUR_B] + padding[FOUR_T] + padding[FOUR_B];
				}
			}
			this.image_base_set_rect(l, t, w, h);
		}, "image_base_set_rect");

		define.method("get_demand_content_width", function () {
			return this._img_width || 0;
		});
		define.method("get_demand_content_height", function () {
			return this._img_height || 0;
		});

		define.method("update_element_layout", function () {
			if (!this._img_loaded)
				return;

			var cw = this.get_client_width();
			var ch = this.get_client_height();

			var dw = this._img_width;
			var dh = this._img_height;

			if (!dw || !dh)
				return;

			var padding = this._padding;
			if (padding) {
				var lz = this._lastzoom || 1;
				dw += (padding[FOUR_L] + padding[FOUR_R]) / lz
				dh += (padding[FOUR_T] + padding[FOUR_B]) / lz
			}

			var zoom = 1;

			switch (this.get_zoom()) {
				case "none":
					break;
				case "both":
					zoom = Math.min(cw / dw, ch / dh);
					break;
				case "in":
					zoom = Math.min(cw / dw, ch / dh);
					if (zoom < 1) zoom = 1;
					break;
				case "out":
					zoom = Math.min(cw / dw, ch / dh);
					if (zoom > 1) zoom = 1;
					break;
				default:
					zoom = parseFloat(this.get_zoom()) || 1;
					break;
			}

			if ((this._lastzoom || 1) != zoom && cw > 0 && ch > 0) {
				this._lastzoom = zoom;
				this._img.width = Math.round(this._img_width * zoom);
				this._img.height = Math.round(this._img_height * zoom);
			}

			var pt = 0;
			var pl = 0;

			if (zoom != 1) {
				dw = dw * zoom;
				dh = dh * zoom;
			}

			switch (this.get_vertical_align()) {
				case "middle":
					pt += (ch - dh) / 2;
					break;
				case "bottom":
					pt += ch - dh;
					break;
				default://for firefox bug : pt+padding => 0+2=0 ...
					break;
			}
			switch (this.get_horizontal_align()) {
				case "center":
					pl += (cw - dw) / 2;
					break;
				case "right":
					pl += cw - dw;
					break;
				default://for firefox bug
					break;
			}

			if (padding) {
				pt += padding[FOUR_T];
				pl += padding[FOUR_L];
			}

			this._img.style.top = Math.floor(pt) + "px";
			this._img.style.left = Math.floor(pl) + "px";
		});

		// CHECKBOX
		var define = jsml.class_define("checkbox", "jsmlelement");
		define.constructor(function () {
			var box = document.createElement("input");
			box.setAttribute("type", "checkbox");
			box.setAttribute("name", this.get_uid());
			if (jsml.opera) box.style.borderTopColor = "gray";
			//box.style.padding="0px";//for IE7
			this._box = box;
			this._member_change = "_box";
			this._innerelement = box;
			this.jsmlelement_constructor(this._box);
			this.set_width(20);
		});
		define.property("checked",
			function () {
				return this._box.checked;
			}
			,
			function (value) {
				if (this._box.checked == !!value) return;
				this._box.checked = !!value;
				this.invoke_event("set_checked");
			}
		);
		define.method("focus", function () {
			try { this._box.focus(); } catch (x) { }
		});

		//LABEL
		var define = jsml.class_define("label", "jsmlelement");
		define.constructor(function () {
			this.jsmlelement_constructor();
			this._estyle.cursor = "default";
			this.set_css_class("jsml_label");
			if (jsml.jsml_label_css_text) this.set_css_text(jsml.jsml_label_css_text);
		});

		define.property("text_align",
			function () {
				return this.get_horizontal_align();
			}
			,
			function (value) {
				this.set_horizontal_align(value);
			}
		);
		define.property("font_size",
			function () {
				return this._content.style.fontSize;
			}
			,
			function (value) {
				this._content.style.fontSize = value;
				this.invoke_notify_content();
			}
		);
		define.method("set_text", function (value) {
			if (this._text == value) return;
			this._text = String(value || "");
			this._content.innerHTML = "";
			this._content.innerHTML = jsml.html_encode(this._text);
			this.invoke_notify_content();
			this.invoke_event("set_text");
		});

		define.method("get_text", function () {
			return this._text || "";
		});
		define.method("get_demand_content_width", function (outerw) {
			if (!this._cachesw) {
				var w = outerw || 0;
				var oldw;
				if (w > 0) oldw = this._estyle.width;
				if (w > 0) this._estyle.width = w + "px";
				this._cachesw = this._content.scrollWidth + 2;
				if (w > 0) this._estyle.width = oldw;
			}
			return this._cachesw;
		});
		define.method("get_demand_content_height", function () {
			if (!this._cachesh) {
				var w = this._max_width || -1;
				if (w > 0 || this._word_wrap)
					w = this._currw || w;
				if (w && w > 0) this._content.style.width = w + "px";
				this._cachesh = this._content.offsetHeight;
				if (w && w > 0) this._content.style.width = "";
			}
			return this._cachesh;
		});

		// BUTTON
		var define = jsml.class_define("button", "jsmlcontrol");
		define.constructor(function () {
			var btn = document.createElement("button");
			btn.style.padding = "0px";//for IE7
			if (jsml.firefox) btn.style.paddingBottom = '3px'
			btn.onclick = new Function("", "return false;");
			this.jsmlcontrol_constructor(btn);

			this.set_css_class("jsml_button");
			this.set_cursor("pointer");
		});
		define.method("set_text", function (value) {
			if (this._text == value) return;
			this._text = value || "";
			this._element.innerHTML = jsml.html_encode(this._text);
			this.invoke_event("set_text");
		});
		define.method("get_text", function () {
			return this._text || "";
		});
		define.method("focus", function () {
			try { this._element.focus(); } catch (x) { }
		});

		//TEXTBOX
		var define = jsml.class_define("textbox", "jsmlcontrol");
		define.constructor(function (argbox) {
			this.jsmlcontrol_constructor();

			this.set_css_class("jsml_textbox");

			this._estyle.padding = "0px";
			this._estyle.overflow = "hidden";
			this._text_mode = "singleline";

			this.set_border_width(1);
			this.set_border_style("solid");
			this.set_border_color(jsml.default_textbox_bordercolor);

			this._argbox = argbox;

			this._member_change = "_input";
			this._redrawbox();
		});
		define.attach("keydown", function (je, e) {
			if (e.keyCode == 13) {
				if (this._text_mode != "multipleline")
					e.cancel();
				this.invoke_event("enterkey");
			}
			if (e.keyCode == 9) {
				if (this._text_mode != "multipleline")
					return;
				e.cancel();
				jsml.textarea_pastetext(this._input, this.codetabindent || "\t");
				jsml.textarea_collapse(this._input, false);
			}
		});

		define.attach("resize", function () {
			this._queue_calcresize();
		});
		define.attach("resumelayout", function () {
			if (this._input) {
				var font = this._estyle.font;
				if (font) this._input.style.font = font;
			}
		});
		define.method("_queue_calcresize", function () {
			if (!this._input) return;

			var style = this._input.style;
			var w, h;

			if (document.compatMode == "BackCompat") {
				var wadd = jsml.msie567 ? -2 : (jsml.msie5678 ? -1 : 0);
				w = Math.max(0, this.get_client_width() + wadd) + "px";
				h = Math.max(0, this.get_client_height() + wadd) + "px";
			}
			else {
				var fixw = 0;
				var fixh = 0;

				if (jsml.msie && !jsml.msie8more) {
					this._input.style.marginTop = "-1px";
				}
				if (this._text_mode != "multipleline") {
					fixw = 0;
					fixh = 0;
				}
				else {
					fixw = 0;
					fixh = 1;
				}
				if (jsml.msie567) {
					fixw = 3;
					fixh = 2;
				}

				w = Math.max(0, this.get_client_width() - fixw) + "px";
				h = Math.max(0, this.get_client_height() - fixh) + "px";
			}

			jsml.set_style_size_important(style, w, h)
		});

		define.method("_redrawbox", function () {
			var previnput = this._input;
			this._element.innerHTML = "";

			if (this._argbox) {
				this._input = this._argbox;
				if (this._argbox.nodeName == "TEXTAREA")
					this._text_mode = "multipleline";
				else if (this._argbox.getAttribute("type") == "password")
					this._text_mode = "password";
				else
					this._text_mode = "singleline";
			}
			else {
				switch (this._text_mode) {
					case "multipleline":
						this._input = document.createElement("TEXTAREA");
						break;
					case "password":
						this._input = document.createElement("INPUT");
						this._input.setAttribute("type", "password");
						break;
					default:
						this._input = document.createElement("INPUT");
						this._input.setAttribute("type", "text");
						break;
				}
			}

			//TODO: a bug , when replace the tag , the hooked event for _innerelement is gone.
			this._innerelement = this._input;

			this._input.onselectstart = jsml.cancel_bubble_function;
			this._input.setAttribute("spellcheck", false);
			///this._input.setAttribute("name",this.get_uid());
			this._input.style.margin = "0px";
			this._input.style.padding = "0px";
			this._input.style.textIndent = "1px";
			this._input.style.resize = 'none';
			this._input.style.outline = 'none';

			this._input.style.boxSizing = "border-box";
			this._input.style.webkitBoxSizing = "border-box";
			this._input.style.mozBoxSizing = "border-box";

			this._element.appendChild(this._input);
			if (previnput && !this._argbox) {
				this._input.value = previnput.value;
				this._input.disabled = previnput.disabled;
				this._input.style.cssText = previnput.style.cssText;
				this._input.setAttribute("spellcheck", previnput.getAttribute("spellcheck"));
			}
			this.applyinputborder();
			this._queue_calcresize();
		});
		define.method("set_text", function (value) {
			this._input.value = value || "";
			this.invoke_event("set_text");
		});
		define.method("get_text", function () {
			return this._input.value
		});
		define.property("text_mode",
			function () {
				return this._text_mode;
			}
			,
			function (value) {
				value = String(value).toLowerCase();
				if (this._text_mode == value) return;
				switch (value) {
					case "singleline":
					case "multipleline":
					case "password":
						this._text_mode = value;
						break;
					default:
						this._text_mode = "singleline";
						break;
				}
				this._redrawbox();
				this.invoke_event("set_text_mode");
			}
		);
		define.method("focus", function () {
			try { this._input.focus(); } catch (x) { }
		});
		define.method("applyinputborder", function () {
			this._input.style.borderTopWidth = this._inputborder[FOUR_T] + "px";
			this._input.style.borderLeftWidth = this._inputborder[FOUR_L] + "px";
			this._input.style.borderRightWidth = this._inputborder[FOUR_R] + "px";
			this._input.style.borderBottomWidth = this._inputborder[FOUR_B] + "px";
			try { this._input.style.borderColor = this._border_color || ""; } catch (x) { }
			try { this._input.style.borderStyle = this._border_style || "solid"; } catch (x) { }
		});
		define.method("get_outer_border_width", function () {
			return [0, 0, 0, 0];
		});

		define.property("border_width",
			function () {
				return this._inputborder || jsml.get_zero_rect();
			}
			,
			function (value) {
				this._inputborder = tofourvalues(value);
				if (!this._input) return;
				if (!this._border_style) this._input.style.borderStyle = "solid";
				this._input.style.borderTopWidth = this._inputborder[FOUR_T] + "px";
				this._input.style.borderLeftWidth = this._inputborder[FOUR_L] + "px";
				this._input.style.borderRightWidth = this._inputborder[FOUR_R] + "px";
				this._input.style.borderBottomWidth = this._inputborder[FOUR_B] + "px";
				this.invoke_notify_content();
				this.invoke_event("set_border_width");
			}
		);
		define.property("border_color",
			function () {
				return this._border_color || ""
			}
			,
			function (value) {
				if (this._border_color == value) return;
				this._border_color = value || "";
				if (!this._input) return;
				try { this._input.style.borderColor = this._border_color; } catch (x) { }
				this.invoke_event("set_border_color");
			}
		);
		define.property("border_style",
			function () {
				return this._border_style || "";
			}
			,
			function (value) {
				if (this._border_style == value) return;
				this._border_style = value || "";
				if (!this._input) return;
				if (value && !this._inputborder) this._input.style.borderWidth = "0px";
				try { this._input.style.borderStyle = this._border_style; } catch (x) { }
				this.invoke_event("set_border_style");
			}
		);

		define.method("stop_log", function () {
			this._logs = null;
			this._logindex = 0;

		});
		define.method("start_log", function () {
			this._logs = [];
			this._logindex = -1;

			this.check_log();

			if (this._logattached) return;
			this._logattached = true;
			var self = this;
			var listenfunc = function () {
				self.setDelegateTimeout(function () {
					self.check_log();
				}, 100);
			}
			this.attach_event("change", listenfunc);
			this.attach_event("paste", listenfunc);
			this.attach_event("keyup", listenfunc);
			this.attach_event("mouseup", listenfunc);
			listenfunc();
		});
		define.method("check_log", function () {
			if (!this._logs) return;
			var oldlog = this._logs[this._logindex];
			var txt = this._input.value;
			var selarr = jsml.textarea_getselection(this._input);
			var time = new Date().getTime();
			if (oldlog && oldlog.value == txt) {
				oldlog.selection = selarr;
				return;
			}
			if (!oldlog || time - oldlog.time > 1000) {
				this._logindex++;
			}
			this._logs[this._logindex] = { time: time, value: txt, selection: selarr };
			this._logs.length = this._logindex + 1;
			this.invoke_event("logchange");
		});

		define.method("can_undo", function () {
			if (!this._logs) return;
			if (this._logindex <= 0) return;
			return true;
		});
		define.method("can_redo", function () {
			if (!this._logs) return;
			if (this._logindex + 1 >= this._logs.length) return;
			return true;
		});
		define.method("undo", function () {
			if (!this._logs) return;
			if (this._logindex <= 0) return;
			this._logindex--;

			var log = this._logs[this._logindex];
			this._input.value = log.value;
			jsml.textarea_setselection(this._input, log.selection);
			this.invoke_event("logchange");
		});
		define.method("redo", function () {
			if (!this._logs) return;
			if (this._logindex + 1 >= this._logs.length) return;
			this._logindex++;
			var log = this._logs[this._logindex];
			this._input.value = log.value;
			jsml.textarea_setselection(this._input, log.selection);
			this.invoke_event("logchange");
		});
		define.method("get_range_text", function () {
			return jsml.textarea_getseltext(this._input)
		});
		define.method("set_range_text", function (val) {
			jsml.textarea_pastetext(this._input, val || "");
			this.check_log();
		});
		define.method("collapse", function (start) {
			jsml.textarea_collapse(this._input, start);
		});
		define.method("select_all", function () {
			jsml.textarea_selectall(this._input);
		});

		//DROPDOWN
		var define = jsml.class_define("dropdown", "jsmlcontrol");
		define.constructor(function () {
			this.jsmlcontrol_constructor();

			this.set_css_class("jsml_dropdown");

			this.set_border_width(1);
			this.set_border_style("solid");
			this.set_border_color(jsml.default_textbox_bordercolor);

			this._sel = document.createElement("SELECT");

			var s = this._sel.style;
			s.border = "none 0px gray";
			s.position = "absolute";
			s.left = "0px";
			s.top = "0px";
			s.outline = "none";

			this._box = document.createElement("INPUT");
			this._box.setAttribute("type", "text");

			var s = this._box.style;
			s.border = "none 0px gray";
			s.position = "absolute";
			s.left = "0px";
			s.top = "0px";
			s.display = "none";

			this._element.appendChild(this._sel);
			this._element.appendChild(this._box);

			this._items = [];

			var self = this;
			this._sel.onchange = function () {
				self.set_text(self._sel.value);
				self.invoke_event("change");
			}
		});
		define.attach("set_disabled", function () {
			this._sel.disabled = this.get_disabled();
			this._box.disabled = this.get_disabled();
		});

		define.attach("resize", function () {
			var sp = this._selpadding || 0;
			this._sel.style.top = sp + "px";
			jsml.set_style_size_important(this._sel.style
				, Math.max(0, this.get_client_offset_width()) + "px"
				, Math.max(0, this.get_client_offset_height() - sp * 2) + "px"
				);
			jsml.set_style_size_important(this._box.style
				, Math.max(0, this.get_client_offset_width() - 19) + "px"
				, Math.max(0, this.get_client_offset_height()) + "px"
				);
		});
		define.method("listitem_notify_update", function (item) {
			if (item._option) {
				item._option.text = item.text;
				item._option.value = item.value;
			}
		});
		define.method("jsml_append", function (obj) {
			if (obj._jsml_info.typename == "listitem") {
				this.add_item(obj);
			}
		});
		define.method("add_item", function (item, text) {
			if (typeof (item) != "object")
				item = jsml.new_listitem(String(item), text || String(item));
			this._sel.options.add(item._option);
			this._items.push(item);
		});
		define.method("del_item", function (item) {
			for (var i = 0; i < this._items.length; i++) {
				if (this._items[i] == item) {
					this._items.splice(i, 1);
					break;
				}
			}
			this._sel.removeChild(item._option);
		});
		define.property("editable",
			function () {
				return !!this._editable;
			}
			,
			function (value) {
				this._editable = jsml.toboolean(value);
				if (this._editable)
					this._box.style.display = "inline";
				else
					this._box.style.display = "none";
			}
		);
		define.property("text",
			function () {
				if (this._editable)
					return this._box.value;
				return this._sel.value;
			}
			,
			function (value) {
				if (this._editable)
					this._box.value = value || "";
				else
					this._sel.value = value || "";
				this.invoke_event("set_text");
			}
		);

		//LISTITEM
		var define = jsml.class_define("listitem", "jsml");
		define.constructor(function (value, text) {
			this.jsml_constructor();
			this._option = document.createElement("OPTION");

			if (value) {
				this.set_value(value);
			}
			text = text || value || "";
			if (text) {
				this.set_text(text);
			}
		});
		define.property("value",
			function () {
				return this._option.value;
			}
			,
			function (value) {
				this._option.value = value || "";
			}
		);
		define.property("text",
			function () {
				return this._option.text;
			}
			,
			function (value) {
				this._option.text = value || "";
			}
		);

		jsml.class_define("window", "jsmlcomplexcontrol");
		jsml.class_define("panel", "jsmlcomplexcontrol");

		var define = jsml.class_define("groupbox", "panel");
		define.constructor(function () {
			this.panel_constructor();
			this._fieldset = document.createElement("FIELDSET");
			this._legend = document.createElement("LEGEND");
			var s = this._fieldset.style;
			s.border = "solid 1px #eeeeee";
			s.borderRadius = "4px"
			this._fieldset.appendChild(this._legend);
			this._element.appendChild(this._fieldset);
			this.set_padding([15, 6, 6, 6])
		});
		define.attach("resize", function () {
			var w = this.get_current_width() - 24;
			var h = this.get_current_height() - 13;
			if (w < 0) w = 0; if (h < 0) h = 0;
			this._fieldset.style.width = w + "px";
			this._fieldset.style.height = h + "px";
		});
		define.attach("set_text", function () {
			this._legend.innerHTML = "";
			if (this._text) this._legend.appendChild(document.createTextNode(this._text));
		});

	}

	new function () {


		//TODO:firefox,fixed,body width
		var positioningwindow;

		function GetPositionWindow(e) {
			if (e.ownerDocument)
				return e.ownerDocument.parentWindow || positioningwindow || window;
			return positioningwindow || window;
		}

		function GetIsFixedPosition(e) {
			var win = GetPositionWindow(e);
			var isfirefox = win.navigator.userAgent.indexOf("Firefox") > -1;
			if (!isfirefox) {
				if (e.offsetParent != null)
					return false;
			}
			var stylepos;
			if (e.currentStyle)
				stylepos = e.currentStyle.position;
			else
				stylepos = win.getComputedStyle(e, null).getPropertyValue("position");
			return stylepos == "fixed";
		}
		function GetCurrentBorderWidth(e, side) {
			var win = GetPositionWindow(e);

			var val = "";
			if (e.currentStyle) {
				if (e.currentStyle["border" + side + "Style"] == "none")
					return 0;
				val = e.currentStyle["border" + side + "Width"]
			}
			else {
				side = side.toLowerCase();
				var s = win.getComputedStyle(e, null);

				if (s.getPropertyValue("border-style-" + side) == "none")
					return 0;
				val = s.getPropertyValue("border-" + side + "-width")
			}
			if (!val)
				return 0;
			switch (val) {
				case "thin":
					return 1;
				case "medium":
					if (win.navigator.userAgent.indexOf("MSIE 7.") > -1 || win.document.compatMode != "CSS1Compat") {
						if (e.nodeName == "TABLE" || e.nodeName == "TD")
							return 0;
					}
					return 3;
				case "thick":
					return 5;
			}
			return parseInt(val) || 0;
		}

		function GetScrollPosition(e) {
			var win = GetPositionWindow(e);

			var isxhtml = win.document.compatMode == "CSS1Compat";
			var useragent = win.navigator.userAgent;
			var isie = useragent.indexOf("MSIE") > -1;
			var isie5 = isie && useragent.indexOf("MSIE 5.") > -1;
			var isie6 = isie && useragent.indexOf("MSIE 6.") > -1;
			var isie7 = isie && useragent.indexOf("MSIE 7.") > -1;
			var isie8 = isie && useragent.indexOf("MSIE 8.") > -1;
			var isie9 = isie && parseInt(useragent.split("MSIE ")[1].split(".")[0]) > 9;
			var isopera = !!win.opera;
			var iswebkit = useragent.indexOf("AppleWebKit") > -1;
			var isfirefox = useragent.indexOf("Firefox") > -1;

			var pos = { left: 0, top: 0 };

			var ffborderfix = 0;


			function AddBoder(par) {
				if (par.nodeName != "BODY" && par.nodeName != "HTML") {
					pos.left += GetCurrentBorderWidth(par, "Left");
					pos.top += GetCurrentBorderWidth(par, "Top");
				}
			}

			while (e) {
				pos.left += e.offsetLeft;
				pos.top += e.offsetTop;

				var cstyle = isie ? e.currentStyle : win.getComputedStyle(e, null);
				var zoom = isie ? cstyle.zoom : cstyle.getPropertyValue("zoom");
				if (zoom) {
					if (zoom.indexOf('%') != -1)
						zoom = parseFloat(zoom) / 100;
					else
						zoom = parseFloat(zoom)

					if (zoom && zoom != 1) {
						var t = parseInt(isie ? cstyle.top : cstyle.getPropertyValue("top")) || 0;
						var l = parseInt(isie ? cstyle.left : cstyle.getPropertyValue("left")) || 0;
						pos.left -= l * (1 - zoom);
						pos.top -= t * (1 - zoom);
					}
				}

				var par = GetStandParent(e);

				if (par) {
					//fix the offsetTop/offsetLeft bug.?
					for (var p = e.parentNode; p && p != par; p = p.parentNode) {
						pos.top -= p.scrollTop;
						pos.left -= p.scrollLeft;
					}
				}

				if (GetIsFixedPosition(e)) {
					if (isopera) {
						if (e.offsetTop == 0)
							pos.top += parseInt(cstyle.getPropertyValue("top")) || 0;
						if (e.offsetLeft == 0)
							pos.left += parseInt(cstyle.getPropertyValue("left")) || 0;
					}
					pos.top += Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
					pos.left += Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);
					if (isie8) {
						if (e.parentElement && e.parentElement.style.position == "absolute") {
							var ppos = GetScrollPosition(e.parentElement);
							pos.top += ppos.top;
							pos.left += ppos.left;
						}
					}
					return pos;
				}


				if (!par)
					return pos;

				if (isopera) {
					//NOTE: only tested opera 10
					//do not check the border!
				}
				else if (isfirefox) {
					//TODO:-moz-box-sizing:border-box;
					AddBoder(par);
					//for firefox bug!
					if (ffborderfix == 0) {
						var cspos = isie ? cstyle.position : cstyle.getPropertyValue("position");
						if (cspos == "absolute") {
							AddBoder(par);
							ffborderfix = 1;
						}
					}
				}
				else if (isxhtml) {
					if (isie8) {
					}
					else {
						AddBoder(par);
					}
				}
				else {
					AddBoder(par);
				}

				if (isxhtml) {
					// if(isie8||isopera||iswebkit) root offsetParent is BODY
					// if(isie8||isopera||iswebkit) root offsetParent is BODY
					if (iswebkit) {
						if (par.nodeName != "BODY") {
							pos.left -= par.scrollLeft;
							pos.top -= par.scrollTop;
						}
					}
					else {
						if (isie8) {
							//TODO: IE8 have two version, the old version without patch has bug that need not calcuate the scroll
						}
						if (par.nodeName != "HTML") {
							pos.left -= par.scrollLeft;
							pos.top -= par.scrollTop;
						}
					}
				}
				else {
					if (par.nodeName != "BODY") {
						pos.left -= par.scrollLeft;
						pos.top -= par.scrollTop;
					}
				}

				e = par;
			}

			if (isfirefox) {
				pos.left -= GetCurrentBorderWidth(win.document.body, "Left");
				pos.top -= GetCurrentBorderWidth(win.document.body, "Top");
				pos.left += GetCurrentBorderWidth(win.document.documentElement, "Left");
				pos.top += GetCurrentBorderWidth(win.document.documentElement, "Top");
			}

			return pos;
		}
		function GetStandParent(e) {
			var win = GetPositionWindow(e);

			if (e.offsetParent)
				return e.offsetParent;
			if (e.nodeName == "BODY" || e.nodeName == "HTML")
				return null;
			return win.document.body;
		}
		function CalcPosition(floate, e) {
			var win = GetPositionWindow(e);

			var epos = GetScrollPosition(e);
			if (GetIsFixedPosition(floate)) {
				epos.top -= Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
				epos.left -= Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);

				return { left: epos.left, top: epos.top };
			}
			else {
				var spar = GetStandParent(floate);
				var spos = GetScrollPosition(spar);
				if (spar.nodeName != "BODY" && spar.nodeName != "HTML") {
					spos.left += GetCurrentBorderWidth(spar, "Left");
					spos.top += GetCurrentBorderWidth(spar, "Top");
					spos.left -= spar.scrollLeft;
					spos.top -= spar.scrollTop;
				}
			}
			return { left: epos.left - spos.left, top: epos.top - spos.top };
		}


		function GetClientPosition(e) {
			var win = GetPositionWindow(e);
			var pos = GetScrollPosition(e);
			pos.top -= Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
			pos.left -= Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);
			return pos;
		}


		//get the best position to put the floate
		function AdjustMirror(floate, e, pos, nomovex, nomovey) {
			//c:Client,f:floate,e:e,p:floate"s StandParent,m:Mirror

			//get the size of window
			var cw = window.document.body.clientWidth;
			var ch = window.document.body.clientHeight;
			if (window.document.compatMode == "CSS1Compat") {
				cw = window.document.documentElement.clientWidth;
				ch = window.document.documentElement.clientHeight;
			}

			//get the size of float element
			var fw = floate.offsetWidth;
			var fh = floate.offsetHeight;

			var pcpos = GetClientPosition(GetStandParent(floate));

			//get the center of float element
			var fmpos = { left: pcpos.left + pos.left + fw / 2, top: pcpos.top + pos.top + fh / 2 };//

			var empos = { left: pcpos.left + pos.left, top: pcpos.top + pos.top };

			var isbody = false;
			if (e != null) {
				if (e.nodeName == "BODY") {
					isbody = true;
				}

				var ecpos = GetClientPosition(e);
				//get the center of the relative element
				empos = { left: ecpos.left + e.offsetWidth / 2, top: ecpos.top + e.offsetHeight / 2 };//
			}

			var allowjump = !isbody;

			//left<-->right

			if (fmpos.left - fw / 2 < 0) {
				if ((empos.left * 2 - fmpos.left) + fw / 2 <= cw) {
					if (allowjump) {
						fmpos.left = empos.left * 2 - fmpos.left;
						pos.xflip = true;
					}
				}
				else if (!nomovex) {
					fmpos.left = fw / 2 + 4;
					pos.xmove = true;
				}
			}
			else if (fmpos.left + fw / 2 > cw) {
				if ((empos.left * 2 - fmpos.left) - fw / 2 >= 0) {
					if (allowjump) {
						fmpos.left = empos.left * 2 - fmpos.left;
						pos.xflip = true;
					}
				}
				else if (!nomovex) {
					fmpos.left = cw - fw / 2 - 4;
					pos.xmove = true;
				}
			}


			//top<-->bottom

			if (fmpos.top - fh / 2 < 0) {
				if ((empos.top * 2 - fmpos.top) + fh / 2 <= ch) {
					if (allowjump) {
						fmpos.top = empos.top * 2 - fmpos.top;
						pos.yflip = true;
					}
				}
				else if (!nomovey) {
					fmpos.top = fh / 2 + 4;
					pos.ymove = true;
				}
			}
			else if (fmpos.top + fh / 2 > ch) {
				if ((empos.top * 2 - fmpos.top) - fh / 2 >= 0) {
					if (allowjump) {
						fmpos.top = empos.top * 2 - fmpos.top;
						pos.yflip = true;
					}
				}
				else if (!nomovey) {
					fmpos.top = ch - fh / 2 - 4;
					pos.ymove = true;
				}
			}

			pos.left = fmpos.left - pcpos.left - fw / 2;
			pos.top = fmpos.top - pcpos.top - fh / 2;

		}


		jsml.get_scrollposition = function (e, win) {
			positioningwindow = win;
			return GetScrollPosition(e);
		};
		jsml.get_clientposition = function (e, win) {
			positioningwindow = win;
			return GetClientPosition(e);
		};
		jsml.calc_position = function (floate, e, win) {
			positioningwindow = win;
			return CalcPosition(floate, e);
		};
		jsml.adjust_mirror = AdjustMirror;

	}


	new function () {
		jsml.tween = {};
		jsml.tween.linear = function (p) {
			return p;
		}

		jsml.tween.make_boolean_property = function (obj, prop, targetp) {
			if (!targetp) targetp = 1;
			var currval = obj["get_" + prop]();
			return function (p) {
				var newval = currval;
				if (p >= targetp)
					newval = !newval;
				obj["set_" + prop](newval)
			}
		}
		jsml.tween.make_number_property = function (obj, prop, offset, fixfunc) {
			var currval = obj["get_" + prop]();
			return function (p) {
				var newval = currval + offset * p;
				if (fixfunc) newval = fixfunc(newval);
				obj["set_" + prop](newval)
			}
		}

		var define = jsml.class_define("timenode", "jsml");
		define.constructor(function () {
			this.jsml_constructor();
			this._child_nodes = null;
			this._progress = 0;
			this.onprogress = null;
			this.transform_data = jsml.tween.linear;
			this.transform_time = jsml.tween.linear;
		});
		define.method("append_child", function (cn) {
			if (!cn) cn = jsml.new_timenode();
			if (this._child_nodes == null) this._child_nodes = [];
			this._child_nodes.push(cn);
			return cn;
		});
		define.method("dispose_children", function () {
			if (this._child_nodes) {
				for (var i = 0; i < this._child_nodes.length; i++) {
					this._child_nodes[i].dispose();
				}
				this._child_nodes = null;
			}
		});
		define.method("dispose", function () {
			if (this._child_nodes) {
				for (var i = 0; i < this._child_nodes.length; i++) {
					this._child_nodes[i].dispose();
				}
				this._child_nodes = null;
			}
			this.jsml_dispose();
		}, "jsml_dispose");
		define.method("add_onprogress", function (func) {
			if (typeof (func) != "function") throw (new Error("argument is not a function"));
			var cn = jsml.new_timenode();
			cn.onprogress = func;
			return this.append_child(cn);
		});
		define.property("progress",
			function () {
				return this._progress;
			}
			,
			function (value) {
				value = parseFloat(value) || 0;
				if (value < 0) value = 0;
				if (value > 1) value = 1;
				if (this._progress == value) return;
				this._progress = value;
				this._handleprogress();
			}
		);
		define.method("_handleprogress", function () {
			if (this.onprogress) this.onprogress(this.transform_data(this._progress));
			if (!this._child_nodes) return;
			for (var i = 0; i < this._child_nodes.length; i++) {
				var cn = this._child_nodes[i];
				var cnt = this._progress == 1 ? 1 : cn.transform_time(this._progress);
				if (cnt != -1) {
					cn.set_progress(cnt);
				}
			}
			this.invoke_event("progress");
		});
		define.property("onprogress",
			function () {
				return this.onprogress;
			}
			,
			function (value) {
				this.onprogress = value;
			}
		);

		jsml.tween.default_fps = 100;
		var define = jsml.class_define("timeline", "timenode");
		define.constructor(function () {
			this.timenode_constructor();
			this._fps = jsml.tween.default_fps;
			this._timespan = 1000;
		});
		define.property("fps",
			function () {
				return this._fps;
			}
			,
			function (value) {
				value = parseInt(value) || jsml.tween.default_fps;
				if (value > 500) value = 500;
				if (value < 1) value = 1;
				if (this._fps == value) return;
				this._fps = value;
				if (this._started) {
					this._started = null;
					this._ontimer();
				}
			}
		);
		define.property("timespan",
			function () {
				return this._timespan;
			}
			,
			function (value) {
				value = parseInt(value) || 1000;
				if (value < 10) value = 10;
				this._timespan = value;
			}
		);
		define.method("start", function () {
			if (this._started) return;
			this._begin_p = this._progress;
			if (this._begin_p == 1) return;
			this._begin_t = new Date().getTime();
			this._begin_t -= this._begin_p * this._timespan
			this._started = this.setDelegateTimeout(this._ontimer, Math.floor(1000 / this._fps));
		});
		define.method("is_started", function () {
			return !!this._started;
		});
		define.method("_ontimer", function () {
			var ts = new Date().getTime() - this._begin_t;
			var p = ts / this._timespan;
			if (p > 1) p = 1;
			this._started = this.setDelegateTimeout(this._ontimer, Math.floor(1000 / this._fps));
			jsml.suppend_layout();
			this.set_progress(p);
			jsml.resume_layout();
		});
		define.method("pause", function () {
			if (!this._started) return;
			clearTimeout(this._started);
			this._started = null;
		});
		define.method("_handleprogress", "time_node__handleprogress", function () {
			this.time_node__handleprogress();
			if (this._started) {
				this._begin_p = this._progress;
				this._begin_t = new Date().getTime();
				this._begin_t -= this._begin_p * this._timespan
			}
			if (this._progress == 1) {
				this.pause();
			}
		});
	}

	new function () {
		jsml.prototype.get_rotation = function () {
			return this._rotation || 0;
		}
		jsml.prototype.set_rotation = function (value) {
			value = jsml.tonumber(value, 0)
			if ((this._rotation || 0) == value) return;
			this._rotation = value;
			if (jsml.msie) {
				this._apply_dxt_rotation();
				return;
			}
			if (jsml.firefox)
				this._estyle.MozTransform = "rotate(" + this._rotation + "deg)";
			else if (jsml.webkit)
				this._estyle.WebkitTransform = "rotate(" + this._rotation + "deg)";
			else if (jsml.opera)
				this._estyle.OTransform = "rotate(" + this._rotation + "deg)";
			else
				this._estyle.Transform = "rotate(" + this._rotation + "deg)";
		}
		jsml.prototype._apply_dxt_rotation = function () {
			if (!this._apply_dxt_rotation_hook) {
				this.attach_event("resumelayout", this._apply_dxt_rotation_core);
				this._apply_dxt_rotation_hook = true;
			}
			this._require_dxt_rotation = 1;
			this._setresumehandler();
		}
		jsml.prototype._apply_dxt_rotation_core = function () {
			if (!this._require_dxt_rotation) return;
			this._require_dxt_rotation = false;

			var filter = "";
			if (this._rotation % 360 != 0) {
				var m11 = Math.cos(this._rotation * Math.PI / 180).toFixed(12);
				var m12 = -Math.sin(this._rotation * Math.PI / 180).toFixed(12);
				var m21 = -m12;
				var m22 = m11;
				filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22
					+ ",SizingMethod='auto expand',FilterType='nearest neighbor')";
			}

			if (!this._rotation_fixresize) {
				this.attach_event("update_layout", this._apply_dxt_rotation);
				this._rotation_fixresize = true;
			}

			applyrotate(this, 0);

			function applyrotate(ctrl, lvl, p, px, py) {
				ctrl._estyle.filter = filter;
				var xx = 0;
				var yy = 0;
				if (!filter) {
					ctrl.set_matrix_x(0)
					ctrl.set_matrix_y(0)
				}
				else {
					var w = ctrl.get_current_width();
					var h = ctrl.get_current_height();
					var ow = Math.max(Math.abs(((-w) * m11 + (-h) * m21) - ((w) * m11 + (h) * m21)), Math.abs(((-w) * m11 + (h) * m21) - ((w) * m11 + (-h) * m21))) / 2
					var oh = Math.max(Math.abs(((-w) * m12 + (-h) * m22) - ((w) * m12 + (h) * m22)), Math.abs(((-w) * m12 + (h) * m22) - ((w) * m12 + (-h) * m22))) / 2
					xx = (w - ow) / 2;
					yy = (h - oh) / 2;
					if (lvl == 0) {
						ctrl.set_matrix_x(xx)
						ctrl.set_matrix_y(yy)
					}
					else {
						var pb = p.get_outer_border_width();
						var la = pb[3] + ctrl.get_current_left() + ctrl.get_current_width() / 2 - p.get_current_width() / 2;
						var ta = pb[0] + ctrl.get_current_top() + ctrl.get_current_height() / 2 - p.get_current_height() / 2;
						var lb = la * m11 + ta * m21;
						var tb = la * m12 + ta * m22;
						var si = lvl % 2 == 1 ? 1 : -1;
						ctrl.set_matrix_x(xx + si * (la - lb) - px)
						ctrl.set_matrix_y(yy + si * (tb - ta) - py)
					}
				}

				if (jsml.msie8more && ctrl._childs) {
					ctrl._estyle.overflow = "visible";
					for (var i = 0; i < ctrl._childs.length; i++)
						applyrotate(ctrl._childs[i], lvl + 1, ctrl, xx, yy);
				}
			}

		}
	}

	for (var p in jsml) {
		var v = jsml[p];
		if (typeof (v) == "function") {
			v.typename = "jsml";
			v.methname = p;
		}
	}

	jsml.dom_attach_event(window, "unload", function () {
		if (jsml.disposebasic) jsml.disposebasic();
	});

}

//v3.36


