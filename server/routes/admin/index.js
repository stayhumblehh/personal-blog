 module.exports = (app) => {
    const Router = require('koa-router')
    const router = new Router()
    const common = require('../../service/common')

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
        const { name } = ctx.request.body
        const id = ctx.params.id
        const res = await common.modify(ctx.model, id,  name)

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
        console.log('----router middleware----')
        const { resource } = ctx.params
        //路由传过来的参数转为模型挂载到上下文中
        const model = require('inflection').classify(resource)     
        ctx.model = require(`./../../models/${model}`)
        await next()
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
}