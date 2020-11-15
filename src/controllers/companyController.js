const { createHireCompanyModel, getAllDataCompanyModel, getDataCompanyByIdModel, updateCompanyModel } = require('../models/companyModel')
module.exports = {
  createHireCompany: async (req, res) => {
    try {
      const { cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, cnFtProfile } = req.body
      console.log(req.body)
      const result = await createHireCompanyModel(cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, cnFtProfile)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Company'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit Company Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getAllCompany: async (_req, res, _next) => {
    try {
      const result = await getAllDataCompanyModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Company List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Company not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  getDataCompanyById: async (req, res, next) => {
    try {
      const { companyId } = req.params
      console.log(req.params)
      console.log(companyId)
      const result = await getDataCompanyByIdModel(companyId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Company with id ${companyId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Company with id ${companyId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateCompany: async (req, res) => {
    try {
      const { companyId } = req.params
      const { cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, cnFtProfile } = req.body
      console.log(req.body)

      if (cnName.trim() && cnPosition.trim() && cnPart.trim() && cnCity.trim() && cnDesc.trim() && cnInstagram.trim() && cnLinkedIn.trim() && cnFtProfile.trim()) {
        const result = await getDataCompanyByIdModel(companyId)
        if (result.length) {
          const result = await updateCompanyModel(companyId, cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, cnFtProfile)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Company With ID ${companyId} has been update`
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
            message: `Company with id ${companyId} not Found`
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
        message: 'Internal server error!'
      })
    }
  }
}
