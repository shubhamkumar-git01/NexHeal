const { execSync } = require('child_process');

async function runMigrations() {
  try {
    console.log("Running Prisma DB Push on startup...");
    
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

    const stdout = execSync('npx prisma db push --accept-data-loss', {
      env: env,
      encoding: 'utf-8'
    });
    console.log(stdout);
    
    console.log("Prisma DB Push completed successfully.");
  } catch (e) {
    console.error("Prisma DB Push failed. The server will attempt to start anyway.", e.message);
  }
}

runMigrations();
