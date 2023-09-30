import { IEvent } from "./types";

export const getDisabledEventsInUnselectedList = (selectedEvents: IEvent[], unselectedEvents: IEvent[], conflictingEventsMap?: { [key: number]: number[] }) => {
    if (!conflictingEventsMap) {
        return unselectedEvents;
    }

    let disabledEventsIds: number[] = [];
    selectedEvents.forEach(({ id }) => {
        conflictingEventsMap[id] && disabledEventsIds.push(...conflictingEventsMap[id]);
    })

    return unselectedEvents.map((event) => {
        if (disabledEventsIds.includes(event.id)) {
            return {
                ...event,
                disabled: true,
            }
        }

        return {
            ...event,
            disabled: false,
        };
    })
}
