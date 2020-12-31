require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
  authorizationEngineer: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_key, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            succes: false,
            message: error.message
          })
        } else {
          if (result.ac_level === 1) {
            next()
          } else {
            response.status(403).send({
              succes: false,
              message: 'You cant Acces'
            })
          }
        }
      })
    } else {
      response.status(400).send({
        succes: false,
        message: 'Login Terlebih Dahulu'
      })
    }
  },
  authorizationCompany: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_key, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            succes: false,
            message: error.message
          })
        } else {
          if (result.ac_level === 0) {
            console.log(result)
            next()
          } else {
            response.status(403).send({
              succes: false,
              message: 'You cant Acces'
            })
          }
        }
      })
    } else {
      response.status(400).send({
        succes: false,
        message: 'Login Terlebih Dahulu'
      })
    }
  }
}
