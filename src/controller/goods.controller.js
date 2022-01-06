const path = require('path')
const { fileUploadError, unSupportedFileType } = require('../constant/err.type')

class GoodsController {
    // async upload(ctx, next) {
    //     // ctx.request.files拿到的是一个数组。koa-body官方文档
    //     const { file } = ctx.request.files
    //     if (file) {
    //         ctx.body = {
    //             code: 0,
    //             message: '商品图片上传成功',
    //             result: {
    //                 goods_img: path.basename(file.path)
    //             }
    //         }
    //     } else {
    //         return ctx.app.emit('error', fileUploadError, ctx)
    //     }
    //     console.log(ctx.request.files.file)
    //     ctx.body = '商品图片上传成功'
    // }

    async upload(ctx, next) {
        // console.log(ctx.request.files)
        const { file } = ctx.request.files
        // console.log(file)
        const fileTypes = ['image/jpeg','image/png']
       
        if (file) {
            if(!fileTypes.includes(file.type)){
                return ctx.app.emit('error',unSupportedFileType,ctx)
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
}

module.exports = new GoodsController()