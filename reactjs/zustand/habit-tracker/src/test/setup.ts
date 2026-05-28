import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// This instantly registers all jest-dom matchers (toBeInTheDocument, etc.) to Vitest's expect 
import '@testing-library/jest-dom/vitest';

// Automatically clean up the DOM after each test case
afterEach(() => {
  cleanup();
});