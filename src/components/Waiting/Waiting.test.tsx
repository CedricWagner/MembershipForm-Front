import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Waiting from './Waiting';

describe('<Waiting />', () => {
  test('it should mount', () => {
    render(<Waiting />);
    
    const waiting = screen.getByTestId('Waiting');

    expect(waiting).toBeInTheDocument();
  });
});