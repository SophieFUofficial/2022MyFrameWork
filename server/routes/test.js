const express = require('express');
const router = express.Router();

router.get('/apiSuccess', function (req, res) {
    res.status(200).send({ success: true, message: 'success' });
});

module.exports = router;