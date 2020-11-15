const db = require('../helpers/db')

module.exports = {
  createHireEngineerModel: (acId) => {
    console.log(acId)
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO engineer SET ? '
      db.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getAllDataEngineerModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM engineer en JOIN account ac ON ac.ac_id = en.ac_id'
      db.query(querySelect, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getDataEngineerByIdModel: (engineerId) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT * FROM engineer en JOIN account ac ON ac.ac_id = en.ac_id WHERE en_id = ${engineerId}`
      db.query(querySelect, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateEngineerModel: (engineerId, enJobTittle, enJobType, enOrigin, enDesc, enFtProfile) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE engineer SET en_job_tittle = '${enJobTittle}', en_job_type = '${enJobType}', en_origin = '${enOrigin}', en_desc = '${enDesc}', en_ft_profile = '${enFtProfile}', en_updated_at = CURRENT_TIMESTAMP WHERE 
      en_id = '${engineerId}'`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  searchEngineerModel: (searchKey, searchValue, limit, offset, callback) => {
    const query = `SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        ac.ac_email,
        ac.ac_no_hp,
        en.en_job_tittle,
        en.en_job_type,
        en.en_origin
    FROM engineer en JOIN account ac ON (ac.ac_id = en.ac_id)
    JOIN skill sk ON (sk.en_id = en.en_id)
    WHERE ${searchKey} LIKE '%${searchValue}%'
    GROUP BY ac.ac_name
    LIMIT ${limit} 
    OFFSET ${offset}`
    db.query(query, (err, result, _fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  getFilterEngineer: (data) => {
    return new Promise((resolve, reject) => {
      let query

      if (data.filter === 'name') {
        query = `
          SELECT ac_name FROM account
        `
      } else if (data.filter === 'skill') {
        query = `
          SELECT sk_name_skill FROM skill
        `
      } else if (data.filter === 'lokasi') {
        query = `
          SELECT en_origin FROM engineer
        `
      } else if (data.filter === 'freelance') {
        query = `
          SELECT * FROM engineer WHERE en_job_type = 'freelance'
        `
      } else if (data.filter === 'fulltime') {
        query = `
        SELECT * FROM engineer WHERE en_job_type = 'fulltime'
      `
      }

      db.query(query, (error, results, _fields) => {
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
