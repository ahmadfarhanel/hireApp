const db = require('../helpers/db')

module.exports = {
  createHireCompanyModel: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO company SET ?'
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getAllDataCompanyModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM company cn JOIN account ac ON ac.ac_id = cn.ac_id'
      db.query(querySelect, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getDataCompanyByIdModel: (companyId) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT * FROM company cn JOIN account ac ON ac.ac_id = cn.ac_id WHERE cn_id = ${companyId}`
      db.query(querySelect, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  updateCompanyModel: (companyId, cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, cnFtProfile) => {
    return new Promise((resolve, reject) => {
      console.log(companyId)
      const query = `UPDATE company SET cn_name = '${cnName}', cn_position = '${cnPosition}', cn_part = '${cnPart}', cn_city = '${cnCity}', cn_desc = '${cnDesc}', cn_instagram = '${cnInstagram}', cn_linkedin = '${cnLinkedIn}', cn_foto_profile = '${cnFtProfile}', cn_updated_at = CURRENT_TIMESTAMP WHERE 
      cn_id = '${companyId}'`
      console.log(query)
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  }
}
