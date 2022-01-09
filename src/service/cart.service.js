const Cart = require('../model/cart.model')
const { Op } = require('sequelize')
const Goods = require('../model/goods.model')

class Cartservice {
    async createOrUpdate(user_id, goods_id) {

        // 根据user_id 和goods_id同时查找，有没有记录
        let res = await Cart.findOne({
            where: {
                [Op.and]: { //从sequelize里导入
                    user_id,
                    goods_id
                }
            }
        })
        if (res) {
            // 已经存在一条记录,将number+1
            // bug，购物车里的数量不能超过goods表里的库存。
            res.increment('number')
            return await res.reload()
        } else {
            return Cart.create({
                user_id,
                goods_id
            })
        }
    }

    // 联表查询
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    async updateCarts(params) {
        const { id, number, selected } = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        selected !== undefined ? (res.selected = selected) : ''
        return await res.save()
    }
    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })

    }
    async selectAllCarts(user_id) {
        return await Cart.update(
            { selected: true },
            {
                where:
                {
                    user_id,
                }
            }
        )
    }
    async unselectAllCarts(user_id) {
        return await Cart.update(
            { selected: false },
            {
                where:
                {
                    user_id,
                }
            }
        )
    }
}

module.exports = new Cartservice()