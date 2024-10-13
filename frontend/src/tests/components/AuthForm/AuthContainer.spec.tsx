import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AuthContainer from '../../../components/AuthForm/AuthContainer';

describe('AuthFormContainer Component', () => {
  const mockHandleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  });

  const renderUserForm = (isSignup = false, loading = false) => {
    render(
      <Router>
        <AuthContainer handleSubmit={mockHandleSubmit} isSignup={isSignup} loading={loading} />
      </Router>
    );
  };

  it('should render the signup form correctly', () => {
    renderUserForm(true);
    expect(screen.getByRole('heading', { name: 'Criar conta' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Já tem uma conta?')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();

    expect(screen.queryByLabelText('Ainda não tem uma conta?')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Inscrever-se')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Acesse sua conta')).not.toBeInTheDocument();

  });

  it('should render the signin form correctly', () => {
    renderUserForm(false);
    expect(screen.getByText('Acesse sua conta')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Ainda não tem uma conta?')).toBeInTheDocument();
    expect(screen.getByText('Inscrever-se')).toBeInTheDocument();

    expect(screen.queryByLabelText('Nome Completo')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Entrar')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Já tem uma conta?')).not.toBeInTheDocument();
  });

});