import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());
const passwordSchema = z.string().min(8).max(72);
const otpSchema = z.string().regex(/^\d{6}$/, "OTP must be 6 digits");

export const registerDto = z.object({
  userName: z.string().trim().min(3),
  email: emailSchema,
  password: passwordSchema,
});

export const loginDto = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const googleAuthDto = z.object({
  idToken: z.string().min(1),
});

export const verifyEmailDto = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export const resendOtpDto = z.object({
  email: emailSchema,
});

export const forgotPasswordDto = z.object({
  email: emailSchema,
});

export const resetPasswordDto = z.object({
  email: emailSchema,
  otp: otpSchema,
  newPassword: passwordSchema,
});

export type RegisterDto = z.infer<typeof registerDto>;
export type LoginDto = z.infer<typeof loginDto>;
export type GoogleAuthDto = z.infer<typeof googleAuthDto>;
export type VerifyEmailDto = z.infer<typeof verifyEmailDto>;
export type ResendOtpDto = z.infer<typeof resendOtpDto>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordDto>;
export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;