"use server";

import { auth } from "@/lib/auth";
import tryCatch from "@/lib/helpers/try-catch-helper";
import { patientSignupSchema } from "@/lib/schemas/auth.schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface RegisterPatientData
  extends z.infer<typeof patientSignupSchema> {
  name: string;
  email: string;
  password: string;
}

export async function registerDoctorAction(input: RegisterPatientData) {
  const headerStore = await headers();

  const { error } = await tryCatch(
    auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        role: "doctor",
        gender: input.gender,
        bloodType: input.bloodType,
        birthDate: input.birthDate,
        height: input.height,
        weight: input.weight,
      } as any,
      headers: headerStore,
    })
  );

  if (error) {
    return { error: error.message };
  }

  return redirect("/patient/appointments");
}
