const { Sequelize } = require('sequelize')

const {MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER ,
    MYSQL_PWD,
    MYSQL_DB} = require('../config/config.default')
    
const sequelize = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql'
})

// 测试

    // sequelize.authenticate().then(() =>{
    //     console.log('数据连接成功')
    // }).catch(err => {
    //     console.log('数据连接失败',err)
    // })

module.exports = sequelize