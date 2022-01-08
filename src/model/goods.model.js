const { DataTypes } = require('sequelize')
const seq = require('../db/seq') //数据库连接

const Goods = seq.define('zd_goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片的url'
    },
    
},
{
   paranoid:true, //多这个设置，表就多一个字段，deletedAt，参考sequelize官方文档。
})

// Goods.sync({ force: true })

module.exports = Goods