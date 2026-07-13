const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.fnztdzgpvjzfufldhcsw:NexHeal%402026%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  try {
    console.log("Connecting to Supabase...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected successfully!");

    console.log("Adding isVerified column...");
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isVerified" boolean DEFAULT false;`);
    console.log("isVerified column added.");
    
    // Add other potentially missing columns just in case
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "failedLoginAttempts" INTEGER DEFAULT 0;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lockedUntil" TIMESTAMP(3);`);
    console.log("Other User columns added.");

  } catch (error) {
    console.error("Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
