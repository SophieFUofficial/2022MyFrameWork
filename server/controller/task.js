const { wrap: async } = require('co');
const dayjs = require('dayjs');
const Task = require('../models/task');

/**
 * getList
 */
exports.getList = async(function*(req, res, next) {
    const { pageSize = 25, pageNum = 1 } = req.query;
    try {
        const list = yield Task.find({}).sort({ createDate: 'desc' }).skip((pageNum -1) * pageSize).limit(pageSize); // model.find()生成Query实例，skip、limit都是Query原型链上的方法
        const count = yield Task.count(); // model自带计算总数的方法
        res.status(200).send({
            success: true,
            message: 'success',
            data: {
                list,
                count,
                pageSize,
                pageNum,
            },
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'failed',
            data: err,
        });
    }
});

/**
 * insertOne
 */
exports.insertOne = async(function*(req, res, next) {
    const data = {
        appId: 'demandRoster',
        createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        metadata: {
            client: 'Coach',
            store: 'Suzhou Center',
            timeSlot: 30,
            startTime: '2022-10-04',
            endTime: '2022-10-10',
            source: 'GAC_SAASWFM_SCHEDULING',
            version: '2.0',
        },
    };
    try {
        const result = yield Task.create(data);
        res.status(200).send({
            success: true,
            message: 'success',
            data: result,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'failed',
            data: err,
        });
    }
});

exports.queryAppId = async(function*(req, res, next) {
    try {
        // 查询助手（query helper）写法
        // const result = yield Task.find().byAppId('forecast');
        // 静态方法（static）
        const result = yield Task.findByAppId('periodRoster');
        // 实例方法（method）
        const demandRoster = yield Task.findByThisId('a4bf4cdc-1b2b-45b2-8984-ccbc27cb1740');
        const oneDemand = yield demandRoster[0].findByMethod();
        res.status(200).send({
            success: true,
            message: 'success',
            data: {
                result,
                demandRoster,
                oneDemand,
            },
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'failed',
            data: err,
        });
    }
});
