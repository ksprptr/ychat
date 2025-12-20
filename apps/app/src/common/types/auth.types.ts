import { loginSchema, registerSchema } from '../validations/auth.validations';
import z from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;
