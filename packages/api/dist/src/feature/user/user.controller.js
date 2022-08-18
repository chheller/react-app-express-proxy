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
const base_controller_1 = __importDefault(require("../base-controller"));
const user_service_1 = require("./user.service");
let UserController = UserController_1 = class UserController extends base_controller_1.default {
    constructor(service) {
        super();
        this.service = service;
        this.logger.info('Creating User Controller');
    }
    async getUser(userId) {
        this.logger.debug('Querying user', { userId, method: 'getUser' });
        const user = await this.service.findById({ userId });
        if (user == null) {
            this.logger.debug('User not found', { userId, method: 'getUser' });
        }
        else {
            this.logger.debug('Found user', { userId, user, method: 'getUser' });
        }
        return user;
    }
    async getUsers(attribute, value, skip, limit, sort) {
        this.logger.info('Querying users', {
            method: 'getUsers',
            params: {
                [attribute]: value,
                skip,
                limit,
                sort,
            },
        });
        return this.service.find({ [attribute]: value }, { skip, limit, sort });
    }
    async createUser(user) {
        this.logger.info('Creating new user', { user, method: 'createUser' });
        return this.service.create(user);
    }
    async updateUser(userId, userPatch) {
        this.logger.info('Updating User', {
            userId,
            user: userPatch,
            method: 'updateUser',
        });
        const updatedUser = await this.service.update(userId, userPatch);
        if (updatedUser == undefined) {
            this.logger.info(`Found no user with userId:${userId}`);
            this.setStatus(404);
            return { error: 'Error finding user with given userId' };
        }
        this.logger.info(`Found and updated user with userId:${userId}`, {
            updatedUser,
        });
        return updatedUser;
    }
    async deleteUser(userId) {
        this.logger.info('Deleting user', { userId, method: 'deleteUser' });
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
    __param(0, (0, tsoa_1.Path)('userId')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
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