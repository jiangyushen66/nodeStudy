const { getUserInfo } = require('../service/user.service')
const { userFormateError, 
    userAlreadyExisted, 
    userRegisterError, 
    userDoesNotExist, 
    invalidPassword,
    userLoginError } = require('../constant/err.type')
const bcrypt = require('bcryptjs')
// 验证注册的时候用户输入是否合法，密码和用户名都要输入
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 提交数据的合法性
    if (!user_name || !password) {
        console.error('用户或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}
// 验证注册的时候用户输入的账号密码是否和数据里重复了
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    // 提交数据的合理性
    // if (await getUserInfo({ user_name })) {
    //   ctx.app.emit('error',userAlreadyExisted,ctx)
    //     return
    // }
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}
// 注册的时候，给账户的密码加盐
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt) //加盐后的密码
    ctx.request.body.password = hash
    await next()
}
// 验证登录，首先验证输入是否合法，第二验证用户是否存在，第三验证密码是否匹配
const verifyLogin = async (ctx, next) => {
    //1判断用户是否存在（不存在，报错）
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        //2 密码是否匹配（不匹配，报错）
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}


module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}