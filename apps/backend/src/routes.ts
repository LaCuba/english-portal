import { FastifyInstance } from 'fastify';
import { authRoutes } from './modules/auth/auth.routes';

export const registerRoutes = async (app: FastifyInstance) => {
  await app.register(authRoutes, { prefix: '/api' });
};
