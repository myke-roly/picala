import { useState, useCallback } from 'react';

interface UseMutationOptions<TData, TVariables> {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
}

interface UseMutationResult<TData, TVariables> {
    data: TData | null;
    loading: boolean;
    error: string | null;
    mutate: (variables: TVariables) => Promise<TData | undefined>;
    reset: () => void;
}

/**
 * Custom hook for handling mutations (POST/PUT/DELETE operations).
 * Provides loading, error, and data states for async mutations.
 * 
 * @example
 * const {mutate, loading, error} = useMutation(
 *   ({email, password}) => signIn(email, password),
 *   {onSuccess: () => router.replace('/(tabs)')}
 * );
 */
export function useMutation<TData = any, TVariables = void>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options: UseMutationOptions<TData, TVariables> = {}
): UseMutationResult<TData, TVariables> {
    const { onSuccess, onError } = options;

    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (variables: TVariables): Promise<TData | undefined> => {
        setLoading(true);
        setError(null);

        try {
            const result = await mutationFn(variables);
            setData(result);
            onSuccess?.(result, variables);
            return result;
        } catch (err: any) {
            const errorMsg = err?.message || 'An error occurred';
            setError(errorMsg);
            onError?.(err, variables);
            return undefined;
        } finally {
            setLoading(false);
        }
    }, [mutationFn, onSuccess, onError]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, mutate, reset };
}
