import React, { useState } from "react";
import { useRouter } from 'next/router'
import Layout from "../components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;

const NuevaCuenta = () => {
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);
  const router = useRouter();

  // validación del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es Obligatorio"),
      apellido: Yup.string().required("El Apellido es obligatorio"),
      email: Yup.string().email("El email no es válido").required("El email es obligatorio"),
      password: Yup.string().required("El password no puede ir vacio").min(6, "El password debe ser de al menos 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      // console.log(valores);
      try {
        await nuevoUsuario({
          variables: {
            input: {
              ...valores,
            },
          },
        });
        toast.success("El usuario se registró correctamente");
        
        setTimeout(() => {
          router.push("/login");  
        }, 3000);
      } catch (err) {
        toast.error(err.message.replace("Error: ", ""));
      }
    },
  });

  
  return (
    <>
      <Layout>
        <ToastContainer />
        <h1 className='text-center text-2xl text-white font-light'>Crea nueva cuenta</h1>
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                  Nombre
                </label>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text'
                  placeholder='Nombre Usuario'
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  placeholder='Apellido Usuario'
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.apellido && formik.errors.apellido ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.apellido}</p>
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
                  placeholder='Email Usuario'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                  Password
                </label>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='Password Usuario'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type='submit'
                className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                value='Crear Cuenta'
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaCuenta;
