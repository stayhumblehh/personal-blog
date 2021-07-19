 module.exports = (app) => {
    const Router = require('koa-router')
    const jwt = require('jsonwebtoken') 
    const common = require('../../service/common')   
    //登录接口
    const  login = new Router()
    login.prefix('/admin/api/login')

    login.post('/', async (ctx, next) => {
        await next()
        
        const { username, password } = ctx.request.body

        //账号密码固定为admin, 123456
        if(username !== 'admin' || password !== '123456') {
            ctx.throw(422, '用户名或者密码错误')
        }

        //签发token
        const token = jwt.sign({
            username,
            password
        }, ctx.secret)

        ctx.body = {
            'status' : '1',
            'message': '登录成功',
            'token': token
        }
    })

    //crud接口
    const router = new Router()
    router.prefix('/admin/api/common/:resource')

    router.post('/', async (ctx, next) => {
        await next()
        const model = ctx.request.body  
        const res = await common.create(ctx.model, model)

        ctx.body = res
    })
    router.get('/', async (ctx, next) => {
        await next()
        console.log(ctx.query)
        let res
        const { count } = ctx.query  // 默认分页查询，查询全部就传count值
        if(count) {
            res = await common.getAll(ctx.model)
        } else {
            const { page = 1, limit = 10 } = ctx.query
            res = await common.queryByLimit(ctx.model, Number(page), Number(limit))
        }
 
        ctx.body = res
    })
    router.get('/:id', async (ctx, next) => {
        await next()
        const id = ctx.params.id
        const res = await common.getById(ctx.model, id)

        ctx.body = res
    })
    router.put('/:id', async (ctx, next) => {
        await next()
        const model = ctx.request.body
        const id = ctx.params.id
        const res = await common.modify(ctx.model, id,  model)

        ctx.body = res
    })
    router.delete('/:id', async (ctx, next) => {
        await next()
        const id = ctx.params.id
        const res = await common.drop(ctx.model, id)

        ctx.body = res
    })

    // router middleware
    router.use( async (ctx, next) => {
        //获取token
        const token = String(ctx.headers.authorization || '').split(' ').pop()
        
        //token不存在抛出错误
        if(!token) ctx.throw(401, '请先登录')

        const initialData = jwt.verify(token, ctx.secret)
        const {username = '', password = ''} = initialData
        if(username !== 'admin' || password !== '123456') {
            ctx.throw(401, '请先登录')
        }
        await next()
    })
    router.use( async (ctx, next) => {
        console.log('----router middleware----')
        const { resource } = ctx.params
        //路由传过来的参数转为模型挂载到上下文中
        const model = require('inflection').classify(resource)     
        ctx.model = require(`./../../models/${model}`)
        await next()
    })
    
    // 注册路由中间件
    app.use(login.routes())
    app.use(login.allowedMethods())

    app.use(router.routes())
    app.use(router.allowedMethods())
}