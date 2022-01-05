module.exports = (err,ctx) =>{
    let status =500
    switch (err.code){
        case '10001':
            status = 400  //状态码400，bad request ，用户名或密码为空
            break
        case '10002':
            status =409  //冲突，数据库中已经存在某条记录，跟新提交的这一条一样
            break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err
}