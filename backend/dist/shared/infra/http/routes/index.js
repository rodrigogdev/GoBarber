"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var appointments_routes_1 = __importDefault(require("@modules/appointments/infra/http/routes/appointments.routes"));
var users_routes_1 = __importDefault(require("@modules/users/infra/http/routes/users.routes"));
var sessions_routes_1 = __importDefault(require("@modules/users/infra/http/routes/sessions.routes"));
var password_routes_1 = __importDefault(require("@modules/users/infra/http/routes/password.routes"));
var routes = express_1.default.Router();
routes.use("/appointments", appointments_routes_1.default);
routes.use("/users", users_routes_1.default);
routes.use("/sessions", sessions_routes_1.default);
routes.use("/password", password_routes_1.default);
exports.default = routes;
