const Router = require('koa-router')

const { upload } = require('../controller/goods.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const {validator} = require('../middleware/goods.middleware')
const router = new Router({ prefix: '/goods' })
// 上传商品接口
//先判断是否登陆，然后判断是否有管理员的权限。
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hadAdminPermission, validator,(ctx,next) =>{
    ctx.body="发布商品成功"
})
module.exports = router