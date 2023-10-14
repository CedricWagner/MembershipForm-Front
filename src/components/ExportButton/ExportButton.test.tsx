import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExportButton from './ExportButton';

describe('<ExportButton />', () => {
  test('it should mount', () => {
    render(<ExportButton />);
    
    const exportButton = screen.getByTestId('ExportButton');

    expect(exportButton).toBeInTheDocument();
  });
});