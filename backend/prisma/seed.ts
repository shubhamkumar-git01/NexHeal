import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with professional synthetic data...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('SecurePassword123!', 10);

  // 1. Create Hospitals
  const hospitals = [
    { name: 'City Central Hospital', registrationNo: 'HOSP-001', type: 'PUBLIC', city: 'Metropolis', state: 'NY', country: 'USA' },
    { name: 'Sunrise Medical Center', registrationNo: 'HOSP-002', type: 'PRIVATE', city: 'Gotham', state: 'NJ', country: 'USA' },
    { name: 'Global Health Institute', registrationNo: 'HOSP-003', type: 'CLINIC', city: 'Star City', state: 'CA', country: 'USA' },
    { name: 'Apex Care Partners', registrationNo: 'HOSP-004', type: 'PRIVATE', city: 'Central City', state: 'IL', country: 'USA' },
    { name: 'Pioneer General', registrationNo: 'HOSP-005', type: 'PUBLIC', city: 'Coast City', state: 'CA', country: 'USA' },
  ];

  const createdHospitals = [];
  for (const h of hospitals) {
    const hospital = await prisma.hospital.upsert({
      where: { registrationNo: h.registrationNo },
      update: {},
      create: h,
    });
    createdHospitals.push(hospital);
  }
  console.log(`Created ${createdHospitals.length} synthetic hospitals.`);

  // 2. Create Doctors
  const doctors = [
    { email: 'dr.smith@example.com', firstName: 'John', lastName: 'Smith', spec: 'Cardiology', exp: 12, fee: 150, hospitalIdx: 0 },
    { email: 'dr.jones@example.com', firstName: 'Sarah', lastName: 'Jones', spec: 'Neurology', exp: 8, fee: 200, hospitalIdx: 1 },
    { email: 'dr.lee@example.com', firstName: 'Michael', lastName: 'Lee', spec: 'Pediatrics', exp: 15, fee: 100, hospitalIdx: 0 },
    { email: 'dr.patel@example.com', firstName: 'Priya', lastName: 'Patel', spec: 'Oncology', exp: 10, fee: 250, hospitalIdx: 2 },
    { email: 'dr.garcia@example.com', firstName: 'David', lastName: 'Garcia', spec: 'Orthopedics', exp: 5, fee: 120, hospitalIdx: 3 },
  ];

  for (const d of doctors) {
    await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        email: d.email,
        password: hashedPassword,
        firstName: d.firstName,
        lastName: d.lastName,
        role: Role.DOCTOR,
        isVerified: true,
        doctorProfile: {
          create: {
            specialization: d.spec,
            experience: d.exp,
            consultationFee: d.fee,
            verificationStatus: 'APPROVED',
            hospitalId: createdHospitals[d.hospitalIdx].id,
          }
        }
      }
    });
  }
  console.log(`Created ${doctors.length} verified doctors.`);

  // 3. Create Patients
  const patients = [
    { email: 'patient.one@example.com', firstName: 'Alice', lastName: 'Williams', bg: 'O+' },
    { email: 'patient.two@example.com', firstName: 'Bob', lastName: 'Brown', bg: 'A-' },
    { email: 'patient.three@example.com', firstName: 'Charlie', lastName: 'Davis', bg: 'B+' },
  ];

  for (const p of patients) {
    await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        password: hashedPassword,
        firstName: p.firstName,
        lastName: p.lastName,
        role: Role.PATIENT,
        isVerified: true,
        patientProfile: {
          create: {
            bloodGroup: p.bg
          }
        }
      }
    });
  }
  console.log(`Created ${patients.length} active patients.`);

  // 4. Create Volunteers
  const volunteers = [
    { email: 'volunteer.a@example.com', firstName: 'Emily', lastName: 'Clark' },
    { email: 'volunteer.b@example.com', firstName: 'Frank', lastName: 'Wright' },
  ];

  for (const v of volunteers) {
    await prisma.user.upsert({
      where: { email: v.email },
      update: {},
      create: {
        email: v.email,
        password: hashedPassword,
        firstName: v.firstName,
        lastName: v.lastName,
        role: Role.VOLUNTEER,
        isVerified: true,
        volunteerProfile: {
          create: {
            reputationScore: 4.8,
            isActive: true
          }
        }
      }
    });
  }
  console.log(`Created ${volunteers.length} community volunteers.`);

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  });
