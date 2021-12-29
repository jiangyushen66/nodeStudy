// 入口文件

const {APP_PORT} = require('./config/config.default')
const app = require('./app')

console.log(APP_PORT)
app.listen(APP_PORT,()=>{
    console.log(`the server is running on http://localhost:${APP_PORT}`)
})