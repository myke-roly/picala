import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useMutation } from '../useMutation';

describe('useMutation', () => {
    it('should handle mutation successfully', async () => {
        const mockData = { id: 1, success: true };
        const mutationFn = jest.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useMutation(mutationFn));

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);

        let mutationResult;
        await act(async () => {
            mutationResult = await result.current.mutate({ test: 'value' });
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBe(null);
        expect(mutationResult).toEqual(mockData);
        expect(mutationFn).toHaveBeenCalledWith({ test: 'value' });
    });

    it('should handle mutation errors', async () => {
        const errorMessage = 'Mutation failed';
        const mutationFn = jest.fn().mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useMutation(mutationFn));

        await act(async () => {
            await result.current.mutate({ test: 'value' });
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.loading).toBe(false);
    });

    it('should call onSuccess callback', async () => {
        const mockData = { id: 1 };
        const variables = { email: 'test@test.com' };
        const mutationFn = jest.fn().mockResolvedValue(mockData);
        const onSuccess = jest.fn();

        const { result } = renderHook(() => useMutation(mutationFn, { onSuccess }));

        await act(async () => {
            await result.current.mutate(variables);
        });

        expect(onSuccess).toHaveBeenCalledWith(mockData, variables);
    });

    it('should call onError callback', async () => {
        const error = new Error('Test error');
        const variables = { email: 'test@test.com' };
        const mutationFn = jest.fn().mockRejectedValue(error);
        const onError = jest.fn();

        const { result } = renderHook(() => useMutation(mutationFn, { onError }));

        await act(async () => {
            await result.current.mutate(variables);
        });

        expect(onError).toHaveBeenCalledWith(error, variables);
    });

    it('should reset state when reset is called', async () => {
        const mockData = { id: 1 };
        const mutationFn = jest.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useMutation(mutationFn));

        await act(async () => {
            await result.current.mutate({ test: 'value' });
        });

        expect(result.current.data).toEqual(mockData);

        act(() => {
            result.current.reset();
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
        expect(result.current.loading).toBe(false);
    });

    it('should handle loading state correctly', async () => {
        const mutationFn = jest.fn().mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
        );

        const { result } = renderHook(() => useMutation(mutationFn));

        expect(result.current.loading).toBe(false);

        act(() => {
            result.current.mutate({ test: 'value' });
        });

        await waitFor(() => expect(result.current.loading).toBe(true));
        await waitFor(() => expect(result.current.loading).toBe(false));
    });
});
