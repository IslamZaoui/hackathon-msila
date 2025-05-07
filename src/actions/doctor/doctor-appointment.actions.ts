"use server";

import prisma from "@/lib/prisma";
import { requireDoctor } from "../require/require-role";
import { PatientUser } from "../auth.action";
export async function getDoctorAppointments() {
  const doctor = await requireDoctor();
  console.log("fetching");
  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    include: {
      patient: true,
    },
  });

  return appointments.map((appointment) => ({
    ...appointment,
    patient: appointment.patient as PatientUser,
  }));
}

export type Appointment = Awaited<
  ReturnType<typeof getDoctorAppointments>
>[number];

export async function getDoctorPatientAppointments(patientId: string) {
  const doctor = await requireDoctor();

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctor.id, patientId },
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
  });

  return appointments;
}

export async function rejectAppointment(appointmentId: string) {
  const doctor = await requireDoctor();

  const appointment = await prisma.appointment.update({
    where: { id: appointmentId, doctorId: doctor.id },
    data: {
      status: "rejected",
    },
  });

  return appointment;
}

export interface CreateReportData {
  appointmentId: string;
  price: number;
  description: string;
  medications?: {
    medication: string;
    duration: string;
    dosage: string;
    instructions: string;
  }[];
  analysis?: {
    name: string;
    result: string;
  }[];
}

export async function createReport(data: CreateReportData) {
  const doctor = await requireDoctor();

  const prescription = data.medications
    ? ({
        create: {
          prescriptionMedication: {
            createMany: {
              data: data.medications,
            },
          },
        },
      } as const)
    : undefined;

  const Analysis = data.analysis
    ? ({
        create: {
          analysisResult: { createMany: { data: data.analysis } },
        },
      } as const)
    : undefined;

  const report = await prisma.appointment.update({
    where: { id: data.appointmentId, doctorId: doctor.id },
    data: {
      price: data.price,
      description: data.description,
      status: "completed",
      prescription,
      Analysis,
    },
  });

  return report;
}
