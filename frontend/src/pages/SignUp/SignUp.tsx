import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import AuthContainer, { UserData } from '../../components/AuthForm/AuthContainer';
import axios, { AxiosError } from 'axios';


export function SignUp() {
  window.document.title = 'Inscrever-se';

  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  async function handleSigup(event: FormEvent, userData: UserData) {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post('/users/signUp', userData);
      toast.success('Conta criada com sucesso!');
      navigate('/signin');
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        if (errors.response?.status === 400) {
          toast.error('Email já cadastrado!');
          return;
        }
      }
      toast.error('Algo deu errado!');
    } finally {
      setLoading(false);
    }
  }

  return <AuthContainer handleSubmit={handleSigup} isSignup loading={loading} />;
}
