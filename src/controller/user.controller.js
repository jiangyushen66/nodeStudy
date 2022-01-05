//控制器

const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
class userController {
    async register(ctx, next) {
        // 1,获取数据
        const { user_name, password } = ctx.request.body
        console.log(ctx.body)
        // 2，操作数据
        try {
            const res = await createUser(user_name, password)
            console.log(res)
            //3. 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error',userRegisterError,ctx)
        }

    }
    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

// 导出一个实例化的对象

module.exports = new userController()