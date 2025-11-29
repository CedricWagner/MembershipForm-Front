import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextFilter from './TextFilter';

describe('<TextFilter />', () => {
  test('it should mount', () => {
    render(<TextFilter onFilter={() => {}} />);

    const textFilter = screen.getByTestId('TextFilter');

    expect(textFilter).toBeInTheDocument();
  });
});