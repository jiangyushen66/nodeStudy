const User = require('../model/use.model')
class UserService {
    async createUser(user_name, password) {
        // 插入数据
        // await表达式: promise对象的值
        const res = await User.create({ user_name, password })
        // console.log(res)

        return res.dataValues
    }
    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
    // 操作数据库根据id改密码，这里传入的参数是个对象，因为大多数可以改user_name
    async updateById({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}
        user_name && Object.assign(newUser, { user_name }) //如果user_name不为空则执行&&后面这一段复制对象，否则不复制
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })
        // console.log(newUser)
        const res = await User.update(newUser, { where: whereOpt })
        // console.log(res)
        return res[0] > 0 ? true: false
        
    }


}

module.exports = new UserService()