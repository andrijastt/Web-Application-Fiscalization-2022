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

companyRouter.route('/getMyItems').post(
    (req, res) => new CompanyController().getMyItems(req, res)
)

companyRouter.route('/addItem').post(
    (req, res) => new CompanyController().addItem(req, res)
)

companyRouter.route('/createCategory').post(
    (req, res) => new CompanyController().createCategory(req, res)
)

companyRouter.route('/getMyCategories').post(
    (req, res) => new CompanyController().getMyCategories(req, res)
)

companyRouter.route('/getMyRegisters').post(
    (req, res) => new CompanyController().getMyRegisters(req, res)
)

companyRouter.route('/getMyStores').post(
    (req, res) => new CompanyController().getMyStores(req, res)
)

companyRouter.route('/searchItem').post(
    (req, res) => new CompanyController().searchItem(req, res)
)

companyRouter.route('/setItemCategory').post(
    (req, res) => new CompanyController().setItemCategory(req, res)
)

companyRouter.route('/getMyPlaces').post(
    (req, res) => new CompanyController().getMyPlaces(req, res)
)

companyRouter.route('/getItemStats').post(
    (req, res) => new CompanyController().getItemStats(req, res)
)

companyRouter.route('/giveReceipt').post(
    (req, res) => new CompanyController().giveReceipt(req, res)
)

companyRouter.route('/getMyDailyReviews').post(
    (req, res) => new CompanyController().getMyDailyReviews(req, res)
)

export default companyRouter;