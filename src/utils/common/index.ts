import { IEvent } from "../../context/EventsList/types";

export const returnMinutes = (time: number) => {
    if (time > 0 && time < 10) {
        return `:0${time}`;
    }

    if (time >= 10) {
        return `:${time}`;
    }

    return ''
}

export const getDuration = (startTimestamp: string, endTimestamp: string) => {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return '';
    }

    const [startHours, startMinutes] = [startDate.getHours(), startDate.getMinutes()];
    const [endHours, endMinutes] = [endDate.getHours(), endDate.getMinutes()];

    const startAMOrPM = startHours > 12 ? 'PM' : 'AM';
    const endAMOrPM = endHours > 12 ? 'PM' : 'AM';

    const start12HoursClock = startHours > 12 ? startHours % 12 : startHours;
    const end12HoursClock = endHours > 12 ? endHours % 12 : endHours;

    return `${start12HoursClock}${returnMinutes(startMinutes)} ${startAMOrPM} - ${end12HoursClock}${returnMinutes(endMinutes)} ${endAMOrPM}`;
}

export const compareDates = (timestamp1: string, timestamp2: string) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        throw new Error('Invalid timestamps');
    }

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
}

export const getConflictingEventsMap = (events: IEvent[]) => {
    const compareFunc = (e1: IEvent, e2: IEvent) => {
        return compareDates(e1.start_time, e2.start_time);
    }

    events.sort(compareFunc);

    const conflictingEventsMap: {
        [key: number]: number[]
    } = {}

    for(let i=0; i<events.length; i++) {
        for(let j=i+1; j<events.length; j++) {
            if (compareDates(events[i].end_time, events[j].start_time) === 1) {
                conflictingEventsMap[events[i].id] = conflictingEventsMap[events[i].id] ? [...conflictingEventsMap[events[i].id], events[j].id] : [events[j].id];
                conflictingEventsMap[events[j].id] = conflictingEventsMap[events[j].id] ? [...conflictingEventsMap[events[j].id], events[i].id] : [events[i].id];
            } else {
                break;
            }
        }
    }

    return conflictingEventsMap;
}
