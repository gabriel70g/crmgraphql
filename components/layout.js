import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { Sidebar } from "./sidebar";
import Header from './header';

const Layout = ({ children }) => {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM administracion de clientes</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
        <link href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css' rel='stylesheet' />
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>{children}</div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
          <div className='flex min-h-screen'>
            <Sidebar />

            <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
