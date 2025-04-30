"use server";

import { auth } from "@/lib/auth";
import { doctorSignupSchema } from "@/lib/schemas/auth.schema";
import { headers } from "next/headers";
import { z } from "zod";

export interface RegisterDoctorData extends z.infer<typeof doctorSignupSchema> {
  name: string;
  email: string;
  password: string;
}

export async function registerDoctorAction(data: RegisterDoctorData) {
  const headerStore = await headers();

  return await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "doctor",
      country: data.country,
      specialization: data.specialization,
      hcpId: data.hcpId,
      medicalId: data.hcpId,
    } as any,
    headers: headerStore,
  });
}
