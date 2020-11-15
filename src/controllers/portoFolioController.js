const { createPortofolioModel, getDataPortofolioByIdModel, updateDataPortofolioByIdModel, deleteDataPortofolioByIdModel } = require('../models/portoFolioModel')
module.exports = {
  createPortofolio: async (req, res) => {
    try {
      const dataCreate = req.body
      const result = await createPortofolioModel(dataCreate)
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
  getDataPortofolioById: async (req, res) => {
    try {
      const { portofolioId } = req.params
      console.log(req.params)
      console.log(portofolioId)
      const result = await getDataPortofolioByIdModel(portofolioId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${portofolioId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${portofolioId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataportofolioById: async (req, res) => {
    try {
      const { portofolioId } = req.params
      const dataId = await getDataPortofolioByIdModel(portofolioId)
      const dataUpdate = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateDataPortofolioByIdModel(portofolioId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${portofolioId} has been update`
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
          message: `Project with id ${portofolioId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataportofolioById: async (req, res) => {
    try {
      const { portofolioId } = req.params
      const dataId = await getDataPortofolioByIdModel(portofolioId)
      if (dataId.length) {
        const result = await deleteDataPortofolioByIdModel(portofolioId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Project With ID ${portofolioId} has been delete`
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
          message: `Project with id ${portofolioId} not Found`
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
