'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);

router.delete('/:id', controller.removeOrder);

module.exports = router;