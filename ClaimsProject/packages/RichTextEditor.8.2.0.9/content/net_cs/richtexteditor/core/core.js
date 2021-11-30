/*

this.__surroundNodes=function(node)
this.__surroundNode=function(node)

$rte.Base=$rte.object._extends(function(base,type){
$rte.Attribute=$rte.Base._extends(function(base,type){
$rte.Node=$rte.Base._extends(function(base,type){
	this.__removeNode=function(all)
	this.__notifyChanged=function(onlyprop)
	this.__findPrev=function()
	this.__findNext=function()
	this.__cloneAttributes=function()
	this.__translateStyleValue=function(nlower,value)
	this.__updateAttributeToView=function(name,domnode)
	this.__setRuntimeAttribute=function(name,value,category,lowpriority)
	this.__removeAttribute=function(name)
	this.__setAttributeObject=function(attr)
	this.__getAttributeObject=function(name)
	this.__getAttribute=function(name)
	this.__setAttribute=function(name,val)
	this.__getAttributeNames=function()
	this.__getAttributeCode=function(option)
	this.__removeStyle=function(name)
	this.__getStyle=function(name)
	this.__setStyle=function(name,value)
	this.__getHtmlCode=function(option)
	this.__codeEquals=function(node)
	this._attachCore=function(core)
	this._detachCore=function()
	this._createViewNode=function()
	this._cloneNode=function(all)
	this.__getMaxOffset=function()
	this._translateOffset=function(dom,offset)
	this._getNodeOffset=function(offset)
	this._getOffsetPath=function(offset)
	this.__isBlock=function()
	this.HasBlockStyle=function()
	this.__notSplitable=function()
	this.IsContent=function()
	this.IsControl=function()
	this.GetName=function()
	this.GetParent=function()
	this.GetHtmlTagName=function(option)
	this.GetViewNode=function()
	this.GetHtmlCode=function()
	this.GetStyle=this.__getStyle;
	this.SetStyle=this.__setStyle;
	this.SetRuntimeAttribute=this.__setRuntimeAttribute;
	this.SetAttribute=this.__setAttribute;
	this.GetAttribute=this.__getAttribute;
	this.SetAttributeObject=this.__setAttributeObject
	this.GetAttributeObject=this.__getAttributeObject
	this.Contains=function(node)
$rte.CommentNode=$rte.Node._extends(function(base,type){
$rte.TextNode=$rte.Node._extends(function(base,type){
$rte.TypingNode=$rte.TextNode._extends(function(base,type)
$rte.Element=$rte.Node._extends(function(base,type){
$rte.GenericElement=$rte.Element._extends(function(base,type){
$rte.ContainerElement=$rte.Element._extends(function(base,type){
$rte.TableElement=$rte.ContainerElement._extends(function(base,type){
$rte.ObjectElement=$rte.ContainerElement._extends(function(base,type){
$rte.CoreBodyElement=$rte.ContainerElement._extends(function(base,type){
$rte.CoreTempElement=$rte.ContainerElement._extends(function(base,type){
$rte.Selection=$rte.Base._extends(function(base,type){
$rte.Core=$rte.Base._extends(function(base,type){
this._broadcastEvent=function(name,args)
this._invokeUIRequest=function(cmd)
this.__trace=function(msg,cat,info,obj)
this.__getEditHtml=function()
this.__parseHtmlCode=function(html)
this.__setEditHtml=function(value)
this.__resetFrame=function()
this.__notifyContentChanged=function(onlyprop)
this.__stopNotifyChanged=function()
this.__notifySelectionChanged=function()
this.__canUndo=function()
this.__canRedo=function()
this.__doUndo=function()
this.__doRedo=function()
this.__loadLog=function(index)
this.__loadLogSelection=function()
this.__loadLogIndex=function(sp)
this.__saveLogContent=function(force)
this.__saveLogSelection=function()
this.__changeTabMode=function(mode)
this.__notifyUpdateUI=function()
this.__getNodeFromDom=function(htmlelement,includeBody,includeDesignElement)
this.__internalSplitNode=function(node,pos)
this.__splitRangeForLogic=function(logicfunc,option)
this.__formatLogic=function(option,action)
this.__removeFormat=function()
this.__changeCase=function(ucase)
this.__formatPainterFetch=function()
this.__formatPainterApply=function()

function __core_initEvents(core,detach)
core.__win.document.on

this.__checkRangeOrPoint=function()
this.__resetSyncSelection=function()
this.__requireSyncSelection=function()
this.__checkSyncSelection=function()
this.__handleSyncSelection=function()
this.__startSetSelection=function()
this.__stopSetSelection=function()
this.__verifySelectionType=function()
this.__reinitSelection=function()
this.__selectAny=function(synctodom)
this.__selectLastTextNode=function(synctodom)
this.__getSelectionType=function()
this.__getPointNode=function()
this.__getPointOffset=function()
this.__getRangeNode=function()
this.__getRangeOffset=function()
this.__selectNone=function()
this.__selectControl=function(ctrl)
this.__setPointInside=function(node,offset)
this.__setPointBefore=function(node)
this.__setPointAfter=function(node)
this.__setRangeInside=function(node,offset)
this.__setRangeBefore=function(node)
this.__setRangeAfter=function(node)
this.__selectTextNode=function(node)
this.__collapseRange=function(start)
this.__translateOffset=function(node,dom,offset)
this.__getNodeOffset=function(node,offset)
this.__rangeSyncFromDom=function()
this.__rangeSyncToDom=function(force)
this.__scrollIntoView=function(synctodom)
this.__getNodePath = function(node)
this.__findNodeByPath=function(path)
this.__saveBookmark=function()
this.__restoreBookmark=function(bookmark)
this.__clearTDResizeTool=function()
this.__applyTDResizeTool=function(node)
this.__clearControlSelection=function()
this.__applyControlSelection=function(node)
this.3function(node,start)
this.__getRangeTextNodes=function()
this.__isTwoNodeCrossBlock=function(node,endnode)
this.__isCrossBlock=function()
this.__splitRangeNodes=function(option)
this.__cloneRangeNodes=function(rootfilter)
this.__extractRangeNodes=function(delit)
this.__handleEnter=function(be)
this.__deleteNodeAndSelect=function(node,backward)
this.__clearEmptyParagraph=function(p)
this.__tryJoinParagraph=function(node,endnode,backward)
this.__deleteNodeLeft=function(node,pos,ctrlmode)
this.__deleteNodeRight=function(node,pos,ctrlmode)
this.__deleteToLeft=function()
this.__deleteToRight=function()
this.__deleteSelection=function(backward)
this.__isSelectedInSameTextNode=function()
this.__insertHtmlCode=function(html)
this.__putCutCopyDiv=function()
this.__handleCut=function()
this.__handleCopy=function()
this.__handlePaste=function()
this.ExecPaste=function(cmd,element)
this.FilterByPasteCommand=function(html,cmd)
this.__old__MoveRight=function()
this.__old__MoveLeft=function()


this.GetWindow=function()
this.IsFocused=function()
this.Focus=function()

this.GetSelectionType=function()
this.MoveToDocumentBegin=function()
this.MoveToDocumentEnd=function()
this.GetPointNode=function()
this.GetPointOffset=function()
this.SelectControl=function(ctrl)
this.ExtractRangeNodes=function(delit)
this.GetRangePreviewHTML=function(cmd)
this.ExtractRangeHTML=function(delit)
this.DeleteSelection=function(backward)
this.NotifyUpdateUI=function()
this.SaveLogContent=function(force)
this.LoadLogIndex=function(index)
this.SaveLogIndex=function(index)
this.InsertNode=function(node)
this.InsertHTML=function(html,select)
this.GetText=function()
this.SetText=function(value)
this.ParseHtmlCode=function(html)
this.GetHtmlCode=function()
this.SetHtmlCode=function(value)
this.IsTabEdit=function()
this.IsTabCode=function()
this.IsTabView=function()
this.ExecCommand=function(cmd,val1,val2,val3)
this.CanExecCommand=function(cmd)
this.QueryCommand=function(cmd,val1,val2,val3)
this.ExecUICommand=function(element,cmd,arg0,arg1,arg2)
this.__paragraphLogic=function(argnode,argpos,option,action,doselect)
this.__justifyControl=function(mode)
this.__justifyParagraph=function(mode,action)
this.__getParagraphList=function(breakIfNoParagraph)
this.__insertItemListImpl=function(listname,styletype)
this.__inoutdentParagraph=function(size,isout)
this.__createFormatLogic=function(cmdlower,expression)
this.__getFormatLogic=function(cmd)
this.ExecFormatLogic=function(cmd,val1,val2,val3)
this.QueryFormatLogic=function(cmd,val1,val2,val3)
this.__execTableCommand=function(cmd,mode)
this.AdjustTableSizeForCell=function(td)
this.CallAjax=function(method,handler,arg0)

function GetFlashVersion()
function __parseHTML(core,html)

function Browser_HasValidSelection(win)
....
this._browserSetPointInside=function(win,node,offset)

this._ResetFCButton=function(element,command,node,onhover,onleave,ondown,onup,onclick)

function RTEAjax(ctrlid,method,callback,arg0)

*/


//if(jsml.msie5678)jsml.bodydivmode=true;

var core_mobile = false;

jsml.bodydivmode = true;

jsml.bodymixmode = true;

//firefox issue : if set bodymixmodetyping to true, when type in front of the TypingNode , firefox will add <br> after the char
jsml.bodymixmodetyping = !jsml.firefox;

if (!jsml.msie) jsml.ie11 = /Trident/.test(jsml.userAgent);//IE11
jsml.msieall = jsml.msie || jsml.ie11;

//$rte.SafeSetTimeout=function(handler,timeout)
//{
//	return setTimeout(function(arg1)
//	{
//		handler(arg1);
//	},timeout);
//}

function RteHtmlDecode(html, pre) {
	return jsml.html_decode(html, pre);
}


$rte.SafeSetTimeout = function (handler, timeout) {
	return setTimeout(function (arg1) {
		try {
			handler(arg1);
		}
		catch (x) {
		}
	}, timeout);
}

$rte.Attribute = $rte.Base._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);
		this.__name = name;
		this.__namelower = name.toLowerCase();
		this.__value = "";
		this.__quote = '"';
		this.__html = "";
		this.__last = "value";
	}
	this._cloneNode = function (all) {
		var attr = new this.constructor(this.__name);
		attr.__value = this.__value;
		attr.__quote = this.__quote;
		attr.__html = this.__html;
		attr.__last = this.__last;
		return attr;
	}
	this.GetName = function () {
		return this.__name;
	}
	this.GetNameLower = function () {
		return this.__namelower;
	}
	this.GetValue = function () {
		return this.__value;
	}
	this.__setValue = function (val) {
		this.__value = String(val);
		this.__last = "value";
	}
	this.GetQuote = function () {
		return this.__quote;
	}
	this.__setQuote = function (val) {
		this.__quote = String(val);
		//this.__last="quote";
	}
	this.__setHtmlCode = function (val) {
		this.__html = val || "";
		this.__last = "html";
	}
	this.__getHtmlCode = function (option) {
		if (this.__last == "html")
			return this.__html;
		return this.__name + "=" + this.__quote + this.HtmlEncode(this.__value) + this.__quote;
	}

	this.__fixAttribute = function (node, core) {
		if (!this.__value)
			return;
		switch (this.__namelower) {
			case "src":
			case "href":
				if (this.__value.indexOf("mailto:") == 0)
					return;
				if (this.__value.indexOf("javascript:") == 0)
					return;
				var urltype = core.__config.urltype;
				if (!urltype)
					return;
				if (urltype == "siterelative")
					return this.__convertToRelative(node, core);
				if (urltype == "absolute")
					return this.__convertToAbsolute(node, core);
				break;
		}
	}
	this.__convertToRelative = function (node, core) {
		var val = this.__value;
		if (val.charAt(0) == '#')
			return;
		if (val.indexOf('://') == -1) {
			if (val.indexOf("/") == 0)
				return;
			if (!core.__config.forcerelative)
				return;
			val = core.__getDirBase() + val;
		}
		var urlbase = core.__getUrlBase();
		if (val.charAt(urlbase.length) != '/')
			return;
		if (val.substring(0, urlbase.length) != urlbase)
			return;
		this.__value = val.substring(urlbase.length);
		this.__last = "value";
	}
	this.__convertToAbsolute = function (node, core) {
		var val = this.__value;
		if (val.charAt(0) == '#')
			return;
		if (val.indexOf('://') != -1)
			return;
		if (val.charAt(0) == '/')
			this.__value = core.__getUrlBase() + val;
		else
			this.__value = core.__getDirBase() + val;
		this.__last = "value";
	}

});

$rte.Node = $rte.Base._extends(function (base, type) {

	function __extrastylename(pair, start, pos) {
		return pair.substring(start, pos).split(' ').join('').toLowerCase();
	}

	this.init = function (name) {
		this.__name = name;
		this.__namelower = name.toLowerCase();
		this.__core = null;
		this.__parent = null;
		this.__viewnode = null;
		this.__attrs = [];
		this.__rattrs = null;
		this.nodeType = 0;
		base.init.apply(this, arguments);
	}

	this.__requireSpecialChars = function () {
	}
	this.__processSpecialChars = function () {
	}

	this.IsAttached = function () {
		return !!this.__core;
	}

	this.__notifyChanged = function (onlyprop) {
		if (!this.__core) return;
		this.__core.__notifyContentChanged(onlyprop, this);
		if (!this.__hascontenteditable) return;
		var ce = this.__getAttribute("contenteditable");
		if (!ce) return;
		ce = ce.toLowerCase();
		if (ce == "false") {
			this.__core.__notifyInvalidChanged(this, "contenteditable");
		}
	}

	this.__checkNotEditable = function () {
		for (var p = this; p != null; p = p.__parent) {
			if (!p.__hascontenteditable)
				continue;
			var ce = p.__getAttribute("contenteditable");
			if (!ce)
				continue;
			ce = ce.toLowerCase();
			if (ce == "false") {
				return true;
			}
		}
	}

	this.__removeNode = function (all, askparentfixnbsp) {
		if (this.__parent == null)
			return false;
		this.__parent.__removeChild(this, askparentfixnbsp);
		return true;
	}
	this.__findPrev = function (siblingOnly) {
		if (this.__parent == null)
			return null;
		var pos = this.__parent.__indexOf(this);
		if (!siblingOnly && pos == 0)
			return this.__parent.__findPrev();
		return this.__parent.__nodes[pos - 1];
	}
	this.__findNext = function (siblingOnly) {
		if (this.__parent == null)
			return null;
		var pos = this.__parent.__indexOf(this);
		if (!siblingOnly && pos + 1 >= this.__parent.__nodes.length)
			return this.__parent.__findNext();
		return this.__parent.__nodes[pos + 1];
	}
	this.__findParent = function (tagname, n2) {
		tagname = tagname.toLowerCase();
		if (n2) n2 = n2.toLowerCase();
		for (var p = this.__parent; p != null; p = p.__parent) {
			if (p.__namelower == tagname || p.__namelower == n2)
				return p;
		}
	}
	this.__cloneAttributes = function () {
		var attrs = this.__attrs.concat();
		for (var i = 0; i < attrs.length; i++)
			attrs[i] = attrs[i]._cloneNode();
		return attrs;
	}
	this.__clearAttributes = function () {
		var attrs = this.__attrs;
		if (attrs.length == 0)
			return;
		var names = [];
		for (var i = 0; i < attrs.length; i++)
			names.push(attrs[i].__name);
		this.__attrs = [];
		for (var i = 0; i < names.length; i++)
			this.__updateAttributeToView(names[i]);
		this.__notifyChanged(true);
	}
	this.__cloneRuntimeAttributes = function () {
		if (this.__rattrs)
			return this.__rattrs.concat();
		return null;
	}

	this.__translateStyleValue = function (nlower, value) {
		switch (nlower) {
			case "cursor":
			case "behavior":
				return null;
		}
		if (this.__config && this.__config.TranslateStyleValue) {
			value = this.__config.TranslateStyleValue(nlower, value, this)
		}
		return value;
	}

	this.ResyncAttributeToView = function (name, domnode) {
		if (!domnode) domnode = this.__viewnode;
		if (!domnode) return;
		domnode.removeAttribute(name);
		this.__updateAttributeToView(name, domnode);
	}

	this.__updateAttributeToView = function (name, domnode) {
		if (!domnode) domnode = this.__viewnode;
		if (!domnode) return;
		name = name.toLowerCase();

		//TODO:scan more forbidden attribute here.
		if (name.charAt(0) == 'o' && name.charAt(1) == 'n') return;
		switch (name) {
			//case "id":
			case "title":
			case "disabled":
			case "unselectable":
				return;
			case "contenteditable":
				this.__hascontenteditable = true;
				if (this.__config) this.__config.__hascontenteditable = true;
				break;
		}

		var value = this.__getAttribute(name);

		if (this.__config && this.__config.TranslateAttribute) {
			value = this.__config.TranslateAttribute(name, value, this)
		}


		var rattrs = this.__rattrs;
		var vals;

		if (rattrs && rattrs.length) {
			vals = [];
			for (var i = rattrs.length - 1; i >= 0; i--) {
				if (rattrs[i].priority > 0 && rattrs[i].name == name)
					vals.push(rattrs[i].value);
			}
			vals.push(value);
			for (var i = rattrs.length - 1; i >= 0; i--) {
				if (rattrs[i].priority < 0 && rattrs[i].name == name)
					vals.push(rattrs[i].value);
			}
		}

		if (name == "style") {
			var map = {};
			var arr = [];
			if (!vals) vals = [value];
			for (var i = 0; i < vals.length; i++) {
				if (!vals[i]) continue;
				var pairs = vals[i].split(';');
				for (var j = 0; j < pairs.length; j++) {
					var pair = pairs[j];
					var pos = pair.indexOf(':');
					if (pos == -1)
						continue;
					var n = __extrastylename(pair, 0, pos);
					var v = pair.substring(pos + 1).replace(/(^\s+|\s+$)/g, "");
					v = this.__translateStyleValue(n, v);
					if (!v)
						continue;

					if (map["style_" + n])
						continue;
					map["style_" + n] = 1;
					arr.push(pair);
				}
			}
			value = arr.join(';');
		}
		else if (name == "class") {
			if (vals) value = vals.join(' ').replace(/(^\s+|\s+$)/g, "");
			//for ie compatible view
			if (jsml.msieall) domnode.className = value;
		}
		else {
			if (vals) value = vals[0];
		}

		if (name == "style") {
			domnode.style.cssText = value;
		}

		if (value)
			domnode.setAttribute(name, value);
		else
			domnode.removeAttribute(name);
	}

	this.__setRuntimeAttribute = function (name, value, category, lowpriority) {
		if (!name) return;
		name = name.toLowerCase();
		if (this.__rattrs == null) this.__rattrs = [];
		for (var i = 0; i < this.__rattrs.length; i++) {
			var att = this.__rattrs[i];
			if (att.name == name && att.category == category) {
				if (value) {
					att.value = value;
					this.__updateAttributeToView(name);
					return;
				}
				this.__rattrs.splice(i, 1);
				this.__updateAttributeToView(name);
				return;
			}
		}
		if (!value) return;
		var att = { name: name, value: value, category: category, priority: lowpriority ? -1 : 1 }
		this.__rattrs.push(att);
		this.__updateAttributeToView(name);
	}

	this.__removeAttribute = function (name) {
		name = name.toLowerCase();
		for (var i = 0; i < this.__attrs.length; i++) {
			var attr = this.__attrs[i];
			if (attr.__namelower == name) {
				this.__attrs.splice(i, 1);
				this.__updateAttributeToView(name);
				this.__notifyChanged(true);
				return;
			}
		}
	}
	this.__setAttributeObject = function (attr) {
		this.__removeAttribute(attr.__name);
		this.__attrs.push(attr);
		if (this.__core) attr.__fixAttribute(this, this.__core);
		this.__updateAttributeToView(attr.__name);
		this.__notifyChanged(true);
	}
	this.__getAttributeObject = function (name) {
		name = name.toLowerCase();
		for (var i = 0; i < this.__attrs.length; i++) {
			var attr = this.__attrs[i];
			if (attr.__namelower == name)
				return attr;
		}
		return null;
	}
	this.__getAttribute = function (name) {
		var attr = this.__getAttributeObject(name);
		if (attr == null)
			return null;
		return attr.GetValue();
	}
	this.__setAttribute = function (name, val) {
		if (val == null) {
			this.__removeAttribute(name);
			return;
		}
		var attr = this.__getAttributeObject(name);
		var oldval;
		if (attr == null) {
			attr = new $rte.Attribute(name);
			this.__attrs.push(attr);
		}
		else {
			oldval = attr.GetValue();
		}
		if (oldval == val)
			return;
		if (name == "style")
			val = val.replace(/(^\s+|\s+$)/g, "");
		attr.__setValue(val);
		if (this.__core) attr.__fixAttribute(this, this.__core);
		this.__updateAttributeToView(name);
		this.__notifyChanged(true);
	}
	this.__getAttributeNames = function () {
		var arr = [];
		for (var i = 0; i < this.__attrs.length; i++)
			arr.push(this.__attrs[i].__name);
		return arr;
	}
	this.__getAttributeCode = function (option) {
		if (this.__attrs.length == 0)
			return "";
		var sb = [];
		for (var i = 0; i < this.__attrs.length; i++) {
			sb.push(" ");
			sb.push(this.__attrs[i].__getHtmlCode(option));
		}
		return sb.join("");
	}

	this.__importAttributes = function (node) {
		var arr = node.__attrs;
		var len = arr.length;
		for (var i = 0; i < len; i++)
			this.__setAttributeObject(arr[i]._cloneNode())
	}

	this.__removeStyle = function (name) {
		var str = this.__getAttribute("style");
		if (!str)
			return;
		name = name.toLowerCase();
		var removed = false;
		var pairs = str.split(';');
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var pos = pair.indexOf(':');
			if (pos == -1) continue;
			if (name == __extrastylename(pair, 0, pos)) {
				pairs.splice(i, 1);
				removed = true;
				i--;
			}
		}
		if (removed) {
			if (pairs.length == 0)
				this.__removeAttribute("style");
			else
				this.__setAttribute("style", pairs.join(';'));
		}
	}
	this.__getStyle = function (name) {
		var str = this.__getAttribute("style");
		if (!str)
			return null;
		name = name.toLowerCase();
		var pairs = str.split(';');
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var pos = pair.indexOf(':');
			if (pos == -1) continue;
			if (name == __extrastylename(pair, 0, pos))
				return pair.substring(pos + 1).replace(/(^\s+|\s+$)/g, "");
		}
	}
	this.__setStyle = function (name, value) {
		if (!value) {
			this.__removeStyle(name);
			return;
		}
		name = name.toLowerCase();
		var exp = name + ":" + value;
		var str = this.__getAttribute("style");
		if (!str) {
			this.__setAttribute("style", exp);
			return;
		}
		var changed = false;
		var pairs = str.split(';');
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var pos = pair.indexOf(':');
			if (pos == -1) continue;
			if (name != __extrastylename(pair, 0, pos))
				continue;
			if (pairs[i] == exp)
				return;
			pairs[i] = exp
			changed = true;
			break;
		}
		if (!changed) {
			pairs.push(exp);
		}
		this.__setAttribute("style", pairs.join(';'));
	}
	this.__getHtmlCode = function (option) {
		var sb = [];
		this._writeHtml(sb, option);
		return sb.join("");
	}
	this._writeHtml = function (sb, option) {
		error_notimplemented();
	}
	this._writeText = function (sb, option) {
		error_notimplemented();
	}
	this.GetInnerText = function (option) {
		var sb = [];
		this._writeText(sb, option);
		return sb.join("");
	}

	this.__syncContent = function (ctx) {

	}

	this.__codeEquals = function (node) {
		if (this.__namelower != node.__namelower)
			return;
		if (this.__attrs.length != node.__attrs.length)
			return;
		for (var i = 0; i < this.__attrs.length; i++) {
			var a1 = this.__attrs[i];
			var a2 = node.__attrs[i];
			if (a1.__namelower != a2.__namelower)
				return;
			if (a1.__value != a2.__value)
				return;
		}
		return true;
	}

	this._attachCore = function (core) {
		this.__core = core;
		this.__config = core.__config;
		this.__viewnode = this.__attachviewnode || this._createViewNode(this.__core.__win.document);
		this.__viewnode.__jsnode = this;

		if (this.IsControl()) {
			this.__viewnode.style.cursor = "default";
		}

		for (var i = 0; i < this.__attrs.length; i++) {
			this.__attrs[i].__fixAttribute(this, core);
		}

		if (!this.__rattrs) {
			for (var i = 0; i < this.__attrs.length; i++) {
				this.__updateAttributeToView(this.__attrs[i].__name);
			}
		}
		else {
			var namem = {};
			var names = [];
			for (var i = 0; i < this.__attrs.length; i++) {
				var name = this.__attrs[i].__namelower;
				names.push(name);
				namem["attr_" + name] = true;
			}
			for (var i = 0; i < this.__rattrs.length; i++) {
				var name = this.__rattrs[i].name.toLowerCase();
				if (namem["attr_" + name]) continue;
				names.push(name);
				namem["attr_" + name] = true;
			}
			for (var i = 0; i < names.length; i++) {
				this.__updateAttributeToView(names[i]);
			}
		}
	}
	this._detachCore = function () {
		if (this.__viewnode != null) {
			//dispose view node
			this.__viewnode = null;
		}
		this.__core = null;
	}
	this._createViewNode = function () {
		error_notimplemented();
	}
	this._cloneNode = function (all) {
		error_notimplemented();
	}

	this.__getMaxOffset = function () {
		if (this.nodeType == 3)
			return this.__text.length;
		if (this.__nodes)
			return this.__nodes.length;
		return 0;
	}
	this.GetMaxOffset = this.__getMaxOffset;
	this._translateOffset = function (dom, offset) {
		return offset;
	}
	this._getNodeOffset = function (offset) {
		return { node: this.__viewnode, offset: offset };
	}
	this._getOffsetPath = function (offset) {
		return String(offset);
	}

	this.__isList = function () {
		if (!this.__nodes)
			return false;
		if (this.__namelower == "ol")
			return true;
		if (this.__namelower == "ul")
			return true;
		return false;
	}
	this.__isBlock = function () {
		if (!this.__nodes)
			return false;

		switch (this.__namelower) {
			case "pre":
			case "p":
			case "div":
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
			case "li":
			case "ul":
			case "ol":
			case "dl":
			case "dt":
			case "dd":
			case "address":

			case "article":
			case "section":
			case "hgroup":
			case "header":
			case "footer":
			case "aside":

			case "table":
			case "tbody":
			case "thead":
			case "tfoot":
			case "tr":
			case "td":
			case "th":
			case "fieldset":
			case "legend":
			case "form":
			case "body":
				return true;
			default:
				if (this.__getStyle("position") == "absolute")
					return true;
		}

		return false;
	}

	this.__notSplitable = function () {
		switch (this.__namelower) {
			case "table":
			case "tbody":
			case "thead":
			case "tfoot":
			case "tr":
			case "td":
			case "th":
			case "blockquote":
			case "fieldset":
			case "legend":
			case "form":
			case "body":

			case "details":

			case "a":
				return true;
			case "div":
				//box formatting
				if (this.__getStyle("border") || this.__getStyle("border-width") || this.__getStyle("border-style"))
					return true;
				if (this.__core && this.__core.__config.divisblockforpbr && this.__core.__config.enterkeytag != "div")
					return true;
				break;
			default:
				break;
		}

		if (this.__getStyle("position") == "absolute")
			return true;
	}
	this.__notDeletable = function () {
		switch (this.__namelower) {
			case "body":
			case "tbody":
			case "thead":
			case "tfoot":
			case "tr":
			case "td":
			case "th":
				return true;
		}
	}
	this.NotDeletable = this.__notDeletable;
	this.SupportPaste = function () {
		if (this.__notDeletable())
			return false;
		switch (this.__namelower) {
			case "li":
				return false;
		}
		return true;
	}
	this.CanRemoveTag = function () {
		switch (this.__namelower) {
			case "table":
			case "tbody":
			case "thead":
			case "tfoot":
			case "tr":
			case "td":
			case "th":
			case "ol":
			case "ul":
			case "li":
			case "object":
			case "embed":
			case "video":
			case "audio":
			case "select":
				return false;
		}
		if (this.__getStyle("position") == "absolute")
			return false;
		return true;
	}
	this.__notFormatable = function () {
		switch (this.__namelower) {
			case "br":
			case "hr":
			case "img":
			case "object":
			case "embed":
			case "video":
			case "audio":
			case "input":
			case "textarea":
			case "select":
			case "button":
				return true;
		}
	}
	this.IsContent = function () {
		return this.nodeType == 3 || this.IsControl();
	}
	this.IsControl = function () {
		switch (this.__namelower) {
			case "br"://for IsContent
			case "hr":
			case "img":
			case "object":
			case "embed":
			case "video":
			case "audio":
			case "canvas":
			case "iframe":
			case "table":
			case "fieldset":

			case "input":
			case "button":
			case "select":
			case "textarea":
				return true;
		}
		//if(this.GetStyle("position")=="absolute")
		//	return true;
		return false;
	}

	this.GetName = function () {
		return this.__name;
	}
	this.GetNameLower = function () {
		return this.__namelower;
	}
	this.GetParent = function () {
		return this.__parent;
	}
	this.RemoveNode = function (all) {
		this.__removeNode(all);
	}
	this.GetHtmlTagName = function (option) {
		return this.__name;
	}
	this.GetViewNode = function () {
		return this.__viewnode;
	}
	this.GetHtmlCode = function () {
		return this.__getHtmlCode();
	}

	this.GetStyle = this.__getStyle;
	this.SetStyle = this.__setStyle;
	this.SetRuntimeAttribute = this.__setRuntimeAttribute;
	this.SetAttribute = this.__setAttribute;
	this.GetAttribute = this.__getAttribute;
	this.RemoveAttribute = this.__removeAttribute;
	this.SetAttributeObject = this.__setAttributeObject
	this.GetAttributeObject = this.__getAttributeObject
	this.GetAttributeCode = this.__getAttributeCode;

	this.Contains = function (node) {
		while (node) {
			if (node == this)
				return true;
			node = node.__parent;
		}
	}

	this.__getAlignMode = function () {
		var floa = this.__getStyle("float");
		if (floa)
			return floa;
		var disp = this.__getStyle("display");
		if (disp == "block")
			return "block";
		if (disp == "inline-block" || disp == "inline")
			return "none";
		if (this.__namelower == "img")
			return "none";
		return "block";
	}
	this.__setAlignMode = function (mode) {
		var floa = null;
		var disp = null;
		if (mode == "left" || mode == "right") {
			floa = mode;
		}
		else if (this.__namelower == "img") {
			if (mode == "block")
				disp = "block";
		}
		else {
			if (mode == "none")
				disp = "inline-block";
		}
		this.__setStyle("display", disp);
		this.__setStyle("float", floa);
	}

	this.GetAlignMode = this.__getAlignMode;
	this.SetAlignMode = this.__setAlignMode;

});
$rte.CommentNode = $rte.Node._extends(function (base, type) {
	this.init = function () {
		this.__html = "";
		base.init.apply(this, ["#comment"]);
	}
	this._writeHtml = function (sb, option) {
		sb.push(this.__html);
	}
	this._writeText = function (sb, option) {
	}

	this.__setHtmlCode = function (value) {
		this.__html = String(value);
	}
	this._createViewNode = function (doc) {
		var span = doc.createElement("COMMENT-NODE");
		span.setAttribute("title", this.__html);
		return span;
	}
	this._cloneNode = function (all) {
		var node = new this.constructor();
		node.__html = this.__html;
		return node;
	}
});
$rte.OtherNode = $rte.Node._extends(function (base, type) {
	this.init = function () {
		this.__html = "";
		base.init.apply(this, ["#ignore"]);
	}
	this._writeHtml = function (sb, option) {
		sb.push(this.__html);
	}
	this._writeText = function (sb, option) {
	}
	this.__setHtmlCode = function (value) {
		this.__html = String(value);
	}
	this._createViewNode = function (doc) {
		var span = doc.createElement("SPAN");
		span.setAttribute("title", this.__html);
		return span;
	}
	this._cloneNode = function (all) {
		var node = new this.constructor();
		node.__html = this.__html;
		return node;
	}
});
$rte.TextNode = $rte.Node._extends(function (base, type) {

	function ParseTextToHtml(html) {
		html = String(html);
		html = html.replace(/&/g, "&amp;");
		html = html.replace(/</g, "&lt;");
		html = html.replace(/>/g, "&gt;");
		html = html.replace(/'/g, "&#39;");
		html = html.replace(/\x22/g, "&quot;");
		html = html.replace(/\xA0/g, "&nbsp;");
		html = html.replace(/(\s)\s/g, "$1&nbsp;");
		return html;
	}

	//ABOUTTEXTNODE

	function ParseHtmlToText(code, pre) {
		if (!code) return "";
		if (code.indexOf('>') != -1 || code.indexOf('<') != -1)
			return code;
		return RteHtmlDecode(code, pre);
	}

	this.init = function () {
		this.__text = "";
		this.__html = "";
		this.__last = "text";
		base.init.apply(this, ["#text"]);
		this.nodeType = 3;
	}

	this.__syncContent = function (ctx) {
		var h = this.__viewnode.innerHTML;

		//bug of the firefox
		h = h.replace(/<br>/g, "");

		//TODO:improve this peformance
		if (this.__equalsHtmlCode(h))
			return;

		if (this.__istypingnode) {
			if (jsml.firefox) {
				if (h == "&nbsp;")
					return;
			}
		}

		if (h.indexOf('<') != -1) {
			var cmd = this.__core.__config.paste_default_command;
			if (cmd == "pastetext" || cmd == "pastepuretext") {
				h = this.HtmlEncode(this.__viewnode.innerText);
				this.__viewnode.innerHTML = h;
			}
		}

		this.__html = h;
		this.__last = "html";
		this.__text = ParseHtmlToText(this.__html, this.__premode);
		this.__sethasvalue();
		//this.__setRuntimeAttribute("title", "sync from " + this.__html, "ok");
		//this.__setRuntimeAttribute("style", "background-color:red;","ok");
		this.__notifyChanged();
	}

	var specialchars = /[\u00A0-\u00FF\u0192\u0391-\u03D6\u2002-\u2666]/g;

	this.__requireSpecialChars = function () {
		if (this.__last != "html")
			return false;
		if (specialchars.test(this.__html))
			return true;
		return false;
	}
	this.__processSpecialChars = function () {
		if (this.__last != "html")
			return;
		this.__html = this.__html.replace(specialchars, function (a, b, c) {
			return "&#" + a.charCodeAt(0) + ";";
		});
	}

	this._writeHtml = function (sb, option) {
		var html;
		if (this.__last == "html")
			html = this.__html;
		else
			html = ParseTextToHtml(this.__text);
		if (this.__core && this.__core.__config.antispamemailencoder)
			if (html.indexOf("@") != -1)
				html = html.split("@").join("&#64;");
		sb.push(html);
	}
	this._writeText = function (sb, option) {
		sb.push(this.__text);
	}

	this.__setHtmlCode = function (value, stopsync) {
		this.__html = value || "";
		this.__last = "html";
		this.__text = ParseHtmlToText(this.__html, this.__premode);
		this.__notifyChanged(true);
		if (this.__viewnode && !stopsync) this.__syncToViewNode(this.__viewnode);
	}
	this.__setText = function (value, stopsync) {
		this.__text = String(value);
		this.__last = "text";
		this.__notifyChanged(true);
		if (this.__viewnode && !stopsync) this.__syncToViewNode(this.__viewnode);
	}
	this.__getViewHtml = function () {
		var html = this.__getHtmlCode();
		//		if(this.__last=="html"&&this.__parent)
		//		{
		//			if(this.__parent.__nodes[0]==this)
		//				html=html.replace(/^\s+/,'');
		//			else
		//				html=html.replace(/^\s+/,'&#32;');
		//		}
		//		if(!html)html=" ";
		html = html.replace(/\s$/, '&nbsp;');
		return html;
	}
	this.__syncViewToText = function () {
		if (!this.__viewnode) return;
		var h = this.__viewnode.innerHTML;
		if (this.__equalsHtmlCode(h))
			return;
		this.__setHtmlCode(h, true);
		return true;
	}
	this.__setFrontBlank = function () {
	}
	this._translateOffset = function (dom, offset) {
		if (dom == this.__viewnode)
			return offset == 1 ? this.__text.length : 0;
		return offset;
	}
	this._getNodeOffset = function (offset) {
		return { node: this.__viewnode.firstChild, offset: offset };
	}
	this._getOffsetPath = function (offset) {
		return String(offset);
	}


	this.__equalsHtmlCode = function (h) {
		return this.__viewhtml == h;
	}

	this.__syncToViewNode = function (span) {
		var html = this.__getViewHtml();
		if (jsml.msie5678) {
			if (html.charCodeAt(0) == 32)
				html = '&nbsp;' + html.substring(1);
		}
		this.__viewhtml = html.replace(/\s+/g, ' ');
		span.innerHTML = this.__viewhtml;
	}
	this._createViewNode = function (doc) {
		//TODO:....
		var span = doc.createElement("TEXT-NODE");
		this.__syncToViewNode(span);
		return span;
	}
	this._attachCore = function (core) {
		base._attachCore.apply(this, arguments);
		if (this.__last == "html") {
			var vn = this.__viewnode;
			this.__text = vn.innerText || vn.textContent || "";
		}
	}
	this._cloneNode = function (all) {
		var node = new this.constructor();
		node.__html = this.__html;
		node.__text = this.__text;
		node.__last = this.__last;
		return node;
	}

	this.GetText = function () {
		return this.__text;
	}
	this.SetText = function (value, stopsync) {
		this.__setText(value, stopsync);
	}
	this.__sethasvalue = function () {
		this.__hasvalue = true;
		if (this.__viewnode) this.__viewnode.style.cssText = '';
	}
});
$rte.TypingNode = $rte.TextNode._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);
		this.__istypingnode = 1;


		if (jsml.firefox) this.__fixfirefox();

	}
	this.__fixfirefox = function () {
		var style = "display:inline-block;top:0px;left:0px;width:12px;height:18px;"
		if (this.__hasvalue)
			style = null;
		else if (this.__ishidden)
			style = null;//"width:0px;height:5px;overflow:hidden;";
		this.__setRuntimeAttribute("style", style, "firefox");
		//this.__setRuntimeAttribute("style","background-color:red","firefox1");
	}
	this._cloneNode = function (all) {
		var node = new this.constructor();
		node.__html = this.__html;
		node.__text = this.__text;
		node.__last = this.__last;
		node.__hasvalue = this.__hasvalue;
		node.__ishidden = this.__ishidden;
		node.__fixfirefox();
		return node;
	}
	this.__notFormatable = function () {
		return !this.__hasvalue;
	}
	this.__getHtmlCode = function () {
		if (!this.__hasvalue)
			return "";
		return base.__getHtmlCode.apply(this, arguments);
	}
	this.__setVisible = function () {
		if (!this.__ishidden)
			return;
		//this.__istypingnode=true;
		//this.__setRuntimeAttribute("style",null,"_tn");
		this.__ishidden = false;
		if (this.__viewnode) this.__setSpanHtml(this.__viewnode)

		if (jsml.firefox) this.__fixfirefox();
	}
	this.__setHidden = function () {
		if (this.__hasvalue)
			return;
		//this.__istypingnode=false;
		this.__ishidden = true;
		//this.__setRuntimeAttribute("style","display:none","_tn");
		if (this.__viewnode) this.__setSpanHtml(this.__viewnode)

		if (jsml.firefox) this.__fixfirefox();
	}
	this.__setSpanHtml = function (span) {
		if (this.__ishidden && !jsml.firefox) {
			span.innerHTML = "";
			return;
		}

		if (jsml.safari34 || jsml.firefox) {
			span.innerHTML = "&nbsp;";
		}
		else if (jsml.chrome || jsml.safari)//||jsml.opera
		{
			span.innerHTML = "&#13;";
		}
		else {
			span.innerHTML = "&nbsp;";
		}
	}
	this._createViewNode = function (doc) {
		if (this.__hasvalue)
			return base._createViewNode.apply(this, arguments);

		var span = doc.createElement("TYPING-NODE");

		this.__setSpanHtml(span);

		return span;
	}
	this._translateOffset = function (dom, offset) {
		if (!this.__hasvalue)
			return 0;
		if (dom == this.__viewnode)
			return offset == 1 ? this.__text.length : 0;
		return offset;
	}
	this._getNodeOffset = function (offset) {
		if (!this.__hasvalue)
			offset = 0;
		return { node: this.__viewnode.firstChild, offset: offset };
	}
	this._getOffsetPath = function (offset) {
		return String(offset);
	}

	this.__syncViewToText = function () {
		var vn = this.__viewnode;
		if (!vn) return;

		if (this.__hasvalue) {
			var h = vn.innerHTML;
			if (this.__equalsHtmlCode(h))
				return;
			this.__setHtmlCode(h, true);
			return true;
		}

		var txt = vn.innerText || vn.textContent || "";
		if (!txt.length)
			return;



		this.__sethasvalue();

		var h = vn.innerHTML;
		h = h.replace(/(\s)|(\&nbsp;)|(\&\#32;)|(\&\#13;)/ig, "$1&#32;")
		if (!h) h = "&nbsp;";
		this.__setHtmlCode(h);
		this.__core.__setPointInside(this, this.__getMaxOffset());
		this.__core.__rangeSyncToDom(true);
		return true;
	}
	this.__sethasvalue = function () {
		this.__hasvalue = true;
		if (jsml.firefox) this.__fixfirefox();
		if (this.__viewnode) this.__viewnode.style.cssText = '';
	}
});

$rte.Element = $rte.Node._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);
		this.nodeType = 1;
		this.__innerblank = "";
		this.__endblank = "";
		this.__innerhtml = "";
	}
	this.__appendBlankCode = function (c, inner) {
		if (inner)
			this.__innerblank = this.__innerblank + c;
		else
			this.__endblank = this.__endblank + c;
	}

	this.__setInnerHtml = function (value) {
		this.__innerhtml = value;
		this.__notifyChanged(true);
	}
	this.__writeInnerHtml = function (sb, option) {
		if (this.__innerhtml)
			sb.push(this.__innerhtml);
	}
	this.__hasInnerHtml = function () {
		return !!this.__innerhtml;
	}
	this.__getInnerHtml = function (option) {
		var sb = [];
		this.__writeInnerHtml(sb, option);
		return sb.join("");
	}
	this.__canCloseTag = function () {
		switch (this.__namelower) {
			case "script":
			case "style":
			case "textarea":
			case "iframe":
			case "a":
				return false;
		}
		if (this.__isBlock())
			return false;
		return true;
	}
	this._writeHtml = function (sb, option) {
		sb.push("<");
		sb.push(this.GetHtmlTagName(option));
		sb.push(this.__getAttributeCode(option));

		if (!this.__hasInnerHtml() && !this.__opened && this.__canCloseTag()) {
			sb.push(" />");
			sb.push(this.__innerblank);
			sb.push(this.__endblank);
			return sb.join("");
		}
		sb.push(">");
		sb.push(this.__innerblank);
		this.__writeInnerHtml(sb, option);
		sb.push("</" + this.GetHtmlTagName(option) + ">");
		sb.push(this.__endblank);
	}
	this._writeText = function (sb, option) {
		if (this.__namelower == "br" || this.__namelower == "hr")
			sb.push("\r\n");
	}

	this._cloneNode = function (all) {
		var node = new this.constructor(this.GetHtmlTagName());
		node._mergeNode(this);
		return node;
	}
	this._mergeNode = function (node) {
		this.__attrs = node.__cloneAttributes();
		this.__rattrs = node.__cloneRuntimeAttributes();
		this.__innerhtml = node.__innerhtml;
		this.__innerblank = node.__innerblank;
		this.__endblank = node.__endblank;
	}
	this._createViewNode = function (doc) {
		return doc.createElement(this.__name);
	}

	this.__reloadContentView = function () {

	}
});
$rte.GenericElement = $rte.Element._extends(function (base, type) {
	//br,hr,pre,textarea,meta,link,style,script.....
	this.init = function (name) {
		base.init.apply(this, arguments);
	}

	this._createViewNode = function (doc) {
		if (this.__namelower == "script") {
			return doc.createElement("span");
		}
		var node = doc.createElement(this.__name);
		if (this.__innerhtml && this.__namelower == "textarea")
			node.innerHTML = this.__innerhtml;
		return node;
	}
	this._writeText = function (sb, option) {
		if (this.__innerhtml) sb.push(RteHtmlDecode(this.__innerhtml));
		base._writeText.apply(this, arguments);
	}
	this.SetInnerText = function (value) {
		value = this.HtmlEncode(value || "");
		this.__innerhtml = value;
		if (this.__viewnode) this.__viewnode.innerHTML = value.replace(/\s$/, '&nbsp;');
		this.__notifyChanged(true);
	}

});

$rte.ContainerElement = $rte.Element._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);
		this.__nodes = [];
	}

	this.__syncContent = function (ctx) {

		var cns = this.__viewnode.childNodes;
		var cl = cns.length;
		var nl = this.__nodes.length;

		var vn = this.__viewnode;
		var ok = true;

		for (var i = 0; i < nl; i++) {
			var node = this.__nodes[i];
			if (node.__viewnode == null) {
				ok = false;
				continue;
			}

			if (node.__viewnode.parentNode != vn) {
				ok = false;
				continue;
			}

			if (node.nodeType == 3 && node.__viewnode.innerHTML.indexOf("<") != -1) {
				ok = false;
				continue;
			}

			node.__syncContent(ctx);
		}

		if (cl == nl && ok)
			return;

		var cnarr = [];
		for (var cni = 0; cni < cl; cni++) {
			cnarr.push(cns.item(cni));
		}

		var htmls = [];

		var arr = [];
		for (var cni = 0; cni < cl; cni++) {
			var cn = cnarr[cni];

			if (cn.__jsnode && cn.__jsnode.nodeType == 3 && cn.firstChild && cn.firstChild.nodeName == "A") {
				//Chrome BUG: typing after <a><span> , will switch the postition to <span><a>
				var link = cn.firstChild;
				//cn.removeChild(link);
				this.__viewnode.insertBefore(link, cn);
				cnarr.splice(cni, 0, link);
				cl++;
				//cni--;
				//continue;
				cn = link;
			}

			if (cn.__jsnode && (cn.__jsnode.nodeType != 3 || cn.innerHTML.indexOf("<") == -1)) {
				arr.push(cn.__jsnode);
				if (cn.__jsnode.__parent != this) {
					cn.__jsnode.__parent = this;
					if (!cn.__jsnode.__core)
						cn.__jsnode._attachCore(this.__core);

				}
				continue;
			}

			if (cn.nodeType != 1 && cn.nodeType != 3) {
				//COMMENT?
				//var obj = new $rte.CommentNode();
				//obj.__setHtmlCode("<!--"+cn.nodeValue+"-->");
				//objs = [obj];
				this.__viewnode.removeChild(cn);
				continue;
			}


			if (cn.nodeName == "TEXT-NODE") {
				var tn;
				if (cn.childNodes.length == 1) {
					tn = cn.childNodes[0];
				}
				//if (tn && cn.removeNode) {
				//	cn.removeNode(false);
				//	console.log("used removeNode");	//chrome not support
				//}
				//else
				{
					if (tn == null || tn.nodeType != 3)
						tn = cn.ownerDocument.createTextNode(cn.innerText);
					cn.parentNode.insertBefore(tn, cn);
					cn.parentNode.removeChild(cn);
				}
				cnarr[cni] = tn;
				cni--;
				continue;
				//htmls.push({ node: cn, html: cn.innerHTML });	//not so useful
			}


			var objs = null;

			if (cn.nodeType == 3)//TextNode
			{
				if (/^[\x0A]+$/.test(cn.nodeValue)) {
					var obj = new $rte.TextNode();
					obj.__setText("");
					objs = [obj];
				}
				else if (cn.nodeValue.indexOf("<") == -1) {
					var obj = new $rte.TextNode();
					obj.__setText(cn.nodeValue);
					objs = [obj];
				}
				else {
					//var nextcn = cnarr[cni + 1]
					//this.__viewnode.removeChild(cn);
					//cn = cnarr[cni + 1];
					//cni++;
					htmls.push({ node: cn, html: cn.nodeValue });
				}
			}
			else {
				var sb = [];

				sb.push("<");
				sb.push(cn.nodeName);
				var atts = cn.attributes;
				for (var i = 0; i < atts.length; i++) {
					sb.push(" ");
					sb.push(atts[i].name);
					sb.push("=");
					sb.push("'");
					sb.push(jsml.html_encode(atts[i].value));
					sb.push("'");
				}
				var ccns = cn.childNodes;
				if (ccns.length == 0) {
					sb.push(" />");
				}
				else {
					sb.push(">");
					sb.push(cn.innerHTML);
					sb.push("</");
					sb.push(cn.nodeName);
					sb.push(">");
				}

				htmls.push({ node: cn, html: sb.join("") });
			}


			if (!objs || objs.length == 0)
				continue;

			PushObjs.apply(this, [objs, cn]);

		}

		CheckLastHtmls.apply(this);

		function CheckLastHtmls() {
			if (!htmls.length)
				return;
			var cn;
			var rm = [];
			var sb = [];
			for (var i = 0; i < htmls.length; i++) {
				if (cn)
					rm.push(cn);
				cn = htmls[i].node;
				sb.push(htmls[i].html);
			}

			htmls = [];
			var html = this.__core.FilterByPasteCommand(sb.join(""));

			for (var i = 0; i < rm.length; i++)
				this.__viewnode.removeChild(rm[i]);

			var objs = this.__core.__parseHtmlCode(html);
			PushObjs.apply(this, [objs, cn]);
		}


		function PushObjs(objs, cn) {
			var issingleimg = (objs.length == 1 && cn.nodeName == "IMG");

			for (var i = 0; i < objs.length; i++) {
				var obj = objs[i];
				arr.push(obj);
				obj.__parent = this;

				if (issingleimg) {
					obj.__attachviewnode = cn;
					obj._attachCore(this.__core);
					delete obj.__attachviewnode;
				}
				else {
					obj._attachCore(this.__core);
					this.__viewnode.insertBefore(obj.GetViewNode(), cn);
				}

				if (ctx.pno && ctx.pno.node == cn) {
					ctx.pn = obj.__viewnode;
					if (!ctx.rno || !ctx.rno.node) {
						ctx.pne = true;
					}
				}
				if (ctx.rno && ctx.rno.node == cn) {
					ctx.rn = obj.__viewnode;
				}
			}

			if (!issingleimg) {
				this.__viewnode.removeChild(cn);
			}
		}


		this.__nodes = arr;
		this.__notifyChanged();
	}

	this.__notifyChanged = function (onlyprop) {
		base.__notifyChanged.apply(this, arguments);

		if (onlyprop && this.__namelower == "div") {
			if (this.__getStyle("position") != this.__lastposition) {
				this.__lastposition = this.__getStyle("position");
				if (this.__lastposition == "absolute")
					this.__setRuntimeAttribute("class", "rtelayer", "rtelayer");
				else
					this.__setRuntimeAttribute("class", null, "rtelayer");
			}
		}

	}

	this._createViewNode = function (doc) {
		var tagname = this.__namelower;
		switch (tagname) {
			case "html":
			case "head":
			case "body":
				tagname = "div";
				break;
		}
		return doc.createElement(tagname);
	}
	this.__removeViewNode = function (vn) {
		try { this.__viewnode.removeChild(vn); } catch (x) { }
	}
	this.__insertViewNode = function (left, right) {
		if (right)
			this.__viewnode.insertBefore(left, right);
		else
			this.__viewnode.appendChild(left);
	}
	this.__appendChild = function (obj) {
		obj.__removeNode(true);
		obj.__parent = this;
		this.__nodes.push(obj);
		if (this.__core) {
			obj._attachCore(this.__core);
			this.__insertViewNode(obj.GetViewNode());
			this.__notifyChanged();
		}
	}
	this.__insertBefore = function (left, right) {
		left.__removeNode(true);
		for (var i = 0; i < this.__nodes.length; i++) {
			if (this.__nodes[i] == right) {
				left.__parent = this;
				this.__nodes.splice(i, 0, left);
				if (this.__core) {
					left._attachCore(this.__core);
					this.__insertViewNode(left.GetViewNode(), right.GetViewNode());
					this.__notifyChanged();
				}
				return;
			}
		}
	}
	this.__insertAfter = function (right, left) {
		right.__removeNode(true);
		var pos = this.__indexOf(left);
		if (pos == -1)
			this.__appendChild(right);
		else
			this.__insertAt(right, pos + 1);
	}
	this.__insertAt = function (left, pos) {
		left.__removeNode(true);
		var right = this.__nodes[pos];
		if (right)
			this.__insertBefore(left, right);
		else
			this.__appendChild(left);
	}
	this.__clearChildren = function () {
		var ns = this.__nodes;
		if (!ns.length) return;
		this.__nodes = [];
		for (var i = 0; i < ns.length; i++) {
			var node = ns[i];
			node.__parent = null;
			if (this.__core) {
				this.__removeViewNode(node.GetViewNode());
				node._detachCore();
			}
		}
		this.__notifyChanged();
	}
	this.__removeComments = function () {
		var ns = this.__nodes;
		if (!ns.length) return;
		for (var i = 0; i < ns.length; i++) {
			var node = ns[i];
			if (node.nodeType != 0)
				continue;
			ns.splice(i, 1);
			node.__parent = null;
			if (this.__core) {
				this.__removeViewNode(node.GetViewNode());
				node._detachCore();
				this.__notifyChanged();
			}
		}
		this.__notifyChanged();
	}
	this.__removeChild = function (node, fixnbsp) {
		var ns = this.__nodes;
		for (var i = 0; i < ns.length; i++) {
			if (ns[i] != node)
				continue;
			ns.splice(i, 1);
			node.__parent = null;
			if (this.__core) {
				this.__removeViewNode(node.GetViewNode());
				node._detachCore();
				this.__notifyChanged();
			}
			if (fixnbsp) {
				this.__fixNBSP();
			}
			return true;
		}
	}
	this.__fixNBSP = function () {
		if (this.__nodes.length)
			return;
		switch (this.__namelower) {
			case "pre":
			case "p":
			case "div":
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
			case "li":
			case "td":
			case "th":
				var text = new $rte.TextNode();
				text.__setHtmlCode("&nbsp;");
				this.__appendChild(text);
				break;
		}
	}
	this.IndexOf = this.__indexOf = function (node) {
		var ns = this.__nodes;
		for (var i = 0; i < ns.length; i++) {
			if (ns[i] == node)
				return i;
		}
		return -1;
	}

	this.__removeNode = function (all, askparentfixnbsp) {
		if (this.__parent == null)
			return false;
		if (!all) {
			while (this.__nodes.length) {
				this.__parent.__insertBefore(this.__nodes[0], this);
			}
		}
		this.__parent.__removeChild(this, askparentfixnbsp);
		return true;
	}
	this.__hasInnerHtml = function () {
		if (this.__nodes.length)
			return true;
		if (this.__renderbody)
			return true;
	}
	this.__writeInnerHtml = function (sb, option) {
		if (this.__renderbody) {
			sb.push("\r\n        ");
			sb.push(this.__renderbody.__getInnerHtml());
			sb.push("\r\n    ");
		}
		else {
			for (var i = 0; i < this.__nodes.length; i++)
				sb.push(this.__nodes[i].__getHtmlCode());
		}
	}

	this._addParsedObject = function (obj) {
		this.__appendChild(obj);
	}
	this.__cloneNodes = function () {
		var nodes = [];
		for (var i = 0; i < this.__nodes.length; i++)
			nodes.push(this.__nodes[i]._cloneNode(true));
		return nodes;
	}
	this._cloneNode = function (all) {
		var node = base._cloneNode.apply(this, arguments);
		if (all) {
			for (var i = 0; i < this.__nodes.length; i++)
				node.__appendChild(this.__nodes[i]._cloneNode(all));
		}
		return node;
	}

	this.__clearContentView = function () {
		this.__viewnode.innerHTML = "";
	}
	this.__reloadContentView = function () {
		var core = this.__core;
		if (!core) return;
		for (var i = 0; i < this.__nodes.length; i++)
			this.__nodes[i]._detachCore(this.__core);
		this.__clearContentView();
		for (var i = 0; i < this.__nodes.length; i++)
			this.__nodes[i]._attachCore(core);
		for (var i = 0; i < this.__nodes.length; i++)
			this.__insertViewNode(this.__nodes[i].GetViewNode());
	}

	this._attachCore = function (core) {
		for (var i = 0; i < this.__nodes.length; i++)
			this.__nodes[i]._attachCore(core);
		base._attachCore.apply(this, arguments);
		for (var i = 0; i < this.__nodes.length; i++)
			this.__insertViewNode(this.__nodes[i].GetViewNode());
	}
	this._detachCore = function () {
		base._detachCore.apply(this, arguments);
		for (var i = 0; i < this.__nodes.length; i++)
			this.__nodes[i]._detachCore(this.__core);
	}

	this.AppendChild = function (child) {
		this.__appendChild(child);
	}
	this.InsertAt = function (child, index) {
		return this.__insertAt(child, index);
	}
	this.InsertBefore = function (child, node) {
		return this.__insertBefore(child, node);
	}
	this.InsertAfter = function (child, node) {
		return this.__insertAfter(child, node);
	}
	this.GetChildAt = function (pos) {
		var ns = this.__nodes;
		if (!ns) return;
		return ns[pos];
	}
	this.GetChildCount = function () {
		var ns = this.__nodes;
		if (!ns) return 0;
		return ns.length;
	}

	this._writeText = function (sb, option) {
		for (var i = 0; i < this.__nodes.length; i++)
			this.__nodes[i]._writeText(sb, option);
	}

	this.SetInnerText = function (value) {
		this.__clearChildren();
		var tn = new $rte.TextNode();
		if (value) {
			tn.__setText(value);
			this.__appendChild(tn);
		}
	}

});

$rte.LinkElement = $rte.ContainerElement._extends(function (base, type) {
	this.IsControl = function () {
		var ns = this.__nodes;
		if (ns && ns.length)
			return false;
		return true;
	}
	this.__notifyChanged = function (onlyprop) {
		base.__notifyChanged.apply(this, arguments);
		if (!this.__core) return;
		this.__updateLinkRTS();
	}
	this._attachCore = function (core) {
		base._attachCore.apply(this, arguments);
		this.__updateLinkRTS();
	}
	this._detachCore = function (core) {
		base._detachCore.apply(this, arguments);
		var rts = this.__linkrts;
		if (!rts) return;
		if (rts.parentNode) rts.parentNode.removeChild(rts);
		this.__linkrts = null;
	}
	this.__syncContent = function () {
		if (this.__linkrts)
			return;
		return base.__syncContent.apply(this, arguments);
	}
	this.__updateLinkRTS = function () {
		var node = this.__viewnode;
		if (!node) return;
		var ns = this.__nodes;
		if (ns && ns.length) {
			if (this.__linkrts) {
				//this.__setRuntimeAttribute("style",null,"anchorstyle");
				if (this.__linkrts.parentNode == node)
					node.removeChild(this.__linkrts);
				this.__linkrts = null;
			}
		}
		else {
			if (!this.__linkrts) {
				var imgurl = this.__core.__config.folder + "images/anchor.gif";
				var img = this.__core.__win.document.createElement("img");
				img.setAttribute("border", "0");
				img.setAttribute("src", imgurl);
				//this.__setRuntimeAttribute("style","width:20px;height:20px;background-image:url("+imgurl+")","anchorstyle");
				node.appendChild(img);
				this.__linkrts = img;
			}
		}
	}
});
$rte.TableElement = $rte.ContainerElement._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);
		this.__istableelement = true;
		if (this.__namelower == "td" || this.__namelower == "th")
			this.IsTableCell = true;
	}

	this.__getHtmlCode = function (option) {
		if (this.__onlyrenderchildren)
			return this.__getInnerHtml(option);
		return base.__getHtmlCode.apply(this, arguments);
	}

	if (jsml.msie5678)
		this.__updateAttributeToView = function (name, domnode) {
			base.__updateAttributeToView.apply(this, arguments);
			if (name == "style" && this.__namelower == "table") {
				for (var i = 0; i < this.__nodes.length; i++) {
					var tname = this.__nodes[i].__namelower;
					if (tname == "tbody" || tname == "thead" || tname == "tfoot") {
						var vn = this.__nodes[i].__viewnode;
						if (vn) {
							base.__updateAttributeToView.apply(this, [name, vn]);
							vn.style.width = 'auto';
							vn.style.height = 'auto';
						}
					}
				}
			}
		}

	if (jsml.msie5678)
		this._addParsedObject = function (obj) {
			//insert tr into tbody for IE7	
			if (this.__namelower == "table" && obj.__namelower == "tr") {
				var tbody = null;
				for (var i = 0; i < this.__nodes.length; i++) {
					var tname = this.__nodes[i].__namelower;
					if (tname == "tbody" || tname == "thead" || tname == "tfoot") {
						tbody = this.__nodes[i];
						//do not break, find the last one.
					}
				}
				if (tbody == null) {
					tbody = new $rte.TableElement("tbody");
					tbody.__onlyrenderchildren = 1;
					tbody.DesignOnly = 1;
					this.__appendChild(tbody);
				}
				tbody.__appendChild(obj);
				return;
			}
			this.__appendChild(obj);
		}


	this.SetStyle = function (name, value) {
		this.__setStyle(name, value);
		if (this.IsTableCell && this.__core) {
			if (name == "width")
				this.__core.AdjustTableSizeForCell(this, 1, 0);
			if (name == "height")
				this.__core.AdjustTableSizeForCell(this, 0, 1);
		}
	}

});
$rte.ObjectElement = $rte.ContainerElement._extends(function (base, type) {
	this.init = function (name) {
		base.init.apply(this, arguments);

		this.__setRuntimeAttribute("style", "display:inline-block;overflow:hidden;border-width:1px;border-style:dashed;border-color:gray;background-color:#eeeeee;padding:4px;vertical-align:top", "objectviewstyle", true);

		if (this.__namelower == "audio")
			this.__setRuntimeAttribute("style", "width:180px;height:40px;", "objectviewsize", true);
		else if (this.__namelower == "video")
			this.__setRuntimeAttribute("style", "width:300px;height:150px;", "objectviewsize", true);
		else
			this.__setRuntimeAttribute("style", "width:320px;height:240px;", "objectviewsize", true);

	}
	this.__updateAttributeToView = function (name) {
		name = name.toLowerCase();
		base.__updateAttributeToView.apply(this, arguments);
		if (name == "width" || name == "height") {
			var val = this.__getAttribute(name);
			if (val) val = name + ":" + val + "px";
			this.__setRuntimeAttribute("style", val, "ObjectElement_" + name, true);
		}
		clearTimeout(this._refreshtimerid);
		this._refreshtimerid = $rte.SafeSetTimeout(this.delegate(this.__refreshViewNode), 300);
	}
	this._createViewNode = function (doc) {
		var div = doc.createElement("DIV");
		this.__core.CreateControlProvider(this).FillDesignView(div);
		return div;
	}
	this.__refreshViewNode = function () {
		if (!this.__core) return;
		var div = this.__viewnode;
		if (!div) return;
		div.innerHTML = "";
		this.__core.CreateControlProvider(this).FillDesignView(div);
	}
	this.__insertViewNode = function (vn, right) {
		base.__insertViewNode.apply(this, arguments);
		vn.__jsnode.__setRuntimeAttribute("style", "display:none", "hideobjectcontent.");
	}
	this.__syncContent = function () {
		return;
	}
});
$rte.DataElement = $rte.ContainerElement._extends(function (base, type) {
	this._createViewNode = function (doc) {
		if (this.__namelower == "option")
			return doc.createElement("OPTION");
		var span = doc.createElement("SPAN");
		span.style.display = 'none';
		return span;
	}
});

$rte.CoreBodyElement = $rte.ContainerElement._extends(function (base, type) {
	this.init = function () {
		base.init.apply(this, ["body"]);
	}
	this.__initbody = function (body, holder) {
		this.__body = body;
		this.__holder = holder;
	}
	this.__insertViewNode = function (vn, right) {
		if (right)
			this.__body.insertBefore(vn, right);
		else if (jsml.bodydivmode)
			this.__body.appendChild(vn);
		else
			this.__body.insertBefore(vn, this.__holder);
	}
	this.__clearContentView = function () {
		var cs = this.__body.childNodes;
		while (true) {
			var n = cs.item(0);
			if (!n) break;
			if (n == this.__holder) break;
			this.__body.removeChild(n);
		}
	}
	this._createViewNode = function () {
		return this.__body;
	}
	this._translateOffset = function (dom, offset) {
		if (dom != this.__body)
			return this.__nodes.length;
		return offset;
	}
	this._getNodeOffset = function (offset) {
		return { node: this.__viewnode, offset: offset };
	}
});

$rte.CodeFragElement = $rte.ContainerElement._extends(function (base, type) {
	this.init = function () {
		base.init.apply(this, arguments);
	}
	this._writeHtml = function (sb, option) {
		this.__writeInnerHtml(sb, option);
	}
});


$rte.CoreTempElement = $rte.ContainerElement._extends(function (base, type) {
	this.init = function (div) {
		this.__tempdiv = div;
		base.init.apply(this, ["DIV"]);
	}
	this._createViewNode = function () {
		return this.__tempdiv;
	}
	this._cloneNode = function () {
		return new $rte.CoreTempElement(this.__tempdiv);
	}
});


$rte.__FilterLogic = $rte.object._extends(function (base, type) {
});



$rte.__Filter_BatchFilter = $rte.__FilterLogic._extends(function (base, type) {
	this.init = function (args) {
		this.filters = args;
	}

	this.__Match = function (nodes) {
		for (var i = 0; i < this.filters.length; i++) {
			if (this.filters[i].__Match(nodes))
				return true;
		}
		return false;
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < this.filters.length; i++) {
			nodes = this.filters[i].__Filter(nodes);
		}
		return nodes;
	}

});


$rte.__Filter_RemoveTagBase = $rte.__FilterLogic._extends(function (base, type) {
	this.__IsTagMatch = function (node) {
	}
	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (this.__IsTagMatch(node))
				return true;
			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
			if (this.__IsTagMatch(node)) {
				nodes = nodes.concat();
				sns = node.__nodes;
				if (sns && sns.length) {
					nodes.splice.apply(nodes, [i, 1].concat(sns));
					i = i + sns.length - 1;
				}
				else {
					nodes.splice(i, 1);
					i--;
				}
				node.__removeNode(false);
			}
		}
		return nodes;
	}
});

$rte.__Filter_RemoveTags = $rte.__Filter_RemoveTagBase._extends(function (base, type) {
	this.init = function (args, onlynoattr) {
		this.tags = args;
		this.onlynoattr = onlynoattr;
	}
	this.__IsTagMatch = function (node) {
		if (this.onlynoattr && node.__attrs.length)
			return false;

		var nl = node.__namelower;
		var ts = this.tags;
		for (var i = 0; i < ts.length; i++)
			if (nl == ts[i])
				return true;
	}
});
$rte.__Filter_RemoveXmlTags = $rte.__Filter_RemoveTagBase._extends(function (base, type) {
	this.init = function (args, onlynoattr) {
		this.tags = args;
		this.onlynoattr = onlynoattr;
	}
	this.__IsTagMatch = function (node) {
		if (this.onlynoattr && node.__attrs.length)
			return false;
		var nl = node.__namelower;
		var p = nl.indexOf(":");
		if (p == -1)
			return false;
		nl = nl.substring(0, p);
		var ts = this.tags;
		for (var i = 0; i < ts.length; i++)
			if (nl == ts[i])
				return true;
	}
});

$rte.__Filter_RemoveEmpty = $rte.__FilterLogic._extends(function (base, type) {
	this.__IsDeletableNode = function (node) {
		switch (node.__namelower) {
			case "span":
			case "font":
			case "b":
			case "strong":
			case "i":
			case "em":
			case "s":
			case "strike":
			case "del":
			case "ins":
			case "code":
			case "label":
			case "small":
			case "sub":
			case "sup":
			case "ol":
			case "ul":
				return true;

			case "style":
			case "table":
			case "tbody":
			case "thead":
			case "tfoot":
			case "tr":
			case "p":
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
			case "center":
			case "blockquote":

			case "article":
			case "section":
			case "hgroup":
			case "header":
			case "footer":
			case "aside":

				//	return true;
			case "a":
			case "div":
				if (node.__attrs.length == 0)
					return true;
				break;
		}
	}
	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var sns = node.__nodes;
			if (sns && sns.length) {
				if (this.__Match(sns))
					return true;
			}
			else if (this.__IsDeletableNode(node)) {
				return true;
			}
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var sns = node.__nodes;
			if (sns && sns.length) {
				this.__Filter(sns);
			}
			else if (this.__IsDeletableNode(node)) {
				nodes = nodes.concat();
				node.__removeNode(true);
				nodes.splice(i, 1);
				i--;
			}
		}
		return nodes;
	}
});
$rte.__Filter_FixAccessbility = $rte.__FilterLogic._extends(function (base, type) {
	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.__namelower == "img" && !node.__getAttributeObject("alt"))
				return true;
			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.__namelower == "img" && !node.__getAttributeObject("alt")) {
				node.__setAttribute("alt", "");
			}
			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});


$rte.__Filter_EncodeSpecialChars = $rte.__FilterLogic._extends(function (base, type) {
	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.__requireSpecialChars())
				return true;

			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			node.__processSpecialChars();

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});
$rte.__Filter_RemoveEmptyMargin = $rte.__FilterLogic._extends(function (base, type) {
	function issingleempty(str) {
		switch (str) {
			case "0":
			case "0px":
			case "0pt":
			case "0in":
			case "0em":
			case "0cm":
				return true;
		}
	}
	function isempty(str) {
		if (!str)
			return false;
		if (issingleempty(str))
			return true;
		var pairs = str.split(' ');
		if (pairs.length < 2)
			return false;
		for (var i = 0; i < pairs.length; i++)
			if (!issingleempty(pairs[i]))
				return false;
		return true;
	}

	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.__namelower == "p")
				continue;
			var s = node.__getAttribute("style");
			if (s && s.indexOf("margin") != -1) {
				if (isempty(node.__getStyle("margin")))
					return true;
				if (isempty(node.__getStyle("margin-left")))
					return true;
				if (isempty(node.__getStyle("margin-top")))
					return true;
				if (isempty(node.__getStyle("margin-right")))
					return true;
				if (isempty(node.__getStyle("margin-bottom")))
					return true;
			}

			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.__namelower == "p")
				continue;
			var s = node.__getAttribute("style");
			if (s && s.indexOf("margin") != -1) {
				if (isempty(node.__getStyle("margin")))
					node.__removeStyle("margin");
				if (isempty(node.__getStyle("margin-left")))
					node.__removeStyle("margin-left");
				if (isempty(node.__getStyle("margin-top")))
					node.__removeStyle("margin-top");
				if (isempty(node.__getStyle("margin-right")))
					node.__removeStyle("margin-right");
				if (isempty(node.__getStyle("margin-bottom")))
					node.__removeStyle("margin-bottom");
			}

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});
$rte.__Filter_RemoveMsoStyle = $rte.__FilterLogic._extends(function (base, type) {
	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var s = node.__getAttribute("style");
			if (s && s.indexOf("mso-") != -1) {
				var pairs = s.split(';');
				for (var j = 0; j < pairs.length; j++) {
					if (pairs[j].split(' ').join('').substring(0, 4) == "mso-")
						return true;
				}
			}

			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			var s = node.__getAttribute("style");
			if (s && s.indexOf("mso-") != -1) {
				var pairs = s.split(';');
				for (var j = 0; j < pairs.length; j++) {
					var n = pairs[j].split(':')[0].split(' ').join('');
					if (n.substring(0, 4) == "mso-") {
						node.__removeStyle(n);
					}
				}
			}

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});

$rte.__Filter_MergeStyle = $rte.__FilterLogic._extends(function (base, type) {
	function __extrastylename(pair, start, pos) {
		return pair.substring(start, pos).split(' ').join('').toLowerCase();
	}

	this.__Match = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var sns = node.__nodes;
			if (sns && sns.length && this.__Match(sns))
				return true;

			var str = node.__getAttribute("style")
			if (!str)
				continue;

			var map = {}
			var pairs = str.split(';');
			for (var pi = 0; pi < pairs.length; pi++) {
				var pair = pairs[pi];
				var pos = pair.indexOf(':');
				if (pos == -1) continue;
				var name = __extrastylename(pair, 0, pos);
				var value = pair.substring(pos + 1).replace(/(^\s+|\s+$)/g, "");
				map[name] = value;
			}
			if (map["margin-top"] && map["margin-right"] && map["margin-bottom"] && map["margin-left"])
				return true;
			if (map["padding-top"] && map["padding-right"] && map["padding-bottom"] && map["padding-left"])
				return true;
			if (map["border-top"] && map["border-right"] && map["border-bottom"] && map["border-left"])
				return true;
			if (map["border-color-top"] && map["border-color-right"] && map["border-color-bottom"] && map["border-color-left"])
				return true;
			if (map["border-style-top"] && map["border-style-right"] && map["border-style-bottom"] && map["border-style-left"])
				return true;
			if (map["border-width-top"] && map["border-width-right"] && map["border-width-bottom"] && map["border-width-left"])
				return true;
			if (map["border-style"] && map["border-width"] && map["border-color"])
				return true;
			if (map["border-style-top"] && map["border-width-top"] && map["border-color-top"])
				return true;
			if (map["border-style-right"] && map["border-width-right"] && map["border-color-right"])
				return true;
			if (map["border-style-bottom"] && map["border-width-bottom"] && map["border-color-bottom"])
				return true;
			if (map["border-style-left"] && map["border-width-left"] && map["border-color-left"])
				return true;
		}
	}
	this.__Filter = function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns);

			var str = node.__getAttribute("style")
			if (!str)
				continue;

			var map = {}
			var pairs = str.split(';');
			for (var pi = 0; pi < pairs.length; pi++) {
				var pair = pairs[pi];
				var pos = pair.indexOf(':');
				if (pos == -1) continue;
				var name = __extrastylename(pair, 0, pos);
				var value = pair.substring(pos + 1).replace(/(^\s+|\s+$)/g, "");
				map[name] = value;
			}
			function JoinRect(pf, sf) {
				if (!sf) sf = "";
				var t = map[pf + "-top" + sf]; if (!t) return;
				var r = map[pf + "-right" + sf]; if (!r) return;
				var b = map[pf + "-bottom" + sf]; if (!b) return;
				var l = map[pf + "-left" + sf]; if (!l) return;
				if (t == r && r == b && b == l && l == t)
					map[pf + sf] = t;
				else
					map[pf + sf] = t + " " + r + " " + b + " " + l;
				delete map[pf + "-top" + sf];
				delete map[pf + "-right" + sf];
				delete map[pf + "-bottom" + sf];
				delete map[pf + "-left" + sf];
				return true;
			}
			function JoinBorder(pf) {
				var s = map[pf + "-style"]; if (!s) return;
				var w = map[pf + "-width"]; if (!w) return;
				var c = map[pf + "-color"]; if (!c) return;
				map[pf] = w + " " + s + " " + c;
				delete map[pf + "-style"];
				delete map[pf + "-width"];
				delete map[pf + "-color"];
				return true;
			}
			var count = -1;
			while (true) {
				count++;
				if (JoinRect("margin"))
					continue;
				if (JoinRect("padding"))
					continue;
				if (JoinRect("border"))
					continue;
				if (JoinRect("border", "-color"))
					continue;
				if (JoinRect("border", "-width"))
					continue;
				if (JoinRect("border", "-style"))
					continue;
				if (JoinBorder("border"))
					continue;
				if (JoinBorder("border-top"))
					continue;
				if (JoinBorder("border-right"))
					continue;
				if (JoinBorder("border-bottom"))
					continue;
				if (JoinBorder("border-left"))
					continue;
				break;
			}
			if (count > 0) {
				var arr = [];
				for (var p in map)
					arr.push(p + ":" + map[p]);
				node.__setAttribute("style", arr.join(";"));
			}
		}
		return nodes;
	}
});


$rte.__Filter_PasteAllFilter = $rte.__FilterLogic._extends(function (base, type) {
	this.init = function (cmd) {
		this._cmd = cmd;
	}
	this.__Match = function (nodes) {
		return true;
	}

	this.__Init = function (core) {
		var list;
		if (this._cmd)
			list = core.__config[this._cmd.toLowerCase() + "_removestylelist"];
		if (typeof (list) == "undefined")
			list = core.__config.paste_removestylelist;
		if (!list) return;
		this.__stylelist = list.split(',');
	}

	this.__ShallReoveStyle = function (name, val) {
		for (var i = 0; i < this.__stylelist.length; i++)
			if (this.__stylelist[i] == name)
				return true;

		if (name.substring(0, 8) == "-webkit-")
			return true;

		switch (name) {
			case "orphans":
			case "widows":
				return true;
		}
		switch (val.replace(/(^\s+|\s+$)/g, "")) {
			case "none":
			case "0px":
			case "normal":
			case "inherits":
				return true;
			case "medium":
				if (name == "font-size")
					return true;
				break;
		}
	}

	this.__Filter = function (nodes) {
		if (!this.__stylelist)
			return nodes;

		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			var s = node.__getAttribute("style");
			if (s) {
				var changed = false;
				var pairs = s.split(';');
				for (var j = 0; j < pairs.length; j++) {
					var pair = pairs[j].split(':');
					if (pair.length != 2) {
						pairs.splice(j, 1);
						changed = true;
						j--;
						continue;
					}
					var n = pair[0].split(' ').join('');
					if (this.__ShallReoveStyle(n, pair[1])) {
						pairs.splice(j, 1);
						changed = true;
						j--;
					}
				}
				if (changed) {
					if (pairs.length == 0) {
						node.__removeAttribute("style");
					}
					else {
						node.__setAttribute("style", pairs.join(";"));
					}
				}
			}

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});

$rte.__Filter_PasteWordFilter = $rte.__FilterLogic._extends(function (base, type) {
	this.__Match = function (nodes) {
		return true;
	}


	function CreateList(text1) {

		var tag = "ul";
		var lst = null;

		//, "lower-roman": /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/
		//, "upper-roman": /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/


		switch (text1) {
			case "l\u00B7\u2002":
				lst = "disc";
				break;
			case "\u006F\u00D8":
				lst = "circle";
				break;
			case "\u006E\u25C6":
				lst = "square";
				break;
		}

		if (/[0-9]+\./.test(text1)) {
			tag = "ol";
			lst = "decimal";
		}
		if (/[a-z]+\./.test(text1)) {
			tag = "ol";
			lst = "lower-alpha";
		}
		if (/[A-Z]+\./.test(text1)) {
			tag = "ol";
			lst = "upper-alpha";
		}

		var list = new $rte.ContainerElement(tag);

		if (lst)
			list.__setStyle("list-style-type", lst);

		return list;
	}

	this.__Filter = function (nodes) {

		var lastlist;
		var spanindex = 0;

		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];



			if (node.__namelower == "a") {
				var href = node.__getAttribute("href");
				if (href && href.indexOf('#') != -1 && href.substring(0, 7) == "file://") {
					node.__setAttribute("href", '#' + href.split('#')[1]);
				}
			}

			if (lastlist && node.__namelower == "span") {
				spanindex++;
				if (spanindex % 2 != 0) {
					nodes.splice(i, 1);
					i--;
					continue;
				}
				var ul = lastlist;
				var li = new $rte.ContainerElement("li");
				ul.__appendChild(li);
				li.__appendChild(node);
				node.__removeNode(false);
				node = li;
			}
			else if (node.__namelower == "p" && node.__getAttribute("class") == "MsoListParagraph") {
				node.__removeComments();
				var span1 = node.__nodes[0];
				var text1 = span1.__nodes[0].__text;
				span1.__removeNode(true);

				var ul = lastlist || CreateList(text1);
				if (!lastlist) {
					lastlist = ul;
					nodes[i] = ul;
					if (node.__parent)
						node.__parent.__insertBefore(ul, node);
				}
				else {
					nodes.splice(i, 1);
					i--;
				}

				var li = new $rte.ContainerElement("li");
				ul.__appendChild(li);
				li.__appendChild(node);
				node.__removeNode(false);
				node = li;
			}
			else {
				lastlist = null;
			}

			var s = node.__getAttribute("style");
			if (s) {
				var changed = false;
				var pairs = s.split(';');
				for (var j = 0; j < pairs.length; j++) {
					var pair = pairs[j].split(':');
					if (pair.length != 2) {
						pairs.splice(j, 1);
						changed = true;
						j--;
						continue;
					}
					var n = pair[0].split(' ').join('');
					var v = pair[1].replace(/(^\s+|\s+$)/g, "");
					var remove = false;
					switch (n) {
						case "font-family":
							var newv = v.split('"').join('').split("'").join("");
							if (newv != v) {
								pairs[j] = n + ":" + newv;
								changed = true;
							}
							if (newv == "Arial")
								remove = true;
							break;
						case "text-decoration":
						case "text-style":
						case "font-weight":
							if (v == "normal")
								remove = true;
							break;
						case "font-size":
						case "color":
						case "background-color":
							break;
						case "text-align":
							if (v == "left")
								remove = true;
							break;
						default:
							remove = true;
							continue;
					}
					if (remove) {
						pairs.splice(j, 1);
						changed = true;
						j--;
					}
				}
				if (changed) {
					if (pairs.length == 0) {
						node.__removeAttribute("style");
					}
					else {
						node.__setAttribute("style", pairs.join(";"));
					}
				}
			}

			var sns = node.__nodes;
			if (sns && sns.length) this.__Filter(sns)
		}
		return nodes;
	}
});



$rte.Selection = $rte.Base._extends(function (base, type) {

	this.init = function (core, type, pointnode, pointoffset, rangenode, rangeoffset) {
		base.init.apply(this, arguments);
		this.__core = core;
		this.__version = core.__version;
		this.__type = type;
		this.__pointnode = pointnode;
		this.__pointoffset = pointoffset;
		this.__rangenode = rangenode;
		this.__rangeoffset = rangeoffset;
		this.__synctimerid = $rte.SafeSetTimeout(this.delegate(this.__callSyncToDom), 1);
		//		var caller=this.init.caller;
		//		if(caller)caller=caller.caller;
		//		if(caller)caller=caller.caller;
		//		if(caller)caller=caller.caller;
		//		this.__core.__trace("create selection : "+this+":"+caller);
	}
	this.__startSyncTimer = function () {
		clearTimeout(this.__synctimerid);
		this.__timercleared = false;
		this.__synctimerid = $rte.SafeSetTimeout(this.delegate(this.__callSyncToDom), 1);
	}
	this.__clearSyncTimer = function (notify) {
		//this.__core.__trace("clear sync timer notify:"+notify);
		clearTimeout(this.__synctimerid);
		if (this.__timercleared) return;
		this.__timercleared = true;
		if (!notify) return;
		var core = this.__core;
		$rte.SafeSetTimeout(function () {
			core.__notifySelectionChanged();
		}, 1);
	}
	this.__callSyncToDom = function () {
		if (this.__timercleared) return;
		if (this != this.__core.__selection) return;
		this.__timercleared = true;
		if (this.__version != this.__core.__version) {
			if (!this.__tryRestore())
				return;
		}
		if (this.__core.__getfocused())//||this.__core.__fucosing)
		{
			//this.__core.__trace("call sync to dom");
			this.__core.__rangeSyncToDom(true);
		}
		this.__core.__notifySelectionChanged();
	}
	this.toString = function () {
		switch (this.__type) {
			case "None":
				return "None";
			case "Control":
				return "Control:[" + this.__getPointPath() + "," + this.__getPointDesc() + "]";
			case "Point":
				return "Point:[" + this.__getPointPath() + "," + this.__getPointDesc() + "]";
			case "Range":
				return "Range:[" + this.__getPointPath() + "," + this.__getPointDesc() + "],[" + this.__getRangePath() + "," + this.__getRangeDesc() + "]";
		}
	}

	this.__getPointDesc = function () {
		if (!this.__pointnode)
			return "?";
		return this.__pointnode.__name;
	}
	this.__getRangeDesc = function () {
		if (!this.__rangenode)
			return "?";
		return this.__pointnode.__name;
	}

	this.__getPointPath = function () {
		if (!this.__pointnode)
			return "?";
		var offsetinfo = this.__pointnode._getOffsetPath(this.__pointoffset);
		return this.__core.__getNodePath(this.__pointnode) + (offsetinfo ? ("," + offsetinfo) : "")
	}
	this.__getRangePath = function () {
		if (!this.__rangenode)
			return "?";
		var offsetinfo = this.__rangenode._getOffsetPath(this.__rangeoffset);
		return this.__core.__getNodePath(this.__rangenode) + (offsetinfo ? ("," + offsetinfo) : "")
	}
	this.__tryRestore = function () {
		if (this.__type == 'None') {
			this.__core.__selectNone();
			return true;
		}
		else if (this.__type == 'Control') {
			if (!this.__pointnode.__core)
				return false;
			this.__core.__selectControl(this.__pointnode);
			return true;
		}
		else if (this.__type == 'Point') {
			if (!this.__pointnode.__core)
				return false;
			this.__core.__setPointInside(this.__pointnode, this.__pointoffset);
			return true;
		}
		else if (this.__type == 'Range') {
			if (!this.__pointnode.__core)
				return false;
			if (!this.__rangenode.__core)
				return false;
			this.__core.__setPointInside(this.__pointnode, this.__pointoffset);
			this.__core.__setRangeInside(this.__rangenode, this.__rangeoffset);
			return true;
		}
		else {
		}
	}

});



$rte.Core = $rte.Base._extends(function (base, type) {

	function RTE_Encode(html) {
		if (!html) return html;
		html = html.replace(/\#/g, "#0");
		html = html.replace(/\</g, "#1");
		html = html.replace(/\>/g, "#2");
		html = html.replace(/\&/g, "#3");
		html = html.replace(/\*/g, "#4");
		html = html.replace(/o/g, "#5");
		html = html.replace(/O/g, "#6");
		html = html.replace(/s/g, "#7");
		html = html.replace(/S/g, "#8");
		html = html.replace(/e/g, "#9");
		html = html.replace(/E/g, "#a");
		return html;
	}
	function RTE_Decode(html) {
		if (!html) return html;
		html = html.replace(/#1/g, "<");
		html = html.replace(/#2/g, ">");
		html = html.replace(/#3/g, "&");
		html = html.replace(/#4/g, "*");
		html = html.replace(/#5/g, "o");
		html = html.replace(/#6/g, "O");
		html = html.replace(/#7/g, "s");
		html = html.replace(/#8/g, "S");
		html = html.replace(/#9/g, "e");
		html = html.replace(/#a/g, "E");
		html = html.replace(/#0/g, "#");
		return html;
	}


	var scope = {}
	scope.img = {}
	scope.img.id = 'rteid';


	function DesDecrypt(data) {
		//Paul Tero, July 2001
		//http://www.tero.co.uk/des/
		//
		//Optimised for performance with large blocks by Michael Hayworth, November 2001
		//http://www.netdealing.com
		//
		//THIS SOFTWARE IS PROVIDED "AS IS" AND
		//ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		//ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
		//FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
		//DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
		//OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
		//HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
		//LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
		//OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
		//SUCH DAMAGE.

		//des
		//this takes the key, the message, and whether to encrypt or decrypt
		function des(key, message, encrypt, mode, iv, padding) {
			//declaring this locally speeds things up a bit
			var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
			var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
			var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
			var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
			var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
			var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
			var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
			var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);

			//create the 16 or 48 subkeys we will need
			var keys = des_createKeys(key);

			var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
			var cbcleft, cbcleft2, cbcright, cbcright2
			var endloop, loopinc;
			var len = message.length;
			var chunk = 0;
			//set up the loops for single and triple des
			var iterations = keys.length == 32 ? 3 : 9; //single or triple des
			if (iterations == 3) { looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2); }
			else { looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2); }

			//modified by terry: do not make padding for decrypt.
			//pad the message depending on the padding parameter
			//if (padding == 2) message += "		"; //pad the message with spaces
			//else if (padding == 1) {temp = 8-(len%8); message += String.fromCharCode (temp,temp,temp,temp,temp,temp,temp,temp); if (temp==8) len+=8;} //PKCS7 padding
			//else if (!padding) message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes

			//store the result here
			var result = "";
			var tempresult = "";

			if (mode == 1) { //CBC mode
				cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
				cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
				m = 0;
			}

			//loop through each 64 bit chunk of the message
			while (m < len) {
				left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
				right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

				//for Cipher Block Chaining mode, xor the message with the previous result
				if (mode == 1) { if (encrypt) { left ^= cbcleft; right ^= cbcright; } else { cbcleft2 = cbcleft; cbcright2 = cbcright; cbcleft = left; cbcright = right; } }

				//first each 64 but chunk of the message must be permuted according to IP
				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
				temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
				temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
				temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

				left = ((left << 1) | (left >>> 31));
				right = ((right << 1) | (right >>> 31));

				//do this either 1 or 3 times for each chunk of the message
				for (j = 0; j < iterations; j += 3) {
					endloop = looping[j + 1];
					loopinc = looping[j + 2];
					//now go through and perform the encryption or decryption  
					for (i = looping[j]; i != endloop; i += loopinc) { //for efficiency
						right1 = right ^ keys[i];
						right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
						//the result is attained by passing these bytes through the S selection functions
						temp = left;
						left = right;
						right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
							  | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f]
							  | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
							  | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
					}
					temp = left; left = right; right = temp; //unreverse left and right
				} //for either 1 or 3 iterations

				//move then each one bit to the right
				left = ((left >>> 1) | (left << 31));
				right = ((right >>> 1) | (right << 31));

				//now perform IP-1, which is IP in the opposite direction
				temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
				temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
				temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);

				//for Cipher Block Chaining mode, xor the message with the previous result
				if (mode == 1) { if (encrypt) { cbcleft = left; cbcright = right; } else { left ^= cbcleft2; right ^= cbcright2; } }
				tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));

				chunk += 8;
				if (chunk == 512) { result += tempresult; tempresult = ""; chunk = 0; }
			} //for every 8 characters, or 64 bits in the message

			//return the result as an array
			return result + tempresult;
		} //end of des



		//des_createKeys
		//this takes as input a 64 bit key (even though only 56 bits are used)
		//as an array of 2 integers, and returns 16 48 bit keys
		function des_createKeys(key) {
			//declaring this locally speeds things up a bit
			var pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
			var pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
			var pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
			var pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
			var pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
			var pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
			var pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
			var pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
			var pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
			var pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
			var pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
			var pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
			var pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
			var pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);

			//how many iterations (1 for des, 3 for triple des)
			var iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys

			//stores the return keys
			var keys = new Array(32 * iterations);
			//now define the left shifts which need to be done
			var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
			//other variables
			var lefttemp, righttemp, m = 0, n = 0, temp;
			var left, right;

			for (var j = 0; j < iterations; j++) { //either 1 or 3 iterations
				left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
				right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
				temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
				temp = ((left >>> 2) ^ right) & 0x33333333; right ^= temp; left ^= (temp << 2);
				temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
				temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
				temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

				//the right side needs to be shifted and to get the last four bits of the left side
				temp = (left << 8) | ((right >>> 20) & 0x000000f0);
				//left needs to be put upside down
				left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
				right = temp;

				//now go through and perform these shifts on the left and right keys
				for (i = 0; i < shifts.length; i++) {
					//shift the keys either one or two bits to the left
					if (shifts[i]) { left = (left << 2) | (left >>> 26); right = (right << 2) | (right >>> 26); }
					else { left = (left << 1) | (left >>> 27); right = (right << 1) | (right >>> 27); }
					left &= -0xf; right &= -0xf;

					//now apply PC-2, in such a way that E is easier when encrypting or decrypting
					//this conversion will look like PC-2 except only the last 6 bits of each byte are used
					//rather than 48 consecutive bits and the order of lines will be according to 
					//how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
					lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
							| pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
							| pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
							| pc2bytes6[(left >>> 4) & 0xf];
					righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
							  | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
							  | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
							  | pc2bytes13[(right >>> 4) & 0xf];
					temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
					keys[n++] = lefttemp ^ temp; keys[n++] = righttemp ^ (temp << 16);
				}
			} //for each iterations
			//return the keys we've created
			return keys;
		} //end of des_createKeys

		var message = [];
		for (var i = 0; i < data.length; i++) message.push(String.fromCharCode(data[i]));
		message = message.join("");

		var binkey = [0x46, 0x35, 0x32, 0x42, 0x31, 0x38, 0x36, 0x46];
		var key = []
		for (var i = 0; i < binkey.length; i++) key.push(String.fromCharCode(binkey[i]));
		key = key.join("");
		var iv = key;

		return des(key, message, 0, 1, iv);


	}



	function RequireClientLicenseCheck() {
		var urls = [GetCurrentUrl()];
		for (var i = 0; i < urls.length; i++) {
			var url = urls[i];
			if (!url) continue;
			url = url.split("?")[0];
			var ext = url.substring(url.lastIndexOf(".") + 1);
			if (ext == url) ext = "";
			switch (ext.toLowerCase()) {
				//ASP.NET
				case "aspx":
				case "ashx":
				case "axd":
					return false;
				case "php":
					return "php";
				case "asp":
					return false;
			}
		}
		return false;
	}


	var hexdat;
	var hexmap;
	var lcparts;
	var serverip;
	function AsyncValidateLicense(task, callback) {
		var checkproduct = RequireClientLicenseCheck()

		if (!checkproduct)
			return callback(task);

		var xh = CreateXMLHttp();

		if (!hexdat) {
			var licurl = task.__config.licenseurl;
			if (!licurl) {
				return task.__licerror("Failed to load editor license info!");
			}
			xh.open("GET", licurl, false);
			xh.send("");
			if (xh.status != 200)
				return task.__licerror("Failed to load editor license info.");
			hexdat = xh.responseText.toUpperCase();
			if (hexdat.substring(0, 24) == "5C305C305C305C305C305C30") {
				hexdat = hexdat.replace(/([0-9A-F][0-9A-F])/g, "$1-").split("5C-30-").join("00-").replace(/-/g, "");
			}
		}

		if (!hexmap) {
			hexmap = {};
			var hexarr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
			for (var i = 0; i < hexarr.length; i++)
				hexmap[hexarr[i]] = i;
		}

		/// note : scope[scope.img.id]=ReportLicenseError;
		var reportLicErr = scope[scope.img.id];

		try {
			if (!lcparts) {
				// 0000000000000840 is double 3.0
				if (hexdat.substring(0, 16) != "0000000000000840")
					return reportLicErr(task, 1001);

				var bin = [];
				for (var i = 0; i < hexdat.length; i += 2)
					bin.push(hexmap[hexdat.charAt(i)] * 16 + hexmap[hexdat.charAt(i + 1)]);
				bin.splice(0, 8);
				bin.splice(0, 123);//rubbish
				var datalen = bin[0] + bin[1] * 256;//it's a int value , small about 1xx
				bin.splice(0, 4);
				var licensedata = bin.slice(0, datalen);	//ok, rest data is sign or rubbish

				var license = DesDecrypt(licensedata);

				//remove the UTF8 mark and des PKCS7 padding data
				license = license.replace(/^\xEF\xBB\xBF/, "").replace(/[\x00-\x08]*$/, "");
				lcparts = license.split(";");
			}

			if (lcparts.length != 10)
				return reportLicErr(task, 1002, lcparts.length);

			//None,en-ca,None,8H4896,AjaxUploader for asp.net is licensed.,410406,4,newtree.com,69.20.61.75,06/06/2006

			var dtparts = lcparts[9].split("/");
			var lcdate = new Date(parseFloat(dtparts[2]), parseFloat(dtparts[1]) - 1, parseFloat(dtparts[0]));
			var lctime = lcdate.getTime();

			var productmatch = false;
			var licensed_product_id = lcparts[5] << 2;

			switch (checkproduct) {
				//NOTE:asp validate the license at server side.
				case "asp":
					if (licensed_product_id == 1201287152)	//300321788	, asp uploader
						productmatch = true;
					if (licensed_product_id == 878176)	//219544	, asp editor
						productmatch = true;
					break;
				case "php":
					if (licensed_product_id == 2041624)	//510406 , for old lic file.
						productmatch = true;
					if (licensed_product_id == 1201260956)	//300315239	, php uploader
						productmatch = true;
					if (licensed_product_id == 1200685124)	//300171281	, php editor
						productmatch = true;
					if (licensed_product_id == 1201488340)	//300372085	, php gallery
						productmatch = true;
					if (licensed_product_id == 1202194764)	//300548691	, php editor 8 ,
						productmatch = true;
					break;
				case "any":
				default:
					break;
			}

			if (!productmatch)
				return reportLicErr(task, 1003, lcparts[5]);

			var currentdomain = GetCurrentUrl().split("//")[1].split("/")[0].split(":")[0].toLowerCase();

			var islocalhost = false;
			if (currentdomain == String.fromCharCode(108, 111, 99, 97, 108, 104, 111, 115, 116))	//localhost
				islocalhost = true;
			if (currentdomain == String.fromCharCode(49, 50, 55, 46, 48, 46, 48, 46, 49))	//127.0.0.1
				islocalhost = true;


			currentdomain = GetHostBase(currentdomain);

			var licensedomain = lcparts[7].toLowerCase();
			var licenseip = lcparts[8];

			switch (parseInt(lcparts[6])) {
				case 0:
					if (lctime < new Date().getTime())
						return reportLicErr(task, 20000, lcdate);
					if (islocalhost)
						break;
					return reportLicErr(task, 20001, currentdomain);
				case 1:
					if (islocalhost)
						break;
					if (licensedomain != currentdomain && licensedomain.indexOf(currentdomain) == -1)
						return reportLicErr(task, 20010, currentdomain, licensedomain);
					break;
				case 2:
					if (islocalhost)
						break;
					if (!serverip) {
						xh.open("GET", task.__config.uploaderresourcehandler + "?type=serverip&_ver=" + new Date().getTime(), false);
						xh.send("");
						if (xh.status != 200)
							return task.__licerror("Failed to load editor license info!");
						serverip = xh.responseText;
					}
					if (licenseip != serverip && licenseip.indexOf(serverip) == -1)
						return reportLicErr(task, 20020, serverip, licenseip);
					break;
				case 3:
					if (islocalhost)
						break;
					if (licensedomain.indexOf(currentdomain) == -1)
						return reportLicErr(task, 20030, currentdomain, licensedomain);
					break;
				case 4:
					if (lctime < new Date().getTime())
						return reportLicErr(task, 20040, lcdate);
					break;
				case 5://enterprise
					break;
				default:
					return reportLicErr(task, 1004, parseInt(lcparts[6]));
			}
		}
		catch (x) {
			return task.__licerror(x.message);
		}

		return callback(task);
	}

	function ReportLicenseError(task, errortype, state) {
		var msg = "";
		switch (errortype) {
			case 1001:
				msg = "You are using an incorrect license file.";
				break;
			case 1002:
				msg = "Invalid lcparts count:" + state;
				break;
			case 1003:
				msg = "Invalid product version.";
				break;
			case 1004:
				msg = "Invalid license type.";
				break;
			case 20000:
				msg = "(0) license expired!";
				break;
			case 20001:
				msg = "(0) only localhost!";
				break;
			case 20010:
				msg = "(1) host not match!";
				break;
			case 20020:
				msg = "(2) ip not match!";
				break;
			case 20030:
				msg = "(3) host not match!";
				break;
			case 20040:
				msg = "(4) license expired!";
				break;
		}
		try {
			return task.__licerror("License Error : " + msg);
		}
		catch (x) {
		}
	}



	function GetHostBase(host) {
		var parts = host.split('.');

		if (parts[0] == "www")
			parts.splice(0, 1);

		return parts.join(".");
	}
	function GetCurrentUrl() {
		return window.location.href.split("#")[0];
	}
	function CreateXMLHttp() {
		return jsml.xmlhttp();
	}

	scope[scope.img.id] = ReportLicenseError;

	this.__licerror = function (errormsg) {
		alert(errormsg);
		this.Dispose();
	}


	this.init = function (config, frame, win) {
		base.init.apply(this, arguments);
		this.__config = config;
		this.__frame = frame;
		this.__win = win;
		this.__version = 0;
		this.__logs = [];
		this.__logi = -1;
		this.__tabmode = "edit";

		//search all for IE..
		var ctrls = document.getElementsByName(config.uniqueid);
		for (var i = 0; i < ctrls.length; i++) {
			var ctrl = ctrls[i];
			if (ctrl.nodeName == "INPUT" || ctrl.nodeName == "TEXTAREA")
				this.__hidden = ctrl;
		}

		var text = config.text || "";
		if (this.__hidden) {
			text = this.__hidden.value;
			if (config.encodehiddenvalue)
				text = RTE_Decode(text);
			this.__hidden.setAttribute("noajax", "1");
			this.__initform();
			this.__config.editorelement.value = text;
		}

		this.__setEditHtml(text);

		this.__loaded = true;
		$rte.SafeSetTimeout(this.delegate(function () {
			this._broadcastEvent("Load", [this]);
			if (this.__getfocused()) {
				this._broadcastEvent("Focus");
			}
		}), 88);

		if (this.__GetFlashVersion() >= 10) {
			$rte.SafeSetTimeout(this.delegate(this.__LoadRteFC), 1);
		}

		if (core_mobile) {
			this.__InitSelectionDecorator();

			this.AttachEvent("TouchInit", this.delegate(this.__touchinit));
		}

		AsyncValidateLicense(this, function () {
			//licok
		});



		if (top != window && window.getSelection) {
			var ual = navigator.userAgent.toLowerCase();
			if (ual.indexOf('trident') > -1 || ual.indexOf('edge') > -1) {
				jsml.dom_attach_event(window, "unload", this.delegate(function () {
					var inp = document.createElement("input");
					document.body.appendChild(inp);
					inp.focus();
					document.body.removeChild(inp);

					var sel = window.getSelection();
					sel.removeAllRanges();


				}));
			}
		}
	}



	this.__touchinit = function (editor, args) {
		var ctrl = args.Arguments[0];
		var core = this
		ctrl.onclick = function (e) {
			/*
			var sb=[]
			sb.push("pageXOffset:"+window.pageXOffset)
			sb.push("innerWidth:"+window.innerWidth)
			for(var p in e)
			{
				if(p.toLowerCase().charAt(p.length-1)=="x")
					sb.push(p+":"+e[p]);
			}
			//alert(sb.join("\r\n"))
			*/
			var sp = jsml.get_scrollposition(e.target)
			core.__selectForPoint(window.pageXOffset + e.x - sp.left, window.pageYOffset + e.y - sp.top);
		}
	}


	this.__initform = function () {
		var form = this.__hidden;
		for (; form != null; form = form.parentNode) {
			if (form.nodeName == "FORM")
				break;
		}

		if (form == null)
			return;

		if (this.__config.maxhtmllength > 0 || this.__config.maxtextlength > 0) {
			this.__hookformsubmit(form);
		}
	}

	this.__checksubmitform = function () {
		if (this.__config.maxhtmllength > 0) {
			if (this.__hidden.value.length > this.__config.maxhtmllength) {
				alert(this.GetLangText("reach_maxhtmllength"));
				return false;
			}
		}

		if (this.__config.maxtextlength > 0) {
			if (this.__hidden.value.length > this.__config.maxtextlength && RteHtmlDecode(this.__hidden.value).length > this.__config.maxtextlength) {
				alert(this.GetLangText("reach_maxtextlength"));
				return false;
			}
		}

		return true;
	}

	this.__hookformsubmit = function (form) {
		var core = this;

		function gk_handle_submit(event) {
			if (core.__checksubmitform())
				return;

			event.preventDefault();
		}
		function ie_handle_submit() {
			if (core.__checksubmitform())
				return;

			var event = window.event;
			event.returnValue = false;
		}

		if (form.addEventListener)
			form.addEventListener("submit", gk_handle_submit, false);
		else
			form.attachEvent("onsubmit", ie_handle_submit);
	}

	this.Dispose = function () {
		__core_initEvents(this, true);
		this._broadcastEvent("Dispose");
	}

	this._broadcastEvent = function (name, args) {
		if (!this.__loaded) return;
		var e = this.FireEvent(name, args, this);
		var handler = this.__config["on" + name.toLowerCase()];
		if (handler != null) {
			if (false === handler.call(this, this, e))
				return false;
		}
		handler = this.__config["On" + name];
		if (handler != null) {
			if (false === handler.call(this, this, e))
				return false;
		}
		handler = window["RichTextEditor_On" + name];
		if (handler != null) {
			if (false === handler.call(this, this, e))
				return false;
		}
		return e.ReturnValue;
	}

	this.GetContentVersion = function () {
		return this.__version;
	}

	this._invokeUIRequest = function (cmd) {

	}

	this.__trace = function (msg, cat, info, obj) {
		if (this.__config._debugmode) {
			if (!cat) cat = "NONE";
			this._broadcastEvent("Trace", [msg, cat, info, obj]);
		}
	}

	this.SupportLocalData = function () {
		return false;
	}
	this.SetLocalData = function (cate, name, value) {
	}
	this.GetLocalData = function (cate, name) {
	}


	this.__getHtmlWithoutCache = function () {
		var dns = this.__docinfo.__nodes;
		var dbn = this.__docinfo.__bodynode;
		var html;
		if (!dns || !dbn) {
			html = this.__bodynode.__getInnerHtml();
		}
		else {
			//TODO: parse the body as another type and override the __getInnerHtml and use __renderbody in child class
			dbn.__renderbody = this.__bodynode;
			var sb = [];
			for (var i = 0; i < dns.length; i++)
				dns[i]._writeHtml(sb);
			html = sb.join("");
		}
		html = html.replace(/^\s+/, '');
		return this.__filterForValue(html);
	}
	this.__getEditHtml = function () {
		if (this.__geh_version == this.__version)
			return this._geh_htmlcode;
		this._geh_htmlcode = this.__getHtmlWithoutCache();
		this.__geh_version = this.__version;
		return this._geh_htmlcode;
	}
	this.__parseHtmlCode = function (html) {
		return __parseHTML(this, html);
	}


	function FindBodyNode(ns) {
		if (!ns) return;
		for (var i = 0; i < ns.length; i++) {
			var n = ns[i];
			if (n.__namelower == "body")
				return n;
			n = FindBodyNode(n.__nodes);
			if (n) return n;
		}
	}


	this.__setEditHtml = function (value) {
		var nodes = this.__parseHtmlCode(value);

		var docinfo = {}

		var bodynode = FindBodyNode(nodes);
		if (bodynode) {
			docinfo.__nodes = nodes;
			docinfo.__bodynode = bodynode;
			nodes = bodynode.__nodes.concat();
			bodynode.__clearChildren();
		}

		this.__resetFrame(nodes, docinfo);
		this.__reinitSelection();

		this.__notifyContentChanged();

	}

	this.DetachFrame = function () {
		this.__tempcontroltooldata = null;
		this.__temptdresizetooldata = null;
		__core_initEvents(this, true);
		this._broadcastEvent("ResetCore");
		this.__detachframe = true;
	}
	this.AttachFrame = function () {
		this.__win = this.__frame.contentWindow;
		this.__loadLog(null, true);
		if (this.__previewframe && this.IsTabView) {
			//setTimeout(this.delegate(function () {
			this.InitPreviewFrame(this.__previewframe, true);
			//}), 10);
		}
	}

	this.GetFrameVersion = function () {
		return this.__frameversion || 0;
	}

	this.__resetFrame = function (nodes, docinfo) {
		this.__frameversion = 1 + (this.__frameversion || 0);

		var config = this.__config;

		var fontsize;
		var fontname;

		var firstload = !this.__detachframe;
		if (firstload && this.__bodynode) {
			var oldb = this.__win.document.body
			fontsize = jsml.get_current_style(oldb, "font-size");
			fontname = jsml.get_current_style(oldb, "font-family");
			this.__tempcontroltooldata = null;
			this.__temptdresizetooldata = null;
			__core_initEvents(this, true);
			this.__bodynode._detachCore();
			this._broadcastEvent("ResetCore");
			firstload = false;
		}

		var htmlcode = config.designtimeblankhtml;
		if (!htmlcode) {
			htmlcode = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
				+ '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>blank</title></head><body></body></html>'
		}


		var doc = this.__win.document;

		if (this.__designmode) {
			var de = doc.getElementsByTagName("head")[0];
			while (de.firstChild) de.removeChild(de.firstChild);
			de.appendChild(doc.createElement("head"));
			de.appendChild(doc.createElement("body"));
		}
		else {
			doc.open("text/html", "replace");
			doc.write(htmlcode);
			doc.close();
			doc = this.__win.document;
		}

		var head = doc.getElementsByTagName("head")[0]//||doc.documentElement.insertBefore(doc.createElement("head"),doc.documentElement.firstChild);

		var basetag = doc.createElement("BASE");
		basetag.setAttribute("href", config.basehref || window.location.href);
		head.appendChild(basetag);


		this.__setupstylelink = function (url) {

			var stytag = doc.createElement("STYLE");
			stytag.setAttribute("type", "text/css");
			stytag.setAttribute("originalurl", url);
			head.appendChild(stytag);

			if (!this.__linkcssmap) {
				this.__linkcssmap = {}
			}

			if (this.__linkcssmap[url]) {
				if (stytag.styleSheet)
					stytag.styleSheet.cssText = this.__linkcssmap[url];
				else
					stytag.appendChild(doc.createTextNode(this.__linkcssmap[url]));
				return;
			}

			var framev = this.__frameversion;

			this._loader.asyncloadtext(url, this.delegate(function (rt) {
				rt = rt.split("url(images/").join("url(" + config.folder + "styles/images/");
				this.__linkcssmap[url] = rt;
				if (stytag.styleSheet)
					stytag.styleSheet.cssText = rt;
				else
					stytag.appendChild(doc.createTextNode(rt));

			}));


		}

		this.__setupstylelink(config.folder + "styles/tabedit.css?" + config._urlsuffix);

		var contentcss = config.contentcss;
		if (contentcss) {
			contentcss = contentcss.split(',');
			for (var i = 0; i < contentcss.length; i++) {
				if (!contentcss[i])
					continue;
				contentcss[i] = this.MakeAbsoluteUrl(contentcss[i]);
				this.__setupstylelink(contentcss[i]);
			}
		}

		if (config.contentcsstext) {
			var stytag = doc.createElement("STYLE");
			stytag.setAttribute("type", "text/css");
			stytag.setAttribute("_from", "contentcsstext");
			if (stytag.styleSheet)
				stytag.styleSheet.cssText = config.contentcsstext;
			else
				stytag.appendChild(doc.createTextNode(config.contentcsstext));
			head.appendChild(stytag);
		}


		if (docinfo && docinfo.__nodes) {
			FindNodeBy(docinfo.__nodes
				, this.delegate(function (node) {
					if (node.__namelower == "link" && node.__getAttribute("rel") == "styleSheet") {
						var url = node.__getAttribute("href");
						if (url) this.__setupstylelink(url);
						return;
					}
					if (node.__namelower == "style") {
						var stytag = doc.createElement("STYLE");
						stytag.setAttribute("type", "text/css");
						if (stytag.styleSheet)
							stytag.styleSheet.cssText = node.GetInnerText();
						else
							stytag.appendChild(doc.createTextNode(node.GetInnerText()));
						head.appendChild(stytag);
					}
				})
			);
		}

		var body = doc.body;
		body.innerHTML = "";


		this.__hiddenfloatdiv = doc.createElement("DIV");
		//do not set top, the event handler use it.
		this.__hiddenfloatdiv.style.cssText = "position:absolute;width:10px;height:10px;top:0px;" + (config.textdirection == "rtl" ? "right:-3000px" : "left:-3000px;");
		this.__hiddentextnode = doc.createTextNode("==");
		this.__lasthiddennode = doc.createTextNode("==");
		this.__hiddenfloatdiv.appendChild(this.__hiddentextnode)
		this.__hiddenfloatdiv.appendChild(this.__lasthiddennode)
		this.__hiddenfloatdiv.setAttribute("contenteditable", "false");
		this.__hiddenfloatdiv.contentEditable = false;
		if (config.textdirection == "rtl")
			this.__hiddenfloatdiv.style.display = 'none';
		body.appendChild(this.__hiddenfloatdiv);

		this.__laststaticdiv = doc.createElement("DIV");
		this.__laststaticdiv.style.height = "0px";
		this.__laststaticdiv.style.width = "0px";
		this.__laststaticdiv.style.display = "inline";
		this.__laststaticdiv.style.marginBottom = jsml.msieall ? "0px" : "6px";
		this.__laststaticdiv.setAttribute("contenteditable", "false");
		this.__laststaticdiv.contentEditable = false;
		body.appendChild(this.__laststaticdiv);

		this.__initpastediv();

		if (jsml.bodydivmode) {
			var anotherbody = doc.createElement("div");
			body.insertBefore(anotherbody, this.__hiddenfloatdiv);
			body = anotherbody;
		}
		this.__winbody = body;

		this.__designmode = false;

		if (firstload) {
			this.__firefoxnoselchg = !("onselectionchange" in doc)
		}

		if (!config.readonly && !core_mobile) {
			body.setAttribute("contenteditable", "true");
			if (jsml.msieall || "contentEditable" in body)
				body.contentEditable = true;
			else
				doc.designMode = this.__designmode = 'on';
		}

		//try{doc.execCommand("2D-Position",false,false);}catch(x){}
		//try{doc.execCommand("LiveResize",false,config.enableobjectresizing?");}catch(x){}


		this.__docinfo = docinfo;

		this.__bodynode = new $rte.CoreBodyElement();
		if (docinfo.__bodynode) {
			this.__bodynode.__importAttributes(docinfo.__bodynode);
		}

		this.__bodynode.__setRuntimeAttribute("id", config.editorbodyid || null, "editorbodyid", true);
		this.__bodynode.__setRuntimeAttribute("class", config.editorbodyclass || null, "editorbodyclass", true);
		this.__bodynode.__setRuntimeAttribute("style", "outline:none", "hidedivoutline", true);
		this.__bodynode.__setRuntimeAttribute("style", config.editorbodystyle || null, "editorbodystyle", true);
		if (fontsize)
			this.__bodynode.__setRuntimeAttribute("style", "font-size:" + fontsize, "prevfontsize", true);
		if (fontname)
			this.__bodynode.__setRuntimeAttribute("style", "font-family:" + fontname, "prevfontname", true);

		this.__bodynode.__initbody(body, this.__hiddenfloatdiv);

		this.__ApplyDesignBorder();

		for (var i = 0; i < nodes.length; i++)
			this.__bodynode.__appendChild(nodes[i]);

		this.__bodynode._attachCore(this);

		this.__selection = new $rte.Selection(this, "None", null, 0, null, 0);

		if (!config.allowbrowserspellcheck) {
			body.setAttribute("spellcheck", "false");
		}

		if (config.textdirection) {
			this.__bodynode.__setRuntimeAttribute("style", "direction:" + config.textdirection, "textdirection", true);
		}


		__core_initEvents(this);



		body.style.paddingBottom = "12px";
		if (firstload) {
			body.style.display = 'none';
			$rte.SafeSetTimeout(this.delegate(function () {
				if (this.__winbody != body)
					return;
				try { body.style.display = ''; } catch (x) { }
			}), 10);
		}

		if (jsml.bodydivmode) {
			this.__winbody.style.minHeight = Math.max(50, this.__win.document.body.clientHeight - 50) + "px";
		}


	}

	this.__onframeresize = function () {

	}

	this.InitPreviewFrame = function (frame, restoremode) {
		this.__previewframe = frame;

		var config = this.__config;

		if (restoremode) {
			frame.contentWindow.document.open("text/html", true);
			frame.contentWindow.document.write("");
			frame.contentWindow.document.close();
		}

		var doc = frame.contentWindow.document;
		var head = doc.getElementsByTagName("head")[0];
		if (!head) return false;

		var basetag = doc.createElement("BASE");
		basetag.setAttribute("href", config.basehref || window.location.href);
		head.appendChild(basetag);

		var scpt = doc.createElement("SCRIPT");
		scpt.setAttribute("src", config.folder + "scripts/tabview.js?" + config._urlsuffix);
		head.appendChild(scpt);

		var link = doc.createElement("LINK");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", config.folder + "styles/tabview.css?" + config._urlsuffix);
		head.appendChild(link);

		var previewcss = config.previewcss || config.contentcss;
		if (previewcss) {
			previewcss = previewcss.split(',');
			for (var i = 0; i < previewcss.length; i++) {
				if (!previewcss[i])
					continue;
				var link = doc.createElement("LINK");
				link.setAttribute("rel", "stylesheet");
				link.setAttribute("href", this.MakeAbsoluteUrl(previewcss[i]));
				head.appendChild(link);
			}
		}

		if (config.previewcsstext || config.contentcsstext) {
			var stytag = doc.createElement("STYLE");
			stytag.setAttribute("type", "text/css");
			stytag.setAttribute("_from", "contentcsstext");
			if (stytag.styleSheet)
				stytag.styleSheet.cssText = config.previewcsstext || config.contentcsstext
			else
				stytag.appendChild(doc.createTextNode(config.previewcsstext || config.contentcsstext));
			head.appendChild(stytag);
		}

		if (config.editorbodyid) doc.body.className = config.editorbodyid
		if (config.editorbodyclass) doc.body.className = config.editorbodyclass
		if (config.editorbodystyle) doc.body.style.cssText = config.editorbodystyle

		var html = this.GetHtmlCode();
		html = html.replace(/<![^>]*-->/g, "");
		doc.body.innerHTML = html;

		if (html.match(/<body/i)) {
			var bodynode = FindBodyNode(this.__parseHtmlCode(html));
			if (bodynode) {
				doc.body.style.cssText = bodynode.__getAttribute("style") || "";
			}
		}

		if (config.textdirection) {
			doc.body.style.direction = config.textdirection;
		}

		this._broadcastEvent("InitPreview", [doc]);

		return true;
	}


	this.SetIgnoreEditable = function (value) {
		this[".ignore_contenteditable"] = value;
	}

	this.__notifyInvalidChanged = function (node, reason) {
		if (this[".ignore_" + reason])
			return;
		this.__hasinvalidchanged = true;
	}
	this.__notifyContentChanged = function (onlyprop, refnode) {
		//TODO, if(!onlyprop), ..
		this.__version++;
		if (refnode && refnode.nodeType == 3) {
			this.__selection.__version = this.__version;
		}
		if (!refnode) {
			this.__nccnoref = true;
		}
		if (this.__versiontimerid) return;
		this.__versiontimerid = $rte.SafeSetTimeout(this.delegate(function notifycontentchangeddelay() {

			this.__versiontimerid = null;
			this.__savelogbynotify = true;
			this.__saveLogContent(false, !this.__nccnoref);
			if (this.__nccnoref) {
				this.__notifySelectionChanged();
			}
			this.__nccnoref = false;
		}), 5);

	}
	this.__stopNotifyChanged = function () {
		clearTimeout(this.__versiontimerid);
		this.__versiontimerid = null;
	}
	this.__notifySelectionChanged = function () {
		this.__notifyUpdateUI();
		if (this.__updatelogseltimerid) return;
		this.__updatelogseltimerid = $rte.SafeSetTimeout(this.delegate(function () {
			this.__updatelogseltimerid = null;
			this.__resetPointLogics();
			var bns = this.__bodynode.__nodes;
			if (!bns.length) {
				this.__selectLastTextNode(true);
				return;
			}
			var pn = this.__getPointNode();
			//			if(pn&&pn.nodeType==3&&pn.__text==" ")
			//			{
			//				pn.__removeNode(true);
			//				return;
			//			}
			if (pn == this.__bodynode && bns.length == 1) {
				if (bns[0].__text == " ") {
					bns[0].__removeNode(true);
					return;
				}
			}
			this.__saveLogSelection();
			this.__trace("save log selection : " + this.__selection);
			this._broadcastEvent("SelectionChanged");
		}), 8);	//TODO:
	}

	this.IsDirty = function () {
		return this.__logi > 0;
	}

	this.__canUndo = function () {
		return this.__logi > 0;
	}
	this.__canRedo = function () {
		return this.__logi + 1 < this.__logs.length;
	}
	this.__doUndo = function () {
		if (this.__logi > 0) {
			this.__logi--;
			this.__loadLog();
		}
	}
	this.__doRedo = function () {
		if (this.__logi + 1 < this.__logs.length) {
			this.__logi++;
			this.__loadLog();
		}
	}
	this.__loadLog = function (index, nochanged) {
		if (typeof (index) == "number") {
			if (index >= 0 && index < this.__logs.length) {
				this.__logi = index;
			}
		}

		var log = this.__logs[this.__logi];

		var nodes = log.__nodes.concat();
		for (var i = 0; i < nodes.length; i++)
			nodes[i] = nodes[i]._cloneNode(true);

		if (this.__hidden) {
			var filteredval = this.__filterForValue(log.__value);
			if (this.__config.encodehiddenvalue)
				this.__hidden.value = RTE_Encode(filteredval);
			else
				this.__hidden.value = filteredval;
			this.__config.editorelement.value = filteredval;
		}

		var docinfo = {}
		if (log.__docns && log.__docns.length) {
			docinfo.__nodes = [];
			for (var i = 0; i < log.__docns.length; i++)
				docinfo.__nodes.push(log.__docns[i]._cloneNode(true));
			docinfo.__bodynode = FindBodyNode(docinfo.__nodes);
		}
		else {
			docinfo.__bodynode = log.__bodyn;
		}

		this.__resetFrame(nodes, docinfo);

		this.__version = log.__version;

		if (!this.__config.readonly) {
			this.__loadLogSelection();
			this.__rangeSyncToDom(true);
			if (!nochanged) {
				this._broadcastEvent("TextChanged");
			}
		}
	}
	this.__loadLogSelection = function (arglog) {
		var log = arglog || this.__logs[this.__logi];
		try {
			if (log.__bookmark) this.__restoreBookmark(log.__bookmark);
			if (log.__dbtop) this.__win.document.body.scrollTop = log.__dbtop;
			if (log.__detop) this.__win.document.documentElement.scrollTop = log.__detop;
		}
		catch (x) {
			this.__selectLastTextNode();
		}
		this.__notifySelectionChanged();
	}
	this.__loadLogIndex = function (sp, force) {
		if (this.__logi == sp && !force) {
			var oldlog = this.__logs[this.__logi];
			if (!oldlog)
				return;
			if (this.__version == oldlog.__version)
				return;
		}
		this.__logi = sp;
		this.__loadLog();
		this.__logs.splice(this.__logi + 1, this.__logs.length - this.__logi + 1);
	}
	this.__saveAndReload = function () {
		var sp = this.__saveLogContent(true);
		this.__saveLogSelection();
		this.__loadLogIndex(sp, true);
	}
	this.__saveLogIndex = function (sp) {
		this.__logi = sp - 1;
		this.__saveLogContent(true);
	}
	this.__saveLogContent = function (force, bynodechange) {
		var bynotify = this.__savelogbynotify;
		this.__savelogbynotify = null;

		var oldlogtime = 0;
		var oldlog = this.__logs[this.__logi];
		if (oldlog && oldlog.__bynotify) {
			oldlogtime = oldlog.__time;
		}

		if (oldlog && this.__version == oldlog.__version && !force) {
			this.__saveLogSelection();
			oldlog.__bynotify = bynotify;
			return this.__logi;
		}

		if (this.__hasinvalidchanged && oldlog) {
			this.__hasinvalidchanged = false;
			this.__loadLog();
			return this.__logi;
		}

		if (this.__config.readonly && oldlog) {
			this.__loadLog();
			return this.__logi;
		}

		if (!bynodechange) {
			if (oldlog && oldlog.__bodyhtml != this.__bodynode.__viewnode.innerHTML) {
				this.__mixSyncBody();
			}
		}

		var log = {};
		log.__version = this.__version;
		log.__time = new Date().getTime();
		log.__bynotify = bynotify;
		log.__bodyhtml = this.__bodynode.__viewnode.innerHTML;

		log.__value = this.__getEditHtml();

		if (oldlog && log.__value.length > oldlog.__value.length) {
			if (this.__config.maxhtmllength > 0) {
				if (log.__value.length > this.__config.maxhtmllength) {
					this.__loadLog();
					//TODO:alert reach max html..
					return this.__logi;
				}
			}
			if (this.__config.maxtextlength > 0) {
				if (log.__value.length > this.__config.maxtextlength && RteHtmlDecode(log.__value).length > this.__config.maxtextlength) {
					this.__loadLog();
					//TODO:alert reach max text..
					return this.__logi;
				}
			}
		}


		if (this.__docinfo.__nodes && this.__docinfo.__bodynode) {
			log.__docns = [];
			for (var i = 0; i < this.__docinfo.__nodes.length; i++)
				log.__docns.push(this.__docinfo.__nodes[i]._cloneNode(true));
		}
		else {
			log.__bodyn = this.__bodynode._cloneNode(false);
		}
		log.__nodes = this.__bodynode.__cloneNodes();

		if (force || log.__time - oldlogtime > 1000) {
			this.__logs.splice(this.__logi + 1, this.__logs.length - (this.__logi + 1));
			this.__logi++;
		}

		if (this.__hidden) {
			var filteredval = this.__filterForValue(log.__value);
			if (this.__config.encodehiddenvalue)
				this.__hidden.value = RTE_Encode(filteredval);
			else
				this.__hidden.value = filteredval;
			this.__config.editorelement.value = filteredval;
		}
		this.__logs[this.__logi] = log;

		this.__saveLogSelection();

		if (this.__logi > 0) {
			this._broadcastEvent("TextChanged");
		}

		return this.__logi;
	}
	this.__saveLogSelection = function () {
		var log = this.__logs[this.__logi];
		log.__bookmark = this.__saveBookmark();
		log.__dbtop = this.__win.document.body.scrollTop;
		log.__detop = this.__win.document.documentElement.scrollTop;
		return log;
	}

	this.__addSyncHandler = function (handler) {
		if (!this.__syncHandlers) this.__syncHandlers = [];
		this.__syncHandlers.push(handler);
	}

	this.__mixSyncBody = function () {
		if (this.__syncingbody) {
			//Firefox Bug!!!
			return;
		}
		this.__syncingbody = true;
		try {
			var ctx = {};

			ctx.pno = Browser_GetPointNodeOffset(this.__win);
			ctx.rno = Browser_GetRangeNodeOffset(this.__win);

			this.__bodynode.__syncContent(ctx);

			var arr = this.__syncHandlers;
			if (arr) {
				this.__syncHandlers = null;
				for (var i = 0; i < arr.length; i++)
					arr[i]();
			}

			if (ctx.pn) {
				if (ctx.pne)
					Browser_SetPointAfter(this.__win, ctx.pn);
				else
					Browser_SetPointBefore(this.__win, ctx.pn);
			}
			if (ctx.rn) {
				if (ctx.pn)
					Browser_SetRangeAfter(this.__win, ctx.rn);
				else
					Browser_SetPointAfter(this.__win, ctx.rn);
			}
			this.__rangeSyncFromDom();
		}
		finally {
			this.__syncingbody = false;
		}
		var pno = Browser_GetPointNodeOffset(this.__win);
		if (pno && pno.node) {
			for (var n = pno.node; n; n = n.parentNode) {
				if (n.nodeType == 1) {
					Browser_ScrollIntoView(this.__win, n);
					break;
				}
			}
		}
	}
	this.__mixSyncContent = function () {
		this.__mixsynctimerid = null;
		var log = this.__logs[this.__logi];
		if (!log) return;
		if (log.__bodyhtml == this.__bodynode.__viewnode.innerHTML)
			return;
		this.__mixSyncBody();
		log.__bodyhtml = this.__bodynode.__viewnode.innerHTML;
		return true;
	}
	this.__mixSyncCheck = function (keyevent, note) {
		if (this.__mixsynctimerid) return;
		var core = this;
		var framev = core.__frameversion;
		this.__mixsynctimerid = $rte.SafeSetTimeout(function () {
			core.__mixsynctimerid = null;
			if (framev != core.__frameversion)
				return;
			core.__mixSyncContent();
		}, 0);
	}


	this.__changeTabMode = function (mode) {
		var currmode = this.__tabmode;
		if (currmode == mode) return;
		var valid = false;
		switch (currmode) {
			case "edit":
				switch (mode) {
					case "code":
						this.__codehtml = this.__getEditHtml();
						valid = true;
						break;
					case "view":
						this.__codehtml = this.__getEditHtml();
						this.__viewfrom = 'edit';
						valid = true;
						break;
				}
				break;
			case "code":
				switch (mode) {
					case "edit":
						if (this.__codehtmlchanged) {
							this.__setEditHtml(this.__codehtml);
						}
						valid = true;
						break;
					case "view":
						this.__viewfrom = 'code';
						valid = true;
						break;
				}
				break;
			case "view":
				switch (mode) {
					case "code":
						if (this.__viewfrom == 'edit') {
							this.__codehtml = this.__getEditHtml();
						}
						valid = true;
						break;
					case "edit":
						if (this.__viewfrom == 'code') {
							if (this.__codehtmlchanged) {
								this.__setEditHtml(this.__codehtml);
							}
						}
						valid = true;
						break;
				}
				break;
		}

		if (!valid)
			return;

		this.__tabmode = mode;
		if (mode == "code") {
			var tcaf = this.__config.codeview_autoformat;
			if ((tcaf && tcaf != "oneline") || (tcaf == "oneline" && this.__codehtml.indexOf('\n') == -1)) {
				this.__codehtml = this.__filterForCodeView(this.__codehtml);
			}
		}
		this._broadcastEvent("TabModeChanged");
		this.__notifyUpdateUI();
	}

	this.__notifyUpdateUI = function () {
		if (this.__updateuitimerid) clearTimeout(this.__updateuitimerid);
		var core = this;

		var timeoutms = 100;
		if (this.__lasttypingeventtime && new Date().getTime() - this.__lasttypingeventtime < 500)
			timeoutms = 800;

		this.__updateuitimerid = $rte.SafeSetTimeout(function () {
			core._broadcastEvent("UpdateUI");
		}, timeoutms);
	}


	this.__getNodeFromDom = function (htmlelement, includeBody, includeDesignElement) {
		if (includeBody && htmlelement.__jsnode == this.__bodynode)
			return htmlelement.__jsnode;

		for (; htmlelement; htmlelement = htmlelement.parentNode) {
			if (!htmlelement.__jsnode)
				continue;
			if (htmlelement.__jsnode != this.__bodynode)
				return htmlelement.__jsnode;
			if (includeDesignElement)
				return htmlelement.__jsnode;
			return null;
		}
		return null;
	}

	this.__internalSplitNode = function (node, pos) {
		if (node.__parent == null || pos <= 0)
			return null;

		if (node.nodeType == 3) {
			var text = node.__text;
			if (pos >= text.length)
				return null;
			var left = new $rte.TextNode();
			left.__setText(text.substring(0, pos));
			node.__setText(text.substring(pos));
			node.__parent.__insertBefore(left, node);
			return left;
		}
		else if (node.__nodes) {
			if (pos >= node.__nodes.length)
				return null;
			var left = node._cloneNode(false);
			for (var i = 0; i < pos; i++)
				left.__appendChild(node.__nodes[0]);
			node.__parent.__insertBefore(left, node);
			return left;
		}
		else {
			//TODO:br..
			return null;
		}
	}

	this.__splitRangeForLogic = function (logicfunc, option) {
		var nodes = this.__splitRangeNodes(option);
		var newnodes = [];
		for (var i = 0; i < nodes.length; i++) {
			newnodes = newnodes.concat(logicfunc(nodes[i]) || [nodes[i]]);
		}
		if (newnodes.length == 0) {
			this.__selectAny();
			return;
		}

		if (newnodes.length > 1) {
			var ln = newnodes[0];
			var p = ln.__parent;
			var pos = p.__indexOf(ln);
			var allsame = true;
			for (var i = 1; i < newnodes.length; i++) {
				var nn = newnodes[i];
				if (nn && nn.nodeType == 1 && p.__nodes[pos + 1] == nn && nn.__codeEquals(ln)) {
					ln = nn;
					pos++;
					continue;
				}
				allsame = false;
				break;
			}
			if (allsame) {
				ln = newnodes[0];
				for (var i = 1; i < newnodes.length; i++) {
					var nn = newnodes[i];
					if (nn.nodeType == 1) {
						while (nn.__nodes.length)
							ln.__appendChild(nn.__nodes[0]);
						nn.__removeNode();
					}
					else {
						ln.__appendChild(nn);
					}
				}
				this.__setPointBefore(ln);
				this.__setRangeAfter(ln);
				return;
			}
		}

		this.__setPointBefore(newnodes[0]);
		this.__setRangeAfter(newnodes[newnodes.length - 1]);
	}

	this.__formatLogic = function (option, action) {
		var core = this;

		if (core.__getSelectionType() != "Range") {
			if (action == "query") {
				if (core.__getSelectionType() == "Point")
					return !!checkStyle(core.__getPointNode());
				return false;
			}
			return;
		}

		function checkStyle(node) {
			if (node.nodeType == 3) node = node.__parent;
			for (; node && node != this.__bodynode; node = node.__parent) {
				if (option.match(node))
					return true;
			}
		}

		function removeStyle(node) {
			if (node.nodeType != 1)
				return [node];
			if (node.__nodes) {
				var ns = node.__nodes.concat();
				for (var i = 0; i < ns.length; i++)
					removeStyle(ns[i]);
			}
			return option.clean(node)
		}

		function applyStyle(node, ns) {
			if (node.__isBlock() || node.__notSplitable()) {
				var cns = node.__nodes.concat();
				for (var i = 0; i < cns.length; i++) {
					applyStyle(cns[i], ns);
				}
			}
			else if (node.__notFormatable()) {
				ns.push(node);
			}
			else {
				ns.push(option.apply(node));
			}
		}

		if (option.queryany && action == "query") {
			var texts = core.__getRangeTextNodes();
			if (texts.length == 0)
				return;
			for (var i = 0; i < texts.length; i++)
				if (checkStyle(texts[i]))
					return true;
			return;
		}

		var addit = true;

		if (action != "apply" && action != "clean") {
			var texts = core.__getRangeTextNodes();
			if (texts.length == 0)
				return;

			var allget = true;
			for (var i = 0; i < texts.length; i++) {
				if (!checkStyle(texts[i])) {
					allget = false;
					break;
				}
			}
			if (action == "query")
				return allget;

			addit = !allget;
		}
		else {
			if (action == "apply")
				addit = true;
			if (action == "clean")
				addit = false;
		}

		var hce = core.__config.__hascontenteditable;

		function processLogic(node) {
			if (hce && node.__checkNotEditable())
				return [node];

			while (true) {
				var p = node.__parent;
				if (p && p.__nodes.length == 1) {
					node = p;
					continue;
				}
				break;
			}

			var nodes = removeStyle(node);
			if (!addit)
				return nodes;
			var ns = [];
			for (var i = 0; i < nodes.length; i++)
				applyStyle(nodes[i], ns);
			return ns;
		}

		this.__splitRangeForLogic(processLogic, option);
	}

	this.__removeFormat = function () {
		var core = this;

		if (core.__getSelectionType() != "Range")
			return;

		function shallremovethistag(node) {
			if (/^(strong|strike|b|i|u|q|em|font|small|sub|sup|ins|del)$/.test(node.__namelower))
				return true;
		}
		function shallremoveattribute(attrlower, node) {
			if (/^(class|lang)$/.test(attrlower))
				return true;
		}
		function shallremovethisstyle(stylelower, node) {
			if (/^\s*(top|left|width|height|position)/.test(stylelower))
				return false;

			return true; //default , remove

			//			if(/^\s*(mso|font|text|background|border)/.test(stylelower))
			//				return true;
			//			if(/(-align)\s*$/.test(stylelower))
			//				return true;
			//			if(/^\s*(color|line-height|word-spacing)\s*$/.test(stylelower))
			//				return true;
		}

		var hce = core.__config.__hascontenteditable;

		function removeStyle(node) {
			if (node.nodeType != 1)
				return [node];

			if (hce && node.__checkNotEditable())
				return [node];

			if (node.__nodes) {
				var ns = node.__nodes.concat();
				for (var i = 0; i < ns.length; i++)
					removeStyle(ns[i]);
			}
			if (shallremovethistag(node)) {
				var ns = node.__nodes.concat();
				node.__removeNode(false);
				return ns;
			}

			var ns = node.__getAttributeNames();
			for (var i = 0; i < ns.length; i++) {
				if (shallremoveattribute(ns[i].toLowerCase(), node)) {
					node.__removeAttribute(ns[i]);
				}
			}

			var strstyle = node.__getAttribute("style");
			if (strstyle) {
				var removed = false;
				var pairs = strstyle.split(';');
				for (var i = 0; i < pairs.length; i++) {
					var pair = pairs[i];
					var pos = pair.indexOf(':');
					if (pos == -1 || shallremovethisstyle(pair.substring(0, pos).toLowerCase(), node)) {
						pairs.splice(i, 1);
						removed = true;
						i--;
					}
				}
				if (removed) {
					if (pairs.length == 0)
						node.__removeAttribute("style");
					else
						node.__setAttribute("style", pairs.join(";") || null);
				}
			}
			if (node.__attrs.length == 0 && !node.__isBlock() && !node.IsControl()) {
				var ns = node.__nodes.concat();
				node.__removeNode(false);
				return ns;
			}
			return [node];
		}

		this.__splitRangeForLogic(removeStyle);
	}

	this.__changeCase = function (ucase) {
		var core = this;

		if (core.__getSelectionType() != "Range")
			return;

		function changenodecase(node) {
			if (node.nodeType == 3) {
				var txt = node.__text;
				if (ucase)
					txt = txt.toUpperCase();
				else
					txt = txt.toLowerCase();
				node.__setText(txt);
			}
			else if (node.__nodes) {
				var ns = node.__nodes.concat();
				for (var i = 0; i < ns.length; i++)
					changenodecase(ns[i]);
			}
		}

		var option = {}
		option.cansplitfunction = function (node) {
			return false;
		};
		this.__splitRangeForLogic(changenodecase, option);
	}

	this.FormatFindData = function (node, list) {
		this.__setPointInside(node, 0);
		var d = this.__formatGetCurrent();
		if (!d) return;
		for (var i = list.length - 1; i >= 0; i--) {
			var c = this.__formatCompare(d, list[i]);
			if (c == 0)
				return;
		}
		return d;
	}
	this.FormatApplyData = function (data) {
		this.__formatApplyData(data);
	}
	this.LoadHistoryStyles = function () {
		return this.__loadStyleHistoryItems();
	}
	this.__loadStyleHistoryItems = function () {
		var arr = [];
		if (!this.SupportLocalData())
			return arr;
		var count = parseInt(this.GetLocalData("StyleItem", "Count")) || 0;
		for (var i = 0; i < count; i++) {
			var express = this.GetLocalData("StyleItem" + i, "Value");
			if (!express) continue;
			var func = new Function("", "return " + express);
			try {
				var data = func();
				arr.push(data);
			}
			catch (x) {
			}
		}
		return arr;
	}
	this.__saveStyleHistoryItem = function (data) {
		if (!data)
			return;

		if (!this.SupportLocalData())
			return;

		if (data.cssclass || data.name)
			return;

		var str = ["{"];
		for (var p in data) {
			var v = data[p];
			if (!v)
				continue;
			str.push('"' + p + '":');
			if (typeof (v) == "string")
				str.push('"' + v + '"');
			else if (typeof (v) == "number")
				str.push(v);
			else if (typeof (v) == "boolean")
				str.push(v ? "true" : "fasle");
			else
				str.push("''");
			str.push(",");
		}
		if (str.length > 1)
			str.length = str.length - 1;
		str.push("}");
		var value = str.join("");

		var arr = [];
		arr.push(value);

		var count = parseInt(this.GetLocalData("StyleItem", "Count")) || 0;
		for (var i = 0; i < count; i++) {
			var express = this.GetLocalData("StyleItem" + i, "Value");
			if (express && express != value)
				arr.push(express);
		}

		this.SetLocalData("StyleItem", "Count", arr.length);
		for (var i = 0; i < arr.length; i++) {
			this.SetLocalData("StyleItem" + i, "Value", arr[i]);
		}
	}

	this.__formatCompare = function (d1, d2) {
		if (!d1 || !d2)
			return 0;//invalid
		for (var p in d1) {
			var v1 = d1[p];
			var v2 = d2[p];
			if (v1 == v2)
				continue;
			return 1;
		}
		for (var p in d2) {
			var v1 = d1[p];
			var v2 = d2[p];
			if (v1 == v2)
				continue;
			return -1;
		}
		return 0;
	}
	this.__formatGetCurrent = function () {
		var d = {};

		var list = this.__config.format_painter_list.split(',');

		for (var i = 0; i < list.length; i++) {
			var n = list[i];
			switch (n) {
				case "subscript":
				case "superscript":
				case "bold":
				case "italic":
				case "underline":
				case "linethrough":
				case "overline":
				case "mark":
					d[n] = this.QueryCommand(n);
					break;
				case "forecolor":
				case "backcolor":
				case "fontsize":
				case "fontname":
				case "cssclass":
				case "cssstyle":
					d[n] = this.QueryStyle(n);
					break;
			}
		}

		var count = 0;
		for (var n in d) {
			if (d[n])
				count++;
		}
		if (count == 0)
			d = null;
		return d;
	}
	this.__formatApplyData = function (d) {
		if (!d) return;

		this.__saveStyleHistoryItem(d);

		if (this.__config.format_painter_preclear) {
			this.ExecCommand("removeformat");
		}

		for (var n in d) {
			if (!d[n])
				continue;
			switch (n) {
				case "subscript":
				case "superscript":
				case "bold":
				case "italic":
				case "underline":
				case "linethrough":
				case "overline":
				case "mark":
					this.ExecCommand(n);
					break;
				case "forecolor":
				case "backcolor":
				case "fontsize":
				case "fontname":
				case "cssclass":
				case "cssstyle":
					this.ExecCommand(n, d[n]);
					break;
			}
		}
	}

	this.__formatPainterFetch = function () {
		this.__formatpaintdata = this.__formatGetCurrent();
		this.__saveStyleHistoryItem(this.__formatpaintdata);
	}
	this.__formatPainterApply = function () {
		this.__formatApplyData(this.__formatpaintdata);
	}
	this.__formatPainterHasData = function () {
		return !!this.__formatpaintdata;
	}
	this.__formatPainterClear = function () {
		this.__formatpaintdata = null;
	}




	function __core_initEvents(core, detach) {
		if (detach)
			core._broadcastEvent("UninitEvent");
		else
			core._broadcastEvent("InitEvent");

		var designmode = core.__designmode && !jsml.msieall;

		var domeventfiretime;
		var domeventinfo;

		var IE9BRBUG = jsml.msie9;
		var ie9brbugdown = false;
		var mousedowntime = 0;
		var downonbottomhtml = null;

		var browsersupportoncutcopypaste = jsml.chrome || jsml.safari;

		function CreateEvent(e) {
			if (!e) e = core.__win.event;
			var obj = new new Function();

			for (var p in e)
				obj[p] = e[p];
			if (!obj.srcElement)
				obj.srcElement = obj.target;
			if (!obj.target)
				obj.target = obj.srcElement;
			if (obj.srcElement && obj.srcElement.nodeType == 3)
				obj.srcElement = obj.srcElement.parentNode;

			obj.Cancel = function () {
				try {
					if (e.stopPropagation) e.stopPropagation();
					if (e.preventDefault) e.preventDefault();
					e.cancelBubble = true;
					e.returnValue = false;
				}
				catch (x) {
					//document.title=x.message;
					//IE sometime throws err?
				}
				//core.__trace("on" + obj.type+" cancel", "domevent", obj);
				return false;
			};

			switch (obj.type) {
				case "mousedown":
					break;
				case "selectstart":
				case "selectionchange":
					break;
			}

			domeventfiretime = new Date().getTime();
			domeventinfo = obj;

			//TRACE : 

			var tracemsg = "on" + obj.type;
			switch (obj.type) {
				case "mousedown":
				case "mouseup":
				case "click":
					if (obj.srcElement && obj.srcElement.nodeName) {
						tracemsg += " : " + obj.srcElement.nodeName.toLowerCase();
						if (obj.srcElement.__jsnode) {
							tracemsg += " - " + obj.srcElement.__jsnode;
						}
					}
					break;
				case "keydown":
				case "keyup":
					tracemsg += " : " + obj.keyCode;
					break;
				case "keypress":
					tracemsg += " : " + obj.keyCode + "," + String.fromCharCode(obj.keyCode) + "," + obj.charCode;
					break;
				case "selectstart":
				case "selectionchange":
					break;
			}

			//core.__trace(tracemsg, "domevent", obj);

			return obj;
		}

		function TryResetPoint() {
			if (core.__getSelectionType() != "Point")
				return;
			var node = core.__getPointNode();
			if (node.__nodes && node.__nodes.length == 0) {
				core.__setPointInside(node, 0);
				core.__rangeSyncToDom();
				return true;
			}
		}
		function FixLeftRightArrow(toright, wordmode) {
			if (core.__getSelectionType() != "Point")
				return;
			var node = core.__getPointNode();
			if (node.__istypingnode && !node.__hasvalue) {
				var p = node.__parent;
				var pi = p.__indexOf(node);
				core.__setPointInside(p, pi + (toright ? 1 : 0), true);
				core.__rangeSyncToDom(true);
				$rte.SafeSetTimeout(function () {
					core.__rangeSyncFromDom();
				}, 1);
			}
		}

		function FindInnerTD(np, reverse) {
			if (np.__namelower == "td" || np.__namelower == "th")
				return np;
			if (!np.__nodes)
				return;
			if (reverse) {
				for (var i = np.__nodes.length - 1; i >= 0; i--) {
					var next = FindInnerTD(np.__nodes[i], true);
					if (next)
						return next;
				}
			}
			else {
				for (var i = 0; i < np.__nodes.length; i++) {
					var next = FindInnerTD(np.__nodes[i]);
					if (next)
						return next;
				}
			}
		}
		function FindPrevTD(td) {
			var p = td.__parent;
			var next = p.__nodes[p.__indexOf(td) - 1];
			if (next)
				return next;
			for (var pp = p.__parent; p.__namelower != "table" && p.__namelower != "body"; p = pp) {
				var pi = pp.__indexOf(p);
				for (; true; pi--) {
					var np = pp.__nodes[pi - 1];
					if (!np)
						break;
					next = FindInnerTD(np, true);
					if (next)
						return next;
				}
			}
		}
		function FindNextTD(td) {
			var p = td.__parent;
			var next = p.__nodes[p.__indexOf(td) + 1];
			if (next)
				return next;
			for (var pp = p.__parent; p.__namelower != "table" && p.__namelower != "body"; p = pp) {
				var pi = pp.__indexOf(p);
				for (; true; pi++) {
					var np = pp.__nodes[pi + 1];
					if (!np)
						break;
					next = FindInnerTD(np);
					if (next)
						return next;
				}
			}
		}


		function BuildEventHandler(obj, name, func) {
			if (jsml.msieall || !designmode) {
				obj["on" + name] = detach ? null : func;
				return;
			}

			if (detach) {
				obj.removeEventListener(name, obj["_on_" + name], false);
			}
			else {
				obj["_on_" + name] = func;
				obj.addEventListener(name, func, false);
			}
		}

		BuildEventHandler(core.__win, "error", function (a, b, c) {
			//alert(["frameerror",a,b,c]);
			core.__trace("frameerror : " + [a, b, c], "frameerror");
			return true;
		});

		BuildEventHandler(core.__win, "resize", function (a, b, c) {
			//alert(["frameerror",a,b,c]);
			core.__onframeresize();
			return true;
		});

		BuildEventHandler(core.__win.document, "scroll", function () {
			var doc = core.__win.document;
			core.__hiddenfloatdiv.style.top = Math.max(doc.body.scrollTop, doc.documentElement.scrollTop) + "px";
		});

		function StartMoveLayer(devent, node) {
			var _x = devent.clientX;
			var _y = devent.clientY;

			var hct = parseInt(node.GetStyle("top")) || 0;
			var hcl = parseInt(node.GetStyle("left")) || 0;

			function update_position(moveevent) {
				var fp = jsml.get_scrollposition(core._config.skin_frame);

				var x = moveevent.clientX - fp.left;
				var y = moveevent.clientY - fp.top;

				var newt = hct + y - _y;
				var newl = hcl + x - _x;
				node.SetStyle("top", newt + "px");
				node.SetStyle("left", newl + "px");
			}

			jsml.startcapture(update_position, null, "move");
		}

		BuildEventHandler(core.__win.document, "dragstart", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly || !core.__config.enabledragdrop)
				return e.Cancel();

			core.__rangeSyncFromDom();

			//IE layer
			if (jsml.msieall && e.srcElement.style.position == 'absolute') {
				var node = core.__getNodeFromDom(e.srcElement);
				if (node.__getStyle("position") == 'absolute') {
					StartMoveLayer(e, node);
					return e.Cancel();
				}
			}

			if (core.__getSelectionType() == "Control")
				return e.Cancel();

			if (core.__getSelectionType() == "Range") {
				var td1 = core.__getPointNode().__findParent("td", "th");
				var td2 = core.__getRangeNode().__findParent("td", "th");
				if (td1 != td2) {
					return e.Cancel();
				}
			}

			core.__handleDragStart(e);
		});

		BuildEventHandler(core.__win.document, "dragend", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly || !core.__config.enabledragdrop)
				return e.Cancel();

			core.__handleDragEnd(e);
		});


		BuildEventHandler(core.__win.document.documentElement, "dragover", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly || !core.__config.enabledragdrop) {
				e.dataTransfer.dropEffect = "none";
				e.dataTransfer.effectAllowed = "none";
				return e.Cancel();
			}
			core.__handleDragOver(e);
		});

		BuildEventHandler(core.__win.document.documentElement, "drop", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly || !core.__config.enabledragdrop)
				return e.Cancel();

			core.__handleDrop(e);
		});

		BuildEventHandler(core.__win.document, "mousemove", function (e) {
			core.__changingSelection = 0;
			e = CreateEvent(e);

			if (core.__draghandler) {
				var onmousemove = core.__draghandler.onmousemove;
				if (onmousemove) onmousemove.apply(core, [e]);
			}

			if (core.__onmoveDragControl(e))
				return;
		});
		BuildEventHandler(core.__win.document, "mouseover", function (e) {
			core.__changingSelection = 0;
			e = CreateEvent(e);

		});
		BuildEventHandler(core.__win.document, "mouseout", function (e) {
			core.__changingSelection = 0;
			e = CreateEvent(e);

			//var n=core.__getNodeFromDom(e.srcElement);
			//if(n&&n.nodeType==3)n.__setRuntimeAttribute("style",null,"event-mouseover");
		});



		BuildEventHandler(core.__win.document, "mousedown", function (e) {

			if (jsml._currentfloatbox)
				jsml._currentfloatbox._onouterclick();

			core.mousedowncount = 1 + (core.mousedowncount || 0);

			core.__changingSelection = 0;
			e = CreateEvent(e);

			core.__cancelDragControl();

			if (core.__draghandler) {
				var oncancel = core.__draghandler.oncancel;
				core.__draghandler = null;
				if (oncancel) oncancel.apply(core, [e]);
			}

			mousedowntime = new Date().getTime();
			downonbottomhtml = null;
			ie9brbugdown = false;

			if (e.button == 2 && core.__getSelectionType() == "Range") {
				if (core.CanExecCommand("mergecells")) {
					return e.Cancel();
				}
			}

			var node = core.__getNodeFromDom(e.srcElement);

			core.__ieresizing = false;

			if (node && jsml.msieall && node.Contains(core.GetPointNode())) {
				if (e.offsetX < 0 || e.offsetY < 0 || e.offsetX > node.__viewnode.offsetWidth || e.offsetY > node.__viewnode.offsetHeight) {
					core.__ieresizing = true;
					return;
				}
			}

			if (node && node.IsControl()) {
				if (!jsml.msieall && core.GetPointNode() != node)
					core.SelectControl(node);
				//if(!jsml.bodymixmode)
				{
					core.__startDragControl(e, node);
				}
				return e.Cancel();
			}

			if (node && e.ctrlKey) {
				for (var ctrl = node; ctrl; ctrl = ctrl.__parent) {
					if (ctrl.IsControl()) {
						core.SelectControl(ctrl);
						return e.Cancel();
					}
				}
			}

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

			if (!node) {
				if (!e.srcElement || !e.srcElement.nodeName)
					return;

				var ch = 0;
				for (var n = core.__laststaticdiv; n != null; n = n.offsetParent)
					ch += n.offsetTop;
				var cy = e.clientY + core.__win.document.body.scrollTop;

				if (cy > ch) {
					var snn = e.srcElement.nodeName.toUpperCase();
					if (snn == "HTML" || snn == "BODY") {
						if (Browser_GetPointNodeOffset(core.__win).node == null) {
							core.__selectLastTextNode(true);
						}
						else {
							//let onclick handle it to allow selection
							downonbottomhtml = new Date().getTime();
							//core.__trace("mousedown - downonbottomhtml");
						}
					}
					else {
						core.__selectLastTextNode(true);
					}
					return;
				}
			}

			if (IE9BRBUG && (!node || node.__name != "#text")) {
				ie9brbugdown = true;
			}

		});

		BuildEventHandler(core.__win.document, "mouseup", function (e) {
			core.__changingSelection = 0;
			e = CreateEvent(e);

			setTimeout(function () {
				downonbottomhtml = null;
			}, 100);

			if (core.__draghandler) {
				var onmouseup = core.__draghandler.onmouseup;
				core.__draghandler = null;
				if (onmouseup) onmouseup.apply(core, [e]);
			}

			if (core.__onupDragControl(e))
				return;

			if (TryResetPoint())
				return;

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

			core.__rangeSyncFromDom(true);

			if (Browser_IsSelectingText(core.__win)) {
				$rte.SafeSetTimeout(function () {
					core.__checkRangeOrPoint();
				}, 150);//IE8 bug , need to wait about 150 second..
			}

		});


		BuildEventHandler(core.__win.document, "click", function (e) {
			core.__changingSelection = 0;
			e = CreateEvent(e);

			if (core.mousedowncount == 1)
				core.__rangeSyncFromDom(true);

			if (downonbottomhtml && core.__getSelectionType() != "Range") {
				core.__trace("click - downonbottomhtml ");

				if (core.__getSelectionType() == "Control") {
					core.__appendLastTextNode();
				}

				if (!jsml.firefox || !core.__getfocused()) {
					core.Focus();
				}

				return;
			}

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

			var srcname = e.srcElement.nodeName;
			if (srcname == "BUTTON" || srcname == "INPUT") {
				var type = e.srcElement.getAttribute("type");
				if (type == 'radio') {
					var node = core.__getNodeFromDom(e.srcElement);
					if (node) {
						e.srcElement.checked = !!node.__getAttribute("checked");
					}
				}
				return e.Cancel();
			}


		});

		//	if(core_mobile)
		//	BuildEventHandler(core.__win.document,"touchstart",function(e){
		//		e = CreateEvent(e);
		//		//alert(e.srcElement.nodeName);
		//	});
		//	
		//	if(core_mobile)
		//	BuildEventHandler(core.__win.document,"touchend",function(e){
		//		e = CreateEvent(e);
		//		
		//		core.__selectForMouse(e);
		//		
		//		//document.title=[t.clientX,":",t.clientY,len,i,p,err];
		//	});

		BuildEventHandler(core.__win.document, "selectstart", function (e) {
			e = CreateEvent(e);

			if (core.__dragcontrol) {
				return e.Cancel();
			}

			//this has a bug now.. do not check it..
			//core.__checkSyncSelection();

			//fire too many times
			//if(core.__firefoxnoselchg)core.__checkSyncSelection();
		});

		function checklasttextnode(where) {
			core.__check__textnode(core.__lastkeydowntextnode);
		}


		BuildEventHandler(core.__win.document, "selectionchange", function (e) {

			checklasttextnode("selectionchange");

			if (core.__ieresizing)
				return;

			e = CreateEvent(e);
			//core.__syncreason="event-"+e.type;

			core.__handleDragSelectionChange(e);

			if (IE9BRBUG && ie9brbugdown && new Date().getTime() - mousedowntime < 10) {
				ie9brbugdown = false;
				core.__rangeSyncFromDom(true);
				if (core.__getSelectionType() == "Point") {
					var pn = core.__getPointNode();
					var po = core.__getPointOffset();
					if (pn.nodeType != 3 && po > 0 && po - 1 < pn.__nodes.length && pn.__nodes[po - 1].__namelower == "br") {
						core.__setPointBefore(pn.__nodes[po - 1]);
						core.__resetSyncSelection();
						core.__selection.__clearSyncTimer(true);
					}
				}
				return;
			}

			if (downonbottomhtml) {
				//core.__trace("selectionchange - downonbottomhtml");
			}
			else if (jsml.msie5678) {
				$rte.SafeSetTimeout(function () {
					core.__checkSyncSelection();
				}, 100);
			}
			else {
				core.__requireSyncSelection();
			}
		});

		BuildEventHandler(core.__win, "focus", function (e) {
			var focused = core.__isfocused;
			core.__isfocused = true;
			//core.__trace("focused=true")
			e = CreateEvent(e);

			if (jsml.msieall && !focused) {
				if (new Date().getTime() - (core.__focuscalltime || 0) < 100) {
					core.__rangeSyncToDom(true);
				}
			}

			if (core.__loaded && !focused) {
				core._broadcastEvent("Focus");
			}

		});
		BuildEventHandler(core.__win, "blur", function (e) {
			var focused = core.__isfocused;
			core.__isfocused = false;
			//core.__trace("focused=false")
			e = CreateEvent(e);
			checklasttextnode('blur');

			if (core.__loaded && focused) {
				core._broadcastEvent("Blur");
			}
		});

		BuildEventHandler(core.__win.document, "contextmenu", function (e) {
			e = CreateEvent(e);

			return core.HandleContextMenu(e);

		});

		BuildEventHandler(core.__win.document, "dblclick", function (e) {

			e = CreateEvent(e);

			return core.HandleDoubleClick(e);
		});

		var charkeytimeout = 15;
		var keydowncode;
		var keydowndelaytimerid;

		function SetKeydownFunc(func) {
			if (core.__keydowndelayfunction)
				core.__keydowndelayfunction();
			core.__keydowndelayfunction = func;
			clearTimeout(keydowndelaytimerid);
			keydowndelaytimerid = $rte.SafeSetTimeout(function () {
				var func = core.__keydowndelayfunction;
				if (!func) return;
				core.__keydowndelayfunction = null;
				if (func) func();
			}, charkeytimeout);
		}

		var kepointnode;
		var kepointoffs;
		var keisnewnode;
		var keoffset;
		var last_ime_time = 0;

		function isime(e) {
			var code = e.keyCode;

			if (code == 0)
				return true;
			if (code == 229)
				return true;

			if (code && e.ctrlKey && e.altKey)
				return true;

			return false;
		}

		function GetCurrentTextNode() {
			var stype = core.__getSelectionType();

			if (stype == "Control")
				return null;

			if (stype == "Range") {
				kepointnode = core.__getPointNode();
				kepointoffs = core.__getPointOffset();
				if (kepointnode.__istypingnode && kepointnode == core.__getRangeNode() && kepointoffs == 0 && core.__getRangeOffset() == 1) {
					return kepointnode;
				}

				core.__deleteSelection();
				stype = core.__getSelectionType();
			}

			if (stype == "None") {
				core.__setPointInside(core.__bodynode, 0);
			}

			kepointnode = core.__getPointNode();
			kepointoffs = core.__getPointOffset();

			//Point now:
			keisnewnode = false;
			var node = core.__getPointNode();
			if (node.nodeType != 3) {
				keisnewnode = true;
				node = new $rte.TypingNode();
				core.__insertNode(node, true);
				//core.__trace("insert typing node #1");
			}

			keoffset = core.__getPointOffset();

			//fix the browser bug which place the <a><span> to <span><a>..
			if (node.__parent.__namelower == "a" && keoffset == node.__text.length
			   && node.__parent.__indexOf(node) + 1 == node.__parent.__nodes.length) {
				//core.__setPointAfter(node.__parent,true);
				keisnewnode = true;
				node = new $rte.TypingNode();
				core.__insertNode(node, true);
				//core.__trace("insert typing node #2");
				//core.__rangeSyncToDom(true);
				keoffset = core.__getPointOffset();
			}

			core.__setfocusedtextnode(node);
			core.__lastkeydowntexthtml = node.__viewnode.innerHTML;


			if (node.__istypingnode && !node.__hasvalue) {
				if (jsml.chrome || jsml.opera) {
					core.__startSetSelection();
					try {
						Browser_SetPointInside(core.__win, node.__viewnode, 0);
						Browser_SetRangeInside(core.__win, node.__viewnode, 1);
					}
					finally {
						core.__stopSetSelection();
					}
				}
				else {
					core.__setPointInside(node, 0);
					core.__setRangeInside(node, 1);
					core.__rangeSyncToDom(true);
				}
				core.__resetSyncSelection();
			}

			return node;
		}

		function SyncTextNode(e, node) {
			if (jsml.firefox && node.__viewnode.innerHTML.indexOf("<br>") != -1) {
				core.__startSetSelection();
				try {
					node.__viewnode.innerHTML = node.__viewnode.innerHTML.replace(/(\s?)<br>/g, e.keyCode == 32 ? "&nbsp;" : "");
					node.__syncViewToText();
				}
				finally {
					core.__stopSetSelection();
				}
				core.__setPointInside(node, node.__getMaxOffset());
				core.__rangeSyncToDom();

			}
			else if (jsml.safari34 && node.__istypingnode && !node.__hasvalue && e.keyCode != 32) {
				if (isime(e)) {
					node.__syncViewToText();
					return;
				}
				var h1 = node.__viewnode.innerHTML;
				var h2 = h1.replace(/\xA0/g, "");
				if (h1 == h2) {
					node.__syncViewToText();
					core.__scrollIntoView();
				}
				else {
					node.__viewnode.innerHTML = h2;
					core.__startSetSelection();
					try {
						node.__syncViewToText();
					}
					finally {
						core.__stopSetSelection();
					}
					core.__setPointInside(node, node.__getMaxOffset());
					core.__rangeSyncToDom();

				}
			}
			else if (node.__syncViewToText()) {
				//OK
			}
			else if (keoffset == 0)//IE bug
			{
				core.__rangeSyncFromDom();
				var anothernode = core.__getPointNode();
				if (anothernode.nodeType == 3) {
					node = anothernode
					node.__syncViewToText();
				}
			}

			core.__scrollIntoView();

			if (keisnewnode && !node.__hasvalue) {
				node.__removeNode(true);
				core.__setPointInside(kepointnode, kepointoffs);
				core.__rangeSyncToDom();
				return;
			}
			else if (node.__istypingnode && !node.__hasvalue) {
				core.__setPointInside(kepointnode, kepointoffs);
				core.__rangeSyncToDom();
				return;
			}

			//core.__checkSyncSelection();
			core.__resetSyncSelection();
			core.__rangeSyncFromDom();

			var pl = core.__pointLogics;
			if (!pl) return;

			var newnode = core.__getPointNode();
			if (node != newnode) return;
			var offset2 = core.__getPointOffset();
			if (keoffset >= offset2) return;
			core.__setPointInside(node, keoffset);
			core.__setRangeInside(node, offset2);
			for (var cmd in pl) {
				var arr = pl[cmd]
				core.ExecFormatLogic(arr[0], arr[1], arr[2], arr[3]);
			}
			core.__collapseRange(false);
		}

		var keycharmode = "newmode";
		//if(jsml.firefox)
		//	keycharmode="keydown";
		var processinkeypress = false;

		function HandleCharPress(e) {
			if (jsml.bodymixmodetyping)
				return core.__mixSyncCheck(e);

			if (!processinkeypress)
				return;
			if (keycharmode == "keydown")
				return;

			if (keycharmode != "newmode")
				return HandleCharDown(e);

			if (new Date().getTime() - last_ime_time < 100)
				return HandleCharDown(e);

			var charcode = e.charCode;
			if (charcode == null) {
				//IE678?
				charcode = e.keyCode;
			}
			if (!charcode) {
				return HandleCharDown(e);
			}



			e.Cancel();

			var node = GetCurrentTextNode();
			if (!node)
				return;

			node.__keydownactived = null;

			if (node.__checkNotEditable())
				return;

			var t = node.GetText();

			node.__sethasvalue();

			var left = t.substring(0, keoffset);

			//not so nessasary, but helpful.
			left = left.replace(/(\S)\xA0$/, '$1 ')

			var islastposoflink = false;

			if (keoffset >= t.length && node.__parent.__namelower == "a") {
				newnode = new $rte.TextNode();
				newnode.__setText(String.fromCharCode(charcode));
				node.__parent.__parent.__insertAfter(newnode, node.__parent);
				if (node.__text.length == 0) node.__removeNode(true);
				core.__setPointInside(newnode, newnode.__text.length);
				core.__rangeSyncToDom(true);
				return;
			}

			if (charcode == 32) {
				var re = /https?\:\/\/[a-z0-9\/\\\.\-\?\&\$\%\^\(\)\_\+\=\;\,]+$/i;
				if (re.test(left)) {
					var url;
					var rest = left.replace(re, function (a, b, c) {
						url = a;
						return "";
					});
					if (url) {
						if (rest) {
							var newtext = new $rte.TextNode();
							newtext.SetText(rest);
							node.__parent.__insertBefore(newtext, node);
						}
						var newlink = new $rte.LinkElement("a");
						newlink.SetInnerText(url);
						newlink.SetAttribute("href", url);
						node.__parent.__insertBefore(newlink, node);
						node.__setText(String.fromCharCode(charcode) + t.substring(keoffset));
						core.__setPointInside(node, 1);
						core.__rangeSyncToDom(true);
						return;
					}
				}
			}

			node.__setText(left + String.fromCharCode(charcode) + t.substring(keoffset));
			core.__setPointInside(node, Math.min(t.length + 1, keoffset + 1));
			core.__rangeSyncToDom(true);
		}

		function HandleCharDown(e) {
			charkeytimeout = isime(e) ? 500 : 15;

			processinkeypress = false;

			if (jsml.bodymixmodetyping) {
				SetKeydownFunc(function () {
					core.__mixSyncContent();
				});

				return core.__mixSyncCheck(e);
			}

			//always active the current node;
			var node = GetCurrentTextNode();
			if (!node)
				return e.Cancel();

			if (isime(e)) {
				last_ime_time = new Date().getTime();
			}
			else if (e.type == "keydown" && keycharmode != "keydown") {
				//active the node , and let keypress handle it.
				processinkeypress = true;
				return;
			}

			node.__keydownactived = 1;

			SetKeydownFunc(function () {
				node.__keydownactived = null;
				SyncTextNode(e, node);
			});

		}

		var keydownmap = {}

		BuildEventHandler(core.__win.document, "keyup", function (e) {

			core.__changingSelection = 0;

			e = CreateEvent(e);

			delete keydownmap[e.keyCode];

			if (e.keyCode == 17) {
				core.__onctrlDragControl(e);
			}

			if (TryResetPoint())
				return;

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

		});

		BuildEventHandler(core.__win.document, "keypress", function (e) {

			core.__changingSelection = 0;
			e = CreateEvent(e);

			if (core.__acceptingPaste)
				return;

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

			if (core.__config.readonly)
				return e.Cancel();

			if (e.ctrlKey)	//||e.altKey , Norwegian keyboard ALT+KEY
				return;	//don't cancel.

			HandleCharPress(e);

		});

		BuildEventHandler(core.__win.document, "keydown", function (e) {

			core.__changingSelection = 0;
			e = CreateEvent(e);

			keydownmap[e.keyCode] = true;

			if (e.keyCode == 27) {
				if (jsml._currentfloatbox) {
					jsml._currentfloatbox._onouterclick();
					return e.Cancel();
				}

				if (core.__cancelDragControl()) {
					return e.Cancel();
				}

				if (core.__draghandler) {
					var oncancel = core.__draghandler.oncancel;
					core.__draghandler = null;
					if (oncancel) oncancel.apply(core, [e]);
				}
			}

			if (e.keyCode == 17) {
				core.__onctrlDragControl(e);
			}

			if (core.__keydowndelayfunction)
				core.__keydowndelayfunction();
			core.__keydowndelayfunction = null;

			if (core.__firefoxnoselchg) core.__checkSyncSelection();

			keydowncode = e.keyCode;

			if (e.keyCode == core.__config.event_fullscreenkeycode) {
				core.ExecUICommand(null, "FullScreen");
				return e.Cancel();
			}

			switch (e.keyCode) {
				case 3:
					//BREAK
					break;
				case 8:
					//BACKSPACE
					if (core.__config.readonly) return e.Cancel();
					e.Cancel();
					core.__deleteToLeft(e.ctrlKey);
					core.__rangeSyncToDom();
					core.__scrollIntoView();
					return false;
				case 9:
					//TAB
					var tkt = e.shiftKey ? core.__config.tabkeyprevelement : core.__config.tabkeynextelement
					if (tkt) {
						var tkt = document.getElementById(tkt);
						if (tkt) {
							tkt.focus();
							return e.Cancel();
						}
					}
					if (core.__config.readonly) return e.Cancel();
					e.Cancel();
					if (!core.__verifySelectionType("Point", "Range"))
						return false;
					var td;
					if (!core.__config.tabtonextcell || !(td = core.IsIncludedByTag("td", "th"))) {
						core.__insertHtmlCode(core.__config.tabkeyhtml);
						return false;
					}
					var next = e.shiftKey ? FindPrevTD(td) : FindNextTD(td);
					if (next) {
						core.__setPointInside(next, 0);
						if (core.__config.tabtonextcell == "select")
							core.__setRangeInside(next, next.__getMaxOffset());
						return false;
					}
					for (next = td; next; next = next.__parent) {
						if (next.__namelower != "table")
							continue;
						if (e.shiftKey)
							core.__setPointBefore(next);
						else
							core.__setPointAfter(next);
						return false;
					}
					return false;
				case 13:
					//ENTER
					if (core.__config.readonly) return e.Cancel();
					e.Cancel();
					core.__handleEnter(e.shiftKey ? core.__config.shiftenterkeytag : core.__config.enterkeytag);
					return false;
				case 16:
					//SHIFT
					return true;
				case 17:
					//CTRL
					return true;
				case 18:
					//ALT
					return true;
				case 19:
					//PAUSE
					break;
				case 20:
					//CAPS LOCK
					return true;
				case 27:
					//ESC
					if (core._isfullscreen)
						core.ExecUICommand(null, "FullScreen");
					return true;
				case 33:
					//PAGE UP
					return true;
				case 34:
					//PAGE DOWN
					return true;
				case 35:
					//END
					return true;
				case 36:
					//HOME
					return true;
				case 37:
					//LEFT ARROW
					if (core.__config.readonly) return e.Cancel();
					core.__checkSyncSelection();
					if (e.altKey) {
						core.__execTableCommand("insertcolumnleft");
						e.Cancel()
						return false;
					}
					FixLeftRightArrow(false, e.ctrlKey);
					return true;
				case 38:
					//UP ARROW
					if (core.__config.readonly) return e.Cancel();
					core.__checkSyncSelection();
					if (e.ctrlKey || e.altKey) {
						if (core.__execTableCommand("insertrowtop", "queryenable"))
							core.__execTableCommand("insertrowtop");
						else
							core.__insertBodyTopLine();
						e.Cancel()
						return false;
					}
					FixLeftRightArrow();
					return true;
				case 39:
					//RIGHT ARROW
					if (core.__config.readonly) return e.Cancel();
					core.__checkSyncSelection();
					if (e.altKey) {
						core.__execTableCommand("insertcolumnright");
						e.Cancel()
						return false;
					}
					FixLeftRightArrow(true, e.ctrlKey);
					return true;
				case 40:
					//DOWN ARROW
					if (core.__config.readonly) return e.Cancel();
					core.__checkSyncSelection();
					if (e.ctrlKey || e.altKey) {
						if (core.__execTableCommand("insertrowbottom", "queryenable"))
							core.__execTableCommand("insertrowbottom");
						else
							core.__insertBodyBottomLine();
						e.Cancel()
						return false;
					}
					return true;
				case 45:
					//INSERT
					break;
				case 46:
					//DELETE
					if (core.__config.readonly) return e.Cancel();
					e.Cancel();
					core.__deleteToRight(e.ctrlKey);
					core.__rangeSyncToDom();
					core.__scrollIntoView();
					return false;
				case 112:
				case 113:
				case 114:
				case 115:
				case 116:
				case 117:
				case 118:
				case 119:
				case 120:
				case 121:
				case 122:
				case 123:
					//F1-F12

					//				if(e.keyCode==116)	//F5, let the page refresh.
					//					return true;
					//				if(e.keyCode==122)	//F11 FullScreen
					//					return true;

					return true;
				case 91:
					//WINDOWS KEY
					return true;
				case 224:		//mac key?
					return true;
			}

			if (e.ctrlKey || keydownmap[224]) {
				//CTRL+CHARKEY
				switch (e.keyCode) {
					case 65:
						e.Cancel();
						core.ExecCommand("SelectAll");
						return;
					case 66://B , BOLD
						if (core.__config.readonly) return e.Cancel();
						e.Cancel();
						core.ExecCommand("Bold");
						return;
					case 73://I , Italic
						if (core.__config.readonly) return e.Cancel();
						e.Cancel();
						core.ExecCommand("Italic");
						return;
					case 85://U , Underline
						if (core.__config.readonly) return e.Cancel();
						e.Cancel();
						core.ExecCommand("Underline");
						return;
					case 86://V , PASTE
						if (core.__config.readonly || core.__config.paste_default_command == "disabled")
							return e.Cancel();
						if (!browsersupportoncutcopypaste) {
							if (core._broadcastEvent("PrePaste") === false)
								return e.Cancel();
							core.__handlePaste(e);
						}
						return;
					case 67://C , Copy
						if (core.__config.readonly) return e.Cancel();
						if (!core.__verifySelectionType("Range", "Control")) return e.Cancel();
						if (!browsersupportoncutcopypaste) {
							if (core._broadcastEvent("PreCopy") === false)
								return e.Cancel();
							core.__handleCopy(e);
						}
						return;
					case 88://X , Cut
						if (core.__config.readonly) return e.Cancel();
						if (!core.__verifySelectionType("Range", "Control")) return e.Cancel();
						if (!browsersupportoncutcopypaste) {
							if (core._broadcastEvent("PreCut") === false)
								return e.Cancel();
							core.__handleCut(e);
						}
						return;
					case 89://Y, Redo
						if (core.__config.readonly) return e.Cancel();
						e.Cancel();
						core.ExecCommand("Redo");
						return;
					case 90://Z, Undo
						if (core.__config.readonly) return e.Cancel();
						e.Cancel();
						core.ExecCommand("Undo");
						return;
				}

				if (e.altKey) {
					//do not cancel it for ALTGR
				}
				else {
					e.Cancel();
					return;
				}
			}

			if (core.__config.readonly)
				return e.Cancel();

			core.__lasttypingeventtime = new Date().getTime();

			HandleCharDown(e);

		});

		BuildEventHandler(core.__win.document, "paste", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly || core.__config.paste_default_command == "disabled")
				return e.Cancel();

			if (core._broadcastEvent("PrePaste") === false)
				return e.Cancel();
			core.__handlePaste(e);
		});
		BuildEventHandler(core.__win.document, "cut", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly) return e.Cancel();
			if (!core.__verifySelectionType("Range", "Control")) return e.Cancel();

			if (core._broadcastEvent("PreCut") === false)
				return e.Cancel();
			core.__handleCut(e);
		});
		BuildEventHandler(core.__win.document, "copy", function (e) {
			e = CreateEvent(e);

			if (core.__config.readonly) return e.Cancel();
			if (!core.__verifySelectionType("Range", "Control")) return e.Cancel();

			if (core._broadcastEvent("PreCopy") === false)
				return e.Cancel();
			core.__handleCopy(e);
		});
	}



	this.__checkRangeOrPoint = function () {
		if (this.__verifySelectionType("Range")) {
			if (Browser_GetRangeNodeOffset(this.__win).node == null) {
				this.__rangeSyncFromDom();
			}
		}
	}


	this.__resetSyncSelection = function () {
		this.__syncSelectionTime = new Date().getTime();
		clearTimeout(this.__syncSelectionTimerId);
	}
	this.__requireSyncSelection = function () {
		this.__resetSyncSelection();
		if (this.__changingSelection) return;

		//if the selection is changed by code , just ignore it.
		if (new Date().getTime() - 88 < this.__lastselectiontime || 0) return;

		if (this.__getfocused()) {
			this.__rangeSyncFromDom(true);

			if (jsml.firefox) {
				this.__check__textnode(this.__lastkeydowntextnode);
			}

			return;
		}

		this.__syncSelectionTime = new Date().getTime();
		this.__syncSelectionTimerId = $rte.SafeSetTimeout(this.delegate(this.__handleSyncSelection), 10);
	}
	this.__checkSyncSelection = function (onlyfor) {
		this.__mixSyncCheck();

		if (onlyfor == "Range") {
			if (!Browser_SelectionIsRange(this.__win))
				return;
		}

		$rte.SafeSetTimeout(this.delegate(function () {
			if (!this.__syncSelectionTime || new Date().getTime() - this.__syncSelectionTime > 20) {

				try {
					this.__requireSyncSelection();
				}
				catch (x) {
					this.__saveAndReload();
					//TODO:IE8 issue , better message
					//alert(x.message);
				}
			}
		}), 1);
	}
	this.__handleSyncSelection = function () {
		//this.__trace("__handleSyncSelection");
		this.__rangeSyncFromDom(true);
	}
	this.__startSetSelection = function () {
		this.__resetSyncSelection();
		this.__changingSelection = (this.__changingSelection || 0) + 1;
	}
	this.__stopSetSelection = function () {
		this.__changingSelection--;
		this.__lastselectiontime = new Date().getTime();
		this.__resetSyncSelection();
		this.__selection.__clearSyncTimer();
	}

	this.__reinitSelection = function () {
		//this.__selectLastTextNode();
		this.__setPointInside(this.__bodynode, 0);
		this.__rangeSyncToDom();
	}

	this.__selectAny = function (synctodom) {
		this.__selectLastTextNode(synctodom);
	}


	this.__selectLastTextNode = function (synctodom, nosub, tolast) {
		if (this.__config.readonly)
			return;
		var core = this;
		function getLastTextNode(node, level) {
			if (node.nodeType == 3)
				return node;
			if (nosub && level)
				return null;
			if (!node.__nodes)
				return null;
			var len = node.__nodes.length;
			if (len == 0)
				return null;
			var p = node.__nodes[len - 1];
			if (p.__nodes && !p.__nodes.length) {
				var tn = new $rte.TypingNode();
				p.__appendChild(tn);
				//core.__trace("insert typing node s#1");
				return tn;
			}
			return getLastTextNode(p, 1 + (level || 0));
		}
		var last = getLastTextNode(this.__bodynode);
		if (last != null && last.__text != " ") {
			if (tolast || this.__getPointNode() != last)
				this.__setPointInside(last, last.__text.length);
			if (synctodom) this.__rangeSyncToDom(true);
		}
		else {
			var tn = new $rte.TypingNode();
			this.__bodynode.__appendChild(tn);
			//core.__trace("insert typing node s#2");
			this.__setPointInside(tn, 0);
			if (synctodom) this.__rangeSyncToDom(true);
			last = tn;
		}

		this.__setfocusedtextnode(last);

		if (last.__istypingnode && !last.__hasvalue) {
			last.__setVisible();
		}
	}

	this.__appendLastTextNode = function () {
		var tn = new $rte.TypingNode();
		this.__bodynode.__appendChild(tn);
		this.__setPointInside(tn, 0);
		this.__rangeSyncToDom(true);
		this.__setfocusedtextnode(tn);
		//this.__trace("append typing node");
	}

	this.__setfocusedtextnode = function (node) {
		this.__check__textnode(this.__lastkeydowntextnode);
		this.__lastkeydowntextnode = node;
	}
	this.__check__textnode = function (tn) {
		if (!tn) return;
		if (!tn.__core) return;
		if (!tn.__viewnode) return;

		var core = this;

		if (core.__keydowndelayfunction && tn.__viewnode.innerHTML != core.__lastkeydowntexthtml) {
			core.__keydowndelayfunction();
			core.__keydowndelayfunction = null;
		}

		if (tn.__keydownactived) {
			tn.__syncViewToText();
		}

		if (!tn.__istypingnode)
			return;

		if (tn.__hasvalue)
			return;

		if (!jsml.msieall && !jsml.firefox)
			return;

		setTimeout(function () {
			if (core.__getPointNode() != tn) {
				tn.__setHidden();
			}
		}, 100);

	}

	//	this.__selectBodyEnd=function()
	//	{
	//		this.__selection=new $rte.Selection(this,"Point",this.__bodynode,this.__bodynode.__nodes.length);
	//	}



	this.__verifySelectionType = function () {
		var t = this.__getSelectionType();
		for (var i = 0; i < arguments.length; i++)
			if (t == arguments[i])
				return true;
		return false;
	}
	this.__getSelectionType = function () {
		if (this.__version != this.__selection.__version) {
			if (!this.__selection.__tryRestore())
				return "None";
		}
		return this.__selection.__type;
	}
	this.__getPointNode = function () {
		if (this.__version != this.__selection.__version) {
			if (!this.__selection.__tryRestore())
				return null;
		}
		return this.__selection.__pointnode;
	}
	this.__getPointOffset = function () {
		if (this.__version != this.__selection.__version) {
			if (!this.__selection.__tryRestore())
				return 0;
		}
		return this.__selection.__pointoffset;
	}
	this.__getRangeNode = function () {
		if (this.__version != this.__selection.__version) {
			if (!this.__selection.__tryRestore())
				return null;
		}
		return this.__selection.__rangenode;
	}
	this.__getRangeOffset = function () {
		if (this.__version != this.__selection.__version) {
			if (!this.__selection.__tryRestore())
				return 0;
		}
		return this.__selection.__rangeoffset;
	}

	this.__selectNone = function () {
		this.__selection = new $rte.Selection(this, "None", null, 0, null, 0);
		this.__rangeSyncToDom(true);
	}
	this.__selectControl = function (ctrl) {
		if (ctrl == null) throw (new Error("argument is null"));
		if (ctrl.__core == null) throw (new Error("argument node is detached"));

		this.__selection = new $rte.Selection(this, "Control", ctrl, 0, null, 0);
		this.__rangeSyncToDom(true);
	}
	this.__setPointInside = function (node, offset, stopenterchild) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		if (node.__nodes && !stopenterchild) {
			var r = node.__nodes[offset]
			if (r) {
				if (r.__nodes || r.nodeType == 3)
					return this.__setPointInside(r, 0);
			}
			var l = node.__nodes[offset - 1]
			if (l) {
				if (l.__nodes || l.nodeType == 3)
					return this.__setPointInside(l, l.__getMaxOffset());
				if (l.IsContent() && offset == node.__nodes.length) {
					var tn = new $rte.TypingNode();
					node.__appendChild(tn);
					//this.__trace("inside typing node #1");
					return this.__setPointInside(tn, 0);
				}
			}

			if (!node.__nodes.length) {
				var tn = new $rte.TypingNode();
				node.__appendChild(tn);
				//this.__trace("inside typing node #2");
				return this.__setPointInside(tn, 0);
			}
		}

		this.__selection = new $rte.Selection(this, "Point", node, offset, null, 0);
	}
	this.__setPointBefore = function (node, stopenterchild) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		var p = node.__parent;
		if (p == null)//p is body?
			this.__setPointInside(node, 0, stopenterchild);
		else
			this.__setPointInside(p, p.__indexOf(node), stopenterchild);
	}
	this.__setPointAfter = function (node, stopenterchild) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		var p = node.__parent;
		if (p == null)//p is body?
			this.__setPointInside(node, node.__nodes.length, stopenterchild);
		else
			this.__setPointInside(p, p.__indexOf(node) + 1, stopenterchild);
	}

	this.__setRangeInside = function (node, offset) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		if (!this.__verifySelectionType("Point", "Range"))
			return false;
		this.__selection = new $rte.Selection(this, "Range", this.__selection.__pointnode, this.__selection.__pointoffset, node, offset);
		return true;
	}
	this.__setRangeBefore = function (node) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		if (!this.__verifySelectionType("Point", "Range"))
			return false;
		var p = node.__parent;
		if (p == null)//p is body?
			this.__selection = new $rte.Selection(this, "Range", this.__selection.__pointnode, this.__selection.__pointoffset, node, 0);
		else
			this.__selection = new $rte.Selection(this, "Range", this.__selection.__pointnode, this.__selection.__pointoffset, p, p.__indexOf(node));
		return true;
	}
	this.__setRangeAfter = function (node) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		if (!this.__verifySelectionType("Point", "Range"))
			return false;
		var p = node.__parent;
		if (p == null)//p is body?
			this.__selection = new $rte.Selection(this, "Range", this.__selection.__pointnode, this.__selection.__pointoffset, node, node.__nodes.length);
		else
			this.__selection = new $rte.Selection(this, "Range", this.__selection.__pointnode, this.__selection.__pointoffset, p, p.__indexOf(node) + 1);
		return true;
	}
	this.__selectTextNode = function (node) {
		if (node == null) throw (new Error("argument is null"));
		if (node.__core == null) throw (new Error("argument node is detached"));

		var len = node.__text.length;
		this.__selection = new $rte.Selection(this, "Range", node, 0, node, len);
	}

	this.__collapseRange = function (start) {
		if (!this.__verifySelectionType("Range"))
			return false;

		if (start)
			this.__setPointInside(this.__getPointNode(), this.__getPointOffset());
		else
			this.__setPointInside(this.__getRangeNode(), this.__getRangeOffset());
		return true;
	}

	this.__translateOffset = function (node, dom, offset) {
		return node._translateOffset(dom, offset);
	}
	this.__getNodeOffset = function (node, offset) {
		return node._getNodeOffset(offset);
	}


	this.__rangeSyncFromDom = function (syncforclick) {
		//		if(!this.__getfocused())
		//			return false;
		if (!Browser_HasValidSelection(this.__win))
			return false;

		//this.__trace("sync from dom","selection");

		var node = null;

		var ctrl = Browser_GetSelectedControl(this.__win);
		if (ctrl != null) {
			node = this.__getNodeFromDom(ctrl, true);
			if (!node) {
				//this is for IE..
				if (this.__getSelectionType() == "Control")
					return false;
				this.__selection = new $rte.Selection(this, "None", null, 0, null, 0);
				this.__rangeSyncToDom(true);
			}
			else if (node.IsControl()) {
				//if(this.__getSelectionType()=="Control"&&this.__getPointNode()==node)
				//	return;
				this.__selection = new $rte.Selection(this, "Control", node, 0, null, 0);
				this.__rangeSyncToDom(true);
			}
			else {
				this.__selection = new $rte.Selection(this, "Point", node, 0, null, 0);
				this.__rangeSyncToDom(true);
			}
		}
		else {
			var pno = Browser_GetPointNodeOffset(this.__win);
			if (pno.node) {
				node = this.__getNodeFromDom(pno.node, true);
			}

			if (!node) {
				//this.__trace("no available node!"+(pno.node?pno.node.nodeName:"none"),"selection");

				//this.__selection=new $rte.Selection(this,"None",null,0,null,0);
				if (this.__selection.__version != this.__version)
					this.__selectLastTextNode(true, false, true);
				else if (this.__laststaticdiv == pno.node)
					this.__selectLastTextNode(true, false, true);
				else if (this.__lasthiddennode == pno.node)
					this.__selectLastTextNode(true, false, true);
				else if (this.__hiddenfloatdiv == pno.node)
					this.__selectLastTextNode(true, false, true);
				else if (this.__hiddentextnode == pno.node)
					return;	//control mode use __hiddentextnode 
				else if (jsml.bodydivmode && this.__win.document.body == pno.node)
					this.__selectLastTextNode(true, true, true);
				//				else
				//					this.__trace("selected unknown node : "+(pno.node?(pno.node.outerHTML||pno.node.nodeName):"none"));
			}
			else if (node.IsControl()) {
				this.__selection = new $rte.Selection(this, "Control", node, 0, null, 0);
			}
			else {
				var offset = this.__translateOffset(node, pno.node, pno.offset);

				var rno = Browser_GetRangeNodeOffset(this.__win);
				var endnode = null;
				if (rno.node)
					endnode = this.__getNodeFromDom(rno.node, true, true);
				if (!endnode || (endnode == node && offset == endoffset)) {
					if (syncforclick) {
						while (node.__getMaxOffset() == offset && !node.__isBlock()) {
							var p = node.__parent;
							if (!p)
								continue;
							offset = p.__indexOf(node) + 1;
							node = p;
						}
					}
					this.__selection = new $rte.Selection(this, "Point", node, offset, null, 0);
					//this.__trace("selection point to : "+this.__selection,"selection");
				}
				else {
					var endoffset = this.__translateOffset(endnode, rno.node, rno.offset);
					this.__selection = new $rte.Selection(this, "Range", node, offset, endnode, endoffset);
				}
			}
		}

		//this.__trace("selection synced to : "+this.__selection,"selection");
		this.__selection.__clearSyncTimer(true);
		this.__resetSyncSelection();
		return true;
	}

	this.__rangeSyncToDom = function (force) {
		this.__selection.__clearSyncTimer(true);
		this.__resetSyncSelection();

		var seltype = this.__getSelectionType();

		if (jsml.msieall && !this.__getfocused())
			return;

		//this.__trace("sync to dom : "+this.__selection,"selection");

		this.__startSetSelection();
		try {
			if (seltype == "None" || seltype == "Control") {
				if (!jsml.msieall) {
					Browser_SetPointInside(this.__win, this.__hiddentextnode, 1);
				}
				else if (seltype == "Control") {
					Browser_SelectControl(this.__win, this.__selection.__pointnode.__viewnode);
				}
				else {
					Browser_SelectNone(this.__win);
				}
			}
			else {
				var pno = this.__getNodeOffset(this.__selection.__pointnode, this.__selection.__pointoffset);
				if (pno.node != null) {
					Browser_SetPointInside(this.__win, pno.node, pno.offset);
					if (seltype == "Range") {
						var rno = this.__getNodeOffset(this.__selection.__rangenode, this.__selection.__rangeoffset);
						Browser_SetRangeInside(this.__win, rno.node, rno.offset);
					}
				}
				else {
					//alert(this.__selection.__pointnode.__core)
				}
			}
		}
		finally {
			this.__stopSetSelection();
		}
	}

	this.__scrollIntoView = function (synctodom) {
		if (synctodom)
			this.__rangeSyncToDom(true);

		if (core_mobile)
			return;

		var node = null;
		var pos = 0;
		var seltype = this.__getSelectionType();
		if (seltype == "Point" || seltype == "Control") {
			node = this.__selection.__pointnode;
			pos = this.__selection.__pointoffset;
		}
		if (seltype == "Range") {
			node = this.__selection.__rangenode;
			pos = this.__selection.__rangeoffset;
		}
		if (!node) return;
		while (node.nodeType == 1 && node.__nodes && node.__nodes.length) {
			var child = node.__nodes[pos];
			if (child) {
				node = child;
				pos = 0;
				continue;
			}
			child = node.__nodes[node.__nodes.length - 1];
			if (child.__nodes)
				pos = child.__nodes.length;
			else
				pos = 0;
			node = child;
		}
		if (node.__viewnode) {
			Browser_ScrollIntoView(node.__viewnode, this.__frame.offsetHeight);
		}
	}

	this.ScrollIntoView = this.__scrollIntoView;


	this.__comparePoint = function (n1, o1, n2, o2) {
		if (n1 == n2)
			return o1 - o2;
		if (n1.Contains(n2)) {
			for (var i = 0; i < o1; i++)
				if (n1.__nodes[i].Contains(n2))
					return 1;
			return -1;
		}
		if (n2.Contains(n1)) {
			for (var i = 0; i < o2; i++)
				if (n2.__nodes[i].Contains(n1))
					return -1;
			return 1;
		}

		var p1 = this.__getNodePath(n1).split('/');
		var p2 = this.__getNodePath(n2).split('/');
		var minl = Math.min(p1.length, p2.length);
		for (var i = 0; i < minl; i++) {
			var v1 = p1[i];
			var v2 = p2[i];
			if (v1 != v2)
				return parseInt(v1) - parseInt(v2);
		}
		return 0;
	}

	this.__getNodePath = function (node) {
		if (!node) return null;
		if (node == this.__bodynode)
			return "#";
		var arr = [];
		for (var p = node.__parent; p != null; p = p.__parent) {
			arr.push(p.__indexOf(node));
			node = p;
		}
		arr.push("#");
		arr.reverse();
		return arr.join("/");
	}
	this.__findNodeByPath = function (path) {
		if (!path) return null;
		var arr = path.split('/');
		var node = this.__bodynode;
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if (item == "#") {
				node = this.__bodynode;
				continue;
			}
			if (!node.__nodes)
				return null;
			node = node.__nodes[parseInt(item)];
			if (!node)
				return null;
		}
		return node;
	}
	this.__saveBookmark = function () {
		var bookmark = {};
		bookmark.__version = this.__version;
		var sel = this.__selection;

		if (this.__version != sel.__version) {
			bookmark.__type = "None";
			return bookmark;
		}

		bookmark.__type = sel.__type;
		bookmark.__pointoffset = sel.__pointoffset;
		bookmark.__rangeoffset = sel.__rangeoffset;
		bookmark.__pointpath = this.__getNodePath(sel.__pointnode);
		bookmark.__rangepath = this.__getNodePath(sel.__rangenode);

		return bookmark;
	}
	this.__restoreBookmark = function (bookmark) {
		if (!bookmark) return;

		if (bookmark.__version != this.__version) return;
		var node = this.__findNodeByPath(bookmark.__pointpath);

		//		this.__trace("restoreBookmark.."+[bookmark.__version,this.__version
		//			,bookmark.__type,bookmark.__pointpath,bookmark.__pointoffset
		//			,bookmark.__rangepath,bookmark.__rangeoffset
		//			]);

		if (bookmark.__type == "None" || node == null) {
			this.__selection = new $rte.Selection(this, "None", null, 0, null, 0);
		}
		else if (bookmark.__type == "Point" || bookmark.__type == "Control") {
			this.__selection = new $rte.Selection(this, bookmark.__type, node, bookmark.__pointoffset, null, 0);
		}
		else {
			var endnode = this.__findNodeByPath(bookmark.__rangepath);
			if (!endnode)
				this.__selection = new $rte.Selection(this, "Point", node, bookmark.__pointoffset, null, 0);
			else
				this.__selection = new $rte.Selection(this, "Range", node, bookmark.__pointoffset, endnode, bookmark.__rangeoffset);
		}
	}




	this.__insertNode = function (node, start) {
		this.__deleteSelection(false, true);

		if (!this.__verifySelectionType("Point"))
			return null;

		var pn = this.__getPointNode();
		var pos = this.__getPointOffset();
		if (pn.nodeType == 3) {
			var newpos = pn.__parent.__indexOf(pn);
			if (pos > 0) {
				newpos++;
				if (pos < pn.__text.length) {
					this.__internalSplitNode(pn, pos);
				}
			}
			pos = newpos;
			pn = pn.__parent;
		}

		if (!pn.__nodes)//br
		{
			pos = pn.__parent.__indexOf(pn);
			pn = pn.__parent;
		}

		pn.__insertAt(node, pos);
		this.__selection = new $rte.Selection(this, "Point", pn, start ? pos : pos + 1, null, 0);

		return node;
	}



	this.__getRangeTextNodes = function () {
		var nodes = [];

		if (!this.__verifySelectionType("Range"))
			return nodes;

		var node = this.__selection.__pointnode;
		var pos = this.__selection.__pointoffset;
		var endnode = this.__selection.__rangenode;
		var endpos = this.__selection.__rangeoffset;

		var root = node;
		while (root && !root.Contains(endnode))
			root = root.__parent;
		if (root == null) return nodes;

		if (root.nodeType == 3) {
			nodes.push(node);
			return nodes;
		}

		function FillTextNodes(n) {
			if (!n) return;
			if (n.nodeType == 3) {
				nodes.push(n);
				return;
			}
			if (n.nodeType == 1) {
				FillTextNodes(n.__nodes);
				return;
			}
			if (n.length) {
				for (var i = 0; i < n.length; i++)
					FillTextNodes(n[i]);
			}
		}

		if (node == endnode) {
			FillTextNodes(node.__nodes.slice(pos, endpos));
			return nodes;
		}

		var curr = node;
		var cpos = pos;
		for (; curr != root; curr = curr.__parent) {
			if (curr.nodeType == 3) {
				if (cpos < curr.__getMaxOffset())
					nodes.push(curr);
			}
			else if (curr.__nodes) {
				FillTextNodes(curr.__nodes.slice(cpos));
			}
			cpos = curr.__parent.__indexOf(curr) + 1
		}

		var savepos1 = cpos;

		var endnodes = [];

		curr = endnode;
		cpos = endpos;
		for (; curr != root; curr = curr.__parent) {
			if (curr.nodeType == 3) {
				if (cpos > 0)
					endnodes.push(curr);
			}
			else if (curr.__nodes) {
				var arr = curr.__nodes.slice(0, cpos);
				arr.reverse();
				endnodes = endnodes.concat(arr);
			}
			cpos = curr.__parent.__indexOf(curr)
		}

		for (var i = savepos1; i < cpos; i++) {
			FillTextNodes(root.__nodes[i]);
		}

		if (endnodes.length > 0) {
			endnodes.reverse();
			FillTextNodes(endnodes);
		}

		return nodes;
	}

	this.__isTwoNodeCrossBlock = function (node, endnode) {
		var root = node;
		while (root && !root.Contains(endnode)) {
			if (root.__isBlock())
				return true;
			root = root.__parent;
		}

		for (var p = endnode; p != root; p = p.__parent) {
			if (p.__isBlock())
				return true;
		}

		return false;
	}
	this.__isCrossBlock = function () {
		if (!this.__verifySelectionType("Range"))
			return false;

		var node = this.__selection.__pointnode;
		var endnode = this.__selection.__rangenode;

		return this.__isTwoNodeCrossBlock(node, endnode);
	}

	this.__doSplitRootImpl = function (root, node, pos, endnode, endpos, cansplit) {
		var nodes = [];

		var srclen = root.__nodes.length;

		var curr = node;
		var cpos = pos;
		for (; curr != root; curr = curr.__parent) {
			if (!cansplit(curr)) {
				nodes = nodes.concat(curr.__nodes.slice(cpos));
				cpos = curr.__parent.__indexOf(curr) + 1;
			}
			else if (cpos == 0) {
				cpos = curr.__parent.__indexOf(curr);
			}
			else {
				left = this.__internalSplitNode(curr, cpos);
				if (left == null && cpos >= curr.__getMaxOffset())
					cpos = curr.__parent.__indexOf(curr) + 1;
				else
					cpos = curr.__parent.__indexOf(curr);
			}
		}

		var savepos1 = cpos;

		var dstlen = root.__nodes.length;
		if (dstlen > srclen && endnode == root) {
			endpos += dstlen - srclen;
		}

		var endnodes = [];

		curr = endnode;
		cpos = endpos;
		for (; curr != root; curr = curr.__parent) {
			if (!cansplit(curr)) {
				var arr = curr.__nodes.slice(0, cpos);
				arr.reverse();
				endnodes = endnodes.concat(arr);
				cpos = curr.__parent.__indexOf(curr);
			}
			else {
				left = this.__internalSplitNode(curr, cpos);
				if (left == null && cpos > 0)
					cpos = curr.__parent.__indexOf(curr) + 1;
				else
					cpos = curr.__parent.__indexOf(curr);
			}
		}


		for (var i = savepos1; i < cpos && i < root.__nodes.length; i++) {
			nodes.push(root.__nodes[i]);
		}

		if (endnodes.length) {
			endnodes.reverse();
			nodes = nodes.concat(endnodes);
		}

		return nodes;
	}

	this.__splitRangeNodes = function (option) {
		var core = this;
		if (!option) option = {}
		var cansplit = function (node) {
			if (node.nodeType != 1)
				return node.nodeType == 3;
			if (node == this.__bodynode)
				return false;
			if (option.cansplitfunction)
				return option.cansplitfunction(node);
			return !node.__isBlock() && !node.__notSplitable();
		}

		var nodes = this.__splitRangeNodes__impl(option, cansplit);

		if (option.keeproot)
			return nodes;

		for (var nodeindex = 0; nodeindex < nodes.length; nodeindex++) {
			var n = nodes[nodeindex];
			while (true) {
				var p = n.__parent;

				if (!p || p == this.__bodynode || !cansplit(p))
					break;

				var ns = p.__nodes;
				if (ns.length == 1) {
					n = p;
					continue;
				}

				var pp = p.__parent;
				var ppos = pp.__indexOf(p);

				ns = ns.concat();
				var pos = p.__indexOf(n);

				if (pos > 0) {
					var prev = p._cloneNode(false);
					pp.__insertAt(prev, ppos);
					ppos++;
					for (var i = 0; i < pos; i++)
						prev.__appendChild(ns[i]);
				}
				if (pos + 1 < ns.length) {
					var next = p._cloneNode(false);
					pp.__insertAt(next, ppos + 1);
					for (var i = pos + 1; i < ns.length; i++)
						next.__appendChild(ns[i]);
				}
				n = p;

			}
			nodes[nodeindex] = n;
		}

		if (nodes.length < 2)
			return nodes;

		var lastnode = nodes[0];
		var newarr = [lastnode];

		for (var i = 1; i < nodes.length; i++) {
			var node = nodes[i];

			if (!IsNestedTextNodes(lastnode, node)) {
				lastnode = node;
				newarr.push(lastnode);
				continue;
			}

			lastnode.__setHtmlCode(lastnode.__getHtmlCode() + node.__getHtmlCode());
			node.__removeNode(true);
		}

		return newarr;
	}
	function IsNestedTextNodes(left, right) {
		var p = left.__parent;
		if (p != right.__parent) return;
		if (left.nodeType != 3) return;
		if (right.nodeType != 3) return;
		if (p.__indexOf(left) + 1 != p.__indexOf(right)) return;
		return true;
	}

	this.__splitRangeNodes__impl = function (option, cansplit) {
		if (!this.__verifySelectionType("Range"))
			return [];

		var node = this.__selection.__pointnode;
		var pos = this.__selection.__pointoffset;
		var endnode = this.__selection.__rangenode;
		var endpos = this.__selection.__rangeoffset;

		var root = node;
		while (root && !root.Contains(endnode))
			root = root.__parent;
		if (root == null) return nodes;

		var left, right;

		if (root.nodeType == 3) {
			left = this.__internalSplitNode(node, pos);
			left = this.__internalSplitNode(node, endpos - pos);
			if (left) node = left;
			return [node];
		}

		if (node == endnode) {
			return node.__nodes.slice(pos, endpos);
		}

		return this.__doSplitRootImpl(root, node, pos, endnode, endpos, cansplit);
	}

	this.__cloneRangeNodes = function (option) {
		var nodes = [];

		if (!this.__verifySelectionType("Range")) {
			if (this.__verifySelectionType("Control"))
				return [this.__selection.__pointnode._cloneNode(true)];
			return nodes;
		}

		var node = this.__selection.__pointnode;
		var pos = this.__selection.__pointoffset;
		var endnode = this.__selection.__rangenode;
		var endpos = this.__selection.__rangeoffset;

		var root = node;
		while (root && !root.Contains(endnode))
			root = root.__parent;
		if (root == null) return nodes;

		var left, right;

		if (root.nodeType == 3) {
			var newnode = new $rte.TextNode();
			newnode.__setText(node.__text.substring(pos, endpos));
			nodes.push(newnode);
			return nodes;
		}

		if (node == endnode) {
			nodes = nodes.concat(node.__nodes.slice(pos, endpos));
			for (var i = 0; i < nodes.length; i++) nodes[i] = nodes[i]._cloneNode(true);
			return nodes;
		}

		var cansplit = function (node) {
			if (node.nodeType != 1)
				return node.nodeType == 3;
			if (node == this.__bodynode)
				return false;

			return true;
		}

		function doclone(cnode) {
			var nnode = cnode._cloneNode(false);
			if (cnode == node) node = nnode;
			if (cnode == endnode) endnode = nnode;
			if (!cnode.__nodes)
				return nnode;
			for (var i = 0; i < cnode.__nodes.length; i++)
				nnode.__appendChild(doclone(cnode.__nodes[i]));
			return nnode;
		}

		root = doclone(root);

		var nodes = this.__doSplitRootImpl(root, node, pos, endnode, endpos, cansplit);

		if (root.__namelower == "ol" || root.__namelower == "ul") {
			root = root._cloneNode(false);
			for (var i = 0; i < nodes.length; i++)
				root.__appendChild(nodes[i]);
			return [root];
		}

		return nodes;
	}

	this.__extractRangeNodes = function (delit) {
		if (!delit)
			return this.__cloneRangeNodes();
		this.__deleteSelection();
		return _deletednodes;
	}




	this.__handleEnter = function (entertag) {
		if (!this.__verifySelectionType("Point", "Range"))
			return false;
		if (this.__isCrossBlock())
			return false;

		this.__deleteSelection();

		var node = this.__getPointNode();
		var pos = this.__getPointOffset();

		if (pos == 0 && node.__parent && node.__parent.__namelower == "li" && node.__parent.__nodes[0] == node) {
			var li = node.__parent;
			var list = li.__parent;
			if (list.__indexOf(li) == list.__nodes.length - 1) {
				this.__paragraphFormatBlock(this.__config.insertparagraph);
				this.__scrollIntoView(true);
				return true;
			}
		}

		while (node != this.__bodynode && !node.__isBlock()) {
			left = this.__internalSplitNode(node, pos);
			if (left) node = left;
			if (pos == 0)
				pos = node.__parent.__indexOf(node)
			else
				pos = node.__parent.__indexOf(node) + 1;
			node = node.__parent;
		}

		if (!entertag) entertag = this.__config.enterkeytag;

		var enterlower = entertag.toLowerCase();
		if (enterlower == "br" || enterlower == "hr" || enterlower == "wbr") {
			var br = new $rte.GenericElement(entertag);
			var another = node.__nodes[pos];
			if (another)
				node.__insertBefore(br, another);
			else
				node.__appendChild(br);
			this.__setPointAfter(br);
			this.__scrollIntoView(true);
			return true;
		}

		if (node.__notSplitable())//body,td,fieldset..
		{
			var next = new $rte.ContainerElement(entertag);
			var another = node.__nodes[pos];
			if (another)
				node.__insertBefore(next, another);
			else
				node.__appendChild(next);

			var arr1 = [];
			for (var i = node.__indexOf(next) - 1; i >= 0; i--) {
				var child = node.__nodes[i];
				if (child.__isBlock())
					break;
				arr1.push(child);
			}
			var arr2 = [];
			for (var i = node.__indexOf(next) + 1; i < node.__nodes.length; i++) {
				var child = node.__nodes[i];
				if (child.__isBlock())
					break;
				arr2.push(child);
			}


			if (arr1.length > 0) {
				var prev = new $rte.ContainerElement(entertag);
				node.__insertBefore(prev, next);
				arr1.reverse();
				for (var i = 0; i < arr1.length; i++)
					prev.__appendChild(arr1[i]);
			}

			if (arr2.length > 0) {
				for (var i = 0; i < arr2.length; i++)
					next.__appendChild(arr2[i]);
				this.__clearEmptyParagraph(next);
			}

			if (next.__nodes.length == 0) {
				var text = new $rte.TextNode();
				text.__setHtmlCode("&nbsp;");
				next.__appendChild(text);
				this.__setPointInside(text, 0);
			}
			else {
				this.__setPointInside(next, 0);
			}

		}
		else {
			var prev = node._cloneNode(false);
			node.__parent.__insertBefore(prev, node);
			for (var i = 0; i < pos; i++)
				prev.__appendChild(node.__nodes[0]);


			if (prev.__nodes.length == 0) {
				var text = new $rte.TextNode();
				text.__setHtmlCode("&nbsp;");
				prev.__appendChild(text);
			}
			if (node.__nodes.length == 0) {
				node.__clearAttributes();

				var text = new $rte.TextNode();
				text.__setHtmlCode("&nbsp;");
				node.__appendChild(text);
				this.__setPointInside(text, 0);
			}
			else {
				this.__setPointInside(node, 0);
			}
		}

		this.__scrollIntoView(true);
		return true;
	}



	function __findFirstContent(prev) {
		if (prev.__nodes && prev.__nodes.length) {
			for (var i = 0; i < prev.__nodes.length; i++) {
				var node = prev.__nodes[i];
				if (node.nodeType == 3 || node.IsControl())
					return node;
				var sub = __findFirstContent(node);
				if (sub != null)
					return sub;
			}
		}
	}
	function __findLastContent(prev) {
		if (prev.__nodes && prev.__nodes.length) {
			for (var i = prev.__nodes.length - 1; i >= 0; i--) {
				var node = prev.__nodes[i];
				if (node.nodeType == 3 || node.IsControl())
					return node;
				var sub = __findLastContent(node);
				if (sub != null)
					return sub;
			}
		}
	}

	function __findNextContent(node) {
		while (true) {
			var next = node.__findNext();
			if (!next)
				return null;
			if (next.IsContent())
				return next;
			node = __findFirstContent(next);
			if (node != null)
				return node;
			node = next;
		}
	}
	function __findPrevContent(node) {
		while (true) {
			var prev = node.__findPrev();
			if (!prev)
				return null;
			if (prev.IsContent())
				return prev;
			node = __findLastContent(prev);
			if (node != null)
				return node;
			node = prev;
		}
	}


	this.__deleteNodeAndSelect = function (node, backward) {
		var prev, next;
		if (backward)
			next = __findNextContent(node);
		else
			prev = __findPrevContent(node);

		var p;
		var pi;
		while (true) {
			p = node.__parent;
			pi = p.__indexOf(node);
			node.__removeNode(true);
			node = p;
			if (p == null || p.__nodes.length != 0 || p.__notSplitable())
				break;
		}

		if (p && pi == 0) {
			this.__setPointInside(p, 0);
			return true;
		}

		if (prev) {
			this.__setPointAfter(prev);
		}
		else if (next) {
			this.__setPointBefore(next);
		}
		else {
			if (!node) node = this.__bodynode;
			if (backward)
				this.__setPointInside(node, node.__nodes.length);
			else
				this.__setPointInside(node, 0);
		}
		return true;
	}

	this.__clearEmptyParagraph = function (p) {
		if (p.__nodes.length != 1)
			return;
		var tn = p.__nodes[0];
		if (tn.__namelower != "#text")
			return;
		if (tn.__text == "" || tn.__text.match(/^\s+$/) || tn.__getHtmlCode() == "&nbsp;") {
			tn.__removeNode(true);
		}
	}
	this.__tryJoinParagraph = function (node, endnode, backward) {
		var root = node;
		while (!root.Contains(endnode)) {
			root = root.__parent;
			if (!root) return;
		}

		var p1 = node;
		while (p1.__parent != root)
			p1 = p1.__parent;
		if (!p1.__nodes || p1.IsContent() || p1.__notSplitable())
			return;

		var p2 = endnode;
		while (p2.__parent != root)
			p2 = p2.__parent;
		if (!p2.__nodes || p2.IsContent() || p2.__notSplitable())
			return;

		//TODO:when p1 can join p2 ?
		// 1- two paragragh
		// 2- two a ?

		this.__clearEmptyParagraph(p1);
		this.__clearEmptyParagraph(p2);

		var mainp = null;

		if (backward) {
			var ns = p1.__nodes.concat();
			if (p2.__namelower == "ul" || p2.__namelower == "ol") {
				var li = new $rte.ContainerElement("li");
				p1.__insertAt(li, 0);
				p2 = li;
			}
			for (var i = ns.length - 1; i >= 0; i--)
				p2.__insertAt(ns[i], 0);
			p1.__removeNode(true);

			if (node.__core)
				this.__setPointAfter(node);
			else
				this.__setPointInside(p2, ns.length);
			mainp = p2;
		}
		else {
			var ns = p2.__nodes.concat();
			if (p1.__namelower == "ul" || p1.__namelower == "ol") {
				var li = p1.__nodes[p1.__nodes.length - 1];
				if (li == null) {
					var li = new $rte.ContainerElement("li");
					p1.__appendChild(li);
				}
				p1 = li;
			}
			for (var i = 0; i < ns.length; i++)
				p1.__appendChild(ns[i]);
			p2.__removeNode(true);

			if (endnode.__core)
				this.__setPointBefore(endnode);
			else
				this.__setPointInside(p1, p1.__nodes.length - ns.length)
			mainp = p1;
		}

		if (node.__core && endnode.__core) {
			this.__tryJoinParagraph(node, endnode, backward);
		}
		else if (mainp.__nodes.length == 0) {
			var text = new $rte.TextNode();
			text.__setHtmlCode("&nbsp;");
			mainp.__appendChild(text);
			this.__setPointInside(text, 0)
		}
		return true;
	}

	this.__deleteNodeLeft = function (node, pos, ctrlmode) {
		if (node.nodeType == 3) {
			if (pos == 0) {
				var another = node;
				node = __findPrevContent(node);
				if (node == null) return false;
				if (this.__tryJoinParagraph(node, another, false))
					return true;
				if (node.nodeType != 3)
					return this.__deleteNodeAndSelect(node);
				pos = node.__text.length;
			}
			var text = node.__text;
			if (text.length <= 1)
				return this.__deleteNodeAndSelect(node);
			if (ctrlmode) {
				var rt = text.substring(pos);
				pos = pos - 1;
				while (pos > 0 && /[a-z0-9]/i.test(text.charAt(pos))) {
					pos = pos - 1;
				}
				node.__setText(text.substring(0, pos) + rt);
				//this.__trace("delete chars '"+text.substring(pos,text.length-rt.length)+"'");
			}
			else {
				pos = pos - 1;
				node.__setText(text.substring(0, pos) + text.substring(pos + 1));
				//this.__trace("delete char '"+text.charAt(pos)+"'");
			}
			this.__setPointInside(node, pos);
			return true;
		}
		else if (node.IsContent()) {
			return this.__deleteNodeAndSelect(node);
		}
		else if (pos < node.__nodes.length) {
			node = node.__nodes[pos];
			var another = node;
			node = __findPrevContent(node);
			if (node == null) return false;
			if (this.__tryJoinParagraph(node, another, false))
				return true;
			if (node.nodeType != 3)
				return this.__deleteNodeAndSelect(node);
			return this.__deleteNodeLeft(node, node.__text.length);
		}
		else if (node.__nodes.length == 0) {
			if (node.__notSplitable()) {
				//TODO:move to left content node
				return false;
			}
			this.__deleteNodeAndSelect(node);
			return true;//len==0
		}
		else {
			node = node.__nodes[node.__nodes.length - 1];
			if (node.nodeType == 3)
				return this.__deleteNodeLeft(node, node.__text.length);
			if (!node.IsContent())
				return this.__deleteNodeLeft(node, node.__nodes.length);
			return this.__deleteNodeAndSelect(node);
		}
	}


	this.__deleteNodeRight = function (node, pos, ctrlmode) {
		if (node.nodeType == 3) {
			var text = node.__text;
			if (pos >= text.length) {
				var another = node;
				node = __findNextContent(node);
				//if(node==null)this.__trace("no such..next?");
				if (node == null) return false;
				if (this.__tryJoinParagraph(another, node, true))
					return true;
				if (node.nodeType != 3)
					return this.__deleteNodeAndSelect(node, true);
				pos = 0;
				text = node.__text;
			}
			if (text.length <= 1)
				return this.__deleteNodeAndSelect(node, true);

			if (ctrlmode) {
				var lt = text.substring(0, pos);
				while (/[a-z0-9]/i.test(text.charAt(pos))) {
					pos = pos + 1;
				}
				node.__setText(lt + text.substring(pos + 1));
				this.__setPointInside(node, lt.length);
				//this.__trace("delete chars '"+text.substring(lt.length,pos+1)+"'");
			}
			else {
				node.__setText(text.substring(0, pos) + text.substring(pos + 1));
				this.__setPointInside(node, pos);
				//this.__trace("delete char '"+text.charAt(pos)+"'");
			}

			return true;
		}
		else if (node.IsContent()) {
			return this.__deleteNodeAndSelect(node, true);
		}
		else if (pos < node.__nodes.length) {
			node = node.__nodes[pos];
			if (node.nodeType == 3)
				return this.__deleteNodeRight(node, 0);
			if (!node.IsContent())
				return this.__deleteNodeRight(node, 0);
			return this.__deleteNodeAndSelect(node, true);
		}
		else if (node.__nodes.length == 0) {
			if (node.__notSplitable()) {
				//TODO:move to right content node
				return false;
			}
			this.__deleteNodeAndSelect(node, true)
			return true;//len==0
		}
		else {
			node = node.__nodes[node.__nodes.length - 1];
			var another = node;
			node = __findNextContent(node);
			if (node == null) return false;
			if (this.__tryJoinParagraph(another, node, true))
				return true;
			if (node.nodeType != 3)
				return this.__deleteNodeAndSelect(node, true);
			return this.__deleteNodeRight(node, node.__text.length);
		}
	}
	this.__deleteToLeft = function (ctrlmode) {
		var stype = this.__getSelectionType();
		if (stype == "None")
			return false;
		if (stype == "Range" || stype == "Control")
			return this.__deleteSelection();
		var node = this.__selection.__pointnode;
		if (!node)
			return false;
		var pos = this.__selection.__pointoffset;
		if (pos == 0 && node.__parent.__namelower == "li" && node.__parent.__nodes[0] == node) {
			var li = node.__parent;
			var list = li.__parent;
			if (list.__indexOf(li) == list.__nodes.length - 1) {
				this.__paragraphFormatBlock(this.__config.insertparagraph);
				return true;
			}
		}

		return this.__deleteNodeLeft(node, pos, ctrlmode);
	}
	this.__deleteToRight = function (ctrlmode) {
		var stype = this.__getSelectionType();
		if (stype == "None")
			return false;
		if (stype == "Range" || stype == "Control")
			return this.__deleteSelection(true);
		var node = this.__selection.__pointnode;
		var pos = this.__selection.__pointoffset;
		return this.__deleteNodeRight(node, pos, ctrlmode)
	}

	this.DeleteToLeft = this.__deleteToLeft;
	this.DeleteToRight = this.__deleteToRight;

	this.__removeNode = function (node, all) {
		var par = node.__parent;
		if (!par) return;
		var pos = par.__indexOf(node);
		node.__removeNode(all);
		if (this.__getSelectionType() == "None") {
			if (par == this.__bodynode && pos == this.__bodynode.__getMaxOffset()) {
				this.__selectLastTextNode(true);
			}
			else {
				this.__setPointInside(par, pos);
				this.__rangeSyncToDom(true);
			}
		}
	}

	this.__surroundNodes = function (node) {
		if (!node.__appendChild)
			return null;

		var stype = this.__getSelectionType();

		if (stype == "None")
			return null;

		if (stype == "Point") {
			if (!this.__insertNode(node))
				return null;
			return [node];
		}

		if (stype == "Control") {
			var ctrl = this.__selection.__pointnode;
			ctrl.__parent.__insertBefore(node, ctrl);
			node.__appendChild(ctrl);
			return [node];
		}

		var index = -1;
		var list = [];
		function processLogic(subnode) {
			if (subnode.__isBlock()) {
				var ns = subnode.__nodes;
				if (!ns)
					return [];
				var arr = [];
				ns = ns.concat();
				for (var i = 0; i < ns.length; i++)
					arr = arr.concat(processLogic(ns[i]))
				return arr;
			}

			index++;
			var outnode = node;
			if (index > 0) outnode = node._cloneNode(false);

			subnode.__parent.__insertBefore(outnode, subnode);
			outnode.__appendChild(subnode);
			list.push(outnode);
			return [outnode];
		}

		var option = {};
		this.__splitRangeForLogic(processLogic, option);

		return list;
	}
	this.__surroundNode = function (node) {
		if (!node.__appendChild)
			return false;

		var stype = this.__getSelectionType();

		if (stype == "None")
			return false;

		if (stype == "Point")
			return !!this.__insertNode(node);

		if (stype == "Control") {
			var ctrl = this.__selection.__pointnode;
			ctrl.__parent.__insertBefore(node, ctrl);
			node.__appendChild(ctrl);
			return true;
		}

		var ns = this.__cloneRangeNodes();

		var sp = this.__saveLogContent();
		for (var i = 0; i < ns.length; i++) {
			if (!this.__hasBlock(ns[i]))
				continue;
			return false;
		}

		if (!this.__insertNode(node))
			return false;

		for (var i = 0; i < ns.length; i++)
			node.__appendChild(ns[i]);

		return true;
	}

	this.__hasBlock = function (node) {
		if (node.__isBlock())
			return true;
		var ns = node.__nodes;
		if (!ns)
			return false;
		for (var i = 0; i < ns.length; i++) {
			if (this.__hasBlock(ns[i]))
				return true;
		}
		return false;
	}


	var _deletednodes = [];

	function __deleteSplitableNodes(nodes, keeproot, level) {
		nodes = nodes.concat();
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			if (node.__notDeletable()) {
				__deleteSplitableNodes(node.__nodes, keeproot, 1 + (level || 0));
				continue;
			}

			if (level) {
				node.__removeNode(true);
				_deletednodes.push(node);
				continue;
			}

			var p = node;
			while (true) {
				var pp = p.__parent;
				if (!pp)
					break;
				if (keeproot && keeproot != "frag")
					break;
				if (pp.__nodes.length != 1)
					break;
				if (pp.__notDeletable())
					break;
				p = pp;
			}

			//var pp=p.__parent;
			p.__removeNode(true);

			_deletednodes.push(p);
			//			if(pp&&pp.__notDeletable()&&pp.__nodes.length==0)
			//			{
			//				//
			//			}
		}
	}

	this.__deleteSelection = function (backward, keeproot) {
		_deletednodes = [];

		var stype = this.__getSelectionType();
		if (stype == "None" || stype == "Point")
			return false;

		if (stype == "Control") {
			_deletednodes.push(this.__selection.__pointnode);
			return this.__deleteNodeAndSelect(this.__selection.__pointnode);
		}

		var nodes = this.__splitRangeNodes({
			cansplitfunction: function (node) {
				return !node.__isBlock();
			}, keeproot: keeproot
		});

		if (nodes.length == 0)
			return false;

		if (backward) {
			var next = nodes[nodes.length - 1].__findNext();

			__deleteSplitableNodes(nodes, keeproot);

			if (next && next.__core)
				this.__setPointBefore(next);
			else
				this.__selectLastTextNode();
		}
		else {
			var prev = nodes[0].__findPrev();
			var np = nodes[0].__parent;
			var npp = np.__indexOf(nodes[0]);

			__deleteSplitableNodes(nodes, keeproot);

			if (np.__core && np.__nodes.length)
				this.__setPointInside(np, npp);
			else if (prev && prev.__core)
				this.__setPointAfter(prev);
			else if (this.__bodynode.__nodes.length)
				this.__setPointInside(this.__bodynode, 0);
			else
				this.__selectLastTextNode();
		}

		return true;
	}

	this.__isSelectedInSameTextNode = function () {
		if (this.__getSelectionType() == "Range") {
			var pn = this.__getPointNode();
			var rn = this.__getRangeNode();
			if (pn == rn && pn.nodeType == 3) {
				return pn;
			}
		}
	}

	this.__insertHtmlCode = function (html, select) {
		if (!html) return;
		var nodes = this.__parseHtmlCode(html);
		if (nodes.length == 0)
			return;
		this.__deleteSelection(false, true);
		if (this.__getSelectionType() == "None")
			this.__selectLastTextNode();
		if (this.__getSelectionType() == "Range")
			this.__collapseRange(true);
		for (var i = 0; i < nodes.length; i++)
			this.__insertNode(nodes[i]);
		if (select) {
			if (nodes.length == 1 && nodes[0].IsControl()) {
				this.__selectControl(nodes[0]);
			}
			else {
				this.__setPointBefore(nodes[0]);
				this.__setRangeAfter(nodes[nodes.length - 1]);
			}
		}
		else {
			this.__setPointAfter(nodes[nodes.length - 1]);
		}
		return nodes;
	}

	this.__insertBodyTopLine = function () {
		var node = this.__parseHtmlCode(this.__config.insertbodyline)[0];
		this.__bodynode.__insertAt(node, 0);
		this.__setPointInside(node, 0);
		this.__rangeSyncToDom();
	}
	this.__insertBodyBottomLine = function () {
		var node = this.__parseHtmlCode(this.__config.insertbodyline)[0];
		this.__bodynode.__appendChild(node);
		this.__setPointInside(node, 0);
		this.__rangeSyncToDom();
	}
	this.__appendHtmlCode = function (html) {
		var nodes = this.__parseHtmlCode(html);
		if (nodes.length == 0)
			return;
		for (var i = 0; i < nodes.length; i++)
			this.__bodynode.__appendChild(nodes[i]);
		this.__selectLastTextNode(true);
	}


	this.__HasDesignBorder = function () {
		return !this.__stopdesignborder;
	}
	this.__ToggleDesignBorder = function () {
		this.__stopdesignborder = !this.__stopdesignborder;
		this.__ApplyDesignBorder();
	}
	this.__ApplyDesignBorder = function () {
		if (this.__stopdesignborder) {
			this.__bodynode.__setRuntimeAttribute("class", null, "designborder");
		}
		else {
			this.__bodynode.__setRuntimeAttribute("class", "designborder", "designborder");
		}
	}


	function RGBtoHex(R, G, B) { return toHex(R) + toHex(G) + toHex(B) }
	function toHex(N) {
		if (N == null) return "00";
		N = parseInt(N); if (N == 0 || isNaN(N)) return "00";
		N = Math.max(0, N); N = Math.min(N, 255); N = Math.round(N);
		return "0123456789ABCDEF".charAt((N - N % 16) / 16)
			 + "0123456789ABCDEF".charAt(N % 16);
	}

	var dec_pattern = /rgb\((\d{1,3})[,]\s*(\d{1,3})[,]\s*(\d{1,3})\)/gi;
	function revertColor(html) {
		if (html && html.match(dec_pattern)) {
			var txt = html.replace(dec_pattern, function (str, p1, p2, p3) {
				return ("#" + RGBtoHex(p1, p2, p3)).toLowerCase();
			});
			return txt
		}
		return html;
	}

	this.__fixHTML = function (html) {
		html = revertColor(html);

		html = html.replace(/style\=["']\s*["']/g, "");

		return html;
	}


	this.__filterForValue = function (html) {
		if (!html)
			return "";

		html = this.__fixHTML(html);

		var res = this._broadcastEvent("ValueFilter", [html]);
		if (typeof (res) == "string")
			return res;
		return html;
	}


	this.__filterForCodeView = function (html) {
		html = this.__filterForValue(html);

		var cvaamode = String(this.__config.codeview_autoadjustmode).toLowerCase()

		var normalize = cvaamode.indexOf("normalize") != -1;
		var indent = cvaamode.indexOf("indent") != -1;

		if (normalize)
			html = this.__filterNormalize(html);

		if (indent)
			html = String_IndentHtml(html, config);

		return html;
	}


	function String_IndentHtmlWithoutScript(h, config) {
		var tabindent = '\t';
		if (config) tabindent = config.codetabindent || '\t'

		var t_start = /\<(ADDRESS|AREA|BASE|DIV|H1|H2|H3|H4|H5|H6|LI|LINK|META|OL|OPTION|P|TITLE|TD|UL)[^\>]*\>/gi;
		var t_end = /\<\/(ADDRESS|AREA|BASE|DIV|H1|H2|H3|H4|H5|H6|LI|LINK|META|OL|OPTION|P|TITLE|TD|UL)[^\>]*\>/gi;
		var brandhr = /\<(BR|HR)[^\>]*\>/gi;
		var t_shouldbreak = /\<\/?(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR)[^\>]*\>/gi;
		var LineSplitter = /\s*\n+\s*/g;
		var IncreaseIndent = /^\<(BODY|EMBED|FORM|HEAD|HTML|TABLE|TBODY|THEAD|TR|UL|OL)[ \/\>]/i;
		var DecreaseIndent = /^\<\/(BODY|EMBED|FORM|HEAD|HTML|TABLE|TBODY|THEAD|TR|UL|OL)[ \>]/i;

		var ta_start = /\<TEXTAREA[^\>]*\>/gi
		var ta_end = /\<\/TEXTAREA[^\>]*\>/gi

		h = h.replace(t_start, '\n$&');;
		h = h.replace(t_end, '$&\n');
		h = h.replace(brandhr, '$&\n');
		h = h.replace(t_shouldbreak, '\n$&\n');

		var sIndentation = '';

		var asLines = h.split(LineSplitter);
		h = '';

		for (var i = 0 ; i < asLines.length ; i++) {
			var sLine = asLines[i];

			if (sLine.length == 0)
				continue;

			if (ta_start.test(sLine)) {
				for (; i < asLines.length; i++) {
					var sLine = asLines[i];
					h += sLine + "\n";
					if (t_end.test(sLine))
						break;
				}
				continue;
			}

			if (DecreaseIndent.test(sLine))
				sIndentation = sIndentation.replace(tabindent, '');

			h += sIndentation + sLine + '\n';

			if (IncreaseIndent.test(sLine))
				sIndentation += tabindent;
		}
		return h;
	}
	function String_IndentHtml(html, config) {
		var arr = [];
		var start = 0;
		var pos = html.indexOf('<script', start);
		while (pos != -1) {
			arr.push(String_IndentHtmlWithoutScript(html.substring(start, pos), config));

			var endpos = html.indexOf('</scr' + 'ipt>', pos + 8);
			if (endpos == -1)//not found?
			{
				start = pos;
				break;
			}
			arr.push(html.substring(pos, endpos + 9));
			start = endpos + 9;
			pos = html.indexOf('<script', start);
		}
		arr.push(String_IndentHtmlWithoutScript(html.substring(start), config));
		return arr.join("");
	}

	this.__filterNormalize = function (html) {
		function Normalize_OnTag(match, tagname, attrline, index, text) {
			if (tagname.substring(0, 3) == "!--")
				return match;
			if (/\s*runat\s*=\s*[\x22\x27]?server/ig.test(attrline))
				return match;

			if (tagname.indexOf(':') == -1 && tagname.substring(0, 1) != "!")
				tagname = tagname.toLowerCase();

			if (attrline.length == 0)
				return "<" + tagname + ">";

			attrline = Normalize_DoAttr(attrline);

			return "<" + tagname + " " + attrline + ">";
		}
		function Normalize_OnAttr(match, attrname, suffix, index, text, what) {
			var res = Normalize_OnAttrInternal(match, attrname, suffix, index, text, what);
			if (index == 0)
				return res;
			//for example DoAttr(' disabled value=hello ');
			return " " + res;
		}
		function Normalize_OnAttrInternal(match, attrname, suffix, index, text, what) {
			attrname = attrname.toLowerCase();
			var quote = suffix.charAt(0)
			if (quote == "'" || quote == '"') {
				var endpos = suffix.indexOf(quote, 1);
				if (endpos == -1)//no end quote??return all suffix
				{
					if (attrname == "style")
						return attrname + "=" + quote + Normalize_DoStyle(suffix.substring(1));
					return attrname + "=" + quote + suffix.substring(1);
				}
				var val = suffix.substring(1, endpos);

				if (attrname == "style")
					val = Normalize_DoStyle(val);

				var rest = suffix.substring(endpos + 1);

				if (rest.length == 0)
					return attrname + "=" + quote + val + quote;

				//recursive , handle the rest string on right
				return attrname + "=" + quote + val + quote + " " + Normalize_DoAttr(rest).replace(/^\s+/, '');
			}
			else {
				//find blank..(how about \t or \n ?)
				var endpos = suffix.indexOf(' ', 1);
				if (endpos == -1)//no blank ?
				{
					if (attrname == "style")
						return attrname + '="' + Normalize_DoStyle(suffix) + '"';
					return attrname + '="' + suffix + '"';
				}
				var val = suffix.substring(0, endpos);

				if (attrname == "style")
					val = Normalize_DoStyle(val);

				var rest = suffix.substring(endpos + 1);

				if (rest.length == 0)
					return attrname + '="' + val + '"'
				//recursive , handle the rest string on right
				return attrname + '="' + val + "\" " + Normalize_DoAttr(rest).replace(/^\s+/, '');
			}
		}
		function Normalize_DoAttr(attrline) {
			return attrline.replace(/\s*([-a-zA-Z0-9_:]+)\s*=\s*([\s\S]*)/g, Normalize_OnAttr);
		}
		function Normalize_DoStyle(style) {
			return style.replace(/[-a-zA-Z0-9_]+\s*:/g, function (m2) { return m2.toLowerCase(); });
		}

		return html.replace(/<([^>\s]+)\s*([^>]*)>/g, Normalize_OnTag);
	}


	this.__detectWordContent = function (html) {
		if (!html) return;
		if (html.indexOf('class="Mso') != -1)
			return true;
		if (html.indexOf('<o:p>') != -1)
			return true;
		if (/style\=[\"][^\"]*mso\-/.test(html))
			return true;
		if (/style\=[\'][^\']*mso\-/.test(html))
			return true;
	}

	this.__removeWordCode = function (html) {
		var core = this;

		function ConvertForWord_OnTag(match, tagname, attrline, index, text) {
			if (tagname.substring(0, 4) == "?xml")
				return "";

			if (tagname.substring(0, 3) == "!--")
				return match;

			if (tagname.charAt(0) == '/')
				return match;


			if (attrline.length == 0)
				return match;

			if (/\s*runat\s*=\s*[\x22\x27]?server/ig.test(attrline))
				return match;

			attrline = ConvertForWord_DoAttr(attrline);

			return "<" + tagname + " " + attrline + ">";
		}
		function ConvertForWord_OnAttr(match, attrname, suffix, index, text, what) {
			var res = ConvertForWord_OnAttrInternal(match, attrname, suffix, index, text, what);
			if (index == 0)
				return res;
			return " " + res;
		}
		function ConvertForWord_OnAttrInternal(match, attrname, suffix, index, text, what) {
			var attrnamelower = attrname.toLowerCase();
			var quote = suffix.charAt(0)
			if (quote == "'" || quote == '"') {
				var endpos = suffix.indexOf(quote, 1);
				if (endpos == -1)//no end quote??return all suffix
				{
					if (attrnamelower == "style")
						return attrname + "=" + quote + ConvertForWord_DoStyle(suffix.substring(1));
					return attrname + "=" + quote + suffix.substring(1);
				}
				var val = suffix.substring(1, endpos);
				var rest = suffix.substring(endpos + 1);
			}
			else {
				//find blank..(how about \t or \n ?)
				var endpos = suffix.indexOf(' ', 1);
				if (endpos == -1)//no blank ?
				{
					if (attrnamelower == "style")
						return attrname + '="' + ConvertForWord_DoStyle(suffix) + '"';
					return attrname + '="' + suffix + '"';
				}
				var val = suffix.substring(0, endpos);
				var rest = suffix.substring(endpos + 1);
				quote = '"';
			}

			switch (attrnamelower) {
				case "style":
					//var oldval=val;
					val = ConvertForWord_DoStyle(val);
					//alert(val+"="+oldval);
					break;
				case "class":
				case "lang":
				case "onmouseover":
				case "onmouseout":
					val = null;
					break;
			}

			if (val) {
				if (rest.length == 0)
					return attrname + "=" + quote + val + quote;
				return attrname + "=" + quote + val + quote + " " + ConvertForWord_DoAttr(rest);
			}
			else {
				if (rest.length == 0)
					return "";
				return " " + ConvertForWord_DoAttr(rest);
			}
		}
		function ConvertForWord_DoAttr(attrline) {
			attrline = attrline.replace(/\s*([-a-zA-Z0-9_:]+)\s*=\s*([\s\S]*)/g, ConvertForWord_OnAttr);
			return attrline;
		}
		function ConvertForWord_DoStyle(h) {
			h = h.replace("color: rgb(0, 0, 0)", "");
			h = h.replace(/([=;]?)\s*mso[^:]*:|margin: 0cm|padding: 0cm|text-indent: [-0][^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*font:|font-size-adjust:|font-stretch:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*font-variant:|page-break-before:|tab-stops:|white-space:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*border-top:|border-left:|border-bottom:|border-right:[^;]*;*\s*/gi, '$1');
			//h=h.replace( /([=;]?)\s*margin-top:|margin-left:|margin-bottom:|margin-right:[^;]*;*\s*/gi, '$1' ) ;
			h = h.replace(/([=;]?)\s*border-style:|border-color:|border-right-color:|border-left-color:|border-bottom-color:|border-top-color:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*border-width:|border-right-width:|border-left-width:|border-bottom-width:|border-top-width:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*background-position:|background-repeat:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*position:|z-index:|tab-stops:[^;]*;*\s*/gi, '$1');
			h = h.replace(/([=;]?)\s*background-color:[^;]*transparent[^;]*;*\s*/gi, '$1');

			return h;
		}
		function ConvertForWord_DoTag(html) {
			html = html.replace(/<([^>\s]+)\s*([^>]*)>/g, ConvertForWord_OnTag);
			return html;
		}

		function ConvertForWord(html) {
			var processAspCode = false;

			if (!processAspCode)
				return ConvertForWord_DoTag(html);

			var arr = [];
			var start = 0;
			var pos = html.indexOf('<' + '%', start);
			while (pos != -1) {
				arr.push(ConvertForWord_DoTag(html.substring(start, pos)));

				var endpos = html.indexOf('%' + '>', pos + 2);
				if (endpos == -1)//not found?
				{
					start = pos;
					break;
				}
				arr.push(html.substring(pos, endpos + 2));
				start = endpos + 2;
				pos = html.indexOf('<' + '%', start);
			}
			arr.push(ConvertForWord_DoTag(html.substring(start)));
			return arr.join("");
		}
		function _RemoveWord(h) {

			h = ConvertForWord(h);
			h = h.replace(/<[\/]?(font|st1|shape|path|lock|imagedata|stroke|formulas|xml|del|ins|[ovwxp]:\w+)[^>]*?>/gi, '');
			h = h.replace(/\s*style="\s*"/gi, '');
			h = h.replace(/<SPAN\s*[^>]*>\s* \s*<\/SPAN>/gi, ' ');
			h = h.replace(/<(\w+)[^>]*\sstyle="[^"]*DISPLAY\s?:\s?none(.*?)<\/\1>/ig, '')
			h = h.replace(/<span\s*[^>]*>\s*&nbsp;\s*<\/span>/gi, '&nbsp;');
			h = h.replace(/<SPAN\s*[^>]*><\/SPAN>/gi, '');
			h = h.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
			h = h.replace(/<SPAN\s*>(.*?)<\/SPAN>/gi, '$1');
			h = h.replace(/<\/?\w+:[^>]*>/gi, '');
			h = h.replace(/<\!--.*?-->/g, '');
			h = h.replace(/<a name=[^>]+>(.*?)<\/a>/gi, "$1");
			h = h.replace(/<p[^>]*>[\s|&nbsp;]*<\/p>/gi, '');
			//h=h.replace(/&nbsp;&nbsp;/gi,'&nbsp; ');
			h = h.replace(/(<td[^>]*>)\s*(<\/td>)/gi, '$1&nbsp;$2');
			h = h.replace(/line-height: normal;|font-size: medium;|font-size: 7pt|align="left"?/gi, '');
			h = h.replace(/v:shapes=|v:shape="[^"]+"/ig, '');
			if (h.indexOf('class="Mso') != -1)
				h = h.replace(/<img+.[^>]*>/gi, '');

			return h;
		}

		var arr = [];
		this.__CreateHtmlFilter(arr, null, "clean_pastewordfilter", "remove", $rte.__Filter_PasteWordFilter, "removeword");

		html = this.__filterHtmlByFilterList(html, "clean_wordfilter", arr);

		html = _RemoveWord(html);

		return html;
	}
	this.__filterForPasteWord = function (html) {
		//try {
		html = this.__removeWordCode(html);
		//}
		//catch (x) {
		//	document.title = "pasteword:" + x.message;
		//alert(x.message);
		//}
		return html;
	}
	this.__filterForPasteText = function (html) {
		html = html.replace(/(\S)&nbsp;(\S)/g, "$1 $2");

		var nodes = this.__parseHtmlCode(html);
		var code = [];
		function ScanNodes(nodes) {
			if (!nodes || nodes.length == 0) return;
			for (var i = 0; i < nodes.length; i++) {
				var node = nodes[i];
				var nl = node.__namelower;

				if (nl == "#text")
					code.push(node.__text);
				if (nl == "span" && node.__getStyle("white-space") == "pre") {
					code.push(node.__innerblank);
				}

				ScanNodes(node.__nodes);

				switch (nl) {
					case "br":
					case "hr":
					case "p":
					case "div":
					case "pre":
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
					case "li":
					case "tr":
					case "form":
					case "center":
					case "blockquote":

					case "article":
					case "section":
					case "hgroup":
					case "header":
					case "footer":
					case "aside":
						code.push("\n");
				}
			}
		}
		ScanNodes(nodes);

		var tabhtc = this.__config.pastetext_tabspaces;
		var usepre = this.__config.pastetext_whitespace;
		if (usepre == 'auto') usepre = jsml.html5;
		var text = code.join("");
		var lines = text.split('\r').join('').split('\n');
		for (var i = 0; i < lines.length; i++) {
			var code = lines[i];
			code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\x22/g, "&quot;").replace(/\x27/g, "&#39;");
			if (usepre && code.indexOf('\t') != -1)
				code = "<span style='white-space:pre'>" + code + "</span>";
			else
				code = code.split('\t').join(tabhtc).replace(/\s\s/g, " &nbsp;");
			lines[i] = code;
		}

		return lines.join("<br />");
	}

	this.__filterForAllPaste = function (html, cmd) {

		html = html.replace(/style="margin: 0[a-z]+ 0[a-z]+ 10[a-z]+;"/ig, "");

		html = this.__filterNormalize(html);

		var res = this._broadcastEvent("PasteFilter", [html, cmd]);
		if (typeof (res) == "string")
			html = res;

		var fns = this.__config.paste_filters || "clean_removecomments,clean_removefonts,clean_removeemptymargin,clean_removespannoattr,clean_removeemptytags,clean_fixaccessbility,clean_mergestyle,clean_encodespecialchars";

		var arr = [];
		this.__CreateHtmlFilter(arr, null, "clean_pasteallfilter", "remove", $rte.__Filter_PasteAllFilter, cmd);

		html = this.__filterHtmlByFilterList(html, fns, arr);

		var rl = this.__config.paste_replacelist;
		if (rl) {
			for (var p in rl) {
				html = html.split(p).join(rl[p]);
			}
		}

		return html;
	}

	this.__filterHtmlByFilterList = function (html, fns, customfilters) {

		var filters = [];
		if (fns) {
			var srcfilters = this.GetHtmlFilterList();
			if (fns == "*") {
				filters = srcfilters;
			}
			else {
				for (var i = 0; i < srcfilters.length; i++) {
					var filter = srcfilters[i];
					if (fns.indexOf(filter.Name) == -1)
						continue;
					filters.push(filter);
				}
			}
		}
		if (customfilters) {
			filters = customfilters.concat(filters);
		}

		if (filters.length == 0)
			return html;

		//TODO: sometimes need twice for removing empty span etc
		var times = 1;
		for (var tt = 0; tt < times; tt++) {
			var arr1 = [];
			var arr2 = [];

			for (var i = 0; i < filters.length; i++) {
				var filter = filters[i];
				if (filter.ParamType == "NodeArray")
					arr1.push(filter);
				else
					arr2.push(filter);
			}
			if (arr2.length) {
				for (var i = 0; i < arr2.length; i++)
					html = arr2[i].Filter(html);
			}
			if (arr1.length) {
				var nodes = this.__parseHtmlCode(html);
				for (var i = 0; i < arr1.length; i++)
					nodes = arr1[i].Filter(nodes);
				var sb = []
				for (var i = 0; i < nodes.length; i++)
					sb.push(nodes[i].__getHtmlCode());
				html = sb.join("");
			}
		}
		return html;
	}

	this.FilterForPaste = function (html, cmd) {
		return this.__filterForAllPaste(html, cmd);
	}


	this.__filterForCutCopy = function (html) {
		return html;
	}
	this.__logCutCopyHtml = function (html) {
		if (html.indexOf('<') == -1)
			return html;

		if (!window._rte_ccarr) window._rte_ccarr = [];
		window._rte_ccarr.push(html);
		var index = window._rte_ccarr.length;
		return html + "<xml rtecc=\"" + index + "\">&#32;</xml>";
	}
	this.__restorePasteHtml = function (html) {
		var rtecc;
		html = html.replace(/<xml\s+rtecc="(\d+)"\s*\>.*<\/xml>/, function (a, b, c) {
			rtecc = parseInt(b);
			return "";
		});
		var v = rtecc && window._rte_ccarr && window._rte_ccarr[rtecc - 1];
		if (v) return v;
		return html;
	}

	this.__putCutCopyDiv = function (nodes, iscut) {
		var sb = [];
		for (var i = 0; i < nodes.length; i++)
			sb.push(nodes[i].__getHtmlCode());
		var html = sb.join("");
		html = this.__filterForCutCopy(html);
		html = this.__logCutCopyHtml(html);

		var sellog = this.__saveLogSelection();

		var ccpdiv = document.createElement("DIV");

		ccpdiv.setAttribute("contentEditable", "true");
		ccpdiv.style.position = 'absolute';
		ccpdiv.style.top = this.__win.document.body.scrollTop;
		ccpdiv.style.left = '-10000px';

		ccpdiv.innerHTML = "<span style='display:none'>&nbsp;</span>" + html + "<span style='display:none'>&nbsp;</span>";

		this.__win.document.body.appendChild(ccpdiv);

		this.__startSetSelection();
		try {
			Browser_SetPointInside(this.__win, ccpdiv, 1);
			Browser_SetRangeInside(this.__win, ccpdiv, ccpdiv.childNodes.length - 1);
		}
		finally {
			this.__stopSetSelection();
		}

		$rte.SafeSetTimeout(this.delegate(function () {
			this.__win.document.body.removeChild(ccpdiv);
			this.__loadLogSelection(sellog);
			if (iscut && this.__deleteaftercut) {
				this.__deleteSelection();
			}
			this.__rangeSyncToDom(true);
		}), 1);
	}

	this.__doTCCutCopy = function (cut) {
		var html = this._broadcastEvent(cut ? "TCCut" : "TCCopy", arguments)
		if (!html)
			return;
		window._rtecliphtml = html;
	}

	this.__doCutCopy = function (cut) {
		var nodes = this.__extractRangeNodes(cut);
		if (cut) {
			this.__saveLogContent(true);
			this.__saveLogSelection();
		}
		var sb = [];
		for (var i = 0; i < nodes.length; i++)
			sb.push(nodes[i].__getHtmlCode());
		window._rtecliphtml = this.__filterForCutCopy(sb.join(""));
	}

	this.__deleteaftercut = jsml.msieall;

	this.__handleCut = function (e) {
		var tn = this.__isSelectedInSameTextNode();
		if (tn) {
			var core = this;
			$rte.SafeSetTimeout(function () {
				tn.__syncViewToText();
				core.__rangeSyncFromDom();
			}, 1)
			return;
		}

		var nodes = this.__cloneRangeNodes();

		if (jsml.msieall && nodes.length == 1 && nodes[0].IsControl()) {
			var sp = this.__saveLogContent(true);
			this.__rangeSyncToDom(true);
			$rte.SafeSetTimeout(this.delegate(function () {
				this.__loadLogIndex(sp);
				this.__deleteSelection();
			}), 10);
			return;
		}

		if (!this.__deleteaftercut) {
			this.__deleteSelection();

			this.__saveLogContent(true);
		}

		this.__putCutCopyDiv(nodes, true);
	}

	this.__handleCopy = function (e) {
		if (this.__isSelectedInSameTextNode())
			return;

		var nodes = this.__cloneRangeNodes();

		this.__putCutCopyDiv(nodes);
	}

	this.__initpastediv = function (temp) {
		if (jsml.msie5678 && temp)
			return this.__ccpdiv;
		if (!jsml.msie5678 && !temp)
			return;

		var ccpdiv = this.__win.document.createElement("DIV");
		jsml.set_opacity(ccpdiv, 1);
		ccpdiv.style.position = 'absolute';
		ccpdiv.style.left = '-10000px';
		ccpdiv.setAttribute('data-rteccpdiv', 'rte');
		ccpdiv.contentEditable = true;
		ccpdiv.setAttribute("contenteditable", "true");

		if (jsml.msie5678) {
			this.__ccpdiv = ccpdiv;
		}
		else {
			ccpdiv.istemp = true;
		}

		this.__win.document.body.appendChild(ccpdiv);

		return ccpdiv;
	}
	this.__releaseccpdiv = function (ccpdiv) {
		if (ccpdiv.istemp) {
			this.__win.document.body.removeChild(ccpdiv);
		}
	}

	this.__handlePaste = function (e) {


		function ReaderLoad(e) {
			var img = new $rte.GenericElement("img");
			img.__setAttribute("src", e.target.result);
			this.__insertNode(img, true);
		}

		if (e && e.clipboardData && e.clipboardData.items && e.clipboardData.items.length && e.clipboardData.items[0].type == "image/png") {
			var blog = e.clipboardData.items[0].getAsFile();
			var reader = new FileReader();
			reader.onload = this.delegate(ReaderLoad);
			reader.readAsDataURL(blog);
			e.Cancel();
			return;
		}

		if (window._rtecliphtml) {
			if (e) e.Cancel();
			this.__insertHtmlCode(window._rtecliphtml);
			return;
		}

		if (jsml.bodymixmode && navigator.userAgent.indexOf("Macintosh") == -1)
			return this.__mixSyncCheck();

		this.__saveLogSelection();
		var win = this.__win;
		var ccpdiv = this.__initpastediv(true);
		ccpdiv.innerHTML = '<span>waitingforpaste' + new Date().getTime() + '</span>';

		var html1 = ccpdiv.innerHTML;

		this.__startSetSelection();
		try {
			if (jsml.msieall) {
				var r = win.document.selection.createRange();
				r.moveToElementText(ccpdiv.firstChild);
				r.select();
			}
			else {
				Browser_SetPointInside(win, ccpdiv, 0);
				Browser_SetRangeInside(win, ccpdiv, 1);
			}
		}
		catch (x) {
			this.__releaseccpdiv(ccpdiv);
			return;
		}
		finally {
			this.__stopSetSelection();
		}

		//this.__trace("waiting pasting..");

		this.__acceptingPaste = true;

		$rte.SafeSetTimeout(this.delegate(function () {
			this.__acceptingPaste = false;

			var html2 = null;
			//fix the chrome bug..
			var arr = [];
			for (var i = 0; i < ccpdiv.childNodes.length; i++)
				arr.push(ccpdiv.childNodes.item(i));
			for (var ai = 0; ai < arr.length; ai++) {
				var node = arr[ai];
				if (node.nodeType != 1) continue;
				if (node.getAttribute('data-rteccpdiv') != 'rte')
					continue;
				while (node.childNodes.length)
					ccpdiv.insertBefore(node.childNodes.item(0), node);
				//ccpdiv.insertBefore(this.__win.document.createElement("br"),node);
				ccpdiv.removeChild(node);
			}
			var html2 = ccpdiv.innerHTML.replace(/\<br\>$/g, '');

			this.__releaseccpdiv(ccpdiv);

			//this.__trace("accept pasting.. same? "+(html2==html1));

			if (html1 == html2)
				return this.__loadLogSelection()

			html = this.FilterByPasteCommand(html2)
			this.__loadLogSelection();//FilterByPasteCommand may use confirm() and make the selection be changed.
			this.__insertHtmlCode(html);
			this.__rangeSyncToDom(true);
			this.__saveLogContent(true);
			this.Focus();

			//$rte.SafeSetTimeout(this.delegate(this.__scrollIntoView),1);
		}), 100);
	}

	this.ExecPaste = function (cmd, element) {
		if (!this.__config.allowiepaste || !jsml.msieall) {
			this.Focus();
			this._invokeUIRequest(cmd, element);
			return;
		}
		var win = window;
		var ccpdiv = win.document.createElement("DIV");
		ccpdiv.style.position = 'absolute';
		ccpdiv.style.left = '-10000px';

		ccpdiv.innerHTML = 'waitingforpaste' + new Date().getTime();
		win.document.body.appendChild(ccpdiv);
		var html1 = ccpdiv.innerHTML;

		this.__startSetSelection();
		try {
			Browser_SetPointInside(win, ccpdiv, 0);
			Browser_SetRangeInside(win, ccpdiv, ccpdiv.childNodes.length);
		}
		finally {
			this.__stopSetSelection();
		}

		//this.__trace("waiting pasting..");

		ccpdiv.setAttribute("contenteditable", "true");
		ccpdiv.contentEditable = true;
		win.focus();
		win.document.execCommand("paste");

		$rte.SafeSetTimeout(this.delegate(function () {
			var html2 = ccpdiv.innerHTML
			win.document.body.removeChild(ccpdiv);

			//this.__trace("accept pasting.."+(html2==html1));

			if (html1 != html2) {
				//succeed!,, check the 
				html2 = this.FilterByPasteCommand(html2, cmd);
				this.__insertHtmlCode(html2);
				this.__rangeSyncToDom(true);
				this.__saveLogContent(true);
				this.Focus();
				return;
			}

			this.Focus();
			this._invokeUIRequest(cmd, element);

		}), 1);
	}

	this.FilterByPasteCommand = function (html, cmd) {

		var pc = this.__config.paste_default_command;
		if (!cmd) cmd = pc;
		if (cmd) cmd = cmd.toLowerCase();

		if (cmd == "disabled")
			return "";

		if (cmd == "pastepuretext")
			cmd = "pastetext";
		if (pc == "confirmword" && cmd == "paste")
			cmd = "confirmword";

		html = this.__restorePasteHtml(html);

		//alert(html);

		html = html.replace(/(\<[^\>]*)\sClass\="Apple-[^"\>]*"([^\>]*\>)/ig, '$1$2');

		var tabkeyhtml = this.__config.tabkeyhtml
		if (tabkeyhtml.indexOf('white-space') == -1) {
			html = html.replace(/\<span\sstyle\=\"white\-space\:pre\"\>(\t+)\<\/span\>/g, function (a, b, c) {
				return b.replace(/\t/g, tabkeyhtml);
			});
		}

		//html = this.__filterForAllPaste(html, cmd);//#1

		if (cmd == "confirmword" && this.__detectWordContent(html)) {
			if (!$rte.__confirmwordresult) {
				$rte.__confirmwordresult = confirm(this.GetLangText("msg_confirmword")) ? "yes" : "no";
				$rte.SafeSetTimeout(this.delegate(function () {
					$rte.__confirmwordresult = null;
				}), 1000);
			}
			if ($rte.__confirmwordresult == "yes") cmd = "pasteword";
		}

		if (cmd == "pastetext")
			html = this.__filterForPasteText(html);

		if (cmd == "pasteword")
			html = this.__filterForPasteWord(html);

		html = this.__filterForAllPaste(html, cmd);//#2

		return html;
	}

	this.__filterForDrop = function (html) {
		html = html.replace(/<\/dragfragment>/g, "");
		return this.__filterForAllPaste(html, "drop");
	}



	this.__handleDragStart = function (e) {
		if (jsml.bodymixmode)
			return this.__mixSyncCheck();

		var core = this;
		var df = e.dataTransfer;

		core.__dragsavepoint = core.__saveLogContent();

		var html;

		if (core.GetSelectionType() == "Control") {
			html = core.GetPointNode().__getHtmlCode();
		}
		else {
			html = core.GetRangePreviewHTML();
		}

		function SetFrag() {
			core.__deleteSelection(false, "frag");
			var nodes = _deletednodes;;
			var frag = new $rte.CodeFragElement("dragfragment");
			frag.__setRuntimeAttribute("style", "cursor:default", "dragfragment");
			for (var i = 0; i < nodes.length; i++)
				frag.__appendChild(nodes[i]);

			core.InsertNode(frag);
			core.SelectContent(frag);
			core.__rangeSyncToDom(true);
			core.__dragfragment = frag;
		}

		df.effectAllowed = "copyMove";
		//df.dropEffect="move";
		if (!jsml.msieall) {

			df.setData("text/html", html);
			$rte.SafeSetTimeout(SetFrag, 1);
			return;
		}

		//		core.__iedragging=1;
		//		if(jsml.msie10p)
		//		{
		//			$rte.SafeSetTimeout(function()
		//			{
		//				core.__deleteSelection();
		//			},1);
		//		}
		//		else
		//		{
		//			core.__deleteSelection();
		//		}

		function cancelit() {
			var sp = core.__dragsavepoint;
			if (typeof (sp) == "number") {
				core.__dragsavepoint = null;
				core.LoadLogIndex(sp);
			}
			core.__dragfragment = null;
		}

		e.Cancel();
		SetFrag();
		core.__startDragControl(e, core.__dragfragment, cancelit);
		return;





		var doc = core.__win.document;
		var div = null;

		function EnsureDiv(e) {
			if (div) return;
			div = doc.createElement("div");
			div.setAttribute("contenteditable", "false");
			div.contentEditable = false;
			div.style.cssText = "position:absolute;width:80px;height:70pxpx;cursor:default;border:dashed 1px black;";
			div.innerHTML = '<div style="border:dashed 1px darkblue;margin-top:48px;margin-left:35px;width:16px;height:10px;font-size:1px;">&nbsp;</div>';
			doc.body.appendChild(div);
		}

		function SetDivPos(e) {
			var t = Math.max(doc.body.scrollTop, doc.documentElement.scrollTop)
			var l = Math.max(doc.body.scrollLeft, doc.documentElement.scrollLeft)

			div.style.left = l + e.clientX - 30 + "px";
			div.style.top = t + e.clientY - 30 + "px";
		}




		core.__draghandler = {
			oncancel: function (e) {
				$rte.SafeSetTimeout(cancelit, 1);
			}
			,
			onmouseup: function (e) {
				$rte.SafeSetTimeout(cancelit, 1);
			}
			,
			onmousemove: function (e) {
				EnsureDiv(e)
				SetDivPos(e)
			}
		}

	}

	this.__handleDragOver = function (e) {
		e.dataTransfer.effectAllowed = "copyMove";

		var domnode = e.target;
	}
	this.__handleDragEnd = function (e) {
		if (jsml.bodymixmode)
			return this.__mixSyncCheck();

		var core = this;

		core.__iedragging = 0;
		$rte.SafeSetTimeout(function () {
			var sp = core.__dragsavepoint;
			if (typeof (sp) == "number") {
				core.__dragsavepoint = null;
				core.LoadLogIndex(sp);
			}
		}, 11);
	}
	this.__handleDragSelectionChange = function (e) {
		if (jsml.bodymixmode)
			return this.__mixSyncCheck();

		var core = this;
		if (!core.__iedragging) return;
		core.__iedragging++;
		if (core.__iedragging > 2) {
			this.__handleDragEnd(e);
		}
	}

	this.__handleDrop = function (e) {
		if (jsml.bodymixmode)
			return this.__mixSyncCheck(null, true);

		var core = this;
		var sp;
		if (typeof (core.__dragsavepoint) == "number")
			sp = core.__dragsavepoint;
		else
			sp = core.__saveLogContent();

		core.__dragsavepoint = null;

		function OnDropCancel() {
			core.__loadLogIndex(sp, true)
			core.__rangeSyncToDom(true);
			core.__dragfragment = null;
			//core.__trace("OnDropCancel");
			$rte.SafeSetTimeout(function () { core.Focus(); }, 300);
		}
		function OnDropComplete() {
			if (core.__dragfragment)
				core.__dragfragment.__removeNode(true);
			core.__saveLogIndex(sp + 1);
			core.__loadLogIndex(sp + 1, true);
			core.__rangeSyncToDom(true);
			core.__dragfragment = null;
			//core.__trace("OnDropComplete");
			$rte.SafeSetTimeout(function () { core.Focus(); }, 300);
		}
		$rte.SafeSetTimeout(function () {
			var pno = Browser_GetPointNodeOffset(core.__win);
			var rno = Browser_GetRangeNodeOffset(core.__win);
			var node = core.__getNodeFromDom(pno.node, true, true);

			if (node == null) {
				OnDropCancel();
				return;
			}

			//core.__trace("drop to "+node.__namelower+","+pno.node.nodeName);

			if (node.nodeType == 3) {
				var html = core.__filterForDrop(node.__viewnode.innerHTML);
				if (html.indexOf('<') == -1) {
					node.__setHtmlCode(html, true);
					core.__rangeSyncFromDom();
					//core.__trace("drop pure text");
					OnDropComplete();
				}
				else {
					var nodes = core.__parseHtmlCode(html);
					var p = node.__parent;
					for (var i = 0; i < nodes.length; i++)
						p.__insertBefore(nodes[i], node);
					node.__removeNode(true);
					//TODO:make selection
					//p.__reloadContentView();
					//core.__selectNone();
					//core.__setPointInside(p.__nodes[p.__nodes.length-1],0);
					//core.__trace("drop into text");
					OnDropComplete();
				}
				return;
			}

			if (!node.__nodes) {
				OnDropCancel()
				return;
			}

			var cns = node.__viewnode.childNodes;

			var pnopnode = pno.node;
			while (pnopnode.parentNode && !pnopnode.parentNode.__jsnode)
				pnopnode = pnopnode.parentNode;

			var pnopp = pnopnode.parentNode;
			var ppindex = 0;
			for (var i = 0; i < pnopp.childNodes.length; i++)
				if (pnopp.childNodes.item(i) == pnopnode)
					ppindex = i;
			ppindex--;

			for (var j = 0; j < node.__nodes.length; j++) {
				var jnode = node.__nodes[j];
				if (jnode.__namelower == "dragfragment" && jnode.__viewnode.parentNode == null) {
					jnode.__removeNode(true);
				}
			}

			var start = ppindex;
			for (; start < node.__nodes.length; start++) {
				if (node.__nodes[start].__viewnode != cns.item(start))
					break;
			}

			//core.__trace("drop cn "+ppindex+"/"+cns.length+" : "+start+"/"+node.__nodes.length);

			var jstart = start;
			var leftsplited = false;
			var splitedrtenode = null;
			var splitedrtenodedetached = false;
			if (ppindex == start) {
				leftsplited = cns.item(start);
				splitedrtenode = node.__nodes[start];
				splitedrtenodedetached = !splitedrtenode.__viewnode.parentNode;
				jstart++;
			}

			var arr = [];
			for (var j = jstart; j < cns.length; j++) {
				if (cns.item(j).__jsnode)
					break;
				if (cns.item(j) == core.__hiddenfloatdiv)
					break;
				arr.push(cns.item(j));
			}
			var div = core.__win.document.createElement("DIV");
			for (var j = 0; j < arr.length; j++) {
				div.appendChild(arr[j]);
			}

			var nodes;
			if (core.__dragfragment) {
				nodes = core.__dragfragment.__nodes.concat();
			}
			else {
				nodes = core.__parseHtmlCode(core.__filterForDrop(div.innerHTML));
			}


			if (nodes.length == 0) {
				//core.__trace("drop no nodes "+start+","+cns.length);
				OnDropCancel();
				return;
			}

			var node0 = nodes[0];
			var nodel = nodes[nodes.length - 1];

			//core.__trace("drop to "+","+start+","+nodes.length+","+(leftsplited?leftsplited.nodeName:'nosplit')+","+nodes[0].__getHtmlCode());


			try {

				var splitnodes;
				if (leftsplited) {
					splitnodes = core.__parseHtmlCode(leftsplited.innerHTML);
					nodes = splitnodes.concat(nodes);
					node.__viewnode.removeChild(leftsplited);
				}

				if (core.__dragfragment && splitedrtenode && splitedrtenodedetached) {
					splitedrtenode.__removeNode(true);
					nodes.push(splitedrtenode);
					var lefttext = leftsplited.innerText || leftsplited.textContent;
					splitedrtenode.__setText(splitedrtenode.__text.substring(lefttext.length));
				}

				for (var k = 0; k < nodes.length; k++) {
					//TODO:node.__nodes[start+k] is detached?
					node.__insertAt(nodes[k], start + k);
				}


				if (splitedrtenode && !splitedrtenodedetached && splitedrtenode.nodeType == 3)
					splitedrtenode.__syncViewToText();
			}
			catch (x) {
				OnDropCancel();
				return;
			}


			node.__reloadContentView();
			core.__setPointBefore(node0);
			core.__setRangeAfter(nodel);
			OnDropComplete();

		}, 0);
	}

	this.GetDragControl = function () {
		return this.__dragcontrol;
	}

	this.__stopDragControl = function (e) {
		$rte.SafeSetTimeout(this.delegate(this.__cleanDragControl), 100);
	}
	this.__startDragControl = function (e, node, cancelfunc) {
		if (this.__config.readonly || !this.__config.enabledragdrop)
			return;

		if (!node) {
			if (this.__getSelectionType() != "Control")
				return;
			node = this.__getPointNode();
		}

		this.__dragcontrol = node;
		this.__dragstarttime = new Date().getTime();
		this.__dragcontrolcancel = cancelfunc;
	}

	this.__onctrlDragControl = function (e) {
		var img = this.__dragfloatimg;
		if (!img) return;
		this.__updateDragImageSrc(img, e);
	}
	this.__updateDragImageSrc = function (img, e) {
		if (img.dragimagestate == "1") {
			if (e.ctrlKey)
				return;
		}
		if (img.dragimagestate == "0") {
			if (!e.ctrlKey)
				return;
		}

		var file = e.ctrlKey ? "dragcopy.gif" : "dragmove.gif";
		img.setAttribute("src", this.__config.folder + "images/" + file);
		img.dragimagestate = e.ctrlKey ? "1" : "0";
	}

	this.__onmoveDragControl = function (e) {
		if (!this.__dragcontrol) return;

		var img = this.__dragfloatimg;
		var selected = this.__selectForMouse(e);
		if (selected && this.__getSelectionType() == "Point" && !this.__dragcontrol.Contains(this.__getPointNode())) {
			if (!img) {
				this.__dragfloatimg = img = document.createElement("img");
				this.__updateDragImageSrc(img, e);
				img.style.position = 'absolute'
				img.style.zIndex = 7777777;
				document.body.insertBefore(img, document.body.firstChild);

				this.__dragcontrol.__setRuntimeAttribute("class", "dragcontrol", "dragcontrol");
				this.__bodynode.__setRuntimeAttribute("class", "dragcontrol", "dragcontrol");
			}
			else {
				this.__updateDragImageSrc(img, e);
			}
			var pos = jsml.get_scrollposition(this.__frame);
			var offset = jsml.msieall ? 8 : 12;
			var x = pos.left + e.clientX + offset;
			var y = pos.top + e.clientY + offset;
			img.style.left = x + "px";
			img.style.top = y + "px";
			img.style.display = '';
		}
		else {
			if (img) img.style.display = 'none';
		}
	}
	this.__cleanDragControl = function () {
		this.__bodynode.__setRuntimeAttribute("class", null, "dragcontrol");

		var node = this.__dragcontrol;
		if (node) {
			this.__dragcontrol = null;
			node.__setRuntimeAttribute("class", null, "dragcontrol");
		}

		var img = this.__dragfloatimg;
		if (img) {
			this.__dragfloatimg = null;
			img.parentNode.removeChild(img);
		}

		this.__dragcontrolcancel = null;
	}
	this.__onupDragControl = function (e) {
		if (!this.__dragcontrol) return;

		var func = this.__dragcontrolcancel;

		var node = this.__dragcontrol;
		this.__cleanDragControl();

		var upnode = this.__getNodeFromDom(e.srcElement);

		if (node != upnode && this.__getSelectionType() == "Point" && !node.Contains(this.__getPointNode())) {
			if (e.button == 2) {
				if (this.ShowDragDropMenu(e, node))
					return true;
			}

			var div = new $rte.ContainerElement("div");
			this.__insertNode(div);
			var srcnode = node;
			if (e.ctrlKey) {
				node = srcnode._cloneNode(true);
			}
			else {
				node.__removeNode(true, true);
			}
			div.__parent.__insertBefore(node, div);
			div.__removeNode(false);
			if (node.__namelower == "dragfragment") {
				var p = node.__parent;
				var index = p.__indexOf(node);
				var count = node.__nodes.length;
				node.__removeNode(false);
				this.__setPointInside(p, index);
				this.__setRangeInside(p, index + count);
				if (node != srcnode) {
					srcnode.__removeNode(false);
				}
			}
			else {
				this.__selectControl(node);
			}
			this.__rangeSyncToDom(true);
		}
		else {
			this.__selectControl(node);
			this.__rangeSyncToDom(true);
			if (func) func();
		}
		return true;
	}
	this.__cancelDragControl = function () {
		if (!this.__dragcontrol) return;
		var func = this.__dragcontrolcancel;
		var node = this.__dragcontrol;
		this.__cleanDragControl();
		this.__selectControl(node);
		this.__rangeSyncToDom(true);
		if (func) func();
		return true;
	}

	if (jsml.msieall)
		this.__selectForMouse = function (e) {
			var domnode = e.srcElement;
			if (!domnode) return;
			var node = this.__getNodeFromDom(domnode, true);
			if (!node) return;

			var r = this.__win.document.body.createTextRange();
			;
			try {
				r.moveToPoint(e.clientX, e.clientY);
				var rn = r.parentElement();

				if (!node.__viewnode.contains(rn))
					return;

				r.select();
				this.__rangeSyncFromDom(true);
				return true;
			}
			catch (x) {
				return false;
			}
		}
	else
		this.__selectForMouse = function (e) {
			var domnode = e.srcElement;

			if (!domnode) return;
			var node = this.__getNodeFromDom(domnode, true);
			if (!node) return;

			var x = e.clientX || 0;
			var y = e.clientY || 0;
			if (e.changedTouches) {
				var t = e.changedTouches[0];
				x = t.clientX;
				y = t.clientY;
			}

			return this.__selectForPoint_NonIE(node, x, y);
		}

	this.__selectForPoint_NonIE = function (node, x, y) {
		var win = this.__win;
		var err;

		var z = 1000 * 1000;
		var p = 0;
		var n = null;

		var r = win.document.createRange();

		function CheckRange(tn, i) {
			var rect = r.getClientRects()[0];
			if (!rect)
				return;
			var xx = Math.abs(x - rect.left);
			var yy = Math.abs(y - rect.top);

			var zzz = xx * xx + yy * yy * 49
			if (zzz < z) {
				z = zzz;
				p = i;
				n = tn;
			}
		}

		function ScanNode(node) {
			var oldz = z;
			if (node.nodeType == 3) {
				var len = node.__text.length;
				for (var i = 0; i <= len; i++) {
					r.setStart(node.__viewnode.firstChild, i);
					CheckRange(node, i);
				}
			}
			else if (node.__nodes) {
				var nl = node.__nodes.length;
				if (nl == 1)
					return ScanNode(node.__nodes[0]);
				for (var i = 0; i < nl; i++) {
					r.setStart(node.__viewnode, i);
					CheckRange(node, i);
					ScanNode(node.__nodes[i]);
				}
			}
			if (oldz == z && node.IsControl()) {
				var ctrl = node.__viewnode;
				var pos = jsml.get_clientposition(ctrl, win);
				if (x > pos.left && x < pos.left + ctrl.offsetWidth && y > pos.top && y < pos.top + ctrl.offsetHeight) {
					z = 0;
					p = 0;
					n = node;
				}
			}
		}

		try {
			if (node.__nodes && node.__nodes.length == 0 && !node.IsControl()) {
				n = node;
			}
			else {
				ScanNode(node);
			}
			if (n) {
				if (n.IsControl()) {
					this.__selectControl(n);
				}
				else if (this.__israngeselect) {
					var rspn = this.__rangeselectpointnode;
					var rspo = this.__rangeselectpointoffset;
					if (this.__comparePoint(n, p, rspn, rspo) < 0) {
						this.__setPointInside(n, p);
						this.__setRangeInside(rspn, rspo);
					}
					else {
						this.__setPointInside(rspn, rspo);
						this.__setRangeInside(n, p);
					}
				}
				else {
					this.__setPointInside(n, p);
				}
				this.__rangeSyncToDom(true);
				return true;
			}
		}
		catch (x) {
			err = x.message;
		}

		if (err) document.title = "sfm:" + err;
	}


	this.__selectForPoint = function (x, y) {
		var node = null;
		var ns = this.__bodynode.__nodes;
		var l = ns.length;
		for (var i = 0; i < l; i++) {
			var n = ns[i];
			var vn = n.__viewnode;
			var rs = this.__getClientRects(vn);
			for (var ri = 0; ri < rs.length; ri++) {
				var rect = rs[ri];
				if (x < rect.left) continue;
				if (y < rect.top) continue;
				if (x > rect.left + rect.width) continue;
				if (y > rect.top + rect.height) continue;
				node = n;
				break;
			}
		}
		if (!node) {
			node = this.__bodynode;
		}
		this.__selectForPoint_NonIE(node, x, y);
	}
	this.__getClientRects = function (vn) {
		if (vn.getClientRects)
			return vn.getClientRects();
		var pos = jsml.get_clientposition(vn, this.__win);
		pos.width = vn.offsetWidth;
		pos.height = vn.offsetHeight;
		return [pos];
	}
	this.SelectForPoint = this.__selectForPoint;


	this.ToggleRangeSelect = function () {
		if (!this.__israngeselect)
			this.StartRangeSelect();
		else
			this.StopRangeSelect();
	}
	this.IsRangeSelect = function () {
		return !!this.__israngeselect;
	}
	this.StartRangeSelect = function () {
		if (this.__israngeselect) return;

		this.__rangeselectpointnode = this.__getPointNode();
		this.__rangeselectpointoffset = this.__getPointOffset();

		if (!this.__verifySelectionType("Point", "Range"))
			return;

		if (!this.__rangeeventinited) {
			this.AttachEvent("TextChanged", this.delegate(function () {
				this.StopRangeSelect();
			}));
			this.__rangeeventinited = true;
		}

		this.__israngeselect = true;


		this._broadcastEvent("RangeSelectChanged");
	}
	this.StopRangeSelect = function () {
		if (!this.__israngeselect) return;
		this.__israngeselect = false;
		this._broadcastEvent("RangeSelectChanged");
	}
	this.CollapseRangeSelect = function () {
		if (!this.__israngeselect) return;
		this.__setPointInside(this.__rangeselectpointnode, this.__rangeselectpointoffset);
		this.__rangeSyncToDom(true);
	}
	this.GetRangeSelectNode = function () {
		if (!this.__israngeselect) return;
		return this.__rangeselectpointnode;
	}
	this.GetRangeSelectOffset = function () {
		if (!this.__israngeselect) return;
		return this.__rangeselectpointoffset;
	}






	this.__localtest = function () {
		//alert(this.__bodynode)
	}









	this.GetContentHeight = function () {
		if (jsml.bodydivmode)
			return this.__winbody.offsetHeight;
		return jsml.get_scrollposition(this.__laststaticdiv, this.__win).top + this.__laststaticdiv.offsetHeight;
	}
	this.AddDesignElement = function (element) {
		this.__laststaticdiv.parentNode.insertBefore(element, this.__laststaticdiv);
	}
	this.GetRangeRects = function (r) {
		if (!r) return [];

		function isequals(a, b) {
			return Math.abs(a - b) < 4;
		}

		var rs = r.getClientRects();
		var rss = [];
		var fac = 8;
		for (var i = 0; i < rs.length; i++) {
			var nr = rs.item(i);

			nr = { top: nr.top, left: nr.left, width: nr.width, height: nr.height };
			if (i == 0) {
				rss.push(nr);
				continue;
			}
			lr = rss[rss.length - 1];
			if (Math.abs(lr.left - nr.left) < fac) {
				if (isequals(nr.left, lr.left) && isequals(nr.top, lr.top) && isequals(nr.height, lr.height) && nr.width < lr.width) {
					rss[rss.length - 1] = nr;
					continue;
				}

				var lrth = lr.top + lr.height;
				var nrth = nr.top + nr.height;
				if (nr.top > lr.top && nr.top < lrth || nrth > lr.top && nrth < lrth
					|| lr.top > nr.top && lr.top < nrth || lrth > nr.top && lrth < nrth) {
					rss[rss.length - 1] = nr;
					continue;
				}
			}
			rss.push(nr);
		}
		rs = rss;
		rss = [];
		for (var i = 0; i < rs.length; i++) {
			var nr = rs[i];
			if (i == 0) {
				rss.push(nr);
				continue;
			}
			lr = rss[rss.length - 1];
			if (lr.top == nr.top && lr.left + lr.width == nr.left) {
				lr.width += nr.width;
				continue;
			}
			rss.push(nr);
		}
		return rss;
	}

	this.HideSelectionDecorator = function () {
		this.__sdrootdivhide = true;
		if (this.__sdrootdiv) this.__sdrootdiv.style.display = 'none';
	}
	this.ShowSelectionDecorator = function () {
		this.__sdrootdivhide = false;
		if (this.__sdrootdiv) this.__sdrootdiv.style.display = '';
	}
	this.__InitSelectionDecorator = function () {
		var editor = this;
		var rootdiv = null;
		var divs = [];
		var pointdiv;

		var flashtimer;
		var flashstate = 0;
		var flashtimeout1 = 550;
		var flashtimeout2 = 550;
		function flashpointdiv() {
			if (!pointdiv) return;
			flashstate++;
			if (flashstate % 2 == 1) {
				pointdiv.style.display = 'none';
				flashtimer = $rte.SafeSetTimeout(flashpointdiv, flashtimeout2);
			}
			else {
				pointdiv.style.display = '';
				flashtimer = $rte.SafeSetTimeout(flashpointdiv, flashtimeout1);
			}
		}

		function cleardivs() {
			if (rootdiv) rootdiv.innerHTML = "";
			divs = [];
		}
		function insertdiv(fp, doc, st, rect) {
			if (rootdiv == null) {
				rootdiv = document.createElement("div");
				rootdiv.style.position = "absolute";
				rootdiv.style.top = "0px";
				rootdiv.style.left = "0px";
				rootdiv.style.height = "0px";
				rootdiv.style.zIndex = editor.__config.fullscreen_zindex + 1;
				document.body.insertBefore(rootdiv, document.body.firstChild);
				editor.__sdrootdiv = rootdiv;
				if (editor.__sdrootdivhide) rootdiv.style.display = 'none';
			}

			var div = document.createElement("DIV");
			div.style.zIndex = editor.__config.fullscreen_zindex + 1;
			div.style.position = "absolute";
			div.style.border = 'solid 1px orange';
			div.style.top = fp.top + rect.top + "px";
			div.style.left = fp.left + rect.left + "px";
			div.style.width = rect.width + "px";
			div.style.height = rect.height + "px";
			rootdiv.appendChild(div);
			divs.push(div);
			return div;
		}



		function updateselection() {
			pointdiv = null;
			clearTimeout(flashtimer);
			cleardivs();

			var seltype = editor.GetSelectionType();
			if (seltype != "Point" && seltype != "Range")
				return;

			var sel = editor.__win.getSelection();
			if (sel.rangeCount == 0) {
				editor.RangeSyncToDom();
				if (sel.rangeCount == 0)
					return;
			}

			var rss = editor.GetRangeRects(sel.getRangeAt(0));
			if (rss.length == 0)
				return;

			var fp = jsml.get_scrollposition(editor.__config.skin_frame);
			var doc = editor.__win.document;
			var st = doc.body.scrollTop || doc.documentElement.scrollTop || 0;

			if (seltype == "Point") {
				var rect = rss[0];
				pointdiv = insertdiv(fp, doc, st, { top: rect.top - 2, left: rect.left - 1, width: 0, height: rect.height + 2 })
				flashtimer = $rte.SafeSetTimeout(flashpointdiv, flashtimeout1);
				flashstate = 0;
				return;
			}

			for (var i = 0; i < rss.length; i++) {
				var rect = rss[i];
				//top
				insertdiv(fp, doc, st, { top: rect.top - 3, left: rect.left - 2, width: rect.width + 2, height: 1 })
				//bottom
				insertdiv(fp, doc, st, { top: rect.top + rect.height, left: rect.left - 2, width: rect.width + 2, height: 1 })
				//left
				insertdiv(fp, doc, st, { top: rect.top - 2, left: rect.left - 3, width: 1, height: rect.height + 2 })
				//right
				insertdiv(fp, doc, st, { top: rect.top - 2, left: rect.left + rect.width, width: 1, height: rect.height + 2 })
			}

		}

		editor.AttachEvent("SelectionChanged", function () {
			$rte.SafeSetTimeout(updateselection, 11);
		});

	}

	this.GetFrame = function () {
		return this.__frame;
	}
	this.GetWindow = function () {
		return this.__win;
	}

	this.__getfocused = function () {
		if (!this.__isfocused) return false;
		if (!jsml.msie5678) return true;
		var sel = this.__win.document.selection;
		try {
			var rc = sel.createRange();
		}
		catch (x) {
			return false;
		}
		if (sel.type != "Control")
			return true;
		var ctrl;
		if (rc.htmlText)//bug?
			ctrl = rc.parentElement();
		else
			ctrl = rc.item(0);
		if (ctrl != this.__hiddenfloatdiv)
			return true;
		this.__isfocused = false;
		//this.__trace("focused=false")
		return false;
	}
	this.IsFocused = function () {
		return this.__getfocused();
	}
	this.Focus = function () {
		this.__focuscalltime = new Date().getTime();

		if (this.__tabmode == "edit") {
			var force = !this.__getfocused();
			for (var i = 0; i < 2; i++) {
				this.__win.focus();
				//if(!this.__getfocused())
				//{
				//	this.__fucosing=true;
				//	var core=this;$rte.SafeSetTimeout(function(){core.__fucosing=false;});
				//}

				try {
					this.__rangeSyncToDom(force);
				}
				catch (x) {
					this.__saveAndReload();
					//TODO:better message
					alert(x.message);
					continue;
				}
				break;
			}

			this._broadcastEvent("EditFocus");
		}
		else {
			this._broadcastEvent("DoFocus");
		}
	}


	function FindNodeBy(ns, func) {
		if (!ns) return;
		for (var i = 0; i < ns.length; i++) {
			var n = ns[i];
			if (func(n))
				return n;
			n = FindNodeBy(n.__nodes, func);
			if (n) return n;
		}
	}

	this.EnsureHeadChildNode = function (func, newfunc, remove) {
		var node = FindNodeBy(this.__docinfo.__nodes, func);
		if (remove) {
			if (node)
				node.__removeNode(true);
			return null;
		}
		if (node)
			return node;
		if (!this.__docinfo.__nodes) {
			this.__docinfo.__nodes = __parseHTML(this, "<html><head></head><body></body></html>");
			this.__docinfo.__bodynode = FindBodyNode(this.__docinfo.__nodes);
			this.SaveBodyNode();
		}
		var head = FindNodeBy(this.__docinfo.__nodes, function (node) { return node.__namelower == "head" });
		if (!head) {
			var htmlnode = FindNodeBy(this.__docinfo.__nodes, function (node) { return node.__namelower == "html" });
			if (!htmlnode) {
				htmlnode = new $rte.ContainerElement("html");
				this.__docinfo.__nodes.push(htmlnode);
			}
			head = new $rte.ContainerElement("head");
			htmlnode.__insertAt(head, 0);
		}
		node = newfunc();
		head.__appendChild(node);
		this.__notifyContentChanged();
		return node;
	}

	this.GetPageTitle = function () {
		var t = FindNodeBy(this.__docinfo.__nodes, function (node) { return node.__namelower == "title"; });
		if (!t)
			return "";
		return t.GetInnerText();
	}
	this.SetPageTitle = function (value) {
		t = this.EnsureHeadChildNode(
			function (node) { return node.__namelower == "title"; }
			,
			function () { return new $rte.ContainerElement("title"); }
		);
		if (!t)
			return;
		t.SetInnerText(value);
		this.__notifyContentChanged();
	}

	this.GetPageMeta = function (name) {
		var t = FindNodeBy(this.__docinfo.__nodes
			, function (node) { return node.__namelower == "meta" && (node.__getAttribute("name") || "").toLowerCase() == name.toLowerCase(); }
		);
		if (!t)
			return "";
		return t.__getAttribute("content");
	}
	this.SetPageMeta = function (name, value) {
		t = this.EnsureHeadChildNode(
			function (node) { return node.__namelower == "meta" && (node.__getAttribute("name") || "").toLowerCase() == name.toLowerCase(); }
			,
			function () { var de = new $rte.DataElement("meta"); de.__setAttribute("name", name); return de; }
			,
			!value
		);
		if (!t)
			return;
		t.__setAttribute("content", value);
		this.__notifyContentChanged();
	}

	this.GetPageDescription = function () {
		return this.GetPageMeta("Description");
	}
	this.SetPageDescription = function (value) {
		this.SetPageMeta("Description", value);
	}
	this.GetPageKeywords = function () {
		return this.GetPageMeta("Keywords");
	}
	this.SetPageKeywords = function (value) {
		this.SetPageMeta("Keywords", value);
	}

	this.GetHttpEquiv = function (name) {
		var t = FindNodeBy(this.__docinfo.__nodes
			, function (node) { return node.__namelower == "meta" && (node.__getAttribute("http-equiv") || "").toLowerCase() == name.toLowerCase(); }
		);
		if (!t)
			return "";
		return t.__getAttribute("content");
	}
	this.SetHttpEquiv = function (name, value) {
		t = this.EnsureHeadChildNode(
			function (node) { return node.__namelower == "meta" && (node.__getAttribute("http-equiv") || "").toLowerCase() == name.toLowerCase(); }
			,
			function () { var de = new $rte.DataElement("meta"); de.__setAttribute("http-equiv", name); return de; }
			,
			!value
		);
		if (!t)
			return;
		t.__setAttribute("content", value);
		this.__notifyContentChanged();
	}

	this.GetPageContentType = function () {
		return this.GetHttpEquiv("Content-Type");
	}
	this.SetPageContentType = function (value) {
		this.SetHttpEquiv("Content-Type", value);
	}
	this.GetPageContentLanguage = function () {
		return this.GetHttpEquiv("Content-Language");
	}
	this.SetPageContentLanguage = function (value) {
		this.SetHttpEquiv("Content-Language", value);
	}


	this.GetBodyNode = function () {
		return this.__bodynode;
	}
	this.GetPageNodes = function () {
		return this.__docinfo.__nodes;
	}

	this.SaveBodyNode = function () {
		var dbn = this.__docinfo.__bodynode;
		if (!dbn) return;
		var names = dbn.__getAttributeNames();
		for (var i = 0; i < names.length; i++)
			dbn.__removeAttribute(names[i]);
		dbn.__importAttributes(this.__bodynode);
		this.__notifyContentChanged();
	}

	this.SaveBookmark = function () {
		return this.__saveBookmark();
	}
	this.RestoreBookmark = function (bm) {
		this.__restoreBookmark(bm);
	}
	this.GetSelectionType = function () {
		return this.__getSelectionType();
	}
	this.MoveToDocumentBegin = function () {
		this.__setPointInside(this.__bodynode, 0);
		this.__rangeSyncToDom(true);
	}
	this.MoveToDocumentEnd = function () {
		this.__selectLastTextNode(true, true);
	}
	this.RangeSyncToDom = function () {
		this.__rangeSyncToDom(true);
	}

	this.GetSelectionRoot = function () {
		var seltype = this.__getSelectionType();
		if (seltype == "None")
			return null;
		var node = this.__getPointNode();
		if (seltype == "Point" || seltype == "Control")
			return node;
		var endnode = this.__getRangeNode();

		var root = node;
		while (root && !root.Contains(endnode))
			root = root.__parent;
		return root;
	}
	this.IsIncludedByTag = function (tagname, tn2) {
		if (!tagname) return false;
		tagname = String(tagname).toLowerCase();

		if (tn2) {
			tn2 = String(tn2).toLowerCase();
			for (var node = this.GetSelectionRoot() ; node; node = node.__parent) {
				if (node.__namelower == tagname)
					return node;
				if (node.__namelower == tn2)
					return node;
			}
		}
		else {
			for (var node = this.GetSelectionRoot() ; node; node = node.__parent) {
				if (node.__namelower == tagname)
					return node;
			}
		}
		return null;
	}
	this.GetNodeFromDom = function (a, b, c) {
		return this.__getNodeFromDom(a, b, c);
	}

	this.GetPointNode = function () {
		return this.__getPointNode();
	}
	this.GetPointOffset = function () {
		return this.__getPointOffset();
	}
	this.GetRangeNode = function () {
		return this.__getRangeNode();
	}
	this.GetRangeOffset = function () {
		return this.__getRangeOffset();
	}

	this.SelectControl = function (ctrl) {
		this.__selectControl(ctrl);
	}
	this.SelectContent = function (node) {
		this.__setPointInside(node, 0);
		this.__setRangeInside(node, node.__getMaxOffset());
	}
	this.SetPointInside = this.__setPointInside;
	this.SetRangeInside = this.__setRangeInside;

	this.ExtractRangeNodes = function (delit) {
		return this.__extractRangeNodes(delit);
	}

	this.GetRangePreviewHTML = function (cmd) {
		var nodes = this.__cloneRangeNodes();

		var logic = cmd ? this.__getFormatLogic(cmd) : null;
		if (logic) {
			var ns = [];
			for (var i = 0; i < nodes.length; i++)
				ns = ns.concat(logic.__clean(nodes[i]));
			nodes = ns
		}

		var sb = [];
		for (var i = 0; i < nodes.length; i++)
			sb.push(nodes[i].__getHtmlCode());
		return sb.join("");
	}

	this.ExtractRangeHTML = function (delit) {
		var nodes = this.__extractRangeNodes(delit);
		var sb = [];
		for (var i = 0; i < nodes.length; i++)
			sb.push(nodes[i].__getHtmlCode());
		return sb.join("");
	}

	this.SurroundNode = function (node) {
		return this.__surroundNode(node);
	}
	this.SurroundNodes = function (node) {
		return this.__surroundNodes(node);
	}

	this.RemoveNode = function (node, all) {
		return this.__removeNode(node, all);
	}
	this.DeleteSelection = function (backward, keeproot) {
		return this.__deleteSelection(backward, keeproot);
	}

	this.NotifyUpdateUI = function () {
		this.__notifyUpdateUI();
	}
	this.SaveAndReload = function () {
		this.__saveAndReload();
	}
	this.SaveLogContent = function (force) {
		return this.__saveLogContent(force);
	}
	this.LoadLogIndex = function (index, force) {
		this.__loadLogIndex(index);
	}
	this.SaveLogIndex = function (index) {
		this.__saveLogIndex(index);
	}
	this.InsertNode = function (node) {
		return this.__insertNode(node);
	}
	this.InsertText = function (text, bstart) {
		var tn = new $rte.TextNode();
		tn.__setText(text);
		this.__insertNode(tn);
		if (bstart)
			this.__setPointBefore(tn);
		else
			this.__setPointAfter(tn);
		this.__rangeSyncToDom();
	}

	this.InsertHTML = function (html, select) {
		if (this.__tabmode == "edit")
			return this.__insertHtmlCode(html, select);
		this._broadcastEvent("TCPaste", [html, select]);
	}
	this.PasteHTML = this.InsertHTML;
	this.AppendHTML = function (html) {
		if (this.__tabmode == "edit")
			return this.__appendHtmlCode(html);
		this._broadcastEvent("TCAppend", [html]);
	}

	this.GetText = function () {
		return this.GetHtmlCode();
	}
	this.SetText = function (value) {
		this.SetHtmlCode(value);
	}
	this.ParseHtmlCode = function (html) {
		return this.__parseHtmlCode(html);
	}
	this.GetHtmlCode = function () {
		if (this.__tabmode == "edit")
			return this.__getEditHtml();
		return this.__codehtml;
	}
	this.__setHtmlCode = function (value) {
		if (this.__tabmode == "edit") {
			this.__setEditHtml(value);
			this.__selectLastTextNode();
		}
		else {
			value = this.__filterForValue(value);
			if (this.__codehtml == value)
				return;
			this.__codehtml = value;
			this.__codehtmlchanged = true;
			if (this.__hidden) {
				if (this.__config.encodehiddenvalue)
					this.__hidden.value = RTE_Encode(value);
				else
					this.__hidden.value = value;
				this.__config.editorelement.value = value;
			}
			this._broadcastEvent("TextChanged");
		}
	}
	this.SetHtmlCode = this.__setHtmlCode;
	this.IsTabEdit = function () {
		return this.__tabmode == "edit";
	}
	this.IsTabCode = function () {
		return this.__tabmode == "code";
	}
	this.IsTabView = function () {
		return this.__tabmode == "view";
	}

	this.ShowDragDropMenu = function (e, node) {
	}
	this.HandleContextMenu = function (e) {
	}
	this.HandleDoubleClick = function (e) {
	}




	this.FindNextText = function (text, mcase, mword) {
		var res;
		if (jsml.ie11) {
			var node = this.__getRangeNode();
			var offset;
			if (node) {
				offset = this.__getRangeOffset();
			}
			else {
				node = this.__getPointNode();
				offset = this.__getPointOffset();
			}
			if (node) {
				res = Editor_Common_FindTextFromNodeOffset(this.__win, this.__getNodeOffset(node, offset), text, mcase, mword);
			}
		}
		else {
			res = Browser_FindNextText(this.__win, text, mcase, mword);
		}
		if (res)
			this.__rangeSyncFromDom();
		return res;
	}

	function Editor_Common_FindTextFromNodeOffset(win, info, text, mcase, mword) {

		if (!mcase)
			text = text.toLowerCase();

		function IsAnotherChar(str, pos) {
			if (pos < 0 || pos >= str.length)
				return true;
			var c = str.charCodeAt(pos);
			if (c >= 65 && c <= 90) return false;	//A-Z
			if (c >= 97 && c <= 122) return false;;	//a-z
			if (c >= 48 && c <= 57) return false;;	//0-9
			return true;
		}

		function StrIndex(str, pos) {
			if (!mcase)
				str = str.toLowerCase();
			while (true) {
				pos = str.indexOf(text, pos);
				if (pos == -1 || !mword)
					return pos;
				if (IsAnotherChar(str, pos - 1) && IsAnotherChar(str, pos + text.length))
					return pos;
				pos += text.length;
			}
		}

		var node = info.node;
		var offset = info.offset;

		while (true) {

			var p = node.parentNode;
			var pcl = p.childNodes.length;

			if (node.nodeType == 3) {
				var pos = StrIndex(node.nodeValue, offset);
				if (pos != -1) {
					win.focus();
					var sel = win.getSelection();
					var r = win.document.createRange();
					r.setStart(node, pos);
					r.setEnd(node, pos + text.length);
					//document.title = [pos, pos + text.length];
					sel.removeAllRanges();
					sel.addRange(r);
					return true;
				}
			}
			else if (node.nodeType == 1) {
				var nl = node.childNodes.length;
				if (offset < nl) {
					//ENTER NEXT CHILD
					node = node.childNodes.item(offset);
					offset = 0;
					continue;
				}
			}

			var index = -1;
			for (var i = 0; i < pcl; i++) {
				if (p.childNodes.item(i) == node) {
					index = i;
					break;
				}
			}

			index++;
			if (index < pcl) {
				//ENTER NEXT SILBING
				node = p.childNodes.item(index);
				offset = 0;
				continue;
			}

			if (node.nodeName == "BODY")
				break;
			//JUMP TO PARENT
			node = p;
			offset = index;

		}

		return false;
	}

	this.ExecCommand = function (cmd, val1, val2, val3) {
		if (this._broadcastEvent("ExecCommand", arguments) === false)
			return;

		cmd = String(cmd).toLowerCase();

		switch (cmd) {
			case "idle":
			case "none":
				return;
			case "formatcode":
				this.__setHtmlCode(this.__filterForCodeView(this.GetHtmlCode()));
				return;
			case "tabedit":
				this.__changeTabMode("edit");
				return;
			case "tabcode":
				this.__changeTabMode("code");
				return;
			case "tabview":
				this.__changeTabMode("view");
				return;
			case "new":
				this.SetHtmlCode("");
				return;
			case "selectall":
				this.__setPointInside(this.__bodynode, 0, true);
				var len = this.__bodynode.__nodes.length;
				if (len) this.__setRangeInside(this.__bodynode, len);
				this.__rangeSyncToDom();
				return;
			case "selectnone":
				//this.__selectNone();
				this.__setPointInside(this.__bodynode, 0);
				this.__rangeSyncToDom();
				return;
			case "delete":
				this.__deleteSelection();
				return;
			case "cut":
				this.__doCutCopy(true);
				return;
			case "copy":
				this.__doCutCopy(false);
				return;
			case "tc_cut":
				this.__doTCCutCopy(true);
				return;
			case "tc_copy":
				this.__doTCCutCopy(false);
				return;
			case "paste":
			case "pastetext":
			case "pasteword":
				this.ExecPaste(cmd);
				return;
			case "undo":
				return this.__doUndo();
			case "redo":
				return this.__doRedo();
			case "unlink":
				if (this.__verifySelectionType("Range")) {
					this.ExecFormatLogic("link", "!");
				}
				else {
					var link = this.IsIncludedByTag("a");
					if (link) link.RemoveNode(false);
				}
				break;
			case "bold":
			case "italic":
			case "underline":
			case "overline":
			case "linethrough":
			case "superscript":
			case "subscript":
			case "mark":
				this.ExecFormatLogic(cmd, val1, val2, val3);
				this.__rangeSyncToDom();
				break;
			case "forecolor":
			case "backcolor":
			case "fontname":
			case "fontsize":
			case "cssclass":
			case "cssstyle":
				if (val1 == "") val1 = "!"
				if (val1 != null)
					this["current_" + cmd] = val1;
				else
					val1 = this["current_" + cmd] || this.__config["default_" + cmd];
				this.ExecFormatLogic(cmd, val1, val2, val3);
				this.__rangeSyncToDom();
				break;
			case "ucase":
			case "lcase":
				this.__changeCase(cmd == "ucase");
				this.__rangeSyncToDom();
				break;
			case "removeformat":
				this.__removeFormat();
				this.__rangeSyncToDom();
				break;
			case "formatpainterfetch":
				this.__formatPainterFetch();
				break;
			case "formatpainterapply":
				this.__formatPainterApply();
				break;
			case "formatpainterclear":
				this.__formatPainterClear();
				break;
			case "justifyleft":
			case "justifycenter":
			case "justifyright":
			case "justifyfull":
			case "justifynone":
				if (this.__verifySelectionType("Control"))
					return this.__justifyControl(cmd.substring(7));
				if (this.__verifySelectionType("Point", "Range"))
					return this.__justifyParagraph(cmd.substring(7));
				break;
			case "insertorderedlist":
				if (this.__verifySelectionType("Point", "Range"))
					return this.__insertItemListImpl("ol", val1);
				break;
			case "insertunorderedlist":
				if (this.__verifySelectionType("Point", "Range"))
					return this.__insertItemListImpl("ul", val1);
				break;
			case "indent":
				if (this.__verifySelectionType("Point", "Range"))
					this.__inoutdentParagraph(parseInt(config.indentoutdentsize) || 48);
				break;
			case "outdent":
				if (this.__verifySelectionType("Point", "Range"))
					this.__inoutdentParagraph(parseInt(config.indentoutdentsize) || 48, true);
				break;
			case "ltr":
			case "rtl":
				if (this.__verifySelectionType("Point", "Range"))
					this.__toggleDirection(cmd);
				break;
			case "lineheight":
				if (this.__verifySelectionType("Point", "Range"))
					this.__changeLineHeight(val1);
				break;
			case "insertblockquote":
				this.__toggleBlockquote();
				break;
			case "insertbreak":
				this.__handleEnter("br");
				break;
			case "inserthorizontalrule":
				this.__handleEnter("hr");
				break;
			case "inserttopline":
				this.__insertBodyTopLine();
				break;
			case "insertbottomline":
				this.__insertBodyBottomLine();
				break;
			case "insertdiv":
				this.__handleEnter("div");
				break;
			case "insertwbr":
				this.__handleEnter("wbr");
				break;
			case "insertsection":
			case "insertarticle":
			case "insertheader":
			case "insertfooter":
			case "inserthgroup":
			case "insertaside":
				this.__paragraphFormatBlock(cmd.substring(6));
				break;
			case "insertparagraph":
				this.__handleEnter(this.__config.insertparagraph);
				break;
			case "insertpagebreak":
				this.__insertHtmlCode(this.__config.default_code_printbreak);
				break;
			case "formatblock":
				this.__paragraphFormatBlock(val1 || this.__config.insertparagraph);
				break;
			case "insertbox":
				var node = this.__parseHtmlCode(this.__config.default_code_box)[0];
				var nodes = this.__extractRangeNodes(true);
				this.__insertNode(node);
				if (nodes.length) {
					node.SetInnerText("");
					for (var i = 0; i < nodes.length; i++)
						node.__appendChild(nodes[i]);
				}
				this.__setPointInside(node, node.__getMaxOffset());
				break;
			case "insertlayer":
				var node = this.__parseHtmlCode(this.__config.default_code_layer)[0];
				this.__bodynode.__insertAt(node, 0);
				this.__setPointInside(node, node.__getMaxOffset());
				break;
			case "insertfieldset":
				var node = this.__parseHtmlCode(this.__config.default_code_fieldset)[0];
				this.__insertNode(node);
				this.__setPointInside(node, node.__getMaxOffset());
				break;
			case "insertdetails":
				var node = this.__parseHtmlCode(this.__config.default_code_details)[0];
				this.__insertNode(node);
				this.__setPointInside(node, node.__getMaxOffset());
				break;
			case "insertvideotag":
				var node = this.__parseHtmlCode(this.__config.default_code_video)[0];
				this.__insertNode(node);
				this.__selectControl(node);
				break;
			case "insertaudiotag":
				var node = this.__parseHtmlCode(this.__config.default_code_audio)[0];
				this.__insertNode(node);
				this.__selectControl(node);
				break;
			case "insertrowtop":
			case "insertrowbottom":
			case "insertcolumnleft":
			case "insertcolumnright":
			case "mergecells":
			case "splitcells":
			case "deleterow":
			case "deletecolumn":
				this.__execTableCommand(cmd);
				break;
			case "insertform":
				var node = this.__parseHtmlCode(this.__config.default_code_form)[0];
				this.__insertNode(node);
				this.__setPointInside(node, node.__getMaxOffset());
				break;
			case "inserttextarea":
			case "insertinptext":
			case "insertinpfile":
			case "insertinpimage":
			case "insertinpreset":
			case "insertinpsubmit":
			case "insertinphidden":
			case "insertinppassword":
			case "insertradiobox":
			case "insertcheckbox":
			case "insertinpbutton":
			case "insertbutton":
			case "insertdropdown":
			case "insertlistbox":
				var node = this.__parseHtmlCode(this.__config["default_code_" + cmd.substring(6)])[0];
				this.__insertNode(node);
				this.__selectControl(node);
				break;
			case "toggleborder":
			case "toggleborderreverse":
				this.__ToggleDesignBorder();
				break;
			case "invokeevent":
				this._broadcastEvent(val1, [val2, val3]);
				break;
		}
	}
	this.CanExecCommand = function (cmd) {
		cmd = String(cmd).toLowerCase();
		switch (cmd) {
			case "undo":
				return this.__canUndo();
			case "redo":
				return this.__canRedo();
			case "cut":
			case "copy":
			case "delete":
				return this.__verifySelectionType("Range", "Control");
			case "insertrowtop":
			case "insertrowbottom":
			case "insertcolumnleft":
			case "insertcolumnright":
			case "mergecells":
			case "splitcells":
			case "deleterow":
			case "deletecolumn":
				return this.__execTableCommand(cmd, "queryenable");
			case "formatpainterapply":
			case "formatpainterclear":
				return this.__formatPainterHasData();
			case "unlink":
				if (this.__verifySelectionType("Range"))
					return this.QueryFormatLogic("link");
				else
					return !!this.IsIncludedByTag("a");
			case "":
			default:
				return true;
		}
	}

	this.QueryStyle = function (name) {
		var texts = null;
		if (this.__getSelectionType() == "Range")
			texts = this.__getRangeTextNodes();
		else
			texts = [this.__getPointNode()]

		switch (name) {
			case "fontname":
				name = "font-family";
				break;
			case "fontsize":
				name = "font-size";
				break;
			case "forecolor":
				name = "color";
				break;
			case "backcolor":
				name = "background-color";
				break;
			case "cssclass":
				name = "class";
				break;
			case "cssstyle":
				name = "style";
				break;
		}
		switch (name) {
			case "font-family":
			case "font-size":
			case "color":
			case "background-color":
				if (texts.length == 0)
					return null;
				var lastval = null;
				for (var i = 0; i < texts.length; i++) {
					var currval = null;
					for (var node = texts[i]; node; node = node.__parent) {
						var val = node.__getStyle(name);
						if (!val) continue;
						currval = val;
						break;
					}
					if (i > 0 && currval != lastval)
						return null;
					lastval = currval;
				}
				return lastval;
			case "style":
			case "class":
				if (texts.length == 0)
					return null;
				var lastval = null;
				for (var i = 0; i < texts.length; i++) {
					var currval = null;
					for (var node = texts[i]; node; node = node.__parent) {
						var val = node.__getAttribute(name);
						if (!val) continue;
						currval = val;
						break;
					}
					if (i > 0 && currval != lastval)
						return null;
					lastval = currval;
				}
				return lastval;
			case "paragraph":
				var lastval = null;
				for (var i = 0; i < texts.length; i++) {
					var currval = null;
					for (var node = texts[i]; node; node = node.__parent) {
						if (node.__notSplitable())
							break;
						switch (node.__namelower) {
							case "li":
							case "p":
							case "div":
							case "pre":
							case "address":
							case "dt":
							case "h1":
							case "h2":
							case "h3":
							case "h4":
							case "h5":
							case "h6":
							case "article":
							case "section":
							case "hgroup":
							case "header":
							case "footer":
							case "aside":
								if (node.__namelower != "div" || node.__getStyle("position") != "absolute")
									currval = node.__namelower;
								break;
						}
						if (currval) break;
					}
					if (i > 0 && currval != lastval)
						return null;
					lastval = currval;
				}
				return lastval;
		}
	}

	this.QueryCommand = function (cmd, val1, val2, val3) {
		cmd = String(cmd).toLowerCase();

		switch (cmd) {
			case "rangeselect":
				return this.IsRangeSelect();
			case "tabedit":
				return this.IsTabEdit();
			case "tabcode":
				return this.IsTabCode();
			case "tabview":
				return this.IsTabView();
			case "bold":
			case "italic":
			case "underline":
			case "overline":
			case "linethrough":
			case "forecolor":
			case "backcolor":
			case "superscript":
			case "subscript":
			case "fontname":
			case "fontsize":
			case "cssclass":
			case "cssstyle":
			case "mark":
				return this.QueryFormatLogic(cmd, val1, val2, val3);
			case "justifyleft":
			case "justifycenter":
			case "justifyright":
			case "justifyfull":
			case "justifynone":
				if (this.__verifySelectionType("Control"))
					return this.__justifyControl(cmd.substring(7), "query");
				if (this.__verifySelectionType("Point", "Range"))
					return this.__justifyParagraph(cmd.substring(7), "query");
				break;
			case "insertblockquote":
				return this.__queryBlockquote();
			case "insertorderedlist":
				if (this.__verifySelectionType("Point", "Range"))
					return this.__queryItemListImpl("ol");
				break;
			case "insertunorderedlist":
				if (this.__verifySelectionType("Point", "Range"))
					return this.__queryItemListImpl("ul");
				break;
			case "ltr":
			case "rtl":
				if (this.__verifySelectionType("Point", "Range"))
					return this.__queryDirection(cmd);
				break;
			case "toggleborder":
				return this.__HasDesignBorder();
			case "toggleborderreverse":
				return !this.__HasDesignBorder();
		}
	}



	//waiting override..
	this.ExecUICommand = function (element, cmd, arg0, arg1, arg2) {
		this.Focus();
		if (this._broadcastEvent("ExecUICommand", arguments) !== false) {
			this.ExecCommand(cmd, arg0, arg1, arg2);
		}
		this.Focus();
		this.NotifyUpdateUI();
		//this._broadcastEvent("ExecUICommandDone",arguments);
	}

	this.StartDragControl = this.__startDragControl;
	this.StopDragControl = this.__stopDragControl;


	this.__paragraphLogic = function (argnode, argpos, option, action, doselect) {
		var node = argnode;
		var pos = argpos;
		var core = this;

		while (!node.__isBlock()) {
			pos = node.__parent.__indexOf(node);
			node = node.__parent;
		}

		if (node.__notSplitable()) {
			if (action == 'query')
				return option.match(null);

			//insert new node

			var np = new $rte.ContainerElement(this.__config.justifyparagraph);
			node.__insertAt(np, pos);
			var ns = node.__nodes.concat();
			var leftindex = 0;
			for (var i = pos - 1; i >= 0; i--) {
				leftindex = i;
				var child = ns[i];
				if (!child) continue;
				if (child.__isBlock()) break;
				//if(child.__namelower=="br"||child.__namelower=="hr")break;
				np.__insertAt(child, 0);
			}
			for (var i = pos + 1; i < ns.length; i++) {
				var child = ns[i];
				if (child.__isBlock()) break;
				//if(child.__namelower=="br"||child.__namelower=="hr")break;
				np.__appendChild(child);
			}

			if (doselect && argnode == node) {
				argpos = pos - leftindex;
				argnode = np;
			}
			node = np;
		}

		if (action == 'ensure') {
			//for __getParagraphList
			return node;
		}

		var allget = option.match(node);

		if (action == 'query')
			return allget;

		if (action == 'apply') {
			if (!allget) {
				option.apply(node);
			}
		}
		else if (action == 'clean') {
			if (allget) {
				option.clean(node);
			}
		}
		else {
			if (allget)
				option.clean(node);
			else
				option.apply(node);
		}

		if (doselect) this.__setPointInside(argnode, argpos);

		return node;
	}

	this.__justifyControl = function (mode, action) {
		var node = this.__getPointNode();
		if (!node)
			return;
		if (mode == "center")
			mode = "none";
		if (action == 'query')
			return node.__getAlignMode() == mode;
		node.__setAlignMode(mode);
	}

	this.__justify_pointnode = function (argnode, argpos, align, action, doselect) {
		var option = {};
		option.match = function (node) {
			if (!node) return align == null;
			return node.__getStyle('text-align') == align;
		}
		option.apply = function (node) {
			node.__setStyle('text-align', align);
		}
		option.clean = function (node) {
			node.__removeStyle('text-align');
		}
		return this.__paragraphLogic(argnode, argpos, option, action, doselect);
	}
	this.__justifyParagraph = function (mode, action) {
		var align = mode;
		if (mode == 'full') align = 'justify';
		if (mode == 'none') align = null;

		var core = this;
		var sel = this.__selection;
		var node = this.__getPointNode();
		var pos = this.__getPointOffset();

		if (this.__verifySelectionType("Point"))
			return this.__justify_pointnode(node, pos, align, action, true);

		//now range:
		var texts = this.__getRangeTextNodes();
		if (texts.length == 0)
			return this.__justify_pointnode(node, pos, align, action, true);

		var allget = true;
		for (var i = 0; i < texts.length; i++) {
			if (!this.__justify_pointnode(texts[i], 0, align, 'query', false)) {
				allget = false;
				break;
			}
		}

		if (action == 'query')
			return allget;

		if (action == 'apply') {
			if (allget)
				return;
		}
		else if (action == 'clean') {
		}
		else {
			if (allget)
				align = null;
			action = 'apply';
		}
		for (var i = 0; i < texts.length; i++) {
			this.__justify_pointnode(texts[i], 0, align, action, false)
		}
		this.__setPointInside(texts[0], 0);
		this.__setRangeInside(texts[texts.length - 1], texts[texts.length - 1].__getMaxOffset());
	}

	this.__findParagraphNodes = function (node, pos, breakIfNoParagraph) {
		if (!breakIfNoParagraph) {
			node = this.__paragraphLogic(node, pos, null, "ensure", false);
			if (node && this.__getSelectionType() == "Point") {
				var selnode = this.__getPointNode();
				if (!node.Contains(selnode)) {
					this.__setPointInside(node, 0);
				}
			}
		}
		else {
			while (!node.__isBlock()) {
				pos = node.__parent.__indexOf(node);
				node = node.__parent;
			}
			if (node.__notSplitable())
				node = null;
		}
		if (node == null)
			return null;
		return [node];
	}
	this.__getParagraphList = function (breakIfNoParagraph) {
		var core = this;
		var sel = this.__selection;
		var node = this.__getPointNode();
		var pos = this.__getPointOffset();

		if (node == null)
			return [];

		if (this.__verifySelectionType("Point"))
			return this.__findParagraphNodes(node, pos, breakIfNoParagraph)

		var nodes = this.__getRangeTextNodes();
		if (nodes.length == 0)
			return this.__findParagraphNodes(node, pos, breakIfNoParagraph)

		var arr = [];
		var last = null;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var skip = false;
			for (var k = 0; k < arr.length; k++) {
				if (arr[k].Contains(node)) {
					skip = true;
					break;
				}
			}
			if (skip)
				continue;

			while (!node.__isBlock())
				node = node.__parent;
			if (node == null || node.__notSplitable()) {
				if (breakIfNoParagraph)
					return null;
				node = this.__paragraphLogic(nodes[0], 0, null, "ensure", false);
			}
			if (node == last)
				continue;
			last = node;
			arr.push(last);
		}
		return arr;
	}

	this.EnsureParagraph = function () {
		var arr = this.__getParagraphList();
		if (arr == null)
			return null;
		return arr[0] || null;
	}

	this.__queryItemListImpl = function (listname) {
		var arr = this.__getParagraphList(true);
		if (arr == null)
			return false;
		for (var i = 0; i < arr.length; i++) {
			var node = arr[i];
			if (node.__namelower != "li")
				return false;
			if (node.__parent.__namelower != listname)
				return false;
		}
		return true;
	}
	this.__insertItemListImpl = function (listname, styletype) {

		var seltype = this.__getSelectionType();
		var sel = this.__selection;

		var allget = this.__queryItemListImpl(listname);
		var removeall = allget;
		if (styletype) removeall = false;


		var arr = this.__getParagraphList();

		//TODO: now the commented way is same as WORD
		//TODO: add a config property to remove all list items if only selected one LI
		//		if(arr.length==1)
		//		{
		//			if(arr[0].__namelower=="li")
		//			{
		//				var list=arr[0].__parent;
		//				arr=list.__nodes.concat();
		//			}
		//		}

		for (var i = 0; i < arr.length; i++) {
			var node = arr[i];

			//TODO: which case ?
			if (node.__parent == null)
				continue;

			var pos = node.__parent.__indexOf(node);

			if (node.__namelower == "li") {
				var newnode;
				var currlist = node.__parent;

				if (removeall) {
					if (currlist.__namelower != listname)
						continue;
					newnode = new $rte.ContainerElement(this.__config.unlistparagraph);
					newnode._mergeNode(node);
					while (node.__nodes.length)
						newnode.__appendChild(node.__nodes[0]);
					node.__removeNode(false);
					arr[i] = newnode;
					if (sel.__pointnode == node) sel.__pointnode = newnode;
					currlist.__parent.__insertAfter(newnode, currlist);
				}
				else {
					var prev = pos == 0 ? currlist.__findPrev(true) : null;
					currlist.__setStyle("list-style-type", styletype || null);
					if (prev && prev.__namelower == listname) {
						prev.__appendChild(node);
						newnode = node;
						pos = currlist.__nodes.length;//do not move other
					}
					else {
						if (currlist.__namelower == listname)
							continue;

						newnode = new $rte.ContainerElement(listname);
						newnode._mergeNode(currlist);
						newnode.__appendChild(node);
						currlist.__parent.__insertAfter(newnode, currlist);
					}
				}

				if (pos < currlist.__nodes.length) {
					var nextlist = new $rte.ContainerElement(currlist.__name);
					nextlist._mergeNode(currlist);
					while (pos < currlist.__nodes.length)
						nextlist.__appendChild(currlist.__nodes[pos]);
					currlist.__parent.__insertAfter(nextlist, newnode);
				}
				if (currlist.__nodes.length == 0) {
					currlist.__removeNode(false);
				}
			}
			else {
				var newnode = new $rte.ContainerElement("li");
				newnode._mergeNode(node);
				while (node.__nodes.length)
					newnode.__appendChild(node.__nodes[0]);

				var prev = node.__findPrev(true);
				var listnode;
				if (prev && prev.__namelower == listname) {
					prev.__appendChild(newnode);
					prev.__setStyle("list-style-type", styletype || null);
					listnode = prev;
				}
				else {
					listnode = new $rte.ContainerElement(listname);
					listnode.__appendChild(newnode);
					listnode.__setStyle("list-style-type", styletype || null);
					node.__parent.__insertBefore(listnode, node);
				}

				node.__removeNode(false);
				arr[i] = newnode;
				if (sel.__pointnode == node) sel.__pointnode = newnode;

				var next = listnode.__findNext(true);
				if (next && next.__namelower == listname) {
					while (next.__nodes.length)
						listnode.__appendChild(next.__nodes[0]);
					next.__removeNode(false);
				}

			}
		}

		if (seltype == "Point") {
			this.__setPointInside(sel.__pointnode, sel.__pointoffset);
		}
		else if (!sel.__tryRestore()) {
			this.__setPointInside(arr[0], 0);
			this.__setRangeInside(arr[arr.length - 1], arr[arr.length - 1].__getMaxOffset());
		}

	}

	this.__indentListItem = function (node) {
		var list = node.__parent;
		var pos = list.__indexOf(node);
		var prev = list.__nodes[pos - 1];
		var prevlast = prev.__nodes[prev.__nodes.length - 1];
		if (prevlast && prevlast.__namelower == list.__namelower) {
			prevlast.__appendChild(node);
		}
		else {
			var newlist = new $rte.ContainerElement(list.__name);
			prev.__appendChild(newlist);
			newlist.__appendChild(node);
		}
	}
	this.__outdentListItem = function (node) {
		var list = node.__parent;
		var pos = list.__indexOf(node);
		var outli = list.__parent;
		if (outli.__namelower != 'li') return;
		var outlist = outli.__parent;
		var outpos = outlist.__indexOf(outli);

		if (outli.__indexOf(list) == 0) {
			outlist.__insertAt(node, outpos);
		}
		else {
			outlist.__insertAt(node, outpos + 1);

			if (pos > 0) {
				var newprev = new $rte.ContainerElement(list.__name);
				outli.__insertBefore(newprev, list);
				for (var i = 0; i < pos; i++)
					newprev.__appendChild(list.__nodes[0]);
			}

			var lipos = outli.__indexOf(list);
			while (true) {
				var linode = outli.__nodes[lipos];
				if (!linode) break;
				node.__appendChild(linode);
			}
		}
		if (list.__nodes.length == 0)
			list.__removeNode();
	}

	this.__inoutdentParagraph = function (size, isout) {
		var seltype = this.__getSelectionType();
		var sel = this.__selection;

		var arr = this.__getParagraphList();
		if (arr == null || arr.length == 0)
			return;

		var ctx = {};

		for (var i = 0; i < arr.length; i++) {
			var node = arr[i];
			var list;

			if (node.__namelower == 'li') {
				list = node.__parent;
				if (ctx['skip' + list.__objectuid])
					continue;
				if (list.__indexOf(node) > 0) {
					if (isout)
						this.__outdentListItem(node)
					else
						this.__indentListItem(node)
					continue;
				}
				ctx['skip' + list.__objectuid] = true;
				node = list;
			}
			else if (node.__parent && node.__parent.__namelower == "li" && node.__parent.__parent) {
				var listname = node.__parent.__parent.__namelower;
				this.__insertItemListImpl(listname);
				this.__inoutdentParagraph(size, isout);
				if (isout)
					this.__insertItemListImpl(listname);
				else
					this.__inoutdentParagraph(size, isout);
				return;
			}

			var ml = node.__getStyle("margin-left");
			ml = parseInt(ml) || 0;
			ml += isout ? -size : size;
			if (ml > 0)
				node.__setStyle("margin-left", ml + "px");
			if (ml <= 0)
				node.__removeStyle("margin-left");

			if (list) {
				var nodes = list.__nodes.concat();
				for (var i = 0; i < nodes.length; i++)
					this.__outdentListItem(nodes[i])
			}
		}

		if (seltype == "Point") {
			this.__setPointInside(sel.__pointnode, sel.__pointoffset);
		}
		else if (!sel.__tryRestore()) {
			this.__setPointInside(arr[0], 0);
			this.__setRangeInside(arr[arr.length - 1], arr[arr.length - 1].__getMaxOffset());
		}
	}

	this.__queryDirection = function (mode) {
		var arr = this.__getParagraphList(true);
		if (arr == null)
			return false;
		for (var i = 0; i < arr.length; i++) {
			var node = arr[i];
			if (node.__getStyle("direction") != mode)
				return false;
		}
		return true;
	}
	this.__toggleDirection = function (mode) {
		var arr = this.__getParagraphList();
		if (arr == null || arr.length == 0)
			return;
		for (var i = 0; i < arr.length; i++) {
			arr[i].__setStyle("direction", arr[i].__getStyle("direction") == mode ? null : mode);
		}
	}

	this.__changeLineHeight = function (value) {
		var arr = this.__getParagraphList();
		if (arr == null || arr.length == 0)
			return;

		var arr = this.__getParagraphList();
		for (var i = 0; i < arr.length; i++) {
			arr[i].__setStyle("line-height", value);
		}

	}

	this.__paragraphFormatBlock = function (nodename) {
		nodename = String(nodename).toLowerCase();

		var seltype = this.__getSelectionType();
		var sel = this.__selection;

		var arr = this.__getParagraphList();
		if (arr == null || arr.length == 0)
			return;

		var ctx = {};

		for (var nodei = 0; nodei < arr.length; nodei++) {
			var node = arr[nodei];
			var list;

			if (node.__namelower == nodename)
				continue;

			//TODO: when take action on li , check the reason
			//I think __getParagraphList has bug on this..
			if (!node.__parent)
				continue;

			// use "!" to remove the node..
			if (nodename == "!") {
				if (node.__namelower != "li" && !node.__isList()) {
					if (sel.__pointnode == node) {
						sel.__pointnode = node.__nodes[0];
						sel.__pointoffset = 0;
					}
					node.__removeNode(false);
				}
				continue;
			}

			var newnode = new $rte.ContainerElement(nodename);
			newnode._mergeNode(node);
			while (node.__nodes.length) {
				var cnode = node.__nodes[0];
				newnode.__appendChild(cnode);
				if (cnode.__namelower == "li") cnode.removeNode(false);
			}
			node.__parent.__insertBefore(newnode, node);
			node.__removeNode(false);
			arr[nodei] = newnode;
			if (sel.__pointnode == node) sel.__pointnode = newnode;

			node = newnode;

			if (node.__parent.__isList()) {
				var list = node.__parent;
				var pos = list.__indexOf(node);
				if (pos == list.__nodes.length - 1) {
					if (pos == 0)
						list.__removeNode(false);
					else
						list.__parent.__insertAfter(node, list);
				}
				else if (pos == 0) {
					list.__parent.__insertBefore(node, list);
				}
				else {
					var prevlist = new $rte.ContainerElement(list.__name);
					for (var i = 0; i < pos; i++)
						prevlist.__appendChild(list.__nodes[0]);
					list.__parent.__insertBefore(prevlist, list);
					list.__parent.__insertBefore(node, list);
				}
			}

		}

		if (seltype == "Point") {
			if (sel.__pointnode && sel.__pointnode.__core) {
				this.__setPointInside(sel.__pointnode, sel.__pointoffset);
			}
			else {
				//TODO:
				this.__setPointInside(arr[0], 0);
			}
		}
		else if (!sel.__tryRestore()) {
			this.__setPointInside(arr[0], 0);
			this.__setRangeInside(arr[arr.length - 1], arr[arr.length - 1].__getMaxOffset());
		}

	}
	this.__queryBlockquote = function () {
		var arr = this.__getParagraphList(true);
		if (arr == null)
			return false;
		for (var i = 0; i < arr.length; i++) {
			var node = arr[i];
			if (node.__parent.__namelower != "blockquote")
				return false;
		}
		return true;
	}
	this.__toggleBlockquote = function () {
		var arr = this.__getParagraphList();
		if (arr == null || arr.length == 0)
			return;

		var isbq = this.__queryBlockquote();

		for (var i = 0; i < arr.length; i++) {
			var p = arr[i];
			var pp = p.__parent;
			if (pp.__namelower == "blockquote") {
				if (isbq) {
					pp.__removeNode(false);
				}
			}
			else if (!isbq) {
				var bq = this.__parseHtmlCode(this.__config.default_code_blockquote)[0];
				pp.__insertBefore(bq, p);
				bq.__appendChild(p);
			}
		}
	}

	function __removeNodeStylePart(node, stylename, styleval, part) {
		if (!styleval) return;
		var parts = styleval.split(' ');
		var removed = false;
		for (var i = 0; i < parts.length; i++) {
			var pv = parts[i];
			if (pv == '' || pv == part) {
				parts.splice(i, 1);
				removed = true;
				i--;
			}
		}
		if (!removed) return;
		node.__setStyle(stylename, parts.join(' '));
	}
	function __formatClean_RemoveNode(node, checkempty) {
		if (checkempty) {
			if (node.__attrs.length == 0 && !node.__isBlock() && !node.IsControl()) {
				var ns = node.__nodes.concat();
				node.__removeNode(false);
				return ns;
			}
			return [node];
		}
		else {
			var ns = node.__nodes.concat();
			node.__removeNode(false);
			return ns;
		}
	}


	function __boldMatch(node) {
		var n = node.__namelower;
		if (n == "b" || n == "strong")
			return true;
		var s = node.__getStyle("font-weight");
		if (s == "bold")
			return true;
		return false;
	}
	function __boldClean(node) {
		var n = node.__namelower;
		if (n == "b" || n == "strong")
			return __formatClean_RemoveNode(node);

		var s = node.__getStyle("font-weight");
		if (s == "bold") {
			node.__removeStyle("font-weight");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}
	function __italicMatch(node) {
		var n = node.__namelower;
		if (n == "em" || n == "i")
			return true;
		var s = node.__getStyle("font-style");
		if (s == "italic" || s == "oblique")
			return true;
		return false;
	}
	function __italicClean(node) {
		var n = node.__namelower;
		if (n == "em" || n == "i")
			return __formatClean_RemoveNode(node);
		var s = node.__getStyle("font-style");
		if (s == "italic" || s == "oblique") {
			node.__removeStyle("font-style");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}

	function __underlineMatch(node) {
		var n = node.__namelower;
		if (n == "u")
			return true;
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("underline") != -1)
			return true;
		return false;
	}
	function __underlineClean(node) {
		var n = node.__namelower;
		if (n == "u")
			return __formatClean_RemoveNode(node);
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("underline") != -1) {
			__removeNodeStylePart(node, "text-decoration", s, "underline");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}
	function __linethroughMatch(node) {
		var n = node.__namelower;
		if (n == "strike")
			return true;
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("line-through") != -1)
			return true;
		return false;
	}
	function __linethroughClean(node) {
		var n = node.__namelower;
		if (n == "strike")
			return __formatClean_RemoveNode(node);
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("line-through") != -1) {
			__removeNodeStylePart(node, "text-decoration", s, "line-through");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}
	function __overlineMatch(node) {
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("overline") != -1)
			return true;
		return false;
	}
	function __overlineClean(node) {
		var s = node.__getStyle("text-decoration");
		if (s && s.indexOf("overline") != -1) {
			__removeNodeStylePart(node, "text-decoration", s, "overline");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}

	function __subscriptMatch(node) {
		var n = node.__namelower;
		if (n == "sub")
			return true;
		var s = node.__getStyle("vertical-align");
		if (s == "sub")
			return true;
		return false;
	}
	function __subscriptClean(node) {
		var n = node.__namelower;
		if (n == "sub")
			return __formatClean_RemoveNode(node);
		var s = node.__getStyle("vertical-align");
		if (s == "sub") {
			node.__removeStyle("vertical-align");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}
	function __superscriptMatch(node) {
		var n = node.__namelower;
		if (n == "super")
			return true;
		var s = node.__getStyle("vertical-align");
		if (s == "super")
			return true;
		return false;
	}
	function __superscriptClean(node) {
		var n = node.__namelower;
		if (n == "super")
			return __formatClean_RemoveNode(node);
		var s = node.__getStyle("vertical-align");
		if (s == "super") {
			node.__removeStyle("vertical-align");
			return __formatClean_RemoveNode(node, true);
		}
		return [node];
	}




	function __getCommandBaseMatch(cmdlower) {
		switch (cmdlower) {
			case "bold":
				return __boldMatch;
			case "italic":
				return __italicMatch;
			case "underline":
				return __underlineMatch;
			case "overline":
				return __overlineMatch;
			case "linethrough":
				return __linethroughMatch;
			case "subscript":
				return __subscriptMatch;
			case "superscript":
				return __superscriptMatch;

				//TODO:fontname,fontsize,forecolor <font face='' size='' color=''>
		}
	}
	function __getCommandBaseClean(cmdlower) {
		switch (cmdlower) {
			case "bold":
				return __boldClean;
			case "italic":
				return __italicClean;
			case "underline":
				return __underlineClean;
			case "overline":
				return __overlineClean;
			case "linethrough":
				return __linethroughClean;
			case "subscript":
				return __subscriptClean;
			case "superscript":
				return __superscriptClean;
				//TODO:fontname,fontsize,forecolor <font face='' size='' color=''>
		}
	}

	function __ismixedattr(name) {
		if (name == "class")
			return true;
	}
	function __ismixedstyle(name) {
		if (name == "text-decoration")
			return true;
	}

	this.__createFormatLogic = function (cmdlower, expression) {
		if (expression.charAt(0) != "<") return null;
		var pos = expression.indexOf('>');
		if (pos == -1) return null;
		var tagcode = expression.substring(1, pos);
		var optcode = expression.substring(pos + 1);
		var tag = this.__parseHtmlCode('<' + tagcode + '>')[0];
		var attlen = tag.__attrs.length;
		var basematch = __getCommandBaseMatch(cmdlower);
		var baseclean = __getCommandBaseClean(cmdlower);

		var _val1;
		var _val2;
		var _val3;
		function transval(val) {
			if (val == "%1") return _val1;
			if (val == "%2") return _val2;
			if (val == "%3") return _val3;
			return val;
		}

		var option = {};
		option.match = function (node) {
			if (basematch && basematch(node))
				return true;
			if (node.__namelower != tag.__namelower)
				return false;
			if (attlen == 0)
				return true;
			for (var atti = 0; atti < attlen; atti++) {
				var attr = tag.__attrs[atti];
				if (attr.__namelower == "style" && attr.__value != "%1") {
					var pairs = attr.__value.split(';');
					for (var i = 0; i < pairs.length; i++) {
						var pair = pairs[i].split(':');
						if (pair.length != 2) continue;
						var val = transval(pair[1]);
						var nodeval = node.__getStyle(pair[0]);
						if (!nodeval)
							return false;
						if (__ismixedstyle(pair[0])) {
							if (nodeval.indexOf(val) == -1)
								return false;
						}
						else {
							if (nodeval != val)
								return false;
						}
					}
				}
				else {
					var val = transval(attr.__value);
					if (__ismixedattr(attr.__namelower)) {
						var nodeval = node.__getAttribute(attr.__namelower);
						if (!nodeval)
							return false;
						if (nodeval != val && nodeval.indexOf(val) == -1)
							return false;
						var arr = nodeval.split(' ');
						var getit = false;
						for (var i = 0; i < arr.length; i++)
							if (arr[i] == val)
								getit = true;
						if (!getit)
							return false;
					}
					else {
						if (node.__getAttribute(attr.__namelower) != val)
							return false;
					}
				}
			}
			return true;
		}
		option.clean = function (node) {
			if (baseclean) {
				var ns = baseclean(node);
				if (ns[0] != node)
					return ns;
			}
			if (node.__namelower != tag.__namelower)
				return [node];
			if (attlen == 0) {
				var ns = node.__nodes.concat();
				node.__removeNode(false);
				return ns;
			}
			for (var atti = 0; atti < attlen; atti++) {
				var attr = tag.__attrs[atti];
				if (attr.__namelower == "style" && attr.__value != "%1") {
					var pairs = attr.__value.split(';');
					for (var i = 0; i < pairs.length; i++) {
						var pair = pairs[i].split(':');
						if (pair.length != 2) continue;
						var val = transval(pair[1]);
						var nodeval = node.__getStyle(pair[0]);
						if (!nodeval)
							continue;
						if (__ismixedstyle(pair[0])) {
							if (nodeval.indexOf(val) == -1)
								continue;
							__removeNodeStylePart(node, pair[0], nodeval, val);
						}
						else {
							node.__setStyle(pair[0], null);
						}
					}
				}
				else if (__ismixedattr(attr.__namelower)) {
					var nodeval = attr.__value;
					var arr = nodeval.split(' ');
					var getit = false;
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == val) {
							getit = true;
							arr.splice(i, 1);
							i--;
						}
					}
					if (getit) {
						node.__setAttribute(attr.__namelower, arr.join(' '))
					}
				}
				else {
					node.__removeAttribute(attr.__value);
				}
			}
			if (node.__attrs.length == 0 && !node.__isBlock() && !node.IsControl()) {
				var ns = node.__nodes.concat();
				node.__removeNode(false);
				return ns;
			}
			return [node];
		}
		option.apply = function (node) {
			var subnode;
			for (var currnode = node; currnode.__nodes && currnode.__nodes.length == 1; currnode = currnode.__nodes[0]) {
				if (currnode.__namelower == tag.__namelower) {
					subnode = currnode;
					break;
				}
			}

			if (subnode) {
				node = subnode;
			}
			else if (node.__namelower != tag.__namelower) {
				var newnode = new $rte.ContainerElement(tag.__namelower);
				if (node.__isBlock()) {
					node.__appendChild(newnode);
					while (node.__nodes.length > 1)
						newnode.__appendChild(node.__nodes[0]);
				}
				else {
					node.__parent.__insertBefore(newnode, node);
					newnode.__appendChild(node);
				}
				node = newnode;
			}

			for (var atti = 0; atti < attlen; atti++) {
				var attr = tag.__attrs[atti];

				if (attr.__namelower == "style" && attr.__value != "%1") {
					var pairs = attr.__value.split(';');
					for (var i = 0; i < pairs.length; i++) {
						var pair = pairs[i].split(':');
						if (pair.length != 2) continue;
						var val = transval(pair[1]);
						if (__ismixedstyle(pair[0])) {
							var nodeval = node.__getStyle(pair[0]);
							if (!nodeval) {
								node.__setStyle(pair[0], val);
							}
							else if (nodeval.indexOf(val) == -1) {
								node.__setStyle(pair[0], nodeval + " " + val);
							}
							else {
							}
						}
						else {
							node.__setStyle(pair[0], val);
						}
					}
				}
				else if (__ismixedattr(attr.__namelower)) {
					var val = transval(attr.__value);
					var nodeval = node.__getAttribute(attr.__namelower);
					if (!nodeval) {
						node.__setAttribute(attr.__namelower, val)
					}
					else {
						var arr = nodeval.split(' ');
						var getit = false;
						for (var i = 0; i < arr.length; i++)
							if (arr[i] == val)
								getit = true;
						if (!getit) {
							arr.push(val);
							node.__setAttribute(attr.__namelower, arr.join(' '))
						}
					}
				}
				else if (attr.__namelower == "style") //now &&attr.__value=="%1"
				{
					var val = transval(attr.__value);
					var sty = node.__getAttribute("style");
					if (sty) val = sty + ";" + val;
					node.__setAttribute(attr.__namelower, val)
				}
				else {
					var val = transval(attr.__value);
					node.__setAttribute(attr.__namelower, val)
				}
			}
			return node;
		}


		if (tag.__namelower == "a")
			option.queryany = true;

		var core = this;
		var logic = {};
		logic.option = option;
		logic.__exec = function (val1, val2, val3) {
			_val1 = val1; _val2 = val2; _val3 = val3;
			return core.__formatLogic(option, "toggle");
			_val1 = null; _val2 = null; _val3 = null;
		}
		logic.__query = function (val1, val2, val3) {
			_val1 = val1; _val2 = val2; _val3 = val3;
			return core.__formatLogic(option, "query");
			_val1 = null; _val2 = null; _val3 = null;
		}
		logic.__clean = function (node) {
			if (node.nodeType != 1)
				return [node];
			if (node.__nodes) {
				var ns = node.__nodes.concat();
				for (var i = 0; i < ns.length; i++)
					logic.__clean(ns[i]);
			}
			return option.clean(node)
		}


		option.cansplitfunction = function (node) {
			return node.__namelower == tag.__namelower
		}

		return logic;
	}
	this.__getFormatLogic = function (cmd) {
		cmd = cmd.toLowerCase();
		var configname = "format_" + cmd;
		var expression = this.__config[configname];
		if (!expression) {
			switch (cmd) {
				case "link":
					expression = "<a>";
					break;
					//TODO:add more default..
				default:
					return null;
			}
		}
		var map = this.__formatlogicmap;
		if (!map) this.__formatlogicmap = map = {};
		var logic = this.__formatlogicmap[expression];
		if (logic) return logic;
		logic = this.__createFormatLogic(cmd, expression);
		this.__formatlogicmap[expression] = logic;
		return logic;
	}

	this.__resetPointLogics = function () {
		this.__pointLogics = null;
	}
	this.__addPointLogic = function (cmd, val1, val2, val3, logic) {
		var logics = this.__pointLogics;
		if (!logics)
			this.__pointLogics = logics = {};
		var info = logics[cmd.toLowerCase()];
		if (info) {
			if (info[0] == cmd && info[1] == val1 && info[2] == val2 && info[3] == val3) {
				delete logics[cmd.toLowerCase()];
				return;
			}
		}
		logics[cmd.toLowerCase()] = [cmd, val1, val2, val3, logic];
	}
	this.__queryPointLogic = function (cmd, val1, val2, val3, logic) {
		var logics = this.__pointLogics;
		if (!logics)
			return null;
		var info = logics[cmd.toLowerCase()];
		if (!info)
			return null;
		return !logic.__query(val1, val2, val3);
	}

	this.ExecFormatLogic = function (cmd, val1, val2, val3) {
		var logic = this.__getFormatLogic(cmd);
		if (!logic)
			return;
		if (val1 == "!")
			return this.__formatLogic(logic.option, "clean");
		if (this.__getSelectionType() != "Point")
			return logic.__exec(val1, val2, val3);
		return this.__addPointLogic(cmd, val1, val2, val3, logic);
	}
	this.QueryFormatLogic = function (cmd, val1, val2, val3) {
		var logic = this.__getFormatLogic(cmd);
		if (!logic)
			return;
		if (this.__getSelectionType() == "Point") {
			var res = this.__queryPointLogic(cmd, val1, val2, val3, logic);
			if (res != null)
				return res;
		}
		return logic.__query(val1, val2, val3);
	}

	this.__CreateHtmlFilter = function (arr, disabledlist, name, cate, ctor, args, arg1) {
		if (disabledlist) {
			for (var i = 0; i < disabledlist.length; i++)
				if (disabledlist[i] == name)
					return;
		}

		var filter = {};

		filter.Name = name;
		filter.LangText = this.GetLangText(name);
		filter.Category = cate;

		var logic = new ctor(args, arg1);

		logic.__core = this;
		if (logic.__Init) logic.__Init(this);

		filter.ParamType = "NodeArray";

		filter.Match = function (arg) {
			return logic.__Match(arg)
		}
		filter.Filter = function (arg) {
			return logic.__Filter(arg)
		}

		if (arr) arr.push(filter);

		return filter;
	}
	this.__InitHtmlFilterList = function () {
		var arr = this.__inithtmlfilterarray;
		if (arr != null)
			return arr;

		var disabledlist = (this.__config.htmlfilter_disabledlist || "").split(",");

		arr = [];
		this.__CreateHtmlFilter(arr, disabledlist, "clean_removecomments", "remove", $rte.__Filter_RemoveTags, ["#comment"]);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_removefonts", "remove", $rte.__Filter_RemoveTags, ["font"]);

		var wordfilters = [];
		wordfilters.push(new $rte.__Filter_RemoveTags(["lang"]));
		wordfilters.push(new $rte.__Filter_RemoveXmlTags(["o"]));
		wordfilters.push(new $rte.__Filter_RemoveXmlTags(["v"]));
		wordfilters.push(new $rte.__Filter_RemoveMsoStyle());

		this.__CreateHtmlFilter(arr, disabledlist, "clean_wordfilter", "remove", $rte.__Filter_BatchFilter, wordfilters);

		this.__CreateHtmlFilter(arr, disabledlist, "clean_removeemptymargin", "remove", $rte.__Filter_RemoveEmptyMargin);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_removespannoattr", "remove", $rte.__Filter_RemoveTags, ["span"], true);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_removeemptytags", "remove", $rte.__Filter_RemoveEmpty);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_fixaccessbility", "repair", $rte.__Filter_FixAccessbility);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_mergestyle", "repair", $rte.__Filter_MergeStyle);
		this.__CreateHtmlFilter(arr, disabledlist, "clean_encodespecialchars", "repair", $rte.__Filter_EncodeSpecialChars);

		this.__inithtmlfilterarray = arr;
		return arr;
	}
	this.AddHtmlFilterItem = function (logic) {
		if (this.__registeredhtmlfilterlist == null)
			this.__registeredhtmlfilterlist = [];
		this.__registeredhtmlfilterlist.push(logic);
	}
	this.GetHtmlFilterList = function () {
		var arr1 = this.__InitHtmlFilterList();
		return arr1.concat(this.__registeredhtmlfilterlist || [])
	}
	this.CreateRemoveTagsFilter = function (names) {
		return this.__CreateHtmlFilter(null, null, "clean_removetags:" + names, "remove", $rte.__Filter_RemoveTags, names);
	}

	this.__execTableCommand = function (cmd, mode) {
		var node = this.__getPointNode();
		var endnode;
		var table = node;

		if (this.__getSelectionType() == "Range") {
			endnode = this.__getRangeNode();
			var root = node;
			while (root && !root.Contains(endnode))
				root = root.__parent;
			table = root;
		}

		for (; table; table = table.__parent) {
			if (table.__namelower == "table")
				break;
		}

		if (!node || !table)
			return false;

		for (; node && node != table; node = node.__parent) {
			if (node.IsTableCell)
				break;
		}

		if (!node)
			return false;

		if (endnode) {
			if (node.Contains(endnode) || !table.Contains(endnode))
				endnode = null;
		}
		for (; endnode && endnode != table; endnode = endnode.__parent) {
			if (endnode.IsTableCell)
				break;
		}

		return this.__internalTableLogic(table, node, endnode, cmd, mode);
	}

	this.__internalTableLogic = function (table, node, endnode, cmd, mode, arg0, arg1) {
		var pointx = 0;
		var pointy = 0;
		var pinfo = null;
		var rinfo = null;
		var rows = [];
		var grid = {}
		var maxrs = 0;
		var maxcs = 0;

		var core = this;

		function InitGrid_Core() {
			pointx = 0;
			pointy = 0;
			pinfo = null;
			rinfo = null;
			rows = [];
			grid = {}
			maxrs = 0;
			maxcs = 0;

			var lastpi = null;
			var lastpx = 0;
			var lastpy = 0;

			//��Ҫ�����, 񵱳������л����еrowspan/colspanĶ����1�ʱ, ��Ӧ�ϲ�.

			for (var ti = 0; ti < table.__nodes.length; ti++) {
				var row = table.__nodes[ti];
				if (row.__namelower == "tr") {
					rows.push(row);
					continue;
				}
				if (row.__namelower == "tbody" || row.__namelower == "thead" || row.__namelower == "tfoot") {
					var subrows = row.__nodes;
					for (var ri = 0; ri < subrows.length; ri++) {
						row = subrows[ri];
						if (row.__namelower != "tr")
							return false;
						rows.push(row);
					}
					continue;
				}
				//ignore the unknown node.. like <caption>
				//return false;
			}

			maxrs = rows.length;

			for (var ri = 0; ri < rows.length; ri++) {
				var row = rows[ri];
				var colcount = 0;
				var my = ri;
				var mx = 0;
				for (var ci = 0; ci < row.__nodes.length; ci++) {
					var cell = row.__nodes[ci];
					if (!cell.IsTableCell)
						return false;

					var rowspan = parseInt(cell.__getAttribute("rowspan")) || 1;
					var colspan = parseInt(cell.__getAttribute("colspan")) || 1;

					while (grid[mx + ":" + my])
						mx++;

					var info = { cell: cell, row: row, my: my, mx: mx, colspan: colspan, rowspan: rowspan };

					lastpi = info;
					lastpx = mx;
					lastpy = my;

					if (cell == node) {
						pinfo = info;
						pointx = mx;
						pointy = my;
					}
					if (cell == endnode) {
						rinfo = info;
					}

					for (var y = 0; y < rowspan; y++) {
						for (var x = 0; x < colspan; x++) {
							var key = (mx + x) + ":" + (my + y);
							if (grid[key])
								return false;
							grid[key] = info;
						}
					}

					mx += colspan;
					maxrs = Math.max(maxrs, my + rowspan);
					colcount += colspan;
				}
				maxcs = Math.max(maxcs, colcount);
			}

			if (!node) {
				pinfo = lastpi;
				pointx = lastpx;
				pointy = lastpy;
			}

			return true;
		}


		var saved = core._tablecmdgridsaved;
		if (saved && saved.version == core.__version && saved.node == node && saved.endnode == endnode) {
			pointx = saved.pointx;
			pointy = saved.pointy;
			pinfo = saved.pinfo;
			rinfo = saved.rinfo;
			rows = saved.rows;
			grid = saved.grid;
			maxrs = saved.maxrs;
			maxcs = saved.maxcs;
		}
		else {
			saved = {};
			saved.version = core.__version;
			saved.node = node;
			saved.endnode = endnode;
			saved.returnValue = InitGrid_Core();
			saved.pointx = pointx;
			saved.pointy = pointy;
			saved.pinfo = pinfo;
			saved.rinfo = rinfo;
			saved.rows = rows;
			saved.grid = grid;
			saved.maxrs = maxrs;
			saved.maxcs = maxcs;
			core._tablecmdgridsaved = saved;
		}

		if (!saved.returnValue)
			return false;

		if (!pinfo)
			return false;

		if (cmd == "deleterow" && maxrs < 2)
			return false;
		if (cmd == "deletecolumn" && maxcs < 2)
			return false;

		if (mode == "queryenable") {
			if (cmd == "mergecells" && (!rinfo || rinfo.mx < pinfo.mx))
				return false;
			if (cmd == "splitcells" && pinfo.rowspan < 2 && pinfo.colspan < 2)
				return false;
			return true;
		}

		function tospanstr(val) {
			val = String(val);
			if (val == "1")
				return null;
			return val;
		}

		function InsertRow(py) {
			var relrow = rows[pointy] || rows[0];
			var newrow = relrow._cloneNode(false);
			for (var i = 0; i < maxcs;) {
				var info = grid[i + ":" + pointy];
				if (!info) {
					i++;
					continue;
				}
				if (info.my < py && info.my + info.rowspan > py) {
					info.cell.__setAttribute("rowspan", info.rowspan + 1);
				}
				else {
					var newtd = info.cell._cloneNode(false);
					newtd.__removeAttribute("rowspan");
					var tn = new $rte.TextNode();
					tn.__setHtmlCode("&nbsp;");
					newtd.__appendChild(tn);
					newrow.__appendChild(newtd);
				}
				i += info.colspan;
			}
			if (pointy - py == 1) {
				relrow.__parent.__insertBefore(newrow, relrow);
			}
			else if (py - pointy == 1) {
				relrow.__parent.__insertAfter(newrow, relrow);
			}
			else if (py == 0) {
				rows[0].__parent.__insertBefore(newrow, rows[0]);
			}
			else {
				var anotherrow = rows[py - 1] || rows[rows.length - 1];
				anotherrow.__parent.__insertAfter(newrow, anotherrow);
			}
		}

		function InsertColumn(px) {
			for (var i = 0; i < maxrs;) {
				var info = grid[pointx + ":" + i];
				if (!info) {
					i++;
					continue;
				}
				if (info.mx < px && info.mx + info.colspan > px) {
					info.cell.__setAttribute("colspan", info.colspan + 1);
				}
				else {
					var newtd = info.cell._cloneNode(false);
					newtd.__removeAttribute("colspan");
					var tn = new $rte.TextNode();
					tn.__setHtmlCode("&nbsp;");
					newtd.__appendChild(tn);

					if (pointx - px == 1) {
						info.cell.__parent.__insertBefore(newtd, info.cell);
					}
					else if (px - pointx == 1) {
						info.cell.__parent.__insertAfter(newtd, info.cell);
					}
					else if (px == 0) {
						info.row.__insertAt(newtd, 0);
					}
					else {
						//TODO:
						var anothercell = (grid[(px - 1) + ":" + i] || info).cell;
						anothercell.__parent.__insertAfter(newtd, anothercell);
					}
				}
				i += info.rowspan;

			}
		}


		function getlastcell(row, x) {
			var lastcell = null;
			var colcount = 0;
			for (var ci = 0; ci < row.__nodes.length; ci++) {
				if (colcount >= x)
					break;
				lastcell = row.__nodes[ci];
				colcount += parseInt(lastcell.__getAttribute("colspan")) || 1;
			}
			return lastcell;
		}

		function SplitCells() {
			var maininfo = pinfo;
			var maincell = maininfo.cell;

			maincell.__setStyle("width", null);
			maincell.__setStyle("height", null);
			maincell.__setAttribute("rowspan", null);
			maincell.__setAttribute("colspan", null);

			var lastcell = maincell;

			for (var yi = 0; yi < pinfo.rowspan; yi++) {
				var row = pinfo.row;
				if (yi > 0) row = rows[pinfo.my + yi];

				if (yi > 0)
					lastcell = getlastcell(row, pinfo.mx);

				for (var xi = 0; xi < pinfo.colspan; xi++) {
					if (xi == 0 && yi == 0)
						continue;
					var newtd = maincell._cloneNode(false);
					if (lastcell)
						row.__insertAfter(newtd, lastcell);
					else
						row.__insertAt(newtd, 0);
					var tn = new $rte.TextNode();
					tn.__setHtmlCode("&nbsp;");
					newtd.__appendChild(tn);
					lastcell = newtd;
				}
			}

			core.__setPointInside(maincell, 0);
			core.__setRangeInside(lastcell, lastcell.__getMaxOffset());
			core.__rangeSyncToDom();
		}

		function MergeCells() {
			if (!rinfo)
				return;

			//need to reset the range before merge
			if (jsml.msieall)
				Browser_SetPointInside(core.__win, core.__win.document.body, 0);

			var minx = pinfo.mx;
			var maxx = Math.max(pinfo.mx + pinfo.colspan, rinfo.mx + rinfo.colspan);
			var miny = pinfo.my;
			var maxy = Math.max(pinfo.my + pinfo.rowspan, rinfo.my + rinfo.rowspan);

			//TODO:��4����

			var maininfo = pinfo;
			var maincell = maininfo.cell;

			for (var y = miny; y < maxy; y++) {
				for (var x = minx; x < maxx; x++) {
					var info = grid[x + ":" + y];
					if (maininfo == info || !info)
						continue;
					if (!info.cell.__parent)
						continue;
					var ns = info.cell.__nodes;
					var isempty = (ns.length == 1 && ns[0].nodeType == 3 && ns[0].__text.replace(/(^\s+|\s+$)/g, "").length == 0);
					if (ns.length && !isempty) {
						if (ns.length > 1) ns = ns.concat();
						for (var i = 0; i < ns.length; i++)
							maincell.__appendChild(ns[i]);
					}
					info.cell.__removeNode(true);
				}
			}

			maincell.__setStyle("width", null);
			maincell.__setStyle("height", null);

			maincell.__setAttribute("colspan", tospanstr(maxx - minx));
			maincell.__setAttribute("rowspan", tospanstr(maxy - miny));

			core.__setPointInside(maincell, 0);
			core.__rangeSyncToDom(true);
		}


		function DeleteRow() {
			var row = rows[pointy];
			row.__removeNode(true);
			var info;
			for (var x = 0; x < maxcs;) {
				info = grid[x + ":" + pointy];
				if (!info) {
					x++;
					continue;
				}

				if (info.rowspan == 1) {
					x += info.colspan;
					continue;
				}

				info.cell.__setStyle("height", null);

				info.cell.__setAttribute("rowspan", tospanstr(info.rowspan - 1));
				if (info.my == pointy) {
					var btmrow = rows[pointy + 1];
					if (btmrow) {
						var lastcell = getlastcell(btmrow, x);
						if (lastcell)
							btmrow.__insertAfter(info.cell, lastcell);
						else
							btmrow.__insertAt(info.cell, 0);
					}
				}
				x += info.colspan;
			}
			info = grid[pointx + ":" + pointy];
			var nearinfo = grid[pointx + ":" + (info.my + info.rowspan)] || grid[pointx + ":" + (info.my - 1)]
			if (core.__getSelectionType() == "None") {
				if (nearinfo)
					core.__setPointInside(nearinfo.cell, 0);
				else
					core.__selectControl(table);
			}
			core.__rangeSyncToDom();
		}
		function DeleteColumn(px) {
			for (var i = 0; i < maxrs;) {
				var info = grid[pointx + ":" + i];
				if (!info) {
					i++;
					continue;
				}
				if (info.colspan > 1) {
					info.cell.__setAttribute("colspan", tospanstr(info.colspan - 1));
					info.cell.__setStyle("width", null);
				}
				else {
					info.cell.__removeNode(true);
				}
				i += info.rowspan;
			}
			var info = grid[pointx + ":" + pointy];
			info = grid[(info.mx + info.colspan) + ":" + pointy] || grid[(info.mx - 1) + ":" + pointy]
			if (core.__getSelectionType() == "None") {
				if (info)
					core.__setPointInside(info.cell, 0);
				else
					core.__selectControl(table);
			}
			core.__rangeSyncToDom();
		}


		function _AdjustTableSizeForCell(changew, changeh) {
			if (changew) {
				var w = node.__getStyle("width");
				for (var y = 0; y < maxrs;) {
					var info = grid[pinfo.mx + ":" + y];
					if (!info) {
						y++;
						continue;
					}
					y += info.rowspan;
					if (info == pinfo)
						continue;
					if (info.mx != pinfo.mx || info.colspan != pinfo.colspan)
						continue;
					info.cell.__setStyle("width", w);
				}
			}
			if (changeh) {
				var h = node.__getStyle("height");
				var row = node.__parent;
				var rowspan = parseInt(node.__getAttribute("rowspan")) || 1;
				for (var i = 0; i < row.__nodes.length; i++) {
					var cell = row.__nodes[i];
					if (rowspan == (parseInt(cell.__getAttribute("rowspan")) || 1)) {
						cell.__setStyle("height", h);
					}
				}
			}
		}

		function SetRowCount() {
			var count = parseInt(arg0);
			if (!count || count < 1) return;
			if (count == maxrs) return;
			if (count > maxrs) {
				for (var i = maxrs; i < count; i++) {
					InsertRow(pointy + 1);
				}
			}
			else {
				for (var i = maxrs; i > count; i--) {
					pointy = i - 1;
					DeleteRow();
				}
			}
		}
		function SetColCount() {
			var count = parseInt(arg0);
			if (!count || count < 1) return;
			if (count == maxcs) return;
			if (count > maxcs) {
				for (var i = maxcs; i < count; i++) {
					InsertColumn(pointx + 1);
				}
			}
			else {
				for (var i = maxcs; i > count; i--) {
					pointx = i - 1;
					DeleteColumn();
				}
			}
		}

		switch (cmd) {
			case "getrowcount":
				return maxrs;
			case "getcolcount":
				return maxcs;
			case "setrowcount":
				SetRowCount();
				return;
			case "setcolcount":
				SetColCount();
				return;
			case "mergecells":
				MergeCells();
				break;
			case "splitcells":
				SplitCells();
				break;
			case "deleterow":
				DeleteRow();
				break;
			case "deletecolumn":
				DeleteColumn();
				break;
			case "insertrowtop":
				InsertRow(pointy);
				break;
			case "insertrowbottom":
				InsertRow(pointy + pinfo.rowspan);
				break;
			case "insertcolumnleft":
				InsertColumn(pointx);
				break;
			case "insertcolumnright":
				InsertColumn(pointx + pinfo.colspan);
				break;
			case "adjusttablesizeforcell":
				_AdjustTableSizeForCell(arg0, arg1);
				break;
		}


	}

	this.AdjustTableSizeForCell = function (node, changew, changeh) {
		var table = node.__parent.__parent;
		if (!table)
			return;
		if (table.__namelower != "table")
			table = table.__parent;
		if (!table || table.__namelower != "table")
			return;
		this.__internalTableLogic(table, node, null, "adjusttablesizeforcell", null, changew, changeh)
	}
	this.ExecTableLogic = function (table, cmd, arg0, arg1, arg2) {
		switch (cmd) {
			case "getrowcount":
			case "getcolcount":
			case "setrowcount":
			case "setcolcount":
				return this.__internalTableLogic(table, null, null, cmd, null, arg0);
		}
	}


	this.__getUrlBase = function () {
		if (this.__attrurlbase)
			return this.__attrurlbase;
		var url = window.location.href.split('#')[0].split('?')[0];
		url = url.split('/');
		url.length = 3;
		url = url.join('/');
		this.__attrurlbase = url;
		return url;
	}
	this.__getDirBase = function () {
		if (this.__attrdirbase)
			return this.__attrdirbase;
		var url = (this.__config.basehref || window.location.href).split('#')[0].split('?')[0];
		url = url.split('/');
		url[url.length - 1] = '';
		url = url.join('/');
		this.__attrdirbase = url;
		return url;
	}


	this.GetUrlBase = this.__getUrlBase;
	this.GetDirBase = this.__getDirBase;

	this.MakeAbsoluteUrl = function (url, keephost) {
		if (url.charAt(0) != "/" && url.indexOf("://") == -1) {
			var prefix = window.location.href.split('#')[0].split('?')[0].split('/');
			prefix[prefix.length - 1] = url;
			prefix.splice(0, 3);
			url = "/" + prefix.join('/');
		}
		if (url.indexOf("..") != -1) {
			url = url.split("/");
			for (var i = 0; i < url.length; i++) {
				if (url[i] == "..") {
					url.splice(i - 1, 2);
					i -= 2;
				}
			}
			url = url.join("/");
		}
		if (keephost && url.indexOf("://") == -1) {
			var prefix = window.location.href.split('/');
			prefix.length = 3;
			url = prefix.join('/') + url;
		}
		return url;
	}
	this.GetPlayerUrl = function () {
		var player = this.__config.editor_player_url || (this.__config.folder + "player/player.htm")
		return this.MakeAbsoluteUrl(player);
	}

	this.CallAjax = function (method, handler, arg0) {
		//current solution , call the RTEAjax 
		var applyargs = [this.__config.uniqueid, method, handler];
		for (var i = 2; i < arguments.length; i++)
			applyargs.push(arguments[i]);
		return RTEAjax.apply(this, applyargs);
	}



	function GetFlashVersion() {
		if (navigator.plugins && navigator.plugins.length) {
			for (var i = 0; i < navigator.plugins.length; i++) {
				var p = navigator.plugins[i].name.indexOf("Shockwave Flash");
				if (p != -1) {
					return parseFloat(navigator.plugins[i].description.replace("Shockwave Flash ", ""))
				}
			}
		}
		if (window.ActiveXObject) {
			var lastver = null;
			for (var i = 3; i < 100; i++) {
				var obj = null;
				try {
					obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
				}
				catch (x) {
				}
				if (obj)
					lastver = i;
			}
			if (lastver) return lastver;
		}
		return null;
	}

	this.__GetFlashVersion = GetFlashVersion;





	function __parseHTML(core, html) {
		config = core.__config;
		html = String(html).replace(/^\s+/, '');

		var hcfhf = config.htmlcode_forcehexformat;

		var roots = [];
		var node = null;
		var htmllower = html.toLowerCase();

		function AppendNode(newnode, into) {
			var nnn = newnode.__namelower;
			if (nnn == "li") {
				while (node) {
					var nn = node.__namelower;
					if (nn == "ul" || nn == "ol")
						break;
					node = node.__parent;
					if (nn == "li")
						break;
				}
			}

			if (nnn == "td" || nnn == "th") {
				while (node) {
					var nn = node.__namelower;
					if (nn == "tr" || nn == "table" || nn == "tbody" || nn == "thead" || nn == "tfoot")
						break;
					node = node.__parent;
					if (nn == "td")
						break;
				}
			}

			if (nnn == "tr") {
				while (node) {
					var nn = node.__namelower;
					if (nn == "table" || nn == "tbody" || nn == "thead" || nn == "tfoot")
						break;
					node = node.__parent;
					if (nn == "tr")
						break;
				}
			}

			if (node)
				node._addParsedObject(newnode);
			else
				roots.push(newnode);
			if (into)
				node = newnode;
		}
		function ParseAttributeValue(code) {
			if (!code)
				return "";
			if (code.indexOf('>') != -1 || code.indexOf('<') != -1)
				return code;
			return RteHtmlDecode(code);
		}

		//ABOUTTEXTNODE

		function ParseCodeText(code) {
			if (code.length == 0) return;

			var tn = new $rte.TextNode();
			if (node && node.__getStyle("white-space") == "pre")
				tn.__premode = true;
			tn.__setHtmlCode(code);
			AppendNode(tn);
		}
		function ParseComment(code) {
			var tn = new $rte.CommentNode();
			tn.__setHtmlCode(code);
			AppendNode(tn);
		}
		function ParseOther(code) {
			var tn = new $rte.OtherNode();
			tn.__setHtmlCode(code);
			AppendNode(tn);
		}

		function ParseNodeName(code, index) {
			var p = index;
			for (; p < code.length; p++) {
				var c = code.charCodeAt(p);
				if (c >= 65 && c <= 90) continue;	//A-Z
				if (c >= 97 && c <= 122) continue;	//a-z
				if (c >= 48 && c <= 57) continue;	//0-9
				if (c == 58) continue;			//:
				switch (code.charAt(p)) {
					case ':':
					case '-':
					case '_':
					case '!':
						continue;
				}
				break;
			}
			return code.substring(index, p);
		}
		function IsBlankCharCode(c) {
			if (c == 32) return true;
			if (c == 9) return true;
			if (c == 10) return true;
			if (c == 13) return true;
			if (c == 160) return true;
			return false;
		}
		function ParseAttributes(code, tagname) {
			var attrs = [];

			var index = 1 + tagname.length;
			if (code.charCodeAt(code.length - 2) == 47)
				code = code.substr(0, code.length - 2);
			else
				code = code.substr(0, code.length - 1);

			var oldindex = -1;
			while (index < code.length) {
				if (oldindex == index) throw (new Error("loop at index:" + index));
				oldindex = index;

				var attrname = ParseNodeName(code, index);
				if (!attrname) {
					var c = code.charCodeAt(index);
					if (!IsBlankCharCode(c)) {
						//ERROR:unknown char..
					}
					index++;
					continue;
				}

				//save the name start index
				var nameindex = index;
				index = index + attrname.length;

				//remove blank chars after the attr name
				while (index < code.length && IsBlankCharCode(code.charCodeAt(index)))
					index++;

				if (index >= code.length) {
					var attr = new $rte.Attribute(attrname);
					attr.__setHtmlCode(code.substring(nameindex));
					attrs.push(attr);
					return attrs;
				}

				var c = code.charAt(index);
				if (c != "=") {
					//a attribute without value..
					var attr = new $rte.Attribute(attrname);
					attr.__setHtmlCode(code.substring(nameindex, index));
					attrs.push(attr);
					continue;
				}

				index++;

				while (index < code.length && IsBlankCharCode(code.charCodeAt(index)))
					index++;

				if (index >= code.length) {
					//an attribute without value..
					var attr = new $rte.Attribute(attrname);
					attr.__setHtmlCode(code.substring(nameindex, index));
					attrs.push(attr);
					return attrs;
				}

				var c = code.charAt(index);
				if (c == '"' || c == "'") {
					var pos = code.indexOf(c, index + 1);
					if (pos == -1) {
						var attr = new $rte.Attribute(attrname);
						attr.__setQuote(c);
						attr.__setValue(ParseAttributeValue(code.substring(index + 1)));
						attr.__setHtmlCode(code.substring(nameindex));
						attrs.push(attr);
						return attrs;
					}

					var attr = new $rte.Attribute(attrname);
					attr.__setQuote(c);
					attr.__setValue(ParseAttributeValue(code.substring(index + 1, pos)));
					attr.__setHtmlCode(code.substring(nameindex, pos + 1));
					attrs.push(attr);
					index = pos + 1;
					continue;
				}

				var valindex = index;

				while (index < code.length && !IsBlankCharCode(code.charCodeAt(index)))
					index++;

				var attr = new $rte.Attribute(attrname);
				attr.__setQuote("");
				attr.__setValue(ParseAttributeValue(code.substring(valindex, index)));
				attr.__setHtmlCode(code.substring(nameindex, index));
				attrs.push(attr);
			}

			if (hcfhf && attrs.length) {
				for (var i = 0; i < attrs.length; i++) {
					if (attr.__namelower != "style")
						continue;

					var val = attr.__value;
					if (!val || val.indexOf("rgb") == -1)
						continue;

					var newval = val;
					val = val.replace(dec_pattern, function (str, p1, p2, p3) {
						return ("#" + RGBtoHex(p1, p2, p3)).toLowerCase();
					});
					if (newval != val) {
						attr.__setValue(newval);
					}
				}
			}

			return attrs;
		}

		var dec_pattern = /\s*rgb\((\d{1,3})[,]\s*(\d{1,3})[,]\s*(\d{1,3})\)/gi;
		function RGBtoHex(r, g, b) {
			return Math.floor(16777216 + parseInt(r) * 65536 + parseInt(g) * 256 + parseInt(b)).toString(16).substr(1, 6);
		}


		function ParseBeginTag(code, tagname) {
			var ln = tagname.toLowerCase();
			var attrs = ParseAttributes(code, tagname);
			switch (ln) {
				case "base":
				case "col":
				case "link":
				case "meta":
				case "param":
				case "source":
				case "command":
				case "keygen":
				case "area":
					//case "option":
					var newnode = new $rte.DataElement(tagname);
					for (var i = 0; i < attrs.length; i++)
						newnode.__setAttributeObject(attrs[i]);
					AppendNode(newnode);
					return newnode;
				case "map":
					var newnode = new $rte.ContainerElement(tagname);
					for (var i = 0; i < attrs.length; i++)
						newnode.__setAttributeObject(attrs[i]);
					if (code.charCodeAt(code.length - 2) == 47)	// end with char '/'
						AppendNode(newnode, false);
					else
						AppendNode(newnode, true);
					return newnode;
				case "wbr":
				case "br":
				case "hr":
				case "img":
				case "input":
					var newnode = new $rte.GenericElement(tagname);
					for (var i = 0; i < attrs.length; i++)
						newnode.__setAttributeObject(attrs[i]);
					AppendNode(newnode);
					return newnode;
				case "textarea":
				case "style":
				case "script":
					var newnode = new $rte.GenericElement(tagname);
					for (var i = 0; i < attrs.length; i++)
						newnode.__setAttributeObject(attrs[i]);
					AppendNode(newnode, false);
					return newnode;
				default:
					var newnode;
					if (config.CreateTagObject) {
						newnode = config.CreateTagObject(tagname, attrs, core);
					}
					if (!newnode) {
						switch (ln) {
							case "option":
								newnode = new $rte.DataElement(tagname);
								break;
							case "object":
							case "embed":
							case "video":
							case "audio":
							case "iframe":
								newnode = new $rte.ObjectElement(tagname);
								break;
								//case "noframes":
								//case "noscript":
								//case "bgsound":
								//	break;
							case "table":
							case "tbody":
							case "thead":
							case "tfoot":
							case "tr":
							case "td":
							case "th":
								newnode = new $rte.TableElement(tagname);
								break;
							case "a":
								newnode = new $rte.LinkElement("a");
								break;
							default:
								newnode = new $rte.ContainerElement(tagname);
								break;
						}
						for (var i = 0; i < attrs.length; i++)
							newnode.__setAttributeObject(attrs[i]);
					}
					if (code.charCodeAt(code.length - 2) == 47)	// end with char '/'
						AppendNode(newnode, false);
					else
						AppendNode(newnode, true);
					return newnode;
			}
		}
		function ParseEndTag(code, tagname) {
			var ln = tagname.toLowerCase();
			if (node == null) {
				//alert("ParseEndTag-1-"+tagname);
				return;	//ERROR:no matched begintag?
			}
			for (var n = node; n; n = n.__parent) {
				if (n.__namelower == ln) {
					node = n.__parent;
					//alert("exit.."+n.__name+":"+(node==null?"null":node.__name));
					n.__opened = true;
					return n;
				}
			}
			//alert("ParseEndTag-2-"+tagname+":"+node.__name);
			//ERROR:no matched begintag? go root ?
			note = null;
			return null;
		}
		function ParseTag(code) {
			if (tagbegin = code.charAt(1) != "/") {
				var tagname = ParseNodeName(code, 1);
				if (tagname == "") {
					ParseComment(code);
					//alert("? "+code);
					return;	//ERROR:no tagname ? ingore..
				}
				return { Begin: ParseBeginTag(code, tagname) };
			}
			else {
				var tagname = ParseNodeName(code, 2);
				if (tagname == "") {
					ParseComment(code);
					//alert("? "+code);
					return;	//ERROR:no tagname ? ingore..
				}
				return { End: ParseEndTag(code, tagname) };
			}
		}

		function DoParse() {
			var pos1 = 0;
			var oldpos1 = -1;
			while (pos1 < html.length) {
				if (oldpos1 == pos1) throw (new Error("loop at pos:" + pos1));
				oldpos1 = pos1;

				var pos2 = html.indexOf('<', pos1);
				if (pos2 == -1) {
					ParseCodeText(html.substring(pos1).replace(/\s+$/, ''));
					break;
				}

				ParseCodeText(html.substring(pos1, pos2));
				pos1 = pos2;

				//ERROR:last char is '<' ? ignore it.
				if (pos1 + 1 == html.length)
					break;

				var nc = html.charAt(pos1 + 1);

				if (nc == '?' && html.substr(pos1 + 1, 4) == "?xml") {
					pos2 = html.indexOf('>', pos1);
					if (pos2 == -1) {
						ParseOther(html.substring(pos1) + ">");
						break;
					}
					ParseOther(html.substring(pos1, pos2 + 1));
					pos1 = pos2 + 1;
					continue;
				}

				if (nc == '%')	//asp code
				{
					pos2 = html.indexOf(nc + '>', pos1);
					if (pos2 == -1) {
						ParseOther(html.substring(pos1) + nc + ">");
						break;
					}
					ParseOther(html.substring(pos1, pos2 + 2));
					pos1 = pos2 + 2;
					continue;
				}

				if (nc == '!') {
					if (html.substr(pos1, 4) == "<!--") {
						pos2 = html.indexOf("-->", pos1);
						if (pos2 == -1) {
							ParseComment(html.substring(pos1) + "-->");
							break;
						}
						ParseComment(html.substring(pos1, pos2 + 3));
						pos1 = pos2 + 3;
					}
					else	//<!DOCTYPE or other <! .... > 
					{
						pos2 = html.indexOf('>', pos1);
						if (pos2 == -1) {
							ParseOther(html.substring(pos1) + ">");
							break;
						}
						ParseOther(html.substring(pos1, pos2 + 1));
						pos1 = pos2 + 1;
					}
					continue;
				}

				if (nc != "/") {
					var ncc = nc.charCodeAt(0);
					if (ncc < 65 || ncc > 122 || (ncc > 90 && ncc < 97)) {
						ParseCodeText(html.substring(pos1, pos1 + 1));
						pos1++;
						continue;
					}
				}

				//make support <img src='<%# Eval("Url") %>' /> , scan the ',"...
				var quotestart = pos1;
				for (pos2 = html.indexOf('>', pos1) ; pos2 > -1; pos2 = html.indexOf('>', quotestart)) {
					var quotepos = html.indexOf('"', quotestart);
					var quotepos2 = html.indexOf("'", quotestart);
					if (quotepos2 > -1 && quotepos2 < quotepos)
						quotepos = quotepos2
					if (quotepos > -1 && quotepos < pos2) {
						quotepos = html.indexOf(html.charAt(quotepos), quotepos + 1);
						if (quotepos > -1) {
							quotestart = quotepos + 1;
							continue;
						}
					}
					break;
				}

				if (pos2 == -1) {
					ParseCodeText(html.substring(pos1));
					break;
				}

				var tagcode = html.substring(pos1, pos2 + 1);
				var taginfo = ParseTag(tagcode);
				pos1 = pos2 + 1;

				if (!taginfo)
					continue;

				var nodeln = null;
				if (taginfo.Begin)
					nodeln = taginfo.Begin.__namelower;

				if (nodeln == "script" || nodeln == "style" || nodeln == "textarea") {

					pos2 = htmllower.indexOf("</" + nodeln, pos1);
					if (pos2 == -1) {
						if (taginfo.Begin)
							taginfo.Begin.__setInnerHtml(html.substring(pos1));
						break;
					}

					if (taginfo.Begin)
						taginfo.Begin.__setInnerHtml(html.substring(pos1, pos2));
					//TODO:else?

					pos1 = htmllower.indexOf(">", pos2) + 1;
					continue;
				}

				var tag = taginfo.Begin || taginfo.End;

				//ABOUTTEXTNODE

				//skip all blank chars , and fill to begintag
				if (tag && IsNotFormatTag(tag)) {
					var posnext = html.indexOf('<', pos1);
					if (posnext != -1) {
						var bc = html.substring(pos1, posnext);
						if (bc.match(/^\s+$/g)) {
							if (taginfo.Begin && tag.__getStyle("white-space") == "pre") {
								//append as text node.
							}
							else {
								pos1 = posnext;
								tag.__appendBlankCode(bc, taginfo.Begin);
							}
						}
					}
				}

			}//while(pos1<html.length)

		}

		function IsNotFormatTag(tag) {
			if (tag.__istableelement)
				return true;
			if (tag.__isBlock())
				return true;
			return false;
		}

		DoParse();
		return roots;
	}


	function SupportMozSelection(win) {
		if (jsml.msie || win.document.selection)//IE has bug on the getSelection()..
			return false;
		if (!win.getSelection)
			return false;
		return true;
	}

	function Browser_SelectionIsRange(win) {
		if (SupportMozSelection(win))
			return !win.getSelection().isCollapsed;
		var stype = win.selection.type;
		if (stype == "Control") return false;
		var r = win.selection.createRange();
		return r.htmlText.length != 0;
	}
	function Browser_HasValidSelection(win) {
		if (SupportMozSelection(win))
			return true;
		//IE678:
		var s = win.document.selection;
		//if(s.type=="None")
		//	return false;
		var r = s.createRange();
		var n = s.type == "Control" ? r.item(0) : r.parentElement();
		if (n != null) {
			//document.title=[new Date().getTime()%1000+1000,s.type,n.nodeName,win.document.activeElement]
			return n.ownerDocument == win.document;
		}
		return false;
	}
	function Browser_GetSelectedControl(win) {
		var sel = win.document.selection;
		if (sel && sel.type == "Control")
			return sel.createRange().item(0);
		if (!jsml.ie11)
			return null;
		var sel = win.getSelection();
		if (sel.rangeCount == 0)
			return null;
		var r = sel.getRangeAt(0);
		if (!r || !r.startContainer)
			return null;
		if (r.endOffset - r.startOffset != 1)
			return null;
		var obj = r.startContainer.childNodes.item(r.startOffset);
		if (!obj)
			return null;
		switch (obj.nodeName) {
			case "TABLE":
			case "IMG":
			case "IFRAME":
			case "OBJECT":
			case "EMBED":
			case "AUDIO":
			case "VIDEO":
				return obj;
		}
	}
	function Browser_GetPointNodeOffset(win) {
		if (!SupportMozSelection(win))
			return Browser_IE_GetNodeOffset(win, true);

		var sel = win.getSelection();
		if (!sel)//firefox
			return { node: null, offset: 0 };
		if (sel.rangeCount == 0)
			return { node: null, offset: 0 };
		var r = sel.getRangeAt(0);
		if (!r) return { node: null, offset: 0 };

		return { node: r.startContainer, offset: r.startOffset };

		function GetPIndex(node) {
			var pn = node.parentNode;
			var i = 0;
			for (; i < pn.childNodes.length; i++)
				if (pn.childNodes.item(i) == node)
					break;
			return i;
		}

		//if(r.startContainer.nodeName=="TR")
		//{
		//	document.title=
		//		GetPIndex(sel.anchorNode)
		//		+","+sel.anchorOffset+":"+sel.focusOffset
		//		+"----"+GetPIndex(r.startContainer)
		//		+","+GetPIndex(r.endContainer)
		//		+","+r.startOffset+":"+r.endOffset
		//}
		//else
		//{
		//	document.title="..";
		//}

	}

	function Browser_GetRangeNodeOffset(win) {
		if (!SupportMozSelection(win))
			return Browser_IE_GetNodeOffset(win, false);
		if (jsml.msie && !win.document.selection.createRange().text)
			return { node: null, offset: 0 }
		var sel = win.getSelection();
		if (!sel) //firefox
			return { node: null, offset: 0 }
		if (sel.isCollapsed)
			return { node: null, offset: 0 }
		if (sel.rangeCount == 0)
			return { node: null, offset: 0 };
		var r = sel.getRangeAt(0);
		if (!r) return { node: null, offset: 0 };
		return { node: r.endContainer, offset: r.endOffset };
	}
	function Browser_IsSelectingText(win) {
		if (jsml.msie || !SupportMozSelection(win)) {
			var s = win.document.selection;
			if (s.type == "Control")
				return false;
			var r = s.createRange();
			return r.text.length > 0;
		}
		else {
			var sel = win.getSelection();
			if (!sel)//firefox
				return false;
			return !sel.isCollapsed;
		}
	}
	function Browser_IE_GetNodeOffset(win, start, debug) {

		var s = win.document.selection;
		var r = s.createRange();

		if (s.type == "Control") return { node: r.item(0), offset: 0 };
		if (r.text.length == 0 && !start) return { node: null, offset: 0 };
		r.collapse(start);

		var p = r.parentElement();
		if (!win.document.body.contains(p)) {
			return { node: null, offset: 0 }
		}

		var rl = r.duplicate();

		try {
			rl.moveToElementText(p);
		}
		catch (x) {
			//if the p is act as control in IE , for example , the <legend>
			return { node: p, offset: 0 }
		}

		rl.collapse(true);
		rl.setEndPoint("EndToEnd", r);

		if (rl.htmlText.length == 0)
			return { node: p, offset: 0 }

		var ns = p.childNodes;
		if (ns.length == 0)
			return { node: p, offset: 0 }

		var div = win.document.createElement("DIV");
		div.innerHTML = rl.htmlText;
		var last = div.childNodes.length;
		if (last == 0)
			return { node: p, offset: 0 }

		if (!start && last == 1 && div.firstChild.nodeName == p.nodeName) {
			last = div.firstChild.childNodes.length;
		}

		if (last > ns.length) {
			return { node: p, offset: ns.length }
		}

		var node = ns.item(last - 1);
		if (node.nodeType != 3) {
			return { node: p, offset: last }
		}

		var txt1 = rl.text;
		var txt2 = "";
		for (var i = 0; i < ns.length; i++) {
			var n = ns.item(i);

			if (i + 1 == last) {
				return { node: n, offset: txt2.length + txt1.length }
			}

			switch (n.nodeName) {
				case "#text":
					txt2 += n.nodeValue;
					break;
				case "BR":
					txt2 += "\r\n";
					break;
				case "HR":
					txt2 += "\r\n\r\n";
					break;
				default:
					if (n.nodeType == 1) {
						rl.moveToElementText(n);
						txt2 += rl.text;
						if (n.currentStyle.display == 'block')
							txt2 += "\r\n";
					}
					break;
			}
		}

		return { node: p, offset: last }
	}

	function Browser_SelectControl(win, ctrl) {
		if (jsml.msie) {
			var doc = win.document;
			var coll;
			if (doc.selection.type == "Control") {
				coll = doc.selection.createRange();
				if (coll.remove && coll.item(0) == ctrl)
					return;
			}
			switch (ctrl.nodeName) {
				case "A":
					Browser_SetPointAfter(win, ctrl);
					return;
			}
			try {
				coll = doc.body.createControlRange()
				coll.add(ctrl);
				coll.select();
			}
			catch (x) {
				//for example, the iframe is hidden
			}
		}
		else if (jsml.ie11) {
			Browser_SelectNone(win)
		}
	}

	function Browser_SelectNone(win) {
		if (jsml.msie) {
			if (win.document.selection.type == "Control") {
				var coll = win.document.selection.createRange();
				if (coll.remove) coll.remove(0);
			}
		}
		else if (jsml.ie11) {
			var sel = win.getSelection();
			sel.removeAllRanges();
		}
	}

	function Browser_SetPointBefore(win, node) {
		var p = node.parentNode
		for (var i = 0; i < p.childNodes.length; i++)
			if (p.childNodes.item(i) == node)
				Browser_SetPointInside(win, p, i);
	}
	function Browser_SetPointAfter(win, node) {
		var p = node.parentNode
		for (var i = 0; i < p.childNodes.length; i++)
			if (p.childNodes.item(i) == node)
				Browser_SetPointInside(win, p, i + 1);
	}

	function Browser_SetRangeBefore(win, node) {
		var p = node.parentNode
		for (var i = 0; i < p.childNodes.length; i++)
			if (p.childNodes.item(i) == node)
				Browser_SetRangeInside(win, p, i);
	}
	function Browser_SetRangeAfter(win, node) {
		var p = node.parentNode
		for (var i = 0; i < p.childNodes.length; i++)
			if (p.childNodes.item(i) == node)
				Browser_SetRangeInside(win, p, i + 1);
	}

	function Opera_HaveSetBug(win, node, offset) {
		if (!jsml.opera) return;
		if (node.nodeName != "BODY") return;
		if (node.firstChild && node.firstChild.nodeName == "BR")
			return true;
		return false;
	}

	function Browser_SetPointInside(win, node, offset) {
		if (!SupportMozSelection(win))
			return Browser_IE_SetInside(win, node, offset, true);

		if (Opera_HaveSetBug(win, node, offset)) offset++;

		var s = win.getSelection();
		if (!s) return;//firefox..
		if (node.nodeType == 3) {
			if (!jsml.debug)
				offset = Math.min(offset, node.nodeValue.length);
			var r = win.document.createRange();
			r.setStart(node, offset);
			s.removeAllRanges();
			try { s.addRange(r); } catch (x) { }//EDGE
		}
		if (node.nodeType == 1) {
			if (!jsml.debug)
				offset = Math.min(offset, node.childNodes.length);
			var r = win.document.createRange();
			r.setStart(node, offset);
			s.removeAllRanges();
			try { s.addRange(r); } catch (x) { }//EDGE
		}
	}
	function Browser_SetRangeInside(win, node, offset) {
		if (!SupportMozSelection(win))
			return Browser_IE_SetInside(win, node, offset, false);

		if (Opera_HaveSetBug(win, node, offset)) offset++;

		var s = win.getSelection();
		if (!s) return;//firefox..
		if (node.nodeType == 3) {
			if (!jsml.debug)
				offset = Math.min(offset, node.nodeValue.length);
			var r1 = s.getRangeAt(0);
			var r = win.document.createRange();
			r.setStart(r1.startContainer, r1.startOffset);
			r.setEnd(node, offset);
			s.removeAllRanges();
			s.addRange(r);
		}
		if (node.nodeType == 1) {
			if (!jsml.debug)
				offset = Math.min(offset, node.childNodes.length);
			var r1 = s.getRangeAt(0);
			var r = win.document.createRange();
			r.setStart(r1.startContainer, r1.startOffset);
			r.setEnd(node, offset);
			s.removeAllRanges();
			s.addRange(r);
		}
	}

	function IE_CreateRange(win, node, offset) {
		var r = win.document.body.createTextRange();
		if (node.nodeType == 3) {
			var pe = node.parentNode;
			var pelen = pe.childNodes.length;
			if (pe.childNodes.item(0) == node) {
				try {
					r.moveToElementText(pe);
				}
				catch (x) {
					//TODO:pe is a control..
					return null;
				}
				//TODO: IE8 Bug , will jump to prev element
				//r.collapse(true);

				if (!offset) {
					r.move("character", 1);
					r.collapse(true);
					r.move("character", -1);
				}
				else {
					r.collapse(true);
					r.moveEnd("character", offset);
				}

				return r;
			}
			for (var i = 0; i < pelen; i++) {
				if (pe.childNodes.item(i) != node)
					continue;
				r = IE_CreateRange(win, pe, i);
				if (offset) r.moveEnd("character", offset);
				return r;
			}
			return null;
		}

		if (node.nodeType != 1)
			return null;

		if (offset == 0 || offset >= node.childNodes.length) {
			try {
				r.moveToElementText(node);
			}
			catch (x) {
			}
			r.collapse(offset == 0);
			return r;
		}

		var index = offset - 1;
		for (; index >= 0; index--) {
			var child = node.childNodes.item(index);
			if (child.nodeType == 1) {
				r.moveToElementText(child);
				r.collapse(false);
				break;
			}
		}
		index++
		if (index == 0) {
			r.moveToElementText(node);
			r.collapse(true);
		}
		for (; index < offset; index++) {
			var child = node.childNodes.item(index);
			switch (child.nodeName) {
				case "#text":
					r.moveEnd("character", child.nodeValue.length);
					break;
				case "BR":
					r.moveEnd("character", 2);
					break;
				case "HR":
					r.moveEnd("character", 4);
					break;
				default:
					if (child.nodeType != 1)
						break;
					var tempr = win.document.body.createTextRange();
					tempr.moveToElementText(child);
					var len = rl.text.length;
					if (n.currentStyle.display == 'block')
						len += 2;
					r.moveEnd("character", len);
					break;
			}
		}
		return r;
	}

	function Browser_IE_SetInside(win, node, offset, start) {
		var r = IE_CreateRange(win, node, offset);
		if (!r)
			return false;
		try {
			r.collapse(false)
			if (!start) {
				//clone the current start point
				r.setEndPoint("StartToStart", win.document.selection.createRange());
			}
			r.select();
		} catch (x) {
			return false;
		}
		return true;
	}

	function Browser_FindNextText(win, text, mcase, mword) {
		if (SupportMozSelection(win) && win.find)
			return win.find(text, !!mcase, false, false, !!mword, false, false)

		if (jsml.ie11)
			return false;

		win.focus();
		var sel = win.document.selection;
		var range = sel.createRange();
		range.collapse(false);
		var mtype = 0;
		if (mcase) mtype += 4;
		if (mword) mtype += 2;
		if (!range.findText(text, 1000000000, mtype))
			return false;

		function doselect() {
			try {
				win.focus();
				range.select();
				return true;
			}
			catch (x) {
			}
		}
		if (doselect())
			return true;
		//$rte.SafeSetTimeout(doselect,10);
		return true;
	}

	function Browser_ScrollIntoView(element, bh) {
		var doc = element.ownerDocument;
		if (!doc) return;//IE5.5...

		de = jsml.msieall ? doc.documentElement : doc.body;

		var st = 0;
		var sl = 0;
		for (; element != null; element = element.offsetParent) {
			st += element.offsetTop;
			sl += element.offsetLeft;
		}

		if (de.scrollTop > st - 48)
			de.scrollTop = st - 48;
		if (de.scrollTop < st + 48 - bh)
			de.scrollTop = st + 48 - bh;
	}




	this._browserSetPointInside = function (win, node, offset) {
		Browser_SetPointInside(win, node, offset);
	}


	var supportcopy = window.getSelection && document.queryCommandSupported("copy");


	this.__LoadRteFC = function () {
		if (supportcopy)
			return;
		if (jsml.opera)
			return;
		if (jsml.firefox) {
			if (/Firefox\/[23]\./i.test(jsml.userAgent))
				return
		}

		var url = this.__config.folder + "scripts/rtefc.swf";

		var objid = "EditorFC" + new Date().getTime();
		var width = 20;
		var height = 20;
		if (jsml.msieall) {
			width = 1; height = 1;
		}
		var wmode = "opaque"//"opaque";
		var scale = "exactfit"
		var http = location.href.substring(0, 8) == "https://" ? "https:" : "http";

		var div = document.createElement("DIV");
		jsml.set_opacity(div, 1);
		div.style.zIndex = '7777777';
		div.style.position = "absolute";
		div.style.left = '-111px';
		div.style.top = '1px';
		if (jsml.msieall) {
			div.style.left = '1px';
			div.style.top = '1px';
		}
		document.body.insertBefore(div, document.body.firstChild);

		var embedhtml = '<embed scale="' + scale + '" src="' + url + '" quality="high" bgcolor="#FFFFFF" width="' + width + '" height="' + height + '" name="' + objid + '" align="middle" allowScriptAccess="sameDomain" wmode="' + wmode + '" type="application/x-shockwave-flash" pluginspage="' + http + '://www.macromedia.com/go/getflashplayer" />';
		if (jsml.msie56789 || jsml.msie10) {
			embedhtml = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + http + '://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + width + '" height="' + height + '" id="' + objid + '" align="middle">'
				+ '<param name="movie" value="' + url + '" /><param name="bgcolor" value="#FFFFFF" /><param name="quality" value="high" /><param name="allowScriptAccess" value="sameDomain" /><param name="wmode" value="' + wmode + '" />'
				+ '<param name="scale" value="' + scale + '" />'
				+ embedhtml
				+ '</object>';
		}
		div.innerHTML = embedhtml;

		this.__EditorFC_ID = objid;
		this.__EditorFC_DIV = div;
		var fc = div.firstChild;

		var checkfc = this.delegate(function () {
			var loaded = false;
			try {
				if (fc.isLoaded)
					loaded = fc.isLoaded();
			}
			catch (x) {
			}
			if (!loaded) {
				$rte.SafeSetTimeout(checkfc, 10);
				return;
			}
			this.__EditorFCData = {};
			this.__EditorFC = fc;

		});
		$rte.SafeSetTimeout(checkfc, 10);
	}

	this.__FCOnTCClick = function (cut) {
		var html;
		var text;
		html = this._broadcastEvent(cut ? "TCCut" : "TCCopy", arguments)
		if (!html)
			return;

		if (text == null) {
			text = jsml.html_decode(html);
		}

		var fc = this.__EditorFC;

		if (fc && fc.setVars) {
			fc.setVars("_clipboardtext", text);
			fc.setVars("_clipboardhtml", html);
		}
	}

	this.__FCOnClick = function (cut, node) {
		var fc = this.__EditorFC;

		var html;
		var text;

		if (node) {
			html = node.__getHtmlCode();
			if (node.nodeType == 3)
				text = node.__text;
			if (cut) {
				this.__removeNode(node, true);
			}
		}
		else {
			var seltype = this.GetSelectionType();

			if (seltype != "Range" && seltype != "Control") {
				if (fc && fc.setVars) fc.setVars("_clipboardstop", "1");
				return;
			}

			if (this._broadcastEvent(cut ? "PreCut" : "PreCopy") === false) {
				if (fc && fc.setVars) fc.setVars("_clipboardstop", "1");
				return;
			}

			if (seltype == "Range") {
				html = this.ExtractRangeHTML(cut);
			}
			else {
				var node = this.GetPointNode();
				text = "[" + node.GetName() + "]";
				html = node.__getHtmlCode();
				if (cut) this.DeleteSelection();
			}
		}

		html = this.__filterForCutCopy(html);

		if (text == null) {
			text = jsml.html_decode(html);
		}

		if (fc && fc.setVars) {
			html = this.__logCutCopyHtml(html);
			fc.setVars("_clipboardtext", text);
			fc.setVars("_clipboardhtml", html);
		}
		else if (supportcopy) {
			var div = document.createElement("div");
			div.style.cssText = "position:absolute;left:-1px;top:-1px;width:1px;height:1px;opacity:0.01;";
			div.contentEditable = true;
			div.innerHTML = html;
			document.body.appendChild(div);
			var s = window.getSelection();
			var pr;
			if (s.rangeCount > 0) pr = s.getRangeAt(0);
			s.removeAllRanges();
			var nr = document.createRange();
			s.addRange(nr);
			nr.selectNodeContents(div);
			document.execCommand(cut ? "cut" : "copy");
			s.removeAllRanges();
			if (pr) s.addRange(pr);
			setTimeout(function () {
				document.body.removeChild(div);
			}, 100);
		}

	}
	this._ResetFCButton = function (element, command, node, onhover, onleave, ondown, onup, onclick, targetnode) {


		if (supportcopy) {
			element.onclick = this.delegate(function () {
				this.__FCOnClick(command.toLowerCase() == "cut", node);
			});
			return;
		}

		var fc = this.__EditorFC;
		var div = this.__EditorFC_DIV;
		var data = this.__EditorFCData;

		if (!fc || !fc.setVars) {
			element.onclick = function () {
				//alert("Flash addon is not installed.");
				alert("Use CTRL+C");
			}
			return;
		}


		if (!fc || !div || !data) return;

		div.setAttribute("title", element.getAttribute("title") || "");

		var funcname = this.__EditorFC_ID + "_func";

		if (data.element != element) {
			if (data.ishover && data.onleave) data.onleave.apply(element, []);
			if (data.isdown && data.onup) data.onup.apply(element, []);
			data.element = element;
			data.command = command;
			data.onhover = onhover;
			data.onleave = onleave;
			data.ondown = ondown;
			data.onup = onup;
			data.onclick = onclick;
			data.ishover = true;
		}

		fc.setVars("_clipboardfunc", funcname);
		window[funcname] = this.delegate(function () {
			//			try
			//			{
			this.Focus();
			if (onclick && onclick.apply(element, []) === false)
				return;
			switch (command.toLowerCase()) {
				case "tc_cut":
					this.__FCOnTCClick(true, node);
					break;
				case "tc_copy":
					this.__FCOnTCClick(false, node);
					break;
				case "cut":
					this.__FCOnClick(true, node);
					break;
				default://copy
					this.__FCOnClick(false, node);
					break;
			}

			this.Focus();
			//			}
			//			catch(x)
			//			{
			//				alert(x.message);
			//			}
		})

		div.onmousedown = function (e) {
			data.isdown = true;
			if (ondown) ondown.apply(element, []);
			e = e || window.event;
			if (e.button == 2) jsml.cancel_event_function(e);
			jsml.cancel_bubble_function(e);
		}
		div.onmouseup = function () {
			data.isdown = false;
			if (onup) onup.apply(element, []);
		}
		div.onmouseover = function () {
			data.ishover = true;
			if (onhover) onhover.apply(element, []);
		}
		div.onmouseout = function () {
			div.style.left = '-111px';
			div.style.top = '-111px';
			if (jsml.msieall) {
				div.style.left = '1px';
				div.style.top = '1px';
			}
			div.style.width = '1px';
			div.style.height = '1px';
			data.ishover = false;
			if (onleave) onleave.apply(element, []);
		}


		var pos = jsml.calc_position(div, element);
		var w = element.offsetWidth + 4;
		var h = element.offsetHeight + 4;
		div.style.top = pos.top + "px";
		div.style.left = pos.left + "px";
		div.style.width = w + "px";
		div.style.height = h + "px";
		fc.width = w;
		fc.height = h;

	}




	function _RTEAjax_Eval(_callback, call) {
		eval(_callback);
	}
	function RTEAjax(ctrlid, method, callback, arg0) {
		var editor = this;


		if (ctrlid == null) throw (new Error("ArgumentNull:ctrlid"));
		if (method == null) throw (new Error("ArgumentNull:method"));

		var argoffset = 3;
		var args = [];
		for (var i = argoffset; i < arguments.length; i++) {
			args[i - argoffset] = arguments[i];
		}

		function ThisCallback() {
			if (typeof (callback) == "function") {
				return callback(call);
			}
			else if (typeof (callback) == "string") {
				return _RTEAjax_Eval(callback, call);
			}
			else {
				//true/false?
			}
		}

		var call = {};
		call.Url = this.__config.ajaxpostbackurl;
		call.UniqueID = ctrlid;
		call.Control = ctrlid;
		call.Method = method;
		call.Arguments = args;
		call.Callback = ThisCallback;
		call.Async = !!callback;
		call.AjaxContextData = editor.__config.ajaxcontext;

		var ctrl = (call.UniqueID && document.getElementById(call.UniqueID))
			|| (call.Control || document.getElementById(call.Control))
		for (; ctrl != null; ctrl = ctrl.parentNode) {
			if (ctrl.nodeName == "FORM")
				call.Form = ctrl;
		}

		_RTEAjax_SendRequest(call);

		if (call.Async)
			return;

		if (call.Exception)
			throw (new Error(call.Exception.Description));

		if (call.Error)
			throw (call.Error);

		return call.ReturnValue;
	}

	function _RTEAjax_ReplaceHiddenValue(html, name) {
		var hidden = document.getElementById(name);
		if (!hidden) return;
		var prefix = '<input type="hidden" name="' + name + '" id="' + name + '" value="';
		var suffix = '" />';
		var pos = html.indexOf(prefix);
		if (pos == -1) return;
		var pos2 = html.indexOf(suffix, pos);
		var val = html.substring(pos + prefix.length, pos2);
		hidden.value = val;
	}
	function _RTEAjax_UpdateUI(call) {
		if (call.Refreshs) {
			for (var i = 0; i < call.Refreshs.length; i++) {
				var item = call.Refreshs[i];
				var cid = item.ClientID;
				var uid = item.UniqueID;
				var html = item.Html;

				var ctrl = document.getElementById(cid);
				if (ctrl == null)
					ctrl = document.getElementById(uid);
				if (ctrl != null) {
					var div = document.createElement("DIV");
					div.innerHTML = html;
					while (div.childNodes.length)
						ctrl.parentNode.insertBefore(div.childNodes.item(0), ctrl);
					ctrl.parentNode.removeChild(ctrl);
				}
			}
		}
		if (call.FormHtml) {
			_RTEAjax_ReplaceHiddenValue(call.FormHtml, "_" + "_VIEWSTATE");
			_RTEAjax_ReplaceHiddenValue(call.FormHtml, "_" + "_EVENTVALIDATION");
		}
	}

	function _RTEAjax_GetXmlText(node) {
		var s = node.text;
		if (s) return s;

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
	function _RTEAjax_SendRequest(call) {

		var ajaxdata = window.RTEAjaxData;

		if (ajaxdata != null) {
			var ctrl;
			for (var i = 0; i < ajaxdata.Controls.length; i++) {
				var eachctrl = ajaxdata.Controls[i];
				if (eachctrl.UniqueID == call.Control || (eachctrl.IsPage && call.Control == '')) {
					ctrl = eachctrl;
					call.UniqueID = eachctrl.UniqueID;
					break;
				}
			}
			if (ctrl != null) {
				var method;
				for (var i = 0; i < ctrl.Methods.length; i++) {
					var eachmethod = ctrl.Methods[i];
					if (!eachmethod.Name) {
						eachmethod.Name = eachmethod[0];
						eachmethod.ParameterCount = eachmethod[1];
					}
					if (eachmethod.Name == call.Method) {
						method = eachmethod;
						break;
					}
				}
				if (method != null) {
					if (call.Arguments.length != method.ParameterCount) throw (new Error("Method:" + call.Method + " Need " + method.ParameterCount + " Parameters"));
				}
			}
		}


		function HandleXMLHttpRequestReadyState() {
			if (xh.readyState != 4) return;
			var xh2 = xh;
			xh = null;

			try {
				ParseResponse(xh2);
			}
			catch (x) {
				call.Error = x;
			}

			if (call.Callback) {
				//callback return true mean handled the error
				if (call.Callback(call))
					return;
			}

			if (call.Error) {
				throw (call.Error);
			}
		}

		function ParseResponse(xh) {
			var xhstatus = -1;
			try {
				xhstatus = xh.status;
			}
			catch (x) {
				throw (new Error('http error :' + xhstatus + ':' + xh.statusText + ':\n' + xh.responseText));
			}
			if (xhstatus != 200) {
				throw (new Error('http error1 :' + xhstatus + ':' + xh.statusText));
			}

			var df = xh.responseXML;
			if (df == null) {
				throw (new Error('http error2 :' + xh.responseText));
			}

			if (df.documentElement == null) {
				throw (new Error('http error3 :' + xh.responseText));
			}

			var docnodes = _RTEAjax_SelectNodes(df.documentElement, "*");
			var resElement = docnodes[0];

			if (resElement.tagName == 'exception') {
				call.Exception = {};
				call.Exception.Message = resElement.getAttribute('message');
				call.Exception.StackTrace = resElement.getAttribute('stacktrace');
				//alert(call.Exception.StackTrace);
				//TODO:fire fox get innerText ?
				call.Exception.Description = 'server side ' + (resElement.text || resElement.innerText || _RTEAjax_GetXmlText(resElement));
				call.Error = new Error(call.Exception.Message + "\r\n" + call.Exception.StackTrace);
				return;
			}

			var argi = 0;
			for (var i = 0; i < resElement.childNodes.length; i++) {
				var node = resElement.childNodes.item(i);
				if (node.nodeType != 1) continue;

				switch (node.tagName) {
					case "result":
						call.ReturnValue = _RTEAjax_DeserializeElement(node);
						break;
					case "arg":
						var argx = _RTEAjax_DeserializeElement(node);
						if (typeof (argx) != 'undefined') {
							call.Arguments[argi] = argx;
						}
						argi++;
						break;
					case "refresh":
						if (call.Refreshs == null) call.Refreshs = [];
						var refresh = {};
						refresh.ClientID = node.getAttribute("cid");
						refresh.UniqueID = node.getAttribute("uid");
						refresh.Html = node.getAttribute("html");
						call.Refreshs[call.Refreshs.length] = refresh;
						break;
					case "form":
						call.FormHtml = node.getAttribute("html");
						break;
				}
			}

			_RTEAjax_UpdateUI(call);
		}

		var url = call.Url;
		if (!url) {
			if (call.Form && call.Form.action) {
				url = call.Form.action;
			}
			else {
				url = document.URL;
			}
		}

		if (url.indexOf("#") != -1)
			url = url.substr(0, url.indexOf("#"));

		var ajaxurl = url;
		if (ajaxurl.indexOf("?") == -1)
			ajaxurl += "?";
		else
			ajaxurl += "&";
		//TODO use http header ???
		ajaxurl += "RTEAjaxInvoke=1&_gait=" + new Date().getTime();

		var xh = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
		xh.open("POST", ajaxurl, call.Async);

		if (call.Async) {
			xh.onreadystatechange = HandleXMLHttpRequestReadyState;
		}

		var arr = [];
		_RTEAjax_GetFormData(call, arr);
		arr[arr.length] = "RTEAjaxInvoke_Control=" + encodeURIComponent(call.UniqueID);
		arr[arr.length] = "RTEAjaxInvoke_Method=" + encodeURIComponent(call.Method);

		if (call.AjaxContextData) {
			arr[arr.length] = "RTEAjaxInvoke_ContextData=" + encodeURIComponent(call.AjaxContextData);
		}

		var outerElement = document.createElement("OUTERELEMENT");
		for (var i = 0; i < call.Arguments.length; i++) {
			var element = outerElement.ownerDocument.createElement("arg");
			outerElement.appendChild(element);
			_RTEAjax_SerializeToElement(element, call.Arguments[i]);
		}
		var html = _RTEAjax_GetInnerHtml(outerElement);
		var argsdata = html.split('-').join('-0').split('<').join('-1').split('>').join('-2').split('&').join('-3').split("'").join('-4').split('"').join('-5');
		arr[arr.length] = "RTEAjaxInvoke_Arguments=" + encodeURIComponent(argsdata);
		var data = arr.join("&");

		xh.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		xh.send(data);

		if (call.Async) return;

		ParseResponse(xh);
	}
	function _RTEAjax_GetInnerHtml(element) {
		var arr = [];

		FormatNodes(element.childNodes);
		function FormatNodes(nodes) {
			for (var i = 0; i < nodes.length; i++) {
				var node = nodes.item(i);
				if (node.nodeType == 1) {
					FormatElement(node);
				}
				else if (node.nodeType == 3) {
					//alert(node.nodeValue);
				}
			}
		}
		function FormatElement(node) {
			arr[arr.length] = "<" + node.nodeName.toLowerCase();
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				var val = attr.nodeValue;
				if (attr.specified && val != null) {
					arr[arr.length] = " " + attr.nodeName.toLowerCase() + "='" + HtmlEncode(val + "") + "'";
				}
			}
			if (node.childNodes.length == 0) {
				arr[arr.length] = " />";
			}
			else {
				arr[arr.length] = ">";
				FormatNodes(node.childNodes);
				arr[arr.length] = "</" + node.nodeName.toLowerCase() + ">";
			}
		}
		function HtmlEncode(str) {
			return str.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;').split("'").join('&apos;');
		}

		return arr.join("");
	}

	function _RTEAjax_GetFormData(call, arr) {
		var elements = [];
		function FillChilds(e) {
			if (!e.childNodes || !e.childNodes.length) return;
			for (var i = 0; i < e.childNodes.length; i++) {
				var c = e.childNodes.item(i);
				if (c.nodeType == 1) {
					elements.push(c);
					FillChilds(c);
				}
			}
		}

		if (call.Form) {
			elements = call.Form.elements;
		}
		else {
			FillChilds(document.body);
		}

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			if (!element.name) continue;
			if (element.getAttribute("noajax") == "1") continue;
			var value = element.value;
			if (element.nodeName == "INPUT") {
				if (element.type == "checkbox" || element.type == "radio") {
					if (!element.checked)
						continue;
				}
				if (element.type == "file" || element.type == "button" || element.type == "submit") {
					continue;
				}
			}
			else if (element.nodeName == "SELECT") {
				if (element.multiple) {
					value = "";
					var sc = 0;
					for (var j = 0; j < element.options.length; j++) {
						var option = element.options[j];
						if (!option.selected)
							continue;
						value = option.value;
						arr[arr.length] = encodeURIComponent(element.name) + "=" + (value ? encodeURIComponent(value) : "");
					}
					continue;
				}
				else if (element.selectedIndex == -1) {
					continue;
				}
			}
			arr[arr.length] = encodeURIComponent(element.name) + "=" + (value ? encodeURIComponent(value) : "");
		}
		//alert(arr)
	}

	function _RTEAjax_SerializeToElement(e, obj) {
		var parsedObjs = [];
		return Serialize(obj, e);
		function Serialize(o, e) {
			switch (typeof (o)) {
				case 'boolean':
				case 'number':
				case 'string':
					e.setAttribute('t', typeof (o));
					e.setAttribute('v', o);
					return;
				case 'object':
					if (o == null) {
						e.setAttribute('t', 'null');
						return;
					}
					switch (o.constructor) {
						case Number:
							e.setAttribute('t', 'number');
							e.setAttribute('v', o);
							return;
						case Boolean:
							e.setAttribute('t', 'boolean');
							e.setAttribute('v', o);
							return;
						case String:
							e.setAttribute('t', 'string');
							e.setAttribute('v', o);
							return;
						case Object:
							parsedObjs[parsedObjs.length] = o;
							e.setAttribute('t', 'complex');
							for (var ppt in o) {
								var ov = o[ppt];
								if (typeof (ov) == 'function')
									continue;
								if (!o.hasOwnProperty(ppt))
									continue;
								var enew = e.ownerDocument.createElement('i');
								enew.setAttribute('p', ppt);
								e.appendChild(enew);
								Serialize(ov, enew);
							}
							return;
						case Array:
							parsedObjs[parsedObjs.length] = o;
							e.setAttribute('t', 'array');
							for (var i = 0; i < o.length; i++) {
								var item = o[i];
								var enew = e.ownerDocument.createElement('i');
								e.appendChild(enew);
								Serialize(item, enew);
							}
							return;
						case Date:
							e.setAttribute('t', 'datetime');
							e.setAttribute('v', o.getTime());
							return;
						default:
							e.setAttribute('t', 'undefined');
							return;
					}
				default:
					e.setAttribute('t', 'undefined');
					return;
			}
		}
	}
	function _RTEAjax_DeserializeElement(e) {

		function CodeEncode(str) {
			var res = '';
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i).toString(16);
				while (c.length < 4) c = '0' + c;
				res += '\\u' + c;
			}
			return res;
		}
		function MakeToString(obj, str) {
			if (str == null || str == 'null') return;
			obj.toString = new Function('', 'return \'' + CodeEncode(str + '') + '\';');
		}



		var value = e.getAttribute('v');
		switch (e.getAttribute('t')) {
			case 'string':
				return value;
			case 'boolean':
				return value == 'True' || value == 'true' || value == '1' || value == '-1';
			case 'number':
				return parseFloat(value);
			case 'datetime':
				var date = new Date(parseInt(value));
				date.ticks = e.getAttribute('ticks');
				return date;
			case 'array':
				var arr = new Array();
				var nodes = _RTEAjax_SelectNodes(e, "*");
				for (var i = 0; i < nodes.length; i++) {
					arr[i] = _RTEAjax_DeserializeElement(nodes[i]);
				}
				return arr;
			case 'complex':
				var obj = new Object();
				var str = e.getAttribute('tostring');
				if (str != null) MakeToString(obj, str);
				var nodes = _RTEAjax_SelectNodes(e, "*");
				for (var i = 0; i < nodes.length; i++) {
					obj[nodes[i].getAttribute('p')] = _RTEAjax_DeserializeElement(nodes[i]);
				}
				return obj;
			case 'null':
				return null;
			case 'undefined':
				var undefinedValue;
				return undefinedValue;
			default:
				throw (new Error('unknown type:' + e.getAttribute('t')));
		}
	}
	//only support * or tagname
	function _RTEAjax_SelectNodes(element, exp) {
		var arr = [];
		for (var i = 0; i < element.childNodes.length; i++) {
			var node = element.childNodes.item(i);

			if (node.nodeType != 1)
				continue;

			if (exp == "*" || exp == node.tagName) {
				arr[arr.length] = node;
			}
		}
		return arr;
	}

	this.ParseItemList = function (self, str) {
		var editor = this;
		var arr = [];
		var lpos = 0;
		var pos = 0;
		var config = editor.__config;

		var toolbar = config._toolbartemplate || config.toolbar;
		var skin = config.skin;
		var color = config.color;

		var disabledmap = {}
		if (editor.__config.disableditems) {
			var dis = editor.__config.disableditems.split(',')
			for (var i = 0; i < dis.length; i++)
				disabledmap[dis[i]] = true;
		}

		function checkname() {
			if (pos == lpos) return;
			arr.push(str.substring(lpos, pos));
		}

		for (; pos < str.length; pos++) {
			var c = str.charAt(pos);

			switch (c) {
				case '[':
				case ']':
				case '{':
				case '}':
				case '<':
				case '>':
				case '|':
					checkname();
					arr.push(c);
					lpos = pos + 1;
					break;
				case '-':
				case '_':
				case '/':
					checkname();
					arr.push('/');
					lpos = pos + 1;
					break;
				case ' ':
				case ',':
					checkname();
					lpos = pos + 1;
					break;
				default:
					break;
			}
		}

		checkname();

		pos = 0;
		var ctx = { control: self, parent: null, dock: "flow", group: null }
		var node;


		function AddControl() {
			if (node in disabledmap)
				return;
			var clsname = "item_" + toolbar + "_" + skin + "_" + color + "_" + node;
			if (jsml.class_exists(clsname)) {
				var ctrl = jsml.class_create_instance(clsname);
				ctrl.set_dock(ctx.dock);
				ctx.control.append_child(ctrl);
			}
		}
		function AddLineBreak() {
			var ctrl = jsml.class_create_instance("linebreak_" + skin + "_" + color + "");
			ctrl.set_dock(ctx.dock);
			ctx.control.append_child(ctrl);
		}
		function EnterRobbin() {
			self.toggle_css_class("rtetoolbarwithribbon", true);

			var group = jsml.class_create_instance("ribbon_" + skin + "_" + color + "");
			var slot = -1;
			var btmgroup = null;
			ctx.control.append_child(group);
			ctx = { control: group, parent: ctx, dock: "flow", group: node };
			var currctx = ctx;
			while (!currctx.leaved && pos < arr.length) {
				node = arr[pos];
				pos++;
				if (node.length == 1) {
					ProcessNode(node);
					continue;
				}

				var fc = node.charAt(0);
				if (fc == '@') {
					group.set_text(editor.GetLangText(node.substring(1)));
					continue;
				}
				if (fc == '!') {
					group.set_text(node.substring(1));
					continue;
				}

				if (currctx != ctx) {
					AddControl(node);
					continue;
				}

				if (node in disabledmap)
					continue;

				var clsname = "item_" + toolbar + "_" + skin + "_" + color + "_" + node;
				if (!jsml.class_exists(clsname))
					continue;

				var ctrl = jsml.class_create_instance(clsname);
				slot++;
				if (slot == 0) {
					var tbg = jsml.class_create_instance("tbgroup_" + skin + "_" + color + "");
					tbg.set_dock("none");
					tbg.set_overflow_y("visible");
					group.append_child(tbg);

					ctrl.set_dock("fill");
					tbg.append_child(ctrl);

					var w = 44;
					var wadd = 5;
					var h = 47;
					if (skin == "officexp" || skin == "office2003") {
						wadd = 10;
						h = 50;
					}
					if (skin == "office2010")
						h = 48;
					if (skin == "smart") {
						w = 48;
						h = 47;
					}
					ctrl.set_width(w);
					ctrl.set_height(h);

					var panel = jsml.class_create_instance("panel");
					panel.set_overflow("visible");
					panel.set_margin([0, 0, 0, w + wadd]);
					group.append_child(panel);
					currctx.control = panel;
					continue;
				}

				if (slot == 1) {
					btmgroup = jsml.class_create_instance("tbgroup_" + skin + "_" + color + "");
					btmgroup.set_dock("none");
					var h = 54;
					if (skin == "officexp")
						h = 58;
					if (skin == "office2010")
						h = 54;
					if (skin == "office2003")
						h = 60;
					if (skin == "smart")
						h = 52;
					btmgroup.set_top(h);
					group.append_child(btmgroup);
				}

				if (slot <= 2) {
					ctrl.set_dock("left");
					btmgroup.append_child(ctrl);
				}

			}
		}
		function EnterTBGroup(follow) {
			var group = jsml.class_create_instance("tbgroup_" + skin + "_" + color + "");
			if (node == '[') group._element.setAttribute("noradius", "1");
			group.set_dock(ctx.dock);
			ctx.control.append_child(group);
			ctx = { control: group, parent: ctx, dock: "left", group: node };
			if (follow) group.set_flow_clear("follow");
		}
		function FollowGroup() {
			if (ctx.group == '{' || ctx.group == '[') {
				node = ctx.group;
				var cs = ctx.control._childs;
				if (!cs || cs.length == 0) ctx.control.dispose();
				ctx.leaved = true;
				ctx = ctx.parent;
				EnterTBGroup(true);
			}
		}
		function ExitGroup() {
			if ((ctx.group == "<" && node == ">") || (ctx.group == "{" && node == "}") || (ctx.group == "[" && node == "]")) {
				var cs = ctx.control._childs;
				if (!cs || cs.length == 0) ctx.control.dispose();
				ctx.leaved = true;
				ctx = ctx.parent;
			}
		}

		function ProcessNode(node) {
			switch (node) {
				case '<':
					EnterRobbin();
					break;
				case '{':
				case '[':
					EnterTBGroup();
					break;
				case '>':
				case '}':
				case ']':
					ExitGroup();
					break;
				case '|':
					FollowGroup();
					break;
				case '/':
					AddLineBreak();
					break;
				default:
					AddControl();
					break;
			}
		}

		function ProcessNext() {
			jsml.suppend_layout();
			var d1 = new Date().getTime();
			while (pos < arr.length) {
				node = arr[pos];
				pos++;
				ProcessNode(node);
				if (config.syncloadtoolbar)
					continue;
				var ts = new Date().getTime() - d1;
				if (ts < 33)
					continue;
				jsml.queue_resumehandler(function () {
					$rte.SafeSetTimeout(ProcessNext, 11);
				});
				break;
			}
			if (pos >= arr.length && !config.syncloadtoolbar && self._childs) {
				for (var index = 0; index < self._childs.length; index++) {
					self._childs[index].invoke_recursive("editor_ready", editor);
				}
			}
			jsml.resume_layout();
		}
		if (config.syncloadtoolbar) {
			ProcessNext()
		}
		else {
			$rte.SafeSetTimeout(ProcessNext, 11);
		}
	}

});
