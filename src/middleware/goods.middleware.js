const { goodsFormateError } = require("../constant/err.type")

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
            goods_img: { type: 'string', required: true }
        })
    } catch (err) {
        console.error(err)
        // return ctx.app.emit('error', err, ctx) 向postman发送错误
        goodsFormateError.result = err
        return ctx.app.emit('error', goodsFormateError, ctx)
    }
    await next()
}

module.exports = {
    validator,
}