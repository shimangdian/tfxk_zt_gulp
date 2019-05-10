function ajax (opt) {
  // 请求参数
  var url = opt.url, // 请求地址
      method = opt.method || 'GET', // 请求方法
      data = opt.data || {} // 参数
      // async = opt.async || true // 是否异步
  
  // method为以下methodsList值时在header中添加Content-type：application/json;charset=UTF-8
  var methodsList = ['POST', 'PUT']
  // 1创建ajax对象
  var ajax = new XMLHttpRequest()
  
  // 2初始化ajax请求的各种参数 有： (method, url, async, user, password)
  ajax.open(method, url)
  if (typeof (opt.header) === 'object') {
    for (let attr in opt.header) {
      ajax.setRequestHeader(attr, opt.header[attr]);
    }  
  }
  if (methodsList.indexOf(method.toUpperCase()) !== -1) {
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }
  
  // 3发起请求
  typeof data === 'object' ? data = JSON.stringify(data) : ''
  ajax.send(data)
  
  // 4(创建ajax对象的时候就可以开始监听这个事件了)
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
        let res = null
        ajax.responseText && (res = JSON.parse(ajax.responseText))
        opt.success && opt.success(res)
      } else {
        opt.error && opt.error(ajax);
      }
    }
  }
}
export default ajax