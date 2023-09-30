import { fireEvent, render, screen } from '@testing-library/react';
import FilterPill from '.';

describe('FilterPill component',  () => {
    const mockFn = jest.fn();

    it('renders filterPillContainer', () => {
        render(<FilterPill id="1" title="Filter 1" onClick={mockFn} isSelected/>);

        const container = screen.getByText('Filter 1');
    
        expect(container).toHaveClass('filterPillContainer', 'selectedFilterPill');
        expect(mockFn).toHaveBeenCalledTimes(0);

        fireEvent.click(container);

        expect(mockFn).toHaveBeenCalledTimes(1);
    })
})
