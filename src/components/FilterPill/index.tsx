import React from 'react';
import './styles.css';

interface IFilterPillProps {
    id?: string;
    title: string;
    onClick: (id?: string) => void;
    isSelected?: boolean;
}

const FilterPill: React.FC<IFilterPillProps> = ({ id, title, onClick, isSelected }) => {
    return (
        <div className={`filterPillContainer ${isSelected ? 'selectedFilterPill' : ''}`} onClick={() => onClick(id)}>
            {title}
        </div>
    );
}

export default FilterPill;
