import * as z from "zod";

export const login = z.object({
  username: z.string().min(2),
  password: z
    .string()
    .min(8, { message: "Must be a minimum of 8 characters." }),
});

export const userValidation = z.object({
  username: z.string().min(2),
  password: z
    .string()
    .min(8, { message: "Must be a minimum of 8 characters." }),
  role: z.string(),
  grantedStations: z.array(z.number()),
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
