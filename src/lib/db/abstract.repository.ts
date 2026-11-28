import type { UpdateQuery, QueryFilter, HydratedDocument, Model, UpdateResult, Types } from "mongoose";
export abstract class AbstractRepository<T> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<HydratedDocument<T>> {
        return await this.model.create(data);
    }

    async findById(id: Types.ObjectId | string, select?: string): Promise<HydratedDocument<T> | null> {
        return await this.model.findById(id, select);
    }

    async findOne(filter: QueryFilter<T>, select?: string): Promise<HydratedDocument<T> | null> {
        return await this.model.findOne(filter, select);
    }

    async findOneAndUpdate(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<HydratedDocument<T> | null> {
        return await this.model.findOneAndUpdate(filter, update, { new: true });
    }

    async find(filter: QueryFilter<T>, select?: string): Promise<HydratedDocument<T>[]> {
        return await this.model.find(filter, select);
    }

    async updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<UpdateResult> {
        return await this.model.updateOne(filter, update);
    }

    async updateMany(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<UpdateResult> {
        return await this.model.updateMany(filter, update);
    }
}