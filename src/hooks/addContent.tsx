import { useCallback, useEffect, useState } from "react";

type PostFunction<TData, TParams extends any[]> = (
  token: string,
  ...params: TParams
) => Promise<TData>;

interface UsePostApiOptions<TData, TParams extends any[]> {
  postApiFunc: PostFunction<TData, TParams>;
  refetchFunc: (id: string) => Promise<void>;
  refetchParam: string;
  token?: string;
  autoExecuteParams?: TParams;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
}

/**
 * A custom React hook for handling POST API calls.
 * It manages loading, success, and error states, and automatically refetches data on success.
 */
export function usePostApi<TData, TParams extends any[]>(
  options: UsePostApiOptions<TData, TParams>
) {
  const { postApiFunc, refetchFunc, refetchParam, token, autoExecuteParams, onSuccess, onError } =
    options;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const postData = useCallback(
    async (...params: TParams) => {
      if (!token || !refetchParam) {
        setIsError(true);
        onError?.(new Error("Missing token or refetch parameter"));
        return;
      }

      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      try {
        const result = await postApiFunc(token, ...params);
        setIsSuccess(true);
        await refetchFunc(refetchParam);
        onSuccess?.(result);
        return result;
      } catch (error) {
        setIsError(true);
        console.error("API call failed:", error);
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [postApiFunc, refetchFunc, refetchParam, token, onSuccess, onError]
  );

  useEffect(() => {
    if (autoExecuteParams && autoExecuteParams.length > 0) {
      postData(...autoExecuteParams);
    }
  }, [postData, ...(autoExecuteParams || [])]);

  return { isLoading, isSuccess, isError, postData };
}
