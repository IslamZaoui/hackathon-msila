import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

// Adding type definitions for gender and blood type
type Gender = "male" | "female";
type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding process...");

  // Clean database
  await prisma.analysisResult.deleteMany({});
  await prisma.analysis.deleteMany({});
  await prisma.prescriptionMedication.deleteMany({});
  await prisma.prescription.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Database cleaned");

  // Create doctors
  const doctors = [
    {
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      password: "password123",
      country: "United States",
      specialization: "Cardiology",
      hcpId: "HCP123456",
      medicalId: "MED123456",
      phone: "+1234567890",
    },
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      password: "password123",
      country: "United Kingdom",
      specialization: "Neurology",
      hcpId: "HCP654321",
      medicalId: "MED654321",
      phone: "+1987654321",
    },
    {
      name: "Dr. Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      password: "password123",
      country: "Egypt",
      specialization: "Pediatrics",
      hcpId: "HCP789012",
      medicalId: "MED789012",
      phone: "+2012345678",
    },
  ];

  // Create patients
  const patients = [
    {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      password: "password123",
      gender: "female" as Gender,
      bloodType: "A+" as BloodType,
      birthDate: new Date("1990-05-15"),
      height: 165,
      weight: 60,
      phone: "+1122334455",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      password: "password123",
      gender: "male" as Gender,
      bloodType: "O-" as BloodType,
      birthDate: new Date("1985-09-23"),
      height: 180,
      weight: 78,
      phone: "+1555667788",
    },
    {
      name: "Carol Martinez",
      email: "carol.martinez@example.com",
      password: "password123",
      gender: "female" as Gender,
      bloodType: "B+" as BloodType,
      birthDate: new Date("1992-12-07"),
      height: 170,
      weight: 65,
      phone: "+1998877665",
    },
  ];

  // Register doctors using the action
  for (const doctor of doctors) {
    try {
      await auth.api.signUpEmail({
        body: {
          name: doctor.name,
          email: doctor.email,
          password: doctor.password,
          role: "doctor",
          country: doctor.country,
          specialization: doctor.specialization,
          hcpId: doctor.hcpId,
          medicalId: doctor.medicalId,
          phone: doctor.phone,
        } as any,
      });
      console.log(`✅ Created doctor: ${doctor.name}`);
    } catch (error) {
      console.error(`❌ Failed to create doctor ${doctor.name}:`, error);
    }
  }

  // Register patients using the action
  for (const patient of patients) {
    try {
      await auth.api.signUpEmail({
        body: {
          name: patient.name,
          email: patient.email,
          password: patient.password,
          role: "patient",
          gender: patient.gender,
          bloodType: patient.bloodType,
          birthDate: patient.birthDate,
          height: patient.height,
          weight: patient.weight,
          phone: patient.phone,
        } as any,
      });
      console.log(`✅ Created patient: ${patient.name}`);
    } catch (error) {
      console.error(`❌ Failed to create patient ${patient.name}:`, error);
    }
  }

  console.log(`👨‍⚕️ Created ${doctors.length} doctors`);
  console.log(`🧑 Created ${patients.length} patients`);

  // Fetch the created users from the database
  const dbDoctors = await prisma.user.findMany({
    where: { role: "doctor" },
  });

  const dbPatients = await prisma.user.findMany({
    where: { role: "patient" },
  });

  // Create appointments
  const appointmentStatuses: AppointmentStatus[] = [
    "pending",
    "completed",
    "rejected",
  ];
  const appointments = [];

  for (let i = 0; i < 10; i++) {
    const doctor = dbDoctors[Math.floor(Math.random() * dbDoctors.length)];
    const patient = dbPatients[Math.floor(Math.random() * dbPatients.length)];
    const status =
      appointmentStatuses[
        Math.floor(Math.random() * appointmentStatuses.length)
      ];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14)); // Random date within next 14 days

    const appointmentId = nanoid();
    appointments.push({
      id: appointmentId,
      doctorId: doctor.id,
      patientId: patient.id,
      date,
      status,
      price: Math.floor(Math.random() * 20000) / 100 + 50, // Random price between $50 and $250
      description: `Appointment with ${doctor.name} for checkup`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment,
    });

    // For completed appointments, create prescriptions and analysis
    if (appointment.status === "completed") {
      // Create prescription
      const { id: prescriptionId } = await prisma.prescription.create({
        data: {
          appointmentId: appointment.id,
        },
      });

      // Create prescription medications
      const medications = [
        {
          medication: "Amoxicillin",
          duration: "7 days",
          dosage: "500mg",
          instructions: "Take twice daily with food",
        },
        {
          medication: "Ibuprofen",
          duration: "5 days",
          dosage: "200mg",
          instructions: "Take as needed for pain",
        },
        {
          medication: "Vitamin D",
          duration: "30 days",
          dosage: "1000IU",
          instructions: "Take once daily",
        },
      ];

      for (const med of medications) {
        if (Math.random() > 0.5) {
          await prisma.prescriptionMedication.create({
            data: {
              prescriptionId,
              ...med,
            },
          });
        }
      }

      // Create analysis
      const { id: analysisId } = await prisma.analysis.create({
        data: {
          appointmentId: appointment.id,
        },
      });

      // Create analysis results
      const analysisTests = [
        { name: "Blood Pressure", result: "120/80 mmHg" },
        { name: "Heart Rate", result: "72 bpm" },
        { name: "Blood Sugar", result: "5.5 mmol/L" },
        { name: "Cholesterol", result: "4.2 mmol/L" },
        { name: "Hemoglobin", result: "14.5 g/dL" },
      ];

      for (const test of analysisTests) {
        if (Math.random() > 0.3) {
          await prisma.analysisResult.create({
            data: {
              id: nanoid(),
              analysisId,
              ...test,
            },
          });
        }
      }
    }
  }

  console.log(`🗓️ Created ${appointments.length} appointments`);
  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
