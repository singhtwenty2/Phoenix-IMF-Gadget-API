import { Request, Response } from 'express';
import * as gadgetService from '../services/gadgetService';
import { GadgetStatus } from '@prisma/client';

export class GadgetController {

    static async getGadgets(req: Request, res: Response) {
        try {
            const status = req.query.status as GadgetStatus | undefined;
            const gadgets = await gadgetService.getAllGadgets(status);
            res.json(gadgets);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve gadgets' });
        }
    };

    static async getGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gadget = await gadgetService.getGadgetById(id);

            if (!gadget) {
                return res.status(404).json({ error: 'Gadget not found' });
            }

            res.json(gadget);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve gadget' });
        }
    };

    static async createGadget(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Gadget name is required' });
            }

            const gadget = await gadgetService.createGadget(name);
            res.status(201).json(gadget);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create gadget' });
        }
    };

    static async updateGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, status } = req.body;

            if (!name && !status) {
                return res.status(400).json({ error: 'At least one field to update is required' });
            }

            const gadget = await gadgetService.updateGadget(id, { name, status });

            if (!gadget) {
                return res.status(404).json({ error: 'Gadget not found' });
            }

            res.json(gadget);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update gadget' });
        }
    };

    static async deleteGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gadget = await gadgetService.decommissionGadget(id);

            if (!gadget) {
                return res.status(404).json({ error: 'Gadget not found' });
            }

            res.json({
                message: 'Gadget decommissioned successfully',
                gadget
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to decommission gadget' });
        }
    };

    static async selfDestructGadget(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { confirmationCode } = req.body;
            const expectedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            if (!confirmationCode || confirmationCode !== expectedCode) {
                return res.status(400).json({
                    error: 'Invalid confirmation code',
                    expectedCode, // Sending the expected code for demo purposes
                    message: 'This is a simulation - in a real app, this code would be sent securely'
                });
            }
            const gadget = await gadgetService.destroyGadget(id);

            if (!gadget) {
                return res.status(404).json({ error: 'Gadget not found' });
            }

            res.json({
                message: 'Gadget self-destruct sequence completed successfully',
                gadget
            });
        } catch (error) {
            res.status(500).json({ error: 'Self-destruct sequence failed' });
        }
    };

    static async getGadgetsByStatus(req: Request, res: Response) {
        try {
            const { status } = req.query;
            const gadgets = await gadgetService.getGadgetsByStatus(status as GadgetStatus);
            res.json(gadgets);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve gadgets by status' });
        }
    };
}