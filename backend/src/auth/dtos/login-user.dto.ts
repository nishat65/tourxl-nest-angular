import { z } from 'zod';

export const authSchema = z
  .object({
    email: z.string().email("credentials didn't match"),
    password: z
      .string()
      .regex(/this4is6guide11password18/, "credentials didn't match"),
  })
  .required();

export type authDto = z.infer<typeof authSchema>;
