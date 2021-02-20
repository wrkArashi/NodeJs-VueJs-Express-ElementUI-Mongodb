module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        //给请求对象挂在一个属性model
        req.Model = require(`../models/${modelName}`)
        await next()
    }
}