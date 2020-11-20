const db = require('../helpers/db')

module.exports = {
  createHireEngineerModel: (setData, res) => {
    const DataEngineer = {
      acId: res.insertId
    }
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO engineer SET ? '
      db.query(query, { ac_id: DataEngineer.acId }, (error, results, _fields) => {
        if (!error) {
          resolve(res)
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
  updateEngineerModel: (engineerId, acId, enJobTittle, enJobType, enOrigin, enDesc, enFtProfile) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE engineer SET ac_id = '${acId}', en_job_tittle = '${enJobTittle}', en_job_type = '${enJobType}', en_origin = '${enOrigin}', en_desc = '${enDesc}', en_foto_profile = '${enFtProfile}', en_updated_at = CURRENT_TIMESTAMP WHERE 
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
        SELECT ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type 
        FROM engineer 
               en JOIN account ac ON ac.ac_id = en.ac_id
        GROUP by ac.ac_name
        LIMIT  ${data.limit}
        OFFSET  ${data.offset}
        `
      } else if (data.filter === 'skill') {
        query = `
        SELECT ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type,
               sk.sk_name_skill 
        FROM engineer en 
               JOIN account ac ON ac.ac_id = en.ac_id
               JOIN skill sk ON sk.en_id = en.en_id       
        GROUP by sk.sk_name_skill 
        LIMIT ${data.limit}
        OFFSET ${data.offset}
        `
      } else if (data.filter === 'lokasi') {
        query = `
        SELECT ac.ac_name, 
                en.en_job_tittle, 
                en.en_job_type,
                en.en_origin 
        FROM engineer en 
                JOIN account ac ON ac.ac_id = en.ac_id      
        GROUP by en.en_origin 
        LIMIT ${data.limit}
        OFFSET ${data.offset}
        `
      } else if (data.filter === 'freelance') {
        query = `
          SELECT ac.ac_name, 
                  en.en_job_tittle, 
                  en.en_job_type
          FROM engineer en 
                  JOIN account ac ON ac.ac_id = en.ac_id 
          WHERE en.en_job_type = 'freelance'     
          GROUP by en.en_job_type
          LIMIT ${data.limit}
          OFFSET ${data.offset}
          
        `
      } else {
        query = `
          SELECT ac.ac_name, 
                  en.en_job_tittle, 
                  en.en_job_type
          FROM engineer en 
                  JOIN account ac ON ac.ac_id = en.ac_id 
          WHERE en.en_job_type = 'fulltime'         
          GROUP by en.en_job_type
          LIMIT  ${data.limit}
          OFFSET  ${data.offset}
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
