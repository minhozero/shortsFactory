import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workFlows.getMany>;

/**
 * Prefetch all workflows
 */
export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.workFlows.getMany.queryOptions(params));
};

/**
 * Prefetch a single workflow
 */
export const prefetchWorkflow = (id: string) => {
    return prefetch(trpc.workFlows.getOne.queryOptions({ id }));
};
