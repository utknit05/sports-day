import { IEvent } from "../../context/EventsList/types";

type TEventActionHandler = (event: IEvent) => void

export type TEventCardProps =
    { event: IEvent } &
    ({
        type: 'selected';
        onRemove: TEventActionHandler;
    } | {
        type: 'unselected';
        onSelect: TEventActionHandler;
    })

export enum EEventsCategory {
    Swimming = 'Swimming',
    Athletics = 'Athletics',
    Boxing = 'Boxing',
}

export const categoryToGradientMap: {
    [key in EEventsCategory]: string
} = {
    [EEventsCategory.Swimming]: 'linear-gradient(to left, rgb(27, 214, 255), rgb(59, 157, 255))',
    [EEventsCategory.Athletics]: 'linear-gradient(to right, rgb(236, 97, 23, 90), rgb(0, 108, 255, 90))',
    [EEventsCategory.Boxing]: 'linear-gradient(to right, rgb(236, 58, 23), rgb(255, 255, 255))',
}
