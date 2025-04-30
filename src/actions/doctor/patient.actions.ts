"use server";

import prisma from "@/lib/prisma";
import { requireDoctor } from "../require/require-role";
import { PatientUser } from "../auth.action";

export type DoctorPatient = PatientUser & {
  lastAppointment?: {
    date: Date;
  };
};

export async function getDoctorPatients() {
  const doctor = await requireDoctor();

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    include: {
      patient: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  // Get unique patients with their last appointment
  const patientsMap = new Map<string, DoctorPatient>();
  
  appointments.forEach((appointment) => {
    if (!patientsMap.has(appointment.patientId)) {
      patientsMap.set(appointment.patientId, {
        ...(appointment.patient as PatientUser),
        lastAppointment: {
          date: appointment.date,
        },
      });
    }
  });

  return Array.from(patientsMap.values());
}

export async function getDoctorPatientById(patientId: string) {
  const doctor = await requireDoctor();

  const patient = await prisma.user.findUnique({
    where: {
      id: patientId,
      role: "patient",
    },
  });

  if (!patient) {
    return null;
  }

  // Get the last appointment
  const lastAppointment = await prisma.appointment.findFirst({
    where: {
      doctorId: doctor.id,
      patientId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return {
    ...(patient as PatientUser),
    lastAppointment: lastAppointment ? { date: lastAppointment.date } : undefined,
  };
} 