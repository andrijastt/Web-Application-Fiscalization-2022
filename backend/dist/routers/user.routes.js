"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/getMyBuyer').post((req, res) => new user_controller_1.UserController().getMyBuyer(req, res));
userRouter.route('/searchItem').post((req, res) => new user_controller_1.UserController().searchItem(req, res));
userRouter.route('/getCheapestPrice').post((req, res) => new user_controller_1.UserController().getCheapestPrice(req, res));
userRouter.route('/getDistinctPlace').post((req, res) => new user_controller_1.UserController().getDistinctPlace(req, res));
userRouter.route('/getMyItems').post((req, res) => new user_controller_1.UserController().getMyItems(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map