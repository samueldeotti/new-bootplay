import { screen, fireEvent } from "@testing-library/react";
import renderWithRouter from "../../utils/RenderWithRouter";
import Header from "../../components/Header/Header";
import userEvent from "@testing-library/user-event";

describe('Header Component', () => {
  const renderHeader = (route = '/') => renderWithRouter(<Header hasBackground />, { route });

  it('should have the logo', () => {
    renderHeader();

    const logo = screen.getByRole('link', { name: /BootPlay/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('should have the correct links when not on the Home page', () => {
    renderHeader('/dashboard');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveTextContent('BootPlay');
    expect(links[1]).toHaveTextContent('Meus Discos');
    expect(links[2]).toHaveTextContent('Carteira');

    expect(links[0]).toHaveAttribute("href", '/dashboard');
    expect(links[1]).toHaveAttribute("href", '/albums/my-collection');
    expect(links[2]).toHaveAttribute("href", '/wallet');
  });

  it('should have the correct links when on the Home page', () => {
    renderHeader('/');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveTextContent('BootPlay');
    expect(links[1]).toHaveTextContent('Entrar');
    expect(links[2]).toHaveTextContent('Inscrever-se');

    expect(links[0]).toHaveAttribute("href", '/');
    expect(links[1]).toHaveAttribute("href", '/signin');
    expect(links[2]).toHaveAttribute("href", '/signup');
  });

  it('should redirect to /albums/my-collection when "Meus Discos" button is clicked', () => {
    renderHeader('/dashboard');

    const disksLink = screen.getByRole("link", { name: /Meus Discos/i });
    fireEvent.click(disksLink);
    expect(window.location.pathname).toBe("/albums/my-collection");
  });

  it('should redirect to /wallet when "Carteira" button is clicked', () => {
    renderHeader('/dashboard');

    const walletLink = screen.getByRole("link", { name: /Carteira/i });
    fireEvent.click(walletLink);
    expect(window.location.pathname).toBe("/wallet");
  });

  it('should redirect to /signin when "Entrar" button is clicked', () => {
    renderHeader('/');

    const signInLink = screen.getByRole("link", { name: /Entrar/i });
    fireEvent.click(signInLink);
    expect(window.location.pathname).toBe("/signin");
  });

  it('should redirect to /signup when "Inscrever-se" button is clicked', () => {
    renderHeader('/');

    const signUpLink = screen.getByRole("link", { name: /Inscrever-se/i });
    fireEvent.click(signUpLink);
    expect(window.location.pathname).toBe("/signup");
  });

  it('should redirect to / when "Bootplay" button is clicked', () => {
    renderHeader('/');

    const logoLink = screen.getByRole("link", { name: /BootPlay/i });
    fireEvent.click(logoLink);
    expect(window.location.pathname).toBe("/");
  });

  it('should redirect to /dashboard when "Bootplay" button is clicked while logged in', () => {
    renderHeader('/wallet');

    const logoLink = screen.getByRole("link", { name: /BootPlay/i });
    fireEvent.click(logoLink);
    expect(window.location.pathname).toBe("/dashboard");
  });

  it('should not have the menu on Home page', () => {
    renderHeader('/');

    const menuHeader = screen.queryByTestId('menu-header');
    expect(menuHeader).not.toBeInTheDocument();
  });

  it('should have the menu when logged in', () => {
    renderHeader('/dashboard');

    const menuHeader = screen.queryByTestId('menu-header');
    expect(menuHeader).toBeInTheDocument();
  });

  it('should open the menu when clicked and close when clicked in other place in page', async () => {
    renderWithRouter(<Header hasBackground />, { route: '/dashboard' });

    const menuHeader = screen.getByTestId('menu-header');

    await userEvent.click(menuHeader);

    const menu = screen.getByRole('list');
    expect(menu).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(menu).not.toBeInTheDocument();

  });

  it('should redirect to /profile when clicked on the Perfil button in the menu', () => {
    renderHeader('/dashboard');

    const menuHeader = screen.getByTestId('menu-header');
    fireEvent.click(menuHeader);

    const profileLi = screen.getByTestId('menu-profile-button');
    fireEvent.click(profileLi);
    expect(window.location.pathname).toBe('/profile');
  });

});

