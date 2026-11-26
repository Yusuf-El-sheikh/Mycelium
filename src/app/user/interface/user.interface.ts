import type { Provider, Gender } from "../enum/user.enum.js";

export interface IUser {
  userName: string;
  email: string;
  password?: string;
  googleId?: string;
  phoneNumber?: string;
  gender?: Gender;
  dob?: Date;
  profilePicPath?: string;
  provider: Provider;
  isEmailVerified: boolean;
  isPrivate: boolean;
  followersCount: number;
  followingCount: number;
  fcmToken?: string;
  passwordChangedAt?: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}