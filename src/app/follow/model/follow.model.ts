import { Schema, model } from "mongoose";
import type { IFollow } from "../interface/follow.interface.js";
import { FollowStatus } from "../enum/follow.enum.js";

const followSchema = new Schema<IFollow>(
  {
    followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: Object.values(FollowStatus), default: FollowStatus.ACCEPTED },
  },
  { timestamps: true },
);

// one follow per pair
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
// "who follows X" lists, filtered by status
followSchema.index({ followingId: 1, status: 1 });

export const FollowModel = model<IFollow>("Follow", followSchema);