import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  LinkIcon,
  XMarkIcon,
  ScissorsIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { useCreateLink, useGetLinks } from '../api/hooks/links';
import { Card } from './Card';
import { isValidURL } from '../utils';

const navigation = [
  { name: 'Links', href: '#', icon: LinkIcon, current: true },
];

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setURL] = useState('');

  const { data: links } = useGetLinks();

  const { createLink, loading } = useCreateLink();

  const handleCreateLink = useCallback(
    async (e: any) => {
      e.preventDefault();

      if (!isValidURL(url)) {
        toast.error('Please enter a valid URL');
        return;
      }

      try {
        await createLink(url);
        setURL('');
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [url]
  );

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-white'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
                    <div className='flex flex-shrink-0 items-center gap-2 px-4'>
                      <ScissorsIcon
                        className='h-8 w-8 text-blue-600'
                        aria-hidden='true'
                      />
                      URL Shortener
                    </div>
                    <nav className='mt-5 space-y-1 px-2'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                        >
                          <item.icon
                            className={clsx(
                              item.current
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 h-6 w-6 flex-shrink-0'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className='flex flex-shrink-0 items-center gap-2 border border-t border-gray-200 p-4'>
                    <ArrowLeftOnRectangleIcon className='h-6 w-6' />
                    <Link
                      className='text-sm font-medium hover:underline'
                      to='logout'
                    >
                      Logout
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0'>
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white'>
            <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
              <div className='flex flex-shrink-0 items-center gap-2 px-4'>
                <ScissorsIcon
                  className='h-8 w-8 text-blue-600'
                  aria-hidden='true'
                />
                URL Shortener
              </div>
              <nav className='mt-5 flex-1 space-y-1 bg-white px-2'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className='flex flex-shrink-0 items-center gap-2 border border-t border-gray-200 p-4'>
              <ArrowLeftOnRectangleIcon className='h-6 w-6' />
              <Link className='text-sm font-medium hover:underline' to='logout'>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden'>
            <button
              type='button'
              className='-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <main className='flex-1'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <h1 className='text-2xl font-semibold text-gray-900'>Links</h1>
              </div>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <div className='py-4'>
                  <div className='flex h-auto flex-col gap-3'>
                    <form
                      className='flex flex-col gap-3 rounded-lg border-4 border-dashed border-gray-200 p-2 md:flex-row'
                      onSubmit={handleCreateLink}
                    >
                      <input
                        className='block w-full flex-1 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='url'
                        onChange={(e) => setURL(e.target.value)}
                        value={url}
                        required
                      />
                      <button
                        className={clsx(
                          'flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-1/4',
                          loading && 'opacity-50'
                        )}
                        type='submit'
                        disabled={loading}
                      >
                        Shorten
                      </button>
                    </form>

                    <div>
                      <ul role='list' className='flex flex-col gap-3'>
                        {links?.map(
                          ({
                            link,
                            page_title,
                          }: {
                            link: string;
                            page_title: string;
                          }) => (
                            <li
                              key={link}
                              className='col-span-1 flex rounded-md shadow-sm hover:shadow-md'
                            >
                              <Card link={link} pageTitle={page_title} />
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
