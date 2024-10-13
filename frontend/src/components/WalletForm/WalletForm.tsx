import { Button } from '../Button/button'
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/UseAuth';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { WalletModel } from '../../models/UserModel';

export default function WalletForm({ setWallet }: { setWallet: React.Dispatch<React.SetStateAction<WalletModel | undefined>> }) {

  const { walletId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleAddBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await api.post(`/wallet/credit`, {
        wallet_id: walletId,
        credit: value
      });
      setValue(0);
      setWallet(resp.data);
      toast.success('Saldo adicionado com sucesso');
    } catch {
      toast.error('Não foi possível adicionar saldo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action="" onSubmit={handleAddBalance} className='w-full text-tertiaryDark flex flex-col gap-2 sm:gap-0 bg-white rounded-xl p-3 sm:px-4 sm:col-span-2' data-testid='wallet-form'>
      <label htmlFor="search" className="font-semibold">
        Adicionar Saldo
      </label>
      <div className='flex gap-3 sm:gap-2 items-center h-full'>
        <input
          type="number"
          name='value'
          placeholder='0,00'
          value={value}
          className="border-none outline outline-1 outline-ringColor pl-2 text-labelInput rounded-md w-full h-full"
          onChange={(e) => setValue(Number(e.target.value))}
          data-testid='wallet-input'
        />

        <Button className='bg-fontPrimaryDark h-full text-white px-8 lg:px-2 xl:px-4 xl:text-lg hover:bg-black rounded-md' disabled={!(value > 0)} >
          {loading ? <Loader /> : 'Adicionar'}
        </Button>

      </div>

    </form >
  )
}
