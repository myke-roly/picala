import { useState, useEffect, useCallback } from 'react';

interface UseQueryOptions<T> {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    dependencies?: any[];
}

interface UseQueryResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data with automatic state management.
 * Handles loading, error, and data states for async queries.
 * 
 * @example
 * const {data, loading, error, refetch} = useQuery(getFeaturedMatches);
 */
export function useQuery<T>(
    queryFn: () => Promise<T>,
    options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
    const { enabled = true, onSuccess, onError, dependencies = [] } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        try {
            const result = await queryFn();
            setData(result);
            onSuccess?.(result);
        } catch (err: any) {
            const errorMsg = err?.message || 'An error occurred';
            setError(errorMsg);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    }, [enabled, ...dependencies]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: execute };
}
