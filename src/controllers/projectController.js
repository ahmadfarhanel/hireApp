const { createProjectModel, getDataProjectByIdModel, updateDataProjectByIdModel, deleteDataProjectByIdModel } = require('../models/projectModel')
module.exports = {
  createProject: async (req, res) => {
    try {
      const dataCreate = req.body
      const result = await createProjectModel(dataCreate)
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
  getDataProjectById: async (req, res) => {
    try {
      const { projectId } = req.params
      console.log(req.params)
      console.log(projectId)
      const result = await getDataProjectByIdModel(projectId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${projectId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${projectId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataProjectById: async (req, res) => {
    try {
      const { projectId } = req.params
      const dataId = await getDataProjectByIdModel(projectId)
      const dataUpdate = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateDataProjectByIdModel(projectId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${projectId} has been update`
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
          message: `Project with id ${projectId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataProjectById: async (req, res) => {
    try {
      const { projectId } = req.params
      const dataId = await getDataProjectByIdModel(projectId)
      if (dataId.length) {
        const result = await deleteDataProjectByIdModel(projectId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${projectId} has been delete`
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
          message: `Project with id ${projectId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  }
}
