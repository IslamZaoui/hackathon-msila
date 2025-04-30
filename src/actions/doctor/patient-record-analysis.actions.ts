"use server";

import prisma from "@/lib/prisma";
import { requireDoctor } from "../require/require-role";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { env } from "@/env";

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_AI_API_KEY,
});

const model = google("gemini-2.0-flash");

const SYSTEM_PROMPT = `
You are a medical analysis assistant. Your task is to analyze structured or unstructured patient data (such as demographics, medications, medical history, test results, and symptoms) and identify any conflicts, issues, or inconsistencies. These may include, but are not limited to:

- Drug interactions or contraindications  
- Inconsistencies in reported symptoms vs. diagnosis  
- Overlapping or conflicting medications or treatments  
- Missing or incomplete critical information  
- Red flags in test results or vital signs  
- Any unusual patterns or outliers in patient data

Output a clear, concise report in natural language summarizing any issues found. If no issues are detected, state that explicitly. Be objective and do not make definitive diagnoses—flag potential concerns and recommend further review when needed.
`;

async function getPatientRecords(patientId: string) {
  return await prisma.user.findUnique({
    where: {
      id: patientId,
      role: "patient",
    },
    include: {
      patientAppointments: {
        include: {
          prescription: {
            include: {
              prescriptionMedication: true,
            },
          },
          Analysis: {
            include: {
              analysisResult: true,
            },
          },
        },
      },
    },
  });
}

type PatientRecord = NonNullable<Awaited<ReturnType<typeof getPatientRecords>>>;

function extractPatientRecord(patient: PatientRecord) {
  const patientData = `
# Patient Data
Name: ${patient.name}
Gender: ${patient.gender}
Blood Type: ${patient.bloodType}
Birth Date: ${patient.birthDate}
`;

  const appointmentsData = patient.patientAppointments.map(
    (appointment) => `
# Appointment ${appointment.id}
Date: ${appointment.date}
Description: ${appointment.description}

## Prescription
${appointment.prescription?.prescriptionMedication.map(
  (medication) => `
Medication: ${medication.medication}
Dosage: ${medication.dosage}
Duration: ${medication.duration}
Instructions: ${medication.instructions}

## Analysis
${appointment.Analysis?.analysisResult.map(
  (result) => `
Test: ${result.name}
Result: ${result.result}
`
)}
`
)}
`
  );

  return `${patientData}\n${appointmentsData}`;
}

export async function analysisPatientRecord(
  patientId: string,
  question: string
) {
  await requireDoctor();

  const patientData = await getPatientRecords(patientId);

  if (!patientData) {
    throw new Error("Patient not found");
  }

  const patientRecord = extractPatientRecord(patientData);

  const analysis = await generateText({
    model,
    system: SYSTEM_PROMPT,
    prompt: `${patientRecord}\n\n${question}`,
  });

  return analysis.text;
}
