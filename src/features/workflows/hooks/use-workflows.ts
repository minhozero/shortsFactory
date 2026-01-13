import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * 서스펜스를 사용하여 모든 워크플로를 가져오는 후크
 */
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workFlows.getMany.queryOptions(params))
}

/**
 * 새로운 워크플로우를 생성하는 후크
 */
export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workFlows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.workFlows.getMany.queryOptions({}),
                );
            },
            onError: (error) => {
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        }),
    );
};

/**
 * Hook to remove a workflow
 */
export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workFlows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" removed`);
                queryClient.invalidateQueries(trpc.workFlows.getMany.queryOptions({}));
                queryClient.invalidateQueries(
                    trpc.workFlows.getOne.queryFilter({ id: data.id }),
                );
            }
        })
    )
}