const { execSync } = require('child_process');

async function runMigrations() {
  try {
    console.log("Running Prisma DB Push on startup...");
    
    let dbUrl = process.env.DATABASE_URL || "";
    
    // Convert Supabase pooler URL to direct IPv6 URL to bypass pgbouncer issues
    // Example pooler: postgresql://postgres.fnztdzgpvjzfufldhcsw:PASSWORD@aws-1...pooler.supabase.com:6543/postgres
    // Target direct: postgresql://postgres:PASSWORD@db.fnztdzgpvjzfufldhcsw.supabase.co:5432/postgres
    const poolerMatch = dbUrl.match(/postgresql:\/\/postgres\.([^:]+):([^@]+)@[^\/]+\/postgres/);
    if (poolerMatch) {
      const projectRef = poolerMatch[1];
      const password = poolerMatch[2];
      dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
      console.log("Converted pooler URL to direct IPv6 URL for Prisma migration.");
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
