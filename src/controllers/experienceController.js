const { createHireExperienceModel, getDataExperienceByIdModel, updateDataExperienceByIdModel, deleteDataExperienceByIdModel, getAllDataExperienceModel, updatePatchExperienceModel } = require('../models/experienceModel')
module.exports = {
  createHireExperience: async (req, res) => {
    try {
      const { exPosition, exCompany, exStart, exEnd, exDesc } = req.body
      console.log(req.body)
      const result = await createHireExperienceModel(exPosition, exCompany, exStart, exEnd, exDesc)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Project'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit Project Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getDataExperienceById: async (req, res) => {
    try {
      const { experienceId } = req.params
      console.log(req.params)
      console.log(experienceId)
      const result = await getDataExperienceByIdModel(experienceId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${experienceId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${experienceId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataExperienceById: async (req, res) => {
    try {
      const { experienceId } = req.params
      const dataId = await getDataExperienceByIdModel(experienceId)
      const dataUpdate = req.body
      if (dataId.length) {
        const result = await updateDataExperienceByIdModel(experienceId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${experienceId} has been update`
          })
        } else {
          res.status(400).send({
            status: false,
            message: 'Failed to Update Data '
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: `Project with id ${experienceId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataExperienceById: async (req, res) => {
    try {
      const { experienceId } = req.params
      const dataId = await getDataExperienceByIdModel(experienceId)
      if (dataId.length) {
        const result = await deleteDataExperienceByIdModel(experienceId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${experienceId} has been delete`
          })
        } else {
          res.status(400).send({
            status: false,
            message: 'Failed to delete Data '
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: `Project with id ${experienceId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  getAllExperience: async (_req, res, _next) => {
    try {
      const result = await getAllDataExperienceModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Experience List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  updatePatchExperience: async (req, res) => {
    try {
      const { experienceId } = req.params
      const date = new Date()
      const {
        en_id = '',
        ex_position = '',
        ex_company = '',
        ex_start = '',
        ex_end = '',
        ex_desc = ''
      } = req.body

      if (en_id.trim() || ex_position.trim() || ex_company.trim() || ex_start.trim() || ex_end.trim() || ex_desc.trim()) {
        const result = await getDataExperienceByIdModel(experienceId)
        if (result.length) {
          const dataColumn = Object.entries(req.body).map(item => {
            // untuk melihat value akhir apakah int atau string, jika int maka tanpa kutip, jika string maka kutip
            const queryDynamic = parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]} = '${item[1]}'`
            return queryDynamic
          })
          const result = await updatePatchExperienceModel(experienceId, dataColumn, date)
          if (result.affectedRows) {
            res.status(200).send({
              succes: true,
              message: 'Data Berhasil Di Update'
            })
          } else {
            res.status(400).send({
              succes: true,
              message: 'Failed To update Data '
            })
          }
        } else {
          res.status(404).send({
            succes: true,
            message: `Experience with id ${experienceId} not Found `
          })
        }
      } else {
        res.status(400).send({
          succes: true,
          message: 'Some Field must be filled'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
      console.log(error)
    }
  }
}
