var projectname = {
	loaded:false,
};
var marginWidth = function(){
	var inner = $("footer .inner").width();
	var w = $(window).width() - inner;
	var newMargins = w / 2;
	$(".margin-set--right").css("padding-right", newMargins);
	$(".margin-set--left").css("padding-left", newMargins);
};
var noWidth = function(){
	$(".margin-set--right").css("padding-right", 0);
	$(".margin-set--left").css("padding-left", 0);
};
var getOriginalFeaturedNavItemPosition = function(){
	var items = $('.featured-interior__nav .inner ul li');
	var current = items.filter('.current');
	var index = items.index(current);
	return index;
};
var setFeaturedNavMaxHeight = function(){
	var mh = $('.featured-interior__nav ul li').length * 80;
	return mh;
}
