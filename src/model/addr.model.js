// 1,导入sequelize
// 2，定义字段（模型）
// 3，同步，sync
// 4，导出模型对象

const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
// 2,定义字段
const Address = seq.define('zd_addresses', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人姓名'
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '收货人电话'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人地址'
    },
    is_default:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
        comment:'是否为默认收货收货地址，0:不是(默认值），1:是默认值'
    }
})
// Address.sync({ force: true })


module.exports = Address

