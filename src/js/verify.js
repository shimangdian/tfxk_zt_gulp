export default {
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
