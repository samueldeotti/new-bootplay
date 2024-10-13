import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WalletForm from '../../components/WalletForm/WalletForm';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { Mock, vi } from 'vitest';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('WalletForm Component', () => {
  const setWallet = vi.fn();
  const mockWalletId = 'test-wallet-id';

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ walletId: mockWalletId });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders the form correctly', () => {
    render(<WalletForm setWallet={setWallet} />);
    expect(screen.getByText(/Adicionar Saldo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0,00')).toBeInTheDocument();

    const input = screen.getByTestId('wallet-input')

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(0);
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('name', 'value');
    
    expect(screen.getByRole('button', { name: /Adicionar/i })).toBeInTheDocument();
  });

  it('should enables the button when a positive value is entered', () => {
    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: '10' } });
    expect(button).not.toBeDisabled();
  });

  it('should disables the button when a non-positive value is entered', () => {
    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: '0' } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: '-10' } });
    expect(button).toBeDisabled();
  });

  it('should calls the API and updates the wallet on successful form submission', async () => {
    const mockResponse = { data: { balance: 100 } };
    (api.post as Mock).mockResolvedValue(mockResponse);

    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/wallet/credit', {
      wallet_id: mockWalletId,
      credit: 10
    }));

    await waitFor(() => expect(setWallet).toHaveBeenCalledWith(mockResponse.data));
  });

  it('should shows a loader while the form is submitting', async () => {
    const mockResponse = { data: { balance: 100 } };
    (api.post as Mock).mockResolvedValue(mockResponse);

    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => expect(api.post).toHaveBeenCalled());

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should displays an error toast if the API call fails', async () => {
    (api.post as Mock).mockRejectedValue(new Error('API Error'));

    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    await waitFor(() => expect(api.post).toHaveBeenCalled());

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Não foi possível adicionar saldo'));
  });

  it('should clears the input value after successful submission', async () => {
    const mockResponse = { data: { balance: 100 } };
    (api.post as Mock).mockResolvedValue(mockResponse);

    render(<WalletForm setWallet={setWallet} />);
    const input = screen.getByPlaceholderText('0,00');
    const button = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);

    await waitFor(() => expect(api.post).toHaveBeenCalled());

    expect(input).toHaveValue(0);
  });
});
