'use strict'

const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const authUtils = require("../utils/auth")
const jwt = require('jsonwebtoken');
const { sendMail, generateRandomNumber } = require("../utils/mailer");
let QUEUE_VERIFICATIONS = []

class AuthService {

    signUpStep1 = async (phone, password) => {
        const user = await userModel.findOne({ phone })
        if (user)
            throw new Error('Số điện thoại đã tồn tại trong hệ thống')
        else {
            const passwordEncode = await authUtils.hashPassword(password)
            const userResult = await userModel.create({ phone, password: passwordEncode, statusSignUp: 1 })
            userResult.password = ''
            return userResult
        }
    }

    signUpStepOther = async (user) => {
        const userFound = await userModel.findOne({ phone: user.phone })
        const userUpdated = await userModel.findByIdAndUpdate(user._id, { ...user, password: userFound.password }, { new: true })
        return userUpdated
    }

    signIn = async (phone, pass) => {
        try {
            const user = await userModel.findOne({ phone })
            if (!user) {
                throw new Error('Người dùng không tồn tại');
            }
            const isMatch = await bcrypt.compare(pass, user.password);
            user.password = ''
            if (isMatch) {
                return {
                    user,
                    tokens: await this.generateTokens({ user_id: user._id })
                }
            }
            throw new Error('Thông tin đăng nhập không trùng khớp');
        } catch (e) {
            throw new Error(e.message);
        }
    }

    generateTokens = async (user, expire) => {
        const accessToken = jwt.sign(user, process.env.SECRETKEY, { expiresIn: process.env.ACCESSEXPIRES });
        const refreshToken = jwt.sign(user, process.env.SECRETKEY, { expiresIn: expire ? expire : process.env.REFRESHEXPIRES });
        return {
            accessToken,
            refreshToken
        }
    }

    // signUpWithGoogle = async (email, avatar) => {
    //     const user = await userModel.findOne({ email })
    //     if (user)
    //         throw new Error('Email already exists in system')
    //     else {
    //         const userResult = await userModel.create({ email, avatar })
    //         return userResult
    //     }
    // }

    // signInWithGoogle = async (email) => {
    //     const user = await userModel.findOne({ email })
    //     if (!user)
    //         throw new Error('Not Found User')
    //     else {
    //         return {
    //             user,
    //             tokens: await this.generateTokens({ user_id: user._id, admin: user.admin })
    //         }
    //     }
    // }
}

module.exports = new AuthService()