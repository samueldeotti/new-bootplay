import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/UseAuth';
import { TransactionModel } from '../../models/UserModel';
import toast from 'react-hot-toast';
import { api } from '../../services/apiService';
import Loader from '../../components/Loader/Loader';
import Title from '../../components/Title/Title';
import { formatValue } from '../../utils/formatValue';
import { cn } from '../../lib/utils';

export default function WalletTransactions() {

  const { id } = useAuth();

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resp = await api.get(`/transactions/users/transactions/${id}`);
        const sortedTransactions = [...resp.data].sort((a: TransactionModel, b: TransactionModel) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setTransactions(sortedTransactions);
      } catch {
        toast.error('Erro ao carregar transações');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id])

  const formatDateTime = (isoDate: string) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const TableTh = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <th className={cn("px-6 py-3", className)}>{children}</th>
  )

  const TableTd = ({ children, className, label }: { children: React.ReactNode, className?: string, label: string }) => (
    <td className={cn("px-6 py-2 lg:py-4 lg:whitespace-nowrap sm:col-span-1 sm:order-2", className)}>
      <span className="font-semibold sm:hidden">{label} </span>
      {children}
    </td>
  )

  return (
    <div className="flex flex-col gap-8 w-full">
      <Title className="font-medium">Histórico de transações</Title>

      {loading && <Loader size={28} />}
      {!loading && (transactions?.length === 0 ? (
        <p className="text-white sm:text-lg lg:text-xl">Nenhuma transação encontrada</p>
      ) : (
        <table
          className=" overflow-x-auto ring-1 ring-white rounded-lg w-full p-2 sm:p-6 mb-8 sm:mb-12" data-testid='transaction-table'
        >
          <thead className="font-bold text-left md:text-base text-white uppercase tracking-wider hidden lg:table-header-group">
            <tr >
              <TableTh>Data</TableTh>
              <TableTh>Álbum</TableTh>
              <TableTh>Pontos</TableTh>
              <TableTh>Valor</TableTh>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions?.map((transaction, index) => (
              <tr key={transaction?.id}
                className="flex flex-col sm:grid sm:grid-cols-2 gap-2 lg:table-row mb-4 lg:mb-0 text-sm sm:text-base md:text-lg"
                data-testid={`transaction-row-${index}`}
              >

                <TableTd className="sm:order-2 sm:justify-self-end" label='Data'>
                  {formatDateTime(transaction?.created_at) || '00/00/0000'}
                </TableTd>

                <TableTd className="mb-2 line-clamp-1 h-7 sm:h-8 md:h-9 lg:h-10 sm:col-span-1 sm:order-1 lg:whitespace-normal" label='Álbum'>
                  {transaction?.album_name} ({transaction.artist_name})
                </TableTd>

                <TableTd className="sm:order-4 sm:justify-self-end" label='Pontos'>
                  {transaction?.points_earned || 0}
                </TableTd>

                <TableTd className="sm:order-3" label='Valor'>
                  {formatValue(transaction?.value || 0)}
                </TableTd>
              </tr>

            ))}
          </tbody>
        </table>
      ))}
    </div>

  )

}
