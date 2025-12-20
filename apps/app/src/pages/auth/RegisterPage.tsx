import { RegisterFormData } from '@/common/types/auth.types';
import { registerSchema } from '@/common/validations/auth.validations';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Checkbox from '@/components/common/inputs/Checkbox';
import Input from '@/components/common/inputs/Input';
import { useAuth } from '@/contexts/auth/AuthContext';

import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';

/**
 * Component representing a register page
 */
export default function RegisterPage() {
  const { user, register } = useAuth();

  // Formik setup
  const formik = useFormik<RegisterFormData>({
    initialValues: { username: '', password: '', confirmPassword: '', acceptTerms: false },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => register(values),
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
            <h1 className='text-2xl font-medium'>Register</h1>
            <p className='pt-2 text-zinc-400'>Create an account to start chatting with others.</p>
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

            <Input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm password'
              formik={formik}
            />

            <Checkbox
              id='acceptTerms'
              name='acceptTerms'
              label='I accept the Terms and Conditions'
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

        {/* Already have an account? */}
        <p className='mt-8 text-sm text-zinc-400'>
          Already have an account?
          <Link to='/auth/login' className='ml-1 text-lime-500 hover:underline'>
            Log in
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
