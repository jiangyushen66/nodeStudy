const path = require('path')
const { fileUploadError, unSupportedFileType, invalidGoodsID } = require('../constant/err.type')
const { createGoods, updateGoods, removeGoods, restoreGoods, findGoods } = require('../service/goods.service')
class GoodsController {
    // 商品上传接口
    async upload(ctx, next) {
        // console.log(ctx.request.files)
        const { file } = ctx.request.files
        // console.log(file)
        const fileTypes = ['image/jpeg', 'image/png']

        if (file) {
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.path),
                },
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
    // 商品发布接口  
    async create(ctx) { //控制器里可以不写next()
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: "发布商品成功",
                result: res //发布的哪件商品
            }
        } catch (err) {
            console.error(err)
        }
    }
    // 修改商品接口
    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)  // 参考koa-body的ctx.params
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '',
                }
            } else {
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }
    // 软删除商品接口，上架接口
    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: ''
            }
        } else { //如果下架的商品不存在
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }

    }
    // 上架接口
    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }
    // // 获取商品列表
    async findAll(ctx) {
        // 1、解析pageNum和pageSize
        const { pageSize = 1, pageNum = 10 } = ctx.request.query
        // 2、调用数据处理的相关方法
        const res = await findGoods(pageNum,pageSize )

        // 3、返回结果
        ctx.body={
            code: 0,
            message: '获取数据成功',
            result:res,
        }

    }

}

module.exports = new GoodsController()