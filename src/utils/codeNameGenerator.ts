import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const adjectives = [
    'Phantom', 'Shadow', 'Silent', 'Stealth', 'Covert',
    'Midnight', 'Golden', 'Silver', 'Iron', 'Ghost'
];

const nouns = [
    'Eagle', 'Phoenix', 'Hawk', 'Falcon', 'Wolf',
    'Viper', 'Cobra', 'Raven', 'Panther', 'Tiger'
];

export async function generateCodename(): Promise<string> {
    let isUnique = false;
    let codename = '';

    while (!isUnique) {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        codename = `The ${adjective} ${noun}`;

        const existingGadget = await prisma.gadget.findUnique({
            where: { codename }
        });

        if (!existingGadget) {
            isUnique = true;
        }
    }

    return codename;
}