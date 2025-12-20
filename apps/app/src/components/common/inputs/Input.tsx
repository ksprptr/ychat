import { ExtendedProps } from '@/common/types/global.types';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { FormikProps } from 'formik';

// Props interface
interface Props extends ExtendedProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  formik: FormikProps<any>;
}

/**
 * Component representing an input
 */
export default function Input({ type, name, id, placeholder, formik, className }: Props) {
  const hasError = Boolean(formik.touched[name] && formik.errors[name]);
  const errorMessage = formik.errors[name]?.toString();

  return (
    <div className='flex w-full flex-col'>
      <div className='relative'>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded-lg bg-zinc-50 p-2 pr-9 placeholder:text-zinc-400 focus:outline-none ${hasError ? 'ring-2 ring-red-500!' : 'border border-zinc-200 focus:ring-2 focus:ring-lime-500'} ${className} `}
        />

        {hasError && (
          <div className='group absolute inset-y-0 right-2 flex items-center'>
            <InformationCircleIcon className='h-5 w-5 text-red-500' />

            {/* Tooltip */}
            <div className='pointer-events-none absolute right-6 z-10 hidden w-max max-w-xs rounded-md bg-zinc-900 px-2 py-1 text-xs text-white group-hover:block'>
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
