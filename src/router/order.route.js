const Router = require('koa-router')

const router = new Router({ prefix: '/orders' })

const { auth } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/order.middleware')

const { create,findAll ,update} = require('../controller/order.controller') 
// 3.1新增订单
router.post(
    '/',
    auth,
    validator({
        address_id: 'int',
        goods_info: 'string',
        total: 'string'
    }),
    create
)
// 3.2分页查询订单列表
router.get('/',auth,findAll)
//3.3 更新订单状态
router.patch(
    '/:id',
    auth,
    validator({
        status:'number',
    }),
    update)

module.exports = router

