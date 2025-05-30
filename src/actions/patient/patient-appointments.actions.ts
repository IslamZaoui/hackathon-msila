"use server";

import prisma from "@/lib/prisma";
import { requirePatient } from "../require/require-role";
import { DoctorUser } from "../auth.action";

export async function createAppointment(doctorId: string, date: Date) {
  const patient = await requirePatient();

  const newAppointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId,
      date,
    },
  });

  return newAppointment;
}

export async function getPatientAppointments() {
  const patient = await requirePatient();

  const appointments = await prisma.appointment.findMany({
    where: {
      patientId: patient.id,
      status: {
        in: ["pending", "rejected"],
      },
    },
    include: {
      doctor: true,
    },
  });

  return appointments.map((appointment) => ({
    ...appointment,
    doctor: appointment.doctor as DoctorUser,
  }));
}

export type PatientAppointment = Awaited<
  ReturnType<typeof getPatientAppointments>
>[number];

export async function getPatientVisits() {
  const patient = await requirePatient();

  const visits = await prisma.appointment.findMany({
    where: { patientId: patient.id, status: "completed" },
    include: {
      doctor: true,
      prescription: true,
      Analysis: true,
    },
  });

  return visits;
}

export async function cancelAppointment(appointmentId: string) {
  const patient = await requirePatient();

  const appointment = await prisma.appointment.delete({
    where: { id: appointmentId, patientId: patient.id },
  });

  return appointment;
}

export async function getPatientPrescriptions() {
  const patient = await requirePatient();

  const appointments = await prisma.appointment.findMany({
    where: { patientId: patient.id },
    include: {
      prescription: {
        include: {
          prescriptionMedication: true,
        },
      },
      doctor: true,
    },
  });

  return appointments.map((appointment) => ({
    ...appointment.prescription,
    doctor: appointment.doctor as DoctorUser,
    date: appointment.date,
  }));
}

export type PatientPrescription = Awaited<
  ReturnType<typeof getPatientPrescriptions>
>[number];
