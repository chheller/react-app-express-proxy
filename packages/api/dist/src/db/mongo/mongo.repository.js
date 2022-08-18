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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const Repository_1 = require("../Repository");
let MongoRepository = class MongoRepository extends Repository_1.Repository {
    constructor(connection, modelName, schema) {
        super();
        this.connection = connection;
        this.modelName = modelName;
        this.schema = schema;
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
    async update(query, model) {
        try {
            const doc = await this.model.findOneAndUpdate(query, model);
            return doc?.toJSON();
        }
        catch (err) {
            this.logger.error(`Error on collection:${this.model.collection.name} performing update() query`);
            throw new Error('Error performing requested operation');
        }
    }
    async updateMany(query, models) {
        throw new Error('Method not implemented.');
    }
    async delete(query) {
        throw new Error('Method not implemented.');
    }
    async find(query, options) {
        const { skip, limit, sort } = {
            skip: 0,
            limit: 25,
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
MongoRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(1, (0, inversify_1.unmanaged)()),
    __param(2, (0, inversify_1.unmanaged)()),
    __metadata("design:paramtypes", [mongoose_1.Connection, String, mongoose_1.Schema])
], MongoRepository);
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=mongo.repository.js.map