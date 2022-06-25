"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controllers/company.controller");
const companyRouter = express_1.default.Router();
companyRouter.route('/register').post((req, res) => new company_controller_1.CompanyController().register(req, res));
companyRouter.route('/checkFirstTime').post((req, res) => new company_controller_1.CompanyController().checkFirstTime(req, res));
companyRouter.route('/getAllRegisterCompany').get((req, res) => new company_controller_1.CompanyController().getAllRegisterCompany(req, res));
companyRouter.route('/accept').post((req, res) => new company_controller_1.CompanyController().accept(req, res));
companyRouter.route('/decline').post((req, res) => new company_controller_1.CompanyController().decline(req, res));
companyRouter.route('/getAllActivityCodes').get((req, res) => new company_controller_1.CompanyController().getAllActivityCodes(req, res));
companyRouter.route('/getCatererCodes').get((req, res) => new company_controller_1.CompanyController().getCatererCodes(req, res));
companyRouter.route('/getStoreCodes').get((req, res) => new company_controller_1.CompanyController().getStoreCodes(req, res));
companyRouter.route('/getRegisterModels').get((req, res) => new company_controller_1.CompanyController().getRegisterModels(req, res));
companyRouter.route('/insertData').post((req, res) => new company_controller_1.CompanyController().insertData(req, res));
companyRouter.route('/insertCompany').post((req, res) => new company_controller_1.CompanyController().insertCompany(req, res));
companyRouter.route('/activate').post((req, res) => new company_controller_1.CompanyController().activate(req, res));
companyRouter.route('/deactivate').post((req, res) => new company_controller_1.CompanyController().deactivate(req, res));
companyRouter.route('/getMyStorageUntis').post((req, res) => new company_controller_1.CompanyController().getMyStorageUntis(req, res));
companyRouter.route('/findCompanyByPIB').post((req, res) => new company_controller_1.CompanyController().findCompanyByPIB(req, res));
companyRouter.route('/getCompany').post((req, res) => new company_controller_1.CompanyController().getCompany(req, res));
exports.default = companyRouter;
//# sourceMappingURL=company.routes.js.map