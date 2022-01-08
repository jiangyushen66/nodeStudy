const Goods = require('../model/goods.model')
class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        console.log(res)
        return res.dataValues
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } }) //sequelize 的查询
        return res[0] > 0 ? true : false //如果res[0]大于零，就更新成功，如果res[0]小于0，则更新失败。
    }

    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
    async findGoods(pageNum, pageSize) {
        // //1. 获取总数， findAll函数看不到软删除的数据
        // const count = await Goods.count()
        // console.log(count)
        // //2. 获取分布的具体数据
        // const offset = (pageNum - 1) * pageSize
        // const rows = await Goods.findAll({ offset: offset, limit: pageSize * 1 }) //pageSize*1隐式将字符型转换为number
        const offset = (pageNum - 1) * pageSize
        const {count, rows} = await Goods.findAndCountAll({ offset: offset, limit: pageSize * 1 })
        return{
            pageNum,
            pageSize,
            total:count,
            list:rows
        }
    }
}

module.exports = new GoodsService()