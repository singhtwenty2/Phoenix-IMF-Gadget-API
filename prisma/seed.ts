import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('secretadmin123', 10);
    await prisma.user.create({
        data: {
            username: 'imfadmin',
            password: adminPassword,
            role: 'admin'
        }
    });

    const agentPassword = await bcrypt.hash('agent007', 10);
    await prisma.user.create({
        data: {
            username: 'agent007',
            password: agentPassword,
            role: 'agent'
        }
    });

    const gadgets = [
        {
            name: 'Explosive Pen',
            codename: 'The Midnight Scribe',
            status: 'Available'
        },
        {
            name: 'Facial Recognition Glasses',
            codename: 'The Phantom Watcher',
            status: 'Available'
        },
        {
            name: 'Grappling Watch',
            codename: 'The Silver Ascender',
            status: 'Deployed'
        }
    ];

    for (const gadget of gadgets) {
        await prisma.gadget.create({
            data: gadget as any
        });
    }

    console.log('Database seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });