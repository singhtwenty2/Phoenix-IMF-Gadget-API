import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import gadgetRoutes from './routes/gadgetRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import config from './config';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/gadgets', gadgetRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'IMF API operational' });
});

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`IMF Gadget API running on port ${PORT}`);
});

export default app;