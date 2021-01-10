const { createHireEngineerModel, getAllDataEngineerModel, getDataEngineerByIdModel, updateEngineerModel, searchEngineerModel, getFilterEngineer, getDataEngineerByAccountIdModel } = require('../models/engineerModel')

module.exports = {
  createHireEngineer: async (req, res) => {
    try {
      const { enJobTittle, enJobType, enOrigin, enDesc, enFtProfile } = req.body
      console.log(req.body)
      const result = await createHireEngineerModel(enJobTittle, enJobType, enOrigin, enDesc, enFtProfile)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add engineer'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit engineer Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getAllEngineer: async (_req, res, _next) => {
    try {
      const result = await getAllDataEngineerModel()
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
  },
  getDataEngineerById: async (req, res, next) => {
    try {
      const { engineerId } = req.params
      console.log(req.params)
      console.log(engineerId)
      const result = await getDataEngineerByIdModel(engineerId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Engineer with id ${engineerId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Engineer with id ${engineerId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateEngineer: async (req, res) => {
    try {
      const { engineerId } = req.params
      const { acId, enJobTittle, enJobType, enOrigin, enDesc } = req.body

      const data = {
        image: req.file === undefined ? '' : req.file.filename
      }

      console.log(req.body)
      console.log(data.image)
      if (enJobTittle.trim() && enJobType.trim() && enOrigin && enDesc.trim() && data.image.trim()) {
        const result = await getDataEngineerByIdModel(engineerId)
        if (result.length) {
          const result = await updateEngineerModel(engineerId, acId, enJobTittle, enJobType, enOrigin, enDesc, data.image)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Engineer With ID ${engineerId} has been update`
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
            message: `Engineer with id ${engineerId} not Found`
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
  searchEngineer: async (req, res) => {
    try {
      let { search, limit, page, filter } = req.query
      let searchValue = ''
      if (typeof search === 'object') {
        searchValue = Object.values(search)[0]
      } else {
        searchValue = search || ''
      }
      // const searchValue = Object.values(search)[0]
      if (!limit) {
        limit = 10
      } else {
        limit = parseInt(limit)
      }
      if (!page) {
        page = 1
      } else {
        page = parseInt(page)
      }
      const offset = (page - 1) * limit

      const result = await searchEngineerModel(searchValue, limit, offset, filter)
      console.log(result)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list engineer',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getFilterEngineer: async (req, res, _next) => {
    let { filter, limit, page } = req.query
    console.log(filter)
    console.log(req.query)
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const data = {
      filter: filter,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      const result = await getFilterEngineer(data)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project succes filter ',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data failed to filter'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
      console.log(error)
    }
  },
  getDataEngineerByAccountId: async (req, res, next) => {
    try {
      const { accountId } = req.params
      console.log(accountId)
      const result = await getDataEngineerByAccountIdModel(accountId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Engineer with id ${accountId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Engineer with id ${accountId} not found`
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  }
}
