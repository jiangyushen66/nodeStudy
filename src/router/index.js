// 路由文件实现一个自动的加载
const fs = require('fs')
const Router = require('koa-router')

const router = new Router()
// 拿到了router文件夹下所有文件的名字
fs.readdirSync(__dirname).forEach(file => 
    // console.log(file)
    {
        if(file !== 'index.js'){
          let r =  require('./' + file)
          router.use(r.routes())
        }
    })

module.exports =   router