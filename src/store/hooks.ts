import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useShallowEqualSelector(selector) {
    return useAppSelector(selector, shallowEqual);
}
