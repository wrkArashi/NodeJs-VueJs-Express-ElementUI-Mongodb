module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        //无jwt token
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        //无效jwt token
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)
        //用户不存在
        assert(req.user, 401, '请先登录')
        await next()
    }
}