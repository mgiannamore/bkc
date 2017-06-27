$(window).resize(function(){
	responder.resized();
	responder.reorderFeatNav();
});
window.onorientationchange = function (event){
	responder.resized();
	responder.reorderFeatNav();
}

$(document)
.ready(function(){
	responder.setFrameWidths();
	setTimeout(function(){ responder.setFrameWidths(); }, 10);
	setTimeout(function(){ responder.setFrameWidths(); }, 20);
	responder.initializeFeatNav();
})
.on("click", "#nav-toggle", function(e){
	//Toggle Mobile Slide Menu
	e.preventDefault();
	if($(this).hasClass("active")){
		responder.deviceMenu('close');
	} else {
		responder.deviceMenu('open');
	}
	responder.deviceMenu('open');
})
.on("click", "#wrapper.open", function(e){
	//Toggle Mobile Slide Menu
	e.preventDefault();
	responder.deviceMenu('close');
})
.on("click", ".mobile-list-toggle", function(e){
	//Toggle Mobile Subnav Links
	e.preventDefault();
	if($('.mobile-nav').hasClass('subnav-expanded')){
		//something is open, find it
		var expanded = $('.mobile-nav').find('.mobile-list-toggle--active');
		//if it's this one, close it, and remove class subnav-expanded from mobile-nav
		if($(expanded).is($(this))){
			$(this).parent().find('.mobile-submenu').slideUp().removeClass('mobile-submenu--active');
			$(this).removeClass('mobile-list-toggle--active').parent().find('.mobile-page-link').removeClass('mobile-page-link--active');
			$('.mobile-nav').removeClass('subnav-expanded');
			$('.mobile-home-link').removeClass('mobile-home-link--hidden');
		} else { //else, close the open one and expand this one
			$(expanded).parent().find('.mobile-submenu').slideUp().removeClass('mobile-submenu--active');
			$(expanded).removeClass('mobile-list-toggle--active').parent().find('.mobile-page-link').removeClass('mobile-page-link--active');
			$(this).parent().find('.mobile-submenu').slideDown().addClass('mobile-submenu--active');
			$(this).addClass('mobile-list-toggle--active').parent().find('.mobile-page-link').addClass('mobile-page-link--active');
		}
	} else { //nothing is expanded, expand this one
		$(this).parent().find('.mobile-submenu').slideDown().addClass('mobile-submenu--active');
		$(this).addClass('mobile-list-toggle--active').parent().find('.mobile-page-link').addClass('mobile-page-link--active');
		$('.mobile-nav').addClass('subnav-expanded');
		$('.mobile-home-link').addClass('mobile-home-link--hidden');
	}

})
.on("click", "li.subby-click", function() {
	//Toggle Desktop Interior Menu
    //e.preventDefault();
    $(".subby").slideToggle(300).toggleClass('active');
})
.on("click", ".featured-interior__nav li.current", function(e) {
	//Toggle Mobile Subnav
    e.preventDefault();
		var zIndex = parseInt($("#responder").css('z-index'));
		if (zIndex == 10){
			$(".featured-interior__nav ul").toggleClass('active');
			if($('.featured-interior__nav ul').hasClass('active')){
				$('.featured-interior__nav ul').animate({'height': featNavMaxHeight}, 300);
			} else {
				$('.featured-interior__nav ul').animate({'height': 80}, 300);
			}
		}
})
.on("click", ".featured-interior__nav li.default", function() {
	//Toggle Mobile Subnav
    $(".featured-interior__nav ul").toggleClass('active');
})
.on("click", ".action_buyplan", function(){
	$('html, body').animate({
	   scrollTop: $("#marquee-plans").offset().top
    }, 800)
})
.on("mouseenter", ".plan-group", function(){
	$(this).find(".icon-plans, .plan-group-text").addClass("active");
})
.on("mouseleave", ".plan-group", function(){
	$(this).find(".icon-plans, .plan-group-text").removeClass("active");
})
.on("mouseenter", ".tout a, .two-rows__tout a, .two-cols-varied__item a, a.action-hover-link", function(){
	$(this).find("span").addClass("active");
})
.on("mouseleave", ".tout a, .two-rows__tout a, .two-cols-varied__item a, a.action-hover-link", function(){
	$(this).find("span").removeClass("active");
})
.on("mouseenter", "header .main a", function(){
	$("header .main a").addClass("active");
	$(this).removeClass("active");
})
.on("mouseleave", "header .main a", function(){
	$("header .main a").removeClass("active");
})
.on("mouseenter", "header ul.subby li", function(){
	$("header ul.subby li").addClass("active");
	$(this).removeClass("active");
})
.on("mouseleave", "header ul.subby li", function(){
	$("header ul.subby li").removeClass("active");
})
.on("mouseenter", "header .topnav a", function(){
	$("header .topnav a").addClass("active");
	$(this).removeClass("active");
})
.on("mouseleave", "header .topnav a", function(){
	$("header .topnav a").removeClass("active");
})
.on("click", ".action-show-pharmacy-info", function() {
	//Pharmacy show, Find a Doctor page
    $(".find-a-pharmacy__bottom-info").slideToggle(300);
})
.on("mouseenter", '.social-right a', function(){
	$(this).find('.social-icon').css('background-image', 'url(../images/icon-sprite-social-hover.png)');
})
.on("mouseleave", '.social-right a', function(){
	$(this).find('.social-icon').css('background-image', 'url(../images/icon-sprite-social.svg)');
})
.on("click", "header .topnav a.search-toggle", function(){
	$('header nav.topnav a.search-fade').toggleClass('faded');
	$(this).toggleClass("opened");
	$('header nav.topnav form.desktop-site-search').toggleClass("active-search");
	if($(this).hasClass('opened')){
		$('#desktop_search_term').focus();
	}
})
;

