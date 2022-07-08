import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/loginAdmin').post(
    (req, res) => new AdminController().loginAdmin(req, res)
)

adminRouter.route('/insertUser').post(
    (req, res) => new AdminController().insertUser(req, res)
)

export default adminRouter;