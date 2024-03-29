"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/loginAdmin').post((req, res) => new admin_controller_1.AdminController().loginAdmin(req, res));
adminRouter.route('/insertUser').post((req, res) => new admin_controller_1.AdminController().insertUser(req, res));
adminRouter.route('/getAllDailyReviews').get((req, res) => new admin_controller_1.AdminController().getAllDailyReviews(req, res));
adminRouter.route('/getSearchDailyReviews').post((req, res) => new admin_controller_1.AdminController().getSearchDailyReviews(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map