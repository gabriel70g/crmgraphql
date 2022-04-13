import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export const Sidebar = () => {

  // routing de next
  const router = useRouter();



  return (
    <aside className='bg-gray-800 max-w-xs sm:w-1/3 xl:w-1/5 sm:min-h-screem p-5'>
      <div>
        <p className='text-white text-2xl font-black'>CRM clientes</p>
      </div>
      <nav className='mt-5 list-none'>
        <li className={router.pathname === "/" ? "bg-blue-800 p-1 rounded-full px-4 py-1" : "p-1"}>
          <Link href='/'>
            <a className='text-white block'>Clientes</a>
          </Link>
        </li>
        <li className={router.pathname === "/pedidos" ? "bg-blue-800 p-1 rounded-full px-4 py-1" : "p-1"}>
          <Link href='/pedidos'>
            <a className='text-white block'>Pedidos</a>
          </Link>
        </li>
        <li className={router.pathname === "/productos" ? "bg-blue-800 p-1 rounded-full px-4 py-1" : "p-1"}>
          <Link href='/productos'>
            <a className='text-white block'>Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};
