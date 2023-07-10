import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../api/auth';
import { Navigate, useNavigate } from 'react-router-dom';


interface Props { }

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}


const Signup = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (data: FormValues) => {
    try {
      const { name, email, password, confirmpassword } = data;
      
      const response = await signup({name, email, password, confirmPassword : confirmpassword})
      
      console.log(response)
      if (response) {
        alert('đăng kí thành công');
        navigate('/signin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
      <div className="py-8 px-8 rounded-xl">
        <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="my-5 text-sm">
            <label htmlFor="name" className="block text-black">
              name
            </label>
            <input
              type="name"
              id="name"
              {...register('name', {
                required: 'name is required',
                
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${errors.name ? 'border-red-500' : ''
                }`}
              placeholder="Name"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="email" className="block text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid',
                },
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${errors.email ? 'border-red-500' : ''
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
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${errors.password ? 'border-red-500' : ''
                }`}
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="confirmpassword" className="block text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              {...register('confirmpassword', {
                required: 'Confirm Password is required',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'Passwords do not match';
                  },
                },
              })}
              className={`rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full ${errors.confirmpassword ? 'border-red-500' : ''
                }`}
              placeholder="Confirm Password"
              aria-invalid={errors.confirmpassword ? 'true' : 'false'}
            />
            {errors.confirmpassword && (
              <span className="text-red-500 text-sm">{errors.confirmpassword.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;