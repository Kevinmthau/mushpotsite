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

var iOS5={};if(AC.Detector.isWebKit()){iOS5.scrollbar=18;iOS5.clipSmall=function(a,b){this.main.style.overflowX="visible";
document.body.style.width=this.width+"px";document.body.style.overflowX="";this.clippedLarge=false;
this.clippedSmall=true};iOS5.clipLarge=function(a,b){this.main.style.overflowX="visible";
document.body.style.width="";document.body.style.overflowX="hidden";this.clippedSmall=false;
this.clippedLarge=true};iOS5.clip=function(a){var b;if(!this.main){this.main=$("main")
}if(!this.width){this.width=(b=this.main.down(".content"))?b.getWidth():980}this.width-=iOS5.scrollbar;
if(!this.compensate){this.compensate=this.width+this.scrollbar}if(a.currentSection){if(window.innerWidth>this.compensate){this.clipLarge()
}else{this.clipSmall()}}else{if((this.clippedSmall||this.clippedLarge)&&a.type=="resize"){if(this.clippedSmall&&window.innerWidth>this.compensate){this.clipLarge()
}else{if(this.clippedLarge&&window.innerWidth<=this.compensate){this.clipSmall()
}}}else{if(!(AC.Detector.isMobile()||AC.Detector.isiPad())){this.main.style.overflowX="";
document.body.style.width="";document.body.style.overflowX="";this.clippedSmall=false;
this.clippedLarge=false}}}};iOS5.didAppendContent=iOS5.clip;Event.observe((document.onresize?document:window),"resize",function(a){iOS5.clip(a)
})}iOS5.bringGalleryTo=function(f,c,b,g){var a,d,e;if(f){if(a=f.up(".gallery")){a.style.zIndex=g
}if(e=a.up(".section")){e.style.zIndex=g;if(d=e.next(".section")){d.style.zIndex=1
}}if(c&&c.content){c.content.style.zIndex=g}if(b&&b.content){b.content.style.zIndex=g
}}};iOS5.willShow=function(b,c,a){var d=b.view.view();if(a.hasMovie()||a.content.down("a.movieLink")){this.bringGalleryTo(d,c,a,"10")
}else{this.bringGalleryTo(d,c,a,"")}};iOS5.didShow=function(d,e,c){var f=d.view.view(),b,a;
if(d.options.stickyHeight==true&&!d.heightStuck){if(c&&c.content){b=c.content}if(!b){b=d.sectionWithId(d.orderedSections[0])
}if(b&&b.content){b=b.content}if(!b){b=f}if(b&&(a=b.getHeight())){f.style.height=a+"px";
d.heightStuck=true}}};Event.onDOMReady(function(){var e,d,b,g,f,c,a={},h=$$(".gallery");
for(e=h.length-1;e>=0;e--){if(!h[e].hasClassName("noautogallery")){c={silentTriggers:true,showFirstOnStopMovie:true,stickyHeight:true};
b=h[e].down(".gallery-view");g=h[e].select("a."+b.id);f=h[e].down("a."+b.id+'[href^="#"]');
if(f){c.initialId=f.href.replace(/.*#/,"");c.useKeyboardNav=true;c.discontinuousPreviousNext=true;
c.imageLinkAutoCaptions=true}else{g.unshift(b.down(".gallery-content"))}if(AC.Detector.isIEStrict()&&b.id.match("performance")){c.shouldAnimateContentChange=false
}a[b.id]=new AC.ViewMaster.Viewer(g,b,b.id,c);a[b.id].setDelegate(iOS5)}}for(b in a){a[b].options.ensureInView=true
}});

}
/*
     FILE ARCHIVED ON 20:04:18 Oct 12, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:13 Jul 31, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.44
  exclusion.robots: 0.015
  exclusion.robots.policy: 0.006
  esindex: 0.008
  cdx.remote: 9.9
  LoadShardBlock: 196.807 (3)
  PetaboxLoader3.datanode: 203.931 (4)
  PetaboxLoader3.resolve: 146.861 (2)
  load_resource: 160.601
*/