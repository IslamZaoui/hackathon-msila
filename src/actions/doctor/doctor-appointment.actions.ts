"use server";

import prisma from "@/lib/prisma";
import { requireDoctor } from "../require/require-role";
import { PatientUser } from "../auth.action";

export async function createAppointment(patientId: string, date: Date) {
  const doctor = await requireDoctor();

  const newAppointment = await prisma.appointment.create({
    data: {
      patientId,
      doctorId: doctor.id,
      date,
    },
  });

  return newAppointment;
}

export async function getDoctorAppointments() {
  const doctor = await requireDoctor();

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

export interface CreatePrescriptionData {
  appointmentId: string;
  medications: {
    medication: string;
    duration: string;
    dosage: string;
    instructions: string;
  }[];
}

export async function createPrescription(data: CreatePrescriptionData) {
  const doctor = await requireDoctor();

  const prescription = await prisma.appointment.update({
    where: {
      id: data.appointmentId,
      doctorId: doctor.id,
      prescription: {
        is: null,
      },
    },
    data: {
      prescription: {
        create: {
          prescriptionMedication: {
            createMany: {
              data: data.medications,
            },
          },
        },
      },
    },
  });

  return prescription;
}
