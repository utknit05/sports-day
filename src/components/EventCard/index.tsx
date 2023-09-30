import React from 'react';
import './styles.css';
import { TEventCardProps } from './types';
import { categoryGradientStyle, getButtonStyleClass } from './utils';
import { getDuration } from '../../utils/common';

const EventCard: React.FC<TEventCardProps> = (props) => {
    const handleOnClick = () => {
        if (props.type === 'selected') {
            props.onRemove(props.event);
            return;
        }

        if (props.event.disabled) {
            return;
        }

        props.onSelect(props.event);
    }

    return (
        <div className="eventCardContainer" style={categoryGradientStyle(props)}>
            <div className="eventDetailsContainer">
                <h1>{props.event.event_category[0].toUpperCase()}</h1>
                <div className="eventDescription">
                    <p className="eventName">{props.event.event_name}</p>
                    <p className="eventSubText">({props.event.event_category})</p>
                    <p className="eventSubText">{getDuration(props.event.start_time, props.event.end_time)}</p>
                </div>
            </div>
            <div className="eventButtonWrapper">
                <button
                    className={`eventActionButton ${getButtonStyleClass(props)}`}
                    onClick={handleOnClick}
                >
                    {props.type === 'selected' ? 'Remove' : 'Select'}
                </button>
            </div>
        </div>
    )
}

export default EventCard;
