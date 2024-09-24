'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../../controllers/middleware')
const userController = require('../../controllers/user.controller')

router.post('/update', middleware.checkToken, userController.update)
router.post('/updatePassword', middleware.checkToken, userController.updatePassWord)
router.get('/getByPhone/:phone', userController.getByPhone)
router.post('/changeNewPassword', userController.changeNewPassword)

module.exports = router  