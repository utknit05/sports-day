import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { EventsStateContext } from './context';
import { fetchEvents, fetchEventsCompleted, initialState, reducer } from './store';
import { ERequestState, GENERIC_ERROR, callApi } from '../../utils/api';
import { GET_EVENTS_ENDPOINT, IEvent } from './types';
import { getConflictingEventsMap } from '../../utils/common';
import { getDisabledEventsInUnselectedList } from './utils';

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);
    const [unselectedEvents, setUnselectedEvents] = useState<IEvent[]>([]);
    const conflictingEventsRef = useRef<{ [key: string]: number[] }>();

    useEffect(() => {
        dispatch(fetchEvents());
        callApi.get(GET_EVENTS_ENDPOINT).then(res => {
            if (Array.isArray(res)) {
                dispatch(fetchEventsCompleted({
                    list: res,
                }));
                conflictingEventsRef.current = getConflictingEventsMap(res);
            } else {
                dispatch(fetchEventsCompleted({
                    error: GENERIC_ERROR
                }));
            }
        }).catch(e => {
            dispatch(fetchEventsCompleted({
                error: GENERIC_ERROR
            }));
            console.log(e);
        })
    }, [])

    useEffect(() => {
        if (state.requestState === ERequestState.SUCCESS) {
            const unselected = state.list.filter((event) => !selectedEvents.find(({ id }) => id === event.id));
            setUnselectedEvents(unselected);
        }
    }, [state.requestState])

    const selectEvent = (event: IEvent) => {
        if (selectedEvents.length === 3) {
            alert(`Maximum events that you can opt for has been exceeded. Remove atleast one of already selected event to add ${event.event_name}`)
            return;
        }
        const newSelectedEvents = [...selectedEvents, event];
        const newUnselectedEvents = getDisabledEventsInUnselectedList(
            newSelectedEvents,
            unselectedEvents.filter(e => e.id !== event.id),
            conflictingEventsRef.current,
        );
        setSelectedEvents(newSelectedEvents);
        setUnselectedEvents(newUnselectedEvents);
    }

    const removeEvent = (event: IEvent) => {
        const newSelectedEvents = selectedEvents.filter(e => e.id !== event.id);
        const newUnselectedEvents = getDisabledEventsInUnselectedList(
            newSelectedEvents,
            [...unselectedEvents, event],
            conflictingEventsRef.current,
        );
        setSelectedEvents(newSelectedEvents);
        setUnselectedEvents(newUnselectedEvents);
    }

    return (
        <EventsStateContext.Provider value={{ selectedEvents, unselectedEvents, selectEvent, removeEvent }}>
            {children}
        </EventsStateContext.Provider>
    )
}

Provider.displayName = 'EventsContextProvider';

export default Provider;
