export const GENDER = ["male", "female"] as const;
export type Gender = (typeof GENDER)[number];

export const BLOOD_TYPE = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;
export type BloodType = (typeof BLOOD_TYPE)[number];
