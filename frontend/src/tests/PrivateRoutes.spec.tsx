import { screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useAuth } from '../hooks/UseAuth';
import { PrivateRoutes } from '../utils/PrivateRoutes';
import renderWithRouter from '../utils/RenderWithRouter';

vi.mock('../hooks/UseAuth');
const mockedUseAuth = useAuth as Mock;

vi.mock('../components/Layout/Layout', () => ({
  default: () => <div>Layout Component</div>,
}));

describe('PrivateRoutes', () => {
  it('should render Loader when loading is true', () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false, loading: true });
    renderWithRouter(<PrivateRoutes />, { route: '/private' });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render Layout when authenticated', () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: true, loading: false });

    renderWithRouter(<PrivateRoutes />, { route: '/private' });

    expect(screen.getByText(/Layout Component/i)).toBeInTheDocument();
  });

  it('should navigate to "/" when not authenticated', () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false, loading: false });

    renderWithRouter(<PrivateRoutes />, { route: '/private' });

    expect(screen.queryByText(/Layout Component/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Loader Component/i)).not.toBeInTheDocument();

    expect(window.location.pathname).toBe('/');
  });
});