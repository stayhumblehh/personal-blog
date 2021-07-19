const Koa = require('koa')
const app = new Koa()

//挂载jwt密钥
app.context.secret = 'huangke'

//middlewares
const cors = require('koa-cors')
const boryparser = require('koa-bodyparser')

//全局错误捕获中间件
app.use( async (ctx, next) => {
    try{
        await next()
    } catch (e) {
        ctx.status = e.status || 500
        ctx.body = {
            'status' : ctx.status,
            'message' : e.message
        }
    }
})

app.use(boryparser())
app.use(cors())


require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
    console.log(`this app has been started at http://127.0.0.1:3000`)
})