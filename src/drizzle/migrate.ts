// Import necessary modules and environment variables
import 'dotenv/config'; // Ensures environment variables from your .env file are read
import { drizzle } from 'drizzle-orm/node-postgres'; // Importing drizzle ORM for PostgreSQL
import { migrate } from 'drizzle-orm/node-postgres/migrator'; // Importing migration function
import { Client } from 'pg'; // PostgreSQL client from pg module
import * as schema from './schema'; // Importing your schema definitions

// Configure and create a new PostgreSQL client instance
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Using DATABASE_URL from environment variables
});

async function main() {
  console.log('Connecting to Drizzle');
  await client.connect(); // Connect to the PostgreSQL database
  const db = drizzle(client, { schema }); // Initialize drizzle with the connected client and your schema

  // Run migrations located in the 'drizzle/' folder
  await migrate(db, { migrationsFolder: 'drizzle/' });

  // Consider handling successful migration logic here (e.g., logging)
}

main()
  .catch((e) => {
    // Catch and log any errors that occur during migration or connection
    console.error(e);
    process.exit(1); // Exit the process with an error code
  })
  .finally(() => {
    // Ensure the database connection is closed when the script is done
    client
      .end()
      .then(() => console.log('Disconnected from Drizzle'))
      .catch((error) =>
        console.error('Error disconnecting from Drizzle:', error),
      );
  });
