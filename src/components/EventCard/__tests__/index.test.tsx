import EventCard from '..';
import * as cardUtils from '../utils';
import * as commonUtils from '../../../utils/common';
import { TEventCardProps } from '../types';
import { fireEvent, render, screen } from '@testing-library/react';

describe('EventCard Component', () => {
    const props: TEventCardProps = {
        event: {
            id: 3,
            event_name: "Freestyle 400M",
            event_category: "Swimming",
            start_time: "2022-12-17 15:00:00",
            end_time: "2022-12-17 16:00:00",
        },
        type: 'unselected',
        onSelect: jest.fn(),
    };

    beforeEach(() => {
        jest.spyOn(cardUtils, 'categoryGradientStyle').mockReturnValue({ backgroundImage: 'linear-gradient(to left, rgb(27, 214, 255), rgb(59, 157, 255))' });
        jest.spyOn(cardUtils, 'getButtonStyleClass').mockReturnValue('selectButton');
        jest.spyOn(commonUtils, 'getDuration').mockReturnValue('1 PM - 3 PM')
    })

    it('renders Event Card', () => {
        const { container } = render(<EventCard {...props} />);

        expect(container).toMatchSnapshot();
        expect(props.onSelect).toHaveBeenCalledTimes(0);

        const selectButton = screen.getByText('Select');

        fireEvent.click(selectButton);
        expect(props.onSelect).toHaveBeenCalledTimes(1);
    })
})
