import { ERequestState, GENERIC_ERROR } from '../../../utils/api';
import { fetchEvents, fetchEventsCompleted, initialState, reducer } from '../store';
import { IEvent } from '../types';

describe('Events reducer', () => {
    const eventsList: IEvent[] = [
        {
            id: 3,
            event_name: "Freestyle 400M",
            event_category: "Swimming",
            start_time: "2022-12-17 15:00:00",
            end_time: "2022-12-17 16:00:00"
        },
    ]

    it('should set request state as requesting', () => {
        expect(reducer(initialState, fetchEvents())).toEqual({
            ...initialState,
            requestState: ERequestState.REQUESTING,
        });
    })

    it('should handle fetch response', () => {
        expect(reducer(initialState, fetchEventsCompleted({
            list: eventsList,
        }))).toEqual({
            list: eventsList,
            requestState: ERequestState.SUCCESS,
        });

        expect(reducer(initialState, fetchEventsCompleted({
            error: GENERIC_ERROR,
        }))).toEqual({
            list: [],
            requestState: ERequestState.FAILED,
            error: GENERIC_ERROR,
        });
    })
})
