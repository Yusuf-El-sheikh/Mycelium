import type { Types } from "mongoose";
import type { FollowStatus } from "../enum/follow.enum.js";

export interface IFollow {
  followerId: Types.ObjectId;
  followingId: Types.ObjectId;
  status: FollowStatus;
  createdAt?: Date;
  updatedAt?: Date;
}