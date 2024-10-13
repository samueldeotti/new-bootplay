import React, { useState } from 'react';
import Input from '../Input/Input';
import { Button } from '../Button/button';
import { UserData } from './AuthContainer';
import Loader from '../Loader/Loader';

interface FormProps {
  loading: boolean;
  isSignup?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
  initialUserData?: UserData;
  isProfile?: boolean;
}

export default function AuthForm({
  loading,
  isSignup,
  handleSubmit,
  initialUserData,
  isProfile,
}: FormProps) {
  const [userData, setUserData] = useState<UserData>(
    initialUserData || {
      name: '',
      email: '',
      password: '',
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const verifyName = (name: string) => name.length >= 3;
  const verifyEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const verifyPassword = (password: string) => password.length >= 4;

  const isAllValid =
    loading ||
    !verifyEmail(userData.email) ||
    !verifyPassword(userData.password) ||
    (isSignup && !verifyName(userData.name));

  return (
    <form onSubmit={(e) => handleSubmit(e, userData)} className="flex flex-col w-full">
      {isSignup && (
        <Input
          verifyValue={verifyName}
          type="text"
          value={userData.name}
          name="name"
          onChange={handleChange}
          errorMessage="Nome deve ter no mínimo 4 caracteres"
          autoFocus
          id="name"
        >
          Nome Completo
        </Input>
      )}
      <Input
        type="email"
        verifyValue={verifyEmail}
        value={userData.email}
        name="email"
        onChange={handleChange}
        errorMessage="Email inválido"
        autoFocus={!isSignup}
        id="email"
        disabled={isProfile}
      >
        Email
      </Input>
      <Input
        verifyValue={verifyPassword}
        type="password"
        value={userData.password}
        name="password"
        onChange={handleChange}
        errorMessage="Senha deve ter no mínimo 4 caracteres"
        id="password"
        isPassword
      >
        Senha
      </Input>

      <Button
        type="submit"
        disabled={isAllValid}
        data-testid="login-button"
        className={`p-6 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-full ${
          loading && 'cursor-not-allowed'
        } text-lg font-medium`}
      >
        {loading && <Loader />}
        {!loading && isProfile && 'Alterar informações'}
        {!loading && !isProfile && (isSignup ? 'Criar conta' : 'Entrar')}
      </Button>
    </form>
  );
}
