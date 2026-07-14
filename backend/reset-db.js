require('dotenv').config();
const { execSync } = require('child_process');

async function resetDb() {
  try {
    console.log("Running Prisma DB Reset...");
    
    let dbUrl = process.env.DATABASE_URL || "";
    
    // Fix for Supabase IPv6 direct connection issue on Render (which lacks IPv4 outbound)
    // Supabase provides a Session pooler on port 5432 which supports IPv4 and allows migrations!
    // So we just change port 6543 (transaction) to 5432 (session) and keep the pooler host!
    if (dbUrl.includes(':6543')) {
      dbUrl = dbUrl.replace(':6543', ':5432');
      console.log("Converted pooler URL port from 6543 to 5432 for Prisma migration.");
    }
    
    const env = { 
      ...process.env, 
      DATABASE_URL: dbUrl, 
      DIRECT_URL: dbUrl 
    };

    console.log("Resetting database schemas and migrating...");
    const stdout = execSync('npx prisma db push --force-reset --accept-data-loss', {
      env: env,
      encoding: 'utf-8'
    });
    console.log(stdout);

    console.log("Running seed script...");
    const seedOut = execSync('npx prisma db seed', {
      env: env,
      encoding: 'utf-8'
    });
    console.log(seedOut);
    
    console.log("Prisma DB Reset completed successfully.");
  } catch (e) {
    console.error("Prisma DB Reset failed.", e.message);
  }
}

resetDb();
