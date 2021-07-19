module.exports = (app) => {
    const mongoose = require('mongoose')

    //因为populate关联查询时必须要用到Category Model
    //不然会报错
    //所以在这里统一注册一下
    require('./../models/Article')
    require('./../models/Category')

    mongoose.connect('mongodb://127.0.0.1:27017/personal-blog', {
        useNewUrlParser: true
    })
}