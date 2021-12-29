// 业务逻辑，根组件
const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const userRouter = require('../router/user.route')
// 注册中间件，必须是个函数，而routes()是个函数
app.use(koaBody())
app.use(userRouter.routes())

module.exports = app