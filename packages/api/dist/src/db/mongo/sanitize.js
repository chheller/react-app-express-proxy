"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeSearchQuery = void 0;
const mongodb_1 = require("mongodb");
function sanitizeSearchQuery(searchQuery) {
    const sanitizedQuery = Object.entries(searchQuery).reduce((query, [key, value]) => {
        if (typeof value === 'object' || key.startsWith('$') || key === '_id')
            return query;
        return { ...query, [key]: { $regex: value, $options: 'i' } };
    }, {});
    if (Object.prototype.hasOwnProperty.call(searchQuery, '_id')) {
        Object.defineProperty(sanitizedQuery, '_id', {
            value: new mongodb_1.ObjectId(searchQuery._id),
            writable: false,
        });
    }
    return sanitizedQuery;
}
exports.sanitizeSearchQuery = sanitizeSearchQuery;
//# sourceMappingURL=sanitize.js.map