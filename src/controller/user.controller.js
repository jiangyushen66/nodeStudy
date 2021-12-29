//控制器

const {createUser} = require('../service/user.service')
class userController{
    async register(ctx, next){
        // 1,获取数据
        console.log(ctx.request.body)
        const{user_name,password} = ctx.request.body
        // 2，操作数据
        const res = await createUser(user_name,password)
        //3. 返回结果
        ctx.body = ctx.request.body
    }
    async login(ctx,next){
        ctx.body = '用户登录成功'
    }
}

// 导出一个实例化的对象

module.exports = new userController()