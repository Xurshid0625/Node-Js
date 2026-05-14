import dotenv from 'dotenv';
import {z} from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number(), DATABASE_URL: z.string(), JWT_SECRET: z.string(), HASH_SALT: z.coerce.number(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed) {
    console.error(parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;