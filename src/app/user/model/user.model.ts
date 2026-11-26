import { Schema, model } from "mongoose";
import type { IUser } from "../interface/user.interface.js";
import { Provider, Gender } from "../enum/user.enum.js";

const userSchema = new Schema<IUser>(
    {
        userName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: {
            type: String,
            select: false,
            required: function (this: IUser) {
                return this.provider === Provider.LOCAL;
            },
        },
        googleId: { type: String, unique: true, sparse: true },
        phoneNumber: { type: String, trim: true },
        gender: { type: String, enum: Object.values(Gender) },
        dob: Date,
        profilePicPath: String,
        provider: { type: String, enum: Object.values(Provider), default: Provider.LOCAL },
        isEmailVerified: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        followersCount: { type: Number, default: 0, min: 0 },
        followingCount: { type: Number, default: 0, min: 0 },
        fcmToken: String,
        passwordChangedAt: Date,
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

export const UserModel = model<IUser>("User", userSchema);