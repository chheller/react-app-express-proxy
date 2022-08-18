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
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongoose_1 = require("mongoose");
const ioc_1 = require("../../common/ioc");
const mongo_repository_1 = require("../../db/mongo/mongo.repository");
let UserRepository = UserRepository_1 = class UserRepository extends mongo_repository_1.BaseRepository {
    constructor(connection) {
        super(connection, 'user', new mongoose_1.Schema({
            givenName: String,
            familyName: String,
            preferredName: String,
            emailAddress: String,
            userId: String,
            avatarUrl: String,
        }));
    }
};
UserRepository = UserRepository_1 = __decorate([
    (0, ioc_1.provideSingleton)(UserRepository_1),
    __param(0, (0, ioc_1.inject)(mongoose_1.Connection)),
    __metadata("design:paramtypes", [mongoose_1.Connection])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map