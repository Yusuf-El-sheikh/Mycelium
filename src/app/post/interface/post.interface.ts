import type { Types } from "mongoose";

export interface IPost {
  content?: string;
  attachmentsPaths: string[];
  userId: Types.ObjectId;
  commentsCount: number;
  reactionsCount: number;
  allowsComments: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}