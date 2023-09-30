import { IEvent } from '../../../context/EventsList/types';
import { TEventCardProps } from '../types';
import { categoryGradientStyle, getButtonStyleClass } from '../utils';

describe('EventCard utils', () => {
    const disabledEvent: IEvent = {
        id: 3,
        event_name: "Freestyle 400M",
        event_category: "Swimming",
        start_time: "2022-12-17 15:00:00",
        end_time: "2022-12-17 16:00:00",
        disabled: true,
    }
    const athEvent: IEvent = {
        id: 3,
        event_name: "Freestyle 400M",
        event_category: "Athletics",
        start_time: "2022-12-17 15:00:00",
        end_time: "2022-12-17 16:00:00",
        disabled: false,
    }
    const boxEvent: IEvent = {
        id: 3,
        event_name: "Freestyle 400M",
        event_category: "Boxing",
        start_time: "2022-12-17 15:00:00",
        end_time: "2022-12-17 16:00:00",
        disabled: false,
    }
    const disabledEventProps: TEventCardProps = {
        event: disabledEvent,
        type: 'unselected',
        onSelect: jest.fn(),
    };
    const selectedEventProps: TEventCardProps = {
        event: disabledEvent,
        type: 'selected',
        onRemove: jest.fn(),
    }

    describe('categoryGradientStyle', () => {
        it('should return disabled card gradient', () => {
            expect(categoryGradientStyle(disabledEventProps)).toEqual({ backgroundImage: 'linear-gradient(to right, #9a9998, #ffffff)' });
        })

        it('should return gradient for different event categories', () => {
            expect(categoryGradientStyle(selectedEventProps)).toEqual({ backgroundImage: 'linear-gradient(to left, rgb(27, 214, 255), rgb(59, 157, 255))' });
            expect(categoryGradientStyle({ ...selectedEventProps, event: athEvent })).toEqual({ backgroundImage: 'linear-gradient(to right, rgb(236, 97, 23, 90), rgb(0, 108, 255, 90))' });
            expect(categoryGradientStyle({ ...selectedEventProps, event: boxEvent })).toEqual({ backgroundImage: 'linear-gradient(to right, rgb(236, 58, 23), rgb(255, 255, 255))' });
        })
    })

    it('tests getButtonStyleClass', () => {
        expect(getButtonStyleClass(selectedEventProps)).toBe('removeButton');
        expect(getButtonStyleClass(disabledEventProps)).toBe('disabledButton');
        expect(getButtonStyleClass({ ...disabledEventProps, event: boxEvent })).toBe('selectButton');
    })
})
