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
  updateDataPortofolioByIdModel: (portofolioId, enId, prApplication, prDesc, prLinkPub, prLinkRepo, prTpKerja, prType, data) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE portofolio SET en_id = '${enId}', pr_application = '${prApplication}', 
      pr_desc = '${prDesc}', pr_link_pub = '${prLinkPub}', pr_link_repo = '${prLinkRepo}', 
      pr_tp_kerja = '${prTpKerja}', pr_type = '${prType}', pr_gambar = '${data}' WHERE pr_id = '${portofolioId}'`
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
  },
  getAllDataPortofolioModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM portofolio pr JOIN engineer en ON en.en_id = pr.en_id'
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
