import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeadCell from './HeadCell';

describe('<HeadCell />', () => {
  test('it should mount', () => {
    render(<HeadCell />);
    
    const headCell = screen.getByTestId('HeadCell');

    expect(headCell).toBeInTheDocument();
  });
});