const Router = require('koa-router')
const {userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
} = require('../middleware/user.middleware')

const {auth} = require('../middleware/auth.middleware')
const router = new Router({ prefix: '/users' })
const { register ,login, changePassword} = require('../controller/user.controller')
// 注册接口
router.post('/register', userValidator,verifyUser,cryptPassword,register)
// 登录接口
router.post('/login',userValidator,verifyLogin,login)
// 修改的密码接口，匹配的是patch
router.patch('/', auth,cryptPassword,changePassword)
module.exports = router
