import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import TodoCom from "../components/TodoCom"

describe('TodoCom Component', () => {
    it('renders the initial state correctly', () => {
        render(<TodoCom />);

        // Check if input and add button exist
        const input = screen.getByRole('textbox');
        const addButton = screen.getByRole('button', { name: /add todo/i });

        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled();

        // Check for empty state message
        expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
        expect(screen.getByText(/active todos: 0/i)).toBeInTheDocument();
    });

    it('allows a user to add todo by clicking the add button', async () => {
        render(<TodoCom />);

        const user = userEvent.setup();
        const input = screen.getByRole('textbox');
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Type into the input
        await user.type(input, 'Buy groceries');
        expect(addButton).toBeEnabled();

        // Click add button
        await user.click(addButton);

        // Verify todo is added and input is cleared
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
        expect(input).toHaveValue('');
        expect(screen.getByText(/active todos: 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/no todos available/i)).not.toBeInTheDocument();

    });

    it('allows a user to add a todo by pressing the Enter key', async() => {
        render(<TodoCom />);

        const user = userEvent.setup();

        const input = screen.getByRole('textbox');
        await user.type(input, 'Clean the room{enter}');

        expect(screen.getByText('Clean the room')).toBeInTheDocument();
        expect(screen.getByText(/active todos: 1/i )).toBeInTheDocument();
        
    });
})