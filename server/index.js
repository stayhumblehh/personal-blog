const Koa = require('koa')
const app = new Koa()

//middlewares
const cors = require('koa-cors')
const boryparser = require('koa-bodyparser')
app.use(boryparser())
app.use(cors())
require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
    console.log(`this app has been started at http://127.0.0.1:3000`)
})