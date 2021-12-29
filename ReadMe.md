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



module.exports = new UserService()`