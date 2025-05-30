import { betterAuth } from "better-auth";
import {
  validator as validatorAdapter,
  StandardAdapter,
} from "validation-better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { signupSchema } from "./schemas/auth.schema";

const validator = validatorAdapter([
  {
    path: "/sign-up/email",
    adapter: StandardAdapter(signupSchema),
  },
]);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      // shared fields
      role: {
        type: "string",
        input: true,
        required: true,
        returned: true,
      },
      phone: {
        type: "string",
        input: true,
        returned: true,
      },
      // doctor fields
      country: {
        type: "string",
        input: true,
        returned: true,
      },
      specialization: {
        type: "string",
        input: true,
        returned: true,
      },
      hcpId: {
        type: "string",
        input: true,
        returned: true,
      },
      medicalId: {
        type: "string",
        input: true,
        returned: true,
      },
      // patient fields
      gender: {
        type: "string",
        input: true,
        returned: true,
      },
      bloodType: {
        type: "string",
        input: true,
        returned: true,
      },
      birthDate: {
        type: "date",
        input: true,
        returned: true,
      },
      height: {
        type: "number",
        input: true,
        returned: true,
      },
      weight: {
        type: "number",
        input: true,
        returned: true,
      },
    },
  },
  plugins: [nextCookies(), openAPI(), validator],
});
