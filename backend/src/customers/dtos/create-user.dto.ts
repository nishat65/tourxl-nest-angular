import { z } from 'zod';

export const createCustomerSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required',
        message: 'Not a valid name',
      })
      .trim()
      .regex(/^[a-zA-Z]+$/, 'Not a valid name'),
    lastName: z
      .string({
        required_error: 'Last name is required',
        message: 'Not a valid name',
      })
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
    email: z
      .string({
        required_error: 'Email is required',
        message: 'Not a valid email',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
        message: 'Password must be at least 6 characters',
      })
      .min(6, 'Password must be at least 6 characters'),
    address: z.string().optional(),
  })
  .required();

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
