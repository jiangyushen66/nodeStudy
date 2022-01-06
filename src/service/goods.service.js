const Goods = require('../model/goods.model')
class GoodsService {
    async createGoods(goods){
        const res = await Goods.create(goods)
        console.log(res)
        return res.dataValues
    }
}

module.exports = new GoodsService()