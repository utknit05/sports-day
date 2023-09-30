import React from 'react';
import { useEventsState } from '../context';
import { EventsProvider } from '..';
import { render, screen } from '@testing-library/react';
import { callApi } from '../../../utils/api';
import { IEvent } from '../types';

describe('Events Provider', () => {
    const mockEvents: IEvent[] = [
        {
            id: 1,
            event_name: "Freestyle 400M",
            event_category: "Swimming",
            start_time: "2022-12-17 15:00:00",
            end_time: "2022-12-17 16:00:00",
        },
        {
            id: 2,
            event_name: "Backstroke",
            event_category: "Swimming",
            start_time: "2022-12-17 13:00:00",
            end_time: "2022-12-17 14:00:00",
        },
    ]
    const DummyChild: React.FC = () => {
        try {
            useEventsState();
        
            return null;
        } catch {
            return <div>Something went wrong</div>;
        }
    }

    beforeEach(() => {
        jest.spyOn(callApi, 'get').mockImplementation(() => Promise.resolve(mockEvents));
    })

    it('not throw error when using useEventsState in Component wrapped with EventsProvider', () => {
        expect(() => render(<EventsProvider><DummyChild /></EventsProvider>)).not.toThrowError();
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    })

    it('throw error when using useEventsState', () => {
        render(<DummyChild />);

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    })
})
