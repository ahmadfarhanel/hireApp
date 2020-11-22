const { createHireExperienceModel, getDataExperienceByIdModel, updateDataExperienceByIdModel, deleteDataExperienceByIdModel, getAllDataExperienceModel } = require('../models/experienceModel')
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
          message: 'Engineer List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item engineer not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  }
}
