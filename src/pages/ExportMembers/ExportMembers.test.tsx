import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExportMembers from './ExportMembers';

describe('<ExportMembers />', () => {
  test('it should mount', () => {
    render(<ExportMembers />);
    
    const exportMembers = screen.getByTestId('ExportMembers');

    expect(exportMembers).toBeInTheDocument();
  });
});