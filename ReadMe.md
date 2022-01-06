# 1项目初始化



##  1 npm 初始化

`npm  init -y`



##  2 git 初始化

`git  init`

 ###3 添加到暂存区

git add .

 ###4 提交版本

git commit

## 3创建ReadMe.md文件

# 2基本的项目搭建

## 1、安装

`npm install  --s koa`

## 2、写一个基本项目

## 3、测试

`node src/main.js`

# 3项目的基本优化

## 1自动重启服务，安装nodemon

`npm install nodemon`

编写package.json脚本

 `"scripts": {`

  `"dev":"nodemon ./src/main.js",`

  `"test": "echo \"Error: no test specified\" && exit 1"`

 `},`





## 2、读取配置文件

安装dotenv，读取目录中的.env文件，将配置写进process.envz中

`npm  i dotenv`

创建文件.env

APP_PORT = 8080

创建src/config/config.default.js，导出配置的端口号

`const dotenv = require('dotenv')`

`dotenv.config()`

module.exports = process.env

在引入的地方导入变量

`const {APP_PORT} = require('./config/config.default')`

引用的地方直接引用即可

app.listen(APP_PORT)

# 4添加路由

路由：根据不同的url，调用对应的处理函数

## 1安装koa-router

npm i koa-router

ps:这些包的参考文档要么看npm要么看github，搜搜就可以看到

步骤：

1、导入包

2、实例化对象

3、编写路由

4、注册中间件

## 2编写路由

创建src/router目录，编写user.route.js并导出路由对象

## 3在main.js使用路由的地方，引入进来，并且创建响应的中间件对象即可

# 5目录结构优化

## 1将http服务和app业务拆分。

### 创建src/app/index.js

// 业务逻辑，根组件

const Koa = require('koa')

const app = new Koa()

const userRouter = require('../router/user.route')

// 注册中间件，必须是个函数，而routes()是个函数

app.use(userRouter.routes())



module.exports = app



### 改写main.js

`const {APP_PORT} = require('./config/config.default')`

`const app = require('./app')`



`console.log(APP_PORT)`

`app.listen(APP_PORT,()=>{`

  `console.log(the server is running on http://localhost:${APP_PORT})`

`})`

## 2将路由和控制器拆分

路由：解析URL，分布给控制器相对应的方法

控制器：处理不同的业务

改写`user.route.js`

`const Router = require('koa-router')`



`const router = new Router({ prefix: '/users' })`

`const { register ,login} = require('../controller/user.controller')`

`// 注册接口`

`router.post('/register',register)`

`// 登录接口`

`router.post('/login',login)`

`module.exports = router`

# 6解析body

## 1安装koa-body

npm i koa-body

## 2注册中间件

![1640773840146](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1640773840146.png)

## 3解析请求数据

在src/controller.js文件下

`//控制器`



`const {createUser} = require('../service/user.service')`

`class userController{`

  `async register(ctx, next){`

​    `// 1,获取数据`

​    `console.log(ctx.request.body)`

​    `const{user_name,password} = ctx.request.body`

​    `// 2，操作数据`

​    `const res = await createUser(user_name,password)`

​    `//3. 返回结果`

​    `ctx.body = ctx.request.body`

  `}`

  `async login(ctx,next){`

​    `ctx.body = '用户登录成功'`

  `}`

`}`



`// 导出一个实例化的对象`



`module.exports = new userController()`

## 4拆分service层

新建`src/service/user.service.js`



`class UserService{

  async createUser(username,password){

​    // todo:写入数据

​    return '写入数据成功'

  }

}



module.exports = new UserService()



# 7集成sequelize

sequelize ORM 数据库工具

ORM：关系对象映射（object，relation，method）

- 数据表对应一个类
- 数据表中记录对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法



## 1安装Sequelize和mysql2

`npm i mysql2 sequelize`

## 2连接数据库

`const { Sequelize } = require('sequelize')`



`const {MYSQL_HOST,`

  `MYSQL_PORT,`

  `MYSQL_USER ,`

  `MYSQL_PWD,`

  `MYSQL_DB} = require('../config/config.default')`

``  

`const sequelize = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{`

  `host:MYSQL_HOST,`

  `dialect:'mysql'`

`})`



`// 测试`



`sequelize.authenticate().then(() =>{`

  `console.log('数据连接成功')`

`}).catch(err => {`

  `console.log('数据连接失败',err)`

`})`



`module.exports = sequelize`

## 3编写配置文件

在.env文件里写入

APP_PORT = 8000

MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = 123456
MYSQL_DB = zdsc



# 8创建User模型

## 1、拆分Model层

squelize主要通过Model对应数据表

创建src/model/user.model.js

`const { DataTypes } = require('sequelize')`



`const seq = require('../db/seq')`



`// 创建模型(Model zd_user -> 表 zd_users)`



`const User = seq.define('zd_user', {`

 `// id 会被sequelize自动创建, 管理`

 `user_name: {`

  `type: DataTypes.STRING,`

  `allowNull: false,`

  `unique: true,`

  `comment: '用户名, 唯一',`

 `},`

 `password: {`

  `type: DataTypes.CHAR(64),`

  `allowNull: false,`

  `comment: '密码',`

 `},`

 `is_admin: {`

  `type: DataTypes.BOOLEAN,`

  `allowNull: false,`

  `defaultValue: 0,`

  `comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',`

 `},`

`})`



`// 强制同步数据库(创建数据表)`

``                                   

`// User.sync({ force: true })`



`module.exports = User`

# 9添加用户入库

所有的数据库的操作都在Service层完成，service调用model完成数据库操作

改写src/service/user.service.js

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // User.create({
    //   // 表的字段
    //   user_name: user_name,
    //   password: password
    // })

    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }
}

module.exports = new UserService()
```

同时改写user.controller.js

```js
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

# 10错误处理

在控制器中，对不同的错误进行处理，返回不同的错误提示，提高代码质量

```js
const { createUser, getUerInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    // 合法性
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      }
      return
    }
    // 合理性
    if (getUerInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      }
      return
    }
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

在service层封装函数

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }

  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
```

# 11拆分中间件

![](C:\Users\Administrator\Desktop\1.png)

## 1拆分中间件

添加src/middleware/user.middleware.js

```js
const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  if (getUerInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}
```

## 2统一错误处理

在出错的地方用 ctx.app.emit提交错误

![1641360243593](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641360243593.png)

在app文件夹下的index.js文件通过app.on监听

![1641360315148](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641360315148.png)

编写统一的错误定义文件

```js
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
}
```

## 3错误处理函数

在app文件夹下新建一个文件errHandle.js.

```js
module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}
```

app/index.js改写成

![1641360447518](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641360447518.png)

# 12加密

