"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const uuid_1 = require("uuid");
const ioc_1 = require("../../common/ioc");
const service_1 = require("../service");
const user_repository_1 = require("./user.repository");
let UserService = UserService_1 = class UserService extends service_1.BaseService {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    async create(user) {
        return super.create({ ...user, userId: (0, uuid_1.v4)() });
    }
    async update(userId, user) {
        return super.update({ userId }, user);
    }
};
UserService = UserService_1 = __decorate([
    (0, ioc_1.provideSingleton)(UserService_1),
    __param(0, (0, ioc_1.inject)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map