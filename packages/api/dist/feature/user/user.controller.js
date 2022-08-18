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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const ioc_1 = require("../../common/ioc");
const logger_1 = __importDefault(require("../../common/logger"));
const user_service_1 = require("./user.service");
let UserController = UserController_1 = class UserController extends tsoa_1.Controller {
    constructor(service) {
        super();
        this.service = service;
        this.logger = logger_1.default.child({ controller: 'User Controller' });
        this.logger.info('Creating User Controller');
    }
    async getUser(userId) {
        this.logger.info('Fetching user', { userId });
        return this.service.findById({ userId });
    }
    async getUsers(attribute, value, skip, limit, sort) {
        this.logger.info('Updating user', {
            [attribute]: value,
            skip,
            limit,
            sort,
        });
        return this.service.find({ [attribute]: value }, { skip, limit, sort });
    }
    async createUser(user) {
        this.logger.info('Creating user', { user });
        return this.service.create(user);
    }
    async updateUser(userPatch) {
        this.logger.info('Updating user', { user: userPatch });
        throw new Error('Method not implemented');
    }
    async deleteUser(userId) {
        return this.service.delete(userId);
    }
};
__decorate([
    (0, tsoa_1.Get)(':id'),
    __param(0, (0, tsoa_1.Path)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Get)(':attribute/:value'),
    __param(0, (0, tsoa_1.Path)('attribute')),
    __param(1, (0, tsoa_1.Path)('value')),
    __param(2, (0, tsoa_1.Query)('skip')),
    __param(3, (0, tsoa_1.Query)('limit')),
    __param(4, (0, tsoa_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Post)(''),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Patch)(':userId'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)(':userId'),
    __param(0, (0, tsoa_1.Path)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = UserController_1 = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, ioc_1.provideSingleton)(UserController_1),
    __param(0, (0, ioc_1.inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map