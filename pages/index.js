import Layout from "../components/layout";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/header";
import Spinner from '../components/spinner';
import router from 'next/router';
import Link from 'next/link';
import { LinkButton } from '../components/ui/submitButton';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      empresa
      apellido
      email
      telefono
    }
  }
`;

export default function Index() {
  // consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (loading) { return <Spinner />; }

  if (!data) {
    router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Clientes</h1>
        <LinkButton href='/nuevoCliente'>Nuevo cliente</LinkButton>
        <table className='table-auto shadow-md mt-10 w-full w-lg text-white'>
          <thead className='bg-gray-800'>
            <th className='w-1/5 py-2'>Nombre</th>
            <th className='w-1/5 py-2'>Empresa</th>
            <th className='w-1/5 py-2'>Email</th>
          </thead>

          <tbody className='bg-white text-black'>
            {data.obtenerClientesVendedor.map((cli) => (
              //console.log(cliente)
              <tr key={cli.id}>
                <td className='border px-4 py-2'>
                  {cli.nombre} {cli.apellido}
                </td>
                <td className='border px-4 py-2'>{cli.empresa}</td>
                <td className='border px-4 py-2'>{cli.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
