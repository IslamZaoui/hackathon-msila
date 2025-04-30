"use server";

import { requireAuth } from "./require-auth";

export async function requireDoctor() {
  const user = await requireAuth();

  if (user.role !== "doctor") {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requirePatient() {
  const user = await requireAuth();

  if (user.role !== "patient") {
    throw new Error("Unauthorized");
  }

  return user;
}
