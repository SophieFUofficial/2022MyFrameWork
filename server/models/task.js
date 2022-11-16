const mongoose = require('mongoose');

/**
 * 定义一个schema
 * 每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
 * 如果还想添加 keys 的话，使用add方法。
 * 允许使用的SchemaTypes如下：
 * String、Number、Date、Buffer、Boolean、Mixed、ObjectId、Array
 *
 * SchemaTypes可以加校验，比如，下面这个metadata.timeSlot设置了最小值，如果传负数，则接口报错。
 */
const Schema = mongoose.Schema; // 限制模式对象

const taskSchema = new Schema({
    appId: {
        type: String,
        required: true,
    },
    createDate: String,
    metadata: {
        client: String,
        store: String,
        timeSlot: {
            type: Number,
            min: 0,
        },
        startTime: String,
        endTime: String,
        source: String,
        version: String,
    },
});

/**
 * 实例方法（method）
 * 自定义我们自己的方法。
 * 注意！！！Attention!
 * 不要重写 mongoose 的默认方法
 * 不要在自定义方法中使用 ES6 箭头函数，会造成 this 指向错误
 */
taskSchema.methods.findByMethod = function (cb) {
    return this.model('etTask').find({ appId: this.appId }, cb);
};

/**
 * 静态方法（static）
 * 不要在静态方法中使用 ES6 箭头函数
 */
taskSchema.statics.findByAppId = function (appId, cb) {
    return this.find({ appId: appId }, cb);
};

taskSchema.statics.findByThisId = function (id, cb) {
    return this.find({ _id: id }, cb);
};

/**
 * 查询助手（query helper）
 * 查询助手作用于 query 实例，方便你自定义拓展你的 链式查询
 * Query API: http://www.mongoosejs.net/docs/api.html#Query
 */
taskSchema.query.byAppId = function (appId) {
    return this.find({ appId: appId });
};

/**
 * 索引（index）
 */
taskSchema.index({ createDate: 1 });


/**
 * 创建Model对象
 * Model对象代表的是数据库中的（collection），通过Model才能对数据库进行操作。（即确定操作哪张表，name表示表名，如果没有，会自动生成新表，表名加上s）
 */
const Task = mongoose.model('etTask', taskSchema, 'etTask');

module.exports = Task;

