'use strict'

const { responseWithNoTokens, responseWithTokens } = require("../utils/response");
const userService = require('../services/user.service')

class UserController {

    update = (req, res) => {
        const user = req.body
        userService.update(user)
            .then(userUpdated => responseWithTokens(req, res, userUpdated, 200))
            .catch(error => responseWithTokens(req, res, error.message, 500))
    }
    changeNewPassword = (req, res) => {
        const { phone, newPassword, reNewPassword } = req.body
        userService.changeNewPassword(phone, newPassword, reNewPassword)
            .then(userUpdated => responseWithTokens(req, res, userUpdated, 200))
            .catch(error => responseWithTokens(req, res, error.message, 500))
    }
    updatePassWord = (req, res) => {
        const { id, oldPassword, newPassword } = req.body


        userService.updatePassword(id, oldPassword, newPassword)
            .then(userUpdated => responseWithTokens(req, res, userUpdated, 200))
            .catch(error => responseWithTokens(req, res, error.message, 500))
    }

    getByPhone = (req, res) => {
        const { phone } = req.params
        userService.getByPhone(phone)
            .then(userUpdated => responseWithTokens(req, res, userUpdated, 200))
            .catch(error => responseWithTokens(req, res, error.message, 500))
    }
}


module.exports = new UserController()