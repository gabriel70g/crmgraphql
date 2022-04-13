import React from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "./spinner";
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
  query Query {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  const router = useRouter();
  
  const cerrarSession = () => {
    localStorage.removeItem('token');
    router.push('/login'); 
  }

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return router.push('/login')
  }

  const { nombre, apellido } = data.obtenerUsuario;

  return (
    <div className='flex justify-between'>
      <p className='mr-2'>
        Hola: {nombre} {apellido}{" "}
      </p>
      <button
        onClick={() => cerrarSession()}
        className='bg-blue-800 w-full sm:w-auto font-bold text-xs rounded-full py-1 px-2 text-white shadow-md hover:bg-blue-600'
        type='button'>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
