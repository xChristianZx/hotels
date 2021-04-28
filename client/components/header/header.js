import Link from 'next/link';

export default function Header(props) {
  const { cx } = props;

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
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="pt-1">My Bookings</span>
                </a>
              </Link>
            </li>
            <li className="flex flex-col justify-center items-center">
              <Link href="/auth/login">
                <a className="flex flex-col justify-center items-center">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="pt-1">Login</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
