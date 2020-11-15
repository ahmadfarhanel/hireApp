const db = require('../helpers/db')

module.exports = {
  createHireModel: (hrPrice, hrMessage, hrStatus, hrDateConfirm) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO hire (hr_price, hr_message, hr_status, hr_date_confirm) VALUES 
        ('${hrPrice}', '${hrMessage}', '${hrStatus}', '${hrDateConfirm}')`
      console.log(query)
      db.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  getDataHireByIdModel: (hireId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM hire WHERE hr_id = ${hireId}`
      db.query(query, (error, results, fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  updateDataHireByIdModel: (hireId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE hire
         SET ?
       WHERE hr_id = ${hireId}
    `
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  deleteDataHireByIdModel: (hireId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
    hire
     WHERE ?
    `
      db.query(query, { hr_id: hireId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  }
}
