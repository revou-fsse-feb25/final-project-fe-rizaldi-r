"use client";

import { useState, useCallback, useEffect } from "react";

type FetcherFunction<TData, TParams extends any[]> = (
  token: string,
  ...params: TParams
) => Promise<TData>;

export function useFetchData<TData, TParams extends any[]>(
  fetcher: FetcherFunction<TData, TParams>,
  token?: string,
  ...fetcherParams: TParams
) {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback hook to memorize the fetching logic
  // This prevent the useEffect to run unnecessarily on every render because fetchData function is re-created (new identity) if we didnt use callback
  const fetchData = useCallback(
    async (...params: TParams) => {
      // Check if a token is provided and if it's explicitly null.
      // If so, we'll skip the fetch and set a loading state to false.
      if (!token) {
        // setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const fetchedData = await fetcher(token, ...params);
        setData(fetchedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, token]
  );

  // It runs once on component mount and whenever fetchData or fetcherParams change.
  useEffect(() => {
    fetchData(...fetcherParams);
  }, [fetchData, ...fetcherParams]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    // Expose the function to allow components using this hook to trigger fetches
  };
}
