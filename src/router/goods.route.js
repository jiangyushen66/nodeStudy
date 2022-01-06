const Router = require('koa-router')

const { upload } = require('../controller/goods.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/goods' })
//先判断是否登陆，然后判断是否有管理员的权限。
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload',upload)
module.exports = router