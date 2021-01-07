const db = require('../helpers/db')

module.exports = {
  createExperienceModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO experience
          SET ?
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
  getDataExperienceByIdModel: (experienceId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience WHERE ex_id = ${experienceId}`
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
  updateDataExperienceByIdModel: (experienceId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE experience
         SET ?
       WHERE ex_id = ${experienceId}
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
  deleteDataExperienceByIdModel: (experienceId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
    experience
     WHERE ?
    `
      db.query(query, { ex_id: experienceId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getAllDataExperienceModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM experience ex JOIN engineer en ON en.en_id = ex.en_id'
      db.query(querySelect, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  updatePatchExperienceModel: (experienceId, dataColumn, date) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE experience SET ${dataColumn} WHERE ex_id = ${experienceId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getExperienceByEnIdModel: (enId) => {
    console.log(enId)
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience ex JOIN engineer en ON en.en_id = ex.en_id WHERE en.en_id = ${enId}`

      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
