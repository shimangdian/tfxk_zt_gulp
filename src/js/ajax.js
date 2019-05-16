
/**
 * auther: hoye liu
 * 2019.5.16
 * 类似jq ajax的极简ajax模块
 */
;(function (global) {
  function ajax (opt) {
    // 请求参数
    var url = opt.url, // 请求地址,必填
        method = opt.method || 'GET', // 请求方法
        data = opt.data || {}, // 参数
        isFormData = !!opt.isFormData,
        returnIsJSON = !!opt.returnIsJSON
        // async = opt.async || true // 是否异步
    
    // method为以下methodsList值时在header中添加Content-type：application/json;charset=UTF-8
    var methodsList = ['POST', 'PUT']
    // 1创建ajax对象
    var ajaxObj = new XMLHttpRequest()
    
    // 2初始化ajax请求的各种参数 有： (method, url, async, user, password)
    ajaxObj.open(method, url)
    if (typeof (opt.header) === 'object') {
      for (var attr in opt.header) {
        ajaxObj.setRequestHeader(attr, opt.header[attr]);
      }  
    }
    if (methodsList.indexOf(method.toUpperCase()) !== -1) {
      if (!isFormData) {
        ajaxObj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        typeof data === 'object' ? data = JSON.stringify(data) : ''
      } else {
        ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (typeof data === 'object') {
          var str = ''
          for (var attr in data) {
            str += `${attr}=${data[attr]}&`
          }
          data = str.substr(0, str.length - 1)
        } else {
          data = ''
        }
      }
    }
    
    // 3发起请求
    // 如果有发送请求之前的方法就先执行，将返回内部数据
    opt.beforSend && opt.beforSend({
      url: url,
      method: method,
      data: data,
      isFormData: isFormData,
      returnIsJSON: returnIsJSON,
      ajax: ajaxObj
    })

    ajaxObj.send(data)

    // 4(创建ajaxObj对象的时候就可以开始监听这个事件了)
    ajaxObj.onreadystatechange = function () {
      if (ajaxObj.readyState === 4) {
        if ((ajaxObj.status >= 200 && ajaxObj.status < 300) || ajaxObj.status == 304) {
          var res = null
          ajaxObj.responseText && (res = !returnIsJSON ? JSON.parse(ajaxObj.responseText) : ajaxObj.responseText)
          opt.success && opt.success(res)
        } else {
          opt.error && opt.error(ajaxObj);
        }
      }
    }
  }
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = ajax()
  } else if (typeof define === 'function ' && (define.cmd || define.amd)) {
    define(ajax)
  } else {
    global.ajax = ajax()
  }
})(typeof window !== 'undefined' ? window : global)

// useage
/*
// Nodejs
let ajax = require('ajax')

// seajs
define(function (require, exports, module) {
  let ajax = require('ajax')
})

// requirejs
define(['ajax'], function (ajax) {
})

// 浏览器
<script src='ajax.js'></script>
ajax({
  url: '',
  success: function () {}
})
// es6
import ajax from 'ajax'
*/