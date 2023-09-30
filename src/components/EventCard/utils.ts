import { EEventsCategory, TEventCardProps, categoryToGradientMap } from "./types";

export const categoryGradientStyle = (props: TEventCardProps): React.CSSProperties => {
    if (props.type === 'unselected' && props.event.disabled) {
        return { backgroundImage: 'linear-gradient(to right, #9a9998, #ffffff)' };
    }

    return { backgroundImage: categoryToGradientMap[props.event.event_category as EEventsCategory] };
}

export const getButtonStyleClass = (props: TEventCardProps) => {
    if (props.type === 'selected') {
        return 'removeButton';
    }

    if (props.event.disabled) {
        return 'disabledButton';
    }

    return 'selectButton';
}
