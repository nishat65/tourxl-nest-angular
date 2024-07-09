import { z } from 'zod';

export const createGuideSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z]+$/, 'Not a valid name'),
    lastName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z]+$/, 'Not a valid name'),
    phone: z
      .string({
        message: 'Phone must be a valid phone number',
        required_error: 'Phone is required',
      })
      .regex(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        'Not a valid phone number',
      ),
    email: z.string().email('Not a valid email'),
    officeAddress: z.string(),
    totalToursDone: z.number().min(0).default(0),
  })
  .required();

export type CreateGuideDto = z.infer<typeof createGuideSchema>;
