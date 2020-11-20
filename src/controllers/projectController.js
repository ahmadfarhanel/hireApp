const { createProjectModel, getDataProjectByIdModel, updateDataProjectByIdModel, deleteDataProjectByIdModel } = require('../models/projectModel')
module.exports = {
  createProject: async (req, res) => {
    try {
      const { cnId, pjName, pjDesc, pjDeadline } = req.body
      const data = {
        cn_id: cnId,
        pj_project_name: pjName,
        pj_desc: pjDesc,
        pj_deadline: pjDeadline,
        pj_picture: req.file === undefined ? '' : req.file.filename
      }
      console.log(data)

      const result = await createProjectModel(data)
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
      const { cnId, pjProjectName, pjDesc, pjDeadline } = req.body
      const data = {
        image: req.file === undefined ? '' : req.file.filename
      }
      if (cnId.trim() && pjProjectName.trim() && pjDesc.trim() && pjDeadline.trim()) {
        const result = await getDataProjectByIdModel(projectId)
        if (result.length) {
          const result = await updateDataProjectByIdModel(projectId, cnId, pjProjectName, pjDesc, pjDeadline, data.image)
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
      } else {
        res.send({
          success: false,
          message: 'All Field must be filled!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error !'
      })
      console.log(error)
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
