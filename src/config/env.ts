import { z } from 'zod';

const envVariablesSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']),
  CLERK_SECRET_KEY: z.string().min(1),
  SENTRY_DNS: z.string().min(1),
  //   AWS_BUCKET_NAME: z.string().min(1),
  // AWS_DEFAULT_REGION: z.string().min(1),
  // AWS_ACCESS_KEY_ID: z.string().min(1),
  // AWS_SECRET_ACCESS_KEY: z.string().min(1),
  PORT: z.string().optional(),
});

export default function validateEnv(
  envVariables: Record<string, any>,
): Record<string, any> {
  return envVariablesSchema.parse(envVariables);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
