
import { z } from "zod";
// Schema for form validation
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});
export type ContactFormValues = z.infer<typeof contactSchema>;