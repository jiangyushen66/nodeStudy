// node核心模块放第一部分
const path = require('path')
// 第三方的放第二部分

const Koa = require('koa')
const koaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
// 自己自定义的模块，放第三部分。
const errHandler = require('./errHandle')
const app = new Koa()


const router = require('../router')
// 注册中间件，
// 要上传文件，因此要改一下中间件的配置，用来支持上传文件，官方文档看multipart，formidable关键字
// console.log(process.cwd()) //打印process.cwd()
app.use(koaBody({
    multipart: true,
    formidable: {
        // 在配置选项option里，不推荐使用相对路径,报错
        // 在option里的相对路径，不是相对当前文件，而是相对process.cwd()
        // 可用控制台打印得到的相对路径是G:\hh\workspace\nodeStudy
        // uploadDir:'../upload',  //可以用uploadDir:'./src/upload',但是不好
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true, //是否保留原始文件的扩展        
    },
    //koa-body严格模式下只能发送'POST','PUT','PATCH'，这三个请求，要发送delete请求只能开启设置。
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))
// 加载文件，必须用koa-static
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))
// 在路由之前加载第三方的模块
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)
module.exports = app