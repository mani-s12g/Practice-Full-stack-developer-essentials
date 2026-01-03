import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Child from '../components/Child1';
import { vi } from 'vitest';

describe('Child', () => {
    test('should render child component', () => {
        render(<Child />);
        const childElement = screen.getByText('Child Container');
        expect(childElement).toBeInTheDocument();
    })

    test('should call onClickFn when button is clicked', async () => {
        const onClickFn = vi.fn();
        render(<Child parentData="parent data" onClickFn={onClickFn} />);
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(onClickFn).toHaveBeenCalledTimes(1);
    })
})