const Router = require('koa-router')

const { upload, create, update, remove, restore,findAll } = require('../controller/goods.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const router = new Router({ prefix: '/goods' })
// 上传商品接口
//先判断是否登陆，然后判断是否有管理员的权限。
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hadAdminPermission, validator, create)
// 修改商品接口
router.put('/:id', auth, hadAdminPermission, validator, update)
// 硬删除接口
// router.delete('/:id',auth,hadAdminPermission,delete) //delete是个关键字，这里一般用remove
// router.delete('/:id', auth, hadAdminPermission, remove)
// 软删除接口，下架接口
router.post('/:id/off',auth,hadAdminPermission,remove)
// 上架接口
router.post('/:id/on',auth, hadAdminPermission,restore)
// 获取商品列表
router.get('/',findAll)
module.exports = router