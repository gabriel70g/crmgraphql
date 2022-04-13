import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from '../components/spinner';

const AUTENTICAR_USUARIO = gql`
  mutation Mutation($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const login = () => {
  const router = useRouter();

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("El email no es valido").required("El enail no puede estar vacio"),
      password: yup.string().required("El password es obligatorio").min(6, "El password debe ser de al menos 6 caracteres"),
    }),
    onSubmit: async (valores) => {

      
      try {
        const { data, loading, error } = await autenticarUsuario({
          variables: {
            input: {
              ...valores,
            },
          },
        });
        

        const { token } = data.autenticarUsuario;
        localStorage.setItem('token', token);

        router.push("/");
      } catch (err) {
        toast.error(err.message.replace("Error: ", err));
      }
    },
  });
let cargando = true;
  return (
    <>
      <Layout>

        <ToastContainer />
        <h1 className='text-center text-2xl text-white font-light'>login</h1>
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Email usuario'
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
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                  Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='Password usuario'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <input type='submit' className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-500' value='Iniciar Sesión' />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default login;
