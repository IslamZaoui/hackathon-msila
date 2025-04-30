"use server";

import { auth } from "@/lib/auth";
import tryCatch from "@/lib/helpers/try-catch-helper";
import { doctorSignupSchema } from "@/lib/schemas/auth.schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface RegisterDoctorData extends z.infer<typeof doctorSignupSchema> {
  name: string;
  email: string;
  password: string;
}

export async function registerDoctorAction(data: RegisterDoctorData) {
  const headerStore = await headers();

  const { error } = await tryCatch(
    auth.api.signUpEmail({
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
    })
  );

  if (error) {
    return { error: error.message };
  }

  return redirect("/doctor");
}
