import ajax from './ajax'
import util from './util'
// const baseUrl = 'http://192.168.3.120:88/api/v1'
const baseUrl = 'http://132.232.229.72/wechat/api/v1'
// const baseUrl = 'https://m.in985.com/api/v1'
// const baseUrl = location.protocol + '//' + location.host + '/api/v1'
// const baseUrl = 'https://in985.com/api/v1'
// const baseUrl = 'https://pre.in985.com/api/v1'

class BaseApi {
  constructor() {
    this.baseUrl = baseUrl
  }
  commonParam(resolve, reject, url) {
    return {
      url: url,
      header: {
        'content-type': 'application/json',
        'authorization': util.getCookie('token')
      },
      success(res) {
        if (res.code !== 0) {
          //  提示用户错误信息
          // wx.showModal({
          //   title: '提示',
          //   showCancel: false,
          //   content: res.data.message
          // })
        }
        resolve(res)
      },
      fail(err) {
        // wx.showModal({
        //   title: '提示',
        //   showCancel: false,
        //   content: '网络错误，请稍后再试！'
        // })
        reject(err)
      }
    }
  }
  http_Get(url) {
    return new Promise((resolve, reject) => {
      ajax(Object.assign({}, this.commonParam(resolve, reject, url), {
        method: 'GET'
      }))
    })
  }
  http_Post(body, url) {
    return new Promise((resolve, reject) => {
      ajax(Object.assign({}, this.commonParam(resolve, reject, url), {
        method: 'POST',
        data: body
      }))
    })
  }
  http_Put(body, url) {
    return new Promise((resolve, reject) => {
      ajax(Object.assign({}, this.commonParam(resolve, reject, url), {
        method: 'PUT',
        data: body
      }))
    })
  }
}
class smallroadApi extends BaseApi {
  constructor(typeUrl) {
    super()
    this.baseUrl = this.baseUrl + typeUrl
  }
  getQP (body) {
    return this.http_Put(body, this.baseUrl + '/qp')
  }
  diagnose() { // 获取可以查询的一诊二诊成绩
    return this.http_Get(this.baseUrl + '/diagnose')
  }
  send (data) { // 发短信
    return this.http_Post(null, `${this.baseUrl}/send/${data.loginName}/${data.smsToken}`)
  }
  login(body) { // 通过短信验证码登录
    return this.http_Post(body, `${this.baseUrl}/login/sms`)
  }
  reserve () { // 预约
    return this.http_Post(null, `${this.baseUrl}/reserve`)
  }
}
function init () {
  window.lapi = {
    market: new smallroadApi ('/market'),
    sms: new smallroadApi('/sms')
  }
}
export default {
  market: new smallroadApi ('/market'),
  sms: new smallroadApi('/sms'),
  init: init
}