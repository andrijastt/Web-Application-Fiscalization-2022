import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/loginAdmin').post(
    (req, res) => new AdminController().loginAdmin(req, res)
)

export default adminRouter;