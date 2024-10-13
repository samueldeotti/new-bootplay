import { screen, fireEvent } from "@testing-library/react";
import Landing from "../../pages/Home/Home";
import renderWithRouter from "../../utils/RenderWithRouter";

describe('Home Page', () => {

  it('should set document title to "BootPlay"', () => {
    renderWithRouter(<Landing />, { route: "/" });
    expect(document.title).toBe('BootPlay');
  });

  it('should render the home page correctly', () => {
    renderWithRouter(<Landing />, { route: "/" });

    const titleElement = screen.getByText(/A história da música não pode ser esquecida!/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");
    expect(titleElement).toHaveClass("text-white font-bold w-full sm:text-6xl text-3xl text-pretty");
    
    const paragraphElement = screen.getByText(/Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil./i);
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe("P");
    expect(paragraphElement).toHaveClass("text-base w-5/6 text-pretty text-white sm:text-2xl");

    const buttons = screen.getAllByRole("link");
    expect(buttons).toHaveLength(4);
  });

  it('should render the buttons correctly', () => {
    renderWithRouter(<Landing />, { route: "/" });
  
    const buttons = screen.getAllByRole("link");
    expect(buttons).toHaveLength(4);
  
    const signUpButtons = screen.getAllByRole("link", { name: /Inscrever-se/i });
    expect(signUpButtons).toHaveLength(2);
    expect(signUpButtons[0]).toBeInTheDocument();
    expect(signUpButtons[1]).toBeInTheDocument();
  
    expect(signUpButtons[0]).toHaveAttribute("href", "/signup");
    expect(signUpButtons[1]).toHaveAttribute("href", "/signup");
  
    const signInButton = screen.getByRole("link", { name: /Entrar/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
  
    const logoButton = screen.getByRole("link", { name: /BootPlay/i });
    expect(logoButton).toBeInTheDocument();
    expect(logoButton).toHaveAttribute("href", "/");
  });
  
  it('should the subscribe button redirect to signup page', () => {
    renderWithRouter(<Landing />, { route: "/" });
  
    const signUpButton = screen.getAllByRole("link", { name: /Inscrever-se/i });
    fireEvent.click(signUpButton[0]);
    expect(window.location.pathname).toBe("/signup");  
  });

  it('should the login button redirect to signin page', () => {
    renderWithRouter(<Landing />, { route: "/" });
  
    const signInButton = screen.getByRole("link", { name: /Entrar/i });
    fireEvent.click(signInButton);
    expect(window.location.pathname).toBe("/signin");  
  });
});
