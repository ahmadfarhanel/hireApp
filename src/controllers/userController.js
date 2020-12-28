const { getUserModel } = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { acEmail, acPassword } = req.body
      const dataUser = await getUserModel(acEmail)
      console.log(dataUser.length)
      if (dataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(acPassword, dataUser[0].ac_password)
        if (checkPassword) {
          console.log(dataUser)
          let payload = {
            ac_id: dataUser[0].ac_id,
            ac_email: dataUser[0].ac_email,
            ac_level: dataUser[0].ac_level,
            ac_name: dataUser[0].ac_name
          }
          const token = jwt.sign(payload, process.env.JWT_key, { expiresIn: '1h' })
          payload = { ...payload, token }
          res.status(200).send({
            success: true,
            message: 'Succes login',
            data: payload
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'Wrong Password'
          })
        }
      } else {
        res.status(500).send({
          success: false,
          message: 'Account not Found'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}
