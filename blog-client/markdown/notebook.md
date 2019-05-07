# **笔记**
>1.使用iView自定义主题运行项目时报错 Inline JavaScript is not enabled. Is it set in your options
```
在Vue-Cli3.0中需要这样写vue.config.js 
module.exports = {
  // 向 CSS 相关的 loader 传递选项
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
```

>2.路由懒加载
```
component: () => import('../views/About.vue')
```

>3.打包之后项目部署，以GitHub Pages为例（GitHub Pages只支持https协议，http协议接口无法正常运行）
```
在Vue-Cli3.0中需要这样写vue.config.js 
publicPath: process.env.NODE_ENV === 'production'?'/my-project/':'/'
```

>4.打包之后部署好项目，初始化没问题，但是刷新之后浏览器报404错误
```
vue-router默认hash模式（刷新不会有问题），但是项目在初始化路由的时候配置了history模式，history模式需要后台配置支持才可以
```