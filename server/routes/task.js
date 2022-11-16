const express = require('express');
const router = express.Router();
const Task = require('../controller/task');

router.get('/getList', Task.getList);

router.post('/insertOne', Task.insertOne);

router.get('/queryAppId', Task.queryAppId);


module.exports = router;