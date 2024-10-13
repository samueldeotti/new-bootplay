import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import Layout from '../components/Layout/Layout';
import Loader from '../components/Loader/Loader';

export function PrivateRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) { return <Loader size={ 60 } />; }

  return isAuthenticated ? <Layout /> : <Navigate to="/" />;
}
