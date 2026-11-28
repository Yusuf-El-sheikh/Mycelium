import type { HydratedDocument } from "mongoose";
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

    findByGoogleId() { }

    markEmailVerified() { }

    updatePassword() { }
}