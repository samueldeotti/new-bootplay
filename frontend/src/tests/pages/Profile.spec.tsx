import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Profile from '../../pages/Profile/Profile';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { UserMock } from '../mocks/UserMock';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('Profile Page', () => {

  const mockedUser = UserMock;

  const {
    validEmail,
    validName,
    validPassword,
    id
  } = mockedUser;

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      name: validName,
      id: id,
      email: validEmail,
      login: vi.fn(),
    });
  });

  it('should set document title to "Meus Discos"', () => {
    render(<Profile />);
    expect(document.title).toBe('Perfil');
  });

  it('should render the profile form with user data', () => {
    render(<Profile />);

    expect(screen.getByLabelText('Nome Completo')).toHaveValue(validName);
    expect(screen.getByLabelText('Email')).toHaveValue(validEmail);
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('should update user name on input change', () => {
    render(<Profile />);

    const nameInput = screen.getByLabelText('Nome Completo');
    fireEvent.change(nameInput, { target: { value: validName } });

    expect(nameInput).toHaveValue(validName);
    expect(screen.getByLabelText('Email')).toHaveValue(validEmail);
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('should update user password on input change', () => {
    render(<Profile />);

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(screen.getByLabelText('Nome Completo')).toHaveValue(validName);
    expect(screen.getByLabelText('Email')).toHaveValue(validEmail);
    expect(screen.getByLabelText('Senha')).toHaveValue(validPassword);
  });

  it('should be not possible to change email', () => {
    render(<Profile />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('disabled');
  })

  it('should be not possible to submit form with empty password', () => {
    render(<Profile />);

    expect(screen.getByText('Alterar informações')).toBeDisabled();
  })

  it('should be not possible to submit form with empty name', () => {
    render(<Profile />);

    const nameInput = screen.getByLabelText('Nome Completo');
    fireEvent.change(nameInput, { target: { value: '' } });

    expect(screen.getByText('Alterar informações')).toBeDisabled();
  })

  it('should be possible to submit form with password', () => {
    render(<Profile />);

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(screen.getByText('Alterar informações')).toBeEnabled();
  })

  it('should be possible to submit form with name and password', () => {
    render(<Profile />);

    const nameInput = screen.getByLabelText('Nome Completo');
    fireEvent.change(nameInput, { target: { value: validName } });
    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(screen.getByText('Alterar informações')).toBeEnabled();
  })

  it('should disable submit button while loading', () => {
    render(<Profile />);

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    const submitButton = screen.getByText('Alterar informações');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  })  

  it('should show error toast on submit failure', async () => {
    (api.put as Mock).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
      },
    });
    render(<Profile />);

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    const submitButton = screen.getByText('Alterar informações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Informações não puderam ser alteradas');
    });
  });

  it('should show error toast on submit failure', async () => {
    (api.put as Mock).mockRejectedValue({
      isAxiosError: false,
      response: {
        status: 400,
      },
    });
    render(<Profile />);

    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    const submitButton = screen.getByText('Alterar informações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Informações não puderam ser alteradas');
    });
  });


});