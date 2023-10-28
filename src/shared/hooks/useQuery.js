import {
  useMutation,
  useQuery as useQueryBase,
  useQueryClient,
} from "react-query";
import { useErrorBoundary } from "react-error-boundary";

export function useCommand(keys, apiFn) {
  const queryClient = useQueryClient();

  const mutation = useMutation((payload) => apiFn(payload), {
    onSuccess: async (res) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      keysArray.forEach(async (key) => {
        const queryKey = Array.isArray(key) ? key : [key];
        await queryClient.invalidateQueries({ queryKey: queryKey });
      });
    },
  });
  useErrorBoundary(mutation.error);

  return {
    execute: (payload, options) => mutation.mutate(payload, options),
    isLoading: mutation.isLoading,
  };
}

export function useQuery(key, apiFn, options) {
  console.log(key, apiFn, options);
  const query = useQueryBase(key, apiFn, options);

  useErrorBoundary(query.error);
  console.log(query);

  return { ...query.data };
}
