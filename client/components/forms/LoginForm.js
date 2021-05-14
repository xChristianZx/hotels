import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = data => console.log('SUBMITTED', data);

  return (
    <div className="p-4 sm:max-w-xs bg-gray-50 bg-opacity-95 shadow-2xl z-50">
      <div className="py-8 text-center text-gray-900">
        <h1 className="text-3xl tracking-wide">Login</h1>
      </div>
      <form
        className="flex flex-col w-full p-4 space-y-4 font-normal"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {errors.email && <span role="alert">{errors.email?.message}</span>}
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
              <span role="alert">{errors.password?.message}</span>
            )}
          </p>
        </label>
        <div className="w-full px-4">
          <input
            className="flex items-stretch justify-center px-8 py-2 w-full border-b border-gray-900 text-base text-white font-medium cursor-pointer uppercase tracking-wider bg-gray-900 hover:bg-gray-800"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
}
