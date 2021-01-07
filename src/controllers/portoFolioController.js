const { createPortofolioModel, getDataPortofolioByIdModel, updateDataPortofolioByIdModel, deleteDataPortofolioByIdModel, getAllDataPortofolioModel, updatePatchPortofolioModel, getPortofolioByEnIdModel } = require('../models/portoFolioModel')
module.exports = {
  createPortofolio: async (req, res) => {
    try {
      const { enId, prApplication, prDesc, prLinkPub, prLinkRepo, prTpKerja, prType } = req.body
      const data = {
        en_id: enId,
        pr_application: prApplication,
        pr_desc: prDesc,
        pr_link_pub: prLinkPub,
        pr_link_repo: prLinkRepo,
        pr_tp_kerja: prTpKerja,
        pr_type: prType,
        pr_gambar: req.file === undefined ? '' : req.file.filename
      }
      console.log(data)
      const result = await createPortofolioModel(data)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Portofolio'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit Portofolio Failed'
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
          message: `Portofolio with id ${portofolioId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Portofolio with id ${portofolioId} not found`
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
      const { enId, prApplication, prDesc, prLinkPub, prLinkRepo, prTpKerja, prType } = req.body
      const data = {
        image: req.file === undefined ? '' : req.file.filename
      }

      if (prApplication.trim() && prDesc.trim() && prLinkPub && prLinkRepo.trim() && prTpKerja.trim() && prType.trim()) {
        const result = await getDataPortofolioByIdModel(portofolioId)
        if (result.length) {
          const result = await updateDataPortofolioByIdModel(portofolioId, enId, prApplication, prDesc, prLinkPub, prLinkRepo, prTpKerja, prType, data.image)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Portofolio With ID ${portofolioId} has been update`
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
            message: `Portofolio with id ${portofolioId} not Found`
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
            message: `Portofolio With ID ${portofolioId} has been delete`
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
          message: `Portofolio with id ${portofolioId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  getAllPortofolio: async (_req, res, _next) => {
    try {
      const result = await getAllDataPortofolioModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Portofolio List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Portofolio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  updatePatchPortofolio: async (req, res) => {
    try {
      const { portofolioId } = req.params
      const result = await getDataPortofolioByIdModel(portofolioId)
      const image = req.file === undefined ? result[0].pr_gambar : req.file.filename
      if (result.length) {
        const data = {
          ...req.body,
          pr_gambar: image
        }
        const dataColumn = Object.entries(data).map(item => {
          // untuk melihat value akhir apakah int atau string, jika int maka tanpa kutip, jika string maka kutip
          const queryDynamic = parseInt(item[1]) > 0 ? `${item[0]} = ${item[1]}` : `${item[0]} = '${item[1]}'`
          return queryDynamic
        })
        const result = await updatePatchPortofolioModel(portofolioId, dataColumn)
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
          message: `Experience with id ${portofolioId} not Found `
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
  getPortofolioeByEnId: async (req, res) => {
    try {
      const { engineerId } = req.params
      const result = await getPortofolioByEnIdModel(engineerId)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'portofolio List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item portofolio not found!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  }
}
