import { z } from "zod";

export const baseSignupSchema = z.object({
  phone: z.string({ required_error: "Phone is required" }).trim(),
});

export const doctorSignupSchema = z
  .object({
    country: z.string({ required_error: "Country is required" }).trim(),
    specialization: z
      .string({ required_error: "Specialization is required" })
      .trim(),
    hcpId: z.string({ required_error: "HCP ID is required" }).trim(),
    medicalId: z.string({ required_error: "Medical ID is required" }).trim(),
  })
  .extend(baseSignupSchema.shape);

export const patientSignupSchema = z
  .object({
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      required_error: "Blood type is required",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
    birthDate: z.date({ required_error: "Birth date is required" }),
    height: z.number({ required_error: "Height is required" }),
    weight: z.number({ required_error: "Weight is required" }),
  })
  .extend(baseSignupSchema.shape);

export const signupSchema = z
  .object({
    role: z.enum(["doctor", "patient"], {
      required_error: "Role is required",
    }),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (data.role === "doctor") {
      const result = doctorSignupSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    } else if (data.role === "patient") {
      const result = patientSignupSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    }
  });
