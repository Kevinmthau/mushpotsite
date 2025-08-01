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

if(typeof(AC)==="undefined"){AC={}}if(typeof(document.event)==="undefined"){document.event={}
}if(Event.Publisher){Object.extend(document.event,Event.Publisher)}AC.SwapView=Class.create({_view:null,currentContent:null,delegate:null,initialize:function(a){if(typeof a==="string"){this._viewId=a
}else{this._view=$(a);this._resetView()}},view:function(){if(!this._view){this._view=$(this._viewId);
this._resetView()}return this._view},_resetView:function(){if(!this._view){return
}var b=this._view.childNodes,a;while(a=b[0]){this._view.removeChild(a)}this._view.addClassName("swapView")
},setDelegate:function(a){this.delegate=a},setContent:function(a){if(a===this.currentContent){return
}if(this.currentContent&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.currentContent)
}if(a&&typeof(this.delegate.isContentLoaded)==="function"){if(!this.delegate.isContentLoaded(this,a)){if(typeof(this.delegate.loadContent)==="function"){this.delegate.loadContent(this,a);
return}}}this.setLoadedContent(a)},setLoadedContent:function(b){if(typeof(this.delegate.willShow)==="function"){b=this.delegate.willShow(this,this.currentContent,b)
}var a=true,c;if(typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.currentContent,b)
}if(a&&typeof(this.delegate.willAnimate)==="function"){this.didAnimate=true;if(this.view()&&b&&this.currentContent!==b){this.view().appendChild(b)
}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}c=this.delegate.willAnimate(this,this.currentContent,b,this.didShow.bind(this,b))
}else{this.didAnimate=false;if(this.currentContent!==b){if(this.currentContent&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(b){this.view().appendChild(b)}if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}}if(b){$(b).setOpacity(1)}this.didShow(b)}},didShow:function(a){if(this.currentContent&&(this.currentContent!==a)&&this.currentContent.parentNode){this.currentContent.parentNode.removeChild(this.currentContent)
}if(typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.currentContent,a)
}this.currentContent=a}});if(typeof(AC.ViewMaster)==="undefined"){AC.ViewMaster={}
}AC.ViewMaster.Viewer=Class.create({view:null,triggerClassName:null,currentSection:null,requestedSection:null,sections:null,orderedSections:null,_locked:false,_didShowInitial:false,options:null,initialize:function(e,k,g,n){if(g){this.triggerClassName=g
}this.sections=$H();this.orderedSections=[];this.options=n||{};this.silentPreviousSelection(this.options.silentPreviousSelection);
this.silentFirstSection(this.options.silentFirstSection);this.triggerEvent=this.options.triggerEvent||"click";
var d=null,l,h;if(e){for(h=0;h<e.length;h++){l=this.addSection(e.item(h));if(!d){d=l
}}}this.view=new AC.SwapView(k);this.view.setDelegate(this);var a=document.location.hash,f,c;
this.sectionRegExp=this.options.sectionRegExp||new RegExp(/#(.*)$/);c=a.match(this.sectionRegExp);
if(c&&c[1]){a=c[1]}if(a!==this.view._viewId){var j=document.getElementsByClassName(this.triggerClassName),b;
for(h=0,b;(b=j[h]);h++){if(b.getAttribute("href").match(new RegExp("#"+a+"(?![_w-])"))){f=this.sectionWithId(a);
if(f){d=f}break}}}if(!f&&typeof this.options.initialId==="string"&&this.options.initialId.length>0){d=this.sectionWithId(this.options.initialId)
}this.show(d);this._boundTriggerClicked=this._triggerClicked.bindAsEventListener(this);
if(typeof this.triggerEvent==="object"){for(var h=0,m;m=this.triggerEvent[h];h++){Event.observe(document,m,this._boundTriggerClicked)
}}else{Event.observe(document,this.triggerEvent,this._boundTriggerClicked)}if(AC.Detector.isIEStrict()){Event.observe(document,"mouseup",this._boundTriggerClicked)
}if(this.options.alwaysUseKeyboardNav===true){this.options.useKeyboardNav=true}if(this.options.useKeyboardNav===true||this.options.escapeToClose===true){this._boundKeyDown=this._keyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this._boundKeyDown)}if(typeof(this.listenForEvent)==="function"){this.selectSectionFromEventHandler=this.selectSectionFromEvent.bind(this);
this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.stopMovieIfItsPlaying);
this.listenForEvent(document.event,"replayMovie",false,this.stopMovieIfItsPlaying.bind(this));
if(this.options.parentSectionId){this.listenForEvent(AC.ViewMaster,"ViewMasterWillCloseNotification",false,function(o){var p=o.event_data.data;
if(this===p.sender){return}if(p.outgoingView&&p.outgoingView.id===this.options.parentSectionId){this.willClose(this.view,this.currentSection)
}})}}},initialSectionFromId:function(a){return this.sectionWithId(a)},sectionWithId:function(c){if(!c){return null
}var d=null;if(c&&this.sections.get(c)){d=this.sections.get(c)}if(d){return d}var b,a=null;
b=document.getElementById(c);if(b===this.view._view){b=null}if(!b){b=document.body.down("a."+this.triggerClassName+"[href*=#"+c+"]")
}if(!b){a=document.getElementsByName(c);if(a&&a.length>0){b=a[0]}if(b===this.view._view){b=null
}}if(b){if(b.tagName.toLowerCase()==="a"){if(Element.hasClassName(b,this.triggerClassName)){d=this.addSection(b)
}}else{d=this.addSection(b)}}return d},indexOfSection:function(a){return this.orderedSections.indexOf(a.id)
},selectSectionFromEvent:function(a){if(a.event_data.data.sender===this){return
}if(a.event_data.data.parentTriggerClassName!==this.triggerClassName){return}this.selectSectionWithIdEvent(a.event_data.data.parentSectionId,a.event_data.data.event)
},selectSectionWithIdEvent:function(f,e){var a=this.sectionWithId(f),d=null,b,c,g=false;
if(a){d=a.triggers();if(d&&d.length>0){for(b=0;(c=d[b]);b++){if(Element.Methods.hasClassName(c,this.triggerClassName)){g=true;
break}}}if(!g){c=document.createElement("a");c.className=this.triggerClassName;
c.href="#"+f;c.style.display="none";document.body.appendChild(c);a._triggers.push(c)
}this.triggerClicked(e,$(c))}},setDelegate:function(a){this.delegate=a;if(this.delegate&&typeof(this.delegate.didShow)==="function"&&this.currentSection&&this.currentSection.isContentLoaded()){this.delegate.didShow(this,this.previousSection,this.currentSection)
}},createSectionForContent:function(a){return new AC.ViewMaster.Section(a,this)
},addSection:function(a){var b=this.createSectionForContent(a);this.sections.set(b.id,b);
this.orderedSections.push(b.id);return b},silentPreviousSelection:function(a){if(typeof(a)=="boolean"){this._silentPreviousSelection=a
}return this._silentPreviousSelection},silentFirstSection:function(a){if(typeof(a)=="boolean"){this._silentFirstSection=a
}return this._silentFirstSection},currentTrigger:function(){return this._currentTrigger
},triggerClicked:function(a,b){b.addClassName("active");this._currentTrigger=b;
if(a&&this.options.silentTriggers){Event.stop(a)}var d=null,e;if(!!b.href.match(/#previous/)){d=this.getPreviousSection();
if(!d){return}}else{if(!!b.href.match(/#next/)){d=this.getNextSection();if(!d){return
}}else{var c=b.href.match(this.sectionRegExp);if(c){e=c[1]}else{e=b.name}d=this.sections.get(e)
}}if(!d){d=this.addSection(b)}if(d.isContentRemote()){if(d.isContentLoaded()&&!!b.href.match(/#previous/)&&!!b.href.match(/#next/)){d.clearTrigger(b)
}if(a){Event.stop(a)}}if(d===this.currentSection){if(a){Event.stop(a)}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:b})
}return}else{if(!d){return}}if(AC.Detector.isMobile()||AC.Detector.isiPad()){this.show(d)
}else{setTimeout(this.show.bind(this,d),1)}},_triggerClicked:function(a){if(this.options.passive){return
}var c=a.element();if(AC.Detector.isIEStrict()&&a.type==="mouseup"){if(c&&c.nodeName.toUpperCase()==="A"){c=c.down("."+this.triggerClassName)
}}else{while(c&&c.nodeName.toUpperCase()!=="A"&&c.nodeName.toUpperCase()!=="BODY"){c=c.parentNode
}}if(this._silentPreviousSelection!==true&&this._silentFirstSection!==true&&!this._locked){if(c&&c.href&&((previousSelection=c.href.toString().match(/SwapViewPreviousSelection$/))||c.href.toString().match(/SwapViewFirstSection$/))){c=$(c);
if(c.hasClassName(this.triggerClassName)||c.descendantOf(this.view.view())){Event.stop(a);
if(previousSelection){this.showPreviousSelection()}else{this.showFirst()}return
}}}if(c&&c.href&&Element.Methods.hasClassName(c,this.triggerClassName)){if(this._locked){Event.stop(a);
return}if(this.options.parentSectionId&&(typeof(this.stopListeningForEvent)==="function")&&(typeof(this.listenForEvent)==="function")&&(typeof(AC.ViewMaster.dispatchEvent)==="function")){var b=this;
Event.stop(a);this.stopListeningForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,function(d){this.stopListeningForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,arguments.callee);
b.triggerClicked(d,c);this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler)
});AC.ViewMaster.dispatchEvent("ViewMasterSelectSectionWithIdNotification",{sender:this,parentSectionId:this.options.parentSectionId,parentTriggerClassName:this.options.parentTriggerClassName,event:a,trigger:c})
}else{this.triggerClicked(a,c)}}},_keyDown:function(k){if(!this._locked&&k.keyCode!==Event.KEY_ESC&&k.keyCode!==Event.KEY_LEFT&&k.keyCode!==Event.KEY_RIGHT){return
}var g=(k.target)?k.target:k.srcElement,a=g.getAttribute("contenteditable"),b=true;
if(a==null){b=false}if(b&&a==document.body.getAttribute("contenteditable")){b=false
}if(b&&a=="false"){b=false}if(g.tagName.toLowerCase()=="input"||g.tagName.toLowerCase()=="textarea"||g.tagName.toLowerCase()=="select"||b){return
}var e=document.viewport.getScrollOffsets(),d=document.viewport.getHeight(),h=this.view.view(),f=h.getHeight(),c=h.cumulativeOffset()[1];
if(this.options.alwaysUseKeyboardNav===true||(c>=e[1]&&Math.round(c+(f/2))<(e[1]+d))){if(k.keyCode===Event.KEY_LEFT&&this.options.useKeyboardNav===true){this._currentTrigger="arrow_left";
this.showPrevious();var j="previous"}else{if(k.keyCode===Event.KEY_RIGHT&&this.options.useKeyboardNav===true){this._currentTrigger="arrow_right";
this.showNext();var j="next"}else{if(k.keyCode===Event.KEY_ESC&&this.options.escapeToClose===true){if(this.currentSection.content.down('a[href="#SwapViewFirstSection"]')){k.stop();
this._currentTrigger="esc_key";this.showFirst()}else{if(this.currentSection.content.down('a[href="#SwapViewPreviousSelection"]')){k.stop();
this._currentTrigger="esc_key";this.showPreviousSelection()}}var j="escape"}}}if(typeof j!==undefined){this.view._view.fire("AC.ViewMaster.Viewer:usedKeyboardNav",j);
if(typeof this.__slideshow==="object"&&typeof this.__slideshow.userInteracted==="function"){this.__slideshow.userInteracted()
}}}},isContentLoaded:function(b,a){return a.isContentLoaded()},loadContent:function(b,a){if(a){a.loadContent()
}},_showContentDidLoad:false,contentDidLoad:function(c,b,a){if(b&&b.firstChild){this._showContentDidLoad=true
}this.view.setLoadedContent(c);AC.loadRemoteContent.insertScriptFragment(b);this.scrollSectionToVisible(c);
if(this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}this._showContentDidLoad=false},show:function(c,b){if(this._locked||(!c&&!b)){return
}if(!this.options.alwaysShowSection&&c===this.currentSection){return}this._locked=true;
if(this.delegate&&typeof(this.delegate.willShowSection)==="function"){var a=this.delegate.willShowSection(this,this.previousSection,c);
if(a instanceof AC.ViewMaster.Section){c=a}}this.previousSection=this.currentSection;
this.currentSection=c;this.disablePreviousNextIfNeeded();this.scrollSectionToVisible(c);
this.view.setContent(c)},disablePreviousNextIfNeeded:function(){if(!this.currentSection||typeof this.currentSection==="undefined"){return
}var b=this.indexOfSection(this.currentSection),a=this.orderedSections.length-1,c=this.options.discontinuousPreviousNext;
if(!this.previousTriggers){this.previousTriggers=$$("."+this.triggerClassName+'[href="#previous"]')
}else{this.previousTriggers=this.previousTriggers.concat($$("."+this.triggerClassName+'[href="#previous"]')).uniq()
}this.previousTriggers.each(function(d){if(c===true&&b===0){d.addClassName("disabled")
}else{d.removeClassName("disabled")}});if(!this.nextTriggers){this.nextTriggers=$$("."+this.triggerClassName+'[href="#next"]')
}else{this.nextTriggers=this.nextTriggers.concat($$("."+this.triggerClassName+'[href="#next"]')).uniq()
}this.nextTriggers.each(function(d){if(c===true&&b===a){d.addClassName("disabled")
}else{d.removeClassName("disabled")}})},scrollSectionToVisible:function(a){if(typeof this.options.ensureInView==="boolean"&&this.options.ensureInView){if(this._didShowInitial){if(a._isContentLoaded){var b=a.content.viewportOffset()[1];
if(b<0||b>(document.viewport.getHeight()*0.75)){new Effect.ScrollTo(a.content,{duration:0.3})
}}}else{$(document.body).scrollTo()}return true}return false},__applyOptionHeightFromFirstSection:function(){if(this.options.heightFromFirstSection==true&&!this._heightSet){var a=this.sectionWithId(this.orderedSections[0]);
if(a){this.setHeightFromSection(a)}}},setHeightFromSection:function(b){var a=b.heightOfContent();
if(a>0){this.view.view().style.height=a+"px";this._heightSet=true}return a},__zIndex:1001,__manageZ:function(c){if(this.options.manageZ===true||typeof this.options.manageZ==="number"){var f="",a,d,e,b;
if(!c){f=(typeof this.options.manageZ==="number")?this.options.manageZ:this.__zIndex
}if((b=this.view.view())){f=(!c&&(a=parseInt(b.getAttribute("data-manage-z")))&&isNaN(a)===false)?a:f;
b.style.zIndex=f}if(this.previousSection&&this.previousSection.content){d=(!c&&(d=this.previousSection.getZIndexFromContent()))?d:f;
this.previousSection.content.style.zIndex=d}if(this.currentSection&&this.currentSection.content){e=(!c&&(e=this.currentSection.getZIndexFromContent()))?e:f;
this.currentSection.content.style.zIndex=e}if(this.delegate&&typeof this.delegate.manageZ==="function"){this.delegate.manageZ(this,this.previousSection,this.currentSection,f,d,e)
}}},showFirst:function(){this.show(this.getFirstSection())},getFirstSection:function(){return this.sections.get(this.orderedSections[0])
},showNext:function(){this.show(this.getNextSection())},getNextSection:function(){var b=this.indexOfSection(this.currentSection);
if(this.options.discontinuousPreviousNext===true&&b===this.orderedSections.length-1){return false
}else{var a=(this.orderedSections.length-1)===b?0:b+1;return this.sections.get(this.orderedSections[a])
}},showPrevious:function(){this.show(this.getPreviousSection())},getPreviousSection:function(){var a=this.indexOfSection(this.currentSection);
if(this.options.discontinuousPreviousNext===true&&a===0){return false}else{var b=0===a?this.orderedSections.length-1:a-1;
return this.sections.get(this.orderedSections[b])}},showPreviousSelection:function(){this.show(this.getPreviousSelection())
},getPreviousSelection:function(){if(this.previousSection){return this.previousSection
}var a=this.orderedSections.length;for(i=0;i<a;i++){if(this.orderedSections[i]!=this.currentSection.id){return this.sections.get(this.orderedSections[i])
}}return false},willShow:function(b,c,a){if(this.delegate&&typeof(this.delegate.willShow)==="function"){this.delegate.willShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection})
}this.__manageZ(false);this._repaintTriggers(this.previousSection,this.currentSection);
if(this._didShowInitial&&a&&a!=this.previousSection){$(a.content).setOpacity(0);
$(a.content).removeClassName("hidden")}if(a){return a.willShow(this)}return null
},willClose:function(a,b){if(this.delegate&&typeof(this.delegate.willClose)==="function"){this.delegate.willClose(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)==="function"){AC.ViewMaster.dispatchEvent("ViewMasterWillCloseNotification",{sender:this,outgoingView:b})
}if(this.previousSection){this.previousSection.willClose(this)}},shouldAnimateContentChange:function(d,c,b){var a=true;
if(this.delegate&&typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.previousSection,this.currentSection)
}else{a=(typeof this.options.shouldAnimateContentChange==="boolean")?this.options.shouldAnimateContentChange:true
}return(typeof a==="boolean")?a:true},willAnimate:function(b,c,a,e){var f=this.options.animationDuration||0.4;
var d=Math.random()+"Queue";if(!this._didShowInitial&&typeof(e)=="function"){e();
return}if(this.delegate&&typeof this.delegate.willAnimate=="function"){return this.delegate.willAnimate(this,c,a,e,d,f)
}if(this.options.shouldAnimateOpacityAndHeight){return this._animationPlusHeight(b,c,a,e,d,f)
}else{return this._animation(b,c,a,e,d,f)}},_animation:function(f,e,c,b,k,d){var h=f.view(),j=this;
if(h){h.style.position="relative"}if(e){e.style.position="absolute"}if(c){c.style.position="absolute"
}var a=function(){if(h){h.style.position=""}if(e){e.style.position=""}if(c){c.style.position=""
}b()};if(AC.Detector.isCSSAvailable("transition")){if(c){c.setOpacity(0);c.setVendorPrefixStyle("transition","opacity "+d+"s")
}if(e&&j.options.shouldAnimateFadeIn!==true){e.setOpacity(1);e.setVendorPrefixStyle("transition","opacity "+d+"s")
}window.setTimeout(function(){if(c){c.setOpacity(1)}if(e&&j.options.shouldAnimateFadeIn!==true){e.setOpacity(0)
}},100);var g=function(l){if(l.target==c&&l.propertyName=="opacity"){c.removeVendorEventListener("transitionEnd",g,false);
a()}};if(c){c.addVendorEventListener("transitionEnd",g,false)}}else{if(e&&j.options.shouldAnimateFadeIn!==true){return new Effect.Parallel([new Effect.Opacity(e,{sync:true,from:1,to:0}),new Effect.Opacity(c,{sync:true,from:0,to:1})],{duration:d,afterFinish:a,queue:{scope:k}})
}else{return new Effect.Opacity(c,{from:0,to:1,duration:d,afterFinish:a,queue:{scope:k}})
}}},_animationPlusHeight:function(j,g,e,d,m,f){var l=j.view(),a=e.offsetHeight||1,c=l.offsetHeight||1,h=(a/c)*100;
if(l){l.style.position="relative"}if(g){g.style.position="absolute"}if(e){e.style.position="absolute"
}var b=function(){if(l){l.style.position=""}if(g){g.style.position=""}if(e){e.style.position=""
}d()};if(AC.Detector.isCSSAvailable("transition")){e.setOpacity(0);e.setVendorPrefixStyle("transition","opacity "+f+"s");
if(g){g.setOpacity(0)}window.setTimeout(function(){e.setOpacity(1)},100);if(!(AC.Detector.isiPad()||AC.Detector.isMobile())){l.setVendorPrefixStyle("transition","height "+f+"s")
}l.style.height=a+"px";var k=function(n){if(n.target==e&&n.propertyName=="opacity"){e.removeVendorEventListener("transitionEnd",k,false);
b()}};e.addVendorEventListener("transitionEnd",k,false)}else{if(g){return new Effect.Parallel([new Effect.Opacity(g,{sync:true,from:1,to:0}),new Effect.Opacity(e,{sync:true,from:0,to:1}),new Effect.Scale(l,h,{scaleMode:{originalHeight:c,originalWidth:l.offsetWidth},sync:true,scaleX:false,scaleContent:false})],{duration:f,afterFinish:b,queue:{scope:m}})
}else{return new Effect.Parallel([new Effect.Opacity(e,{sync:true,from:0,to:1}),new Effect.Scale(l,h,{scaleMode:{originalHeight:c,originalWidth:l.offsetWidth},sync:true,scaleX:false,scaleContent:false})],{duration:f,afterFinish:b,queue:{scope:m}})
}}},didAppendContent:function(a,b){if(this.delegate&&typeof this.delegate.didAppendContent==="function"){this.delegate.didAppendContent(this,b)
}this.__applyOptionHeightFromFirstSection()},hideSwapViewLinks:function(c){var d=this.getPreviousSelection();
if(!d||this._silentPreviousSelection===true){var a=c.select('a[href$="SwapViewPreviousSelection"]');
if(a.length>0){if(!this._previousSectionLinks){this._previousSectionLinks=[]}for(var b=a.length-1;
b>=0;b--){a[b].style.display="none";this._previousSectionLinks.push(a[b])}}}if(d&&this._silentPreviousSelection!==true&&this._previousSectionLinks&&this._previousSectionLinks.length>0){for(var b=this._previousSectionLinks.length-1;
b>=0;b--){this._previousSectionLinks[b].style.display="";this._previousSectionLinks.splice(b,1)
}}var d=this.getFirstSection();if(!d||d==this.currentSection||this._silentFirstSection===true){var a=c.select('a[href$="SwapViewFirstSection"]');
if(a.length>0){if(!this._firstSectionLinks){this._firstSectionLinks=[]}for(var b=a.length-1;
b>=0;b--){a[b].style.display="none";this._firstSectionLinks.push(a[b])}}}if(d&&d!==this.currentSection&&this._silentFirstSection!==true&&this._firstSectionLinks&&this._firstSectionLinks.length>0){for(var b=this._firstSectionLinks.length-1;
b>=0;b--){this._firstSectionLinks[b].style.display="";this._firstSectionLinks.splice(b,1)
}}},stopMovieIfItsPlaying:function(c){if(AC.ViewMaster.Viewer.allowMultipleVideos()!==true){if(c.event_data.data.incomingView){var b=c.event_data.data.sender,a=c.event_data.data.incomingView,d=false
}else{var b=this,a=c.event_data.data,d=true}if(b!=this||d){if((this.currentSection&&this.currentSection.hasMovie())&&(a&&((typeof(a.hasMovie)=="function"&&a.hasMovie())||(a.content&&a.content.getElementsByClassName("movieLink")[0])))){if(this.options.showPreviousOnStopMovie&&this.getPreviousSelection()){this.showPreviousSelection()
}else{if(this.options.showFirstOnStopMovie&&this.getFirstSection()){this.showFirst()
}else{this.currentSection.stopMovie()}}}}}},didShow:function(b,c,a){if(a){this.hideSwapViewLinks(a)
}this.__manageZ(true);if(this.currentSection){this.currentSection.didShow(this)
}this._didShowInitial=true;this._locked=false;if(this.options.shouldAnimateOpacityAndHeight){window.setTimeout(function(){var d=b.view(),e=a.offsetHeight||0;
d.style.height=e+"px"},35)}if(!this._showContentDidLoad&&this.delegate&&typeof(this.delegate.didShow)=="function"){this.delegate.didShow(this,this.previousSection,this.currentSection)
}if(typeof(AC.ViewMaster.dispatchEvent)=="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:this,outgoingView:this.previousSection,incomingView:this.currentSection,trigger:this._currentTrigger})
}},_repaintTriggers:function(f,a){if(f){var e=f.triggers();for(var b=0,c;(c=e[b]);
b++){c.removeClassName("active")}e=f.relatedElements();for(var b=0,c;(c=e[b]);b++){c.removeClassName("active")
}}if(a){var d=a.triggers();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")
}d=a.relatedElements();for(var b=0,c;(c=d[b]);b++){c.addClassName("active")}}}});
AC.ViewMaster.Viewer.allowMultipleVideos=function(a){if(typeof(a)=="boolean"){this._allowMultipleVideos=a
}return this._allowMultipleVideos};if(Event.Publisher){Object.extend(AC.ViewMaster,Event.Publisher)
}if(Event.Listener){Object.extend(AC.ViewMaster.Viewer.prototype,Event.Listener)
}AC.ViewMaster.Section=Class.create({content:null,moviePanel:null,controllerPanel:null,movie:null,_movieController:null,movieLink:null,endState:null,hasShown:false,_isContentRemote:false,isContentRemote:function(){return this._isContentRemote
},_isContentLoaded:true,isContentLoaded:function(){return this._isContentLoaded
},_onMoviePlayable:Prototype.EmptyFunction,_onMovieFinished:Prototype.EmptyFunction,id:null,triggers:function(){if(!this._triggers){this._triggers=[];
var e=new RegExp("#"+this.id+"$");if(this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp){e=this.viewMaster.sectionRegExp||this.viewMaster.options.sectionRegExp;
e=e.toString().replace(/^\//,"").replace(/\/$/,"");e=new RegExp(e.replace("(.*)",this.id))
}var d=document.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(d[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}var a=this.content.getElementsByClassName(this.viewMaster.triggerClassName);for(var b=0,c;
(c=$(a[b]));b++){if(c.tagName.toLowerCase()!=="a"){continue}if(c.href.match(e)){this._triggers.push(c)
}}}return this._triggers},relatedElements:function(){if(!this._relatedElements){this._relatedElements=document.getElementsByClassName(this.id)
}return this._relatedElements},initialize:function(j,k){this.content=$(j);if(this.content.tagName.toLowerCase()==="a"){var c=this.content.getAttribute("href");
var e=c.split("#");this._contentURL=e[0];var f=window.location.href.split("#");
var d=j.className;var g=document.getElementsByTagName("base")[0];var a=g?g.href:null;
if(e.length===2){this.id=e[1]}if(this._contentURL.length>0&&(!a||this._contentURL!=a)&&(this._contentURL!==f[0])&&(!this._contentURL.startsWith("#")||this._contentURL!==c)){this._isContentRemote=true;
this._isContentLoaded=false}else{var h=$(this.id)||$("MASKED-"+this.id);if(h){this.content=h
}}if(!this.id){this.id=this.content.name}}else{this.id=j.id}if(!this._isContentRemote||this._isContentLoaded){this.content.setAttribute("id","MASKED-"+this.id)
}if(k){this.viewMaster=k}if(!this._isContentRemote&&this._isContentLoaded&&!this.content.hasClassName("content")){var b=this.content.getElementsByClassName("content")[0];
if(b){this.content=b}}this.isMobile=AC.Detector.isMobile()},clearTrigger:function(a){if(a.href===("#"+this.id)){return
}a.href="#"+this.id;a.removeAttribute("id");a.removeAttribute("name");if(!this.viewMaster.options.silentTriggers){document.location.hash=this.id
}},remoteContentDidLoad:function(a,b){this.clearTrigger(this.content);this.content=$(a);
this.content.setAttribute("id","MASKED-"+this.id);this._isContentLoaded=true;this.viewMaster.contentDidLoad(this,b)
},loadContent:function(){if(this._isContentLoaded){var d=this;d.viewMaster.contentDidLoad(d,null)
}else{if(this.content.className.indexOf("imageLink")!==-1){var b=this.viewMaster.options.useHTML5Tags?document.createElement("figure"):document.createElement("div");
if(this.viewMaster.options.imageLinkClasses){try{console.warn('"imageLinkClasses" is deprecated. Use "addSectionIdAsClassName" instead.')
}catch(f){}Element.addClassName(b,this.id)}b.appendChild(this.content.cloneNode(true));
if(!!this.viewMaster.options.imageLinkAutoCaptions){var a=typeof this.viewMaster.options.imageLinkAutoCaptions=="string"?this.viewMaster.options.imageLinkAutoCaptions:"title";
if(this.content.hasAttribute(a)){if(this.viewMaster.options.useHTML5Tags){var c=document.createElement("figcaption")
}else{var c=document.createElement("p");Element.addClassName(c,"caption")}c.innerHTML=this.content.getAttribute(a);
Element.insert(b,c)}}this.remoteContentDidLoad(b)}else{if((this.content.className.indexOf("movieLink")!==-1)||(this.content.className.indexOf("audioLink")!==-1)){var b=this.viewMaster.options.useHTML5Tags?document.createElement("figure"):document.createElement("div");
b.appendChild(this.content.cloneNode(true));this.remoteContentDidLoad(b)}else{AC.loadRemoteContent(this._contentURL,true,true,this.remoteContentDidLoad.bind(this),null,this)
}}}},shouldImportScriptForContentURL:function(a,d,b){var c=false;if(a.hasAttribute){c=a.hasAttribute("src")
}else{src=a.getAttribute("src");c=((src!=null)&&(src!==""))}if(!c){scriptText=a.text;
if(scriptText.search(/.*\.location\.replace\(.*\).*/)!==-1){return false}return true
}else{return true}},mediaType:function(){return this.movieLink?"video/quicktime":"text/html"
},willClose:function(a){this._closeController();this._closeMovie()},willShow:function(){if(!this.hasShown){this.hasShown=true;
if(this.viewMaster.options.addSectionIdAsClassName===true){this.content.addClassName(this.id)
}var a=this.content.getElementsByClassName("imageLink");for(var b=0;b<a.length;
b++){this._loadImage(a[b])}if(!this.moviePanel){this.movieLink=this.content.getElementsByClassName("movieLink")[0];
if(this.movieLink){this.posterLink=this.__getPoster(this.content,this.movieLink);
this._loadMovie()}}}return this.content},__getPoster:function(a,b){var c;if(b&&b.hasAttribute("data-poster")){c=b.readAttribute("data-poster")
}else{var c=a.getElementsByClassName("posterLink")[0];if(c){c=c.href}}return c},_heightOfContent:0,heightOfContent:function(){if(this._heightOfContent===0&&!(this._isContentRemote&&!this._isContentLoaded)){if(!this.content.parentNode){this.content.style.visibility="hidden";
this.viewMaster.view.view().appendChild(this.content);this._heightOfContent=this.content.getOuterDimensions().height;
this.viewMaster.view.view().removeChild(this.content);this.content.style.visibility=""
}else{this._heightOfContent=this.content.getOuterDimensions().height}}return this._heightOfContent
},getZIndexFromContent:function(){return(this.content)?(parseInt(this.content.getAttribute("data-manage-z"))||null):null
},didShow:function(c){var a=this.hasMovie()&&!this.isMobile,b=this.isACMediaAvailable();
if(b){if(a){this._movieControls=this.newMovieController();this._playMovie();if(this._movieController){this._movieController.setControlPanel(this._movieControls);
this.onMovieFinished=this.didFinishMovie.bind(this);this._movieController.setDelegate(this)
}else{this.controllerPanel.innerHTML=""}}else{this._playMovie()}}else{if(a){this._movieController=this.newMovieController();
this.controllerPanel.innerHTML="";this.controllerPanel.appendChild(this._movieController.render())
}this._playMovie();if(a){this._onMoviePlayable=this._movieController.monitorMovie.bind(this._movieController);
this._onMovieFinished=this.didFinishMovie.bind(this);this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}}},defaultMovieWidth:function(){return 848},defaultMovieHeight:function(){return 480
},defaultOptions:function(){return{width:this.defaultMovieWidth(),height:this.defaultMovieHeight(),controller:false,posterFrame:null,showlogo:false,autostart:true,cache:true,bgcolor:"white",aggressiveCleanup:false}
},_forceACQuicktime:false,isACMediaAvailable:function(){return(typeof(Media)!="undefined"&&this._forceACQuicktime===false)
},setShouldForceACQuicktime:function(a){this._forceACQuicktime=a},movieControls:function(){return this._movieControls
},newMovieController:function(){if(this.isACMediaAvailable()){return this._movieControls||new Media.ControlsWidget(this.controllerPanel)
}else{return new AC.QuicktimeController()}},_loadImage:function(b){var a=document.createElement("img");
if(b.protocol==="about:"){b.href="/"+b.pathname;b.href=b.href.replace(/^\/blank/,"")
}a.setAttribute("src",b.href);a.setAttribute("alt",b.title);b.parentNode.replaceChild(a,b)
},_loadMovie:function(){var a=this.isACMediaAvailable();this.moviePanel=$(document.createElement("div"));
this.moviePanel.addClassName("moviePanel");this.movieLink.parentNode.replaceChild(this.moviePanel,this.movieLink);
this.controllerPanel=$(document.createElement("div"));this.controllerPanel.addClassName("controllerPanel");
if(a===false){}else{this.moviePanel.appendChild(this.controllerPanel)}if(a===false){this.moviePanel.parentNode.insertBefore(this.controllerPanel,this.moviePanel.nextSibling)
}else{this.moviePanel.appendChild(this.controllerPanel)}this.endState=$(this.content.getElementsByClassName("endState")[0]);
if(this.endState){this.endState.parentNode.removeChild(this.endState);var b=$(this.endState.getElementsByClassName("replay")[0]);
if(b){b.observe("click",function(c){Event.stop(c);this.replayMovie()}.bindAsEventListener(this))
}}},_playMovie:function(c){if(this.movieLink&&this.moviePanel){var e=this.isACMediaAvailable();
if(!e){this.moviePanel.innerHTML=""}else{if(this.movie&&this.movie.parentNode==this.moviePanel){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}if(this.endState&&this.endState.parentNode==this.moviePanel){this.moviePanel.removeChild(this.endState)
}if(this.controllerPanel&&Element.hasClassName(this.controllerPanel,"inactive")){this.controllerPanel.show();
Element.removeClassName(this.controllerPanel,"inactive")}}if(this.posterLink&&this.posterLink.length>0){var b=this.posterLink
}var f=this.movieLink.getAttribute("href",2).toQueryParams(),a=this.defaultOptions(),d;
if(c==true){f.replay=true}a.posterFrame=b;d=Object.extend(a,f);for(opt in d){d[opt]=(d[opt]==="true")?true:(d[opt]==="false")?false:d[opt]
}if(e===true){this._movieController=Media.create(this.moviePanel,this.movieLink.getAttribute("href",2),d);
if(this._movieController){this.movie=this._movieController.video().object()}}else{this.movie=AC.Quicktime.packageMovie(this.movieLink.id+"movieId",this.movieLink.getAttribute("href",2),d,this.moviePanel);
if(!AC.Quicktime.movieIsFlash){this.moviePanel.appendChild(this.movie)}}if(e===true&&!this.isMobile&&this.movie){this._movieControls.reset();
this.moviePanel.appendChild(this.controllerPanel)}if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}}},replayMovie:function(){var a=this.isACMediaAvailable();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("replayMovie",this)
}if(a){if(this.moviePanel&&this.endState){this.moviePanel.removeChild(this.endState)
}}this._playMovie(true);if(a){this.controllerPanel.show()}this.controllerPanel.removeClassName("inactive");
if(a){this._movieController.setControlPanel(this._movieControls);this._movieController.setDelegate(this)
}else{this.controllerPanel.stopObserving("click",this._movieController.replay);
this._movieController.replay=null;this._movieController.attachToMovie(this.movie,{onMoviePlayable:this._onMoviePlayable,onMovieFinished:this._onMovieFinished})
}},stopMovie:function(){if(!this.hasMovie()){return}this._closeController();this._closeMovie();
if(this.viewMaster.options.showPreviousOnStopMovie&&this.viewMaster.getPreviousSelection()){this.viewMaster.showPreviousSelection()
}else{if(this.viewMaster.options.showFirstOnStopMovie&&this.viewMaster.getFirstSection()){this.viewMaster.showFirst()
}else{if(this.endState){this.moviePanel.appendChild(this.endState)}else{this.stopMovieWithNoEndState()
}}}},stopMovieWithNoEndState:function(){var a=this;setTimeout(function(){a.viewMaster.showPreviousSelection()
},0)},_closeMovie:function(){if(this.movie&&this.moviePanel){if(!this.isACMediaAvailable()){this.moviePanel.removeChild(this.movie);
this.movie=null;this.moviePanel.innerHTML=""}else{if(AC.Detector.isIEStrict()){this.moviePanel.removeChild(this.movie);
this.controllerPanel.hide()}else{this.moviePanel.innerHTML=""}this.movie=null}}},_closeController:function(){if(this.isACMediaAvailable()){if(this._movieController&&this.hasMovie()&&!this.isMobile){this._movieController.stop();
this._movieController.setControlPanel(null);if(AC.Detector.isIEStrict()){this.controllerPanel.hide()
}this.controllerPanel.addClassName("inactive")}}else{if(this._movieController&&this._movieController.movie&&this.hasMovie()&&!this.isMobile){this._movieController.Stop();
this._movieController.detachFromMovie();this.controllerPanel.addClassName("inactive");
this._movieController.replay=this.replayMovie.bind(this);this.controllerPanel.observe("click",this._movieController.replay)
}}},hasMovie:function(){return !!this.movieLink},isMoviePlaying:function(){if(this._movieController){if(typeof(this._movieController.playing)==="function"){return this._movieController.playing()
}if(typeof(this._movieController.playing)==="boolean"){return this._movieController.playing
}}return false},didFinishMovie:function(){if(!this.hasMovie()){return}if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didFinishMovie",this)
}var a=this;window.setTimeout(function(){a.stopMovie.apply(a)},0)}});AC.ViewMaster.Slideshow=Class.create();
if(Event.Listener){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Listener)
}if(Event.Publisher){Object.extend(AC.ViewMaster.Slideshow.prototype,Event.Publisher)
}Object.extend(AC.ViewMaster.Slideshow.prototype,{contentController:null,animationTimeout:null,options:null,_playing:false,_active:false,_progress:0,setProgress:function(a){this._progress=a
},progress:function(){return this._progress},initialize:function(a,d,b){this.contentController=a;
this.contentController.__slideshow=this;this.triggerClassName=d;this.options=b||{};
if(this.options.stopOnContentTriggerClick===true&&this.contentController.options.useTouchEvents===true){this.options.stopOnUserInteraction=this.options.stopOnContentTriggerClick
}if(!this.options.addNoListeners){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.willShow);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",true,this.didShow)
}if(this.options.autoplay){if(this.options.autoplay===true){this.start()}else{if(typeof this.options.autoplay==="number"){this.toAutoplay=window.setTimeout(function(){this.start()
}.bind(this),this.options.autoplay)}}}Event.observe(document,"click",this._triggerHandler.bindAsEventListener(this));
var c=this.contentController.view.view();Event.observe(c,"AC.ViewMaster.Slideshow:play",this.play.bindAsEventListener(this));
Event.observe(c,"AC.ViewMaster.Slideshow:stop",this.stop.bindAsEventListener(this))
},start:function(){if(this._active){return}this._active=true;if(this.options.wipeProgress=="always"||this.options.wipeProgress=="on start"){this._progress=0
}this.play(true);this._repaintTriggers();if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didStart",this)
}},stop:function(){this._active=false;this.pause();this._repaintTriggers();if(this.toAutoplay){window.clearTimeout(this.toAutoplay);
delete this.toAutoplay}if(typeof(document.event.dispatchEvent)=="function"){document.event.dispatchEvent("didEnd",this)
}},play:function(a){if(!this._active){return}if(this.options.wipeProgress=="always"||(this.options.wipeProgress=="on play"&&!a)){this._progress=0
}this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay());
this._playing=true},_update:function(){if(typeof(this.options.onProgress)=="function"){this.options.onProgress(this._progress,this.delay())
}if(this._progress>=this.delay()){this._progress=0;this.next()}else{this._progress+=this._heartbeatDelay();
this.animationTimeout=setTimeout(this._update.bind(this),this._heartbeatDelay())
}},delay:function(){return this.options.delay||5000},_heartbeatDelay:function(){return this.options.heartbeatDelay||100
},pause:function(){clearTimeout(this.animationTimeout);this._playing=false},next:function(){var b=this.contentController.options.discontinuousPreviousNext;
if(this.options.discontinuousPreviousNext!==b){this.contentController.options.discontinuousPreviousNext=this.options.discontinuousPreviousNext
}var d=((typeof this.options.stopAfterReturnToSection=="number"&&this.contentController.indexOfSection(this.contentController.currentSection)==this.options.stopAfterReturnToSection)||(typeof this.options.stopAfterReturnToSection=="string"&&this.contentController.currentSection.id==this.options.stopAfterReturnToSection));
var a=this.options.willEnd&&(this.contentController.getNextSection()==this.contentController.getFirstSection());
if(d||a){if(a){try{console.warn("Instead of AC.ViewMaster.Slideshow.options.willEnd = true, please use AC.ViewMaster.Viewer.options.discontinuousPreviousNext = true.")
}catch(c){}}if(this._returnedToSection||a){this.stop()}else{if(!this._returnedToSection){this._returnedToSection=true
}}}if(this._active){this.contentController.showNext()}this.contentController.options.discontinuousPreviousNext=b;
this.contentController.disablePreviousNextIfNeeded()},previous:function(){this.contentController.showPrevious()
},reset:function(){this.contentController.showFirst();this.setProgress(0)},willShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.pause()},didShow:function(a){if(a.event_data.data.sender!=this.contentController){return
}this.play()},_triggerHandler:function(a){var b=a.element();if((this.options.stopOnUserInteraction===true||this.options.stopOnContentTriggerClick)&&(link=a.findElement("a"))&&link.hasClassName(this.contentController.triggerClassName)&&link.href.search(this.contentController.currentSection.id)==-1){if(this.options.stopOnContentTriggerClick){try{console.warn('"stopOnContentTriggerClick" is deprecated. Please use "stopOnUserInteraction" instead.')
}catch(c){}this.stop()}else{this.userInteracted()}return}if(b.hasClassName(this.triggerClassName)&&b.href.match(/#slideshow-toggle/)){Event.stop(a);
if(this._active){this.stop()}else{this.start()}}},userInteracted:function(){if(this.options.stopOnUserInteraction===true){this.stop()
}},_repaintTriggers:function(){if(!this.triggerClassName){return}var b=document.getElementsByClassName(this.triggerClassName);
for(var a=b.length-1;a>=0;a--){this._repaintTrigger(b[a])}},_repaintTrigger:function(a){var b=$(a);
if(this._active){b.addClassName("playing")}else{b.removeClassName("playing")}}});
AC.SlideView=Class.create(AC.SwapView,{_resetView:function(){if(!this._view){return
}this._view.addClassName("swapView")},setLoadedContent:function(b){if(typeof(this.delegate.willShow)==="function"){b=this.delegate.willShow(this,this.currentContent,b)
}var a=true,c;if(typeof(this.delegate.shouldAnimateContentChange)==="function"){a=this.delegate.shouldAnimateContentChange(this,this.currentContent,b)
}if(a&&typeof(this.delegate.willAnimate)==="function"){this.didAnimate=true;if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}c=this.delegate.willAnimate(this,this.currentContent,b,this.didShow.bind(this,b))
}else{this.didAnimate=false;if(this.currentContent!==b){if(typeof(this.delegate.didAppendContent)==="function"){this.delegate.didAppendContent(this,b)
}}if(b){$(b).setOpacity(1)}this.didShow(b)}},didShow:function(a){if(typeof(this.delegate.didShow)==="function"){this.delegate.didShow(this,this.currentContent,a)
}this.currentContent=a}});AC.ViewMaster.SlideViewer=Class.create(AC.ViewMaster.Viewer,{initialize:function(e,k,g,n){if(g){this.triggerClassName=g
}this.sections=$H();this.orderedSections=[];this.options=n||{};this.silentPreviousSelection(this.options.silentPreviousSelection);
this.silentFirstSection(this.options.silentFirstSection);this.triggerEvent=this.options.triggerEvent||"click";
var d=null,l,h;if(e){for(h=0;h<e.length;h++){l=this.addSection(e.item(h));if(!d){d=l
}}}this.view=new AC.SlideView(k);this.view.setDelegate(this);var a=document.location.hash,f,c;
this.sectionRegExp=this.options.sectionRegExp||new RegExp(/#(.*)$/);c=a.match(this.sectionRegExp);
if(c&&c[1]){a=c[1]}if(a!==this.view._viewId){var j=document.getElementsByClassName(this.triggerClassName),b;
for(h=0,b;(b=j[h]);h++){if(b.getAttribute("href").match(new RegExp("#"+a+"(?![_w-])"))){f=this.sectionWithId(a);
if(f){d=f}break}}}if(!f&&typeof this.options.initialId==="string"&&this.options.initialId.length>0){d=this.sectionWithId(this.options.initialId)
}this.show(d);this._boundTriggerClicked=this._triggerClicked.bindAsEventListener(this);
if(typeof this.triggerEvent==="object"){for(var h=0,m;m=this.triggerEvent[h];h++){Event.observe(document,m,this._boundTriggerClicked)
}}else{Event.observe(document,this.triggerEvent,this._boundTriggerClicked)}if(AC.Detector.isIEStrict()){Event.observe(document,"mouseup",this._boundTriggerClicked)
}if(this.options.useKeyboardNav===true||this.options.escapeToClose===true){this._boundKeyDown=this._keyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this._boundKeyDown)}if(this.touchShouldUse()){this.__touchLoadEventDependencies()
}if(typeof(this.listenForEvent)==="function"){this.selectSectionFromEventHandler=this.selectSectionFromEvent.bind(this);
this.listenForEvent(AC.ViewMaster,"ViewMasterSelectSectionWithIdNotification",true,this.selectSectionFromEventHandler);
this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.stopMovieIfItsPlaying);
this.listenForEvent(document.event,"replayMovie",false,this.stopMovieIfItsPlaying.bind(this));
if(this.options.parentSectionId){this.listenForEvent(AC.ViewMaster,"ViewMasterWillCloseNotification",false,function(o){var p=o.event_data.data;
if(this===p.sender){return}if(p.outgoingView&&p.outgoingView.id===this.options.parentSectionId){this.willClose(this.view,this.currentSection)
}})}}},touchShouldUse:function(){if(this.options.useTouchEvents===true){if(typeof AC.Detector==="undefined"||!(AC.Detector.isMobile()||AC.Detector.isiPad())){return this.options.useTouchEvents=false
}return true}return this.options.useTouchEvents=false},__touchLoadEventDependencies:function(){if(typeof Element.trackTouches==="function"){this.__touchInitTrackTouches()
}else{if($("swap-view-track-touches-script-tag")===null){var b=document.getElementsByTagName("head")[0];
var a=document.createElement("script");a.type="text/javascript";a.setAttribute("src","/global/scripts/pagingview.js");
a.setAttribute("id","swap-view-track-touches-script-tag");b.appendChild(a)}this.__boundTouchInitTrackTouches=this.__touchInitTrackTouches.bindAsEventListener(this);
document.observe("ac:trackTouches:load",this.__boundTouchInitTrackTouches)}},__touchInitTrackTouches:function(){this.options.discontinuousPreviousNext=true;
this.options.continuous=false;this._shouldBeContinuous=false;this.__boundTouchTrackEvents=this.__touchTrackEvents.bindAsEventListener(this);
this.__mask=this.view.view().up();this.__maskWidth=this.__mask.getWidth()||0;this.view.view().trackTouches(this.__boundTouchTrackEvents,this.__boundTouchTrackEvents,this.__boundTouchTrackEvents,{stopEvent:"horizontal",stopThreshold:10})
},__touchTrackEvents:function(b){var a=this.view.view();a.setVendorPrefixStyle("transition-duration","0");
if(b.startCoords&&b.coords){if(b.difference&&typeof this.__touchTrackedStartOffset!=="undefined"){a.setVendorPrefixTransform(this.__touchTrackingNewLeft(b)+"px")
}else{this.__touchStart(b)}if(b.touches.length===0){this.__touchEnd(b)}}},__touchStart:function(c){var a=this.view.view(),b;
this.__storedShouldAnimateContentChange=this.options.shouldAnimateContentChange;
this.options.shouldAnimateContentChange=false;if(typeof this.__touchAnimateAfterTouchEnd!=="undefined"){this.__touchAnimateAfterTouchEnd(false)
}b=a.translateOffset();if(b===null||typeof b!=="object"){this.__touchTrackedStartOffset=0
}else{this.__touchTrackedStartOffset=b.x}},__touchEnd:function(d){var b=this.view.view(),h=d.difference.abs.x/this.__maskWidth,g=d.difference.current.x/this.__maskWidth,f=this.options.animationDuration||0.4,a,c,e;
if(g>0.4||d.speed>=7){if(d.direction.x==="right"){a=this.getNextSection()}else{if(d.direction.x==="left"){a=this.getPreviousSection()
}}}this.__touchSetTransitionEnd(b,a);if(a===false||typeof a==="undefined"){this._animate(this.__touchTrackedStartOffset,f*h)
}else{c=(a.content.positionedOffset()[0])*-1;if(h>=0.5){f*=0.5}this._animate(c,f)
}if(d.difference.abs.x>5&&typeof this.__slideshow==="object"&&typeof this.__slideshow.userInteracted==="function"){this.__slideshow.userInteracted()
}delete this.__touchTrackedStartOffset},__touchSetTransitionEnd:function(b,a){var c=function(d){if(d!==false){this.show(a)
}this.options.shouldAnimateContentChange=this.__storedShouldAnimateContentChange;
delete this.__storedShouldAnimateContentChange;b.removeVendorEventListener("transitionEnd",this.__touchAnimateAfterTouchEnd,false);
delete this.__touchAnimateAfterTouchEnd};this.__touchAnimateAfterTouchEnd=c.bindAsEventListener(this);
b.addVendorEventListener("transitionEnd",this.__touchAnimateAfterTouchEnd,false)
},__touchTrackingNewLeft:function(d){var a=this.isAtEnd(this.currentSection),b,c;
b=function(j,h){var f,g,e;f=function(k){return(k==1)?1:1-Math.pow(2,-3*k)};e=j/h;
g=parseFloat(f(e)*(h/3));return g};if(a!==false&&(a==="left"&&d.difference.x<0)||(a==="right"&&d.difference.x>0)){c=b(d.difference.abs.x,this.__maskWidth);
if(a==="left"){c*=-1}}else{c=d.difference.x}return this.__touchTrackedStartOffset-c
},isAtEnd:function(b){var a=this.orderedSections.indexOf(b.id);if(a===0){return"left"
}else{if(a===this.orderedSections.length-1){return"right"}}return false},getNextSection:function($super){if(this.options.continuous){this._shouldBeContinuous=true
}return $super()},getPreviousSection:function($super){if(this.options.continuous){this._shouldBeContinuous=true
}return $super()},willShow:function($super,b,c,a){if(this.options.shouldAddActiveClassToContent===true){if(c){c.removeClassName("active")
}if(a){a.content.addClassName("active")}}return $super(b,c,a)},willAnimate:function($super,b,c,a,f){var e=b.view().offsetLeft||0,d=-a.offsetLeft||0;
if(e!==d){this._didShowInitial=true;$super(b,c,a,f);this._didShowInitial=false}else{$super(b,c,a,f)
}this.willAnimate=$super},_animate:function(c,b){var a=this.view.view();if(b==0){a.setVendorPrefixStyle("transition","none")
}else{a.setVendorPrefixStyle("transition","-webkit-transform "+b+"s cubic-bezier(0,0,0.25,1)")
}a.setAttribute("left",c);if(AC.Detector.supportsThreeD()){a.setVendorPrefixStyle("transform","translate3d("+c+"px, 0, 0)")
}else{a.setVendorPrefixStyle("transform","translate("+c+"px, 0)")}},_animation:function(j,g,d,c,o,e){var m=j.view(),b=m.offsetLeft||0,l=-d.offsetLeft||0;
d.setOpacity(1);if(this._shouldBeContinuous){var f=this.indexOfSection(j.delegate.currentSection),h=this.indexOfSection(j.delegate.previousSection);
var a=l;if((f===0)&&(h===this.orderedSections.length-1)){l=(g.positionedOffset()[0]+g.getWidth())*-1;
this._continuousCloneElement=this._continuousClone(j,d,l)}else{if((f===this.orderedSections.length-1)&&(h===0)){l=(g.positionedOffset()[0]-g.getWidth())*-1;
this._continuousCloneElement=this._continuousClone(j,d,l)}}}var n=this;if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this._animate(l,e);
var k=function(p){if(p.target==m&&p.propertyName.match(/transform$/i)){m.removeVendorEventListener("transitionEnd",k,false);
n._continuousReset(a,j);c()}};m.addVendorEventListener("transitionEnd",k,false)
}else{return new Effect.Move(m,{x:l-b,y:0,duration:e,afterFinish:function(){n._continuousReset(a,j);
c()},queue:{scope:o}})}},_continuousClone:function(b,a,c){if(this._shouldBeContinuous){var d=a.cloneNode(true);
d.id=d.id+"-clone";d.innerHTML=a.innerHTML;d.setStyle("position: absolute; top: 0; left:"+(c*-1)+"px");
b._view.insert(d);return d}else{return false}},_continuousReset:function(b,a){if(this._shouldBeContinuous){a._view.setAttribute("left",b);
if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){a._view.setVendorPrefixStyle("transition","none");
if(AC.Detector.supportsThreeD()){a._view.setVendorPrefixStyle("transform","translate3d("+b+"px, 0, 0)")
}else{a._view.setVendorPrefixStyle("transform","translate("+b+"px, 0)")}}else{a._view.setStyle("left:"+b+"px")
}delete this._shouldBeContinuous}if(this._continuousCloneElement){if(this._removeContinuousCloneElement){this._continuousCloneElement.remove();
delete this._continuousCloneElement;delete this._removeContinuousCloneElement}else{this._removeContinuousCloneElement=true
}}}});AC.loadRemoteContent=function(g,j,c,h,a,e){if(typeof g!=="string"){return
}if(typeof j!=="boolean"){j=true}if(typeof c!=="boolean"){c=true}var f=arguments.callee;
var d=f._loadArgumentsByUrl[g];if(!d){f._loadArgumentsByUrl[g]={contentURL:g,importScripts:j,importCSS:c,callback:h,context:a,delegate:e};
var b={method:"get",onSuccess:arguments.callee.loadTemplateHTMLFromRequest,onFailure:arguments.callee.failedToadTemplateHTMLFromRequest,onException:function(k,l){throw (l)
}};if(!g.match(/\.json$/)){b.requestHeaders={Accept:"text/xml"};b.onCreate=function(k){k.request.overrideMimeType("text/xml")
}}new Ajax.Request(g,b)}};AC.loadRemoteContent._loadArgumentsByUrl={};AC.loadRemoteContent.loadTemplateHTMLFromRequest=function(b){var d=b.request.url;
var l=arguments.callee;var g=AC.loadRemoteContent._loadArgumentsByUrl[d];var p=window.document;
var j=b.responseXMLValue().documentElement;if(AC.Detector.isIEStrict()){j=j.ownerDocument
}var p=window.document;var k=document.createDocumentFragment();if(g.importScripts){AC.loadRemoteContent.importScriptsFromXMLDocument(j,k,g)
}if(g.importCSS){AC.loadRemoteContent.importCssFromXMLDocumentAtLocation(j,d,g)
}var q=null;var a=null;var f=j.getElementsByTagName("body")[0];if(!f){return}f.normalize();
var a=Element.Methods.childNodeWithNodeTypeAtIndex(f,Node.ELEMENT_NODE,0);if(a){q=p._importNode(a,true);
if(q.cleanSpaces){q.cleanSpaces(true)}}else{if(f.cleanSpaces){f.cleanSpaces(true)
}else{if(typeof f.normalize==="function"){f.normalize()}}var h=f.childNodes;q=p.createDocumentFragment();
var m=/\S/;for(var e=0,c=0;(c=h[e]);e++){var n=p._importNode(c,true);q.appendChild(n)
}}var o=g.callback;o(q,k,g.context)};AC.loadRemoteContent.javascriptTypeValueRegExp=new RegExp("text/javascript","i");
AC.loadRemoteContent.javascriptLanguageValueRegExp=new RegExp("javascript","i");
AC.loadRemoteContent.documentScriptsBySrc=function(){if(!AC.loadRemoteContent._documentScriptsBySrc){AC.loadRemoteContent._documentScriptsBySrc={};
var b=document.getElementsByTagName("script");if(!b||b.length===0){return AC.loadRemoteContent._documentScriptsBySrc
}for(var c=0,a=null;(a=b[c]);c++){var d=a.getAttribute("type");var f=null;var g=a.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(d)&&!this.javascriptLanguageValueRegExp.test(g)){continue
}if(a.hasAttribute){var e=a.hasAttribute("src")}else{var e=Element.Methods.hasAttribute(a,"src")
}if(e){var f=a.getAttribute("src");AC.loadRemoteContent._documentScriptsBySrc[f]=f
}}}return AC.loadRemoteContent._documentScriptsBySrc};AC.loadRemoteContent.importScriptsFromXMLDocument=function(n,b,s){var e=n.getElementsByTagName("script"),f,g,o,t,c=s.contentURL,r=s.delegate,d=s.context,a=(r&&typeof r.shouldImportScriptForContentURL==="function"),q=navigator.userAgent.toLowerCase(),u=(AC.Detector.isIEStrict()&&parseInt(q.substring(q.lastIndexOf("msie ")+5))<9),h=true;
if(!b){b=document.createDocumentFragment()}var k=AC.loadRemoteContent.documentScriptsBySrc();
for(var p=0,l=null;(l=e[p]);p++){f=l.getAttribute("type");g=null;h=true;o=l.getAttribute("language");
if(!this.javascriptTypeValueRegExp.test(f)&&!this.javascriptLanguageValueRegExp.test(o)){continue
}if(l.hasAttribute){t=l.hasAttribute("src");g=l.getAttribute("src")}else{g=l.getAttribute("src");
t=((g!=null)&&(g!==""))}if(l.getAttribute("id")==="Redirect"||(a&&!r.shouldImportScriptForContentURL(l,c,d))){continue
}if(t){if(!k.hasOwnProperty(g)){var m=document.createElement("script");m.setAttribute("type","text/javascript");
if(u){m.tmp_src=g;m.onreadystatechange=function(){var v=window.event.srcElement,w;
if(!v.isLoaded&&((v.readyState=="complete")||(v.readyState=="loaded"))){w=v.tmp_src;
if(w){v.tmp_src=null;v.src=w;v.isLoaded=false}else{v.onreadystatechange=null;v.isLoaded=true
}}}}else{m.src=g}AC.loadRemoteContent._documentScriptsBySrc[g]=g;b.appendChild(m)
}}else{var m=document.createElement("script");m.setAttribute("type","text/javascript");
if(u){var j=new Function(l.text);m.onreadystatechange=function(){var v=window.event.srcElement;
if(!v.isLoaded&&((v.readyState=="complete")||(v.readyState=="loaded"))){v.onreadystatechange=null;
v.isLoaded=true;j()}}}else{m.text=l.text}AC.loadRemoteContent._documentScriptsBySrc[g]=g;
b.appendChild(m)}}return b};AC.loadRemoteContent.insertScriptFragment=function(e){if(!e){return
}AC.isDomReady=false;Event._domReady.done=false;var d=document.getElementsByTagName("head")[0],g=e.childNodes,b,c,a=function(){var h;
if(!window.event||((h=window.event.srcElement)&&(h.isLoaded||((typeof h.isLoaded==="undefined")&&((h.readyState=="complete")||(h.readyState=="loaded")))))){arguments.callee.loadedCount++;
if(h&&!h.isLoaded){h.onreadystatechange=null;h.isLoaded=true}if(arguments.callee.loadedCount===arguments.callee.loadingCount){Event._domReady()
}}};a.loadedCount=0;a.loadingCount=e.childNodes.length;for(c=0;(b=g[c]);c++){if(b.addEventListener){b.addEventListener("load",a,false)
}else{if(typeof b.onreadystatechange==="function"){var f=b.onreadystatechange;b.onreadystatechange=function(h){var j=window.event.srcElement;
f.call(j);a()}}else{b.onreadystatechange=a}}}d.appendChild(e);d=null};AC.loadRemoteContent.documentLinksByHref=function(){if(!AC.loadRemoteContent._documentLinksByHref){AC.loadRemoteContent._documentLinksByHref={};
var b=document.getElementsByTagName("link");if(!b||b.length===0){return AC.loadRemoteContent._documentLinksByHref
}for(var c=0,e=null;(e=b[c]);c++){var d=e.getAttribute("type");if(e.type.toLowerCase()!=="text/css"){continue
}var f=null;if(e.hasAttribute){var a=e.hasAttribute("href")}else{var a=Element.hasAttribute(e,"href")
}if(a){var f=e.getAttribute("href");AC.loadRemoteContent._documentLinksByHref[f]=f
}}}return AC.loadRemoteContent._documentLinksByHref};AC.loadRemoteContent.__importCssElementInHeadFromLocation=function(e,g,b){var d=(e.tagName.toUpperCase()==="LINK");
if(d){var f=e.getAttribute("type");if(!f||f&&f.toLowerCase()!=="text/css"){return
}var c=e.getAttribute("href");if(!c.startsWith("http")&&!c.startsWith("/")){var j=c;
if(b.pathExtension().length>0){b=b.stringByDeletingLastPathComponent()}c=b.stringByAppendingPathComponent(j)
}if(AC.Detector.isIEStrict()){var a=window.document.createStyleSheet(c,1)}else{var h=window.document.importNode(e,true);
h.href=c}AC.loadRemoteContent.documentLinksByHref()[c]=c}if(!AC.Detector.isIEStrict()||(AC.Detector.isIEStrict()&&!d)){g.insertBefore(h,g.firstChild)
}};AC.loadRemoteContent.importCssFromXMLDocumentAtLocation=function(h,b,g){var j=window.document.getElementsByTagName("head")[0];
var c=[];c.addObjectsFromArray(h.getElementsByTagName("style"));c.addObjectsFromArray(h.getElementsByTagName("link"));
if(c){var d=AC.loadRemoteContent.documentLinksByHref();for(var e=0,f=null;(f=c[e]);
e++){var a=f.getAttribute("href");if(d.hasOwnProperty(a)){continue}this.__importCssElementInHeadFromLocation(f,j,b)
}}};Ajax.Request.prototype._overrideMimeType=null;Ajax.Request.prototype.overrideMimeType=function(a){this._overrideMimeType=a;
if(this.transport.overrideMimeType){this.transport.overrideMimeType(a)}};Ajax.Request.prototype._doesOverrideXMLMimeType=function(){return(this._overrideMimeType==="text/xml")
};Ajax.Response.prototype.responseXMLValue=function(){if(AC.Detector.isIEStrict()){var a=this.transport.responseXML.documentElement;
if(!a&&this.request._doesOverrideXMLMimeType()){this.transport.responseXML.loadXML(this.transport.responseText)
}}return this.transport.responseXML};

}
/*
     FILE ARCHIVED ON 20:20:37 Oct 12, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:14 Jul 31, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.665
  exclusion.robots: 0.021
  exclusion.robots.policy: 0.009
  esindex: 0.01
  cdx.remote: 15.075
  LoadShardBlock: 514.657 (6)
  PetaboxLoader3.datanode: 529.788 (7)
  load_resource: 132.933
  PetaboxLoader3.resolve: 86.971
*/