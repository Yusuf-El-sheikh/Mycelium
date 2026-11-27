import { Schema, model } from "mongoose";
import type { IReaction } from "../interface/reaction.interface.js";
import { ReactionType, RefModel } from "../enum/reaction.enum.js";

const reactionSchema = new Schema<IReaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    refId: { type: Schema.Types.ObjectId, refPath: "refModel", required: true },
    refModel: { type: String, enum: Object.values(RefModel), required: true },
    reactionType: { type: String, enum: Object.values(ReactionType), required: true },
  },
  { timestamps: true },
);

// one reaction per user per target
reactionSchema.index({ userId: 1, refId: 1, refModel: 1 }, { unique: true });
// counting/listing reactions of a target
reactionSchema.index({ refId: 1, refModel: 1 });

export const ReactionModel = model<IReaction>("Reaction", reactionSchema);