var featNavOrigPosition;
var featNavMaxHeight;

var responder = {
	isopen:false,
	curZindex:1,
	resizeCallbacks:[function(){ responder.setFrameWidths(); }],
	resized:function(){
		var thisobj = this;
		if(thisobj.resizeCallbacks.length > 0){
			for(var i=0; i < thisobj.resizeCallbacks.length; i++){
				try {
					responder.resizeCallbacks[i]();
				}
				catch(err){
					console.log('Function does not exist');
				}
			}
		}
	},
	setFrameWidths:function(){
		"use strict";
		$("body").css('width', '100%');
		var curzindex = parseInt($("#responder").css('z-index'));
		this.curZindex = curzindex;
		if(this.curZindex != 10){
            this.deviceMenu('close');
			marginWidth();
        }
		if(this.curZindex == 10){
			noWidth();
        }
	},
	deviceMenu:function(action){
		"use strict";
		switch(action){
			case 'open':
				$("#wrapper").addClass("open");
				$("#nav-toggle").addClass("active");
				this.isopen = true;
				break;
			case 'close':
				$("#wrapper").removeClass("open");
				$("#nav-toggle").removeClass("active");
				this.isopen = false;
				break;
		}
	},
	initializeFeatNav:function(){
		if($('.featured-interior__nav')){
			featNavOrigPosition = getOriginalFeaturedNavItemPosition();
			//console.log(featNavOrigPosition);
			var curzindex = parseInt($("#responder").css('z-index'));
			this.curZindex = curzindex;
			if(this.curZindex == 10){
				$('.featured-interior__nav .inner ul li.current').prependTo('.featured-interior__nav .inner ul');
			}
			featNavMaxHeight = setFeaturedNavMaxHeight();
		}
	},
	reorderFeatNav:function(){
		if($('.featured-interior__nav')){
			var curzindex = parseInt($("#responder").css('z-index'));
			this.curZindex = curzindex;
			if(this.curZindex == 10){
				$('.featured-interior__nav .inner ul li.current').prependTo('.featured-interior__nav .inner ul');
			} else {
				$('.featured-interior__nav .inner ul li.current').insertAfter($('.featured-interior__nav .inner ul li')[featNavOrigPosition]);
			}
		}
	}
};
