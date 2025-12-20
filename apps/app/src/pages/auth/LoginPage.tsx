import { LoginFormData } from '@/common/types/auth.types';
import { loginSchema } from '@/common/validations/auth.validations';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/inputs/Input';
import { useAuth } from '@/contexts/auth/AuthContext';

import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';

/**
 * Component representing a login page
 */
export default function LoginPage() {
  const { user, login } = useAuth();

  // Formik setup
  const formik = useFormik<LoginFormData>({
    initialValues: { username: '', password: '' },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => login(values),
  });

  // Redirect if already logged in
  if (user) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='grid min-h-screen grid-cols-1 px-4 text-left sm:grid-cols-2 sm:px-0'>
      {/* Form */}
      <div className='mx-auto flex w-full flex-col justify-center sm:w-2/3 md:w-1/2'>
        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <div>
            <h1 className='text-2xl font-medium'>Log in</h1>
            <p className='pt-2 text-zinc-400'>Log in to chat with others.</p>
          </div>

          {/* Inputs */}
          <div className='space-y-8 py-8'>
            <Input
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              formik={formik}
            />

            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              formik={formik}
            />
          </div>

          <Button
            type='submit'
            disabled={formik.isSubmitting}
            className='flex items-center gap-x-2'>
            Continue <Icon icon='ArrowRight' />
          </Button>
        </form>

        {/* Don't have an account yet? */}
        <p className='mt-8 text-sm text-zinc-400'>
          Don't have an account yet?
          <Link to='/auth/register' className='ml-1 text-lime-500 hover:underline'>
            Register
          </Link>
        </p>
      </div>

      {/* Logo */}
      <div className='hidden flex-col items-center justify-center bg-zinc-100 sm:flex'>
        <img
          src='/assets/logos/ui/logo.svg'
          alt='YChat Logo'
          className='h-auto sm:w-1/2 md:w-1/3'
        />
      </div>
    </div>
  );
}
