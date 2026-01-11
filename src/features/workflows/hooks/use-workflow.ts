import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"

/**
 * 서스펜스를 사용하여 모든 워크플로를 가져오는 후크
 */
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()

    return useSuspenseQuery(trpc.workFlows.getMany.queryOptions())
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
                    trpc.workFlows.getMany.queryOptions(),
                );
            },
            onError: (error) => {
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        }),
    );
};