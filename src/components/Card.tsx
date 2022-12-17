import toast from 'react-hot-toast';
import { useRef } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface Props {
  link: string;
  pageTitle: string;
}

export const Card = ({ link, pageTitle }: Props) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const notify = () => toast.success('Copied!');

  return (
    <>
      <div className='flex flex-1 items-center justify-between truncate rounded-l-md border-l border-t border-b border-gray-200 bg-white'>
        <div className='flex-1 truncate px-4 py-2 text-sm'>
          <a
            className='font-medium text-gray-900 hover:text-gray-600 hover:underline'
            href={link}
            target='_blank'
            ref={linkRef}
          >
            {link}
          </a>
          <p className='truncate text-gray-500' title={pageTitle}>
            {pageTitle}
          </p>
        </div>
      </div>
      <div
        className='flex w-20 flex-shrink-0 items-center justify-center gap-2 rounded-r-md border-t border-r border-b text-sm font-medium hover:cursor-pointer'
        onClick={() => {
          if (linkRef.current) {
            navigator.clipboard.writeText(linkRef.current.innerText);
            notify();
          }
        }}
      >
        <ClipboardDocumentIcon
          className='h-5 w-5 text-blue-600'
          aria-hidden='true'
        />
        <span>Copy</span>
      </div>
    </>
  );
};
