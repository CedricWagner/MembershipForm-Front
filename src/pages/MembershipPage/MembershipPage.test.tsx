import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MembershipPage from './MembershipPage';

describe('<MembershipPage />', () => {
  test('it should mount', () => {
    render(<MembershipPage />);
    
    const membershipPage = screen.getByTestId('MembershipPage');

    expect(membershipPage).toBeInTheDocument();
  });
});