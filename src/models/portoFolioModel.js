const db = require('../helpers/db')

module.exports = {
  createPortofolioModel: (dataCreate) => {
    return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO portofolio
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
  getDataPortofolioByIdModel: (portofolioId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM portofolio WHERE pr_id = ${portofolioId}`
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
  updateDataPortofolioByIdModel: (portofolioId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE portofolio
         SET ?
       WHERE pr_id = ${portofolioId}
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
  deleteDataPortofolioByIdModel: (portofolioId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
     portofolio
     WHERE ?
    `
      db.query(query, { pr_id: portofolioId }, (error, results, _fields) => {
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
