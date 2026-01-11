import { createTRPCRouter } from '../init';
import { workflowsRouter } from '@/features/workflows/server/routers';

export const appRouter = createTRPCRouter({
  workFlows: workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;