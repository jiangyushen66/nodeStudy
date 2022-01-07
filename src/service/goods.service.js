const Goods = require('../model/goods.model')
class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        console.log(res)
        return res.dataValues
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } }) //sequelize 的查询
        return res[0] > 0? true:false //如果res[0]大于零，就更新成功，如果res[0]小于0，则更新失败。
    }
}

module.exports = new GoodsService()