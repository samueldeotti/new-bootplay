import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/UseAuth';
import AuthContainer, { UserData } from '../../components/AuthForm/AuthContainer';

export function SignIn() {
  window.document.title = 'Entrar';

  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  async function handleLogin(event: FormEvent, { email, password }: UserData) {
    event.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Verificando dados...');

    try {
      await login({ email, password });

      toast.dismiss(toastId);
      toast.success('Login efetuado com sucesso!');
      navigate('/dashboard');
    } catch {
      toast.dismiss(toastId);
      toast.error('Dados inválidos!');
    } finally {
      setLoading(false);
    }
  }

  return <AuthContainer handleSubmit={handleLogin} loading={loading} />;
}
