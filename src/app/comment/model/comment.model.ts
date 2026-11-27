import { Schema, model } from "mongoose";
import type { IComment } from "../interface/comment.interface.js";

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, trim: true },
    attachmentsPaths: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    mentions: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// comments of a post, and replies of a comment
commentSchema.index({ postId: 1, parentCommentId: 1, createdAt: -1 });

export const CommentModel = model<IComment>("Comment", commentSchema);