//  const model = require('./../models/model')

async function create(model, obj) {
    const { name = '' } = obj
    const isExist = await model.exists({name})
    if(isExist) return {
        'status': '-1',
        'message': `新建失败，数据库中已存在。`
    }

    await model.create(obj)

    return {
        'status': '1',
        'message': `新建成功。`
    }
}
async function modify(model, id, obj) {
    let isExist = false
    if(obj.name) {
        isExist = await model.exists({
            name: obj.name
        })
    }
    if(isExist) return {
        'status': '-1',
        'message': '修改失败，数据库中已存在'
    }

    await model.findByIdAndUpdate(id, obj)

    return {
        'status': '1',
        'message': `修改成功。`
    }
}
async function drop(model, id) {
    await model.findByIdAndDelete(id)  
    return {
        'status': '1',
        'message': '删除成功'
    }
}
async function getAll(model) {
    const res = await model.find()
    return {
        'status' : '1',
        'message': '查询成功',
        'data': res
    }
}
async function getAllCount(model) {
    const count = await model.count()
    return count
}
async function queryByLimit(model, page = 1, limit = 10) {
    const skip = (page - 1 ) * limit
    // populate关联查询Article的categories字段
    //用来查询分裂接口也没报错
    const res = await model.find({}).skip(skip).limit(limit).populate('categories')
    const count = await getAllCount(model)

    return  {
        'status' : '1',
        'data': res,
        'count': count
    }
}
async function getById(model, id) {
    const res = await model.findById(id).populate('categories')
    return {
        'status': '1',
        'data': res
    }
}
module.exports = {
    create,
    modify,
    drop,
    getAll,
    getById,
    queryByLimit
}