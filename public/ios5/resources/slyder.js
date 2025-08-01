var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var Slyder=Class.create({initialize:function(c,b){this.options=Object.clone(Slyder.defaults);
if(b){Object.extend(this.options,b)}this.element=$(c);if(!this.element){return false
}this.mask=this.element.down(".mask");this.container=this.element.down(".container");
this.pageWidth=this.mask.getWidth();this.pages=$A();this.page=0;this.nav=new Slyder.Nav(this);
this.boundAfterSlide=this.afterSlide.bind(this);this.changeType="";this.useTranslate=(AC&&AC.Detector)&&(this.options.useThreeD&&AC.Detector.supportsThreeD())||AC.Detector.isiPad()||AC.Detector.isMobile()?true:false;
if(this.useTranslate&&this.options.draggable){this.drag=new Slyder.Drag(this)}var a=this.container.childElements(),d;
a.each(function(f){var g=new Slyder.Item(this,f);if(!d||g.pagebreak||!d.willFit(g)){if(d&&(this.options.autoPageBreaks||g.pagebreak)){if(this.options.autoCenter){d.center()
}else{d.addPageBreak()}}var h=d?(d.pos+d.width):0;d=new Slyder.Page(this,h);this.pages.push(d)
}d.addItem(g)}.bind(this));if(this.options.autoCenter){d.center()}else{if(this.options.fillLastPage){var e=this.pageWidth-d.width;
d.pos-=e}else{d.addPageBreak()}}this.container.setStyle({width:(this.pages.length*this.pageWidth)+"px"});
if(this.pages.length>1){this.nav.render()}this.slideTo(0)},pos:function(){if(this.useTranslate){if(this.posTranslateX==undefined){this.posTranslateX=0
}var a=this.posTranslateX}else{var a=parseInt(this.container.getStyle("left"))}return a
},slideTo:function(b,a){if(b<0){this.repositionPage(this.pages.length-1,0)}else{if(b>this.pages.length-1){this.repositionPage(0,this.pages.length-1)
}else{this.page=b}}this.pages[this.page].navItem.activate();if(this.effect&&this.effect.state=="running"){this.effect.cancel()
}if(this.useTranslate){this.container.style.webkitTransition="-webkit-transform "+this.options.duration+"s ease-out";
this.posTranslateX=-this.pages[this.page].pos;this.container.style.webkitTransform="translate3d("+this.posTranslateX+"px, 0, 0)";
this.container.addVendorEventListener("transitionEnd",this.boundAfterSlide)}else{this.effect=new Effect.Move(this.container,{duration:this.options.duration,x:-this.pages[this.page].pos,mode:"absolute",afterFinish:this.boundAfterSlide})
}if(!this.options.continuous&&this.options.showArrows){if(this.page>0){this.nav.leftArrow.enable()
}else{this.nav.leftArrow.disable()}if(this.page<this.pages.length-1){this.nav.rightArrow.enable()
}else{this.nav.rightArrow.disable()}}},afterSlide:function(a){if(this.useTranslate&&a.target==this.container&&a.propertyName.match(/transform/i)){this.container.style.webkitTransition="none";
this.container.removeVendorEventListener("transitionEnd",this.boundAfterSlide)}if(this.changeType!==""){this.track(this.changeType,this.page+1);
this.changeType=""}},repositionPage:function(h,g){var b=this.pages[g];var d=this.pages[h];
d.num=g;this.pages.splice(h,1);this.pages.splice(g,0,d);this.page=g;if(h>g){var f=d.items.reverse(false),c="top",a=1
}else{var f=d.items,c="bottom",a=-1}f.each(function(j){var i={};i[c]=j.element;
this.container.insert(i)}.bind(this));var e=this.pos()+(-d.width*a);if(this.useTranslate){this.container.style.webkitTransform="translate3d("+e+"px, 0, 0)"
}else{this.container.style.left=e+"px"}d.pos=b.pos;this.pages.without(d).each(function(i){i.num+=a;
i.pos+=(d.width*a)}.bind(this))},belongsToPage:function(a){return Math.floor(a.offsetLeft/this.pageWidth)
},track:function(b,c){var a=AC.Tracking.pageName()+" - "+b+" nav";AC.Tracking.trackClick({prop2:c,prop3:a},true,"o",a)
}});Slyder.defaults={autoPageBreaks:true,autoCenter:false,fillLastPage:false,showArrows:true,showNav:true,continuous:false,draggable:false,useThreeD:false,duration:0.5};
Slyder.Page=Class.create({initialize:function(a,b){this.slider=a;this.pos=b;this.num=this.slider.pages.length;
this.width=0;this.navItem=this.slider.nav.addItem(this);this.items=$A()},willFit:function(a){return((this.width+a.elementWidth)<=this.slider.pageWidth)
},addItem:function(a){this.items.push(a);this.width+=a.width},center:function(){var d=this.items[0],b=this.items.last(),a=this.width-d.getMargin("Left")-b.getMargin("Right"),c=(this.slider.pageWidth-a)/2;
d.setMargin("Left",c);b.setMargin("Right",c);this.width=this.slider.pageWidth},addPageBreak:function(){var b=this.items.last(),a=this.width-b.getMargin("Right");
b.setMargin("Right",this.slider.pageWidth-a);this.width=this.slider.pageWidth}});
Slyder.Item=Class.create({initialize:function(b,a){this.slider=b;this.element=$(a);
this.pagebreak=this.element.hasClassName("pagebreak");this.elementWidth=parseInt(this.element.getWidth());
this.width=this.elementWidth+((marginLeft=this.element.getStyle("marginLeft"))?parseInt(marginLeft):0)+((marginRight=this.element.getStyle("marginRight"))?parseInt(marginRight):0)
},getMargin:function(a){return(margin=this.element.getStyle("margin"+a))?parseInt(margin):0
},setMargin:function(b,a){this.element.style["margin"+b]=a+"px"}});Slyder.Nav=Class.create({initialize:function(a){this.slider=a;
this.items=$A(0)},addItem:function(b){var a=new Slyder.Nav.Item(this,b);this.items.push(a);
return a},render:function(){if(this.slider.options.showNav){this.element=new Element("div",{"class":"nav"});
this.slider.element.insert(this.element);this.items.invoke("render")}if(this.slider.options.showArrows){this.leftArrow=new Slyder.Nav.Arrow(this,-1);
this.rightArrow=new Slyder.Nav.Arrow(this,1)}}});Slyder.Nav.Item=Class.create({initialize:function(b,a){this.nav=b;
this.slider=this.nav.slider;this.page=a;this.num=this.page.num},render:function(){this.element=new Element("a",{title:"Scroll to page "+(this.num+1)});
this.nav.element.insert(this.element);this.element.observe("click",this.onClick.bind(this));
if(this.nav.activeItem==this){this.activate()}},onClick:function(){this.slider.changeType="bubble";
this.slider.slideTo(this.page.num,this.num)},activate:function(){if(this.nav.activeItem){this.nav.activeItem.deactivate()
}this.nav.activeItem=this;if(this.element){this.element.addClassName("active")}},deactivate:function(){if(this.element){this.element.removeClassName("active")
}}});Slyder.Nav.Arrow=Class.create({initialize:function(b,a){this.nav=b;this.slider=this.nav.slider;
this.dir=a;this.enabled=true;var d=(a==1)?"right":"left";this.element=new Element("a",{"class":"arrow "+d,title:"Scroll "+d});
this.slider.element.insert(this.element);this.element.observe("click",this.onClick.bind(this))
},onClick:function(){if(this.enabled){this.slider.changeType="arrow";this.slider.slideTo(this.slider.page+this.dir)
}},enable:function(){if(!this.enabled){this.enabled=true;this.element.removeClassName("disabled")
}},disable:function(){if(this.enabled){this.enabled=false;this.element.addClassName("disabled")
}}});Slyder.Drag=Class.create({initialize:function(a){this.slider=a;this.pos={};
this.flex=parseInt(this.slider.pageWidth)*0.15;this.events={};if(this.slider.useTranslate){this.slider.container.style.webkitTransform="translate3d(0,0,0)";
this.events.mousedown="touchstart";this.events.mousemove="touchmove";this.events.mouseup="touchend"
}this.slider.container.observe(this.events.mousedown,this.onMouseDown.bind(this));
this.slider.container.observe(this.events.mousemove,this.onMouseMove.bind(this));
this.slider.container.observe(this.events.mouseup,this.onMouseUp.bind(this));this.slider.container.observe("click",this.click.bind(this))
},click:function(a){if(this.isDragging){a.stop()}},onMouseDown:function(a){this.isDragging=true;
this.pos.start=a.touches?a.touches[0].clientX:a.clientX;this.pos.end=false;this.posTranslateX=this.slider.pos()
},onMouseMove:function(b){this.isDragging=true;if(this.isDragging){b.stop();var a=b.touches?b.touches[0].clientX:b.clientX;
this.pos.move=this.pos.end?a-this.pos.end:a-this.pos.start;this.pos.end=a;if(this.slider.useTranslate){this.posTranslateX+=this.pos.move;
this.slider.container.style.webkitTransform="translate3d("+this.posTranslateX+"px, 0, 0)"
}}},onMouseUp:function(c){this.isDragging=false;this.pos.diff=this.pos.end?this.pos.start-this.pos.end:0;
this.dir=this.pos.diff>=0?1:-1;if(this.pos.diff!=0){this.isDragging=true}var a=Math.abs(this.pos.diff)>this.flex;
if(a){var b=this.slider.page+this.dir;if(!this.slider.options.continuous){if(b>=this.slider.pages.length||b<0){a=false
}}else{a=false}}if(a){this.slider.changeType="swipe";this.slider.slideTo(this.slider.page+this.dir)
}else{if(this.slider.useTranslate){this.slider.container.style.webkitTransition="-webkit-transform "+this.slider.options.duration+"s ease-out";
this.slider.container.style.webkitTransform="translate3d("+this.slider.posTranslateX+"px, 0, 0)"
}}this.pos={}}});


}
/*
     FILE ARCHIVED ON 20:04:24 Oct 12, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:13 Jul 31, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.199
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.007
  esindex: 0.011
  cdx.remote: 5.824
  LoadShardBlock: 247.382 (3)
  PetaboxLoader3.datanode: 306.139 (5)
  load_resource: 285.93 (2)
  PetaboxLoader3.resolve: 142.53
*/