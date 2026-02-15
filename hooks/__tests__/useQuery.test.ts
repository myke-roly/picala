import { renderHook, waitFor } from '@testing-library/react-native';
import { useQuery } from '../useQuery';

describe('useQuery', () => {
    it('should fetch data successfully', async () => {
        const mockData = { id: 1, name: 'Test' };
        const queryFn = jest.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useQuery(queryFn));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBe(null);
        expect(queryFn).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Failed to fetch';
        const queryFn = jest.fn().mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useQuery(queryFn));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(errorMessage);
    });

    it('should not execute when enabled is false', async () => {
        const queryFn = jest.fn().mockResolvedValue({ data: 'test' });

        const { result } = renderHook(() => useQuery(queryFn, { enabled: false }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(queryFn).not.toHaveBeenCalled();
        expect(result.current.data).toBe(null);
    });

    it('should call onSuccess callback', async () => {
        const mockData = { id: 1 };
        const queryFn = jest.fn().mockResolvedValue(mockData);
        const onSuccess = jest.fn();

        const { result } = renderHook(() => useQuery(queryFn, { onSuccess }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(onSuccess).toHaveBeenCalledWith(mockData);
    });

    it('should call onError callback', async () => {
        const error = new Error('Test error');
        const queryFn = jest.fn().mockRejectedValue(error);
        const onError = jest.fn();

        const { result } = renderHook(() => useQuery(queryFn, { onError }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(onError).toHaveBeenCalledWith(error);
    });

    it('should refetch data when refetch is called', async () => {
        const mockData1 = { id: 1 };
        const mockData2 = { id: 2 };
        const queryFn = jest
            .fn()
            .mockResolvedValueOnce(mockData1)
            .mockResolvedValueOnce(mockData2);

        const { result } = renderHook(() => useQuery(queryFn));

        await waitFor(() => expect(result.current.data).toEqual(mockData1));

        await result.current.refetch();

        await waitFor(() => expect(result.current.data).toEqual(mockData2));

        expect(queryFn).toHaveBeenCalledTimes(2);
    });
});
