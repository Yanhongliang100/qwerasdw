(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 640) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc()
	doc.addEventListener('DOMContentLoaded', recalc, false);
	/*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
})(document, window);
var _h=document.documentElement.clientHeight;
var _w=document.documentElement.clientWidth;
var bgimg=document.getElementsByClassName('bg');
for (var i = 0; i < bgimg.length; i++) {
	bgimg[i].children[0].style.height=_h+"px";
}
var bgimg=document.getElementsByClassName('wz');
for (var i = 0; i < bgimg.length; i++) {
	bgimg[i].children[0].style.height=_h+"px";
	bgimg[i].children[0].style.width=_h/1425*800+"px";
}
