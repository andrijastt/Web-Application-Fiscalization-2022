import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/get5latestReceipts').get(
    (req, res) => new UserController().get5latestReceipts(req, res)
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

userRouter.route('/getDistinctPlace').post(
    (req, res) => new UserController().getDistinctPlace(req, res)
)

userRouter.route('/getMyItems').post(
    (req, res) => new UserController().getMyItems(req, res)
)

userRouter.route('/getMyReceipts').post(
    (req, res) => new UserController().getMyReceipts(req, res)
)

export default userRouter;