import { UserFormData } from '@/common/types/user.types';
import { userSchema } from '@/common/validations/user.validations';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/inputs/Input';
import { useAuth } from '@/contexts/auth/AuthContext';

import { useFormik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

// Props interface
interface Props {
  hideSettingsModal: () => void;
  setConfirmModalVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * Component representing a settings modal
 */
export default function SettingsModal({ hideSettingsModal, setConfirmModalVisible }: Props) {
  const { user, logout, updateUser } = useAuth();

  if (!user) return null;

  const formik = useFormik<UserFormData>({
    initialValues: {
      username: user.username,
      avatarUrl: user.avatarUrl || '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: toFormikValidationSchema(userSchema),
    onSubmit: (values) => {
      updateUser(values);
      hideSettingsModal();
    },
  });

  return (
    <>
      {/* Title */}
      <h2 className='text-2xl font-medium text-lime-500'>Settings</h2>

      {/* Divider */}
      <hr className='my-4 opacity-10' />

      {/* Content */}
      <div className='flex grid-cols-2 flex-col gap-4 md:grid'>
        {/* User account info */}
        <div className='col-span-2 rounded-lg border border-zinc-200 bg-zinc-100 p-4 md:h-64'>
          <h3 className='text-xl font-medium text-zinc-500'>Account info</h3>

          <ul className='mt-4 flex grid-cols-2 flex-col gap-4 text-sm md:grid'>
            <li title={user.id} className='truncate'>
              <span className='font-medium'>ID</span>
              <br />
              <span className='italic'>{user.id}</span>
            </li>
            <li className='truncate'>
              <span className='font-medium'>Member since</span>
              <br />
              <span className='italic'>{new Date(user.createdAt).toLocaleDateString()}</span>
            </li>
            <li className='truncate'>
              <span className='font-medium'>Username</span>
              <br />
              <span className='italic'>{user.username}</span>
            </li>
            <li className='truncate'>
              <span className='font-medium'>Last updated</span>
              <br />
              <span className='italic'>{new Date(user.updatedAt).toLocaleDateString()}</span>
            </li>
            <li className='col-span-2 truncate'>
              <span className='font-medium'>Avatar</span>
              <br />
              <span className='italic'>{user.avatarUrl ?? 'No avatar set'}</span>
            </li>
          </ul>
        </div>

        {/* Update user */}
        <div className='rounded-lg border border-sky-200 bg-sky-100 p-4 md:h-64'>
          <h3 className='text-xl font-medium text-sky-500'>Update</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className='mt-4 space-y-4 text-sm'>
              <div className='flex grid-cols-2 flex-col gap-4 sm:grid'>
                <Input
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Username'
                  formik={formik}
                  className='focus:ring-sky-500!'
                />

                <Input
                  type='text'
                  id='avatarUrl'
                  name='avatarUrl'
                  placeholder='Avatar URL'
                  formik={formik}
                  className='focus:ring-sky-500!'
                />
              </div>

              <div className='flex grid-cols-2 flex-col gap-4 sm:grid'>
                <Input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  formik={formik}
                  className='focus:ring-sky-500!'
                />

                <Input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  formik={formik}
                  className='focus:ring-sky-500!'
                />
              </div>
            </div>

            <Button
              type='submit'
              variant='info'
              disabled={formik.isSubmitting}
              className='mt-4 flex items-center gap-x-2 text-sm'>
              Update <Icon icon='ArrowRight' />
            </Button>
          </form>
        </div>

        {/* Danger zone */}
        <div className='rounded-lg border border-red-200 bg-red-100 p-4 md:h-64'>
          <h3 className='text-xl font-medium text-red-500'>Danger zone</h3>

          <div className='mt-4 space-y-4 text-sm'>
            <Button
              type='button'
              variant='danger'
              onClick={logout}
              className='flex w-full items-center gap-x-2'>
              Logout <Icon icon='ArrowRight' />
            </Button>

            <Button
              type='button'
              variant='danger'
              onClick={() => {
                hideSettingsModal();
                setConfirmModalVisible(true);
              }}
              className='flex w-full items-center gap-x-2'>
              Delete account <Icon icon='Trash' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
