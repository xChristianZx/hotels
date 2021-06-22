import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import { Menu, Transition } from '@headlessui/react';
import {
  CalendarSVG,
  ChevronDownSVG,
  LogoutSVG,
  UserSVG,
} from '../../assets/svg/icons';
import classNames from '../../utils/classNames';

export default function Header(props) {
  const { cx } = props;
  const router = useRouter();
  const [session, loading] = useSession();
  const [cbUrl, setCbUrl] = useState('');

  console.log('HEADER cbUrl', cbUrl);

  console.log('Router', router);

  useEffect(() => {
    if (router.pathname !== '/auth/login') {
      setCbUrl(window.location.href);
    }
    if (router.pathname === '/auth/login' && router.query.callbackUrl) {
      setCbUrl(router.query.callbackUrl);
    }
  }, [router.query]);

  const renderNavLinks = () => {
    // TODO - Prevent cbUrl from placing multiple on there if clicked again
    // check if on /auth/login and if cbUrl already exists
    const authLoginUrl =
      typeof window !== 'undefined' && router.pathname !== '/auth/login'
        ? `/auth/login?callbackUrl=${window.location.href}`
        : `/auth/login?callbackUrl=${cbUrl}`;

    return session ? (
      <>
        <Menu as="li" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="flex flex-col justify-center items-center w-full">
                  <div className="flex flex-row justify-end items-end space-x-1 w-full h-full">
                    <UserSVG />
                    <ChevronDownSVG customClassName="h-6 w-6" />
                  </div>
                  <span className="pt-1">{session.user.name}</span>
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-40 z-50 text-sm shadow-lg bg-white cursor-pointer ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1 px-2">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => signOut({ redirect: false })}
                          className={classNames(
                            active
                              ? 'bg-gray-300 text-gray-900'
                              : 'text-gray-700',
                            'flex flex-row justify-start items-center px-4 py-1 space-x-2'
                          )}
                        >
                          <LogoutSVG className="w-5 h-5" strokeWidth={1} />
                          <span>Sign Out</span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </>
    ) : (
      <li className="flex flex-col justify-center items-center">
        <Link href={authLoginUrl}>
          <a className="flex flex-col justify-center items-center">
            <UserSVG />
            <span className="pt-1">Login</span>
          </a>
        </Link>
      </li>
    );
  };

  return (
    <div className={cx?.wrapper ? cx.wrapper : 'border-b'}>
      <div className="flex items-center justify-between h-auto w-screen px-8 xl:px-16 py-4 ">
        <div className="p-2 font-serif text-2xl self-end">
          <Link href="/">Hotels</Link>
        </div>
        <nav className="flex p-2">
          <ul className={`flex space-x-6 font-light text-xs ${cx?.links}`}>
            <li className="flex flex-col justify-center items-center">
              <Link href="/bookings">
                <a className="flex flex-col justify-center items-center">
                  <CalendarSVG />
                  <span className="pt-1">My Bookings</span>
                </a>
              </Link>
            </li>
            {renderNavLinks()}
          </ul>
        </nav>
      </div>
    </div>
  );
}
