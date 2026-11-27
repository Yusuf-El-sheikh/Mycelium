import type { Types } from "mongoose";

export interface IComment {
  content?: string;
  attachmentsPaths: string[];
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentCommentId?: Types.ObjectId;
  mentions: Types.ObjectId[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}