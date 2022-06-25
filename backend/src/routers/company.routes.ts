import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.route('/register').post(
    (req, res) => new CompanyController().register(req, res)
)

companyRouter.route('/checkFirstTime').post(
    (req, res) => new CompanyController().checkFirstTime(req, res)
)

companyRouter.route('/getAllRegisterCompany').get(
    (req, res) => new CompanyController().getAllRegisterCompany(req, res)
)

companyRouter.route('/accept').post(
    (req, res) => new CompanyController().accept(req, res)
)

companyRouter.route('/decline').post(
    (req, res) => new CompanyController().decline(req, res)
)

companyRouter.route('/getAllActivityCodes').get(
    (req, res) => new CompanyController().getAllActivityCodes(req, res)
)

companyRouter.route('/getCatererCodes').get(
    (req, res) => new CompanyController().getCatererCodes(req, res)
)

companyRouter.route('/getStoreCodes').get(
    (req, res) => new CompanyController().getStoreCodes(req, res)
)

companyRouter.route('/getRegisterModels').get(
    (req, res) => new CompanyController().getRegisterModels(req, res)
)

companyRouter.route('/insertData').post(
    (req, res) => new CompanyController().insertData(req, res)
)

companyRouter.route('/insertCompany').post(
    (req, res) => new CompanyController().insertCompany(req, res)
)

companyRouter.route('/activate').post(
    (req, res) => new CompanyController().activate(req, res)
)

companyRouter.route('/deactivate').post(
    (req, res) => new CompanyController().deactivate(req, res)
)

companyRouter.route('/getMyStorageUntis').post(
    (req, res) => new CompanyController().getMyStorageUntis(req, res)
)

companyRouter.route('/findCompanyByPIB').post(
    (req, res) => new CompanyController().findCompanyByPIB(req, res)
)

companyRouter.route('/getCompany').post(
    (req, res) => new CompanyController().getCompany(req, res)
)

companyRouter.route('/addCustomer').post(
    (req, res) => new CompanyController().addCustomer(req, res)
)

companyRouter.route('/getMyCustomers').post(
    (req, res) => new CompanyController().getMyCustomers(req, res)
)
export default companyRouter;