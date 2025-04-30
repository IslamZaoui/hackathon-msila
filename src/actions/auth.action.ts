"use server";

import { auth } from "@/lib/auth";
import { Gender } from "@/lib/contants";
import { BloodType } from "@/lib/contants";
import tryCatch from "@/lib/helpers/try-catch-helper";
import {
  doctorSignupSchema,
  patientSignupSchema,
} from "@/lib/schemas/auth.schema";
import { headers } from "next/headers";
import { z } from "zod";

export async function loginAction(email: string, password: string) {
  const headerStore = await headers();

  const { data, error } = await tryCatch(
    auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: headerStore,
    })
  );

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function logoutAction() {
  const headerStore = await headers();

  return await auth.api.signOut({
    headers: headerStore,
  });
}

export interface DoctorUser extends z.infer<typeof doctorSignupSchema> {
  id: string;
  name: string;
  email: string;
  role: "doctor";
}

export interface PatientUser extends z.infer<typeof patientSignupSchema> {
  id: string;
  name: string;
  email: string;
  role: "patient";
}

export async function getUserAction() {
  const headerStore = await headers();

  const session = await auth.api.getSession({
    headers: headerStore,
  });

  if (!session) {
    return null;
  }

  if (session.user.role === "doctor") {
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      country: session.user.country,
      specialization: session.user.specialization,
      hcpId: session.user.hcpId,
      medicalId: session.user.medicalId,
      phone: session.user.phone,
    } satisfies DoctorUser;
  }

  if (session.user.role === "patient") {
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      gender: session.user.gender as Gender,
      bloodType: session.user.bloodType as BloodType,
      birthDate: session.user.birthDate,
      height: session.user.height,
      weight: session.user.weight,
      phone: session.user.phone,
    } satisfies PatientUser;
  }
}
