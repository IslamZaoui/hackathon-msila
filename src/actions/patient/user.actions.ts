"use server";

import { auth } from "@/lib/auth";
import { patientSignupSchema } from "@/lib/schemas/auth.schema";
import { headers } from "next/headers";
import { z } from "zod";

export interface RegisterPatientData
  extends z.infer<typeof patientSignupSchema> {
  name: string;
  email: string;
  password: string;
}

export async function registerDoctorAction(data: RegisterPatientData) {
  const headerStore = await headers();

  return await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "doctor",
      gender: data.gender,
      bloodType: data.bloodType,
      birthDate: data.birthDate,
      height: data.height,
      weight: data.weight,
    } as any,
    headers: headerStore,
  });
}
