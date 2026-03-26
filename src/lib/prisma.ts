import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  pool?: Pool;
  prisma?: PrismaClient;
};

export function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = globalForPrisma.pool ?? new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  // PrismaClient's type definitions may not include the experimental
  // `adapter` option from @prisma/adapter-pg. Cast to `any` to allow
  // passing the runtime adapter while keeping TypeScript builds green.
  const prisma = new PrismaClient({ adapter } as any);

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}