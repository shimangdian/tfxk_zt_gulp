function setFontSize() {
    // 获取window 宽度 sss
    // zepto实现 $(window).width()就是这么干的
    var winWidth = window.innerWidth;
    winWidth = winWidth > 640 ? 640 : winWidth;

    document.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px';
}
!(function(win, doc) {
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;
    win.addEventListener(evt, function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    //初始化
    setFontSize();

}(window, document));

window.onload=function () {  
    document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
            event.preventDefault();  
        }  
    })  
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)

    setTimeout(setFontSize, 300);
}
// (function(designWidth, maxWidth) {
//   var doc = document,
//   win = window,
//   docEl = doc.documentElement,
//   remStyle = document.createElement("style"),
//   tid;

//   function refreshRem() {
//       var width = docEl.getBoundingClientRect().width;
//       maxWidth = maxWidth || 540;
//       width>maxWidth && (width=maxWidth);
//       var rem = width * 100 / designWidth;
//       remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
//   }

//   if (docEl.firstElementChild) {
//       docEl.firstElementChild.appendChild(remStyle);
//   } else {
//       var wrap = doc.createElement("div");
//       wrap.appendChild(remStyle);
//       doc.write(wrap.innerHTML);
//       wrap = null;
//   }
//   //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
//   refreshRem();

//   win.addEventListener("resize", function() {
//       clearTimeout(tid); //防止执行两次
//       tid = setTimeout(refreshRem, 300);
//   }, false);

//   win.addEventListener("pageshow", function(e) {
//       if (e.persisted) { // 浏览器后退的时候重新计算
//           clearTimeout(tid);
//           tid = setTimeout(refreshRem, 300);
//       }
//   }, false);

//   if (doc.readyState === "complete") {
//       doc.body.style.fontSize = "16px";
//   } else {
//       doc.addEventListener("DOMContentLoaded", function(e) {
//           doc.body.style.fontSize = "16px";
//       }, false);
//   }
// })(700, 1400);