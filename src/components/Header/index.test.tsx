import { render, screen } from '@testing-library/react';
import Header from '.';

it('tests Header component', () => {
    render(<Header title="Test Title" />);

    expect(screen.getByText('Test Title')).toHaveClass('headerContainer');
})

