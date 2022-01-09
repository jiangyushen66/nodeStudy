// 1.导入koa-router类
// 2实例化路由对象
// 3编写路由规则
// 4导出router对象

const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })
const {
     add,
     findAll,
      update,
       remove, 
       selectAll,
       unselectAll
    } = require('../controller/cart.controller')
// 3.1添加到购物车接口：登录，格式

router.post('/', auth, validator({ goods_id: 'number' }), add)
// 3.2获取购物车列表
router.get('/', auth, findAll)
// 3.3更新购物车
// router.patch('/:id', auth, validator({
//     number: { type: 'number', required: false },
//     selected: { type: 'bool', required: false },
// }), ctx => ctx.body = ctx.request.params.id
// )
router.patch('/:id', auth, validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
}), update
)
// 3.4删除购物车
router.delete('/', auth,
    validator({ ids: 'array' }),// validator({ ids: 'array' })等价于validator({ ids: {type:'array',required:true} })
    remove)
// 3.5全选
router.post('/selectAll', auth, selectAll)
// 3.6全不选
router.post('/unselectAll',auth,unselectAll)


module.exports = router