import { render, screen, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { MockTransactions } from '../mocks/TransactionMock';
import Wallet from '../../pages/Wallet/Wallet';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('Wallet Page', () => {
  const mockedTransactions = MockTransactions;

  const mockedWallet = {
    walletId: '123',
    balance: 100,
    points: 2
  }

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ walletId: '123', id: '222' });
    (api.get as Mock).mockClear();
    (api.post as Mock).mockResolvedValue({ data: { balance: 100, points: 2 } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set document title to "Meus Discos"', () => {
    render(<Wallet />);
    expect(document.title).toBe('Minha Carteira');
  });

  it('should display loader initially', () => {
    render(<Wallet />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Minha Carteira')).toBeInTheDocument();
    expect(screen.queryByText('Album 1')).not.toBeInTheDocument();
  });

  it('should render correctly after loading', async () => {
    (api.get as Mock).mockResolvedValue({ data: mockedWallet });
    (api.get as Mock).mockResolvedValue({ data: mockedTransactions });
    render(<Wallet />);

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    expect(screen.getByText('Minha Carteira')).toBeInTheDocument();
    expect(screen.getByTestId('balance-stats')).toBeInTheDocument();
    expect(screen.getByTestId('balance-stats')).toHaveTextContent('Saldo');
    expect(screen.getByTestId('points-stats')).toBeInTheDocument();
    expect(screen.getByTestId('points-stats')).toHaveTextContent('Pontos');
    expect(screen.getByTestId('wallet-form')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-input')).toBeInTheDocument();
    expect(screen.getByText('Adicionar')).toBeInTheDocument();

    expect(screen.getByText('Histórico de transações')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-table')).toBeInTheDocument();

  })

  it('should render no transactions message when there are no transactions', async () => {
    (api.get as Mock).mockResolvedValue({ data: [] });

    render(<Wallet />);
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    expect(screen.getByText('Minha Carteira')).toBeInTheDocument();
    expect(screen.getByText('Histórico de transações')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma transação encontrada')).toBeInTheDocument();
  })

  it('should fetch and display wallet info', async () => {
    (api.get as Mock).mockResolvedValue({ data: mockedWallet });
    render(<Wallet />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/wallet/123'));
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    expect(screen.getByText('Saldo')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    expect(screen.getByText('Pontos')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
  })

  it('should fetch and display transactions', async () => {
    (api.get as Mock).mockResolvedValueOnce({ data: mockedWallet });
    (api.get as Mock).mockResolvedValueOnce({ data: mockedTransactions });
    render(<Wallet />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/wallet/123'));
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/transactions/users/transactions/222'));

    expect(screen.getByText('Album 1 (Artist 1)')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023 09:00:00')).toBeInTheDocument();

    expect(screen.getByText('Album 2 (Artist 2)')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument();
    expect(screen.getByText('02/01/2023 09:00:00')).toBeInTheDocument();

  });

  it('should display transactions in order', async () => {
    (api.get as Mock).mockResolvedValueOnce({ data: mockedWallet });
    (api.get as Mock).mockResolvedValueOnce({ data: mockedTransactions });
    render(<Wallet />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/wallet/123'));
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/transactions/users/transactions/222'));

    const transactionRows = screen.getAllByTestId(/transaction-row/i);
  
  expect(transactionRows[0]).toHaveTextContent('Data 03/01/2023 09:00:00Álbum Album 3 (Artist 3)Pontos 30Valor R$ 400,00'); 
  expect(transactionRows[1]).toHaveTextContent('Data 02/01/2023 09:00:00Álbum Album 2 (Artist 2)Pontos 20Valor R$ 300,00');
  })


  it('should display error toast on fetch failure', async () => {
    (api.get as Mock).mockRejectedValue({});

    render(<Wallet />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/wallet/123'));

    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar carteira');
  });

  it('should display error toast on transaction fetch failure', async () => {
    (api.get as Mock).mockResolvedValueOnce({ data: mockedWallet });
    (api.get as Mock).mockRejectedValue({});

    render(<Wallet />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/wallet/123'));
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/transactions/users/transactions/222'));

    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar transações');
  })

});