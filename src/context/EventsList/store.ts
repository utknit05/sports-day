import { Reducer } from "react";
import { IEvent, TEventsActions, TEventsState } from "./types";
import { ERequestState, IListResponse } from "../../utils/api";

export const initialState: TEventsState = {
    list: [],
    requestState: ERequestState.INITIAL,
}

export const fetchEvents = () => ({
    type: 'FETCH_EVENTS' as 'FETCH_EVENTS'
})

export const fetchEventsCompleted = (payload: Partial<Omit<IListResponse<IEvent>, 'requestState'>>) => ({
    type: 'FETCH_EVENTS_COMPLETED' as 'FETCH_EVENTS_COMPLETED',
    payload,
})

export const resetEvents = () => ({
    type: 'RESET_EVENTS' as 'RESET_EVENTS',
});

export const reducer: Reducer<TEventsState, TEventsActions> = (state, action) => {
    switch(action.type) {
        case 'FETCH_EVENTS': {
            return {
                ...state,
                requestState: ERequestState.REQUESTING,
            };
        }

        case 'FETCH_EVENTS_COMPLETED': {
            const { list } = action.payload;
            return {
                list: [],
                requestState: list ? ERequestState.SUCCESS : ERequestState.FAILED,
                ...action.payload,
            }
        }

        case 'RESET_EVENTS': {
            return initialState;
        }

        default:
            return state;
    }
}
