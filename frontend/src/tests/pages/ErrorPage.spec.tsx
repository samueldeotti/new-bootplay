import { screen } from '@testing-library/react';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import '@testing-library/jest-dom';
import renderWithRouter from '../../utils/RenderWithRouter';
import userEvent from '@testing-library/user-event';

describe('ErrorPage Page', () => {
  it('should set the document title to "Página não encontrada"', () => {
    renderWithRouter(<ErrorPage />, { route: '/not-a-route'});
    expect(document.title).toBe('Página não encontrada');
  });

  it('should render the Logo component', () => {
    renderWithRouter(<ErrorPage />, { route: '/not-a-route'})
    const logo = screen.getByRole('img'); 
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Bootplay logo');
  });

  it('should display the "Página não encontrada" message', () => {
    renderWithRouter(<ErrorPage />, { route: '/not-a-route'})
    const message = screen.getByText(/Página não encontrada/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-white text-5xl font-extrabold text-center text-pretty");
  });

  it('should display the "Não encontramos a página que você queria." message', () => {
    renderWithRouter(<ErrorPage />, { route: '/not-a-route'})
    const subMessage = screen.getByText(/Não encontramos a página que você queria./i);
    expect(subMessage).toBeInTheDocument();
    expect(subMessage).toHaveClass("text-[#A5A5A5] text-center text-lg md:text-xl");
  });

  it('should render a link to the home page', async () => {
    renderWithRouter(<ErrorPage />, { route: '/not-a-route'})
    const link = screen.getByRole('link', { name: /Início/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');

    await userEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });

});