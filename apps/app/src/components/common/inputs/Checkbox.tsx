import { ExtendedProps } from '@/common/types/global.types';

import Icon from '../Icon';
import { FormikProps } from 'formik';

// Props interface
interface Props extends ExtendedProps {
  id: string;
  name: string;
  label: string;
  formik: FormikProps<any>;
}

/**
 * Component representing a checkbox input
 */
export default function Checkbox({ name, id, label, formik, className }: Props) {
  return (
    <div className='relative flex w-full flex-col'>
      <label htmlFor={id} className='flex items-center gap-3 hover:cursor-pointer'>
        <input
          type='checkbox'
          id={id}
          name={name}
          checked={Boolean(formik.values[name])}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`hidden appearance-none focus:outline-none ${className}`}
        />

        <div className='relative h-5 w-5 rounded-lg border border-zinc-200 bg-zinc-50'>
          {formik.values[name] && (
            <Icon
              icon='Check'
              className='pointer-events-none absolute -top-2.5 -left-1.5 h-8! w-8! text-lime-500'
            />
          )}
        </div>

        <span className='text-sm'>{label}</span>
      </label>

      <div className='absolute -bottom-4 h-4'>
        {formik.touched[name] && formik.errors[name] && (
          <span className='text-left text-xs text-red-500'>{formik.errors[name].toString()}.</span>
        )}
      </div>
    </div>
  );
}
