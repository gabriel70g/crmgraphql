import React from 'react'
import Link from "next/link";

export const SubmitButton = ({ children, disabled, onclick }) => {
  return (
    <button
      className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded-full text-sm hover:bg-blue-600 mb-3'
      disabled={disabled}
      onclick={onclick}>
      {children}
    </button>
  );
}


export const SubmitButtonFull = ({ children, disabled, onclick }) => {
  return (
    <button
      type="submit"
      className='bg-blue-800 w-full py-2 px-5 mt-3 inline-block text-white rounded-full text-sm hover:bg-blue-600 mb-3'
      disabled={disabled}
      onclick={onclick}>
      {children}
    </button>
  );
};

export const LinkButton = ({ children, href }) => {
  return (
    <Link href={ href }>
      <a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded-full text-sm hover:bg-blue-600 mb-3'>
      { children }  
      </a>
    </Link>
  );
};
