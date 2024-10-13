import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PrivateRoutes } from './utils/PrivateRoutes';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import UserAlbums from './pages/UserAlbums/UserAlbums';
import { SignUp } from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Wallet from './pages/Wallet/Wallet';
import { SignIn } from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/signin" element={ <SignIn /> } />
      <Route path="/signup" element={ <SignUp /> } />

      <Route path="" element={ <PrivateRoutes /> }>
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/albums/my-collection" element={ <UserAlbums /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/wallet" element={ <Wallet /> } />
      </Route>

      <Route path="*" element={ <ErrorPage /> } />

    </Routes>
  );
}
