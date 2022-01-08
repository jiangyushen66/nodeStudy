// 1.导入koa-router类
// 2实例化路由对象
// 3编写路由规则
// 4导出router对象

const Router = require('koa-router')
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })
const {add} = require('../controller/cart.controller')

router.post('/',auth,validator, add)

module.exports = router