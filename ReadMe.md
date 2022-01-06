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

在将密码保存到数据库之前，要对密码进行加密处理

123123abc（加盐）加盐加密

## 1安装bcryptjs

`npm i bcryptjs`

## 2编写代码加密中间件

```js
const cryptPassword = async (ctx,next) =>{
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt) //加盐后的密码
    ctx.request.body.password = hash
    await next()
}

```

## 3在router中使用

![1641363310089](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641363310089.png)

# 13登录验证

流程：

验证格式

验证用户是否存在

验证密码是否匹配

改写src/middleware/user.middleware.js

![1641370233773](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641370233773.png)

```js
// 验证登录，首先验证输入是否合法，第二验证用户是否存在，第三验证密码是否匹配
const verifyLogin = async (ctx, next) => {
    //1判断用户是否存在（不存在，报错）
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        //2 密码是否匹配（不匹配，报错）
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}
```

然后导出

![1641370515790](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641370515790.png)

改写路由router/user.route.js

```js
// 登录接口
router.post('/login',userValidator,verifyLogin,login)
```
# 14用户的认证

登录成功后会给用户颁发一个令牌token，用户在以后的每一次请求中携带这个令牌。

jwt：jsonwebtoken。 

- header：头部
- payload：荷载
- signature：签名

## 1颁发token

### 1.1安装jsonwebtoken

```js
npm i jsonwebtoken
```

### 1.2在控制器中改写login方法

```js
async login(ctx, next) {
  const { user_name } = ctx.request.body

  // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
  try {
    // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
    const { password, ...res } = await getUerInfo({ user_name })

    ctx.body = {
      code: 0,
      message: '用户登录成功',
      result: {
        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
      },
    }
  } catch (err) {
    console.error('用户登录失败', err)
  }
}
```

### 1.3定义私钥

在.env中定义

```js
JWT_SECRET = xzd
```

## 2用户认证

### 2.1创建auth文件

```js
const { TokenExpiredError } = require('jsonwebtoken')



const jwt = require('jsonwebtoken')



const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError,invalidToken } = require('../constant/err.type')

const auth = async (ctx, next) => {

  const { authorization } = ctx.request.header

  const token = authorization.replace('Bearer ', '')

  console.log(token)

  try {

​    // user中包含了payload的信息（id，is_admin，password，user_name)

​    const user = jwt.verify(token, JWT_SECRET)

​    ctx.state.user = user

  } catch (err) {

​    switch (err.name) {

​      case 'TokenExpiredError':

​        console.error('token已过期')

​        return ctx.app.emit('error', tokenExpiredError, ctx)

​        case 'JsonWebTokenError':

​          console.error('无效的token',err)

​          return ctx.app.emit('error',invalidToken,ctx)

​    }

  }

  await next()

}

module.exports = {

  auth

}
```

2.2改写路由

```js
// 修改密码接口
router.patch('/', auth, (ctx, next) => {
  console.log(ctx.state.user)
  ctx.body = '修改密码成功'
})
```

# 15判断是否有管理员权限

在src/middleware/auth.middleware.js文件里写入判断是否有管理员权限的方法

```js
// 判断是否有管理员的权限
const hadAdminPermission = async (ctx,next) =>{
    const {is_admin} = ctx.state.user
    if(!is_admin){
        console.error('该用户没有管理员权限',ctx.state.user)
        return ctx.app.emit('error',hasNotAdminPermission,ctx.state.user)
    }
    await next()
}
module.exports = {
    auth,
    hadAdminPermission
}
```

在goods.route.js 里调用upload接口时

```js
//先判断是否登陆，然后判断是否有管理员的权限。
router.post('/upload', auth, hadAdminPermission, upload)
```

# 16配置文件上传的路径

在app文件夹下的index.js文件里加入这些代码，将文件的上传路径改为src/upload

核心代码是：uploadDir:path.join(__dirname,'../upload'), 在这里不要用相对路径。

```js
// 核心模块放第一部分
const path = require('path')

// 注册中间件，
// 要上传文件，因此要改一下中间件的配置，用来支持上传文件，官方文档看multipart，formidable关键字
// console.log(process.cwd()) //打印process.cwd()
app.use(koaBody({
    multipart :true,
    formidable:{
        // 在配置选项option里，不推荐使用相对路径,报错
        // 在option里的相对路径，不是相对当前文件，而是相对process.cwd()
        // 可用控制台打印得到的相对路径是G:\hh\workspace\nodeStudy
        // uploadDir:'../upload',  //可以用uploadDir:'./src/upload',但是不好
        uploadDir:path.join(__dirname,'../upload'), 
        keepExtensions: true //是否保留原始文件的扩展
    }
}))
```

# 17编写文件上传接口

