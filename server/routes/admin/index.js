 module.exports = (app) => {
    const Router = require('koa-router')
    const router = new Router()
    router.prefix('/admin/api/common/:resource')
    const common = require('../../controller/common')

    router.post('/', async (ctx, next) => {
        await next()
        const { name } = ctx.request.body  
        const res = await common.create(ctx.model, name)

        ctx.body = res
    })
    router.get('/', async (ctx, next) => {
        await next()
        console.log(ctx.query)
        const { page = 1, limit = 10 } = ctx.query
        const res = await common.queryByLimit(ctx.model, Number(page), Number(limit))
 
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
        const model = require('inflection').classify(resource)     
        ctx.model = require(`./../../models/${model}`)
        await next()
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
}