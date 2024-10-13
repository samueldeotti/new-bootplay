import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useAuth } from '../../hooks/UseAuth';
import toast from 'react-hot-toast';
import renderWithRouter from '../../utils/RenderWithRouter';
import { SignIn } from '../../pages/SignIn/SignIn';
import { UserMock } from '../mocks/UserMock';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('SignIn Page', () => {

  const mockedUser = UserMock;

  const {
    validEmail,
    validPassword,
    invalidEmail,
    invalidPassword,
  } = mockedUser;

  const mockLogin = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ login: mockLogin, isAuthenticated: false });
    vi.clearAllMocks();
  });

  it('should set document title to "Meus Discos"', () => {
    renderWithRouter(<SignIn />, {route: '/signup'});
    expect(document.title).toBe('Entrar');
  });

  it('should redirect to dashboard if user is authenticated', () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: true });
    renderWithRouter(<SignIn />, { route: '/signin' });

    expect(window.location.pathname).toBe('/dashboard');
  })

  it('should render the page correctly', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Acesse sua conta');
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.queryByText('Nome Completo')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email'));
    expect(screen.getByLabelText('Senha'));

    expect(screen.getByRole('button')).toHaveTextContent('Entrar');
    expect(screen.getByText('Ainda não tem uma conta?')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Inscrever-se');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/signup');

  });

  it('should update user email on input change', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    const passwordInput = screen.getByLabelText('Email');
    fireEvent.change(passwordInput, { target: { value: validEmail } });

    expect(screen.getByLabelText('Email')).toHaveValue(validEmail);
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('should update user password on input change', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Senha')).toHaveValue(validPassword);
  });


  it('should be not possible to submit form with all empty field', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    expect(screen.getByRole('button')).toBeDisabled();
  })


  it('should be not possible to submit form with invalid email', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: invalidEmail } });

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be possible to submit form invalid password', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be possible to submit form with all valid fields', () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    expect(screen.getByRole('button')).toBeEnabled();
  })


  it('should submit the form and show success toast', async () => {
    (mockLogin).mockResolvedValue({});
    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: validEmail, password: validPassword });
    });
    expect(window.location.pathname).toBe('/dashboard');
  });

  it('should disable submit button and show loader while loading', async () => {
    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });


  });

  it('should show error toast if invalid credentials', async () => {
    (mockLogin).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
      },
    });

    renderWithRouter(<SignIn />, { route: '/signin' });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Dados inválidos!');
    });
  });

});