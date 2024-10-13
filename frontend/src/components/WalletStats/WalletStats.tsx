import StatsContainer from '../StatsContainer/StatsContainer'
import StatsCard from '../StatsContainer/StatsCard'
import { ChartNoAxesColumn, DollarSign } from 'lucide-react'
import { WalletModel } from '../../models/UserModel'
import { formatValue } from '../../utils/formatValue'
import WalletForm from '../WalletForm/WalletForm'

export default function WalletStats({ wallet, setWallet }: { wallet?: WalletModel, setWallet: React.Dispatch<React.SetStateAction<WalletModel | undefined>> }) {

  const size = 'w-6 h-6 sm:w-8 sm:h-8 text-white';

  return (
    <StatsContainer className='max-w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex'>
      <StatsCard
        label='Saldo'
        value={formatValue(wallet?.balance || 0)} testId='balance-stats'>
        <DollarSign className={size} />
      </StatsCard>

      <StatsCard label='Pontos'
        value={wallet?.points || 0}
        testId='points-stats'>
        <ChartNoAxesColumn className={size} />
      </StatsCard>

      <WalletForm setWallet={setWallet} />
    </StatsContainer>
  )
}


