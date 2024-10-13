import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from '../../../components/AuthForm/AuthForm';

describe('Auth Form Component', () => {
  const mockHandleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  });

  const setup = (isSignup = false, loading = false) => {
    render(<AuthForm loading={loading} isSignup={isSignup} handleSubmit={mockHandleSubmit} />);
  };

  it('renders the form with email and password inputs', () => {
    setup();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
  });

  it('renders the name input if isSignup is true', () => {
    setup(true);
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
  });

  it('does not render the name input if isSignup is false', () => {
    setup();
    expect(screen.queryByLabelText(/Nome Completo/i)).not.toBeInTheDocument();
  });

  it('calls handleSubmit with user data when form is submitted', async () => {
    setup();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(mockHandleSubmit).toHaveBeenCalledWith(expect.anything(), {
      name: '',
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should display loading state correctly', () => {
    setup(true, true);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should disable the submit button if email is invalid', async () => {
    setup();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeDisabled();
  });

  it('should disable the submit button if password is invalid', async () => {
    setup();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(emailInput, { target: { value: 'valid-email@hotmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeDisabled();
  });

  it('should disable the submit button if name is invalid in signup mode', async () => {
    setup(true);
    const nameInput = screen.getByLabelText(/Nome Completo/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(nameInput, { target: { value: 'ab' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(screen.getByRole('button', { name: /Criar conta/i })).toBeDisabled();
  });

  it('should enable the submit button if all fields are correct in signin mode', async () => {
    setup();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeEnabled();
  });

  it('should enable the submit button if all fields are correct in signup mode', async () => {
    setup(true);
    const nameInput = screen.getByLabelText(/Nome Completo/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(screen.getByRole('button', { name: /Criar conta/i })).toBeEnabled();
  });
});
