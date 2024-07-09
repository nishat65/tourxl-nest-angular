import { z } from 'zod';

export const authSchema = z
  .object({
    email: z.string().email("credentials didn't match"),
    password: z.string({
      required_error: 'Password is required',
      message: 'Password must be at least 6 characters',
    }),
  })
  .required();

export type authDto = z.infer<typeof authSchema>;
