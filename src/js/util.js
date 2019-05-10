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

export default {
  setCookie: setCookie,
  getCookie: getCookie,
  delCookie: delCookie,
  getQueryString: getQueryString
}
// function getQueryString (name) {
//   // console.log(window.location.search)
//   let query = window.location.search.substr(1)
//   console.log(query)
//   let qa = query.split('=')
//   console.log(qa)
//   qa.forEach(item => {
    
//   });
//   return query
// }