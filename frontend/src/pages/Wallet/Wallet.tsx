import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { api } from '../../services/apiService';
import { useAuth } from '../../hooks/UseAuth';
import { WalletModel } from '../../models/UserModel';
import Loader from '../../components/Loader/Loader';
import WalletTransactions from './WalletTransactions';
import MainContainer from '../../components/MainContainer/MainContainer';
import Title from '../../components/Title/Title';
import WalletStats from '../../components/WalletStats/WalletStats';

export default function Wallet() {
  window.document.title = 'Minha Carteira';

  const { walletId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<WalletModel>();

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await api.get(`/wallet/${walletId}`);
        setWallet(resp.data);
      } catch {
        toast.error('Erro ao carregar carteira');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [walletId])

  return (
    <div>
      {
        <MainContainer className='sm:m-auto gap-12 w-full mb-8 mt-14 sm:mt-28 text-white'>
          <Title className="text-4xl ">Minha Carteira</Title>

          {loading ? <Loader /> : (
            <>
              <WalletStats wallet={wallet as WalletModel} setWallet={setWallet} />

              <WalletTransactions />

            </>
          )}
        </MainContainer>
      }
    </div>
  )
}
