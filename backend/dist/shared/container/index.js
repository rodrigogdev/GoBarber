"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("./providers");
var AppointmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));
var UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
var UserTokenRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokenRepository"));
tsyringe_1.container.registerSingleton("AppointmentsRepository", AppointmentsRepository_1.default);
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.default);
tsyringe_1.container.registerSingleton("UserTokensRepository", UserTokenRepository_1.default);
