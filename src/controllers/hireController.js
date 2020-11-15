const { createHireModel, getDataHireByIdModel, updateDataHireByIdModel, deleteDataHireByIdModel } = require('../models/hireModel')
module.exports = {
  createHire: async (req, res) => {
    try {
      const { hrPrice, hrMessage, hrStatus, hrDateConfirm } = req.body
      console.log(req.body)
      const result = await createHireModel(hrPrice, hrMessage, hrStatus, hrDateConfirm)
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
  getDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      console.log(req.params)
      console.log(hireId)
      const result = await getDataHireByIdModel(hireId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${hireId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${hireId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      const dataId = await getDataHireByIdModel(hireId)
      const dataUpdate = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateDataHireByIdModel(hireId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${hireId} has been update`
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
          message: `Project with id ${hireId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      const dataId = await getDataHireByIdModel(hireId)
      if (dataId.length) {
        const result = await deleteDataHireByIdModel(hireId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${hireId} has been delete`
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
          message: `Project with id ${hireId} not Found`
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
