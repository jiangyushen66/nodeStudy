
// 导入数据库连接
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 定义数据库
const Order = seq.define('zd_orders', {
    // id: {                                    //错误，sequelize可以自动生成id
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
        
    //     comment: '订单id'
    // },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id'
    },
    goods_info: {
        type: DataTypes.TEXT, //用长文本的格式，不能用string感觉才varchar(255),商品的订单信息比较长
        allowNull: false,
        comment: 'json字符串（该订单的商品信息）'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '订单总金额'
    },
    order_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        comment: '订单号，订单唯一标识符'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:0,
        comment: '订单状态，0:未支付，1:已支付，2:已发货，3:已签收，4:取消'
    }
})
// 生成表格
// Order.sync({ force: true })
// 导出模块

module.exports = Order