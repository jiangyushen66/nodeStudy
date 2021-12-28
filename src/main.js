const Koa = require('koa')

const {APP_PORT} = require('./config/config.default')

const app = new Koa()
// 创建一个中间件
app.use((ctx,next) =>{
    ctx.body = 'hello Vue.js'
})

console.log(APP_PORT)
app.listen(APP_PORT,()=>{
    console.log(`the server is running on http://localhost:${APP_PORT}`)
})