module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    //添加 分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    //删除 分类
    router.delete('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //修改 分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //获取 分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    //获取 某项分类
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })


    app.use('/admin/api', router)
}