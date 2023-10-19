import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


interface IDebouncedType { searchQuery: string | number, delay: number }
export const useDebounced = ({ searchQuery, delay }: IDebouncedType) => {
    const [debouncedValue, setDebouncedValue] = useState<string | number>(searchQuery);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery)
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [searchQuery, delay])
    return debouncedValue;
}