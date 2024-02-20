import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
      });
      await client.connect();
      const db = drizzle(client, { schema });

      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
