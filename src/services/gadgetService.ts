import { PrismaClient, Gadget, GadgetStatus } from '@prisma/client';
import { generateCodename } from '../utils/codeNameGenerator';
import { generateSuccessProbability } from '../utils/successProbability';

const prisma = new PrismaClient();

export interface GadgetWithProbability extends Gadget {
    successProbability?: number;
}

export const getAllGadgets = async (status?: GadgetStatus): Promise<GadgetWithProbability[]> => {
    const query = status ? { where: { status } } : undefined;

    const gadgets = await prisma.gadget.findMany(query);

    return gadgets.map(gadget => ({
        ...gadget,
        successProbability: generateSuccessProbability()
    }));
};

export const getGadgetById = async (id: string): Promise<GadgetWithProbability | null> => {
    const gadget = await prisma.gadget.findUnique({
        where: { id }
    });

    if (!gadget) return null;

    return {
        ...gadget,
        successProbability: generateSuccessProbability()
    };
};

export const createGadget = async (name: string): Promise<Gadget> => {
    const codename = await generateCodename();

    return prisma.gadget.create({
        data: {
            name,
            codename,
            status: 'Available'
        }
    });
};

export const updateGadget = async (
    id: string,
    data: Partial<Gadget>
): Promise<Gadget | null> => {
    const gadget = await prisma.gadget.findUnique({
        where: { id }
    });

    if (!gadget) return null;

    return prisma.gadget.update({
        where: { id },
        data
    });
};

export const decommissionGadget = async (id: string): Promise<Gadget | null> => {
    const gadget = await prisma.gadget.findUnique({
        where: { id }
    });

    if (!gadget) return null;

    return prisma.gadget.update({
        where: { id },
        data: {
            status: 'Decommissioned',
            decommissionedAt: new Date()
        }
    });
};

export const destroyGadget = async (id: string): Promise<Gadget | null> => {
    const gadget = await prisma.gadget.findUnique({
        where: { id }
    });

    if (!gadget) return null;

    return prisma.gadget.update({
        where: { id },
        data: {
            status: 'Destroyed'
        }
    });
};

export const getGadgetsByStatus = async (
    status: GadgetStatus
): Promise<GadgetWithProbability[]> => {        
    const gadgets = await prisma.gadget.findMany({
        where: { status }
    });

    return gadgets.map(gadget => ({
        ...gadget,
        successProbability: generateSuccessProbability()
    }));
};