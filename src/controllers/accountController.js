const { registerAccountModel, getAllDataAccountModel, getAccountByIdModel, deleteAccountModel, updateAccountModel, updatePatchAccountModel, getDataAccountModel } = require('../models/accountModel')
const bcrypt = require('bcrypt')
const { getUserModel } = require('../models/userModel')

module.exports = {
  registerAccount: async (req, res) => {
    const { acName, acNoHp, acEmail, acPassword, acLevel, cnName, cnPosition } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(acPassword, salt)

    const setData = {
      ac_name: acName,
      ac_no_hp: acNoHp,
      ac_email: acEmail,
      ac_password: encryptPassword,
      ac_level: acLevel,
      cn_name: cnName,
      cn_position: cnPosition,
      ac_created_at: new Date()
    }
    try {
      const checkEmail = await getUserModel(acEmail)
      console.log(checkEmail)
      if (checkEmail.length >= 1) {
        res.status(200).send({
          success: false,
          message: 'Data Sudah Ada'
        })
      } else {
        const result = await registerAccountModel(setData)
        if (result.affectedRows) {
          delete result.affectedRows
          res.status(200).send({
            success: true,
            message: 'Succes To Register',
            data: result
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Failed Add Account'
          })
        }
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
      console.log(error)
    }
  },
  getAllData: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'ac_name'
      searchValue = search || ''
    }
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAllDataAccountModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project not found!'
        })
      }
    }
    )
  },
  getAccountById: async (req, res) => {
    try {
      const { accountId } = req.params
      const result = await getAccountByIdModel(accountId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${accountId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${accountId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { accountId } = req.params

      const results = await getAccountByIdModel(accountId)
      if (results.length) {
        const result = await deleteAccountModel(accountId)
        if (result.affectedRows) {
          res.status(200).send({
            succes: true,
            message: `Item Project id ${accountId} has been Delete`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item Project Failed to Delete'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with ID ${accountId} not found`
        })
      }
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Data project not Found'
      })
    }
  },
  updateAccount: async (req, res) => {
    try {
      const { accountId } = req.params
      const { acName, acEmail, acNoHp, acPassword, acLevel } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(acPassword, salt)

      const data = {
        acPassword: encryptPassword
      }
      if (acName.trim() && acEmail.trim() && acNoHp.trim() && acLevel.trim()) {
        const result = await getAccountByIdModel(accountId)
        if (result.length) {
          const result = await updateAccountModel(accountId, acName, acEmail, acNoHp, data.acPassword, acLevel)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Project With ID ${accountId} has been update`
            })
          } else {
            res.status(400).send({
              status: false,
              message: 'Failed to Update Data '
            })
          }
        } else {
          res.status(400).send({
            success: false,
            message: `Project with id ${accountId} not Found`
          })
        }
      } else {
        res.send({
          success: false,
          message: 'All Field must be filled!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server errors!'
      })
      console.log(error)
    }
  },
  updatePatchAccount: async (req, res) => {
    try {
      const { accountId } = req.params

      const {
        ac_name = '',
        ac_email = '',
        ac_no_hp = '',
        ac_password = '',
        ac_level = ''
      } = req.body
      if (ac_name.trim() || ac_email.trim() || ac_no_hp.trim() || ac_password.trim() || ac_level.trim()) {
        const result = await getAccountByIdModel(accountId)
        if (result.length) {
          const dataColumn = Object.entries(req.body).map(item => {
            // untuk melihat value akhir apakah int atau string, jika int maka tanpa kutip, jika string maka kutip
            const queryDynamic = parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]} = '${item[1]}'`
            return queryDynamic
          })
          const result = await updatePatchAccountModel(accountId, dataColumn)
          if (result.affectedRows) {
            res.status(200).send({
              succes: true,
              message: 'Data Berhasil Di Update'
            })
          } else {
            res.status(400).send({
              succes: true,
              message: 'Failed To update Data '
            })
          }
        } else {
          res.status(404).send({
            succes: true,
            message: `Proejct with id ${accountId} not Found `
          })
        }
      } else {
        res.status(400).send({
          succes: true,
          message: 'Some Field must be filled'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
      console.log(error)
    }
  },
  getAllAccount: async (req, res, _next) => {
    try {
      const { acEmail } = req.body
      const result = await getDataAccountModel(acEmail)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Engineer List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item engineer not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
      console.log(error)
    }
  }
}
