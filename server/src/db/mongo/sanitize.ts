import { ObjectId } from 'mongodb';

export function sanitizeSearchQuery(searchQuery: Record<string, any>) {
    const sanitizedQuery = Object.entries(searchQuery).reduce(
        (query: SanitizedQuery, [key, value]: [string, any]) => {
            if (
                typeof value === 'object' ||
                key.startsWith('$') ||
                key === '_id'
            )
                return query;
            return { ...query, [key]: { $regex: value, $options: 'i' } };
        },
        {}
    );

    if (Object.prototype.hasOwnProperty.call(searchQuery, '_id')) {
        Object.defineProperty(sanitizedQuery, '_id', {
            value: new ObjectId(searchQuery._id),
            writable: false,
        });
    }
    return sanitizedQuery;
}

type SanitizedQuery = Record<
    string,
    { $regex: string | number; $options: string }
>;
