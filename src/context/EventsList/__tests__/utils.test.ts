import { IEvent } from '../types';
import { getDisabledEventsInUnselectedList } from '../utils';

describe('getDisabledEventsInUnselectedList util', () => {
    const selectedEvents: IEvent[] = [{
        id: 1,
        event_name: "Butterfly 100M",
        event_category: "Swimming",
        start_time: "2022-12-17 13:00:00",
        end_time: "2022-12-17 14:00:00"
    }];

    const unselectedEvents: IEvent[] = [
        {
            id: 2,
            event_name: "Backstroke 100M",
            event_category: "Swimming",
            start_time: "2022-12-17 13:30:00",
            end_time: "2022-12-17 14:30:00"
        },
        {
            id: 3,
            event_name: "Freestyle 400M",
            event_category: "Swimming",
            start_time: "2022-12-17 15:00:00",
            end_time: "2022-12-17 16:00:00"
        },
    ];

    const conflictingEventsMap = {
        1: [2],
        2: [1],
    }

    it('should disable event with id 2', () => {
        const events = getDisabledEventsInUnselectedList(selectedEvents, unselectedEvents, conflictingEventsMap);

        expect(events[0].disabled).toBeTruthy();
        expect(events[1].disabled).toBeFalsy();
    })
})