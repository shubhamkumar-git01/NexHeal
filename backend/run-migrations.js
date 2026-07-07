const { execSync } = require('child_process');

async function runMigrations() {
  try {
    console.log("Running Prisma DB Push...");
    
    // Create a modified environment specifically for the migration
    let dbUrl = process.env.DATABASE_URL || "";
    
    // Workaround for Prisma bug with Supavisor pooler (stripping project ref)
    if (dbUrl.includes('pgbouncer=true')) {
      dbUrl = dbUrl.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
    }
    
    const env = { 
      ...process.env, 
      DATABASE_URL: dbUrl, 
      // Force direct URL to be the same as DB URL but without pgbouncer
      DIRECT_URL: dbUrl 
    };

    execSync('npx prisma db push --accept-data-loss', {
      env: env,
      stdio: 'inherit'
    });
    
    console.log("Prisma DB Push completed successfully.");
  } catch (e) {
    console.error("Prisma DB Push failed. The server will attempt to start anyway.", e.message);
  }
}

runMigrations();
