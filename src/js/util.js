(function (win, doc) {
  function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
  }
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 60 * 60 * 1000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
  }
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  }
  function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }
  /*
  往下滚动屏幕

  @params xpos: 需要滚动的高度

  2019.4.25 hoye
  */
  var scrollto = function (xpos) {
    var scrollTop = document.documentElement.scrollTop // 当前距离顶部的距离
    ,timeDeaily = 1 // 每次滚动的延时
    ,speed = 1; // 每次滚动的距离单位像素,默认100
    if (xpos > scrollTop) {
      // 往下滚动
      var timer = setInterval(function () {
        if (scrollTop >= xpos) {
          clearInterval(timer);
          return;
        }
        speed++; // 加速运动
        if (Math.abs(scrollTop - xpos) < speed) {
          speed = Math.abs(scrollTop - xpos) - 1
        }
        scrollTop += speed;
        window.scrollTo(0, scrollTop);
      }, timeDeaily);
    } else {
      // 往上滚动
      var timer = setInterval(function () {
        if (scrollTop <= xpos) {
          clearInterval(timer);
          return;
        }
        speed++; // 加速运动
        if (Math.abs(scrollTop - xpos) < speed) {
          speed = Math.abs(scrollTop - xpos)
        }
        scrollTop -= speed;
        window.scrollTo(0, scrollTop);
      }, timeDeaily);
    }
  };

  /**
   * 类似jq的选择器，未兼容ie
   * @param {String} name 
   * @param {Boolean} returnMuilt 
   */
  var getDom = function (name, returnMuilt) {
    var selectModel = name.substr(0, 1)
    var selectName = name.substr(1, name.length - 1)
    switch (selectModel) {
      case "#":
        return document.getElementById(selectName)
        break
      case '.':
        return returnMuilt ? document.getElementsByClassName(selectName) : document.getElementsByClassName(selectName)[0]
        break;
      default:
        return returnMuilt ?  document.getElementsByTagName(name) : document.getElementsByTagName(name)[0]
        break
    }
  }
  win.hoye = {
    getQueryString: getQueryString,
    delCookie: delCookie,
    setCookie: setCookie,
    scrollto: scrollto,
    getDom: getDom
  }
})(window, document)
// export default {
//   setCookie: setCookie,
//   getCookie: getCookie,
//   delCookie: delCookie,
//   getQueryString: getQueryString,
//   scrollto: scrollto
// }