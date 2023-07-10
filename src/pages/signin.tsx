import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';

import { useNavigate } from 'react-router-dom';

interface Props {}

interface FormValues {
  email: string;
  password: string;
}

const Signin = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [loginError, setLoginError] = useState(false); // state để kiểm tra thông tin đăng nhập sai

  const onHandleSubmit = async (data: FormValues) => {
    try {
      const { data: user } = await login(data);
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/admin/products'); 
    } catch (err) {
      setLoginError(true); // Nếu đăng nhập sai, set state loginError thành true để hiển thị thông báo
      console.log(err);
    }
  };

  return (
    <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
      <div className="py-8 px-8 rounded-xl">
        <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
        <form onSubmit={handleSubmit(onHandleSubmit)} className="mt-6">
          <div className="my-5 text-sm">
            <label htmlFor="email" className="block text-black">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid',
                },
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="password" className="block text-black">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${
                errors.password || loginError ? 'border-red-500' : ''
              }`}
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />

            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}

            {loginError && (
              <span className="text-red-500 text-sm">Incorrect email or password</span>
            )}

            <div className="flex justify-end mt-2 text-xs text-gray-600">
              <a href="#">Forget Password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
          >
            Login
          </button>
        </form>

        <div className="flex md:justify-between justify-center items-center mt-10">
          <div style={{ height: '1px' }} className="bg-gray-300 md:block hidden w-4/12"></div>
          <p className="md:mx-2 text-sm font-light text-gray-400"> Login With Social </p>
          <div style={{ height: '1px' }} className="bg-gray-300 md:block hidden w-4/12"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-2 mt-7">
          <div>
            <button className="text-center w-full text-white bg-blue-900 p-3 duration-300 rounded-sm hover:bg-blue-700">
              Facebook
            </button>
          </div>
          <div>
            <button className="text-center w-full text-white bg-blue-400 p-3 duration-300 rounded-sm hover:bg-blue-500">
              Twitter
            </button>
          </div>
        </div>
        <p className="mt-12 text-xs text-center font-light text-gray-400">
          {' '}
          Don't have an account?{' '}
          <a href="#" className="text-black font-medium">
            {' '}
            Create One{' '}
          </a>{' '}
        </p>
      </div>
    </div>
  );
};

export default Signin;
