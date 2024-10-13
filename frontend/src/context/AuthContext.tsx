import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../models/UserModel';
import { api } from '../services/apiService';

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (userData: { email: string, password: string }) => Promise<string | void>;
  logout: () => void;
  loading: boolean;
  update(data: UserModel): void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props { children: React.ReactNode; }

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('@Auth.Token') || '{}');
  const [userData, setUserData] = useState<UserModel>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    typeof token !== 'string' ? false : true
  );
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const data: UserModel = JSON.parse(
      localStorage.getItem('@Auth.Data') || '{}'
    );
    const storage = JSON.parse(localStorage.getItem('@Auth.Token') || '{}');

    //not validating token here, just checking if it exists

    if (data.id) {
      setIsAuthenticated(true);
      setUserData(data);
      api.defaults.headers.common.Authorization = `Bearer ${storage}`;
      setLoading(false);
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (userData: { email: string, password: string }) => {
    const respAuth = await api.post('/users/auth', userData);

    if (respAuth instanceof Error) {
      return respAuth.message;
    }

    localStorage.setItem('@Auth.Token', JSON.stringify(respAuth.data.token));

    api.defaults.headers.common.Authorization = `Bearer ${respAuth.data.token}`;

    const respUserInfo = await api.get(`/users/${respAuth.data.id}`);

    if (respUserInfo instanceof Error) {
      localStorage.removeItem('@Auth.Token');
      delete api.defaults.headers.common.Authorization;
      return respUserInfo.message;
    }

    const formattedData = {
      ...respUserInfo.data,
      email: userData.email,
      walletId: respUserInfo.data.wallet_id
    };

    delete formattedData.wallet_id;

    setUserData(formattedData);
    localStorage.setItem('@Auth.Data', JSON.stringify(formattedData));
    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@Auth.Data');
    localStorage.removeItem('@Auth.Token');
    delete api.defaults.headers.common.Authorization;
    setUserData(undefined);
    setIsAuthenticated(false);

    return navigate('/');
  }, [navigate]);

  const update = useCallback((data: UserModel) => {
    setUserData(data);
    localStorage.setItem('@Auth.Data', JSON.stringify(data));
  }, []);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        ...userData,
        login,
        logout,
        update,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
