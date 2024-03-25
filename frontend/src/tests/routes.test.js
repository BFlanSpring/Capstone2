import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../nav-routes/Routes'; 

describe('AppRoutes', () => {
  test('renders home page route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('renders login page route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  test('renders signup page route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Signup Form')).toBeInTheDocument();
  });



  test('renders company detail page route', () => {
    render(
      <MemoryRouter initialEntries={['/companies/:handle']}>
        <AppRoutes />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Company Detail')).toBeInTheDocument();
  });

  test('renders company list page route', () => {
    render(
      <MemoryRouter initialEntries={['/companies']}>
        <AppRoutes />
      </MemoryRouter>
    );
   
    expect(screen.getByText('Company List')).toBeInTheDocument();
  });

  test('renders job list page route', () => {
    render(
      <MemoryRouter initialEntries={['/jobs']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Job List')).toBeInTheDocument();
  });

  test('renders profile page route', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AppRoutes />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Profile Form')).toBeInTheDocument();
  });
});
