const Koa = require('koa')

const app = new Koa()
// 创建一个中间件
app.use((ctx,next) =>{
    ctx.body = 'hello koa'
})

app.listen(3000,()=>{
    console.log('the server is running on http://localhost:3000')
})