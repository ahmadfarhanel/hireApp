const db = require('../helpers/db')

module.exports = {
  createSkillModel: (dataCreate) => {
    return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO skill
          SET ?
        `

      db.query(query, dataCreate, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  getDataSkillByIdModel: (skillId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM skill WHERE sk_id = ${skillId}`
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
  updateDataSkillByIdModel: (skillId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE skill
         SET ? 
       WHERE sk_id = ${skillId}
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
  deleteDataSkillByIdModel: (skillId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
     skill
     WHERE ?
    `
      db.query(query, { sk_id: skillId }, (error, results, _fields) => {
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
