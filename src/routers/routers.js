const { Router } = require('express')
const { createHireAccount, getAllData, getAccountById, deleteAccount, updateAccount, updatePatchAccount } = require('../controllers/accountController')
const { getAllCompany, getDataCompanyById, updateCompany } = require('../controllers/companyController')
const { getAllEngineer, getDataEngineerById, updateEngineer, searchEngineer, getFilterEngineer } = require('../controllers/engineerController')
const { createHireExperience, getDataExperienceById, updateDataExperienceById, deleteDataExperienceById } = require('../controllers/experienceController')
const { createHire, getDataHireById, updateDataHireById, deleteDataHireById, updateStatusHireById } = require('../controllers/hireController')
const { createPortofolio, getDataPortofolioById, updateDataportofolioById, deleteDataportofolioById } = require('../controllers/portoFolioController')
const { createProject, getDataProjectById, updateDataProjectById, deleteDataProjectById } = require('../controllers/projectController')
const { createSkill, getDataSkillById, updateDataSkillById, deleteDataSkillById } = require('../controllers/skillController')

const router = Router()

router.post('/account/createAccount', createHireAccount)
router.get('/account', getAllData)
router.get('/account/:accountId', getAccountById)
router.delete('/account/:accountId', deleteAccount)
router.put('/account/:accountId', updateAccount)
router.patch('/account/:accountId', updatePatchAccount)

router.get('/company/:companyId', getDataCompanyById)
router.get('/company', getAllCompany)
router.put('/company/:companyId', updateCompany)

router.get('/engineersearch', searchEngineer)
router.get('/engineer', getAllEngineer)
router.get('/engineer/:engineerId', getDataEngineerById)
router.put('/engineer/:engineerId', updateEngineer)
router.get('/filter', getFilterEngineer)

router.post('/experience/createExperience', createHireExperience)
router.get('/experience/:experienceId', getDataExperienceById)
router.put('/experience/:experienceId', updateDataExperienceById)
router.delete('/experience/:experienceId', deleteDataExperienceById)

router.post('/hire/createHire', createHire)
router.get('/hire/:hireId', getDataHireById)
router.put('/hire/:hireId', updateDataHireById)
router.put('/hire/status/:hireId', updateStatusHireById)
router.delete('/hire/:hireId', deleteDataHireById)

router.post('/portofolio/createPortofolio', createPortofolio)
router.get('/portofolio/:portofolioId', getDataPortofolioById)
router.put('/portofolio/:portofolioId', updateDataportofolioById)
router.delete('/portofolio/:portofolioId', deleteDataportofolioById)

router.post('/project/createProject', createProject)
router.get('/project/:projectId', getDataProjectById)
router.put('/project/:projectId', updateDataProjectById)
router.delete('/project/:projectId', deleteDataProjectById)

router.post('/skill/createSkill', createSkill)
router.get('/skill/:skillId', getDataSkillById)
router.put('/skill/:skillId', updateDataSkillById)
router.delete('/skill/:skillId', deleteDataSkillById)

module.exports = router
