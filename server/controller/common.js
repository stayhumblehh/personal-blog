//  const model = require('./../models/model')

async function create(model, val) {
    const isExist = await model.exists({name : val})
    if(isExist) return {
        'status': '-1',
        'message': `新建失败，数据库中已存在。`
    }

    await model.create({
        name: val
    })

    return {
        'status': '1',
        'message': `新建成功。`
    }
}
async function modify(model, id, newVal) {
    const isExist = await model.exists({
        name: newVal
    })
    if(isExist) return {
        'status': '-1',
        'message': '修改失败，数据库中已存在'
    }

    await model.findByIdAndUpdate(id, {name: newVal})

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
async function getById(model, id) {
    const res = await model.findById(id)
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
    getById
}