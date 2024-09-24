'use strict'

const express = require('express')
const router = express.Router()
const gateController = require('../../controllers/gate.controller')

router.post('/save', gateController.create)
router.get('/get-all', gateController.getAll)

module.exports = router  