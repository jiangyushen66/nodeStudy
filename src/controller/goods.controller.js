const path = require('path')
const { fileUploadError, unSupportedFileType, invalidGoodsID} = require('../constant/err.type')
const { createGoods ,updateGoods } = require('../service/goods.service')
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
    async update(ctx){
        try{
          const res =  await updateGoods(ctx.params.id,ctx.request.body)  // 参考koa-body的ctx.params
          if(res){
              ctx.body = {
                  code:0,
                  message:'修改商品成功',
                  result:'',
              }
          }else{
              return ctx.app.emit('error',invalidGoodsID,ctx)
          }
        }catch(err){
            console.error(err)
        }
    }
}

module.exports = new GoodsController()