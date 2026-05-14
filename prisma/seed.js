import {PrismaClient} from '../src/generated/prisma/index.js';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@gmail.com",
        }, update: {}, create: {
            name: "admin", email: "admin@gmail.com", password: hashedPassword, role: "ADMIN",
        },
    });

    console.log("Admin created:", admin);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });