import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { SignUp } from '../../pages/SignUp/SignUp';
import renderWithRouter from '../../utils/RenderWithRouter';
import { UserMock } from '../mocks/UserMock';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('SignUp Page', () => {

  const mockedUser = UserMock;

  const {
    validName,
    validEmail,
    validPassword,
    invalidEmail,
    invalidPassword,
    invalidName,
  } = mockedUser;
  

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: false });
    vi.clearAllMocks();
  });

  it('should set document title to "Meus Discos"', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});
    expect(document.title).toBe('Inscrever-se');
  });

  it('should redirect to dashboard if user is authenticated', () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: true });
    renderWithRouter(<SignUp />, {route: '/signup'});

    expect(window.location.pathname).toBe('/dashboard');
  })

  it('should render the page correctly', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Criar conta');
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome Completo'));
    expect(screen.getByLabelText('Email'));
    expect(screen.getByLabelText('Senha'));

    expect(screen.getByRole('button')).toHaveTextContent('Criar conta');
    expect(screen.getByText('Já tem uma conta?')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Entrar');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/signin');

  });

  it('should update user name on input change', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    const nameInput = screen.getByLabelText('Nome Completo');
    fireEvent.change(nameInput, { target: { value: validName } });

    expect(nameInput).toHaveValue(validName);
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('should update user password on input change', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(screen.getByLabelText('Nome Completo')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Senha')).toHaveValue(validPassword);
  });

  it('should update user email on input change', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    const passwordInput = screen.getByLabelText('Email');
    fireEvent.change(passwordInput, { target: { value: validEmail } });

    expect(screen.getByLabelText('Nome Completo')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue(validEmail);
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('should be not possible to submit form with all empty field', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be not possible to submit form with invalid name', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const nameInput = screen.getByLabelText('Nome Completo');
    fireEvent.change(nameInput, { target: { value: invalidName } });

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be not possible to submit form with invalid email', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: invalidEmail } });

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be possible to submit form invalid password', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    
    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });

    expect(screen.getByRole('button')).toBeDisabled();
  })

  it('should be possible to submit form with all valid fields', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    expect(screen.getByRole('button')).toBeEnabled();
  })

  it('should disable submit button while loading', () => {
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  })  

  it('should submit the form and show success toast', async () => {
    (api.post as Mock).mockResolvedValue({});
    renderWithRouter(<SignUp />, {route: '/signup'});

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/signUp', {
        name: validName,
        email: validEmail,
        password: validPassword,
      });
      expect(toast.success).toHaveBeenCalledWith('Conta criada com sucesso!');
    });
  });

  it('should show error toast if email is already registered', async () => {
    (api.post as Mock).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
      },
    });
  
    renderWithRouter(<SignUp />, { route: '/signup' });
  
    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });
  
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email já cadastrado!');
    });
  });
  

  it('should show error if something went wrong', async () => {

    (api.post as Mock).mockRejectedValue({
      isAxiosError: false,
      response: {
        status: 400,
      },
    });
  
    renderWithRouter(<SignUp />, { route: '/signup' });
  
    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: validName } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: validPassword } });
  
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Algo deu errado!');
    });
  });
  
});