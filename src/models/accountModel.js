const db = require('../helpers/db')

const { createHireEngineerModel } = require('../models/engineerModel')
const { createHireCompanyModel } = require('../models/companyModel')

module.exports = {
  registerAccountModel: (setData) => {
    return new Promise((resolve, reject) => {
      const insertData = {
        ac_name: setData.ac_name,
        ac_no_hp: setData.ac_no_hp,
        ac_email: setData.ac_email,
        ac_password: setData.ac_password,
        ac_level: setData.ac_level,
        ac_created_at: new Date()
      }
      const query = `
        INSERT INTO account
                SET ?
      `
      db.query(query, insertData, async (err, res, _fields) => {
        if (!err) {
          if (parseInt(setData.ac_level) === 0) {
            await createHireEngineerModel(insertData, res)
          } else {
            await createHireCompanyModel({
              ac_id: res.insertId,
              cn_name: setData.cn_name,
              cn_position: setData.cn_position
            })
          }
          const newResult = {
            id: res.insertId,
            affectedRows: res.affectedRows,
            ...insertData
          }
          delete newResult.ac_password
          resolve(newResult)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllDataAccountModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM account WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  getAccountByIdModel: (accountId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account WHERE ac_id = ${accountId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  deleteAccountModel: (accountId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM account WHERE ac_id = ${accountId} `, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateAccountModel: (accountId, acName, acEmail, acNoHp, acPassword, acLevel) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE account SET ac_name = '${acName}', ac_email = '${acEmail}', ac_no_hp = '${acNoHp}', ac_password = '${acPassword}', ac_level = '${acLevel}' WHERE 
      ac_id = '${accountId}'`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  updatePatchAccountModel: (accountId, dataColumn) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE account SET ${dataColumn} WHERE ac_id = ${accountId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getDataAccountModel: (acEmail) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT ac_email FROM account WHERE ac_email = '${acEmail}'`
      db.query(querySelect, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

}
