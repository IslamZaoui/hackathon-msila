"use server";

import { getUserAction } from "../auth.action";

export async function requireAuth() {
  const user = await getUserAction();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
