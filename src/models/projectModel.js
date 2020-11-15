const db = require('../helpers/db')

module.exports = {
  createProjectModel: (dataCreate) => {
    return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO project
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
  getDataProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM project WHERE pj_id = ${projectId}`
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
  updateDataProjectByIdModel: (projectId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE project
         SET ? 
       WHERE pj_id = ${projectId}
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
  deleteDataProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
     project
     WHERE ?
    `
      db.query(query, { pj_id: projectId }, (error, results, _fields) => {
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
