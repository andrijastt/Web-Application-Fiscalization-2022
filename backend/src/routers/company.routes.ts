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

export default companyRouter;