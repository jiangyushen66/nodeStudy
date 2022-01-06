
const { TokenExpiredError } = require('jsonwebtoken')

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError,invalidToken, hasNotAdminPermission } = require('../constant/err.type')
// 判断是否登陆
const auth = async (ctx, next) => {
    // 获取请求头里的token，
    const { authorization = ''} = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    // console.log(token)
    try {
        // user中包含了payload的信息（id，is_admin，password，user_name)
        const user = jwt.verify(token, JWT_SECRET)
        // 将请求头放进ctx.state.user 就可以全局使用了。
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期')
                return ctx.app.emit('error', tokenExpiredError, ctx)
                case 'JsonWebTokenError':
                    console.error('无效的token',err)
                    return ctx.app.emit('error',invalidToken,ctx)
        }
    }
    await next()
}
// 判断是否有管理员的权限
const hadAdminPermission = async (ctx,next) =>{
    const {is_admin} = ctx.state.user
    if(!is_admin){
        console.error('该用户没有管理员权限',ctx.state.user)
        return ctx.app.emit('error',hasNotAdminPermission,ctx.state.user)
    }
    await next()
}
module.exports = {
    auth,
    hadAdminPermission
}