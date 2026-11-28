import type { HydratedDocument, Types, UpdateResult } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository.js";
import type { IUser } from "../interface/user.interface.js"
import { UserModel } from "../model/user.model.js"

export class UserRepository extends AbstractRepository<IUser> {

    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string, includePassword: boolean = false): Promise<HydratedDocument<IUser> | null> {
        return await this.findOne({ email: email, isDeleted: false }, includePassword ? "+password" : undefined);
    }

    async findByGoogleId(googleId: string): Promise<HydratedDocument<IUser> | null> {
        return await this.findOne({ googleId: googleId, isDeleted: false });
    }

    async markEmailVerified(id: Types.ObjectId | string): Promise<UpdateResult> {
        return await this.updateOne({ _id: id, isDeleted: false }, { $set: { isEmailVerified: true } });
    }

    async updatePassword(id: Types.ObjectId | string, hashedPassword: string): Promise<UpdateResult> {
        return await this.updateOne({ _id: id, isDeleted: false }, { $set: { password: hashedPassword, passwordChangedAt: new Date() } });
    }
}