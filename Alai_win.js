/*******************************************************************************
		阿赖浮动层窗口控件程序cool风格版 由赖国欣设计于2003年5月，保留所有权利！
*********************************************************************************/
var MAX_Z_INDEX=30

if(window.HTMLElement){ 
	HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){ 
        switch(where){ 
            case "beforeBegin": 
                this.parentNode.insertBefore(parsedNode,this); 
                break; 
            case "afterBegin": 
                this.insertBefore(parsedNode,this.firstChild); 
                break; 
            case "beforeEnd": 
                this.appendChild(parsedNode); 
                break; 
            case "afterEnd": 
                if(this.nextSibling) 
                    this.parentNode.insertBefore(parsedNode,this.nextSibling); 
                else 
                    this.parentNode.appendChild(parsedNode); 
                break; 
            } 
        } 
    HTMLElement.prototype.insertAdjacentHTML=function(where,htmlStr){ 
        var r=this.ownerDocument.createRange(); 
        r.setStartBefore(this); 
        var parsedHTML=r.createContextualFragment(htmlStr); 
        this.insertAdjacentElement(where,parsedHTML); 
        } 
    HTMLElement.prototype.insertAdjacentText=function(where,txtStr){ 
        var parsedText=document.createTextNode(txtStr); 
        this.insertAdjacentElement(where,parsedText); 
        } 
		
	HTMLElement.prototype.applyElement=function(additiveElement,sWhere)
	{
		var element=this;
		if(sWhere=="inside")
		{
			var children = element.childnodes;
			element.insertBefore(additiveElement, element.firstChild);
			//for(var i=0, l=children.length; i<l; i++)
				//additiveElement.appendChild(children(i))
		}
		else
		{
			element.parentNode.insertBefore(additiveElement, element);
			additiveElement.appendChild(element);
		}	
	}
}

