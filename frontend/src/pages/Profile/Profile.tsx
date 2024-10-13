import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { api } from "../../services/apiService";
import toast from "react-hot-toast";
import Title from "../../components/Title/Title";
import axios, { AxiosError } from "axios";
import AuthForm from "../../components/AuthForm/AuthForm";
import { UserData } from "../../components/AuthForm/AuthContainer";

export default function Profile() {

  window.document.title = 'Perfil';

  const { name, id, email, walletId, update } = useAuth();

  const initialUserData = {
    name: name as string,
    email: email as string,
    password: ''
  }

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, userData: UserData) => {
    event.preventDefault();
    setButtonLoading(true);

    try {
      await api.put('/users/update', { id, name: userData.name, password: userData.password });
      update({ id, name: userData.name, email, walletId });
      toast.success('Informações alteradas com sucesso');
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (!axios.isAxiosError(errors)) {
        toast.error('Informações não puderam ser alteradas');
        return
      }
      toast.error('Informações não puderam ser alteradas');
    } finally {
      setButtonLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="w-4/5 flex flex-col gap-4 bg-white p-8 rounded-xl max-w-[520px]">
        <Title className="text-xl font-medium self-center">Suas informações</Title>

        <AuthForm handleSubmit={handleSubmit} isSignup loading={buttonLoading} initialUserData={initialUserData} isProfile />

      </div>
    </div>
  );
}
