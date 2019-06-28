#tfxk_zt_cli
  专题专用gulp模板，拥有以下特性。
  + 压缩图片
  + 开发热更新
  + 开发时代理接口地址

  + less
  + 自动增加css兼容前缀
  + 压缩css（默认未开启）

  + html 使用 vue.js 做专门的模板渲染
  + 压缩html（默认未开启）

  + 压缩丑化js
  + js 文件 es6转es5
  + 如果不想js被转换和压缩，可以将 js 放进 lib 文件夹

### 拥有包：
1. vue, better-scroll, jquery, rem(100px 版本和 25px 版本)

2. 验证模块
```javascript
    <script src='./js/verify.js'></script>
    // or
    import verify from './js/verify.js'
    // or
    var verify = require('./js/verify.js')

    verify.tel('15982417873') //return true
    verify.tel('1598241787') //return false
    // 等等...
```
