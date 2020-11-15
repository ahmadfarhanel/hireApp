const db = require('../helpers/db')

const { createHireEngineerModel } = require('../models/engineerModel')
const { createHireCompanyModel } = require('../models/companyModel')
module.exports = {
  createHireAccountModel: (acName, acEmail, acNoHp, acPassword, acLevel, cnName, cnPosition) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO account
                SET ?
      `
      const dataAcc = {
        ac_name: acName,
        ac_email: acEmail,
        ac_no_hp: acNoHp,
        ac_password: acPassword,
        ac_level: acLevel
      }

      db.query(query, dataAcc, async (err, res, _fields) => {
        console.log(dataAcc)
        if (!err) {
          if (parseInt(acLevel) === 0) {
            console.log(res)
            await createHireEngineerModel(res.insertId)
          } else {
            await createHireCompanyModel({
              ac_id: res.insertId,
              cn_name: cnName,
              cn_position: cnPosition
            })
          }
          resolve(res)
        } else {
          reject(err)
          console.log(err)
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
        }
      })
    })
  }
  // updatePatchAccountModel: (accountId, dataColumn) => {
  //   return new Promise((resolve, reject) => {
  //     const db = `UPDATE account SET ${dataColumn} WHERE ac_id = ${accountId}`
  //     db.query(db, (err, result, _fields) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(new Error(err))
  //       }
  //     })
  //   })
  // }
}