function alai_win(content,title,width,height,top,left)
{
	if(typeof(content)=="string")
	{
		var obj=document.createElement("div")
		obj.innerHTML=content
		document.body.insertAdjacentElement("beforeEnd",obj)
		content=obj
	}
	else if(typeof(content)!="object"){return}
	
	var buttons=[]
	var winPanel=document.createElement("div")
	var winBody=document.createElement("div")
	var winBar=document.createElement("div")
	var winBottom=document.createElement("div")
	var winTitle=document.createElement("div")
	var run=function(cmd,a0,a1,a2)
	{
		if(typeof(cmd)=="string")
		{	try{return eval(cmd);}
			catch(E){alert("run script string error:\n"+cmd);}
		}
		else if(typeof(cmd)=="function"){return cmd(a0,a1,a2);}
	}
	
	//winPanel.appendChild(content);
	//winBody.appendChild(winBar);
	//winBody.appendChild(winPanel);
	//winBody.appendChild(winBottom);
	
	content.applyElement(winPanel,"outside")
	winPanel.applyElement(winBody,"outside")
	winBody.insertAdjacentElement("afterBegin",winBar)
	winBody.insertAdjacentElement("beforeEnd",winBottom)

	var IMG_PATH="images/"
	var script=document.getElementsByTagName("SCRIPT");
	for(var i=0;i<script.length;i++)
	{
		var s=script[i].src.toLowerCase()
		if(s.indexOf("alai_win.js")!=-1){IMG_PATH=s.replace("alai_win.js","")+"images/"}
	}

	
	var s="       <table style=\"width: 100%; border-style: none; border-width:0\" height=\"38\" background=\"" +IMG_PATH+ "win_foot.gif\" border=0 cellpadding=\"0\" cellspacing=\"0\"><tr>   "
	s+="         <td height=\"34\" valign=\"top\" background=\"" +IMG_PATH+ "win_mbg.gif\"><img src=\"" +IMG_PATH+ "win_left.gif\"></td>   "
	s+="         <td id=\"td_Title\" style=\"width: 100%\" background=\"" +IMG_PATH+ "win_mbg.gif\" valign=\"top\" height=\"15\" align=\"center\"></td>   "
	s+="         <td height=\"34\" valign=\"top\" align=\"right\" background=\"" +IMG_PATH+ "win_mbg.gif\"><img src=\"" +IMG_PATH+ "win_right.gif\"> </td>   "
	s+="       </tr></table>   "
	winBar.innerHTML=s
	//var oTmp=document.all[winBar.sourceIndex+1].cells[1]
	var oTmp=document.getElementById("td_Title");//winBar.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
	oTmp.applyElement(winTitle,"inside")

	winBody.style.cssText="position:absolute;visibility:hidden;background-color:#eeeeee;color:black;text-align:center;font-size:10pt;border:2 outset;"
	winBar.style.cssText="width:100%;cursor:default;"
	winPanel.style.cssText="width:100%;text-align:left;margin:2 4 1 4;overflow:auto;text-align:center;"
	winTitle.style.cssText="font-weight:bold;margin-top:4;font-size:11pt;color:darkblue;font-family:arial;"
	winBottom.style.cssText="width:100%;height:35;text-algin:center;background-image:url('" +IMG_PATH+ "win_foot.gif')"

 	winBody.onmousedown=function(){if(winBody.style.zIndex<MAX_Z_INDEX)winBody.style.zIndex=++MAX_Z_INDEX}
	with(winBar)
	{
		var x1,y1,l1,t1,mflag=false
		onmousedown = function()
		{	if(event.button!=1)return;
			if(this.setCapture)this.setCapture();this.style.cursor='move';mflag=true;
			x1=event.clientX;y1=event.clientY;l1=winBody.style.pixelLeft;t1=winBody.style.pixelTop;
		}	
  		onmousemove = function()
  		{	if(mflag)
  			{
				x=l1+event.clientX-x1;y=t1+event.clientY-y1;
				winBody.style.pixelLeft=x;winBody.style.left=x+"px";
  				winBody.style.pixelTop=y;winBody.style.top=y+"px";
  			}
  		}
  		onmouseup =function(){if(this.releaseCapture)this.releaseCapture();mflag=false;this.style.cursor='default';}
  		onSelectStart=function(){return false;}
 	}

	var win=this
	this.copywrite="Copywrite by Alai(赖国欣) (c)2003，All right reserved!"
	this.buttons=buttons
	this.body=winBody
	this.panel=winPanel
	this.bar=winBar
	this.bottom=winBottom
	this.content=content
	this.setTitle=function(val){if(val!=null)winTitle.innerHTML=val;}
	this.setX=function(val){
		var x=document.body.offsetWidth-winBody.offsetWidth;
		if(val==null) val=(x>0?parseInt(x/2):0);
		winBody.style.pixelLeft=val;winBody.style.left=val+"px";
	}
	this.setY=function(val){
		var t=document.body.offsetHeight-winBody.offsetHeight;
		if(val==null) val=(t>0?parseInt(t/2):0);
		winBody.style.pixelTop=val;winBody.style.top=val+"px";
	}
	this.setW=function(val){
		if(val==null) val=500;
		winBody.style.pixelWidth=val;winBody.style.width=val+"px";
	}
	this.setH=function(val)
	{	var h=val==null?300:val;
		h-=winBar.offsetHeight+winBottom.offsetHeight;
		h=h>0?h:25;
		winPanel.style.pixelHeight=h;winPanel.style.height=h+"px";
	}
	this.hide=function(){winBody.style.display="none";}
	this.show=function(){winBody.style.display="block";winBody.style.zIndex=++MAX_Z_INDEX;}
	this.addButton=function(text,exeType,exeArg,width,target)
	{
		var btn=document.createElement("span")
		winBottom.insertAdjacentElement("beforeEnd",btn)
		btn.innerHTML=text
		btn.style.cssText="margin-top:5px;margin-left:6px;filter:alpha(opacity=80);padding-top:3px;text-align:center;font-size:11pt;height:25px;width:120px;cursor:default;background-image:url('" +IMG_PATH+ "btn_bg.gif');"
		if(width==null)width=80;
		btn.style.pixelWidth=width;btn.style.width=width+"px";
		btn.onmouseover=function(){this.style.color="blue";this.style.borderTop=this.style.borderBottom="1 solid blue";this.style.filter="glow(color=red,strength=3)";}
		btn.onmouseout=function(){this.style.color="black";this.style.border="";this.style.filter="alpha(opacity=80)";}
		btn.execute=new Function()
		exeType=exeType==null?"":exeType
		switch(exeType.toLowerCase())
		{
			case "hide": 
				btn.execute=win.hide;break;
			case "js": 
				if(typeof(exeArg)!="string")break;
				btn.execute=function(){eval(exeArg);}
				break;
			case "url":
				if(typeof(exeArg)!="string")break;
				btn.execute=function(){self.location=exeArg;};break;
			case "open":
				if(typeof(exeArg)!="string")break;
				btn.execute=function(){open(exeArg,"_blank");};break;
		}
		buttons[buttons.length]=btn
		btn.onclick=function(){run(btn.execute)}
		return btn
	}

	this.setTitle(title)
	this.setW(width)
	this.setH(height)
	this.setX(left)
	this.setY(top)
	winBody.style.visibility="visible"
	winBody.style.display="none"
}

