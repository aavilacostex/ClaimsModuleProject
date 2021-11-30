/****************************************************************\
	Copyright (c) CuteSoft 2005-2006
	All rights reserved.
\****************************************************************/

//core.js
/****************************************************************\
	*
	*	Menu Tree Implementation
	*
\****************************************************************/


var _menuclass_currentmenu;
var menuimagebase="";

function CloseCurrentMenu() {
	if (_menuclass_currentmenu) {
		_menuclass_currentmenu.Close();
	}
	_menuclass_currentmenu=null;
}

function CreateMenu()
{
	var const_menuwidth=110;
	var const_submenudelay=10;
	
	
	return new MenuClass();

	function Html_SetCssText(obj, text) {
		if (!navigator.userAgent.indexOf("Opera")>=0) {
			obj.style.cssText = text;
			return;
		}
		var rules = text.split(";");
		for (var ri = 0; ri < rules.length; ri++) {
			var rule = rules[ri];
			var pair = rule.split(":");
			var name = pair[0].replace(/\s/g, "");
			var value = (pair[1] || "").replace(/\s/g, "");

			if (name.indexOf('-') != -1) {
				var arr = name.split('-');
				name = arr[0];
				if (arr.length == 2) {
					var item = arr[1];
					name += item.substr(0, 1).toUpperCase() + item.substring(1).toLowerCase();
				}
				else {
					for (var i = 1; i < arr.length; i++) {
						var item = arr[i];
						name += item.substr(0, 1).toUpperCase() + item.substring(1).toLowerCase();
					}
				}
				obj.style[name] = value;
			}
			else {
				obj.style[name.toLowerCase()] = value;
			}
		}
	}

	function GetScrollPostion(e) {
		var b = window.document.body;
		var p = b;
		if (window.document.compatMode == "CSS1Compat") {
			p = window.document.documentElement;
		}

		if (e == b) return { left: 0, top: 0 };

		//if(e.getBoundingClientRect)
		//{
		//	var b=e.getBoundingClientRect();
		//	return {left:p.scrollLeft+b.left,top:p.scrollTop+b.top};
		//}

		var l = 0;
		var t = 0;
		var box;
		var offset;

		l = e.offsetLeft;
		t = e.offsetTop;
		offset = e.offsetParent;
		if (offset != e) {
			while (offset) {
				l += offset.offsetLeft;
				t += offset.offsetTop;
				offset = offset.offsetParent;
			}
		}
		if (window.opera) {
			offset = e.offsetParent;
			while (offset && offset.tagName.toUpperCase() != "BODY" && offset.tagName.toUpperCase() != "HTML") {
				l -= offset.scrollLeft;
				t -= offset.scrollTop;
				offset = offset.offsetParent;
			}
		}
		else {
			offset = e.parentNode;
			while (offset && offset.tagName.toUpperCase() != "BODY" && offset.tagName.toUpperCase() != "HTML") {
				l -= offset.scrollLeft;
				t -= offset.scrollTop;
				offset = offset.parentNode;
			}
		}
		return { left: l, top: t }
	}
	//get the position of a element ( by the client offset )
	function GetClientPosition(e) {
		var b = window.document.body;
		var p = b;
		if (window.document.compatMode == "CSS1Compat") {
			p = window.document.documentElement;
		}

		if (e == b) return { left: -p.scrollLeft, top: -p.scrollTop };

		if (e.getBoundingClientRect) {
			var b = e.getBoundingClientRect();
			return { left: b.left - p.clientLeft, top: b.top - p.clientTop };
		}

		var l = 0;
		var t = 0;
		for (var e1 = e; e1 != null && e1 != b; e1 = e1.offsetParent) {
			l += e1.offsetLeft;
			t += e1.offsetTop;
		}
		return { left: l - p.scrollLeft, top: t - p.scrollTop }
	}
	//get absolute or relative parent
	function GetStandParent(e) {
		if (e.currentStyle) {
			for (var pe = e.parentElement; pe != null; pe = pe.parentElement) {
				var sp = pe.currentStyle.position;
				if (sp == "absolute" || sp == "relative")
					return pe;
			}
		}
		else {
			var view = e.ownerDocument.defaultView;
			for (var pe = e.parentNode; pe != null && pe.nodeType == 1; pe = pe.parentNode) {
				var sp = view.getComputedStyle(pe, "").getPropertyValue("position")
				if (sp == "absolute" || sp == "relative")
					return pe;
			}
		}
		return (e.ownerDocument || e.document).body;
	}
	//calc the position of floate that relative to e
	function CalcPosition(floate, e) {
		var epos = GetScrollPostion(e);
		var spos = GetScrollPostion(GetStandParent(floate));
		var s = GetStandParent(floate);
		var pos = { left: epos.left - spos.left - (s.clientLeft || 0), top: epos.top - spos.top - (s.clientTop || 0) };
		return pos
	}

	function RemoveObjectMembers(obj)
	{
		for(var v in obj)
		{
			obj[v]=null;
		}
	}

	function Menu_ShowFrame(frame,target,offsetX,offsetY)
	{
		frame.style.visibility = '';
		var ox = Math.ceil(frame.offsetWidth / 2);
		var oy = Math.ceil(frame.offsetHeight / 2);
		var pos=CalcPosition(frame,target);
		pos.left += offsetX + ox + 10;
		pos.top += offsetY + 5;
		//AdjustMirror(frame,target,pos);
		frame.style.left = pos.left + "px";
		frame.style.top = pos.top + "px";
		
		frame.style.display='block';
	}

	function MenuClass_GetCurrentMenu()
	{
		return _menuclass_currentmenu;
	}

	function Create_MenuItemDiv_OnMouseOver(menuitem)
	{
		return MenuItemDiv_OnMouseOver;
		function MenuItemDiv_OnMouseOver()
		{
			var itemdiv=menuitem.itemdiv;
		
			//if(itemdiv.contains(event.fromElement))return;
			
			menuitem.style_backgroundColor=itemdiv.style.backgroundColor;
			menuitem.style_border=itemdiv.style.border;
			menuitem.style_margin=itemdiv.style.margin;
			
			itemdiv.style.backgroundColor="#B6BDD2";
			itemdiv.style.border="1px solid #0A246A";
			itemdiv.style.margin="0px";

			menuitem.ismouseover=true;

			if(menuitem.onmouseover)menuitem.onmouseover(menuitem);
			
			var closenearmenumode=1;
			
			if(closenearmenumode==0)
			{
				//close now
				if(menuitem.owner.openitem)
				{
					if(menuitem.owner.openitem!=menuitem)
						menuitem.owner.openitem.Close();
				}
			}

			menuitem.opentimerid=setTimeout(OpenIt,const_submenudelay);
			function OpenIt()
			{
				if(menuitem.isdisposed)return;
				if(!menuitem.owner)return;
				
				if(closenearmenumode==1)
				{
					//close delay
					if(menuitem.owner.openitem)
					{
						if(menuitem.owner.openitem!=menuitem)
							menuitem.owner.openitem.Close();
					}
				}
				
				if(!menuitem.initialized)
				{
					if(menuitem.oninitialize)
						menuitem.oninitialize(menuitem);
					menuitem.initialized=true;
				}
				if(menuitem.items.length!=0)
				{
					var f=menuitem.owner.frame;
					var pos=GetScrollPostion(f);
					var top=GetScrollPostion(itemdiv).top
					if(f.nodeName=="IFRAME")
						top+=pos.top;
					menuitem.Show( (f.ownerDocument||f.document).body,pos.left+itemdiv.offsetWidth,top);
				}
			}
		}
	}
	function Create_MenuItemDiv_OnMouseOut(menuitem)
	{
		return Handle_OnMouseOut;
		function Handle_OnMouseOut()
		{
			MenuItemDiv_OnMouseOut(menuitem);
		}
	}
	function MenuItemDiv_OnMouseOut(menuitem)
	{
		if(!menuitem.ismouseover)return;
		menuitem.ismouseover=false;
		
		var itemdiv=menuitem.itemdiv;
		
		clearTimeout(menuitem.opentimerid)

		itemdiv.style.backgroundColor=menuitem.style_backgroundColor;
		itemdiv.style.border=menuitem.style_border;
		itemdiv.style.margin=menuitem.style_margin;
		
		if(menuitem.onmouseout)menuitem.onmouseout(menuitem);
	}

	function Create_MenuItemDiv_OnClick(menuitem)
	{
		return MenuItemDiv_OnClick;
		function MenuItemDiv_OnClick()
		{
			var clickfunc=menuitem.onclick;
			if(clickfunc)
			{
				menuitem.menu.HideByClick();
				try
				{
					menuitem.itemdiv.onmouseout();
				}
				catch(x)
				{
				}
				var timer=setTimeout(function()
				{
					if(menuitem.menu&&menuitem.menu.Close)
					{
						menuitem.menu.Close();
					}
				},1);
				clickfunc(menuitem);
				clearTimeout(timer);
			}
		}
	}
	function MenuClass_CreateFrame(menuitem)
	{
		var frame;
		var framebody;
		var framedoc=null;
		
		{
			frame=document.createElement("IFRAME");
			
			frame.frameBorder=0;
			
			document.body.appendChild(frame);
			
			if(location.href.substr(0,6)=="https:")
			{
				frame.src="blank.html";
			}
			else
			{
				frame.src="about:blank";
			}
			
			
			
			//TODO:IE5 don't support contentWindow..
			var framewin=frame.contentWindow;
			if(framewin==null)
			{
				framedoc=frame.contentDocument;
			}
			else
			{
				framedoc=framewin.document;
			}

			framedoc.open();
			framedoc.write("<html><TITLE></TITLE><BODY oncontextmenu='event.returnValue=false;event.cancelBubble=true;' style='border:1px solid #666666;padding:2px;margin:0px;overflow:hidden;background-image:url("+menuimagebase+"menuleft.gif);background-repeat:repeat-y;'></BODY></html>");
			framedoc.close();
			

			framebody=framedoc.body;
		}
		Html_SetCssText(frame,"visibility:hidden;position:absolute;background-color:white;padding:0px;border:0px;width:"+(const_menuwidth+40)+"px;height:90px;overflow:visible;");
		frame.style.zIndex=menuitem.zIndex;

		var table=framedoc.createElement("TABLE");

		table.border=0;
		table.cellSpacing=0;
		table.cellPadding=0;
		
		Html_SetCssText(table,"cursor:default;width:100%;overflow:visible;");

		for(var i=0;i<menuitem.items.length;i++)
		{
			var childitem=menuitem.items[i];
			
			var tr=table.insertRow(-1);
			var cell=tr.insertCell(-1);
			Html_SetCssText(cell,'overflow:visible;');
			
			if(childitem.html=='-')//spliter
			{
				if(i!=menuitem.items.length-1)
					cell.innerHTML="<div style='overflow:hidden;border-top:1px solid ThreeDShadow;border-bottom:1px solid ThreeDHighlight;height:2px;'></div>";
				continue;
			}

			var tablehtml="<table border=0 cellspacing=0 cellpadding=0 style='font:normal 8.5pt MS Sans Serif;height:20px;width:100%;overflow:visible;'>";
			tablehtml+="<tr><td style='width:18px'>"
			if(childitem.imgurl)
			{
				//width=20 height=20 
				tablehtml+="<img align=absmiddle width=16 height=16 border=0 src='"+childitem.imgurl+"'"
				if(childitem.state==2)
				{
					tablehtml+=" style='' "
				}
				else if(childitem.enable)
				{
					tablehtml+=" style='' "
				}
				else
				{
					tablehtml+=" style='' "
				}
				tablehtml+="/>";
			}
			else
			{
				tablehtml+="<img width=20 height=0 border=0 style='visibility:hidden' />";
			}

			if(childitem.hotkey)
			{
				tablehtml+="</td><td  nowrap align='left' style='width:"+const_menuwidth+";padding-left:4px;padding-top:2px;padding-right:4px;";
				if(childitem.color)
					tablehtml+="color:"+childitem.color;
				tablehtml+="'>"+childitem.html+"</td>";
				tablehtml+="<td align='left' style='width:43px;font:normal 8.5pt MS Sans Serif;padding-left:1px;padding-top:3px;' rem-disabled=true nowrap>"+childitem.hotkey+"</td>";
			}
			else
			{
				tablehtml+="</td><td colspan=2 nowrap=nowrap align='left' style='width:"+const_menuwidth+";padding-left:4px;padding-top:2px;padding-right:4px;";
				if(childitem.color)
					tablehtml+="color:"+childitem.color;
				tablehtml+="'>"+childitem.html+"</td>";
			}
			
			if(true)
			{
				tablehtml+="<td align='right' style='width:20px;padding-top:2px;padding-right:2px;'><span style='width:20px;";
				if(childitem.items.length==0&&childitem.oninitialize==null)
				{
					tablehtml+=";visibility:hidden;"
				}
				if(document.all)
					tablehtml+=";font-family:webdings;font-size:14px;'> 4 </span></td>";
				else
					tablehtml+=";font-family:arial;font-size:14px;'> &gt; </span></td>";
			}
			else
			{
				if(childitem.items.length==0&&childitem.oninitialize!=null)
				{
					tablehtml+="<td align='right' style='width:20px;padding-top:2px;padding-right:2px;'><span style='width:20px;";
					if(document.all)
						tablehtml+=";font-family:webdings;font-size:14px;'> 4 </span></td>";
					else
						tablehtml+=";font-family:arial;font-size:14px;'> &gt; </span></td>";
				}
			}
			
			tablehtml+="</tr></table>";
			
			var itemdiv=framedoc.createElement("DIV");
			childitem.itemdiv=itemdiv;
			Html_SetCssText(itemdiv, "cursor:default;margin:1px;width:100%;overflow:visible;" + (childitem.enable ? "" : "opacity:0.4;filter:alpha(opacity=40);-moz-opacity:0.4;"));
			if (!childitem.enable) {
				itemdiv.style.MozOpacity = 0.4;
				itemdiv.style.Opacity = 0.4;
			}
			itemdiv.innerHTML=tablehtml;
		
				
			if(childitem.enable)
			{
				itemdiv.onmouseover=Create_MenuItemDiv_OnMouseOver(childitem);
				itemdiv.onmouseout=Create_MenuItemDiv_OnMouseOut(childitem);
				itemdiv.onclick=Create_MenuItemDiv_OnClick(childitem);

				if(childitem.onclick) {
					if (/MSIE 5/.test(navigator.userAgent))
						itemdiv.style.cursor = 'hand';
					else
						itemdiv.style.cursor='pointer';
				}
			}
			else
			{
				//itemdiv.disabled=!childitem.enable;
			}

			cell.appendChild(itemdiv);
		}
		
		framebody.appendChild(table);

		frame.style.width=table.offsetWidth+16+"px";
		frame.style.height=table.offsetHeight+6+"px";
		
		return frame;
	}

	function MenuClass()
	{
		
		var frame=null;
		
		var menu=this;
		
		menu.menu=menu;
		menu.items=[];
		menu.zIndex=7777777;
		menu.closed=true;
		
		function OnWindowBlur()
		{
			setTimeout(CloseIt,250);
			
			function CloseIt()
			{
				if(menu.Close)
					menu.Close();
			}
		}
		
		function OnDocumentClick()
		{
			if(menu.Close)
				menu.Close();
		}
		
		function OnWindowUnload()
		{
			if(menu.Close)
				menu.Close();
		}
		
		menu.Show=function menu_Show(target,offsetX,offsetY)
		{
			if(_menuclass_currentmenu)
				_menuclass_currentmenu.Close();

			menu.Close();
			
			window.focus();
			
			if(menu.frame==null)
			{
				menu.frame=MenuClass_CreateFrame(menu);
			}
			
			Menu_ShowFrame(menu.frame,target,offsetX,offsetY);

			_menuclass_currentmenu = menu;

			if (document.addEventListener) {
				document.addEventListener("mousedown", OnDocumentClick);
				window.addEventListener("beforeunload", OnWindowUnload);
			}
			else {
				document.attachEvent("onmousedown", OnDocumentClick);
				window.attachEvent("onbeforeunload", OnWindowUnload);
			}			
			menu.opened=true;
		}
		menu.Close = function () {
			if (_menuclass_currentmenu == menu) {
				if(navigator.userAgent.indexOf("Firefox/1")>=0 || navigator.userAgent.indexOf("Firefox/2")>=0)
					document.body.removeChild(_menuclass_currentmenu.frame);
				_menuclass_currentmenu = null;
			}
			if (!menu.opened) return;
			menu.opened = false;

			if (document.removeEventListener) {
				document.removeEventListener("mousedown", OnDocumentClick);
				window.removeEventListener("beforeunload", OnWindowUnload);
			}
			else {
				document.detachEvent("onmousedown", OnDocumentClick);
				window.detachEvent("onbeforeunload", OnWindowUnload);
			}

			if (menu.frame == null)
				return;

			menu.frame.style.display = 'none';

			if (menu.openitem)
				menu.openitem.Close();

			//Dispose on close..
			Dispose();
		}
		menu.HideByClick=function()
		{
			if(menu.frame)
			{
				menu.frame.style.display='none';
			}
			if(menu.openitem)
				menu.openitem.Close();
			if(_menuclass_currentmenu==menu)
				_menuclass_currentmenu=null;
		}
		menu.Dispose=function()
		{
			menu.Close();
			Dispose();
		}
		function Dispose()
		{
			if(menu.isdisposed)return;
			menu.isdisposed=true;
			
			for(var i=0;i<menu.items.length;i++)
			{
				menu.items[i].Dispose();
			}
			
			if(menu.frame)
			{
				menu.frame.parentNode.removeChild(menu.frame);
				menu.frame=null;
			}
			
			RemoveObjectMembers(menu);
			menu.isdisposed=true;
		}
		menu.AddSpliter=function()
		{
			if(menu.items.length==0||menu.items[menu.items.length-1].html!='-')
				return menu.AddMenuItem(1,"-");
			return menu.items[menu.items.length-1];
		}
		menu.AddMenuItem=
		menu.Add=function(state,html,imgurl,onclick,oninitialize)
		{
			var childmenu=new ChildMenuClass();
			childmenu.zIndex=menu.zIndex+1;
			childmenu.menu=menu;
			childmenu.owner=menu;
			childmenu.enable=state>0?true:false;
			childmenu.html=html;
			childmenu.imgurl=imgurl==null?null:(imgurl.indexOf('.')==-1?(menuimagebase+imgurl+".gif"):imgurl);
			childmenu.onclick=onclick;
			childmenu.oninitialize=oninitialize;
			
			menu.items[menu.items.length]=childmenu;
			
			return childmenu;
		}
		
		function ChildMenuClass()
		{
			var menuitem=this;
			
			menuitem.items=[];
			
			menuitem.AddSpliter=function()
			{
				if(menuitem.items.length==0||menuitem.items[menuitem.items.length-1].html!='-')
					return menuitem.AddMenuItem(1,"-");
				return menuitem.items[menuitem.items.length-1];
			}
			menuitem.AddMenuItem=
			menuitem.Add=function(state,html,imgurl,onclick,oninitialize)
			{
				var childmenu=new ChildMenuClass();
				childmenu.zIndex=menuitem.zIndex+1;
				childmenu.menu=menu;
				childmenu.owner=menuitem;
				childmenu.enable=state>0?true:false;
				childmenu.html=html;
				childmenu.imgurl=imgurl==null?null:(imgurl.indexOf('.')==-1?(menuimagebase+imgurl+".gif"):imgurl);
				childmenu.onclick=onclick;
				childmenu.oninitialize=oninitialize;
				menuitem.items[menuitem.items.length]=childmenu;
				
				return childmenu;
			}
			menuitem.Show=function(target,offsetX,offsetY)
			{
				if(menuitem.isopen)return;
				
				if(menuitem.frame==null)
				{
					menuitem.frame=MenuClass_CreateFrame(menuitem);
				}
				
				Menu_ShowFrame(menuitem.frame,target,offsetX,offsetY);
				

				menuitem.owner.openitem=menuitem;

				menuitem.isopen=true;
			}
			menuitem.Close=function()
			{
				if(!menuitem.isopen)return;

				if(menuitem.openitem)
					menuitem.openitem.Close();

				MenuItemDiv_OnMouseOut(menuitem.itemdiv);
					
				menuitem.frame.style.display='none';
				menuitem.frame.style.top='0px'
				menuitem.frame.style.left='0px'

				menuitem.owner.openitem=null;
				
				menuitem.isopen=false;
			}
			menuitem.Dispose=function()
			{
				if(menuitem.isdisposed)return;
				menuitem.isdisposed=true;
			
				for(var i=0;i<menuitem.items.length;i++)
				{
					menuitem.items[i].Dispose();
				}
				
				if(menuitem.frame)
				{
					menuitem.frame.parentNode.removeChild(menuitem.frame);
					menuitem.frame=null;
				}
				
				RemoveObjectMembers(menuitem);
				menu.isdisposed=true;
			}
			
			return menuitem;
		}

		return menu;
	}

}