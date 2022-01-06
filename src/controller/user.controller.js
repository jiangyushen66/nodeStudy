//控制器
const jwt = require('jsonwebtoken')
const { createUser, getUserInfo,updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const {JWT_SECRET} = require('../config/config.default')
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
        const { user_name } = ctx.request.body
    //   1.获取用户信息（在token的payload中，记录id，user_name,is_admin）
        try{
           const res = await getUserInfo({user_name})
        //    从返回结果对象中剔除password字段，将剩下的放在resUser里面来，这里的res对象有id, user_name, password, is_admin
           const{password, ...resUser} = res
           ctx.body = {
               code:0,
               message:'用户登录成功',
               result:{
                   token: jwt.sign(res,JWT_SECRET,{expiresIn : '1d'}) //过期时间为11秒
               }
           }
        }catch(err){
            console.error('用户登录失败',err)
        }

    }
    // 修改密码接口
    async changePassword(ctx,next){
        // 1.获取数据
        const id = ctx.state.user.id  
        const password = ctx.request.body.password 
        // console.log(id,password)
        // 2.操作数据库
       const flag =  await updateById({id,password})//代表修改密码成功与否
       if(flag){
        ctx.body ={
            code:0,
            message: '修改密码成功',
            result:''
        }
       }else {
           ctx.body = {
               code:'1007',
               message:'修改密码失败',
               result:''
           }
       }
        // 3.返回结果
    }
}

// 导出一个实例化的对象

module.exports = new userController()