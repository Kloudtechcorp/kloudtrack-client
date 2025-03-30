import * as z from "zod";

export const login = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const deviceInfoSchema = z.object({
  device: z.string(),
  browser: z.string(),
  os: z.string(),
  location: z.string().optional(),
});

export const enhancedLoginSchema = login.extend({
  deviceInfo: deviceInfoSchema.optional(),
});

export const userValidation = z
  .object({
    username: z.string().min(2),
    password: z.string(),
    role: z.string(),
    grantedStations: z.array(z.string()),
  })
  .superRefine(({ password }, ctx) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
      password
    );

    if (!hasMinLength) {
      ctx.addIssue({
        code: "custom",
        message: "Password must be at least 8 characters long.",
        path: ["password"],
      });
    }

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      ctx.addIssue({
        code: "custom",
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        path: ["password"],
      });
    }
  });

export const psgcValidation = z.object({
  psgc: z.string({ required_error: "Enter a valid psgc" }),
  region: z.string({ required_error: "region is required" }),
  province: z.string({ required_error: "province is required" }),
  municipality: z.string({ required_error: "municipality is required" }),
  barangay: z.string({ required_error: "barangay is required" }),
});

export const stationTypeSchema = z.object({
  typeName: z.enum(["AWS", "TC", "CLMS", "RLMS", "ARG"]),
});

export const stationSchema = z.object({
  stationName: z.string({ required_error: "station name is required" }),
  stationType: z.string({ required_error: "station type is required" }),
  latitude: z.string({ required_error: "latitude is required" }),
  longitude: z.string({ required_error: "longitude is required" }),
  psgc: z.string({ required_error: "psgc id is required" }),
  municipality: z.string({ required_error: "municipality id is required" }),
  province: z.string({ required_error: "province is required" }),
  region: z.string({ required_error: "region is required" }),
  imageLink: z.string({ required_error: "province is required" }),
});

export const updateStationSchema = z.object({
  stationName: z.string({ required_error: "station name is required" }),
  latitude: z.string({ required_error: "latitude is required" }),
  longitude: z.string({ required_error: "longitude is required" }),
  psgc: z.string({ required_error: "psgc id is required" }),
  municipality: z.string({ required_error: "municipality id is required" }),
  province: z.string({ required_error: "province is required" }),
  region: z.string({ required_error: "region is required" }),
  imageLink: z.string({ required_error: "province is required" }),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Must be a minimum of 8 characters." }),
    password: z
      .string()
      .min(8, { message: "Must be a minimum of 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be a minimum of 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine(({ password }, ctx) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
      password
    );

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      ctx.addIssue({
        code: "custom",
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        path: ["password"],
      });
    }
  });

export const downloadSchema = z.object({
  type: z.string({ required_error: "type is required" }),
});

export const bugSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  description: z.string().min(2, {
    message: "Description is required.",
  }),
});

export type LoginType = z.infer<typeof login>;
export type DeviceInfoType = z.infer<typeof deviceInfoSchema>;
export type EnhancedLoginType = z.infer<typeof enhancedLoginSchema>;
