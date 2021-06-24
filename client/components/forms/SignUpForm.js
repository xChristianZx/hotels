import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(8, 'Password needs to be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const router = useRouter();
  const [cbUrl, setCbUrl] = useState('');
  const [signUpError, setSignUpError] = useState();

  useEffect(() => {
    if (router.query.callbackUrl) {
      setCbUrl(router.query.callbackUrl);
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query.error) {
      setSignUpError(router.query.error);
    } else {
      setSignUpError(null);
    }
  }, [router.query]);

  const handleSignUp = data => {
    signIn('credentials-signup', {
      ...data,
      callbackUrl: cbUrl,
    });
  };

  return (
    <div className="relative p-4 w-full max-w-xs sm:max-w-sm bg-gray-100 rounded-sm bg-opacity-95 shadow-2xl z-50">
      <div className="absolute top-2 left-0 h-3 w-full">
        {signUpError && (
          <div className="py-2 text-center bg-red-100">
            <p className="text-xs text-red-600">{signUpError}</p>
          </div>
        )}
      </div>
      <div className="py-8 text-center">
        <h1 className="text-3xl tracking-wide">Sign Up</h1>
      </div>
      <form
        className="flex flex-col w-full p-4 space-y-4 font-normal"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <label
          htmlFor="firstName"
          className="flex flex-col justify-center items-start px-4"
        >
          <span className="pl-2">First Name</span>
          <input
            id="firstName"
            className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent"
            type="text"
            {...register('firstName')}
          />
          <p className="h-9 pt-2 text-sm text-red-600">
            {errors.firstName && (
              <span className="pl-2" role="alert">
                {errors.firstName?.message}
              </span>
            )}
          </p>
        </label>

        <label
          htmlFor="lastName"
          className="flex flex-col justify-center items-start px-4"
        >
          <span className="pl-2">Last Name</span>
          <input
            id="lastName"
            className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent"
            type="text"
            {...register('lastName')}
          />
          <p className="h-9 pt-2 text-sm text-red-600">
            {errors.lastName && (
              <span className="pl-2" role="alert">
                {errors.lastName?.message}
              </span>
            )}
          </p>
        </label>
        <label
          htmlFor="email"
          className="flex flex-col justify-center items-start px-4"
        >
          <span className="pl-2">Email</span>
          <input
            id="email"
            className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent"
            type="text"
            {...register('email')}
          />
          <p className="h-9 pt-2 text-sm text-red-600">
            {errors.email && (
              <span className="pl-2" role="alert">
                {errors.email?.message}
              </span>
            )}
          </p>
        </label>

        <label
          htmlFor="password"
          className="flex flex-col justify-center items-start px-4"
        >
          <span className="pl-2">Password</span>
          <input
            id="password"
            className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent"
            type="password"
            {...register('password')}
          />
          <p role="alert" className="h-9 pt-2 text-sm text-red-600">
            {errors.password && (
              <span className="pl-2" role="alert">
                {errors.password?.message}
              </span>
            )}
          </p>
        </label>
        <label
          htmlFor="confirmPassword"
          className="flex flex-col justify-center items-start px-4"
        >
          <span className="pl-2">Confirm Password</span>
          <input
            id="confirmPassword"
            className="w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent"
            type="password"
            {...register('confirmPassword')}
          />
          <p role="alert" className="h-9 pt-2 text-sm text-red-600">
            {errors.confirmPassword && (
              <span className="pl-2" role="alert">
                {errors.confirmPassword?.message}
              </span>
            )}
          </p>
        </label>
        <div className="w-full px-4">
          <input
            className="flex items-stretch justify-center px-8 py-2 w-full border-b border-gray-900 text-base text-white font-medium cursor-pointer uppercase tracking-wider bg-gray-900 hover:bg-gray-800"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
      <div className="w-full text-sm text-center pt-4">
        <p className="text-gray-400 font-light">Already have an account?</p>
        <Link href={`/auth/login?callbackUrl=${cbUrl}`}>
          <span className="text-gray-600 underline cursor-pointer hover:text-gray-900">
            Log in now
          </span>
        </Link>
      </div>
    </div>
  );
}
