// 注意：闭包前加上分号是为了给前一个模块填坑，分号多了没问题，少了则语句可能发生变化。
;(function (global) {
  function verify () {
    return {
      tel: (val) => { // 电话号码
        return /^[1][0-9]{10}$/.test(val)
      },
      yzm: (val) => { // 验证码
        return /^[0-9]{6}$/.test(val)
      },
      neccGrade: (val) => { // 高考分数
        var reg = /^(750(\.[0]+)?|7[0-4][0-9](\.\d+)?|[1-6][0-9][0-9](\.\d+)?|[1-9][0-9](\.\d+)?|[0-9](\.\d+)?)$/
        var r = reg.test(val)
        return r
      },
      length6up: (val) => { // 长度是否大于6
        return val.length >= 6
      }
    }  
  }
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = verify()
  } else if (typeof define === 'function ' && (define.cmd || define.amd)) {
    define(verify)
  } else {
    global.verify = verify()
  }
})(typeof window !== 'undefined' ? window : global)

// useage
/*
// Nodejs
let verify = require('verify')

// seajs
define(function (require, exports, module) {
  let verify = require('verify')
})

// requirejs
define(['verify'], function (verify) {
})

// 浏览器
<script src='verify.js'></script>

// es6
import verify from 'verify'
*/