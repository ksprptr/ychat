import validator from 'validator';
import z from 'zod';

export const userSchema = z
  .object({
    username: z
      .string('Username is required')
      .min(4, 'Username must be at least 4 characters long.')
      .max(20, 'Username must be at most 20 characters long.')
      .trim(),
    avatarUrl: z
      .url('Avatar URL must be a valid URL.')
      .max(255, 'Avatar URL must be at most 255 characters long.')
      .trim()
      .optional()
      .or(z.literal('')),
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters long.')
      .max(48, 'Password must be at most 48 characters long.')
      .trim()
      .optional(),
    confirmPassword: z
      .string('Password confirmation is required')
      .min(8, 'Password must be at least 8 characters long.')
      .max(48, 'Password must be at most 48 characters long.')
      .trim()
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return validator.isStrongPassword(data.password, {
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      }

      return true;
    },
    {
      error:
        'Password is not strong enough. (min: 1 lowercase, 1 uppercase, 1 number and 1 symbol)',
      path: ['password'],
    },
  )
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match.',
    path: ['confirmPassword'],
  });
