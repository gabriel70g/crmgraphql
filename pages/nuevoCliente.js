import { useFormik } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import Layout from "../components/layout";
import { SubmitButtonFull } from "../components/ui/submitButton";
import router from "next/router";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

const nuevoCliente = () => {
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE,{
    update(cache, { data: { nuevoCliente } }) {
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
        },
      });
    }

    })

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre del cliente es obligarorio"),
      apellido: yup.string("El apellido del cliente es obligarorio").required(),
      empresa: yup.string().required("El nombre de la empresa"),
      email: yup.string().email("Formato de email incorrecto ").required("El email es requirido"),
    }),
    onSubmit: async (valores) => {
      try {
        const { data, loading, error } = await nuevoCliente({
          variables: {
            input: {
              ...valores,
            },
          },
        });

        router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Nuevo cliente</h1>
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>
            <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                  Nombre
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text'
                  placeholder='Nombre cliente'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                  Apellido
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='apellido'
                  type='text'
                  placeholder='Apellido Cliente'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                />
              </div>
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                  Empresa
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='empresa'
                  type='text'
                  placeholder='Empresa cliente'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.empresa}
                />
              </div>
              {formik.touched.empresa && formik.errors.empresa ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.empresa}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Email cliente'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                  Teléfono
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='telefono'
                  type='text'
                  placeholder='Teléfono cliente'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                />
              </div>
              <SubmitButtonFull className='w-full'>Registrar cliente</SubmitButtonFull>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default nuevoCliente;
