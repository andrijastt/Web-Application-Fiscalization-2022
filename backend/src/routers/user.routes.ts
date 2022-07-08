import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getMyBuyer').post(
    (req, res) => new UserController().getMyBuyer(req, res)
)

userRouter.route('/searchItem').post(
    (req, res) => new UserController().searchItem(req, res)
)

userRouter.route('/getCheapestPrice').post(
    (req, res) => new UserController().getCheapestPrice(req, res)
)

userRouter.route('/getDistinctStorageUnits').post(
    (req, res) => new UserController().getDistinctStorageUnits(req, res)
)

userRouter.route('/getMyItems').post(
    (req, res) => new UserController().getMyItems(req, res)
)

export default userRouter;