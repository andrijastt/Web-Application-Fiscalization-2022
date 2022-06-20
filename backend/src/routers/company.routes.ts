import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.route('/register').post(
    (req, res) => new CompanyController().register(req, res)
)

export default companyRouter;