import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { GadgetController } from '../controllers/gadgetController';

const gadgetRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Gadget:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the gadget
 *         name:
 *           type: string
 *           description: The name of the gadget
 *         status:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *           description: The current status of the gadget
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the gadget was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the gadget
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name: Invisible Ink Pen
 *         status: Available
 *         createdAt: 2025-03-15T14:30:00Z
 *         updatedAt: 2025-03-15T14:30:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: Gadget management API
 */

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Retrieve all gadgets
 *     description: Get a list of all gadgets with optional status filtering
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
gadgetRouter.get('/', authenticate, async (req: Request, res: Response) => {
    await GadgetController.getGadgets(req, res);
});

/**
 * @swagger
 * /api/gadgets/{id}:
 *   get:
 *     summary: Get a gadget by ID
 *     description: Retrieve a specific gadget by its ID
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The gadget ID
 *     responses:
 *       200:
 *         description: Gadget details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
gadgetRouter.get('/:id', authenticate, async (req: Request, res: Response) => {
    await GadgetController.getGadget(req, res);
});

/**
 * @swagger
 * /api/gadgets:
 *   post:
 *     summary: Create a new gadget
 *     description: Add a new gadget to the system
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the gadget
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
gadgetRouter.post(
    '/',
    authenticate,
    authorize(['admin']),
    async (req: Request, res: Response) => {
        await GadgetController.createGadget(req, res);
    }
);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     description: Update a gadget's details by ID
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the gadget
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *                 description: The new status of the gadget
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Server error
 */
gadgetRouter.patch(
    '/:id',
    authenticate,
    authorize(['admin']),
    async (req: Request, res: Response) => {
        await GadgetController.updateGadget(req, res);
    }
);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget
 *     description: Mark a gadget as decommissioned
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gadget:
 *                   $ref: '#/components/schemas/Gadget'
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Server error
 */
gadgetRouter.delete(
    '/:id',
    authenticate,
    authorize(['admin']),
    async (req: Request, res: Response) => {
        await GadgetController.deleteGadget(req, res);
    }
);

/**
 * @swagger
 * /api/gadgets/{id}/self-destruct:
 *   post:
 *     summary: Self-destruct a gadget
 *     description: Initiate self-destruct sequence for a gadget
 *     tags: [Gadgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confirmationCode
 *             properties:
 *               confirmationCode:
 *                 type: string
 *                 description: The confirmation code for self-destruct
 *     responses:
 *       200:
 *         description: Self-destruct sequence completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gadget:
 *                   $ref: '#/components/schemas/Gadget'
 *       400:
 *         description: Invalid confirmation code
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Self-destruct sequence failed
 */
gadgetRouter.post(
    '/:id/self-destruct',
    authenticate,
    async (req: Request, res: Response) => {
        await GadgetController.selfDestructGadget(req, res);
    }
);

gadgetRouter.get('/status/:status', authenticate, async (req: Request, res: Response) => {
    await GadgetController.getGadgetsByStatus(req, res);
});

export default gadgetRouter;