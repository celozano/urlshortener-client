import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { PrivateRoute } from './components/PrivateRoute';
import { Signup } from './components/Signup';

export const App = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_URI}`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <AuthProvider>
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
};
