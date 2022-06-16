import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.route('/images').post(
    (req, res) => new CompanyController().upload(req, res)
)

export default companyRouter;