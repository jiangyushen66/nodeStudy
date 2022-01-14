// 1，导入sequelize的连接
// 2，定义Cart模型
// 3，同步shuju(建表)
// 4，导出Cart模型

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const Goods = require('../model/goods.model')

const Cart = seq.define('zd_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品的ID'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户的id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品的数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }
})

// Cart.sync({ force: true })

Cart.belongsTo(Goods,{
    foreignKey:'goods_id',
    as:'goods_info'
})
module.exports = Cart