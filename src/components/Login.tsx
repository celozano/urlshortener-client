import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import { getAuthErrorMessage } from '../utils';

export const Login = () => {
  const { token, login } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code));
    }

    setIsLoading(false);
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div>
              <button
                className={clsx(
                  'flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  isLoading && 'opacity-50'
                )}
                disabled={isLoading}
                type='submit'
              >
                Sign In
              </button>
            </div>
            <div className='flex justify-center text-sm font-medium text-gray-700'>
              DON'T HAVE AN ACCOUNT?&nbsp;
              <Link className='hover:underline' to='/signup'>
                SIGN UP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
