import { render, screen } from '@testing-library/react';

describe('Sanity Check', () => {
  it('should pass if testing environment is configured correctly', () => {
    render(<h1>Testing is Live!</h1>);
    
    const element = screen.getByText('Testing is Live!');
    expect(element).toBeInTheDocument(); // Testing jest-dom matchers
  });
});