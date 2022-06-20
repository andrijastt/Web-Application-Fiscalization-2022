"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controllers/company.controller");
const companyRouter = express_1.default.Router();
companyRouter.route('/register').post((req, res) => new company_controller_1.CompanyController().register(req, res));
exports.default = companyRouter;
//# sourceMappingURL=company.routes.js.map