// 业务逻辑，根组件
const Koa = require('koa')
const koaBody = require('koa-body')
const errHandler = require('./errHandle')
const app = new Koa()


const router = require('../router')
// 注册中间件，必须是个函数，而routes()是个函数
app.use(koaBody())
// app.use(router.routes())
// app.use(router.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// 统一的错误处理
app.on('error',errHandler)
module.exports = app