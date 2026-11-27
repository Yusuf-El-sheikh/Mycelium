import type { Types } from "mongoose";
import type { ReactionType, RefModel } from "../enum/reaction.enum.js";

export interface IReaction {
  userId: Types.ObjectId;
  refId: Types.ObjectId;
  refModel: RefModel;
  reactionType: ReactionType;
  createdAt?: Date;
  updatedAt?: Date;
}