在src/controller/goods.controller.js文件中写文件上传接口

```js
async upload(ctx, next) {

​    // console.log(ctx.request.files)

​    const { file } = ctx.request.files

​    // console.log(file)

​    const fileTypes = ['image/jpeg', 'image/png']

​    if (file) {

​     ctx.body = {

​      code: 0,

​      message: '商品图片上传成功',

​      result: {

​       goods_img: path.basename(file.path),

​      },

​     }

​    } else {

​     return ctx.app.emit('error', fileUploadError, ctx)

​    }

   }
```

# 18通过url的方法访问上传的图片

## 1安装koa-static

```js
npm i koa-static
```

## 2配置koa-static

在app.index.js根组件下面 

![1641458524241](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641458524241.png)



# 19写单元测试

在src同级目录下 新建一个文件夹test,然后编写文件上传单元测试文件file_text.html

点击上传出现错误，

在live server里打开file_text.html，出现错误

![1641459949761](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641459949761.png)

意思是中间件auth里判断是否登陆，这个权限受限，不能上传，只有管理员才能上传。

将权限authorization加一个默认值

![1641460221662](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641460221662.png)

但是还会在live server里有问题，

![1641460373762](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641460373762.png)

这里涉及到ajax请求头的问题。留以后在解决。

这里为了解决单元测试的问题可以在调接口的时候不做授权。在router/gooods.route.js文件里修改授权

将

```js
router.post('/upload', auth, hadAdminPermission, upload)
```

注释掉，改为

```js
router.post('/upload',upload)
```

这样单元测试就成功了。完成单元测试改回来注释掉的第一段。

# 20文件上传接口写了一个bug

### 我只要写能上传img，png其他的文件都不允许上传，而我这个只能上传所有文件

在goods.controller.js文件里改一下upload接口

```js
  async upload(ctx, next) {

​    // console.log(ctx.request.files)

​    const { file } = ctx.request.files

​    // console.log(file)

​    const fileTypes = ['image/jpeg','image/png']

​    if (file) {

​      if(!fileTypes.includes(file.type)){

​        return ctx.app.emit('error',unSupportedFileType,ctx)

​      }

​     ctx.body = {

​      code: 0,

​      message: '商品图片上传成功',

​      result: {

​       goods_img: path.basename(file.path),

​      },

​     }

​    } else {

​     return ctx.app.emit('error', fileUploadError, ctx)

​    }

   }

}
```



## 1主要写了一个过滤器，

```js
 const fileTypes = ['image/jpeg','image/png']
```

​    

##  2加一个条件判断， 过滤掉不符合条件的数据





```js
   

​      if(!fileTypes.includes(file.type)){

​        return ctx.app.emit('error',unSupportedFileType,ctx)

​      }
```

# 21发布商品接口

## 1安装

发布商品首先要验证接口的有效性用到了 koa-parameter

```js
npm install koa-parameter
```

## 2引入

app/index.js文件里引入，注意，必须在router之前use

![1641473723844](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1641473723844.png)

### 3写验证函数validator，并且导出。

在goods.middleware.js文件里

```js
const { goodsFormateError } = require("../constant/err.type")

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
            goods_img: { type: 'string', required: true }

        })
    } catch (err) {
        console.error(err)
        // return ctx.app.emit('error', err, ctx) 向postman发送错误
        goodsFormateError.result = err
        return ctx.app.emit('error', goodsFormateError, ctx)
    }
    await next()
}

module.exports = {
    validator,
}
```



这里需要注意的点是validator的catch(err)里，可以将err赋值给统一错误处理对象goodsFormateError的result字段，这样postman里也可以看到错误对象，不仅仅在控制台中显示了，注意不要将数据库里的字段啥的都传前端，否则会被黑客窃取信息。

## 4写发布商品接口

### 4.1先写一张mysql的goods表出来

用sequelize做好关系映射，这张表包含4个字段，和俩个数据库自带的时间戳字段。

在新建文件model/goods.mode.js

```js
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
    }
})

// Goods.sync({ force: true })

module.exports = Goods
```

### 4.2做数据库操作的增删改查操作，

这里是发布，用的是create,核心代码是sequelize的create方法即

```
const res = await Goods.create(goods)
```

，可以看sequelize的官方文档。

新建文件service/goods.service.js

```js
const Goods = require('../model/goods.model')
class GoodsService {
    async createGoods(goods){
        const res = await Goods.create(goods)
        console.log(res)
        return res.dataValues
    }
}

module.exports = new GoodsService()
```

### 4.3写接口

在controller/goods.controller.js中写接口create接口即商品发布接口

```js
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
```

### 4.4调用接口

在router/goods.route.js文件下调用发布商品接口(create)

```js
router.post('/', auth, hadAdminPermission, validator,create)
```

