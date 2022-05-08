import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import { Logo } from "./logo/Logo";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex h-screen w-screen overflow-hidden">
      {/* sidebar */}
      <div
        css={css({ width: 240 })}
        className="bg-white border-r border-timem-gray-100 flex-shrink-0"
      >
        {/* logo */}
        <div className="p-4 flex items-center">
          <Logo width={19} variant={32} />
          <span className="text-timem-primary-900 text-xs font-medium tracking-normal ml-2">
            TIMEM
          </span>
        </div>
        {/* profile */}
        <div className="py-4">
          <div className="py-2 px-4">
            <div className="flex">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1.2C4.52724 1.2 3.33333 2.27452 3.33333 3.6C3.33333 4.92548 4.52724 6 6 6C7.47276 6 8.66667 4.92548 8.66667 3.6C8.66667 2.27452 7.47276 1.2 6 1.2ZM2 3.6C2 1.61177 3.79086 0 6 0C8.20914 0 10 1.61177 10 3.6C10 5.58823 8.20914 7.2 6 7.2C3.79086 7.2 2 5.58823 2 3.6ZM3.33333 9.6C2.22876 9.6 1.33333 10.4059 1.33333 11.4C1.33333 11.7314 1.03486 12 0.666667 12C0.298477 12 0 11.7314 0 11.4C0 9.74314 1.49239 8.4 3.33333 8.4H8.66667C10.5076 8.4 12 9.74315 12 11.4C12 11.7314 11.7015 12 11.3333 12C10.9651 12 10.6667 11.7314 10.6667 11.4C10.6667 10.4059 9.77124 9.6 8.66667 9.6H3.33333Z"
                  fillOpacity="0.8"
                  className="fill-timem-gray-700"
                />
              </svg>
              <span className="text-sm ml-2 tracking-normal font-bold text-timem-gray-700">
                MAHMOOD SAGHARJOOGHI
              </span>
            </div>
          </div>
        </div>
        {/* sidebar-links */}
        {/* group-1 */}
        <div className="p-2">
          <div className="pb-2 border-b border-timem-gray-100">
            <div className="py-2 px-2 font-bold tracking-normal text-sm text-timem-gray-500">
              PAGES
            </div>
            <ul>
              <li className="cursor-pointer font-bold tracking-normal text-sm text-timem-gray-700 active:text-timem-gray-900 hover:bg-timem-light-gray-900">
                <Link href="/">
                  <a className="block w-full py-2 px-2">HOME</a>
                </Link>
              </li>
              <li className="cursor-pointer font-bold tracking-normal text-sm text-timem-gray-700 active:text-timem-gray-900 hover:bg-timem-light-gray-900">
                <Link href="/timeline">
                  <a className="block w-full py-2 px-2">TIMELINE</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* group-2 */}
        <div className="p-2 pt-0">
          <div>
            <div className="py-2 px-2 font-bold tracking-normal text-sm text-timem-gray-500">
              SETTINGS
            </div>
            <ul>
              <li className="cursor-pointer font-bold tracking-normal text-sm text-timem-gray-700 active:text-timem-gray-900 hover:bg-timem-light-gray-900">
                <Link href="/profile">
                  <a className="block w-full py-2 px-2">PROFILE</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex-1 flex flex-col">
        <header>
          <nav>
            <div className="bg-white px-4 h-[38px] border-b border-timem-gray-100 flex items-center">
              {/* header-left */}
              <div className="flex-1 flex items-center">
                <span className="font-bold text-xs tracking-wide text-timem-gray-700 mr-2">HOME</span>
              </div>
              {/* header-right */}
              <div className="flex">
                <button className="px-2 py-1 bg-timem-primary-100 flex items-center">
                  <span className="font-medium text-xs tracking-wide text-timem-primary-900 mr-2">
                    Logout
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.27781 10.8889C5.27781 10.5514 5.0042 10.2778 4.66669 10.2778H1.61114V1.72222H4.66669C5.0042 1.72222 5.27781 1.44862 5.27781 1.11111C5.27781 0.773603 5.0042 0.5 4.66669 0.5H1.61114C0.936124 0.5 0.388916 1.04721 0.388916 1.72222V10.2778C0.388916 10.9528 0.936124 11.5 1.61114 11.5H4.66669C5.0042 11.5 5.27781 11.2264 5.27781 10.8889Z"
                      className="fill-timem-primary-900"
                    />
                    <path
                      d="M11.825 6.42811C11.8816 6.37046 11.9245 6.30436 11.9537 6.23392C11.9833 6.1624 11.9998 6.08403 12 6.00183L12 6L12 5.99817C11.9996 5.84238 11.9399 5.68674 11.821 5.56788L9.37659 3.12343C9.13794 2.88478 8.75101 2.88478 8.51235 3.12343C8.2737 3.36209 8.2737 3.74902 8.51235 3.98768L9.91356 5.38889H4.05558C3.71808 5.38889 3.44447 5.66249 3.44447 6C3.44447 6.33751 3.71808 6.61111 4.05558 6.61111H9.91356L8.51235 8.01232C8.2737 8.25098 8.2737 8.63791 8.51235 8.87657C8.75101 9.11522 9.13794 9.11522 9.37659 8.87657L11.8206 6.43256L11.825 6.42811Z"
                      className="fill-timem-primary-900"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div className="flex-1 overflow-y-hidden">{children}</div>
      </div>
    </div>
  </div>
);

export default Layout;
