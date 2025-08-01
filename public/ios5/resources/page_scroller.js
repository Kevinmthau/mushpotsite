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

Effect.Transitions.customExponentialEaseOut=function(a){if(a==0){return 0}if(a==1){return 1
}return -Math.pow(2,-10*a)+1};AC.AnchorPageScroller=Class.create();Object.extend(AC.AnchorPageScroller.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.AnchorPageScroller.prototype,{triggerClassName:"scrollToAnchor",_triggerClicked:function(a){var c=a.element();
if(AC.Detector.isIEStrict()&&a.type==="mouseup"){if(c&&c.nodeName.toLowerCase()==="a"){c=c.down("."+this.triggerClassName)
}}else{while(c&&c.nodeName.toLowerCase()!="a"&&c.nodeName.toLowerCase()!="body"){c=c.parentNode
}}if(c&&c.href&&Element.Methods.hasClassName(c,this.triggerClassName)){var d=c.href.split("#");
if(d.length===2){Event.stop(a);this._onMouseScroll=this.cancelEffect.bind(this);
document.observe("mousewheel",this._onMouseScroll);document.observe("DOMMouseScroll",this._onMouseScroll);
this._onKeyDown=this.onKeyDown.bind(this);document.observe("keydown",this._onKeyDown);
this._currentDestination=d[1];var b={duration:0.375,transition:Effect.Transitions.customExponentialEaseOut,afterFinish:this.afterScroll.bind(this)};
b=Object.extend(b,typeof AnchorPageScrollerOptions=="undefined"?{}:AnchorPageScrollerOptions);
this._scrollingEffect=new Effect.ScrollTo(this._currentDestination,b);this.trackClick()
}}},onKeyDown:function(a){if(a.keyCode==32||a.keyCode==33||a.keyCode==34||a.keyCode==35||a.keyCode==36||a.keyCode==37||a.keyCode==38||a.keyCode==39||a.keyCode==40){this.cancelEffect()
}},cancelEffect:function(a){if(this._scrollingEffect){this._scrollingEffect.cancel();
this._scrollingEffect=null}if(this._onMouseScroll){document.stopObserving("mousewheel",this._onMouseScroll);
document.stopObserving("DOMMouseScroll",this._onMouseScroll);this._onMouseScroll=null
}if(this._onKeyDown){document.stopObserving("keydown",this._onKeyDown);this._onKeyDown=null
}this.afterScroll()},afterScroll:function(){if(this._currentDestination){var a=window.location.href.split("#");
a[1]=this._currentDestination;window.location.href=(a[0]+"#"+a[1]);if(typeof this.view.delegate.onScrollEnd==="function"){this.view.delegate.onScrollEnd(this,this._currentDestination)
}delete this._currentDestination}},sectionWithId:function(a){return null},trackClick:function(){var a="Page Scroller - "+AC.Tracking.pageName()+" - "+this._currentDestination,b=this._currentDestination.match(/top/)?"back to top":"contextual anchor link";
AC.Tracking.trackClick({prop3:a,prop25:b},this,"o",a)}});Event.onDOMReady(function(){AC.AnchorPageScroller.defaultAnchorScroller=new AC.AnchorPageScroller()
});

}
/*
     FILE ARCHIVED ON 21:40:52 Oct 12, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:13 Jul 31, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.594
  exclusion.robots: 0.02
  exclusion.robots.policy: 0.008
  esindex: 0.011
  cdx.remote: 119.442
  LoadShardBlock: 61.658 (3)
  PetaboxLoader3.datanode: 171.462 (5)
  load_resource: 306.052 (2)
  PetaboxLoader3.resolve: 159.988 (2)
*/