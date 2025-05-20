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

//Schema for signup form validation
export const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});
//Schema for adminSetting form validation
export const adminSettingSchema = z.object({
  adminName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  description: z.string().optional(),
  image: z.custom<File>((v) => v instanceof FileList && v.length > 0, {
    message: "Image is required",
  }),
});

export const profileSchema = z.object({
  username: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 digits")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ForgotFormValues = z.infer<typeof forgotPasswordSchema>;

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type SettingsFormData = z.infer<typeof adminSettingSchema>;
