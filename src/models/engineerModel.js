const db = require('../helpers/db')

const { getAllSkillByIdModel } = require('../models/skillModel')

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
      db.query(`UPDATE engineer SET ac_id = '${acId}', en_job_tittle = '${enJobTittle}', 
      en_job_type = '${enJobType}', en_origin = '${enOrigin}', en_desc = '${enDesc}',
      en_foto_profile = '${enFtProfile}', en_updated_at = CURRENT_TIMESTAMP WHERE 
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
    console.log(searchKey)
    console.log(searchValue)
    const query = `SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        ac.ac_email,
        ac.ac_no_hp,
        en.en_job_tittle,
        en.en_job_type,
        en.en_origin,
        sk.sk_name_skill
    FROM engineer en JOIN account ac ON (ac.ac_id = en.ac_id)
    JOIN skill sk ON (sk.en_id = en.en_id)
    WHERE ${searchKey} LIKE '%${searchValue}%'
    GROUP BY ac.ac_name
    LIMIT ${limit} 
    OFFSET ${offset}`
    db.query(query, async (err, results, _fields) => {
      if (!err) {
        const allEngineer = []
        for (let i = 0; i < results.length; i++) {
          const item = results[i]

          const dataSkill = await getAllSkillByIdModel(item.en_id)
          allEngineer[i] = {
            en_id: item.en_id,
            ac_id: item.ac_id,
            ac_name: item.ac_name,
            en_job_title: item.en_job_title,
            en_job_type: item.en_job_type,
            en_domicile: item.en_origin,
            en_profile: item.en_profile,
            en_skill: dataSkill
          }
        }
        callback(allEngineer)
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
        SELECT en.en_id,
               ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type ,
               en.en_origin,
               en.en_desc,
               sk.sk_name_skill
        FROM engineer en 
        JOIN account ac ON 
               ac.ac_id = en.ac_id
        JOIN skill sk 
               ON sk.en_id = en.en_id
               ''      
        GROUP by 
              ac.ac_name
        LIMIT  ${data.limit}
        OFFSET  ${data.offset}
        `
      } else if (data.filter === 'skill') {
        query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type ,
               en.en_origin,
               en.en_desc,
               sk.sk_name_skill
        FROM engineer en 
        JOIN account ac ON 
               ac.ac_id = en.ac_id
        LEFT JOIN skill sk 
               ON sk.en_id = en.en_id      
        GROUP by 
               ac.ac_id
        ORDER BY sk.sk_name_skill        
        LIMIT ${data.limit}
        OFFSET ${data.offset}
        `
      } else if (data.filter === 'lokasi') {
        query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type ,
               en.en_origin,
               en.en_desc,
               sk.sk_name_skill
        FROM engineer en 
        JOIN account ac ON 
               ac.ac_id = en.ac_id
        LEFT JOIN skill sk 
               ON sk.en_id = en.en_id      
        GROUP by 
               ac.ac_id
        ORDER BY sk.sk_name_skill    
        LIMIT ${data.limit}
        OFFSET ${data.offset}
        `
      } else if (data.filter === 'freelance') {
        query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type ,
               en.en_origin,
               en.en_desc,
               sk.sk_name_skill
        FROM engineer en 
        JOIN account ac ON 
               ac.ac_id = en.ac_id
        LEFT JOIN skill sk 
               ON sk.en_id = en.en_id
        WHERE en_job_type = 'freelance'               
        GROUP by 
               ac.ac_id
        ORDER BY en_job_type 
          LIMIT ${data.limit}
          OFFSET ${data.offset}
          
        `
      } else {
        query = `
        SELECT en.en_id,
               ac.ac_id,
               ac.ac_name, 
               en.en_job_tittle, 
               en.en_job_type ,
               en.en_origin,
               en.en_desc,
               sk.sk_name_skill
        FROM engineer en 
        JOIN account ac ON 
               ac.ac_id = en.ac_id
        LEFT JOIN skill sk 
               ON sk.en_id = en.en_id
        WHERE en_job_type = 'fulltime'               
        GROUP by 
               ac.ac_id
        ORDER BY en_job_type 
        LIMIT ${data.limit}
        OFFSET ${data.offset}
      `
      }

      db.query(query, async (error, results, _fields) => {
        if (!error) {
          const allEngineer = []
          for (let i = 0; i < results.length; i++) {
            const item = results[i]

            const dataSkill = await getAllSkillByIdModel(item.en_id)
            allEngineer[i] = {
              en_id: item.en_id,
              ac_id: item.ac_id,
              ac_name: item.ac_name,
              en_job_title: item.en_job_title,
              en_job_type: item.en_job_type,
              en_domicile: item.en_origin,
              en_profile: item.en_profile,
              en_skill: dataSkill
            }
          }
          resolve(allEngineer)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  getDataEngineerByAccountIdModel: (accountId) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT * FROM account ac JOIN engineer en ON ac.ac_id = en.ac_id WHERE ac.ac_id = ${accountId}`
      db.query(querySelect, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
