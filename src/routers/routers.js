const { Router } = require('express')

const { registerAccount, getAllData, getAccountById, deleteAccount, updateAccount, updatePatchAccount, getAllAccount } = require('../controllers/accountController')
const { getAllCompany, getDataCompanyById, updateCompany, updatePatchCompany, getDataCompanyByAccountId } = require('../controllers/companyController')
const { getAllEngineer, getDataEngineerById, updateEngineer, searchEngineer, getFilterEngineer, getDataEngineerByAccountId } = require('../controllers/engineerController')
const { createHireExperience, getDataExperienceById, updateDataExperienceById, deleteDataExperienceById, getAllExperience, updatePatchExperience } = require('../controllers/experienceController')
const { createHire, getDataHireById, updateDataHireById, deleteDataHireById, updateStatusHireById, getAllDataHire, getHireByEnId, getHireByProjectId } = require('../controllers/hireController')
const { createPortofolio, getDataPortofolioById, updateDataportofolioById, deleteDataportofolioById, getAllPortofolio, updatePatchPortofolio } = require('../controllers/portoFolioController')
const { createProject, getDataProjectById, updateDataProjectById, deleteDataProjectById, getAllProject, updatePatchProject, getProjectByCnId } = require('../controllers/projectController')
const { createSkill, getDataSkillById, updateDataSkillById, deleteDataSkillById, getAllSkill } = require('../controllers/skillController')
const { authorizationEngineer, authorizationCompany } = require('../../middleware/auth')
const uploadImage = require('../../middleware/multer')

const router = Router()

router.post('/account/createAccount', registerAccount)
router.get('/account', getAllData)
router.get('/acc', getAllAccount)
router.get('/account/:accountId', getAccountById)
router.delete('/account/:accountId', deleteAccount)
router.put('/account/:accountId', updateAccount)
router.patch('/account/:accountId', updatePatchAccount)

router.get('/company/:companyId', authorizationCompany, getDataCompanyById)
router.get('/company/account/:accountId', authorizationCompany, getDataCompanyByAccountId)
router.get('/company', authorizationCompany, getAllCompany)
router.put('/company/:companyId', authorizationCompany, uploadImage, updateCompany)
router.patch('/company/:companyId', uploadImage, updatePatchCompany)

router.get('/engineersearch', authorizationEngineer, searchEngineer)
router.get('/engineer', authorizationCompany, getAllEngineer)
router.get('/engineer/:engineerId', authorizationEngineer, getDataEngineerById)
router.get('/engineer/account/:accountId', authorizationEngineer, getDataEngineerByAccountId)
router.put('/engineer/:engineerId', authorizationEngineer, uploadImage, updateEngineer)
router.get('/filter', authorizationEngineer, getFilterEngineer)

router.get('/experience', authorizationEngineer, getAllExperience)
router.post('/experience/createExperience', authorizationEngineer, createHireExperience)
router.get('/experience/:experienceId', authorizationEngineer, getDataExperienceById)
router.put('/experience/:experienceId', authorizationEngineer, updateDataExperienceById)
router.delete('/experience/:experienceId', authorizationEngineer, deleteDataExperienceById)
router.patch('/experience/:experienceId', updatePatchExperience)

router.get('/hire', authorizationCompany, getAllDataHire)
router.get('/hire/project/:pjId', authorizationCompany, getHireByProjectId)
router.get('/hireByEngineer/:engineerId', authorizationEngineer, getHireByEnId)
router.post('/hire/createHire', authorizationCompany, createHire)
router.get('/hire/:hireId', authorizationCompany, getDataHireById)
router.put('/hire/:hireId', authorizationCompany, updateDataHireById)
router.put('/hire/status/:hireId', authorizationEngineer, updateStatusHireById)
router.delete('/hire/:hireId', authorizationCompany, deleteDataHireById)

router.get('/portofolio', authorizationEngineer, getAllPortofolio)
router.post('/portofolio/createPortofolio', authorizationEngineer, uploadImage, createPortofolio)
router.get('/portofolio/:portofolioId', authorizationEngineer, getDataPortofolioById)
router.put('/portofolio/:portofolioId', authorizationEngineer, uploadImage, updateDataportofolioById)
router.delete('/portofolio/:portofolioId', authorizationEngineer, deleteDataportofolioById)
router.patch('/portofolio/:portofolioId', uploadImage, updatePatchPortofolio)

router.get('/project', authorizationCompany, getAllProject)
router.post('/project/createProject', authorizationCompany, uploadImage, createProject)
router.get('/project/:projectId', authorizationCompany, getDataProjectById)
router.put('/project/:projectId', authorizationCompany, uploadImage, updateDataProjectById)
router.delete('/project/:projectId', authorizationCompany, deleteDataProjectById)
router.patch('/project/:projectId', uploadImage, updatePatchProject)
router.get('/projectByCompany/:companyId', getProjectByCnId)

router.post('/skill/createSkill', authorizationEngineer, createSkill)
router.get('/skill/:skillId', authorizationEngineer, getDataSkillById)
router.put('/skill/:skillId', authorizationEngineer, updateDataSkillById)
router.delete('/skill/:skillId', authorizationEngineer, deleteDataSkillById)
router.get('/skill', getAllSkill)

module.exports = router
