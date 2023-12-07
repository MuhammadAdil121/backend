const { CourseResponse } = require("../helpers/helpers")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthModel = require("../models/authModel")

const AuthController = {
    signUp: async (req, res) => {
        try {
            const { userName, password, contactNo } = req.body
            const obj = { userName, password, contactNo }
            const errArr = []
            if (!obj.userName) {
                errArr.push("Username is required")
            }
            if (!obj.password) {
                errArr.push("Password is required")
            }
            if (errArr.length > 0) {
                res.send(CourseResponse(false, "Validation Error", errArr))
            }

            const checkUser = await AuthModel.findOne({ userName: obj.userName })
            if (checkUser) {
                res.send(CourseResponse(false, "User Already Exist", null))
                return;
            }
            obj.password = await bcrypt.hash(obj.password, 10)
            const user = new AuthModel(obj)
            const result = await user.save()
            if (result) {
                res.send(CourseResponse(true, "Data Added Successfully", result))
            }

        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    login: async (req, res) => {
        try {
            const { userName, password } = req.body
            const obj = { userName, password }
            const userExist = await AuthModel.findOne({ userName: obj.userName })
            if (userExist) {
                let correctPassword = await bcrypt.compare(obj.password, userExist.password)
                if (correctPassword) {
                    const token = jwt.sign({ ...userExist }, process.env.SECRET_KEY)
                    res.send(CourseResponse(true, "Data Added Successfully", { user: userExist, token: token }))
                }
            }

            else {
                res.status(404).send(CourseResponse(false, error, null))
            }
        }
        catch (error) {
            res.send(CourseResponse(false, error, null))
        }
    },

    protected: () => { },
}

module.exports = AuthController