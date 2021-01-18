const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },//名字
    avatar: { type: String },//头像
    title: { type: String },//称号
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],//分类，用到分类
    scores: {
        difficult: { type: Number },//难度
        skills: { type: Number },//技能
        attack: { type: Number },//攻击
        survive: { type: Number },//生存
    },//评分
    skills: [{
        icon: { type: String },//图标
        name: { type: String },//名称
        description: { type: String },//描述
        tips: { type: String },//小技巧
    }],//技能
    items1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],//顺风出装
    items2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],//逆风出装
    usageTips: { type: String },//使用技巧
    battleTips: { type: String },//对抗技巧
    teamTips: { type: String },//团战思路
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },//英雄
        description: { type: String }//描述
    }],//最佳搭档
})
module.exports = mongoose.model('Hero', schema)