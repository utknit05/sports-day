import { render } from "@testing-library/react"
import { EventsStateContext } from "../../context/EventsList/context"
import EventsList from "."
import { IEvent } from "../../context/EventsList/types";

describe('EventsList', () => {
    const mockedOnRemove = jest.fn();
    const mockedOnSelect = jest.fn();
    const events: IEvent[] = [
        {
            id: 3,
            event_name: "Freestyle 400M",
            event_category: "Swimming",
            start_time: "2022-12-17 15:00:00",
            end_time: "2022-12-17 16:00:00"
        }
    ]

    it('renders selected EventsList', () => {
        const { container } = render((
            <EventsStateContext.Provider value={{ selectedEvents: events, unselectedEvents: [], removeEvent: mockedOnRemove, selectEvent: mockedOnSelect }}>
                <EventsList type="selected" />
            </EventsStateContext.Provider>
        ))

        expect(container).toMatchSnapshot();
    })

    it('renders unselected EventsList', () => {
        const { container } = render((
            <EventsStateContext.Provider value={{ selectedEvents: [], unselectedEvents: events, removeEvent: mockedOnRemove, selectEvent: mockedOnSelect }}>
                <EventsList type="unselected" />
            </EventsStateContext.Provider>
        ))

        expect(container).toMatchSnapshot();
    })
})
