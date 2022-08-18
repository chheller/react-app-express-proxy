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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("../../common/logger"));
let BaseRepository = class BaseRepository {
    constructor(connection, modelName, schema) {
        this.connection = connection;
        this.modelName = modelName;
        this.schema = schema;
        this.logger = logger_1.default.child({ repository: this.modelName });
        this.logger.info(`Creating repository for ${this.modelName} schema.`);
        this.model = this.connection.model(this.modelName, this.schema);
        this.logger.info(`Created model for ${this.model.collection.name} collection`);
    }
    async create(entity) {
        try {
            const doc = await this.model.create(new this.model(entity));
            return doc.toJSON();
        }
        catch (err) {
            this.logger.error(`Error on collection:${this.model.collection.name} performing create() query`, err);
            throw new Error('Error performing requested operation');
        }
    }
    update(query, model) {
        throw new Error('Method not implemented.');
    }
    delete(query) {
        throw new Error('Method not implemented.');
    }
    async find(query, options) {
        const { skip, limit, sort } = {
            skip: 0,
            limit: 250,
            ...options,
        };
        try {
            this.logger.info(`Querying ${this.modelName}`, { query, options });
            return this.model
                .find(query)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .lean()
                .exec();
        }
        catch (err) {
            throw err;
        }
    }
    async findOne(query) {
        try {
            this.logger.info(`Querying ${this.modelName}`, { query });
            const result = (await this.model
                .findOne(query)
                .lean()
                .exec());
            this.logger.info('Got result from query', { result });
            return result;
        }
        catch (err) {
            this.logger.error(`Error on collection:${this.model.collection.name} performing findOne() query`, err);
            throw new Error(`Error performing requested operation`);
        }
    }
};
BaseRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(1, (0, inversify_1.unmanaged)()),
    __param(2, (0, inversify_1.unmanaged)()),
    __metadata("design:paramtypes", [mongoose_1.Connection, String, mongoose_1.Schema])
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=mongo.repository.js.map