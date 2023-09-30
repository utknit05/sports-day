import { createContext, useContext } from 'react'
import { IEventsContext } from './types'

export const EventsStateContext = createContext<IEventsContext | null>(null)

export function useEventsState() {
    const context = useContext(EventsStateContext)
    if (!context) {
        throw new Error('useEventsState must be used within EventsStateContext')
    }
    return context
}
