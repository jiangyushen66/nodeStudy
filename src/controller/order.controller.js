
const { createOrder, findAllOrder,updateOrder } = require('../service/order.service')
class OrderController {
    async create(ctx) {
        // 准备数据
        const user_id = ctx.state.user.id
        const { address_id, goods_info, total } = ctx.request.body


        const order_number = 'XZD' + Date.now() //加时间戳,按char来算的话时间戳是13位，XZD是3位。总共16位
        // 操作数据库
        const res = await createOrder({
            user_id,
            address_id,
            goods_info,
            total,
            order_number
        })
        // 返回结果
        ctx.body = {
            code: 0,
            message: "生成订单成功",
            result: res
        }

    }
    async findAll(ctx) {
        const { pageNumber = 1, pageSize = 10, status = 0 } = ctx.request.query

        const res = await findAllOrder(pageNumber, pageSize, status)

        ctx.body = {
            code: 0,
            message: '获取定单列表成功',
            result: res
        }
    }
    async update(ctx) {
        const id = ctx.request.params.id
        const { status } = ctx.request.body

        const res = await updateOrder(id,status)

        ctx.body = {
            code:0,
            message:'更新订单状态成功',
            result:res
        }
    }

}

module.exports = new OrderController()