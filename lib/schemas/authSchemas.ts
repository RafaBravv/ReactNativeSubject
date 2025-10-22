import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/messages';

// Schema para Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.password.required),
});

// Schema para Registro
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.name.required)
    .min(3, VALIDATION_MESSAGES.name.minLength),
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.password.required)
    .min(6, VALIDATION_MESSAGES.password.minLength),
  confirmPassword: z
    .string()
    .min(1, VALIDATION_MESSAGES.confirmPassword.required),
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MESSAGES.confirmPassword.mismatch,
  path: ['confirmPassword'],
});

// Tipos inferidos de los schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;