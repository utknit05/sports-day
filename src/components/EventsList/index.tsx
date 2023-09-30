import React, { useState } from 'react';
import { useEventsState } from '../../context/EventsList';
import EventCard from '../EventCard';
import './styles.css';
import FilterPill from '../FilterPill';
import Header from '../Header';

interface IEventsListProps {
    type: 'selected' | 'unselected';
}

const EventsList: React.FC<IEventsListProps> = ({ type }) => {
    const { selectedEvents, unselectedEvents, removeEvent, selectEvent } = useEventsState();
    const [selectedFilter, setSelectedFilter] = useState<string>();

    const eventsFilters = type === 'selected' ? new Set(selectedEvents.map(({ event_category }) => event_category)) : new Set(unselectedEvents.map(({ event_category }) => event_category));

    return (
        <div className="eventsListContainer">
            <Header title={type === 'selected' ? "Selected Events" : "All Events"} />
            {
                type === 'selected' ? (
                    <>
                        <div className="filtersContainer">
                            <FilterPill title="All" onClick={setSelectedFilter} isSelected={!selectedFilter} />
                            {Array.from(eventsFilters).map(category => <FilterPill key={category} id={category} title={category} onClick={setSelectedFilter} isSelected={category === selectedFilter} />)}
                        </div>
                        <div className='eventsListLayout'>
                            {selectedEvents.filter(e => selectedFilter ? e.event_category === selectedFilter : true).map(e => {
                                return <EventCard key={e.id} event={e} type='selected' onRemove={removeEvent} />
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="filtersContainer">
                            <FilterPill title="All" onClick={setSelectedFilter} isSelected={!selectedFilter} />
                            {Array.from(eventsFilters).map(category => <FilterPill key={category} id={category} title={category} onClick={setSelectedFilter} isSelected={category === selectedFilter}  />)}
                        </div>
                        <div className='eventsListLayout'>
                            {unselectedEvents.filter(e => selectedFilter ? e.event_category === selectedFilter : true).map(e => {
                                return <EventCard key={e.id} event={e} type='unselected' onSelect={selectEvent} />
                            })}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default EventsList;
