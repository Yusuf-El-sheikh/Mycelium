import { Schema, model } from "mongoose";
import type { IPost } from "../interface/post.interface.js";

const postSchema = new Schema<IPost>(
  {
    content: { type: String, trim: true },
    attachmentsPaths: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    commentsCount: { type: Number, default: 0, min: 0 },
    reactionsCount: { type: Number, default: 0, min: 0 },
    allowsComments: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// a user's posts, newest first
postSchema.index({ userId: 1, createdAt: -1 });

export const PostModel = model<IPost>("Post", postSchema);