const {
    createOrUpdate,
    findCarts,
    updateCarts,
    removeCarts,
    selectAllCarts,
    unselectAllCarts
} = require('../service/cart.service')

const { cartFormatError } = require('../constant/err.type')
class CartController {
    // 将商品添加到购物车
    async add(ctx) {
        // 1解析user_id,goods_id
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id
        console.log(user_id, goods_id)
        // 2操作数据库
        const res = await createOrUpdate(user_id, goods_id)
        // 3返回结果
        ctx.body = {
            code: 0,
            message: '加入购物车成功',
            result: res
        }

    }
    async findAll(ctx) {
        // 1解析请求参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.query

        // 2操作数据库
        const res = await findCarts(pageNum, pageSize)
        // 3返回结果
        // const {createdAt,updatedAt,deletedAt,r}
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            res: res
        }
    }
    async update(ctx) {
        // 1解析参数
        const { id } = ctx.request.params
        const { number, selected } = ctx.request.body
        if (number === undefined && selected === undefined) {
            cartFormatError.message = "number和selected不能同时为空"
            return ctx.app.emit("error", cartFormatError, ctx)
        }
        // 2操作数据库
        const res = await updateCarts({ id, number, selected })
        //3返回数据
        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }
    }
    async remove(ctx) {
        // 1解析数据，
        // 2操作数据库
        // 3返回结果
        const { ids } = ctx.request.body
        const res = await removeCarts(ids)
        ctx.body = {
            code: 0,
            message: '删除购物车成功',
            result: res
        }

    }
    async selectAll(ctx) { 
        const user_id = ctx.state.user.id
        const res = await selectAllCarts(user_id)
        ctx.body = {
            code: 0,
            message: '全选购物车成功',
            result: res
        }
    }
    async unselectAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await unselectAllCarts(user_id)
        ctx.body = {
            code: 0,
            message: '购物车全不选成功',
            result: res
        }
    }
}
module.exports = new CartController()