import React from 'react';
import './styles.css';

interface IHeaderProps {
    title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
    return (
        <div className='headerContainer'>
            {title}
        </div>
    );
}

export default Header;
