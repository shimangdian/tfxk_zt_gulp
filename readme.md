### 包含功能：
1. 模板渲染，使用vue
2. 网络请求使用本项目自带请求方法
```javascript
    ajax({
        url: String,
        method: 'POST|GET|PUT', // 默认GET
        data: Object,
        success: Function, // 接口请求成功   请求回的code为200
        beforSend: Function, // 请求发送之前执行的函数
        isFormData: Boolean,
        returnIsJSON: Boolean, // true: 返回的不是json对象，不使用JSON模块转换
    })
```
3. 多功能常用工具库：
```javascript
    hoye: {
        getQueryString: getQueryString, // 获取url携带的参数
        delCookie: delCookie, // 删除 cookie
        setCookie: setCookie, // 设置 cookie
        scrollto: scrollto, // 页面滚动
        getDom: getDom // 获取dom  类似jq的 $('') 元素选择器，返回的是dom元素
    }
```
4. 自带极简弹框插件smoke.js
```javascript
    <link href='./css/smoke.css'></link>
    <script src='./lib/smoke.js'></script>
    <script>
        smoke.alert('') // 弹出框
        smoke.confirm('', function () {}) // 确认框
    </script>
```

5. MD5加密模块
```javascript

```
6. 验证模块
```javascript
    
```