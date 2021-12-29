//控制器
class userController{
    async register(ctx, next){
        ctx.body ='用户注册成功'
    }
    async login(ctx,next){
        ctx.body = '用户登录成功'
    }
}

// 导出一个实例化的对象

module.exports = new userController()