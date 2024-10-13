import { render, screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { MockTransactions } from '../mocks/TransactionMock';
import WalletTransactions from '../../pages/Wallet/WalletTransactions';

// Mock dependencies
vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('WalletTransactions Component', () => {
  const mockUseAuth = useAuth as Mock;
  const mockApiGet = api.get as Mock;
  const mockToastError = toast.error as Mock;

  const mockedTransactions = MockTransactions;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ walletId: '123' });
    mockApiGet.mockResolvedValue({ data: mockedTransactions });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders loading state initially', () => {
    render(<WalletTransactions />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('transaction-table')).not.toBeInTheDocument();
  });

  it('should renders title when page renders', async () => {
    render(<WalletTransactions />);
    expect(screen.getByText('Histórico de transações')).toBeInTheDocument();
  });

  it('should renders no transactions message when there are no transactions', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [] });
    render(<WalletTransactions />);
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
    expect(screen.getByText('Nenhuma transação encontrada')).toBeInTheDocument();
  });

  it('should renders transactions when API call is successful', async () => {
    
    mockApiGet.mockResolvedValueOnce({ data: mockedTransactions });

    render(<WalletTransactions />);
    await waitFor(() => expect(screen.queryByRole('loader')).not.toBeInTheDocument());

    expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
    expect(mockedTransactions[0].album_name).toBe('Album 1');
    expect(mockedTransactions[0].artist_name).toBe('Artist 1');
    expect(mockedTransactions[0].points_earned).toBe(10);
    expect(mockedTransactions[0].value).toBe(200);

    expect(mockedTransactions[1].album_name).toBe('Album 2');
    expect(mockedTransactions[1].artist_name).toBe('Artist 2');
    expect(mockedTransactions[1].points_earned).toBe(20);
    expect(mockedTransactions[1].value).toBe(300);

  });

  it('should renders default value when there is a problem with a field', async () => {
    const invalidTransaction = {
      ...mockedTransactions[0],
      created_at: undefined,
      points_earned: undefined,
      value: undefined,
    };
    mockApiGet.mockResolvedValueOnce({ data: [invalidTransaction] });

    render(<WalletTransactions />);
    await waitFor(() => expect(screen.queryByRole('loader')).not.toBeInTheDocument());

    expect(screen.getByText('00/00/0000')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
  })

  it('should shows error toast when API call fails', async () => {
    (mockApiGet).mockRejectedValue({});

    render(<WalletTransactions />);
    await waitFor(() => expect(screen.queryByRole('loader')).not.toBeInTheDocument());

    expect(mockToastError).toHaveBeenCalledWith('Erro ao carregar transações');
  });

});