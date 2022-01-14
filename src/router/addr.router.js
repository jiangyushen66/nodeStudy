// 1 导入路由类
// 2 new 一个router对象
// 3 编写路由规则
// 4 导出路由对象
const Router = require('koa-router')

const router = new Router({ prefix: '/address' })
const { validator } = require('../middleware/addr.middleware')

const { create, 
    findAll,
     update,
     remove,
     setDefault,
     } = require('../controller/addr.controller')

const {
    auth
} = require('../middleware/auth.middleware')
//3.1 添加地址
router.post('/', auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/, required: true },
    address: 'string'
}), create)
// 3.2获取地址列表
router.get('/', auth, findAll)
// 3.3更新地址
router.put('/:id',
 auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/, required: true },
    address: 'string'
}), update)
// 3.4删除地址
router.delete('/:id',auth,remove)
// 设置默认地址
router.patch('/:id',auth,setDefault)
module.exports = router