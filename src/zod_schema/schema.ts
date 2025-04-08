
import { z } from "zod";
// Schema for contact form validation
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

//Schema for login form validation

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});


export type ContactFormValues = z.infer<typeof contactSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;