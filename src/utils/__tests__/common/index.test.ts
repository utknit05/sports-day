import { IEvent } from '../../../context/EventsList/types';
import * as utils from '../../common';

describe('Common Utils tests', () => {
    it('tests returnMinutes', () => {
        expect(utils.returnMinutes(7)).toBe(':07');
        expect(utils.returnMinutes(10)).toBe(':10');
        expect(utils.returnMinutes(0)).toBe('');
    })

    it('tests getDuration', () => {
        jest.spyOn(utils, 'returnMinutes').mockImplementation(() => '');

        // handle invalid timestamps
        expect(utils.getDuration('invalidTimeStamp', '2022-12-17 15:00:00')).toBe('');
        expect(utils.getDuration('2022-12-17 17:00:00', 'invalidTimeStamp')).toBe('');

        expect(utils.getDuration('2022-12-17 11:20:00', '2022-12-17 15:00:00')).toBe('11:20 AM - 3 PM');
    })

    it ('tests compareDates', () => {
        expect(() => utils.compareDates('invalid', '2022-12-17 15:00:00')).toThrow('Invalid timestamps');

        expect(utils.compareDates('2022-12-17 11:20:00', '2022-12-17 15:00:00')).toBe(-1);
        expect(utils.compareDates('2022-12-17 15:00:00', '2022-12-17 11:20:00')).toBe(1);
        expect(utils.compareDates('2022-12-17 11:20:00', '2022-12-17 11:20:00')).toBe(0);
    })

    it('tests getConflictingEventsMap', () => {
        const events: IEvent[] = [
            {
              id: 1,
              event_name: "Butterfly 100M",
              event_category: "Swimming",
              start_time: "2022-12-17 13:00:00",
              end_time: "2022-12-17 14:00:00"
            },
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
            {
              id: 4,
              event_name: "High Jump",
              event_category: "Athletics",
              start_time: "2022-12-17 13:00:00",
              end_time: "2022-12-17 14:00:00"
            },
            {
              id: 5,
              event_name: "Triple Jump",
              event_category: "Athletics",
              start_time: "2022-12-17 16:00:00",
              end_time: "2022-12-17 17:00:00"
            },
            {
              id: 6,
              event_name: "Long Jump",
              event_category: "Athletics",
              start_time: "2022-12-17 17:00:00",
              end_time: "2022-12-17 18:00:00"
            },
        ]

        expect(utils.getConflictingEventsMap(events)).toEqual({
            1: [4, 2],
            2: [1, 4],
            4: [1, 2],
        })
    })
})
