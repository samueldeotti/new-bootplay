import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthForm from './AuthForm';
import Background from '../Background/Background';
import Title from '../Title/Title';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

interface UserFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
  loading: boolean;
  isSignup?: boolean;
}

export default function AuthContainer({ handleSubmit, isSignup, loading }: UserFormProps) {
  return (
    <Background bgImage='fundo' className='bg-fundo' childClassName='h-screen' blur>
      <main className="flex w-5/6 max-w-[400px] sm:max-w-[500px] bg-primaryLight px-10 pb-4 pt-10 rounded-2xl flex-col items-center gap-2">
        <Logo size={12} />
        <Title className="mb-2 font-medium text-fontPrimaryDark">
          {isSignup ? 'Criar conta' : 'Acesse sua conta'}
        </Title>

        <AuthForm loading={loading} isSignup={isSignup} handleSubmit={handleSubmit} />

        <span className="text-sm font-light sm:text-base text-secondaryLight">
          {isSignup ? "Já tem uma conta? " : "Ainda não tem uma conta? "}
          <Link to={isSignup ? "/signin" : "/signup"} className="font-semibold underline text-fontPrimaryDark">
            {isSignup ? "Entrar " : "Inscrever-se "}
          </Link>
        </span>
      </main>
    </Background>
  );
}
