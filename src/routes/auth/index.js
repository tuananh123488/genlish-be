'use strict'

const express = require('express')

const middleware = require('../../controllers/middleware')
const authController = require('../../controllers/auth.controller')
const router = express.Router()

router.post('/sign-in', authController.signIn)
router.post('/sign-up-step-1', authController.signUpStep1)
router.post('/sign-up-step-other', authController.signUpStepOther)
router.post('/generate-token', authController.generateToken)
router.post('/find-user-by-token', middleware.checkToken, authController.findUserByToken)
module.exports = router  